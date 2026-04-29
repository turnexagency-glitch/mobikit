import Link from 'next/link'
import Image from 'next/image'

const brands = [
  {
    name: 'Descamps',
    tagline: 'Filatier · Drapier depuis 1802',
    description: 'Maison fondée en 1802, Descamps incarne l\'excellence du linge de maison français. Percale, satin et matières nobles pour un sommeil d\'exception.',
    categories: ['Linge de Lit', 'Linge de Bain'],
    href: '/marques/descamps',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
    country: 'France · Paris',
    featured: true,
  },
  {
    name: 'Treca Paris',
    tagline: 'Literie de Prestige',
    description: 'Manufactures françaises d\'excellence, Treca crée depuis des décennies des matelas et sommiers sur mesure pour les plus grands hôtels du monde.',
    categories: ['Literie', 'Matelas', 'Sommiers'],
    href: '/marques/treca',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    country: 'France · Paris',
    featured: true,
  },
  {
    name: 'Pyrenex',
    tagline: 'Duvet & Plumes des Pyrénées',
    description: 'Spécialiste du duvet depuis 1859, Pyrenex sélectionne les meilleures plumes d\'oie pour des couettes et oreillers d\'une légèreté incomparable.',
    categories: ['Couettes', 'Oreillers', 'Couvertures'],
    href: '/marques/pyrenex',
    image: 'https://images.unsplash.com/photo-1614267157481-ca2b81ac6fcc?w=600&q=80',
    country: 'France · Pyrénées',
    featured: true,
  },
  {
    name: 'Le Jacquard Français',
    tagline: 'Art du Tissu depuis 1888',
    description: 'Tisseur d\'excellence depuis 1888, Le Jacquard Français perpétue l\'art du jacquard pour des linges de table et de bain d\'une beauté rare.',
    categories: ['Linge de Table', 'Linge de Bain'],
    href: '/marques/le-jacquard-francais',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    country: 'France · Vosges',
    featured: false,
  },
  {
    name: 'Esteban Paris',
    tagline: 'Parfums & Senteurs d\'Intérieur',
    description: 'Maison de parfums d\'intérieur parisienne, Esteban crée des fragrances raffinées pour sublimer votre espace de vie.',
    categories: ['Bougies', 'Diffuseurs', 'Parfums'],
    href: '/marques/esteban',
    image: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=600&q=80',
    country: 'France · Paris',
    featured: false,
  },
  {
    name: 'Aquanova',
    tagline: 'Design Belge',
    description: 'Marque belge au design épuré, Aquanova propose des accessoires et textiles de salle de bain alliant fonctionnalité et esthétique contemporaine.',
    categories: ['Linge de Bain', 'Accessoires SDB'],
    href: '/marques/aquanova',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    country: 'Belgique',
    featured: false,
  },
  {
    name: 'Blomus',
    tagline: 'Design Contemporain & Fonctionnel',
    description: 'Marque allemande reconnue pour son design industriel épuré en acier inoxydable et béton. Accessoires haut de gamme pour la maison.',
    categories: ['Décoration', 'Accessoires'],
    href: '/marques/blomus',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
    country: 'Allemagne',
    featured: false,
  },
  {
    name: 'Brun de Vian-Tiran',
    tagline: 'Couvertures en Laine · Depuis 1808',
    description: 'Manufacture provençale fondée en 1808, BVT tisse des couvertures en laine mérinos et cachemire d\'une douceur et d\'un luxe incomparables.',
    categories: ['Couvertures', 'Plaids', 'Couettes'],
    href: '/marques/brun-de-vian-tiran',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
    country: 'France · Provence',
    featured: false,
  },
  {
    name: 'Pilus',
    tagline: 'Luxe & Raffinement',
    description: 'Marque de luxe proposant des collections haut de gamme de linge de maison et accessoires décoratifs pour un intérieur d\'exception.',
    categories: ['Linge de Maison', 'Décoration'],
    href: '/marques/pilus',
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80',
    country: 'Europe',
    featured: false,
  },
  {
    name: 'Ilum · Max Benjamin',
    tagline: 'Bougies Artisanales',
    description: 'Bougies et parfums d\'intérieur artisanaux créés avec les meilleures matières premières pour une expérience olfactive unique.',
    categories: ['Bougies', 'Senteurs'],
    href: '/marques/ilum',
    image: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=600&q=80',
    country: 'Irlande',
    featured: false,
  },
  {
    name: 'Oscar',
    tagline: 'Art de Vivre',
    description: 'Collections haut de gamme pour la maison, alliant esthétique contemporaine et qualité des matières pour un intérieur d\'exception.',
    categories: ['Linge de Maison', 'Décoration'],
    href: '/marques/oscar',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
    country: 'Europe',
    featured: false,
  },
  {
    name: 'Geodesis',
    tagline: 'Parfums & Senteurs Rares',
    description: 'Maison de parfums d\'intérieur d\'exception, Geodesis sélectionne des matières rares et précieuses pour des fragrances uniques.',
    categories: ['Senteurs', 'Bougies', 'Diffuseurs'],
    href: '/marques/geodesis',
    image: 'https://images.unsplash.com/photo-1571781565036-d3f759be73e4?w=600&q=80',
    country: 'France',
    featured: false,
  },
  {
    name: 'Cosmic',
    tagline: 'Design & Innovation',
    description: 'Marque au design avant-gardiste proposant des collections décoratives et textiles qui mêlent créativité et qualité premium.',
    categories: ['Décoration', 'Accessoires'],
    href: '/marques/cosmic',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    country: 'Europe',
    featured: false,
  },
  {
    name: 'Vispring',
    tagline: 'Literie d\'Exception · Depuis 1901',
    description: 'Manufacture britannique fondée en 1901, Vispring crée à la main les matelas les plus luxueux au monde, avec des ressorts ensachés et des matières naturelles rares.',
    categories: ['Matelas', 'Literie de Luxe', 'Sommiers'],
    href: '/marques/vispring',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80',
    country: 'Royaume-Uni',
    featured: false,
  },
  {
    name: 'La Savonnerie Royale',
    tagline: 'Savons & Soins d\'Exception · Versailles',
    description: 'Savons artisanaux et produits de soin luxueux, fabriqués selon des recettes traditionnelles avec des ingrédients nobles et naturels.',
    categories: ['Salle de Bain', 'Soins', 'Accessoires'],
    href: '/marques/la-savonnerie-royale',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
    country: 'France · Versailles',
    featured: false,
  },
]

export default function MarquesPage() {
  const featured = brands.filter(b => b.featured)
  const rest = brands.filter(b => !b.featured)

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

      {/* Featured brands */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-2xl font-light text-charcoal mb-8">Marques Phares</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {featured.map((brand) => (
              <Link key={brand.name} href={brand.href} className="group block">
                <div className="relative overflow-hidden aspect-[4/3] mb-4">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute top-4 left-4 bg-gold text-white text-[9px] tracking-widest uppercase px-3 py-1">
                    {brand.country}
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-light text-charcoal mb-1 group-hover:text-gold transition-colors">{brand.name}</h3>
                <p className="text-[10px] tracking-widest uppercase text-gold mb-2">{brand.tagline}</p>
                <p className="text-xs text-charcoal-light leading-relaxed line-clamp-2">{brand.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {brand.categories.map(cat => (
                    <span key={cat} className="text-[9px] tracking-widest uppercase border border-cream-dark text-charcoal-light px-2 py-0.5">
                      {cat}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* All brands */}
          <h2 className="font-serif text-2xl font-light text-charcoal mb-8 pt-8 border-t border-cream-dark">Toutes Nos Marques</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((brand) => (
              <Link key={brand.name} href={brand.href} className="group flex gap-4 p-6 border border-cream-dark hover:border-gold transition-colors duration-300">
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-cream">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
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
    </>
  )
}
