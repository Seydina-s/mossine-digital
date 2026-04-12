import { Hero } from '@/components/sections/Hero'

export default function Home() {
  return (
    <main>
      {/* Section 01 — Hero cinématique fond sombre */}
      <Hero />

      {/* Sections suivantes (Sprint 2) — placeholder temporaire pour tester le scroll */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          minHeight: '120vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ fontSize: '1.25rem', color: '#0D0D0D' }}>
          Section 02 — Stats (à venir)
        </p>
      </section>
    </main>
  )
}
