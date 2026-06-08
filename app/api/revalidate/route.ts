import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { path } = await req.json().catch(() => ({}))

  if (path) {
    revalidatePath(path)
  } else {
    // Revalider toutes les pages liées au contenu dynamique
    revalidatePath('/')
    revalidatePath('/blog')
    revalidatePath('/blog/[slug]', 'page')
    revalidatePath('/boutique')
    revalidatePath('/produit/[slug]', 'page')
  }

  return NextResponse.json({ revalidated: true })
}
