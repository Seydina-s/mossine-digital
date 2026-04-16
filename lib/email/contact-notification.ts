import { SERVICE_OPTIONS, BUDGET_OPTIONS, type ContactPayload } from '@/lib/contact-schema'

// ─────────────────────────────────────────────────────────────────
//  Template email — notification reçue par l'équipe Mossine Digital.
//  HTML inline (compatibilité clients mails : Gmail, Outlook, iOS).
// ─────────────────────────────────────────────────────────────────

function labelOf(
  value: string | undefined,
  options: readonly { value: string; label: string }[],
) {
  if (!value) return '—'
  return options.find((o) => o.value === value)?.label ?? value
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function buildContactNotification(data: ContactPayload) {
  const service = labelOf(data.service, SERVICE_OPTIONS)
  const budget = labelOf(data.budget || undefined, BUDGET_OPTIONS)
  const phone = data.phone?.trim() || '—'
  const company = data.company?.trim() || '—'
  const receivedAt = new Date().toLocaleString('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Africa/Dakar',
  })

  const subject = `Nouveau lead · ${service} · ${data.name}`

  const text = `Nouveau message depuis le formulaire mossinedigital.com

Reçu : ${receivedAt}
───────────────────────────────────────────

Nom         : ${data.name}
Email       : ${data.email}
Téléphone   : ${phone}
Entreprise  : ${company}

Service     : ${service}
Budget      : ${budget}

Message :
${data.message}
`

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f6fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1B1F3B;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f5f6fa;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(16,19,42,0.04);">
          <!-- Header -->
          <tr>
            <td style="background:#1B1F3B;padding:28px 32px;">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#35A7FF;font-weight:600;">Nouveau lead</p>
              <h1 style="margin:0;font-size:22px;line-height:1.3;color:#ffffff;font-weight:700;">Formulaire de contact</h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.55);">${escapeHtml(receivedAt)}</p>
            </td>
          </tr>

          <!-- Identité -->
          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6B7280;font-weight:600;">Contact</p>
              ${row('Nom', escapeHtml(data.name))}
              ${row('Email', `<a href="mailto:${escapeHtml(data.email)}" style="color:#35A7FF;text-decoration:none;">${escapeHtml(data.email)}</a>`)}
              ${row('Téléphone', phone === '—' ? '—' : `<a href="tel:${escapeHtml(phone)}" style="color:#35A7FF;text-decoration:none;">${escapeHtml(phone)}</a>`)}
              ${row('Entreprise', escapeHtml(company))}
            </td>
          </tr>

          <!-- Projet -->
          <tr>
            <td style="padding:12px 32px 8px;">
              <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6B7280;font-weight:600;">Projet</p>
              ${row('Service', escapeHtml(service))}
              ${row('Budget', escapeHtml(budget))}
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:12px 32px 28px;">
              <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6B7280;font-weight:600;">Message</p>
              <div style="background:#F0F7FF;border-left:3px solid #35A7FF;padding:16px 18px;border-radius:8px;font-size:15px;line-height:1.6;color:#1B1F3B;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 32px 28px;" align="center">
              <a href="mailto:${escapeHtml(data.email)}?subject=Re:%20Votre%20projet%20${encodeURIComponent(service)}" style="display:inline-block;background:#FF5964;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:999px;font-size:14px;font-weight:600;">Répondre à ${escapeHtml(data.name.split(' ')[0])}</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F8F9FA;padding:18px 32px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#9CA3AF;">
                Envoyé automatiquement depuis <strong style="color:#1B1F3B;">mossinedigital.com</strong> · Répondez directement à cet email pour contacter ${escapeHtml(data.name.split(' ')[0])}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { subject, html, text }
}

function row(label: string, value: string) {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:10px;">
    <tr>
      <td width="110" style="vertical-align:top;padding-right:12px;font-size:13px;color:#6B7280;">${label}</td>
      <td style="vertical-align:top;font-size:15px;color:#1B1F3B;font-weight:500;">${value}</td>
    </tr>
  </table>`
}
