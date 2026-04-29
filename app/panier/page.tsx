'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Shield, Tag, X } from 'lucide-react'

// ============================================================
//  CODES PROMO — modifier ici pour ajouter / supprimer
//  type: 'percent' = réduction en %  |  'fixed' = montant fixe en MAD
// ============================================================
const PROMO_CODES: Record<string, { type: 'percent' | 'fixed'; value: number; label: string }> = {
  'BIENVENUE10':  { type: 'percent', value: 10,   label: '-10%' },
  'MOBIKIT15':   { type: 'percent', value: 15,   label: '-15%' },
  'ETE2025':     { type: 'percent', value: 20,   label: '-20%' },
  'VIP50':       { type: 'fixed',   value: 50,   label: '-50 MAD' },
  'LIVGRATUITE': { type: 'fixed',   value: 150,  label: 'Livraison offerte' },
}
// ============================================================

const initialItems = [
  { id: 1, name: 'Housse de Couette Satin Blanc 240x220', brand: 'Descamps', price: 1890, qty: 1, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&q=80' },
  { id: 2, name: 'Couette Duvet Grand Froid 220x240', brand: 'Pyrenex', price: 3450, qty: 1, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80' },
]

export default function PanierPage() {
  const router = useRouter()
  const [items, setItems] = useState(initialItems)
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoError, setPromoError] = useState('')

  const updateQty = (id: number, delta: number) => {
    setItems(items.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item))
  }
  const remove = (id: number) => setItems(items.filter(item => item.id !== id))

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (PROMO_CODES[code]) {
      setAppliedPromo(code)
      setPromoError('')
      setPromoInput('')
    } else {
      setPromoError('Code promo invalide ou expiré.')
      setAppliedPromo(null)
    }
  }

  const removePromo = () => {
    setAppliedPromo(null)
    setPromoError('')
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const freeShipping = subtotal >= 500
  const shipping = freeShipping ? 0 : 60

  const discount = appliedPromo
    ? PROMO_CODES[appliedPromo].type === 'percent'
      ? Math.round(subtotal * PROMO_CODES[appliedPromo].value / 100)
      : PROMO_CODES[appliedPromo].value
    : 0

  const total = subtotal + shipping - discount

  return (
    <>
      <section className="bg-cream py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-3xl font-light text-charcoal">Mon Panier</h1>
          <p className="text-xs text-charcoal-light mt-1">{items.length} article{items.length > 1 ? 's' : ''}</p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={48} className="text-cream-dark mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-light text-charcoal mb-2">Votre panier est vide</h2>
              <p className="text-sm text-charcoal-light mb-6">Découvrez nos collections haut de gamme</p>
              <Link href="/boutique" className="btn-primary">Continuer mes Achats</Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-cream-dark bg-white">
                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-cream">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] tracking-widest uppercase text-gold mb-1">{item.brand}</p>
                      <h3 className="text-sm font-light text-charcoal mb-3 leading-snug">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-cream-dark">
                          <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-cream transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="w-10 text-center text-xs">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-cream transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-sm font-medium text-charcoal">{(item.price * item.qty).toLocaleString('fr-MA')} MAD</p>
                        <button onClick={() => remove(item.id)} className="text-charcoal-light hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo code input */}
                {!appliedPromo ? (
                  <div className="mt-6">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={e => { setPromoInput(e.target.value); setPromoError('') }}
                        onKeyDown={e => e.key === 'Enter' && applyPromo()}
                        placeholder="Code promo"
                        className="flex-1 border border-cream-dark px-4 py-2.5 text-xs focus:outline-none focus:border-gold uppercase"
                      />
                      <button onClick={applyPromo} className="btn-outline text-xs px-6">
                        Appliquer
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-xs text-red-500 mt-2">{promoError}</p>
                    )}
                  </div>
                ) : (
                  <div className="mt-6 flex items-center justify-between bg-gold/10 border border-gold px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-gold" />
                      <span className="text-xs font-medium text-charcoal tracking-widest uppercase">{appliedPromo}</span>
                      <span className="text-xs text-gold font-medium">{PROMO_CODES[appliedPromo].label}</span>
                    </div>
                    <button onClick={removePromo} className="text-charcoal-light hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Summary */}
              <div>
                <div className="bg-cream p-6 sticky top-24">
                  <h2 className="font-serif text-xl font-light text-charcoal mb-6">Récapitulatif</h2>
                  <div className="space-y-3 pb-4 border-b border-cream-dark mb-4">
                    <div className="flex justify-between text-xs text-charcoal-light">
                      <span>Sous-total</span>
                      <span>{subtotal.toLocaleString('fr-MA')} MAD</span>
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between text-xs text-green-600 font-medium">
                        <span>Réduction ({appliedPromo})</span>
                        <span>-{discount.toLocaleString('fr-MA')} MAD</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs text-charcoal-light">
                      <span>Livraison</span>
                      <span className={freeShipping ? 'text-green-600 font-medium' : ''}>
                        {freeShipping ? 'Gratuite' : `${shipping} MAD`}
                      </span>
                    </div>
                    {!freeShipping && (
                      <p className="text-[10px] text-gold">
                        Plus que {(500 - subtotal).toLocaleString('fr-MA')} DH pour la livraison gratuite à Casablanca
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between mb-6">
                    <span className="text-sm font-medium text-charcoal">Total</span>
                    <span className="font-serif text-xl font-light text-charcoal">{total.toLocaleString('fr-MA')} MAD</span>
                  </div>
                  <button
                    onClick={() => router.push('/commande')}
                    className="btn-primary w-full flex items-center justify-center gap-2 mb-3"
                  >
                    Commander <ArrowRight size={14} />
                  </button>
                  <Link href="/boutique" className="btn-outline w-full text-center block">
                    Continuer mes Achats
                  </Link>
                  <div className="flex items-center gap-2 justify-center mt-4">
                    <Shield size={12} className="text-gold" />
                    <p className="text-[10px] text-charcoal-light tracking-wide">Paiement 100% sécurisé CMI</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
