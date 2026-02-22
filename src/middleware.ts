import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// All non-default locales (en is default, no prefix)
const locales = ['sv', 'nl-be', 'nl', 'fr', 'no', 'de', 'pl', 'ru'];

// ============================================================================
// REMOVED/LEGACY URL PATTERNS → 410 Gone
// ============================================================================
// These patterns match old URLs that Google still crawls but no longer exist.
// Returning 410 (Gone) tells Google the content is PERMANENTLY removed,
// which is faster to de-index than 404 (Not Found).
//
// Source: ~982 GSC 404 errors analysis
// ============================================================================

// Old URL patterns that should return 410 Gone
const GONE_PATTERNS: RegExp[] = [
  // Old property filter pages (no longer used)
  /^\/properties\/(apartments|villas|townhouses|bungalows|penthouses|land|plots)$/,
  // Old property filter with location
  /^\/properties\/(costa-blanca-north|costa-blanca-south|costa-calida)$/,
  // Old nested property type/location combos
  /^\/properties\/(apartments|villas|townhouses|bungalows|penthouses)-in-/,
  // Old property pages with description slugs (real properties use reference codes like N1234)
  /^\/properties\/[a-z]+-[a-z]+-[a-z]+/,
  // Old guide URLs that were restructured
  /^\/guides\/[a-z]+-[a-z]+-[a-z]+-[a-z]+-[a-z]+-[a-z]+/,
  // Legacy sitemap patterns
  /^\/sitemap-[a-z]+\.xml$/,
];

// Specific old paths to return 410 for
const GONE_PATHS = new Set([
  '/property-search',
  '/new-developments',
  '/latest-properties',
  '/featured-properties',
  '/about-us',
  '/contact-us',
  '/testimonials',
  '/partners',
  '/terms-and-conditions',
  '/privacy',
  '/newsletter',
]);

function isGonePath(pathname: string): boolean {
  // Strip locale prefix for matching
  let cleanPath = pathname;
  for (const locale of locales) {
    if (cleanPath.startsWith(`/${locale}/`)) {
      cleanPath = cleanPath.slice(locale.length + 1);
      break;
    }
  }

  // Check exact paths
  if (GONE_PATHS.has(cleanPath)) return true;

  // Check patterns
  for (const pattern of GONE_PATTERNS) {
    if (pattern.test(cleanPath)) return true;
  }

  return false;
}

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

  // ============================================================================
  // 410 GONE: Return immediately for known removed URLs
  // ============================================================================
  if (isGonePath(pathname)) {
    return new NextResponse(
      `<!DOCTYPE html><html><head><title>410 Gone</title><meta name="robots" content="noindex"></head><body><h1>This page has been permanently removed</h1><p>The content you're looking for is no longer available. <a href="https://newbuildhomescostablanca.com">Visit our homepage</a> to find properties.</p></body></html>`,
      {
        status: 410,
        statusText: 'Gone',
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    );
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
