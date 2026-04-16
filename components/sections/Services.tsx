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
  MegaphoneSimpleIcon,
  MagnifyingGlassIcon,
  ChartLineUpIcon,
  ArrowUpRightIcon,
} from '@phosphor-icons/react'
import { EASE_OUT_EXPR as EASE } from '@/lib/motion'

// ─────────────────────────────────────────────────────────────────
//  DONNÉES — 6 services + thèmes de couleur Mossine Digital
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
    title: 'Identité visuelle & Branding',
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
      bg: '#35A7FF',
      text: '#FFFFFF',
      textMuted: 'rgba(255,255,255,0.85)',
      accent: '#1B1F3B',
      accentOnBg: 'rgba(27,31,59,0.14)',
    },
  },
  {
    id: 'community',
    title: 'Community Management',
    summary:
      'Stratégie éditoriale, création de contenus et animation de communauté au quotidien. On parle comme vos clients, on répond comme vous.',
    href: '/services',
    image: '/images/hero/service-community.webp',
    icon: ChatCircleDotsIcon,
    theme: {
      bg: '#F0F7FF',
      text: '#1B1F3B',
      textMuted: 'rgba(27,31,59,0.7)',
      accent: '#35A7FF',
      accentOnBg: 'rgba(53,167,255,0.14)',
    },
  },
  {
    id: 'ads',
    title: 'Campagnes Ads',
    summary:
      'Campagnes Meta, Google et TikTok Ads ciblées, pilotées par la donnée, optimisées ROI. Chaque franc CFA investi est tracé, mesuré, amplifié.',
    href: '/services',
    image: '/images/hero/service-social-media.webp',
    icon: MegaphoneSimpleIcon,
    theme: {
      bg: '#10132A',
      text: '#FFFFFF',
      textMuted: 'rgba(255,255,255,0.7)',
      accent: '#FF5964',
      accentOnBg: 'rgba(255,89,100,0.16)',
    },
  },
  {
    id: 'seo',
    title: 'SEO & SEA',
    summary:
      'Audit technique, contenus optimisés, gestion campagne, optimisation ROI et netlinking pour un trafic organique durable. Le Graal : apparaître avant vos concurrents.',
    href: '/services',
    image: '/images/hero/service-logo.webp',
    icon: MagnifyingGlassIcon,
    theme: {
      bg: '#FFFFFF',
      text: '#1B1F3B',
      textMuted: 'rgba(27,31,59,0.65)',
      accent: '#35A7FF',
      accentOnBg: 'rgba(53,167,255,0.12)',
    },
  },
  {
    id: 'strategie',
    title: 'Stratégie communication & marketing digitale',
    summary:
      'Une roadmap sur-mesure qui aligne branding, web, social media, SEO et ads autour de vos objectifs business — l\u2019approche signature Mossine, 360° et pilotée par la donnée.',
    href: '/services',
    image: '/images/hero/service-strategie.webp',
    icon: ChartLineUpIcon,
    theme: {
      bg: '#FF5964',
      text: '#FFFFFF',
      textMuted: 'rgba(255,255,255,0.88)',
      accent: '#FFFFFF',
      accentOnBg: 'rgba(255,255,255,0.16)',
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
  const cardRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  })

  // Mouvement reduced → désactive scale/zoom
  const scale = useTransform(
    progress,
    range,
    reduced ? [1, 1] : [1, targetScale],
  )
  const imageScale = useTransform(
    cardScroll,
    [0, 1],
    reduced ? [1, 1] : [1.25, 1],
  )

  const Icon = service.icon
  const { theme } = service

  return (
    <div
      ref={cardRef}
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
                alt=""
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
