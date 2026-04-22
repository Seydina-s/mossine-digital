'use client'

import * as React from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  BinocularsIcon,
  MapTrifoldIcon,
  PencilRulerIcon,
  RocketLaunchIcon,
} from '@phosphor-icons/react'
import { EASE_OUT_EXPR as EASE } from '@/lib/motion'
import type { PhosphorIcon } from '@/lib/types'

// ─────────────────────────────────────────────────────────────────
//  Processus — roadmap animée scroll-triggered (style Stripe / Vercel).
//
//  Architecture anti-jank (⚠️ vaccin dette v3.3, cf. CLAUDE.md) :
//  un SEUL `useScroll({ target })` au niveau de la section. Chaque
//  étape dérive sa progression individuelle via `useTransform` sur le
//  même MotionValue racine — zéro `getBoundingClientRect()` par étape
//  à chaque frame. Interdit d'ajouter un `useScroll` par STEP sous
//  peine de réintroduire le layout thrash documenté sur Services.
//
//  Path SVG : ligne verticale qui se "dessine" (strokeDashoffset 1→0)
//  au fur et à mesure du scroll. Nœuds scalent + fade à leur seuil
//  respectif (threshold calculé depuis l'index). Prefers-reduced-motion :
//  path entièrement dessiné + nœuds statiques, zéro animation.
// ─────────────────────────────────────────────────────────────────

interface Step {
  number: string
  icon: PhosphorIcon
  title: string
  description: string
  detail: string
  accent: 'blue' | 'red'
}

const STEPS: readonly Step[] = [
  {
    number: '01',
    icon: BinocularsIcon,
    title: 'Découverte & Audit',
    description: 'On commence par vous écouter vraiment.',
    detail:
      'Analyse du marché, des concurrents, des objectifs et des contraintes. Un diagnostic complet avant toute action — pas de livrable sans cadrage préalable.',
    accent: 'blue',
  },
  {
    number: '02',
    icon: MapTrifoldIcon,
    title: 'Stratégie & Planning',
    description: 'Une roadmap claire, sans jargon.',
    detail:
      "Co-construction d'un plan d'action sur mesure : jalons, livrables, budget et KPIs définis ensemble. Vous validez chaque étape avant qu'on passe à la suivante.",
    accent: 'blue',
  },
  {
    number: '03',
    icon: PencilRulerIcon,
    title: 'Création & Développement',
    description: "L'expertise à l'œuvre.",
    detail:
      'Production de vos actifs digitaux : design, code, contenus, campagnes. Itérations rapides avec revues hebdomadaires pour ajuster dès les premiers signaux.',
    accent: 'red',
  },
  {
    number: '04',
    icon: RocketLaunchIcon,
    title: 'Lancement & Suivi',
    description: 'On ne disparaît pas après la livraison.',
    detail:
      'Déploiement soigné, suivi des performances, ajustements continus et reporting transparent. Votre succès est notre seul indicateur de réussite.',
    accent: 'red',
  },
]

// Position verticale (%) de chaque nœud sur le path — répartis
// uniformément avec marges haut/bas pour respirer.
const NODE_POSITIONS = STEPS.map((_, i) => 0.08 + (i / (STEPS.length - 1)) * 0.84)

export function Processus() {
  const reduced = useReducedMotion() ?? false
  const sectionRef = React.useRef<HTMLElement>(null)

  // UN SEUL useScroll pour toute la section — cf. vaccin en haut du fichier.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.15'],
  })

  // Path : strokeDashoffset de 1 (invisible) à 0 (entièrement tracé).
  const pathDrawProgress = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section
      id="processus"
      ref={sectionRef}
      aria-label="Notre processus de travail"
      className="relative bg-[var(--md-bg)]"
      style={{
        paddingTop: 'var(--md-space-section)',
        paddingBottom: 'var(--md-space-section)',
      }}
    >
      <div className="container-md relative">
        {/* En-tête */}
        <motion.div
          className="mx-auto mb-20 max-w-2xl text-center"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--md-secondary-text)]">
            Comment on travaille
          </p>
          <h2
            className="font-[family-name:var(--md-font-display)] text-[var(--md-primary)]"
            style={{
              fontSize: 'clamp(2rem, 3.5vw + 0.3rem, 3.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
            }}
          >
            Un processus{' '}
            <span className="italic text-[var(--md-secondary-text)]">
              transparent
            </span>
            , de bout en bout.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--md-text-muted)] sm:text-base">
            Pas de surprise, pas de dérive. Chaque projet suit les mêmes quatre
            temps — pour livrer dans les délais, dans le budget, et au-delà
            des attentes.
          </p>
        </motion.div>

        {/* Roadmap — SVG path + cards alternées */}
        <div className="relative mx-auto max-w-5xl">
          {/* Path SVG desktop (ligne verticale centrale qui se dessine) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block"
            width="40"
            viewBox="0 0 40 1000"
            preserveAspectRatio="none"
            style={{ height: '100%' }}
          >
            <defs>
              <linearGradient id="processus-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--md-secondary)" />
                <stop offset="50%" stopColor="var(--md-secondary)" />
                <stop offset="100%" stopColor="var(--md-accent)" />
              </linearGradient>
            </defs>

            {/* Rail de fond (toujours visible, discret) */}
            <line
              x1="20"
              y1="0"
              x2="20"
              y2="1000"
              stroke="var(--md-border)"
              strokeWidth="2"
            />

            {/* Rail progressif (dessiné au scroll) */}
            <motion.line
              x1="20"
              y1="0"
              x2="20"
              y2="1000"
              stroke="url(#processus-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: reduced ? 0 : pathDrawProgress,
              }}
            />
          </svg>

          {/* Rail mobile (vertical à gauche, simple) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-[20px] top-0 h-full md:hidden"
            width="4"
            viewBox="0 0 4 1000"
            preserveAspectRatio="none"
            style={{ height: '100%' }}
          >
            <line x1="2" y1="0" x2="2" y2="1000" stroke="var(--md-border)" strokeWidth="2" />
            <motion.line
              x1="2"
              y1="0"
              x2="2"
              y2="1000"
              stroke="var(--md-secondary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: reduced ? 0 : pathDrawProgress,
              }}
            />
          </svg>

          {/* Liste des étapes */}
          <ol role="list" className="relative flex flex-col gap-24 md:gap-28">
            {STEPS.map((step, i) => (
              <RoadmapStep
                key={step.number}
                step={step}
                index={i}
                threshold={NODE_POSITIONS[i]}
                scrollYProgress={scrollYProgress}
                reduced={reduced}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  RoadmapStep — une étape de la roadmap.
//  Reçoit le MotionValue parent (scrollYProgress) — NE CRÉE PAS
//  son propre useScroll (cf. vaccin dette v3.3).
// ─────────────────────────────────────────────────────────────────

interface RoadmapStepProps {
  step: Step
  index: number
  threshold: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  reduced: boolean
}

function RoadmapStep({
  step,
  index,
  threshold,
  scrollYProgress,
  reduced,
}: RoadmapStepProps) {
  const Icon = step.icon
  const isLeft = index % 2 === 0

  // Fenêtre d'activation : le nœud s'active au seuil + 5% d'avance.
  const start = Math.max(0, threshold - 0.08)
  const nodeOpacity = useTransform(scrollYProgress, [start, threshold], [0.3, 1])
  const nodeScale = useTransform(scrollYProgress, [start, threshold], [0.7, 1])

  const accentVar =
    step.accent === 'blue' ? 'var(--md-secondary)' : 'var(--md-accent)'
  const accentText =
    step.accent === 'blue' ? 'var(--md-secondary-text)' : 'var(--md-accent-solid)'
  const accentLight =
    step.accent === 'blue'
      ? 'var(--md-secondary-light)'
      : 'rgba(255,89,100,0.12)'

  return (
    <li
      className="relative grid grid-cols-1 items-center gap-0 md:grid-cols-2 md:gap-16"
      aria-labelledby={`step-${step.number}-title`}
    >
      {/* Nœud central (desktop : sur le rail) + mobile (sur le rail gauche) */}
      <motion.div
        aria-hidden
        className="absolute left-[20px] top-4 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-[3px] bg-white shadow-[0_4px_20px_rgba(27,31,59,0.08)] md:left-1/2 md:top-1/2 md:-translate-y-1/2"
        style={{
          borderColor: accentVar,
          color: accentText,
          opacity: reduced ? 1 : nodeOpacity,
          scale: reduced ? 1 : nodeScale,
        }}
      >
        <Icon size={18} weight="regular" />
      </motion.div>

      {/* Card contenu — alternance gauche/droite desktop */}
      <motion.div
        className={[
          'pl-16 md:pl-0',
          isLeft ? 'md:col-start-1 md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12',
        ].join(' ')}
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
      >
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.2em]"
          style={{ backgroundColor: accentLight, color: accentText }}
        >
          Étape {step.number}
        </span>
        <h3
          id={`step-${step.number}-title`}
          className="mt-4 font-[family-name:var(--md-font-display)] text-[var(--md-primary)]"
          style={{
            fontSize: 'clamp(1.35rem, 1.8vw + 0.5rem, 1.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
          }}
        >
          {step.title}
        </h3>
        <p
          className="mt-3 text-[15px] font-medium sm:text-base"
          style={{ color: accentText }}
        >
          {step.description}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--md-text-muted)] sm:text-base">
          {step.detail}
        </p>
      </motion.div>

    </li>
  )
}
