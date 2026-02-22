import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllDevelopments } from '@/lib/development-service';
import { getBeachTag, BEACH_ZONES } from '@/data/property-tags';
import { beachSchema, collectionPageSchema, itemListSchema, generateDevelopmentAltTag } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Strandobjekte Costa Blanca | Neubau Direkt am Strand',
  description: 'Entdecken Sie Neubauprojekte in der Nähe der schönsten Strände der Costa Blanca. Von Wohnungen direkt am Strand bis zu Villen zu Fuß erreichbar. La Zenia, Playa Flamenca, Torrevieja Strände.',
  keywords: 'Strandobjekt Spanien, Wohnung direkt am Strand Costa Blanca, Villa in Strandnähe, La Zenia Immobilien, Playa Flamenca Wohnungen',
  openGraph: {
    title: 'Strandobjekte Costa Blanca',
    description: 'Neubauten in der Nähe der schönsten Strände der Costa Blanca. Zu Fuß zum Mittelmeer.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de/beach',
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
  return new Intl.NumberFormat('de-DE', {
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
    description: 'Kristallklares Wasser und die Cala Bosque Bucht. Einer der beliebtesten Strände an der südlichen Costa Blanca.',
    image: '/images/beaches/la-zenia.jpg',
    zones: ['la zenia'],
    amenities: ['Blaue Flagge', 'Rettungsschwimmer', 'Restaurants', 'Parkplatz'],
  },
  {
    name: 'Playa Flamenca',
    town: 'Orihuela Costa',
    description: 'Familienfreundlicher Strand mit ruhigem Wasser und hervorragenden Einrichtungen. Zu Fuß zu Geschäften und Restaurants.',
    image: '/images/beaches/playa-flamenca.jpg',
    zones: ['playa flamenca', 'aguamarina'],
    amenities: ['Blaue Flagge', 'Rettungsschwimmer', 'Strandbar', 'Strandpromenade'],
  },
  {
    name: 'Playa del Cura',
    town: 'Torrevieja',
    description: 'Zentraler Torrevieja-Strand mit wunderschöner Aussicht und lebendiger Atmosphäre. In der Nähe der berühmten Salzseen.',
    image: '/images/beaches/playa-del-cura.jpg',
    zones: ['playa de el cura', 'playa del cura', 'playa el cura'],
    amenities: ['Blaue Flagge', 'Strandpromenade', 'Restaurants', 'Stadtzentrum'],
  },
  {
    name: 'Playa de La Mata',
    town: 'Torrevieja',
    description: 'Langer Sandstrand über 2 km mit natürlichen Dünen. Perfekt zum Spaziergang und Wassersport.',
    image: '/images/beaches/la-mata.jpg',
    zones: ['la mata'],
    amenities: ['Natürliche Dünen', 'Strandbar', 'Parkplatz', 'Sport'],
  },
  {
    name: 'Cabo Roig',
    town: 'Orihuela Costa',
    description: 'Wunderschöne Bucht (Cala Capitán) mit Felsvorsprüngen. Berühmt für den Samstagsmarkt.',
    image: '/images/beaches/cabo-roig.jpg',
    zones: ['cabo roig'],
    amenities: ['Bucht', 'Marina', 'Restaurants', 'Markt'],
  },
  {
    name: 'Mil Palmeras',
    town: 'Pilar de la Horadada',
    description: 'Ruhiger Strand mit feinem Sand und kristallklarem Wasser. Weniger überlaufen, perfekt für Familien.',
    image: '/images/beaches/mil-palmeras.jpg',
    zones: ['mil palmeras'],
    amenities: ['Blaue Flagge', 'Ruhiges Wasser', 'Familienfreundlich', 'Strandpromenade'],
  },
];

export default async function BeachPropertiesPageDe() {
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
    name: 'Strandobjekte Costa Blanca',
    description: 'Neubauten in der Nähe von Stränden in der Costa Blanca',
    url: 'https://newbuildhomescostablanca.com/de/beach',
    items: beachDevelopments.slice(0, 20).map(d => ({
      name: d.name,
      url: `https://newbuildhomescostablanca.com/de/developments/${d.slug}`,
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
            alt="Luftaufnahme der Costa Blanca-Strände mit türkisem Mittelmeer"
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
                <li><Link href="/de" className="hover:text-white">Startseite</Link></li>
                <li>/</li>
                <li className="text-white">Strandobjekte</li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🏖️</span>
              <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                Strandleben
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-3">
              Strandobjekte <span className="font-semibold">Costa Blanca</span>
            </h1>

            <p className="text-warm-200 text-lg max-w-2xl mb-6">
              {beachDevelopments.length} Neubaurojekte in der Nähe der schönsten Mittelmeerstrände.
              Von Wohnungen direkt am Strand bis zu Villen zu Fuß erreichbar.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-white">
              <div>
                <div className="text-2xl font-semibold text-accent-400">{beachfront.length}</div>
                <div className="text-sm text-warm-300">Direkt am Strand</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-accent-400">{walkingDistance.length}</div>
                <div className="text-sm text-warm-300">Fußweg</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-accent-400">{developmentsByBeach.size}</div>
                <div className="text-sm text-warm-300">Strandlagen</div>
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
              Alle Strandobjekte ({beachDevelopments.length})
            </Link>
            <Link
              href="#beachfront"
              className="px-4 py-2 rounded-sm text-sm font-medium bg-warm-100 text-primary-900 hover:bg-warm-200 transition-colors whitespace-nowrap"
            >
              🌊 Direkt am Strand ({beachfront.length})
            </Link>
            <Link
              href="#walking"
              className="px-4 py-2 rounded-sm text-sm font-medium bg-warm-100 text-primary-900 hover:bg-warm-200 transition-colors whitespace-nowrap"
            >
              🚶 Fußweg ({walkingDistance.length})
            </Link>
            <Link
              href="#nearby"
              className="px-4 py-2 rounded-sm text-sm font-medium bg-warm-100 text-primary-900 hover:bg-warm-200 transition-colors whitespace-nowrap"
            >
              🚗 Kurze Fahrt ({shortDrive.length})
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
              Beliebte <span className="font-semibold">Strandgebiete</span>
            </h2>
            <p className="text-warm-600 mt-2">
              Entdecken Sie Immobilien in der Nähe der begehrtesten Strände der Costa Blanca
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
                        <span className="text-warm-600 text-sm ml-1">Immobilien</span>
                      </div>
                      {minPrice > 0 && (
                        <div className="text-sm">
                          <span className="text-warm-600">Ab </span>
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
                Prämienstandort
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Direkt am Strand <span className="font-semibold">Immobilien</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Aufwachen zum Klang der Wellen. Diese Immobilien liegen direkt am Strand.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortByPrice(beachfront).slice(0, 6).map((dev) => (
                <Link
                  key={dev.slug}
                  href={`/de/developments/${dev.slug}`}
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
                        🌊 Direkt am Strand
                      </span>
                      {dev.status === 'key-ready' && (
                        <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                          Schlüsselfertig
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
                      Nähe {dev.beachName}
                    </p>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-warm-100 text-sm text-warm-600">
                      <span>{dev.bedroomRange} Schlafzimmer</span>
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
                Sehr Beliebt
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Fußweg <span className="font-semibold">zum Strand</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Nur ein kurzer Spaziergang zum Sand. Die perfekte Balance zwischen Strandnähe und Privatsphäre.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {sortByPrice(walkingDistance).slice(0, 8).map((dev) => (
                <Link
                  key={dev.slug}
                  href={`/de/developments/${dev.slug}`}
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
                        🚶 Zu Fuß zum Strand
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
                      Nähe {dev.beachName}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {walkingDistance.length > 8 && (
              <div className="text-center mt-8">
                <Link
                  href="/de/developments?beach=walking"
                  className="inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white px-6 py-3 rounded-sm transition-colors"
                >
                  Alle {walkingDistance.length} Immobilien zu Fuß erreichbar anzeigen
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
            Alle Strand <span className="font-semibold">Immobilien</span>
          </h2>
          <p className="text-warm-600 mb-8">
            Durchsuchen Sie alle {beachDevelopments.length} Neubauprojekte in der Nähe der Costa Blanca Strände.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sortByPrice(beachDevelopments).slice(0, 16).map((dev) => (
              <Link
                key={dev.slug}
                href={`/de/developments/${dev.slug}`}
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
                      <span className="bg-accent-500 text-white text-xs px-2 py-0.5 rounded-sm">Fertig</span>
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
                href="/de/developments?tag=beach-lover"
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-sm transition-colors"
              >
                Alle {beachDevelopments.length} Strandobjekte anzeigen
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
            Strandobjekte in Costa Blanca, Spanien
          </h2>
          <div className="prose prose-warm max-w-none text-warm-700">
            <p>
              Die Costa Blanca bietet einige der schönsten Strände des Mittelmeers mit über 200 km Küstenlinie mit
              ausgezeichneten Stränden, versteckten Buchten und langen Sandstränden. Unsere Auswahl an Neubauten
              bringt Sie in leichte Reichweite dieser wunderschönen Strände.
            </p>
            <h3>Beliebte Strandgebiete</h3>
            <p>
              <strong>Orihuela Costa</strong> - Heimat von La Zenia, Playa Flamenca und Cabo Roig, dieses Gebiet
              bietet eine perfekte Mischung aus Strandleben und modernen Annehmlichkeiten. Immobilien hier reichen von
              Wohnungen bis zu Luxusvillen, viele zu Fuß vom Strand entfernt.
            </p>
            <p>
              <strong>Torrevieja</strong> - Eine lebendige Küstenstadt mit mehreren Stränden einschließlich Playa del
              Cura und La Mata. Die berühmten Salzseen bieten ein einzigartiges Mikroklima, und die Stadt bietet
              ausgezeichnete Infrastruktur für ganzjähriges Wohnen.
            </p>
            <p>
              <strong>Pilar de la Horadada</strong> - An der südlichen Spitze der Costa Blanca bieten Strände wie
              Mil Palmeras eine ruhigere Umgebung mit kristallklarem Wasser.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
