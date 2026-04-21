// ─────────────────────────────────────────────────────────────────
//  services-data.ts — source unique de vérité pour la page /services
//
//  🛡️ RÈGLE VACCIN (à respecter dans TOUT fichier `lib/`) :
//  Ce module peut être importé par des server components ET traverser
//  la frontière RSC (server → client). Les données qu'il exporte
//  DOIVENT être 100 % sérialisables JSON. Interdiction formelle de :
//    - composants React (`$$typeof` + `render`)
//    - fonctions, classes, symbols, Map/Set, Date
//    - imports de `@phosphor-icons/react` ou tout package qui exporte
//      des composants
//
//  Pour associer un visuel à une entrée : utiliser une clé string
//  littérale (ex. `iconKey: ServiceIconKey`). Le composant consommateur
//  résout la clé via un `Record<ServiceIconKey, PhosphorIcon>` local.
//  Le TypeScript garantit la complétude du mapping à la compilation —
//  toute nouvelle clé manquante casse la build.
// ─────────────────────────────────────────────────────────────────

/**
 * Clés d'icônes autorisées pour un service.
 * Union fermée : l'ajout d'une valeur ici force à étendre le
 * `SERVICE_ICON_MAP` côté composant (sinon erreur TypeScript).
 */
export type ServiceIconKey =
  | 'palette'
  | 'globe'
  | 'chat'
  | 'megaphone'
  | 'magnifier'
  | 'chart'

export interface ServiceDetail {
  /** Slug utilisé pour #ancre et query param contact (aligné schema Zod) */
  id: string
  /** Index affiché en hero de bloc (01, 02…) */
  number: string
  title: string
  /** Short tag affiché en eyebrow */
  eyebrow: string
  /** Libellé court utilisé dans la table des matières du hero /services (icône + texte). Distinct du `eyebrow` qui peut contenir des catégories composées. */
  navLabel: string
  /** Accroche 1 phrase — problem statement éditorial */
  problem: string
  /** Paragraphe solution (1-2 phrases) */
  promise: string
  /** Approche Mossine — 3 à 5 points clés */
  approach: string[]
  /** Livrables concrets */
  deliverables: string[]
  /** Indicateur de délai (engagement) */
  timeline: string
  /** Image d'illustration (déjà présente dans public/images/hero/) */
  image: string
  /** Alt descriptif métier (a11y + SEO) — décrit l'intention de l'offre, pas la composition visuelle */
  imageAlt: string
  /** Clé d'icône — résolue par le composant via SERVICE_ICON_MAP (cf. règle vaccin) */
  iconKey: ServiceIconKey
  /** Couleur d'accent de la section (choisie dans la palette Mossine) */
  accent: string
  /** Tag flagship pour mettre en avant l'offre signature */
  flagship?: boolean
}

export const SERVICES_DETAIL: ServiceDetail[] = [
  {
    id: 'identite',
    number: '01',
    title: 'Identité visuelle & Branding',
    eyebrow: 'Identité · Branding',
    navLabel: 'Branding',
    problem:
      '75 % des décisions d\u2019achat se jouent sur la perception de marque, avant même le produit.',
    promise:
      'On construit une identité visuelle qui vous rend reconnaissable en une fraction de seconde — et cohérente partout où vos clients vous rencontrent.',
    approach: [
      'Atelier Brand Discovery — positionnement, valeurs, public, voix de marque',
      'Exploration créative — 2 à 3 pistes graphiques avec moodboards argumentés',
      'Système visuel complet — typographie, couleurs, iconographie, photographie',
      'Guidelines documentées — un manuel clair pour éviter les dérives au fil du temps',
    ],
    deliverables: [
      'Logo principal + 3 variantes (monochrome, icône, footer)',
      'Charte graphique PDF (40–60 pages)',
      'Templates réseaux sociaux prêts à l\u2019emploi',
      'Papeterie — cartes de visite, signature email, en-tête',
      'Mini brand-book interactif en ligne',
    ],
    timeline: '3 à 5 semaines',
    image: '/images/hero/service-identite.webp',
    imageAlt:
      'Illustration du service Identité visuelle & Branding — construction d\u2019un système de marque cohérent : logo, palette, typographie et guidelines.',
    iconKey: 'palette',
    accent: '#35A7FF',
  },
  {
    id: 'web',
    number: '02',
    title: 'Création de site web',
    eyebrow: 'Web · Performance',
    navLabel: 'Web',
    problem:
      '53 % des visiteurs quittent un site qui met plus de 3 secondes à charger.',
    promise:
      'On conçoit des sites ultra-rapides, accessibles et pensés pour convertir — Core Web Vitals au vert, design sur-mesure, zéro compromis technique.',
    approach: [
      'Audit UX et benchmark concurrentiel',
      'Wireframes + maquettes haute-fidélité Figma',
      'Développement Next.js + TypeScript strict + accessibilité WCAG 2.2 AA',
      'SEO technique natif — structure sémantique, schema.org, sitemap',
      'Déploiement + CI/CD + formation à l\u2019administration',
    ],
    deliverables: [
      'Site vitrine / landing / e-commerce responsive (320 → 2560 px)',
      'CMS headless intégré (Sanity / Strapi)',
      'Score Lighthouse ≥ 90 mobile / 100 desktop',
      'Sécurité OWASP — CSP, HSTS, rate-limiting',
      'Documentation + formation éditeur',
    ],
    timeline: '6 à 10 semaines',
    image: '/images/hero/service-web.webp',
    imageAlt:
      'Illustration du service Création de site web — conception d\u2019interfaces sur-mesure, performantes et sécurisées sous Next.js.',
    iconKey: 'globe',
    accent: '#35A7FF',
  },
  {
    id: 'social',
    number: '03',
    title: 'Community Management',
    eyebrow: 'Social · Éditorial',
    navLabel: 'Gestion communauté',
    problem:
      'Vos followers scrollent 90 publications par minute. La vôtre retient-elle leur pouce ?',
    promise:
      'On construit une ligne éditoriale qui parle comme vos clients et répond comme vous — et on tient le rythme, mois après mois.',
    approach: [
      'Stratégie éditoriale — piliers de contenu, ton, plateformes prioritaires',
      'Calendrier 30 / 60 / 90 jours validé à l\u2019avance',
      'Création de contenus — visuels, carrousels, reels, stories',
      'Animation de communauté — réponses quotidiennes, DM, modération',
      'Reporting mensuel avec KPIs clairs (reach, engagement, conversion)',
    ],
    deliverables: [
      'Ligne éditoriale formalisée + charte de ton',
      'Calendrier éditorial mensuel en amont',
      '12 à 20 contenus / mois (selon forfait)',
      'Modération 7j/7 sur les canaux prioritaires',
      'Reporting performance mensuel PDF + visio',
    ],
    timeline: 'Engagement mensuel (3 mois minimum)',
    image: '/images/hero/service-community.webp',
    imageAlt:
      'Illustration du service Community Management — animation éditoriale régulière sur les réseaux sociaux, création de contenus et modération.',
    iconKey: 'chat',
    accent: '#35A7FF',
  },
  {
    id: 'ads',
    number: '04',
    title: 'Campagnes Ads',
    eyebrow: 'Ads · Acquisition',
    navLabel: 'Publicité',
    problem:
      'Chaque franc CFA mal investi en Ads, c\u2019est dix francs de chiffre d\u2019affaires raté.',
    promise:
      'On pilote vos campagnes Meta, Google et TikTok à la donnée : chaque franc CFA dépensé est tracé, chaque A/B test documenté, chaque optimisation argumentée.',
    approach: [
      'Audit de vos comptes publicitaires existants',
      'Personas + parcours d\u2019achat + stratégie multi-canaux',
      'Setup tracking avancé — pixel, events, conversions serveur',
      'Création de visuels + copies + landing pages dédiées',
      'Optimisation hebdomadaire — budget, audiences, créations',
    ],
    deliverables: [
      'Audit compte existant (si applicable)',
      'Structure de campagnes Meta / Google / TikTok',
      'Tracking complet — Pixel + Conversion API',
      'Créations A/B testées chaque mois',
      'Reporting hebdomadaire + point mensuel',
    ],
    timeline: 'Setup 2 à 3 semaines + gestion mensuelle',
    image: '/images/hero/service-social-media.webp',
    imageAlt:
      'Illustration du service Campagnes Ads — pilotage de campagnes publicitaires Meta, Google et TikTok avec tracking avancé.',
    iconKey: 'megaphone',
    accent: '#FF5964',
  },
  {
    id: 'seo',
    number: '05',
    title: 'SEO & SEA',
    eyebrow: 'Référencement · Trafic',
    navLabel: 'Référencement',
    promise:
      'On construit un trafic organique durable — audit technique, contenus optimisés, netlinking qualifié, suivi transparent.',
    problem:
      'Vous apparaissez sur Google. Apparaissez-vous au bon moment, sur les bonnes requêtes, devant les bonnes personnes ?',
    approach: [
      'Audit technique 360° — crawl, Core Web Vitals, erreurs indexation',
      'Stratégie de mots-clés + cocon sémantique',
      'Optimisations on-page — balises, structure Hn, maillage interne',
      'Production de contenus SEO-friendly (si demandé)',
      'Netlinking qualifié — pas de PBN, pas de spam',
    ],
    deliverables: [
      'Audit SEO complet (80–100 points)',
      'Arborescence sémantique + 20 à 50 mots-clés priorisés',
      'Optimisations techniques et éditoriales',
      'Acquisition de 5 à 15 backlinks qualifiés / mois',
      'Dashboard + reporting mensuel (positions, trafic, conversions)',
    ],
    timeline: 'Résultats visibles 3 à 6 mois — engagement 6 mois minimum',
    image: '/images/hero/service-logo.webp',
    imageAlt:
      'Illustration du service Référencement SEO & SEA — construction d\u2019un trafic organique durable, audit technique et stratégie de mots-clés.',
    iconKey: 'magnifier',
    accent: '#35A7FF',
  },
  {
    id: 'strategie',
    number: '06',
    title: 'Stratégie communication & marketing digitale',
    eyebrow: 'Stratégie · 360° · Flagship',
    navLabel: 'Stratégie',
    problem:
      'Six outils, six prestataires, six visions différentes. Comment avancer vraiment ?',
    promise:
      'L\u2019approche signature Mossine : une roadmap sur-mesure qui aligne branding, web, social, SEO et ads autour de vos objectifs business. Pilotée par la donnée.',
    approach: [
      'Diagnostic 360° — marque, audiences, concurrence, maturité digitale',
      'Objectifs SMART alignés avec votre plan business',
      'Roadmap annuelle priorisée par impact / effort',
      'Coordination de l\u2019ensemble des leviers et prestataires',
      'Point stratégique mensuel + dashboard KPIs consolidé',
    ],
    deliverables: [
      'Audit stratégique complet (marque + digital)',
      'Roadmap 12 mois chiffrée et priorisée',
      'Plan de communication détaillé trimestre par trimestre',
      'Dashboard KPIs 360° temps réel',
      'Comité stratégique mensuel (2h)',
    ],
    timeline: 'Mission stratégique 6 à 8 semaines + accompagnement annuel',
    image: '/images/hero/service-strategie.webp',
    imageAlt:
      'Illustration du service Stratégie communication & marketing digitale — roadmap 360° alignant branding, web, social, SEO et ads.',
    iconKey: 'chart',
    accent: '#FF5964',
    flagship: true,
  },
]

// ─────────────────────────────────────────────────────────────────
//  FAQ — questions transverses page /services
// ─────────────────────────────────────────────────────────────────

export interface FAQItem {
  question: string
  answer: string
}

export const SERVICES_FAQ: FAQItem[] = [
  {
    question: 'Travaillez-vous avec les ONG et les organisations engagées ?',
    answer:
      'Oui — c\u2019est même l\u2019un de nos segments prioritaires. Nous accompagnons aussi bien des entreprises commerciales que des ONG, des associations et des organisations internationales. La méthode reste la même : comprendre le message, choisir les bons canaux, mesurer l\u2019impact réel.',
  },
  {
    question: 'Peut-on prendre un seul service ou faut-il tout prendre ?',
    answer:
      'Chaque service est accessible en autonomie. Vous pouvez démarrer par une refonte de site, une campagne Ads ciblée ou un audit SEO. Si plusieurs leviers sont engagés en parallèle, l\u2019offre Stratégie les coordonne pour maximiser l\u2019impact.',
  },
  {
    question: 'Quels sont vos délais de réponse ?',
    answer:
      'Sous 24 h ouvrées pour toute demande via le formulaire de contact. Un premier échange visio est généralement programmé dans la semaine qui suit.',
  },
  {
    question: 'Proposez-vous des forfaits ou des tarifs sur-mesure ?',
    answer:
      'Les deux. Nous avons des forfaits de départ pour les besoins cadrés (identité visuelle, landing page, campagne Ads ponctuelle) et des propositions sur-mesure dès que le projet implique plusieurs leviers ou un engagement dans la durée.',
  },
  {
    question: 'Intervenez-vous à distance ?',
    answer:
      'Oui, 100 % de nos collaborations peuvent se faire à distance — visio, documents partagés, points de suivi réguliers. Nous nous déplaçons quand la phase stratégique le justifie.',
  },
  {
    question: 'Combien de temps pour voir des résultats ?',
    answer:
      'Cela dépend du levier. Une identité visuelle ou un site web livre un impact immédiat. Des campagnes Ads bien structurées montrent leurs premiers signaux en 4 à 6 semaines. Le SEO demande 3 à 6 mois pour des résultats solides. Nous cadrons les attentes dès le premier échange.',
  },
  {
    question: 'Qu\u2019est-ce qui vous différencie des autres agences ?',
    answer:
      'La cohérence — chaque levier parle le même langage de marque. La transparence — vous voyez les chiffres, pas juste les slides. Et l\u2019engagement — nous travaillons avec peu de clients pour avancer vite, pas avec beaucoup pour facturer cher.',
  },
]
