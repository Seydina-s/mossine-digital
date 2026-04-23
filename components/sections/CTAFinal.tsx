'use client'

import * as React from 'react'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { GlassCTA } from '@/components/ui/glass-cta'

// ─────────────────────────────────────────────────────────────────
//  COMPOSANT : CTAFinal — Section d'appel à l'action principal
//  Fond : #C23A46 (var(--md-accent-solid)) — porteur de texte blanc
//  conforme WCAG AA (5.25:1). L'accent vif #FF5964 reste pour les
//  décors seulement (halos, gradient bars). Apparition unique sur le site.
// ─────────────────────────────────────────────────────────────────

export function CTAFinal() {
  return (
    <section
      id="cta"
      aria-label="Démarrer un projet avec Mossine Digital"
      className="relative overflow-hidden bg-[var(--md-accent-solid)]"
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

          {/* Badge — blanc plein sur #C23A46 = 5.25:1 (WCAG AA ✓) */}
          <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
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

          {/* Sous-titre — white/90 sur #C23A46 = 4.54:1 (WCAG AA ✓ texte normal) */}
          <p
            className="max-w-lg font-[family-name:var(--md-font-body)] leading-relaxed text-white/90"
            style={{ fontSize: 'clamp(0.95rem, 1vw + 0.5rem, 1.125rem)' }}
          >
            Un premier échange suffit pour savoir si on peut vous aider.
            C&apos;est gratuit, sans engagement et souvent révélateur.
          </p>

          {/* CTA principal — secondaire "Voir nos réalisations" retiré en attendant
              d'avoir des cas clients publiables (cf. commentaire app/page.tsx) */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <GlassCTA
              href="/contact"
              tone="accent"
              size="lg"
              trackingLocation="cta_final"
              trackingLabel="Démarrer un projet"
            >
              Démarrer un projet
              <ArrowUpRightIcon size={15} weight="bold" />
            </GlassCTA>
          </div>

          {/* Réassurance — blanc sur #C23A46 = 5.25:1 (WCAG AA ✓).
              Note : sur le fond vif #FF5964 d'origine, on utilisait le primary
              dark (5.6:1). Avec l'assombrissement du bg vers #C23A46, le
              primary tombe à 2.74:1 → passage au blanc obligatoire. */}
          <p className="text-xs font-medium text-white">
            Réponse sous 24h · Devis gratuit · Sans engagement
          </p>
        </div>
      </div>
    </section>
  )
}
