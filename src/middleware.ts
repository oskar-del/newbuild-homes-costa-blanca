import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['sv']; // Non-default locales only (en is default, no prefix)

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes, images
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.') // files with extensions
  ) {
    return NextResponse.next();
  }

  // Check if the URL has a locale prefix
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract locale and set it as a header for downstream use
    const locale = pathname.split('/')[1];
    const response = NextResponse.next();
    response.headers.set('x-locale', locale);
    return response;
  }

  // No locale prefix = English (default), no redirect needed
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)'],
};
