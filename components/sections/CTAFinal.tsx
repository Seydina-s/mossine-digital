'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { GlassCTA } from '@/components/ui/glass-cta'

// ─────────────────────────────────────────────────────────────────
//  COMPOSANT : CTAFinal — Section d'appel à l'action principal
//  Fond : #FF5964 (var(--md-accent)) — apparaît une seule fois sur le site
// ─────────────────────────────────────────────────────────────────

export function CTAFinal() {
  return (
    <section
      id="cta"
      aria-label="Démarrer un projet avec Mossine Digital"
      className="relative overflow-hidden bg-[var(--md-accent)]"
      style={{
        paddingTop: 'var(--md-space-section)',
        paddingBottom: 'var(--md-space-section)',
      }}
    >
      {/* Texture grain subtile pour casser la couleur plate */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'var(--md-grain-url)' }}
      />

      {/* Cercle décoratif en arrière-plan (droit) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/[0.05] md:h-[500px] md:w-[500px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-white/[0.04] md:h-96 md:w-96"
      />

      <div className="container-md relative z-10">
        <div className="flex flex-col items-center gap-8 text-center">

          {/* Badge */}
          <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
            On est prêts. Et vous ?
          </span>

          {/* Titre principal */}
          <h2
            className="font-[family-name:var(--md-font-display)] text-white text-balance"
            style={{
              fontSize: 'clamp(2rem, 4vw + 0.75rem, 3.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              maxWidth: '800px',
            }}
          >
            Prêts à transformer votre marque en avantage compétitif ?
          </h2>

          {/* Sous-titre */}
          <p
            className="max-w-lg font-[family-name:var(--md-font-body)] leading-relaxed text-white/70"
            style={{ fontSize: 'clamp(0.95rem, 1vw + 0.5rem, 1.125rem)' }}
          >
            Un premier échange suffit pour savoir si on peut vous aider.
            C&apos;est gratuit, sans engagement et souvent révélateur.
          </p>

          {/* Boutons CTA — principal + secondaire */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <GlassCTA href="/contact" tone="accent" size="lg">
              Démarrer un projet
              <ArrowUpRightIcon size={15} weight="bold" />
            </GlassCTA>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--md-accent)]"
            >
              Voir nos réalisations
            </Link>
          </div>

          {/* Réassurance — #1B1F3B sur #FF5964 = 5.6:1 (WCAG AA ✓) */}
          <p className="text-xs font-medium text-[var(--md-primary)]">
            Réponse sous 24h · Devis gratuit · Sans engagement
          </p>
        </div>
      </div>
    </section>
  )
}
