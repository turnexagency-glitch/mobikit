import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductsByCategory } from '@/lib/supabase'

export const revalidate = 300

const categoryLabels: Record<string, string> = {
  'linge-de-lit': 'Linge de Lit',
  'linge-de-table': 'Linge de Table',
  'linge-de-bain': 'Linge de Bain',
  'senteurs-bougies': 'Senteurs & Bougies',
  'esteban-parfums': 'Esteban Parfums',
  'pyjama-homewear': 'Pyjama & Homewear',
  'literie': 'Literie de Luxe',
  'mobilier': 'Mobilier',
  'decoration': 'Décoration & Maison',
  'accessoires-sdb': 'Accessoires Salle de Bain',
}

const categoryKeywords: Record<string, string> = {
  'linge-de-lit':   'linge de lit maroc, parure de lit maroc, housse de couette maroc, draps luxe maroc, descamps lit maroc, parure de lit casablanca, drap percale maroc, taie oreiller maroc, linge de lit haut de gamme maroc',
  'linge-de-table': 'linge de table maroc, nappe table maroc, nappe casablanca, le jacquard français maroc, serviette de table luxe maroc, chemin de table maroc, nappe luxe maroc',
  'linge-de-bain':  'linge de bain maroc, serviette de bain maroc, serviette bain luxe casablanca, peignoir luxe maroc, descamps bain, drap de bain maroc, serviette bain haut de gamme maroc',
  'esteban-parfums':'esteban parfums maroc, diffuseur esteban casablanca, bouquet parfumé esteban maroc, parfum intérieur maroc, diffuseur luxe maroc',
  'senteurs-bougies':'bougies parfumées maroc, senteurs maison maroc, diffuseur parfum casablanca, bougie luxe maroc, parfum maison maroc',
  'literie':        'literie luxe maroc, matelas haut de gamme maroc, matelas casablanca, treca paris maroc, couette duvet maroc, couette pyrenex maroc, matelas luxe casablanca, oreiller luxe maroc, literie haut de gamme maroc',
  'mobilier':       'mobilier design maroc, meubles luxe casablanca, mobilier haut de gamme maroc',
  'decoration':     'décoration maison maroc, objets déco casablanca, décoration intérieur maroc, vases design maroc, décoration luxe maroc',
  'accessoires-sdb':'accessoires salle de bain maroc, aquanova maroc, distributeur savon luxe maroc, miroir salle de bain maroc, accessoires sdb haut de gamme',
  'pyjama-homewear':'pyjama luxe maroc, homewear maison maroc, pyjama haut de gamme maroc',
}

const categoryDescriptions: Record<string, string> = {
  'linge-de-lit':   'Achetez votre linge de lit haut de gamme au Maroc : parures de lit, housses de couette, draps percale et taies d\'oreiller. Marques Descamps et autres grandes maisons européennes. Livraison partout au Maroc.',
  'linge-de-table': 'Nappes, chemins de table et serviettes de table haut de gamme au Maroc. Collections Le Jacquard Français et autres marques de prestige. Livraison partout au Royaume.',
  'linge-de-bain':  'Serviettes de bain, peignoirs et draps de bain luxe au Maroc. Collections Descamps, Aquanova et autres grandes marques. Coton premium, livraison partout au Maroc.',
  'literie':        'Matelas, couettes et oreillers haut de gamme au Maroc. Distributeur officiel Treca Paris et Pyrenex à Casablanca. Literie de luxe livrée partout au Royaume.',
  'senteurs-bougies':'Bougies parfumées et diffuseurs de senteurs maison au Maroc. Collections Geodesis, Esteban et autres marques premium. Parfumez votre intérieur avec élégance.',
  'esteban-parfums':'Diffuseurs, bougies et parfums d\'intérieur Esteban Paris au Maroc. Distributeur officiel Esteban à Casablanca. Livraison partout au Maroc.',
  'decoration':     'Décoration d\'intérieur et objets déco haut de gamme au Maroc. Sélection exclusive pour un intérieur raffiné. Livraison partout au Royaume.',
  'mobilier':       'Mobilier design et meubles haut de gamme au Maroc. Sélection exclusive de mobilier contemporain. Livraison et installation à Casablanca.',
  'accessoires-sdb':'Accessoires de salle de bain design au Maroc. Collections Aquanova et autres marques européennes. Distributeur officiel à Casablanca.',
  'pyjama-homewear':'Pyjamas et vêtements d\'intérieur luxe au Maroc. Matières nobles, confection premium. Livraison partout au Maroc.',
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const label = categoryLabels[params.category]
  if (!label) return {}
  const title = `${label} Haut de Gamme au Maroc | Mobikit — Livraison Partout au Royaume`
  const description = categoryDescriptions[params.category] ||
    `Achetez du ${label.toLowerCase()} haut de gamme au Maroc. Grandes marques européennes chez Mobikit : Descamps, Le Jacquard Français, Esteban et plus. Livraison partout au Maroc.`
  return {
    title,
    description,
    keywords: categoryKeywords[params.category] || '',
    openGraph: {
      title,
      description,
      url: `https://www.mobikit.ma/boutique/${params.category}`,
      images: [{ url: '/images/showroom-mobikit.webp', width: 1200, height: 630, alt: `${label} au Maroc — Mobikit` }],
    },
    alternates: { canonical: `https://www.mobikit.ma/boutique/${params.category}` },
  }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const label = categoryLabels[params.category]
  if (!label) notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.mobikit.ma' },
      { '@type': 'ListItem', position: 2, name: 'Boutique', item: 'https://www.mobikit.ma/boutique' },
      { '@type': 'ListItem', position: 3, name: label, item: `https://www.mobikit.ma/boutique/${params.category}` },
    ],
  }

  const products = await getProductsByCategory(params.category)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
                <Link key={product.id} href={`/produit/${product.slug}`} className="group block">
                  <div className="relative overflow-hidden aspect-[3/4] mb-3 bg-cream">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images?.[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
