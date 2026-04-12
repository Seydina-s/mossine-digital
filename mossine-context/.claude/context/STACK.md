# STACK.md — Stack Technique Mossine Digital

## PRINCIPE DIRECTEUR

**Gratuit par défaut.** Chaque outil doit avoir un tier gratuit suffisant
pour la production. Aucun outil payant sans validation explicite du client.
Si une alternative gratuite existe avec 90%+ des fonctionnalités, on la prend.

---

## FRONTEND

### Framework principal
- **Next.js 14** (App Router) — Gratuit, open source
  - SSR + SSG + ISR = PageSpeed maximal
  - SEO natif via Metadata API
  - API Routes intégrées (zéro backend séparé)
  - Server Components = bundle JS minimal côté client
  - Image optimization automatique (WebP/AVIF)

### Langage
- **TypeScript 5** — Gratuit, open source
  - `strict: true` obligatoire dans tsconfig.json
  - Zéro `any` autorisé dans le code de production

### Style
- **Tailwind CSS v4** — Gratuit, open source
  - Utility-first, purge CSS automatique
  - Config custom avec tokens Mossine Digital
  - Dark mode via `class` strategy
- **CSS Custom Properties** — Natif navigateur
  - Tous les design tokens dans globals.css
  - Voir PALETTE.md pour la configuration complète

### Composants UI
- **shadcn/ui** — Gratuit, open source
  - Composants copiés dans le projet (pas de dépendance externe)
  - Accessible (Radix UI sous le capot)
  - Customisable selon la charte Mossine Digital
- **Ressources 21st.dev** — Composants UI premium (gratuit)
  - À utiliser pour inspiration et composants avancés
  - Toujours customiser selon la palette Mossine Digital

---

## ANIMATIONS & MOTION

### Animations React
- **Framer Motion** — Gratuit (MIT)
  - Animations déclaratives et layout animations
  - Page transitions
  - Scroll-triggered animations (useInView)
  - Gestures (drag, hover, tap)

### Animations complexes
- **GSAP** (version gratuite) — Gratuit pour projets non-commerciaux
  - ScrollTrigger pour effets parallax et pin
  - Timeline pour séquences complexes (Hero section)
  - ⚠️ Vérifier licence pour usage commercial

### Scroll fluide
- **Lenis** — Gratuit, open source
  - Smooth scroll ultra fluide
  - Compatible avec GSAP ScrollTrigger
  - Léger (< 5kb gzippé)

### 3D (si nécessaire)
- **Three.js** / **React Three Fiber** — Gratuit, open source
  - Uniquement si l'agent Design valide l'usage
  - Sections Hero ou fond interactif uniquement
  - Performance à surveiller : code-splitting obligatoire

---

## CMS

### CMS Headless
- **Sanity v3** — Gratuit jusqu'à 3 utilisateurs + 500k documents
  - Studio personnalisable embarqué dans Next.js (/studio)
  - GROQ queries performantes
  - CDN intégré pour les assets
  - Real-time preview
  - Schémas : Article, Service, Portfolio, Témoignage, FAQ

---

## BACKEND & API

### API
- **Next.js API Routes** — Inclus avec Next.js (gratuit)
  - Serverless functions sur Hostinger
  - Formulaires de contact
  - Webhooks Sanity

### Email transactionnel
- **Resend** — Gratuit jusqu'à 3000 emails/mois
  - Délivrabilité excellente
  - SDK React Email pour templates
  - Alternative gratuite : EmailJS (frontend only)

### Validation
- **Zod** — Gratuit, open source
  - Validation server-side de tous les inputs
  - Types TypeScript inférés automatiquement

### Scripts tiers (isolation)
- **Partytown** — Gratuit, open source
  - Déporte analytics, chat, pixels dans web worker
  - Préserve le LCP et le score PageSpeed

---

## SÉCURITÉ

### WAF & CDN
- **Cloudflare** (tier gratuit) — Gratuit
  - WAF (Web Application Firewall)
  - Protection DDoS automatique
  - CDN mondial (270+ PoP)
  - Bot management basique
  - SSL/TLS automatique
  - DNS management
  - Proxy devant Hostinger

### Security Headers
- **next-secure-headers** ou config manuelle — Gratuit
  - Content-Security-Policy (CSP)
  - Strict-Transport-Security (HSTS)
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy

### Rate Limiting
- **Upstash Redis** — Gratuit jusqu'à 10,000 req/jour
  - Rate limiting sur API Routes
  - Anti-spam formulaires
  - Anti-bruteforce

### CAPTCHA
- **hCaptcha** — Gratuit
  - RGPD-compliant (contrairement à reCAPTCHA)
  - Sur tous les formulaires publics

### Audit dépendances
- **npm audit** — Natif npm (gratuit)
- **Snyk** — Gratuit tier disponible
  - Scan automatique dans CI/CD

---

## INFRASTRUCTURE (Hostinger Cloud)

### Runtime
- **Node.js 20 LTS** — Gratuit
  - Stable 3 ans
  - Compatible Next.js 14

### Process Manager
- **PM2** — Gratuit, open source
  - Auto-restart en cas de crash
  - Load balancing (cluster mode)
  - Logs centralisés
  - Monitoring ressources

### Reverse Proxy
- **Nginx** — Gratuit, open source
  - SSL termination
  - Compression gzip + brotli
  - Cache assets statiques
  - Proxy vers PM2

### SSL/TLS
- **Let's Encrypt + Certbot** — Gratuit
  - Renouvellement automatique
  - Qualys SSL A+ garanti

### CI/CD
- **GitHub Actions** — Gratuit (2000 min/mois)
  - Pipeline : lint → test → build → deploy SSH
  - Déclenchement sur push `main`
  - Rollback automatique si build échoue

### Backup
- **Cron + rsync** sur Hostinger — Gratuit
  - Backup quotidien fichiers
  - Backup Sanity via API export

---

## MONITORING & ANALYTICS

### Analytics
- **Umami** — Gratuit, open source
  - Self-hosted sur Hostinger
  - Sans cookies, RGPD natif
  - Dashboard en temps réel
  - Alternative : Plausible (payant) ou Matomo (lourd)

### Erreurs
- **Sentry** — Gratuit jusqu'à 5000 erreurs/mois
  - Capture erreurs client et serveur
  - Source maps
  - Alertes email

### Performance
- **Google Search Console** — Gratuit
- **Google PageSpeed Insights** — Gratuit
- **GTmetrix** — Gratuit (tests basiques)
- **Lighthouse CI** dans GitHub Actions — Gratuit

---

## QUALITÉ CODE & TOOLING

### Linting & Format
- **ESLint** + **next/eslint** — Gratuit
- **Prettier** — Gratuit
  - Config unifiée `.prettierrc`
  - Intégration VSCode

### Git Hooks
- **Husky** — Gratuit, open source
- **lint-staged** — Gratuit, open source
  - Pre-commit : lint + format
  - Pre-push : tests unitaires

### Tests
- **Vitest** — Gratuit, open source (tests unitaires)
- **Playwright** — Gratuit, open source (tests E2E)
  - Agent QA utilise Playwright pour rapports automatisés
  - Tests cross-browser : Chrome, Firefox, Safari

### Accessibilité
- **axe-core** — Gratuit, open source
  - Intégré dans Playwright pour tests a11y automatisés
  - Extension Chrome pour audit manuel

---

## SKILLS LOCAUX À PRIORISER

L'ordre de priorité pour chaque agent avant d'aller chercher externe :

1. `frontend-design` — Composants, layout, design system
2. `ux-ui` — Architecture information, wireframes, UX patterns
3. `vibe-coding` — Développement assisté, patterns code
4. `cybersecurite` — Sécurité, audit, hardening
5. `seo` — Optimisation moteurs, structured data
6. `copywriting` — Textes, headlines, CTAs
7. `marketing-digital` — Stratégie, funnel, conversion
8. `reseaux-sociaux` — Contenu réseaux, social proof
9. `canva-design` — Visuels, assets graphiques
10. `humanizer` — Relecture textes générés par IA
11. `token-optimizer` — Optimisation des requêtes Claude
12. `recherche-approfondie` — Veille, benchmark, sources

---

## VERSIONS EXACTES (à fixer dans package.json)

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "typescript": "5.x",
    "framer-motion": "11.x",
    "gsap": "3.x",
    "@studio-freight/lenis": "1.x",
    "next-sanity": "9.x",
    "@sanity/client": "6.x",
    "zod": "3.x",
    "resend": "3.x",
    "@react-email/components": "0.x",
    "@upstash/ratelimit": "1.x",
    "@upstash/redis": "1.x",
    "@hcaptcha/react-hcaptcha": "1.x"
  },
  "devDependencies": {
    "tailwindcss": "4.x",
    "eslint": "8.x",
    "eslint-config-next": "14.x",
    "prettier": "3.x",
    "husky": "9.x",
    "lint-staged": "15.x",
    "vitest": "1.x",
    "@playwright/test": "1.x",
    "@axe-core/playwright": "4.x"
  }
}
```
