import { defineField, defineType } from 'sanity'

// ─────────────────────────────────────────────────────────────────
//  Schéma — FAQ
//  Catégorisée (services, général, contact) pour filtrer selon la
//  page où on l'affiche. La page /services a déjà ses FAQ hardcodées
//  dans `lib/services-data.ts` — ce schéma est pour les prochaines
//  pages (contact, accueil si besoin) et l'édition client.
// ─────────────────────────────────────────────────────────────────

const FAQ_CATEGORIES = [
  { title: 'Général', value: 'general' },
  { title: 'Services', value: 'services' },
  { title: 'Tarifs & délais', value: 'pricing' },
  { title: 'Contact & collaboration', value: 'contact' },
] as const

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (r) => r.required().min(10).max(200),
    }),
    defineField({
      name: 'answer',
      title: 'Réponse',
      type: 'text',
      rows: 5,
      validation: (r) => r.required().min(30).max(1000),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: FAQ_CATEGORIES.map((c) => ({ title: c.title, value: c.value })),
        layout: 'radio',
      },
      validation: (r) => r.required(),
      initialValue: 'general',
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Plus petit = affiché en premier dans la liste.',
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: 'Catégorie puis ordre',
      name: 'categoryThenOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
    prepare({ title, subtitle }) {
      const cat = FAQ_CATEGORIES.find((c) => c.value === subtitle)
      return {
        title,
        subtitle: cat?.title ?? subtitle,
      }
    },
  },
})
