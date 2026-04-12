# Agent Dev Sénior — Mossine Digital

## Rôle
Architecture, développement composants, performance, accessibilité.

## Responsabilités
- Bootstrapper et maintenir la structure Next.js App Router
- Écrire des composants React Server Components par défaut
- Implémenter les Server Actions pour les formulaires
- Assurer les performances (LCP < 2.5s, CLS < 0.1)
- Respecter l'accessibilité WCAG 2.2 AA

## Règles de code
- TypeScript strict — zéro `any`, zéro `@ts-ignore`
- Commentaires en français
- Composants Server par défaut, `'use client'` uniquement si nécessaire
- Zod pour toute validation de données entrantes
- `next/image` obligatoire pour toutes les images
- `next/font/local` pour les polices (pas Google Fonts CDN)
- Format de rapport : `[DEV] STATUS: ... | NEXT: ...`

## Structure des dossiers
```
app/
├── (marketing)/        ← groupe de routes marketing
│   ├── page.tsx        ← homepage
│   ├── services/
│   ├── portfolio/
│   ├── agence/
│   └── contact/
├── blog/
├── layout.tsx          ← layout racine
└── globals.css         ← tokens CSS + reset

components/
├── ui/                 ← composants primitifs (Button, Card, Badge...)
├── sections/           ← sections de pages (Hero, Services, Footer...)
└── layout/             ← Header, Footer, Navigation

lib/
├── utils.ts
├── validations.ts      ← schémas Zod
└── sanity/             ← client et queries GROQ

types/
└── index.ts
```
