import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Shield, Truck, RefreshCw, Star } from 'lucide-react'
import { getProductBySlug } from '@/lib/supabase'
import AddToCartButton from '@/components/AddToCartButton'
import ProductGallery from '@/components/ProductGallery'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return {}
  const title = `${product.name} | ${product.brand || 'Mobikit'} — Linge de Maison Maroc`
  const description = product.description
    ? product.description.slice(0, 155) + '...'
    : `Achetez ${product.name} de ${product.brand || 'Mobikit'} au Maroc. Prix : ${product.price?.toLocaleString('fr-MA')} MAD. Livraison partout au Maroc.`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.mobikit.ma/produit/${params.slug}`,
      images: product.images?.[0] ? [{ url: product.images[0], alt: product.name }] : [],
    },
    alternates: { canonical: `https://www.mobikit.ma/produit/${params.slug}` },
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)

  if (!product) notFound()

  const discount = product.old_price
    ? Math.round((1 - product.price / product.old_price) * 100)
    : null

  const images: string[] = product.images || []

  return (
    <>
      {/* JSON-LD : Product + BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description || `${product.name} par ${product.brand || 'Mobikit'}`,
          brand: { '@type': 'Brand', name: product.brand || 'Mobikit' },
          image: product.images || [],
          sku: product.slug,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'MAD',
            price: product.price,
            availability: product.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            seller: { '@type': 'Organization', name: 'Mobikit' },
            url: `https://www.mobikit.ma/produit/${product.slug}`,
          },
          ...(product.old_price ? { offers: { '@type': 'AggregateOffer', lowPrice: product.price, highPrice: product.old_price, priceCurrency: 'MAD' } } : {}),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.mobikit.ma' },
            { '@type': 'ListItem', position: 2, name: 'Boutique', item: 'https://www.mobikit.ma/boutique' },
            { '@type': 'ListItem', position: 3, name: product.name, item: `https://www.mobikit.ma/produit/${product.slug}` },
          ],
        },
      ]) }} />

      {/* Breadcrumb */}
      <div className="bg-cream border-b border-cream-dark px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[10px] tracking-widest uppercase text-charcoal-light">
          <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/boutique" className="hover:text-gold transition-colors">Boutique</Link>
          <span>/</span>
          <span className="text-charcoal truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14">

            {/* Images */}
            <div className="relative">
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 bg-gold text-white text-[9px] tracking-widest uppercase px-3 py-1.5">
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className="absolute top-4 right-4 z-10 bg-charcoal text-white text-[9px] tracking-widest uppercase px-3 py-1.5">
                  -{discount}%
                </span>
              )}
              <ProductGallery images={images} name={product.name} />
            </div>

            {/* Details */}
            <div>
              <p className="text-[10px] tracking-ultra-wide uppercase text-gold font-medium">
                {product.brand}
              </p>
              <h1 className="font-serif text-3xl font-light text-charcoal mt-2 mb-3 leading-snug">
                {product.name}
              </h1>

              <div className="flex gap-0.5 mb-5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={12} className="fill-gold text-gold" />
                ))}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-serif text-3xl font-light text-charcoal">
                  {product.price?.toLocaleString('fr-MA')} MAD
                </span>
                {product.old_price && (
                  <span className="text-base text-charcoal-light line-through">
                    {product.old_price?.toLocaleString('fr-MA')} MAD
                  </span>
                )}
              </div>

              <div className="w-10 h-px bg-gold mb-6" />

              {/* Description */}
              {product.description && (
                <p className="text-sm text-charcoal-light leading-relaxed mb-6">
                  {product.description}
                </p>
              )}

              {/* Sizes */}
              {product.sizes?.length > 0 && (
                <div className="mb-6">
                  <p className="text-[10px] tracking-widest uppercase text-charcoal font-medium mb-3">
                    Dimensions disponibles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <span key={size} className="px-4 py-2 text-xs border border-cream-dark text-charcoal">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to cart — client component */}
              <AddToCartButton product={product} />

              {/* Services */}
              <div className="grid grid-cols-3 gap-3 py-5 border-t border-b border-cream-dark my-6">
                {[
                  { icon: Truck, label: 'Livraison', sub: 'Dès 500 DH' },
                  { icon: RefreshCw, label: 'Retours', sub: '14 jours' },
                  { icon: Shield, label: 'Paiement', sub: 'Sécurisé CMI' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <s.icon size={18} className="text-gold mx-auto mb-1.5" />
                    <p className="text-[10px] font-medium text-charcoal">{s.label}</p>
                    <p className="text-[10px] text-charcoal-light">{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Specs */}
              {product.specs?.length > 0 && (
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-charcoal font-medium mb-4">
                    Caractéristiques
                  </p>
                  <table className="w-full text-xs">
                    <tbody>
                      {product.specs.map((s: { label: string; value: string }) => (
                        <tr key={s.label} className="border-b border-cream-dark last:border-0">
                          <td className="py-2.5 pr-4 text-charcoal-light w-1/2">{s.label}</td>
                          <td className="py-2.5 text-charcoal font-medium">{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
