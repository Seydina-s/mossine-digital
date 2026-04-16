import type { Metadata } from 'next'
import { ServicesPageHero } from '@/components/services/ServicesPageHero'
import { ServiceDetailBlock } from '@/components/services/ServiceDetailBlock'
import { ServicesFAQ } from '@/components/services/ServicesFAQ'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { Footer } from '@/components/layout/Footer'
import { SERVICES_DETAIL, SERVICES_FAQ } from '@/lib/services-data'

// ─────────────────────────────────────────────────────────────────
//  SEO — Metadata page /services
// ─────────────────────────────────────────────────────────────────

const PAGE_DESCRIPTION =
  'Six leviers complémentaires pour rendre visibles les marques, les causes et les organisations engagées. Identité visuelle, site web, community management, campagnes Ads, SEO et stratégie 360° — méthode, livrables et délais détaillés.'

export const metadata: Metadata = {
  title: 'Services',
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Nos services — Mossine Digital',
    description: PAGE_DESCRIPTION,
    url: '/services',
    type: 'website',
  },
  twitter: {
    title: 'Nos services — Mossine Digital',
    description: PAGE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
}

// ─────────────────────────────────────────────────────────────────
//  JSON-LD : Service × 6 + BreadcrumbList + FAQPage
//  Provider Organization = Mossine Digital (cross-ref layout.tsx)
// ─────────────────────────────────────────────────────────────────

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mossine-digital.com'

const servicesJsonLd = {
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
          name: 'Services',
          item: `${SITE_URL}/services`,
        },
      ],
    },
    ...SERVICES_DETAIL.map((s) => ({
      '@type': 'Service',
      '@id': `${SITE_URL}/services#${s.id}`,
      name: s.title,
      description: s.promise,
      provider: {
        '@type': 'Organization',
        name: 'Mossine Digital',
        url: SITE_URL,
      },
      areaServed: { '@type': 'Place', name: 'Sénégal et international' },
      serviceType: s.eyebrow,
      url: `${SITE_URL}/services#${s.id}`,
    })),
    {
      '@type': 'FAQPage',
      mainEntity: SERVICES_FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
}

// ─────────────────────────────────────────────────────────────────
//  PAGE — /services
//  Alternance : 01 normal / 02 reverse tinted / 03 normal / 04 reverse tinted…
// ─────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      <main>
        <ServicesPageHero />

        {SERVICES_DETAIL.map((service, i) => (
          <ServiceDetailBlock
            key={service.id}
            service={service}
            reverse={i % 2 === 1}
            tinted={i % 2 === 1}
          />
        ))}

        <ServicesFAQ />

        <CTAFinal />
      </main>

      <Footer />
    </>
  )
}
