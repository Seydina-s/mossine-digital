'use client'

import * as React from 'react'

/**
 * Déclenche le callback quand l'utilisateur presse Escape.
 * Ne fait rien si `active` est false — évite les handlers morts quand
 * le composant (ex: menu mobile) n'est pas ouvert.
 */
export function useEscape(callback: () => void, active: boolean = true): void {
  React.useEffect(() => {
    if (!active) return

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        callback()
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [callback, active])
}
