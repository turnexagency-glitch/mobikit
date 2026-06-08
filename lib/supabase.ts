import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, brand, category, price, old_price, badge, in_stock, featured, description, sizes, slug, images')
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, brand, price, badge, slug, images')
    .eq('published', true)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(4)
  if (error) throw error
  return data || []
}

export async function getProductsByCategory(category: string) {
  const categories = category === 'esteban-parfums'
    ? ['esteban-parfums', 'senteurs-bougies']
    : [category]
  const { data, error } = await supabase
    .from('products')
    .select('id, name, brand, price, badge, in_stock, slug, images')
    .eq('published', true)
    .in('category', categories)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getProductsByBrand(brands: string | string[]) {
  const brandList = Array.isArray(brands) ? brands : [brands]
  const { data, error } = await supabase
    .from('products')
    .select('id, name, brand, price, old_price, badge, in_stock, slug, images')
    .eq('published', true)
    .in('brand', brandList)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data
}

export async function getAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, category, excerpt, read_time, featured, slug, cover_image, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  if (error) return null
  return data
}

export async function getSetting(key: string) {
  const { data } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single()
  return data?.value || null
}

export async function getAllSettings() {
  const { data } = await supabase.from('settings').select('key, value')
  if (!data) return {}
  return Object.fromEntries(data.map(({ key, value }) => [key, value]))
}
