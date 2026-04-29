'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CreditCard, Truck, ChevronRight, Shield, Check, ArrowLeft, MapPin, User, Phone, Mail, Home } from 'lucide-react'

const orderItems = [
  { name: 'Housse de Couette Satin Blanc 240x220', brand: 'Descamps', price: 1890, qty: 1 },
  { name: 'Couette Duvet Grand Froid 220x240', brand: 'Pyrenex', price: 3450, qty: 1 },
]

type PaymentMethod = 'online' | 'delivery' | null

export default function CommandePage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', telephone: '',
    adresse: '', ville: '', quartier: '', instructions: '',
  })
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [orderId] = useState(`#MBK-${Date.now().toString().slice(-6)}`)

  const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal >= 500 ? 0 : 60
  const total = subtotal + shipping

  const updateForm = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }))

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await fetch('/api/commande', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, items: orderItems, paymentMethod, subtotal, shipping, total, orderId }),
      })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
      setConfirmed(true)
    }
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-gold" />
          </div>
          <h1 className="font-serif text-3xl font-light text-charcoal mb-3">Commande Confirmée</h1>
          <div className="w-12 h-px bg-gold mx-auto mb-5" />
          <p className="text-sm text-charcoal-light mb-2">
            Merci <strong>{form.prenom} {form.nom}</strong> pour votre commande.
          </p>
          <p className="text-sm text-charcoal-light mb-6">
            Un email de confirmation a été envoyé à <strong>{form.email}</strong>.
          </p>
          <div className="bg-white p-6 border border-cream-dark mb-6 text-left space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-charcoal-light">Référence commande</span>
              <span className="font-medium text-charcoal">{orderId}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-charcoal-light">Paiement</span>
              <span className="font-medium text-charcoal">
                {paymentMethod === 'online' ? 'En ligne (CMI)' : 'À la livraison'}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-charcoal-light">Total</span>
              <span className="font-medium text-charcoal">{total.toLocaleString('fr-MA')} MAD</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-charcoal-light">Livraison</span>
              <span className="font-medium text-charcoal">{form.ville}</span>
            </div>
          </div>
          <Link href="/" className="btn-primary w-full block text-center">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="bg-cream py-8 px-6 border-b border-cream-dark">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-charcoal-light mb-4">
            <Link href="/panier" className="hover:text-gold transition-colors flex items-center gap-1">
              <ArrowLeft size={12} /> Panier
            </Link>
            <ChevronRight size={12} />
            <span className="text-charcoal font-medium">Commande</span>
          </div>
          {/* Steps */}
          <div className="flex items-center gap-0">
            {[
              { n: 1, label: 'Livraison' },
              { n: 2, label: 'Paiement' },
              { n: 3, label: 'Confirmation' },
            ].map((s, i) => (
              <div key={s.n} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium transition-colors
                    ${step >= s.n ? 'bg-charcoal text-white' : 'bg-cream-dark text-charcoal-light'}`}>
                    {step > s.n ? <Check size={12} /> : s.n}
                  </div>
                  <span className={`text-[10px] tracking-widest uppercase hidden sm:block ${step >= s.n ? 'text-charcoal' : 'text-charcoal-light'}`}>
                    {s.label}
                  </span>
                </div>
                {i < 2 && <div className={`w-16 h-px mx-3 ${step > s.n ? 'bg-gold' : 'bg-cream-dark'}`} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left — form */}
            <div className="lg:col-span-2">

              {/* Step 1 — Livraison */}
              {step === 1 && (
                <div>
                  <h2 className="font-serif text-2xl font-light text-charcoal mb-6">Informations de Livraison</h2>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-charcoal mb-2">
                        <User size={10} className="inline mr-1" />Prénom *
                      </label>
                      <input type="text" required value={form.prenom}
                        onChange={e => updateForm('prenom', e.target.value)}
                        className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold bg-white"
                        placeholder="Votre prénom" />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-charcoal mb-2">Nom *</label>
                      <input type="text" required value={form.nom}
                        onChange={e => updateForm('nom', e.target.value)}
                        className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold bg-white"
                        placeholder="Votre nom" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-charcoal mb-2">
                        <Mail size={10} className="inline mr-1" />Email *
                      </label>
                      <input type="email" required value={form.email}
                        onChange={e => updateForm('email', e.target.value)}
                        className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold bg-white"
                        placeholder="votre@email.ma" />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-charcoal mb-2">
                        <Phone size={10} className="inline mr-1" />Téléphone *
                      </label>
                      <input type="tel" required value={form.telephone}
                        onChange={e => updateForm('telephone', e.target.value)}
                        className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold bg-white"
                        placeholder="+212 6XX-XXXXXX" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[10px] tracking-widest uppercase text-charcoal mb-2">
                      <MapPin size={10} className="inline mr-1" />Ville *
                    </label>
                    <select required value={form.ville}
                      onChange={e => updateForm('ville', e.target.value)}
                      className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold bg-white text-charcoal">
                      <option value="">Sélectionnez votre ville</option>
                      {['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Autre'].map(v => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[10px] tracking-widest uppercase text-charcoal mb-2">
                      <Home size={10} className="inline mr-1" />Adresse complète *
                    </label>
                    <input type="text" required value={form.adresse}
                      onChange={e => updateForm('adresse', e.target.value)}
                      className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold bg-white"
                      placeholder="N° rue, nom de la rue, quartier..." />
                  </div>

                  <div className="mb-6">
                    <label className="block text-[10px] tracking-widest uppercase text-charcoal mb-2">
                      Instructions de livraison (optionnel)
                    </label>
                    <textarea rows={3} value={form.instructions}
                      onChange={e => updateForm('instructions', e.target.value)}
                      className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold bg-white resize-none"
                      placeholder="Digicode, étage, horaires préférés..." />
                  </div>

                  <button
                    onClick={() => {
                      if (form.prenom && form.nom && form.email && form.telephone && form.ville && form.adresse) {
                        setStep(2)
                      }
                    }}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    Continuer vers le Paiement <ChevronRight size={14} />
                  </button>
                </div>
              )}

              {/* Step 2 — Paiement */}
              {step === 2 && (
                <div>
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 text-xs text-charcoal-light hover:text-gold mb-6">
                    <ArrowLeft size={12} /> Modifier la livraison
                  </button>
                  <h2 className="font-serif text-2xl font-light text-charcoal mb-6">Mode de Paiement</h2>

                  <div className="space-y-4 mb-8">
                    {/* Option 1 — Paiement en ligne */}
                    <button
                      onClick={() => setPaymentMethod('online')}
                      className={`w-full p-5 border-2 text-left transition-all duration-200 ${paymentMethod === 'online' ? 'border-gold bg-gold/5' : 'border-cream-dark hover:border-gold/50'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${paymentMethod === 'online' ? 'border-gold bg-gold' : 'border-charcoal-light'}`}>
                          {paymentMethod === 'online' && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <CreditCard size={18} className="text-gold" />
                            <span className="text-sm font-medium text-charcoal tracking-wide">Paiement en ligne sécurisé</span>
                            <span className="text-[9px] tracking-widest uppercase bg-gold text-white px-2 py-0.5">Recommandé</span>
                          </div>
                          <p className="text-xs text-charcoal-light leading-relaxed">
                            Payez par carte bancaire via la plateforme sécurisée CMI (Centre Monétique Interbancaire). Visa, Mastercard acceptées.
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <Shield size={11} className="text-green-600" />
                            <span className="text-[10px] text-green-600 font-medium">Paiement 100% sécurisé · SSL · 3D Secure</span>
                          </div>
                          {/* Card logos */}
                          <div className="flex gap-2 mt-3">
                            {['VISA', 'MC', 'CMI'].map(card => (
                              <span key={card} className="text-[9px] border border-cream-dark px-2 py-1 text-charcoal-light font-medium tracking-widest">
                                {card}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Option 2 — Paiement à la livraison */}
                    <button
                      onClick={() => setPaymentMethod('delivery')}
                      className={`w-full p-5 border-2 text-left transition-all duration-200 ${paymentMethod === 'delivery' ? 'border-gold bg-gold/5' : 'border-cream-dark hover:border-gold/50'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${paymentMethod === 'delivery' ? 'border-gold bg-gold' : 'border-charcoal-light'}`}>
                          {paymentMethod === 'delivery' && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <Truck size={18} className="text-gold" />
                            <span className="text-sm font-medium text-charcoal tracking-wide">Paiement à la livraison</span>
                          </div>
                          <p className="text-xs text-charcoal-light leading-relaxed">
                            Réglez en espèces directement à la réception de votre commande. Disponible dans toutes les villes du Maroc.
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <Check size={11} className="text-charcoal-light" />
                            <span className="text-[10px] text-charcoal-light">Paiement cash à la réception · Sans frais supplémentaires</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>

                  {paymentMethod && (
                    <div className="bg-cream p-4 border border-cream-dark mb-6 text-xs text-charcoal-light">
                      {paymentMethod === 'online'
                        ? 'Vous serez redirigé vers la plateforme sécurisée CMI pour finaliser le paiement par carte bancaire.'
                        : 'Votre commande sera préparée et livrée. Vous réglez en espèces à la réception du colis.'}
                    </div>
                  )}

                  <button
                    onClick={() => paymentMethod && setStep(3)}
                    disabled={!paymentMethod}
                    className={`w-full flex items-center justify-center gap-2 py-3 text-xs tracking-widest uppercase font-medium transition-colors ${paymentMethod ? 'bg-charcoal text-white hover:bg-gold' : 'bg-cream-dark text-charcoal-light cursor-not-allowed'}`}
                  >
                    Continuer <ChevronRight size={14} />
                  </button>
                </div>
              )}

              {/* Step 3 — Confirmation */}
              {step === 3 && (
                <div>
                  <button onClick={() => setStep(2)} className="flex items-center gap-2 text-xs text-charcoal-light hover:text-gold mb-6">
                    <ArrowLeft size={12} /> Modifier le paiement
                  </button>
                  <h2 className="font-serif text-2xl font-light text-charcoal mb-6">Confirmer la Commande</h2>

                  {/* Delivery recap */}
                  <div className="border border-cream-dark p-5 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-[10px] tracking-widest uppercase text-gold font-medium">Livraison</p>
                      <button onClick={() => setStep(1)} className="text-[10px] text-charcoal-light hover:text-gold underline">Modifier</button>
                    </div>
                    <p className="text-sm text-charcoal">{form.prenom} {form.nom}</p>
                    <p className="text-xs text-charcoal-light mt-1">{form.adresse}</p>
                    <p className="text-xs text-charcoal-light">{form.ville}, Maroc</p>
                    <p className="text-xs text-charcoal-light mt-1">{form.telephone} · {form.email}</p>
                  </div>

                  {/* Payment recap */}
                  <div className="border border-cream-dark p-5 mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-[10px] tracking-widest uppercase text-gold font-medium">Paiement</p>
                      <button onClick={() => setStep(2)} className="text-[10px] text-charcoal-light hover:text-gold underline">Modifier</button>
                    </div>
                    <div className="flex items-center gap-3">
                      {paymentMethod === 'online'
                        ? <><CreditCard size={16} className="text-gold" /><span className="text-sm text-charcoal">Paiement en ligne sécurisé (CMI)</span></>
                        : <><Truck size={16} className="text-gold" /><span className="text-sm text-charcoal">Paiement à la livraison</span></>
                      }
                    </div>
                  </div>

                  <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 text-base py-4 text-xs tracking-widest uppercase font-medium transition-colors ${loading ? 'bg-gold/60 text-white cursor-wait' : 'bg-gold text-white hover:bg-gold-dark'}`}
                  >
                    {loading ? (
                      <><span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" /> Envoi en cours...</>
                    ) : paymentMethod === 'online' ? (
                      <><CreditCard size={16} /> Payer {total.toLocaleString('fr-MA')} MAD</>
                    ) : (
                      <><Check size={16} /> Confirmer la Commande</>
                    )}
                  </button>

                  <p className="text-[10px] text-charcoal-light text-center mt-3 flex items-center justify-center gap-1">
                    <Shield size={10} /> Vos données sont protégées et sécurisées
                  </p>
                </div>
              )}
            </div>

            {/* Right — order summary */}
            <div>
              <div className="bg-cream p-6 sticky top-24">
                <h3 className="font-serif text-lg font-light text-charcoal mb-5">Votre Commande</h3>
                <div className="space-y-4 pb-4 border-b border-cream-dark mb-4">
                  {orderItems.map(item => (
                    <div key={item.name} className="flex justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] tracking-widest uppercase text-gold">{item.brand}</p>
                        <p className="text-xs text-charcoal leading-snug mt-0.5">{item.name}</p>
                        <p className="text-[10px] text-charcoal-light mt-0.5">Qté : {item.qty}</p>
                      </div>
                      <p className="text-xs font-medium text-charcoal flex-shrink-0">{(item.price * item.qty).toLocaleString('fr-MA')} MAD</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pb-4 border-b border-cream-dark mb-4">
                  <div className="flex justify-between text-xs text-charcoal-light">
                    <span>Sous-total</span>
                    <span>{subtotal.toLocaleString('fr-MA')} MAD</span>
                  </div>
                  <div className="flex justify-between text-xs text-charcoal-light">
                    <span>Livraison</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                      {shipping === 0 ? 'Gratuite' : `${shipping} MAD`}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-charcoal">Total</span>
                  <span className="font-serif text-xl font-light text-charcoal">{total.toLocaleString('fr-MA')} MAD</span>
                </div>
                <div className="mt-5 p-3 bg-white border border-cream-dark flex items-center gap-2">
                  <Shield size={14} className="text-gold flex-shrink-0" />
                  <p className="text-[10px] text-charcoal-light leading-tight">Paiement sécurisé · Livraison assurée au Maroc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
