# PROJECT.md — Vision & Exigences Mossine Digital

## VISION

Créer le site vitrine de référence absolue pour une agence de communication
et marketing digital 360. Le site doit se positionner dès le lancement comme
le meilleur de sa catégorie sur chaque dimension :

- **Design UI** : Inspiré des meilleurs sites mondiaux (Awwwards, CSS Design Awards),
  avec une valeur ajoutée supérieure et une identité propre.
- **UX** : Navigation fluide, claire, ultra simple. Zéro friction.
- **Sécurité** : Protection ultra avancée contre DDoS, Phishing, injections,
  et toute attaque aussi minime soit-elle.
- **Scalabilité** : Technologies choisies pour la maintenance long terme,
  taux de rebond ultra faible, dette technique nulle.
- **SEO** : Bases posées dès le premier commit. Score PageSpeed 100 comme cible.
  GTmetrix A, Qualys SSL A+.
- **Démarcation** : Veille active permanente. Toujours en avance sur le marché.

---

## STRUCTURE DU SITE (pages prévues)

### Pages principales
- `/` — Accueil (Hero ultra premium + sections services + preuves sociales + CTA)
- `/services` — Services détaillés (Communication, Marketing Digital, SEO, Réseaux sociaux...)
- `/portfolio` — Réalisations et case studies
- `/blog` — Articles experts (alimenté via Sanity CMS)
- `/a-propos` — Histoire, équipe, valeurs, vision
- `/contact` — Formulaire de contact + devis

### Pages secondaires
- `/mentions-legales`
- `/politique-de-confidentialite`
- `/sitemap.xml` (généré automatiquement)
- `/robots.txt` (configuré)
- `/404` (page d'erreur custom premium)

---

## EXIGENCES PAR DOMAINE

### Design & UI
- Inspiré des sites Awwwards top 10 en 2024-2025
- Palette strictement respectée : #FF5964 / #FFFFFF / #00361A / #35A7FF
- Micro-animations sur chaque interaction (hover, scroll, focus)
- Smooth scroll avec Lenis sur toute navigation
- Transitions entre pages fluides (Framer Motion)
- Hero avec animation premium (GSAP ou Three.js selon décision agent Design)
- Dark mode : optionnel si cohérent avec la charte, sinon non
- Responsive parfait : mobile / tablette / desktop / ultra-wide
- Typographie premium : à définir par agent Design (libre et gratuite)

### Performance
- LCP < 2.5s sur mobile
- FID < 100ms
- CLS = 0
- Score PageSpeed Mobile ≥ 90, Desktop = 100
- Images : WebP/AVIF uniquement via next/image
- Fonts : self-hosted, subset, preload critique
- Scripts tiers : Partytown pour isolation dans web worker

### Sécurité
- Cloudflare en proxy mandatory (WAF, DDoS, Bot protection)
- Security Headers : CSP, HSTS, X-Frame-Options, Permissions-Policy
- Rate limiting sur tous les endpoints API (Upstash Redis — gratuit tier)
- Validation Zod sur chaque input serveur
- hCaptcha sur formulaires (gratuit, RGPD-compliant)
- Audit OWASP Top 10 2025 avant déploiement
- Pas de dépendances non maintenues (audit npm régulier)
- Variables d'environnement : jamais commitées, toujours .env.local

### SEO
- Metadata dynamique via Next.js Metadata API
- Open Graph + Twitter Cards sur chaque page
- Schema.org JSON-LD : LocalBusiness, Service, Article, FAQ
- Sitemap.xml dynamique
- Robots.txt configuré
- Canonical URLs sur toutes les pages
- Images alt text obligatoire
- Structure H1>H2>H3 stricte
- Internal linking structuré

### CMS (Sanity)
- Schémas : Article, Service, Projet Portfolio, Témoignage, FAQ
- Slug automatique depuis le titre
- SEO fields dans chaque schéma (metaTitle, metaDescription, ogImage)
- Preview mode activé
- Sanity Studio sur `/studio` (protégé par auth)

### Accessibilité
- WCAG 2.2 AA minimum
- Skip to main content link
- Focus visible sur tous les éléments interactifs
- Contraste suffisant sur toutes les combinaisons couleurs/fond
- ARIA labels sur les éléments non-textuels
- Keyboard navigation complète

---

## APPROCHE BMAD — AGENTS

Approche multi-agents avec Claude Code. Chaque agent a un rôle précis.
L'Orchestrateur découpe en sprints et coordonne.

Voir `.claude/context/AGENTS.md` pour les détails.

---

## CONTRAINTES

- **Budget outils** : Gratuit par défaut. Aucun outil payant sans validation client.
- **Hébergement** : Hostinger Cloud (déjà acquis)
- **Logos** : Déjà créés par le client (à intégrer)
- **Palette** : Figée — #FF5964 / #FFFFFF / #00361A / #35A7FF
- **Langue** : Site en français (langue principale), anglais possible en option
- **Marché** : Sénégal + Afrique de l'Ouest + international

---

## DÉFINITION DU SUCCÈS

Le projet est réussi quand :
- [ ] PageSpeed Score : Mobile ≥ 90 / Desktop = 100
- [ ] GTmetrix Grade A
- [ ] Qualys SSL A+
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Lighthouse Best Practices = 100
- [ ] Lighthouse SEO = 100
- [ ] Zéro vulnérabilité critique (audit Snyk ou npm audit)
- [ ] Temps de chargement < 2s sur 4G
- [ ] Formulaire de contact fonctionnel avec emails délivrés
- [ ] CMS Sanity opérationnel pour le blog et portfolio
- [ ] Déploiement CI/CD GitHub Actions fonctionnel
