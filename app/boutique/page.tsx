import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProducts } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Boutique Linge de Maison Maroc | Mobikit',
  description: 'Découvrez notre boutique en ligne : parures de lit, couettes, linge de bain, décoration et literie haut de gamme au Maroc. Livraison partout au Royaume.',
  openGraph: { title: 'Boutique | Mobikit', url: 'https://www.mobikit.ma/boutique' },
  alternates: { canonical: 'https://www.mobikit.ma/boutique' },
}

const categories = [
  { name: 'Linge de Lit', href: '/boutique/linge-de-lit', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80' },
  { name: 'Linge de Table', href: '/boutique/linge-de-table', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
  { name: 'Linge de Bain', href: '/boutique/linge-de-bain', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { name: 'Esteban Parfums', href: '/boutique/esteban-parfums', image: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=400&q=80' },
  { name: 'Literie de Luxe', href: '/boutique/literie', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
  { name: 'Mobilier', href: '/boutique/mobilier', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
  { name: 'Décoration & Maison', href: '/boutique/decoration', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80' },
  { name: 'Accessoires Salle de Bain', href: '/boutique/accessoires-sdb', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80' },
]

export const dynamic = 'force-dynamic'

export default async function BoutiquePage() {
  const products = await getAllProducts()

  return (
    <>
      <section className="bg-cream py-16 px-6 text-center">
        <p className="section-subtitle mb-3">Découvrez</p>
        <h1 className="section-title">Notre Boutique</h1>
        <div className="gold-divider" />
        <p className="text-sm text-charcoal-light max-w-xl mx-auto mt-4">
          Des collections haut de gamme sélectionnées avec exigence, alliant design, confort et excellence artisanale.
        </p>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-2xl font-light text-charcoal mb-8">Catégories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.href} href={cat.href} className="group relative overflow-hidden aspect-square block">
                <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                  <h3 className="font-serif text-lg font-light leading-tight">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products from Sanity */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-cream-dark">
            <div>
              <h2 className="font-serif text-2xl font-light text-charcoal">Tous les Produits</h2>
              <p className="text-xs text-charcoal-light mt-1">{products.length} article{products.length > 1 ? 's' : ''}</p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-2xl font-light text-charcoal mb-3">Collections à venir</p>
              <p className="text-sm text-charcoal-light">Nos produits seront disponibles très prochainement.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <Link key={product.id} href={`/produit/${product.slug}`} className="group cursor-pointer block">
                  <div className="relative overflow-hidden aspect-[3/4] mb-3 bg-cream">
                    {product.images?.[0] ? (
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
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
                        <span className="text-xs tracking-widest uppercase text-charcoal font-medium">Rupture de stock</span>
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
