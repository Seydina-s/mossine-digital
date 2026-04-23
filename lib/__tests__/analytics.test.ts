// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { track } from '../analytics'

// ─────────────────────────────────────────────────────────────────
//  Tests du helper `track()` — garantit que :
//   1. Un appel pousse bien l'event dans window.dataLayer
//   2. Le dataLayer est créé si absent (GTM pas encore chargé)
//   3. Appels successifs accumulent dans le bon ordre
//   4. Aucune exception côté serveur (pas de window)
//
//  Vaccin : ce helper est la seule porte d'entrée analytics du site.
//  S'il casse silencieusement, on perd TOUTES les conversions.
// ─────────────────────────────────────────────────────────────────

describe('lib/analytics — track()', () => {
  beforeEach(() => {
    // Reset dataLayer entre chaque test — évite la contamination.
    window.dataLayer = undefined
  })

  it('pousse l\'event form_submit_success dans window.dataLayer', () => {
    track({
      event: 'form_submit_success',
      form_id: 'contact',
      service: 'branding',
      budget: '5-10k',
    })

    expect(window.dataLayer).toBeDefined()
    expect(window.dataLayer).toHaveLength(1)
    expect(window.dataLayer?.[0]).toEqual({
      event: 'form_submit_success',
      form_id: 'contact',
      service: 'branding',
      budget: '5-10k',
    })
  })

  it('crée le dataLayer s\'il n\'existe pas encore (GTM pas chargé)', () => {
    expect(window.dataLayer).toBeUndefined()

    track({ event: 'cta_click', cta_label: 'Démarrer', cta_location: 'hero', cta_destination: '/contact' })

    expect(window.dataLayer).toBeInstanceOf(Array)
    expect(window.dataLayer).toHaveLength(1)
  })

  it('respecte l\'ordre d\'insertion sur appels successifs', () => {
    track({ event: 'cta_click', cta_label: 'A', cta_location: 'hero', cta_destination: '/contact' })
    track({ event: 'cta_click', cta_label: 'B', cta_location: 'navbar_desktop', cta_destination: '/contact' })
    track({ event: 'scroll_depth', percent: 50, page_path: '/' })

    expect(window.dataLayer).toHaveLength(3)
    expect(window.dataLayer?.[0]).toMatchObject({ cta_label: 'A' })
    expect(window.dataLayer?.[1]).toMatchObject({ cta_label: 'B' })
    expect(window.dataLayer?.[2]).toMatchObject({ event: 'scroll_depth' })
  })

  it('préserve un dataLayer pré-existant (GTM déjà initialisé)', () => {
    // Simule GTM qui a déjà poussé son event de démarrage.
    window.dataLayer = [{ 'gtm.start': 1234567890, event: 'gtm.js' }]

    track({ event: 'form_submit_error', form_id: 'contact', reason: 'validation' })

    expect(window.dataLayer).toHaveLength(2)
    expect(window.dataLayer[0]).toMatchObject({ event: 'gtm.js' })
    expect(window.dataLayer[1]).toMatchObject({ event: 'form_submit_error' })
  })

  it('no-op côté serveur (typeof window === "undefined")', () => {
    const originalWindow = globalThis.window
    // @ts-expect-error — on simule l'environnement serveur
    delete globalThis.window

    expect(() => {
      track({ event: 'cta_click', cta_label: 'X', cta_location: 'footer', cta_destination: '/' })
    }).not.toThrow()

    globalThis.window = originalWindow
  })

  it('accepte les events scroll_depth avec les 4 paliers valides', () => {
    const percents = [25, 50, 75, 100] as const
    for (const p of percents) {
      track({ event: 'scroll_depth', percent: p, page_path: '/services' })
    }
    expect(window.dataLayer).toHaveLength(4)
    const percentsRecorded = window.dataLayer?.map(
      (item) => (item as { percent: number }).percent,
    )
    expect(percentsRecorded).toEqual([25, 50, 75, 100])
  })
})

// Garde-fou : `track()` étant le seul chemin d'écriture dans dataLayer,
// si son export disparaît ou change de signature, TypeScript casse AVANT
// que ce test tourne. Mais on vérifie quand même que c'est exporté.
describe('lib/analytics — exports', () => {
  it('expose la fonction track', () => {
    expect(typeof track).toBe('function')
  })
})

// Silence un potentiel warning console côté JSDOM quand on manipule window.
vi.spyOn(console, 'error').mockImplementation(() => {})
