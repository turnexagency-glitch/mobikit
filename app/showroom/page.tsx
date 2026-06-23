import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Phone, CalendarDays, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Showroom Mobikit | Boutique Descamps Casablanca & Rabat',
  description: 'Visitez nos boutiques Descamps à Casablanca et Rabat. Linge de maison, literie et décoration haut de gamme. Conseil personnalisé par nos experts. Ouvert 6j/7.',
  keywords: 'boutique linge maison casablanca, descamps casablanca, boutique descamps rabat, showroom linge maison maroc, magasin linge maison casablanca, mobikit casablanca',
  openGraph: {
    title: 'Boutiques Mobikit | Descamps Casablanca & Rabat',
    description: 'Visitez nos showrooms de linge de maison haut de gamme à Casablanca et Rabat. Conseil personnalisé sur place.',
    url: 'https://www.mobikit.ma/showroom',
    images: [{ url: '/images/showroom-mobikit.webp', width: 1200, height: 630, alt: 'Showroom Mobikit Casablanca — Boutique Descamps Maroc' }],
  },
  alternates: { canonical: 'https://www.mobikit.ma/showroom' },
}

const showroomSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'Mobikit — Descamps Casablanca',
    description: 'Boutique Descamps à Casablanca — Linge de maison, literie de luxe et décoration haut de gamme.',
    url: 'https://www.mobikit.ma/showroom#casablanca',
    telephone: '+212666427890',
    email: 'contact@mobikit.ma',
    image: 'https://www.mobikit.ma/images/showroom-mobikit.webp',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Casablanca',
      addressRegion: 'Grand Casablanca',
      addressCountry: 'MA',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 33.5764273, longitude: -7.6524132 },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '12:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '15:00', closes: '19:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '19:30' },
    ],
    priceRange: '$$$$',
    currenciesAccepted: 'MAD',
    parentOrganization: { '@type': 'Organization', name: 'Mobikit Home Collections', url: 'https://www.mobikit.ma' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'Mobikit — Descamps Rabat',
    description: 'Boutique Descamps à Rabat — Linge de maison, literie et décoration haut de gamme.',
    url: 'https://www.mobikit.ma/showroom#rabat',
    telephone: '+212666427890',
    email: 'contact@mobikit.ma',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rabat',
      addressRegion: 'Rabat-Salé-Kénitra',
      addressCountry: 'MA',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 33.9545219, longitude: -6.8527329 },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '10:00', closes: '20:00' },
    ],
    priceRange: '$$$$',
    currenciesAccepted: 'MAD',
    parentOrganization: { '@type': 'Organization', name: 'Mobikit Home Collections', url: 'https://www.mobikit.ma' },
  },
]

const photos = [
  '/images/showroom-mobikit.webp',
  '/images/descamps-bed-green.webp',
  '/images/showroom-linge.webp',
  '/images/descamps-bed-beige.webp',
  '/images/esteban-diffuseurs.webp',
  '/images/descamps-bed-floral.webp',
]

const locations = [
  {
    city: 'Casablanca',
    brand: 'Descamps Casablanca',
    address: 'Casablanca, Maroc',
    phone: '+212 666-427890',
    hours: [
      'Lun – Ven : 09h00–12h30 / 15h00–19h30',
      'Samedi : 09h00–12h30 / 15h00–19h30',
      'Dimanche : Fermé',
    ],
    mapsUrl: 'https://google.com/maps/place/Descamps/data=!4m2!3m1!1s0x0:0x90d5627baa932cb1',
    embedUrl: 'https://maps.google.com/maps?q=Descamps+Casablanca+Maroc&z=15&output=embed',
  },
  {
    city: 'Rabat',
    brand: 'Descamps Rabat',
    address: 'Rabat, Maroc',
    phone: '+212 666-427890',
    hours: ['Lun – Dim : 10h00 – 20h00', '7J/7'],
    mapsUrl: 'https://www.google.com/maps/place/Descamps/@33.9545219,-6.8527329',
    embedUrl: 'https://maps.google.com/maps?q=33.9545219,-6.8527329&z=15&output=embed',
  },
]

export default function ShowroomPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(showroomSchema) }} />
      {/* Hero */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <Image src="/images/descamps-bed-teal.webp" alt="Showroom Mobikit" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-6">
          <p className="section-subtitle text-gold mb-3">Venez Nous Rendre Visite</p>
          <h1 className="font-serif text-5xl font-light">Nos Points de Vente</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 px-6 bg-cream text-center">
        <p className="text-sm text-charcoal-light max-w-xl mx-auto">
          Retrouvez nos collections Descamps dans nos deux boutiques au Maroc. Nos conseillers vous accueillent pour vous guider dans votre choix.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <a href="#casablanca" className="btn-primary">Casablanca</a>
          <a href="#rabat" className="btn-outline">Rabat</a>
        </div>
      </section>

      {/* Locations */}
      {locations.map((loc, i) => (
        <section
          key={loc.city}
          id={loc.city.toLowerCase()}
          className={`py-20 px-6 ${i % 2 === 1 ? 'bg-cream' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-12 items-start ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

              {/* Info */}
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <p className="section-subtitle mb-2">{loc.city}</p>
                <h2 className="section-title mb-4">{loc.brand}</h2>
                <div className="w-10 h-px bg-gold mb-8" />

                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-gold flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-widest uppercase text-charcoal mb-1">Adresse</p>
                      <p className="text-xs text-charcoal-light">{loc.address}</p>
                      <a
                        href={loc.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] text-gold tracking-widest uppercase mt-2 hover:underline"
                      >
                        Ouvrir dans Google Maps <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-gold flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-widest uppercase text-charcoal mb-1">Horaires</p>
                      {loc.hours.map(h => (
                        <p key={h} className="text-xs text-charcoal-light">{h}</p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-gold flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-widest uppercase text-charcoal mb-1">Téléphone</p>
                      <a href={`tel:${loc.phone}`} className="text-xs text-charcoal-light hover:text-gold transition-colors">
                        {loc.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-cream border-l-2 border-gold mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <CalendarDays size={16} className="text-gold" />
                    <p className="text-xs font-medium tracking-widest uppercase text-charcoal">Visite sur Rendez-Vous</p>
                  </div>
                  <p className="text-xs text-charcoal-light leading-relaxed">
                    Pour un conseil personnalisé, prenez rendez-vous avec l&apos;un de nos experts.
                  </p>
                </div>

                <Link href="/contact" className="btn-primary">Prendre Rendez-Vous</Link>
              </div>

              {/* Map */}
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="w-full h-80 lg:h-[450px] overflow-hidden border border-cream-dark shadow-sm">
                  <iframe
                    src={loc.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Carte ${loc.brand}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Gallery */}
      <section className="py-16 px-6 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-ultra-wide uppercase text-gold mb-3">Galerie</p>
            <h2 className="font-serif text-3xl font-light text-white">L&apos;Univers Mobikit</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((photo, i) => (
              <div key={i} className={`relative overflow-hidden ${i === 0 ? 'col-span-2 aspect-[16/7]' : 'aspect-square'}`}>
                <Image src={photo} alt={`Showroom Mobikit ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
