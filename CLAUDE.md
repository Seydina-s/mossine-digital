# CLAUDE.md — Mossine Digital
# Version 3.1 — Planning des sprints intégré
# Lu automatiquement par Claude Code à chaque session. Ne pas supprimer.

---

## IDENTITÉ DU PROJET

Mossine Digital — Agence de communication et marketing digital 360.
Site vitrine ultra premium. Objectif : être la référence absolue en design UI,
UX, sécurité, SEO et scalabilité sur le marché.

Avant toute action, lire les fichiers dans .claude/context/ pour être
en phase avec la vision. Ne jamais agir sans avoir assimilé le contexte complet.

---

## STRUCTURE DES FICHIERS DE CONTEXTE

```
.claude/
├── context/
│   ├── PROJECT.md       ← Vision, objectifs, pages, exigences globales
│   ├── PALETTE.md       ← Tokens design, couleurs, typographie, espacements
│   ├── STACK.md         ← Stack technique complète avec justifications
│   └── AGENTS.md        ← Rôles, responsabilités, sprints
└── agents/
    ├── orchestrator.md  ← Agent Orchestrateur / Chef de projet
    ├── designer.md      ← Agent Design / UI / Motion
    ├── dev-senior.md    ← Agent Développeur Sénior
    ├── cybersecurity.md ← Agent Cybersécurité
    ├── qa.md            ← Agent QA / Tests
    └── seo.md           ← Agent SEO / Performance
.claude/session/
    ├── STATUS.md        ← État du projet mis à jour à chaque session
    └── START.md         ← Prompt de démarrage de session
```

---

## RÈGLES GLOBALES — S'APPLIQUENT À TOUS LES AGENTS

### Priorité des ressources (dans cet ordre strict)
1. Skills locaux disponibles : frontend-design, ux-ui, copywriting, seo,
   reseaux-sociaux, cybersecurite, marketing-digital, vibe-coding, canva-design,
   humanizer, token-optimizer, recherche-approfondie
2. Outils et librairies gratuits : privilégier systématiquement. Aucun outil
   payant sans validation explicite du client.
3. Ressources externes : uniquement si les ressources locales sont insuffisantes,
   toujours en complément.

### Standards de qualité non-négociables
- TypeScript strict sur tout le projet — zéro "any", zéro erreur silencieuse
- Mobile-first sur chaque composant — responsive de 320px (iPhone 4) à 2560px (4K)
- Accessibilité WCAG 2.2 AA minimum sur chaque élément
- OWASP Top 10 2025 respecté sur chaque fonctionnalité
- Commentaires en français dans le code
- Zéro secret en dur dans le code (toujours .env.local)
- Zéro logo, image ou asset créé de son propre chef — toujours demander au client

### Workflow inter-agents
- L'Orchestrateur décide des priorités et valide les livrables
- Chaque agent reporte au format : [AGENT] STATUS: ... | NEXT: ...
- Le QA valide avant tout merge sur main
- Le Cybersécurité audite avant tout déploiement
- Un seul composant / une seule section à la fois — jamais tout coder d'un coup

### Conventions de nommage
- Branches git : feat/nom-feature, fix/nom-bug, chore/nom-tache
- Commits : conventional commits (feat:, fix:, style:, perf:, security:)
- Fichiers : kebab-case pour les routes, PascalCase pour les composants React
- Variables CSS : --md-{categorie}-{nom} (préfixe md = Mossine Digital)

---

## PALETTE OFFICIELLE — HIÉRARCHIE D'USAGE STRICTE

| Couleur    | Hex      | Usage — LIRE ATTENTIVEMENT                                                                                                               |
|------------|----------|------------------------------------------------------------------------------------------------------------------------------------------|
| Background | #FFFFFF  | Fond dominant — 80% du site. Sections claires.                                                                                           |
| Primary    | #1B1F3B  | Sections sombres UNIQUEMENT (Hero, Témoignages, Footer). Maximum 2-3 sections. JAMAIS fond dominant.                                    |
| Secondary  | #35A7FF  | Accent interactif principal — liens, CTA secondaires, highlights, focus ring, icônes actives, sections alternées (#F0F7FF dérivé).        |
| Accent     | #FF5964  | CTA PRINCIPAL uniquement + section CTA final. Jamais comme fond de section sauf CTA.                                                     |

### Couleurs dérivées autorisées
- #F0F7FF — fond sections alternées "bleu très clair" (dérivé de #35A7FF)
- #10132A — footer uniquement (version plus sombre de #1B1F3B)
- #E8424D — hover de #FF5964 uniquement
- #1A97F5 — hover de #35A7FF uniquement
- #FFE8E9 — fond léger accent (badges, tags sur fond clair)
- #E8EAF6 — fond léger primary (badges, tags sur fond clair)

### Rythme des sections — PAGE D'ACCUEIL
```
01 Hero          → fond #1B1F3B (sombre bleu)
02 Stats         → fond #FFFFFF (clair)
03 Services      → fond #F0F7FF (bleu clair)
04 Processus     → fond #FFFFFF (clair)
05 Témoignages   → fond #1B1F3B (sombre bleu)
06 Portfolio     → fond #F0F7FF (bleu clair)
07 CTA final     → fond #FF5964 (accent — unique)
08 Footer        → fond #10132A (très sombre bleu)
```

### Typographie
- Display (titres H1-H3) : Syne — variable --md-font-display
- Corps (paragraphes, labels) : Inter — variable --md-font-body
- Les deux importées via next/font/google, self-hosted automatiquement

### Icônes — PHOSPHOR ICONS UNIQUEMENT
Package : @phosphor-icons/react
Style Mossine Digital : weight="light" (inline) ou weight="regular" (feature)
Tailles : 20px inline, 24px features, 32px sections
Zéro Heroicons, zéro FontAwesome, zéro emojis comme icônes.

---

## STACK TECHNIQUE

- Framework : Next.js App Router + TypeScript strict
- Style : Tailwind CSS v4 + CSS Custom Properties (variables --md-*)
- Animations : Framer Motion + GSAP ScrollTrigger + Lenis (smooth scroll)
- CMS : Sanity v3 headless
- Composants UI : shadcn/ui + 21st.dev (adapter à la charte — ne jamais utiliser tel quel)
- Sécurité : Cloudflare WAF + Security Headers + Zod + Upstash rate limiting + hCaptcha
- Infra : Hostinger Cloud + Nginx + PM2 + GitHub Actions CI/CD
- Email : Resend + React Email
- Monitoring : Umami (analytics RGPD) + Sentry (erreurs)
- Tests : Playwright (E2E) + Vitest (unitaires)

### Structure dossiers Next.js
```
app/
├── (marketing)/
│   ├── page.tsx               ← Accueil
│   ├── services/page.tsx
│   ├── portfolio/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── a-propos/page.tsx
│   └── contact/page.tsx
├── globals.css
└── layout.tsx
components/
├── ui/                        ← shadcn/ui + utilitaires
├── layout/                    ← Navbar, Footer
├── sections/                  ← Sections de la page d'accueil
└── shared/                    ← Composants réutilisables
lib/
├── fonts.ts
└── utils.ts
public/
└── images/
    ├── logo/                  ← Logos livrés par le client (SVG)
    ├── hero/                  ← Assets hero
    └── sections/              ← Assets autres sections
```

---

## RESPONSIVE — OBLIGATION ABSOLUE

Chaque composant doit être testé et fonctionnel sur :
- 320px  — iPhone 4 / SE première génération (le plus petit)
- 375px  — iPhone standard (base mobile-first)
- 430px  — iPhone Pro Max
- 768px  — iPad portrait
- 1024px — iPad paysage / petit laptop
- 1280px — Desktop standard
- 1440px — Desktop large
- 1920px — Full HD
- 2560px — 4K / grands écrans TV

Breakpoints Tailwind utilisés : sm(640) md(768) lg(1024) xl(1280) 2xl(1536)
Pour les cas extrêmes (320px, 2560px) : utiliser clamp() et min()/max() en CSS.

---

## LOGOS ET ASSETS — PROTOCOLE CLIENT

RÈGLE ABSOLUE : Ne jamais créer de logo, image ou illustration de son propre chef.
Toujours utiliser un placeholder texte et demander au client.

Quand un asset est nécessaire, l'Orchestrateur fait UNE seule demande groupée :

FORMAT DEMANDE LOGO :
  BESOIN : Logo [variante]
  FORMAT : SVG fond transparent (préféré) ou PNG fond transparent
  DIMENSIONS : hauteur Xpx, largeur libre
  VARIANTE : [principale / icône / footer / favicon]
  LIVRER DANS : public/images/logo/[nom-fichier.svg]

FORMAT DEMANDE IMAGE :
  BESOIN : Image pour section [nom]
  STYLE : [description visuelle précise — ambiance, couleurs, composition]
  DIMENSIONS : [W]x[H]px ou ratio
  PROMPT IA : [prompt exact pour ideogram.ai ou leonardo.ai]
  SOURCE ALTERNATIVE : unsplash.com — recherche : "[mots-clés]"
  LIVRER DANS : public/images/[section]/[nom-fichier.webp]

Toujours compresser les images sur squoosh.app avant intégration.
Format cible : WebP, qualité 85%, taille < 200kb pour les images de section.

---

## DÉMARRAGE DE SESSION — PROMPT À COPIER DANS CLAUDE CODE

Tu es l'Orchestrateur du projet Mossine Digital.

Lis dans cet ordre :
1. CLAUDE.md (ce fichier)
2. .claude/context/PROJECT.md
3. .claude/context/AGENTS.md
4. .claude/session/STATUS.md

Affiche le résumé de situation, identifie ce qui est bloqué en attente de moi,
et commence immédiatement à exécuter la prochaine tâche.
Si tu as besoin d'assets (logos, images), regroupe tout en une seule demande
avec instructions claires et numérotées. Go.

---

## RÈGLES DE TRAVAIL — DISCIPLINE DE DÉVELOPPEMENT

1. Un composant à la fois. Jamais toute une page d'un coup.
2. Tester avant de passer au suivant. npm run dev après chaque composant.
3. Aucun logo ni image inventé — placeholder texte uniquement.
4. La palette est figée — aucune couleur hors palette sauf les dérivées listées ci-dessus.
5. Phosphor Icons uniquement — aucune autre librairie d'icônes.
6. Mobile-first absolu — commencer à 320px, enrichir vers le haut.
7. TypeScript strict — zéro compromis.
8. Mettre à jour .claude/session/STATUS.md à chaque fin de session.
9. Demander au lieu d'inventer — si un besoin n'est pas clair, poser la question.
10. La qualité prime toujours sur la vitesse.

---

## ROADMAP DES SPRINTS — PLANNING OFFICIEL

Légende : `[x]` = terminé · `[~]` = en cours · `[ ]` = à faire

À chaque fin de tâche : mettre à jour cette section ET `.claude/session/STATUS.md`.
Ne jamais supprimer une tâche — seulement changer son état. Les tâches reconduites
(découvertes tardivement, à compléter) sont ajoutées au sprint concerné avec un tag `+`.

### SPRINT 0 — Fondations stratégiques ✅ TERMINÉ

Agent : Orchestrateur

- [x] Vision, stack et palette définis
- [x] Fichiers agents BMAD créés (orchestrator, designer, dev-senior, qa, seo, cybersecurity)
- [x] CLAUDE.md v3 mis à jour avec hiérarchie palette, protocole assets, responsive
- [x] Rythme des 8 sections défini et validé
- [x] PALETTE.md, STACK.md, PROJECT.md, AGENTS.md créés

### SPRINT 1 — Architecture & Composants de base 🔵 EN COURS

Agents : Dev Sénior · Design/UI

**Structure & Tokens**
- [x] Projet Next.js 16 initialisé + TypeScript strict + Tailwind CSS v4
- [x] globals.css avec tous les tokens `--md-*` de la palette
- [x] Polices Syne + Inter configurées (next/font/google, self-hosted)
- [x] Structure dossiers : components/ui, layout, sections, shared
- [x] Dépendances installées : framer-motion, lenis, @phosphor-icons/react, gsap
- [x] lib/utils.ts (cn helper clsx + tailwind-merge)
- [x] next.config.ts : security headers OWASP + turbopack.root + image optimization

**Navbar**
- [x] Composants utilitaires : use-scroll.ts, menu-toggle-icon.tsx
- [x] Navbar v1 : pill responsive avec scroll detection
- [x] Navbar v2 : full-width au top + pill compacte au scroll (morph 500ms)
- [x] Intégration logo SVG client (logo-blanc.svg + logo-vert.svg, swap par opacity)
- [x] Correction Phosphor Icons v2.1.10 (ArrowUpRightIcon)
- [~] **Transition navbar v3 à REPRENDRE** — version Framer Motion jugée pire que v2 par le client (2026-04-11). Reprise à programmer avec skills design (frontend-design, ui-ux-pro-max, 21st.dev) + références concrètes (Studio Freight, Linear, Vercel) avant tout code. Voir memory `project_navbar_regression.md`.
- [ ] Test responsive complet : 320px → 2560px (QA final, après reprise navbar)
- [ ] `+` Focus ring accessible sur tous les liens (WCAG 2.2)
- [ ] `+` Skip-link "Aller au contenu principal" pour lecteurs d'écran

**Hero Section (01)**
- [ ] Fond #1B1F3B, min-height 100vh, texte blanc
- [ ] H1 copywrité (neurowriting) + sous-titre + badge "Agence 360°"
- [ ] 2 CTAs : "Démarrer un projet" (#FF5964) + "Voir nos réalisations" (outline blanc)
- [ ] Animation GSAP entrée (H1 stagger + fade in séquentiel)
- [ ] Scroll indicator animé (flèche bas ou point pulsant)
- [ ] Lenis smooth scroll configuré globalement
- [ ] `+` Prefers-reduced-motion : désactiver les animations pour users sensibles

**Layout global**
- [ ] Footer placeholder (structure HTML — contenu Sprint 2)
- [ ] layout.tsx final avec metadata SEO de base + favicon
- [ ] `+` Error boundary (error.tsx) + not-found.tsx personnalisés

### SPRINT 2 — Page d'accueil · sections intermédiaires ⏳

Agents : Dev Sénior · Design/UI · SEO

- [ ] Section 02 Stats — fond #FFFFFF, 4 chiffres clés animés au scroll (CountUp)
- [ ] Section 03 Services — fond #F0F7FF, 6 cards hover premium, icônes Phosphor
- [ ] Section 04 Processus — fond #FFFFFF, 4 étapes numérotées, animation séquentielle
- [ ] Section 05 Témoignages — fond #1B1F3B, carousel Framer Motion, 3 avis minimum
- [ ] Section 06 Portfolio aperçu — fond #F0F7FF, 3 projets placeholder, hover overlay
- [ ] Section 07 CTA final — fond #FF5964, titre blanc, 2 boutons
- [ ] Section 08 Footer complet — fond #10132A, 4 colonnes, liens, réseaux sociaux
- [ ] Schema.org JSON-LD : LocalBusiness + WebSite sur layout.tsx
- [ ] Metadata SEO page d'accueil (title, description, OG image, Twitter Card)
- [ ] `+` OG image 1200x630px à générer (demande client)
- [ ] `+` Intersection Observer sur chaque section (lazy-load animations)

### SPRINT 3 — Pages secondaires + CMS Sanity ⏳

Agents : Dev Sénior · SEO

- [ ] Page Services — détail complet des 6 offres
- [ ] Page À propos — histoire, équipe, valeurs, photo équipe
- [ ] Page Contact — formulaire (Zod + hCaptcha + Resend + React Email)
- [ ] Sanity v3 — schémas Article, Service, Portfolio, Témoignage, FAQ
- [ ] Page Blog — liste articles paginée (données Sanity)
- [ ] Page Blog/[slug] — article individuel + table des matières
- [ ] Page Portfolio — liste projets filtrable (données Sanity)
- [ ] Sanity Studio sur /studio (protégé par authentification)
- [ ] Sitemap.xml dynamique + robots.txt
- [ ] Schema.org : Service, Article, FAQ, BreadcrumbList sur les bonnes pages
- [ ] `+` RSS feed /feed.xml pour le blog
- [ ] `+` Related articles dans chaque article de blog

### SPRINT 4 — Sécurité + Performance + QA ⏳

Agents : Cybersécurité · QA · SEO

- [ ] Security Headers : CSP strict, HSTS, X-Frame-Options, Permissions-Policy
- [ ] Rate limiting Upstash sur /api/* (anti-spam formulaires)
- [ ] Audit OWASP Top 10 2025 complet + rapport écrit
- [ ] `npm audit` → zéro vulnérabilité critique/haute
- [ ] Tests Playwright E2E : toutes les pages, tous les formulaires
- [ ] Tests unitaires Vitest sur les utilitaires critiques (validation, sanitization)
- [ ] Tests cross-browser : Chrome, Firefox, Safari, Edge
- [ ] Tests responsive : 320px / 375px / 768px / 1280px / 1920px / 2560px
- [ ] Optimisation images : WebP/AVIF, next/image, compression squoosh
- [ ] Partytown — scripts tiers dans web worker (analytics)
- [ ] Lighthouse cible : Performance ≥ 90 mobile / 100 desktop · SEO 100 · A11y ≥ 95
- [ ] `+` Audit Axe DevTools sur chaque page (accessibilité)
- [ ] `+` Tests de charge basiques (k6 ou Artillery)

### SPRINT 5 — Déploiement Hostinger & Go Live ⏳

Agents : Dev Sénior · Cybersécurité

- [ ] Node.js 20 LTS + PM2 configurés sur Hostinger Cloud
- [ ] Nginx reverse proxy + compression gzip/brotli
- [ ] SSL Let's Encrypt + Certbot (renouvellement auto) → score Qualys A+
- [ ] Cloudflare configuré devant Hostinger (WAF + CDN + DDoS)
- [ ] GitHub Actions CI/CD : lint → test → build → deploy SSH
- [ ] Variables d'environnement production configurées (.env.production)
- [ ] Umami analytics self-hosted (RGPD, sans cookies)
- [ ] Sentry configuré (capture erreurs prod, source maps)
- [ ] Backup automatique (cron + rsync + retention 30 jours)
- [ ] Google Search Console soumis + sitemap indexé
- [ ] Lighthouse final : validation des scores cibles en prod
- [ ] `+` Monitoring uptime (UptimeRobot ou Better Stack)
- [ ] `+` Plan de rollback documenté (procédure écrite)
- [ ] `+` Documentation de déploiement pour le client (README_DEPLOY.md)

### SPRINT 6 — Post Go-Live & maintenance ⏳ (optionnel, à valider)

- [ ] Monitoring première semaine : logs, erreurs, performance
- [ ] Ajustements UX basés sur les premiers retours utilisateurs
- [ ] Optimisations SEO basées sur Search Console (requêtes, CTR)
- [ ] Contenu éditorial : premiers articles de blog
- [ ] Formation client : usage du Sanity Studio (1 session visio)

---

## AVANCEMENT GLOBAL

Mettre à jour manuellement après chaque session :

- Sprint 0 : **100%** ████████████████████ ✅
- Sprint 1 : **~60%** ████████████░░░░░░░░ 🔵 (navbar finalisée, hero à venir)
- Sprint 2 : **0%**
- Sprint 3 : **0%**
- Sprint 4 : **0%**
- Sprint 5 : **0%**
