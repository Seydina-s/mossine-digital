import { defineField, defineType } from 'sanity'

// ─────────────────────────────────────────────────────────────────
//  Schéma — Témoignage client
//  Utilisé en standalone (section Témoignages homepage) OU via
//  référence (portfolio.testimonial).
// ─────────────────────────────────────────────────────────────────

export const temoignage = defineType({
  name: 'temoignage',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de la personne',
      type: 'string',
      validation: (r) => r.required().min(2).max(80),
    }),
    defineField({
      name: 'role',
      title: 'Fonction',
      type: 'string',
      description: 'Ex : Directrice Marketing, Fondateur…',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: 'company',
      title: 'Entreprise / Organisation',
      type: 'string',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: 'avatar',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Format carré idéalement (300x300 min).',
      fields: [
        { name: 'alt', type: 'string', title: 'Alt (a11y)' },
      ],
    }),
    defineField({
      name: 'quote',
      title: 'Verbatim',
      type: 'text',
      rows: 5,
      validation: (r) => r.required().min(60).max(600),
    }),
    defineField({
      name: 'rating',
      title: 'Note /5',
      type: 'number',
      validation: (r) => r.required().integer().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'projectType',
      title: 'Type de projet (libellé libre)',
      type: 'string',
      description: 'Ex : "Refonte branding", "Lancement landing"',
    }),
    defineField({
      name: 'featured',
      title: 'À la une (homepage)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Plus petit = affiché en premier dans le carousel.',
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: 'Ordre personnalisé',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      rating: 'rating',
      media: 'avatar',
    },
    prepare({ title, subtitle, rating, media }) {
      return {
        title,
        subtitle: `${subtitle ?? ''} · ${'★'.repeat(rating ?? 0)}`,
        media,
      }
    },
  },
})
