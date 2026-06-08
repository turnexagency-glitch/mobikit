'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  ArrowLeft, Save, Upload, Trash2, GripVertical, Plus, X,
  Globe, Eye, EyeOff, Star, Package, Tag, Image as ImageIcon,
  Search, FileText, Settings
} from 'lucide-react'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlb3l5bXdla2p2dHpncGN0dnF1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDg0MjM3MywiZXhwIjoyMDk2NDE4MzczfQ.cI3Ww0KU8a6z5JOpvOgTozrnE3PyscELUAc-FZLpzOM'
)

const CATEGORIES = [
  { value: 'linge-de-lit',     label: 'Linge de Lit' },
  { value: 'linge-de-table',   label: 'Linge de Table' },
  { value: 'linge-de-bain',    label: 'Linge de Bain' },
  { value: 'senteurs-bougies', label: 'Senteurs & Bougies' },
  { value: 'esteban-parfums',  label: 'Esteban Parfums' },
  { value: 'literie',          label: 'Literie de Luxe' },
  { value: 'mobilier',         label: 'Mobilier' },
  { value: 'decoration',       label: 'Décoration & Maison' },
  { value: 'pyjama-homewear',  label: 'Pyjama & Homewear' },
  { value: 'accessoires-sdb',  label: 'Accessoires Salle de Bain' },
]

const BRANDS = [
  'Descamps','Treca Paris','Pyrenex','Le Jacquard Français','Esteban Paris',
  'Aquanova','Blomus','Brun de Vian-Tiran','Pilus','Ilum · Max Benjamin',
  'Oscar','Geodesis','Cosmic','Vispring','La Savonnerie Royale',
]

const BADGES = ['Nouveau','Bestseller','Exclusif','Promo','Premium']

const TABS = [
  { id: 'general',   label: 'Général',    icon: Package },
  { id: 'images',    label: 'Photos',     icon: ImageIcon },
  { id: 'variants',  label: 'Variantes',  icon: Tag },
  { id: 'seo',       label: 'SEO',        icon: Search },
]

export default function ProductEditPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [tab, setTab] = useState('general')
  const [uploadingImg, setUploadingImg] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [newSize, setNewSize] = useState('')
  const [newColor, setNewColor] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadProduct()
  }, [params.id])

  const loadProduct = async () => {
    const { data } = await supabaseAdmin.from('products').select('*').eq('id', params.id).single()
    setProduct(data)
    setLoading(false)
  }

  const u = (key: string, val: any) => setProduct((p: any) => ({ ...p, [key]: val }))

  const save = async () => {
    setSaving(true)
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
      images: product.images || [],
      sizes: product.sizes || [],
      colors: product.colors || [],
      slug: product.slug,
      seo_title: product.seo_title || null,
      seo_description: product.seo_description || null,
    }).eq('id', product.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const uploadImage = async (file: File) => {
    if (!file.type.startsWith('image/')) return
    setUploadingImg(true)
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabaseAdmin.storage.from('product-images').upload(filename, file)
    if (!error) {
      const { data } = supabaseAdmin.storage.from('product-images').getPublicUrl(filename)
      u('images', [...(product.images || []), data.publicUrl])
    }
    setUploadingImg(false)
  }

  const removeImage = (index: number) => {
    const imgs = [...(product.images || [])]
    imgs.splice(index, 1)
    u('images', imgs)
  }

  const moveImage = (from: number, to: number) => {
    const imgs = [...(product.images || [])]
    const [item] = imgs.splice(from, 1)
    imgs.splice(to, 0, item)
    u('images', imgs)
  }

  const addSize = () => {
    if (!newSize.trim()) return
    u('sizes', [...(product.sizes || []), newSize.trim()])
    setNewSize('')
  }

  const addColor = () => {
    if (!newColor.trim()) return
    u('colors', [...(product.colors || []), newColor.trim()])
    setNewColor('')
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!product) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-charcoal-light">Produit introuvable</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-charcoal-dark text-white px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin')} className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={18} />
            </button>
            <div>
              <p className="text-xs text-gray-400">Modifier le produit</p>
              <p className="font-medium text-sm truncate max-w-xs">{product.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Statut rapide */}
            <button onClick={() => u('published', !product.published)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-colors ${product.published ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'}`}>
              {product.published ? <><Globe size={12} /> Publié</> : <><EyeOff size={12} /> Masqué</>}
            </button>
            <button onClick={() => u('featured', !product.featured)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-colors ${product.featured ? 'bg-amber-500 text-white' : 'bg-gray-600 text-gray-300'}`}>
              <Star size={12} /> {product.featured ? 'Vedette' : 'Non vedette'}
            </button>
            <button onClick={save} disabled={saving}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded transition-colors ${saving ? 'bg-gold/60 cursor-wait' : saved ? 'bg-green-600' : 'bg-gold hover:bg-gold-dark'} text-white`}>
              <Save size={14} />
              {saving ? 'Enregistrement...' : saved ? '✓ Enregistré' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-8">

          {/* Contenu principal */}
          <div className="flex-1 min-w-0">
            {/* Onglets */}
            <div className="flex gap-1 mb-6 bg-white border border-gray-100 rounded-lg p-1 w-fit">
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs rounded-md transition-colors ${tab === t.id ? 'bg-charcoal text-white' : 'text-charcoal-light hover:text-charcoal hover:bg-gray-50'}`}>
                  <t.icon size={13} /> {t.label}
                </button>
              ))}
            </div>

            {/* ── GÉNÉRAL ── */}
            {tab === 'general' && (
              <div className="space-y-5">
                <div className="bg-white border border-gray-100 rounded-lg p-5 space-y-4">
                  <h3 className="font-medium text-charcoal text-sm border-b pb-3">Informations générales</h3>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-charcoal-light mb-1.5">Nom du produit *</label>
                    <input value={product.name || ''} onChange={e => u('name', e.target.value)}
                      className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gold rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Marque</label>
                      <select value={product.brand || ''} onChange={e => u('brand', e.target.value)}
                        className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold rounded-lg">
                        <option value="">-- Choisir --</option>
                        {BRANDS.map(b => <option key={b}>{b}</option>)}
                        <option value="__custom">Autre marque...</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Badge</label>
                      <select value={product.badge || ''} onChange={e => u('badge', e.target.value || null)}
                        className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold rounded-lg">
                        <option value="">Aucun</option>
                        {BADGES.map(b => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Description</label>
                    <textarea value={product.description || ''} onChange={e => u('description', e.target.value)}
                      rows={5} className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gold rounded-lg resize-none" />
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-lg p-5 space-y-4">
                  <h3 className="font-medium text-charcoal text-sm border-b pb-3">Tarification</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Prix (MAD) *</label>
                      <input type="number" value={product.price || 0} onChange={e => u('price', parseFloat(e.target.value) || 0)}
                        className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gold rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Ancien prix MAD (barré)</label>
                      <input type="number" value={product.old_price || ''} onChange={e => u('old_price', e.target.value ? parseFloat(e.target.value) : null)}
                        placeholder="Optionnel" className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gold rounded-lg" />
                    </div>
                  </div>
                </div>

                {product.sage_ref && (
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-xs text-charcoal-light space-y-1">
                    <p className="font-medium text-charcoal text-[11px] uppercase tracking-widests mb-2">Données Sage (lecture seule)</p>
                    <p>Référence : <span className="text-charcoal font-mono">{product.sage_ref}</span></p>
                    <p>Stock Sage : <span className="text-charcoal">{product.sage_stock ?? '—'} unités</span></p>
                    <p>Dernière sync : <span className="text-charcoal">{product.sage_updated_at ? new Date(product.sage_updated_at).toLocaleString('fr-MA') : '—'}</span></p>
                  </div>
                )}
              </div>
            )}

            {/* ── PHOTOS ── */}
            {tab === 'images' && (
              <div className="bg-white border border-gray-100 rounded-lg p-5 space-y-4">
                <h3 className="font-medium text-charcoal text-sm border-b pb-3">Photos du produit</h3>
                <p className="text-xs text-charcoal-light">La première photo est l'image principale affichée sur le site.</p>

                {/* Zone upload */}
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); Array.from(e.dataTransfer.files).forEach(uploadImage) }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg cursor-pointer transition-all p-8 text-center ${dragOver ? 'border-gold bg-amber-50' : 'border-gray-200 hover:border-gold hover:bg-gray-50'}`}
                >
                  {uploadingImg ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm text-charcoal-light">Upload en cours...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-charcoal-light">
                      <Upload size={28} className="text-gold" />
                      <p className="text-sm font-medium text-charcoal">Glisser des photos ici</p>
                      <p className="text-xs">ou cliquer pour parcourir · JPG, PNG, WEBP · plusieurs fichiers acceptés</p>
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
                    onChange={e => Array.from(e.target.files || []).forEach(uploadImage)} />
                </div>

                {/* Galerie */}
                {product.images?.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-2">
                    {product.images.map((img: string, i: number) => (
                      <div key={i} className="group relative aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        {i === 0 && (
                          <span className="absolute top-1 left-1 bg-gold text-white text-[9px] px-1.5 py-0.5 rounded font-medium">Principal</span>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          {i > 0 && (
                            <button onClick={() => moveImage(i, i - 1)} className="bg-white text-charcoal p-1.5 rounded hover:bg-gray-100" title="Déplacer à gauche">←</button>
                          )}
                          <button onClick={() => removeImage(i)} className="bg-red-500 text-white p-1.5 rounded hover:bg-red-600"><Trash2 size={12} /></button>
                          {i < product.images.length - 1 && (
                            <button onClick={() => moveImage(i, i + 1)} className="bg-white text-charcoal p-1.5 rounded hover:bg-gray-100" title="Déplacer à droite">→</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── VARIANTES ── */}
            {tab === 'variants' && (
              <div className="space-y-5">
                <div className="bg-white border border-gray-100 rounded-lg p-5 space-y-4">
                  <h3 className="font-medium text-charcoal text-sm border-b pb-3">Dimensions / Tailles</h3>
                  <div className="flex flex-wrap gap-2 min-h-[40px]">
                    {(product.sizes || []).map((size: string, i: number) => (
                      <span key={i} className="flex items-center gap-1.5 bg-cream text-charcoal text-xs px-3 py-1.5 rounded-full border border-cream-dark">
                        {size}
                        <button onClick={() => { const s = [...product.sizes]; s.splice(i, 1); u('sizes', s) }} className="text-charcoal-light hover:text-red-500 transition-colors"><X size={10} /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={newSize} onChange={e => setNewSize(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addSize()}
                      placeholder="Ex: 140x200, 160x220, 200x200..."
                      className="flex-1 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-gold rounded-lg" />
                    <button onClick={addSize} className="flex items-center gap-1.5 bg-charcoal text-white px-4 py-2 text-xs rounded-lg hover:bg-charcoal-dark">
                      <Plus size={13} /> Ajouter
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-lg p-5 space-y-4">
                  <h3 className="font-medium text-charcoal text-sm border-b pb-3">Couleurs</h3>
                  <div className="flex flex-wrap gap-2 min-h-[40px]">
                    {(product.colors || []).map((color: string, i: number) => (
                      <span key={i} className="flex items-center gap-1.5 bg-cream text-charcoal text-xs px-3 py-1.5 rounded-full border border-cream-dark">
                        {color}
                        <button onClick={() => { const c = [...product.colors]; c.splice(i, 1); u('colors', c) }} className="text-charcoal-light hover:text-red-500 transition-colors"><X size={10} /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={newColor} onChange={e => setNewColor(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addColor()}
                      placeholder="Ex: Blanc, Bleu Marine, Beige..."
                      className="flex-1 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-gold rounded-lg" />
                    <button onClick={addColor} className="flex items-center gap-1.5 bg-charcoal text-white px-4 py-2 text-xs rounded-lg hover:bg-charcoal-dark">
                      <Plus size={13} /> Ajouter
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── SEO ── */}
            {tab === 'seo' && (
              <div className="bg-white border border-gray-100 rounded-lg p-5 space-y-4">
                <h3 className="font-medium text-charcoal text-sm border-b pb-3">Référencement (SEO)</h3>
                <div>
                  <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">URL du produit (slug)</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-charcoal-light bg-gray-50 px-3 py-2.5 border border-gray-200 rounded-l-lg border-r-0">mobikit.ma/produit/</span>
                    <input value={product.slug || ''} onChange={e => u('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                      className="flex-1 border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold rounded-r-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Titre SEO</label>
                  <input value={product.seo_title || ''} onChange={e => u('seo_title', e.target.value)}
                    placeholder={product.name} className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gold rounded-lg" />
                  <p className="text-[10px] text-charcoal-light mt-1">{(product.seo_title || product.name || '').length}/60 caractères recommandés</p>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widests text-charcoal-light mb-1.5">Méta description</label>
                  <textarea value={product.seo_description || ''} onChange={e => u('seo_description', e.target.value)}
                    placeholder={product.description || 'Description pour les moteurs de recherche...'}
                    rows={3} className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gold rounded-lg resize-none" />
                  <p className="text-[10px] text-charcoal-light mt-1">{(product.seo_description || '').length}/160 caractères recommandés</p>
                </div>

                {/* Aperçu Google */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-[10px] uppercase tracking-widests text-charcoal-light mb-3">Aperçu Google</p>
                  <p className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">{product.seo_title || product.name}</p>
                  <p className="text-green-700 text-xs">mobikit.ma/produit/{product.slug}</p>
                  <p className="text-charcoal-light text-xs mt-1 leading-relaxed">{product.seo_description || product.description || 'Aucune description...'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar droite */}
          <div className="w-64 flex-shrink-0 space-y-4">

            {/* Statut */}
            <div className="bg-white border border-gray-100 rounded-lg p-4 space-y-3">
              <h3 className="font-medium text-charcoal text-sm border-b pb-2">Statut</h3>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-charcoal">Visible sur le site</span>
                <div onClick={() => u('published', !product.published)}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${product.published ? 'bg-green-500' : 'bg-gray-300'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${product.published ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-charcoal">Mis en avant</span>
                <div onClick={() => u('featured', !product.featured)}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${product.featured ? 'bg-amber-500' : 'bg-gray-300'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${product.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-charcoal">En stock</span>
                <div onClick={() => u('in_stock', !product.in_stock)}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${product.in_stock !== false ? 'bg-blue-500' : 'bg-gray-300'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${product.in_stock !== false ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </label>
            </div>

            {/* Catégorie */}
            <div className="bg-white border border-gray-100 rounded-lg p-4 space-y-2">
              <h3 className="font-medium text-charcoal text-sm border-b pb-2">Catégorie</h3>
              <div className="space-y-1.5">
                {CATEGORIES.map(cat => (
                  <label key={cat.value} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="category" value={cat.value}
                      checked={product.category === cat.value}
                      onChange={() => u('category', cat.value)}
                      className="accent-gold" />
                    <span className="text-xs text-charcoal group-hover:text-gold transition-colors">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Image principale */}
            {product.images?.[0] && (
              <div className="bg-white border border-gray-100 rounded-lg p-4">
                <h3 className="font-medium text-charcoal text-sm border-b pb-2 mb-3">Image principale</h3>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50">
                  <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            {/* Bouton enregistrer */}
            <button onClick={save} disabled={saving}
              className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-lg transition-colors ${saving ? 'bg-gold/60 cursor-wait' : saved ? 'bg-green-600' : 'bg-gold hover:bg-gold-dark'} text-white`}>
              <Save size={15} />
              {saving ? 'Enregistrement...' : saved ? '✓ Enregistré !' : 'Enregistrer'}
            </button>

            <button onClick={() => router.push('/admin')}
              className="w-full py-2.5 text-xs text-charcoal-light border border-gray-200 rounded-lg hover:bg-gray-50">
              ← Retour à l'admin
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
