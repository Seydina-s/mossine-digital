import Link from 'next/link'
import {
  ArrowRightIcon,
  HouseIcon,
  EnvelopeSimpleIcon,
} from '@phosphor-icons/react/dist/ssr'

// ─────────────────────────────────────────────────────────────────
//  ComingSoon — stub partagé pour pages en cours de finalisation.
//  Cohérent avec not-found.tsx : Aurora + H1 italique + 2 CTAs.
//  Server component (pas de 'use client') — SSR direct.
// ─────────────────────────────────────────────────────────────────

interface ComingSoonProps {
  /** Petit label au-dessus du titre (ex: "Page Services") */
  eyebrow: string
  /** Mot accentué en italique dans le titre */
  accent: string
  /** Reste du titre avant l'accent */
  titlePrefix?: string
  /** Reste du titre après l'accent (optionnel) */
  titleSuffix?: string
  /** Paragraphe descriptif */
  description: string
  /** Libellé du CTA secondaire (par défaut : "Nous contacter") */
  secondaryCtaLabel?: string
  /** Lien du CTA secondaire (par défaut : "/contact") */
  secondaryCtaHref?: string
}

export function ComingSoon({
  eyebrow,
  accent,
  titlePrefix,
  titleSuffix,
  description,
  secondaryCtaLabel = 'Nous contacter',
  secondaryCtaHref = '/contact',
}: ComingSoonProps) {
  return (
    <main
      id="contenu-principal"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--md-primary)] px-5 py-20 text-white"
    >
      {/* ─── Aurora atmosphère — cohérent avec Hero/404 ─── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="md-aurora-1 absolute -left-1/4 top-0 h-[90%] w-[70%] rounded-full blur-[140px]"
          style={{
            background:
              'radial-gradient(circle, rgba(53,167,255,0.28) 0%, transparent 60%)',
          }}
        />
        <div
          className="md-aurora-2 absolute -right-1/4 top-1/4 h-[70%] w-[60%] rounded-full blur-[140px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,89,100,0.18) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(16,19,42,0.6) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* ─── Eyebrow ─── */}
        <p
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--md-secondary)]"
          aria-hidden
        >
          {eyebrow}
        </p>

        {/* ─── Titre ─── */}
        <h1
          className="mt-4 font-[family-name:var(--md-font-display)] leading-[0.95]"
          style={{
            fontSize: 'clamp(2.5rem, 8vw + 1rem, 5.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
          }}
        >
          {titlePrefix && <>{titlePrefix} </>}
          <span className="italic text-[var(--md-secondary)]">{accent}</span>
          {titleSuffix && <>{titleSuffix}</>}
        </h1>

        {/* ─── Badge "en préparation" ─── */}
        <p className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--md-secondary)] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--md-secondary)]" />
          </span>
          Page en préparation
        </p>

        {/* ─── Description ─── */}
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-[17px]">
          {description}
        </p>

        {/* ─── CTAs ─── */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--md-primary)] shadow-[0_12px_28px_-10px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--md-secondary)] hover:text-white sm:w-auto"
          >
            <HouseIcon size={16} weight="bold" />
            Retour à l&apos;accueil
          </Link>
          <Link
            href={secondaryCtaHref}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 sm:w-auto"
          >
            {secondaryCtaHref === '/contact' ? (
              <EnvelopeSimpleIcon size={15} weight="bold" />
            ) : null}
            {secondaryCtaLabel}
            <ArrowRightIcon
              size={14}
              weight="bold"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </main>
  )
}
