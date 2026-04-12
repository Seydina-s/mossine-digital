# PALETTE.md — Tokens Design Mossine Digital

## Couleurs principales

| Token                | Hex       | HSL               | Usage                                    |
|----------------------|-----------|-------------------|------------------------------------------|
| `--md-color-accent`  | `#FF5964` | 357 100% 67%      | CTA, hover, éléments d'attention, badges |
| `--md-color-bg`      | `#FFFFFF` | 0 0% 100%         | Fond principal, surfaces claires         |
| `--md-color-primary` | `#1B1F3B` | 233 37% 17%       | Couleur de marque, sections sombres      |
| `--md-color-secondary`| `#35A7FF`| 207 100% 60%      | Liens, highlights, interactions          |

## Couleurs étendues

| Token                     | Hex       | Usage                              |
|---------------------------|-----------|------------------------------------|
| `--md-color-primary-light`| `#2A2F52` | Hover sur éléments primary         |
| `--md-color-primary-dark` | `#10132A` | Footer, sections très sombres      |
| `--md-color-accent-light` | `#FF8A91` | Hover doux, états disabled         |
| `--md-color-neutral-50`   | `#F9FAFB` | Fonds de sections alternées        |
| `--md-color-neutral-100`  | `#F3F4F6` | Bordures légères, séparateurs      |
| `--md-color-neutral-600`  | `#4B5563` | Corps de texte secondaire          |
| `--md-color-neutral-900`  | `#111827` | Titres, texte principal            |

## Typographie

| Token                    | Valeur                          |
|--------------------------|---------------------------------|
| `--md-font-display`      | `'Clash Display', sans-serif`   |
| `--md-font-body`         | `'Inter', sans-serif`           |
| `--md-font-mono`         | `'JetBrains Mono', monospace`   |

## Échelle typographique (fluid)

| Token              | Valeur clamp                       |
|--------------------|------------------------------------|
| `--md-text-xs`     | `clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)` |
| `--md-text-sm`     | `clamp(0.875rem, 0.8rem + 0.37vw, 1rem)`    |
| `--md-text-base`   | `clamp(1rem, 0.9rem + 0.5vw, 1.125rem)`     |
| `--md-text-lg`     | `clamp(1.125rem, 1rem + 0.6vw, 1.25rem)`    |
| `--md-text-xl`     | `clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)`   |
| `--md-text-2xl`    | `clamp(1.5rem, 1.3rem + 1vw, 2rem)`         |
| `--md-text-3xl`    | `clamp(2rem, 1.7rem + 1.5vw, 3rem)`         |
| `--md-text-4xl`    | `clamp(2.5rem, 2rem + 2.5vw, 4rem)`         |
| `--md-text-5xl`    | `clamp(3rem, 2.5rem + 3vw, 5.5rem)`         |

## Espacements

| Token            | Valeur  |
|------------------|---------|
| `--md-space-1`   | `0.25rem` |
| `--md-space-2`   | `0.5rem`  |
| `--md-space-4`   | `1rem`    |
| `--md-space-6`   | `1.5rem`  |
| `--md-space-8`   | `2rem`    |
| `--md-space-12`  | `3rem`    |
| `--md-space-16`  | `4rem`    |
| `--md-space-24`  | `6rem`    |

## Ombres

| Token              | Valeur                                           |
|--------------------|--------------------------------------------------|
| `--md-shadow-sm`   | `0 1px 3px rgba(0,0,0,0.08)`                    |
| `--md-shadow-md`   | `0 4px 16px rgba(0,0,0,0.10)`                   |
| `--md-shadow-lg`   | `0 12px 40px rgba(0,0,0,0.14)`                  |
| `--md-shadow-accent`| `0 8px 32px rgba(255,89,100,0.30)`             |

## Rayons de bordure

| Token            | Valeur  |
|------------------|---------|
| `--md-radius-sm` | `0.375rem` |
| `--md-radius-md` | `0.75rem`  |
| `--md-radius-lg` | `1.25rem`  |
| `--md-radius-xl` | `2rem`     |
| `--md-radius-full`| `9999px`  |
