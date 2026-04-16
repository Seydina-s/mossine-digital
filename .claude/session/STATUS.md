# STATUS.md — Session Mossine Digital

**Dernière mise à jour** : 2026-04-15
**Sprint actuel** : Sprint 2 — closed (audit livré, reste client-blocked) → Sprint 3 démarrage possible
**Agent actif** : Dev Sénior (session automatique)

## Session du 2026-04-15 (itération 7) — Sprint 3 démarré : page /services livrée ✅

**Page `/services` complète** (remplace le stub ComingSoon) :

- `lib/services-data.ts` — source unique de vérité, 6 services enrichis
  (problem éditorial, promise, approach 4-5 pts, deliverables 5 livrables,
  timeline, accent palette, icône Phosphor SSR) + 7 FAQ transverses incluant
  explicitement le segment ONG.

- `components/services/ServicesPageHero.tsx` (client) — hero fond #1B1F3B
  avec aurora reprise (halos #35A7FF + #FF5964 en `md-aurora-*`), H1 éditorial
  "Six leviers, une seule *direction*", table des matières cliquable en pills
  glass vers chaque ancre service, scroll cue animé.

- `components/services/ServiceDetailBlock.tsx` (client, 1 composant réutilisé 6×) :
  - Numéro géant en filigrane (opacity 3.5%) positionné alternativement
    gauche/droite selon `reverse`.
  - Layout grid 2 cols : texte (eyebrow coloré accent + H2 + problem italique
    + promise + approche bullets + timeline + CTA border2) / visuel (image
    aspect 4/5 en rounded-28 + carte livrables flottante avec CheckIcon
    dans pastille accent).
  - Alternance `reverse` + `tinted` (#F0F7FF) pour services pairs (02, 04, 06).
  - Ancre `scroll-mt-24` pour compenser la navbar sticky lors du scroll via
    table des matières.
  - CTA chaque bloc : `/contact?service=<id>` (pré-sélection future côté form).

- `components/services/ServicesFAQ.tsx` (server, zéro JS) — accordéon natif
  `<details>/<summary>` avec PlusIcon qui rotate-45 à l'ouverture, focus-ring
  WCAG. 7 questions couvrant : ONG, modularité des services, délais, tarifs,
  distanciel, ROI, différenciation.

- `app/services/page.tsx` (server) — metadata canonique + robots:index,
  JSON-LD `@graph` avec BreadcrumbList + Service×6 (areaServed "Francophonie
  & international") + FAQPage, assemble Hero → 6 Blocks alternés → FAQ →
  CTAFinal réutilisé → Footer.

**TypeScript check** : 0 erreur.

**Note** : CTA `/contact?service=X` pose une base pour la pré-sélection côté
ContactForm — à implémenter en tâche polish (lecture `useSearchParams` +
`defaultValue` sur le select service).

## Session du 2026-04-15 (itération 6) — Navbar v3.1 (patch visibilité + hystérésis)

**Patch livré** (`components/layout/Navbar.tsx` + `components/ui/use-scroll.ts`) :
- `usePathname()` + `showGlass = scrolled || !isHomepage` → sur `/contact` (et
  toute page non-Aurora) la navbar force l'état glass blanc dès le top (logo
  bleu + texte primary visibles au lieu de blanc-sur-blanc).
- Hystérésis scroll : entrée 40px / sortie 16px → évite le re-trigger du morph
  quand Lenis oscille autour du seuil.
- `transitionDelay: 60ms` sur la couleur texte → évite le flash texte blanc sur
  bg blanc à mi-morph. `transform: translateZ(0)` + `will-change` étendu pour
  forcer une GPU layer isolée.

**⚠️ PROBLÈMES NAVBAR RESTANTS (feedback user 2026-04-15)** :

1. **Transition initial → scrolled toujours saccadée sur homepage**. "Très lente
   et manque fluidité, ça saccade." Le morph 300ms + 5 props animées continue de
   jank sur Chrome desktop même avec GPU hint. Hypothèses à explorer :
   - Lenis smooth scroll qui re-déclenche scroll events à 120hz → React state
     setter tourne trop (malgré hystérésis, le callback lui-même tourne toujours).
     Solution : passive listener ok, mais peut-être débouncer avec `requestAnimationFrame`.
   - Conflict avec la scale transform des stacking cards Services qui re-compose
     en continu au scroll → le browser ne prioritize plus la navbar.
   - `backdrop-blur-xl` + `backdrop-saturate-150` = 2 filters GPU-coûteux en
     permanence. À isoler dans une couche sibling avec `contain: layout paint`.
   - Transition sur `max-width` peut déclencher un reflow sur le parent flex
     malgré `will-change`. Tester avec `width` + `transform: scaleX()` à la place.

2. **Régression état initial sur pages stubs** (`/services`, `/a-propos`, `/blog`,
   `/portfolio`) : Le patch force `showGlass=true` sur **toutes** les pages ≠ `/`.
   Or les pages stubs `ComingSoon` ont elles aussi un fond Aurora sombre, donc
   elles devraient avoir l'état **transparent** au top comme homepage.
   
   **Seule `/contact`** (fond clair) devait basculer en glass immédiat.
   
   Fix à appliquer : au lieu d'une allow-list négative sur pathname, utiliser
   une allow-list positive des pages à fond sombre : `['/', '/services',
   '/a-propos', '/blog', '/portfolio']` → transparent au top. `/contact`
   (et futures pages claires) → glass par défaut.
   Ou mieux : prop/context `heroTone="dark" | "light"` exposé par chaque page.

**Action** : documenter dans la roadmap Sprint 1 et reprendre en itération 7.

## Session du 2026-04-15 (itération 5) — Audit Sprint 2 + P0/P1/P2 livrés

**Rituel d'audit fin de Sprint 2 exécuté** (règle CLAUDE.md). Chaque agent a audité
son domaine, tâches ajoutées au planning sous section `Audit Sprint 2` dans Sprint 3.

**P0 — 5 routes 404 éliminées** :
- Composant partagé `components/shared/ComingSoon.tsx` (Aurora cohérent avec 404,
  eyebrow + H1 italique + badge pulsant + 2 CTAs).
- Pages stub : `/services`, `/a-propos`, `/blog`, `/portfolio` → `ComingSoon` avec
  `robots:noindex` (follow:true pour laisser le crawl).
- `/contact` → vraie page fonctionnelle qui monte `ContactForm` déjà bâti
  (grille 2 colonnes avec aside réassurance, titre éditorial). Le server action
  dégrade gracieusement si `RESEND_API_KEY` manquant (message d'erreur clair).

**P1 — SEO/UX** :
- `app/sitemap.ts` : sitemap dynamique avec 6 URLs (homepage + 5 routes),
  priorities et changeFrequency différenciés.
- `app/robots.ts` : robots dynamique, disallow `/api/`, `/_next/`, `/studio/`.
- `components/sections/Temoignages.tsx` : `AUTO_INTERVAL_MS` 3000 → 7000 (laisse
  le temps de lire un témoignage de 250 mots).

**P2 — polish code** :
- `lib/types.ts` : type `PhosphorIcon` extrait (dédupliqué Stats + Processus + Hero).
- `lib/motion.ts` : constantes `EASE_OUT_EXPR` (tuple pour framer-motion) et
  `EASE_CSS` (string pour CSS) centralisées. Importées par Navbar, Hero, Stats,
  Processus, Services, ContactForm.
- `useCountUp` (Stats) : `rootMargin: '0px 0px -10% 0px'` ajouté pour éviter
  trigger prématuré offscreen.
- `Processus` timeline connectrice : calcul dynamique `100/STEPS.length/2%`
  (robuste à l'ajout/retrait d'étapes, plus de magic number 12.5%).

**TypeScript check** : 0 erreur.

**Restant Sprint 2 (audit) non bloqué** :
- Lighthouse baseline homepage (nécessite prod déployée)
- Vérification h1 unique par page
- Alt text descriptif métier sur images Services
- Doc `NEXT_PUBLIC_SITE_URL` requis en prod
- `<SectionEyebrow>` partagé (nice-to-have)
- Stats différenciation couleurs icônes (demande validation client)

**Bloqués client (Sprint 2)** :
- Favicon/apple-touch-icon définitifs, OG image 1200×630, LocalBusiness JSON-LD
  (adresse/téléphone/horaires), données placeholder (stats/témoignages/portfolio/
  footer contacts), NEXT_PUBLIC_SITE_URL (domaine final).

## Session du 2026-04-14 (itération 4) — Navbar v3 livrée ✅

- **Navbar v3** (`components/layout/Navbar.tsx`) : 3e tentative réussie après 2 rollbacks.
  Skills design invoqués AVANT code (`frontend-design`) → plan validé par user → exécution
  par étapes.

- **Architecture anti-jank** :
  - `backdrop-filter`, `border`, `rounded-full`, `top-4`, `h-16` appliqués **en permanence**
    (plus de création de GPU layer mid-transition).
  - Seules 5 props transitionnent (300ms) : `max-width, background-color, border-color,
    box-shadow, color`. Aucune prop layout-heavy.
  - `will-change: max-width` hint GPU.
  - Seuil scroll 10 → 40 (évite trigger micro-scroll).
  - Logo crossfade opacity (hauteur fixe h-10, pas de reflow).

- **Morph au scroll** :
  - Top (Hero sombre) : `max-w-[1400px]`, transparent, texte blanc, logo blanc.
  - Scrolled (>40px) : `max-w-[960px]`, glass blanc/85, texte primary, logo bleu, shadow.

- **Underline centré** (verdict designer vs underline directionnel) : `left-1/2 -translate-x-1/2`,
  `w-0→w-full` on hover, opacity-60 si actif.

- **A11y mobile** :
  - `role="dialog" aria-modal aria-label aria-hidden` sur overlay.
  - `useFocusTrap` (Tab/Shift+Tab piégés, focus restauré sur hamburger à la fermeture).
  - `useEscape` ferme le menu.
  - `aria-controls="menu-mobile"` + `aria-expanded` sur hamburger.
  - `MobileNavLink` avec `aria-current="page"` + pastille visuelle active.
  - Body scroll-lock quand menu ouvert.

- **Hooks créés** : `use-active-link.ts`, `use-focus-trap.ts`, `use-escape.ts`.

- **prefers-reduced-motion** : géré globalement via CSS (`app/globals.css:83`), les
  transitions navbar auto-collapse à 0.01ms.

- **TypeScript check** : 0 erreur.

## Session du 2026-04-14 (itération 3) — SEO Metadata + Error boundaries

- **Metadata SEO page d'accueil** (`app/layout.tsx`) :
  - `metadataBase` + `alternates.canonical` configurés (URL via `NEXT_PUBLIC_SITE_URL`,
    fallback `https://mossine-digital.com` — à confirmer client).
  - `title.default` + `title.template` (`%s — Mossine Digital`).
  - Description SEO rallongée (160 chars, intégrant les 6 services).
  - Open Graph complet : type=website, locale=fr_FR, siteName, image 1200×630
    (TODO : `/og-image.png` à créer côté client).
  - Twitter Card `summary_large_image`.
  - Robots + googleBot (index/follow, max-image-preview: large).
  - Icons : favicon.ico + apple-touch-icon.png (TODO client).
  - `keywords` (11 termes) + `category: 'business'`.
  - `viewport` export séparé (Next 14+ best practice) avec `themeColor` light/dark.

- **Schema.org JSON-LD** (inline dans `<head>` du layout) :
  - Type `WebSite` avec `publisher` Organization + logo.
  - `inLanguage: 'fr-FR'`, description complète.
  - LocalBusiness JSON-LD différé (besoin adresse/téléphone/horaires client).

- **app/not-found.tsx** (404 personnalisée) :
  - Aurora atmosphère cohérente avec Hero (réutilise classes `md-aurora-*`).
  - H1 éditorial "Page introuvable" italique + code erreur typo mono.
  - 2 CTAs : "Retour à l'accueil" (bouton primaire blanc) + "Nous contacter"
    (glass secondaire).
  - `robots: { index: false }` — évite l'indexation du 404.
  - Import Phosphor via `/dist/ssr` pour server component.

- **app/error.tsx** (Error Boundary global) :
  - Client component (`'use client'` obligatoire pour `reset()`).
  - Aurora atmosphère (halos inversés : accent rouge dominant).
  - Icône `WarningCircleIcon` dans bulle accent.
  - Affiche `error.digest` (prod) pour traçabilité Sentry (Sprint 5).
  - `console.error` en dev uniquement.
  - 2 CTAs : "Réessayer" (`reset()`) avec icône qui tourne au hover, "Retour accueil".
  - `role="alert"` pour lecteurs d'écran.

- **TypeScript check** : 0 erreur.

## Session du 2026-04-14 (itération 2) — Hero Aurora + Services stacking

- **Photo Stratégie intégrée** : `public/images/hero/service-strategie.webp` (29kb)
  branchée dans `components/sections/Services.tsx:93` (remplace le gradient placeholder).

- **Hero background = Aurora mesh CSS (Option A validée client)** :
  - `app/globals.css` : 3 keyframes `md-aurora-drift-1/2/3` + classes utilitaires
    (GPU compositing, `will-change: transform`, durées 22s/28s/34s).
  - `components/sections/Hero.tsx` (Atmosphere) : 3 halos animés #35A7FF, #FF5964,
    violet #6958FF. Respect `prefers-reduced-motion` via prop `reduced` (désactive
    les classes d'animation). Zéro JS par frame. Noise SVG + grille + vignette
    conservés.
  - DottedSurface Three.js **rejeté** après audit (AI-slop, +600kb bundle, GPU
    lourd mobile, hors-sujet marque).

- **Services = stacking cards sticky (Option 2 validée client)** :
  - Rewrite complet de `components/sections/Services.tsx`.
  - 6 cards themées palette Mossine (bg/text/accent par service, voir CARD_THEMES
    inline) : identité #1B1F3B, web #35A7FF, community #F0F7FF, ads #10132A,
    seo #FFFFFF, stratégie #FF5964 (flagship).
  - Sticky `top: 0` + `h-[82vh]` par card, scale progressive via
    `useScroll`+`useTransform` framer-motion.
  - Ken Burns sur chaque image (scale 1.25→1 sur le scroll de la card).
  - Section background changé : #F0F7FF → #0a0e1c (rythme des sections modifié,
    user a confirmé).
  - Supprimé : `ReactLenis` (Lenis déjà global via SmoothScroll provider).
  - Imports : `framer-motion` (pas `motion/react`) pour cohérence codebase.
  - Accessibilité : `useReducedMotion` désactive scale/zoom si nécessaire.

- **TypeScript check** : 0 erreur.

- **Skills invoqués avant code** : `frontend-design` pour audit des 2 composants
  tiers (DottedSurface + Stacking Cards). Verdict critique → alternatives
  proposées → user a choisi Hero=A, Services=2 → intégration.

## Session du 2026-04-14 (itération 1) — GlassCTA déployé

- **Composant `GlassCTA`** (`components/ui/glass-cta.tsx` + CSS `app/globals.css`) :
  polymorphique (Link si `href`, sinon button). 4 tons : `dark` (glass blanc /
  fond sombre), `light` (glass sombre / fond clair), `accent` (glass blanc /
  fond #FF5964) et `brand` (rouge dégradé + glint glass — visible sur tout fond
  morphant). 3 tailles : sm / default / lg. Structure : halo projeté + surface
  glint + contenu.

- **CTAs "Démarrer un projet" unifiés** (4 emplacements) :
  - Hero → `tone="dark"` sur #1B1F3B.
  - Navbar desktop → `tone="brand"` (effet magnétique conservé via wrapper motion.div).
  - Navbar mobile → `tone="brand"` `fullWidth`.
  - CTAFinal → `tone="accent"` sur #FF5964.

- **TypeScript check** : 0 erreur.

- **Réécriture navbar (pattern Header fourni)** : NON faite dans cette session,
  conformément à la memory `project_navbar_regression.md` — skills design
  (frontend-design, ui-ux-pro-max) + références (Studio Freight/Linear/Vercel)
  à invoquer AVANT tout code. À reprogrammer.

## Session du 2026-04-13 (itération 2)

- **Bug "éléments invisibles après navigation" — fix bulletproof** :
  `useInView` (1re tentative) ne suffisait pas non plus. Désormais on drop
  complètement l'observer. Les sections utilisent `initial={...}` +
  `animate={...}` direct qui rejoue à chaque mount. Garanti sans bug — plus
  aucune dépendance à IntersectionObserver pour l'entrée. Léger trade-off
  perçu : les sections below-fold animent "off-screen" mais sont visibles
  une fois scrollées. Stats.tsx, Processus.tsx, Services.tsx, ContactForm.tsx
  patchés.

- **Hero.tsx** :
  - Badge "Agence 360° · Nouveaux projets 2026" retiré.
  - Paddings top réduits (pt-20 sm:pt-24 lg:pt-28 vs 28/32/40).
  - Showcase plus compact : max-w-[820px] (vs 1080) + aspect-[21/9] (vs 16/10).
  - Intervalle de rotation des services passé à 2000ms (vs 3600ms).
  - Résultat : showcase visible above-the-fold sur desktop 1440p.

- **Services.tsx — refonte UX** :
  Suppression du carrousel scroll-snap horizontal (forçait un geste pour
  voir le reste → non user-friendly). Nouveau layout : **grille responsive
  1 / 2 / 3 colonnes** — TOUS les services visibles d'emblée sur desktop.
  Cards 340-360px, hover reveal de la summary via grid-template-rows (anim
  CSS pure), flèche pivotante en coin, voile dégradé lisibilité. Plus
  lisible, plus accessible, plus esthétique.

- **Temoignages.tsx** :
  Défilement automatique toutes les 3s. Pause automatique au hover et au
  focus clavier. Désactivé si `prefers-reduced-motion`.

- TypeScript check : 0 erreur.

## À TRAITER (demandes restantes cette session, non livrées)

1. **Navbar v3** : l'utilisateur a fourni un `<Header>` (sticky + pill au scroll
   + menu mobile fullscreen) à adapter. Memory `project_navbar_regression.md`
   demande d'invoquer skills design (frontend-design, ui-ux-pro-max) + Studio
   Freight/Linear/Vercel comme références AVANT tout code. Ambiguïté dans la
   demande : utilisateur a écrit "Pour le hero, il doit prendre la forme de ce
   composant" mais le code fourni est clairement un navbar/header (sticky top,
   Sign In / Get Started, menu mobile). Attendre confirmation : navbar ou hero ?

2. **GlassButton** : composant fourni à créer + intégrer sur "certains CTAs"
   non précisés. Demander quels boutons précisément (Hero CTA principal ?
   CTA final ? boutons du formulaire ?) avant intégration — éviter de
   déployer partout au hasard.

---

## ⚠️ POINTS EN ATTENTE CLIENT

1. **Transition navbar v3** : En attente de validation client + reprise avec skills design
   (frontend-design, ui-ux-pro-max). Voir memory `project_navbar_regression.md`.

2. **Données placeholder à confirmer avant mise en ligne** :
   - Section Stats : chiffres clés (projets, satisfaction, équipe) — marqués TODO_CLIENT
   - Section Témoignages : 3 vrais témoignages clients à fournir (nom, poste, entreprise, texte)
   - Section Portfolio : 3 projets réels avec images WebP (800x600px, < 200kb)
   - Footer : email, téléphone, adresse, liens réseaux sociaux réels

---

## État du projet

| Composant                        | Statut       | Notes                                        |
|----------------------------------|--------------|----------------------------------------------|
| Repo Next.js 16.2.2             | ✅ Fait       | React 19 + Tailwind v4                       |
| Infrastructure `.claude/`        | ✅ Fait       | context/, agents/, session/ complets         |
| CLAUDE.md v3.0                   | ✅ Fait       | Racine synchronisée                          |
| Tailwind v4 config               | ✅ Corrigé    | `@import "tailwindcss"` (v3 syntax supprimée)|
| Fonts (Syne + Inter)            | ✅ Fait       | next/font/google, self-hosted                |
| Layout global                    | ✅ Fait       | lang=fr, metadata SEO, skip-link a11y        |
| Security Headers                 | ✅ Fait       | OWASP headers dans next.config.ts            |
| Navbar pill-shaped               | ⚠️ À reprendre | v3 Framer Motion ratée — voir bloquant ci-dessus |
| Section 01 Hero                  | ✅ Fait       | Aurora mesh CSS animé (3 halos) + #1B1F3B   |
| Lenis smooth scroll              | ✅ Fait       | SmoothScroll provider dans layout.tsx        |
| Section 02 Stats                 | ✅ Fait       | CountUp IntersectionObserver, 4 métriques   |
| Section 03 Services              | ✅ Fait       | Stacking cards sticky 6×h-82vh, fond #0a0e1c |
| Section 04 Processus             | ✅ Fait       | 4 étapes timeline, desktop+mobile           |
| Section 05 Témoignages           | ✅ Fait       | Carousel Framer Motion, dark bg             |
| Section 06 Portfolio teaser      | ✅ Fait       | 3 cards placeholder, hover overlay          |
| Section 07 CTA final             | ✅ Fait       | Fond #FF5964, 2 CTAs, grain texture         |
| Section 08 Footer                | ✅ Fait       | Fond #10132A, 4 colonnes, réseaux sociaux   |
| TypeScript check                 | ✅ Clean      | `tsc --noEmit` : 0 erreur                   |

---

## Fichiers créés lors de cette session

- `components/sections/Stats.tsx` — Section 02 (CountUp animé, grille 4 cols)
- `components/sections/Services.tsx` — Section 03 (6 cards, highlight, hover)
- `components/sections/Processus.tsx` — Section 04 (timeline 4 étapes)
- `components/sections/Temoignages.tsx` — Section 05 (carousel Framer Motion)
- `components/sections/Portfolio.tsx` — Section 06 (3 cards placeholder)
- `components/sections/CTAFinal.tsx` — Section 07 (CTA rouge, grain, réassurance)
- `components/layout/Footer.tsx` — Section 08 (4 colonnes, liens légaux)
- `app/page.tsx` — Mis à jour : toutes les sections intégrées
- `app/layout.tsx` — Mis à jour : skip-link accessibilité ajouté

---

## Prochaine action immédiate

1. **Client** : valider les sections de la homepage visuellement (`npm run dev`)
2. **Client** : fournir les données placeholder (chiffres stats, témoignages, projets portfolio)
3. **Dev** : reprendre transition navbar v3 avec skills design (frontend-design, ui-ux-pro-max)
4. **Sprint 2 restant** : metadata SEO page d'accueil + Schema.org JSON-LD + OG image

---

[DEV] STATUS: Sprint 2 homepage sections 02-08 livrées, TypeScript clean | NEXT: Validation client + données placeholder + reprise navbar v3
