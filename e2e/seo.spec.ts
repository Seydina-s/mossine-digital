import { test, expect } from '@playwright/test'

// Audit SEO structurel — contraintes hard-lockées anti-régression.
//
// H1 uniqueness : règle SEO non-négociable (1 page = 1 H1 unique,
// descriptif de l'intention de la page). Ce test boucle sur toutes
// les routes publiques + stubs + erreurs pour garantir qu'aucun
// ajout futur ne casse la règle.

const PUBLIC_ROUTES = [
  '/',
  '/services',
  '/a-propos',
  '/contact',
  '/politique-confidentialite',
] as const

const STUB_ROUTES = ['/blog', '/portfolio'] as const

test.describe('SEO — H1 uniqueness', () => {
  for (const route of [...PUBLIC_ROUTES, ...STUB_ROUTES]) {
    test(`${route} : exactement 1 <h1>`, async ({ page }) => {
      await page.goto(route)
      await expect(page.locator('h1')).toHaveCount(1)
    })
  }

  test('404 (route inexistante) : exactement 1 <h1>', async ({ page }) => {
    await page.goto('/route-qui-nexiste-pas-xyz')
    await expect(page.locator('h1')).toHaveCount(1)
  })
})
