'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { EASE_OUT_EXPR as EASE } from '@/lib/motion'

// ─────────────────────────────────────────────────────────────────
//  DONNÉES — ⚠️ TODO_CLIENT : remplacer par de vrais projets
//  Format attendu : titre, catégorie, description, image WebP 800×600px
//  LIVRER DANS : public/images/sections/portfolio-{id}.webp
// ─────────────────────────────────────────────────────────────────

interface Project {
  id: string
  title: string
  category: string
  description: string
  year: string
  gradient: string
  dotColor: string
}

const PROJECTS: Project[] = [
  {
    id: 'branding-web',
    title: 'Refonte identité & site web',
    category: 'Branding · Web',
    description:
      'Stratégie de marque complète, charte graphique et site vitrine ultra-rapide pour une PME en forte croissance.',
    year: '2025',
    gradient: 'linear-gradient(135deg, #1B1F3B 0%, #35A7FF 100%)',
    dotColor: '#35A7FF',
  },
  {
    id: 'social-seo',
    title: 'Campagne social media & SEO',
    category: 'Community · SEO',
    description:
      'Stratégie éditoriale, création de contenu mensuel et référencement naturel pour un acteur de la santé engagé.',
    year: '2025',
    gradient: 'linear-gradient(135deg, #FF5964 0%, #1B1F3B 100%)',
    dotColor: '#FF5964',
  },
  {
    id: 'ecommerce-ads',
    title: 'Lancement e-commerce premium',
    category: 'Web · Ads',
    description:
      'Boutique en ligne performante et campagnes Meta/Google Ads pour une marque lifestyle à fort potentiel de conversion.',
    year: '2024',
    gradient: 'linear-gradient(135deg, #35A7FF 0%, #1B1F3B 100%)',
    dotColor: '#35A7FF',
  },
]

// ─────────────────────────────────────────────────────────────────
//  SOUS-COMPOSANT — Carte projet
// ─────────────────────────────────────────────────────────────────

function ProjectCard({ project, reduced }: { project: Project; reduced: boolean }) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_-4px_rgba(16,19,42,0.08)] transition-shadow duration-300 hover:shadow-[0_12px_40px_-8px_rgba(16,19,42,0.18)]"
    >
      {/* Visuel — gradient placeholder (⚠️ TODO_CLIENT: remplacer par <Image>) */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            background: project.gradient,
            transform: hovered && !reduced ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Grille décorative sur le visuel */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Overlay hover */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-black/45 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md">
            Voir le projet
            <ArrowUpRightIcon size={15} weight="bold" />
          </span>
        </div>

        {/* Badge catégorie */}
        <div className="absolute left-4 top-4 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: project.dotColor }}
            />
            {project.category}
          </span>
        </div>

        {/* Année */}
        <div className="absolute right-4 top-4 z-10">
          <span className="font-mono text-[11px] font-medium text-white/60">
            {project.year}
          </span>
        </div>
      </div>

      {/* Contenu texte */}
      <div className="p-6">
        <h3
          className="mb-2 font-[family-name:var(--md-font-display)] font-semibold text-[var(--md-primary)] transition-colors duration-200 group-hover:text-[var(--md-secondary-text)]"
          style={{ fontSize: 'clamp(1rem, 1.5vw + 0.25rem, 1.125rem)' }}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--md-text-muted)]">
          {project.description}
        </p>
        <div
          aria-hidden
          className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[var(--md-secondary-text)] transition-transform duration-200 group-hover:translate-x-0.5"
        >
          <span>Voir le projet</span>
          <ArrowUpRightIcon size={13} weight="bold" />
        </div>
      </div>

      {/* Lien principal couvrant toute la carte */}
      <Link
        href="/portfolio"
        aria-label={`Voir le projet : ${project.title}`}
        className="absolute inset-0 z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-2xl"
      />
    </motion.article>
  )
}

// ─────────────────────────────────────────────────────────────────
//  COMPOSANT PRINCIPAL : Portfolio
//  Section 06 — fond #F0F7FF (#md-secondary-light)
// ─────────────────────────────────────────────────────────────────

export function Portfolio() {
  const reduced = useReducedMotion() ?? false

  return (
    <section
      id="portfolio"
      aria-label="Aperçu de nos réalisations"
      className="bg-[var(--md-secondary-light)]"
      style={{
        paddingTop: 'var(--md-space-section)',
        paddingBottom: 'var(--md-space-section)',
      }}
    >
      <div className="container-md">
        {/* En-tête : titre aligné gauche + lien "Tout voir" aligné droite */}
        <motion.div
          className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="max-w-lg">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--md-secondary-text)]">
              Réalisations
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
              Des marques qu&apos;on a{' '}
              <span className="text-[var(--md-secondary-text)]">façonnées</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--md-text-muted)]">
              Chaque projet est unique. Voici un aperçu de ce qu&apos;on est capables
              de créer pour vous.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[var(--md-primary)]/20 px-6 py-3 text-sm font-semibold text-[var(--md-primary)] transition-all duration-200 hover:border-[var(--md-primary)]/40 hover:bg-[var(--md-primary)]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--md-secondary-light)] sm:self-auto"
          >
            Voir toutes nos réalisations
            <ArrowUpRightIcon size={16} weight="bold" />
          </Link>
        </motion.div>

        {/* Grille 3 colonnes */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial={reduced ? false : 'hidden'}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} reduced={reduced} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
