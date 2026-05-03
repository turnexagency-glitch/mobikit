import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/sanity'

export const dynamic = 'force-dynamic'

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' })
}

function renderContent(blocks: any[]) {
  if (!blocks) return null
  return blocks.map((block: any, i: number) => {
    if (block._type === 'image') {
      return (
        <div key={i} className="my-8 relative aspect-[16/9] overflow-hidden">
          <Image src={block.asset?.url || ''} alt="" fill className="object-cover" />
        </div>
      )
    }
    if (block._type !== 'block') return null
    const text = block.children?.map((c: any) => c.text).join('') || ''
    if (block.style === 'h2') return <h2 key={i} className="font-serif text-2xl font-light text-charcoal mt-8 mb-4">{text}</h2>
    if (block.style === 'h3') return <h3 key={i} className="font-serif text-xl font-light text-charcoal mt-6 mb-3">{text}</h3>
    if (block.style === 'blockquote') return <blockquote key={i} className="border-l-2 border-gold pl-6 my-6 italic text-charcoal-light">{text}</blockquote>
    return <p key={i} className="text-sm text-charcoal-light leading-relaxed mb-4">{text}</p>
  })
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <>
      {/* Hero */}
      <section className="relative h-80 md:h-[500px] overflow-hidden">
        {post.coverImage ? (
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
        ) : (
          <div className="w-full h-full bg-cream-dark" />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <span className="text-[9px] tracking-widest uppercase bg-gold px-3 py-1 mb-4">{post.category}</span>
          <h1 className="font-serif text-3xl md:text-5xl font-light max-w-3xl leading-tight mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-[11px] text-white/70">
            <span>{formatDate(post.publishedAt)}</span>
            {post.readTime && <><span>·</span><span>{post.readTime} de lecture</span></>}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <p className="text-base text-charcoal-light leading-relaxed italic border-l-2 border-gold pl-6">
              {post.excerpt}
            </p>
          </div>
          <div className="prose">
            {renderContent(post.content)}
          </div>
          <div className="mt-12 pt-8 border-t border-cream-dark">
            <Link href="/blog" className="btn-outline">
              ← Retour aux articles
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
