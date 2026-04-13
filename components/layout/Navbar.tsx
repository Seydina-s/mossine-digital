'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { cn } from '@/lib/utils'
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon'
import { ArrowUpRightIcon } from '@phosphor-icons/react'

// ─────────────────────────────────────────────────────────────────
//  CONFIGURATION
// ─────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: "L'agence", href: '/a-propos' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Contact',  href: '/contact' },
] as const

// Distance de scroll sur laquelle le morph se déroule (en pixels)
const MORPH_END = 120

// Spring "scroll" : organique, légère traînée pour donner du poids physique
const SCROLL_SPRING = { stiffness: 200, damping: 32, mass: 1 }

// Spring "magnétique" : plus nerveux, retour rapide
const MAGNETIC_SPRING = { stiffness: 220, damping: 18, mass: 0.5 }

// Easing custom ressemblant à expo.out — sensation premium
const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

// ─────────────────────────────────────────────────────────────────
//  HOOK : effet magnétique sur le CTA
// ─────────────────────────────────────────────────────────────────

function useMagnetic<T extends HTMLElement>(strength: number) {
  const ref = React.useRef<T>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xSpring = useSpring(x, MAGNETIC_SPRING)
  const ySpring = useSpring(y, MAGNETIC_SPRING)

  React.useEffect(() => {
    const el = ref.current
    if (!el || strength === 0) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      x.set((e.clientX - cx) * strength)
      y.set((e.clientY - cy) * strength)
    }

    const handleLeave = () => {
      x.set(0)
      y.set(0)
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength, x, y])

  return { ref, x: xSpring, y: ySpring }
}

// ─────────────────────────────────────────────────────────────────
//  COMPOSANT : NavLink avec underline directionnel
// ─────────────────────────────────────────────────────────────────

function NavLink({ href, label }: { href: string; label: string }) {
  const ref = React.useRef<HTMLAnchorElement>(null)
  const [hovered, setHovered] = React.useState(false)
  const [originX, setOriginX] = React.useState(0)

  // Détecte le côté d'entrée/sortie du curseur pour orienter l'underline
  const updateOrigin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setOriginX(e.clientX - rect.left < rect.width / 2 ? 0 : 1)
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseEnter={(e) => { updateOrigin(e); setHovered(true) }}
      onMouseLeave={(e) => { updateOrigin(e); setHovered(false) }}
      className="relative inline-flex items-center px-1 py-2 text-[15px] font-medium tracking-tight whitespace-nowrap"
      style={{ color: 'var(--nav-text-color)' }}
    >
      <span className="relative inline-block">
        {label}
        <motion.span
          aria-hidden
          className="absolute -bottom-0.5 left-0 right-0 h-px bg-current"
          initial={false}
          animate={{ scaleX: hovered ? 1 : 0 }}
          style={{ originX }}
          transition={{ duration: 0.55, ease: EASE_PREMIUM }}
        />
      </span>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────
//  VARIANTS d'entrée orchestrée (mount uniquement)
// ─────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: EASE_PREMIUM,
      delayChildren: 0.3,
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 340, damping: 28 },
  },
}

// ─────────────────────────────────────────────────────────────────
//  COMPOSANT PRINCIPAL : Navbar
// ─────────────────────────────────────────────────────────────────

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const reducedMotion = useReducedMotion() ?? false

  // ─── Source de progression : scroll-driven, spring-smoothed ───
  const { scrollY } = useScroll()
  const smoothScroll = useSpring(scrollY, SCROLL_SPRING)
  const progress = useTransform(smoothScroll, [0, MORPH_END], [0, 1], {
    clamp: true,
  })

  // ─── Interpolations continues du morph ───
  const top = useTransform(progress, [0, 1], [0, 16])
  const maxWidth = useTransform(progress, [0, 1], [1600, 920])
  const paddingX = useTransform(progress, [0, 1], [56, 14])
  const height = useTransform(progress, [0, 1], [104, 60])
  const borderRadius = useTransform(progress, [0, 1], [0, 9999])

  const bgColor = useTransform(
    progress,
    [0, 0.4, 1],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.72)'],
  )

  const blurAmount = useTransform(progress, [0, 1], [0, 20])
  const backdropFilter = useTransform(blurAmount, (v) => `blur(${v}px) saturate(180%)`)

  const shadowAlpha = useTransform(progress, [0, 1], [0, 0.14])
  const boxShadow = useTransform(
    shadowAlpha,
    (a) => `0px 16px 48px -12px rgba(27, 31, 59, ${a})`,
  )

  const borderAlpha = useTransform(progress, [0, 1], [0, 0.1])
  const borderColor = useTransform(borderAlpha, (a) => `rgba(27, 31, 59, ${a})`)

  const logoHeight = useTransform(progress, [0, 1], [64, 36])

  // Couleur des liens : blanc → gris très clair → gris foncé
  const textColor = useTransform(
    progress,
    [0, 0.5, 1],
    ['rgba(255,255,255,0.96)', 'rgba(255,255,255,0.7)', 'rgba(31,41,55,1)'],
  )

  // Crossfade entre les deux variantes du logo
  const logoVertOpacity = useTransform(progress, [0.4, 0.7], [0, 1])
  const logoBlancOpacity = useTransform(progress, [0.4, 0.7], [1, 0])

  // CTA magnétique
  const cta = useMagnetic<HTMLAnchorElement>(reducedMotion ? 0 : 0.32)

  // Empêche le scroll du body quand le menu mobile est ouvert
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  DESKTOP : navbar morph spring-driven                       */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <motion.header
        aria-label="Navigation principale"
        className="fixed left-0 right-0 z-50 mx-auto hidden md:block"
        style={{
          top,
          maxWidth,
          height,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          borderRadius,
          backgroundColor: bgColor,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          boxShadow,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor,
          // CSS variable transmise aux enfants pour l'interpolation continue de leur color
          '--nav-text-color': textColor,
        } as unknown as React.CSSProperties}
      >
        <motion.div
          className="flex h-full w-full items-center justify-between"
          variants={containerVariants}
          initial={reducedMotion ? false : 'hidden'}
          animate="visible"
        >
          {/* ─── LOGO ─── */}
          <motion.div variants={itemVariants}>
            <Link
              href="/"
              aria-label="Mossine Digital — accueil"
              className="block transition-opacity hover:opacity-85"
            >
              <motion.span
                className="relative block aspect-[4/1]"
                style={{ height: logoHeight }}
              >
                {/* Variante bleue — visible quand scrollé sur fond clair */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src="/images/logo/logo-bleu.svg"
                  alt="Mossine Digital"
                  className="absolute inset-0 h-full w-full object-contain object-left"
                  style={{ opacity: logoVertOpacity }}
                />
                {/* Variante blanche — visible au top sur Hero sombre */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src="/images/logo/logo-blanc.svg"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-contain object-left"
                  style={{ opacity: logoBlancOpacity }}
                />
              </motion.span>
            </Link>
          </motion.div>

          {/* ─── LIENS ─── */}
          <motion.nav
            aria-label="Menu principal"
            className="flex items-center gap-8"
            variants={containerVariants}
          >
            {NAV_LINKS.map((link) => (
              <motion.div key={link.label} variants={itemVariants}>
                <NavLink href={link.href} label={link.label} />
              </motion.div>
            ))}
          </motion.nav>

          {/* ─── CTA MAGNÉTIQUE ─── */}
          <motion.div variants={itemVariants}>
            <motion.a
              ref={cta.ref}
              href="/contact"
              style={{ x: cta.x, y: cta.y }}
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              animate="rest"
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.04 },
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#FF5964] px-7 py-3.5 text-[15px] font-semibold text-white whitespace-nowrap shadow-[0_8px_24px_-8px_rgba(255,89,100,0.6)]"
            >
              {/* Halo radial blanc qui apparaît sur hover */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 1 },
                }}
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(255,255,255,0.32) 0%, transparent 65%)',
                }}
                transition={{ duration: 0.5, ease: EASE_PREMIUM }}
              />
              <span className="relative">Démarrer un projet</span>
              <motion.span
                className="relative flex"
                variants={{
                  rest: { x: 0, y: 0 },
                  hover: { x: 4, y: -4 },
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              >
                <ArrowUpRightIcon size={18} weight="bold" />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  MOBILE : header simple, full-width, fond blanc            */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <header
        aria-label="Navigation principale mobile"
        className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-[#E5E7EB] bg-white/95 px-4 backdrop-blur-md md:hidden"
      >
        <Link href="/" aria-label="Mossine Digital — accueil" className="flex items-center">
          <span className="relative block h-9 aspect-[4/1]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/logo-bleu.svg"
              alt="Mossine Digital"
              className="absolute inset-0 h-full w-full object-contain object-left"
            />
          </span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-[#0D0D0D] transition-colors duration-200 hover:bg-[#F0F7FF]"
        >
          <MenuToggleIcon open={open} className="h-[14px] w-[18px]" duration={280} />
        </button>
      </header>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  MENU MOBILE FULLSCREEN                                    */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        aria-hidden={!open}
        className={cn(
          'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col bg-white transition-opacity duration-300 ease-out md:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        <div className="flex h-full w-full flex-col justify-between gap-y-2 p-4">
          <div className="grid gap-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border-b border-[#F3F4F6] px-5 py-4 text-base font-medium text-[#0D0D0D] transition-colors duration-150 hover:bg-[#F0F7FF] hover:text-[#1B1F3B] last:border-none"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 pb-4">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5964] px-6 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#E8424D]"
            >
              Démarrer un projet
              <ArrowUpRightIcon size={18} weight="bold" />
            </Link>
            <p className="text-center text-xs text-[#9CA3AF]">
              Réponse sous 24h · Sans engagement
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
