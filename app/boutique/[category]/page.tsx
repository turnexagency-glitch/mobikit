import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductsByCategory } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

const categoryLabels: Record<string, string> = {
  'linge-de-lit': 'Linge de Lit',
  'linge-de-table': 'Linge de Table',
  'linge-de-bain': 'Linge de Bain',
  'senteurs-bougies': 'Senteurs & Bougies',
  'esteban-parfums': 'Esteban Parfums',
  'literie': 'Literie de Luxe',
  'mobilier': 'Mobilier',
  'decoration': 'Décoration & Maison',
  'accessoires-sdb': 'Accessoires Salle de Bain',
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const label = categoryLabels[params.category]
  if (!label) notFound()

  const products = await getProductsByCategory(params.category)

  return (
    <>
      <section className="bg-cream py-16 px-6 text-center">
        <p className="section-subtitle mb-3">
          <Link href="/boutique" className="hover:text-gold transition-colors">Boutique</Link>
          {' › '}
        </p>
        <h1 className="section-title">{label}</h1>
        <div className="gold-divider" />
        <p className="text-sm text-charcoal-light mt-3">{products.length} produit{products.length > 1 ? 's' : ''}</p>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-2xl font-light text-charcoal mb-3">Collections à venir</p>
              <p className="text-sm text-charcoal-light mb-8">Nos produits seront disponibles très prochainement.</p>
              <Link href="/boutique" className="btn-primary">Voir toute la boutique</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <Link key={product._id} href={`/produit/${product.slug}`} className="group block">
                  <div className="relative overflow-hidden aspect-[3/4] mb-3 bg-cream">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
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
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <span className="text-xs tracking-widest uppercase text-charcoal font-medium">Rupture de stock</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] tracking-widest uppercase text-gold mb-1">{product.brand}</p>
                  <h3 className="text-xs font-light text-charcoal mb-1 leading-snug">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-charcoal">{product.price?.toLocaleString('fr-MA')} MAD</p>
                    {product.oldPrice && (
                      <p className="text-xs text-charcoal-light line-through">{product.oldPrice?.toLocaleString('fr-MA')} MAD</p>
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
