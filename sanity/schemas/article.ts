import { defineField, defineType } from 'sanity'

// ─────────────────────────────────────────────────────────────────
//  Schéma — Article de blog
//  Structure éditoriale : titre, excerpt, image cover, body riche
//  (PortableText), auteur + catégorie en réf, tags, SEO overrides.
// ─────────────────────────────────────────────────────────────────

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (r) => r.required().min(10).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Accroche (140-200 car.)',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().min(80).max(220),
      description:
        "Résumé affiché en liste + utilisé comme meta description par défaut.",
    }),
    defineField({
      name: 'cover',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif (a11y)',
          type: 'string',
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (r) => r.required(),
                  },
                  {
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Ouvrir dans un nouvel onglet',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
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
        {
          type: 'object',
          name: 'callout',
          title: 'Encadré',
          fields: [
            {
              name: 'tone',
              type: 'string',
              title: 'Ton',
              options: {
                list: [
                  { title: 'Info', value: 'info' },
                  { title: 'Succès', value: 'success' },
                  { title: 'Attention', value: 'warning' },
                ],
                layout: 'radio',
              },
              initialValue: 'info',
            },
            { name: 'content', type: 'text', title: 'Contenu', rows: 3 },
          ],
        },
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      validation: (r) => r.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'featured',
      title: 'Article à la une',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Date de publication (récent → ancien)',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author.name',
      media: 'cover',
      date: 'publishedAt',
    },
    prepare({ title, subtitle, media, date }) {
      const when = date
        ? new Date(date).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        : 'Non publié'
      return {
        title,
        subtitle: `${subtitle ?? '—'} · ${when}`,
        media,
      }
    },
  },
})
