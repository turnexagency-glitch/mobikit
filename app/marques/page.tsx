import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllBrands } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Nos Marques | Descamps, Treca, Pyrenex, Le Jacquard Français au Maroc — Mobikit',
  description: 'Mobikit est distributeur officiel au Maroc de Descamps, Treca Paris, Pyrenex, Le Jacquard Français, Esteban Parfums, Aquanova et plus. Linge de maison haut de gamme livré partout au Royaume.',
  keywords: 'marques linge de maison maroc, descamps maroc distributeur, treca paris maroc, pyrenex maroc, le jacquard français maroc, esteban parfums maroc, aquanova maroc, marques luxe linge maison maroc',
  openGraph: {
    title: 'Grandes Marques de Linge de Maison au Maroc | Mobikit',
    description: 'Distributeur officiel Descamps, Treca Paris, Pyrenex, Le Jacquard Français, Esteban Parfums au Maroc.',
    url: 'https://www.mobikit.ma/marques',
    images: [{ url: '/images/showroom-mobikit.webp', width: 1200, height: 630, alt: 'Marques Linge de Maison — Mobikit Maroc' }],
  },
  alternates: { canonical: 'https://www.mobikit.ma/marques' },
}
import { brands as localBrands } from '@/data/brands'

export const revalidate = 3600

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80'

const FEATURED_IMAGES: Record<string, string> = {
  descamps: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
  treca:    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  pyrenex:  'https://images.unsplash.com/photo-1614267157481-ca2b81ac6fcc?w=600&q=80',
}

const BRAND_LOGOS: Record<string, string> = {
  descamps:               '/descamps.png',
  treca:                  '/treca.png',
  'le-jacquard-francais': '/le-jacquard-francais.png',
  'esteban-parfums':      '/esteban.png',
  aquanova:               '/aquanova.png',
  blomus:                 '/blomus.png',
  'brun-de-vian-tiran':   '/bvt.png',
  pilus:                  '/pilus.png',
  ilum:                   '/ilum.png',
  vispring:               '/vispring.png',
  'la-savonnerie-royale': '/savonnerie-royale.png',
}

export default async function MarquesPage() {
  const sanityBrands = await getAllBrands().catch(() => [])
  // Si Sanity a des marques, on les utilise — sinon fallback sur le fichier local
  const brands: any[] = sanityBrands.length > 0 ? sanityBrands : localBrands

  const featured = brands.filter(b => b.featured)
  const rest = brands.filter(b => !b.featured)

  function getImage(brand: any): string {
    if (brand.coverImage) return brand.coverImage
    if (brand.featured) return FEATURED_IMAGES[brand.slug] || FALLBACK_IMAGE
    return FALLBACK_IMAGE
  }

  function getThumb(brand: any): string {
    if (brand.logo) return brand.logo
    if (brand.coverImage) return brand.coverImage
    return BRAND_LOGOS[brand.slug] || FALLBACK_IMAGE
  }

  return (
    <>
      <section className="bg-cream py-16 px-6 text-center">
        <p className="section-subtitle mb-3">Portfolio</p>
        <h1 className="section-title">Nos Maisons de Prestige</h1>
        <div className="gold-divider" />
        <p className="text-sm text-charcoal-light max-w-xl mx-auto mt-4">
          Depuis 1997, Mobikit sélectionne avec exigence les plus grandes maisons européennes, reconnues mondialement pour leur savoir-faire et leur excellence.
        </p>
      </section>

      {featured.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-2xl font-light text-charcoal mb-8">Marques Phares</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {featured.map((brand: any) => (
                <Link key={brand.slug || brand._id} href={`/marques/${brand.slug}`} className="group block">
                  <div className="relative overflow-hidden aspect-[4/3] mb-4">
                    <Image
                      src={getImage(brand)}
                      alt={brand.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    {brand.country && (
                      <div className="absolute top-4 left-4 bg-gold text-white text-[9px] tracking-widest uppercase px-3 py-1">
                        {brand.country}
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl font-light text-charcoal mb-1 group-hover:text-gold transition-colors">{brand.name}</h3>
                  <p className="text-[10px] tracking-widest uppercase text-gold mb-2">{brand.tagline}</p>
                  <p className="text-xs text-charcoal-light leading-relaxed line-clamp-2">{brand.description}</p>
                  {brand.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {brand.categories.map((cat: string) => (
                        <span key={cat} className="text-[9px] tracking-widest uppercase border border-cream-dark text-charcoal-light px-2 py-0.5">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>

            <h2 className="font-serif text-2xl font-light text-charcoal mb-8 pt-8 border-t border-cream-dark">Toutes Nos Marques</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((brand: any) => (
                <Link key={brand.slug || brand._id} href={`/marques/${brand.slug}`} className="group flex gap-4 p-6 border border-cream-dark hover:border-gold transition-colors duration-300">
                  <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-cream">
                    <Image
                      src={getThumb(brand)}
                      alt={brand.name}
                      fill
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg font-light text-charcoal mb-0.5 group-hover:text-gold transition-colors">{brand.name}</h3>
                    <p className="text-[10px] tracking-widest uppercase text-gold mb-2">{brand.country}</p>
                    <p className="text-[11px] text-charcoal-light leading-relaxed line-clamp-2">{brand.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {featured.length === 0 && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands.map((brand: any) => (
                <Link key={brand.slug || brand._id} href={`/marques/${brand.slug}`} className="group flex gap-4 p-6 border border-cream-dark hover:border-gold transition-colors duration-300">
                  <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-cream">
                    <Image src={getThumb(brand)} alt={brand.name} fill className="object-contain p-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg font-light text-charcoal mb-0.5 group-hover:text-gold transition-colors">{brand.name}</h3>
                    <p className="text-[10px] tracking-widest uppercase text-gold mb-2">{brand.country}</p>
                    <p className="text-[11px] text-charcoal-light leading-relaxed line-clamp-2">{brand.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
