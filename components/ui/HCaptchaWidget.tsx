'use client'

import * as React from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'

// ─────────────────────────────────────────────────────────────────
//  components/ui/HCaptchaWidget.tsx
//
//  Wrapper autour de @hcaptcha/react-hcaptcha avec mode gracieux :
//    - Si NEXT_PUBLIC_HCAPTCHA_SITE_KEY est absent, le composant ne
//      rend RIEN (retourne null). Le formulaire reste fonctionnel.
//      La vérification serveur est également désactivée dans
//      `lib/hcaptcha.ts` (même pattern que Resend).
//    - Si la site-key est présente, affiche le widget hCaptcha
//      (taille "normal" par défaut, "compact" pour les formulaires
//      denses). Le token est ensuite injecté dans un hidden input
//      portant `name="hcaptcha-token"` pour être capturé par le
//      server action via FormData.
//
//  Accessibilité : le widget hCaptcha natif est un iframe. On l'entoure
//  d'un groupe avec label et d'un message d'erreur en aria-live polite
//  pour que les lecteurs d'écran entendent "Vérification requise"
//  quand l'utilisateur soumet sans résoudre le défi.
// ─────────────────────────────────────────────────────────────────

interface HCaptchaWidgetProps {
  /**
   * Texte affiché sous le widget en cas d'erreur (token manquant côté
   * serveur, défi expiré, etc.). Géré par le parent via le state du
   * server action.
   */
  error?: string
  /**
   * Callback déclenché quand le token change. Utile pour réactiver le
   * submit quand l'utilisateur résout le défi après un échec.
   */
  onVerify?: (token: string) => void
  /**
   * Taille du widget. "compact" sur mobile étroit si besoin.
   * Défaut : "normal".
   */
  size?: 'normal' | 'compact'
}

export function HCaptchaWidget({
  error,
  onVerify,
  size = 'normal',
}: HCaptchaWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY
  const [token, setToken] = React.useState('')
  const captchaRef = React.useRef<HCaptcha | null>(null)

  if (!siteKey) {
    // Mode gracieux — aucun widget, aucun hidden input. La validation
    // serveur passera automatiquement en 'skipped' (voir lib/hcaptcha.ts).
    return null
  }

  const handleVerify = (t: string) => {
    setToken(t)
    onVerify?.(t)
  }

  const handleExpire = () => {
    setToken('')
    // Reset interne du widget — re-render du challenge si besoin.
    captchaRef.current?.resetCaptcha()
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        role="group"
        aria-label="Vérification anti-robot"
        className="flex flex-col items-start"
      >
        <HCaptcha
          ref={captchaRef}
          sitekey={siteKey}
          size={size}
          onVerify={handleVerify}
          onExpire={handleExpire}
          onError={handleExpire}
          // Langue forcée en français — cohérent avec `<html lang="fr">`.
          languageOverride="fr"
        />
        {/* Token transmis au server action via FormData. Le widget ne
            rend pas d'input natif, on l'injecte explicitement pour que
            formData.get('hcaptcha-token') retourne la valeur côté
            serveur. */}
        <input type="hidden" name="hcaptcha-token" value={token} readOnly />
      </div>
      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="text-xs font-medium text-[var(--md-accent)]"
        >
          {error}
        </p>
      )}
    </div>
  )
}
