# Mossine Digital

Site vitrine premium de l'agence Mossine Digital — communication et marketing digital 360°.

Stack : Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 · Framer Motion · Sanity (CMS) · Resend.

Toute la vision, la roadmap, les standards de qualité et le protocole multi-agents sont décrits dans [`CLAUDE.md`](./CLAUDE.md).

---

## Démarrage local

```bash
cp .env.example .env.local       # puis remplir les variables
npm install
npm run dev
```

Le site tourne sur `http://localhost:3000`.

---

## Tests

```bash
npm run test               # Vitest (unitaires — contact-schema, nav-config)
npx playwright test        # Playwright E2E (pages, a11y axe-core, responsive)
```

Couverture actuelle : 48 tests Playwright (+3 skipped documentés) + 32 tests Vitest.

---

## Variables d'environnement critiques

### `NEXT_PUBLIC_SITE_URL` (OBLIGATOIRE en production)

Résolue en **source unique de vérité** dans [`lib/site-config.ts`](./lib/site-config.ts).

Utilisée pour :
- **Canonical URLs** — balises `<link rel="canonical">` sur toutes les pages
- **Open Graph / Twitter Card** — URLs absolues dans les previews sociales
- **sitemap.xml** — URLs listées pour Google Search Console
- **robots.txt** — directive `Sitemap:` + `Host:`
- **JSON-LD** — `@id` des entités Schema.org (`Organization`, `ContactPage`, `Service`, etc.)

Sans cette variable en production, le fallback `https://mossine-digital.com` est utilisé. Si le domaine final diffère :
- Google indexera les mauvaises URLs (duplicate content, perte de trust SEO)
- Les previews LinkedIn/Twitter/Facebook pointeront vers un domaine inexistant
- Le sitemap annoncera des URLs inaccessibles

Un `console.warn` est émis au build/runtime en production si la variable est absente.

### Autres variables

Voir [`.env.example`](./.env.example) pour la liste complète (Sanity, Resend, etc.).

---

## Structure

```
app/          Routes Next.js (App Router) — pages + sitemap + robots + layout
components/   UI par zone : layout, sections, services, about, shared, ui
lib/          Utilitaires pur-TS (SSoT : site-config, services-data, etc.)
e2e/          Tests Playwright E2E + axe-core
public/       Assets statiques (images WebP, logos SVG)
.claude/      Contexte agents + sessions + audits
```

Règle CLAUDE.md : tout module dans `lib/` est potentiellement consommé par un RSC, donc ses exports doivent être 100 % JSON-sérialisables.

---

## Déploiement

Documentation complète à venir au Sprint 5 (`README_DEPLOY.md`). Cibles : Hostinger Cloud + Nginx + PM2 + Cloudflare WAF.

Pré-requis mise en ligne :
- `NEXT_PUBLIC_SITE_URL` renseigné avec le domaine final
- Domaine validé DKIM/SPF côté Resend (expéditeur du formulaire contact)
- Sanity project ID + read token générés
- SSL Let's Encrypt configuré (score Qualys cible A+)
