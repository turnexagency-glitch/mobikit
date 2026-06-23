import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Mobikit — Linge de Maison Maroc',
  description: 'Contactez Mobikit pour toute question sur nos collections de linge de maison haut de gamme au Maroc. Showrooms à Casablanca et Rabat. Réponse sous 24h.',
  keywords: 'contact mobikit, mobikit casablanca, boutique linge maison casablanca, service client linge maison maroc',
  openGraph: {
    title: 'Contactez Mobikit | Linge de Maison Haut de Gamme Maroc',
    description: 'Notre équipe vous répond sous 24h. Showrooms Descamps à Casablanca et Rabat.',
    url: 'https://www.mobikit.ma/contact',
  },
  alternates: { canonical: 'https://www.mobikit.ma/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
