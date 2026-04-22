import { describe, it, expect } from 'vitest'
import { contactSchema, SERVICE_OPTIONS, BUDGET_OPTIONS } from '@/lib/contact-schema'

// Payload valide minimal — sert de base à chaque test par override.
const validPayload = {
  name: 'Aïcha Diouf',
  email: 'aicha@example.sn',
  phone: '+221 77 123 45 67',
  company: 'Mossine Digital',
  service: 'strategie',
  budget: '2m-5m',
  message:
    'Bonjour, nous cherchons une agence pour refondre notre présence digitale — 20 caractères minimum ici.',
  website: '',
  consent: 'on',
} as const

describe('contactSchema — happy path', () => {
  it('accepte un payload complet valide', () => {
    const result = contactSchema.safeParse(validPayload)
    expect(result.success).toBe(true)
  })

  it('accepte un payload minimal (champs optionnels vides)', () => {
    const result = contactSchema.safeParse({
      name: 'Ibrahima',
      email: 'test@example.com',
      phone: '',
      company: '',
      service: 'web',
      budget: '',
      message: 'Message de test avec assez de caractères pour passer la validation minimale.',
      website: '',
      consent: 'on',
    })
    expect(result.success).toBe(true)
  })

  it('normalise l\'email en minuscules + trim', () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      email: '  AICHA@Example.SN  ',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.email).toBe('aicha@example.sn')
    }
  })

  it('trim les champs texte (name, message)', () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      name: '  Aïcha Diouf  ',
      message: '  ' + validPayload.message + '  ',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('Aïcha Diouf')
      expect(result.data.message.startsWith('Bonjour')).toBe(true)
      expect(result.data.message.endsWith('ici.')).toBe(true)
    }
  })
})

describe('contactSchema — champ name', () => {
  it('rejette un nom de moins de 2 caractères', () => {
    const result = contactSchema.safeParse({ ...validPayload, name: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejette un nom vide après trim', () => {
    const result = contactSchema.safeParse({ ...validPayload, name: '   ' })
    expect(result.success).toBe(false)
  })

  it('rejette un nom de plus de 80 caractères', () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      name: 'A'.repeat(81),
    })
    expect(result.success).toBe(false)
  })
})

describe('contactSchema — champ email', () => {
  it('rejette un email mal formé', () => {
    const result = contactSchema.safeParse({ ...validPayload, email: 'pas-un-email' })
    expect(result.success).toBe(false)
  })

  it('rejette un email avec espaces uniquement', () => {
    const result = contactSchema.safeParse({ ...validPayload, email: '   ' })
    expect(result.success).toBe(false)
  })

  it('rejette un email de plus de 120 caractères', () => {
    const longLocal = 'a'.repeat(115)
    const result = contactSchema.safeParse({
      ...validPayload,
      email: `${longLocal}@e.com`,
    })
    expect(result.success).toBe(false)
  })
})

describe('contactSchema — champ service (enum)', () => {
  it('accepte toutes les valeurs listées dans SERVICE_OPTIONS', () => {
    for (const option of SERVICE_OPTIONS) {
      const result = contactSchema.safeParse({
        ...validPayload,
        service: option.value,
      })
      expect(result.success, `service=${option.value}`).toBe(true)
    }
  })

  it('rejette un service hors enum', () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      service: 'inexistant',
    })
    expect(result.success).toBe(false)
  })

  it('rejette un service vide', () => {
    const result = contactSchema.safeParse({ ...validPayload, service: '' })
    expect(result.success).toBe(false)
  })
})

describe('contactSchema — champ budget (optionnel)', () => {
  it('accepte toutes les valeurs listées dans BUDGET_OPTIONS', () => {
    for (const option of BUDGET_OPTIONS) {
      const result = contactSchema.safeParse({
        ...validPayload,
        budget: option.value,
      })
      expect(result.success, `budget=${option.value}`).toBe(true)
    }
  })

  it('accepte une string vide', () => {
    const result = contactSchema.safeParse({ ...validPayload, budget: '' })
    expect(result.success).toBe(true)
  })

  it('rejette un budget hors enum', () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      budget: 'gratuit',
    })
    expect(result.success).toBe(false)
  })
})

describe('contactSchema — champ message', () => {
  it('rejette un message de moins de 3 caractères', () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      message: 'ab',
    })
    expect(result.success).toBe(false)
  })

  it('rejette un message de plus de 4000 caractères', () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      message: 'a'.repeat(4001),
    })
    expect(result.success).toBe(false)
  })

  it('accepte exactement 3 caractères', () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      message: 'abc',
    })
    expect(result.success).toBe(true)
  })
})

describe('contactSchema — honeypot (website)', () => {
  it('accepte un honeypot vide (humain)', () => {
    const result = contactSchema.safeParse({ ...validPayload, website: '' })
    expect(result.success).toBe(true)
  })

  it('accepte un honeypot undefined (humain sans champ)', () => {
    const { website: _w, ...rest } = validPayload
    void _w
    const result = contactSchema.safeParse(rest)
    expect(result.success).toBe(true)
  })

  it('rejette un honeypot rempli (bot détecté)', () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      website: 'https://spam.example',
    })
    expect(result.success).toBe(false)
  })
})

describe('contactSchema — consentement RGPD', () => {
  it("accepte la valeur 'on' (case native checkbox)", () => {
    const result = contactSchema.safeParse({ ...validPayload, consent: 'on' })
    expect(result.success).toBe(true)
  })

  it('rejette un consentement manquant', () => {
    const { consent: _c, ...rest } = validPayload
    void _c
    const result = contactSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it('rejette un consentement à false/autre valeur', () => {
    const result = contactSchema.safeParse({ ...validPayload, consent: 'off' })
    expect(result.success).toBe(false)
  })
})
