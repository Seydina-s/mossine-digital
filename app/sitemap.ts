import type { MetadataRoute } from 'next'
import { SITE_URL as BASE_SITE_URL } from '@/lib/site-config'

// ─────────────────────────────────────────────────────────────────
//  Sitemap dynamique — généré par Next.js à /sitemap.xml
//  URL résolue dans lib/site-config.ts (SSoT NEXT_PUBLIC_SITE_URL).
//  /blog et /portfolio sont encore des stubs (robots:noindex côté
//  page) mais listés pour faciliter l'exploration — Google ignorera.
// ─────────────────────────────────────────────────────────────────

const SITE_URL = BASE_SITE_URL.replace(/\/$/, '')

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
