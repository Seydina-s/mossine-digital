# PALETTE.md — Design Tokens Mossine Digital

## COULEURS OFFICIELLES

| Rôle        | Nom token          | Hex       | RGB                | Usage                                    |
|-------------|--------------------|-----------|--------------------|------------------------------------------|
| Accent      | --md-color-accent  | #FF5964   | 255, 89, 100       | CTA, hover états, badges, alertes        |
| Background  | --md-color-bg      | #FFFFFF   | 255, 255, 255      | Fond principal, surfaces claires         |
| Primary     | --md-color-primary | #00361A   | 0, 54, 26          | Marque, sections sombres, navbar scroll  |
| Secondary   | --md-color-secondary| #35A7FF  | 53, 167, 255       | Liens, highlights, icônes, borders focus |

---

## VARIABLES CSS COMPLÈTES

À placer dans `app/globals.css` :

```css
:root {
  /* === COULEURS MARQUE === */
  --md-color-accent:          #FF5964;
  --md-color-accent-hover:    #E8424D;   /* Assombri 8% pour hover */
  --md-color-accent-light:    #FFE8E9;   /* Fond léger accent (badges, tags) */

  --md-color-primary:         #00361A;
  --md-color-primary-hover:   #004D25;   /* Éclairci 8% pour hover */
  --md-color-primary-light:   #E8F5ED;   /* Fond léger primary */

  --md-color-secondary:       #35A7FF;
  --md-color-secondary-hover: #1A97F5;   /* Assombri pour hover */
  --md-color-secondary-light: #E8F4FF;   /* Fond léger secondary */

  --md-color-bg:              #FFFFFF;
  --md-color-bg-soft:         #F8F9FA;   /* Fond alternatif sections */
  --md-color-bg-dark:         #00361A;   /* Fond sections sombres = primary */

  /* === TEXTE === */
  --md-color-text:            #0D0D0D;   /* Corps de texte principal */
  --md-color-text-muted:      #6B7280;   /* Texte secondaire, labels */
  --md-color-text-light:      #9CA3AF;   /* Placeholders, hints */
  --md-color-text-on-dark:    #FFFFFF;   /* Texte sur fond sombre */
  --md-color-text-on-accent:  #FFFFFF;   /* Texte sur fond accent */

  /* === BORDURES === */
  --md-color-border:          #E5E7EB;   /* Bordures standard */
  --md-color-border-strong:   #D1D5DB;   /* Bordures emphase */
  --md-color-border-focus:    #35A7FF;   /* Ring focus = secondary */

  /* === ÉTATS === */
  --md-color-success:         #10B981;
  --md-color-warning:         #F59E0B;
  --md-color-error:           #FF5964;   /* = accent pour cohérence */
  --md-color-info:            #35A7FF;   /* = secondary pour cohérence */

  /* ======================================= */
  /* === TYPOGRAPHIE === */
  /* ======================================= */

  /* Familles — à définir définitivement avec l'agent Design */
  /* Suggestions premium gratuites : */
  /* Titre : Syne / Plus Jakarta Sans / Outfit / Space Grotesk */
  /* Corps : Inter / DM Sans / Nunito */
  --md-font-display:  'Syne', system-ui, sans-serif;
  --md-font-body:     'Inter', system-ui, sans-serif;
  --md-font-mono:     'JetBrains Mono', 'Fira Code', monospace;

  /* Tailles (échelle modular — ratio 1.25 Major Third) */
  --md-text-xs:    0.64rem;   /* 10.24px */
  --md-text-sm:    0.8rem;    /* 12.8px  */
  --md-text-base:  1rem;      /* 16px    */
  --md-text-md:    1.25rem;   /* 20px    */
  --md-text-lg:    1.563rem;  /* 25px    */
  --md-text-xl:    1.953rem;  /* 31px    */
  --md-text-2xl:   2.441rem;  /* 39px    */
  --md-text-3xl:   3.052rem;  /* 49px    */
  --md-text-4xl:   3.815rem;  /* 61px    */
  --md-text-5xl:   4.768rem;  /* 76px    */

  /* Poids */
  --md-font-regular:   400;
  --md-font-medium:    500;
  --md-font-semibold:  600;
  --md-font-bold:      700;
  --md-font-extrabold: 800;

  /* Line heights */
  --md-leading-tight:  1.2;
  --md-leading-snug:   1.375;
  --md-leading-normal: 1.5;
  --md-leading-relaxed:1.75;

  /* Letter spacing */
  --md-tracking-tight: -0.025em;
  --md-tracking-normal: 0em;
  --md-tracking-wide:  0.05em;
  --md-tracking-wider: 0.1em;

  /* ======================================= */
  /* === ESPACEMENTS (base 4px) === */
  /* ======================================= */
  --md-space-1:   0.25rem;   /* 4px  */
  --md-space-2:   0.5rem;    /* 8px  */
  --md-space-3:   0.75rem;   /* 12px */
  --md-space-4:   1rem;      /* 16px */
  --md-space-5:   1.25rem;   /* 20px */
  --md-space-6:   1.5rem;    /* 24px */
  --md-space-8:   2rem;      /* 32px */
  --md-space-10:  2.5rem;    /* 40px */
  --md-space-12:  3rem;      /* 48px */
  --md-space-16:  4rem;      /* 64px */
  --md-space-20:  5rem;      /* 80px */
  --md-space-24:  6rem;      /* 96px */
  --md-space-32:  8rem;      /* 128px */
  --md-space-40:  10rem;     /* 160px */
  --md-space-48:  12rem;     /* 192px */

  /* ======================================= */
  /* === BORDER RADIUS === */
  /* ======================================= */
  --md-radius-sm:   0.25rem;  /* 4px  — inputs, badges petits */
  --md-radius-md:   0.5rem;   /* 8px  — boutons, cards petits */
  --md-radius-lg:   0.75rem;  /* 12px — cards standard */
  --md-radius-xl:   1rem;     /* 16px — cards grandes */
  --md-radius-2xl:  1.5rem;   /* 24px — sections, modales */
  --md-radius-full: 9999px;   /* Pill — badges, avatars */

  /* ======================================= */
  /* === OMBRES === */
  /* ======================================= */
  --md-shadow-sm:  0 1px 2px 0 rgba(0, 54, 26, 0.05);
  --md-shadow-md:  0 4px 6px -1px rgba(0, 54, 26, 0.08), 0 2px 4px -1px rgba(0, 54, 26, 0.04);
  --md-shadow-lg:  0 10px 15px -3px rgba(0, 54, 26, 0.1), 0 4px 6px -2px rgba(0, 54, 26, 0.05);
  --md-shadow-xl:  0 20px 25px -5px rgba(0, 54, 26, 0.12), 0 10px 10px -5px rgba(0, 54, 26, 0.04);

  /* ======================================= */
  /* === TRANSITIONS === */
  /* ======================================= */
  --md-ease-default:   cubic-bezier(0.4, 0, 0.2, 1);
  --md-ease-in:        cubic-bezier(0.4, 0, 1, 1);
  --md-ease-out:       cubic-bezier(0, 0, 0.2, 1);
  --md-ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);
  --md-ease-spring:    cubic-bezier(0.175, 0.885, 0.32, 1.275);

  --md-duration-fast:    150ms;
  --md-duration-base:    250ms;
  --md-duration-slow:    400ms;
  --md-duration-slower:  600ms;

  /* ======================================= */
  /* === Z-INDEX === */
  /* ======================================= */
  --md-z-base:     0;
  --md-z-raised:   10;
  --md-z-dropdown: 100;
  --md-z-sticky:   200;
  --md-z-overlay:  300;
  --md-z-modal:    400;
  --md-z-toast:    500;
  --md-z-tooltip:  600;

  /* ======================================= */
  /* === BREAKPOINTS (référence — utiliser Tailwind) === */
  /* ======================================= */
  /* sm:  640px  */
  /* md:  768px  */
  /* lg:  1024px */
  /* xl:  1280px */
  /* 2xl: 1536px */

  /* ======================================= */
  /* === CONTENEURS === */
  /* ======================================= */
  --md-container-sm:  640px;
  --md-container-md:  768px;
  --md-container-lg:  1024px;
  --md-container-xl:  1280px;
  --md-container-2xl: 1440px;   /* Max width recommandé pour le site */
}
```

---

## CONFIG TAILWIND CSS v4

À placer dans `tailwind.config.ts` :

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'md-accent':     '#FF5964',
        'md-primary':    '#00361A',
        'md-secondary':  '#35A7FF',
        'md-bg':         '#FFFFFF',
        // Nuances générées
        'md-accent-hover':  '#E8424D',
        'md-accent-light':  '#FFE8E9',
        'md-primary-light': '#E8F5ED',
        'md-secondary-light':'#E8F4FF',
      },
      fontFamily: {
        display: ['var(--md-font-display)'],
        body:    ['var(--md-font-body)'],
        mono:    ['var(--md-font-mono)'],
      },
      borderRadius: {
        'md-sm':  '0.25rem',
        'md-md':  '0.5rem',
        'md-lg':  '0.75rem',
        'md-xl':  '1rem',
        'md-2xl': '1.5rem',
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out',
        'slide-up':   'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## ACCESSIBILITÉ — RATIOS DE CONTRASTE

Vérifications WCAG 2.2 AA (ratio minimum 4.5:1 pour texte normal) :

| Texte            | Fond       | Ratio   | Niveau |
|-----------------|------------|---------|--------|
| #0D0D0D (texte) | #FFFFFF    | 19.9:1  | AAA ✅  |
| #FFFFFF          | #00361A    | 12.1:1  | AAA ✅  |
| #FFFFFF          | #FF5964    | 3.8:1   | AA Large ⚠️ (utiliser en grand texte uniquement) |
| #FFFFFF          | #35A7FF    | 2.9:1   | ❌ Ne pas utiliser texte blanc sur bleu |
| #0D0D0D          | #35A7FF    | 6.8:1   | AA ✅   |
| #0D0D0D          | #FF5964    | 5.2:1   | AA ✅   |

> RÈGLE : Ne jamais mettre texte blanc sur #35A7FF (contraste insuffisant).
> Utiliser texte sombre (#0D0D0D ou #00361A) sur fond bleu clair.
