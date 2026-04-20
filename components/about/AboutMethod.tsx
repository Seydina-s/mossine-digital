import {
  MagnifyingGlassPlusIcon,
  HammerIcon,
  ChartLineUpIcon,
  ArrowUpRightIcon,
} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import type { PhosphorIcon } from '@/lib/types'

// ─────────────────────────────────────────────────────────────────
//  AboutMethod — "Comment on travaille".
//  Trois temps fondamentaux qui structurent chaque collaboration.
//  Contenu dérivé directement de la roadmap Services (approach) —
//  rien d'inventé : c'est exactement ce qui se fait déjà.
// ─────────────────────────────────────────────────────────────────

interface Step {
  label: string
  title: string
  description: string
  icon: PhosphorIcon
}

const STEPS: readonly Step[] = [
  {
    label: '01',
    title: 'Comprendre avant de produire',
    description:
      "Un atelier de cadrage approfondi au démarrage — enjeux business, audiences réelles, contraintes, concurrence. Tant qu'on n'a pas compris pourquoi ce projet existe, on ne touche pas à Figma.",
    icon: MagnifyingGlassPlusIcon,
  },
  {
    label: '02',
    title: 'Construire en conditions réelles',
    description:
      "Pas de maquettes déconnectées du terrain. On prototype en HTML/CSS dès que possible, on teste sur les vrais devices de votre audience, on itère à partir de vraies données — pas d'hypothèses de design system.",
    icon: HammerIcon,
  },
  {
    label: '03',
    title: "Mesurer ce qui compte, documenter l'essentiel",
    description:
      "Chaque livraison vient avec ses KPIs, son dashboard, sa documentation. Vous repartez autonome — pas dépendant. Les décisions sont tracées pour que vous compreniez pourquoi chaque choix a été fait.",
    icon: ChartLineUpIcon,
  },
]

export function AboutMethod() {
  return (
    <section
      aria-labelledby="method-title"
      className="relative bg-white"
      style={{
        paddingTop: 'var(--md-space-section)',
        paddingBottom: 'var(--md-space-section)',
      }}
    >
      <div className="container-md relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--md-secondary-text)]">
            Notre méthode
          </p>
          <h2
            id="method-title"
            className="mt-4 font-[family-name:var(--md-font-display)] text-[var(--md-primary)]"
            style={{
              fontSize: 'clamp(2rem, 3.5vw + 0.3rem, 3.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
            }}
          >
            Trois temps, répétés à chaque projet.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--md-primary)]/70 sm:text-base">
            Que le projet dure trois semaines ou douze mois, le rythme reste le
            même. Ce qui change, c&rsquo;est la profondeur — pas la structure.
          </p>
        </div>

        <ol
          role="list"
          className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3 md:gap-5 lg:gap-7"
        >
          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <li
                key={step.label}
                className="relative flex flex-col rounded-2xl border border-[var(--md-border)] bg-[#F0F7FF] p-7 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[13px] font-semibold tracking-[0.15em] text-[var(--md-secondary-text)]"
                    aria-hidden
                  >
                    {step.label}
                  </span>
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--md-secondary)]"
                  >
                    <Icon size={20} weight="regular" />
                  </span>
                </div>
                <h3
                  className="mt-6 font-[family-name:var(--md-font-display)] text-[var(--md-primary)]"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--md-primary)]/70">
                  {step.description}
                </p>
              </li>
            )
          })}
        </ol>

        {/* Pont vers /services pour les curieux de la méthode par levier */}
        <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="text-[15px] text-[var(--md-primary)]/70 sm:text-base">
            Cette méthode se décline différemment selon le levier — branding,
            web, SEO, ads, community, stratégie. Chaque offre détaille sa
            propre approche.
          </p>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-[var(--md-secondary-text)] px-6 py-3 text-sm font-semibold text-[var(--md-secondary-text)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--md-secondary-text)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary-text)] focus-visible:ring-offset-2"
          >
            Voir la méthode par service
            <ArrowUpRightIcon
              size={14}
              weight="bold"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
