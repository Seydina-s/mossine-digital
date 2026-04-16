import { test, expect } from '@playwright/test'

// Pages stubs (ComingSoon) : doivent retourner 200 et être noindex.
// Garde-fou anti-régression : si on re-décide de les ouvrir, ce test
// devra être mis à jour (pas un piège passif — un rappel explicite).

// Note : /a-propos était stub en Sprint 2, est devenue une vraie page
// Sprint 3 (voir app/a-propos/page.tsx + commit 21a6206). Seules /blog
// et /portfolio restent stubbées au 2026-04-16.
const STUB_ROUTES = ['/blog', '/portfolio'] as const

test.describe('Pages stubs (ComingSoon)', () => {
  for (const route of STUB_ROUTES) {
    test(`${route} retourne 200 + noindex`, async ({ page }) => {
      const response = await page.goto(route)
      expect(response?.status()).toBe(200)

      const robots = await page.locator('meta[name="robots"]').getAttribute('content')
      expect(robots ?? '').toMatch(/noindex/i)

      // Contenu ComingSoon visible.
      await expect(page.getByText(/bientôt|prochainement|en préparation/i).first()).toBeVisible()
    })
  }
})
