import type { MetadataRoute } from 'next'
import { SITE_URL as BASE_SITE_URL } from '@/lib/site-config'

// ─────────────────────────────────────────────────────────────────
//  Sitemap dynamique — généré par Next.js à /sitemap.xml
//  URL résolue dans lib/site-config.ts (SSoT NEXT_PUBLIC_SITE_URL).
//  /blog stub listé (robots:noindex) — Google ignore. /portfolio
//  volontairement ABSENT : la page existe en background mais n'est
//  ni liée depuis le site ni exposée aux crawlers tant que l'agence
//  n'a pas de cas clients publiables. Réactivation : remettre
//  l'entrée + réinsérer la section Portfolio (cf. app/page.tsx).
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
