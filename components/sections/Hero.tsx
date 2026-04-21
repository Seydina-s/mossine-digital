'use client'

import * as React from 'react'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import {
  ArrowUpRightIcon,
  GlobeIcon,
  PaletteIcon,
  RocketIcon,
  ChatCircleDotsIcon,
  ChartLineUpIcon,
  MagnifyingGlassIcon,
} from '@phosphor-icons/react'
import { GlassCTA } from '@/components/ui/glass-cta'
import { EASE_OUT_EXPR as EASE } from '@/lib/motion'
import type { PhosphorIcon as PhosphorIcon } from '@/lib/types'

// ─────────────────────────────────────────────────────────────────
//  Hero — minimalisme éditorial + showcase carrousel premium
// ─────────────────────────────────────────────────────────────────

interface Service {
  label: string
  tag: string
  icon: PhosphorIcon
  image: string
}

// Showcase Hero — 6 services canoniques, alignés sur SERVICES_DETAIL.
// Ordre pensé pour la rotation : identité → web → community → ads →
// SEO → stratégie (la flagship en fin pour clôturer la promesse 360°).
const SERVICES: Service[] = [
  {
    label: 'Identité visuelle & Branding',
    tag: '01 — Branding',
    icon: PaletteIcon,
    image: '/images/hero/service-identite.webp',
  },
  {
    label: 'Création de site web',
    tag: '02 — Web',
    icon: GlobeIcon,
    image: '/images/hero/service-web.webp',
  },
  {
    label: 'Community Management',
    tag: '03 — Gestion communauté',
    icon: ChatCircleDotsIcon,
    image: '/images/hero/service-community.webp',
  },
  {
    label: 'Campagnes Ads',
    tag: '04 — Publicité',
    icon: RocketIcon,
    image: '/images/hero/service-social-media.webp',
  },
  {
    label: 'SEO & SEA',
    tag: '05 — Référencement',
    icon: MagnifyingGlassIcon,
    image: '/images/hero/service-logo.webp',
  },
  {
    label: 'Stratégie communication & marketing digitale',
    tag: '06 — Stratégie',
    icon: ChartLineUpIcon,
    image: '/images/hero/service-strategie.webp',
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
        className="relative z-10 mx-auto max-w-[1400px] px-5 pt-20 pb-0 sm:px-8 sm:pt-24 lg:px-12 lg:pt-28"
        variants={container}
        initial={reduced ? false : 'hidden'}
        animate="visible"
      >
        {/* ─── EYEBROW SEO — keywords métier au-dessus du H1 ─── */}
        <motion.p
          variants={item}
          className="text-center font-[family-name:var(--md-font-body)] text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--md-secondary)] sm:text-xs"
        >
          Agence Communication &amp; Marketing Digital <span aria-hidden>·</span> 360°
        </motion.p>

        {/* ─── TITRE ─── */}
        <motion.h1
          variants={item}
          className="mt-5 text-center font-[family-name:var(--md-font-display)] text-white"
          style={{
            fontSize: 'clamp(2.25rem, 5.6vw + 0.4rem, 5.5rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            fontWeight: 700,
          }}
        >
          <span className="block">On rend visibles les marques, les causes</span>
          <span className="block">
            et les idées{' '}
            <span
              className="relative inline-block italic"
              style={{ color: 'var(--md-secondary)' }}
            >
              qui comptent
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

        {/* ─── SOUS-TITRE — double public (entreprises + ONG) ─── */}
        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-2xl text-center font-[family-name:var(--md-font-body)] text-base leading-relaxed text-white/60 sm:text-[17px]"
        >
          Branding, site web, SEO, ads et community management. De
          l&apos;entreprise ambitieuse à l&apos;ONG engagée, on transforme
          votre présence en influence concrète.
        </motion.p>

        {/* ─── CTA ─── */}
        <motion.div
          variants={item}
          className="mt-7 flex flex-col items-center gap-3"
        >
          <GlassCTA href="/contact" tone="dark" size="default">
            Démarrer un projet
            <ArrowUpRightIcon size={16} weight="bold" />
          </GlassCTA>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
            Réponse sous 24h · Devis offert
          </p>
        </motion.div>

        {/* ─── SCROLL INDICATOR — 100% CSS (zéro Framer Motion tick) ─── */}
        <motion.div
          variants={item}
          className="mt-8 flex justify-center"
          aria-hidden
        >
          <div className="flex flex-col items-center gap-1.5 md-scroll-bounce">
            <svg
              width="2"
              height="32"
              viewBox="0 0 2 32"
              fill="none"
              className="overflow-visible"
            >
              <line
                x1="1" y1="0" x2="1" y2="32"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="1" y1="0" x2="1" y2="32"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2"
                strokeLinecap="round"
                className="md-scroll-line"
              />
            </svg>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/50" />
            </span>
          </div>
        </motion.div>

        {/* ─── SHOWCASE CARROUSEL ─── */}
        <motion.div
          variants={item}
          className="relative mx-auto mt-10 max-w-[820px] sm:mt-12 lg:mt-14"
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

// Aurora mesh : 3 halos animés en pur CSS (GPU compositing, zéro JS par frame)
function Atmosphere({ reduced }: { reduced: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grille éditoriale en masque radial */}
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

      {/* Halo bleu #35A7FF — dérive lente haut-gauche */}
      <div
        className={`absolute -left-1/4 top-0 h-[90%] w-[70%] rounded-full blur-[140px] ${reduced ? '' : 'md-aurora-1'}`}
        style={{
          background:
            'radial-gradient(circle, rgba(53,167,255,0.34) 0%, transparent 60%)',
        }}
      />

      {/* Halo corail #FF5964 — dérive lente droite/milieu */}
      <div
        className={`absolute -right-1/4 top-1/4 h-[70%] w-[60%] rounded-full blur-[140px] ${reduced ? '' : 'md-aurora-2'}`}
        style={{
          background:
            'radial-gradient(circle, rgba(255,89,100,0.26) 0%, transparent 65%)',
        }}
      />

      {/* Halo violet profond — point d'équilibre bas-centre */}
      <div
        className={`absolute left-1/4 bottom-0 h-[60%] w-[60%] rounded-full blur-[160px] ${reduced ? '' : 'md-aurora-3'}`}
        style={{
          background:
            'radial-gradient(circle, rgba(105,88,255,0.18) 0%, transparent 60%)',
        }}
      />

      {/* Grain organique — centralisé dans --md-grain-url (globals.css) */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: 'var(--md-grain-url)' }}
      />

      {/* Vignette : assombrit les bords pour focus central */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(16,19,42,0.6) 100%)',
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

  // 🛡️ Vaccin jank navbar homepage (dette v3.3, suite du fix Services) :
  // - Auto-rotation retirée : la boucle Framer Motion continue (crossfade image
  //   + tag + label toutes les 2s) tick sur le main thread même pour les props
  //   GPU-composées (MV update → style assignment).
  // - Progress bar retirée : animait `width` en linéaire sur 2s ×∞ → `width`
  //   n'est pas composé, force un SYNCHRONOUS LAYOUT à chaque frame, saturait
  //   le main thread en permanence, retardait le rAF callback du useScroll
  //   custom de la Navbar.
  // Navigation manuelle via les dots reste disponible : crossfade ponctuel au
  // clic = main thread libre 99% du temps.

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

      {/* Cadre premium — pas de flottement (évite les repaints pendant le scroll) */}
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
          {/* Ratio 21/9 — plus compact pour rester above the fold */}
          <div className="relative aspect-[21/9] w-full">
            <AnimatePresence initial={false}>
              <motion.div
                key={active.image}
                className="absolute inset-0 will-change-[opacity,transform]"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.image}
                  alt={active.label}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                {/* Grain discret sur l'image — var(--md-grain-url) */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                  style={{ backgroundImage: 'var(--md-grain-url)' }}
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
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.55, ease: EASE }}
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
              <div className="hidden font-mono text-[10px] tabular-nums text-white/65 sm:block">
                <span className="text-white/80">{String(index + 1).padStart(2, '0')}</span>
                <span className="mx-1">/</span>
                <span>{String(SERVICES.length).padStart(2, '0')}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Ombre projetée */}
        <div
          aria-hidden
          className="mx-auto mt-2 h-6 w-[85%] rounded-[50%] bg-black/40 blur-2xl"
        />
      </div>

      {/* ─── Navigation : une icône Phosphor par service ───
           Carrés arrondis glass, état actif = fond white/12 + border marquée
           + icône en weight régulier. Transitions CSS pures (zéro Framer). */}
      <div
        className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
        role="tablist"
        aria-label="Naviguer entre les services"
      >
        {SERVICES.map((s, i) => {
          const isActive = i === index
          const Icon = s.icon
          return (
            <button
              key={s.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={s.label}
              onClick={() => go(i)}
              className={`group relative flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-md transition-[background-color,border-color,color,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--md-primary)] ${
                isActive
                  ? 'border-white/30 bg-white/[0.12] text-white'
                  : 'border-white/10 bg-white/[0.03] text-white/45 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] hover:text-white/80'
              }`}
            >
              <Icon
                size={18}
                weight={isActive ? 'regular' : 'light'}
                aria-hidden
              />
              {/* Underline marker — pastille en bas qui matérialise l'actif */}
              <span
                aria-hidden
                className={`pointer-events-none absolute -bottom-2 left-1/2 h-[3px] -translate-x-1/2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-5 bg-gradient-to-r from-[var(--md-secondary)] to-[var(--md-accent)] opacity-100'
                    : 'w-2 bg-white/20 opacity-0 group-hover:opacity-60'
                }`}
              />
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
