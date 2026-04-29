'use client'
import { useState } from 'react'
import { User, Package, Heart, LogOut, MapPin, Settings } from 'lucide-react'

const orders = [
  { id: '#MBK-2024-001', date: '15 Avril 2025', status: 'Livré', total: '5 340 MAD', items: 'Parure de lit Descamps + Couette Pyrenex' },
  { id: '#MBK-2024-002', date: '2 Mars 2025', status: 'En cours', total: '1 890 MAD', items: 'Serviettes Le Jacquard Français (x6)' },
]

export default function ComptePage() {
  const [activeTab, setActiveTab] = useState('profil')

  const tabs = [
    { id: 'profil', label: 'Mon Profil', icon: User },
    { id: 'commandes', label: 'Mes Commandes', icon: Package },
    { id: 'favoris', label: 'Mes Favoris', icon: Heart },
    { id: 'adresses', label: 'Mes Adresses', icon: MapPin },
    { id: 'parametres', label: 'Paramètres', icon: Settings },
  ]

  return (
    <>
      <section className="bg-cream py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-3xl font-light text-charcoal">Mon Compte</h1>
          <p className="text-xs text-charcoal-light mt-1">Bienvenue, Nadia</p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left text-xs tracking-widest uppercase transition-colors ${
                    activeTab === tab.id ? 'bg-charcoal text-white' : 'text-charcoal hover:text-gold'
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-xs tracking-widest uppercase text-red-400 hover:text-red-600 transition-colors mt-4">
                <LogOut size={14} />
                Déconnexion
              </button>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profil' && (
                <div>
                  <h2 className="font-serif text-2xl font-light text-charcoal mb-6">Mon Profil</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: 'Prénom', value: 'Nadia', type: 'text' },
                      { label: 'Nom', value: 'Benali', type: 'text' },
                      { label: 'Email', value: 'nadia@email.ma', type: 'email' },
                      { label: 'Téléphone', value: '+212 6XX-XXXXXX', type: 'tel' },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-[10px] tracking-widest uppercase text-charcoal mb-2">{field.label}</label>
                        <input
                          type={field.type} defaultValue={field.value}
                          className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold bg-white"
                        />
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary mt-6">Sauvegarder</button>
                </div>
              )}

              {activeTab === 'commandes' && (
                <div>
                  <h2 className="font-serif text-2xl font-light text-charcoal mb-6">Mes Commandes</h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-cream-dark p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-xs font-medium tracking-widest text-charcoal">{order.id}</p>
                            <p className="text-[10px] text-charcoal-light mt-0.5">{order.date}</p>
                          </div>
                          <span className={`text-[9px] tracking-widest uppercase px-3 py-1 ${order.status === 'Livré' ? 'bg-green-100 text-green-700' : 'bg-gold/20 text-gold'}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-charcoal-light mb-3">{order.items}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-charcoal">{order.total}</p>
                          <button className="text-[10px] tracking-widest uppercase text-gold hover:underline">Voir détails</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'favoris' && (
                <div>
                  <h2 className="font-serif text-2xl font-light text-charcoal mb-6">Mes Favoris</h2>
                  <p className="text-sm text-charcoal-light">Vous n&apos;avez pas encore de favoris.</p>
                </div>
              )}

              {activeTab === 'adresses' && (
                <div>
                  <h2 className="font-serif text-2xl font-light text-charcoal mb-6">Mes Adresses</h2>
                  <div className="border border-cream-dark p-6 max-w-sm">
                    <p className="text-[10px] tracking-widest uppercase text-gold mb-2">Adresse principale</p>
                    <p className="text-sm text-charcoal">Nadia Benali</p>
                    <p className="text-xs text-charcoal-light">Casablanca, Maroc</p>
                    <button className="text-[10px] tracking-widest uppercase text-gold hover:underline mt-3 block">Modifier</button>
                  </div>
                  <button className="btn-outline mt-4 text-xs">Ajouter une adresse</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
