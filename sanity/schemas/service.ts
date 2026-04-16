import { defineField, defineType } from 'sanity'

// ─────────────────────────────────────────────────────────────────
//  Schéma — Service
//  Miroir du type `ServiceDetail` de `lib/services-data.ts`. Pour
//  l'instant la page /services est alimentée par le fichier TS (source
//  de vérité validée par le typage). Ce schéma existe pour préparer
//  une migration future vers Sanity si le client veut éditer lui-même.
//
//  🛡️ iconKey : union fermée côté front (`ServiceIconKey`). Ici on
//  l'expose comme enum `options.list` → le client ne peut choisir
//  qu'une valeur connue du map `SERVICE_ICON_MAP`.
// ─────────────────────────────────────────────────────────────────

const ICON_KEYS = [
  { title: 'Palette (branding)', value: 'palette' },
  { title: 'Globe (web)', value: 'globe' },
  { title: 'Chat (community)', value: 'chat' },
  { title: 'Megaphone (ads)', value: 'megaphone' },
  { title: 'Loupe (SEO)', value: 'magnifier' },
  { title: 'Graphique (stratégie)', value: 'chart' },
] as const

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Plus petit = affiché en premier (01, 02, 03…).',
      validation: (r) => r.required().integer().min(1),
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (r) => r.required().min(5).max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 40 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow (ex. "Identité · Branding")',
      type: 'string',
      validation: (r) => r.required().max(40),
    }),
    defineField({
      name: 'navLabel',
      title: 'Libellé de navigation (court)',
      type: 'string',
      description: 'Utilisé dans la table des matières du hero /services.',
      validation: (r) => r.required().max(20),
    }),
    defineField({
      name: 'problem',
      title: 'Problem statement (accroche éditoriale)',
      type: 'text',
      rows: 2,
      validation: (r) => r.required().min(40).max(240),
    }),
    defineField({
      name: 'promise',
      title: 'Promesse Mossine',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().min(60).max(320),
    }),
    defineField({
      name: 'approach',
      title: 'Approche (3 à 5 points)',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (r) => r.required().min(3).max(6),
    }),
    defineField({
      name: 'deliverables',
      title: 'Livrables concrets',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (r) => r.required().min(3).max(8),
    }),
    defineField({
      name: 'timeline',
      title: 'Délai (ex. "3 à 5 semaines")',
      type: 'string',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: 'image',
      title: 'Image d\'illustration',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt (a11y)' },
      ],
    }),
    defineField({
      name: 'iconKey',
      title: 'Icône (clé)',
      type: 'string',
      options: {
        list: ICON_KEYS.map((k) => ({ title: k.title, value: k.value })),
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'accent',
      title: 'Couleur d\'accent (hex)',
      type: 'string',
      options: {
        list: [
          { title: 'Bleu (#35A7FF)', value: '#35A7FF' },
          { title: 'Rouge (#FF5964)', value: '#FF5964' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'flagship',
      title: 'Offre signature (flagship)',
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
      title: 'Ordre personnalisé',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
      order: 'order',
      media: 'image',
    },
    prepare({ title, subtitle, order, media }) {
      return {
        title: `${String(order ?? 0).padStart(2, '0')} — ${title}`,
        subtitle,
        media,
      }
    },
  },
})
