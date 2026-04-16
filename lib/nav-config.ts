// ─────────────────────────────────────────────────────────────────
//  nav-config.ts — configuration partagée de la Navbar.
//
//  🛡️ RÈGLE VACCIN (à lire avant toute nouvelle page) :
//  La Navbar morph entre deux états visuels :
//    - "transparent" (logo blanc, texte blanc) — pour un Hero sombre.
//    - "glass blanc" (logo bleu, texte primary) — pour un fond clair.
//
//  Si une nouvelle page a un Hero sombre (fond #1B1F3B, Aurora, etc.)
//  et que son chemin n'est PAS listé ici, la Navbar affichera un logo
//  bleu invisible sur fond sombre au chargement initial. Régression
//  garantie.
//
//  Inversement : si une page listée ici a un fond clair, la Navbar
//  démarrera transparente avec un logo blanc invisible → régression
//  symétrique.
//
//  En ajoutant une nouvelle page, choisir :
//    - Hero sombre → ajouter le pathname à `DARK_HERO_PATHS`.
//    - Hero clair → NE PAS l'ajouter (la navbar fera le glass par défaut).
//
//  Le type `readonly [...]` + `satisfies` garantit que seules des
//  strings littérales sont acceptées (pas de `string` générique qui
//  permettrait le drift).
// ─────────────────────────────────────────────────────────────────

/**
 * Liste des pathnames dont la page possède un Hero sombre
 * (fond #1B1F3B / Aurora / ou tout fond où un logo blanc est requis).
 *
 * La Navbar démarre transparente sur ces pages, puis morph en glass
 * blanc au scroll. Sur TOUS les autres pathnames, la Navbar démarre
 * directement en glass blanc (comportement par défaut).
 */
export const DARK_HERO_PATHS = [
  '/',
  '/services',
  '/a-propos',
  '/blog',
  '/portfolio',
] as const satisfies readonly string[]

export type DarkHeroPath = (typeof DARK_HERO_PATHS)[number]

/** Retourne true si le pathname courant doit démarrer la navbar en mode transparent. */
export function hasDarkHero(pathname: string | null): boolean {
  if (!pathname) return false
  return (DARK_HERO_PATHS as readonly string[]).includes(pathname)
}
