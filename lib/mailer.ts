import https from 'https'

const BREVO_HOST = 'api.brevo.com'
const BREVO_PATH = '/v3/smtp/email'

interface MailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
  fromName?: string
}

const clean = (s?: string) => s?.trim().replace(/[\r\n]/g, '') ?? ''

export function sendMail({ to, subject, html, replyTo, fromName = 'Mobikit' }: MailOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const apiKey = clean(process.env.BREVO_API_KEY)
    const toClean = clean(to)
    if (!apiKey) return reject(new Error('BREVO_API_KEY manquante'))
    if (!toClean) return reject(new Error('Destinataire manquant'))

    const payload = JSON.stringify({
      sender: { name: fromName, email: 'contact@mobikit.ma' },
      to: [{ email: toClean }],
      ...(replyTo ? { replyTo: { email: clean(replyTo) } } : {}),
      subject,
      htmlContent: html,
    })

    const options = {
      hostname: BREVO_HOST,
      path: BREVO_PATH,
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`Brevo error ${res.statusCode}: ${data}`))
        } else {
          resolve()
        }
      })
    })

    req.on('error', reject)
    req.write(payload)
    req.end()
  })
}
