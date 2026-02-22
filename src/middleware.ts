import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// All non-default locales (en is default, no prefix)
const locales = ['sv', 'nl-be', 'nl', 'fr', 'no', 'de', 'pl', 'ru'];

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

  // Handle old development URLs that should redirect to properties
  // Pattern 1: /developments/{type}-{reference} where reference is like N8105, N9422, etc.
  const developmentsMatch = pathname.match(/^\/developments\/([a-z-]+)-([nN]\d+)$/);
  if (developmentsMatch) {
    const reference = developmentsMatch[2].toUpperCase();
    return NextResponse.redirect(new URL(`/properties/${reference}`, request.url), 301);
  }

  // Pattern 2: /developments/{ref}-{description} where ref is like 3126jav, 2091jav, etc.
  // Old URLs had format: /developments/3126jav-newly-built-villa-for-sale-in-javea
  // Redirect to: /developments/3126jav (the correct short slug)
  const devLongSlugMatch = pathname.match(/^\/developments\/(\d+[a-z]+)-[a-z].*$/);
  if (devLongSlugMatch) {
    const shortSlug = devLongSlugMatch[1];
    return NextResponse.redirect(new URL(`/developments/${shortSlug}`, request.url), 301);
  }

  // Check if the URL has a locale prefix
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract locale and set it as a header for downstream use
    const locale = pathname.split('/')[1];
    // Handle nl-be (two-part prefix)
    const fullLocale = pathname.startsWith('/nl-be') ? 'nl-be' : locale;
    const response = NextResponse.next();
    response.headers.set('x-locale', fullLocale);
    return response;
  }

  // No locale prefix = English (default), no redirect needed
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)'],
};
