'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownIcon } from '@phosphor-icons/react'
import { EASE_OUT_EXPR as EASE } from '@/lib/motion'

// ─────────────────────────────────────────────────────────────────
//  AboutHero — hero de la page /a-propos.
//  Fond #1B1F3B + aurora discrète (accent violet pour différencier
//  de la homepage et de /services sans sortir de la palette).
// ─────────────────────────────────────────────────────────────────

export function AboutHero() {
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
      aria-labelledby="about-hero-title"
      className="relative overflow-hidden bg-[var(--md-primary)]"
      style={{
        paddingTop: 'calc(var(--md-space-section) + 4rem)',
        paddingBottom: 'var(--md-space-section)',
      }}
    >
      {/* Aurora — même grammaire que ServicesPageHero, mix bleu + accent */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={reduced ? '' : 'md-aurora-2'}
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '55%',
            height: '75%',
            background:
              'radial-gradient(circle, rgba(105,88,255,0.22) 0%, transparent 65%)',
            filter: 'blur(120px)',
            borderRadius: '50%',
          }}
        />
        <div
          className={reduced ? '' : 'md-aurora-1'}
          style={{
            position: 'absolute',
            top: '20%',
            right: '-15%',
            width: '50%',
            height: '70%',
            background:
              'radial-gradient(circle, rgba(53,167,255,0.24) 0%, transparent 65%)',
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
          <motion.p
            variants={item}
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--md-secondary)] sm:text-xs"
          >
            L&rsquo;agence · Dakar, Sénégal
          </motion.p>

          <motion.h1
            variants={item}
            id="about-hero-title"
            className="mt-5 font-[family-name:var(--md-font-display)] text-white"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw + 0.4rem, 5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.02,
            }}
          >
            Depuis Dakar, pour{' '}
            <span className="italic text-[var(--md-secondary)]">
              l&rsquo;Afrique qui se transforme
            </span>
            .
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-[17px]"
          >
            Mossine Digital est une agence de communication digitale et de
            branding basée à Dakar, au Sénégal. Nous accompagnons les
            entreprises, les institutions et les organisations qui souhaitent
            affirmer leur présence en ligne, construire une image forte et
            transformer leur communication en levier de croissance.
          </motion.p>

          <motion.div
            variants={item}
            aria-hidden
            className="mt-14 flex flex-col items-center gap-2 text-white/35"
          >
            <ArrowDownIcon size={16} weight="regular" className="animate-bounce" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
              Notre manifeste
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
