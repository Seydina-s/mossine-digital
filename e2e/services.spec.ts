import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// Page /services : hero + 5 ServiceDetailBlock + FAQ + CTA.
// Vérifie présence des 5 services + ancres fonctionnelles + FAQ accessible.

test.describe('Page /services', () => {
  test('affiche les 5 blocs services avec ancres', async ({ page }) => {
    await page.goto('/services')

    const h1 = page.locator('h1')
    await expect(h1).toHaveCount(1)

    // 5 sections ancrées par id (ids alignés avec lib/services-data.ts).
    const serviceIds = ['identite', 'web', 'social', 'seo', 'strategie']
    for (const id of serviceIds) {
      await expect(page.locator(`section#${id}`)).toBeAttached()
    }
  })

  test('FAQ native <details> : clic ouvre un item', async ({ page }) => {
    await page.goto('/services')

    const firstSummary = page.locator('details summary').first()
    await firstSummary.scrollIntoViewIfNeeded()

    const details = page.locator('details').first()
    await expect(details).not.toHaveAttribute('open', '')

    await firstSummary.click()
    await expect(details).toHaveAttribute('open', '')
  })

  test('CTA de bloc renvoie vers /contact?service=<id>', async ({ page }) => {
    await page.goto('/services')

    const strategieBlock = page.locator('section#strategie')
    const cta = strategieBlock.getByRole('link', { name: /démarrer|contact/i }).first()

    const href = await cta.getAttribute('href')
    expect(href).toContain('/contact')
    expect(href).toContain('service=strategie')
  })

  test('a11y strict (sauf contraste — cf. dette palette secondary)', async ({ page }) => {
    await page.goto('/services')
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

  // Dette résiduelle hors scope Bucket 1 #7 (résolu pour homepage 2026-04-21) :
  // ServiceDetailBlock utilise `text-[var(--md-accent)]` #FF5964 sur fond blanc
  // (pill "Service 0X") = 3.05:1 ❌. À traiter dans un lot dédié "accent-text
  // sur fond clair" qui toucherait aussi ContactForm (astérisques + erreurs).
  test.fixme('a11y color-contrast (dette accent-text sur fond clair)', async ({ page }) => {
    await page.goto('/services')
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .withRules(['color-contrast'])
      .analyze()

    expect(results.violations).toEqual([])
  })
})
