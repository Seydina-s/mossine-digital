import { QuotesIcon } from '@phosphor-icons/react/dist/ssr'

// ─────────────────────────────────────────────────────────────────
//  AboutManifesto — bloc éditorial "Pourquoi Mossine Digital existe".
//  Server component, zéro JS. Mise en page magazine : intro + 3 blocs.
//
//  ⚠️ Contenu rédactionnel basé strictement sur la vision validée
//  (CLAUDE.md + PROJECT.md). Aucun fait chiffré, aucune date, aucun
//  nom propre inventé — ces éléments seront ajoutés par le client.
// ─────────────────────────────────────────────────────────────────

const PARAGRAPHS: readonly string[] = [
  "L'Afrique se digitalise à deux vitesses. D'un côté, des marques et des organisations qui ont une vraie histoire à raconter, un impact réel à défendre, des publics qui ne demandent qu'à être touchés. De l'autre, des agences qui livrent des sites génériques, des posts recyclés et des campagnes qui ne comprennent ni le marché local, ni le contexte culturel, ni les enjeux réels du client.",
  "Mossine Digital est née à Dakar pour combler cet écart. Nous combinons une connaissance fine du terrain africain — langues, codes visuels, habitudes de consommation digitale — avec les standards de rigueur, de performance et d'accessibilité attendus sur les marchés internationaux. Ni copier-coller occidental, ni bricolage : une exécution pensée pour ici, tenue au niveau d'ailleurs.",
  "Nous accompagnons trois familles d'organisations qui partagent le même besoin de clarté. Les PME et entreprises sénégalaises ou africaines qui veulent passer du bouche-à-oreille à une présence digitale structurée. Les ONG, associations et institutions qui portent des causes et cherchent à mobiliser durablement. Les startups et grandes entreprises qui ont besoin d'une agence capable de livrer vite, juste et mesurable.",
]

export function AboutManifesto() {
  return (
    <section
      aria-labelledby="manifesto-title"
      className="relative bg-white"
      style={{
        paddingTop: 'var(--md-space-section)',
        paddingBottom: 'var(--md-space-section)',
      }}
    >
      <div className="container-md relative">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1fr)_1.5fr] lg:gap-20">
          {/* Colonne gauche : titre + citation signature */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--md-secondary-text)]">
              Notre manifeste
            </p>
            <h2
              id="manifesto-title"
              className="mt-4 font-[family-name:var(--md-font-display)] text-[var(--md-primary)]"
              style={{
                fontSize: 'clamp(2rem, 3.5vw + 0.3rem, 3.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
              }}
            >
              Ancrés à Dakar, rigoureux comme{' '}
              <span className="italic text-[var(--md-secondary-text)]">
                les meilleurs
              </span>{' '}
              d&rsquo;ailleurs.
            </h2>

            <figure className="mt-10 rounded-2xl border border-[var(--md-border)] bg-[var(--md-secondary-light)] p-6 sm:p-7">
              <QuotesIcon
                size={24}
                weight="fill"
                className="text-[var(--md-secondary)]"
                aria-hidden
              />
              <blockquote
                className="mt-4 font-[family-name:var(--md-font-display)] italic text-[var(--md-primary)]"
                style={{
                  fontSize: 'clamp(1.05rem, 1.3vw + 0.4rem, 1.35rem)',
                  lineHeight: 1.4,
                  letterSpacing: '-0.01em',
                }}
              >
                Une marque ancrée dans sa culture parle plus fort, plus
                longtemps et plus juste qu&rsquo;une marque qui essaie de
                ressembler à toutes les autres.
              </blockquote>
              <figcaption className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--md-primary)]/50">
                Principe fondateur · Mossine Digital
              </figcaption>
            </figure>
          </div>

          {/* Colonne droite : 3 paragraphes manifeste */}
          <div className="flex flex-col gap-7">
            {PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                className="text-[17px] leading-relaxed text-[var(--md-primary)]/80 sm:text-[18px]"
                style={{
                  // Premier paragraphe en drop-cap éditorial
                  ...(i === 0
                    ? {
                        fontSize: 'clamp(1.15rem, 1.2vw + 0.6rem, 1.3rem)',
                      }
                    : {}),
                }}
              >
                {p}
              </p>
            ))}

            {/* Séparateur + signature positionnement */}
            <div className="mt-4 flex items-center gap-4">
              <span
                aria-hidden
                className="h-px flex-1 bg-[var(--md-border)]"
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--md-primary)]/40">
                Agence Dakar · Portée Afrique & international
              </span>
              <span
                aria-hidden
                className="h-px flex-1 bg-[var(--md-border)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
