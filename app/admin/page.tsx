'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Eye, EyeOff, Package, TrendingUp, Clock, CheckCircle, Truck, XCircle,
  ShoppingBag, RefreshCw, Star, Globe, GlobeLock, BookOpen, Plus, Trash2, Edit3, Search } from 'lucide-react'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlb3l5bXdla2p2dHpncGN0dnF1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDg0MjM3MywiZXhwIjoyMDk2NDE4MzczfQ.cI3Ww0KU8a6z5JOpvOgTozrnE3PyscELUAc-FZLpzOM'
)

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'mobikit2025'

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending:   { label: 'En attente',   color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  confirmed: { label: 'Confirmée',    color: 'bg-blue-100 text-blue-700',     icon: CheckCircle },
  shipping:  { label: 'En livraison', color: 'bg-purple-100 text-purple-700', icon: Truck },
  delivered: { label: 'Livrée',       color: 'bg-green-100 text-green-700',   icon: CheckCircle },
  cancelled: { label: 'Annulée',      color: 'bg-red-100 text-red-700',       icon: XCircle },
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [auth, setAuth] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'commandes' | 'produits' | 'blog'>('commandes')

  // Commandes
  const [orders, setOrders] = useState<any[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<any>(null)
  const [updating, setUpdating] = useState(false)

  // Produits
  const [products, setProducts] = useState<any[]>([])
  const [prodLoading, setProdLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [prodPage, setProdPage] = useState(0)
  const [prodTotal, setProdTotal] = useState(0)
  const [prodFilter, setProdFilter] = useState<'all' | 'published' | 'hidden'>('all')
  const [editProduct, setEditProduct] = useState<any>(null)
  const PAGE_SIZE = 50

  // Blog
  const [posts, setPosts] = useState<any[]>([])
  const [blogLoading, setBlogLoading] = useState(false)
  const [editPost, setEditPost] = useState<any>(null)
  const [newPost, setNewPost] = useState(false)

  const login = () => {
    if (password === ADMIN_PASSWORD) { setAuth(true); setError(''); loadOrders() }
    else setError('Mot de passe incorrect')
  }

  // ─── Commandes ───────────────────────────────────────────────────────────────
  const loadOrders = async () => {
    setOrdersLoading(true)
    const { data } = await supabaseAdmin.from('orders').select('*').order('created_at', { ascending: false })
    setOrders(data || [])
    setOrdersLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    setUpdating(true)
    await supabaseAdmin.from('orders').update({ status }).eq('id', id)
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    if (selected?.id === id) setSelected((s: any) => ({ ...s, status }))
    setUpdating(false)
  }

  // ─── Produits ────────────────────────────────────────────────────────────────
  const loadProducts = async (q = '', page = 0, filter = prodFilter) => {
    setProdLoading(true)
    const from = page * PAGE_SIZE
    const to = from + PAGE_SIZE - 1
    let query = supabaseAdmin
      .from('products')
      .select('id, name, brand, category, price, published, featured, in_stock, sage_ref', { count: 'exact' })
      .order('name', { ascending: true })
      .range(from, to)
    if (q) query = query.ilike('name', `%${q}%`)
    if (filter === 'published') query = query.eq('published', true)
    if (filter === 'hidden') query = query.eq('published', false)
    const { data, count } = await query
    setProducts(data || [])
    setProdTotal(count || 0)
    setProdPage(page)
    setProdLoading(false)
  }

  const toggleProduct = async (id: string, field: 'published' | 'featured', val: boolean) => {
    await supabaseAdmin.from('products').update({ [field]: val }).eq('id', id)
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: val } : p))
    await revalidate()
  }

  const saveProduct = async (product: any) => {
    await supabaseAdmin.from('products').update({
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      old_price: product.old_price || null,
      badge: product.badge || null,
      description: product.description || null,
      published: product.published,
      featured: product.featured,
      in_stock: product.in_stock,
    }).eq('id', product.id)
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, ...product } : p))
    await revalidate()
    setEditProduct(null)
  }

  // ─── Blog ────────────────────────────────────────────────────────────────────
  const loadPosts = async () => {
    setBlogLoading(true)
    const { data } = await supabaseAdmin.from('posts').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
    setBlogLoading(false)
  }

  const revalidate = async () => {
    await fetch('/api/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) }).catch(() => {})
  }

  const savePost = async (post: any) => {
    if (post.id) {
      await supabaseAdmin.from('posts').update({ ...post, updated_at: new Date().toISOString() }).eq('id', post.id)
    } else {
      await supabaseAdmin.from('posts').insert({ ...post, created_at: new Date().toISOString() })
    }
    await revalidate()
    setEditPost(null); setNewPost(false); loadPosts()
  }

  const deletePost = async (id: string) => {
    if (!confirm('Supprimer cet article ?')) return
    await supabaseAdmin.from('posts').delete().eq('id', id)
    await revalidate()
    loadPosts()
  }

  useEffect(() => { if (auth && tab === 'produits') loadProducts('', 0, prodFilter) }, [tab, auth])
  useEffect(() => { if (auth && tab === 'blog') loadPosts() }, [tab, auth])

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    revenue: orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + (o.total || 0), 0),
  }
  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  // ─── Login ───────────────────────────────────────────────────────────────────
  if (!auth) return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-serif text-3xl font-light text-charcoal">Mobikit</div>
          <div className="text-[10px] tracking-ultra-wide uppercase text-gold mt-1">Administration</div>
        </div>
        <div className="bg-white p-8 border border-cream-dark">
          <div className="relative mb-4">
            <input type={showPwd ? 'text' : 'password'} value={password}
              onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()}
              placeholder="Mot de passe"
              className="w-full border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-gold pr-10" />
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

  // ─── Admin ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-charcoal-dark text-white px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="font-serif text-xl font-light">Mobikit <span className="text-gold text-sm">Admin</span></div>
          <div className="flex items-center gap-1">
            {[
              { key: 'commandes', label: 'Commandes', icon: ShoppingBag },
              { key: 'produits',  label: 'Produits',  icon: Package },
              { key: 'blog',      label: 'Blog',       icon: BookOpen },
            ].map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setTab(key as any)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs rounded transition-colors ${tab === key ? 'bg-gold text-white' : 'text-gray-400 hover:text-white'}`}>
                <Icon size={13} /> {label}
              </button>
            ))}
            <button onClick={() => setAuth(false)} className="ml-3 text-xs text-gray-400 hover:text-white">Déconnexion</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── COMMANDES ─────────────────────────────────────────────── */}
        {tab === 'commandes' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total commandes', value: stats.total, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'En attente', value: stats.pending, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                { label: 'Livrées', value: stats.delivered, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
                { label: "Chiffre d'affaires", value: `${stats.revenue.toLocaleString('fr-MA')} MAD`, icon: TrendingUp, color: 'text-gold', bg: 'bg-amber-50' },
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
              <div className="lg:col-span-2 bg-white border border-gray-100 rounded">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
                  <h2 className="font-medium text-charcoal flex items-center gap-2"><ShoppingBag size={16} className="text-gold" /> Commandes</h2>
                  <div className="flex gap-1 flex-wrap">
                    {['all','pending','confirmed','shipping','delivered','cancelled'].map(s => (
                      <button key={s} onClick={() => setFilter(s)}
                        className={`text-[10px] px-2.5 py-1 rounded ${filter === s ? 'bg-charcoal text-white' : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}>
                        {s === 'all' ? 'Toutes' : statusConfig[s]?.label}
                      </button>
                    ))}
                    <button onClick={loadOrders} className="ml-1 text-gray-400 hover:text-charcoal"><RefreshCw size={13} className={ordersLoading ? 'animate-spin' : ''} /></button>
                  </div>
                </div>
                {ordersLoading ? <div className="p-12 text-center text-sm text-charcoal-light">Chargement...</div>
                  : filtered.length === 0 ? <div className="p-12 text-center text-sm text-charcoal-light">Aucune commande</div>
                  : <div className="divide-y divide-gray-50">
                    {filtered.map(order => {
                      const sc = statusConfig[order.status] || statusConfig.pending
                      return (
                        <div key={order.id} onClick={() => setSelected(order)}
                          className={`p-4 cursor-pointer hover:bg-gray-50 ${selected?.id === order.id ? 'bg-amber-50 border-l-2 border-gold' : ''}`}>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium">{order.order_id}</span>
                                <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${sc.color}`}>{sc.label}</span>
                              </div>
                              <p className="text-xs text-charcoal-light">{order.customer?.prenom} {order.customer?.nom} · {order.customer?.ville}</p>
                              <p className="text-[10px] text-charcoal-light">{order.payment_method === 'online' ? 'CMI' : 'Livraison'}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{order.total?.toLocaleString('fr-MA')} MAD</p>
                              <p className="text-[10px] text-charcoal-light">{order.items?.length || 0} article(s)</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                }
              </div>

              <div>
                {selected ? (
                  <div className="bg-white border border-gray-100 rounded sticky top-24 p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-medium">{selected.order_id}</p>
                      <button onClick={() => setSelected(null)} className="text-charcoal-light text-lg">×</button>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-charcoal-light mb-2">Statut</p>
                      <select value={selected.status} onChange={e => updateStatus(selected.id, e.target.value)} disabled={updating}
                        className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-gold rounded">
                        {Object.entries(statusConfig).map(([v, c]) => <option key={v} value={v}>{c.label}</option>)}
                      </select>
                    </div>
                    <div className="bg-gray-50 rounded p-3 space-y-1">
                      <p className="text-xs font-medium">{selected.customer?.prenom} {selected.customer?.nom}</p>
                      <p className="text-[11px] text-charcoal-light">{selected.customer?.email}</p>
                      <p className="text-[11px] text-charcoal-light">{selected.customer?.telephone}</p>
                      <p className="text-[11px] text-charcoal-light">{selected.customer?.adresse}, {selected.customer?.ville}</p>
                    </div>
                    <div className="space-y-2">
                      {selected.items?.map((item: any, i: number) => (
                        <div key={i} className="flex justify-between text-xs bg-gray-50 p-2 rounded">
                          <div><p className="font-medium">{item.name}</p><p className="text-charcoal-light text-[10px]">{item.brand} · x{item.qty}</p></div>
                          <p className="font-medium">{(item.price * item.qty).toLocaleString('fr-MA')} MAD</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="text-sm font-medium">Total</span>
                      <span className="font-serif text-lg">{selected.total?.toLocaleString('fr-MA')} MAD</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-100 rounded p-8 text-center text-charcoal-light">
                    <Package size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Sélectionnez une commande</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* ── PRODUITS ──────────────────────────────────────────────── */}
        {tab === 'produits' && (
          <div className="bg-white border border-gray-100 rounded">
            {/* Header */}
            <div className="p-4 border-b flex flex-col gap-3">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="font-medium text-charcoal flex items-center gap-2"><Package size={16} className="text-gold" /> Produits</h2>
                <p className="text-xs text-charcoal-light">{prodTotal.toLocaleString()} produit(s) · page {prodPage + 1}/{Math.ceil(prodTotal / PAGE_SIZE) || 1}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Filtre statut */}
                <div className="flex gap-1">
                  {([['all','Tous'],['published','Publiés'],['hidden','Masqués']] as const).map(([v, l]) => (
                    <button key={v} onClick={() => { setProdFilter(v); loadProducts(search, 0, v) }}
                      className={`text-[10px] px-3 py-1.5 rounded transition-colors ${prodFilter === v ? 'bg-charcoal text-white' : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}>
                      {l}
                    </button>
                  ))}
                </div>
                {/* Recherche */}
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <div className="relative flex-1">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light" />
                    <input value={search} onChange={e => setSearch(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && loadProducts(search, 0)}
                      placeholder="Rechercher par nom..."
                      className="w-full border border-gray-200 pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-gold rounded" />
                  </div>
                  <button onClick={() => loadProducts(search, 0)} className="text-xs bg-charcoal text-white px-3 py-1.5 rounded hover:bg-charcoal-dark whitespace-nowrap">Chercher</button>
                </div>
              </div>
            </div>

            {/* Formulaire édition produit */}
            {editProduct && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
                  <div className="p-5 border-b flex items-center justify-between sticky top-0 bg-white">
                    <h3 className="font-medium text-charcoal">Modifier le produit</h3>
                    <button onClick={() => setEditProduct(null)} className="text-charcoal-light hover:text-charcoal text-xl">×</button>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-charcoal-light mb-1.5">Nom</label>
                      <input value={editProduct.name || ''} onChange={e => setEditProduct((p: any) => ({ ...p, name: e.target.value }))}
                        className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-gold rounded" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Marque</label>
                        <input value={editProduct.brand || ''} onChange={e => setEditProduct((p: any) => ({ ...p, brand: e.target.value }))}
                          className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-gold rounded" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Catégorie</label>
                        <select value={editProduct.category || ''} onChange={e => setEditProduct((p: any) => ({ ...p, category: e.target.value }))}
                          className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-gold rounded">
                          {['linge-de-lit','linge-de-table','linge-de-bain','senteurs-bougies','esteban-parfums','literie','mobilier','decoration','pyjama-homewear','accessoires-sdb'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Prix (MAD)</label>
                        <input type="number" value={editProduct.price || 0} onChange={e => setEditProduct((p: any) => ({ ...p, price: parseFloat(e.target.value) }))}
                          className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-gold rounded" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Ancien prix (MAD)</label>
                        <input type="number" value={editProduct.old_price || ''} onChange={e => setEditProduct((p: any) => ({ ...p, old_price: e.target.value ? parseFloat(e.target.value) : null }))}
                          placeholder="Optionnel"
                          className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-gold rounded" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Badge</label>
                      <select value={editProduct.badge || ''} onChange={e => setEditProduct((p: any) => ({ ...p, badge: e.target.value || null }))}
                        className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-gold rounded">
                        <option value="">Aucun</option>
                        {['Nouveau','Bestseller','Exclusif','Promo','Premium'].map(b => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Description</label>
                      <textarea value={editProduct.description || ''} onChange={e => setEditProduct((p: any) => ({ ...p, description: e.target.value }))}
                        rows={3} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-gold rounded resize-none" />
                    </div>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={editProduct.published || false} onChange={e => setEditProduct((p: any) => ({ ...p, published: e.target.checked }))} className="w-4 h-4 accent-gold" />
                        <span className="text-sm">Visible sur le site</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={editProduct.featured || false} onChange={e => setEditProduct((p: any) => ({ ...p, featured: e.target.checked }))} className="w-4 h-4 accent-gold" />
                        <span className="text-sm">Mis en avant (accueil)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={editProduct.in_stock !== false} onChange={e => setEditProduct((p: any) => ({ ...p, in_stock: e.target.checked }))} className="w-4 h-4 accent-gold" />
                        <span className="text-sm">En stock</span>
                      </label>
                    </div>
                  </div>
                  <div className="p-5 border-t flex justify-end gap-3 sticky bottom-0 bg-white">
                    <button onClick={() => setEditProduct(null)} className="text-xs px-4 py-2 border border-gray-200 rounded hover:bg-gray-50">Annuler</button>
                    <button onClick={() => saveProduct(editProduct)} className="text-xs bg-gold text-white px-5 py-2 rounded hover:bg-gold-dark">Enregistrer</button>
                  </div>
                </div>
              </div>
            )}

            {/* Liste */}
            {prodLoading ? (
              <div className="p-12 text-center text-sm text-charcoal-light">Chargement...</div>
            ) : products.length === 0 ? (
              <div className="p-12 text-center text-sm text-charcoal-light">Aucun produit trouvé</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {products.map(p => (
                  <div key={p.id} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer group"
                    onClick={() => setEditProduct({ ...p })}>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-charcoal truncate group-hover:text-gold transition-colors">{p.name?.replace(/^[\s?!#@*]+/, '')}</p>
                      <p className="text-[10px] text-charcoal-light">{p.brand} · {p.category} · {p.price?.toLocaleString('fr-MA')} MAD</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0" onClick={e => e.stopPropagation()}>
                      <button onClick={() => toggleProduct(p.id, 'featured', !p.featured)}
                        className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded transition-colors ${p.featured ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-400'}`}>
                        <Star size={11} /> Vedette
                      </button>
                      <button onClick={() => toggleProduct(p.id, 'published', !p.published)}
                        className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded transition-colors ${p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                        {p.published ? <><Globe size={11} /> Publié</> : <><GlobeLock size={11} /> Masqué</>}
                      </button>
                      <Edit3 size={13} className="text-charcoal-light group-hover:text-gold transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {prodTotal > PAGE_SIZE && (
              <div className="p-4 border-t flex items-center justify-between">
                <button onClick={() => loadProducts(search, prodPage - 1)} disabled={prodPage === 0}
                  className="text-xs px-4 py-2 border border-gray-200 rounded disabled:opacity-30 hover:bg-gray-50 disabled:cursor-not-allowed">
                  ← Précédent
                </button>
                <p className="text-xs text-charcoal-light">
                  {prodPage * PAGE_SIZE + 1}–{Math.min((prodPage + 1) * PAGE_SIZE, prodTotal)} sur {prodTotal.toLocaleString()}
                </p>
                <button onClick={() => loadProducts(search, prodPage + 1)} disabled={(prodPage + 1) * PAGE_SIZE >= prodTotal}
                  className="text-xs px-4 py-2 border border-gray-200 rounded disabled:opacity-30 hover:bg-gray-50 disabled:cursor-not-allowed">
                  Suivant →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── BLOG ──────────────────────────────────────────────────── */}
        {tab === 'blog' && (
          <div>
            {(editPost || newPost) ? (
              <PostForm
                post={editPost || { title: '', excerpt: '', content: '', category: 'Inspirations', published: false }}
                onSave={savePost}
                onCancel={() => { setEditPost(null); setNewPost(false) }}
              />
            ) : (
              <div className="bg-white border border-gray-100 rounded">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="font-medium flex items-center gap-2"><BookOpen size={16} className="text-gold" /> Articles Blog</h2>
                  <button onClick={() => setNewPost(true)} className="flex items-center gap-1.5 text-xs bg-gold text-white px-4 py-2 rounded hover:bg-gold-dark transition-colors">
                    <Plus size={13} /> Nouvel article
                  </button>
                </div>
                {blogLoading ? <div className="p-12 text-center text-sm text-charcoal-light">Chargement...</div>
                  : posts.length === 0 ? (
                    <div className="p-12 text-center text-charcoal-light">
                      <BookOpen size={32} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm mb-4">Aucun article</p>
                      <button onClick={() => setNewPost(true)} className="text-xs bg-gold text-white px-4 py-2 rounded">Créer le premier article</button>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-50">
                      {posts.map(post => (
                        <div key={post.id} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{post.title}</p>
                            <p className="text-[10px] text-charcoal-light">{post.category} · {new Date(post.created_at).toLocaleDateString('fr-MA')}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] px-2 py-0.5 rounded-full ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                              {post.published ? 'Publié' : 'Brouillon'}
                            </span>
                            <button onClick={() => setEditPost(post)} className="text-charcoal-light hover:text-gold transition-colors"><Edit3 size={14} /></button>
                            <button onClick={() => deletePost(post.id)} className="text-charcoal-light hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                }
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

function ImageUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)

  const upload = async (file: File) => {
    if (!file.type.startsWith('image/')) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlb3l5bXdla2p2dHpncGN0dnF1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDg0MjM3MywiZXhwIjoyMDk2NDE4MzczfQ.cI3Ww0KU8a6z5JOpvOgTozrnE3PyscELUAc-FZLpzOM'
    )
    const { error } = await client.storage.from('blog-images').upload(filename, file)
    if (!error) {
      const { data } = client.storage.from('blog-images').getPublicUrl(filename)
      onChange(data.publicUrl)
    }
    setUploading(false)
  }

  return (
    <div className="space-y-2">
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) upload(f) }}
        onClick={() => document.getElementById('img-upload')?.click()}
        className={`relative border-2 border-dashed rounded-lg cursor-pointer transition-all ${dragging ? 'border-gold bg-amber-50' : 'border-gray-200 hover:border-gold hover:bg-gray-50'}`}
      >
        {value ? (
          <div className="relative h-44 overflow-hidden rounded-lg">
            <img src={value} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
              <p className="text-white text-xs font-medium">Cliquer ou glisser pour remplacer</p>
            </div>
          </div>
        ) : (
          <div className="h-36 flex flex-col items-center justify-center gap-2 text-charcoal-light">
            {uploading ? (
              <><div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" /><p className="text-xs">Upload en cours...</p></>
            ) : (
              <><div className="text-4xl">📷</div><p className="text-sm font-medium text-charcoal">Glisser une image ici</p><p className="text-xs">ou cliquer pour parcourir · JPG, PNG, WEBP</p></>
            )}
          </div>
        )}
        <input id="img-upload" type="file" accept="image/*" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) upload(f) }} />
      </div>
      <input value={value || ''} onChange={e => onChange(e.target.value)}
        placeholder="ou coller une URL d'image..."
        className="w-full border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-gold rounded text-charcoal-light" />
    </div>
  )
}

function PostForm({ post, onSave, onCancel }: { post: any; onSave: (p: any) => void; onCancel: () => void }) {
  const [form, setForm] = useState(post)
  const u = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))
  return (
    <div className="bg-white border border-gray-100 rounded p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-charcoal">{form.id ? 'Modifier l\'article' : 'Nouvel article'}</h2>
        <button onClick={onCancel} className="text-charcoal-light hover:text-charcoal text-xl leading-none">×</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-[10px] uppercase tracking-widest text-charcoal-light mb-1.5">Titre *</label>
          <input value={form.title} onChange={e => u('title', e.target.value)} className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gold rounded" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-charcoal-light mb-1.5">Catégorie</label>
          <select value={form.category} onChange={e => u('category', e.target.value)} className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold rounded">
            {['Inspirations','Guide d\'Achat','Tendances','Conseils','Nos Marques'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-charcoal-light mb-1.5">Temps de lecture</label>
          <input value={form.read_time || ''} onChange={e => u('read_time', e.target.value)} placeholder="ex: 5 min" className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gold rounded" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Résumé *</label>
          <textarea value={form.excerpt || ''} onChange={e => u('excerpt', e.target.value)} rows={2} className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gold rounded resize-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Contenu</label>
          <textarea value={form.content || ''} onChange={e => u('content', e.target.value)} rows={8} className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gold rounded resize-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Image de couverture</label>
          <ImageUploader value={form.cover_image || ''} onChange={v => u('cover_image', v)} />
        </div>
      </div>
      <div className="flex items-center justify-between pt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.published || false} onChange={e => u('published', e.target.checked)} className="w-4 h-4 accent-gold" />
          <span className="text-sm text-charcoal">Publier sur le site</span>
        </label>
        <div className="flex gap-3">
          <button onClick={onCancel} className="text-xs px-4 py-2 border border-gray-200 rounded hover:bg-gray-50">Annuler</button>
          <button onClick={() => onSave(form)} className="text-xs bg-gold text-white px-5 py-2 rounded hover:bg-gold-dark">Enregistrer</button>
        </div>
      </div>
    </div>
  )
}
