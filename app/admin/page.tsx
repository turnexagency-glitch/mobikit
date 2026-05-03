'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@sanity/client'
import { Eye, EyeOff, Package, TrendingUp, Clock, CheckCircle, Truck, XCircle, ShoppingBag, RefreshCw } from 'lucide-react'

const client = createClient({
  projectId: '72y7gp1y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_READ_TOKEN,
})

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'mobikit2025'

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending:   { label: 'En attente',   color: 'bg-yellow-100 text-yellow-700',  icon: Clock },
  confirmed: { label: 'Confirmée',    color: 'bg-blue-100 text-blue-700',      icon: CheckCircle },
  shipping:  { label: 'En livraison', color: 'bg-purple-100 text-purple-700',  icon: Truck },
  delivered: { label: 'Livrée',       color: 'bg-green-100 text-green-700',    icon: CheckCircle },
  cancelled: { label: 'Annulée',      color: 'bg-red-100 text-red-700',        icon: XCircle },
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [auth, setAuth] = useState(false)
  const [error, setError] = useState('')
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<any>(null)
  const [updating, setUpdating] = useState(false)

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setAuth(true)
      setError('')
      loadOrders()
    } else {
      setError('Mot de passe incorrect')
    }
  }

  const loadOrders = async () => {
    setLoading(true)
    try {
      const data = await client.fetch(`
        *[_type == "order"] | order(createdAt desc) {
          _id, orderId, status, paymentMethod, total, createdAt,
          customer, items
        }
      `)
      setOrders(data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    setUpdating(true)
    try {
      const writeClient = createClient({
        projectId: '72y7gp1y',
        dataset: 'production',
        apiVersion: '2024-01-01',
        useCdn: false,
        token: 'skRqSO2bWBSHr8Qqy7pjPFtf1xqwgc0ETdexIg4IEI7jrJYm4SnNtxPrVqoPhKopLppNl5I7YifigLtn1Z877o3VJH7E29lP9RhsPkdkqaURRNAkGrt5R1KjcVaLYTAi1n3wOqiSuOQMVbPOqffYcXZdKzpzWf6QXcGDeQXjaRanOzOQQYdr',
      })
      await writeClient.patch(id).set({ status }).commit()
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o))
      if (selected?._id === id) setSelected((s: any) => ({ ...s, status }))
    } catch (e) { console.error(e) }
    setUpdating(false)
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    revenue: orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + (o.total || 0), 0),
  }

  // Login screen
  if (!auth) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="font-serif text-3xl font-light text-charcoal">Mobikit</div>
            <div className="text-[10px] tracking-ultra-wide uppercase text-gold mt-1">Administration</div>
          </div>
          <div className="bg-white p-8 border border-cream-dark">
            <h2 className="font-serif text-xl font-light text-charcoal mb-6 text-center">Accès Administrateur</h2>
            <div className="relative mb-4">
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && login()}
                placeholder="Mot de passe"
                className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold pr-10"
              />
              <button onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-light">
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
            <button onClick={login} className="btn-primary w-full">Connexion</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-charcoal-dark text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="font-serif text-xl font-light">Mobikit — Administration</div>
            <div className="text-[10px] tracking-widest uppercase text-gold mt-0.5">Tableau de bord</div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadOrders} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Actualiser
            </button>
            <button onClick={() => setAuth(false)} className="text-xs text-gray-400 hover:text-white transition-colors">
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total commandes', value: stats.total, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'En attente', value: stats.pending, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { label: 'Livrées', value: stats.delivered, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Chiffre d\'affaires', value: `${stats.revenue.toLocaleString('fr-MA')} MAD`, icon: TrendingUp, color: 'text-gold', bg: 'bg-amber-50' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-100 p-5 rounded">
              <div className={`w-10 h-10 ${s.bg} rounded flex items-center justify-center mb-3`}>
                <s.icon size={20} className={s.color} />
              </div>
              <div className="text-2xl font-serif font-light text-charcoal">{s.value}</div>
              <div className="text-[11px] text-charcoal-light mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Orders list */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 rounded">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
                <h2 className="font-medium text-charcoal flex items-center gap-2">
                  <ShoppingBag size={16} className="text-gold" /> Commandes
                </h2>
                <div className="flex gap-1 flex-wrap">
                  {['all', 'pending', 'confirmed', 'shipping', 'delivered', 'cancelled'].map(s => (
                    <button key={s} onClick={() => setFilter(s)}
                      className={`text-[10px] px-2.5 py-1 rounded transition-colors ${filter === s ? 'bg-charcoal text-white' : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}>
                      {s === 'all' ? 'Toutes' : statusConfig[s]?.label}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="p-12 text-center text-charcoal-light text-sm">Chargement...</div>
              ) : filtered.length === 0 ? (
                <div className="p-12 text-center text-charcoal-light text-sm">Aucune commande</div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {filtered.map(order => {
                    const sc = statusConfig[order.status] || statusConfig.pending
                    const Icon = sc.icon
                    const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString('fr-MA', { day: '2-digit', month: 'short', year: 'numeric' }) : ''
                    return (
                      <div key={order._id} onClick={() => setSelected(order)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?._id === order._id ? 'bg-amber-50 border-l-2 border-gold' : ''}`}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-charcoal">{order.orderId}</span>
                              <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${sc.color}`}>
                                {sc.label}
                              </span>
                            </div>
                            <p className="text-xs text-charcoal-light">{order.customer?.prenom} {order.customer?.nom} · {order.customer?.ville}</p>
                            <p className="text-[10px] text-charcoal-light mt-0.5">{date} · {order.paymentMethod === 'online' ? 'CMI' : 'Livraison'}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-sm font-medium text-charcoal">{order.total?.toLocaleString('fr-MA')} MAD</p>
                            <p className="text-[10px] text-charcoal-light mt-0.5">{order.items?.length || 0} article(s)</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Order detail */}
          <div>
            {selected ? (
              <div className="bg-white border border-gray-100 rounded sticky top-6">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-medium text-charcoal">{selected.orderId}</p>
                      <p className="text-[10px] text-charcoal-light mt-0.5">
                        {selected.createdAt ? new Date(selected.createdAt).toLocaleDateString('fr-MA', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                      </p>
                    </div>
                    <button onClick={() => setSelected(null)} className="text-charcoal-light hover:text-charcoal text-lg leading-none">×</button>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {/* Status */}
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-charcoal-light mb-2">Statut</p>
                    <select
                      value={selected.status}
                      onChange={e => updateStatus(selected._id, e.target.value)}
                      disabled={updating}
                      className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-gold rounded bg-white"
                    >
                      {Object.entries(statusConfig).map(([v, c]) => (
                        <option key={v} value={v}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Client */}
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-charcoal-light mb-2">Client</p>
                    <div className="bg-gray-50 rounded p-3 space-y-1.5">
                      <p className="text-xs font-medium text-charcoal">{selected.customer?.prenom} {selected.customer?.nom}</p>
                      <p className="text-[11px] text-charcoal-light">{selected.customer?.email}</p>
                      <p className="text-[11px] text-charcoal-light">{selected.customer?.telephone}</p>
                      <p className="text-[11px] text-charcoal-light">{selected.customer?.adresse}, {selected.customer?.ville}</p>
                      {selected.customer?.notes && <p className="text-[11px] text-charcoal-light italic">Note : {selected.customer.notes}</p>}
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-charcoal-light mb-2">Articles</p>
                    <div className="space-y-2">
                      {selected.items?.map((item: any, i: number) => (
                        <div key={i} className="flex justify-between text-xs bg-gray-50 p-2 rounded">
                          <div>
                            <p className="text-charcoal font-medium">{item.name}</p>
                            <p className="text-charcoal-light text-[10px]">{item.brand} · x{item.qty}</p>
                          </div>
                          <p className="font-medium text-charcoal">{(item.price * item.qty).toLocaleString('fr-MA')} MAD</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-charcoal">Total</span>
                      <span className="font-serif text-lg text-charcoal">{selected.total?.toLocaleString('fr-MA')} MAD</span>
                    </div>
                    <p className="text-[10px] text-charcoal-light mt-1">
                      {selected.paymentMethod === 'online' ? '💳 Paiement en ligne (CMI)' : '💵 Paiement à la livraison'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-100 rounded p-8 text-center text-charcoal-light">
                <Package size={32} className="mx-auto mb-3 text-cream-dark" />
                <p className="text-sm">Sélectionnez une commande pour voir les détails</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
