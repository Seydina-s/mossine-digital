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

  // Dette palette "secondary as text" résolue via `--md-secondary-text: #0E70C8`
  // (branche feat/md-secondary-text).
  // Dette résiduelle : Services stacking cards themed (#35A7FF bg + white text = 2.58:1)
  // et CTA accent (#FF5964 bg + white text = 3.05:1). Demande rebranding ou texte assombri.
  // Doc : .claude/session/AUDIT_OWASP.md §Dette palette + Services themed.
  test.fixme('a11y color-contrast (dette themed cards + accent CTA)', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .withRules(['color-contrast'])
      .analyze()

    expect(results.violations).toEqual([])
  })

  test('metadata SEO présente et cohérente', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Mossine Digital/)

    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toBeTruthy()
    expect((description ?? '').length).toBeGreaterThan(50)

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toMatch(/^https?:\/\//)

    // JSON-LD WebSite schema attendu (layout.tsx).
    const ldJson = await page.locator('script[type="application/ld+json"]').first().textContent()
    expect(ldJson).toContain('WebSite')
  })
})
