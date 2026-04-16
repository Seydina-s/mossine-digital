import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeftIcon, HouseIcon } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Page introuvable',
  description:
    "La page que vous cherchez n'existe pas ou a été déplacée. Retour à l'accueil de Mossine Digital.",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main
      id="contenu-principal"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--md-primary)] px-5 py-20 text-white"
    >
      {/* ─── Aurora atmosphère (cohérent avec Hero) ─── */}
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
              'radial-gradient(circle, rgba(255,89,100,0.22) 0%, transparent 65%)',
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
        {/* ─── Code erreur éditorial ─── */}
        <p
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--md-secondary)]"
          aria-hidden
        >
          Erreur 404
        </p>

        <h1
          className="mt-4 font-[family-name:var(--md-font-display)] leading-[0.95]"
          style={{
            fontSize: 'clamp(3rem, 10vw + 1rem, 7rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
          }}
        >
          Page{' '}
          <span className="italic text-[var(--md-secondary)]">introuvable</span>
          .
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-[17px]">
          La page que vous cherchez a peut-être été déplacée, renommée, ou
          n&apos;a jamais existé. Reprenons depuis le début.
        </p>

        {/* ─── CTAs ─── */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--md-primary)] shadow-[0_12px_28px_-10px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--md-secondary)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--md-primary)] sm:w-auto"
          >
            <HouseIcon size={16} weight="bold" />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--md-primary)] sm:w-auto"
          >
            <ArrowLeftIcon
              size={14}
              weight="bold"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Nous contacter
          </Link>
        </div>
      </div>
    </main>
  )
}
