'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  PenNibIcon,
  GlobeIcon,
  ChatCircleDotsIcon,
  MegaphoneSimpleIcon,
  MagnifyingGlassIcon,
  ChartLineUpIcon,
  ArrowRightIcon,
} from '@phosphor-icons/react'

const EASE = [0.22, 1, 0.36, 1] as const

// ─────────────────────────────────────────────────────────────────
//  DONNÉES — Offres de services Mossine Digital
// ─────────────────────────────────────────────────────────────────

type PhosphorIcon = React.ComponentType<{
  size?: number
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  className?: string
}>

interface Service {
  icon: PhosphorIcon
  title: string
  description: string
  href: string
  highlight?: boolean
}

const SERVICES: Service[] = [
  {
    icon: PenNibIcon,
    title: 'Identité visuelle & Branding',
    description:
      'Logo, charte graphique, typographies et couleurs : créons ensemble une identité qui vous distingue et inspire confiance dès le premier regard.',
    href: '/services',
  },
  {
    icon: GlobeIcon,
    title: 'Création de site web',
    description:
      'Des sites performants, accessibles et optimisés pour convertir — de la landing page au site e-commerce, codés avec les meilleures technologies.',
    href: '/services',
    highlight: true,
  },
  {
    icon: ChatCircleDotsIcon,
    title: 'Community Management',
    description:
      'Gérez et animez votre présence sur les réseaux sociaux avec une stratégie éditoriale cohérente qui engage votre audience et nourrit votre communauté.',
    href: '/services',
  },
  {
    icon: MegaphoneSimpleIcon,
    title: 'Publicité digitale (Ads)',
    description:
      'Campagnes Meta Ads, Google Ads et TikTok Ads ciblées et optimisées pour maximiser votre visibilité, vos leads et votre retour sur investissement.',
    href: '/services',
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'SEO & Référencement',
    description:
      'Audit technique, optimisation on-page, netlinking et création de contenu : grimpez dans les résultats Google et générez un trafic organique durable.',
    href: '/services',
  },
  {
    icon: ChartLineUpIcon,
    title: 'Stratégie digitale 360°',
    description:
      'Une roadmap sur mesure qui aligne tous vos canaux — branding, web, social, SEO et ads — en une vision cohérente pour accélérer votre croissance.',
    href: '/services',
  },
]

// ─────────────────────────────────────────────────────────────────
//  SOUS-COMPOSANT — Carte de service individuelle
// ─────────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon

  return (
    <div
      className={`group relative flex flex-col gap-4 rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        service.highlight
          ? 'border-[var(--md-secondary)] bg-white shadow-sm shadow-[var(--md-secondary-light)]'
          : 'border-[var(--md-border)] bg-white hover:border-[var(--md-secondary)]'
      }`}
    >
      {/* Badge "Populaire" sur la carte highlight */}
      {service.highlight && (
        <span className="absolute right-5 top-5 rounded-full bg-[var(--md-secondary-light)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--md-secondary)]">
          Populaire
        </span>
      )}

      {/* Icône */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${
          service.highlight
            ? 'bg-[var(--md-secondary)] text-white'
            : 'bg-[var(--md-secondary-light)] text-[var(--md-secondary)] group-hover:bg-[var(--md-secondary)] group-hover:text-white'
        }`}
      >
        <Icon size={24} weight="regular" />
      </div>

      {/* Contenu texte */}
      <div className="flex flex-1 flex-col gap-2">
        <h3
          className="font-[family-name:var(--md-font-display)] font-semibold text-[var(--md-primary)]"
          style={{ fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.125rem)' }}
        >
          {service.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-[var(--md-text-muted)]">
          {service.description}
        </p>
      </div>

      {/* Lien "En savoir plus" */}
      <Link
        href={service.href}
        className="group/link mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--md-secondary)] transition-all duration-200"
        aria-label={`En savoir plus sur ${service.title}`}
      >
        En savoir plus
        <ArrowRightIcon
          size={14}
          weight="bold"
          className="transition-transform duration-200 group-hover/link:translate-x-0.5"
        />
      </Link>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
//  COMPOSANT PRINCIPAL : Services
// ─────────────────────────────────────────────────────────────────

export function Services() {
  const reduced = useReducedMotion() ?? false

  return (
    <section
      id="services"
      aria-label="Nos services"
      className="bg-[var(--md-bg-blue)]"
      style={{
        paddingTop: 'var(--md-space-section)',
        paddingBottom: 'var(--md-space-section)',
      }}
    >
      <div className="container-md">
        {/* En-tête de section */}
        <motion.div
          className="mb-14 max-w-2xl"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--md-secondary)]">
            Ce que nous faisons
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
            Tous vos besoins digitaux,{' '}
            <span className="text-[var(--md-secondary)]">réunis en un seul endroit</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--md-text-muted)]">
            De la création de votre identité visuelle au déploiement de vos
            campagnes publicitaires, chaque service est pensé pour fonctionner
            ensemble et maximiser votre impact.
          </p>
        </motion.div>

        {/* Grille des services — stagger à l'entrée dans le viewport */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA secondaire */}
        <motion.div
          className="mt-12 text-center"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--md-secondary)] px-7 py-3 text-sm font-semibold text-[var(--md-secondary)] transition-colors duration-200 hover:bg-[var(--md-secondary)] hover:text-white"
          >
            Découvrir toutes nos offres
            <ArrowRightIcon size={14} weight="bold" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
