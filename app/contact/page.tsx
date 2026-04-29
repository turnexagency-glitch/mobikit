'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', sujet: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
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
                        Casablanca, Maroc<br />
                        (Adresse complète sur rendez-vous)
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
                      <a href="mailto:contact@mobikit.ma" className="text-xs text-charcoal-light hover:text-gold transition-colors">
                        contact@mobikit.ma
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
                        Lun – Ven : 9h00 – 18h00<br />
                        Samedi : 10h00 – 14h00
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
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                    <Send size={14} /> Envoyer le Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-80 bg-cream-dark flex items-center justify-center border-t border-cream">
        <div className="text-center">
          <MapPin size={32} className="text-gold mx-auto mb-3" />
          <p className="font-serif text-xl font-light text-charcoal">Casablanca, Maroc</p>
          <p className="text-xs text-charcoal-light mt-1 tracking-wide">Carte Google Maps intégrée en production</p>
        </div>
      </section>
    </>
  )
}
