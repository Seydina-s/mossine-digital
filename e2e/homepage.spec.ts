import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// Homepage : Hero + 6 sections + Footer. Smoke a11y sur le rendu
// initial (avant scroll, pour éviter que les animations scroll-triggered
// fassent bruit dans l'audit).

test.describe('Homepage /', () => {
  test('charge avec un H1 unique et tous les repères sémantiques', async ({ page }) => {
    await page.goto('/')

    // H1 unique (règle SEO Sprint 2 audit).
    await expect(page.locator('h1')).toHaveCount(1)

    // Navbar présente (role banner via <header>).
    await expect(page.getByRole('banner')).toBeVisible()

    // Main content avec skip-link cible (#contenu-principal — cf. layout.tsx).
    await expect(page.locator('main#contenu-principal')).toBeVisible()

    // Footer présent (role contentinfo).
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })

  test('CTA Hero "Démarrer un projet" navigue vers /contact', async ({ page }) => {
    await page.goto('/')

    // Premier CTA du Hero (il y a 4 GlassCTA sur la page — on cible le Hero via scope).
    const heroCta = page
      .locator('section')
      .first()
      .getByRole('link', { name: /démarrer un projet/i })
      .first()

    await expect(heroCta).toBeVisible()
    await heroCta.click()
    await expect(page).toHaveURL(/\/contact/)
  })

  test('a11y strict (sauf contraste — cf. dette palette secondary)', async ({ page }) => {
    await page.goto('/')
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

  // Dette palette résolue 2026-04-21 (Bucket 1 #7, Option 3 hybride) :
  //   - Card Web : bg migré #35A7FF → #0E70C8 (token --md-secondary-solid), blanc = 5.33:1
  //   - Card Stratégie : bg migré #FF5964 → #C23A46 (token --md-accent-solid), blanc = 5.25:1
  //   - CTAFinal : bg migré + opacités textes remontées (sous-titre 0.70→0.90, badge 0.80→1.0)
  // Les couleurs vives #35A7FF et #FF5964 restent utilisées comme décor (halos Aurora,
  // pills, liens, focus-rings, gradient bars) où le contraste de texte ne s'applique pas.
  test('a11y color-contrast (après migration tokens solid)', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .withRules(['color-contrast'])
      .analyze()

    expect(
      results.violations,
      results.violations
        .flatMap((v) => v.nodes.map((n) => `${v.id} @ ${n.target.join(' ')}: ${n.failureSummary}`))
        .join('\n'),
    ).toEqual([])
  })

  test('metadata SEO présente et cohérente', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Mossine Digital/)

    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toBeTruthy()
    expect((description ?? '').length).toBeGreaterThan(50)

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toMatch(/^https?:\/\//)

    // JSON-LD : 2 nœuds attendus dans layout.tsx — LocalBusiness (NAP + horaires)
    // et WebSite (référencé par @id). L'ordre du DOM ne doit pas être vérouillé
    // en dur car il peut changer selon l'ordre d'injection dans <head>.
    const ldJsonBlocks = await page.locator('script[type="application/ld+json"]').allTextContents()
    const joined = ldJsonBlocks.join('\n')
    expect(joined).toContain('LocalBusiness')
    expect(joined).toContain('WebSite')
  })
})
