import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendMail } from '@/lib/mailer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlb3l5bXdla2p2dHpncGN0dnF1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDg0MjM3MywiZXhwIjoyMDk2NDE4MzczfQ.cI3Ww0KU8a6z5JOpvOgTozrnE3PyscELUAc-FZLpzOM'
)

function emailClient(data: {
  prenom: string; nom: string; email: string; telephone: string
  adresse: string; ville: string; instructions: string
  paymentMethod: string; items: { name: string; brand: string; price: number; qty: number }[]
  subtotal: number; shipping: number; total: number; orderId: string
}) {
  const paymentLabel = 'Paiement à la livraison (cash)'

  const itemsHtml = data.items.map(i => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0ebe0;">
        <span style="font-size:11px;color:#C4A35A;text-transform:uppercase;letter-spacing:2px;">${i.brand}</span><br>
        <span style="font-size:13px;color:#1A1A1A;">${i.name}</span><br>
        <span style="font-size:11px;color:#6b7280;">Qté : ${i.qty}</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #f0ebe0;text-align:right;font-size:13px;color:#1A1A1A;font-weight:500;white-space:nowrap;">
        ${(i.price * i.qty).toLocaleString('fr-MA')} MAD
      </td>
    </tr>
  `).join('')

  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:0;background:#F5F0E8;font-family:'Helvetica Neue',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;padding:40px 20px;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;">

          <!-- Header -->
          <tr>
            <td style="background:#1A1A1A;padding:35px;text-align:center;">
              <div style="font-family:Georgia,serif;font-size:32px;font-weight:300;color:#fff;letter-spacing:2px;">Mobikit</div>
              <div style="font-size:10px;letter-spacing:6px;text-transform:uppercase;color:#C4A35A;margin-top:4px;">Home Collections</div>
            </td>
          </tr>

          <!-- Gold bar -->
          <tr><td style="background:#C4A35A;height:3px;"></td></tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 35px;">
              <p style="font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:3px;margin:0 0 8px;">Confirmation de commande</p>
              <h1 style="font-family:Georgia,serif;font-size:26px;font-weight:300;color:#1A1A1A;margin:0 0 6px;">Merci ${data.prenom} !</h1>
              <p style="font-size:13px;color:#6b7280;margin:0 0 30px;">Votre commande <strong style="color:#1A1A1A;">${data.orderId}</strong> a bien été enregistrée.</p>

              <!-- Items -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td colspan="2" style="padding-bottom:10px;border-bottom:2px solid #1A1A1A;">
                    <span style="font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#1A1A1A;font-weight:600;">Articles commandés</span>
                  </td>
                </tr>
                ${itemsHtml}
                <tr>
                  <td style="padding:8px 0;font-size:12px;color:#6b7280;">Livraison</td>
                  <td style="padding:8px 0;font-size:12px;color:${data.shipping === 0 ? '#16a34a' : '#6b7280'};text-align:right;">
                    ${data.shipping === 0 ? 'Gratuite' : `${data.shipping} MAD`}
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;font-size:15px;font-weight:600;color:#1A1A1A;border-top:2px solid #1A1A1A;">Total</td>
                  <td style="padding:12px 0;font-family:Georgia,serif;font-size:20px;font-weight:300;color:#1A1A1A;text-align:right;border-top:2px solid #1A1A1A;">
                    ${data.total.toLocaleString('fr-MA')} MAD
                  </td>
                </tr>
              </table>

              <!-- Info boxes -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td width="48%" style="background:#F5F0E8;padding:18px;vertical-align:top;">
                    <p style="font-size:10px;text-transform:uppercase;letter-spacing:3px;color:#C4A35A;margin:0 0 8px;font-weight:600;">Livraison</p>
                    <p style="font-size:12px;color:#1A1A1A;margin:0 0 4px;">${data.prenom} ${data.nom}</p>
                    <p style="font-size:12px;color:#6b7280;margin:0 0 2px;">${data.adresse}</p>
                    <p style="font-size:12px;color:#6b7280;margin:0 0 2px;">${data.ville}, Maroc</p>
                    <p style="font-size:12px;color:#6b7280;margin:0;">${data.telephone}</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background:#F5F0E8;padding:18px;vertical-align:top;">
                    <p style="font-size:10px;text-transform:uppercase;letter-spacing:3px;color:#C4A35A;margin:0 0 8px;font-weight:600;">Paiement</p>
                    <p style="font-size:12px;color:#1A1A1A;margin:0 0 6px;">${paymentLabel}</p>
                    <p style="font-size:11px;color:#6b7280;margin:0;">Préparez le montant exact lors de la livraison.</p>
                  </td>
                </tr>
              </table>

              <p style="font-size:12px;color:#6b7280;line-height:1.7;">
                Notre équipe traite votre commande et vous contactera sous <strong>24h</strong> pour confirmer la livraison.
                Pour toute question, répondez à cet email ou appelez-nous.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1A1A1A;padding:25px 35px;text-align:center;">
              <p style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6b7280;margin:0 0 5px;">
                Mobikit Home Collections · Casablanca, Maroc
              </p>
              <p style="font-size:10px;color:#6b7280;margin:0;">
                <a href="mailto:mobikit@mobikit.ma" style="color:#C4A35A;text-decoration:none;">mobikit@mobikit.ma</a>
              </p>
            </td>
          </tr>

        </table>
      </td></tr>
    </table>
  </body>
  </html>`
}

function emailAdmin(data: {
  prenom: string; nom: string; email: string; telephone: string
  adresse: string; ville: string; instructions: string
  paymentMethod: string; items: { name: string; brand: string; price: number; qty: number }[]
  total: number; orderId: string
}) {
  const paymentLabel = '💵 Paiement à la livraison'
  const itemsList = data.items.map(i => `• ${i.brand} — ${i.name} (x${i.qty}) — ${(i.price * i.qty).toLocaleString('fr-MA')} MAD`).join('\n')

  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;padding:30px;background:#f9f7f4;">
    <h2 style="color:#1A1A1A;border-bottom:2px solid #C4A35A;padding-bottom:10px;">🛍️ Nouvelle commande ${data.orderId}</h2>
    <p><strong>Client :</strong> ${data.prenom} ${data.nom}</p>
    <p><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></p>
    <p><strong>Téléphone :</strong> ${data.telephone}</p>
    <p><strong>Adresse :</strong> ${data.adresse}, ${data.ville}</p>
    ${data.instructions ? `<p><strong>Instructions :</strong> ${data.instructions}</p>` : ''}
    <hr style="border:none;border-top:1px solid #ddd;margin:20px 0;">
    <p><strong>Articles :</strong></p>
    <pre style="background:#fff;padding:15px;font-size:13px;">${itemsList}</pre>
    <p><strong>Total : <span style="color:#C4A35A;font-size:18px;">${data.total.toLocaleString('fr-MA')} MAD</span></strong></p>
    <p><strong>Paiement :</strong> ${paymentLabel}</p>
  </div>`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { form, items, paymentMethod, subtotal, shipping, total, orderId } = body

    const adminEmail = process.env.ADMIN_EMAIL || 'contact@mobikit.ma'

    // Save order to Supabase
    try {
      await supabase.from('orders').insert({
        order_id: orderId,
        status: 'pending',
        payment_method: paymentMethod,
        total,
        subtotal,
        shipping,
        customer: {
          prenom: form.prenom,
          nom: form.nom,
          email: form.email,
          telephone: form.telephone,
          ville: form.ville,
          adresse: form.adresse,
          notes: form.notes || '',
        },
        items: items.map((i: any) => ({
          name: i.name,
          brand: i.brand,
          price: i.price,
          qty: i.qty,
        })),
      })
    } catch (e) {
      console.error('Supabase save error:', e)
    }

    try {
      await Promise.all([
        sendMail({
          to: form.email,
          fromName: 'Mobikit Home Collections',
          subject: `Confirmation de commande ${orderId} — Mobikit`,
          html: emailClient({ ...form, paymentMethod, items, subtotal, shipping, total, orderId }),
        }),
        sendMail({
          to: adminEmail,
          fromName: 'Mobikit Boutique',
          subject: `🛍️ Nouvelle commande ${orderId} — ${form.prenom} ${form.nom} — ${total.toLocaleString('fr-MA')} MAD`,
          html: emailAdmin({ ...form, paymentMethod, items, total, orderId }),
        }),
      ])
      return NextResponse.json({ success: true, orderId, emailSent: true })
    } catch (emailErr) {
      console.error('SMTP error (order saved):', emailErr)
      return NextResponse.json({ success: true, orderId, emailSent: false })
    }
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
