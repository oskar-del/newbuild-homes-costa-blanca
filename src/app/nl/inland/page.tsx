import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchInlandProperties, formatPrice, ParsedProperty, REGIONS } from '@/lib/xml-parser';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Binnenland Woningen — Nieuwbouw Costa Blanca | Meer Ruimte • Beter Waarde',
  description: 'Ontdek nieuwbouw in het binnenland van Costa Blanca en Costa Calida. Meer ruimte, betere prijzen en authentiek Spaans wonen in steden als Algorfa, Rojales, Polop en meer. We spreken Nederlands!',
  openGraph: {
    title: 'Binnenland Woningen — Nieuwbouw Costa Blanca',
    description: 'Nieuw wonen in het binnenland Costa Blanca. Meer ruimte, beter waarde, echt Spanje.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl/inland',
    languages: {
      en: 'https://newbuildhomescostablanca.com/inland',
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
      href={`/nl/properties/${property.ref}`}
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
            {property.price ? formatPrice(property.price) : 'Prijs op aanvraag'}
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
              {property.bedrooms} kamers
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11a2 2 0 01-2 2H6a2 2 0 01-2-2V10z" />
              </svg>
              {property.bathrooms} badkamers
            </span>
          )}
          {property.size && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 20v-4m0 4h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
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
      aria-label="Chat op WhatsApp"
    >
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export default async function InlandPropertiesPageNL() {
  const properties = await fetchInlandProperties();

  // Group by region
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
    console.log('[INLAND NL PAGE] Total:', properties.length);
    console.log('[INLAND NL PAGE] South CB:', southInland.length, '| North CB:', northInland.length, '| Costa Calida:', costaCalidaInland.length, '| Unmatched:', otherInland.length);
    console.log('[INLAND NL PAGE] Regions found:', [...new Set(properties.map(p => p.region))].join(', '));
    if (otherInland.length > 0) {
      console.log('[INLAND NL PAGE] Unmatched towns:', [...new Set(otherInland.map(p => p.town))].join(', '));
    }
  }

  // Breadcrumb schema
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl/' },
    { name: 'Binnenland', url: 'https://newbuildhomescostablanca.com/nl/inland/' },
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
              <Link href="/nl" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Binnenland</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Meer Ruimte • Beter Waarde
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                Binnenland Woningen <span className="font-semibold">— Nieuwbouw</span>
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed mb-8">
                Ontdek authentiek Spanje met ons aanbod van nieuwbouw in het binnenland van Costa Blanca.
                Geniet van grotere kavels, traditionele dorpen, golfbanen en prijzen tot 40% lager dan aan de kust
                - allemaal binnen 20-30 minuten rijden van de stranden.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div>
                  <div className="text-2xl font-semibold text-white">{properties.length}</div>
                  <div className="text-warm-400 text-sm">Woningen</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">Vanaf {formatPrice(lowestPrice)}</div>
                  <div className="text-warm-400 text-sm">Startprijs</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">{formatPrice(avgPrice)}</div>
                  <div className="text-warm-400 text-sm">Gemiddelde Prijs</div>
                </div>
              </div>

              {/* Dutch highlight */}
              <div className="bg-white/10 border border-white/20 rounded-sm p-4 mb-8">
                <p className="text-warm-200 text-sm">
                  <span className="font-semibold">We spreken Nederlands!</span> Een villa met grote tuin kost vaak minder dan een eenkamérapartement in Amsterdam.
                </p>
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
                  Chat op WhatsApp
                </a>
                <Link
                  href="/nl/developments"
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-sm font-medium transition-colors border border-white/20 text-sm"
                >
                  Bekijk alle projecten
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
                Waarom Kopen <span className="font-semibold">Binnenland?</span>
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                Veel kopers uit Nederland en Vlaanderen ontdekken dat binnenland Costa Blanca uitstekend waarde biedt en een meer authentiek Spaans woongevoel.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-warm-50 rounded-sm">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Beter Waarde</h3>
                <p className="text-warm-600 text-sm">Onroerend goed kan 30-40% goedkoper zijn dan kust met dezelfde bouwkwaliteit.</p>
              </div>

              <div className="text-center p-6 bg-warm-50 rounded-sm">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 20v-4m0 4h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Meer Ruimte</h3>
                <p className="text-warm-600 text-sm">Grotere kavels en tuinen. Veel onroerend goed heeft 500m²+ kavels in plaats van 100-200m² aan de kust.</p>
              </div>

              <div className="text-center p-6 bg-warm-50 rounded-sm">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Authentiek Spanje</h3>
                <p className="text-warm-600 text-sm">Traditionele dorpen, lokale markten en Spaanse cultuur. Minder toeristisch, meer authentieke ervaring.</p>
              </div>

              <div className="text-center p-6 bg-warm-50 rounded-sm">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Dicht bij Kust</h3>
                <p className="text-warm-600 text-sm">De meeste binnenlanden liggen slechts 20-30 minuten van het strand. Het beste van twee werelden!</p>
              </div>
            </div>

            {/* Golf and Dutch communities highlight */}
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="bg-blue-50 border border-blue-200 rounded-sm p-6">
                <h3 className="font-semibold text-primary-900 mb-2">Golfers houden van binnenland</h3>
                <p className="text-warm-600 text-sm">
                  Fantastisch klimaat het hele jaar door - niet te heet in de zomer, nooit te koud in de winter.
                  Veel van Spanje\'s beste golfbanen liggen binnenland, perfect voor Nederlandse golfers.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-sm p-6">
                <h3 className="font-semibold text-primary-900 mb-2">Nederlandse gemeenschappen</h3>
                <p className="text-warm-600 text-sm">
                  Vega Baja is thuis voor veel Nederlandse families en expats. Een al gevestigde gemeenschap, Nederlandse restaurants,
                  en Nederlandse advocaten en belastingadviseurs die je behoeften begrijpen.
                </p>
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
                      Meest Populair
                    </span>
                    <span className="text-warm-500 text-sm">{southInland.length} woningen beschikbaar</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                    Costa Blanca <span className="font-semibold">Zuid — Binnenland</span>
                  </h2>
                  <p className="text-warm-600 mt-2 leading-relaxed">
                    De Vega Baja regio biedt het beste geldwaarde op Costa Blanca. Steden als Algorfa, Rojales en San Miguel de Salinas
                    combineren uitstekende golfbanen, traditionele Spaanse markten en gemakkelijke toegang tot stranden -
                    alles tegen prijzen 30-40% lager dan aan de kust.
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
                    href="/nl/properties?area=inland-south"
                    className="inline-flex items-center gap-2 bg-primary-900 text-white px-6 py-2.5 rounded-sm font-medium hover:bg-primary-800 transition-colors"
                  >
                    Bekijk alle {southInland.length} zuid binnenlandse woningen
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
              Wil je Binnenlandopties Verkennen?
            </h2>
            <p className="text-warm-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Ons team kan bezoeken aan binnenlandse woningen regelen en je helpen de voordelen van elk gebied te begrijpen.
              We laten je lokale voorzieningen, rijtijden naar de kust zien en helpen je het perfecte evenwicht vinden.
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
                Chat op WhatsApp
              </a>
              <Link
                href="/nl/contact"
                className="bg-primary-900 hover:bg-primary-800 text-white font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Contactformulier
              </Link>
            </div>
          </div>
        </section>

        <WhatsAppCTA />
      </main>
    </>
  );
}
