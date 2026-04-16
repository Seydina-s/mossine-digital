'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────
//  GlassCTA — Bouton / lien glassmorphique Mossine Digital
//  Utilisé pour tous les CTA "Démarrer un projet".
//  Classes CSS définies dans app/globals.css (.glass-cta*).
// ─────────────────────────────────────────────────────────────────

type GlassTone = 'dark' | 'light' | 'accent' | 'brand'
type GlassSize = 'sm' | 'default' | 'lg'

interface BaseProps {
  children: React.ReactNode
  tone?: GlassTone
  size?: GlassSize
  fullWidth?: boolean
  className?: string
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
  } = props

  const wrapperClass = cn(
    'glass-cta',
    fullWidth && 'glass-cta--full',
    className,
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
    return (
      <Link
        href={props.href}
        onClick={props.onClick}
        data-tone={tone}
        data-size={size}
        className={wrapperClass}
      >
        {inner}
      </Link>
    )
  }

  const { href: _h, ...rest } = props as ButtonProps & { href?: string }
  void _h
  return (
    <button
      {...rest}
      data-tone={tone}
      data-size={size}
      className={wrapperClass}
    >
      {inner}
    </button>
  )
}
