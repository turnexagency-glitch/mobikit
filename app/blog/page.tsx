import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

const categories = ['Tous', 'Inspirations', 'Guide d\'Achat', 'Tendances', 'Conseils', 'Nos Marques']

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <>
      <section className="bg-cream py-16 px-6 text-center">
        <p className="section-subtitle mb-3">Blog & Inspirations</p>
        <h1 className="section-title">L&apos;Art de Vivre Mobikit</h1>
        <div className="gold-divider" />
        <p className="text-sm text-charcoal-light max-w-xl mx-auto mt-4">
          Conseils déco, inspirations, guides d&apos;achat et actualités des marques.
        </p>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-2xl font-light text-charcoal mb-3">Articles à venir</p>
              <p className="text-sm text-charcoal-light">Nos articles seront publiés très prochainement.</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <Link href={`/blog/${featured.slug}`} className="group block mb-12">
                  <div className="grid lg:grid-cols-2 gap-0 overflow-hidden">
                    <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                      {featured.coverImage ? (
                        <Image src={featured.coverImage} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full bg-cream-dark min-h-[300px]" />
                      )}
                    </div>
                    <div className="bg-cream p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[9px] tracking-widest uppercase bg-gold text-white px-3 py-1">{featured.category}</span>
                        <span className="text-[10px] text-charcoal-light">{formatDate(featured.publishedAt)}</span>
                        {featured.readTime && <span className="text-[10px] text-charcoal-light">· {featured.readTime}</span>}
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
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((post: any) => (
                    <Link key={post._id} href={`/blog/${post.slug}`} className="group block">
                      <div className="relative overflow-hidden aspect-[4/3] mb-4 bg-cream-dark">
                        {post.coverImage ? (
                          <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full bg-cream-dark" />
                        )}
                        <span className="absolute top-3 left-3 text-[9px] tracking-widest uppercase bg-gold text-white px-2 py-1">
                          {post.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] text-charcoal-light">{formatDate(post.publishedAt)}</span>
                        {post.readTime && <span className="text-[10px] text-charcoal-light">· {post.readTime}</span>}
                      </div>
                      <h3 className="font-serif text-xl font-light text-charcoal mb-2 group-hover:text-gold transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-charcoal-light leading-relaxed line-clamp-2">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
