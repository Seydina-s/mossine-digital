'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ClockCountdownIcon,
  SparkleIcon,
  GlobeHemisphereWestIcon,
  ShieldCheckIcon,
} from '@phosphor-icons/react'
import { EASE_OUT_EXPR as EASE } from '@/lib/motion'
import type { PhosphorIcon } from '@/lib/types'

// ─────────────────────────────────────────────────────────────────
//  DONNÉES — Engagements (pas chiffres de track-record)
//  Promesses opérationnelles vérifiables, valides avant 1er client.
// ─────────────────────────────────────────────────────────────────

interface Stat {
  value: number
  suffix: string
  label: string
  description: string
  icon: PhosphorIcon
}

const STATS: Stat[] = [
  {
    value: 24,
    suffix: 'h',
    label: 'Réponse garantie',
    description: 'Un retour humain sous 24h ouvrées, devis inclus',
    icon: ClockCountdownIcon,
  },
  {
    value: 100,
    suffix: '%',
    label: 'Sur-mesure',
    description: 'Zéro template, chaque projet est conçu de zéro',
    icon: SparkleIcon,
  },
  {
    value: 360,
    suffix: '°',
    label: 'Communication intégrée',
    description: 'Branding, web, social media et SEO pensés ensemble',
    icon: GlobeHemisphereWestIcon,
  },
  {
    value: 90,
    suffix: '+',
    label: 'Score Lighthouse',
    description: 'Performance, SEO et accessibilité audités avant chaque mise en ligne',
    icon: ShieldCheckIcon,
  },
]

// ─────────────────────────────────────────────────────────────────
//  HOOK — CountUp animé via IntersectionObserver + rAF
//  Respecte prefers-reduced-motion automatiquement
// ─────────────────────────────────────────────────────────────────

function useCountUp(end: number, duration = 1800) {
  const [value, setValue] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)
  const hasAnimated = React.useRef(false)

  React.useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced) {
      setValue(end)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          // rootMargin négatif évite le trigger trop précoce ; threshold complémentaire
          // (0.4) dans les options ci-dessous.
          hasAnimated.current = true
          const startTime = performance.now()

          const update = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // easeOutExpo — décélération rapide et douce
            const ease =
              progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            setValue(Math.round(end * ease))
            if (progress < 1) requestAnimationFrame(update)
          }

          requestAnimationFrame(update)
        }
      },
      { threshold: 0.4, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return { value, ref }
}

// ─────────────────────────────────────────────────────────────────
//  SOUS-COMPOSANT — Carte d'une statistique individuelle
// ─────────────────────────────────────────────────────────────────

function StatCard({ stat }: { stat: Stat }) {
  const { value, ref } = useCountUp(stat.value)
  const Icon = stat.icon

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-3 px-8 py-10 text-center md:items-start md:text-left"
    >
      {/* Icône dans un conteneur coloré */}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--md-secondary-light)]">
        <Icon
          size={22}
          weight="regular"
          className="text-[var(--md-secondary)]"
        />
      </div>

      {/* Nombre animé + suffixe */}
      <div
        className="font-[family-name:var(--md-font-display)] leading-none"
        aria-label={`${stat.value}${stat.suffix}`}
      >
        <span
          style={{
            fontSize: 'clamp(2.75rem, 4vw + 0.75rem, 4.75rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: 'var(--md-primary)',
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontSize: 'clamp(1.5rem, 2vw + 0.5rem, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--md-secondary)',
          }}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Label principal */}
      <p
        className="font-[family-name:var(--md-font-display)] font-semibold text-[var(--md-primary)]"
        style={{ fontSize: 'clamp(0.95rem, 1vw + 0.4rem, 1.125rem)' }}
      >
        {stat.label}
      </p>

      {/* Description secondaire */}
      <p className="max-w-[200px] text-sm leading-relaxed text-[var(--md-text-muted)] md:max-w-none">
        {stat.description}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
//  COMPOSANT PRINCIPAL : Stats
// ─────────────────────────────────────────────────────────────────

export function Stats() {
  const reduced = useReducedMotion() ?? false

  return (
    <section
      aria-label="Nos engagements"
      className="bg-[var(--md-bg)]"
      style={{
        paddingTop: 'var(--md-space-section)',
        paddingBottom: 'var(--md-space-section)',
      }}
    >
      <div className="container-md">
        {/* En-tête */}
        <motion.div
          className="mb-14 text-center"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--md-secondary)]">
            Nos engagements
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
            Ce qu&apos;on vous promet,{' '}
            <span className="text-[var(--md-secondary)]">
              noir sur blanc
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[var(--md-text-muted)]">
            Pas de bla-bla ni de chiffres gonflés. Voici les règles auxquelles
            on se tient sur chaque projet, du premier mail à la mise en ligne.
          </p>
        </motion.div>

        {/* Grille 4 colonnes — séparateurs visuels, stagger à l'entrée */}
        <motion.div
          className="grid grid-cols-1 divide-y divide-[var(--md-border)] sm:grid-cols-2 sm:divide-y-0 sm:[&>*:nth-child(n+3)]:border-t sm:[&>*:nth-child(n+3)]:border-[var(--md-border)] md:grid-cols-4 md:[&>*:nth-child(n+3)]:border-t-0 md:divide-x"
          initial={reduced ? false : 'hidden'}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.3 },
            },
          }}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
            >
              <StatCard stat={stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
