'use client'
import { useEffect, useRef, useState } from 'react'

// Hystérésis : on passe à "scrolled" au-dessus de `enter`, on revient
// à "top" seulement en-dessous de `exit`. Évite le thrashing quand
// Lenis / momentum scroll oscille autour d'un seuil unique.
//
// 🛡️ Vaccin jank homepage : Lenis émet des événements scroll à ~120Hz.
// Sans throttle, le handler lit `window.scrollY` (layout read) et appelle
// setState à chaque événement → sur pages chargées (Aurora mesh animée +
// stacking cards sticky + carrousel Hero), le main thread sature et la
// transition navbar arrive avec retard visible. Le rAF coalesce plusieurs
// événements scroll en 1 seul calcul par frame — même pattern que
// components/ui/BackToTop.tsx.
export function useScroll(enter: number = 0, exit: number = enter): boolean {
  const [scrolled, setScrolled] = useState(false)
  const scrolledRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const compute = () => {
      rafRef.current = null
      const y = window.scrollY
      const prev = scrolledRef.current
      const next = prev ? y > exit : y > enter
      if (next !== prev) {
        scrolledRef.current = next
        setScrolled(next)
      }
    }

    const onScroll = () => {
      if (rafRef.current != null) return
      rafRef.current = window.requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [enter, exit])

  return scrolled
}
