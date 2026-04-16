'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon'
import { useScroll } from '@/components/ui/use-scroll'
import { useActiveLink } from '@/components/ui/use-active-link'
import { useFocusTrap } from '@/components/ui/use-focus-trap'
import { useEscape } from '@/components/ui/use-escape'
import { GlassCTA } from '@/components/ui/glass-cta'
import { EASE_CSS as EASE } from '@/lib/motion'
import { hasDarkHero } from '@/lib/nav-config'

// ─────────────────────────────────────────────────────────────────
//  CONFIGURATION
// ─────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: "L'agence", href: '/a-propos' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Contact',  href: '/contact' },
] as const

// Hystérésis : on passe en mode "scrolled" au-delà de 40px et on ne revient
// à "top" qu'en-dessous de 16px. Évite le thrashing près du seuil unique
// (Lenis + momentum scroll, stacking cards Services qui oscille autour de 40).
const SCROLL_ENTER = 40
const SCROLL_EXIT = 16

// ─────────────────────────────────────────────────────────────────
//  NavLink — underline centré + aria-current pour la page active
// ─────────────────────────────────────────────────────────────────

function NavLink({ href, label }: { href: string; label: string }) {
  const isActive = useActiveLink(href)

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className="group relative inline-flex items-center py-2 text-[15px] font-medium tracking-tight rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-2"
    >
      <span className="relative">
        {label}
        <span
          aria-hidden
          className={cn(
            'absolute left-1/2 -bottom-1 h-[2px] -translate-x-1/2 rounded-full bg-current',
            'transition-[width,opacity] duration-[400ms]',
            isActive
              ? 'w-full opacity-60'
              : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100 group-focus-visible:w-full group-focus-visible:opacity-100',
          )}
          style={{ transitionTimingFunction: EASE }}
        />
      </span>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────
//  COMPOSANT PRINCIPAL : Navbar
// ─────────────────────────────────────────────────────────────────

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(SCROLL_ENTER, SCROLL_EXIT)
  const pathname = usePathname()
  const reducedMotion = useReducedMotion() ?? false

  // 🛡️ Vaccin page-context : `DARK_HERO_PATHS` (lib/nav-config.ts) liste les
  // pages dont le Hero est sombre — elles seules démarrent la navbar en mode
  // transparent. Toute page non listée → glass blanc immédiat (lisible sur
  // fond clair). Ajouter une nouvelle page à Hero sombre = mettre à jour
  // nav-config.ts, sinon régression logo invisible garantie.
  const darkHero = hasDarkHero(pathname)
  const showGlass = scrolled || !darkHero

  const overlayRef = React.useRef<HTMLDivElement>(null)
  const closeMenu = React.useCallback(() => setOpen(false), [])

  // A11y : focus trap + Escape pendant que le menu mobile est ouvert
  useFocusTrap(overlayRef, open)
  useEscape(closeMenu, open)

  // Body scroll-lock quand menu mobile ouvert
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Bypass — le Studio Sanity (/studio) a sa propre chrome. Placé APRÈS
  // tous les hooks pour respecter les Rules of Hooks (ordre stable entre
  // rendus, quelle que soit la route).
  if (pathname?.startsWith('/studio')) return null

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  DESKTOP v3.2 — architecture "skin crossfade"                */}
      {/*                                                              */}
      {/*  🛡️ Vaccin jank : on n'anime plus 5 propriétés en parallèle. */}
      {/*  Seule `max-width` transitionne sur le header (géométrie).   */}
      {/*  Le "look" (bg, border, blur, shadow) est dans DEUX skins    */}
      {/*  absolute-positioned qui crossfadent par OPACITY (GPU-only). */}
      {/*  Résultat : 1 prop layout + 2 props opacity → fluide 60fps   */}
      {/*  même avec Lenis 120hz + stacking cards Services actifs.     */}
      {/*                                                              */}
      {/*  Bénéfice bonus : backdrop-blur-xl n'est PLUS permanent —    */}
      {/*  il n'existe que dans le skin "glass", activé uniquement au  */}
      {/*  scroll → zéro coût GPU au top.                              */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <header
        aria-label="Navigation principale"
        className={cn(
          'fixed left-1/2 top-4 z-50 hidden md:block',
          'h-16 w-[calc(100%-2rem)]',
          'transition-[max-width,transform] duration-300',
          showGlass ? 'max-w-[960px]' : 'max-w-[1400px]',
        )}
        style={{
          transitionTimingFunction: EASE,
          willChange: 'max-width, transform',
          // translateX(-50%) centre le header (remplace Tailwind -translate-x-1/2
          // pour éviter le conflit d'écrasement avec ce style inline).
          // translateY(-6px) au top → effet "hug" / collé à la viewport.
          // translateY(0) scrolled → détachement subtil vers le bas, feel premium.
          // translateZ(0) → promotion GPU stable (pas de jank layer-switch).
          transform: showGlass
            ? 'translateX(-50%) translateY(0) translateZ(0)'
            : 'translateX(-50%) translateY(-6px) translateZ(0)',
        }}
      >
        {/* ─── Skin TOP : transparent, aucun blur ─── */}
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 rounded-full',
            'transition-opacity duration-300',
            showGlass ? 'opacity-0' : 'opacity-100',
          )}
          style={{ transitionTimingFunction: EASE }}
        />
        {/* ─── Skin GLASS : white + border + blur + shadow ─── */}
        {/*  🛡️ Vaccin perf homepage : backdrop-filter désactivé quand  */}
        {/*  skin invisible. Sans ça, blur 24px tourne en permanence    */}
        {/*  sur le contenu dense en-dessous (Aurora, carrousel Hero,   */}
        {/*  stacking cards Services) → lag perceptible au scroll.      */}
        {/*  Le crossfade opacity masque le switch discret du filter.   */}
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 rounded-full',
            'border border-[color:var(--md-border)] bg-white/85',
            'shadow-[0_12px_32px_-12px_rgba(27,31,59,0.12)]',
            'transition-opacity duration-300',
            showGlass ? 'opacity-100' : 'opacity-0',
          )}
          style={{
            transitionTimingFunction: EASE,
            backdropFilter: showGlass ? 'blur(20px) saturate(150%)' : 'none',
            WebkitBackdropFilter: showGlass ? 'blur(20px) saturate(150%)' : 'none',
            willChange: showGlass ? 'opacity' : 'auto',
          }}
        />
        {/* ─── Contenu — seul le color/padding transitionnent ici ─── */}
        <div
          className={cn(
            'relative flex h-full w-full items-center justify-between',
            'transition-[padding,color] duration-300',
            showGlass
              ? 'px-3 text-[var(--md-primary)] lg:px-4'
              : 'px-6 text-white lg:px-8',
          )}
          style={{
            transitionTimingFunction: EASE,
            // Le texte prend 60ms de délai au scroll → évite le flash
            // "blanc sur bg qui vient de devenir blanc" à mi-morph.
            transitionDelay: showGlass ? '0ms, 60ms' : '0ms, 0ms',
          }}
        >
          {/* ─── LOGO : hauteur fixe, crossfade opacity ─── */}
          <Link
            href="/"
            aria-label="Mossine Digital — accueil"
            className="relative block rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-2"
          >
            <span className="relative block h-9 aspect-[4/1] lg:h-10">
              {/* Logo blanc — visible au top (Hero sombre) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo/logo-blanc.svg"
                alt="Mossine Digital"
                className={cn(
                  'absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300',
                  showGlass ? 'opacity-0' : 'opacity-100',
                )}
                style={{ transitionTimingFunction: EASE }}
              />
              {/* Logo bleu — visible au scroll (glass blanc) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo/logo-bleu.svg"
                alt=""
                aria-hidden="true"
                className={cn(
                  'absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300',
                  showGlass ? 'opacity-100' : 'opacity-0',
                )}
                style={{ transitionTimingFunction: EASE }}
              />
            </span>
          </Link>

          {/* ─── LIENS ─── */}
          <nav aria-label="Menu principal" className="flex items-center gap-5 lg:gap-7">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.label} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* ─── CTA — pas de magnetic, pas de spring ─── */}
          <GlassCTA href="/contact" tone="brand" size="sm">
            Démarrer un projet
            <ArrowUpRightIcon size={14} weight="bold" />
          </GlassCTA>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  MOBILE — header compact fixe, full-width, fond glass blanc */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <header
        aria-label="Navigation principale mobile"
        className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-[var(--md-border)] bg-white/95 px-4 backdrop-blur-md md:hidden"
      >
        <Link
          href="/"
          aria-label="Mossine Digital — accueil"
          className="flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-2"
        >
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
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--md-border)] text-[var(--md-text)] transition-colors duration-200 hover:bg-[var(--md-secondary-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-2"
        >
          <MenuToggleIcon open={open} className="h-[14px] w-[18px]" duration={280} />
        </button>
      </header>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  MENU MOBILE FULLSCREEN                                     */}
      {/*  A11y : role=dialog + aria-modal + focus trap + Escape      */}
      {/*  v3.2 : zoom-in 0.98 → 1 + stagger liens (reduced-motion OK)*/}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div
        id="menu-mobile"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        aria-hidden={!open}
        className={cn(
          'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col bg-white md:hidden',
          'transition-[opacity,transform] duration-300 ease-out',
          'origin-top',
          open
            ? 'pointer-events-auto opacity-100 scale-100'
            : cn(
                'pointer-events-none opacity-0',
                reducedMotion ? 'scale-100' : 'scale-[0.98]',
              ),
        )}
      >
        <div className="flex h-full w-full flex-col justify-between gap-y-2 p-4">
          <nav aria-label="Menu principal" className="grid gap-y-1">
            {NAV_LINKS.map((link, i) => {
              // Stagger éditorial : +40ms par lien à l'ouverture, zéro si reduced-motion
              return (
                <MobileNavLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  onNavigate={closeMenu}
                  open={open}
                  index={i}
                  stagger={!reducedMotion}
                />
              )
            })}
          </nav>

          <div className="flex flex-col gap-3 pb-4">
            <GlassCTA
              href="/contact"
              tone="brand"
              size="lg"
              fullWidth
              onClick={closeMenu}
            >
              Démarrer un projet
              <ArrowUpRightIcon size={18} weight="bold" />
            </GlassCTA>
            <p className="text-center text-xs text-[var(--md-text-light)]">
              Réponse sous 24h · Sans engagement
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────
//  MobileNavLink — lien plein largeur avec indicateur page active
// ─────────────────────────────────────────────────────────────────

function MobileNavLink({
  href,
  label,
  onNavigate,
  open,
  index,
  stagger,
}: {
  href: string
  label: string
  onNavigate: () => void
  open: boolean
  index: number
  stagger: boolean
}) {
  const isActive = useActiveLink(href)

  // Stagger : chaque lien entre 40ms après le précédent à l'ouverture.
  // En fermeture ou si reduced-motion actif, aucun délai.
  const delayMs = open && stagger ? index * 40 : 0

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? 'page' : undefined}
      style={{
        transitionDelay: `${delayMs}ms`,
      }}
      className={cn(
        'flex items-center justify-between rounded-2xl border-b border-[#F3F4F6] px-5 py-4 text-base font-medium last:border-none',
        'transition-[opacity,transform,background-color,color] duration-300 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-2 focus-visible:ring-inset',
        open
          ? 'translate-y-0 opacity-100'
          : stagger
            ? '-translate-y-1 opacity-0'
            : 'opacity-0',
        isActive
          ? 'bg-[var(--md-secondary-light)] text-[var(--md-primary)]'
          : 'text-[var(--md-text)] hover:bg-[var(--md-secondary-light)] hover:text-[var(--md-primary)]',
      )}
    >
      <span>{label}</span>
      {isActive && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-[var(--md-secondary)]"
        />
      )}
    </Link>
  )
}
