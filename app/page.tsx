import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { Services } from '@/components/sections/Services'
import { Processus } from '@/components/sections/Processus'
import { Temoignages } from '@/components/sections/Temoignages'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { Footer } from '@/components/layout/Footer'

// ─────────────────────────────────────────────────────────────────
//  🛡️ Portfolio/Réalisations masqués tant que l'agence n'a pas de cas
//  clients publiables. Le composant `components/sections/Portfolio.tsx`
//  et la route `/portfolio` (stub ComingSoon + robots:noindex) restent
//  en place en background. Réactivation : ré-importer + ré-insérer le
//  <Portfolio /> entre <Temoignages /> et <CTAFinal /> dès que les
//  projets sont livrables + remettre la route dans sitemap.ts + ajouter
//  un CTA secondaire "Voir nos réalisations" dans CTAFinal.tsx.
// ─────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <main id="contenu-principal">
        {/* 01 — Hero cinématique fond sombre (#1B1F3B) */}
        <Hero />

        {/* 02 — Chiffres clés (#FFFFFF) */}
        <Stats />

        {/* 03 — Services stacking cards (#0a0e1c) */}
        <Services />

        {/* 04 — Processus (#FFFFFF) */}
        <Processus />

        {/* 05 — Témoignages clients (#1B1F3B) */}
        <Temoignages />

        {/* 06 — CTA final (#FF5964) */}
        <CTAFinal />
      </main>

      {/* 07 — Footer (#10132A) */}
      <Footer />
    </>
  )
}
