'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import {
  PenNibIcon,
  GlobeIcon,
  PaletteIcon,
  RocketIcon,
  ChatCircleDotsIcon,
  ArrowUpRightIcon,
  ArrowRightIcon,
} from '@phosphor-icons/react'

// ─────────────────────────────────────────────────────────────────
//  CONFIGURATION
// ─────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const

type PhosphorIcon = React.ComponentType<{
  size?: number | string
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  className?: string
}>

interface Service {
  label: string
  shortLabel: string
  icon: PhosphorIcon
  image: string
}

const SERVICES: Service[] = [
  {
    label: 'Création de logo',
    shortLabel: 'Logo',
    icon: PenNibIcon,
    image: '/images/hero/service-logo.webp',
  },
  {
    label: 'Création de site web',
    shortLabel: 'Site web',
    icon: GlobeIcon,
    image: '/images/hero/service-web.webp',
  },
  {
    label: 'Identité visuelle',
    shortLabel: 'Identité',
    icon: PaletteIcon,
    image: '/images/hero/service-identite.webp',
  },
  {
    label: 'Boost de publication',
    shortLabel: 'Boost',
    icon: RocketIcon,
    image: '/images/hero/service-social-media.webp',
  },
  {
    label: 'Community management',
    shortLabel: 'Community',
    icon: ChatCircleDotsIcon,
    image: '/images/hero/service-community.webp',
  },
]

// Scroll par service (en vh) — l'effet ne commence qu'APRÈS le premier écran
const VH_PER_SERVICE = 55
const SECTION_HEIGHT_VH = 100 + SERVICES.length * VH_PER_SERVICE

// ─────────────────────────────────────────────────────────────────
//  COMPOSANT PRINCIPAL : Hero
// ─────────────────────────────────────────────────────────────────

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const reducedMotion = useReducedMotion() ?? false

  // Scroll-driven : on ne commence à changer de service
  // qu'après le premier écran complet (scroll > ~25% de la section)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // Le premier écran (~100vh / totalHeight) = rien ne bouge
    const firstScreenRatio = 100 / SECTION_HEIGHT_VH
    if (v <= firstScreenRatio) {
      setActiveIndex(0)
      return
    }
    // Le reste est réparti entre les services
    const serviceProgress = (v - firstScreenRatio) / (1 - firstScreenRatio)
    const newIndex = Math.min(
      SERVICES.length - 1,
      Math.floor(serviceProgress * SERVICES.length),
    )
    setActiveIndex(newIndex)
  })

  const active = SERVICES[activeIndex]

  return (
    <section
      ref={sectionRef}
      aria-label="Présentation Mossine Digital"
      className="relative bg-[var(--md-primary)]"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
    >
      {/* ── Texture grain ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Vignette ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(16,19,42,0.5) 100%)',
        }}
      />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  STICKY — tout le contenu visible dans 100vh               */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 h-screen">
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col px-5 pt-20 pb-5 sm:px-8 sm:pt-24 sm:pb-8 lg:px-12 lg:pt-28 lg:pb-10">

          {/* ══════════════════════════════════════════════════════ */}
          {/*  DESKTOP : 2 colonnes côte à côte                      */}
          {/* ══════════════════════════════════════════════════════ */}
          <div className="flex flex-1 flex-col gap-6 lg:flex-row lg:gap-10">

            {/* ── COLONNE GAUCHE : texte + CTAs + tabs services ── */}
            <div className="flex flex-col lg:w-[45%] lg:shrink-0 lg:justify-between">

              {/* Texte + CTAs */}
              <div>
                <motion.h1
                  className="font-[family-name:var(--md-font-display)] text-white"
                  style={{
                    fontSize: 'clamp(1.75rem, 3.5vw + 0.5rem, 3.75rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    fontWeight: 700,
                  }}
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: EASE }}
                >
                  <span className="block">On crée des marques que</span>
                  <span className="block">vos clients n&apos;oublient pas.</span>
                </motion.h1>

                <motion.p
                  className="mt-4 max-w-md font-[family-name:var(--md-font-body)] text-sm leading-relaxed text-white/45 sm:mt-5 sm:text-[15px]"
                  initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                >
                  De l&apos;identité visuelle au site web, de la stratégie
                  digitale au community management — chaque détail est pensé
                  pour transformer votre présence en avantage concret.
                </motion.p>

                <motion.div
                  className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-3"
                  initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.28 }}
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--md-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--md-accent-hover)]"
                  >
                    Démarrer un projet
                    <ArrowUpRightIcon
                      size={16}
                      weight="bold"
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                  <Link
                    href="/portfolio"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.04]"
                  >
                    Voir nos réalisations
                    <ArrowRightIcon
                      size={16}
                      weight="bold"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                </motion.div>
              </div>

              {/* Tabs services — sous les CTAs sur desktop */}
              <motion.nav
                aria-label="Catégories de services"
                className="mt-8 lg:mt-0"
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
              >
                {/* Mobile : scroll horizontal */}
                <div className="scrollbar-none flex gap-1 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible">
                  {SERVICES.map((service, i) => {
                    const isActive = i === activeIndex
                    const Icon = service.icon
                    return (
                      <button
                        key={service.label}
                        onClick={() => setActiveIndex(i)}
                        className={`relative flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 lg:w-full lg:px-4 lg:py-3 lg:text-left lg:text-sm ${
                          isActive
                            ? 'text-white'
                            : 'text-white/30 hover:text-white/50'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="hero-tab"
                            className="absolute inset-0 rounded-xl bg-white/[0.06]"
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                        <Icon
                          size={17}
                          weight={isActive ? 'regular' : 'light'}
                          className="relative z-10 shrink-0"
                        />
                        <span className="relative z-10 lg:hidden">
                          {service.shortLabel}
                        </span>
                        <span className="relative z-10 hidden lg:inline">
                          {service.label}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Progress dots */}
                <div className="mt-3 flex items-center gap-1.5 lg:mt-4 lg:pl-4">
                  {SERVICES.map((_, i) => (
                    <div
                      key={i}
                      className={`h-[2px] rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? 'w-7 bg-white/50'
                          : 'w-2.5 bg-white/10'
                      }`}
                    />
                  ))}
                  <span className="ml-1.5 text-[10px] font-medium tabular-nums uppercase tracking-[0.2em] text-white/20">
                    {String(activeIndex + 1).padStart(2, '0')}/{String(SERVICES.length).padStart(2, '0')}
                  </span>
                </div>
              </motion.nav>
            </div>

            {/* ── COLONNE DROITE : Image showcase (prend toute la hauteur dispo) ── */}
            <motion.div
              className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl border border-white/[0.06] sm:min-h-[260px]"
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="absolute inset-0"
                  initial={reducedMotion ? false : { opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={active.image}
                    alt={active.label}
                    className="h-full w-full object-cover"
                  />
                  {/* Label en bas */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent px-5 pt-12 pb-4">
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/70">
                      {active.label}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}
