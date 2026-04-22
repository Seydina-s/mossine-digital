import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// Page /contact : formulaire Zod validé server-side.
// Les tests ne soumettent PAS le formulaire (éviter d'appeler Resend
// pendant les tests). On valide uniquement le rendu + les interactions
// côté client + la validation HTML native.

test.describe('Page /contact', () => {
  test('formulaire contact rendu avec tous les champs', async ({ page }) => {
    await page.goto('/contact')

    // Champs attendus par contactSchema.
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="phone"]')).toBeVisible()
    await expect(page.locator('input[name="company"]')).toBeVisible()
    await expect(page.locator('select[name="service"]')).toBeVisible()
    await expect(page.locator('select[name="budget"]')).toBeVisible()
    await expect(page.locator('textarea[name="message"]')).toBeVisible()
    await expect(page.locator('input[name="consent"]')).toBeAttached()
  })

  test('honeypot website est dans le DOM mais hors de l\'écran', async ({ page }) => {
    await page.goto('/contact')

    const honeypot = page.locator('input[name="website"]')
    await expect(honeypot).toBeAttached()
    await expect(honeypot).toBeHidden()

    // Vérifie que tabIndex=-1 (exclu du focus order).
    const tabIndex = await honeypot.getAttribute('tabindex')
    expect(tabIndex).toBe('-1')
  })

  test('pré-sélection du service via query string', async ({ page }) => {
    await page.goto('/contact?service=strategie')

    const select = page.locator('select[name="service"]')
    await expect(select).toHaveValue('strategie')

    // Bandeau confirmation visible avec le libellé humain.
    await expect(page.getByRole('status').filter({ hasText: /strat/i })).toBeVisible()
  })

  test('a11y strict (sauf contraste — cf. dette palette secondary)', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .disableRules(['color-contrast'])
      .analyze()

    const blocking = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    )

    expect(
      blocking,
      blocking.map((v) => `${v.id}: ${v.description}`).join('\n'),
    ).toEqual([])
  })

  // Dette résiduelle hors scope Bucket 1 #7 : ContactForm utilise
  // `text-[var(--md-accent)]` pour astérisques champs requis + messages d'erreur
  // Zod sur fond blanc = 3.05:1 ❌. À traiter dans le lot "accent-text sur fond
  // clair" (commun avec ServiceDetailBlock pills dans /services).
  test.fixme('a11y color-contrast (dette accent-text sur fond clair)', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .withRules(['color-contrast'])
      .analyze()

    expect(results.violations).toEqual([])
  })
})
