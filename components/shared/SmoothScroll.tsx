'use client'

import * as React from 'react'

/**
 * SmoothScroll — DÉSACTIVÉ DÉFINITIVEMENT (2026-04-13).
 *
 * Lenis créait une traîne perceptible sur le Hero (scroll "qui bug").
 * On repasse sur le scroll natif du navigateur : prévisible, instantané,
 * zéro overhead GPU. Pour un scroll doux sur les ancres internes,
 * `scroll-behavior: smooth` dans globals.css suffit.
 *
 * Ne PAS réactiver sans audit perf sur Hero + bench sur machine lente.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
