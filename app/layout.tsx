import type { Metadata, Viewport } from 'next'
import { syne, inter } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { BackToTop } from '@/components/ui/BackToTop'
import { SITE_URL } from '@/lib/site-config'
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoscript,
} from '@/components/analytics/GoogleTagManager'
import './globals.css'

// GTM container ID — public, injecté côté client. `undefined` en local
// tant que `NEXT_PUBLIC_GTM_ID` n'est pas dans .env.local → les scripts
// GTM ne se chargent pas (mode gracieux, cohérent avec Resend/hCaptcha).
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

// ─────────────────────────────────────────────────────────────────
//  SEO — Métadonnées globales + Open Graph + Twitter Card
//  `SITE_URL` est résolu dans `lib/site-config.ts` (SSoT).
// ─────────────────────────────────────────────────────────────────

const SITE_NAME = 'Mossine Digital'
// Description SEO — tonalité inclusive (marques + causes + ONG / organisations).
// Option D validée client 2026-04-15 : cible commerciale ET institutionnelle.
const SITE_DESCRIPTION =
  'Agence de communication et marketing digital 360°. Branding, site web, gestion des réseaux sociaux, référencement et campagnes publicitaires — pour les marques, les causes et les ONG qui veulent rendre visible ce qui compte.'

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
    'agence communication Dakar',
    'agence marketing digital Sénégal',
    'stratégie communication et marketing digital',
    'branding',
    'identité visuelle',
    'création site web',
    'gestion réseaux sociaux',
    'community management',
    'campagnes publicitaires',
    'Meta Ads',
    'LinkedIn Ads',
    'TikTok Ads',
    'Google Ads',
    'SEO',
    'SEA',
    'référencement naturel',
    'référencement payant',
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
    // L'image Open Graph est générée dynamiquement par `app/opengraph-image.tsx`
    // et injectée automatiquement par Next.js. Ne pas redéclarer `images` ici
    // sous peine de meta tags dupliqués (un pointant vers la route dynamique,
    // un pointant vers une URL statique potentiellement 404).
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Agence Communication & Marketing Digital 360°`,
    description: SITE_DESCRIPTION,
    // Même logique : `app/twitter-image.tsx` prendrait le relais si présent.
    // En son absence, Twitter retombe sur l'OG image (comportement standard).
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
  // Icônes auto-détectées par Next.js App Router depuis `app/favicon.ico`,
  // `app/icon.png` (512×512 transparent) et `app/apple-icon.png` (180×180
  // fond blanc). Régénération via `node scripts/generate-favicon.mjs`
  // après mise à jour de `public/images/logo/logo-mark.png`.
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

// ─────────────────────────────────────────────────────────────────
//  Schema.org — 2 nœuds chaînés par `@id` (DRY, canonique Google 2024).
//
//  1. LocalBusiness (+ ProfessionalService sous-type) — NAP complet :
//     adresse postale, téléphone, email, horaires, zone desservie.
//     `priceRange: "$"` = recommandation Google par défaut quand le
//     pricing n'est pas public (agence sur devis). `@id` stable sert
//     d'ancre pour les autres nœuds.
//  2. WebSite — publisher référence LocalBusiness par `@id` plutôt
//     que de dupliquer les champs Organization.
//
//  NB : `image` pointe vers `/opengraph-image` (route dynamique Next)
//  sans extension — la route `.png` retourne 404, c'est le chemin
//  canonique de la convention App Router.
// ─────────────────────────────────────────────────────────────────

const ORG_ID = `${SITE_URL}/#organization`

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': ORG_ID,
  name: SITE_NAME,
  alternateName: 'Mossine',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/opengraph-image`,
  description: SITE_DESCRIPTION,
  telephone: '+221771871818',
  email: 'contact@mossinedigital.com',
  priceRange: '$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pôle Urbain de Diamniadio, Sortie 11 du péage',
    addressLocality: 'Diamniadio',
    addressRegion: 'Dakar',
    addressCountry: 'SN',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Sénégal',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: 'Mossine',
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'fr-FR',
  publisher: { '@id': ORG_ID },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Google Tag Manager — chargé en `afterInteractive` pour ne pas
            bloquer le rendu initial. Conteneur unique : GA4, Meta Pixel
            et toute autre balise sont configurés dans l'UI GTM. */}
        <GoogleTagManagerScript gtmId={GTM_ID} />
        {/* Schema.org LocalBusiness — NAP + horaires + zone desservie */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        {/* Schema.org WebSite — publisher référencé par @id (DRY) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body className={`${syne.variable} ${inter.variable}`}>
        {/* GTM noscript fallback — visiteurs sans JavaScript */}
        <GoogleTagManagerNoscript gtmId={GTM_ID} />
        {/* Lien d'évitement pour lecteurs d'écran (WCAG 2.2) */}
        <a
          href="#contenu-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-[var(--md-secondary-text)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
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
