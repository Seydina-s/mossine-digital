import createImageUrlBuilder, {
  type SanityImageSource,
} from '@sanity/image-url'
import { dataset, projectId } from './env'

// ─────────────────────────────────────────────────────────────────
//  sanity/image.ts — builder d'URL d'image Sanity
//
//  Utilisation côté server component (ou client component,
//  `createImageUrlBuilder` est isomorphe) :
//
//      import { urlForImage } from '@/sanity/image'
//      const src = urlForImage(doc.cover).width(1200).height(630).url()
//
//  Si `projectId` est absent, `createImageUrlBuilder` retourne un
//  builder "no-op" qui produit des chaînes vides — évite les crashes
//  pendant que l'env n'est pas encore configuré.
// ─────────────────────────────────────────────────────────────────

const builder = createImageUrlBuilder({
  projectId: projectId || 'placeholder',
  dataset,
})

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max')
}
