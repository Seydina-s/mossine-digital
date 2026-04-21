import type { MetadataRoute } from 'next'
import { SITE_URL as BASE_SITE_URL } from '@/lib/site-config'

// ─────────────────────────────────────────────────────────────────
//  robots.txt dynamique — généré par Next.js à /robots.txt
//  Autorise tous les crawlers sur le site public, bloque les routes
//  techniques (_next, api). Pointe vers le sitemap.
// ─────────────────────────────────────────────────────────────────

const SITE_URL = BASE_SITE_URL.replace(/\/$/, '')

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/studio/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
