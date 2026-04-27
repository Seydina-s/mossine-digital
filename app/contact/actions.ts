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
//
//  ⚠️ VACCIN : un fichier `'use server'` ne peut exporter QUE des
//  async functions (Next.js 15+). Tout `export const` / `export let`
//  déclenche l'erreur build `A "use server" file can only export
//  async functions, found object.` Les types/interfaces sont stripped
//  au compile — OK tant qu'on utilise `import type`. Ne JAMAIS
//  exporter d'objet runtime (état initial, constantes, helpers
//  synchrones) depuis ce fichier. Les types partagés vivent dans
//  `lib/contact-types.ts`.
// ─────────────────────────────────────────────────────────────────

import type { ContactActionState } from '@/lib/contact-types'

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

  // Snapshot des valeurs saisies — renvoyé au client en cas d'erreur
  // pour que le formulaire puisse restaurer ce que l'utilisateur
  // avait déjà tapé. On ne persiste JAMAIS le honeypot (website) ni
  // le consent (checkbox, reset naturellement).
  const submittedValues: Record<string, string> = {
    name:    typeof raw.name    === 'string' ? raw.name    : '',
    email:   typeof raw.email   === 'string' ? raw.email   : '',
    phone:   typeof raw.phone   === 'string' ? raw.phone   : '',
    company: typeof raw.company === 'string' ? raw.company : '',
    service: typeof raw.service === 'string' ? raw.service : '',
    budget:  typeof raw.budget  === 'string' ? raw.budget  : '',
    message: typeof raw.message === 'string' ? raw.message : '',
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
      values: submittedValues,
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
        values: submittedValues,
      }
    }
    if (captchaResult.status === 'failure') {
      console.error('[contact] hCaptcha failure', captchaResult.errorCodes)
      return {
        status: 'error',
        message: 'La vérification anti-robot a échoué. Merci de réessayer.',
        fieldErrors: { hcaptcha: 'Vérification expirée ou invalide, recommencez.' },
        values: submittedValues,
      }
    }
    // 'success' ou 'skipped' → on continue.
  }

  // 4. Rate limit
  if (!checkRateLimit(ip)) {
    return {
      status: 'error',
      message: 'Trop de tentatives. Merci de réessayer dans quelques minutes.',
      values: submittedValues,
    }
  }

  // 5. Envoi email via Resend
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL // ex: "Mossine Digital <noreply@mossinedigital.com>"
  // Destinataire temporaire — `contact@mossine.com` est l'inbox client
  // opérationnelle. Switch vers `contact@mossinedigital.com` dès que le
  // DNS du domaine officiel est prêt (cf. .env.example).
  const toEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'contact@mossine.com'

  if (!apiKey || !fromEmail) {
    // Mode gracieux MVP : Resend pas encore configuré.
    // On log le lead complet dans Vercel Runtime Logs pour consultation
    // manuelle avant go-live, et on retourne un succès pour ne pas
    // frustrer l'utilisateur (message identique au vrai succès).
    console.warn('[contact] Resend non configuré — lead loggué seulement', {
      name: data.name,
      email: data.email,
      phone: data.phone || '—',
      company: data.company || '—',
      service: data.service,
      budget: data.budget || '—',
      message: data.message,
      receivedAt: new Date().toISOString(),
    })
    return {
      status: 'success',
      message: 'Message bien reçu. On vous revient sous 24h ouvrées.',
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
        values: submittedValues,
      }
    }
  } catch (err) {
    console.error('[contact] unexpected', err)
    return {
      status: 'error',
      message: 'Une erreur inattendue est survenue. Merci de réessayer.',
      values: submittedValues,
    }
  }

  return {
    status: 'success',
    message: 'Message bien reçu. On vous revient sous 24h ouvrées.',
  }
}
