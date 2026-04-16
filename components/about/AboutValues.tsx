import {
  CompassIcon,
  ShieldCheckIcon,
  EyeIcon,
  HandshakeIcon,
} from '@phosphor-icons/react/dist/ssr'
import type { PhosphorIcon } from '@/lib/types'

// ─────────────────────────────────────────────────────────────────
//  AboutValues — 4 piliers qui guident chaque décision.
//  Server component, contenu 100 % basé sur les standards non-
//  négociables documentés dans CLAUDE.md (qualité, sécurité OWASP,
//  a11y WCAG, transparence).
// ─────────────────────────────────────────────────────────────────

interface Value {
  icon: PhosphorIcon
  title: string
  description: string
  accent: string
}

const VALUES: readonly Value[] = [
  {
    icon: CompassIcon,
    title: 'Clarté avant tout',
    description:
      "Une idée simple, bien formulée, vaut mieux qu'une construction brillante mais illisible. Chaque livrable doit passer l'épreuve des cinq secondes — qui, pour qui, pourquoi.",
    accent: '#35A7FF',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Rigueur technique',
    description:
      "Code TypeScript strict, tests automatisés, sécurité OWASP, accessibilité WCAG 2.2 AA, performance mesurée. La qualité n'est pas un bonus — c'est un prérequis.",
    accent: '#35A7FF',
  },
  {
    icon: EyeIcon,
    title: 'Transparence totale',
    description:
      "Vous voyez les chiffres bruts, pas seulement les slides qui les résument. Dashboards ouverts, rapports détaillés, arbitrages expliqués. Aucune magie noire.",
    accent: '#FF5964',
  },
  {
    icon: HandshakeIcon,
    title: 'Engagement long terme',
    description:
      "Nous travaillons avec peu de clients pour avancer vite avec chacun, pas avec beaucoup pour remplir des heures. Une relation se construit dans la durée — pas dans les KPIs trimestriels.",
    accent: '#FF5964',
  },
]

export function AboutValues() {
  return (
    <section
      aria-labelledby="values-title"
      className="relative"
      style={{
        backgroundColor: '#F0F7FF',
        paddingTop: 'var(--md-space-section)',
        paddingBottom: 'var(--md-space-section)',
      }}
    >
      <div className="container-md relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--md-secondary)]">
            Nos principes
          </p>
          <h2
            id="values-title"
            className="mt-4 font-[family-name:var(--md-font-display)] text-[var(--md-primary)]"
            style={{
              fontSize: 'clamp(2rem, 3.5vw + 0.3rem, 3.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
            }}
          >
            Quatre convictions, tenues à chaque projet.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--md-primary)]/70 sm:text-base">
            Ces principes décident des clients qu&rsquo;on accepte, des projets
            qu&rsquo;on refuse, des méthodes qu&rsquo;on impose. Ils sont le
            filtre de toutes nos décisions.
          </p>
        </div>

        <ul
          role="list"
          className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:gap-8"
        >
          {VALUES.map((value) => {
            const Icon = value.icon
            return (
              <li
                key={value.title}
                className="group relative flex flex-col rounded-2xl border border-[var(--md-border)] bg-white p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
              >
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${value.accent}1f`,
                    color: value.accent,
                  }}
                >
                  <Icon size={22} weight="regular" />
                </span>
                <h3
                  className="mt-5 font-[family-name:var(--md-font-display)] text-[var(--md-primary)]"
                  style={{
                    fontSize: 'clamp(1.15rem, 1.1vw + 0.6rem, 1.4rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  {value.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--md-primary)]/70">
                  {value.description}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
