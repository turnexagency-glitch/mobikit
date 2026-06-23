import { MetadataRoute } from 'next'
import { getAllProducts, getAllPosts } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.mobikit.ma'
  const now = new Date()

  const staticPages = [
    { url: base,                    priority: 1.0, changeFrequency: 'daily'   as const },
    { url: `${base}/boutique`,      priority: 0.95, changeFrequency: 'daily'  as const },
    { url: `${base}/marques`,       priority: 0.85, changeFrequency: 'weekly' as const },
    { url: `${base}/showroom`,      priority: 0.80, changeFrequency: 'monthly' as const },
    { url: `${base}/blog`,          priority: 0.80, changeFrequency: 'weekly' as const },
    { url: `${base}/contact`,       priority: 0.75, changeFrequency: 'monthly' as const },
    { url: `${base}/faq`,           priority: 0.70, changeFrequency: 'monthly' as const },
    { url: `${base}/a-propos`,      priority: 0.60, changeFrequency: 'monthly' as const },
  ]

  // Catégories par priorité SEO (volume de recherche estimé)
  const categoryPriorities: Record<string, number> = {
    'linge-de-lit': 0.92,
    'literie': 0.90,
    'linge-de-bain': 0.88,
    'linge-de-table': 0.85,
    'decoration': 0.82,
    'senteurs-bougies': 0.78,
    'esteban-parfums': 0.76,
    'mobilier': 0.75,
    'accessoires-sdb': 0.72,
    'pyjama-homewear': 0.70,
  }

  const categories = Object.entries(categoryPriorities).map(([cat, priority]) => ({
    url: `${base}/boutique/${cat}`,
    priority,
    changeFrequency: 'weekly' as const,
  }))

  // Marques par priorité SEO (notoriété + volume de recherche)
  const brandPriorities: Record<string, number> = {
    'descamps': 0.92,
    'treca': 0.88,
    'pyrenex': 0.85,
    'le-jacquard-francais': 0.83,
    'esteban-parfums': 0.80,
    'aquanova': 0.76,
    'vispring': 0.74,
    'brun-de-vian-tiran': 0.72,
    'blomus': 0.70,
    'pilus': 0.68,
    'la-savonnerie-royale': 0.68,
    'geodesis': 0.66,
    'cosmic': 0.65,
    'ilum': 0.65,
    'oscar': 0.65,
  }

  const brands = Object.entries(brandPriorities).map(([brand, priority]) => ({
    url: `${base}/marques/${brand}`,
    priority,
    changeFrequency: 'weekly' as const,
  }))

  const [products, posts] = await Promise.all([
    getAllProducts().catch(() => [] as any[]),
    getAllPosts().catch(() => [] as any[]),
  ])

  const productPages = products
    .filter((p: any) => p.slug && p.published !== false)
    .map((p: any) => ({
      url: `${base}/produit/${p.slug}`,
      priority: p.featured ? 0.75 : 0.65,
      changeFrequency: 'weekly' as const,
      lastModified: p.updated_at ? new Date(p.updated_at) : now,
    }))

  const postPages = posts
    .filter((p: any) => p.slug && p.published !== false)
    .map((p: any) => ({
      url: `${base}/blog/${p.slug}`,
      priority: 0.60,
      changeFrequency: 'monthly' as const,
      lastModified: p.updated_at ? new Date(p.updated_at) : p.created_at ? new Date(p.created_at) : now,
    }))

  const staticWithDate = [...staticPages, ...categories, ...brands].map(page => ({
    ...page,
    lastModified: now,
  }))

  return [...staticWithDate, ...productPages, ...postPages]
}
