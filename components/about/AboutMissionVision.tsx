import { CompassIcon, BinocularsIcon } from '@phosphor-icons/react/dist/ssr'

// ─────────────────────────────────────────────────────────────────
//  AboutMissionVision — Mission + Vision 2028.
//  Contenu repris de la présentation client validée 2026-04-22.
//  Server component, zéro JS. Fond bleu très clair dérivé
//  (#F0F7FF) pour rompre la séquence blanc/blanc entre Manifesto
//  et Values sans casser le rythme de la palette.
// ─────────────────────────────────────────────────────────────────

export function AboutMissionVision() {
  return (
    <section
      aria-labelledby="mission-vision-title"
      className="relative bg-white"
      style={{
        paddingTop: 'var(--md-space-section)',
        paddingBottom: 'var(--md-space-section)',
      }}
    >
      <div className="container-md relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--md-secondary-text)]">
            Mission & Vision
          </p>
          <h2
            id="mission-vision-title"
            className="mt-4 font-[family-name:var(--md-font-display)] text-[var(--md-primary)]"
            style={{
              fontSize: 'clamp(2rem, 3.5vw + 0.3rem, 3.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
            }}
          >
            Pourquoi nous sommes là — et où nous allons.
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-8">
          {/* Mission */}
          <article
            className="group relative flex flex-col rounded-2xl border border-[var(--md-border)] bg-[#F0F7FF] p-8 sm:p-10"
            aria-labelledby="mission-card-title"
          >
            <span
              aria-hidden
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: 'rgba(53,167,255,0.14)',
                color: 'var(--md-secondary-text)',
              }}
            >
              <CompassIcon size={24} weight="regular" />
            </span>
            <h3
              id="mission-card-title"
              className="mt-6 font-[family-name:var(--md-font-display)] text-[var(--md-primary)]"
              style={{
                fontSize: 'clamp(1.35rem, 1.6vw + 0.6rem, 1.7rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              Notre mission
            </h3>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--md-primary)]/80">
              Aider chaque organisation — petite entreprise, marque
              institutionnelle, ONG ou startup — à prendre la place qui lui
              revient dans l&rsquo;espace digital. Nous concevons des
              identités, des sites, des campagnes et des dispositifs de
              communication qui racontent vrai, qui parlent juste et qui
              produisent des résultats mesurables.
            </p>
          </article>

          {/* Vision */}
          <article
            className="group relative flex flex-col rounded-2xl border border-[var(--md-border)] bg-[var(--md-primary)] p-8 sm:p-10"
            aria-labelledby="vision-card-title"
          >
            <span
              aria-hidden
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: 'rgba(255,89,100,0.18)',
                color: '#FF5964',
              }}
            >
              <BinocularsIcon size={24} weight="regular" />
            </span>
            <h3
              id="vision-card-title"
              className="mt-6 font-[family-name:var(--md-font-display)] text-white"
              style={{
                fontSize: 'clamp(1.35rem, 1.6vw + 0.6rem, 1.7rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              Notre vision 2028
            </h3>
            <p className="mt-4 text-[16px] leading-relaxed text-white/85">
              Devenir la référence panafricaine de la communication digitale
              exigeante — celle vers laquelle se tournent les marques, les
              institutions et les ONG quand elles veulent un partenaire capable
              de tenir la cohérence, la créativité et la performance sur la
              durée. Depuis Dakar, pour l&rsquo;Afrique qui se transforme.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
