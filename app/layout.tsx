import type { Metadata, Viewport } from 'next'
import { syne, inter } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { BackToTop } from '@/components/ui/BackToTop'
import './globals.css'

// ─────────────────────────────────────────────────────────────────
//  SEO — Métadonnées globales + Open Graph + Twitter Card
//  Domaine de production : à confirmer avec le client avant mise en
//  ligne (fallback sur NEXT_PUBLIC_SITE_URL si défini).
// ─────────────────────────────────────────────────────────────────

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mossine-digital.com'
const SITE_NAME = 'Mossine Digital'
// Description SEO — tonalité inclusive (marques + causes + ONG / organisations).
// Option D validée client 2026-04-15 : cible commerciale ET institutionnelle.
const SITE_DESCRIPTION =
  'Agence de communication et marketing digital 360°. Branding, site web, SEO, ads et community management — pour les marques, les causes et les ONG qui veulent rendre visible ce qui compte.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Agence Communication & Marketing Digital 360°`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    // Segment commercial
    'agence communication',
    'agence marketing digital',
    'agence communication 360',
    'stratégie communication et marketing digital',
    'branding',
    'identité visuelle',
    'création site web',
    'community management',
    'campagnes Ads',
    'publicité digitale',
    'SEO',
    'SEA',
    'référencement naturel',
    'visibilité digitale',
    // Segment institutionnel / ONG / causes — cible prioritaire Mossine
    'communication ONG',
    'agence communication ONG',
    'communication organisations internationales',
    'marketing digital ONG',
    'communication associative',
    'communication institutionnelle',
    'communication d\'influence',
    'agence communication engagée',
    'Mossine Digital',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Agence Communication & Marketing Digital 360°`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Agence communication 360°`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Agence Communication & Marketing Digital 360°`,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'business',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#1B1F3B' },
  ],
  colorScheme: 'light',
}

// Schema.org WebSite — pour rich snippets Google + SearchAction
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: 'Mossine',
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'fr-FR',
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/logo/logo-bleu.svg`,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Schema.org WebSite — rich snippets moteurs de recherche */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body className={`${syne.variable} ${inter.variable}`}>
        {/* Lien d'évitement pour lecteurs d'écran (WCAG 2.2) */}
        <a
          href="#contenu-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-[var(--md-secondary)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Aller au contenu principal
        </a>
        <Navbar />
        {children}
        <BackToTop />
      </body>
    </html>
  )
}
