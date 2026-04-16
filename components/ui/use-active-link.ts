'use client'

import { usePathname } from 'next/navigation'

/**
 * Détecte si un lien correspond à la page courante — pour `aria-current="page"`
 * et l'indicateur visuel permanent (underline).
 *
 * Règle :
 *  - "/"            → match exact uniquement
 *  - "/services"    → match exact OU tout sous-chemin (/services/audit, etc.)
 */
export function useActiveLink(href: string): boolean {
  const pathname = usePathname()
  if (!pathname) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}
