import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllDevelopments } from '@/lib/development-service';
import { getBeachTag, BEACH_ZONES } from '@/data/property-tags';
import { beachSchema, collectionPageSchema, itemListSchema, generateDevelopmentAltTag } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Nieruchomości przy plaży Costa Blanca | Nowe budynki blisko plaży',
  description: 'Odkryj nowe budynki blisko najlepszych plaż Costa Blanca. Od apartamentów przy plaży do willi w odległości spaceru. Plaże La Zenia, Playa Flamenca, Torrevieja.',
  keywords: 'nieruchomości przy plaży hiszpania, apartament przy plaży costa blanca, willa blisko plaży, nieruchomość la zenia, apartamenty playa flamenca',
  openGraph: {
    title: 'Nieruchomości przy plaży Costa Blanca',
    description: 'Nowe budynki blisko najlepszych plaż Costa Blanca. W odległości spaceru od Morza Śródziemnego.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl/beach',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/beach',
      'sv': 'https://newbuildhomescostablanca.com/sv/beach',
      'nl': 'https://newbuildhomescostablanca.com/nl/beach',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/beach',
      'fr': 'https://newbuildhomescostablanca.com/fr/beach',
      'no': 'https://newbuildhomescostablanca.com/no/beach',
      'de': 'https://newbuildhomescostablanca.com/de/beach',
      'pl': 'https://newbuildhomescostablanca.com/pl/beach',
      'ru': 'https://newbuildhomescostablanca.com/ru/beach',
      'x-default': 'https://newbuildhomescostablanca.com/beach',
    },
  },
};

// Format price helper
function formatPrice(price: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

// Beach info with coordinates for popular beaches
const POPULAR_BEACHES = [
  {
    name: 'Playa de La Zenia',
    town: 'Orihuela Costa',
    description: 'Krystalicznie czysta woda i zatoka Cala Bosque. Jedna z najpopularniejszych plaż na południu Costa Blanca.',
    image: '/images/beaches/la-zenia.jpg',
    zones: ['la zenia'],
    amenities: ['Błękitna flaga', 'Ratownik', 'Restauracje', 'Parking'],
  },
  {
    name: 'Playa Flamenca',
    town: 'Orihuela Costa',
    description: 'Przyjazna dla rodzin plaża z spokojną wodą i doskonałymi udogodnieniami. W odległości spaceru od sklepów i restauracji.',
    image: '/images/beaches/playa-flamenca.jpg',
    zones: ['playa flamenca', 'aguamarina'],
    amenities: ['Błękitna flaga', 'Ratownik', 'Bary plażowe', 'Promenada'],
  },
  {
    name: 'Playa del Cura',
    town: 'Torrevieja',
    description: 'Centralna plaża Torrevieja z oszałamiającymi widokami i żywą atmosferą. Blisko słynnych słonych jezior.',
    image: '/images/beaches/playa-del-cura.jpg',
    zones: ['playa de el cura', 'playa del cura', 'playa el cura'],
    amenities: ['Błękitna flaga', 'Promenada', 'Restauracje', 'Centrum miasta'],
  },
  {
    name: 'Playa de La Mata',
    town: 'Torrevieja',
    description: 'Długa piaszczysta plaża rozciągająca się na ponad 2 km z naturalnymi wydmami. Idealna do spacerów i sportów wodnych.',
    image: '/images/beaches/la-mata.jpg',
    zones: ['la mata'],
    amenities: ['Naturalne wydmy', 'Bary plażowe', 'Parking', 'Sport'],
  },
  {
    name: 'Cabo Roig',
    town: 'Orihuela Costa',
    description: 'Piękna plaża zatokowa (Cala Capitán) ze skalastymi wychodniami. Słynna z sobotniegu targowiska.',
    image: '/images/beaches/cabo-roig.jpg',
    zones: ['cabo roig'],
    amenities: ['Plaża zatokowa', 'Marina', 'Restauracje', 'Targ'],
  },
  {
    name: 'Mil Palmeras',
    town: 'Pilar de la Horadada',
    description: 'Spokojna plaża z piaskiem i krystalicznie czystą wodą. Mniej zatłoczona, idealna dla rodzin.',
    image: '/images/beaches/mil-palmeras.jpg',
    zones: ['mil palmeras'],
    amenities: ['Błękitna flaga', 'Spokojna woda', 'Przyjazna rodzinom', 'Promenada'],
  },
];

export default async function BeachPropertiesPagePl() {
  // Get all developments
  const allDevelopments = await getAllDevelopments();

  // Filter to beach properties only
  const beachDevelopments = allDevelopments.filter(dev => {
    const beachInfo = getBeachTag(dev.zone);
    return beachInfo.isBeach;
  }).map(dev => {
    const beachInfo = getBeachTag(dev.zone);
    return {
      ...dev,
      beachName: beachInfo.beach,
      beachDistance: beachInfo.distance,
    };
  });

  // Group by beach
  const developmentsByBeach = new Map<string, typeof beachDevelopments>();
  beachDevelopments.forEach(dev => {
    if (dev.beachName) {
      const existing = developmentsByBeach.get(dev.beachName) || [];
      existing.push(dev);
      developmentsByBeach.set(dev.beachName, existing);
    }
  });

  // Group by distance
  const beachfront = beachDevelopments.filter(d => d.beachDistance === 'beachfront');
  const walkingDistance = beachDevelopments.filter(d => d.beachDistance === 'walking');
  const shortDrive = beachDevelopments.filter(d => d.beachDistance === 'short-drive');

  // Sort by price
  const sortByPrice = (devs: typeof beachDevelopments) =>
    [...devs].sort((a, b) => a.priceFrom - b.priceFrom);

  // Get beach zones count
  const beachZoneCount = Object.keys(BEACH_ZONES).length;

  // Generate schemas
  const pageSchema = collectionPageSchema({
    name: 'Nieruchomości przy plaży Costa Blanca',
    description: 'Nowe budynki blisko plaż w Costa Blanca',
    url: 'https://newbuildhomescostablanca.com/pl/beach',
    items: beachDevelopments.slice(0, 20).map(d => ({
      name: d.name,
      url: `https://newbuildhomescostablanca.com/pl/developments/${d.slug}`,
      price: d.priceFrom
    }))
  });

  return (
    <main className="min-h-screen bg-warm-50">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative h-[50vh] min-h-[400px] max-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/images/beaches/costa-blanca-beach-aerial.jpg"
            alt="Widok z lotu ptaka plaż Costa Blanca z turkusową wodą Morza Śródziemnego"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/50 to-primary-900/30" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-6 pb-10 w-full">
            {/* Breadcrumb */}
            <nav className="mb-4">
              <ol className="flex items-center gap-2 text-sm text-warm-300">
                <li><Link href="/pl" className="hover:text-white">Strona główna</Link></li>
                <li>/</li>
                <li className="text-white">Nieruchomości przy plaży</li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🏖️</span>
              <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                Życie przy plaży
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-3">
              Nieruchomości przy plaży <span className="font-semibold">Costa Blanca</span>
            </h1>

            <p className="text-warm-200 text-lg max-w-2xl mb-6">
              {beachDevelopments.length} nowych projektów budowy blisko najlepszych plaż Morza Śródziemnego.
              Od apartamentów przy plaży do willi w odległości spaceru.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-white">
              <div>
                <div className="text-2xl font-semibold text-accent-400">{beachfront.length}</div>
                <div className="text-sm text-warm-300">Przy plaży</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-accent-400">{walkingDistance.length}</div>
                <div className="text-sm text-warm-300">W odległości spaceru</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-accent-400">{developmentsByBeach.size}</div>
                <div className="text-sm text-warm-300">Lokalizacje plażowe</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* DISTANCE FILTER TABS */}
      {/* ============================================ */}
      <section className="bg-white border-b border-warm-200 sticky top-[72px] z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-3">
            <Link
              href="#all"
              className="px-4 py-2 rounded-sm text-sm font-medium bg-accent-500 text-white whitespace-nowrap"
            >
              Wszystkie Nieruchomości przy plaży ({beachDevelopments.length})
            </Link>
            <Link
              href="#beachfront"
              className="px-4 py-2 rounded-sm text-sm font-medium bg-warm-100 text-primary-900 hover:bg-warm-200 transition-colors whitespace-nowrap"
            >
              🌊 Przy plaży ({beachfront.length})
            </Link>
            <Link
              href="#walking"
              className="px-4 py-2 rounded-sm text-sm font-medium bg-warm-100 text-primary-900 hover:bg-warm-200 transition-colors whitespace-nowrap"
            >
              🚶 W odległości spaceru ({walkingDistance.length})
            </Link>
            <Link
              href="#nearby"
              className="px-4 py-2 rounded-sm text-sm font-medium bg-warm-100 text-primary-900 hover:bg-warm-200 transition-colors whitespace-nowrap"
            >
              🚗 Krótka jazda samochodem ({shortDrive.length})
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* POPULAR BEACHES SHOWCASE */}
      {/* ============================================ */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900">
              Popularne <span className="font-semibold">Obszary Plażowe</span>
            </h2>
            <p className="text-warm-600 mt-2">
              Przeglądaj nieruchomości blisko najposzukiwanych plaż Costa Blanca
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_BEACHES.map((beach) => {
              const beachDevs = beachDevelopments.filter(d =>
                beach.zones.some(zone => d.zone?.toLowerCase().includes(zone))
              );
              const minPrice = beachDevs.length > 0
                ? Math.min(...beachDevs.map(d => d.priceFrom))
                : 0;

              return (
                <div
                  key={beach.name}
                  className="group bg-warm-50 rounded-sm overflow-hidden border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 overflow-hidden bg-warm-200">
                    {/* Placeholder - replace with actual beach images */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-6xl">🏖️</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-semibold text-lg">{beach.name}</h3>
                      <p className="text-warm-300 text-sm">{beach.town}</p>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-warm-600 text-sm mb-3 line-clamp-2">
                      {beach.description}
                    </p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {beach.amenities.slice(0, 3).map(amenity => (
                        <span
                          key={amenity}
                          className="bg-warm-100 text-warm-700 text-xs px-2 py-1 rounded-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Properties info */}
                    <div className="flex items-center justify-between pt-3 border-t border-warm-200">
                      <div>
                        <span className="text-primary-900 font-semibold">{beachDevs.length}</span>
                        <span className="text-warm-600 text-sm ml-1">nieruchomości</span>
                      </div>
                      {minPrice > 0 && (
                        <div className="text-sm">
                          <span className="text-warm-600">Od </span>
                          <span className="text-accent-600 font-semibold">{formatPrice(minPrice)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* BEACHFRONT PROPERTIES */}
      {/* ============================================ */}
      {beachfront.length > 0 && (
        <section id="beachfront" className="py-12 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🌊</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-sm uppercase">
                Lokalizacja premium
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Nieruchomości <span className="font-semibold">przy Plaży</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Obudź się do dźwięku fal. Te nieruchomości są wprost na plaży.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortByPrice(beachfront).slice(0, 6).map((dev) => (
                <Link
                  key={dev.slug}
                  href={`/pl/developments/${dev.slug}`}
                  className="group bg-white rounded-sm overflow-hidden border border-warm-200 hover:shadow-xl transition-all"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={dev.mainImage || '/images/placeholder-property.jpg'}
                      alt={generateDevelopmentAltTag({
                        name: dev.name,
                        developer: dev.developer,
                        town: dev.town,
                        zone: dev.zone,
                        isBeachProperty: true,
                        beachName: dev.beachName,
                      })}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-sm">
                        🌊 Przy plaży
                      </span>
                      {dev.status === 'key-ready' && (
                        <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                          Gotowe do zamieszkania
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="text-xl font-semibold text-white">{dev.priceRange}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-primary-900 mb-1 group-hover:text-accent-600 transition-colors">
                      {dev.name}
                    </h3>
                    <p className="text-warm-600 text-sm mb-2">
                      {dev.zone ? `${dev.zone}, ` : ''}{dev.town}
                    </p>
                    <p className="text-warm-500 text-sm">
                      Blisko {dev.beachName}
                    </p>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-warm-100 text-sm text-warm-600">
                      <span>{dev.bedroomRange} sypialnia/e</span>
                      <span>{dev.propertyTypes.join(', ')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* WALKING DISTANCE PROPERTIES */}
      {/* ============================================ */}
      {walkingDistance.length > 0 && (
        <section id="walking" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🚶</span>
              <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-sm uppercase">
                Najpopularniejsze
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              W Odległości Spaceru <span className="font-semibold">od Plaży</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Tylko krótki spacer do piasku. Idealna równowaga pomiędzy dostępem do plaży a prywatnością.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {sortByPrice(walkingDistance).slice(0, 8).map((dev) => (
                <Link
                  key={dev.slug}
                  href={`/pl/developments/${dev.slug}`}
                  className="group bg-warm-50 rounded-sm overflow-hidden border border-warm-200 hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={dev.mainImage || '/images/placeholder-property.jpg'}
                      alt={generateDevelopmentAltTag({
                        name: dev.name,
                        developer: dev.developer,
                        town: dev.town,
                        zone: dev.zone,
                        isBeachProperty: true,
                        beachName: dev.beachName,
                      })}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-sm">
                        🚶 Spacer do plaży
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <div className="text-lg font-semibold text-white">{formatPrice(dev.priceFrom)}</div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-primary-900 text-sm mb-1 group-hover:text-accent-600 transition-colors line-clamp-1">
                      {dev.name}
                    </h3>
                    <p className="text-warm-600 text-xs mb-1">
                      {dev.town}
                    </p>
                    <p className="text-warm-500 text-xs">
                      Blisko {dev.beachName}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {walkingDistance.length > 8 && (
              <div className="text-center mt-8">
                <Link
                  href="/pl/developments?beach=walking"
                  className="inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white px-6 py-3 rounded-sm transition-colors"
                >
                  Wyświetl Wszystkie {walkingDistance.length} Nieruchomości w Odległości Spaceru
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* ALL BEACH PROPERTIES */}
      {/* ============================================ */}
      <section id="all" className="py-12 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
            Wszystkie Nieruchomości <span className="font-semibold">przy Plaży</span>
          </h2>
          <p className="text-warm-600 mb-8">
            Przeglądaj wszystkie {beachDevelopments.length} nowych projektów budowy blisko plaż Costa Blanca.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sortByPrice(beachDevelopments).slice(0, 16).map((dev) => (
              <Link
                key={dev.slug}
                href={`/pl/developments/${dev.slug}`}
                className="group bg-white rounded-sm overflow-hidden border border-warm-200 hover:shadow-lg transition-all"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={dev.mainImage || '/images/placeholder-property.jpg'}
                    alt={generateDevelopmentAltTag({
                      name: dev.name,
                      developer: dev.developer,
                      town: dev.town,
                      zone: dev.zone,
                      isBeachProperty: true,
                      beachName: dev.beachName,
                    })}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    {dev.beachDistance === 'beachfront' && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-sm">🌊</span>
                    )}
                    {dev.beachDistance === 'walking' && (
                      <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-sm">🚶</span>
                    )}
                    {dev.beachDistance === 'short-drive' && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-sm">🚗</span>
                    )}
                    {dev.status === 'key-ready' && (
                      <span className="bg-accent-500 text-white text-xs px-2 py-0.5 rounded-sm">Gotowe</span>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <div className="text-lg font-semibold text-white">{formatPrice(dev.priceFrom)}</div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-primary-900 text-sm mb-1 group-hover:text-accent-600 transition-colors line-clamp-1">
                    {dev.name}
                  </h3>
                  <p className="text-warm-600 text-xs">
                    {dev.zone ? `${dev.zone}, ` : ''}{dev.town}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {beachDevelopments.length > 16 && (
            <div className="text-center mt-8">
              <Link
                href="/pl/developments?tag=beach-lover"
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-sm transition-colors"
              >
                Wyświetl Wszystkie {beachDevelopments.length} Nieruchomości przy Plaży
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ============================================ */}
      {/* SEO CONTENT */}
      {/* ============================================ */}
      <section className="py-12 bg-white border-t border-warm-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-primary-900 mb-4">
            Nieruchomości przy Plaży w Costa Blanca, Hiszpania
          </h2>
          <div className="prose prose-warm max-w-none text-warm-700">
            <p>
              Costa Blanca oferuje jedne z najpiękniejszych plaż Morza Śródziemnego, z ponad 200 km linii brzegowej
              zawierającej plaże z błękitną flagą, ukryte zatoki i długie piaszczyste plaże. Nasza selekcja
              nowych budynków umieszcza Cię w łatwej odległości od tych wspaniałych plaż.
            </p>
            <h3>Popularne Obszary Plażowe</h3>
            <p>
              <strong>Orihuela Costa</strong> - Dom La Zenia, Playa Flamenca i Cabo Roig, ten obszar
              oferuje idealne połączenie stylu życia przy plaży i nowoczesnych udogodnień. Nieruchomości tutaj wahają się od
              apartamentów do luksusowych willi, wiele w odległości spaceru od plaży.
            </p>
            <p>
              <strong>Torrevieja</strong> - Żywe miasto przybrzeżne z wieloma plażami, w tym Playa del
              Cura i La Mata. Słynne słone jeziora tworzą unikalny mikroklim, a miasto oferuje
              doskonałą infrastrukturę do całorocznego zamieszkania.
            </p>
            <p>
              <strong>Pilar de la Horadada</strong> - Na południowym końcu Costa Blanca, plaże takie jak
              Mil Palmeras oferują bardziej spokojne otoczenie z krystalicznie czystą wodą.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
