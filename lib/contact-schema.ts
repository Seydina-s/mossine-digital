import { z } from 'zod'

// ─────────────────────────────────────────────────────────────────
//  Schéma Zod — partagé client & serveur.
//  Validation stricte : longueurs, formats, enums figés.
// ─────────────────────────────────────────────────────────────────

export const SERVICE_OPTIONS = [
  { value: 'identite',  label: 'Identité visuelle & Branding' },
  { value: 'web',       label: 'Création de site web' },
  { value: 'social',    label: 'Community Management' },
  { value: 'ads',       label: 'Campagnes Ads' },
  { value: 'seo',       label: 'SEO & SEA' },
  { value: 'strategie', label: 'Stratégie communication & marketing digitale' },
  { value: 'autre',     label: 'Autre / Je ne sais pas encore' },
] as const

// Fourchettes budgétaires en Franc CFA (XOF) — marché sénégalais.
// Les clés `value` reflètent l'ordre de grandeur (k = mille, m = million)
// → stables dans le temps même si les seuils humains évoluent.
export const BUDGET_OPTIONS = [
  { value: 'under-500k',  label: 'Moins de 500 000 FCFA' },
  { value: '500k-2m',     label: '500 000 — 2 000 000 FCFA' },
  { value: '2m-5m',       label: '2 000 000 — 5 000 000 FCFA' },
  { value: '5m-10m',      label: '5 000 000 — 10 000 000 FCFA' },
  { value: '10m-plus',    label: 'Plus de 10 000 000 FCFA' },
  { value: 'undefined',   label: 'À définir ensemble' },
] as const

const serviceValues = SERVICE_OPTIONS.map((o) => o.value) as [
  (typeof SERVICE_OPTIONS)[number]['value'],
  ...(typeof SERVICE_OPTIONS)[number]['value'][],
]
const budgetValues = BUDGET_OPTIONS.map((o) => o.value) as [
  (typeof BUDGET_OPTIONS)[number]['value'],
  ...(typeof BUDGET_OPTIONS)[number]['value'][],
]

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Votre nom doit contenir au moins 2 caractères.')
    .max(80, 'Nom trop long.'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Adresse email invalide.')
    .max(120, 'Email trop long.'),
  phone: z
    .string()
    .trim()
    .max(30, 'Téléphone trop long.')
    .optional()
    .or(z.literal('')),
  company: z
    .string()
    .trim()
    .max(100, 'Nom d\'entreprise trop long.')
    .optional()
    .or(z.literal('')),
  service: z.enum(serviceValues, {
    message: 'Merci de sélectionner un service.',
  }),
  budget: z.enum(budgetValues).optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(20, 'Votre message doit contenir au moins 20 caractères.')
    .max(4000, 'Message trop long (4 000 caractères max).'),
  // Honeypot — doit rester vide (piège à bots)
  website: z.string().max(0).optional().or(z.literal('')),
  // Consentement RGPD
  consent: z.literal('on', {
    message: 'Vous devez accepter la politique de confidentialité.',
  }),
})

export type ContactPayload = z.infer<typeof contactSchema>
