// ─────────────────────────────────────────────────────────────────
//  sanity.cli.ts — configuration du CLI Sanity
//  Utilisé par `npx sanity <command>` (deploy, dataset export, etc.).
// ─────────────────────────────────────────────────────────────────

import { defineCliConfig } from 'sanity/cli'
import { dataset, projectId } from './sanity/env'

export default defineCliConfig({
  api: {
    projectId: projectId || 'placeholder',
    dataset,
  },
  /** Désactive l'auto-update du CLI pour des builds CI reproductibles. */
  autoUpdates: false,
})
