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

    // Config réactive : duration courte + easing rapide + multiplicateur
    // supérieur pour que la molette "colle" sans traîne.
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.25,
      touchMultiplier: 2,
      smoothWheel: true,
      lerp: 0.12,
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
