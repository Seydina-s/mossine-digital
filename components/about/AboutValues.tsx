import {
  MedalIcon,
  HandshakeIcon,
  LightbulbFilamentIcon,
  TargetIcon,
  MapPinIcon,
  TrendUpIcon,
} from '@phosphor-icons/react/dist/ssr'
import type { PhosphorIcon } from '@/lib/types'

// ─────────────────────────────────────────────────────────────────
//  AboutValues — 6 valeurs qui guident chaque projet.
//  Contenu aligné avec la vision Mossine Digital (présentation
//  client 2026-04-22) : excellence, confiance, créativité, impact,
//  ancrage local, amélioration continue.
// ─────────────────────────────────────────────────────────────────

interface Value {
  icon: PhosphorIcon
  title: string
  description: string
  accent: string
}

const VALUES: readonly Value[] = [
  {
    icon: MedalIcon,
    title: 'Excellence',
    description:
      "Nous visons le niveau le plus haut sur chaque livrable — design, code, copy, performance. Pas d'approximation, pas de raccourci : ce qui sort de chez nous doit tenir la comparaison avec ce qui se fait de mieux, ici comme ailleurs.",
    accent: '#35A7FF',
  },
  {
    icon: HandshakeIcon,
    title: 'Confiance',
    description:
      "Une relation claire, tenue dans la durée. Nous parlons vrai sur ce qui marche, ce qui ne marche pas, ce qui coûte et ce qui paie. Vos données sont protégées, vos décisions respectées, vos budgets utilisés avec discernement.",
    accent: '#35A7FF',
  },
  {
    icon: LightbulbFilamentIcon,
    title: 'Créativité',
    description:
      "Nous refusons les modèles copiés-collés. Chaque marque, chaque cause, chaque campagne mérite une réponse pensée pour elle — ancrée dans sa culture, différenciante sur son marché, mémorable pour son audience.",
    accent: '#FF5964',
  },
  {
    icon: TargetIcon,
    title: 'Impact',
    description:
      "Nous ne livrons pas des projets, nous livrons des résultats : visibilité qui se mesure, audiences qui se convertissent, causes qui se financent, marques qui se reconnaissent. Si ça ne bouge pas l'aiguille, ça ne quitte pas l'atelier.",
    accent: '#FF5964',
  },
  {
    icon: MapPinIcon,
    title: 'Ancrage local',
    description:
      "Nous sommes à Dakar, nous pensons l'Afrique. Nous connaissons les langues, les codes, les habitudes digitales, les canaux qui performent ici — et nous les utilisons pour parler juste aux audiences sénégalaises et africaines.",
    accent: '#35A7FF',
  },
  {
    icon: TrendUpIcon,
    title: 'Amélioration continue',
    description:
      "Le digital ne s'arrête jamais. Nouveaux formats, nouveaux algorithmes, nouveaux usages. Nous apprenons, testons, ajustons — pour que vos dispositifs restent performants demain, pas seulement le jour de la livraison.",
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--md-secondary-text)]">
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
            Six convictions, tenues à chaque projet.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--md-primary)]/70 sm:text-base">
            Ces valeurs décident des clients que nous accompagnons, des projets
            que nous refusons, de la manière dont nous travaillons. Elles sont
            le filtre de toutes nos décisions — et votre garantie sur la
            qualité de la collaboration.
          </p>
        </div>

        <ul
          role="list"
          className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
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
