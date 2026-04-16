import { defineConfig } from 'vitest/config'
import path from 'path'

// ─────────────────────────────────────────────────────────────────
//  vitest.config.ts — configuration des tests unitaires Mossine.
//
//  - Environnement node par défaut (tests schémas / utilitaires)
//  - Environnement jsdom sur les fichiers .dom.test.* (composants React)
//  - Alias @/ → racine projet (miroir de tsconfig.json)
// ─────────────────────────────────────────────────────────────────

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    environment: 'node',
    environmentMatchGlobs: [
      ['**/*.dom.test.{ts,tsx}', 'jsdom'],
    ],
    globals: true,
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules/**', '.next/**', 'sanity/dist/**'],
  },
})
