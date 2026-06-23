import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isAdminAuthed } from '@/lib/adminAuth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const PAGE_SIZE = 50

export async function GET(req: NextRequest) {
  if (!isAdminAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''
  const page = parseInt(searchParams.get('page') || '0')
  const filter = searchParams.get('filter') || 'all'
  const from = page * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('products')
    .select('id, name, brand, category, price, published, featured, in_stock, sage_ref', { count: 'exact' })
    .order('name', { ascending: true })
    .range(from, to)
  if (q) query = query.ilike('name', `%${q}%`)
  if (filter === 'published') query = query.eq('published', true)
  if (filter === 'hidden') query = query.eq('published', false)

  const { data, count, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, count })
}

export async function PATCH(req: NextRequest) {
  if (!isAdminAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, field, value } = await req.json()
  if (!id || !field) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  if (!['published', 'featured'].includes(field)) return NextResponse.json({ error: 'Invalid field' }, { status: 400 })
  const { error } = await supabase.from('products').update({ [field]: value }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
