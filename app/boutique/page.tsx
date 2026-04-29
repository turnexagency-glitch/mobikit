import Image from 'next/image'
import Link from 'next/link'
import { SlidersHorizontal, Grid, List } from 'lucide-react'

const categories = [
  { name: 'Linge de Lit', count: 48, href: '/boutique/linge-de-lit', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80' },
  { name: 'Linge de Table', count: 32, href: '/boutique/linge-de-table', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
  { name: 'Linge de Bain', count: 27, href: '/boutique/linge-de-bain', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { name: 'Senteurs & Bougies', count: 19, href: '/boutique/senteurs-bougies', image: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=400&q=80' },
  { name: 'Literie de Luxe', count: 22, href: '/boutique/literie', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
  { name: 'Mobilier', count: 15, href: '/boutique/mobilier', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
  { name: 'Décoration & Maison', count: 41, href: '/boutique/decoration', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80' },
  { name: 'Accessoires Salle de Bain', count: 18, href: '/boutique/accessoires-sdb', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80' },
]

const products = [
  { name: 'Housse de Couette Satin Coton', brand: 'Descamps', price: '1 890', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80', badge: 'Nouveau' },
  { name: 'Couette Duvet Grand Froid', brand: 'Pyrenex', price: '3 450', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', badge: 'Bestseller' },
  { name: 'Serviette Lin Naturel 70x140', brand: 'Le Jacquard Français', price: '340', image: 'https://images.unsplash.com/photo-1606206590849-b5b8e9c02a5f?w=400&q=80', badge: null },
  { name: 'Bougie Cèdre & Bois de Santal', brand: 'Esteban Paris', price: '280', image: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=400&q=80', badge: 'Exclusif' },
  { name: 'Parure Lit Percale 240x220', brand: 'Descamps', price: '2 200', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80', badge: null },
  { name: 'Peignoir Waffle Premium', brand: 'Aquanova', price: '690', image: 'https://images.unsplash.com/photo-1571781565036-d3f759be73e4?w=400&q=80', badge: null },
  { name: 'Matelas Impérial 160x200', brand: 'Treca Paris', price: '18 500', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80', badge: 'Premium' },
  { name: 'Nappe Jacquard 150x250', brand: 'Le Jacquard Français', price: '580', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', badge: null },
]

export default function BoutiquePage() {
  return (
    <>
      {/* Hero */}
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
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                  <h3 className="font-serif text-lg font-light leading-tight">{cat.name}</h3>
                  <p className="text-[10px] tracking-widest uppercase text-white/70 mt-1">{cat.count} produits</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-cream-dark">
            <div>
              <h2 className="font-serif text-2xl font-light text-charcoal">Tous les Produits</h2>
              <p className="text-xs text-charcoal-light mt-1">{products.length} articles</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-xs tracking-widest uppercase text-charcoal hover:text-gold transition-colors">
                <SlidersHorizontal size={14} /> Filtres
              </button>
              <div className="flex gap-2">
                <button className="text-gold"><Grid size={16} /></button>
                <button className="text-charcoal-light hover:text-gold"><List size={16} /></button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.name} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[3/4] mb-3 bg-cream">
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-gold text-white text-[9px] tracking-widest uppercase px-2 py-1">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <button className="flex-1 bg-white text-charcoal text-[10px] tracking-widest uppercase py-2 hover:bg-gold hover:text-white transition-colors text-center">
                      Ajouter au panier
                    </button>
                  </div>
                </div>
                <p className="text-[10px] tracking-widest uppercase text-gold mb-1">{product.brand}</p>
                <h3 className="text-xs font-light text-charcoal mb-1 leading-snug">{product.name}</h3>
                <p className="text-sm font-medium text-charcoal">{product.price} MAD</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-outline">Charger plus de produits</button>
          </div>
        </div>
      </section>
    </>
  )
}
