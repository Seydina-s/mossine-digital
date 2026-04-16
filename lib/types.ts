import type { ComponentType } from 'react'

// ─────────────────────────────────────────────────────────────────
//  Types partagés — projet Mossine Digital
// ─────────────────────────────────────────────────────────────────

/**
 * Signature commune des icônes Phosphor (`@phosphor-icons/react`).
 * Permet de typer une icône passée en prop ou stockée dans un tableau
 * de données **interne à un composant client**.
 *
 * 🛡️ RÈGLE VACCIN (ne JAMAIS enfreindre) :
 * Ce type représente un composant React (objet `$$typeof + render`).
 * Il est donc **NON sérialisable** et ne peut PAS traverser la
 * frontière RSC (server → client). Interdiction formelle de typer un
 * champ de donnée exporté depuis `lib/` avec `PhosphorIcon`. Pour
 * associer un visuel à une donnée de `lib/`, utiliser une clé string
 * littérale (ex. `iconKey: 'palette' | 'globe' | ...`) puis résoudre
 * le composant côté consommateur via un `Record<Key, PhosphorIcon>`.
 * Cf. `lib/services-data.ts` pour l'implémentation de référence.
 */
export type PhosphorIcon = ComponentType<{
  size?: number
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  className?: string
}>
