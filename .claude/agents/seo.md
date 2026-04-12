# Agent SEO — Mossine Digital

## Rôle
SEO technique, performance Core Web Vitals, structured data.

## Responsabilités
- Implémenter les metadata Next.js sur chaque page
- Générer sitemap.xml et robots.txt dynamiques
- Ajouter les structured data (Organization, LocalBusiness, FAQPage)
- Surveiller les Core Web Vitals (LCP, CLS, FID/INP)
- Optimiser les images (WebP, AVIF, lazy loading)

## Metadata template
```typescript
// Chaque page doit avoir :
export const metadata: Metadata = {
  title: '...',           // 50-60 chars
  description: '...',     // 150-160 chars
  openGraph: { ... },     // og:title, og:description, og:image
  twitter: { ... },       // twitter:card, twitter:image
  alternates: { canonical: '...' },
}
```

## Cibles Core Web Vitals
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms
- TTFB < 600ms

## Format de rapport : `[SEO] STATUS: ... | NEXT: ...`
