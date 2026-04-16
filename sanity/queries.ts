// ─────────────────────────────────────────────────────────────────
//  sanity/queries.ts — requêtes GROQ centralisées
//
//  ⚠️ Non branchées aux pages publiques tant que :
//    1. Le client n'a pas fourni son `NEXT_PUBLIC_SANITY_PROJECT_ID`
//    2. Le client n'a pas alimenté le Studio avec du contenu réel
//
//  Les queries listées ici préparent le sprint "Blog / Portfolio"
//  mais peuvent être importées progressivement dès que nécessaire.
//
//  Les types correspondants sont inférés à partir des schémas Sanity.
//  Pour un typage strict (sanity-codegen / next-sanity typegen), à
//  faire Sprint 3+ une fois que les données existent.
// ─────────────────────────────────────────────────────────────────

// ─── Articles ───────────────────────────────────────────────────

/** Liste des articles — tri par date décroissante. */
export const articlesListQuery = /* groq */ `
*[_type == "article" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc)
  [0...$limit]
  {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    featured,
    "cover": { "url": cover.asset->url, "alt": cover.alt },
    "author": author->{ name, "slug": slug.current, "image": image.asset->url },
    "category": category->{ title, "slug": slug.current },
    tags
  }
`

/** Article individuel par slug (avec body PortableText). */
export const articleBySlugQuery = /* groq */ `
*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "cover": { "url": cover.asset->url, "alt": cover.alt },
  "author": author->{ name, role, bio, "slug": slug.current, "image": image.asset->url, linkedin },
  "category": category->{ title, "slug": slug.current },
  tags,
  body,
  seo
}
`

/** Slugs de tous les articles — pour generateStaticParams. */
export const articleSlugsQuery = /* groq */ `
*[_type == "article" && defined(slug.current)]{ "slug": slug.current }
`

// ─── Portfolio ──────────────────────────────────────────────────

/** Liste des projets portfolio — tri date décroissante. */
export const portfolioListQuery = /* groq */ `
*[_type == "portfolio" && defined(slug.current)]
  | order(featured desc, publishedAt desc)
  [0...$limit]
  {
    _id,
    title,
    "slug": slug.current,
    client,
    sector,
    year,
    summary,
    featured,
    "cover": { "url": cover.asset->url, "alt": cover.alt },
    "services": services[]->{ title, "slug": slug.current, iconKey }
  }
`

/** Projet portfolio individuel. */
export const portfolioBySlugQuery = /* groq */ `
*[_type == "portfolio" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  client,
  sector,
  year,
  summary,
  context,
  approach,
  "cover": { "url": cover.asset->url, "alt": cover.alt },
  gallery[]{
    "url": asset->url,
    alt,
    caption
  },
  "services": services[]->{ title, "slug": slug.current, iconKey, eyebrow },
  results,
  liveUrl,
  "testimonial": testimonial->{ name, role, company, quote, rating, "avatar": avatar.asset->url },
  seo
}
`

/** Slugs portfolio — pour generateStaticParams. */
export const portfolioSlugsQuery = /* groq */ `
*[_type == "portfolio" && defined(slug.current)]{ "slug": slug.current }
`

// ─── Témoignages ────────────────────────────────────────────────

/** Témoignages mis en avant — carousel homepage. */
export const temoignagesFeaturedQuery = /* groq */ `
*[_type == "temoignage" && featured == true]
  | order(order asc)
  {
    _id,
    name,
    role,
    company,
    quote,
    rating,
    projectType,
    "avatar": avatar.asset->url
  }
`

// ─── FAQ ────────────────────────────────────────────────────────

/** FAQ par catégorie. */
export const faqByCategoryQuery = /* groq */ `
*[_type == "faq" && category == $category]
  | order(order asc)
  { _id, question, answer, category }
`

// ─── Services ───────────────────────────────────────────────────

/** Services triés par `order`. Source fallback (Sanity optionnel). */
export const servicesListQuery = /* groq */ `
*[_type == "service" && defined(slug.current)]
  | order(order asc)
  {
    _id,
    order,
    title,
    "slug": slug.current,
    eyebrow,
    navLabel,
    problem,
    promise,
    approach,
    deliverables,
    timeline,
    iconKey,
    accent,
    flagship,
    "image": { "url": image.asset->url, "alt": image.alt }
  }
`
