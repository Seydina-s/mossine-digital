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
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
