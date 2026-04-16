import type { MetadataRoute } from 'next'

// ─────────────────────────────────────────────────────────────────
//  robots.txt dynamique — généré par Next.js à /robots.txt
//  Autorise tous les crawlers sur le site public, bloque les routes
//  techniques (_next, api). Pointe vers le sitemap.
// ─────────────────────────────────────────────────────────────────

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mossine-digital.com'
).replace(/\/$/, '')

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
