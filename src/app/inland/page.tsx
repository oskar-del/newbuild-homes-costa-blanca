import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchInlandProperties, formatPrice, ParsedProperty, REGIONS } from '@/lib/xml-parser';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Inland Properties Costa Blanca | New Builds Away From the Coast',
  description: 'Discover new build properties in inland Costa Blanca and Costa Calida. More space, better value, and authentic Spanish living in towns like Algorfa, Rojales, Polop, and more.',
  openGraph: {
    title: 'Inland Properties Costa Blanca',
    description: 'New build homes in inland Costa Blanca. More space, better value, authentic Spain.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/inland',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/inland',
      'sv': 'https://newbuildhomescostablanca.com/sv/inland',
      'nl': 'https://newbuildhomescostablanca.com/nl/inland',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/inland',
      'fr': 'https://newbuildhomescostablanca.com/fr/inland',
      'no': 'https://newbuildhomescostablanca.com/no/inland',
      'de': 'https://newbuildhomescostablanca.com/de/inland',
      'pl': 'https://newbuildhomescostablanca.com/pl/inland',
      'ru': 'https://newbuildhomescostablanca.com/ru/inland',
      'x-default': 'https://newbuildhomescostablanca.com/inland',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

// Property Card for inland properties
function PropertyCard({ property }: { property: ParsedProperty }) {
  const mainImage = property.images?.[0] || '/images/placeholder-property.jpg';

  return (
    <Link
      href={`/properties/${property.ref}`}
      className="group block bg-white rounded-sm border border-warm-200 overflow-hidden hover:shadow-xl hover:border-accent-500 transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={mainImage}
          alt={`${property.propertyType} in ${property.town}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Town badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-primary-900/80 text-white text-xs font-medium px-2 py-1 rounded-sm">
            {property.town}
          </span>
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <span className="text-white font-semibold text-lg">
            {property.price ? formatPrice(property.price) : 'POA'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-primary-900 mb-2 line-clamp-1 group-hover:text-accent-600 transition-colors">
          {(property as any).aiContent?.title || property.title || `${property.propertyType} in ${property.town}`}
        </h3>

        <div className="flex items-center gap-4 text-warm-600 text-sm mb-3">
          {property.bedrooms && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {property.bedrooms} bed
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
              </svg>
              {property.bathrooms} bath
            </span>
          )}
          {property.size && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {property.size}m²
            </span>
          )}
        </div>

        <p className="text-sm text-warm-500">{property.propertyType}</p>
      </div>
    </Link>
  );
}

// WhatsApp CTA
function WhatsAppCTA() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all group"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export default async function InlandPropertiesPage() {
  const properties = await fetchInlandProperties();

  // Group by region - uses centralized feed-config.ts
  // Region is determined by town name mapping in feed-config.ts
  const southInland = properties.filter(p => p.region === 'costa-blanca-south-inland');
  const northInland = properties.filter(p => p.region === 'costa-blanca-north-inland');
  const costaCalidaInland = properties.filter(p => p.region === 'costa-calida-inland');

  // Properties without a matched region (for debugging)
  const otherInland = properties.filter(p => !p.region);

  // Stats - calculate from actual properties
  const prices = properties.map(p => p.price).filter((p): p is number => p !== null && p > 0);
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const avgPrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;

  // Debug logging (server-side)
  if (typeof window === 'undefined') {
    console.log('[INLAND PAGE] Total:', properties.length);
    console.log('[INLAND PAGE] South CB:', southInland.length, '| North CB:', northInland.length, '| Costa Calida:', costaCalidaInland.length, '| Unmatched:', otherInland.length);
    console.log('[INLAND PAGE] Regions found:', [...new Set(properties.map(p => p.region))].join(', '));
    if (otherInland.length > 0) {
      console.log('[INLAND PAGE] Unmatched towns:', [...new Set(otherInland.map(p => p.town))].join(', '));
    }
  }

  // Breadcrumb schema
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Inland Properties', url: 'https://newbuildhomescostablanca.com/inland/' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }}
      />

      <main className="min-h-screen bg-warm-50">
        {/* HERO */}
        <section className="relative bg-primary-900 py-16 md:py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Inland Properties</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  More Space • Better Value
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                Inland <span className="font-semibold">New Builds</span>
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed mb-8">
                Discover the real Spain with our selection of new build properties in inland Costa Blanca.
                Enjoy larger plots, traditional villages, golf courses, and prices up to 40% lower than coastal areas
                - all within 20-30 minutes of the beaches.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div>
                  <div className="text-2xl font-semibold text-white">{properties.length}</div>
                  <div className="text-warm-400 text-sm">Properties</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">From {formatPrice(lowestPrice)}</div>
                  <div className="text-warm-400 text-sm">Starting Price</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">{formatPrice(avgPrice)}</div>
                  <div className="text-warm-400 text-sm">Average Price</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-sm font-medium transition-colors inline-flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
                <Link
                  href="/developments"
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-sm font-medium transition-colors border border-white/20 text-sm"
                >
                  View All Developments
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* WHY INLAND */}
        <section className="py-14 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-3">
                Why Buy <span className="font-semibold">Inland?</span>
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                Many buyers are discovering that inland Costa Blanca offers excellent value and a more authentic Spanish lifestyle.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-warm-50 rounded-sm">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Better Value</h3>
                <p className="text-warm-600 text-sm">Properties can be 30-40% cheaper than coastal equivalents with the same build quality.</p>
              </div>

              <div className="text-center p-6 bg-warm-50 rounded-sm">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">More Space</h3>
                <p className="text-warm-600 text-sm">Larger plots and gardens. Many properties have 500m²+ plots compared to 100-200m² on the coast.</p>
              </div>

              <div className="text-center p-6 bg-warm-50 rounded-sm">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Authentic Spain</h3>
                <p className="text-warm-600 text-sm">Traditional villages, local markets, and Spanish culture. Less touristy, more authentic living.</p>
              </div>

              <div className="text-center p-6 bg-warm-50 rounded-sm">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Near the Coast</h3>
                <p className="text-warm-600 text-sm">Most inland towns are just 20-30 minutes from the beach. Best of both worlds!</p>
              </div>
            </div>
          </div>
        </section>

        {/* COSTA BLANCA SOUTH INLAND - Featured Section */}
        {southInland.length > 0 && (
          <section className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase">
                      Most Popular
                    </span>
                    <span className="text-warm-500 text-sm">{southInland.length} properties available</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                    Costa Blanca <span className="font-semibold">South Inland</span>
                  </h2>
                  <p className="text-warm-600 mt-2 leading-relaxed">
                    The Vega Baja region offers the best value for money in the Costa Blanca. Towns like
                    Algorfa, Rojales, and San Miguel de Salinas combine excellent golf courses, traditional
                    Spanish markets, and easy access to beaches - all at prices 30-40% lower than the coast.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {southInland.slice(0, 6).map((property) => (
                  <PropertyCard key={property.ref} property={property} />
                ))}
              </div>

              {southInland.length > 6 && (
                <div className="text-center mt-8">
                  <Link
                    href="/properties?area=inland-south"
                    className="inline-flex items-center gap-2 bg-primary-900 text-white px-6 py-2.5 rounded-sm font-medium hover:bg-primary-800 transition-colors"
                  >
                    View all {southInland.length} South Inland properties
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        {/* COSTA BLANCA NORTH INLAND */}
        {northInland.length > 0 && (
          <section className="py-14 bg-white border-b border-warm-200">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-px bg-accent-500" />
                    <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                      Mountain & Valley Living
                    </span>
                    <span className="text-warm-500 text-sm">{northInland.length} properties</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                    Costa Blanca <span className="font-semibold">North Inland</span>
                  </h2>
                  <p className="text-warm-600 mt-2 leading-relaxed">
                    Escape to the stunning Jalon Valley wine region, the charming mountain town of Polop,
                    or the bustling La Nucia. The North offers dramatic scenery, cooler summers, and a
                    more established expat community - perfect for those seeking a quieter pace of life.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {northInland.slice(0, 6).map((property) => (
                  <PropertyCard key={property.ref} property={property} />
                ))}
              </div>

              {northInland.length > 6 && (
                <div className="text-center mt-8">
                  <Link
                    href="/properties?area=inland-north"
                    className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors"
                  >
                    View all {northInland.length} North Inland properties
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        {/* COSTA CALIDA INLAND */}
        {costaCalidaInland.length > 0 && (
          <section className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-px bg-accent-500" />
                    <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                      Murcia Region
                    </span>
                    <span className="text-warm-500 text-sm">{costaCalidaInland.length} properties</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                    Costa Calida <span className="font-semibold">Inland</span>
                  </h2>
                  <p className="text-warm-600 mt-2 leading-relaxed">
                    The Murcia region offers exceptional value with a more Spanish feel. Towns like
                    Torre Pacheco and Fuente Álamo provide authentic rural living with easy access
                    to both the Mar Menor beaches and Murcia city.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {costaCalidaInland.slice(0, 6).map((property) => (
                  <PropertyCard key={property.ref} property={property} />
                ))}
              </div>

              {costaCalidaInland.length > 6 && (
                <div className="text-center mt-8">
                  <Link
                    href="/properties?area=inland-calida"
                    className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors"
                  >
                    View all {costaCalidaInland.length} Costa Calida Inland properties
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ALL INLAND PROPERTIES */}
        {properties.length > 0 && (
          <section className="py-14 bg-white border-b border-warm-200">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-px bg-accent-500" />
                    <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                      Complete Collection
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                    All Inland <span className="font-semibold">Properties</span>
                  </h2>
                  <p className="text-warm-600 mt-1">
                    Browse all {properties.length} inland new build properties
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.ref} property={property} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* POPULAR INLAND AREAS */}
        <section className="py-14 bg-primary-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Explore Areas
                </span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-white mb-3">
                Popular Inland Towns
              </h2>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: 'Algorfa', region: 'South', golf: true },
                { name: 'Rojales', region: 'South', golf: true },
                { name: 'San Miguel de Salinas', region: 'South' },
                { name: 'Benijofar', region: 'South' },
                { name: 'Polop', region: 'North', mountain: true },
                { name: 'La Nucia', region: 'North' },
                { name: 'Jalon Valley', region: 'North', wine: true },
                { name: 'Finestrat', region: 'North', mountain: true },
              ].map((area) => (
                <Link
                  key={area.name}
                  href={`/areas/${area.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group bg-white/10 hover:bg-white/20 p-4 rounded-sm transition-colors"
                >
                  <h3 className="font-medium text-white group-hover:text-accent-400 transition-colors">
                    {area.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-warm-400 text-sm">Costa Blanca {area.region}</span>
                    {area.golf && <span className="text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">Golf</span>}
                    {area.mountain && <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">Mountain</span>}
                    {area.wine && <span className="text-xs bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded">Wine</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
              Want to Explore Inland Options?
            </h2>
            <p className="text-warm-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Our team can arrange viewings of inland properties and help you understand the benefits of each area.
              We&apos;ll show you the local amenities, drive times to the coast, and help you find the perfect balance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-8 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="bg-primary-900 hover:bg-primary-800 text-white font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </section>

        <WhatsAppCTA />
      </main>
    </>
  );
}
