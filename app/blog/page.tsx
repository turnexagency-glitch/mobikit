import Image from 'next/image'
import Link from 'next/link'

const articles = [
  {
    title: 'Comment Choisir sa Couette : Guide Complet',
    excerpt: 'Duvet d\'oie, synthétique, chaude ou légère... Tout ce que vous devez savoir pour choisir la couette parfaite selon vos besoins.',
    category: 'Guide d\'Achat',
    date: '15 Avril 2025',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    slug: 'choisir-couette-guide',
    readTime: '5 min',
  },
  {
    title: 'L\'Art de Dresser une Belle Table',
    excerpt: 'Nappe, serviettes, couverts... Les secrets des décorateurs pour créer une table élégante pour chaque occasion.',
    category: 'Inspirations',
    date: '8 Avril 2025',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    slug: 'art-dresser-belle-table',
    readTime: '4 min',
  },
  {
    title: 'Tendances Déco 2025 : Le Retour du Naturel',
    excerpt: 'Lin, coton biologique, laine mérinos... Les matières naturelles s\'imposent dans nos intérieurs pour une décoration douce et authentique.',
    category: 'Tendances',
    date: '1er Avril 2025',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
    slug: 'tendances-deco-2025',
    readTime: '6 min',
  },
  {
    title: 'Entretenir son Linge de Maison Haut de Gamme',
    excerpt: 'Percale, satin, lin... Chaque matière a ses spécificités. Nos conseils pour préserver la qualité et la longévité de vos textiles.',
    category: 'Conseils',
    date: '25 Mars 2025',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
    slug: 'entretenir-linge-maison',
    readTime: '7 min',
  },
  {
    title: 'Descamps : 220 Ans de Savoir-Faire Textile',
    excerpt: 'Plongez dans l\'histoire d\'une maison fondée en 1802 qui continue d\'incarner l\'excellence du linge de maison français.',
    category: 'Nos Marques',
    date: '18 Mars 2025',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
    slug: 'descamps-histoire',
    readTime: '5 min',
  },
  {
    title: 'Chambre Cosy : Créer un Havre de Paix',
    excerpt: 'Literie de qualité, textiles doux, luminosité... Tous nos conseils pour transformer votre chambre en un vrai cocon de bien-être.',
    category: 'Inspirations',
    date: '10 Mars 2025',
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80',
    slug: 'chambre-cosy',
    readTime: '4 min',
  },
]

const categories = ['Tous', 'Inspirations', 'Guide d\'Achat', 'Tendances', 'Conseils', 'Nos Marques']

export default function BlogPage() {
  const [featured, ...rest] = articles

  return (
    <>
      <section className="bg-cream py-16 px-6 text-center">
        <p className="section-subtitle mb-3">Blog & Inspirations</p>
        <h1 className="section-title">L&apos;Art de Vivre Mobikit</h1>
        <div className="gold-divider" />
        <p className="text-sm text-charcoal-light max-w-xl mx-auto mt-4">
          Conseils déco, inspirations, guides d&apos;achat et actualités des marques — découvrez l&apos;univers Mobikit.
        </p>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Category filter */}
          <div className="flex gap-4 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button key={cat} className={`text-[10px] tracking-widest uppercase px-4 py-2 border transition-colors ${cat === 'Tous' ? 'bg-charcoal text-white border-charcoal' : 'border-cream-dark text-charcoal hover:border-gold hover:text-gold'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Featured article */}
          <Link href={`/blog/${featured.slug}`} className="group block mb-12">
            <div className="grid lg:grid-cols-2 gap-0 overflow-hidden">
              <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="bg-cream p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[9px] tracking-widest uppercase bg-gold text-white px-3 py-1">{featured.category}</span>
                  <span className="text-[10px] text-charcoal-light">{featured.date}</span>
                  <span className="text-[10px] text-charcoal-light">· {featured.readTime} de lecture</span>
                </div>
                <h2 className="font-serif text-3xl font-light text-charcoal mb-4 group-hover:text-gold transition-colors leading-tight">
                  {featured.title}
                </h2>
                <div className="w-8 h-px bg-gold mb-4" />
                <p className="text-sm text-charcoal-light leading-relaxed mb-6">{featured.excerpt}</p>
                <span className="text-xs tracking-widest uppercase text-gold font-medium">Lire l&apos;article →</span>
              </div>
            </div>
          </Link>

          {/* Article grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
                <div className="relative overflow-hidden aspect-[4/3] mb-4">
                  <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 text-[9px] tracking-widest uppercase bg-gold text-white px-2 py-1">
                    {article.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] text-charcoal-light">{article.date}</span>
                  <span className="text-[10px] text-charcoal-light">· {article.readTime}</span>
                </div>
                <h3 className="font-serif text-xl font-light text-charcoal mb-2 group-hover:text-gold transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-charcoal-light leading-relaxed line-clamp-2">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
