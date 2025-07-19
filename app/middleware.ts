import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Replace this with your actual Supabase project ref
const SUPABASE_PROJECT_REF = 'xlcylvyzpxkutspcyafx'
const AUTH_COOKIE_NAME = `sb-${SUPABASE_PROJECT_REF}-auth-token`

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value
  const path = request.nextUrl.pathname

  console.log('[Middleware] Checking auth for:', path)
  console.log('[Middleware] Token:', token ? 'FOUND' : 'NOT FOUND')
 
  // Protect /dashboard routes
  if (!token && path.startsWith('/dashboard')) {
    console.log('[Middleware] Redirecting to /login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Define which routes this middleware should run on
export const config = {
  matcher: ['/dashboard/:path*'],
}
