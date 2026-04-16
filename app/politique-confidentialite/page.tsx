import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/layout/Footer'

// ─────────────────────────────────────────────────────────────────
//  SEO — Metadata page /politique-confidentialite
//  Page légale : indexable, stable, canonique.
// ─────────────────────────────────────────────────────────────────

const PAGE_DESCRIPTION =
  "Politique de confidentialité de Mossine Digital — traitement des données personnelles, droits des utilisateurs, base légale et contact DPO. Conforme à la loi sénégalaise 2008-12 sur la protection des données personnelles."

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/politique-confidentialite' },
  openGraph: {
    title: 'Politique de confidentialité — Mossine Digital',
    description: PAGE_DESCRIPTION,
    url: '/politique-confidentialite',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

// ─────────────────────────────────────────────────────────────────
//  Date de dernière mise à jour — synchronisée avec la sortie prod
//  Format ISO (YYYY-MM-DD) pour parsing stable dans <time datetime>.
// ─────────────────────────────────────────────────────────────────

const LAST_UPDATED_ISO = '2026-04-16'
const LAST_UPDATED_HUMAN = '16 avril 2026'

// ─────────────────────────────────────────────────────────────────
//  ⚠️ TODO_CLIENT — Informations légales à fournir avant go-live :
//  - Dénomination sociale complète (ex. "Mossine Digital SARL")
//  - Adresse du siège social (Dakar, Sénégal)
//  - NINEA + RCCM
//  - Email du Délégué à la Protection des Données (DPO)
//  - Nom du représentant légal
//  Remplacer tous les `[À COMPLÉTER — CLIENT]` ci-dessous.
// ─────────────────────────────────────────────────────────────────

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <main
        id="contenu-principal"
        className="relative overflow-hidden bg-[var(--md-bg)] pb-24 pt-32 sm:pt-40"
      >
        {/* ─── En-tête éditorial ─── */}
        <div className="container-md relative">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--md-secondary)]">
              Mentions & vie privée
            </p>
            <h1
              className="font-[family-name:var(--md-font-display)] text-[var(--md-primary)]"
              style={{
                fontSize: 'clamp(2rem, 4.5vw + 0.5rem, 3.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
              }}
            >
              Politique de confidentialité.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-[var(--md-text-muted)] sm:text-[17px]">
              Comment nous collectons, utilisons et protégeons vos données
              personnelles. Pensée pour être lisible — pas pour être cachée
              derrière trente pages de jargon.
            </p>
            <p className="mt-4 text-sm text-[var(--md-text-light)]">
              Dernière mise à jour :{' '}
              <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED_HUMAN}</time>
            </p>
          </div>

          {/* ─── Corps de la politique ─── */}
          <article className="mx-auto mt-14 max-w-3xl space-y-12 text-[15px] leading-relaxed text-[var(--md-primary)]/80 sm:text-base">
            <Section number="01" title="Qui est responsable du traitement ?">
              <p>
                Le responsable du traitement des données collectées sur ce
                site est <strong>Mossine Digital</strong>, agence de
                communication et marketing digital située à Dakar, Sénégal.
              </p>
              <p className="mt-3 text-sm text-[var(--md-text-muted)]">
                Dénomination légale : <em>[À COMPLÉTER — CLIENT]</em>
                <br />
                Adresse du siège : <em>[À COMPLÉTER — CLIENT]</em>
                <br />
                NINEA / RCCM : <em>[À COMPLÉTER — CLIENT]</em>
                <br />
                Contact :{' '}
                <a
                  href="mailto:contact@mossinedigital.com"
                  className="text-[var(--md-secondary)] underline underline-offset-2 hover:text-[var(--md-secondary-hover)]"
                >
                  contact@mossinedigital.com
                </a>
              </p>
            </Section>

            <Section number="02" title="Quelles données nous collectons">
              <p>
                Nous ne collectons que les données <strong>strictement
                nécessaires</strong> pour répondre à vos demandes ou fournir
                nos services.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-[var(--md-secondary)]">
                <li>
                  <strong>Formulaire de contact</strong> : nom, email,
                  téléphone (optionnel), entreprise (optionnel), service
                  souhaité, budget indicatif (optionnel), message, et votre
                  consentement explicite.
                </li>
                <li>
                  <strong>Statistiques de navigation anonymisées</strong> :
                  pages visitées, pays approximatif, type d’appareil. Aucun
                  identifiant personnel, aucun cookie publicitaire, aucun
                  partage avec des tiers.
                </li>
              </ul>
              <p className="mt-4">
                Nous ne collectons <strong>pas</strong> de données sensibles
                (santé, origine, opinions politiques, orientation sexuelle,
                etc.), et ne traçons pas votre activité en dehors de notre
                site.
              </p>
            </Section>

            <Section number="03" title="Pourquoi nous collectons ces données">
              <ul className="list-disc space-y-2 pl-5 marker:text-[var(--md-secondary)]">
                <li>
                  <strong>Répondre à vos demandes</strong> — devis, rendez-vous,
                  questions commerciales.
                </li>
                <li>
                  <strong>Préparer nos propositions</strong> — comprendre votre
                  contexte avant un premier échange.
                </li>
                <li>
                  <strong>Améliorer le site</strong> — identifier les pages
                  consultées pour prioriser les contenus utiles.
                </li>
              </ul>
              <p className="mt-4">
                Nous ne vous enverrons jamais de prospection non sollicitée, et
                vos données ne sont ni vendues, ni louées, ni partagées à des
                fins commerciales.
              </p>
            </Section>

            <Section number="04" title="Base légale du traitement">
              <p>
                Conformément à la loi sénégalaise{' '}
                <strong>n° 2008-12 du 25 janvier 2008</strong> portant sur la
                protection des données à caractère personnel et au{' '}
                <abbr title="Règlement Général sur la Protection des Données">
                  RGPD
                </abbr>{' '}
                européen (pour nos interlocuteurs de l’UE) :
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-[var(--md-secondary)]">
                <li>
                  <strong>Consentement explicite</strong> via la case à cocher
                  du formulaire de contact.
                </li>
                <li>
                  <strong>Intérêt légitime</strong> pour les mesures
                  d’audience anonymisées (amélioration continue du service).
                </li>
                <li>
                  <strong>Exécution contractuelle</strong> lorsque vous
                  devenez client.
                </li>
              </ul>
            </Section>

            <Section number="05" title="Qui accède à vos données">
              <p>
                Vos données sont accessibles uniquement aux personnes de
                l’équipe Mossine Digital qui traitent votre demande. Nous
                utilisons quelques prestataires techniques, strictement
                nécessaires à l’exploitation du site :
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-[var(--md-secondary)]">
                <li>
                  <strong>Resend</strong> (service d’envoi d’emails
                  transactionnels) — pour transmettre votre message à notre
                  équipe.
                </li>
                <li>
                  <strong>Hostinger / Cloudflare</strong> — hébergement et
                  protection DDoS.
                </li>
                <li>
                  <strong>Umami</strong> (analytics auto-hébergé, sans
                  cookies) — mesure d’audience anonymisée.
                </li>
              </ul>
              <p className="mt-4">
                Aucun de ces prestataires n’utilise vos données à des fins qui
                leur seraient propres.
              </p>
            </Section>

            <Section number="06" title="Durée de conservation">
              <ul className="list-disc space-y-2 pl-5 marker:text-[var(--md-secondary)]">
                <li>
                  <strong>Messages via le formulaire</strong> : 3 ans à
                  compter du dernier contact, puis suppression automatique.
                </li>
                <li>
                  <strong>Données clients</strong> : durée de la relation
                  contractuelle + obligations comptables (10 ans).
                </li>
                <li>
                  <strong>Statistiques anonymisées</strong> : 13 mois.
                </li>
              </ul>
            </Section>

            <Section number="07" title="Vos droits">
              <p>
                Vous disposez, à tout moment, des droits suivants sur vos
                données personnelles :
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-[var(--md-secondary)]">
                <li>
                  <strong>Accès</strong> — obtenir une copie des données
                  vous concernant.
                </li>
                <li>
                  <strong>Rectification</strong> — corriger toute donnée
                  inexacte ou incomplète.
                </li>
                <li>
                  <strong>Suppression</strong> — demander l’effacement de
                  vos données (droit à l’oubli).
                </li>
                <li>
                  <strong>Limitation</strong> — suspendre temporairement le
                  traitement.
                </li>
                <li>
                  <strong>Portabilité</strong> — récupérer vos données dans
                  un format structuré.
                </li>
                <li>
                  <strong>Opposition</strong> — vous opposer à un traitement
                  fondé sur l’intérêt légitime.
                </li>
                <li>
                  <strong>Retrait du consentement</strong> à tout moment,
                  sans justification.
                </li>
              </ul>
              <p className="mt-4">
                Pour exercer l’un de ces droits, écrivez-nous à{' '}
                <a
                  href="mailto:contact@mossinedigital.com"
                  className="text-[var(--md-secondary)] underline underline-offset-2 hover:text-[var(--md-secondary-hover)]"
                >
                  contact@mossinedigital.com
                </a>
                . Nous répondons sous <strong>30 jours maximum</strong>, le
                plus souvent sous 48h ouvrées.
              </p>
              <p className="mt-3">
                Si vous estimez que le traitement de vos données ne respecte
                pas la réglementation, vous pouvez saisir la{' '}
                <a
                  href="https://www.cdp.sn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--md-secondary)] underline underline-offset-2 hover:text-[var(--md-secondary-hover)]"
                >
                  Commission de Protection des Données Personnelles (CDP) du
                  Sénégal
                </a>
                .
              </p>
            </Section>

            <Section number="08" title="Cookies et traceurs">
              <p>
                Ce site <strong>n’utilise aucun cookie publicitaire</strong>,
                aucun pixel de tracking tiers (Facebook, Google Ads, TikTok),
                et aucun cookie nécessitant un bandeau de consentement.
              </p>
              <p className="mt-3">
                Les seuls éléments techniques stockés sur votre appareil
                sont liés au bon fonctionnement du site (préférence de
                thème, session sécurisée) et sont supprimés à la fermeture
                du navigateur ou au bout d’une session.
              </p>
            </Section>

            <Section number="09" title="Sécurité des données">
              <p>
                Nous appliquons les mesures techniques et organisationnelles
                nécessaires pour protéger vos données : connexion HTTPS
                obligatoire, en-têtes de sécurité OWASP, rate-limiting contre
                le spam, validation stricte des entrées, accès restreint aux
                seules personnes autorisées.
              </p>
              <p className="mt-3">
                En cas d’incident susceptible d’affecter vos données, nous
                vous informerons <strong>sous 72 heures</strong>,
                conformément aux obligations légales.
              </p>
            </Section>

            <Section number="10" title="Mises à jour de cette politique">
              <p>
                Cette politique peut évoluer pour refléter des changements
                techniques, légaux ou organisationnels. La date de mise à
                jour en haut de cette page indique la version en vigueur.
                Les modifications substantielles vous seront notifiées si
                nous avons un moyen de vous joindre.
              </p>
            </Section>

            {/* ─── Bas de page — retour formulaire ─── */}
            <div className="border-t border-[var(--md-border)] pt-10">
              <p className="text-sm text-[var(--md-text-muted)]">
                Une question sur cette politique, ou sur l’usage que nous
                faisons de vos données ?{' '}
                <Link
                  href="/contact"
                  className="font-medium text-[var(--md-secondary)] underline underline-offset-2 hover:text-[var(--md-secondary-hover)]"
                >
                  Écrivez-nous
                </Link>
                , on vous répond sous 48h ouvrées.
              </p>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────
//  Sous-composant — Section numérotée
//  Ancre générée depuis le numéro pour les liens profonds (ex. #07).
// ─────────────────────────────────────────────────────────────────

function Section({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  const id = `section-${number}`
  return (
    <section
      id={id}
      className="scroll-mt-32"
      aria-labelledby={`${id}-title`}
    >
      <div className="mb-4 flex items-baseline gap-4">
        <span
          aria-hidden
          className="font-mono text-[13px] font-semibold tracking-[0.15em] text-[var(--md-secondary)]"
        >
          {number}
        </span>
        <h2
          id={`${id}-title`}
          className="font-[family-name:var(--md-font-display)] text-[var(--md-primary)]"
          style={{
            fontSize: '1.375rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
          }}
        >
          {title}
        </h2>
      </div>
      <div className="space-y-1">{children}</div>
    </section>
  )
}
