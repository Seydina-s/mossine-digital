import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

// ─────────────────────────────────────────────────────────────────
//  Garde-fou : tout fichier commençant par `'use server'` ne doit
//  exporter QUE des async functions. Next.js 15+ crash en runtime
//  prod avec :
//    Error: A "use server" file can only export async functions,
//    found object.
//
//  Ce test scanne tous les fichiers .ts/.tsx du repo (hors
//  node_modules / .next / tests) et vérifie chaque fichier server-
//  action. Il aurait détecté le bug `export const initialContactState`
//  qui n'apparaît qu'en prod Vercel (pas en `next dev`).
//
//  Couverture :
//    ✅ export async function foo() {}      → OK
//    ✅ export { foo }  (si foo est async)  → OK (heuristique douce)
//    ✅ export type / export interface       → OK (stripped compile-time)
//    ❌ export const X = {}                  → FAIL
//    ❌ export let X = ...                   → FAIL
//    ❌ export function foo() {} (non-async) → FAIL
// ─────────────────────────────────────────────────────────────────

const ROOT = join(__dirname, '..', '..')
const SCAN_DIRS = ['app', 'components', 'lib']
const IGNORE_DIRS = new Set(['node_modules', '.next', '.git', '__tests__'])

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const rel = relative(ROOT, full)
    if (IGNORE_DIRS.has(entry)) continue
    const st = statSync(full)
    if (st.isDirectory()) {
      walk(full, out)
    } else if (/\.(ts|tsx)$/.test(entry) && !rel.includes('__tests__')) {
      out.push(full)
    }
  }
  return out
}

function isUseServerFile(source: string): boolean {
  // Tolère BOM + commentaires avant la directive.
  const stripped = source.replace(/^\uFEFF/, '').trimStart()
  return /^(['"])use server\1\s*;?/.test(stripped)
}

interface BadExport {
  line: number
  snippet: string
  reason: string
}

function findInvalidExports(source: string): BadExport[] {
  const lines = source.split('\n')
  const issues: BadExport[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Skip commentaires.
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) continue

    // OK : export type, export interface, export { type X }.
    if (/^export\s+(type|interface)\s/.test(trimmed)) continue
    if (/^export\s+type\s*\{/.test(trimmed)) continue

    // OK : export async function / export default async function.
    if (/^export\s+(default\s+)?async\s+function\s/.test(trimmed)) continue

    // FAIL : export const / let / var.
    if (/^export\s+(const|let|var)\s/.test(trimmed)) {
      issues.push({
        line: i + 1,
        snippet: trimmed,
        reason: 'export d\'un binding non-fonctionnel (const/let/var) — seul async function est autorisé',
      })
      continue
    }

    // FAIL : export function (non-async).
    if (/^export\s+(default\s+)?function\s/.test(trimmed)) {
      issues.push({
        line: i + 1,
        snippet: trimmed,
        reason: 'export d\'une fonction synchrone — seul async function est autorisé',
      })
      continue
    }

    // FAIL : export { ... } sans type — on ne peut pas garantir que les
    // bindings ré-exportés sont tous async, donc on signale pour review.
    // Exception : export type { ... } déjà matché plus haut.
    if (/^export\s*\{/.test(trimmed) && !/^export\s+type\s*\{/.test(trimmed)) {
      issues.push({
        line: i + 1,
        snippet: trimmed,
        reason: 're-export sans préfixe `type` — vérifier manuellement que tous les bindings sont des async functions, sinon utiliser `export type {}`',
      })
    }
  }

  return issues
}

describe('Server actions — contrainte Next.js `use server`', () => {
  const allFiles: string[] = []
  for (const dir of SCAN_DIRS) {
    const full = join(ROOT, dir)
    try {
      if (statSync(full).isDirectory()) walk(full, allFiles)
    } catch {
      // Dossier inexistant — skip silencieusement.
    }
  }

  const serverFiles = allFiles.filter((f) => {
    try {
      const source = readFileSync(f, 'utf8')
      return isUseServerFile(source)
    } catch {
      return false
    }
  })

  it(`a scanné ${allFiles.length} fichiers TS/TSX`, () => {
    expect(allFiles.length).toBeGreaterThan(0)
  })

  it(`a identifié ${serverFiles.length} fichier(s) 'use server'`, () => {
    // On s'attend à avoir au moins 1 fichier (app/contact/actions.ts).
    expect(serverFiles.length).toBeGreaterThan(0)
  })

  for (const file of serverFiles) {
    const rel = relative(ROOT, file).replaceAll('\\', '/')
    it(`${rel} n'exporte que des async functions`, () => {
      const source = readFileSync(file, 'utf8')
      const issues = findInvalidExports(source)
      if (issues.length > 0) {
        const detail = issues
          .map((i) => `  ligne ${i.line} : ${i.snippet}\n    → ${i.reason}`)
          .join('\n')
        throw new Error(
          `Fichier 'use server' avec exports interdits :\n${detail}\n\n` +
            `Next.js 15+ crash en runtime prod avec :\n` +
            `  Error: A "use server" file can only export async functions.\n\n` +
            `Solution : déplacer les types/constantes dans un fichier séparé ` +
            `(ex: lib/<nom>-types.ts) et les importer via 'import type'.`,
        )
      }
      expect(issues).toHaveLength(0)
    })
  }
})
