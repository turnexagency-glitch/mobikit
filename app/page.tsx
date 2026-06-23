import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, Truck, Shield, RefreshCw, Headphones } from 'lucide-react'
import SmartImage from '@/components/SmartImage'
import { getFeaturedProducts, getAllPosts } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Mobikit | Linge de Maison Haut de Gamme au Maroc — Descamps, Treca, Pyrenex',
  description: 'Achetez en ligne votre linge de maison haut de gamme au Maroc. Parures de lit, couettes, linge de bain, literie de luxe. Distributeur officiel Descamps, Treca Paris, Pyrenex à Casablanca. Livraison partout au Maroc.',
  keywords: 'linge de maison maroc, linge de maison casablanca, descamps maroc, parure de lit maroc, couette maroc, literie luxe maroc, linge de bain maroc, boutique linge maison en ligne maroc, treca paris maroc, pyrenex maroc, housse de couette maroc, draps luxe maroc, décoration maison maroc',
  openGraph: {
    title: 'Mobikit | Linge de Maison Haut de Gamme — Descamps, Treca, Pyrenex au Maroc',
    description: 'Boutique en ligne de linge de maison haut de gamme au Maroc. Parures, couettes, literie et décoration. Livraison partout au Royaume.',
    url: 'https://www.mobikit.ma',
    images: [{ url: '/images/showroom-mobikit.webp', width: 1200, height: 630, alt: 'Mobikit — Boutique Linge de Maison Haut de Gamme au Maroc' }],
  },
  alternates: { canonical: 'https://www.mobikit.ma' },
}

const categories = [
  {
    name: 'Linge de Lit',
    description: 'Parures, draps & housses',
    href: '/boutique/linge-de-lit',
    image: '/categories/linge-de-lit.webp',
    fallback: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
  },
  {
    name: 'Linge de Bain',
    description: 'Serviettes & peignoirs',
    href: '/boutique/linge-de-bain',
    image: '/categories/linge-de-bain.webp',
    fallback: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    name: 'Linge de Table',
    description: 'Nappes, serviettes & sets',
    href: '/boutique/linge-de-table',
    image: '/categories/linge-de-table.webp',
    fallback: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  },
  {
    name: 'Décoration',
    description: 'Plaids, coussins & objets',
    href: '/boutique/decoration',
    image: '/categories/Decoration.webp',
    fallback: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
  },
  {
    name: 'Literie de Luxe',
    description: 'Matelas, couettes & oreillers',
    href: '/boutique/literie',
    image: '/categories/literie-de-luxe.webp',
    fallback: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  },
  {
    name: 'Senteurs & Bougies',
    description: 'Parfums d\'intérieur',
    href: '/boutique/senteurs-bougies',
    image: '/categories/senteurs-bougies.webp',
    fallback: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=600&q=80',
  },
]

const brands = [
  { name: 'Descamps', tagline: 'Paris · Depuis 1802', href: '/marques/descamps' },
  { name: 'TRECA', tagline: 'Paris · Literie de Prestige', href: '/marques/treca' },
  { name: 'Pyrenex', tagline: 'Duvet & Plumes Premium', href: '/marques/pyrenex' },
  { name: 'Aquanova', tagline: 'Design Belge', href: '/marques/aquanova' },
  { name: 'Esteban Parfums', tagline: 'Paris · Parfums d\'Intérieur', href: '/marques/esteban-parfums' },
  { name: 'Le Jacquard Français', tagline: 'Art de la Table', href: '/marques/le-jacquard-francais' },
  { name: 'Brun de Vian-Tiran', tagline: 'Laine Merinos · Depuis 1808', href: '/marques/brun-de-vian-tiran' },
  { name: 'Blomus', tagline: 'Design Contemporain', href: '/marques/blomus' },
]


const services = [
  { icon: Truck, title: 'Livraison au Maroc', desc: 'Livraison soignée dans tout le royaume' },
  { icon: Shield, title: 'Paiement Simple', desc: 'Paiement à la livraison, sans frais' },
  { icon: RefreshCw, title: 'Retours Faciles', desc: '14 jours pour changer d\'avis' },
  { icon: Headphones, title: 'Conseil Personnalisé', desc: 'Notre équipe vous accompagne' },
]

export default async function HomePage() {
  const [featuredProducts, posts] = await Promise.all([
    getFeaturedProducts().catch(() => []),
    getAllPosts().catch(() => []),
  ])
  const inspirations = posts.slice(0, 3)
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ height: 'calc(100vh - 184px)', minHeight: 560 }}>
        <div className="absolute inset-0">
          <SmartImage
            src="/images/descamps-lit-tropical.jpg"
            fallback="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1920&q=90"
            alt="Mobikit Home Collections"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
          <p className="text-[11px] tracking-ultra-wide uppercase text-gold mb-6 font-medium">
            Distributeur Officiel au Maroc
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-light leading-tight mb-6">
            L&apos;Art de Vivre<br />
            <span className="italic">à la Française</span>
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="text-sm md:text-base font-light tracking-wide text-white/80 mb-10 max-w-xl mx-auto">
            Linge de maison, literie et décoration haut de gamme. Les plus grandes maisons européennes, livrées chez vous au Maroc.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/boutique" className="btn-gold">
              Découvrir la Boutique
            </Link>
            <Link href="/marques" className="btn-outline border-white text-white hover:bg-white hover:text-charcoal">
              Nos Marques
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
          <div className="w-px h-8 bg-white/30" />
        </div>
      </section>

      {/* Services strip */}
      <section className="bg-cream-dark py-8 border-y border-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="flex items-center gap-4">
                <s.icon size={22} className="text-gold flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium tracking-wide text-charcoal">{s.title}</p>
                  <p className="text-[11px] text-charcoal-light mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">Nos Collections</p>
            <h2 className="section-title">Explorez Notre Univers</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link key={cat.href} href={cat.href} className="group relative overflow-hidden aspect-[4/5] block">
                <SmartImage
                  src={cat.image}
                  fallback={cat.fallback}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="font-serif text-xl font-light">{cat.name}</h3>
                  <p className="text-[11px] tracking-wide text-white/70 mt-1">{cat.description}</p>
                  <div className="flex items-center gap-2 mt-3 text-gold text-[10px] tracking-widest uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Découvrir <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About banner */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-[500px] overflow-hidden">
                <Image
                  src="/images/showroom-mobikit.webp"
                  alt="Mobikit Showroom Casablanca"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gold text-white p-8 hidden lg:block">
                <div className="font-serif text-5xl font-light">25+</div>
                <div className="text-[10px] tracking-ultra-wide uppercase mt-1">Années d&apos;Excellence</div>
              </div>
            </div>
            <div className="lg:pl-8">
              <p className="section-subtitle mb-4">Notre Histoire</p>
              <h2 className="section-title mb-4">
                Une Passion pour<br />
                <span className="italic text-gold">l&apos;Art de Vivre</span>
              </h2>
              <div className="w-12 h-px bg-gold mb-6" />
              <p className="text-sm text-charcoal-light leading-relaxed mb-4">
                Fondée en 1997, Mobikit s&apos;est imposée comme le distributeur de référence des grandes maisons européennes de linge de maison et de décoration au Maroc.
              </p>
              <p className="text-sm text-charcoal-light leading-relaxed mb-8">
                Avec une sélection rigoureuse alliant savoir-faire artisanal, qualité irréprochable et design raffiné, nous offrons à notre clientèle une expérience unique, à la hauteur des plus hauts standards internationaux.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[['1997', 'Fondée en'], ['13+', 'Marques'], ['2', 'Showrooms']].map(([num, label]) => (
                  <div key={label} className="text-center">
                    <div className="font-serif text-3xl font-light text-gold">{num}</div>
                    <div className="text-[10px] tracking-widest uppercase text-charcoal-light mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <Link href="/a-propos" className="btn-primary">
                Notre Histoire
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="section-subtitle mb-3">Sélection</p>
              <h2 className="section-title">Coups de Cœur</h2>
            </div>
            <Link href="/boutique" className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase text-charcoal hover:text-gold transition-colors font-medium">
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product: any) => (
                <Link key={product.id} href={`/produit/${product.slug}`} className="group cursor-pointer block">
                  <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-cream">
                    {product.images?.[0]
                      ? <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      : <div className="w-full h-full bg-cream-dark" />
                    }
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-gold text-white text-[9px] tracking-widest uppercase px-2 py-1">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] tracking-widest uppercase text-gold mb-1">{product.brand}</p>
                  <h3 className="text-sm font-light text-charcoal mb-1 line-clamp-2 leading-snug">{product.name}</h3>
                  <p className="text-sm font-medium text-charcoal">{product.price?.toLocaleString('fr-MA')} MAD</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-charcoal-light text-sm">
              Les coups de cœur seront disponibles prochainement.
            </div>
          )}
        </div>
      </section>

      {/* Brands */}
      <section className="py-20 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-ultra-wide uppercase text-gold mb-3">Portfolio</p>
            <h2 className="font-serif text-4xl font-light text-white">Nos Maisons de Prestige</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={brand.href}
                className="group bg-charcoal-dark hover:bg-charcoal transition-colors duration-300 p-8 text-center"
              >
                <div className="font-serif text-xl font-light text-white group-hover:text-gold transition-colors duration-300 mb-2">
                  {brand.name}
                </div>
                <div className="text-[10px] tracking-widest text-gray-400 group-hover:text-gold transition-colors">
                  {brand.tagline}
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/marques" className="btn-outline border-gold text-gold hover:bg-gold hover:text-white hover:border-gold">
              Toutes Nos Marques
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-subtitle mb-3">Témoignages</p>
          <h2 className="section-title mb-12">Ce Que Disent Nos Clients</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "Une qualité exceptionnelle. Les draps Descamps ont transformé mes nuits. Service impeccable et livraison soignée.", author: "Nadia B.", city: "Casablanca" },
              { text: "Le showroom est magnifique, l'équipe très professionnelle. J'ai équipé tout mon appartement chez Mobikit.", author: "Karim E.", city: "Rabat" },
              { text: "La couette Pyrenex est un investissement. Mobikit m'a guidé vers le bon choix. Je recommande vivement.", author: "Salma A.", city: "Marrakech" },
            ].map((t) => (
              <div key={t.author} className="bg-white p-8 shadow-sm">
                <div className="flex gap-1 mb-4 justify-center">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-gold text-gold" />)}
                </div>
                <p className="text-sm text-charcoal-light leading-relaxed italic mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="w-8 h-px bg-gold mx-auto mb-3" />
                <p className="text-xs font-medium tracking-wide text-charcoal">{t.author}</p>
                <p className="text-[10px] text-charcoal-light tracking-widest uppercase">{t.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspirations */}
      {inspirations.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="section-subtitle mb-3">Le Magazine</p>
                <h2 className="section-title">Inspirations & Conseils</h2>
              </div>
              <Link href="/blog" className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase text-charcoal hover:text-gold transition-colors font-medium">
                Tous les articles <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {inspirations.map((post: any, i: number) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <div className="relative overflow-hidden aspect-[4/3] mb-5 bg-cream-dark">
                    {post.cover_image ? (
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-cream-dark" />
                    )}
                    <span className="absolute top-3 left-3 bg-gold text-white text-[9px] tracking-widest uppercase px-3 py-1">
                      {post.category}
                    </span>
                    {i === 0 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] text-charcoal-light">
                      {new Date(post.created_at).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    {post.read_time && (
                      <>
                        <span className="w-1 h-1 bg-charcoal-light rounded-full" />
                        <span className="text-[10px] text-charcoal-light">{post.read_time}</span>
                      </>
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-light text-charcoal mb-2 group-hover:text-gold transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-charcoal-light leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <span className="text-[10px] tracking-widest uppercase text-gold font-medium flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
                    Lire l&apos;article <ArrowRight size={11} />
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10 md:hidden">
              <Link href="/blog" className="btn-outline">
                Tous les articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/showroom-linge.webp"
            alt="Mobikit Showroom Casablanca"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-dark/80" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <p className="text-[11px] tracking-ultra-wide uppercase text-gold mb-4">Visitez-nous</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">
            Notre Showroom à Casablanca
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mb-6" />
          <p className="text-sm text-white/70 mb-8 max-w-md mx-auto">
            Découvrez nos collections en exclusivité. Prenez rendez-vous avec nos conseillers.
          </p>
          <Link href="/showroom" className="btn-gold">
            Visiter le Showroom
          </Link>
        </div>
      </section>
    </>
  )
}
