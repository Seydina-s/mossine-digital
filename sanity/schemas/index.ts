import type { SchemaTypeDefinition } from 'sanity'

import { article } from './article'
import { author } from './author'
import { category } from './category'
import { faq } from './faq'
import { portfolio } from './portfolio'
import { service } from './service'
import { temoignage } from './temoignage'
import { seo } from './objects/seo'

// ─────────────────────────────────────────────────────────────────
//  Agrégation des schémas — ordre = ordre d'affichage dans le Studio
//  (documents d'abord, objets réutilisables ensuite).
// ─────────────────────────────────────────────────────────────────

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  article,
  portfolio,
  service,
  temoignage,
  faq,
  author,
  category,
  // Objets réutilisables
  seo,
]
