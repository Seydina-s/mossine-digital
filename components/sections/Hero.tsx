'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import {
  ArrowUpRightIcon,
  PenNibIcon,
  GlobeIcon,
  PaletteIcon,
  RocketIcon,
  ChatCircleDotsIcon,
} from '@phosphor-icons/react'

// ─────────────────────────────────────────────────────────────────
//  Hero — minimalisme éditorial + showcase carrousel premium
// ─────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const
const INTERVAL_MS = 3600

type PhosphorIcon = React.ComponentType<{
  size?: number | string
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  className?: string
}>

interface Service {
  label: string
  tag: string
  icon: PhosphorIcon
  image: string
}

const SERVICES: Service[] = [
  {
    label: 'Création de site web',
    tag: '01 — Web',
    icon: GlobeIcon,
    image: '/images/hero/service-web.webp',
  },
  {
    label: 'Identité visuelle',
    tag: '02 — Identité',
    icon: PaletteIcon,
    image: '/images/hero/service-identite.webp',
  },
  {
    label: 'Création de logo',
    tag: '03 — Logo',
    icon: PenNibIcon,
    image: '/images/hero/service-logo.webp',
  },
  {
    label: 'Boost de publication',
    tag: '04 — Social Ads',
    icon: RocketIcon,
    image: '/images/hero/service-social-media.webp',
  },
  {
    label: 'Community management',
    tag: '05 — Community',
    icon: ChatCircleDotsIcon,
    image: '/images/hero/service-community.webp',
  },
]

export function Hero() {
  const reduced = useReducedMotion() ?? false

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE },
    },
  }

  return (
    <section
      aria-label="Présentation Mossine Digital"
      className="relative isolate overflow-hidden bg-[var(--md-primary)]"
    >
      <Atmosphere reduced={reduced} />

      <motion.div
        className="relative z-10 mx-auto max-w-[1400px] px-5 pt-28 pb-0 sm:px-8 sm:pt-32 lg:px-12 lg:pt-40"
        variants={container}
        initial={reduced ? false : 'hidden'}
        animate="visible"
      >
        {/* ─── EYEBROW ─── */}
        <motion.div variants={item} className="flex justify-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--md-accent)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--md-accent)]" />
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
              Agence 360° · Nouveaux projets 2026
            </span>
          </span>
        </motion.div>

        {/* ─── TITRE ─── */}
        <motion.h1
          variants={item}
          className="mt-8 text-center font-[family-name:var(--md-font-display)] text-white"
          style={{
            fontSize: 'clamp(2.4rem, 6vw + 0.5rem, 5.75rem)',
            lineHeight: 0.98,
            letterSpacing: '-0.04em',
            fontWeight: 700,
          }}
        >
          <span className="block">On crée des marques</span>
          <span className="block">
            que vos clients{' '}
            <span
              className="relative inline-block italic"
              style={{ color: 'var(--md-secondary)' }}
            >
              n&apos;oublient pas
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                className="absolute -bottom-1 left-0 w-full"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 8 Q 75 2 150 7 T 298 5"
                  fill="none"
                  stroke="var(--md-accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: EASE, delay: 0.9 }}
                />
              </svg>
            </span>
            .
          </span>
        </motion.h1>

        {/* ─── SOUS-TITRE ─── */}
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-center font-[family-name:var(--md-font-body)] text-base leading-relaxed text-white/55 sm:text-[17px]"
        >
          De l&apos;identité visuelle au site web, de la stratégie au
          community management — chaque détail est pensé pour transformer
          votre présence en avantage concret.
        </motion.p>

        {/* ─── CTA ─── */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2.5 rounded-full bg-[var(--md-accent)] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(255,89,100,0.55)] transition-all duration-300 hover:shadow-[0_14px_40px_-8px_rgba(255,89,100,0.7)]"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-white/0 transition-colors duration-300 group-hover:bg-white/[0.08]" />
            <span className="relative">Démarrer un projet</span>
            <ArrowUpRightIcon
              size={16}
              weight="bold"
              className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/30">
            Réponse sous 24h · Devis offert
          </p>
        </motion.div>

        {/* ─── SCROLL INDICATOR ─── */}
        <motion.div
          variants={item}
          className="mt-12 flex justify-center"
          aria-hidden
        >
          <motion.div
            className="flex flex-col items-center gap-1.5"
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Ligne animée descendante */}
            <svg
              width="2"
              height="32"
              viewBox="0 0 2 32"
              fill="none"
              className="overflow-visible"
            >
              <motion.line
                x1="1" y1="0" x2="1" y2="32"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <motion.line
                x1="1" y1="0" x2="1" y2="32"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              />
            </svg>
            {/* Point pulsant */}
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/50" />
            </span>
          </motion.div>
        </motion.div>

        {/* ─── SHOWCASE CARROUSEL ─── */}
        <motion.div
          variants={item}
          className="relative mx-auto mt-16 max-w-[1080px] sm:mt-20 lg:mt-24"
        >
          <ShowcaseCarousel reduced={reduced} />
        </motion.div>
      </motion.div>

      {/* Fondu bas — raccord section suivante */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--md-primary)]"
      />
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Atmosphère : grille + halo bleu/coral + grain + vignette
// ─────────────────────────────────────────────────────────────────

function Atmosphere({ reduced }: { reduced: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 80%)',
        }}
      />

      <motion.div
        className="absolute -left-1/4 top-0 h-[90%] w-[70%] rounded-full blur-[140px]"
        style={{
          background:
            'radial-gradient(circle, rgba(53,167,255,0.28) 0%, transparent 60%)',
        }}
        animate={reduced ? undefined : { x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -right-1/4 top-1/4 h-[70%] w-[60%] rounded-full blur-[140px]"
        style={{
          background:
            'radial-gradient(circle, rgba(255,89,100,0.22) 0%, transparent 65%)',
        }}
        animate={reduced ? undefined : { x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(16,19,42,0.55) 100%)',
        }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Showcase carrousel — rotation automatique avec crossfade + Ken Burns
//  Pause au survol. Clic/tap pour avancer. Progress bar liée au timer.
// ─────────────────────────────────────────────────────────────────

function ShowcaseCarousel({ reduced }: { reduced: boolean }) {
  const [index, setIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  React.useEffect(() => {
    if (reduced || isPaused) return
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % SERVICES.length)
    }, INTERVAL_MS)
    return () => clearTimeout(timer)
  }, [index, isPaused, reduced])

  const active = SERVICES[index]
  const ActiveIcon = active.icon

  const go = (i: number) => {
    if (i !== index) setIndex(i)
  }

  return (
    <motion.div
      className="relative"
      initial={reduced ? false : { opacity: 0, y: 40, rotateX: 6 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
      style={{ transformPerspective: 1200 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Halo derrière le showcase */}
      <div
        aria-hidden
        className="absolute -inset-10 rounded-[40px] blur-3xl"
        style={{
          background:
            'linear-gradient(135deg, rgba(53,167,255,0.18) 0%, rgba(255,89,100,0.14) 100%)',
        }}
      />

      {/* Flottement doux */}
      <motion.div
        className="relative"
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Cadre premium */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
          {/* Ratio 16/10 — cohérent avec les assets service */}
          <div className="relative aspect-[16/10] w-full">
            <AnimatePresence initial={false}>
              <motion.div
                key={active.image}
                className="absolute inset-0"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
                transition={{
                  opacity: { duration: 1.1, ease: EASE },
                  scale: { duration: INTERVAL_MS / 1000 + 1, ease: 'linear' },
                  filter: { duration: 0.6, ease: EASE },
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.image}
                  alt={active.label}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                {/* Grain discret sur l'image */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Dégradé bas pour la lisibilité du label */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
            />

            {/* Tag haut-gauche */}
            <div className="absolute left-5 top-5 z-10 sm:left-6 sm:top-6">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active.tag}
                  initial={reduced ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md"
                >
                  <span className="h-1 w-1 rounded-full bg-[var(--md-accent)]" />
                  {active.tag}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Label bas-gauche — animation slide + fade */}
            <div className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-4 sm:inset-x-6 sm:bottom-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.label}
                  initial={reduced ? false : { opacity: 0, y: 14, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, filter: 'blur(4px)' }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.08] backdrop-blur-md">
                    <ActiveIcon
                      size={18}
                      weight="regular"
                      className="text-white"
                    />
                  </span>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                      Service actif
                    </p>
                    <p className="font-[family-name:var(--md-font-display)] text-lg font-semibold tracking-tight text-white sm:text-xl">
                      {active.label}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Compteur */}
              <div className="hidden font-mono text-[10px] tabular-nums text-white/40 sm:block">
                <span className="text-white/80">{String(index + 1).padStart(2, '0')}</span>
                <span className="mx-1">/</span>
                <span>{String(SERVICES.length).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Barre de progression top */}
            <div className="absolute inset-x-0 top-0 z-10 h-[2px] bg-white/[0.08]">
              <motion.div
                key={index + (isPaused ? '-paused' : '-running')}
                className="h-full bg-gradient-to-r from-[var(--md-secondary)] to-[var(--md-accent)]"
                initial={{ width: '0%' }}
                animate={{ width: isPaused || reduced ? '0%' : '100%' }}
                transition={{
                  duration: reduced ? 0 : INTERVAL_MS / 1000,
                  ease: 'linear',
                }}
              />
            </div>
          </div>
        </div>

        {/* Ombre projetée */}
        <div
          aria-hidden
          className="mx-auto mt-2 h-6 w-[85%] rounded-[50%] bg-black/40 blur-2xl"
        />
      </motion.div>

      {/* ─── Thumbnails / Dots navigation ─── */}
      <div
        className="mt-6 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Naviguer entre les services"
      >
        {SERVICES.map((s, i) => {
          const isActive = i === index
          return (
            <button
              key={s.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={s.label}
              onClick={() => go(i)}
              className="group relative h-8 cursor-pointer px-1"
            >
              <span
                className={`block h-[3px] rounded-full transition-all duration-500 ${
                  isActive
                    ? 'w-10 bg-white'
                    : 'w-5 bg-white/15 group-hover:w-7 group-hover:bg-white/30'
                }`}
              />
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
