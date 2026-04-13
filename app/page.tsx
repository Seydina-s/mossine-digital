import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { Services } from '@/components/sections/Services'
import { Processus } from '@/components/sections/Processus'
import { Temoignages } from '@/components/sections/Temoignages'
import { CTAFinal } from '@/components/sections/CTAFinal'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <main id="contenu-principal">
        {/* 01 — Hero cinématique fond sombre (#1B1F3B) */}
        <Hero />

        {/* 02 — Chiffres clés (#FFFFFF) */}
        <Stats />

        {/* 03 — Services (#F0F7FF) */}
        <Services />

        {/* 04 — Processus (#FFFFFF) */}
        <Processus />

        {/* 05 — Témoignages clients (#1B1F3B) */}
        <Temoignages />

        {/* 06 — CTA final (#FF5964) */}
        <CTAFinal />
      </main>

      {/* 08 — Footer (#10132A) */}
      <Footer />
    </>
  )
}
