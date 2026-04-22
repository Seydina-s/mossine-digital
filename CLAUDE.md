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
- [x] **Schema.org JSON-LD `LocalBusiness`** livré 2026-04-21 — nœud `LocalBusiness + ProfessionalService` avec `@id` stable (`${SITE_URL}/#organization`), NAP complet (Diamniadio / +221771871818 / contact@mossinedigital.com), horaires Lun-Ven 9h-18h, `areaServed: Sénégal`, `priceRange: "$"`, `image: /opengraph-image` (route dynamique). `websiteJsonLd.publisher` migré en référence `@id` (DRY). `og-image.png` dead path nettoyé de `metadata.openGraph.images` (Next auto-injecte depuis `opengraph-image.tsx`, redéclarer créerait des meta tags dupliqués). Validé `tsc --noEmit` + 8/8 Playwright SEO verts.
- [ ] `+` OG image 1200x630px à créer (demande client)
- [ ] `+` Favicon + apple-touch-icon définitifs (à partir logo client)
- [ ] `+` Données placeholder à remplacer (stats, témoignages, portfolio, footer contact)
- [ ] `+` NEXT_PUBLIC_SITE_URL à configurer en prod (domaine final à confirmer)

### SPRINT 3 — Pages secondaires + CMS Sanity ⏳

Agents : Dev Sénior · SEO

- [x] Page Services — détail complet des 6 offres (2026-04-15) : hero dédié avec table des matières ancrée, 6 ServiceDetailBlock en layout alterné (text/visuel + fond blanc/#F0F7FF), problem statement éditorial + approche + livrables + délai + CTA `/contact?service=X` par service, ServicesFAQ en details/summary natif (7 questions), JSON-LD Service×6 + BreadcrumbList + FAQPage, metadata canonique.
- [x] Page À propos — AboutHero + AboutManifesto + AboutValues + AboutMethod livrés (histoire, valeurs, méthode). Photo équipe à livrer par client.
- [x] Page Contact — ContactForm complet : Zod + honeypot + RGPD + prefill `?service=` + serveur Resend prêt (env manquant = mode gracieux).
- [x] Sitemap.xml dynamique + robots.txt (livrés Audit Sprint 2).
- [x] Schema.org Service + BreadcrumbList + FAQPage sur `/services`.
- [ ] 🟡 **Reporté post-MVP** — Sanity v3 (schémas Article/Service/Portfolio/Témoignage/FAQ) + Studio `/studio` authentifié.
- [ ] 🟡 **Reporté post-MVP** — Page Blog liste + Blog/[slug] (données Sanity).
- [ ] 🟡 **Reporté post-MVP** — Page Portfolio filtrable (données Sanity).
- [ ] 🟡 **Reporté post-MVP** — Schema.org Article + FAQ blog.
- [ ] 🔴 **Supprimé** — RSS feed `/feed.xml` (pas de blog au MVP).
- [ ] 🔴 **Supprimé** — Related articles (pas de blog au MVP).

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
- [x] `+` **Fluidité navbar homepage (dette v3.3 — RÉSOLUE 2026-04-21)** — diagnostic définitif : `components/sections/Services.tsx` installait **7 subscribers `useScroll` framer-motion** sur la homepage (1 parent + 6 per-card pour le Ken Burns imageScale). Chaque `useScroll({ target })` appelle `getBoundingClientRect()` sur chaque event scroll → synchronous layout (reflow). 7 reflows + 12 `useTransform` recomputes/event → layout thrash qui retardait le callback rAF du `useScroll` custom de la Navbar → classe CSS changée 1-2 frames trop tard → retard visible de la morph. **Hypothèses précédentes invalidées** : (a) pas de GSAP ScrollTrigger ici — framer-motion seul, (b) Aurora = pur CSS `@keyframes`, zéro JS/frame, (c) Lenis émet les events mais la saturation vient bien des subscribers framer-motion. **Fix** : imageScale dérivé mathématiquement de la progress parente via `useTransform(progress, [(i-1)/n, i/n], [1.25, 1])` → ratio 7 → 1 useScroll. Zéro reflow per-card. Validé Playwright homepage (5/5 chromium). Vaccin documenté inline dans `ServiceCard` : interdiction d'ajouter un `useScroll({ target })` dans le rendu répété de la homepage sans budget profiler préalable.

---

## 🎯 TRIAGE MVP — Validé 2026-04-21

Objectif client : **site light qui fonctionne très bien, ressources minimales, déployé vite**.
Déploiement sur Hostinger Business NVMe (serveur déjà acheté). Les tâches indispensables
avant go-live sont dans le BUCKET 1. Tout le reste attend un cas d'usage réel.

Avant d'attaquer chaque tâche, Claude explique **brièvement au client** (1-2 phrases) :
à quoi elle sert + quelle valeur elle ajoute au site. Règle non-négociable.

### 🟢 BUCKET 1 — MVP CRITIQUE (à faire avant go-live)

Sprint 5 consolidé — 18 tâches. Exécuter dans l'ordre présenté.

**A. Finir le contenu du site (données client)**
1. [x] Stats — résolu 2026-04-21 (option A) : les 4 stats actuelles sont des
   **engagements vérifiables avant 1er client** (24h réponse, 100% sur-mesure,
   360° communication, 90+ Lighthouse), pas des chiffres de track-record. Swap
   vers des métriques clients au fur et à mesure des premiers projets livrés.
2. [~] Témoignages — décision client 2026-04-21 : section **conservée telle quelle**
   avec les 3 témoignages actuels (noms et citations fictifs, cf. TODO_CLIENT dans
   `Temoignages.tsx` l.12 et l.26-28). À revisiter avant go-live ou dès réception
   d'un 1ᵉʳ vrai témoignage. Risque assumé : fake détectable → crédibilité +
   consentement RGPD. Cette case **doit être rouverte** si incident signalé.
3. [x] Footer contact livré (2026-04-21) : email `contact@mossinedigital.com`,
   téléphone `+221 77 187 18 18`, adresse `Pôle Urbain de Diamniadio, Sortie 11
   du péage`, horaires `Lun-Ven · 9h-18h (GMT)`. `ContactItem.href` rendu
   optionnel (adresse + horaires en `<span>` non-cliquables). Réseaux sociaux
   filtrés automatiquement via `href !== '#'` → bloc masqué tant que les URLs
   ne sont pas livrées côté client (Facebook/Instagram/TikTok/LinkedIn/WhatsApp
   en attente). Ces données alimenteront le JSON-LD LocalBusiness (#6).
4. [x] Favicon + apple-touch-icon livrés (2026-04-21) : source
   `public/images/logo/logo-mark.png` (2135×2134 RGBA, bleu `#35A7FF`).
   3 assets générés via `scripts/generate-favicon.mjs` (sharp + png-to-ico) :
   `app/favicon.ico` (16/32/48 multi-résolution), `app/icon.png` (512×512
   transparent), `app/apple-icon.png` (180×180 fond blanc, padding 12%).
   Bloc `icons` retiré de `layout.tsx` → Next.js App Router auto-détecte et
   injecte les `<link>` avec cache-busting. Régénération : re-run le script
   après toute mise à jour du PNG source.
5. [x] OG image 1200×630 livrée (2026-04-21) : composant
   `app/opengraph-image.tsx` (Next.js App Router ImageResponse). Fond
   `#1B1F3B` + halos radial-gradient `#35A7FF`/`#FF5964`, monogramme
   embarqué base64 depuis `logo-mark.png`, wordmark "Mossine Digital." bi-
   color (blanc + `#35A7FF`), gradient bar `#35A7FF`→`#FF5964`, tagline,
   domaine + pill "Branding · Web · Ads · SEO". Fonts Syne Bold + Inter
   Regular fetchées au build depuis fontsource CDN (fallback système
   si réseau KO). URL `/opengraph-image?<hash>` auto-injectée dans
   `og:image` + `twitter:image` par Next.js.
6. [x] JSON-LD `LocalBusiness` livré 2026-04-21 — nœud `LocalBusiness + ProfessionalService`
   avec `@id` stable (`${SITE_URL}/#organization`), NAP complet (Diamniadio /
   +221771871818 / contact@mossinedigital.com), horaires Lun-Ven 9h-18h,
   `areaServed: Sénégal`, `priceRange: "$"`, `image: /opengraph-image` (route
   dynamique). `websiteJsonLd.publisher` migré en référence `@id` (DRY).
   `og-image.png` dead path nettoyé de `metadata.openGraph.images` (Next
   auto-injecte depuis `opengraph-image.tsx`). Validé `tsc --noEmit` + 8/8
   Playwright SEO verts.

**B. Résoudre la dette a11y bloquante**
7. [x] Dette palette homepage résolue 2026-04-22 (Option 3 hybride validée client).
   **Tokens ajoutés** dans `globals.css` : `--md-secondary-solid: #0E70C8`
   (fond porteur de texte blanc, 5.33:1 ✅) et `--md-accent-solid: #C23A46`
   (5.25:1 ✅). Les tokens vifs `--md-secondary` (#35A7FF) et `--md-accent`
   (#FF5964) restent pour les décors (halos Aurora, pills, focus-rings,
   gradient bars OG image).
   **Services stacking cards** migrées dans [Services.tsx](components/sections/Services.tsx) :
   - Card Web : bg #35A7FF → #0E70C8, accent #1B1F3B → #FFFFFF, accentOnBg
     blanc → noir translucide, textMuted 0.88 → 0.96 (composité 4.27:1 ❌ → 4.8:1 ✅)
   - Card Stratégie : bg #FF5964 → #C23A46, accentOnBg blanc translucide → noir
     translucide (tag blanc sur blanc-diffus 3.93:1 → 6.9:1 ✅)
   - Card Community (bg #F0F7FF) : accent #35A7FF → #1B1F3B (bleu vif 2.12:1 ❌
     → primary 14.3:1 ✅)
   - Card SEO (bg #FFFFFF) : accent #35A7FF → #1B1F3B (2.58:1 → 14.8:1 ✅)
   **CTAFinal** migré : `bg-[var(--md-accent)]` → `bg-[var(--md-accent-solid)]`,
   sous-titre `text-white/70` → `text-white/90` (2.13:1 → 4.54:1), badge
   `text-white/80` → `text-white` (2.44:1 → 5.25:1), réassurance primary dark
   → blanc (primary sur #C23A46 = 2.74:1 ❌).
   **Tests** : test.fixme retiré sur `e2e/homepage.spec.ts`, axe color-contrast
   homepage = 0 violation WCAG AA. **49/49 Playwright verts** (2 skipped =
   fixme résiduel services/contact hors scope, dette distincte "accent-text
   sur fond clair" dans ServiceDetailBlock pills + ContactForm astérisques).
   Pas de branche feat/md-secondary-text à merger — tokens ajoutés directement
   sur la base de travail actuelle. Vaccin inline : commentaires JSDoc dans
   `globals.css` explicitant quand utiliser `-solid` (fonds porteurs de texte)
   vs. token vif (décor seulement).

**C. Anti-spam formulaire contact**
8. [x] hCaptcha côté client + validation serveur livré (2026-04-21) — mode gracieux
   double étage : widget ne rend rien sans `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`,
   `verifyHCaptcha()` retourne `{status:'skipped'}` sans `HCAPTCHA_SECRET_KEY`
   (mirror du pattern Resend). **Architecture** :
   (a) `lib/hcaptcha.ts` — helper serveur avec type-safe `VerificationResult`
   union (success/skipped/missing/failure), POST `api.hcaptcha.com/siteverify`
   en `URLSearchParams`, timeout 10s via `AbortSignal.timeout`, error-codes
   remontés à l'action pour logging + exception fallback ;
   (b) `components/ui/HCaptchaWidget.tsx` — wrapper `@hcaptcha/react-hcaptcha`
   avec `languageOverride="fr"`, `aria-label="Vérification anti-robot"`, hidden
   input `name="hcaptcha-token"` pour transmission FormData, reset auto sur
   expire/error ;
   (c) `app/contact/actions.ts` — étape 3 insérée entre honeypot et rate-limit,
   conditionnée par `isHCaptchaEnabled()`, IP extraite depuis `x-forwarded-for`
   pour `remoteip` ;
   (d) `ContactForm.tsx` — widget rendu après consentement RGPD, erreur via
   `errorFor('hcaptcha')` en aria-live polite.
   **Tests** : 11 tests Vitest `lib/__tests__/hcaptcha.test.ts` (skipped / missing
   × 4 inputs / success avec+sans IP / failure × 3 scenarios / isHCaptchaEnabled
   × 3). Validation : `tsc --noEmit` clean + Vitest 43/43 + Playwright 49/49.
   **Activation prod** : cf. `.env.example` section hCaptcha — créer un site gratuit
   sur hcaptcha.com puis renseigner les 2 variables. Tant qu'elles sont absentes,
   le honeypot reste l'unique rempart anti-spam (cohérent MVP, cf. Bucket 2 si
   volume spam > seuil).
9. [ ] Resend configuré (API key client + email expéditeur validé)

**D. Déploiement Hostinger Business NVMe**
10. [ ] Node.js 20 LTS + PM2 configurés sur Hostinger (via SSH)
11. [ ] Nginx reverse proxy + compression gzip/brotli
12. [ ] SSL Let's Encrypt + Certbot auto-renew → Qualys A+
13. [ ] Variables d'environnement production (`.env.production` serveur)
14. [ ] `NEXT_PUBLIC_SITE_URL` = domaine final (déjà SSoT dans `lib/site-config.ts`)
15. [ ] GitHub Actions CI/CD minimal : lint → test → build → deploy SSH

**E. Validation finale**
16. [ ] Lighthouse prod : Performance ≥ 90 mobile / 100 desktop · SEO 100 · A11y ≥ 95
17. [ ] Cross-browser manuel : Chrome + Firefox + Safari + Edge (`PLAYWRIGHT_CROSS_BROWSER=1`)
18. [ ] Google Search Console + sitemap.xml indexé

### 🟡 BUCKET 2 — POST-MVP (Sprint dédié, déclenché par un cas d'usage réel)

On n'allume ces blocs **que si** un besoin client concret arrive (trafic à analyser,
incident à investiguer, premier cas portfolio, premier article blog). Zéro prépa spéculative.

- [ ] **CMS Sanity v3 + Studio** — schémas Article/Service/Portfolio/Témoignage/FAQ,
   Studio sur `/studio` authentifié. Déclencheur : client prêt à rédiger du contenu lui-même.
- [ ] **Page Blog liste + Blog/[slug]** — données Sanity, H1 SEO, OG par article.
   Déclencheur : 3+ articles prêts à publier.
- [ ] **Page Portfolio filtrable** — données Sanity, liste projets, pages cas. Déclencheur :
   3+ cas clients publiables (aujourd'hui la section est masquée homepage + route background).
- [ ] **Rate limiting Upstash** `/api/contact` — anti-spam avancé. Déclencheur : spam reçu
   ou trafic formulaire > 100/jour.
- [ ] **Sentry** — capture erreurs prod + source maps. Déclencheur : premier bug prod signalé.
- [ ] **Umami analytics self-hosted** — RGPD sans cookies. Déclencheur : client demande
   des données de trafic ou lance une campagne payante.
- [ ] **Cloudflare devant Hostinger** — WAF + CDN + DDoS. Déclencheur : pic de trafic ou
   attaque détectée dans les logs Nginx.
- [ ] **Backup automatique** (cron rsync retention 30j). Déclencheur : après Sanity CMS
   actif (aujourd'hui Git = source unique, `git clone` suffit).
- [ ] **Monitoring uptime** (UptimeRobot gratuit). Déclencheur : premier incident de
   disponibilité ressenti.
- [ ] **Composant `<SectionEyebrow>` partagé** — refacto DRY. Déclencheur : 3ᵉ section
   qui dupliquerait le pattern.
- [ ] **Stats — différenciation couleurs icônes** — validation designer sur quelle stat
   accentuer. Déclencheur : brief UX dédié.

### 🔴 BUCKET 3 — SUPPRIMÉ (non indispensable, overkill pour un MVP)

Rationalisé sur décision client 2026-04-21. **Ne pas les reprendre** sans demande explicite.

- ~~Tests de charge k6/Artillery~~ — overkill pour site vitrine < 10k visites/mois.
- ~~RSS feed `/feed.xml`~~ — pas de blog au MVP, et les RSS readers sont marginaux en 2026.
- ~~Related articles dans blog~~ — pas de blog au MVP.
- ~~Partytown scripts tiers~~ — pas d'analytics tiers au MVP (Umami est first-party quand
   on l'activera, pas besoin de web worker).
- ~~Sentry source maps upload~~ — premier bug = premier besoin, pas avant.
- ~~Backup rsync retention 30 jours~~ — Git + Hostinger snapshots natifs suffisent tant
   que Sanity CMS n'est pas actif.
- ~~Plan de rollback documenté~~ — `git revert` + redeploy SSH = procédure évidente,
   pas besoin d'un doc formel.
- ~~Re-vérification Témoignages `useEffect` cleanup~~ — audit initial erroné, code OK.
- ~~Documentation déploiement client README_DEPLOY.md~~ — remplacé par sessions live
   de transfert à la livraison.

### SPRINT 6 — Post-Go-Live immédiat (semaine 1) ⏳

- [ ] Monitoring première semaine : Nginx logs, erreurs console, temps réponse
- [ ] Ajustements UX sur retours utilisateurs réels
- [ ] Optimisations SEO basées sur Search Console (requêtes indexées, CTR, erreurs)
- [ ] Session de transfert client (1 visio ≤ 1h — comment mettre à jour les données
   en dur avant l'arrivée éventuelle de Sanity)

---

## AVANCEMENT GLOBAL

Mettre à jour manuellement après chaque session :

- Sprint 0 : **100%** ████████████████████ ✅
- Sprint 1 : **~99%** ███████████████████░ 🔵 (focus ring WCAG 2.2 livré 2026-04-16, reste : favicon client — Bucket 1 #4)
- Sprint 2 : **~93%** ██████████████████░░ 🔵 (Portfolio masqué homepage 2026-04-21 — reste LocalBusiness + placeholders + assets client = Bucket 1 A)
- Sprint 3 : **~60%** ████████████░░░░░░░░ 🔵 (pages /services + /a-propos + /contact + /politique-conf livrées ; Blog/Portfolio/Sanity **reportés Bucket 2**)
- Sprint 4 : **~75%** ███████████████░░░░░ 🔵 (dette v3.3 navbar résolue 2026-04-21 + Portfolio hidden ; reste palette a11y + Lighthouse prod = Bucket 1 B/E)
- Bucket 1 MVP : **7/18** ████████░░░░░░░░░░░░ 🔵 (A terminé ✅ · B #7 ✅ · C #8 hCaptcha ✅ · reste #2 témoignages + #9 Resend + D-E déploiement)
- Bucket 2 Post-MVP : activé à la demande
- Sprint 6 : **0%** (semaine 1 post go-live)
