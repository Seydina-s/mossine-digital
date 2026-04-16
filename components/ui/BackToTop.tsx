'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpIcon } from '@phosphor-icons/react'
import { EASE_OUT_EXPR as EASE } from '@/lib/motion'

// ─────────────────────────────────────────────────────────────────
//  BackToTop — bouton flottant "retour en haut"
//
//  Design :
//  - Cercle 52×52 (desktop 56), glass sombre `#1B1F3B/90`
//  - Anneau de progression SVG qui suit le scroll (0 → 100%)
//  - Apparition à partir de 400px de scroll (fade + slide-up)
//  - Hover : lift + halo coloré + rotation légère de l'anneau
//  - A11y : aria-label, focus-visible, hidden quand invisible
//
//  Routes exclues :
//  - /studio (Sanity a sa propre chrome — voir Navbar.tsx)
//
//  Performance :
//  - Listener scroll throttle via rAF → 1 seul layout calc / frame
//  - Passive listener, cleanup sur unmount
//  - Pas d'animation quand prefers-reduced-motion
// ─────────────────────────────────────────────────────────────────

const SHOW_AFTER_PX = 400
const RADIUS = 23
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function BackToTop() {
  const pathname = usePathname()
  const reduced = useReducedMotion() ?? false
  const [visible, setVisible] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const rafId = React.useRef<number | null>(null)

  React.useEffect(() => {
    const compute = () => {
      rafId.current = null
      const scrollY = window.scrollY
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      const pct = scrollable > 0 ? Math.min(100, (scrollY / scrollable) * 100) : 0
      setVisible(scrollY > SHOW_AFTER_PX)
      setProgress(pct)
    }

    const onScroll = () => {
      if (rafId.current != null) return
      rafId.current = window.requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId.current != null) cancelAnimationFrame(rafId.current)
    }
  }, [])

  const handleClick = React.useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }, [reduced])

  // Routes sans BackToTop — Studio Sanity uniquement pour l'instant.
  if (pathname?.startsWith('/studio')) return null

  const dashOffset = CIRCUMFERENCE * (1 - progress / 100)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="back-to-top"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.85 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed z-40 pointer-events-none"
          style={{
            right: 'max(1.25rem, env(safe-area-inset-right))',
            bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
          }}
        >
          <button
            type="button"
            onClick={handleClick}
            aria-label={`Retourner en haut de la page (${Math.round(progress)}% défilé)`}
            className="group pointer-events-auto relative flex h-[52px] w-[52px] items-center justify-center rounded-full outline-none sm:h-14 sm:w-14 focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {/* ─── Glass background + subtle inner border ─── */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-[#1B1F3B]/90 shadow-[0_10px_30px_-8px_rgba(27,31,59,0.45),0_0_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-md transition-all duration-300 group-hover:bg-[#1B1F3B] group-hover:shadow-[0_16px_40px_-10px_rgba(53,167,255,0.55),0_0_0_1px_rgba(53,167,255,0.3)_inset] group-active:scale-95"
            />

            {/* ─── Halo accent (visible au hover uniquement) ─── */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#35A7FF]/0 via-[#35A7FF]/0 to-[#35A7FF]/0 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60 group-hover:from-[#35A7FF]/30 group-hover:to-[#FF5964]/20"
            />

            {/* ─── Progress ring ─── */}
            <svg
              aria-hidden
              className="absolute inset-0 -rotate-90 transition-transform duration-500 group-hover:scale-105"
              viewBox="0 0 52 52"
              fill="none"
            >
              {/* Track */}
              <circle
                cx="26"
                cy="26"
                r={RADIUS}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
              />
              {/* Progress */}
              <circle
                cx="26"
                cy="26"
                r={RADIUS}
                stroke="url(#back-to-top-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={reduced ? 0 : dashOffset}
                style={{
                  transition: reduced
                    ? 'none'
                    : 'stroke-dashoffset 120ms linear',
                }}
              />
              <defs>
                <linearGradient
                  id="back-to-top-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#35A7FF" />
                  <stop offset="100%" stopColor="#FF5964" />
                </linearGradient>
              </defs>
            </svg>

            {/* ─── Icône ─── */}
            <span
              aria-hidden
              className="relative text-white transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              <ArrowUpIcon size={20} weight="bold" />
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
