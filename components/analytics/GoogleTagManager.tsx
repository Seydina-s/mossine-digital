import Script from 'next/script'

// ─────────────────────────────────────────────────────────────────
//  Google Tag Manager — conteneur unique pour toute notre analytics.
//
//  Principe : GTM charge ici, et **tout le reste** (GA4, Meta Pixel,
//  Google Ads, événements custom) est configuré dans l'interface web
//  GTM. Aucun ID GA4 n'est référencé en dur dans ce fichier — GTM
//  s'en occupe côté conteneur. On garde `NEXT_PUBLIC_GA4_ID` comme
//  référence dans `.env` pour d'éventuels events server-side
//  (Measurement Protocol) à venir.
//
//  Mode gracieux : sans `NEXT_PUBLIC_GTM_ID`, aucun script ne charge.
//  Pratique pour le développement local et pour les previews Vercel
//  tant qu'on n'a pas déployé la prod.
//
//  RGPD : l'intégration est minimale **à dessein**. Le bandeau de
//  consentement + Consent Mode v2 (defaults denied) seront ajoutés
//  à l'étape 2 du plan analytics. D'ici là, GTM charge mais les tags
//  à l'intérieur doivent être configurés en `Consent Mode` côté UI.
// ─────────────────────────────────────────────────────────────────

interface GoogleTagManagerProps {
  gtmId?: string
}

export function GoogleTagManagerScript({ gtmId }: GoogleTagManagerProps) {
  if (!gtmId) return null

  return (
    <Script
      id="gtm-base"
      strategy="afterInteractive"
      // eslint-disable-next-line react/no-unknown-property
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `,
      }}
    />
  )
}

export function GoogleTagManagerNoscript({ gtmId }: GoogleTagManagerProps) {
  if (!gtmId) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
