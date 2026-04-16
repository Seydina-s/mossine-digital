import { defineField, defineType } from 'sanity'

// ─────────────────────────────────────────────────────────────────
//  Objet SEO — réutilisable sur article, portfolio, service.
//  Override des metadata par défaut ; tous les champs sont optionnels.
// ─────────────────────────────────────────────────────────────────

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title (50-60 car.)',
      type: 'string',
      validation: (r) => r.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description (140-160 car.)',
      type: 'text',
      rows: 2,
      validation: (r) => r.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Image Open Graph (1200x630)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'noIndex',
      title: 'Exclure de l\'indexation (noindex)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  options: { collapsible: true, collapsed: true },
})
