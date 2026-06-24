import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/supabase'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  const title = post.seo_title || `${post.title} | Mobikit Blog`
  const description = post.seo_description || post.excerpt || ''
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://www.mobikit.ma/blog/${params.slug}`,
      images: post.cover_image ? [{ url: post.cover_image, alt: post.title }] : [],
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
    },
    alternates: { canonical: `https://www.mobikit.ma/blog/${params.slug}` },
  }
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' })
}

function renderContent(content: any) {
  if (!content) return null
  // Supabase stocke le contenu en texte brut
  if (typeof content === 'string') {
    return content.split('\n\n').map((para: string, i: number) => (
      para.trim() ? <p key={i} className="text-sm text-charcoal-light leading-relaxed mb-4">{para}</p> : null
    ))
  }
  // Ancien format Sanity (blocks)
  if (Array.isArray(content)) {
    return content.map((block: any, i: number) => {
      if (block._type === 'image') return (
        <div key={i} className="my-8 relative aspect-[16/9] overflow-hidden">
          <Image src={block.asset?.url || ''} alt="" fill className="object-cover" />
        </div>
      )
      if (block._type !== 'block') return null
      const text = block.children?.map((c: any) => c.text).join('') || ''
      if (block.style === 'h2') return <h2 key={i} className="font-serif text-2xl font-light text-charcoal mt-8 mb-4">{text}</h2>
      if (block.style === 'h3') return <h3 key={i} className="font-serif text-xl font-light text-charcoal mt-6 mb-3">{text}</h3>
      if (block.style === 'blockquote') return <blockquote key={i} className="border-l-2 border-gold pl-6 my-6 italic text-charcoal-light">{text}</blockquote>
      return <p key={i} className="text-sm text-charcoal-light leading-relaxed mb-4">{text}</p>
    })
  }
  return null
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image || 'https://www.mobikit.ma/images/showroom-mobikit.webp',
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: { '@type': 'Organization', name: 'Mobikit Home Collections', url: 'https://www.mobikit.ma' },
    publisher: {
      '@type': 'Organization',
      name: 'Mobikit Home Collections',
      logo: { '@type': 'ImageObject', url: 'https://www.mobikit.ma/favicon.svg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.mobikit.ma/blog/${params.slug}` },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.mobikit.ma' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.mobikit.ma/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.mobikit.ma/blog/${params.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }} />
      {/* Hero */}
      <section className="relative h-80 md:h-[500px] overflow-hidden">
        {post.cover_image ? (
          <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
        ) : (
          <div className="w-full h-full bg-cream-dark" />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <span className="text-[9px] tracking-widest uppercase bg-gold px-3 py-1 mb-4">{post.category}</span>
          <h1 className="font-serif text-3xl md:text-5xl font-light max-w-3xl leading-tight mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-[11px] text-white/70">
            <span>{formatDate(post.created_at)}</span>
            {post.read_time && <><span>·</span><span>{post.read_time} de lecture</span></>}
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
