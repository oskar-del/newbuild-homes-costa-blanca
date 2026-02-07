import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchXMLFeed, formatPrice } from '@/lib/xml-parser';
import { getPropertyDevelopmentInfo } from '@/data/property-development-mapping';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'New Build Properties Costa Calida | Murcia Region Spain',
  description: 'Discover new build villas and apartments in Costa Calida, Murcia region. Mar Menor, Los Alcazares, Mazarron, Cartagena, and golf resorts. From €150,000.',
  openGraph: {
    title: 'New Build Properties Costa Calida | Murcia Region Spain',
    description: 'New build properties in Costa Calida, Murcia. Mar Menor beaches, golf resorts, authentic Spanish lifestyle.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/costa-calida',
  },
};

// Costa Calida/Murcia towns
const COSTA_CALIDA_TOWNS = [
  'Los Alcazares',
  'San Javier',
  'San Pedro del Pinatar',
  'Torre Pacheco',
  'Mazarron',
  'Puerto de Mazarron',
  'Cartagena',
  'La Manga',
  'La Manga del Mar Menor',
  'Sucina',
  'Fuente Alamo',
  'Aguilas',
  'Los Narejos',
  'Santiago de la Ribera',
  'Roldan',
  'Banos y Mendigo',
  'Mar de Cristal',
];

// Costa Calida zones/golf resorts
const COSTA_CALIDA_ZONES = [
  'Roda Golf',
  'Serena Golf',
  'La Serena Golf',
  'Lo Sereno Golf',
  'Hacienda del Alamo',
  'Altorreal Golf',
  'Mar Menor',
  'Mar De Plata',
  'Country Club',
  'Peraleja Golf',
  'Santa Rosalia',
];

function isCostaCaida(town: string, zone?: string): boolean {
  const townLower = town.toLowerCase();
  const zoneLower = zone?.toLowerCase() || '';

  // Check town
  for (const ccTown of COSTA_CALIDA_TOWNS) {
    if (townLower.includes(ccTown.toLowerCase())) return true;
  }

  // Check zone
  for (const ccZone of COSTA_CALIDA_ZONES) {
    if (zoneLower.includes(ccZone.toLowerCase())) return true;
  }

  return false;
}

export default async function CostaCalidaPage() {
  const allProperties = await fetchXMLFeed();

  // Filter for Costa Calida properties using the mapping
  const costaCalidaProperties = allProperties.filter(property => {
    const devInfo = getPropertyDevelopmentInfo(property.ref);
    if (devInfo) {
      return isCostaCaida(property.town, devInfo.zone);
    }
    return isCostaCaida(property.town);
  });

  // Group by development
  const developmentMap = new Map<string, {
    name: string;
    developer: string;
    town: string;
    zone?: string;
    deliveryDate?: string;
    properties: typeof costaCalidaProperties;
    priceFrom: number | null;
    images: string[];
  }>();

  costaCalidaProperties.forEach(property => {
    const devInfo = getPropertyDevelopmentInfo(property.ref);
    const devName = devInfo?.development || property.developmentName || 'Individual Property';

    if (!developmentMap.has(devName)) {
      developmentMap.set(devName, {
        name: devName,
        developer: devInfo?.developer || property.developer,
        town: property.town,
        zone: devInfo?.zone,
        deliveryDate: devInfo?.deliveryDate,
        properties: [],
        priceFrom: null,
        images: [],
      });
    }

    const dev = developmentMap.get(devName)!;
    dev.properties.push(property);

    if (property.price && (!dev.priceFrom || property.price < dev.priceFrom)) {
      dev.priceFrom = property.price;
    }

    if (property.images.length > 0 && dev.images.length < 3) {
      dev.images.push(...property.images.slice(0, 3 - dev.images.length));
    }
  });

  const developments = Array.from(developmentMap.values())
    .filter(d => d.name !== 'Individual Property')
    .sort((a, b) => b.properties.length - a.properties.length);

  // Featured areas
  const areaStats = {
    'Los Alcazares': costaCalidaProperties.filter(p => p.town.includes('Alcazares')).length,
    'Mazarron': costaCalidaProperties.filter(p => p.town.toLowerCase().includes('mazarron')).length,
    'San Javier': costaCalidaProperties.filter(p => p.town.includes('San Javier') || p.town.includes('Roda')).length,
    'Mar Menor': costaCalidaProperties.filter(p => p.town.includes('Mar') || p.town.includes('Manga')).length,
  };

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://costablancapropertyfinder.com' },
    { name: 'Costa Calida', url: 'https://costablancapropertyfinder.com/costa-calida' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }}
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          {/* Hero background - Mar Menor */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400" />
          <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAxOGMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNi0yLjY4NiA2LTYgNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')]" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Costa Calida</span>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 max-w-3xl">
            New Build Properties in{' '}
            <span className="text-accent-400">Costa Calida</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
            Murcia&apos;s stunning coastline. Mar Menor&apos;s warm waters, world-class golf resorts,
            and authentic Spanish lifestyle at exceptional value.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-sm px-6 py-3 text-white">
              <div className="text-2xl font-semibold">{costaCalidaProperties.length}</div>
              <div className="text-sm text-white/80">Properties</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-sm px-6 py-3 text-white">
              <div className="text-2xl font-semibold">{developments.length}</div>
              <div className="text-sm text-white/80">Developments</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-sm px-6 py-3 text-white">
              <div className="text-2xl font-semibold">320+</div>
              <div className="text-sm text-white/80">Days of Sun</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Costa Calida */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900 mb-4">Why Costa Calida?</h2>
            <p className="text-warm-600 max-w-2xl mx-auto">
              Spain&apos;s &quot;Warm Coast&quot; offers exceptional value, Europe&apos;s largest saltwater lagoon,
              and a more authentic Spanish experience than the busier Costa Blanca.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-primary-900 mb-2">Better Value</h3>
              <p className="text-sm text-warm-600">
                15-25% lower prices than Costa Blanca for comparable properties
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="font-medium text-primary-900 mb-2">Mar Menor</h3>
              <p className="text-sm text-warm-600">
                Europe&apos;s largest saltwater lagoon with warm, calm waters year-round
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-medium text-primary-900 mb-2">World-Class Golf</h3>
              <p className="text-sm text-warm-600">
                Premium resorts: Hacienda del Alamo, Roda Golf, La Serena, Altorreal
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-primary-900 mb-2">Best Climate</h3>
              <p className="text-sm text-warm-600">
                320+ days of sunshine, mild winters, perfect for year-round living
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Developments */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-light text-primary-900 mb-2">
                Featured Developments
              </h2>
              <p className="text-warm-600">
                New build projects in Costa Calida&apos;s prime locations
              </p>
            </div>
            <Link
              href="/developments?region=costa-calida"
              className="hidden md:inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developments.slice(0, 6).map((dev) => (
              <Link
                key={dev.name}
                href={`/developments/${dev.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-warm-100"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={dev.images[0] || '/images/placeholder.jpg'}
                    alt={dev.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {dev.deliveryDate && (
                      <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                        {new Date(dev.deliveryDate.split('-').reverse().join('-')) <= new Date(Date.now() + 60*24*60*60*1000)
                          ? 'Key Ready'
                          : `Delivery ${dev.deliveryDate.split('-')[2]}`}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="text-white">
                      <span className="text-sm opacity-80">From</span>
                      <span className="text-xl font-semibold ml-2">
                        {dev.priceFrom ? formatPrice(dev.priceFrom) : 'Contact Us'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-medium text-primary-900 text-lg mb-1 group-hover:text-accent-600 transition-colors">
                    {dev.name}
                  </h3>
                  <p className="text-sm text-warm-500 mb-3">
                    {dev.town}{dev.zone ? ` • ${dev.zone}` : ''}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-warm-400">
                      by {dev.developer}
                    </span>
                    <span className="text-xs text-accent-600 font-medium">
                      {dev.properties.length} units
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link
              href="/developments?region=costa-calida"
              className="inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white font-medium px-6 py-3 rounded-sm transition-colors"
            >
              View All Developments
            </Link>
          </div>
        </div>
      </section>

      {/* Area Highlights */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light mb-10 text-center">Popular Areas</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border border-white/40 shadow-lg">
              <h3 className="font-semibold text-xl mb-3 text-white">Los Alcazares</h3>
              <p className="text-white/90 text-sm mb-4 leading-relaxed">
                Traditional Spanish town on Mar Menor with excellent beaches and golf resorts nearby.
              </p>
              <div className="text-accent-400 font-bold text-lg">{areaStats['Los Alcazares']} properties</div>
            </div>

            <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border border-white/40 shadow-lg">
              <h3 className="font-semibold text-xl mb-3 text-white">Mazarron</h3>
              <p className="text-white/90 text-sm mb-4 leading-relaxed">
                Unspoiled coastline with natural beaches, marine reserve, and authentic atmosphere.
              </p>
              <div className="text-accent-400 font-bold text-lg">{areaStats['Mazarron']} properties</div>
            </div>

            <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border border-white/40 shadow-lg">
              <h3 className="font-semibold text-xl mb-3 text-white">San Javier / Roda Golf</h3>
              <p className="text-white/90 text-sm mb-4 leading-relaxed">
                Home to Murcia airport and premium Roda Golf resort. Easy access to everything.
              </p>
              <div className="text-accent-400 font-bold text-lg">{areaStats['San Javier']} properties</div>
            </div>

            <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 border border-white/40 shadow-lg">
              <h3 className="font-semibold text-xl mb-3 text-white">La Manga / Mar Menor</h3>
              <p className="text-white/90 text-sm mb-4 leading-relaxed">
                Unique strip of land between the Mediterranean and Mar Menor lagoon.
              </p>
              <div className="text-accent-400 font-bold text-lg">{areaStats['Mar Menor']} properties</div>
            </div>
          </div>
        </div>
      </section>

      {/* All Properties CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-primary-900 mb-4">
            Explore All Costa Calida Properties
          </h2>
          <p className="text-warm-600 mb-8 max-w-2xl mx-auto">
            From beachfront apartments to golf resort villas, find your perfect property
            in Murcia&apos;s stunning coastline.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/properties?region=costa-calida"
              className="inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white font-medium px-8 py-4 rounded-sm transition-colors"
            >
              View All Properties
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/golf#costa-calida"
              className="inline-flex items-center gap-2 border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white font-medium px-8 py-4 rounded-sm transition-colors"
            >
              Golf Properties
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white font-medium px-8 py-4 rounded-sm transition-colors"
            >
              Speak to an Expert
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
