# CLAUDE.md — Mossine Digital
# Version 3.0 — Mise à jour complète
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
| Primary    | #00361A  | Sections sombres UNIQUEMENT (Hero, Témoignages, Footer). Maximum 2-3 sections. JAMAIS fond dominant.                                    |
| Secondary  | #35A7FF  | Accent interactif principal — liens, CTA secondaires, highlights, focus ring, icônes actives, sections alternées (#F0F7FF dérivé).        |
| Accent     | #FF5964  | CTA PRINCIPAL uniquement + section CTA final. Jamais comme fond de section sauf CTA.                                                     |

### Couleurs dérivées autorisées
- #F0F7FF — fond sections alternées "bleu très clair" (dérivé de #35A7FF)
- #001A0D — footer uniquement (version plus sombre de #00361A)
- #E8424D — hover de #FF5964 uniquement
- #1A97F5 — hover de #35A7FF uniquement
- #FFE8E9 — fond léger accent (badges, tags sur fond clair)
- #E8F5ED — fond léger primary (badges, tags sur fond clair)

### Rythme des sections — PAGE D'ACCUEIL
```
01 Hero          → fond #00361A (sombre)
02 Stats         → fond #FFFFFF (clair)
03 Services      → fond #F0F7FF (bleu clair)
04 Processus     → fond #FFFFFF (clair)
05 Témoignages   → fond #00361A (sombre)
06 Portfolio     → fond #F0F7FF (bleu clair)
07 CTA final     → fond #FF5964 (accent — unique)
08 Footer        → fond #001A0D (très sombre)
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

---

## LOGOS ET ASSETS — PROTOCOLE CLIENT

RÈGLE ABSOLUE : Ne jamais créer de logo, image ou illustration de son propre chef.
Toujours utiliser un placeholder texte et demander au client.

---

## RÈGLES DE TRAVAIL — DISCIPLINE DE DÉVELOPPEMENT

1. Un composant à la fois. Jamais toute une page d'un coup.
2. Tester avant de passer au suivant. npm run dev après chaque composant.
3. Aucun logo ni image inventé — placeholder texte uniquement.
4. La palette est figée — aucune couleur hors palette sauf les dérivées listées.
5. Phosphor Icons uniquement — aucune autre librairie d'icônes.
6. Mobile-first absolu — commencer à 320px, enrichir vers le haut.
7. TypeScript strict — zéro compromis.
8. Mettre à jour .claude/session/STATUS.md à chaque fin de session.
9. Demander au lieu d'inventer — si un besoin n'est pas clair, poser la question.
10. La qualité prime toujours sur la vitesse.
