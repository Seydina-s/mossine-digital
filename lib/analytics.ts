// ─────────────────────────────────────────────────────────────────
//  lib/analytics.ts — helper typé pour pousser des events vers GTM
//
//  Principe : toute la telemetry métier passe par `track()` qui écrit
//  dans `window.dataLayer`. GTM (via son conteneur) consomme ces events
//  et les redistribue vers GA4 / Meta Pixel / Google Ads sans qu'on
//  ait à toucher au code.
//
//  Contraintes :
//   - Typed end-to-end : discriminated union sur `event` → impossible
//     d'envoyer un payload qui ne matche pas son event.
//   - SSR-safe : `track()` ne fait rien côté serveur (pas de window).
//   - Zéro config : si GTM n'est pas chargé, `window.dataLayer` est
//     créé vide par ce helper — les events s'accumulent et seront
//     traités dès que GTM arrive (comportement natif GTM).
//   - RGPD : aucune PII dans les payloads. Les events sont déclenchés
//     librement — c'est GTM qui filtre par `Consent Mode` côté UI.
// ─────────────────────────────────────────────────────────────────

// ─── Catalogue d'events stratégiques Mossine ─────────────────────
// Ajouter un nouvel event = étendre cette union. TypeScript force
// tous les call-sites à fournir le bon payload.

export type AnalyticsEvent =
  | {
      event: 'form_submit_success'
      form_id: 'contact'
      service?: string
      budget?: string
    }
  | {
      event: 'form_submit_error'
      form_id: 'contact'
      reason: 'validation' | 'hcaptcha' | 'rate_limit' | 'resend' | 'unknown'
    }
  | {
      event: 'cta_click'
      cta_label: string
      cta_location: 'hero' | 'navbar_desktop' | 'navbar_mobile' | 'cta_final' | 'footer' | 'service_detail'
      cta_destination: string
    }
  | {
      event: 'scroll_depth'
      percent: 25 | 50 | 75 | 100
      page_path: string
    }

// ─── Implémentation ──────────────────────────────────────────────

type DataLayerItem = AnalyticsEvent | Record<string, unknown>

declare global {
  interface Window {
    dataLayer?: DataLayerItem[]
  }
}

/**
 * Pousse un event typé vers le dataLayer GTM.
 * No-op côté serveur et si l'environnement ne supporte pas window.
 */
export function track(payload: AnalyticsEvent): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(payload)
}
