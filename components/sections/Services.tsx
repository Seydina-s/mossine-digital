'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import {
  PaletteIcon,
  GlobeIcon,
  ChatCircleDotsIcon,
  MagnifyingGlassIcon,
  ChartLineUpIcon,
  ArrowUpRightIcon,
} from '@phosphor-icons/react'
import { EASE_OUT_EXPR as EASE } from '@/lib/motion'

// ─────────────────────────────────────────────────────────────────
//  DONNÉES — 5 services + thèmes de couleur Mossine Digital
// ─────────────────────────────────────────────────────────────────

type PhosphorIcon = React.ComponentType<{
  size?: number | string
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  className?: string
}>

interface ServiceTheme {
  bg: string          // fond de la carte
  text: string        // texte principal
  textMuted: string   // texte secondaire (desc)
  accent: string      // liens, bordures, icône
  accentOnBg: string  // fond des micro-éléments (tag)
}

interface Service {
  id: string
  title: string
  summary: string
  href: string
  image: string
  icon: PhosphorIcon
  theme: ServiceTheme
}

const SERVICES: Service[] = [
  {
    id: 'identite',
    title: 'Branding & identité visuelle',
    summary:
      'Logo, charte graphique et système de marque cohérent pour imposer votre signature visuelle partout où vos clients vous rencontrent.',
    href: '/services',
    image: '/images/hero/service-identite.webp',
    icon: PaletteIcon,
    theme: {
      bg: '#1B1F3B',
      text: '#FFFFFF',
      textMuted: 'rgba(255,255,255,0.72)',
      accent: '#35A7FF',
      accentOnBg: 'rgba(53,167,255,0.14)',
    },
  },
  {
    id: 'web',
    title: 'Création de site web',
    summary:
      'Sites vitrine, landing et e-commerce ultra-rapides, accessibles et pensés pour convertir — Core Web Vitals au vert, design sur-mesure.',
    href: '/services',
    image: '/images/hero/service-web.webp',
    icon: GlobeIcon,
    theme: {
      // #0E70C8 (token --md-secondary-solid) au lieu de #35A7FF pour WCAG AA :
      // blanc sur #0E70C8 = 5.33:1 ✅ vs 2.58:1 ❌ sur le bleu vif.
      bg: '#0E70C8',
      text: '#FFFFFF',
      // 0.96 (au lieu de 0.88) : composited white@0.88 sur #0E70C8 = 4.27:1 ❌.
      // Seuil strict AA 4.5:1 atteint à partir de 0.95.
      textMuted: 'rgba(255,255,255,0.96)',
      // Accent blanc + fond noir translucide (pattern cohérent avec card Stratégie)
      // — primary dark #1B1F3B sur #0E70C8 = 3.19:1 ❌, blanc = 5.33:1 ✅.
      accent: '#FFFFFF',
      accentOnBg: 'rgba(0,0,0,0.22)',
    },
  },
  {
    id: 'social',
    title: 'Gestion des réseaux sociaux',
    summary:
      'Stratégie éditoriale, création de contenus et animation de communauté sur Instagram, Facebook, LinkedIn et TikTok. On parle comme vos clients, on répond comme vous.',
    href: '/services',
    image: '/images/hero/service-community.webp',
    icon: ChatCircleDotsIcon,
    theme: {
      bg: '#F0F7FF',
      text: '#1B1F3B',
      textMuted: 'rgba(27,31,59,0.7)',
      // Primary au lieu de #35A7FF : bleu vif sur bleu très clair = 2.12:1 ❌,
      // primary #1B1F3B sur #F0F7FF = 14.3:1 ✅. Hiérarchie préservée : le bleu
      // vif reste utilisé sur les cards à fond sombre (cf. card Identité).
      accent: '#1B1F3B',
      accentOnBg: 'rgba(27,31,59,0.10)',
    },
  },
  {
    id: 'seo',
    title: 'Référencement & campagnes publicitaires',
    summary:
      'SEO organique, Google Ads, Meta Ads, LinkedIn Ads et TikTok Ads pilotés dans une seule stratégie d\u2019acquisition. Chaque franc CFA investi est tracé, chaque position Google suivie, chaque optimisation argumentée.',
    href: '/services',
    image: '/images/hero/service-logo.webp',
    icon: MagnifyingGlassIcon,
    theme: {
      // #C23A46 (token --md-accent-solid) — cohérent WCAG AA (blanc sur #C23A46 = 5.25:1).
      // Rouge = signal visuel fort pour le levier d'acquisition mixte SEO/SEA/Ads.
      bg: '#C23A46',
      text: '#FFFFFF',
      textMuted: 'rgba(255,255,255,0.92)',
      accent: '#FFFFFF',
      // Noir translucide (pattern uniforme avec Web + Stratégie).
      accentOnBg: 'rgba(0,0,0,0.22)',
    },
  },
  {
    id: 'strategie',
    title: 'Stratégie communication & marketing digital',
    summary:
      'Une roadmap sur-mesure qui aligne branding, web, réseaux sociaux, référencement et publicité autour de vos objectifs business — l\u2019approche signature Mossine, 360° et pilotée par la donnée.',
    href: '/services',
    image: '/images/hero/service-strategie.webp',
    icon: ChartLineUpIcon,
    theme: {
      // Dark deep (footer-level) pour clôturer le stacking avec impact
      // flagship. Accent bleu vif #35A7FF sur fond très sombre = 9.08:1 ✅.
      bg: '#10132A',
      text: '#FFFFFF',
      textMuted: 'rgba(255,255,255,0.72)',
      accent: '#35A7FF',
      accentOnBg: 'rgba(53,167,255,0.16)',
    },
  },
]

// ─────────────────────────────────────────────────────────────────
//  COMPOSANT RACINE — Section sombre + stacking sticky scroll
// ─────────────────────────────────────────────────────────────────

export function Services() {
  const reduced = useReducedMotion() ?? false
  const container = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="services"
      aria-label="Nos services"
      className="relative bg-[#0a0e1c]"
    >
      {/* ─── En-tête — sticky pendant le stacking pour garder le contexte ─── */}
      <div className="relative pt-[var(--md-space-section)] pb-8">
        <div className="container-md">
          <motion.div
            className="max-w-2xl"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--md-secondary)]">
              Ce que nous faisons
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
              Tous vos besoins digitaux,{' '}
              <span className="text-[var(--md-secondary)]">
                réunis en un seul endroit.
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              De l&apos;identité visuelle au déploiement de vos campagnes,
              chaque service est pensé pour fonctionner avec les autres —
              et maximiser votre impact.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Zone de stacking — chaque carte sticky, scale progressive ─── */}
      <div ref={container} className="relative">
        {SERVICES.map((service, i) => {
          const targetScale = 1 - (SERVICES.length - i) * 0.035
          return (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              progress={scrollYProgress}
              range={[i * (1 / SERVICES.length), 1]}
              targetScale={targetScale}
              reduced={reduced}
            />
          )
        })}
      </div>

      {/* ─── CTA — sous le stacking ─── */}
      <div className="relative pb-[var(--md-space-section)] pt-20">
        <div className="container-md flex flex-col items-center gap-3">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white hover:text-[var(--md-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e1c]"
          >
            Découvrir toutes nos offres
            <ArrowUpRightIcon
              size={14}
              weight="bold"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <p className="text-xs text-white/65">
            Un service sur-mesure, adapté à votre situation
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
//  CARTE — sticky + scale animée sur scroll
// ─────────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
  progress,
  range,
  targetScale,
  reduced,
}: {
  service: Service
  index: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
  reduced: boolean
}) {
  // Mouvement reduced → désactive scale/zoom
  const scale = useTransform(
    progress,
    range,
    reduced ? [1, 1] : [1, targetScale],
  )

  // 🛡️ Vaccin jank navbar homepage : on DÉRIVE l'imageScale de la progress
  // parente au lieu d'installer un `useScroll({ target: cardRef })` par carte.
  //
  // Cause racine diagnostiquée : chaque `useScroll` framer-motion avec `target`
  // appelle `getBoundingClientRect(target)` sur chaque événement scroll, ce qui
  // force un synchronous layout. Avec le pattern précédent (6 cartes × 1 per-card
  // useScroll + 1 parent), on avait 7 reflows + 12 useTransform recomputes par
  // scroll event → layout thrash qui retardait le callback rAF du `useScroll`
  // custom de la Navbar → classe CSS changée 1-2 frames trop tard → retard
  // visible de la morph navbar (dette v3.3 homepage documentée).
  //
  // Ratio après fix : 1 useScroll total sur la homepage (le parent, inévitable
  // pour le stacking). Ken Burns dérivé mathématiquement depuis la progress
  // parente → zéro subscriber supplémentaire, zéro reflow per-card.
  const imageRange: [number, number] = [
    Math.max(0, (index - 1) / SERVICES.length),
    index / SERVICES.length,
  ]
  const imageScale = useTransform(
    progress,
    imageRange,
    reduced ? [1, 1] : [1.25, 1],
  )

  const Icon = service.icon
  const { theme } = service

  return (
    <div
      className="sticky flex items-center justify-center px-4 sm:px-6"
      style={{
        top: 0,
        height: '100vh',
      }}
    >
      <motion.article
        style={{
          backgroundColor: theme.bg,
          color: theme.text,
          scale,
          top: `calc(4vh + ${index * 18}px)`,
        }}
        className="relative h-[82vh] w-full max-w-[1200px] origin-top overflow-hidden rounded-[28px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]"
      >
        {/* ─── Layout desktop : 40% texte / 60% image ─── */}
        <div className="relative flex h-full flex-col lg:grid lg:grid-cols-[1fr_1.25fr] lg:gap-0">
          {/* ─── Bloc texte ─── */}
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
            {/* Tag haut */}
            <div className="flex items-center justify-between">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{
                  backgroundColor: theme.accentOnBg,
                  color: theme.accent,
                }}
              >
                <Icon size={14} weight="regular" />
                0{index + 1} — Service
              </span>
              <span
                className="hidden font-mono text-[11px] tabular-nums sm:inline"
                style={{ color: theme.textMuted }}
              >
                {String(index + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
              </span>
            </div>

            {/* Titre + description */}
            <div className="py-6 lg:py-0">
              <h3
                className="font-[family-name:var(--md-font-display)] font-bold leading-[1.05]"
                style={{
                  fontSize: 'clamp(1.75rem, 3.2vw + 0.5rem, 3.25rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                {service.title}
              </h3>
              <p
                className="mt-5 max-w-md text-[15px] leading-relaxed sm:text-base"
                style={{ color: theme.textMuted }}
              >
                {service.summary}
              </p>
            </div>

            {/* CTA bas */}
            <Link
              href={service.href}
              aria-label={`En savoir plus sur ${service.title}`}
              className="group inline-flex w-fit items-center gap-2 rounded-sm border-b-2 pb-1 text-sm font-semibold transition-all hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{ borderColor: theme.accent, color: theme.accent, outlineColor: theme.accent }}
            >
              En savoir plus
              <ArrowUpRightIcon
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* ─── Bloc image ─── */}
          <div className="relative h-[40%] overflow-hidden lg:h-full lg:rounded-r-[28px]">
            <motion.div
              style={{ scale: imageScale }}
              className="absolute inset-0"
            >
              <Image
                src={service.image}
                alt={`Illustration du service ${service.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority={index < 2}
              />
            </motion.div>
            {/* Voile subtil cohérent avec le thème */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${theme.bg}00 45%, ${theme.bg}30 100%)`,
              }}
            />
          </div>
        </div>
      </motion.article>
    </div>
  )
}
