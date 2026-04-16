'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  BinocularsIcon,
  MapTrifoldIcon,
  PencilRulerIcon,
  RocketLaunchIcon,
} from '@phosphor-icons/react'
import { EASE_OUT_EXPR as EASE } from '@/lib/motion'
import type { PhosphorIcon } from '@/lib/types'

// ─────────────────────────────────────────────────────────────────
//  DONNÉES — Les 4 étapes du processus Mossine Digital
// ─────────────────────────────────────────────────────────────────

interface Step {
  number: string
  icon: PhosphorIcon
  title: string
  description: string
  detail: string
}

const STEPS: Step[] = [
  {
    number: '01',
    icon: BinocularsIcon,
    title: 'Découverte & Audit',
    description: 'On commence par vous écouter vraiment.',
    detail:
      'Analyse de votre marché, de vos concurrents, de vos objectifs et de vos contraintes. Un diagnostic complet avant toute action.',
  },
  {
    number: '02',
    icon: MapTrifoldIcon,
    title: 'Stratégie & Planning',
    description: 'Une roadmap claire, sans jargon.',
    detail:
      "Co-construction d'un plan d'action sur mesure avec jalons, livrables et budget définis. Vous validez chaque étape.",
  },
  {
    number: '03',
    icon: PencilRulerIcon,
    title: 'Création & Développement',
    description: "L'expertise à l'œuvre.",
    detail:
      'Conception et production de vos actifs digitaux par nos experts : design, code, contenu et campagnes. Itérations rapides, résultats concrets.',
  },
  {
    number: '04',
    icon: RocketLaunchIcon,
    title: 'Lancement & Suivi',
    description: 'On ne disparaît pas après livraison.',
    detail:
      'Déploiement soigné, suivi des performances, ajustements continus et reporting transparent. Votre succès est notre indicateur.',
  },
]

// ─────────────────────────────────────────────────────────────────
//  COMPOSANT PRINCIPAL : Processus
// ─────────────────────────────────────────────────────────────────

export function Processus() {
  const reduced = useReducedMotion() ?? false

  return (
    <section
      id="processus"
      aria-label="Notre processus de travail"
      className="bg-[var(--md-bg)]"
      style={{
        paddingTop: 'var(--md-space-section)',
        paddingBottom: 'var(--md-space-section)',
      }}
    >
      <div className="container-md">
        {/* En-tête */}
        <motion.div
          className="mb-16 max-w-2xl"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--md-secondary)]">
            Comment on travaille
          </p>
          <h2
            className="font-[family-name:var(--md-font-display)] text-[var(--md-primary)]"
            style={{
              fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
            }}
          >
            Un processus{' '}
            <span className="text-[var(--md-secondary)]">transparent</span>
            {', '}de bout en bout
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--md-text-muted)]">
            Pas de surprise, pas de dérive. Chaque projet suit une méthode
            éprouvée pour livrer dans les délais, dans le budget et au-delà
            de vos attentes.
          </p>
        </motion.div>

        {/* Grille des étapes — stagger séquentiel */}
        <motion.div
          className="relative grid grid-cols-1 gap-0 md:grid-cols-4"
          initial={reduced ? false : 'hidden'}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
          }}
        >

          {/* Ligne connectrice horizontale (desktop uniquement)
              — position calculée dynamiquement : centre de la 1re col → centre de la dernière,
              décalée du rayon du cercle (20px). Robuste à un changement de STEPS.length. */}
          <div
            aria-hidden
            className="absolute top-[52px] hidden h-[2px] md:block"
            style={{
              left: `calc(${100 / STEPS.length / 2}% + 20px)`,
              right: `calc(${100 / STEPS.length / 2}% + 20px)`,
              background:
                'linear-gradient(to right, var(--md-secondary-light), var(--md-secondary), var(--md-secondary-light))',
            }}
          />

          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                className="relative flex flex-col md:items-center md:text-center"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
                }}
              >
                {/* Numéro + Icône */}
                <div className="relative z-10 mb-6 flex items-center gap-4 md:flex-col md:gap-3">
                  {/* Cercle numéroté */}
                  <div
                    className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-2 border-[var(--md-secondary)] bg-white font-[family-name:var(--md-font-display)] text-sm font-bold text-[var(--md-secondary)]"
                    aria-hidden
                  >
                    {step.number}
                  </div>

                  {/* Trait vertical (mobile) */}
                  {index < STEPS.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute left-[25px] top-[52px] h-full w-[2px] translate-x-[-50%] bg-[var(--md-secondary-light)] md:hidden"
                    />
                  )}

                  {/* Icône */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--md-secondary-light)] text-[var(--md-secondary)] md:hidden">
                    <Icon size={20} weight="regular" />
                  </div>
                </div>

                {/* Icône desktop (centrée) */}
                <div className="mb-4 hidden h-10 w-10 items-center justify-center rounded-xl bg-[var(--md-secondary-light)] text-[var(--md-secondary)] md:flex">
                  <Icon size={20} weight="regular" />
                </div>

                {/* Contenu textuel */}
                <div className="pb-12 pl-[calc(52px+1rem+10px)] md:pb-0 md:pl-0 md:px-5">
                  <h3
                    className="mb-1 font-[family-name:var(--md-font-display)] font-semibold text-[var(--md-primary)]"
                    style={{ fontSize: 'clamp(0.95rem, 1vw + 0.5rem, 1.1rem)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="mb-2 text-sm font-medium text-[var(--md-secondary)]">
                    {step.description}
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--md-text-muted)]">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
