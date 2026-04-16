// ─────────────────────────────────────────────────────────────────
//  Constantes & types partagés — animations Framer Motion et CSS.
//  Utilise cubic-bezier(0.22, 1, 0.36, 1) : décélération rapide douce
//  (aussi appelé "ease-out-quart expressif"), cohérent dans tout le site.
// ─────────────────────────────────────────────────────────────────

/** Tuple format pour framer-motion `ease` prop */
export const EASE_OUT_EXPR = [0.22, 1, 0.36, 1] as const

/** String format pour CSS `transition-timing-function` */
export const EASE_CSS = 'cubic-bezier(0.22, 1, 0.36, 1)'
