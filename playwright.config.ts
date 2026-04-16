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
//  Navigateurs : chromium seul en local (cross-browser déféré au CI
//  Sprint 5 pour ne pas alourdir l'environnement dev).
// ─────────────────────────────────────────────────────────────────

const PORT = 3000
const BASE_URL = `http://localhost:${PORT}`

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

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
