'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Shield, Tag, X, Truck } from 'lucide-react'
import { useCart } from '@/context/CartContext'

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

export default function PanierPage() {
  const router = useRouter()
  const { items, updateQty: cartUpdateQty, removeItem } = useCart()
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoError, setPromoError] = useState('')

  const updateQty = (id: string, delta: number) => {
    const item = items.find(i => i.id === id)
    if (item) cartUpdateQty(id, Math.max(1, item.qty + delta))
  }
  const remove = (id: string) => removeItem(id)

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

  const discount = appliedPromo
    ? PROMO_CODES[appliedPromo].type === 'percent'
      ? Math.round(subtotal * PROMO_CODES[appliedPromo].value / 100)
      : PROMO_CODES[appliedPromo].value
    : 0

  const total = subtotal - discount

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
                      {item.image
                        ? <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                        : <div className="w-full h-full bg-cream-dark" />
                      }
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
                      <span className="text-gold">Calculée à la commande</span>
                    </div>
                    <p className="text-[10px] text-charcoal-light">
                      À partir de 20 DH (Casablanca) · 35 DH (autres villes) + supplément poids
                    </p>
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
                    <Truck size={12} className="text-gold" />
                    <p className="text-[10px] text-charcoal-light tracking-wide">Paiement à la livraison · En espèces</p>
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
