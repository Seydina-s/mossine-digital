import type { NextConfig } from 'next'
import path from 'path'

// ─────────────────────────────────────────────────────────────────
//  next.config.ts — Mossine Digital
//
//  Sécurité : OWASP Top 10 2025 + CSP stricte marketing / relaxée
//  sur /studio (Sanity Studio embedded a besoin de 'unsafe-eval' et
//  de WebSocket vers *.sanity.io pour l'édition temps réel).
//
//  Mode dev : 'unsafe-eval' autorisé partout (React Refresh / HMR).
//  Mode prod : 'unsafe-eval' uniquement sur /studio.
// ─────────────────────────────────────────────────────────────────

const isDev = process.env.NODE_ENV === 'development'

// Sources autorisées — centralisées pour éviter le drift.
const SANITY = 'https://*.sanity.io https://cdn.sanity.io https://*.apicdn.sanity.io'
const SANITY_WS = 'wss://*.sanity.io'
const HCAPTCHA = 'https://hcaptcha.com https://*.hcaptcha.com'
const RESEND = 'https://api.resend.com'
const SENTRY = 'https://*.ingest.sentry.io https://js.sentry-cdn.com'
const UMAMI = 'https://*.umami.is'

// ─── CSP marketing (pages publiques) ─────────────────────────────
// 'unsafe-inline' reste nécessaire sur script-src tant qu'on n'a
// pas de middleware nonce (Sprint 4+ si besoin de score Observatory
// A+). Sur style-src, 'unsafe-inline' est pragmatique (Tailwind v4
// + CSS-in-JS Framer Motion en prod).
const marketingCsp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} ${HCAPTCHA} ${SENTRY}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: https://cdn.sanity.io ${HCAPTCHA}`,
  `font-src 'self' data:`,
  `connect-src 'self' ${SANITY} ${RESEND} ${HCAPTCHA} ${SENTRY} ${UMAMI}`,
  `frame-src 'self' ${HCAPTCHA}`,
  `frame-ancestors 'none'`,
  `form-action 'self'`,
  `base-uri 'self'`,
  `object-src 'none'`,
  `upgrade-insecure-requests`,
].join('; ')

// ─── CSP studio (Sanity embedded) ────────────────────────────────
// Plus permissif : 'unsafe-eval' pour GROQ compilation + WebSocket
// pour l'édition temps réel + frame-ancestors 'self' (Studio iframe
// intégrable sur notre propre domaine uniquement).
const studioCsp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${SANITY}`,
  `style-src 'self' 'unsafe-inline' ${SANITY}`,
  `img-src 'self' data: blob: ${SANITY}`,
  `font-src 'self' data: ${SANITY}`,
  `connect-src 'self' ${SANITY} ${SANITY_WS}`,
  `frame-src 'self' ${SANITY}`,
  `frame-ancestors 'self'`,
  `form-action 'self'`,
  `base-uri 'self'`,
  `object-src 'none'`,
].join('; ')

// ─── Permissions-Policy ──────────────────────────────────────────
// Désactive toutes les APIs sensibles par défaut, autorise seulement
// ce qui a un usage légitime (fullscreen vidéos, autoplay hero, etc.)
const permissionsPolicy = [
  'camera=()',
  'microphone=()',
  'geolocation=()',
  'payment=()',
  'usb=()',
  'magnetometer=()',
  'gyroscope=()',
  'accelerometer=()',
  'autoplay=(self)',
  'fullscreen=(self)',
  'picture-in-picture=(self)',
  'encrypted-media=()',
  'interest-cohort=()',
].join(', ')

const baseSecurityHeaders = [
  { key: 'X-Frame-Options',          value: 'DENY' },
  { key: 'X-Content-Type-Options',   value: 'nosniff' },
  { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',       value: permissionsPolicy },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-DNS-Prefetch-Control',   value: 'on' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
  // X-XSS-Protection intentionnellement omis (deprecated, CSP fait mieux).
]

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },

  async headers() {
    return [
      // CSP relaxée Studio — doit matcher AVANT la règle globale.
      {
        source: '/studio/:path*',
        headers: [
          ...baseSecurityHeaders.filter((h) => h.key !== 'X-Frame-Options'),
          // Studio iframe doit pouvoir s'afficher sur notre propre origine.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: studioCsp },
        ],
      },
      // CSP stricte marketing (toutes les autres routes).
      {
        source: '/:path*',
        headers: [
          ...baseSecurityHeaders,
          { key: 'Content-Security-Policy', value: marketingCsp },
        ],
      },
    ]
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 375, 430, 640, 768, 1024, 1280, 1440, 1920],
    // Sanity CDN + futures images OG générées.
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },

  compress: true,

  typescript: {
    ignoreBuildErrors: false,
  },
}

export default nextConfig
