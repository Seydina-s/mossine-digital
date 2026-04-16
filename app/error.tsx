'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  ArrowClockwiseIcon,
  HouseIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react'

// ─────────────────────────────────────────────────────────────────
//  Error boundary global — Next.js App Router
//  Affiché lorsqu'une erreur non capturée survient dans l'arbre React.
//  En prod, le `digest` permet de retrouver l'erreur côté Sentry.
// ─────────────────────────────────────────────────────────────────

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // En prod, remonter vers Sentry (à brancher Sprint 5)
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('[Mossine] Error boundary triggered:', error)
    }
  }, [error])

  return (
    <main
      id="contenu-principal"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--md-primary)] px-5 py-20 text-white"
      role="alert"
    >
      {/* ─── Aurora atmosphère — cohérent avec Hero et 404 ─── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="md-aurora-1 absolute -left-1/4 top-0 h-[90%] w-[70%] rounded-full blur-[140px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,89,100,0.28) 0%, transparent 60%)',
          }}
        />
        <div
          className="md-aurora-2 absolute -right-1/4 top-1/4 h-[70%] w-[60%] rounded-full blur-[140px]"
          style={{
            background:
              'radial-gradient(circle, rgba(53,167,255,0.22) 0%, transparent 65%)',
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
        {/* ─── Icône d'alerte ─── */}
        <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[var(--md-accent)]/30 bg-[var(--md-accent)]/10 backdrop-blur-sm">
          <WarningCircleIcon
            size={28}
            weight="regular"
            className="text-[var(--md-accent)]"
          />
        </div>

        <p
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--md-accent)]"
          aria-hidden
        >
          Erreur interne
        </p>

        <h1
          className="mt-4 font-[family-name:var(--md-font-display)] leading-[0.95]"
          style={{
            fontSize: 'clamp(2.25rem, 6vw + 0.5rem, 4.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
          }}
        >
          Quelque chose s&apos;est{' '}
          <span className="italic text-[var(--md-accent)]">mal passé</span>.
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-[17px]">
          Nous sommes désolés pour la gêne. L&apos;incident a été enregistré
          et notre équipe en a été notifiée. Vous pouvez réessayer ou revenir
          à l&apos;accueil.
        </p>

        {/* ─── Digest technique (prod) ─── */}
        {error.digest && (
          <p className="mt-4 font-mono text-[11px] tracking-[0.15em] text-white/30">
            Référence :{' '}
            <span className="text-white/50">{error.digest}</span>
          </p>
        )}

        {/* ─── CTAs ─── */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--md-primary)] shadow-[0_12px_28px_-10px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--md-secondary)] hover:text-white sm:w-auto"
          >
            <ArrowClockwiseIcon
              size={16}
              weight="bold"
              className="transition-transform duration-500 group-hover:rotate-180"
            />
            Réessayer
          </button>
          <Link
            href="/"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 sm:w-auto"
          >
            <HouseIcon size={14} weight="bold" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
