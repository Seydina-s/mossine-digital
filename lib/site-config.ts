// ─────────────────────────────────────────────────────────────────
//  Site URL — source unique de vérité pour canonical, OG, sitemap,
//  robots, JSON-LD, et toute URL absolue émise côté serveur.
//
//  ⚠️ NEXT_PUBLIC_SITE_URL DOIT être set en production. Sans cette
//  variable, toutes les URLs absolues (canonical, OG, sitemap.xml)
//  retombent sur le fallback `FALLBACK_SITE_URL`. Si le domaine
//  final diffère, Google indexera les mauvaises URLs, les previews
//  sociales pointeront vers un domaine erroné, et `sitemap.xml`
//  annoncera des URLs inaccessibles.
//
//  Ne JAMAIS relire `process.env.NEXT_PUBLIC_SITE_URL` ailleurs dans
//  le code — importer `SITE_URL` depuis ce module. Toute duplication
//  introduit un risque de drift (fallback différent par fichier).
// ─────────────────────────────────────────────────────────────────

const FALLBACK_SITE_URL = 'https://mossine-digital.com'

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

// Garde-fou build : en production, l'absence du var est un défaut
// de configuration. On n'empêche pas le build (éviterait toute
// preview anonyme) mais on log un avertissement bien visible.
if (process.env.NODE_ENV === 'production' && !configuredUrl) {
  console.warn(
    '[site-config] NEXT_PUBLIC_SITE_URL non défini en production — ' +
      `canonical, OG et sitemap utiliseront le fallback ${FALLBACK_SITE_URL}. ` +
      'Configurer la variable dans .env.production avant déploiement.',
  )
}

export const SITE_URL = configuredUrl ?? FALLBACK_SITE_URL
