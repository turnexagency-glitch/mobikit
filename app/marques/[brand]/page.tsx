import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductsByBrand } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

const brandData: Record<string, { name: string; tagline: string; country: string; description: string; brandQuery?: string[] }> = {
  'descamps': { name: 'Descamps', tagline: 'Filatier · Drapier depuis 1802', country: 'France · Paris', description: 'Maison fondée en 1802, Descamps incarne l\'excellence du linge de maison français. Percale, satin et matières nobles pour un sommeil d\'exception.' },
  'treca': { name: 'Treca Paris', tagline: 'Literie de Prestige', country: 'France · Paris', description: 'Manufactures françaises d\'excellence, Treca crée depuis des décennies des matelas et sommiers sur mesure pour les plus grands hôtels du monde.' },
  'pyrenex': { name: 'Pyrenex', tagline: 'Duvet & Plumes des Pyrénées', country: 'France', description: 'Spécialiste du duvet depuis 1859, Pyrenex sélectionne les meilleures plumes d\'oie pour des couettes et oreillers d\'une légèreté incomparable.' },
  'le-jacquard-francais': { name: 'Le Jacquard Français', tagline: 'Art du Tissu depuis 1888', country: 'France · Vosges', description: 'Tisseur d\'excellence depuis 1888, Le Jacquard Français perpétue l\'art du jacquard pour des linges de table et de bain d\'une beauté rare.' },
  'esteban': { name: 'Esteban Parfums', tagline: 'Parfums & Senteurs d\'Intérieur', country: 'France · Paris', description: 'Maison de parfums d\'intérieur parisienne, Esteban crée des fragrances raffinées pour sublimer votre espace de vie.', brandQuery: ['Esteban Paris', 'Esteban Parfums'] },
  'esteban-paris': { name: 'Esteban Parfums', tagline: 'Parfums & Senteurs d\'Intérieur', country: 'France · Paris', description: 'Maison de parfums d\'intérieur parisienne, Esteban crée des fragrances raffinées pour sublimer votre espace de vie.', brandQuery: ['Esteban Paris', 'Esteban Parfums'] },
  'esteban-parfums': { name: 'Esteban Parfums', tagline: 'Parfums & Senteurs d\'Intérieur', country: 'France · Paris', description: 'Maison de parfums d\'intérieur parisienne, Esteban crée des fragrances raffinées pour sublimer votre espace de vie.', brandQuery: ['Esteban Paris', 'Esteban Parfums'] },
  'aquanova': { name: 'Aquanova', tagline: 'Design Belge', country: 'Belgique', description: 'Marque belge au design épuré, Aquanova propose des accessoires et textiles de salle de bain alliant fonctionnalité et esthétique contemporaine.' },
  'blomus': { name: 'Blomus', tagline: 'Design Contemporain', country: 'Allemagne', description: 'Marque allemande reconnue pour son design industriel épuré en acier inoxydable et béton.' },
  'brun-de-vian-tiran': { name: 'Brun de Vian-Tiran', tagline: 'Couvertures en Laine · Depuis 1808', country: 'France · Provence', description: 'Manufacture provençale fondée en 1808, BVT tisse des couvertures en laine mérinos et cachemire d\'une douceur incomparable.' },
  'pilus': { name: 'Pilus', tagline: 'Luxe & Raffinement', country: 'Europe', description: 'Marque de luxe proposant des collections haut de gamme de linge de maison et accessoires décoratifs.' },
  'ilum': { name: 'Ilum · Max Benjamin', tagline: 'Bougies Artisanales', country: 'Irlande', description: 'Bougies et parfums d\'intérieur artisanaux créés avec les meilleures matières premières.' },
  'oscar': { name: 'Oscar', tagline: 'Art de Vivre', country: 'Europe', description: 'Collections haut de gamme pour la maison, alliant esthétique contemporaine et qualité des matières.' },
  'geodesis': { name: 'Geodesis', tagline: 'Parfums & Senteurs Rares', country: 'France', description: 'Maison de parfums d\'intérieur d\'exception, Geodesis sélectionne des matières rares et précieuses.' },
  'cosmic': { name: 'Cosmic', tagline: 'Design & Innovation', country: 'Europe', description: 'Marque au design avant-gardiste proposant des collections décoratives et textiles premium.' },
  'vispring': { name: 'Vispring', tagline: 'Literie d\'Exception · Depuis 1901', country: 'Royaume-Uni', description: 'Manufacture britannique fondée en 1901, Vispring crée à la main les matelas les plus luxueux au monde.' },
  'la-savonnerie-royale': { name: 'La Savonnerie Royale', tagline: 'Savons & Soins d\'Exception · Versailles', country: 'France · Versailles', description: 'Savons artisanaux et produits de soin luxueux, fabriqués selon des recettes traditionnelles.' },
}

export default async function BrandPage({ params }: { params: { brand: string } }) {
  const info = brandData[params.brand]
  if (!info) notFound()

  const products = await getProductsByBrand((info as any).brandQuery || info.name)

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal-dark py-20 px-6 text-center">
        <p className="text-[10px] tracking-ultra-wide uppercase text-gold mb-3">{info.country}</p>
        <h1 className="font-serif text-5xl font-light text-white mb-3">{info.name}</h1>
        <p className="text-xs tracking-widest uppercase text-gold/70 mb-6">{info.tagline}</p>
        <div className="w-12 h-px bg-gold mx-auto mb-6" />
        <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">{info.description}</p>
      </section>

      {/* Products */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-2xl font-light text-charcoal">
                Collection {info.name}
              </h2>
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
              <p className="text-sm text-charcoal-light mb-8">Les produits {info.name} seront disponibles très prochainement.</p>
              <Link href="/contact" className="btn-primary">Nous contacter</Link>
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
