import { MetadataRoute } from 'next'
import { getAllProducts, getAllPosts } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.mobikit.ma'
  const now = new Date()

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${base}/boutique`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${base}/marques`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/showroom`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/blog`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/a-propos`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/faq`, priority: 0.5, changeFrequency: 'monthly' as const },
  ]

  const categories = [
    'linge-de-lit', 'linge-de-table', 'linge-de-bain',
    'esteban-parfums', 'literie', 'mobilier', 'decoration',
    'accessoires-sdb', 'pyjama-homewear',
  ].map(cat => ({
    url: `${base}/boutique/${cat}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }))

  const brands = [
    'descamps', 'le-jacquard-francais', 'esteban-parfums', 'aquanova',
    'blomus', 'cosmic', 'pilus', 'brun-de-vian-tiran', 'ilum',
    'oscar', 'geodesis', 'la-savonnerie-royale', 'treca', 'vispring',
    'pyrenex', 'tom-dixon', 'bolia', 'gubi', 'hay',
  ].map(brand => ({
    url: `${base}/marques/${brand}`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }))

  const [products, posts] = await Promise.all([
    getAllProducts().catch(() => [] as any[]),
    getAllPosts().catch(() => [] as any[]),
  ])

  const productPages = products
    .filter((p: any) => p.slug)
    .map((p: any) => ({
      url: `${base}/produit/${p.slug}`,
      priority: 0.6,
      changeFrequency: 'weekly' as const,
    }))

  const postPages = posts
    .filter((p: any) => p.slug)
    .map((p: any) => ({
      url: `${base}/blog/${p.slug}`,
      priority: 0.5,
      changeFrequency: 'monthly' as const,
    }))

  return [...staticPages, ...categories, ...brands, ...productPages, ...postPages].map(page => ({
    ...page,
    lastModified: now,
  }))
}
