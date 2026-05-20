import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import CartDrawer from '@/components/CartDrawer'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'Mobikit Home Collections | Linge de Maison Haut de Gamme au Maroc',
  description: 'Mobikit distribue les plus grandes marques européennes de linge de maison, literie, mobilier et décoration au Maroc. Descamps, Treca, Pyrenex, Le Jacquard Français et plus.',
  keywords: 'linge de maison maroc, literie luxe, descamps maroc, treca paris maroc, décoration haut de gamme',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <Header />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}
