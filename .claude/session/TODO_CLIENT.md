# TODO_CLIENT — Mossine Digital
# Récap exhaustif des actions attendues du client avant mise en ligne.
# Version 1 · 2026-04-16 · à tenir à jour à chaque livraison

Ce document liste **tout ce qui bloque ou enrichit la mise en ligne** et
qui dépend d'informations, d'assets ou de comptes que seul le client peut
fournir. Chaque tâche est indépendante — tu peux les traiter dans l'ordre
qui t'arrange.

Légende :
- 🔴 **Bloquant go-live** — sans ça, le site ne peut pas être publié proprement
- 🟠 **Important** — le site peut vivre sans, mais la qualité perçue en pâtit
- 🟢 **Enrichissement** — nice-to-have, peut attendre un Sprint 6 post-launch

---

## 1 · Identité & informations légales 🔴

Ces informations apparaissent dans le footer, les mentions légales et la
politique de confidentialité. Elles sont légalement obligatoires.

- [ ] **Dénomination sociale complète** (ex. "Mossine Digital SARL")
- [ ] **Adresse du siège social** (rue, quartier, ville — Dakar présumé)
- [ ] **NINEA** (Numéro d'Identification National des Entreprises et Associations)
- [ ] **RCCM** (Registre du Commerce et du Crédit Mobilier) — numéro
- [ ] **Nom du représentant légal** (directeur de publication)
- [ ] **Email du DPO** (Délégué à la Protection des Données)
      → utilisé sur la page politique-confidentialite
- [ ] **Téléphone professionnel** (format +221 XX XXX XX XX)
      → footer + JSON-LD LocalBusiness
- [ ] **Horaires d'ouverture** (jours + heures)
      → footer + JSON-LD LocalBusiness

**Fichiers impactés** : `app/politique-confidentialite/page.tsx`,
`components/layout/Footer.tsx`, `app/layout.tsx` (JSON-LD LocalBusiness
à ajouter).

---

## 2 · Logos & favicon 🔴

- [ ] **Logo principal SVG — version sombre (sur fond clair)**
      → déjà fourni : `public/images/logo/logo-vert.svg` — à remplacer par
      la version bleue définitive si différent
- [ ] **Logo principal SVG — version claire (sur fond sombre)**
      → déjà fourni : `public/images/logo/logo-blanc.svg` — idem
- [ ] **Favicon définitif** 32×32 et 16×16 PNG
      → remplacer `app/favicon.ico`
- [ ] **Apple touch icon** 180×180 PNG
      → créer `public/apple-touch-icon.png`
- [ ] **Icône manifest** 192×192 et 512×512 PNG (PWA)
      → créer `public/icon-192.png` et `public/icon-512.png`

**Format** : SVG vectoriel préféré pour les logos, fond transparent.
Compression PNG via squoosh.app avant livraison.

---

## 3 · Image Open Graph 🟠

- [ ] **OG image 1200×630 PNG/WebP**
      → créer `public/og-image.png` (référencée dans `app/layout.tsx`)
      → doit contenir : logo + tagline + palette Mossine
      → inspiration : design minimal, contraste fort, lisible en
      miniature (Slack, WhatsApp, Twitter preview)

**Alternative** : générer dynamiquement par page via `opengraph-image.tsx`
si budget serré — à décider Sprint 4.

---

## 4 · Statistiques homepage (Section Stats) 🟠

La section Stats affiche 4 chiffres clés (projets livrés, clients
satisfaits, etc.). Actuellement placeholders.

- [ ] **Nombre de projets livrés** (ou "années d'expérience cumulée")
- [ ] **Nombre de clients accompagnés**
- [ ] **Taux de satisfaction client** (NPS, %, ou équivalent)
- [ ] **4e chiffre à définir** (leads générés, heures facturées,
      campagnes publiées, etc.)

**Fichier** : `components/sections/Stats.tsx`

---

## 5 · Témoignages clients 🟠

Les témoignages actuels sont **placeholders**. Impact crédibilité fort.

Pour chaque témoignage (idéal : 3 à 5) :
- [ ] Nom complet de la personne
- [ ] Fonction (directeur marketing, fondateur, etc.)
- [ ] Entreprise / organisation
- [ ] Verbatim (60–400 caractères, authentique — pas corporate)
- [ ] Photo de la personne 300×300 min. (WebP/JPG, fond neutre)
- [ ] Autorisation écrite d'utiliser nom + photo (RGPD)

**Fichier** : `components/sections/Temoignages.tsx` — à migrer vers
Sanity une fois Sanity configuré (cf. section 9).

---

## 6 · Portfolio / études de cas 🟠

Actuellement placeholders sur la homepage. Page `/portfolio` en stub.

Pour chaque projet (idéal : 3 à 6 projets significatifs) :
- [ ] Nom du projet + client
- [ ] Secteur d'activité
- [ ] Année de livraison
- [ ] Services mobilisés (branding, web, ads…)
- [ ] Résumé 2–3 lignes
- [ ] Image de couverture 16:9 (1600×900 min, WebP)
- [ ] 3 à 10 visuels de la réalisation (mockups, screens, photos)
- [ ] Contexte & enjeux (1 paragraphe)
- [ ] Approche retenue (1 paragraphe)
- [ ] **Résultats chiffrés** (ex. "+230 % trafic organique")
- [ ] Lien vers le projet en ligne (si applicable)
- [ ] Témoignage client associé (optionnel)

**Fichier** : `app/portfolio/page.tsx` — à alimenter via Sanity.

---

## 7 · Liens réseaux sociaux 🟠

Le footer référence 5 plateformes mais les liens pointent vers `#`.

- [ ] URL Facebook (page pro)
- [ ] URL Instagram (compte pro)
- [ ] URL TikTok
- [ ] URL LinkedIn (page entreprise)
- [ ] Numéro WhatsApp Business (format international sans `+`)

**Fichier** : `components/layout/Footer.tsx` — constante `SOCIAL_LINKS`.

---

## 8 · Équipe — page "L'agence" 🟢

Section **volontairement reportée** dans `/a-propos` tant que le contenu
n'est pas disponible. Pas de fabrication.

Pour chaque membre (idéal : 2 à 4 personnes clés) :
- [ ] Prénom + nom
- [ ] Rôle / fonction
- [ ] Bio courte (160–280 caractères)
- [ ] Photo ronde 600×600 min (WebP, fond neutre)
- [ ] URL LinkedIn (optionnel mais recommandé)

**Fichier** : nouveau composant `components/about/AboutTeam.tsx` à créer
entre `AboutMethod` et `CTAFinal` dans `app/a-propos/page.tsx`.

---

## 9 · Sanity CMS 🔴

Le CMS est installé, les schémas prêts. Il manque le compte et le projet.

- [ ] **Créer un compte Sanity** sur https://sanity.io (plan gratuit OK
      jusqu'à 10 utilisateurs / 10 000 documents)
- [ ] **Créer un nouveau projet** dans https://sanity.io/manage
      → nom suggéré : "Mossine Digital"
      → dataset : "production"
- [ ] **Récupérer le Project ID** (visible sur la page du projet)
      → coller dans `.env.local` (ligne `NEXT_PUBLIC_SANITY_PROJECT_ID`)
- [ ] **Générer un token de lecture (Viewer)** :
      Sanity Manage → API → Tokens → Add API token → permissions Viewer
      → coller dans `.env.local` (ligne `SANITY_API_READ_TOKEN`)
- [ ] **Ajouter le domaine prod** dans CORS origins (Sanity Manage → API)
      → ex. `https://mossine-digital.com` (pas de trailing slash)
- [ ] **Se connecter au Studio** via `/studio` → login Sanity
- [ ] **Alimenter le contenu** (articles, portfolio, témoignages, FAQ)

**Fichiers impactés** : `.env.local`, `sanity.config.ts`.
Une fois alimenté → les pages Blog et Portfolio seront branchées (Sprint 3
phase 2).

---

## 10 · Email transactionnel Resend 🔴

Nécessaire pour que le formulaire `/contact` envoie réellement les leads.

- [ ] **Créer un compte Resend** sur https://resend.com (plan gratuit
      100 emails/jour — suffisant pour un site vitrine)
- [ ] **Vérifier un domaine** (ex. `mossinedigital.com`) en ajoutant
      les enregistrements DNS fournis par Resend (SPF, DKIM, DMARC)
- [ ] **Générer une clé API** → coller dans `.env.local` (`RESEND_API_KEY`)
- [ ] **Configurer l'expéditeur** → `.env.local` `RESEND_FROM_EMAIL`
      format : `Mossine Digital <noreply@mossinedigital.com>`
- [ ] **Configurer le destinataire** → `CONTACT_NOTIFICATION_EMAIL`
      (par défaut `contact@mossinedigital.com`)

**Fichier** : `.env.local`, `app/contact/actions.ts` (aucune modif
nécessaire — la config est déjà lue au runtime).

---

## 11 · Infrastructure & déploiement (Sprint 5) 🔴

À faire uniquement quand le site est prêt pour go-live.

- [ ] **Nom de domaine** acheté (ex. mossinedigital.com)
      → renseigner `NEXT_PUBLIC_SITE_URL` en prod
- [ ] **Compte Hostinger Cloud** ou équivalent VPS Node.js 20+
- [ ] **Compte Cloudflare** (gratuit OK) devant Hostinger
      → WAF, CDN, DDoS, certificat SSL
- [ ] **Compte GitHub** avec accès au repo (pour CI/CD)
- [ ] **Compte Umami** (analytics RGPD) — self-hosted ou cloud
- [ ] **Compte Sentry** (monitoring erreurs prod) — plan gratuit OK
- [ ] **Compte UptimeRobot / Better Stack** (monitoring uptime)

---

## 12 · Enrichissements SEO (Sprint 3+) 🟢

- [ ] **LocalBusiness JSON-LD** — nécessite adresse + téléphone + horaires
      (cf. section 1) → ajouter dans `app/layout.tsx`
- [ ] **Photos de l'équipe/bureau** pour enrichir la page À propos
- [ ] **Articles de blog initiaux** (3 minimum au lancement)
      → via Sanity Studio une fois configuré
- [ ] **Backlinks qualifiés** (annuaires pro, partenaires, presse)
- [ ] **Validation Google Search Console** (une fois le domaine live)
- [ ] **Validation Bing Webmaster Tools** (optionnel, trafic BING <3%)

---

## Ordre d'attaque recommandé

**Semaine 1 — Déblocage fonctionnel**
1. Infos légales (§1) — 30 min max
2. Resend (§10) — 1h avec config DNS
3. Sanity (§9) — 30 min, compte + projet
4. Logos définitifs si différents de l'actuel (§2)

**Semaine 2 — Contenu**
5. Rédaction mentions légales avec infos §1
6. Témoignages (§5) — 3 personnes à contacter
7. Stats homepage (§4) — 10 min
8. Liens réseaux sociaux (§7)
9. Alimentation Sanity : 2-3 articles + 3 portfolio + FAQ

**Semaine 3 — Polish**
10. OG image (§3)
11. Favicon définitifs (§2)
12. Équipe /a-propos (§8)
13. Photos équipe

**Semaine 4 — Go-live**
14. Infra & déploiement (§11)
15. SEO (§12)

---

## Comment me prévenir quand tu as une info

Écris simplement dans une nouvelle session : *"J'ai les infos §1, voici :
…"*. Je mets à jour le code immédiatement et je coche l'item ici.
Si tu préfères me donner tout d'un bloc : crée un fichier
`.claude/session/CLIENT_INPUTS.md` avec les réponses — je traiterai en
lot à la prochaine ouverture.
