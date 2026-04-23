'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { track } from '@/lib/analytics'

// ─────────────────────────────────────────────────────────────────
//  GlassCTA — Bouton / lien glassmorphique Mossine Digital
//  Utilisé pour tous les CTA "Démarrer un projet".
//  Classes CSS définies dans app/globals.css (.glass-cta*).
//
//  Tracking opt-in : passer `trackingLocation` + `trackingLabel` pour
//  émettre un event `cta_click` côté GTM. Sans ces props, le composant
//  ne pousse rien au dataLayer.
// ─────────────────────────────────────────────────────────────────

type GlassTone = 'dark' | 'light' | 'accent' | 'brand'
type GlassSize = 'sm' | 'default' | 'lg'

type CtaLocation =
  | 'hero'
  | 'navbar_desktop'
  | 'navbar_mobile'
  | 'cta_final'
  | 'footer'
  | 'service_detail'

interface BaseProps {
  children: React.ReactNode
  tone?: GlassTone
  size?: GlassSize
  fullWidth?: boolean
  className?: string
  trackingLocation?: CtaLocation
  trackingLabel?: string
}

interface LinkProps extends BaseProps {
  href: string
  onClick?: () => void
  type?: never
}

interface ButtonProps
  extends BaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: never
}

export type GlassCTAProps = LinkProps | ButtonProps

export function GlassCTA(props: GlassCTAProps) {
  const {
    children,
    tone = 'dark',
    size = 'default',
    fullWidth = false,
    className,
    trackingLocation,
    trackingLabel,
  } = props

  const wrapperClass = cn(
    'glass-cta',
    fullWidth && 'glass-cta--full',
    className,
  )

  // Helper : si le caller a opt-in au tracking, on pousse un event
  // `cta_click` avant d'appeler son éventuel onClick custom. Sinon
  // zéro effet de bord (Next Link navigue normalement).
  const fireTracking = React.useCallback(
    (destination: string) => {
      if (!trackingLocation || !trackingLabel) return
      track({
        event: 'cta_click',
        cta_label: trackingLabel,
        cta_location: trackingLocation,
        cta_destination: destination,
      })
    },
    [trackingLocation, trackingLabel],
  )

  // Structure commune : halo → surface [glint + contenu]
  const inner = (
    <>
      <span className="glass-cta__shadow" aria-hidden />
      <span className="glass-cta__surface">
        <span className="glass-cta__glint" aria-hidden />
        <span className="glass-cta__content">{children}</span>
      </span>
    </>
  )

  if ('href' in props && props.href) {
    const { href, onClick } = props
    const handleLinkClick = () => {
      fireTracking(href)
      onClick?.()
    }
    return (
      <Link
        href={href}
        onClick={handleLinkClick}
        data-tone={tone}
        data-size={size}
        className={wrapperClass}
      >
        {inner}
      </Link>
    )
  }

  const {
    href: _h,
    trackingLocation: _tl,
    trackingLabel: _tlabel,
    onClick: buttonOnClick,
    ...rest
  } = props as ButtonProps & {
    href?: string
    trackingLocation?: CtaLocation
    trackingLabel?: string
  }
  void _h
  void _tl
  void _tlabel
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    fireTracking('button')
    buttonOnClick?.(e)
  }
  return (
    <button
      {...rest}
      onClick={handleButtonClick}
      data-tone={tone}
      data-size={size}
      className={wrapperClass}
    >
      {inner}
    </button>
  )
}
