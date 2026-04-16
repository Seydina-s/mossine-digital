import type { MetadataRoute } from 'next'

// ─────────────────────────────────────────────────────────────────
//  Sitemap dynamique — généré par Next.js à /sitemap.xml
//  Utilise NEXT_PUBLIC_SITE_URL (fallback : https://mossine-digital.com)
//  /blog et /portfolio sont encore des stubs (robots:noindex côté
//  page) mais listés pour faciliter l'exploration — Google ignorera.
// ─────────────────────────────────────────────────────────────────

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mossine-digital.com'
).replace(/\/$/, '')

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/a-propos`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/politique-confidentialite`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}
