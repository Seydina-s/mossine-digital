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
    // Par défaut en Node (tests schémas / utilitaires). Pour les tests de
    // composants React, créer un fichier *.dom.test.tsx avec la directive
    // `// @vitest-environment jsdom` en tête de fichier (Vitest 4 a retiré
    // `environmentMatchGlobs` — remplacé par directives par fichier).
    environment: 'node',
    globals: true,
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules/**', '.next/**', 'sanity/dist/**', 'e2e/**'],
  },
})
