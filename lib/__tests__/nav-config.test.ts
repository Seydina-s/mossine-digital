import { describe, it, expect } from 'vitest'
import { DARK_HERO_PATHS, hasDarkHero } from '@/lib/nav-config'

// Garde-fou vaccin : toute régression sur cette liste cassera ces tests.
// Si quelqu'un supprime une route à Hero sombre sans mettre à jour le code
// navbar, ou en ajoute une sans enregistrer le pattern, le test prévient.

describe('DARK_HERO_PATHS — inventaire des pages Hero sombre', () => {
  it('contient exactement les pathnames actuels', () => {
    expect(DARK_HERO_PATHS).toEqual([
      '/',
      '/services',
      '/a-propos',
      '/blog',
      '/portfolio',
    ])
  })

  // Note : `as const satisfies readonly string[]` fournit la garantie
  // readonly au niveau du TYPE (compile-time). Pas de Object.freeze au
  // runtime — accepter la mutation runtime serait un écart à la vaccin,
  // mais ça nous éviterait un coût mémoire sans bénéfice concret.
  it('a une longueur stable (snapshot anti-drift)', () => {
    expect(DARK_HERO_PATHS.length).toBe(5)
  })
})

describe('hasDarkHero — helper de lookup', () => {
  it('retourne true sur les routes listées', () => {
    for (const path of DARK_HERO_PATHS) {
      expect(hasDarkHero(path), `${path} devrait être dark`).toBe(true)
    }
  })

  it('retourne false sur les routes non listées', () => {
    expect(hasDarkHero('/contact')).toBe(false)
    expect(hasDarkHero('/politique-confidentialite')).toBe(false)
    expect(hasDarkHero('/studio')).toBe(false)
  })

  it('retourne false pour null / undefined (état initial SSR)', () => {
    expect(hasDarkHero(null)).toBe(false)
    expect(hasDarkHero(undefined as unknown as string | null)).toBe(false)
  })

  it('ne matche pas les sous-routes (pas de préfixe)', () => {
    // /blog est dark, /blog/mon-article ne l'est pas (layout neutre sur
    // articles individuels — si ça change un jour, ce test devra muter).
    expect(hasDarkHero('/blog/mon-article')).toBe(false)
    expect(hasDarkHero('/services/branding')).toBe(false)
    expect(hasDarkHero('/portfolio/projet-1')).toBe(false)
  })

  it('rejette les pathnames vides', () => {
    expect(hasDarkHero('')).toBe(false)
  })
})
