import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
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
  ].map(brand => ({
    url: `${base}/marques/${brand}`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }))

  return [...staticPages, ...categories, ...brands].map(page => ({
    ...page,
    lastModified: now,
  }))
}
