'use client'

import * as React from 'react'

// Sélecteur des éléments focusables standard (Mozilla a11y)
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Piège le focus clavier (Tab / Shift+Tab) à l'intérieur du container
 * pendant que `active` est true.
 *
 * À l'activation : focus le premier élément focusable du container.
 * À la désactivation : restaure le focus sur l'élément qui l'avait avant
 * l'ouverture (ex: bouton hamburger) — pattern WAI-ARIA pour `role="dialog"`.
 */
export function useFocusTrap<T extends HTMLElement>(
  containerRef: React.RefObject<T | null>,
  active: boolean,
): void {
  const previousFocus = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    if (!active) return
    const container = containerRef.current
    if (!container) return

    // Mémorise l'élément focalisé avant l'ouverture
    previousFocus.current = document.activeElement as HTMLElement | null

    // Focus le premier élément focusable du container (après un micro-tick
    // pour laisser l'overlay s'afficher)
    const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    const first = focusables[0]
    if (first) {
      requestAnimationFrame(() => first.focus())
    }

    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const items = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (items.length === 0) {
        e.preventDefault()
        return
      }

      const firstItem = items[0]
      const lastItem = items[items.length - 1]
      const activeEl = document.activeElement as HTMLElement | null

      if (e.shiftKey) {
        if (activeEl === firstItem || !container.contains(activeEl)) {
          e.preventDefault()
          lastItem.focus()
        }
      } else {
        if (activeEl === lastItem) {
          e.preventDefault()
          firstItem.focus()
        }
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
      // Restaure le focus sur l'élément déclencheur à la fermeture
      if (previousFocus.current && document.body.contains(previousFocus.current)) {
        previousFocus.current.focus()
      }
    }
  }, [active, containerRef])
}
