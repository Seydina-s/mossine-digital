// ─────────────────────────────────────────────────────────────────
//  sanity.config.ts — configuration du Studio Sanity embed /studio
//
//  ⚠️ Ce fichier est lu par :
//    - L'embed Next.js (`app/studio/[[...tool]]/page.tsx`)
//    - Le CLI Sanity (`npx sanity deploy`, `npx sanity manage`)
//  Il DOIT donc tolérer un `projectId` vide au chargement — la
//  validation réelle se fait au runtime du Studio.
// ─────────────────────────────────────────────────────────────────

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  name: 'mossine-digital',
  title: 'Mossine Digital — Studio',

  // Fallback `placeholder` → le Studio affichera une erreur lisible
  // si l'utilisateur tente de se connecter sans projectId configuré.
  projectId: projectId || 'placeholder',
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool(),
    // Vision = playground GROQ, utile en dev uniquement.
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },
})
