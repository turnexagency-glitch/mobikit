'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', sujet: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSent(true)
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.')
      }
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    }
    setLoading(false)
  }

  return (
    <>
      <section className="bg-cream py-16 px-6 text-center">
        <p className="section-subtitle mb-3">Nous Contacter</p>
        <h1 className="section-title">Parlons-Nous</h1>
        <div className="gold-divider" />
        <p className="text-sm text-charcoal-light max-w-xl mx-auto mt-4">
          Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre projet.
        </p>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-light text-charcoal mb-6">Nos Coordonnées</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-gold flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-widest uppercase text-charcoal mb-1">Showroom</p>
                      <p className="text-xs text-charcoal-light leading-relaxed">
                        Résidence Yasmine, 45 Bd Ghandi<br />
                        Casablanca, Maroc
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-gold flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-widest uppercase text-charcoal mb-1">Téléphone</p>
                      <a href="tel:+212666427890" className="text-xs text-charcoal-light hover:text-gold transition-colors">
                        +212 666-427890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-gold flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-widest uppercase text-charcoal mb-1">Email</p>
                      <a href="mailto:mobikit@mobikit.ma" className="text-xs text-charcoal-light hover:text-gold transition-colors">
                        mobikit@mobikit.ma
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-gold flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-widest uppercase text-charcoal mb-1">Horaires</p>
                      <p className="text-xs text-charcoal-light leading-relaxed">
                        Lun – Ven : 09h00–12h30 / 15h00–19h30<br />
                        Samedi : 09h00–12h30 / 15h00–19h30<br />
                        Dimanche : Fermé
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-cream border-l-2 border-gold">
                <p className="text-xs font-medium tracking-widest uppercase text-charcoal mb-2">Professionnels & Projets</p>
                <p className="text-xs text-charcoal-light leading-relaxed">
                  Hôtels, architectes, décorateurs — nous proposons des conditions spéciales pour les projets professionnels. Contactez-nous pour un devis personnalisé.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-light text-charcoal mb-6">Envoyez-Nous un Message</h2>
              {sent ? (
                <div className="bg-cream p-12 text-center border border-gold">
                  <div className="w-12 h-12 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={20} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-charcoal mb-2">Message Envoyé</h3>
                  <p className="text-sm text-charcoal-light">Nous vous répondrons dans les meilleurs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-charcoal mb-2">Nom complet *</label>
                      <input
                        type="text" required
                        value={form.nom} onChange={e => setForm({...form, nom: e.target.value})}
                        className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors bg-white"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-charcoal mb-2">Email *</label>
                      <input
                        type="email" required
                        value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                        className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors bg-white"
                        placeholder="votre@email.ma"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-charcoal mb-2">Téléphone</label>
                      <input
                        type="tel"
                        value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})}
                        className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors bg-white"
                        placeholder="+212 6XX-XXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-charcoal mb-2">Sujet *</label>
                      <select
                        required
                        value={form.sujet} onChange={e => setForm({...form, sujet: e.target.value})}
                        className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors bg-white text-charcoal-light"
                      >
                        <option value="">Choisir...</option>
                        <option>Commande en ligne</option>
                        <option>Information produit</option>
                        <option>Rendez-vous showroom</option>
                        <option>Projet professionnel</option>
                        <option>Service après-vente</option>
                        <option>Autre</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-charcoal mb-2">Message *</label>
                    <textarea
                      required rows={5}
                      value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                      className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors resize-none bg-white"
                      placeholder="Décrivez votre demande..."
                    />
                  </div>
                  {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                  <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                    {loading
                      ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Envoi en cours...</>
                      : <><Send size={14} /> Envoyer le Message</>
                    }
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-cream">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] tracking-widest uppercase text-gold font-medium flex items-center gap-2">
              <MapPin size={12} /> Descamps Casablanca — Showroom Mobikit
            </p>
            <a
              href="https://maps.app.goo.gl/Rovt7rcWNRFocR3g9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-widest uppercase text-charcoal-light hover:text-gold transition-colors underline"
            >
              Ouvrir dans Google Maps ↗
            </a>
          </div>
        </div>
        <div className="w-full h-96">
          <iframe
            src="https://maps.google.com/maps?q=33.5764273,-7.6524132&z=18&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Descamps Casablanca — Morocco Mall — Mobikit Showroom"
          />
        </div>
      </section>
    </>
  )
}
