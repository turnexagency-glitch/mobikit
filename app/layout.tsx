import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Mobikit Home Collections | Linge de Maison Haut de Gamme au Maroc',
  description: 'Mobikit distribue les plus grandes marques européennes de linge de maison, literie, mobilier et décoration au Maroc. Descamps, Treca, Pyrenex, Le Jacquard Français et plus.',
  keywords: 'linge de maison maroc, literie luxe, descamps maroc, treca paris maroc, décoration haut de gamme',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
