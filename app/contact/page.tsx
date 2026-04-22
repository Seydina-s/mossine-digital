import { Suspense } from 'react'
import type { Metadata } from 'next'
import {
  ClockClockwiseIcon,
  ShieldCheckIcon,
  ChatCircleTextIcon,
} from '@phosphor-icons/react/dist/ssr'
import { ContactForm } from '@/components/sections/ContactForm'
import { Footer } from '@/components/layout/Footer'
import { SITE_URL } from '@/lib/site-config'

// ─────────────────────────────────────────────────────────────────
//  SEO — Metadata page /contact
// ─────────────────────────────────────────────────────────────────

const PAGE_DESCRIPTION =
  "Parlons de votre projet. Réponse sous 24h ouvrées, devis gratuit et sans engagement. Contactez Mossine Digital via notre formulaire sécurisé."

export const metadata: Metadata = {
  title: 'Contact',
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — Mossine Digital',
    description: PAGE_DESCRIPTION,
    url: '/contact',
    type: 'website',
  },
  twitter: {
    title: 'Contact — Mossine Digital',
    description: PAGE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
}

// ─────────────────────────────────────────────────────────────────
//  JSON-LD : ContactPage + BreadcrumbList
//  Cross-ref Organization sur layout.tsx (déjà présent globalement).
// ─────────────────────────────────────────────────────────────────

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact',
          item: `${SITE_URL}/contact`,
        },
      ],
    },
    {
      '@type': 'ContactPage',
      '@id': `${SITE_URL}/contact`,
      name: 'Contact — Mossine Digital',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/contact`,
      inLanguage: 'fr-FR',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
      },
    },
  ],
}

const REASSURANCE = [
  {
    icon: ClockClockwiseIcon,
    title: 'Réponse sous 24h',
    description: 'Un retour humain sous 24h ouvrées, analyse de votre brief incluse.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Confidentialité stricte',
    description: 'Vos informations restent entre nous. Zéro revente, zéro tracking tiers.',
  },
  {
    icon: ChatCircleTextIcon,
    title: 'Sans engagement',
    description: 'Un premier échange pour qualifier votre besoin. Devis seulement si pertinent.',
  },
]

// ─────────────────────────────────────────────────────────────────
//  Page 100% statique : pas de searchParams côté server component.
//  La pré-sélection `?service=<id>` est lue client-side par
//  ContactForm via `useSearchParams()`, ce qui permet à Vercel de
//  servir la page depuis le CDN (TTFB < 50ms) au lieu d'un
//  serverless function cold-start (~500ms). Le ContactForm est
//  wrappé dans <Suspense> — requis pour que `useSearchParams()` ne
//  force pas toute la page en rendu dynamique.
// ─────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <main
        id="contenu-principal"
        className="relative overflow-hidden bg-[var(--md-bg)] pb-24 pt-32 sm:pt-40"
      >
      {/* ─── En-tête éditorial ─── */}
      <div className="container-md relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--md-secondary-text)]">
            Démarrer un projet
          </p>
          <h1
            className="font-[family-name:var(--md-font-display)] text-[var(--md-primary)]"
            style={{
              fontSize: 'clamp(2.25rem, 5vw + 0.5rem, 4rem)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
            }}
          >
            Parlons de votre{' '}
            <span className="italic text-[var(--md-secondary-text)]">projet</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[var(--md-text-muted)] sm:text-[17px]">
            Un brief, une question, une envie de refonte ? Remplissez ce
            formulaire — on revient vers vous sous 24h ouvrées avec un premier
            retour construit.
          </p>
        </div>

        {/* ─── Grille formulaire + réassurance ─── */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-12">
          <Suspense fallback={<ContactFormSkeleton />}>
            <ContactForm />
          </Suspense>

          <aside
            aria-label="Nos engagements"
            className="flex flex-col gap-5 lg:sticky lg:top-28"
          >
            {REASSURANCE.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-[var(--md-border)] bg-white p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--md-secondary-light)] text-[var(--md-secondary-text)]">
                    <Icon size={20} weight="regular" />
                  </div>
                  <div>
                    <p className="font-[family-name:var(--md-font-display)] text-sm font-semibold text-[var(--md-primary)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--md-text-muted)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </aside>
        </div>
      </div>
      </main>

      <Footer />
    </>
  )
}

// Skeleton minimal pendant l'hydratation du ContactForm (Suspense
// fallback). Conserve les dimensions pour éviter les layout shifts.
function ContactFormSkeleton() {
  return (
    <div
      aria-hidden
      className="rounded-2xl border border-[var(--md-border)] bg-white p-6 shadow-[0_4px_24px_-8px_rgba(16,19,42,0.06)] sm:p-8 lg:p-10"
      style={{ minHeight: 720 }}
    >
      <div className="flex flex-col gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-3.5 w-24 animate-pulse rounded bg-[var(--md-border)]" />
            <div className="h-10 w-full animate-pulse rounded-lg bg-[var(--md-border)]/60" />
          </div>
        ))}
      </div>
    </div>
  )
}
