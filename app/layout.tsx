import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import CartDrawer from '@/components/CartDrawer'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'Mobikit | Linge de Maison Haut de Gamme au Maroc — Descamps, Treca, Pyrenex',
  description: 'Mobikit, distributeur officiel au Maroc de Descamps, Treca Paris, Pyrenex, Le Jacquard Français et Esteban Parfums. Linge de lit, literie, linge de bain et décoration luxe à Casablanca et Rabat.',
  keywords: [
    'linge de maison maroc',
    'linge de maison casablanca',
    'descamps maroc',
    'descamps casablanca',
    'literie luxe maroc',
    'treca paris maroc',
    'pyrenex maroc',
    'couette luxe maroc',
    'parure de lit maroc',
    'linge de bain luxe maroc',
    'le jacquard français maroc',
    'esteban parfums maroc',
    'décoration maison maroc',
    'boutique linge maison casablanca',
    'matelas luxe maroc',
    'linge de table maroc',
    'linge de maison haut de gamme',
    'mobikit',
    'mobikit.ma',
  ].join(', '),
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
    title: 'Mobikit | Linge de Maison Haut de Gamme — Descamps, Treca, Pyrenex au Maroc',
    description: 'Distributeur officiel au Maroc de Descamps, Treca Paris, Pyrenex et Le Jacquard Français. Linge de lit, literie de luxe et décoration à Casablanca et Rabat.',
    images: [{ url: '/images/showroom-mobikit.webp', width: 1200, height: 630, alt: 'Mobikit Showroom — Linge de Maison Haut de Gamme au Maroc' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobikit | Linge de Maison Haut de Gamme au Maroc',
    description: 'Descamps, Treca Paris, Pyrenex, Le Jacquard Français — Distributeur officiel au Maroc.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  alternates: {
    canonical: 'https://www.mobikit.ma',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Mobikit Home Collections',
  description: 'Distributeur officiel des plus grandes marques européennes de linge de maison, literie, mobilier et décoration au Maroc. Descamps, Treca Paris, Pyrenex, Le Jacquard Français, Esteban Parfums.',
  url: 'https://www.mobikit.ma',
  telephone: '+212666427890',
  email: 'mobikit@mobikit.ma',
  image: 'https://www.mobikit.ma/images/showroom-mobikit.webp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Résidence Yasmine, 45 Bd Ghandi',
    addressLocality: 'Casablanca',
    addressRegion: 'Casablanca-Settat',
    postalCode: '20100',
    addressCountry: 'MA',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 33.5764273, longitude: -7.6524132 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '12:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '15:00', closes: '19:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '19:30' },
  ],
  sameAs: [
    'https://www.instagram.com/descamps_maroc/',
    'https://www.facebook.com/p/descamps_maroc-100064763023390/',
    'https://www.linkedin.com/company/mobikit-sarl/',
  ],
  priceRange: '$$$$',
  currenciesAccepted: 'MAD',
  paymentAccepted: 'Cash',
  areaServed: ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Agadir', 'Maroc'],
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
