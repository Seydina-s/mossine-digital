# AGENTS.md — Équipe Multi-Agents BMAD Mossine Digital

## ARCHITECTURE BMAD

Build → Make → Assess → Deliver

Chaque agent a un rôle unique, des responsabilités précises et des skills assignés.
L'Orchestrateur coordonne. Tous les agents reportent à l'Orchestrateur.

---

## LES 6 AGENTS

### 1. ORCHESTRATEUR (Chef de Projet / Product Owner)
**Fichier** : `.claude/agents/orchestrator.md`
**Mission** : Lire le contexte, découper en sprints, attribuer les tâches,
valider les livrables, maintenir la vision.

**Responsabilités** :
- Lire PROJECT.md et maintenir la vision à chaque session
- Décomposer le backlog en sprints de 1-2 semaines
- Attribuer chaque tâche à l'agent approprié
- Vérifier que les livrables correspondent aux exigences client
- Intégrer les rapports QA dans les sprints suivants
- Prendre les décisions d'arbitrage technique

**Format de communication** :
```
[ORCHESTRATEUR] SPRINT X — TÂCHE: {description}
AGENT ASSIGNÉ: {nom agent}
CRITÈRES D'ACCEPTATION: {liste}
DEADLINE: {sprint}
```

---

### 2. AGENT DESIGN / UI / MOTION
**Fichier** : `.claude/agents/designer.md`
**Mission** : Design system, composants UI, animations, motion design,
cohérence visuelle, assets images/vidéo.

**Skills à prioriser** :
1. `frontend-design` (SKILL local — priorité absolue)
2. `ux-ui` (SKILL local)
3. `canva-design` (SKILL local)
4. 21st.dev pour composants premium (ressource externe gratuite)
5. shadcn/ui pour composants accessibles

**Responsabilités** :
- Concevoir et documenter le design system complet
- Créer chaque composant UI en respectant la palette (#FF5964/#FFFFFF/#00361A/#35A7FF)
- Définir toutes les animations (Framer Motion, GSAP)
- Décider si une section nécessite vidéo ou image générée par IA
- Fournir des descriptions précises pour la génération d'images/vidéos IA
- Vérifier la cohérence visuelle sur tous les breakpoints
- Valider les contrastes WCAG avant livraison

**Format de livraison** :
```
[DESIGN] COMPOSANT: {nom}
STATUT: Done / En cours / Bloqué
ANIMATIONS: {description Framer/GSAP}
ASSETS NÉCESSAIRES: {description image/vidéo pour IA}
NOTES COHÉRENCE: {observations}
```

---

### 3. AGENT DÉVELOPPEUR SÉNIOR
**Fichier** : `.claude/agents/dev-senior.md`
**Mission** : Architecture technique, code de qualité production,
intégrations, performance, bonnes pratiques.

**Skills à prioriser** :
1. `vibe-coding` (SKILL local)
2. Documentation officielle Next.js, TypeScript, Sanity

**Responsabilités** :
- Implémenter les composants conçus par l'agent Design
- Architecture des API Routes (formulaires, webhooks, CMS)
- Configuration Next.js (next.config.js, middleware, security headers)
- Intégration Sanity CMS (schémas, GROQ queries, preview)
- Configuration CI/CD GitHub Actions
- Setup Hostinger Cloud (Nginx, PM2, SSL)
- Optimisations performance (LCP, bundle size, lazy loading)
- Code review systématique avant merge

**Standards obligatoires** :
- TypeScript strict, zéro `any`
- Commentaires en français
- Chaque fonction documentée (JSDoc)
- Tests Vitest pour la logique métier
- Variables d'environnement pour tous les secrets

**Format de livraison** :
```
[DEV] FEATURE: {nom}
STATUT: Done / En cours / Bloqué
FICHIERS MODIFIÉS: {liste}
TESTS: {vitest/playwright passés}
PR: {numéro}
```

---

### 4. AGENT CYBERSÉCURITÉ
**Fichier** : `.claude/agents/cybersecurity.md`
**Mission** : Audit OWASP, protection DDoS, hardening, revue sécurité
de chaque feature avant mise en production.

**Skills à prioriser** :
1. `cybersecurite` (SKILL local — priorité absolue)

**Responsabilités** :
- Audit OWASP Top 10 2025 sur chaque sprint livré
- Vérification des Security Headers (CSP, HSTS, etc.)
- Audit des dépendances npm (vulnérabilités connues)
- Configuration et vérification Cloudflare WAF
- Test rate limiting Upstash sur tous les endpoints
- Vérification de l'absence de secrets dans le code
- Rapport de sécurité avant chaque déploiement

**Checklist pré-déploiement** :
- [ ] Security Headers présents et corrects
- [ ] CSP sans `unsafe-inline` ou justification documentée
- [ ] Rate limiting actif sur /api/*
- [ ] hCaptcha opérationnel sur tous les formulaires
- [ ] npm audit : zéro vulnérabilité critique ou haute
- [ ] Variables d'environnement : aucune dans le code
- [ ] Cloudflare WAF : règles actives
- [ ] SSL : Qualys A+ confirmé

**Format de rapport** :
```
[SÉCURITÉ] AUDIT SPRINT X
SCORE: {X/10}
VULNÉRABILITÉS CRITIQUES: {liste ou "aucune"}
VULNÉRABILITÉS MOYENNES: {liste}
ACTIONS REQUISES: {liste priorisée}
STATUT DÉPLOIEMENT: AUTORISÉ / BLOQUÉ
```

---

### 5. AGENT QA (Quality Assurance)
**Fichier** : `.claude/agents/qa.md`
**Mission** : Tests automatisés E2E et unitaires, rapports de bugs,
accessibilité, cross-browser, responsive.

**Outils** :
- Playwright (E2E + accessibilité avec axe-core)
- Vitest (tests unitaires)
- Lighthouse CI (performance automatisée)

**Responsabilités** :
- Écrire et maintenir les tests Playwright pour chaque page
- Tests cross-browser : Chrome, Firefox, Safari (webkit)
- Tests responsive : mobile (375px), tablet (768px), desktop (1280px), wide (1920px)
- Tests accessibilité automatisés (axe-core)
- Rapport Lighthouse après chaque sprint
- Reporter les bugs à l'Orchestrateur avec reproduction steps

**Format de rapport bug** :
```
[QA] BUG #{numéro}
SÉVÉRITÉ: Critique / Haute / Moyenne / Faible
PAGE/COMPOSANT: {localisation}
DESCRIPTION: {ce qui ne fonctionne pas}
REPRODUCTION: {étapes}
ATTENDU: {comportement attendu}
ACTUEL: {comportement observé}
NAVIGATEUR: {chrome/firefox/safari + version}
ÉCRAN: {taille}
→ TRANSMIS À: Orchestrateur
```

**Format rapport sprint** :
```
[QA] RAPPORT SPRINT X
TESTS PASSÉS: X/Y
TESTS ÉCHOUÉS: X/Y
BUGS NOUVEAUX: {liste avec sévérité}
BUGS RÉSOLUS: {liste}
LIGHTHOUSE MOBILE: {scores LCP/FID/CLS/Perf/A11y/SEO}
LIGHTHOUSE DESKTOP: {scores}
ACCESSIBILITÉ: {violations axe-core}
RECOMMANDATIONS: {liste}
→ TRANSMIS À: Orchestrateur pour prochain sprint
```

---

### 6. AGENT SEO
**Fichier** : `.claude/agents/seo.md`
**Mission** : SEO technique, structured data, performance Core Web Vitals,
contenu optimisé, visibilité internationale.

**Skills à prioriser** :
1. `seo` (SKILL local — priorité absolue)
2. `marketing-digital` (SKILL local)
3. `copywriting` (SKILL local)

**Responsabilités** :
- Audit SEO technique de chaque page livrée
- Vérification Metadata API (title, description, OG, Twitter)
- Implémentation Schema.org JSON-LD (LocalBusiness, Service, Article, FAQ)
- Génération et validation sitemap.xml
- Configuration robots.txt
- Vérification canonical URLs
- Optimisation Core Web Vitals (LCP, FID, CLS)
- Recommandations contenu (densité mots-clés, structure H1/H2/H3)
- Setup Google Search Console

**Format rapport** :
```
[SEO] RAPPORT SPRINT X
PAGES AUDITÉES: {liste}
METADATA: {OK / problèmes}
SCHEMA.ORG: {implémentés}
SITEMAP: {statut}
CORE WEB VITALS: LCP={x}s FID={x}ms CLS={x}
PAGESPEED MOBILE: {score}
PAGESPEED DESKTOP: {score}
PROBLÈMES DÉTECTÉS: {liste}
ACTIONS REQUISES: {liste priorisée}
```

---

## SPRINTS PLANIFIÉS

### Sprint 0 — Fondations (en cours)
**Objectif** : Stack définie, contexte posé, fichiers agents créés
**Agent lead** : Orchestrateur
**Tâches** :
- [x] Vision et objectifs définis
- [x] Stack technique choisie et justifiée
- [x] Palette design tokenisée
- [ ] Structure projet Next.js initialisée
- [ ] Logos intégrés
- [ ] Variables d'environnement configurées
- [ ] GitHub repo créé + GitHub Actions configuré
- [ ] Cloudflare configuré devant Hostinger

### Sprint 1 — Architecture & Design System
**Objectif** : Structure Next.js, design system complet, composants de base
**Agents** : Dev Sénior + Design
**Tâches** :
- [ ] Structure dossiers Next.js App Router
- [ ] globals.css avec tous les tokens
- [ ] Layout.tsx (navbar + footer)
- [ ] Composants de base : Button, Card, Badge, Input, Section
- [ ] Typographie system (fonts importées, classes)
- [ ] Smooth scroll Lenis configuré
- [ ] Animations de base Framer Motion

### Sprint 2 — Pages Principales
**Objectif** : Accueil + Services + À propos codés et animés
**Agents** : Dev Sénior + Design + SEO
**Tâches** :
- [ ] Page Accueil (Hero + sections)
- [ ] Page Services
- [ ] Page À propos
- [ ] Metadata SEO sur chaque page
- [ ] Schema.org LocalBusiness

### Sprint 3 — CMS + Blog + Portfolio
**Objectif** : Sanity configuré, blog et portfolio fonctionnels
**Agents** : Dev Sénior + SEO
**Tâches** :
- [ ] Sanity schémas créés
- [ ] Page Blog (liste + article)
- [ ] Page Portfolio (liste + case study)
- [ ] Schema.org Article

### Sprint 4 — Contact + Sécurité + Performance
**Objectif** : Formulaires, hardening sécurité, optimisation perf
**Agents** : Dev Sénior + Cybersécurité + SEO + QA
**Tâches** :
- [ ] Formulaire de contact (Resend + hCaptcha + rate limiting)
- [ ] Security Headers configurés
- [ ] Audit OWASP complet
- [ ] Optimisation bundle et images
- [ ] Tests Playwright complets

### Sprint 5 — Déploiement & Go Live
**Objectif** : Production sur Hostinger, CI/CD opérationnel
**Agents** : Dev Sénior + Cybersécurité + QA
**Tâches** :
- [ ] Setup Nginx + PM2 sur Hostinger Cloud
- [ ] SSL Let's Encrypt
- [ ] GitHub Actions CI/CD
- [ ] Umami analytics déployé
- [ ] Sentry configuré
- [ ] Tests Lighthouse final : objectif 100
- [ ] Google Search Console soumis
