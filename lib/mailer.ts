import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.mobikit.ma',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'contact@mobikit.ma',
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})
