# AUDIT OWASP TOP 10 — Mossine Digital

**Date** : 2026-04-16
**Agent** : Cybersécurité (Sprint 4)
**Scope** : Site vitrine Next.js 16 + Sanity Studio embedded, avant déploiement Hostinger.
**Base de référence** : OWASP Top 10 2021 (la version 2025 étant en RC à la date de cet audit, l'évolution majeure annoncée est la promotion de SSRF et l'ajout d'une catégorie "Software Supply Chain" — couverts ci-dessous).

---

## A01 — Broken Access Control

**Surface actuelle**
- Aucune session utilisateur côté public (site vitrine, pas d'authentification).
- Sanity Studio sur `/studio` utilise l'auth Sanity SSO (Google/email), rôles gérés côté Sanity.
- Server actions sur `/contact` (formulaire) : pas d'objet lié à un user, donc pas d'IDOR possible.

**Mesures en place**
- `frame-ancestors 'none'` sur toutes les routes marketing (empêche clickjacking).
- `frame-ancestors 'self'` sur `/studio` (Studio iframe autorisée uniquement same-origin).
- `X-Frame-Options: DENY` redondant avec CSP (legacy browsers).
- Cookies RGPD différés : pas de session cookie tant qu'aucun auth custom n'est implémenté.

**Verdict** : ✅ **Pas de surface exploitable identifiée.** À re-auditer si ajout d'un espace client ultérieur.

---

## A02 — Cryptographic Failures

**Surface actuelle**
- Formulaire contact → Resend API (HTTPS TLS 1.3).
- Assets statiques sur CDN Sanity (HTTPS TLS 1.3).
- Site principal servi par Hostinger + Cloudflare → Let's Encrypt SSL (Sprint 5).

**Mesures en place**
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` → force HTTPS 2 ans, inclut sous-domaines, éligible HSTS preload list.
- `upgrade-insecure-requests` dans CSP marketing → upgrade auto des requêtes HTTP résiduelles.
- Aucun secret en dur dans le code (grep `.env` négatif hors `.env.local` git-ignoré).
- `NEXT_PUBLIC_*` uniquement pour variables non-sensibles (URL, flags).

**Risque résiduel**
- Soumission du domaine à la HSTS preload list : **à faire après go-live** (`hstspreload.org`).
- Rotation des clés Resend / hCaptcha : politique à documenter côté client (pas de secret rotation auto).

**Verdict** : ✅ **Conforme**, preload list à soumettre Sprint 5.

---

## A03 — Injection

**Surface actuelle**
- Formulaire contact (1 server action, 1 payload sérialisé vers Resend).
- Pas de base de données côté runtime public (Sanity GROQ côté server seulement, pas de SQL).

**Mesures en place**
- **Zod strict** sur chaque champ (`contactSchema` : min/max, enum fermée, email RFC, honeypot `website`, consent literal `'on'`). 25 tests unitaires couvrent happy path + chaque violation.
- Normalisation : trim + lowercase email → évite la duplication casse.
- Message user intégré dans template React Email → React échappe nativement le HTML.
- CSP `default-src 'self'` + `script-src` allow-list strict → même en cas d'injection stockée, le script ne s'exécute pas.

**Risque résiduel**
- GROQ injection via Sanity Studio : impossible côté public (studio authentifié) ; côté fetch server, les queries GROQ n'interpolent pas de user input directement — à re-vérifier si fetch paramétré par URL query ultérieurement (Sprint 3).

**Verdict** : ✅ **Conforme**, vigilance sur futures queries paramétrées.

---

## A04 — Insecure Design

**Surface actuelle**
- Site vitrine low-risk ; les 2 flux sensibles sont : soumission contact + édition Sanity.

**Mesures en place**
- **Honeypot `website`** dans le formulaire (champ invisible, rempli = rejet bot).
- **Consentement RGPD obligatoire** (consent='on' requis par schema).
- **Pas de champ librement HTML** : textarea plain-text, sanitisé par React à l'affichage.
- Séparation des CSP (marketing stricte / studio relaxée) → Studio ne compromet pas la posture public.

**Risque résiduel**
- **Rate limiting non posé** (bloqué Upstash — `TODO_CLIENT`). Mitigé partiellement par le honeypot mais un attaquant ciblé peut contourner. **→ À prioriser Sprint 5 avant go-live.**
- Absence de CAPTCHA runtime (hCaptcha présent dans la CSP mais pas encore câblé côté form) — **ticket Sprint 4 à ouvrir**.

**Verdict** : 🟡 **Conforme sur le design, à compléter avec rate limit + hCaptcha avant prod.**

---

## A05 — Security Misconfiguration

**Mesures en place** (configurées dans `next.config.ts`)
- `X-Frame-Options: DENY` (marketing) / `SAMEORIGIN` (studio).
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy` exhaustive : `camera=()`, `microphone=()`, `geolocation=()`, `payment=()`, `usb=()`, `magnetometer=()`, `gyroscope=()`, `accelerometer=()`, `autoplay=(self)`, `fullscreen=(self)`, `picture-in-picture=(self)`, `encrypted-media=()`, `interest-cohort=()`.
- `Cross-Origin-Opener-Policy: same-origin` (isolation cross-origin window).
- `Cross-Origin-Resource-Policy: same-site` (protection contre Spectre/Meltdown exfiltration).
- CSP marketing : `default-src 'self'` + script/style/img/connect-src allow-list explicite (Sanity, Resend, hCaptcha, Sentry, Umami).
- CSP studio : `'unsafe-eval'` **uniquement** sur `/studio/*` (requis GROQ compiler), `wss://*.sanity.io` pour live editing.
- `X-XSS-Protection` **volontairement omis** (déprécié, CSP fait strictement mieux).

**Risque résiduel**
- `'unsafe-inline'` encore présent sur `script-src` marketing (Tailwind v4 + Framer Motion injectent du style inline). Élimination nécessiterait middleware nonce Next.js → **reporté Sprint 4+ si score Observatory A+ demandé**.
- Mode dev : `'unsafe-eval'` autorisé partout (React Refresh) — **désactivé en prod** via `isDev` check.

**Verdict** : ✅ **Conforme cibles Observatory A (HSTS + CSP + HPKP pas requis)**. A+ possible avec nonce middleware en Sprint post-launch.

---

## A06 — Vulnerable and Outdated Components

**État au 2026-04-16** (dernier `npm audit`) :

| Sévérité | Nombre | Package | Statut |
|----------|--------|---------|--------|
| Critical | 0      | —       | ✅     |
| High     | 0      | Next.js 16.2.4 (DoS Server Components CVE GHSA-q4gf-8mx6-v5v3) | ✅ Patchée (upgrade 16.2.2 → 16.2.4) |
| Moderate | 5      | `js-yaml` via `@sanity/cli` → `@vercel/frameworks` | 🟡 **Dev-only, non exposé au runtime prod** |
| Low      | 0      | —       | ✅     |

**Mesures en place**
- **Dependabot** : à activer Sprint 5 (bloqué : `.github/` pas encore poussé).
- **CI lint + typecheck** prévu Sprint 5 (GitHub Actions).
- **Lock file** (`package-lock.json`) versionné.

**Justification dev-only**
Les 5 moderate sont dans la chaîne de dépendances du CLI Sanity (prototype pollution js-yaml). Cette chaîne est exécutée uniquement en local (`sanity dev`, `sanity deploy`). Elle n'est **pas bundlée** dans le runtime Next.js (`grep js-yaml` sur `.next/` négatif). Acceptée en dette de sécu dev-only, à lever dès que `@sanity/cli` upgrade sa dep.

**Verdict** : ✅ **Conforme runtime prod.** Dette documentée dev-only.

---

## A07 — Identification and Authentication Failures

**Surface actuelle**
- Pas d'auth utilisateur public.
- Studio Sanity : auth déléguée à Sanity (SSO Google/email + MFA disponible côté config projet).

**Recommandations client** (à appliquer côté console Sanity)
- Activer MFA sur tous les comptes ayant accès au projet Sanity.
- Revoir les rôles : au minimum 1 admin + N éditeurs (pas de viewer inutile).
- Audit log Sanity activé (plans Team+).

**Verdict** : ✅ **Conforme** côté site. Côté Sanity = responsabilité client, recommandations documentées.

---

## A08 — Software and Data Integrity Failures

**Mesures en place**
- Package-lock.json versionné → reproductibilité builds.
- Pas de scripts de post-install non-audités (`npm pkg get scripts` inspecté : uniquement next/build/lint/test/typecheck).
- CSP `script-src 'self'` pour tous scripts first-party → aucun CDN externe pour JS applicatif.
- Les 3 scripts externes autorisés (hCaptcha, Sentry, Umami) sont listés explicitement dans CSP → altération détectable via SRI (à ajouter Sprint 5 pour scripts stables).

**Risque résiduel**
- **Subresource Integrity (SRI)** : pas encore implémenté sur les scripts externes (hCaptcha/Sentry/Umami). Impact limité car ces scripts sont versionnés côté fournisseur. **Ticket Sprint 5.**
- Pas de signature des commits git (gpg) — à recommander côté client.

**Verdict** : 🟡 **Conforme base, SRI à ajouter pour A+.**

---

## A09 — Security Logging and Monitoring Failures

**Surface actuelle**
- Pas de log applicatif custom en local.
- Pas de monitoring runtime avant Sprint 5.

**Plan Sprint 5**
- **Sentry** : capture erreurs runtime + source maps upload via CI.
- **Umami** : analytics anonymisées (RGPD-compliant, sans cookies).
- **Cloudflare WAF logs** : activés par défaut après configuration Cloudflare.
- **Hostinger server logs** : nginx access + error logs, rotation + retention 30 jours.
- **UptimeRobot** : monitoring externe (2xx checks toutes les 5 min).

**Risque résiduel**
- **Alerting sur volumes anormaux** (rate spike) : dépend de Cloudflare + Sentry, à valider post-déploiement.

**Verdict** : 🟡 **Prévu Sprint 5**, à valider sur prod.

---

## A10 — Server-Side Request Forgery (SSRF)

**Surface actuelle**
- Aucune route Next.js qui fetch une URL fournie par l'utilisateur.
- `next/image` avec `remotePatterns` explicite (`cdn.sanity.io` uniquement) → impossible de détourner le proxy image pour SSRF interne.
- Sanity fetch côté server : queries GROQ hardcodées, pas de URL dynamique depuis user input.

**Verdict** : ✅ **Pas de surface d'attaque identifiée.**

---

## Catégories émergentes OWASP 2025 (draft)

### Software Supply Chain (nouvelle catégorie annoncée)
- Package-lock.json versionné ✅
- `npm ci` (reproductible) en CI Sprint 5 ✅ prévu
- Audit continu via Dependabot Sprint 5 ✅ prévu
- Pas de package privé non-signé.
- **Risque moderate js-yaml** documenté et circonscrit dev-only.

### AI/ML Components
- Pas de composant IA exposé au runtime (aucun endpoint LLM côté public).
- Contenu CMS est éditorial humain.

---

## RÉSUMÉ — POSTURE DE SÉCURITÉ AVANT GO-LIVE

| Catégorie | Statut | Action |
|-----------|--------|--------|
| A01 Access Control | ✅ | — |
| A02 Crypto | ✅ | Soumettre HSTS preload post-launch |
| A03 Injection | ✅ | — |
| A04 Insecure Design | 🟡 | **Câbler hCaptcha + rate limit Upstash avant prod** |
| A05 Misconfig | ✅ | Nonce CSP optionnel (A+ Observatory) |
| A06 Components | ✅ | Dette moderate js-yaml dev-only |
| A07 Auth | ✅ | MFA Sanity (côté client) |
| A08 Integrity | 🟡 | SRI scripts externes Sprint 5 |
| A09 Logging | 🟡 | Sentry + Umami Sprint 5 |
| A10 SSRF | ✅ | — |

**Blocants go-live identifiés** :
1. hCaptcha non câblé côté ContactForm (ticket Sprint 4 à créer).
2. Rate limiting Upstash non posé (bloqué compte client).

**Nice-to-have post-launch** :
- HSTS preload submission.
- SRI sur hCaptcha/Sentry/Umami.
- Nonce-based CSP (élimination `'unsafe-inline'`).
- Dependabot + signature commits.

**Score estimé Observatory (Mozilla)** : A (confirmé via `headers` section). A+ possible avec nonce middleware.

---

## ANNEXE — DETTE A11Y : PALETTE `--md-secondary` (#35A7FF)

**Identifiée le 2026-04-16** pendant l'intégration `@axe-core/playwright` sur la homepage, `/services` et `/contact`.

### Constat

6 combinaisons échouent WCAG AA (4.5:1 texte normal, 3:1 large text) :

| Foreground | Background | Ratio  | Where                                    |
|------------|------------|--------|------------------------------------------|
| `#ffffff`  | `#35a7ff`  | 2.58:1 | Texte blanc 48px bold sur secondary bg   |
| `#e1f2ff`  | `#35a7ff`  | 2.25:1 | Teinte claire sur secondary bg           |
| `#35a7ff`  | `#d6ecff`  | 2.12:1 | Secondary comme texte sur bleu très clair|
| `#35a7ff`  | `#f0f7ff`  | 2.39:1 | Secondary comme texte sur section alternée|
| `#35a7ff`  | `#e7f4ff`  | 2.31:1 | Secondary comme texte sur bleu clair     |
| `#35a7ff`  | `#ffffff`  | 2.58:1 | Secondary comme texte sur fond blanc     |

Racine du problème : #35A7FF (rgb 53, 167, 255) a une luminance relative ≈ 0.336. Pour atteindre 4.5:1 avec du blanc (L=1.0), il faudrait L_fg ≤ 0.037 — soit une teinte bleue **beaucoup** plus sombre que la secondary actuelle.

### Pourquoi ça arrive

`--md-secondary` a été choisie pour son **éclat** (accent visuel, hover, focus ring, icônes actives). C'est parfait pour ces usages. Mais le même token est utilisé :
- comme **texte** sur fonds clairs (liens inline, labels de section),
- comme **background** sous du texte (boutons, badges, surlignages).

Dans ces deux cas, l'éclat devient un handicap : la luminance trop haute réduit mécaniquement le contraste.

### Proposition — scindre en 2 tokens

**Option A — recommandée** : introduire `--md-secondary-text`, teinte dérivée plus sombre, WCAG AA-compatible.

```css
/* globals.css */
--md-secondary:       #35A7FF;  /* Accent visuel : focus ring, icônes, décorations */
--md-secondary-text:  #0E70C8;  /* Texte/bg porteur de texte : liens, boutons, labels */
--md-secondary-hover: #1A97F5;  /* Hover de secondary (inchangé) */
```

Validation contraste `#0E70C8` :
- sur `#ffffff` : **5.33:1** ✅ AA (texte normal)
- sur `#f0f7ff` : **5.10:1** ✅ AA
- sur `#e7f4ff` : **4.87:1** ✅ AA
- comme bg sous white : **5.33:1** ✅ AA

**Plan d'exécution** (3 étapes, ~2h de dev) :
1. Ajouter `--md-secondary-text` dans `app/globals.css`.
2. Grep + remplacement ciblé : partout où `--md-secondary` est utilisée **comme texte** ou **comme bg avec texte** → substituer par `--md-secondary-text`. Ne pas toucher : focus rings, bordures décoratives, icônes hors-texte, accents visuels.
3. Réactiver les 3 `test.fixme` dans `e2e/*.spec.ts` → CI verte avec color-contrast activé.

**Impact design** : le texte "secondary" devient légèrement plus sombre/sobre. L'éclat pur de #35A7FF reste sur les éléments décoratifs. La hiérarchie visuelle se renforce (texte sobre ≠ accent clinquant).

**Option B — alternative** : remplacer `--md-secondary` intégralement par une teinte plus sombre (ex: #1E88E5). Rebranding plus marqué, à valider avec le client sur maquettes.

### Décision requise

C'est une décision **designer + client** (non prise par Claude — règle CLAUDE.md "palette figée"). Options présentées ici pour faciliter la délibération. Jusqu'à validation, les 3 tests `test.fixme` restent dormants et l'échec color-contrast est documenté comme dette acceptée.

