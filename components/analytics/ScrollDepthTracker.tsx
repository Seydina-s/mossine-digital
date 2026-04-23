'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { track } from '@/lib/analytics'

// ─────────────────────────────────────────────────────────────────
//  ScrollDepthTracker — émet un event `scroll_depth` quand
//  l'utilisateur atteint 25 / 50 / 75 / 100 % de la page.
//
//  Usage : monté une seule fois dans app/layout.tsx (client boundary).
//  Reset automatique à chaque changement de route (App Router :
//  le composant ne se démonte pas, on reset via usePathname).
//
//  Impact perf : un listener `scroll` passif avec early-return quand
//  les 4 paliers sont atteints. Aucun `getBoundingClientRect()` →
//  zéro reflow. Throttle implicite via requestAnimationFrame.
// ─────────────────────────────────────────────────────────────────

const MILESTONES = [25, 50, 75, 100] as const
type Milestone = (typeof MILESTONES)[number]

export function ScrollDepthTracker() {
  const pathname = usePathname()

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const reached = new Set<Milestone>()
    let rafPending = false

    const compute = () => {
      rafPending = false
      const doc = document.documentElement
      const scrollTop = window.scrollY
      const scrollable = doc.scrollHeight - window.innerHeight
      // Page plus courte que le viewport — on ne track pas (rien à scroller).
      if (scrollable <= 0) return

      const pct = Math.floor((scrollTop / scrollable) * 100)

      for (const m of MILESTONES) {
        if (pct >= m && !reached.has(m)) {
          reached.add(m)
          track({ event: 'scroll_depth', percent: m, page_path: pathname })
        }
      }

      // Stop tout quand 100% atteint — plus rien à mesurer.
      if (reached.size === MILESTONES.length) {
        window.removeEventListener('scroll', onScroll)
      }
    }

    const onScroll = () => {
      if (rafPending) return
      rafPending = true
      requestAnimationFrame(compute)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Premier calcul : si la page est déjà scrollée (navigation arrière).
    compute()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [pathname])

  return null
}
