/**
 * Studio Sanity embed — route /studio
 *
 * ⚠️ Cette route est automatiquement NoIndex côté robots grâce à la
 *    ré-export des metadata depuis `next-sanity/studio` (qui inclut
 *    `robots: noindex` + viewport verrouillé) — elle ne figure PAS
 *    dans le sitemap.
 *
 * Authentification : gérée nativement par Sanity (login via sanity.io).
 * Pour restreindre aux IPs de l'équipe en Sprint 4, ajouter un
 * middleware qui match `/studio/:path*`.
 *
 * Layout : on override le layout global (Navbar/Footer désactivés)
 *          via `app/studio/layout.tsx`.
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

// Le Studio nécessite un rendu dynamique (session, live preview).
export const dynamic = 'force-dynamic'

// Re-export des metadata + viewport fournis par next-sanity/studio :
//   - metadata : robots noindex + theme-color sombre
//   - viewport : max-scale 1 (obligatoire pour l'UI Studio)
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
