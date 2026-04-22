'use server'

import { Resend } from 'resend'
import { headers } from 'next/headers'
import { contactSchema } from '@/lib/contact-schema'
import { buildContactNotification } from '@/lib/email/contact-notification'
import { verifyHCaptcha, isHCaptchaEnabled } from '@/lib/hcaptcha'

// ─────────────────────────────────────────────────────────────────
//  Rate limit léger, in-memory par IP (MVP).
//  Pour prod multi-instances : migrer vers Upstash Redis (Sprint 4).
// ─────────────────────────────────────────────────────────────────

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 min

const hits = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string) {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count += 1
  return true
}

// ─────────────────────────────────────────────────────────────────
//  Types de retour
// ─────────────────────────────────────────────────────────────────

export interface ContactActionState {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Partial<Record<string, string>>
}

const IDLE: ContactActionState = { status: 'idle' }

// ─────────────────────────────────────────────────────────────────
//  Server action — soumission formulaire
// ─────────────────────────────────────────────────────────────────

export async function submitContact(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  try {
    return await submitContactInner(formData)
  } catch (err) {
    // Filet global : toute exception non prévue (ex: env var manquante,
    // headers() qui throw, etc.) est convertie en ContactActionState
    // d'erreur. Sans ce wrap, un throw remonte au error boundary
    // `app/error.tsx` et l'utilisateur voit "Erreur interne" sans retour
    // formulaire. Le digest reste visible dans les logs Vercel Runtime.
    console.error('[contact] submitContact crash non capturé', err)
    return {
      status: 'error',
      message:
        "Une erreur technique est survenue. Merci de réessayer dans un instant, ou écrivez-nous directement à contact@mossinedigital.com.",
    }
  }
}

async function submitContactInner(
  formData: FormData,
): Promise<ContactActionState> {
  // 1. Extraction & validation
  const raw = {
    name:    formData.get('name'),
    email:   formData.get('email'),
    phone:   formData.get('phone') ?? '',
    company: formData.get('company') ?? '',
    service: formData.get('service'),
    budget:  formData.get('budget') ?? '',
    message: formData.get('message'),
    website: formData.get('website') ?? '', // honeypot
    consent: formData.get('consent'),
  }

  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === 'string' && !fieldErrors[key]) {
        fieldErrors[key] = issue.message
      }
    }
    return {
      status: 'error',
      message: 'Merci de corriger les champs en rouge.',
      fieldErrors,
    }
  }

  const data = parsed.data

  // 2. Honeypot — bot détecté → on simule un succès silencieux
  if (data.website && data.website.length > 0) {
    return { status: 'success', message: 'Merci, nous avons bien reçu votre message.' }
  }

  // 3. hCaptcha — validation serveur du token client.
  //    Mode gracieux : si HCAPTCHA_SECRET_KEY est absente, verifyHCaptcha()
  //    retourne 'skipped' et on laisse passer (cohérent avec Resend).
  //    Si le captcha est armé mais le token manquant/invalide → refus.
  const hdrs = await headers()
  const ip =
    hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    hdrs.get('x-real-ip') ??
    'anonymous'

  if (isHCaptchaEnabled()) {
    const token = formData.get('hcaptcha-token')
    const captchaResult = await verifyHCaptcha(
      typeof token === 'string' ? token : '',
      ip !== 'anonymous' ? ip : undefined,
    )
    if (captchaResult.status === 'missing') {
      return {
        status: 'error',
        message: 'Merci de valider la vérification anti-robot ci-dessous.',
        fieldErrors: { hcaptcha: 'Cochez la case de vérification avant d\'envoyer.' },
      }
    }
    if (captchaResult.status === 'failure') {
      console.error('[contact] hCaptcha failure', captchaResult.errorCodes)
      return {
        status: 'error',
        message: 'La vérification anti-robot a échoué. Merci de réessayer.',
        fieldErrors: { hcaptcha: 'Vérification expirée ou invalide, recommencez.' },
      }
    }
    // 'success' ou 'skipped' → on continue.
  }

  // 4. Rate limit
  if (!checkRateLimit(ip)) {
    return {
      status: 'error',
      message: 'Trop de tentatives. Merci de réessayer dans quelques minutes.',
    }
  }

  // 5. Envoi email via Resend
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL // ex: "Mossine Digital <noreply@mossinedigital.com>"
  const toEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'contact@mossinedigital.com'

  if (!apiKey || !fromEmail) {
    console.error('[contact] RESEND_API_KEY ou RESEND_FROM_EMAIL manquant')
    return {
      status: 'error',
      message: 'Configuration email indisponible. Merci de nous écrire directement à contact@mossinedigital.com.',
    }
  }

  const { subject, html, text } = buildContactNotification(data)

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: data.email,
      subject,
      html,
      text,
    })
    if (error) {
      console.error('[contact] Resend error', error)
      return {
        status: 'error',
        message: 'Échec de l\'envoi. Réessayez dans un instant ou écrivez-nous directement.',
      }
    }
  } catch (err) {
    console.error('[contact] unexpected', err)
    return {
      status: 'error',
      message: 'Une erreur inattendue est survenue. Merci de réessayer.',
    }
  }

  return {
    status: 'success',
    message: 'Message bien reçu. On vous revient sous 24h ouvrées.',
  }
}

export const initialContactState = IDLE
