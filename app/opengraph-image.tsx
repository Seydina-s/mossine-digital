import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// ─────────────────────────────────────────────────────────────────
//  app/opengraph-image.tsx — OG image dynamique générée au build.
//
//  Sert automatiquement l'image à /opengraph-image.png (URL auto-
//  injectée dans <meta property="og:image" /> et twitter:image par
//  Next.js App Router). Dimensions : 1200×630 (spec Facebook/
//  LinkedIn/Twitter/WhatsApp).
//
//  Typo : Syne Bold (display) + Inter Regular (body) fetchées au
//  build depuis le CDN fontsource (jsDelivr — TTF direct, zéro
//  User-Agent spoof). En cas d'échec réseau, Satori retombe sur
//  la police système par défaut (le visuel fonctionne toujours).
//
//  Palette : #1B1F3B bg, #35A7FF secondary halo, gradient bar
//  #35A7FF → #FF5964, monogramme embarqué en base64 depuis
//  public/images/logo/logo-mark.png.
//
//  Régénération : automatique à chaque `next build`. Modifier ce
//  fichier pour changer le design, le texte, ou le layout.
// ─────────────────────────────────────────────────────────────────

export const alt =
  'Mossine Digital — Agence communication & marketing digital 360°'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Fetch TTF depuis fontsource CDN (jsDelivr). Variable font fallback
// sur weight le plus proche si indisponible.
async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    return await res.arrayBuffer()
  } catch {
    return null
  }
}

export default async function OG() {
  // Monogramme bleu Mossine — lu au build, encodé en base64 inline.
  // Évite un fetch HTTP supplémentaire au rendu de l'image.
  const logoBuffer = readFileSync(
    join(process.cwd(), 'public/images/logo/logo-mark.png'),
  )
  const logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`

  // Fetch parallèle des polices (non-bloquant en cas d'échec).
  const [syneBold, interRegular] = await Promise.all([
    loadFont(
      'https://cdn.jsdelivr.net/fontsource/fonts/syne@latest/latin-700-normal.ttf',
    ),
    loadFont(
      'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf',
    ),
  ])

  const fonts = [
    ...(syneBold
      ? [{ name: 'Syne', data: syneBold, weight: 700 as const, style: 'normal' as const }]
      : []),
    ...(interRegular
      ? [{ name: 'Inter', data: interRegular, weight: 400 as const, style: 'normal' as const }]
      : []),
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#1B1F3B',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(53, 167, 255, 0.28) 0%, transparent 55%), radial-gradient(circle at 15% 95%, rgba(255, 89, 100, 0.14) 0%, transparent 50%)',
          fontFamily: 'Inter, sans-serif',
          color: '#FFFFFF',
          position: 'relative',
        }}
      >
        {/* Bordure intérieure subtile */}
        <div
          style={{
            position: 'absolute',
            inset: '32px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            display: 'flex',
          }}
        />

        {/* ─── BLOC HAUT : logo + wordmark ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt=""
            width={88}
            height={88}
            style={{ objectFit: 'contain' }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Syne, Inter, sans-serif',
              fontWeight: 700,
              fontSize: 112,
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            <span>Mossine</span>
            <span style={{ color: '#35A7FF' }}>Digital.</span>
          </div>

          {/* Gradient bar accent — 120×6 */}
          <div
            style={{
              width: '120px',
              height: '6px',
              borderRadius: '3px',
              background: 'linear-gradient(90deg, #35A7FF 0%, #FF5964 100%)',
              display: 'flex',
            }}
          />

          <div
            style={{
              fontSize: 34,
              lineHeight: 1.3,
              maxWidth: '820px',
              color: 'rgba(255, 255, 255, 0.78)',
              letterSpacing: '-0.01em',
              display: 'flex',
            }}
          >
            Agence de communication & marketing digital 360°.
          </div>
        </div>

        {/* ─── BLOC BAS : domaine + flèche ─── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 26,
            color: 'rgba(255, 255, 255, 0.55)',
            letterSpacing: '0.04em',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '999px',
                background: '#35A7FF',
                display: 'flex',
              }}
            />
            <span>mossinedigital.com</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 28px',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#FFFFFF',
              fontSize: 22,
            }}
          >
            <span>Branding · Web · Ads · SEO</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  )
}
