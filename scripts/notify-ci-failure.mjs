#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────
//  scripts/notify-ci-failure.mjs
//
//  Phase 2 des notifications CI (cf. CLAUDE.md, todo Sprint 5) :
//  envoi d'un email Resend formaté quand un workflow GitHub Actions
//  échoue (CI sur push/PR ou monitor-prod cron).
//
//  Phase 1 = email natif GitHub déjà actif (Settings → Notifications).
//  Phase 2 = email custom plus lisible avec infos contextuelles +
//  destinataire dédié (seydina@mossine.com vs email du compte GitHub).
//
//  Mode gracieux : sans les 3 secrets Resend, le script log et exit 0.
//  Le job "notify" GitHub Actions reste vert — pas de double rouge sur
//  un workflow déjà cassé. Les secrets activent automatiquement l'envoi
//  dès qu'ils sont renseignés (Settings → Secrets and variables).
//
//  Variables d'environnement attendues :
//    - RESEND_API_KEY        : clé re_xxx Resend
//    - RESEND_FROM_EMAIL     : "Mossine Digital <noreply@…>"
//    - CI_ALERT_EMAIL        : destinataire (seydina@mossine.com)
//    - GITHUB_*              : injectées automatiquement par Actions
// ─────────────────────────────────────────────────────────────────

const apiKey = process.env.RESEND_API_KEY
const from = process.env.RESEND_FROM_EMAIL
const to = process.env.CI_ALERT_EMAIL

if (!apiKey || !from || !to) {
  console.log(
    '[ci-notify] secrets Resend non configurés (RESEND_API_KEY / RESEND_FROM_EMAIL / CI_ALERT_EMAIL) — skip envoi email (mode gracieux).',
  )
  process.exit(0)
}

const {
  GITHUB_REPOSITORY = 'unknown/repo',
  GITHUB_RUN_ID = '0',
  GITHUB_WORKFLOW = 'workflow',
  GITHUB_REF_NAME = 'main',
  GITHUB_SHA = '',
  GITHUB_ACTOR = 'unknown',
  GITHUB_EVENT_NAME = 'unknown',
} = process.env

const runUrl = `https://github.com/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`
const shortSha = GITHUB_SHA.slice(0, 7)

const subject = `🚨 [CI Mossine] Échec du workflow "${GITHUB_WORKFLOW}"`

const text = `Un workflow GitHub Actions vient d'échouer sur le projet Mossine Digital.

Workflow   : ${GITHUB_WORKFLOW}
Branche    : ${GITHUB_REF_NAME}
Commit     : ${shortSha || '—'}
Déclencheur : ${GITHUB_EVENT_NAME} (par ${GITHUB_ACTOR})
Repo       : ${GITHUB_REPOSITORY}

Voir les logs et l'origine de l'échec :
${runUrl}

— Notification automatique CI Mossine.
`

const html = `<!doctype html>
<html lang="fr">
  <body style="margin:0;padding:24px;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1B1F3B;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e8eaf6;">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#FF5964;font-weight:600;">Alerte CI</p>
      <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;line-height:1.25;">Échec du workflow <span style="color:#0E70C8;">${escapeHtml(GITHUB_WORKFLOW)}</span></h1>
      <p style="margin:0 0 24px;color:#4a5072;line-height:1.55;">Un job GitHub Actions vient d'échouer sur le projet Mossine Digital. Détails ci-dessous.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#7a809b;width:120px;">Workflow</td><td style="padding:8px 0;"><code style="background:#f5f5f7;padding:2px 6px;border-radius:4px;">${escapeHtml(GITHUB_WORKFLOW)}</code></td></tr>
        <tr><td style="padding:8px 0;color:#7a809b;">Branche</td><td style="padding:8px 0;"><code style="background:#f5f5f7;padding:2px 6px;border-radius:4px;">${escapeHtml(GITHUB_REF_NAME)}</code></td></tr>
        <tr><td style="padding:8px 0;color:#7a809b;">Commit</td><td style="padding:8px 0;"><code style="background:#f5f5f7;padding:2px 6px;border-radius:4px;">${escapeHtml(shortSha) || '—'}</code></td></tr>
        <tr><td style="padding:8px 0;color:#7a809b;">Déclencheur</td><td style="padding:8px 0;">${escapeHtml(GITHUB_EVENT_NAME)} <span style="color:#7a809b;">par</span> ${escapeHtml(GITHUB_ACTOR)}</td></tr>
      </table>
      <div style="margin:32px 0 0;text-align:center;">
        <a href="${runUrl}" style="display:inline-block;background:#1B1F3B;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:999px;font-weight:600;font-size:14px;">Voir les logs sur GitHub →</a>
      </div>
      <p style="margin:32px 0 0;font-size:12px;color:#7a809b;line-height:1.55;text-align:center;">Notification automatique du système CI Mossine.<br>Pour ne plus recevoir ces alertes, retirer le secret <code>RESEND_API_KEY</code> du repo.</p>
    </div>
  </body>
</html>`

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const res = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({ from, to: [to], subject, text, html }),
})

if (!res.ok) {
  const body = await res.text().catch(() => '')
  console.error(`[ci-notify] Resend error ${res.status}:`, body)
  // On exit 1 pour signaler un problème de notification — utile pour
  // détecter une clé API expirée. Ne masque pas l'échec d'origine
  // (le job qui a vraiment foiré reste rouge dans GitHub).
  process.exit(1)
}

console.log(`[ci-notify] alerte envoyée à ${to}`)
