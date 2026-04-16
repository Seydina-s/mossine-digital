import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/ComingSoon'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles, analyses et insights sur le marketing digital et le branding par Mossine Digital — blog en préparation.',
  robots: { index: false, follow: true },
}

export default function BlogPage() {
  return (
    <ComingSoon
      eyebrow="Blog Mossine"
      titlePrefix="Des"
      accent="insights"
      titleSuffix=", bientôt."
      description="Notre blog n'est pas encore en ligne. Nous y partagerons analyses, retours d'expérience et décryptages utiles pour les marques qui veulent construire une présence digitale durable."
    />
  )
}
