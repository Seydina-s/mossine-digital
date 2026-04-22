// ─────────────────────────────────────────────────────────────────
//  lib/hcaptcha.ts — Vérification serveur du token hCaptcha.
//
//  Contrat :
//    - `verifyHCaptcha(token, remoteIp?)` → VerificationResult.
//    - Mode gracieux : si `HCAPTCHA_SECRET_KEY` est absente de l'env,
//      la vérification est considérée comme réussie (status: 'skipped').
//      Cohérent avec Resend côté actions.ts : le client peut développer
//      et déployer avant d'avoir créé son compte hCaptcha.
//    - Le token vide explicite → status: 'missing'. Laisse à l'appelant
//      la décision (bloquer ou non) selon le contexte (mode strict activé).
//
//  Endpoint : https://api.hcaptcha.com/siteverify (POST, form-encoded).
//  Docs : https://docs.hcaptcha.com/#verify-the-user-response-server-side
// ─────────────────────────────────────────────────────────────────

const HCAPTCHA_VERIFY_URL = 'https://api.hcaptcha.com/siteverify'

export type VerificationResult =
  | { status: 'success' }
  | { status: 'skipped'; reason: 'no-secret-key' }
  | { status: 'missing' }
  | { status: 'failure'; errorCodes: readonly string[] }

/**
 * Indique si hCaptcha est "armé" côté serveur (secret configuré).
 * Utilisé par le code appelant pour décider s'il faut exiger un token.
 */
export function isHCaptchaEnabled(): boolean {
  return Boolean(process.env.HCAPTCHA_SECRET_KEY)
}

export async function verifyHCaptcha(
  token: string | undefined | null,
  remoteIp?: string,
): Promise<VerificationResult> {
  const secret = process.env.HCAPTCHA_SECRET_KEY
  if (!secret) {
    return { status: 'skipped', reason: 'no-secret-key' }
  }

  if (!token || token.trim().length === 0) {
    return { status: 'missing' }
  }

  const body = new URLSearchParams({
    secret,
    response: token,
    ...(remoteIp ? { remoteip: remoteIp } : {}),
  })

  try {
    const res = await fetch(HCAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      // Timeout implicite Node 20 via AbortController — 10s suffit pour
      // un POST léger. Au-delà on considère la vérif en échec plutôt que
      // de bloquer la soumission indéfiniment.
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) {
      return { status: 'failure', errorCodes: [`http-${res.status}`] }
    }
    const data = (await res.json()) as {
      success: boolean
      'error-codes'?: string[]
    }
    if (data.success) return { status: 'success' }
    return {
      status: 'failure',
      errorCodes: data['error-codes'] ?? ['unknown-error'],
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'fetch-failed'
    return { status: 'failure', errorCodes: [`exception:${message}`] }
  }
}
