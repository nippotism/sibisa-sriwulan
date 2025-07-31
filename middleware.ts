import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SUPABASE_PROJECT_REF = 'ffynlivkctlcmwckashq'
const AUTH_COOKIE_NAME = `sb-${SUPABASE_PROJECT_REF}-auth-token`

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value
  const path = request.nextUrl.pathname

  // ✅ Debug logs
  console.log('[Middleware] Path:', path)
  console.log('[Middleware] Token:', token ? 'FOUND' : 'NOT FOUND')

  // 🔒 If NOT logged in and trying to access protected routes
  if (!token && path.startsWith('/dashboard')) {
    console.log('[Middleware] Not logged in → redirect to /login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 🔒 If logged in and trying to access /login (or /register, etc.)
  if (token && (path === '/login' || path === '/register')) {
    console.log('[Middleware] Already logged in → redirect to /dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'], // 👈 match all relevant routes
}
