'use client'

import * as React from 'react'
import { useActionState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  CheckCircleIcon,
  WarningCircleIcon,
  PaperPlaneTiltIcon,
  SpinnerGapIcon,
} from '@phosphor-icons/react'
import {
  SERVICE_OPTIONS,
  BUDGET_OPTIONS,
} from '@/lib/contact-schema'
import type { ContactPayload } from '@/lib/contact-schema'
import { SERVICES_DETAIL } from '@/lib/services-data'
import { SERVICE_ICON_MAP } from '@/components/services/service-icons'
import {
  submitContact,
  initialContactState,
  type ContactActionState,
} from '@/app/contact/actions'
import { EASE_OUT_EXPR as EASE } from '@/lib/motion'
import { HCaptchaWidget } from '@/components/ui/HCaptchaWidget'

// ─────────────────────────────────────────────────────────────────
//  ContactForm
//  Props :
//    - initialService : service pré-sélectionné quand l'utilisateur arrive
//      depuis un CTA /contact?service=<id>. Typé strictement via le
//      schéma Zod → toute divergence entre l'URL et SERVICE_OPTIONS est
//      rattrapée en amont par `contactSchema.shape.service.safeParse`
//      côté page.tsx (voir vaccin RSC + validation boundary).
// ─────────────────────────────────────────────────────────────────

interface ContactFormProps {
  initialService?: ContactPayload['service']
}

export function ContactForm({ initialService }: ContactFormProps = {}) {
  const reduced = useReducedMotion() ?? false
  const [state, formAction, isPending] = useActionState<
    ContactActionState,
    FormData
  >(submitContact, initialContactState)

  const formRef = React.useRef<HTMLFormElement>(null)

  // Reset du champ message uniquement après succès
  React.useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
    }
  }, [state.status])

  const errorFor = (field: string) => state.fieldErrors?.[field]

  // Libellé humain du service pré-sélectionné (SERVICE_OPTIONS = source de vérité)
  const preselectedLabel = React.useMemo(() => {
    if (!initialService) return null
    return SERVICE_OPTIONS.find((o) => o.value === initialService)?.label ?? null
  }, [initialService])

  // Icône contextuelle du service pré-sélectionné — résolue via SERVICES_DETAIL
  // puis SERVICE_ICON_MAP. Le `?? null` couvre le cas où `initialService` est
  // valide pour le Zod enum mais absent de SERVICES_DETAIL (ne devrait pas
  // arriver, les deux sources sont alignées — garde-fou défensif).
  const PreselectedIcon = React.useMemo(() => {
    if (!initialService) return null
    const meta = SERVICES_DETAIL.find((s) => s.id === initialService)
    return meta ? SERVICE_ICON_MAP[meta.iconKey] : null
  }, [initialService])

  return (
    <motion.div
      className="rounded-2xl border border-[var(--md-border)] bg-white p-6 shadow-[0_4px_24px_-8px_rgba(16,19,42,0.06)] sm:p-8 lg:p-10"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
    >
      {/* Bandeau confirmation pré-sélection — rassure l'utilisateur sur
          le fait que son choix est pris en compte, tout en lui laissant
          la possibilité de le modifier dans le select ci-dessous. */}
      {preselectedLabel && (
        <div
          role="status"
          className="mb-6 flex items-start gap-3 rounded-xl border border-[var(--md-secondary)]/25 bg-[var(--md-secondary-light)] px-4 py-3.5 text-sm text-[var(--md-primary)]"
        >
          <span
            aria-hidden
            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--md-secondary)]/15 text-[var(--md-secondary-text)]"
          >
            {PreselectedIcon ? (
              <PreselectedIcon size={16} weight="regular" />
            ) : null}
          </span>
          <p className="leading-snug">
            Vous démarrez un projet&nbsp;
            <span className="font-semibold">{preselectedLabel}</span>. Le
            service est déjà pré-sélectionné — modifiable ci-dessous si
            besoin.
          </p>
        </div>
      )}

      <form ref={formRef} action={formAction} className="flex flex-col gap-5" noValidate>
        {/* Honeypot — caché visuellement mais atteignable par les bots */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
          aria-hidden
        />

        {/* ── Grille 2 colonnes sur desktop ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="Votre nom"
            name="name"
            required
            autoComplete="name"
            error={errorFor('name')}
            placeholder="Ex. Awa Diallo"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            required
            autoComplete="email"
            error={errorFor('email')}
            placeholder="vous@exemple.com"
          />
          <Field
            label="Téléphone"
            name="phone"
            type="tel"
            autoComplete="tel"
            optional
            error={errorFor('phone')}
            placeholder="+221 ..."
          />
          <Field
            label="Entreprise"
            name="company"
            autoComplete="organization"
            optional
            error={errorFor('company')}
            placeholder="Nom de votre structure"
          />
        </div>

        {/* ── Service + Budget ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Select
            label="Service souhaité"
            name="service"
            required
            error={errorFor('service')}
            options={SERVICE_OPTIONS}
            placeholder="Choisir un service"
            defaultValue={initialService}
          />
          <Select
            label="Budget indicatif"
            name="budget"
            optional
            error={errorFor('budget')}
            options={BUDGET_OPTIONS}
            placeholder="Fourchette budgétaire"
          />
        </div>

        {/* ── Message ── */}
        <TextArea
          label="Parlez-nous de votre projet"
          name="message"
          required
          error={errorFor('message')}
          placeholder="Décrivez votre projet, vos objectifs et votre délai souhaité…"
          minLength={20}
          maxLength={4000}
        />

        {/* ── Consentement RGPD ── */}
        <label className="flex cursor-pointer items-start gap-3 text-sm text-[var(--md-text-muted)]">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-[var(--md-border-strong)] text-[var(--md-secondary)] focus:ring-2 focus:ring-[var(--md-secondary)] focus:ring-offset-0"
          />
          <span className="leading-snug">
            J&apos;accepte que mes informations soient utilisées pour traiter
            ma demande, conformément à la{' '}
            <a
              href="/politique-confidentialite"
              className="text-[var(--md-secondary-text)] underline underline-offset-2 hover:text-[var(--md-secondary-hover)]"
            >
              politique de confidentialité
            </a>
            .
          </span>
        </label>
        {errorFor('consent') && (
          <p className="-mt-3 text-xs font-medium text-[var(--md-accent)]">
            {errorFor('consent')}
          </p>
        )}

        {/* ── hCaptcha anti-spam ── Widget gracieux : ne rend rien sans
             NEXT_PUBLIC_HCAPTCHA_SITE_KEY. Le token est transmis via
             hidden input `hcaptcha-token` capturé par le server action. */}
        <HCaptchaWidget error={errorFor('hcaptcha')} />

        {/* ── Feedback global ── */}
        {state.status === 'success' && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
          >
            <CheckCircleIcon size={20} weight="fill" className="mt-0.5 shrink-0 text-emerald-600" />
            <div>
              <p className="font-semibold">Message bien reçu.</p>
              <p className="mt-0.5 text-emerald-800/90">{state.message}</p>
            </div>
          </motion.div>
        )}

        {state.status === 'error' && state.message && (
          <motion.div
            role="alert"
            aria-live="assertive"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
          >
            <WarningCircleIcon size={20} weight="fill" className="mt-0.5 shrink-0 text-red-600" />
            <p>{state.message}</p>
          </motion.div>
        )}

        {/* ── Submit ── */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={isPending}
            className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--md-accent)] px-7 py-3.5 text-sm font-bold text-[var(--md-primary)] shadow-[0_10px_30px_-10px_rgba(255,89,100,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-10px_rgba(255,89,100,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isPending ? (
              <>
                <SpinnerGapIcon size={16} weight="bold" className="animate-spin" />
                Envoi en cours…
              </>
            ) : (
              <>
                Envoyer le message
                <PaperPlaneTiltIcon
                  size={16}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </>
            )}
          </button>
          <p className="text-xs text-[var(--md-text-light)]">
            Réponse sous 24h · Échange gratuit · Sans engagement
          </p>
        </div>
      </form>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Sous-composants — Field / Select / TextArea
// ─────────────────────────────────────────────────────────────────

interface FieldBaseProps {
  label: string
  name: string
  required?: boolean
  optional?: boolean
  error?: string
}

function Field({
  label,
  name,
  required,
  optional,
  error,
  type = 'text',
  ...rest
}: FieldBaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col">
      <Label name={name} label={label} required={required} optional={optional} />
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={fieldClass(!!error)}
        {...rest}
      />
      <ErrorMessage id={`${name}-error`} error={error} />
    </div>
  )
}

interface SelectProps extends FieldBaseProps {
  options: readonly { value: string; label: string }[]
  placeholder: string
  defaultValue?: string
}

function Select({
  label,
  name,
  required,
  optional,
  error,
  options,
  placeholder,
  defaultValue,
}: SelectProps) {
  return (
    <div className="flex flex-col">
      <Label name={name} label={label} required={required} optional={optional} />
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          defaultValue={defaultValue ?? ''}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`${fieldClass(!!error)} cursor-pointer appearance-none pr-10`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--md-text-muted)]"
          width="12" height="8" viewBox="0 0 12 8" fill="none"
        >
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <ErrorMessage id={`${name}-error`} error={error} />
    </div>
  )
}

function TextArea({
  label,
  name,
  required,
  error,
  placeholder,
  minLength,
  maxLength,
}: FieldBaseProps & {
  placeholder: string
  minLength?: number
  maxLength?: number
}) {
  const [count, setCount] = React.useState(0)
  return (
    <div className="flex flex-col">
      <div className="flex items-end justify-between">
        <Label name={name} label={label} required={required} />
        {maxLength && (
          <span className="mb-1.5 text-xs tabular-nums text-[var(--md-text-light)]">
            {count} / {maxLength}
          </span>
        )}
      </div>
      <textarea
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        rows={5}
        onChange={(e) => setCount(e.target.value.length)}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${fieldClass(!!error)} resize-y min-h-[140px]`}
      />
      <ErrorMessage id={`${name}-error`} error={error} />
    </div>
  )
}

function Label({
  name, label, required, optional,
}: { name: string; label: string; required?: boolean; optional?: boolean }) {
  return (
    <label htmlFor={name} className="mb-1.5 text-[13px] font-medium text-[var(--md-primary)]">
      {label}
      {required && <span className="ml-1 text-[var(--md-accent)]">*</span>}
      {optional && (
        <span className="ml-1.5 text-[11px] font-normal text-[var(--md-text-light)]">
          (optionnel)
        </span>
      )}
    </label>
  )
}

function ErrorMessage({ id, error }: { id: string; error?: string }) {
  if (!error) return null
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-[var(--md-accent)]">
      {error}
    </p>
  )
}

function fieldClass(hasError: boolean) {
  const base =
    'w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-[var(--md-primary)] placeholder:text-[var(--md-text-light)] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-70'
  if (hasError) {
    return `${base} border-[var(--md-accent)] focus:border-[var(--md-accent)] focus:ring-[var(--md-accent)]/20`
  }
  return `${base} border-[var(--md-border)] focus:border-[var(--md-secondary)] focus:ring-[var(--md-secondary)]/20`
}
