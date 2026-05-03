'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Shield, Truck, Check, CreditCard, ArrowRight } from 'lucide-react'

const orderItems = [
  { id: 1, name: 'Housse de Couette Satin Blanc 240x220', brand: 'Descamps', price: 1890, qty: 1 },
  { id: 2, name: 'Couette Duvet Grand Froid 220x240', brand: 'Pyrenex', price: 3450, qty: 1 },
]

export default function CommandePage() {
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', telephone: '',
    adresse: '', ville: '', notes: '',
  })
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'delivery'>('online')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [confirmed, setConfirmed] = useState(false)
  const [orderId] = useState(`#MBK-${Date.now().toString().slice(-6)}`)

  const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal >= 500 ? 0 : 60
  const total = subtotal + shipping

  const update = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.prenom) e.prenom = 'Requis'
    if (!form.nom) e.nom = 'Requis'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide'
    if (!form.telephone) e.telephone = 'Requis'
    if (!form.ville) e.ville = 'Requis'
    if (!form.adresse) e.adresse = 'Requis'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      await fetch('/api/commande', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, items: orderItems, paymentMethod, subtotal, shipping, total, orderId }),
      })
    } catch (e) { console.error(e) }
    setLoading(false)
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6 py-20 bg-cream">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-50 border-2 border-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-green-500" />
          </div>
          <h1 className="font-serif text-3xl font-light text-charcoal mb-2">Commande Confirmée</h1>
          <div className="w-12 h-px bg-gold mx-auto mb-5" />
          <p className="text-sm text-charcoal-light mb-6">
            Merci <strong>{form.prenom}</strong> ! Un email de confirmation a été envoyé à <strong>{form.email}</strong>.
          </p>
          <div className="bg-white border border-cream-dark p-5 text-left space-y-2 mb-6">
            <div className="flex justify-between text-xs">
              <span className="text-charcoal-light">Référence</span>
              <span className="font-medium text-charcoal">{orderId}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-charcoal-light">Paiement</span>
              <span className="font-medium text-charcoal">{paymentMethod === 'online' ? 'En ligne (CMI)' : 'À la livraison'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-charcoal-light">Total</span>
              <span className="font-medium text-charcoal">{total.toLocaleString('fr-MA')} MAD</span>
            </div>
          </div>
          <Link href="/" className="btn-primary w-full block text-center">Retour à l&apos;accueil</Link>
        </div>
      </div>
    )
  }

  const Field = ({ label, name, type = 'text', placeholder, required = true, half = false }: any) => (
    <div className={half ? '' : 'col-span-2'}>
      <label className="block text-[10px] tracking-widest uppercase text-charcoal font-medium mb-1.5">
        {label}{required && <span className="text-gold ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={(form as any)[name]}
        onChange={e => update(name, e.target.value)}
        placeholder={placeholder}
        className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors bg-white ${errors[name] ? 'border-red-400 focus:border-red-400' : 'border-cream-dark focus:border-gold'}`}
      />
      {errors[name] && <p className="text-[10px] text-red-500 mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white border-b border-cream-dark px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-light text-charcoal">Mobikit</Link>
          <div className="flex items-center gap-2 text-xs text-charcoal-light">
            <Shield size={12} className="text-gold" />
            Paiement sécurisé
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-5 gap-10">

          {/* Left — Form */}
          <div className="lg:col-span-3 space-y-8">

            {/* Delivery info */}
            <div className="bg-white p-6 border border-cream-dark">
              <h2 className="font-serif text-xl font-light text-charcoal mb-5 flex items-center gap-2">
                <span className="w-6 h-6 bg-charcoal text-white text-xs flex items-center justify-center rounded-full">1</span>
                Informations de livraison
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Prénom" name="prenom" placeholder="Votre prénom" half />
                <Field label="Nom" name="nom" placeholder="Votre nom" half />
                <Field label="Email" name="email" type="email" placeholder="votre@email.ma" />
                <Field label="Téléphone" name="telephone" type="tel" placeholder="+212 6XX-XXXXXX" />
                <div className="col-span-2">
                  <label className="block text-[10px] tracking-widest uppercase text-charcoal font-medium mb-1.5">
                    Ville<span className="text-gold ml-0.5">*</span>
                  </label>
                  <select
                    value={form.ville}
                    onChange={e => update('ville', e.target.value)}
                    className={`w-full border px-4 py-3 text-sm focus:outline-none bg-white transition-colors ${errors.ville ? 'border-red-400' : 'border-cream-dark focus:border-gold'}`}
                  >
                    <option value="">Choisir votre ville...</option>
                    {['Casablanca','Rabat','Marrakech','Fès','Tanger','Agadir','Meknès','Oujda','Kénitra','Autre'].map(v => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                  {errors.ville && <p className="text-[10px] text-red-500 mt-1">{errors.ville}</p>}
                </div>
                <Field label="Adresse complète" name="adresse" placeholder="Rue, quartier, n°..." />
                <div className="col-span-2">
                  <label className="block text-[10px] tracking-widest uppercase text-charcoal font-medium mb-1.5">
                    Note de commande (optionnel)
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={e => update('notes', e.target.value)}
                    placeholder="Instructions de livraison, informations complémentaires..."
                    className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold resize-none bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white p-6 border border-cream-dark">
              <h2 className="font-serif text-xl font-light text-charcoal mb-5 flex items-center gap-2">
                <span className="w-6 h-6 bg-charcoal text-white text-xs flex items-center justify-center rounded-full">2</span>
                Mode de paiement
              </h2>
              <div className="space-y-3">

                {/* Online */}
                <label className={`flex items-start gap-4 p-4 border-2 cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-charcoal bg-charcoal/5' : 'border-cream-dark hover:border-charcoal/30'}`}>
                  <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} />
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${paymentMethod === 'online' ? 'border-charcoal' : 'border-charcoal-light'}`}>
                    {paymentMethod === 'online' && <div className="w-2.5 h-2.5 bg-charcoal rounded-full" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-charcoal" />
                        <span className="text-sm font-medium text-charcoal">Paiement en ligne</span>
                      </div>
                      <div className="flex gap-1.5">
                        {['VISA', 'MC', 'CMI'].map(c => (
                          <span key={c} className="text-[9px] border border-cream-dark px-2 py-0.5 text-charcoal-light font-medium">{c}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-charcoal-light mt-1">Paiement sécurisé par carte bancaire via CMI</p>
                    {paymentMethod === 'online' && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <Shield size={11} className="text-green-600" />
                        <span className="text-[10px] text-green-600 font-medium">Cryptage SSL · 3D Secure</span>
                      </div>
                    )}
                  </div>
                </label>

                {/* Delivery */}
                <label className={`flex items-start gap-4 p-4 border-2 cursor-pointer transition-all ${paymentMethod === 'delivery' ? 'border-charcoal bg-charcoal/5' : 'border-cream-dark hover:border-charcoal/30'}`}>
                  <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'delivery'} onChange={() => setPaymentMethod('delivery')} />
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${paymentMethod === 'delivery' ? 'border-charcoal' : 'border-charcoal-light'}`}>
                    {paymentMethod === 'delivery' && <div className="w-2.5 h-2.5 bg-charcoal rounded-full" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Truck size={16} className="text-charcoal" />
                      <span className="text-sm font-medium text-charcoal">Paiement à la livraison</span>
                    </div>
                    <p className="text-xs text-charcoal-light mt-1">Réglez en espèces à la réception · Sans frais supplémentaires</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-4 flex items-center justify-center gap-3 text-sm tracking-widest uppercase font-medium transition-all ${loading ? 'bg-gold/60 text-white cursor-wait' : 'bg-gold text-white hover:bg-gold-dark'}`}
            >
              {loading
                ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Traitement...</>
                : paymentMethod === 'online'
                  ? <><CreditCard size={16} /> Payer {total.toLocaleString('fr-MA')} MAD</>
                  : <><Check size={16} /> Confirmer la commande</>
              }
            </button>

            <p className="text-[11px] text-charcoal-light text-center flex items-center justify-center gap-1.5">
              <Shield size={11} className="text-gold" />
              Vos données sont protégées et ne seront jamais partagées
            </p>
          </div>

          {/* Right — Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-cream-dark p-5 sticky top-24">
              <h3 className="font-serif text-lg font-light text-charcoal mb-4 pb-3 border-b border-cream-dark">
                Votre commande
              </h3>
              <div className="space-y-3 mb-4">
                {orderItems.map(item => (
                  <div key={item.id} className="flex justify-between gap-3 text-xs">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gold">{item.brand}</p>
                      <p className="text-charcoal leading-snug mt-0.5">{item.name}</p>
                      <p className="text-charcoal-light">Qté : {item.qty}</p>
                    </div>
                    <p className="font-medium text-charcoal flex-shrink-0">{(item.price * item.qty).toLocaleString('fr-MA')} MAD</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-cream-dark pt-3 space-y-2">
                <div className="flex justify-between text-xs text-charcoal-light">
                  <span>Sous-total</span>
                  <span>{subtotal.toLocaleString('fr-MA')} MAD</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-charcoal-light">Livraison</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium text-xs' : 'text-xs text-charcoal-light'}>
                    {shipping === 0 ? 'Gratuite' : `${shipping} MAD`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-gold">Livraison gratuite dès 500 MAD</p>
                )}
                <div className="flex justify-between pt-2 border-t border-cream-dark">
                  <span className="text-sm font-medium text-charcoal">Total</span>
                  <span className="font-serif text-xl font-light text-charcoal">{total.toLocaleString('fr-MA')} MAD</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-cream-dark space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-charcoal-light">
                  <Truck size={12} className="text-gold flex-shrink-0" />
                  Livraison 3-5 jours ouvrables
                </div>
                <div className="flex items-center gap-2 text-[10px] text-charcoal-light">
                  <Shield size={12} className="text-gold flex-shrink-0" />
                  Paiement 100% sécurisé CMI
                </div>
                <div className="flex items-center gap-2 text-[10px] text-charcoal-light">
                  <Check size={12} className="text-gold flex-shrink-0" />
                  Retours acceptés sous 14 jours
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
