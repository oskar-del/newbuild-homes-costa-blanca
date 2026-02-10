import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchXMLFeed } from '@/lib/xml-parser';
import { formatPrice } from '@/lib/unified-property';

export const metadata: Metadata = {
  title: 'Luxe Villa\'s Costa Blanca | Premium Woningen vanaf €800k',
  description: 'Ontdek luxe villa\'s en exclusieve woningen op Costa Blanca vanaf 800.000 euro. Zeeuitzicht, privé zwembaden en premium locaties in Jávea, Moraira en exclusieve enclaves.',
  openGraph: {
    title: 'Luxe Villa\'s Costa Blanca | Premium Woningen €800k+',
    description: 'Ontdek luxe villa\'s en exclusieve woningen op Costa Blanca. Zeeuitzicht, privé zwembaden, premium locaties.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/nl-be/luxury',
    siteName: 'New Build Homes Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/luxury',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/luxury',
      'sv': 'https://newbuildhomescostablanca.com/sv/luxury',
      'nl': 'https://newbuildhomescostablanca.com/nl/luxury',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/luxury',
      'fr': 'https://newbuildhomescostablanca.com/fr/luxury',
      'no': 'https://newbuildhomescostablanca.com/no/luxury',
      'x-default': 'https://newbuildhomescostablanca.com/luxury',
    },
  },
};

const luxuryAreas = [
  {
    name: 'Jávea',
    description: 'Historische haven met zandstranden, jachthaven en berg op de achtergrond. Premium villagebieden omvatten Cap Martí en Monte Olimpo.',
    priceRange: '€800k - €5M+',
  },
  {
    name: 'Moraira',
    description: 'Exclusieve enclave met ongerepte baaitjes, jachtclub en internationale gemeenschap. Rustig gevoel met uitzonderlijke privacy.',
    priceRange: '€1M - €8M+',
  },
  {
    name: 'Altea',
    description: 'Kunstenaarsdorp met witgekalkte oude stad, culturele scene en fantastische zonsondergangsuitzichten.',
    priceRange: '€700k - €3M+',
  },
  {
    name: 'Cumbre del Sol',
    description: 'Bergbouw tussen Jávea en Moraira met dramatische zeeuitzichten en moderne infrastructuur.',
    priceRange: '€600k - €2M+',
  },
];

export default async function BELuxuryPage() {
  const allProperties = await fetchXMLFeed();
  const luxuryProperties = allProperties
    .filter(p => p.price && p.price >= 800000 && p.images?.[0])
    .sort((a, b) => (b.price || 0) - (a.price || 0));

  const bespoke = luxuryProperties.filter(p => p.price && p.price >= 2000000);
  const premium = luxuryProperties.filter(p => p.price && p.price >= 800000 && p.price < 2000000);

  return (
    <main className="min-h-screen bg-warm-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
              Luxe Villa's op <span className="font-semibold">Costa Blanca</span>
            </h1>
            <p className="text-warm-300 text-lg max-w-2xl mx-auto">
              Exclusieve woningen met zeeuitzicht, privé zwembaden en premium locaties. Vanaf €800.000.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-400 mb-2">{luxuryProperties.length}</div>
              <div className="text-warm-300">Luxe Woningen</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-400 mb-2">{bespoke.length}</div>
              <div className="text-warm-300">Bespoke €2M+</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-400 mb-2">50%</div>
              <div className="text-warm-300">Vs. Amsterdam</div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light text-primary-900 mb-10 text-center">
            Premium <span className="font-semibold">Locaties</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {luxuryAreas.map((area) => (
              <div key={area.name} className="bg-warm-50 p-8 rounded-sm border border-warm-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-primary-900 mb-3">{area.name}</h3>
                <p className="text-warm-600 mb-4">{area.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-accent-600 font-bold">{area.priceRange}</span>
                  <Link href="/nl-be/properties" className="text-primary-900 hover:text-accent-600 font-medium text-sm">
                    Bekijk →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Properties */}
      {bespoke.length > 0 && (
        <section className="py-16 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-10 text-center">
              Bespoke <span className="font-semibold">Collectie (€2M+)</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {bespoke.slice(0, 6).map(property => (
                <Link
                  key={property.id}
                  href={`/nl-be/properties/${property.ref}`}
                  className="group bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all border border-warm-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={property.images?.[0] || '/images/placeholder-property.jpg'}
                      alt={property.title || 'Luxury property'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-primary-900 mb-2 line-clamp-1">
                      {property.title || `Luxury ${property.propertyType}`}
                    </h3>
                    <div className="mb-3">
                      <span className="text-2xl font-bold text-accent-600">
                        {formatPrice(property.price || 0)}
                      </span>
                    </div>
                    <div className="flex gap-3 text-sm text-warm-600">
                      {property.bedrooms && <span>{property.bedrooms} kamers</span>}
                      {property.size && <span>{property.size}m²</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium Properties */}
      {premium.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-10 text-center">
              Premium <span className="font-semibold">Selectie (€800k-€2M)</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {premium.slice(0, 6).map(property => (
                <Link
                  key={property.id}
                  href={`/nl-be/properties/${property.ref}`}
                  className="group bg-warm-50 rounded-sm overflow-hidden hover:shadow-xl transition-all border border-warm-200"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={property.images?.[0] || '/images/placeholder-property.jpg'}
                      alt={property.title || 'Premium property'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-primary-900 mb-2 line-clamp-1">
                      {property.title || `Premium ${property.propertyType}`}
                    </h3>
                    <div className="mb-3">
                      <span className="text-2xl font-bold text-accent-600">
                        {formatPrice(property.price || 0)}
                      </span>
                    </div>
                    <div className="flex gap-3 text-sm text-warm-600">
                      {property.bedrooms && <span>{property.bedrooms} kamers</span>}
                      {property.size && <span>{property.size}m²</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-light text-white mb-4">
            Klaar voor je <span className="font-semibold">luxe droomhuis?</span>
          </h2>
          <p className="text-warm-300 mb-8">Neem contact op voor persoonlijk advies over premium woningen.</p>
          <Link
            href="/nl-be/contact"
            className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center gap-2"
          >
            Neem Contact Op
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
