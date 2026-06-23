import { NextRequest, NextResponse } from 'next/server'
import { sendMail } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nom, email, telephone, sujet, message } = body

    const adminEmail = process.env.ADMIN_EMAIL || 'contact@mobikit.ma'

    await Promise.all([
      // Notification admin
      sendMail({
        to: adminEmail,
        replyTo: email,
        subject: `📩 Nouveau message — ${sujet} | ${nom}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;padding:30px;background:#f9f7f4;">
            <div style="background:#1A1A1A;padding:25px;text-align:center;margin-bottom:25px;">
              <div style="font-family:Georgia,serif;font-size:24px;color:white;font-weight:300;">Mobikit</div>
              <div style="font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#C4A35A;margin-top:3px;">Nouveau Message</div>
            </div>
            <h2 style="color:#1A1A1A;border-bottom:2px solid #C4A35A;padding-bottom:10px;font-weight:400;">📩 ${sujet}</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#666;width:120px;">Nom</td><td style="padding:8px 0;font-weight:600;color:#1A1A1A;">${nom}</td></tr>
              <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#C4A35A;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#666;">Téléphone</td><td style="padding:8px 0;color:#1A1A1A;">${telephone || 'Non renseigné'}</td></tr>
              <tr><td style="padding:8px 0;color:#666;">Sujet</td><td style="padding:8px 0;color:#1A1A1A;">${sujet}</td></tr>
            </table>
            <div style="background:white;padding:20px;border-left:3px solid #C4A35A;margin-top:20px;">
              <p style="color:#666;font-size:12px;margin:0 0 8px;">Message :</p>
              <p style="color:#1A1A1A;line-height:1.7;margin:0;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="color:#999;font-size:11px;margin-top:20px;">Répondez directement à cet email pour contacter ${nom}.</p>
          </div>
        `,
      }),

      // Confirmation client
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
              <h2 style="font-family:Georgia,serif;font-size:22px;font-weight:300;color:#1A1A1A;">Bonjour ${nom},</h2>
              <p style="color:#666;line-height:1.7;">Nous avons bien reçu votre message concernant <strong style="color:#1A1A1A;">${sujet}</strong>.</p>
              <p style="color:#666;line-height:1.7;">Notre équipe vous répondra dans les meilleurs délais, généralement sous <strong>24 à 48 heures</strong> ouvrables.</p>
              <div style="background:white;border:1px solid #f0ebe0;padding:20px;margin:25px 0;">
                <p style="font-size:11px;color:#999;margin:0 0 10px;text-transform:uppercase;letter-spacing:2px;">Votre message</p>
                <p style="color:#1A1A1A;line-height:1.6;margin:0;">${message.replace(/\n/g, '<br>')}</p>
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
    console.error('SMTP contact error:', err)
    return NextResponse.json({ success: false, error: 'Erreur envoi email' }, { status: 500 })
  }
}
