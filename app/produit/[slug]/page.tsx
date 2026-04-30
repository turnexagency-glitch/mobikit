'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, ChevronDown, Star, ArrowLeft, Shield, Truck, RefreshCw, Check } from 'lucide-react'
import { getProductBySlug } from '@/lib/sanity'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const [openSpec, setOpenSpec] = useState<string | null>('composition')

  useEffect(() => {
    getProductBySlug(params.slug).then((data) => {
      setProduct(data)
      setLoading(false)
    })
  }, [params.slug])

  const handleAddToCart = () => {
    if (!selectedSize && product?.sizes?.length > 0) return
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs tracking-widest uppercase text-charcoal-light">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream text-center px-6">
        <div>
          <h2 className="font-serif text-3xl font-light text-charcoal mb-3">Produit introuvable</h2>
          <Link href="/boutique" className="btn-primary">Retour à la boutique</Link>
        </div>
      </div>
    )
  }

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null
  const images = product.images?.length > 0 ? product.images : []

  return (
    <>
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
            <div>
              <div className="relative aspect-square overflow-hidden bg-cream mb-3 group">
                {images[activeImage] ? (
                  <Image src={images[activeImage]} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-cream-dark">
                    <span className="text-sm text-charcoal-light">Photo à venir</span>
                  </div>
                )}
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-gold text-white text-[9px] tracking-widest uppercase px-3 py-1.5">{product.badge}</span>
                )}
                {discount && (
                  <span className="absolute top-4 right-4 bg-charcoal text-white text-[9px] tracking-widest uppercase px-3 py-1.5">-{discount}%</span>
                )}
                <button onClick={() => setWishlist(!wishlist)} className="absolute bottom-4 right-4 w-10 h-10 bg-white flex items-center justify-center shadow-sm hover:bg-gold hover:text-white transition-colors">
                  <Heart size={16} className={wishlist ? 'fill-gold text-gold' : ''} />
                </button>
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img: string, i: number) => (
                    <button key={i} onClick={() => setActiveImage(i)} className={`relative aspect-square overflow-hidden border-2 transition-colors ${activeImage === i ? 'border-gold' : 'border-transparent hover:border-cream-dark'}`}>
                      <Image src={img} alt={`Vue ${i + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <p className="text-[10px] tracking-ultra-wide uppercase text-gold font-medium">{product.brand}</p>
              <h1 className="font-serif text-3xl font-light text-charcoal mt-2 mb-3 leading-snug">{product.name}</h1>

              <div className="flex gap-0.5 mb-5">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-gold text-gold" />)}
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-serif text-3xl font-light text-charcoal">{product.price?.toLocaleString('fr-MA')} MAD</span>
                {product.oldPrice && (
                  <span className="text-base text-charcoal-light line-through">{product.oldPrice?.toLocaleString('fr-MA')} MAD</span>
                )}
              </div>

              <div className="w-10 h-px bg-gold mb-6" />

              {product.description && (
                <p className="text-sm text-charcoal-light leading-relaxed mb-6">{product.description}</p>
              )}

              {/* Sizes */}
              {product.sizes?.length > 0 && (
                <div className="mb-6">
                  <p className="text-[10px] tracking-widest uppercase text-charcoal font-medium mb-3">Dimensions</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <button key={size} onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-xs border transition-all ${selectedSize === size ? 'border-charcoal bg-charcoal text-white' : 'border-cream-dark text-charcoal hover:border-gold'}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                  {!selectedSize && <p className="text-[10px] text-gold mt-2">* Veuillez sélectionner une dimension</p>}
                </div>
              )}

              {/* Qty + cart */}
              <div className="flex gap-3 mb-5">
                <div className="flex items-center border border-cream-dark">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-12 flex items-center justify-center hover:bg-cream transition-colors text-lg">−</button>
                  <span className="w-10 text-center text-sm font-medium">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-10 h-12 flex items-center justify-center hover:bg-cream transition-colors text-lg">+</button>
                </div>
                <button onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 ${added ? 'bg-green-600 text-white' : 'bg-charcoal text-white hover:bg-gold'}`}>
                  {added ? <><Check size={14} /> Ajouté</> : <><ShoppingBag size={14} /> Ajouter au panier</>}
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
                    <p className="text-[10px] font-medium text-charcoal">{s.label}</p>
                    <p className="text-[10px] text-charcoal-light">{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Specs accordion */}
              {product.specs?.length > 0 && (
                <div className="border-b border-cream-dark">
                  <button className="w-full flex items-center justify-between py-4" onClick={() => setOpenSpec(openSpec === 'composition' ? null : 'composition')}>
                    <span className="text-xs tracking-widest uppercase text-charcoal font-medium">Caractéristiques</span>
                    <ChevronDown size={14} className={`text-gold transition-transform ${openSpec === 'composition' ? 'rotate-180' : ''}`} />
                  </button>
                  {openSpec === 'composition' && (
                    <table className="w-full text-xs pb-5 mb-4">
                      <tbody>
                        {product.specs.map((s: any) => (
                          <tr key={s.label} className="border-b border-cream-dark last:border-0">
                            <td className="py-2.5 pr-4 text-charcoal-light w-1/2">{s.label}</td>
                            <td className="py-2.5 text-charcoal font-medium">{s.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
