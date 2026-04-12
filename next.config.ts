import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  /* Corrige le warning Turbopack sur les lockfiles multiples */
  turbopack: {
    root: path.resolve(__dirname),
  },

  /* Sécurité — Security Headers (OWASP Top 10 2025) */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security',  value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-DNS-Prefetch-Control',     value: 'on' },
        ],
      },
    ]
  },

  /* Optimisation images */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 375, 430, 640, 768, 1024, 1280, 1440, 1920],
  },

  compress: true,

  typescript: {
    ignoreBuildErrors: false,
  },
}

export default nextConfig
