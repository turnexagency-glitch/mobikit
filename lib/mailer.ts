import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.mobikit.ma',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'contact@mobikit.ma',
    pass: process.env.SMTP_PASS,
  },
})
