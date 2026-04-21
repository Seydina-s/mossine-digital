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
- **🛡️ Règle vaccin RSC** : tout module dans `lib/` est potentiellement
  consommé par un server component et traverse la frontière RSC. Ses
  exports DOIVENT être 100 % sérialisables JSON. Interdit : composants
  React, fonctions, classes, Map/Set, Date. Pour lier un visuel à une
  donnée, utiliser une clé string littérale résolue côté consommateur
  via `Record<Key, Component>` (TypeScript casse la build si la clé
  manque dans le map — protection anti-régression). Référence :
  `lib/services-data.ts` + `components/services/ServiceDetailBlock.tsx`.

### Workflow inter-agents
- L'Orchestrateur décide des priorités et valide les livrables
- Chaque agent reporte au format : [AGENT] STATUS: ... | NEXT: ...
- Le QA valide avant tout merge sur main
- Le Cybersécurité audite avant tout déploiement
- Un seul composant / une seule section à la fois — jamais tout coder d'un coup

### Rituel de fin de sprint — Réunion d'audit inter-agents (obligatoire)
Dès qu'un sprint atteint 100% dans la roadmap, avant de passer au sprint suivant,
l'Orchestrateur convoque tous les agents pour un audit croisé.

Déroulé :
1. Chaque agent mène son propre audit dans son domaine d'intervention (Designer sur
   l'UI/UX, Dev Sénior sur le code, Cybersécurité sur la sécu, QA sur les tests et la
   conformité, SEO sur les métriques et la structure).
2. Chaque agent recueille l'avis critique et constructif des autres — un agent peut
   challenger le travail d'un autre sur son terrain.
3. Objectif collectif : identifier ce qui ne fonctionne pas, ce qui sort de la vision,
   améliorer ce qui marche déjà, corriger ce qui ne fonctionne pas.
4. Sortie : une liste de tâches priorisées, ajoutée dans la Roadmap des sprints :
   - Si la tâche complète un sprint déjà ouvert → ajoutée avec tag `+ Audit Sprint N`
   - Sinon → nouvelle sous-section `Audit Sprint N` dans le sprint suivant
5. Les tâches issues de l'audit sont exécutées automatiquement par ordre de priorité
   dès que leur temps vient dans la planification.

Ce rituel est déclenché sans attendre la demande du client.

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

### Rythme des sections — PAGE D'ACCUEIL (mis à jour 2026-04-14)
```
01 Hero          → fond #1B1F3B + Aurora mesh CSS animé (halos #35A7FF/#FF5964/violet)
02 Stats         → fond #FFFFFF (clair)
03 Services      → fond #0a0e1c (sombre, stacking cards sticky themées)
04 Processus     → fond #FFFFFF (clair)
05 Témoignages   → fond #1B1F3B (sombre bleu)
06 Portfolio     → fond #F0F7FF (bleu clair)
07 CTA final     → fond #FF5964 (accent — unique)
08 Footer        → fond #10132A (très sombre bleu)
```
Note : Services est passé en sombre (décision client 2026-04-14) pour accueillir
le stacking cards où chaque carte a son propre bg de palette. Alternance
dark/light/dark/light/dark préservée.

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
- [x] **Navbar v3 livrée** (2026-04-14) — morph pill anti-jank (5 props transitionnées, 300ms, `will-change: max-width`), underline centré, a11y mobile complète (focus-trap + Escape + aria-current + pastille active). Hooks : use-active-link, use-focus-trap, use-escape.
- [x] **Navbar v3.1 patch** (2026-04-15) — visibilité cross-page via `usePathname()` + hystérésis scroll 40/16 + transition-delay 60ms sur couleur texte + GPU hint étendu.
- [x] **Navbar v3.2 "skin crossfade"** (2026-04-15) — architecture 3 couches : header anime uniquement `max-width`, 2 skins absolute-positioned crossfadent par `opacity` (GPU-pur), contenu en 3ème couche anime `padding + color` avec délai 60ms. `backdrop-blur-xl` n'est plus permanent → activé seulement dans le skin "glass". Overlay mobile : zoom-in 0.98→1 + stagger liens 40ms (respect `prefers-reduced-motion`). Résout le jank homepage documenté v3.1.
- [x] **Régression stub pages résolue** (2026-04-15) — `lib/nav-config.ts` expose `DARK_HERO_PATHS` (allow-list positive typée readonly) + helper `hasDarkHero(pathname)`. Navbar démarre transparente uniquement sur les pathnames listés (`/`, `/services`, `/a-propos`, `/blog`, `/portfolio`). Partout ailleurs → glass blanc par défaut. Vaccin documenté : JSDoc explicite dans le fichier de config, toute nouvelle page à Hero sombre doit être ajoutée à la liste sous peine de régression logo invisible.
- [x] **Test responsive complet 320→2560px** (2026-04-16) — `e2e/responsive.spec.ts` couvre 4 pages × 6 viewports + 2 tests breakpoint navbar (hamburger <1024px / liens desktop ≥1024px). 26/26 verts, zéro overflow horizontal détecté.
- [x] **Focus ring accessible sur tous les liens** (2026-04-16, WCAG 2.2) — standard 3 variantes : `ring-[var(--md-secondary)]` + `ring-offset-[var(--md-primary)]` sur fond dark (5.56:1 non-text contrast), `ring-[var(--md-accent)]` + `ring-offset-white` sur fond clair (le secondary échoue 3:1 sur blanc = cf. dette palette), `ring-white` + `ring-offset-[var(--md-accent)]` sur fond accent. 9 fichiers patchés : Footer (8 liens), Hero (tabs carrousel), Services (outro + 6 cards via outline natif pour fond themé variable), CTAFinal, ServiceDetailBlock (6×), ComingSoon, error.tsx, not-found.tsx, ContactForm (submit). Navbar/Temoignages/BackToTop/AboutMethod/ServicesPageHero/ServicesFAQ déjà compliants. 40/40 Playwright verts.
- [x] **Skip-link "Aller au contenu principal"** (Sprint 2) — `#contenu-principal` wired dans layout.tsx + chaque page.

**Hero Section (01)**
- [x] Fond #1B1F3B + Aurora mesh CSS animé (3 halos, GPU compositing)
- [x] H1 copywrité + sous-titre (badge retiré 2026-04-13)
- [x] CTA "Démarrer un projet" GlassCTA tone=dark
- [x] Animations d'entrée Framer Motion (stagger + fade séquentiel)
- [x] Scroll indicator animé (ligne + point pulsant)
- [x] Lenis smooth scroll configuré globalement
- [x] Prefers-reduced-motion respecté (via `useReducedMotion` + globals.css)
- [x] `+` Showcase carrousel services (crossfade + Ken Burns, rotation 2s)

**Layout global**
- [x] Footer placeholder (structure complète, 4 colonnes)
- [x] layout.tsx avec metadata SEO de base + skip-link a11y
- [ ] `+` Favicon définitif (logo client à recevoir)
- [ ] `+` Error boundary (error.tsx) + not-found.tsx personnalisés

### SPRINT 2 — Page d'accueil · sections intermédiaires 🔵 EN COURS

Agents : Dev Sénior · Design/UI · SEO

- [x] Section 02 Stats — fond #FFFFFF, 4 chiffres clés animés au scroll (CountUp)
- [x] Section 03 Services — **stacking cards sticky** themées (fond #0a0e1c), 6 cards palette
- [x] Section 04 Processus — fond #FFFFFF, 4 étapes numérotées, animation séquentielle
- [x] Section 05 Témoignages — fond #1B1F3B, carousel Framer Motion, 3 avis
- [x] Section 06 Portfolio aperçu — fond #F0F7FF, 3 projets placeholder, hover overlay
- [x] Section 07 CTA final — fond #FF5964, titre blanc, 2 boutons, grain
- [x] Section 08 Footer complet — fond #10132A, 4 colonnes, liens, réseaux sociaux
- [x] `+ Audit Sprint 2` — Photo Stratégie intégrée (2026-04-14)
- [x] `+ Audit Sprint 2` — Hero background Aurora mesh CSS (Option A, 2026-04-14)
- [x] `+ Audit Sprint 2` — Services refactor stacking cards (Option 2, 2026-04-14)
- [x] `+ Audit Sprint 2` — GlassCTA unifié sur 4 emplacements (Hero, Navbar×2, CTAFinal)
- [x] Schema.org JSON-LD `WebSite` (publisher Organization) sur layout.tsx
- [x] Metadata SEO page d'accueil (title template, description, OG, Twitter, robots, keywords)
- [x] `+` error.tsx (Error Boundary global) avec Aurora + reset
- [x] `+` not-found.tsx (404 personnalisée) avec Aurora + CTAs
- [ ] Schema.org JSON-LD `LocalBusiness` (besoin adresse/téléphone/horaires client)
- [ ] `+` OG image 1200x630px à créer (demande client)
- [ ] `+` Favicon + apple-touch-icon définitifs (à partir logo client)
- [ ] `+` Données placeholder à remplacer (stats, témoignages, portfolio, footer contact)
- [ ] `+` NEXT_PUBLIC_SITE_URL à configurer en prod (domaine final à confirmer)

### SPRINT 3 — Pages secondaires + CMS Sanity ⏳

Agents : Dev Sénior · SEO

- [x] Page Services — détail complet des 6 offres (2026-04-15) : hero dédié avec table des matières ancrée, 6 ServiceDetailBlock en layout alterné (text/visuel + fond blanc/#F0F7FF), problem statement éditorial + approche + livrables + délai + CTA `/contact?service=X` par service, ServicesFAQ en details/summary natif (7 questions), JSON-LD Service×6 + BreadcrumbList + FAQPage, metadata canonique.
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

#### Audit Sprint 2 — tâches issues du rituel inter-agents (2026-04-14)

**P0 — bloquant mise en ligne**
- [x] 🚨 Stubs 5 routes créées via composant `ComingSoon` partagé : `/services`, `/a-propos`, `/blog`, `/portfolio` (pages minimalistes Aurora + `robots:noindex`). `/contact` monte directement le vrai `ContactForm` déjà bâti (gracieux si env Resend manquant).

**P1 — UX/SEO fort**
- [x] SEO : sitemap.xml dynamique (`app/sitemap.ts`)
- [x] SEO : robots.txt dynamique (`app/robots.ts`)
- [x] Designer : Temoignages auto-rotate 3s → 7s
- [ ] QA : Lighthouse baseline homepage (vérifier claim "Score Lighthouse 90+") — à faire sur prod déployée

**P2 — polish code & design**
- [x] Dev : type `PhosphorIcon` extrait dans `lib/types.ts`
- [x] Dev : constantes `EASE_OUT_EXPR` / `EASE_CSS` centralisées dans `lib/motion.ts`
- [x] Dev : `useCountUp` — `rootMargin: '0px 0px -10% 0px'` ajouté (évite trigger prématuré)
- [x] Designer : Processus — timeline connectrice dynamique (`100/STEPS.length/2%`)
- [ ] Designer : composant `<SectionEyebrow>` partagé (nice-to-have, pas bloquant)
- [ ] Designer : Stats — différenciation couleurs icônes (demande validation client sur quelle stat accentuer)
- [ ] Dev : Temoignages — re-vérifier : `useEffect cleanup` gère déjà clearTimeout correctement, audit initial erroné

**P3 — sécurité/QA en avance**
- [x] SEO : H1 unique par page (2026-04-21) — 9 pages auditées, 1 H1 chacune. Verrouillage Playwright via `e2e/seo.spec.ts` (8 tests sur toutes les routes + 404).
- [x] SEO : alt text descriptif métier sur images Services (2026-04-21) — champ `imageAlt` ajouté à `ServiceDetail` (6 services décrits par intention métier), consommé par `ServiceDetailBlock`. Stacking cards homepage : `alt="Illustration du service ${title}"`.
- [x] Cyber : `NEXT_PUBLIC_SITE_URL` documenté (2026-04-21) — SSoT dans `lib/site-config.ts` (console.warn prod si absent), 6 fichiers migrés (layout, contact, a-propos, services, sitemap, robots). README.md remplacé avec section "Variables d'environnement critiques" expliquant l'impact (canonical/OG/sitemap/JSON-LD).

### SPRINT 4 — Sécurité + Performance + QA 🔵 EN COURS

Agents : Cybersécurité · QA · SEO

- [x] **Security Headers** (2026-04-16) : CSP stricte marketing / relaxée studio, HSTS 2 ans + preload-ready, X-Frame-Options, Permissions-Policy exhaustive, COOP/CORP. Voir `next.config.ts`.
- [ ] Rate limiting Upstash sur /api/* (anti-spam formulaires) — **BLOQUÉ** compte client Upstash.
- [x] **Audit OWASP Top 10 2025** (2026-04-16) : rapport complet `.claude/session/AUDIT_OWASP.md` — 10 catégories + 2 émergentes (Supply Chain, AI/ML). Score Observatory cible : A.
- [x] **`npm audit`** (2026-04-16) : HIGH résolu (Next 16.2.4 patche CVE GHSA-q4gf-8mx6-v5v3). 5 moderate restants circonscrits dev-only (chaîne @sanity/cli → js-yaml, non bundlé prod).
- [x] **Tests Playwright E2E** (2026-04-16) : 14 tests pages complètes (/, /services, /contact, /a-propos stubs). `e2e/homepage.spec.ts`, `e2e/services.spec.ts`, `e2e/contact.spec.ts`, `e2e/stubs.spec.ts`. Smoke a11y axe-core inclus.
- [x] **Tests unitaires Vitest** (2026-04-16) : 32 tests — contact-schema (25, Zod + honeypot + RGPD) + nav-config (7, snapshot DARK_HERO_PATHS). `lib/__tests__/`.
- [ ] Tests cross-browser : Chrome, Firefox, Safari, Edge (Chrome fait, reste Firefox/WebKit/Edge — **CI Sprint 5**).
- [x] **Tests responsive 320→2560** (2026-04-16) : `e2e/responsive.spec.ts`, 26/26 verts, 4 pages × 6 viewports. Zéro overflow horizontal.
- [x] **Optimisation images** (2026-04-16, audit) : verdict no-op justifié — SVG logos (Navbar 3× + Footer 1×) n'ont rien à gagner de next/image (pas de resize/format conversion). Carrousel Hero 6 WebP déjà optimisées 17-35KB dans `motion.div` + `AnimatePresence` — migration casserait l'architecture crossfade pour gain LCP marginal.
- [ ] Partytown — scripts tiers dans web worker (analytics) — **BLOQUÉ** creds Umami client.
- [ ] Lighthouse cible : Performance ≥ 90 mobile / 100 desktop · SEO 100 · A11y ≥ 95 — nécessite prod déployée.
- [x] **Audit Axe DevTools** (2026-04-16, partiel) : `@axe-core/playwright` intégré dans chaque spec E2E, règles wcag2aa + wcag21aa + wcag22aa. Violations bloquantes corrigées (contraste Footer/Hero/Services/CTAs + target-size dots Témoignages WCAG 2.2).
- [~] `+` **Dette palette `--md-secondary`** (2026-04-16 → partiellement résolue 2026-04-20, branche `feat/md-secondary-text`) — token `--md-secondary-text: #0E70C8` ajouté (5.33:1 sur blanc ✅ AA). 10 fichiers migrés pour usages "texte sur fond clair" : ContactForm, Portfolio, Stats, Processus, ServicesFAQ, AboutManifesto/Values/Method, pages /contact + /politique-confidentialite + skip-link layout. `--md-secondary` préservé pour focus-rings, fond sombres, icônes décoratives aria-hidden, list markers. **Dette résiduelle** : (a) Services stacking cards themed `#35A7FF` + white = 2.58:1, (b) CTA accent `#FF5964` + white = 3.05:1. Exigent rebranding ou assombrissement → décision designer. Les 3 `test.fixme` dans `e2e/*.spec.ts` reformulés avec scope réduit "themed cards + accent CTA". Merge de la branche en attente validation client/designer.
- [ ] `+` Tests de charge basiques (k6 ou Artillery) — nécessite prod déployée.
- [ ] `+` **Fluidité navbar homepage (dette v3.3)** — lag persistant du morph sur la home (autres pages fluides). Corrections v3.3 déjà appliquées sans succès : rAF throttle `useScroll`, `backdrop-filter` conditionnel (désactivé quand skin inactif), blur 24→20px, `translate-y` GPU-only. Hypothèses restantes à instrumenter avec DevTools Performance Profiler AVANT toute nouvelle tentative : (1) ScrollTrigger GSAP des stacking cards Services émet des listeners compétitifs, (2) Aurora mesh + carrousel Hero saturent le main thread, (3) stacking context incorrect de la navbar sous Lenis. **Interdiction de re-tenter à l'aveugle** — exiger profiler flamegraph + frame timing mesurés avant d'éditer.

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
- Sprint 1 : **~99%** ███████████████████░ 🔵 (focus ring WCAG 2.2 livré 2026-04-16, reste : favicon client)
- Sprint 2 : **~90%** ██████████████████░░ 🔵 (sections + SEO + error/404 livrés, reste LocalBusiness + assets client)
- Sprint 3 : **~15%** ███░░░░░░░░░░░░░░░░░ 🔵 (pages /services + /a-propos + /contact + /politique-conf livrées, reste blog + portfolio + Sanity)
- Sprint 4 : **~65%** █████████████░░░░░░░ 🔵 (CSP + OWASP + 72 tests verts livrés, reste : palette a11y + Upstash/hCaptcha/Partytown/Lighthouse — bloqués client ou prod)
- Sprint 5 : **0%**
