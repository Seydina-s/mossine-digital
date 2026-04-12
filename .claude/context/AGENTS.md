# AGENTS.md — Rôles, Responsabilités & Sprint en cours

## Sprint en cours : Sprint 1 — Navbar + Homepage sections

**Objectif** : Navbar fonctionnelle + construire les 8 sections de la homepage
**Deadline** : 2026-04-15

---

## Agents actifs

### Orchestrateur
- Fichier : `.claude/agents/orchestrator.md`
- Rôle : Priorise les tâches, valide les livrables, coordonne
- Statut : **ACTIF**

### Designer
- Fichier : `.claude/agents/designer.md`
- Rôle : UI/UX, tokens design, composants visuels, motion design
- Statut : En attente — sections homepage à designer

### Dev Sénior
- Fichier : `.claude/agents/dev-senior.md`
- Rôle : Architecture, composants, performance, accessibilité
- Statut : **ACTIF** — Navbar livrée, sections homepage à construire

### Cybersécurité
- Fichier : `.claude/agents/cybersecurity.md`
- Rôle : Security headers, CSP, audit OWASP, rate limiting
- Statut : En attente — à activer avant premier déploiement

### QA
- Fichier : `.claude/agents/qa.md`
- Rôle : Tests E2E Playwright, tests unitaires Vitest
- Statut : En attente — à activer après homepage complète

### SEO
- Fichier : `.claude/agents/seo.md`
- Rôle : Metadata, structured data, sitemap, Core Web Vitals
- Statut : En attente — à activer sur chaque page

---

## Backlog Sprint 1

- [x] Initialiser le repo Next.js 16 + React 19 + Tailwind v4
- [x] Créer l'infrastructure `.claude/`
- [x] Configurer Tailwind v4 (globals.css avec @import "tailwindcss")
- [x] Configurer les fonts (Syne + Inter via next/font/google)
- [x] Configurer le layout global (layout.tsx)
- [x] Security Headers dans next.config.ts
- [x] Navbar pill-shaped (desktop + mobile, scroll-aware)
- [ ] Section 01 Hero (fond #00361A)
- [ ] Section 02 Stats (fond #FFFFFF)
- [ ] Section 03 Services (fond #F0F7FF)
- [ ] Section 04 Processus (fond #FFFFFF)
- [ ] Section 05 Témoignages (fond #00361A)
- [ ] Section 06 Portfolio teaser (fond #F0F7FF)
- [ ] Section 07 CTA final (fond #FF5964)
- [ ] Section 08 Footer (fond #001A0D)

## Backlog Sprint 2

- [ ] Page /services détaillée
- [ ] Page /portfolio avec filtres
- [ ] Page /contact formulaire sécurisé (Zod + rate limiting)
- [ ] Page /blog + articles
- [ ] Intégration Sanity v3 CMS + GROQ
- [ ] Lenis smooth scroll global
- [ ] Framer Motion animations scroll-driven
- [ ] CI/CD GitHub Actions → Hostinger

---

## Règle de travail inter-agents

```
[ORCHESTRATEUR] STATUS: ... | NEXT: ...
[DESIGNER]      STATUS: ... | NEXT: ...
[DEV]           STATUS: ... | NEXT: ...
[CYBER]         STATUS: ... | NEXT: ...
[QA]            STATUS: ... | NEXT: ...
[SEO]           STATUS: ... | NEXT: ...
```

Un seul composant / une seule section à la fois.
Jamais tout coder d'un coup.
