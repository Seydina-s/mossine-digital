'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  InstagramLogoIcon,
  LinkedinLogoIcon,
  FacebookLogoIcon,
  TiktokLogoIcon,
  WhatsappLogoIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ArrowUpRightIcon,
} from '@phosphor-icons/react'

// ─────────────────────────────────────────────────────────────────
//  DONNÉES — Coordonnées contact confirmées (2026-04-21).
//  Réseaux sociaux : URLs non livrées côté client → les entrées
//  avec `href: '#'` sont automatiquement filtrées au rendu. Dès
//  qu'une URL réelle est fournie, remplacer la valeur et le lien
//  réapparaît (zéro changement de structure).
// ─────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Agence', href: '/a-propos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const SERVICE_LINKS = [
  { label: 'Branding & identité visuelle', href: '/services#identite' },
  { label: 'Création de site web', href: '/services#web' },
  { label: 'Gestion des réseaux sociaux', href: '/services#social' },
  { label: 'Référencement & campagnes publicitaires', href: '/services#seo' },
  { label: 'Stratégie communication & marketing digital', href: '/services#strategie' },
]

// ⚠️ TODO_CLIENT : URLs réseaux sociaux à livrer (en attente 2026-04-21).
// Les entrées avec `href: '#'` sont filtrées à l'affichage (cf. rendu plus bas) —
// elles réapparaissent automatiquement dès qu'une URL réelle est injectée.
const SOCIAL_LINKS = [
  { label: 'Facebook',  href: '#', icon: FacebookLogoIcon },
  { label: 'Instagram', href: '#', icon: InstagramLogoIcon },
  { label: 'TikTok',    href: '#', icon: TiktokLogoIcon },
  { label: 'LinkedIn',  href: '#', icon: LinkedinLogoIcon },
  { label: 'WhatsApp',  href: '#', icon: WhatsappLogoIcon },
]

type PhosphorIcon = React.ComponentType<{
  size?: number
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  className?: string
}>

interface ContactItem {
  icon: PhosphorIcon
  label: string
  // href optionnel : si absent, rendu en <span> (adresse + horaires non cliquables).
  href?: string
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: EnvelopeSimpleIcon,
    label: 'contact@mossinedigital.com',
    href: 'mailto:contact@mossinedigital.com',
  },
  {
    icon: PhoneIcon,
    label: '+221 77 187 18 18',
    // RFC 3966 : téléphone sans espaces dans le tel: URI.
    href: 'tel:+221771871818',
  },
  {
    icon: MapPinIcon,
    label: 'Pôle Urbain de Diamniadio, Sortie 11 du péage',
  },
  {
    icon: ClockIcon,
    label: 'Lun-Ven · 9h-18h (GMT)',
  },
]

// ─────────────────────────────────────────────────────────────────
//  COMPOSANT PRINCIPAL : Footer
// ─────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer
      aria-label="Pied de page Mossine Digital"
      className="bg-[var(--md-bg-darker)]"
    >
      {/* Contenu principal */}
      <div
        className="container-md"
        style={{ paddingTop: 'var(--md-space-section)', paddingBottom: '3rem' }}
      >
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* ── Colonne 1 : À propos ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo SVG blanc */}
            <Link
              href="/"
              className="mb-5 inline-block rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--md-bg-darker)]"
              aria-label="Accueil Mossine Digital"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo/logo-blanc.svg"
                alt="Mossine Digital"
                className="h-9 w-auto object-contain"
              />
            </Link>

            <p className="mb-6 max-w-[260px] text-sm leading-relaxed text-white/60">
              Agence de communication et marketing digital 360°. Branding,
              web, réseaux sociaux, référencement et publicité réunis pour
              construire votre marque et amplifier votre visibilité.
            </p>

            {/* Réseaux sociaux — filtrés : seuls les liens avec URL réelle
                (href !== '#') sont rendus. Si toutes les URLs sont vides,
                le bloc disparaît entièrement plutôt que d'afficher des
                liens cassés qui remontent en haut de page. */}
            {(() => {
              const liveSocials = SOCIAL_LINKS.filter((s) => s.href !== '#')
              if (liveSocials.length === 0) return null
              return (
                <div className="flex gap-3" role="list" aria-label="Nos réseaux sociaux">
                  {liveSocials.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        role="listitem"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/65 transition-colors duration-200 hover:border-[var(--md-secondary)]/40 hover:text-[var(--md-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--md-bg-darker)]"
                      >
                        <Icon size={16} weight="regular" />
                      </a>
                    )
                  })}
                </div>
              )
            })()}
          </div>

          {/* ── Colonne 2 : Navigation ── */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
              Navigation
            </h3>
            <nav aria-label="Navigation principale footer">
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="rounded-sm text-sm text-white/50 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--md-bg-darker)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Colonne 3 : Services ── */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="rounded-sm text-sm text-white/50 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--md-bg-darker)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Colonne 4 : Contact ── */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
              Contact
            </h3>
            <ul className="mb-6 flex flex-col gap-4">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon
                // Adresse et horaires : pas de href → rendu en <span>,
                // sans états hover/focus (non-interactif = pas de confusion).
                const iconEl = (
                  <Icon
                    size={15}
                    weight="regular"
                    className="mt-0.5 shrink-0 text-[var(--md-secondary)] opacity-60 group-hover:opacity-100"
                  />
                )
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="group flex items-start gap-3 rounded-sm text-sm text-white/50 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--md-bg-darker)]"
                      >
                        {iconEl}
                        {item.label}
                      </a>
                    ) : (
                      <span className="group flex items-start gap-3 text-sm text-white/50">
                        {iconEl}
                        {item.label}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* CTA contact */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--md-accent-solid)] px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--md-bg-darker)]"
            >
              Nous contacter
              <ArrowUpRightIcon
                size={13}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Barre basse — copyright & liens légaux */}
      <div className="border-t border-white/[0.06]">
        <div className="container-md flex flex-col items-center gap-3 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Mossine Digital. Tous droits réservés.
          </p>
          <nav aria-label="Liens légaux">
            <ul className="flex flex-wrap justify-center gap-4 sm:justify-end">
              <li>
                <Link
                  href="/mentions-legales"
                  className="rounded-sm text-xs text-white/60 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--md-bg-darker)]"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="rounded-sm text-xs text-white/60 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--md-bg-darker)]"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/cgv"
                  className="rounded-sm text-xs text-white/60 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--md-bg-darker)]"
                >
                  CGV
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
