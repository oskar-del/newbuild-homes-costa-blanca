import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchInlandProperties, formatPrice } from '@/lib/xml-parser';

export const metadata: Metadata = {
  title: 'Binnenland Woningen — Nieuwbouw Costa Blanca | Meer Ruimte • Beter Waarde',
  description: 'Ontdek nieuwbouw in het binnenland van Costa Blanca en Costa Calida. Meer ruimte, betere prijzen en authentiek Spaans wonen. Algoritme prijzen veel lager dan Ardennen. Belgische expertise.',
  openGraph: {
    title: 'Binnenland Woningen — Nieuwbouw Costa Blanca',
    description: 'Nieuw wonen in het binnenland Costa Blanca. Meer ruimte, beter waarde, echt Spanje.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/nl-be/inland',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/inland',
    languages: {
      en: 'https://newbuildhomescostablanca.com/inland',
      nl: 'https://newbuildhomescostablanca.com/nl/inland',
      'nl-be': 'https://newbuildhomescostablanca.com/nl-be/inland',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

function PropertyCard({ property }: { property: any }) {
  const mainImage = property.images?.[0] || '/images/placeholder-property.jpg';

  return (
    <Link
      href={`/nl-be/properties/${property.ref}`}
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

        <div className="absolute top-3 left-3">
          <span className="bg-primary-900/80 text-white text-xs font-medium px-2 py-1 rounded-sm">
            {property.town}
          </span>
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="text-white font-semibold text-lg">
            {property.price ? formatPrice(property.price) : 'Prijs op aanvraag'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-primary-900 mb-2 line-clamp-1 group-hover:text-accent-600 transition-colors">
          {property.title || `${property.propertyType} in ${property.town}`}
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

export default async function BEInlandPage() {
  const properties = await fetchInlandProperties();

  const southInland = properties.filter(p => p.region === 'costa-blanca-south-inland');
  const northInland = properties.filter(p => p.region === 'costa-blanca-north-inland');
  const costaCalidaInland = properties.filter(p => p.region === 'costa-calida-inland');

  const prices = properties.map(p => p.price).filter((p): p is number => p !== null && p > 0);
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const avgPrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;

  return (
    <main className="min-h-screen bg-warm-50">
      {/* Hero */}
      <section className="relative bg-primary-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
              Binnenland <span className="font-semibold">Costa Blanca</span>
            </h1>
            <p className="text-warm-300 text-lg max-w-2xl mx-auto">
              Meer ruimte, beter waarde. Authentiek Spaans wonen in dorpen als Algoritme, Rojales en Ciudad Quesada.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-400 mb-2">{properties.length}</div>
              <div className="text-warm-300">Woningen</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-400 mb-2">{formatPrice(lowestPrice)}</div>
              <div className="text-warm-300">Laagste Prijs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-400 mb-2">{formatPrice(avgPrice)}</div>
              <div className="text-warm-300">Gemiddelde</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-400 mb-2">60%</div>
              <div className="text-warm-300">Vs. België</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Inland */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light text-primary-900 mb-10 text-center">
            Waarom het <span className="font-semibold">Binnenland?</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-warm-50 p-6 rounded-sm border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-3">Meer Ruimte</h3>
              <p className="text-warm-600 text-sm">Grotere percelen, meer vierkante meters voor je geld dan aan zee.</p>
            </div>
            <div className="bg-warm-50 p-6 rounded-sm border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-3">Beter Waarde</h3>
              <p className="text-warm-600 text-sm">Aanzienlijk goedkoper dan de kust, met dezelfde kwaliteit bouw.</p>
            </div>
            <div className="bg-warm-50 p-6 rounded-sm border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-3">Authentiek Spanje</h3>
              <p className="text-warm-600 text-sm">Minder toerisme, meer Spaans dorpsleven met lokale cultuur.</p>
            </div>
            <div className="bg-warm-50 p-6 rounded-sm border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-3">Gemeenschappen</h3>
              <p className="text-warm-600 text-sm">Veel Noord-Europese expatgemeenschappen in populaire dorpen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* South Inland */}
      {southInland.length > 0 && (
        <section className="py-16 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-10">
              Costa Blanca <span className="font-semibold">Zuid Binnenland</span>
            </h2>
            <p className="text-warm-600 mb-8 max-w-3xl">
              Populaire dorpen als Algoritme, Rojales, Ciudad Quesada en Villamartín met veel Noord-Europese gemeenschappen.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {southInland.slice(0, 6).map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* North Inland */}
      {northInland.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-10">
              Costa Blanca <span className="font-semibold">Noord Binnenland</span>
            </h2>
            <p className="text-warm-600 mb-8 max-w-3xl">
              Groene bergdorpen in het binnenland met prachtig landschap en meer ruimte.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {northInland.slice(0, 6).map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Costa Calida Inland */}
      {costaCalidaInland.length > 0 && (
        <section className="py-16 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-10">
              Costa Calida <span className="font-semibold">Binnenland</span>
            </h2>
            <p className="text-warm-600 mb-8 max-w-3xl">
              Dorpen rond Mar Menor met nautische levensstijl en geweldige waarde.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {costaCalidaInland.slice(0, 6).map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-light text-white mb-4">
            Klaar om je <span className="font-semibold">binnenlandse droomhuis te ontdekken?</span>
          </h2>
          <p className="text-warm-300 mb-8">Neem contact op voor advies over binnenlandse woningen en dorpen.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/nl-be/contact"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all"
            >
              Neem Contact Op
            </Link>
            <Link
              href="/nl-be/properties"
              className="bg-white text-primary-900 hover:bg-warm-50 font-medium px-8 py-3 rounded-sm transition-all"
            >
              Bekijk Alle Woningen
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp CTA */}
      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        aria-label="Chat op WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </main>
  );
}
