import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { verifyHCaptcha, isHCaptchaEnabled } from '@/lib/hcaptcha'

// ─────────────────────────────────────────────────────────────────
//  Tests unitaires — verifyHCaptcha()
//
//  Couvre les 4 états de retour + le mode gracieux :
//    - no secret key → skipped
//    - token vide    → missing
//    - API success: true → success
//    - API success: false → failure (error codes remontés)
//    - fetch throws → failure (exception capturée)
// ─────────────────────────────────────────────────────────────────

const ORIGINAL_SECRET = process.env.HCAPTCHA_SECRET_KEY

describe('verifyHCaptcha', () => {
  beforeEach(() => {
    // Fetch global mocké pour chaque test — chaque test le configure.
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    // Restaurer la secret key d'origine (si définie)
    if (ORIGINAL_SECRET === undefined) {
      delete process.env.HCAPTCHA_SECRET_KEY
    } else {
      process.env.HCAPTCHA_SECRET_KEY = ORIGINAL_SECRET
    }
  })

  it('retourne "skipped" quand HCAPTCHA_SECRET_KEY est absente (mode gracieux)', async () => {
    delete process.env.HCAPTCHA_SECRET_KEY
    const result = await verifyHCaptcha('anything')
    expect(result).toEqual({ status: 'skipped', reason: 'no-secret-key' })
    expect(fetch).not.toHaveBeenCalled()
  })

  it('retourne "missing" quand le token est vide', async () => {
    process.env.HCAPTCHA_SECRET_KEY = 'test-secret'
    expect(await verifyHCaptcha('')).toEqual({ status: 'missing' })
    expect(await verifyHCaptcha('   ')).toEqual({ status: 'missing' })
    expect(await verifyHCaptcha(null)).toEqual({ status: 'missing' })
    expect(await verifyHCaptcha(undefined)).toEqual({ status: 'missing' })
    expect(fetch).not.toHaveBeenCalled()
  })

  it('retourne "success" quand l\'API hCaptcha confirme le token', async () => {
    process.env.HCAPTCHA_SECRET_KEY = 'test-secret'
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    )
    const result = await verifyHCaptcha('valid-token', '1.2.3.4')
    expect(result).toEqual({ status: 'success' })
    expect(fetch).toHaveBeenCalledOnce()
    const [url, init] = vi.mocked(fetch).mock.calls[0]!
    expect(url).toBe('https://api.hcaptcha.com/siteverify')
    expect(init?.method).toBe('POST')
    const body = init?.body as URLSearchParams
    expect(body.get('secret')).toBe('test-secret')
    expect(body.get('response')).toBe('valid-token')
    expect(body.get('remoteip')).toBe('1.2.3.4')
  })

  it('omet "remoteip" quand l\'IP n\'est pas fournie', async () => {
    process.env.HCAPTCHA_SECRET_KEY = 'test-secret'
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    )
    await verifyHCaptcha('valid-token')
    const body = vi.mocked(fetch).mock.calls[0]?.[1]?.body as URLSearchParams
    expect(body.has('remoteip')).toBe(false)
  })

  it('retourne "failure" avec les error-codes quand l\'API refuse', async () => {
    process.env.HCAPTCHA_SECRET_KEY = 'test-secret'
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: false,
          'error-codes': ['invalid-input-response', 'timeout-or-duplicate'],
        }),
        { status: 200 },
      ),
    )
    const result = await verifyHCaptcha('stale-token')
    expect(result).toEqual({
      status: 'failure',
      errorCodes: ['invalid-input-response', 'timeout-or-duplicate'],
    })
  })

  it('retourne "failure" avec code "unknown-error" si l\'API ne fournit pas d\'error-codes', async () => {
    process.env.HCAPTCHA_SECRET_KEY = 'test-secret'
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ success: false }), { status: 200 }),
    )
    const result = await verifyHCaptcha('any')
    expect(result).toEqual({ status: 'failure', errorCodes: ['unknown-error'] })
  })

  it('retourne "failure" avec code HTTP si la réponse est non-2xx', async () => {
    process.env.HCAPTCHA_SECRET_KEY = 'test-secret'
    vi.mocked(fetch).mockResolvedValueOnce(new Response('', { status: 503 }))
    const result = await verifyHCaptcha('any')
    expect(result).toEqual({ status: 'failure', errorCodes: ['http-503'] })
  })

  it('retourne "failure" quand fetch throw (réseau KO)', async () => {
    process.env.HCAPTCHA_SECRET_KEY = 'test-secret'
    vi.mocked(fetch).mockRejectedValueOnce(new Error('ECONNREFUSED'))
    const result = await verifyHCaptcha('any')
    expect(result.status).toBe('failure')
    if (result.status === 'failure') {
      expect(result.errorCodes[0]).toContain('exception:')
      expect(result.errorCodes[0]).toContain('ECONNREFUSED')
    }
  })
})

describe('isHCaptchaEnabled', () => {
  afterEach(() => {
    if (ORIGINAL_SECRET === undefined) {
      delete process.env.HCAPTCHA_SECRET_KEY
    } else {
      process.env.HCAPTCHA_SECRET_KEY = ORIGINAL_SECRET
    }
  })

  it('retourne false quand HCAPTCHA_SECRET_KEY est absente', () => {
    delete process.env.HCAPTCHA_SECRET_KEY
    expect(isHCaptchaEnabled()).toBe(false)
  })

  it('retourne true quand HCAPTCHA_SECRET_KEY est définie', () => {
    process.env.HCAPTCHA_SECRET_KEY = 'anything'
    expect(isHCaptchaEnabled()).toBe(true)
  })

  it('retourne false pour une chaîne vide (conversion Boolean)', () => {
    process.env.HCAPTCHA_SECRET_KEY = ''
    expect(isHCaptchaEnabled()).toBe(false)
  })
})
