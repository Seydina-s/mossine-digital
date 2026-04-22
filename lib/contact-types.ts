// ─────────────────────────────────────────────────────────────────
//  lib/contact-types.ts — Types partagés client/serveur pour le
//  formulaire de contact.
//
//  ⚠️ Pourquoi un fichier dédié : `app/contact/actions.ts` est un
//  fichier `'use server'` qui ne peut exporter QUE des async
//  functions (Next.js 15+). Exporter un type/interface depuis ce
//  fichier est risqué (Turbopack peut parfois l'interpréter comme
//  runtime export malgré le stripping TS). On isole donc les types
//  ici pour garantir 0 risque de régression build.
// ─────────────────────────────────────────────────────────────────

export interface ContactActionState {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Partial<Record<string, string>>
}

export const INITIAL_CONTACT_STATE: ContactActionState = { status: 'idle' }
