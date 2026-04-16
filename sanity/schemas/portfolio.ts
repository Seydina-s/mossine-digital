import { defineField, defineType } from 'sanity'

// ─────────────────────────────────────────────────────────────────
//  Schéma — Portfolio (étude de cas / réalisation)
//  Structure : hero + contexte + services mobilisés + galerie +
//  résultats chiffrés + témoignage client optionnel.
// ─────────────────────────────────────────────────────────────────

export const portfolio = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du projet',
      type: 'string',
      validation: (r) => r.required().min(3).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'client',
      title: 'Nom du client',
      type: 'string',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: 'sector',
      title: 'Secteur d\'activité',
      type: 'string',
      description: 'Ex : ONG santé, Tech B2B, Mode, Hôtellerie…',
    }),
    defineField({
      name: 'year',
      title: 'Année de livraison',
      type: 'number',
      validation: (r) => r.required().integer().min(2015).max(2100),
    }),
    defineField({
      name: 'summary',
      title: 'Résumé (accroche liste)',
      type: 'text',
      rows: 2,
      validation: (r) => r.required().min(60).max(240),
    }),
    defineField({
      name: 'cover',
      title: 'Image de couverture (vignette liste)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt (a11y)',
          validation: (r) => r.required(),
        },
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'services',
      title: 'Services mobilisés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'context',
      title: 'Contexte & enjeux',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Pourquoi ce projet, quels étaient les enjeux.',
    }),
    defineField({
      name: 'approach',
      title: 'Approche retenue',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie visuelle',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt (a11y)',
              validation: (r) => r.required(),
            },
            { name: 'caption', type: 'string', title: 'Légende' },
          ],
        },
      ],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'results',
      title: 'Résultats chiffrés',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              type: 'string',
              title: 'Valeur (ex. "+230 %")',
              validation: (r) => r.required(),
            },
            {
              name: 'label',
              type: 'string',
              title: 'Libellé (ex. "trafic organique")',
              validation: (r) => r.required(),
            },
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
      validation: (r) => r.max(6),
    }),
    defineField({
      name: 'testimonial',
      title: 'Témoignage client (optionnel)',
      type: 'reference',
      to: [{ type: 'temoignage' }],
    }),
    defineField({
      name: 'liveUrl',
      title: 'Lien vers le projet en ligne',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Mettre en avant',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de mise en ligne',
      type: 'datetime',
      validation: (r) => r.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Date récente en premier',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Année (récent → ancien)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      year: 'year',
      media: 'cover',
    },
    prepare({ title, subtitle, year, media }) {
      return {
        title,
        subtitle: `${subtitle ?? '—'} · ${year ?? '—'}`,
        media,
      }
    },
  },
})
