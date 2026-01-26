import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/* routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken) {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Session validation will be done at the page level
    // Middleware only checks for cookie presence
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
