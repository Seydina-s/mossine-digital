'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@phosphor-icons/react'
import { EASE_OUT_EXPR as EASE } from '@/lib/motion'
import type { ServiceDetail } from '@/lib/services-data'
import { SERVICE_ICON_MAP } from '@/components/services/service-icons'

// ─────────────────────────────────────────────────────────────────
//  ServiceDetailBlock — bloc éditorial par service, layout alterné
//  Pattern : numéro géant en filigrane / texte 45% / visuel 55%
//  Côté alterné en fonction du flag reverse.
// ─────────────────────────────────────────────────────────────────

interface Props {
  service: ServiceDetail
  /** Si true → image à gauche / texte à droite (alternance visuelle) */
  reverse?: boolean
  /** Si true → fond bleu très clair (#F0F7FF), sinon fond blanc */
  tinted?: boolean
}

export function ServiceDetailBlock({ service, reverse = false, tinted = false }: Props) {
  const reduced = useReducedMotion() ?? false
  const Icon = SERVICE_ICON_MAP[service.iconKey]

  const enter = reduced
    ? undefined
    : {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.7, ease: EASE },
      }

  return (
    <section
      id={service.id}
      aria-labelledby={`service-${service.id}-title`}
      className="relative overflow-hidden scroll-mt-24"
      style={{
        backgroundColor: tinted ? '#F0F7FF' : '#FFFFFF',
        paddingTop: 'var(--md-space-section)',
        paddingBottom: 'var(--md-space-section)',
      }}
    >
      {/* Numéro géant en filigrane — asymétrique selon reverse */}
      <div
        aria-hidden
        className={`pointer-events-none absolute top-4 select-none font-[family-name:var(--md-font-display)] font-bold leading-none tracking-tighter text-black/[0.035] sm:top-8 ${
          reverse ? 'right-4 sm:right-8' : 'left-4 sm:left-8'
        }`}
        style={{
          fontSize: 'clamp(9rem, 22vw, 20rem)',
        }}
      >
        {service.number}
      </div>

      <div className="container-md relative">
        <div
          className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
            reverse ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* ─── Bloc texte ─── */}
          <motion.div {...enter} className="relative">
            {/* Eyebrow : icône + tag + flagship badge */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{
                  backgroundColor: `${service.accent}1f`,
                  color: service.accent,
                }}
              >
                <Icon size={14} weight="regular" />
                {service.eyebrow}
              </span>
              {service.flagship && (
                <span className="inline-flex items-center rounded-full border border-[var(--md-accent)]/30 bg-[var(--md-accent)]/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--md-accent)]">
                  Offre signature
                </span>
              )}
            </div>

            {/* Titre */}
            <h2
              id={`service-${service.id}-title`}
              className="font-[family-name:var(--md-font-display)] text-[var(--md-primary)]"
              style={{
                fontSize: 'clamp(1.85rem, 3vw + 0.5rem, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              {service.title}
            </h2>

            {/* Problem statement (éditorial italique) */}
            <p
              className="mt-6 font-[family-name:var(--md-font-display)] italic text-[var(--md-primary)]/70"
              style={{
                fontSize: 'clamp(1.05rem, 1.2vw + 0.5rem, 1.35rem)',
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
              }}
            >
              « {service.problem} »
            </p>

            {/* Promise */}
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--md-primary)]/75 sm:text-base">
              {service.promise}
            </p>

            {/* Approche */}
            <div className="mt-8">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--md-primary)]/45">
                Notre approche
              </p>
              <ul className="space-y-2.5">
                {service.approach.map((step) => (
                  <li key={step} className="flex items-start gap-3 text-[15px] text-[var(--md-primary)]/80">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: service.accent }}
                    />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline + CTA */}
            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--md-primary)]/45">
                  Délai indicatif
                </span>
                <span className="mt-1 text-sm font-medium text-[var(--md-primary)]">
                  {service.timeline}
                </span>
              </div>

              <Link
                href={`/contact?service=${service.id}`}
                aria-label={`Démarrer un projet ${service.title}`}
                className="group inline-flex w-fit items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{
                  borderColor: service.accent,
                  color: service.accent,
                  outlineColor: service.accent,
                }}
              >
                Démarrer ce projet
                <ArrowUpRightIcon
                  size={14}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </motion.div>

          {/* ─── Bloc visuel : image + livrables en carte glass ─── */}
          <motion.div {...enter} className="relative">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] shadow-[0_30px_80px_-30px_rgba(27,31,59,0.35)] sm:aspect-[5/6] lg:aspect-[4/5]"
              style={{
                backgroundColor: tinted ? '#FFFFFF' : '#F0F7FF',
              }}
            >
              <Image
                src={service.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Voile dégradé léger pour marier l'image au fond */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(170deg, transparent 55%, ${service.accent}22 100%)`,
                }}
              />
            </div>

            {/* Carte livrables — flottante sur l'image en desktop */}
            <div className="mt-5 rounded-2xl border border-black/5 bg-white/95 p-6 shadow-[0_20px_50px_-20px_rgba(27,31,59,0.15)] backdrop-blur-md lg:absolute lg:-bottom-6 lg:left-6 lg:right-6 lg:mt-0">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--md-primary)]/45">
                Ce que vous recevez
              </p>
              <ul className="grid gap-2.5">
                {service.deliverables.map((deliverable) => (
                  <li
                    key={deliverable}
                    className="flex items-start gap-2.5 text-[14px] leading-snug text-[var(--md-primary)]/85"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${service.accent}1f` }}
                    >
                      <CheckIcon size={11} weight="bold" style={{ color: service.accent }} />
                    </span>
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
