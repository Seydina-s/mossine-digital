import { defineConfig, devices } from '@playwright/test'

// ─────────────────────────────────────────────────────────────────
//  playwright.config.ts — E2E + smoke a11y (axe-core).
//
//  Scope : pages complètes (`/`, `/services`, `/contact`) + stubs
//  ComingSoon (`/a-propos`, `/blog`, `/portfolio`).
//
//  Serveur : `next dev` auto-démarré par Playwright. On utilise `dev`
//  et pas `build && start` pour garder le feedback rapide — le CI
//  Sprint 5 passera en build + start pour tester la vraie CSP.
//
//  Navigateurs : chromium par défaut (rapide). Firefox + WebKit activés
//  via `PLAYWRIGHT_CROSS_BROWSER=1` pour les campagnes cross-browser
//  (Sprint 4 QA). Le CI Sprint 5 forcera les trois projets via `CI=1`.
// ─────────────────────────────────────────────────────────────────

const PORT = 3000
const BASE_URL = `http://localhost:${PORT}`

const CROSS_BROWSER =
  !!process.env.CI || process.env.PLAYWRIGHT_CROSS_BROWSER === '1'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: CROSS_BROWSER
    ? [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
      ]
    : [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
