const BREVO_API = 'https://api.brevo.com/v3/smtp/email'

interface MailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
  fromName?: string
}

export async function sendMail({ to, subject, html, replyTo, fromName = 'Mobikit' }: MailOptions) {
  const res = await fetch(BREVO_API, {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: fromName, email: 'contact@mobikit.ma' },
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
