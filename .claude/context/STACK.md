# STACK.md — Stack Technique Mossine Digital

## Framework

| Couche         | Technologie           | Version  | Justification                            |
|----------------|-----------------------|----------|------------------------------------------|
| Framework      | Next.js App Router    | 16.x     | SSR/SSG, SEO natif, performance          |
| Langage        | TypeScript            | ^5       | Typage strict, fiabilité                 |
| Runtime UI     | React                 | 19.x     | Server Components, Transitions           |

## Style

| Outil              | Version | Notes                                    |
|--------------------|---------|------------------------------------------|
| Tailwind CSS       | ^4      | Utility-first, v4 avec @theme natif      |
| CSS Custom Props   | —       | Tokens design préfixés `--md-`           |

> **Important Tailwind v4** : plus de `tailwind.config.js`. Configuration via
> `@theme` dans le CSS. Les utilitaires s'auto-génèrent depuis les tokens.

## Animation

| Lib           | Usage                                        |
|---------------|----------------------------------------------|
| Framer Motion | Animations composants, page transitions      |
| GSAP + ScrollTrigger | Animations scroll-driven avancées    |
| Lenis         | Smooth scroll inertiel                       |

## CMS

| Outil    | Version | Notes                                          |
|----------|---------|------------------------------------------------|
| Sanity   | v3      | Headless, GROQ queries, live preview           |

## Sécurité

| Outil            | Usage                                          |
|------------------|------------------------------------------------|
| Cloudflare WAF   | Firewall applicatif, DDoS                      |
| Security Headers | CSP, HSTS, X-Frame-Options via Next.js         |
| Zod              | Validation schémas côté serveur                |
| Upstash Redis    | Rate limiting sur les routes API               |
| bcrypt           | Hash mots de passe si auth                     |

## Infrastructure

| Outil          | Usage                                          |
|----------------|------------------------------------------------|
| Hostinger Cloud| Hébergement (pas Vercel)                       |
| Nginx          | Reverse proxy, compression, cache              |
| PM2            | Process manager Node.js                        |
| GitHub Actions | CI/CD — lint → test → build → deploy           |

## Monitoring

| Outil   | Usage                                            |
|---------|--------------------------------------------------|
| Umami   | Analytics RGPD-compliant, self-hosted            |
| Sentry  | Tracking erreurs runtime                         |

## Tests

| Outil      | Usage                                            |
|------------|--------------------------------------------------|
| Playwright | Tests E2E — parcours critiques                   |
| Vitest     | Tests unitaires — utilitaires, hooks             |

## Fonts (Google Fonts / local)

- **Clash Display** — titres display (Variable, 200–700)
- **Inter** — corps de texte (Variable)
- **JetBrains Mono** — code snippets

> Charger en local via `next/font/local` pour éviter les requêtes externes
> et respecter le RGPD (pas de transfert IP vers Google).

## Conventions d'import

```typescript
// Ordre des imports dans chaque fichier :
// 1. Modules Node.js natifs
// 2. Packages npm (react, next, ...)
// 3. Imports internes (@/components, @/lib, ...)
// 4. Types uniquement (import type ...)
// 5. CSS modules / styles
```

## Alias de chemins (tsconfig)

```json
{
  "@/components/*": ["./src/components/*"],
  "@/lib/*":        ["./src/lib/*"],
  "@/hooks/*":      ["./src/hooks/*"],
  "@/styles/*":     ["./src/styles/*"],
  "@/types/*":      ["./src/types/*"]
}
```
