import 'server-only'
import { createClient, type SanityClient } from 'next-sanity'
import {
  apiVersion,
  assertSanityConfigured,
  dataset,
  readToken,
} from './env'

// ─────────────────────────────────────────────────────────────────
//  sanity/client.ts — client GROQ serveur-only
//
//  🛡️ Protection vaccin RSC :
//  Le `import 'server-only'` casse le build si un composant client
//  tente d'importer ce module. Les pages qui consomment les données
//  Sanity sont des server components ; elles transforment les
//  documents en objets JSON-sérialisables AVANT de les passer à un
//  composant client.
//
//  Deux clients :
//    - `sanityClient`  : CDN activé (cache Sanity), pour prod
//    - `sanityPreview` : CDN désactivé + token, pour drafts/preview
//
//  La configuration est validée à l'appel (pas à l'import) → le
//  build ne casse pas si l'env est vide pendant le dev initial.
// ─────────────────────────────────────────────────────────────────

let _client: SanityClient | null = null
let _previewClient: SanityClient | null = null

/** Client production — lectures cachées via sanity CDN (edge). */
export function getSanityClient(): SanityClient {
  if (_client) return _client
  const projectId = assertSanityConfigured()
  _client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: 'published',
  })
  return _client
}

/** Client preview — lit les drafts, nécessite le token de lecture. */
export function getSanityPreviewClient(): SanityClient {
  if (_previewClient) return _previewClient
  const projectId = assertSanityConfigured()
  if (!readToken) {
    throw new Error(
      '[sanity] SANITY_API_READ_TOKEN manquant — impossible de lire les drafts. ' +
        'Générer un token Viewer sur sanity.io/manage → API → Tokens.',
    )
  }
  _previewClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: readToken,
    perspective: 'previewDrafts',
  })
  return _previewClient
}

/**
 * Fetch GROQ typé — wrapper unique pour toutes les pages.
 *
 * @param query     Requête GROQ
 * @param params    Paramètres interpolés
 * @param options   `preview: true` pour lire les drafts
 *
 * Pattern de cache : on utilise `next.revalidate` pour le ISR
 * (revalidation toutes les 60s en prod par défaut — ajustable
 * par requête). Les mutations depuis le Studio déclencheront
 * une revalidation via webhook (à configurer Sprint 4).
 */
export async function sanityFetch<T>({
  query,
  params = {},
  preview = false,
  revalidate = 60,
  tags,
}: {
  query: string
  params?: Record<string, unknown>
  preview?: boolean
  revalidate?: number | false
  tags?: string[]
}): Promise<T> {
  const client = preview ? getSanityPreviewClient() : getSanityClient()
  return client.fetch<T>(query, params, {
    next: {
      revalidate: preview ? 0 : revalidate,
      tags,
    },
  })
}
