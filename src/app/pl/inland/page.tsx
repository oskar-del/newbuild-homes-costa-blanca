import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchInlandProperties, formatPrice, ParsedProperty, REGIONS } from '@/lib/xml-parser';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Nieruchomości w Głąb Lądu Costa Blanca | Nowe Budynki Wewnątrz Lądu',
  description: 'Odkryj nowe właściwości budynków wewnątrz lądu Costa Blanca i Costa Calida. Więcej przestrzeni, lepsza wartość i autentyczne spanielskie życie w miastach takich jak Algorfa, Rojales, Polop i więcej.',
  openGraph: {
    title: 'Nieruchomości w Głąb Lądu Costa Blanca',
    description: 'Nowe domy wewnątrz lądu Costa Blanca. Więcej przestrzeni, lepsza wartość, autentyczna Hiszpania.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl/inland',
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

        <div className="absolute top-3 left-3">
          <span className="bg-primary-900/80 text-white text-xs font-medium px-2 py-1 rounded-sm">
            {property.town}
          </span>
        </div>

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
              {property.bedrooms} sypialnie
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
              </svg>
              {property.bathrooms} łazienki
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

  const southInland = properties.filter(p => p.region === 'costa-blanca-south-inland');
  const northInland = properties.filter(p => p.region === 'costa-blanca-north-inland');
  const costaCalidaInland = properties.filter(p => p.region === 'costa-calida-inland');

  const otherInland = properties.filter(p => !p.region);

  const prices = properties.map(p => p.price).filter((p): p is number => p !== null && p > 0);
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const avgPrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;

  if (typeof window === 'undefined') {
    console.log('[INLAND PAGE] Total:', properties.length);
    console.log('[INLAND PAGE] South CB:', southInland.length, '| North CB:', northInland.length, '| Costa Calida:', costaCalidaInland.length, '| Unmatched:', otherInland.length);
    console.log('[INLAND PAGE] Regions found:', [...new Set(properties.map(p => p.region))].join(', '));
    if (otherInland.length > 0) {
      console.log('[INLAND PAGE] Unmatched towns:', [...new Set(otherInland.map(p => p.town))].join(', '));
    }
  }

  const breadcrumbs = breadcrumbSchema([
    { name: 'Strona główna', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Nieruchomości wewnątrz lądu', url: 'https://newbuildhomescostablanca.com/pl/inland/' },
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
              <Link href="/pl" className="hover:text-white transition-colors">Strona główna</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Nieruchomości wewnątrz lądu</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Więcej przestrzeni • Lepsza wartość
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                Nowe budynki <span className="font-semibold">wewnątrz lądu</span>
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed mb-8">
                Odkryj serce Hiszpanii dzięki naszemu wyborowi nowych budynków wewnątrz lądu Costa Blanca.
                Ciesz się większymi działkami, tradycyjnymi wioskami, polami golfowymi i cenami o 40% niższymi niż na tereny przybrzeżne
                - wszystko tylko 20-30 minut od plaż.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div>
                  <div className="text-2xl font-semibold text-white">{properties.length}</div>
                  <div className="text-warm-400 text-sm">Nieruchomości</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">Od {formatPrice(lowestPrice)}</div>
                  <div className="text-warm-400 text-sm">Cena początkowa</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">{formatPrice(avgPrice)}</div>
                  <div className="text-warm-400 text-sm">Średnia cena</div>
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
                  Skontaktuj się z nami przez WhatsApp
                </a>
                <Link
                  href="/pl/developments"
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-sm font-medium transition-colors border border-white/20 text-sm"
                >
                  Wyświetl wszystkie projekty
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
                Dlaczego kupować <span className="font-semibold">wewnątrz lądu?</span>
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                Wielu kupujących odkrywa, że wewnątrz lądu Costa Blanca oferuje doskonałą wartość i bardziej autentyczne życie w Hiszpanii.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-warm-50 rounded-sm">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Lepsza wartość</h3>
                <p className="text-warm-600 text-sm">Nieruchomości mogą być 30-40% tańsze niż odpowiedniki przybrzeżne przy tej samej jakości budowy.</p>
              </div>

              <div className="text-center p-6 bg-warm-50 rounded-sm">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Więcej przestrzeni</h3>
                <p className="text-warm-600 text-sm">Większe działki i ogrody. Wiele nieruchomości posiada działki 500m²+ w porównaniu do 100-200m² na wybrzeżu.</p>
              </div>

              <div className="text-center p-6 bg-warm-50 rounded-sm">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Autentyczna Hiszpania</h3>
                <p className="text-warm-600 text-sm">Tradycyjne wioski, targi lokalne i kultura hiszpańska. Mniej turystyki, bardziej autentyczne.</p>
              </div>

              <div className="text-center p-6 bg-warm-50 rounded-sm">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Blisko plaży</h3>
                <p className="text-warm-600 text-sm">Większość miast wewnątrz lądu jest zaledwie 20-30 minut od plaży. Najlepsze z obu światów!</p>
              </div>
            </div>
          </div>
        </section>

        {/* COSTA BLANCA SOUTH INLAND */}
        {southInland.length > 0 && (
          <section className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase">
                      Najpopularniejszy
                    </span>
                    <span className="text-warm-500 text-sm">{southInland.length} nieruchomości dostępnych</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                    Costa Blanca <span className="font-semibold">Południe wewnątrz lądu</span>
                  </h2>
                  <p className="text-warm-600 mt-2 leading-relaxed">
                    Region Vega Baja oferuje najlepszą wartość pieniądza w Costa Blanca. Miasta takie jak Algorfa, Rojales i San Miguel de Salinas łączą doskonałe pola golfowe, tradycyjne targi hiszpańskie i łatwy dostęp do plaż - wszystko w cenach 30-40% poniżej wybrzeża.
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
                    Wyświetl wszystkie {southInland.length} nieruchomości Południa wewnątrz lądu
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
                      Życie w górach i dolinach
                    </span>
                    <span className="text-warm-500 text-sm">{northInland.length} nieruchomości</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                    Costa Blanca <span className="font-semibold">Północ wewnątrz lądu</span>
                  </h2>
                  <p className="text-warm-600 mt-2 leading-relaxed">
                    Uciekaj do oszałamiającego regionu winiarskiego Jalon Valley, uroczego górskiego miasta Polop, lub tętniącej życiem La Nucia. Północ oferuje dramatyczne krajobrazy, chłodniejsze lata i bardziej zakorzenioną społeczność ekspatów - idealną dla tych, którzy szukają spokojniejszego tempa życia.
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
                    Wyświetl wszystkie {northInland.length} nieruchomości Północy wewnątrz lądu
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
                      Region Murcja
                    </span>
                    <span className="text-warm-500 text-sm">{costaCalidaInland.length} nieruchomości</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                    Costa Calida <span className="font-semibold">wewnątrz lądu</span>
                  </h2>
                  <p className="text-warm-600 mt-2 leading-relaxed">
                    Region Murcja oferuje wyjątkową wartość z bardziej hiszpańskim nastawieniem. Miasta takie jak Torre Pacheco i Fuente Álamo zapewniają autentyczne wiejskie życie z łatwym dostępem do plaż Mar Menor i miasta Murcja.
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
                    Wyświetl wszystkie {costaCalidaInland.length} nieruchomości Costa Calida wewnątrz lądu
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
                      Pełna kolekcja
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                    Wszystkie <span className="font-semibold">nieruchomości wewnątrz lądu</span>
                  </h2>
                  <p className="text-warm-600 mt-1">
                    Przeglądaj wszystkie {properties.length} nowych budynków wewnątrz lądu
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
                  Odkryj obszary
                </span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-white mb-3">
                Popularne miasta wewnątrz lądu
              </h2>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: 'Algorfa', region: 'Południe', golf: true },
                { name: 'Rojales', region: 'Południe', golf: true },
                { name: 'San Miguel de Salinas', region: 'Południe' },
                { name: 'Benijofar', region: 'Południe' },
                { name: 'Polop', region: 'Północ', mountain: true },
                { name: 'La Nucia', region: 'Północ' },
                { name: 'Jalon Valley', region: 'Północ', wine: true },
                { name: 'Finestrat', region: 'Północ', mountain: true },
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
                    {area.mountain && <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">Góra</span>}
                    {area.wine && <span className="text-xs bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded">Wino</span>}
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
              Chcesz poznać opcje wewnątrz lądu?
            </h2>
            <p className="text-warm-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Nasz zespół może zorganizować przeglądy nieruchomości wewnątrz lądu i pomóc Ci zrozumieć zalety każdego obszaru.
              Pokażemy Ci lokalne udogodnienia, czasy dojazdów do plaży i pomożemy Ci znaleźć idealną równowagę.
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
                Czat na WhatsAppie
              </a>
              <Link
                href="/pl/contact"
                className="bg-primary-900 hover:bg-primary-800 text-white font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Formularz kontaktowy
              </Link>
            </div>
          </div>
        </section>

        <WhatsAppCTA />
      </main>
    </>
  );
}
