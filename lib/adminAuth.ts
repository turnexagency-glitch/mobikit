import { NextRequest } from 'next/server'

export function isAdminAuthed(req: NextRequest): boolean {
  const token = req.cookies.get('admin_session')?.value
  const secret = process.env.ADMIN_SESSION_SECRET
  return !!token && !!secret && token === secret
}
