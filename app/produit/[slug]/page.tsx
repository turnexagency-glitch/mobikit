'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, ChevronDown, Star, ArrowLeft, Share2, Shield, Truck, RefreshCw, Check } from 'lucide-react'

const product = {
  name: 'Parure de Lit Satin de Coton — Collection Botanique',
  brand: 'Descamps',
  brandHref: '/marques/descamps',
  price: 2490,
  oldPrice: 2990,
  ref: 'DSC-BOT-240',
  rating: 4.8,
  reviews: 24,
  badge: 'Nouveau',
  description: 'Découvrez l\'élégance absolue avec cette parure de lit en satin de coton égyptien. Inspirée des jardins botaniques français, cette collection aux motifs floraux délicats incarne le raffinement et la douceur d\'un sommeil d\'exception.',
  images: [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=90',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=90',
    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=90',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=90',
  ],
  sizes: ['140x200', '160x200', '180x200', '200x200', '240x220'],
  colors: [
    { name: 'Blanc Ivoire', hex: '#FAF7F0' },
    { name: 'Bleu Nuit', hex: '#1B2A4A' },
    { name: 'Rose Poudré', hex: '#F2D6D0' },
    { name: 'Vert Sauge', hex: '#8FA889' },
  ],
  specs: [
    { label: 'Matière', value: 'Satin de coton égyptien 400 fils' },
    { label: 'Composition', value: '100% Coton longues fibres' },
    { label: 'Grammage', value: '120 g/m²' },
    { label: 'Entretien', value: 'Lavable en machine 40°C' },
    { label: 'Contenu', value: '1 housse de couette + 2 taies d\'oreiller' },
    { label: 'Fabrication', value: 'Fabriqué en France' },
    { label: 'Référence', value: 'DSC-BOT-240' },
  ],
  includes: ['1 housse de couette', '2 taies d\'oreiller 65x65 cm'],
}

const related = [
  { name: 'Drap Plat Satin Blanc', brand: 'Descamps', price: 890, image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80' },
  { name: 'Couette Premium Duvet', brand: 'Pyrenex', price: 3450, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
  { name: 'Oreillers Plumes d\'Oie', brand: 'Pyrenex', price: 680, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80' },
  { name: 'Protège-Matelas Molleton', brand: 'Descamps', price: 420, image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&q=80' },
]

export default function ProductPage() {
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const [openSpec, setOpenSpec] = useState<string | null>('composition')

  const handleAddToCart = () => {
    if (!selectedSize) return
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-cream-dark px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[10px] tracking-widest uppercase text-charcoal-light">
          <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/boutique" className="hover:text-gold transition-colors">Boutique</Link>
          <span>/</span>
          <Link href="/boutique/linge-de-lit" className="hover:text-gold transition-colors">Linge de Lit</Link>
          <span>/</span>
          <span className="text-charcoal truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14">

            {/* Left — Images */}
            <div>
              {/* Main image */}
              <div className="relative aspect-square overflow-hidden bg-cream mb-3 group">
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-gold text-white text-[9px] tracking-widest uppercase px-3 py-1.5">
                    {product.badge}
                  </span>
                )}
                {discount && (
                  <span className="absolute top-4 right-4 bg-charcoal text-white text-[9px] tracking-widest uppercase px-3 py-1.5">
                    -{discount}%
                  </span>
                )}
                <button
                  onClick={() => setWishlist(!wishlist)}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-white flex items-center justify-center shadow-sm hover:bg-gold hover:text-white transition-colors"
                >
                  <Heart size={16} className={wishlist ? 'fill-gold text-gold' : ''} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square overflow-hidden border-2 transition-colors ${activeImage === i ? 'border-gold' : 'border-transparent hover:border-cream-dark'}`}
                  >
                    <Image src={img} alt={`Vue ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right — Details */}
            <div>
              {/* Brand & title */}
              <Link href={product.brandHref} className="text-[10px] tracking-ultra-wide uppercase text-gold hover:text-gold-dark transition-colors font-medium">
                {product.brand}
              </Link>
              <h1 className="font-serif text-3xl font-light text-charcoal mt-2 mb-3 leading-snug">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={12} className={i <= Math.round(product.rating) ? 'fill-gold text-gold' : 'text-cream-dark fill-cream-dark'} />
                  ))}
                </div>
                <span className="text-xs text-charcoal-light">{product.rating} · {product.reviews} avis</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-serif text-3xl font-light text-charcoal">
                  {product.price.toLocaleString('fr-MA')} MAD
                </span>
                {product.oldPrice && (
                  <span className="text-base text-charcoal-light line-through">
                    {product.oldPrice.toLocaleString('fr-MA')} MAD
                  </span>
                )}
              </div>

              <div className="w-10 h-px bg-gold mb-6" />

              {/* Description */}
              <p className="text-sm text-charcoal-light leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Includes */}
              <div className="mb-6">
                <p className="text-[10px] tracking-widest uppercase text-charcoal font-medium mb-2">Contenu</p>
                <ul className="space-y-1">
                  {product.includes.map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-charcoal-light">
                      <Check size={11} className="text-gold flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color selector */}
              <div className="mb-6">
                <p className="text-[10px] tracking-widest uppercase text-charcoal font-medium mb-3">
                  Couleur — <span className="text-gold normal-case tracking-normal">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map(c => (
                    <button
                      key={c.name}
                      title={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === c.name ? 'border-gold scale-110' : 'border-cream-dark hover:border-charcoal-light'}`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div className="mb-7">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-[10px] tracking-widest uppercase text-charcoal font-medium">Dimensions</p>
                  <button className="text-[10px] tracking-widest uppercase text-gold hover:underline">Guide des tailles</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-xs border transition-all duration-200 ${selectedSize === size
                        ? 'border-charcoal bg-charcoal text-white'
                        : 'border-cream-dark text-charcoal hover:border-gold'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-[10px] text-gold mt-2">* Veuillez sélectionner une dimension</p>
                )}
              </div>

              {/* Qty + Add to cart */}
              <div className="flex gap-3 mb-5">
                <div className="flex items-center border border-cream-dark">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-12 flex items-center justify-center hover:bg-cream transition-colors text-lg">−</button>
                  <span className="w-10 text-center text-sm font-medium">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-10 h-12 flex items-center justify-center hover:bg-cream transition-colors text-lg">+</button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 ${
                    added ? 'bg-green-600 text-white' :
                    selectedSize ? 'bg-charcoal text-white hover:bg-gold' :
                    'bg-cream-dark text-charcoal-light cursor-not-allowed'
                  }`}
                >
                  {added ? <><Check size={14} /> Ajouté au panier</> : <><ShoppingBag size={14} /> Ajouter au panier</>}
                </button>
                <button className="w-12 h-12 border border-cream-dark flex items-center justify-center hover:border-gold transition-colors">
                  <Share2 size={15} className="text-charcoal-light" />
                </button>
              </div>

              {/* Services */}
              <div className="grid grid-cols-3 gap-3 py-5 border-t border-b border-cream-dark mb-6">
                {[
                  { icon: Truck, label: 'Livraison', sub: 'Dès 500 DH' },
                  { icon: RefreshCw, label: 'Retours', sub: '14 jours' },
                  { icon: Shield, label: 'Paiement', sub: 'Sécurisé CMI' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <s.icon size={18} className="text-gold mx-auto mb-1.5" />
                    <p className="text-[10px] font-medium text-charcoal tracking-wide">{s.label}</p>
                    <p className="text-[10px] text-charcoal-light">{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Specs accordion */}
              <div className="space-y-0">
                {[
                  {
                    id: 'composition',
                    title: 'Composition & Caractéristiques',
                    content: (
                      <table className="w-full text-xs">
                        <tbody>
                          {product.specs.map(s => (
                            <tr key={s.label} className="border-b border-cream-dark last:border-0">
                              <td className="py-2.5 pr-4 text-charcoal-light w-1/2">{s.label}</td>
                              <td className="py-2.5 text-charcoal font-medium">{s.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )
                  },
                  {
                    id: 'entretien',
                    title: 'Conseils d\'Entretien',
                    content: (
                      <div className="text-xs text-charcoal-light space-y-2 leading-relaxed">
                        <p>• Lavage en machine à 40°C maximum</p>
                        <p>• Ne pas utiliser de javel</p>
                        <p>• Séchage en machine à basse température</p>
                        <p>• Repassage à fer chaud (vapeur recommandé)</p>
                        <p>• Laver séparément les premières fois pour fixer les couleurs</p>
                      </div>
                    )
                  },
                  {
                    id: 'livraison',
                    title: 'Livraison & Retours',
                    content: (
                      <div className="text-xs text-charcoal-light space-y-2 leading-relaxed">
                        <p>• Livraison sous 3 à 5 jours ouvrables au Maroc</p>
                        <p>• Livraison gratuite dès 500 DH à Casablanca</p>
                        <p>• Retours acceptés sous 14 jours, produit non utilisé</p>
                        <p>• Paiement sécurisé par CMI ou à la livraison</p>
                      </div>
                    )
                  },
                ].map(item => (
                  <div key={item.id} className="border-b border-cream-dark">
                    <button
                      className="w-full flex items-center justify-between py-4 text-left"
                      onClick={() => setOpenSpec(openSpec === item.id ? null : item.id)}
                    >
                      <span className="text-xs tracking-widest uppercase text-charcoal font-medium">{item.title}</span>
                      <ChevronDown size={14} className={`text-gold transition-transform duration-200 ${openSpec === item.id ? 'rotate-180' : ''}`} />
                    </button>
                    {openSpec === item.id && (
                      <div className="pb-5">{item.content}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-subtitle mb-2">Vous aimerez aussi</p>
            <h2 className="font-serif text-3xl font-light text-charcoal">Produits Complémentaires</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => (
              <Link key={p.name} href="#" className="group block">
                <div className="relative overflow-hidden aspect-square mb-3 bg-white">
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-full bg-white text-charcoal text-[10px] tracking-widest uppercase py-2 hover:bg-gold hover:text-white transition-colors">
                      Ajouter au panier
                    </button>
                  </div>
                </div>
                <p className="text-[10px] tracking-widest uppercase text-gold mb-1">{p.brand}</p>
                <h3 className="text-xs font-light text-charcoal mb-1 leading-snug">{p.name}</h3>
                <p className="text-sm font-medium text-charcoal">{p.price.toLocaleString('fr-MA')} MAD</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
