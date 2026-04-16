// ─────────────────────────────────────────────────────────────────
//  sanity/env.ts — source unique des variables d'environnement Sanity
//
//  🛡️ Règle anti-build-break :
//  Les valeurs peuvent être vides pendant le dev (avant que le client
//  fournisse son projectId). Le build Next.js DOIT rester vert.
//  → `assertSanityConfigured()` est appelé UNIQUEMENT au moment des
//    fetch réels (runtime côté serveur). Tant qu'aucune page ne fait
//    de requête GROQ, l'absence d'env ne casse rien.
//
//  Les exports `projectId` / `dataset` sont lus tels quels (string
//  éventuellement vide). Les consommateurs (client, image, studio)
//  doivent appeler `assertSanityConfigured()` avant usage.
// ─────────────────────────────────────────────────────────────────

/** Identifiant projet Sanity — https://sanity.io/manage */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''

/** Dataset (production par défaut — séparation dev/prod via datasets différents) */
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

/**
 * Version d'API figée (format YYYY-MM-DD).
 * Ne JAMAIS utiliser "v1" ou une date qui flotte — les GROQ queries
 * peuvent changer de comportement entre versions d'API.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-04-16'

/**
 * Token de lecture — obligatoire pour les fetch serveur qui utilisent
 * `useCdn: false` (preview, drafts, perform). Jamais exposé au client.
 */
export const readToken = process.env.SANITY_API_READ_TOKEN ?? ''

/**
 * Garde-fou runtime : appelée avant tout fetch GROQ. Si `projectId`
 * est vide ou reste au placeholder `TODO_CLIENT`, on arrête net avec
 * un message clair plutôt que de laisser une erreur réseau obscure.
 *
 * Renvoie le projectId validé (non-null) pour usage immédiat.
 */
export function assertSanityConfigured(): string {
  if (!projectId || projectId === 'TODO_CLIENT') {
    throw new Error(
      '[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID manquant. ' +
        'Créer un projet sur https://sanity.io/manage puis renseigner ' +
        'la variable dans .env.local.',
    )
  }
  return projectId
}

/** True si la config Sanity est prête — utile pour des feature flags UI. */
export function isSanityConfigured(): boolean {
  return !!projectId && projectId !== 'TODO_CLIENT'
}
