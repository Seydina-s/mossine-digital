'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownIcon } from '@phosphor-icons/react'
import { EASE_OUT_EXPR as EASE } from '@/lib/motion'
import { SERVICES_DETAIL } from '@/lib/services-data'
import { SERVICE_ICON_MAP } from '@/components/services/service-icons'

// ─────────────────────────────────────────────────────────────────
//  ServicesPageHero — hero de la page /services.
//  Fond #1B1F3B + aurora légère. Table des matières ancres en bas.
// ─────────────────────────────────────────────────────────────────

export function ServicesPageHero() {
  const reduced = useReducedMotion() ?? false

  const container = {
    initial: {},
    animate: reduced ? {} : { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }
  const item = {
    initial: reduced ? {} : { opacity: 0, y: 24 },
    animate: reduced ? {} : { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  }

  return (
    <section
      id="contenu-principal"
      aria-labelledby="services-hero-title"
      className="relative overflow-hidden bg-[var(--md-primary)]"
      style={{
        paddingTop: 'calc(var(--md-space-section) + 4rem)',
        paddingBottom: 'var(--md-space-section)',
      }}
    >
      {/* Aurora atmosphère — plus subtile que la homepage */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={reduced ? '' : 'md-aurora-1'}
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-15%',
            width: '55%',
            height: '80%',
            background:
              'radial-gradient(circle, rgba(53,167,255,0.28) 0%, transparent 65%)',
            filter: 'blur(120px)',
            borderRadius: '50%',
          }}
        />
        <div
          className={reduced ? '' : 'md-aurora-3'}
          style={{
            position: 'absolute',
            top: '10%',
            right: '-15%',
            width: '45%',
            height: '70%',
            background:
              'radial-gradient(circle, rgba(255,89,100,0.16) 0%, transparent 65%)',
            filter: 'blur(120px)',
            borderRadius: '50%',
          }}
        />
        {/* Grille fine */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="container-md relative z-10">
        <motion.div
          variants={container}
          initial="initial"
          animate="animate"
          className="mx-auto max-w-3xl text-center"
        >
          {/* Eyebrow */}
          <motion.p
            variants={item}
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--md-secondary)] sm:text-xs"
          >
            Nos services · Agence 360°
          </motion.p>

          {/* Titre */}
          <motion.h1
            variants={item}
            id="services-hero-title"
            className="mt-5 font-[family-name:var(--md-font-display)] text-white"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw + 0.4rem, 5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.02,
            }}
          >
            Six leviers, une seule{' '}
            <span className="italic text-[var(--md-secondary)]">direction</span>
            &nbsp;: rendre visibles les idées qui comptent.
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-[17px]"
          >
            Chaque offre est pensée pour tenir seule ou s&rsquo;articuler avec
            les autres. Marques commerciales, ONG, institutions ou organisations
            engagées — on adapte la méthode à votre mission, pas l&rsquo;inverse.
          </motion.p>

          {/* Table des matières — ancres vers chaque service */}
          <motion.nav
            variants={item}
            aria-label="Accès rapide aux services"
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            {SERVICES_DETAIL.map((s) => {
              const Icon = SERVICE_ICON_MAP[s.iconKey]
              return (
                <Link
                  key={s.id}
                  href={`#${s.id}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-white/75 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--md-primary)]"
                >
                  <Icon
                    size={14}
                    weight="regular"
                    className="text-white/50 transition-colors duration-200 group-hover:text-[var(--md-secondary)]"
                  />
                  {s.navLabel}
                </Link>
              )
            })}
          </motion.nav>

          {/* Scroll cue */}
          <motion.div
            variants={item}
            aria-hidden
            className="mt-14 flex flex-col items-center gap-2 text-white/35"
          >
            <ArrowDownIcon size={16} weight="regular" className="animate-bounce" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
              Découvrir
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
