import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBrandBySlug } from '@/lib/sanity'
import { getProductsByBrand } from '@/lib/supabase'
import { getBrand } from '@/data/brands'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { brand: string } }): Promise<Metadata> {
  const localBrand = getBrand(params.brand)
  const name = localBrand?.name || params.brand
  const title = `${name} au Maroc | Distributeur Officiel Mobikit`
  const description = localBrand?.description?.slice(0, 155) || `Découvrez la collection ${name} au Maroc chez Mobikit, distributeur officiel. Linge de maison haut de gamme livré partout au Maroc.`
  return {
    title,
    description,
    openGraph: { title, description, url: `https://www.mobikit.ma/marques/${params.brand}` },
    alternates: { canonical: `https://www.mobikit.ma/marques/${params.brand}` },
  }
}

export default async function BrandPage({ params }: { params: { brand: string } }) {
  // Sanity en priorité, fallback sur fichier local
  const sanityBrand = await getBrandBySlug(params.brand).catch(() => null)
  const localBrand = getBrand(params.brand)
  const brand = sanityBrand || localBrand
  if (!brand) notFound()

  const sageNames = (brand as any).sageNames?.length > 0
    ? (brand as any).sageNames
    : [brand.name]
  const products = await getProductsByBrand(sageNames)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal-dark py-20 px-6 text-center overflow-hidden">
        {(brand as any).coverImage && (
          <>
            <Image src={(brand as any).coverImage} alt={brand.name} fill className="object-cover opacity-20" />
            <div className="absolute inset-0 bg-charcoal-dark/70" />
          </>
        )}
        <div className="relative z-10">
          {brand.country && (
            <p className="text-[10px] tracking-ultra-wide uppercase text-gold mb-3">{brand.country}</p>
          )}
          <h1 className="font-serif text-5xl font-light text-white mb-3">{brand.name}</h1>
          {brand.tagline && (
            <p className="text-xs tracking-widest uppercase text-gold/70 mb-6">{brand.tagline}</p>
          )}
          <div className="w-12 h-px bg-gold mx-auto mb-6" />
          {brand.description && (
            <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">{brand.description}</p>
          )}
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-2xl font-light text-charcoal">Collection {brand.name}</h2>
              <p className="text-xs text-charcoal-light mt-1">
                {products.length} produit{products.length > 1 ? 's' : ''}
              </p>
            </div>
            <Link href="/boutique" className="text-[10px] tracking-widest uppercase text-gold hover:underline">
              Voir toute la boutique
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 border border-cream-dark">
              <p className="font-serif text-2xl font-light text-charcoal mb-3">Collections à venir</p>
              <p className="text-sm text-charcoal-light mb-8">
                Les produits {brand.name} seront disponibles très prochainement.
              </p>
              <Link href="/contact" className="btn-primary">Nous contacter</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <Link key={product.id} href={`/produit/${product.slug}`} className="group block">
                  <div className="relative overflow-hidden aspect-[3/4] mb-3 bg-cream">
                    {product.images?.[0] ? (
                      <Image src={product.images?.[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-cream-dark">
                        <span className="text-xs text-charcoal-light">Photo à venir</span>
                      </div>
                    )}
                    {product.badge && (
                      <span className="absolute top-2 left-2 bg-gold text-white text-[9px] tracking-widest uppercase px-2 py-1">
                        {product.badge}
                      </span>
                    )}
                    {!product.in_stock && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <span className="text-xs tracking-widest uppercase text-charcoal font-medium">Rupture</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] tracking-widest uppercase text-gold mb-1">{product.brand}</p>
                  <h3 className="text-xs font-light text-charcoal mb-1 leading-snug">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-charcoal">{product.price?.toLocaleString('fr-MA')} MAD</p>
                    {product.old_price && (
                      <p className="text-xs text-charcoal-light line-through">{product.old_price?.toLocaleString('fr-MA')} MAD</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
