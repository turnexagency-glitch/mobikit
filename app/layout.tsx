import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import CartDrawer from '@/components/CartDrawer'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'Mobikit Home Collections | Linge de Maison Haut de Gamme au Maroc',
  description: 'Mobikit distribue les plus grandes marques européennes de linge de maison, literie, mobilier et décoration au Maroc. Descamps, Treca, Le Jacquard Français, Esteban et plus.',
  keywords: 'linge de maison maroc, literie luxe, descamps maroc, treca paris maroc, décoration haut de gamme, linge de lit casablanca, linge de bain luxe maroc',
  metadataBase: new URL('https://www.mobikit.ma'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://www.mobikit.ma',
    siteName: 'Mobikit Home Collections',
    title: 'Mobikit Home Collections | Linge de Maison Haut de Gamme au Maroc',
    description: 'Distributeur officiel des plus grandes maisons européennes de linge de maison au Maroc. Descamps, Treca, Le Jacquard Français et plus.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Mobikit Home Collections' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobikit Home Collections',
    description: 'Linge de maison haut de gamme au Maroc',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://www.mobikit.ma',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Mobikit Home Collections',
  description: 'Distributeur officiel des plus grandes marques européennes de linge de maison, literie, mobilier et décoration au Maroc.',
  url: 'https://www.mobikit.ma',
  telephone: '+212666427890',
  email: 'contact@mobikit.ma',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Résidence Yasmine, 45 Bd Ghandi',
    addressLocality: 'Casablanca',
    addressCountry: 'MA',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 33.5764273, longitude: -7.6524132 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '12:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '15:00', closes: '19:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '12:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '15:00', closes: '19:30' },
  ],
  sameAs: [
    'https://www.instagram.com/descamps_maroc/',
    'https://www.facebook.com/p/descamps_maroc-100064763023390/',
    'https://www.linkedin.com/company/mobikit-sarl/',
  ],
  priceRange: '$$$$',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
