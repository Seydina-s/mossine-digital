import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/ComingSoon'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Nos réalisations et études de cas — page en préparation. Pour un aperçu, contactez Mossine Digital.',
  robots: { index: false, follow: true },
}

export default function PortfolioPage() {
  return (
    <ComingSoon
      eyebrow="Nos réalisations"
      titlePrefix="Le"
      accent="portfolio"
      titleSuffix=" se dévoile bientôt."
      description="Nos études de cas détaillées arrivent. En attendant, demandez-nous un aperçu personnalisé des projets les plus proches du vôtre — on vous le prépare sous 24h."
    />
  )
}
