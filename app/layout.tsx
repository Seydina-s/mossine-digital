import type { Metadata } from 'next'
import { syne, inter } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { SmoothScroll } from '@/components/shared/SmoothScroll'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mossine Digital | Agence Communication & Marketing 360',
  description:
    'Agence de communication et marketing digital 360. Stratégie, branding, web et social media réunis pour construire votre présence digitale.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${syne.variable} ${inter.variable}`}>
        {/* Lien d'évitement pour lecteurs d'écran (WCAG 2.2) */}
        <a
          href="#contenu-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-[var(--md-secondary)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Aller au contenu principal
        </a>
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
