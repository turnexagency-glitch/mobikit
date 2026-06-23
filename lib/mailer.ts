const BREVO_API = 'https://api.brevo.com/v3/smtp/email'

interface MailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
  fromName?: string
}

export async function sendMail({ to, subject, html, replyTo, fromName = 'Mobikit' }: MailOptions) {
  const apiKey = process.env.BREVO_API_KEY
  console.log('[Brevo] apiKey present:', !!apiKey, '| to:', to)
  if (!apiKey) throw new Error('BREVO_API_KEY manquante')

  const res = await fetch(BREVO_API, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: fromName, email: 'turnexagency@gmail.com' },
      to: [{ email: to }],
      ...(replyTo ? { replyTo: { email: replyTo } } : {}),
      subject,
      htmlContent: html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Brevo error ${res.status}: ${err}`)
  }
}
