import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isAdminAuthed } from '@/lib/adminAuth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data, error } = await supabase.from('products').select('*').eq('id', params.id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { error } = await supabase.from('products').update({
    name: body.name,
    brand: body.brand,
    category: body.category,
    price: body.price,
    old_price: body.old_price || null,
    badge: body.badge || null,
    description: body.description || null,
    published: body.published,
    featured: body.featured,
    in_stock: body.in_stock,
    images: body.images || [],
    sizes: body.sizes || [],
    colors: body.colors || [],
    slug: body.slug,
    seo_title: body.seo_title || null,
    seo_description: body.seo_description || null,
  }).eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
