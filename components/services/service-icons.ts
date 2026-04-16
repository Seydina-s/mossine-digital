// ─────────────────────────────────────────────────────────────────
//  service-icons.ts — résolution des icônes Phosphor par clé.
//
//  🛡️ Vaccin RSC : ce module contient des composants React (non
//  sérialisables). Il ne doit JAMAIS être importé depuis `lib/` ou
//  depuis des données qui traversent la frontière server → client.
//  Il est réservé aux composants clients (`'use client'`) qui
//  consomment `ServiceDetail` et ont besoin de rendre l'icône
//  associée à un `iconKey`.
//
//  Le type `Record<ServiceIconKey, PhosphorIcon>` force la
//  complétude : toute nouvelle clé ajoutée à `ServiceIconKey`
//  (dans lib/services-data.ts) sans entrée ici = build cassée.
// ─────────────────────────────────────────────────────────────────

import {
  PaletteIcon,
  GlobeIcon,
  ChatCircleDotsIcon,
  MegaphoneSimpleIcon,
  MagnifyingGlassIcon,
  ChartLineUpIcon,
} from '@phosphor-icons/react'
import type { PhosphorIcon } from '@/lib/types'
import type { ServiceIconKey } from '@/lib/services-data'

export const SERVICE_ICON_MAP: Record<ServiceIconKey, PhosphorIcon> = {
  palette: PaletteIcon,
  globe: GlobeIcon,
  chat: ChatCircleDotsIcon,
  megaphone: MegaphoneSimpleIcon,
  magnifier: MagnifyingGlassIcon,
  chart: ChartLineUpIcon,
}
