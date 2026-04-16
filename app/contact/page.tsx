import type { Metadata } from 'next'
import {
  ClockClockwiseIcon,
  ShieldCheckIcon,
  ChatCircleTextIcon,
} from '@phosphor-icons/react/dist/ssr'
import { ContactForm } from '@/components/sections/ContactForm'
import { Footer } from '@/components/layout/Footer'
import { contactSchema, type ContactPayload } from '@/lib/contact-schema'

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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mossine-digital.com'

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
//  Pré-sélection service depuis /contact?service=<id>
//  🛡️ Vaccin boundary : le query param est validé par le MÊME schéma
//  Zod que le form lui-même (`contactSchema.shape.service`). Toute
//  valeur absente, mal orthographiée ou retirée de SERVICE_OPTIONS
//  retombe silencieusement à `undefined` → le form s'affiche comme
//  une arrivée directe. Aucun drift possible entre URL et schéma.
// ─────────────────────────────────────────────────────────────────

function parseServiceParam(raw: unknown): ContactPayload['service'] | undefined {
  if (typeof raw !== 'string') return undefined
  const parsed = contactSchema.shape.service.safeParse(raw)
  return parsed.success ? parsed.data : undefined
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const initialService = parseServiceParam(params.service)

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
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--md-secondary)]">
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
            <span className="italic text-[var(--md-secondary)]">projet</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[var(--md-text-muted)] sm:text-[17px]">
            Un brief, une question, une envie de refonte ? Remplissez ce
            formulaire — on revient vers vous sous 24h ouvrées avec un premier
            retour construit.
          </p>
        </div>

        {/* ─── Grille formulaire + réassurance ─── */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-12">
          <ContactForm initialService={initialService} />

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
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--md-secondary-light)] text-[var(--md-secondary)]">
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
