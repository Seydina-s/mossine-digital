'use client'

import * as React from 'react'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion'
import { ArrowLeftIcon, ArrowRightIcon, QuotesIcon } from '@phosphor-icons/react'

// ─────────────────────────────────────────────────────────────────
//  DONNÉES — ⚠️ TODO_CLIENT : remplacer par de vrais témoignages
//  Format attendu : nom complet, poste, entreprise, texte du témoignage
//  Optionnel : photo du client (public/images/sections/avatar-N.webp)
// ─────────────────────────────────────────────────────────────────

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  initials: string
}

// ⚠️ TODO_CLIENT : Ces témoignages sont en cours de collecte.
// Remplacer par les vrais témoignages dès réception.
// Format attendu : nom complet, poste, entreprise, texte du témoignage.

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Amira Bensaid',
    role: 'Directrice marketing',
    company: 'Zenith Consulting',
    content:
      '« Mossine Digital a entièrement transformé notre image de marque. En quelques semaines, nous avions un site web qui convertit réellement, une identité visuelle cohérente et une stratégie digitale actionnable. Le travail est d\'une qualité rare. »',
    initials: 'AB',
  },
  {
    id: 2,
    name: 'Karim Touré',
    role: 'Fondateur & CEO',
    company: 'Innovatech Group',
    content:
      '« J\'ai été impressionné par la rigueur et la créativité de l\'équipe. Ils ont su capter l\'essence de notre vision et la traduire en une présence digitale qui nous distingue vraiment de nos concurrents. Je recommande sans hésiter. »',
    initials: 'KT',
  },
  {
    id: 3,
    name: 'Sophie Marchand',
    role: 'Responsable communication',
    company: 'Atelier Lumière',
    content:
      '« Un accompagnement professionnel de bout en bout. Mossine Digital n\'est pas un prestataire classique : ce sont de vrais partenaires qui s\'investissent comme si c\'était leur propre entreprise. Les résultats parlent d\'eux-mêmes. »',
    initials: 'SM',
  },
]

// ─────────────────────────────────────────────────────────────────
//  COMPOSANT PRINCIPAL : Temoignages
// ─────────────────────────────────────────────────────────────────

// Durée volontairement longue pour laisser le temps de lire un témoignage
// complet (~250 mots). Pause au hover/focus + respect reduced-motion.
const AUTO_INTERVAL_MS = 7000

export function Temoignages() {
  const [current, setCurrent] = React.useState(0)
  const [direction, setDirection] = React.useState<1 | -1>(1)
  const [isPaused, setIsPaused] = React.useState(false)
  const reducedMotion = useReducedMotion() ?? false

  const total = TESTIMONIALS.length

  const goTo = (index: number, dir: 1 | -1) => {
    setDirection(dir)
    setCurrent(index)
  }

  const prev = () => goTo((current - 1 + total) % total, -1)
  const next = () => goTo((current + 1) % total, 1)

  // Défilement automatique — pause au survol/focus et si reduced motion
  React.useEffect(() => {
    if (reducedMotion || isPaused) return
    const id = setTimeout(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % total)
    }, AUTO_INTERVAL_MS)
    return () => clearTimeout(id)
  }, [current, isPaused, reducedMotion, total])

  // Variants d'animation pour le slide
  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? -60 : 60,
      opacity: 0,
    }),
  }

  const testimonial = TESTIMONIALS[current]

  return (
    <section
      id="temoignages"
      aria-label="Témoignages clients"
      className="bg-[var(--md-primary)]"
      style={{
        paddingTop: 'var(--md-space-section)',
        paddingBottom: 'var(--md-space-section)',
      }}
    >
      <div className="container-md">
        {/* En-tête */}
        <div className="mb-14 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--md-secondary)]">
              Ils nous font confiance
            </p>
            <h2
              className="font-[family-name:var(--md-font-display)] text-white"
              style={{
                fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              Ce que disent{' '}
              <span className="text-[var(--md-secondary)]">nos clients</span>
            </h2>
          </div>

          {/* Boutons navigation desktop */}
          <div className="hidden gap-3 sm:flex" role="group" aria-label="Navigation témoignages">
            <button
              onClick={prev}
              aria-label="Témoignage précédent"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors duration-200 hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--md-secondary)]"
            >
              <ArrowLeftIcon size={18} weight="regular" />
            </button>
            <button
              onClick={next}
              aria-label="Témoignage suivant"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors duration-200 hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--md-secondary)]"
            >
              <ArrowRightIcon size={18} weight="regular" />
            </button>
          </div>
        </div>

        {/* Zone du témoignage — pause auto-rotation au hover/focus */}
        <div
          className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] p-8 sm:p-12 md:p-14"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >

          {/* Icône guillemet décorative */}
          <QuotesIcon
            aria-hidden
            size={48}
            weight="fill"
            className="mb-6 text-[var(--md-secondary)] opacity-30"
          />

          {/* Contenu animé */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={reducedMotion ? {} : variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Texte du témoignage */}
              <blockquote
                className="mb-10 font-[family-name:var(--md-font-body)] italic leading-relaxed text-white/80"
                style={{
                  fontSize: 'clamp(1rem, 1.5vw + 0.25rem, 1.25rem)',
                }}
              >
                {testimonial.content}
              </blockquote>

              {/* Auteur */}
              <div className="flex items-center gap-4">
                {/* Avatar / initiales */}
                <div
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--md-secondary)] font-[family-name:var(--md-font-display)] text-sm font-bold text-white"
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-[family-name:var(--md-font-display)] font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-white/50">
                    {testimonial.role} — {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation bas — points + boutons mobile */}
        <div className="mt-8 flex items-center justify-between">

          {/* Points de navigation — hit area 24×24 (WCAG 2.2 target-size)
              tout en gardant un visuel compact via un indicateur enfant. */}
          <div className="flex items-center" role="tablist" aria-label="Indicateurs de position">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Aller au témoignage ${i + 1}`}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className="group flex h-6 w-6 items-center justify-center"
              >
                <span
                  aria-hidden
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'h-2 w-8 bg-[var(--md-secondary)]'
                      : 'h-2 w-2 bg-white/20 group-hover:bg-white/40'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Boutons mobile */}
          <div className="flex gap-3 sm:hidden" role="group" aria-label="Navigation témoignages">
            <button
              onClick={prev}
              aria-label="Témoignage précédent"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors duration-200 hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--md-secondary)]"
            >
              <ArrowLeftIcon size={16} weight="regular" />
            </button>
            <button
              onClick={next}
              aria-label="Témoignage suivant"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors duration-200 hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--md-secondary)]"
            >
              <ArrowRightIcon size={16} weight="regular" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
