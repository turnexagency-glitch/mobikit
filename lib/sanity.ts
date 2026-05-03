import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '72y7gp1y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

export async function getAllProducts() {
  return client.fetch(`
    *[_type == "product"] | order(_createdAt desc) {
      _id, name, brand, category, price, oldPrice, badge, inStock, featured,
      description, sizes,
      "slug": slug.current,
      "image": images[0].asset->url,
      "images": images[].asset->url,
    }
  `)
}

export async function getFeaturedProducts() {
  return client.fetch(`
    *[_type == "product" && featured == true] | order(_createdAt desc)[0...4] {
      _id, name, brand, price, badge,
      "slug": slug.current,
      "image": images[0].asset->url,
    }
  `)
}

export async function getProductsByCategory(category: string) {
  const aliases: Record<string, string[]> = {
    'esteban-parfums': ['esteban-parfums', 'senteurs-bougies'],
  }
  const categories = aliases[category] || [category]
  return client.fetch(`
    *[_type == "product" && category in $categories] | order(_createdAt desc) {
      _id, name, brand, price, badge, inStock,
      "slug": slug.current,
      "image": images[0].asset->url,
    }
  `, { categories })
}

export async function getProductsByBrand(brand: string | string[]) {
  const brands = Array.isArray(brand) ? brand : [brand]
  return client.fetch(`
    *[_type == "product" && brand in $brands] | order(_createdAt desc) {
      _id, name, brand, price, oldPrice, badge, inStock,
      "slug": slug.current,
      "image": images[0].asset->url,
    }
  `, { brands })
}

export async function getAllPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id, title, category, excerpt, readTime, featured,
      "slug": slug.current,
      "coverImage": coverImage.asset->url,
      "publishedAt": publishedAt,
    }
  `)
}

export async function getPostBySlug(slug: string) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id, title, category, excerpt, readTime,
      "slug": slug.current,
      "coverImage": coverImage.asset->url,
      "publishedAt": publishedAt,
      content,
    }
  `, { slug })
}

export async function getProductBySlug(slug: string) {
  return client.fetch(`
    *[_type == "product" && slug.current == $slug][0] {
      _id, name, brand, category, price, oldPrice, badge, inStock, description, sizes,
      "slug": slug.current,
      "images": images[].asset->url,
      "specs": specs[]{ label, value },
      "colors": colors[]{ name, hex },
    }
  `, { slug })
}
