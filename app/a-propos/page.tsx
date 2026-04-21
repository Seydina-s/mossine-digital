import type { Metadata } from 'next'
import { AboutHero } from '@/components/about/AboutHero'
import { AboutManifesto } from '@/components/about/AboutManifesto'
import { AboutValues } from '@/components/about/AboutValues'
import { AboutMethod } from '@/components/about/AboutMethod'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { Footer } from '@/components/layout/Footer'
import { SITE_URL } from '@/lib/site-config'

// ─────────────────────────────────────────────────────────────────
//  SEO — Metadata page /a-propos
// ─────────────────────────────────────────────────────────────────

const PAGE_DESCRIPTION =
  "Mossine Digital est une agence de communication et marketing digital 360° pensée pour aligner branding, web, SEO, ads et community autour d'un même objectif business. Pour les marques, les causes et les ONG qui veulent rendre visible ce qui compte."

export const metadata: Metadata = {
  title: "L'agence",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/a-propos' },
  openGraph: {
    title: "L'agence — Mossine Digital",
    description: PAGE_DESCRIPTION,
    url: '/a-propos',
    type: 'website',
  },
  twitter: {
    title: "L'agence — Mossine Digital",
    description: PAGE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
}

// ─────────────────────────────────────────────────────────────────
//  JSON-LD : AboutPage + BreadcrumbList + Organization (cross-ref layout)
// ─────────────────────────────────────────────────────────────────

const aboutJsonLd = {
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
          name: "L'agence",
          item: `${SITE_URL}/a-propos`,
        },
      ],
    },
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/a-propos`,
      name: "L'agence — Mossine Digital",
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}/a-propos`,
      mainEntity: {
        '@type': 'Organization',
        name: 'Mossine Digital',
        url: SITE_URL,
        description:
          "Agence de communication et marketing digital 360° pour les marques, les causes et les ONG qui veulent rendre visible ce qui compte.",
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────────
//  PAGE — /a-propos
//  Hero sombre (aurora) → Manifeste → Valeurs → Méthode → CTA final
//
//  ⚠️ TODO_CLIENT — Section Équipe à ajouter quand les infos sont
//  disponibles (prénom/nom, rôle, bio courte, photo ronde WebP
//  ≤ 150kb, liens LinkedIn). Pas de fabrication — on attend.
//  Structure suggérée : grille 2-4 cards entre AboutMethod et
//  CTAFinal. Nouveau composant `AboutTeam.tsx` à créer.
// ─────────────────────────────────────────────────────────────────

export default function AProposPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <main>
        <AboutHero />
        <AboutManifesto />
        <AboutValues />
        <AboutMethod />
        <CTAFinal />
      </main>

      <Footer />
    </>
  )
}
