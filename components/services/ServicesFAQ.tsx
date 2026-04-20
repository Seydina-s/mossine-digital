import { PlusIcon } from '@phosphor-icons/react/dist/ssr'
import { SERVICES_FAQ } from '@/lib/services-data'

// ─────────────────────────────────────────────────────────────────
//  ServicesFAQ — accordéon natif (details/summary) server-rendered.
//  Zéro JS, zéro hydratation, a11y native (Enter/Space gèrent tout).
//  Fond #FFFFFF pour garantir la lisibilité longue-lecture.
// ─────────────────────────────────────────────────────────────────

export function ServicesFAQ() {
  return (
    <section
      aria-labelledby="faq-title"
      className="relative bg-white"
      style={{
        paddingTop: 'var(--md-space-section)',
        paddingBottom: 'var(--md-space-section)',
      }}
    >
      <div className="container-md">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--md-secondary-text)]">
            Questions fréquentes
          </p>
          <h2
            id="faq-title"
            className="mt-3 text-center font-[family-name:var(--md-font-display)] text-[var(--md-primary)]"
            style={{
              fontSize: 'clamp(1.85rem, 3vw + 0.5rem, 2.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
            }}
          >
            Les réponses aux questions{' '}
            <span className="italic text-[var(--md-secondary-text)]">
              qu&rsquo;on nous pose vraiment
            </span>
            .
          </h2>
          <p className="mt-5 text-center text-base leading-relaxed text-[var(--md-primary)]/70">
            Si votre question n&rsquo;est pas ici, elle mérite une réponse
            personnalisée. Contactez-nous — on répond sous 24 h.
          </p>

          {/* Accordéon */}
          <div className="mt-12 divide-y divide-black/5 border-y border-black/5">
            {SERVICES_FAQ.map((item) => (
              <details
                key={item.question}
                className="group/faq py-5 [&[open]>summary>svg]:rotate-45 [&[open]>summary>svg]:text-[var(--md-secondary-text)]"
              >
                <summary
                  className="flex cursor-pointer items-start justify-between gap-4 list-none rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-secondary)] focus-visible:ring-offset-4"
                >
                  <span className="text-[16px] font-medium leading-snug text-[var(--md-primary)] group-hover/faq:text-[var(--md-secondary-text)] sm:text-[17px]">
                    {item.question}
                  </span>
                  <PlusIcon
                    size={20}
                    weight="bold"
                    className="mt-0.5 flex-shrink-0 text-[var(--md-primary)]/40 transition-all duration-300"
                  />
                </summary>
                <p className="mt-3 pr-8 text-[15px] leading-relaxed text-[var(--md-primary)]/70">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
