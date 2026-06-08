'use client'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag, Truck } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

const suggestions = [
  { name: 'Housse de Couette Satin', price: 1890, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&q=80', slug: 'produit/parure-satin-botanique' },
  { name: 'Couette Duvet Premium', price: 3450, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80', slug: 'produit/couette-premium' },
  { name: 'Diffuseur Esteban Ambré', price: 490, image: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=200&q=80', slug: 'produit/bouquet-parfume-ellipse-ambre-200ml' },
  { name: 'Serviette Lin Naturel', price: 340, image: 'https://images.unsplash.com/photo-1606206590849-b5b8e9c02a5f?w=200&q=80', slug: 'produit/serviette-lin' },
]

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, addItem } = useCart()
  const router = useRouter()
  const shipping = total >= 500 ? 0 : 60
  const finalTotal = total + shipping

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/40" onClick={closeCart} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-charcoal" />
            <span className="font-medium text-charcoal text-sm">
              Chariot <span className="bg-charcoal text-white text-[10px] rounded-full w-5 h-5 inline-flex items-center justify-center ml-1">{items.reduce((s, i) => s + i.qty, 0)}</span>
            </span>
          </div>
          <button onClick={closeCart} className="text-charcoal hover:text-gold transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <ShoppingBag size={48} className="text-cream-dark mb-4" />
              <p className="font-serif text-xl font-light text-charcoal mb-2">Votre panier est vide</p>
              <p className="text-xs text-charcoal-light mb-6">Découvrez nos collections haut de gamme</p>
              <button onClick={closeCart} className="btn-primary text-xs">Continuer mes achats</button>
            </div>
          ) : (
            <>
              {/* Free shipping banner */}
              {shipping === 0 ? (
                <div className="bg-green-50 border-b border-green-100 px-5 py-2.5 flex items-center gap-2">
                  <span className="text-green-600 text-xs font-medium">🎉 Frais de livraison offerts !</span>
                </div>
              ) : (
                <div className="bg-amber-50 border-b border-amber-100 px-5 py-2.5">
                  <p className="text-[11px] text-amber-700">Plus que <strong>{(500 - total).toLocaleString('fr-MA')} MAD</strong> pour la livraison gratuite</p>
                </div>
              )}

              {/* Cart items */}
              <div className="px-5 py-4 space-y-4 border-b border-gray-100">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden bg-cream rounded">
                      <Image src={item.image || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&q=80'} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] tracking-widest uppercase text-gold">{item.brand}</p>
                      <p className="text-xs text-charcoal leading-snug mt-0.5 line-clamp-2">{item.name}</p>
                      <p className="text-xs font-medium text-charcoal mt-1">{(item.price * item.qty).toLocaleString('fr-MA')} MAD</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-cream transition-colors text-sm">
                            <Minus size={10} />
                          </button>
                          <span className="w-8 text-center text-xs">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-cream transition-colors">
                            <Plus size={10} />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-[10px] text-charcoal-light hover:text-red-500 transition-colors underline">
                          Retirer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cross-sell */}
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="text-xs font-medium text-charcoal mb-3">Vous pourriez aimer</p>
                <div className="space-y-2">
                  {suggestions.slice(0, 3).map(s => (
                    <div key={s.name} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden bg-cream rounded">
                        <Image src={s.image} alt={s.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-charcoal line-clamp-1">{s.name}</p>
                        <p className="text-xs text-charcoal-light">{s.price.toLocaleString('fr-MA')} MAD</p>
                      </div>
                      <button
                        onClick={() => addItem({ id: s.slug, name: s.name, brand: '', price: s.price, image: s.image, slug: s.slug })}
                        className="w-7 h-7 border border-charcoal flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-white transition-colors flex-shrink-0"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon */}
              <div className="px-5 py-3 border-b border-gray-100">
                <div className="flex gap-2">
                  <input type="text" placeholder="Code promo" className="flex-1 border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-gold" />
                  <button className="text-xs px-3 py-2 border border-charcoal text-charcoal hover:bg-charcoal hover:text-white transition-colors">Appliquer</button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-charcoal">Total :</span>
              <span className="font-serif text-xl text-charcoal">{finalTotal.toLocaleString('fr-MA')} MAD</span>
            </div>
            <button
              onClick={() => { closeCart(); router.push('/commande') }}
              className="w-full bg-charcoal hover:bg-charcoal-dark text-white py-4 text-sm font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 rounded"
            >
              COMMANDER · {finalTotal.toLocaleString('fr-MA')} MAD
            </button>
            <button onClick={() => { closeCart(); router.push('/panier') }} className="w-full text-center text-xs underline text-charcoal-light mt-2 hover:text-gold transition-colors">
              VOIR LE PANIER
            </button>
            <div className="flex items-center justify-center gap-1 mt-3">
              <Truck size={14} className="text-charcoal" />
              <span className="text-[10px] text-charcoal-light font-medium">Paiement à la livraison · En espèces</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
