'use client'

import * as React from 'react'
import Lenis from 'lenis'

/**
 * Provider global Lenis — smooth scroll organique.
 * Monté une seule fois dans layout.tsx, enveloppe tout le contenu.
 * Respecte prefers-reduced-motion en désactivant le smooth si activé.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Respecte la préférence utilisateur pour le mouvement réduit
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 0.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      touchMultiplier: 2,
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
