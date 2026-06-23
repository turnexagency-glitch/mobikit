import { NextRequest, NextResponse } from 'next/server'
import { sendMail } from '@/lib/mailer'
import { checkRateLimit } from '@/lib/rateLimit'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (!checkRateLimit(ip, 5, 60_000)) {
      return NextResponse.json({ error: 'Trop de requêtes, réessayez dans 1 minute.' }, { status: 429 })
    }

    const body = await req.json()
    const { nom, email, telephone, sujet, message } = body

    if (!nom || !email || !sujet || !message) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 })
    }
    if (nom.length > 150 || email.length > 254 || sujet.length > 200 || message.length > 3000) {
      return NextResponse.json({ error: 'Champ trop long.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'contact@mobikit.ma'
    const sNom = esc(nom)
    const sEmail = esc(email)
    const sSujet = esc(sujet)
    const sTel = esc(telephone || '')
    const sMessage = esc(message).replace(/\n/g, '<br>')

    await Promise.all([
      sendMail({
        to: adminEmail,
        replyTo: email,
        subject: `📩 Nouveau message — ${sSujet} | ${sNom}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;padding:30px;background:#f9f7f4;">
            <div style="background:#1A1A1A;padding:25px;text-align:center;margin-bottom:25px;">
              <div style="font-family:Georgia,serif;font-size:24px;color:white;font-weight:300;">Mobikit</div>
              <div style="font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#C4A35A;margin-top:3px;">Nouveau Message</div>
            </div>
            <h2 style="color:#1A1A1A;border-bottom:2px solid #C4A35A;padding-bottom:10px;font-weight:400;">📩 ${sSujet}</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#666;width:120px;">Nom</td><td style="padding:8px 0;font-weight:600;color:#1A1A1A;">${sNom}</td></tr>
              <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${sEmail}" style="color:#C4A35A;">${sEmail}</a></td></tr>
              <tr><td style="padding:8px 0;color:#666;">Téléphone</td><td style="padding:8px 0;color:#1A1A1A;">${sTel || 'Non renseigné'}</td></tr>
              <tr><td style="padding:8px 0;color:#666;">Sujet</td><td style="padding:8px 0;color:#1A1A1A;">${sSujet}</td></tr>
            </table>
            <div style="background:white;padding:20px;border-left:3px solid #C4A35A;margin-top:20px;">
              <p style="color:#666;font-size:12px;margin:0 0 8px;">Message :</p>
              <p style="color:#1A1A1A;line-height:1.7;margin:0;">${sMessage}</p>
            </div>
            <p style="color:#999;font-size:11px;margin-top:20px;">Répondez directement à cet email pour contacter ${sNom}.</p>
          </div>
        `,
      }),

      sendMail({
        to: email,
        fromName: 'Mobikit Home Collections',
        subject: 'Votre message a bien été reçu — Mobikit',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;background:#f9f7f4;">
            <div style="background:#1A1A1A;padding:30px;text-align:center;">
              <div style="font-family:Georgia,serif;font-size:28px;color:white;font-weight:300;">Mobikit</div>
              <div style="font-size:10px;letter-spacing:5px;text-transform:uppercase;color:#C4A35A;margin-top:4px;">Home Collections</div>
            </div>
            <div style="padding:35px;">
              <h2 style="font-family:Georgia,serif;font-size:22px;font-weight:300;color:#1A1A1A;">Bonjour ${sNom},</h2>
              <p style="color:#666;line-height:1.7;">Nous avons bien reçu votre message concernant <strong style="color:#1A1A1A;">${sSujet}</strong>.</p>
              <p style="color:#666;line-height:1.7;">Notre équipe vous répondra dans les meilleurs délais, généralement sous <strong>24 à 48 heures</strong> ouvrables.</p>
              <div style="background:white;border:1px solid #f0ebe0;padding:20px;margin:25px 0;">
                <p style="font-size:11px;color:#999;margin:0 0 10px;text-transform:uppercase;letter-spacing:2px;">Votre message</p>
                <p style="color:#1A1A1A;line-height:1.6;margin:0;">${sMessage}</p>
              </div>
              <p style="color:#666;font-size:13px;">Pour toute urgence, contactez-nous au <strong>+212 666-427890</strong></p>
            </div>
            <div style="background:#1A1A1A;padding:20px;text-align:center;">
              <p style="color:#666;font-size:11px;margin:0;">Mobikit Home Collections · Casablanca, Maroc</p>
            </div>
          </div>
        `,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ success: false, error: 'Erreur envoi email' }, { status: 500 })
  }
}
