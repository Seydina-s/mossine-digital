import { defineField, defineType } from 'sanity'

// ─────────────────────────────────────────────────────────────────
//  Schéma — Author
//  Signé en bas d'un article (ref from article.author).
// ─────────────────────────────────────────────────────────────────

export const author = defineType({
  name: 'author',
  title: 'Auteur',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      validation: (r) => r.required().min(2).max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle / Fonction',
      type: 'string',
      description: 'Ex : Directeur de création, Stratège digital…',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio courte',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(280),
    }),
    defineField({
      name: 'linkedin',
      title: 'URL LinkedIn',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'image' },
  },
})
