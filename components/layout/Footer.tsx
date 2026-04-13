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
  ArrowUpRightIcon,
} from '@phosphor-icons/react'

// ─────────────────────────────────────────────────────────────────
//  DONNÉES — ⚠️ TODO_CLIENT : confirmer les informations de contact
//  (adresse, téléphone, email, liens réseaux sociaux)
// ─────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Agence', href: '/a-propos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const SERVICE_LINKS = [
  { label: 'Identité visuelle & Branding', href: '/services' },
  { label: 'Création de site web', href: '/services' },
  { label: 'Community management', href: '/services' },
  { label: 'Publicité digitale (Ads)', href: '/services' },
  { label: 'SEO & Référencement', href: '/services' },
  { label: 'Stratégie digitale 360°', href: '/services' },
]

// ⚠️ TODO_CLIENT : liens réels à fournir (Facebook, Instagram, TikTok, LinkedIn, WhatsApp)
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
  href: string
  external?: boolean
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: EnvelopeSimpleIcon,
    label: 'contact@mossinedigital.com',
    href: 'mailto:contact@mossinedigital.com',
  },
  // ⚠️ TODO_CLIENT : téléphone et adresse à confirmer avant réactivation
  // {
  //   icon: PhoneIcon,
  //   label: '+XX X XX XX XX XX',
  //   href: 'tel:+XXXXXXXXXXX',
  // },
  // {
  //   icon: MapPinIcon,
  //   label: 'Ville, Pays',
  //   href: '#',
  // },
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
              className="mb-5 inline-block transition-opacity hover:opacity-80"
              aria-label="Accueil Mossine Digital"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo/logo-blanc.svg"
                alt="Mossine Digital"
                className="h-9 w-auto object-contain"
              />
            </Link>

            <p className="mb-6 max-w-[260px] text-sm leading-relaxed text-white/45">
              Agence de communication et marketing digital 360. Stratégie,
              branding, web et social media réunis pour construire votre
              présence digitale.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex gap-3" role="list" aria-label="Nos réseaux sociaux">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    role="listitem"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors duration-200 hover:border-[var(--md-secondary)]/40 hover:text-[var(--md-secondary)]"
                  >
                    <Icon size={16} weight="regular" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* ── Colonne 2 : Navigation ── */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
              Navigation
            </h3>
            <nav aria-label="Navigation principale footer">
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
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
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Colonne 4 : Contact ── */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
              Contact
            </h3>
            <ul className="mb-6 flex flex-col gap-4">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group flex items-start gap-3 text-sm text-white/50 transition-colors duration-200 hover:text-white"
                    >
                      <Icon
                        size={15}
                        weight="regular"
                        className="mt-0.5 shrink-0 text-[var(--md-secondary)] opacity-60 group-hover:opacity-100"
                      />
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* CTA contact */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--md-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--md-accent-hover)]"
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
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Mossine Digital. Tous droits réservés.
          </p>
          <nav aria-label="Liens légaux">
            <ul className="flex flex-wrap justify-center gap-4 sm:justify-end">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-xs text-white/25 transition-colors duration-200 hover:text-white/50"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="text-xs text-white/25 transition-colors duration-200 hover:text-white/50"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/cgv"
                  className="text-xs text-white/25 transition-colors duration-200 hover:text-white/50"
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
