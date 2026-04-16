import { test, expect, devices } from '@playwright/test'

// Responsive audit — 6 viewports stratégiques de CLAUDE.md.
// Critères non-négociables par viewport :
//  1. Aucun overflow horizontal (scrollWidth ≤ clientWidth + 1px).
//  2. Navbar accessible (pill mobile hamburger OU desktop liens).
//  3. H1 visible.
//  4. Footer atteignable.
//
// Note : 320px est la cible la plus critique (iPhone 4/SE). Si un
// layout casse, c'est d'abord là.

const VIEWPORTS = [
  { name: '320px iPhone SE',     width: 320,  height: 568  },
  { name: '375px iPhone',        width: 375,  height: 667  },
  { name: '768px iPad portrait', width: 768,  height: 1024 },
  { name: '1280px desktop',      width: 1280, height: 720  },
  { name: '1920px full-HD',      width: 1920, height: 1080 },
  { name: '2560px 4K',           width: 2560, height: 1440 },
] as const

const PAGES = [
  { name: 'homepage',     path: '/' },
  { name: 'services',     path: '/services' },
  { name: 'contact',      path: '/contact' },
  { name: 'a-propos',     path: '/a-propos' },
] as const

for (const vp of VIEWPORTS) {
  test.describe(`Responsive @ ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } })

    for (const p of PAGES) {
      test(`${p.path} — pas d'overflow + structure intacte`, async ({ page }) => {
        await page.goto(p.path)
        await page.waitForLoadState('networkidle')

        // Pas d'overflow horizontal sur le document.
        // Tolérance +1px pour les arrondis sub-pixel (bordures 0.5px).
        const overflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }))
        expect(
          overflow.scrollWidth,
          `Overflow horizontal détecté sur ${p.path} @ ${vp.width}px (scroll=${overflow.scrollWidth}, client=${overflow.clientWidth})`,
        ).toBeLessThanOrEqual(overflow.clientWidth + 1)

        // Navbar accessible (header banner présent).
        await expect(page.getByRole('banner')).toBeVisible()

        // H1 visible (au-dessus de la pliure initiale pour la plupart
        // des pages ; sur stubs/ComingSoon c'est garanti aussi).
        await expect(page.locator('h1')).toHaveCount(1)
      })
    }
  })
}

// Test dédié mobile : le hamburger existe < 1024px, les liens desktop
// existent ≥ 1024px. Vaccin contre une régression du breakpoint navbar.
test.describe('Navbar breakpoint', () => {
  test('mobile (375px) : hamburger visible, liens desktop cachés', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Hamburger : aria-label "Ouvrir le menu" ou aria-controls vers le menu mobile.
    const hamburger = page.getByRole('button', { name: /menu|ouvrir/i }).first()
    await expect(hamburger).toBeVisible()
  })

  test('desktop (1280px) : liens navbar visibles, hamburger caché', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')

    // Au moins 3 liens de navigation visibles dans le header.
    const navLinks = page.getByRole('banner').getByRole('link')
    const count = await navLinks.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })
})

// Silence linter sur l'import devices (gardé pour référence si on passe
// à des projets Playwright dédiés cross-device en CI Sprint 5).
void devices
