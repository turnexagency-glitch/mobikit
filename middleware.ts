import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('admin_session')?.value
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!token || !secret || token !== secret) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/produit/:path*'],
}
