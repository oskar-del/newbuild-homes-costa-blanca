import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import regionsData from '@/content/regions.json';
import { getAllDevelopments, Development } from '@/lib/development-service';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Régions Costa Blanca | Guides de Quartiers et Zones d\'Habitation',
  description: 'Découvrez les meilleures régions de la Costa Blanca. Guides complets de Jávea, Moraira, Algorfa et plus avec listes de propriétés.',
  openGraph: {
    title: 'Régions Costa Blanca | Guides de Quartiers',
    description: 'Explorez les meilleurs quartiers et zones de la Costa Blanca.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/fr/areas',
    siteName: 'Maisons Neuves Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/areas',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/areas',
      'sv': 'https://newbuildhomescostablanca.com/sv/areas',
      'nl': 'https://newbuildhomescostablanca.com/nl/areas',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/areas',
      'fr': 'https://newbuildhomescostablanca.com/fr/areas',
      'no': 'https://newbuildhomescostablanca.com/no/areas',
      'x-default': 'https://newbuildhomescostablanca.com/areas',
    },
  },
};

interface Area {
  slug: string;
  name: string;
  propertyCount: number;
  propertyTypes: string[];
  priceRange: { min: number; max: number };
  cardImage?: string;
}

async function getAllAreasWithCounts(): Promise<Area[]> {
  const developments = await getAllDevelopments();

  const areas: Area[] = [
    { slug: 'javea', name: 'Jávea', propertyCount: 0, propertyTypes: [], priceRange: { min: 300000, max: 2000000 } },
    { slug: 'moraira', name: 'Moraira', propertyCount: 0, propertyTypes: [], priceRange: { min: 400000, max: 3000000 } },
    { slug: 'altea', name: 'Altea', propertyCount: 0, propertyTypes: [], priceRange: { min: 250000, max: 1500000 } },
    { slug: 'torrevieja', name: 'Torrevieja', propertyCount: 0, propertyTypes: [], priceRange: { min: 150000, max: 800000 } },
    { slug: 'benidorm', name: 'Benidorm', propertyCount: 0, propertyTypes: [], priceRange: { min: 180000, max: 1200000 } },
    { slug: 'algorfa', name: 'Algorfa', propertyCount: 0, propertyTypes: [], priceRange: { min: 180000, max: 900000 } },
  ];

  return areas.map(area => {
    const matchingDevs = developments.filter(dev => dev.name.toLowerCase().includes(area.name.toLowerCase()) || dev.town?.toLowerCase().includes(area.name.toLowerCase()));
    return {
      ...area,
      propertyCount: matchingDevs.length,
      cardImage: matchingDevs[0]?.mainImage,
    };
  });
}

export default async function FRAreasPage() {
  const areas = await getAllAreasWithCounts();
  const southData = regionsData['costa-blanca-south'];
  const northData = regionsData['costa-blanca-north'];

  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr' },
    { name: 'Régions', url: 'https://newbuildhomescostablanca.com/fr/areas' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        <section className="relative bg-primary-900 py-16 md:py-20">
          <div className="relative max-w-7xl mx-auto px-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
              Régions de Costa Blanca <span className="font-semibold">- Votre Guide</span>
            </h1>
            <p className="text-warm-300 text-lg leading-relaxed">
              Du sud ensoleillé avec prix abordables au nord prestigieux. Explorez nos guides détaillés pour trouver votre coin parfait de la Costa Blanca.
            </p>

            <div className="flex flex-wrap gap-8 mt-8">
              <div>
                <div className="text-2xl font-semibold text-white">{areas.length}+</div>
                <div className="text-warm-400 text-sm">Guides Régionaux</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">320+</div>
                <div className="text-warm-400 text-sm">Jours de soleil/an</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">50+ km</div>
                <div className="text-warm-400 text-sm">De plages</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-6">
              <a href="#south" className="group relative bg-warm-50 rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-600 transition-colors">Costa Blanca Sud</h3>
                    <p className="text-accent-500 text-sm font-medium">Soleil, valeur & vie</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary-900">{String((southData.stats as Record<string, unknown>).averagePrice || '')}</div>
                    <div className="text-warm-500 text-xs">Prix moyen</div>
                  </div>
                </div>
                <p className="text-warm-600 text-sm">{southData.shortDescription}</p>
              </a>

              <a href="#north" className="group relative bg-warm-50 rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-600 transition-colors">Costa Blanca Nord</h3>
                    <p className="text-accent-500 text-sm font-medium">Prestige, beauté & exclusivité</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary-900">{String((northData.stats as Record<string, unknown>).averagePrice || '')}</div>
                    <div className="text-warm-500 text-xs">Prix moyen</div>
                  </div>
                </div>
                <p className="text-warm-600 text-sm">{northData.shortDescription}</p>
              </a>
            </div>
          </div>
        </section>

        <section id="south" className="relative py-10 bg-warm-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-3">
                  {southData.name}
                </h2>
                <p className="text-warm-300 leading-relaxed">
                  {southData.shortDescription}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-white">{String((southData.stats as Record<string, unknown>).sunnyDays || '')}</div>
                  <div className="text-warm-400 text-xs">Jours de soleil</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-white">{String((southData.stats as Record<string, unknown>).golfCourses || '')}</div>
                  <div className="text-warm-400 text-xs">Terrains de golf</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-white">{String((southData.stats as Record<string, unknown>).averagePrice || '')}</div>
                  <div className="text-warm-400 text-xs">Prix moyen</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {areas.filter(a => ['torrevieja', 'benidorm', 'algorfa'].includes(a.slug)).map(area => (
                <Link
                  key={area.slug}
                  href={`/fr/areas/${area.slug}`}
                  className="group bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-warm-200"
                >
                  {area.cardImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={area.cardImage}
                        alt={area.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="text-lg font-semibold text-white">
                          À partir de €{area.priceRange.min.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="p-4 bg-primary-900">
                    <h3 className="font-medium text-white mb-1 group-hover:text-accent-400 transition-colors text-lg">
                      {area.name}
                    </h3>
                    <div className="flex items-center justify-between text-sm mt-3">
                      {area.propertyCount > 0 && (
                        <span className="text-warm-400">{area.propertyCount} propriétés</span>
                      )}
                      <span className="text-accent-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all ml-auto">
                        Explorer
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="north" className="relative py-10 bg-primary-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-3">
                  {northData.name}
                </h2>
                <p className="text-warm-300 leading-relaxed">
                  {northData.shortDescription}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-white">{String((northData.stats as Record<string, unknown>).sunnyDays || '')}</div>
                  <div className="text-warm-400 text-xs">Jours de soleil</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-white">{String((northData.stats as Record<string, unknown>).michelinRestaurants || '')}</div>
                  <div className="text-warm-400 text-xs">Restaurants Michelin</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-white">{String((northData.stats as Record<string, unknown>).averagePrice || '')}</div>
                  <div className="text-warm-400 text-xs">Prix moyen</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {areas.filter(a => ['javea', 'moraira', 'altea'].includes(a.slug)).map(area => (
                <Link
                  key={area.slug}
                  href={`/fr/areas/${area.slug}`}
                  className="group bg-warm-50 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-primary-200"
                >
                  {area.cardImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={area.cardImage}
                        alt={area.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary-900 text-white text-xs font-medium px-2 py-1 rounded-sm">
                          Premium
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="text-lg font-semibold text-white">
                          À partir de €{area.priceRange.min.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="p-4 bg-warm-50 border-t-4 border-accent-500">
                    <h3 className="font-medium text-primary-900 mb-1 group-hover:text-accent-600 transition-colors text-lg">
                      {area.name}
                    </h3>
                    <div className="flex items-center justify-between text-sm mt-3">
                      {area.propertyCount > 0 && (
                        <span className="text-warm-500">{area.propertyCount} propriétés</span>
                      )}
                      <span className="text-primary-900 font-medium flex items-center gap-1 group-hover:text-accent-600 group-hover:gap-2 transition-all ml-auto">
                        Explorer
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 px-4 bg-white">
          <div className="max-w-4xl mx-auto bg-warm-50 border border-warm-200 rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-primary-900 font-medium text-lg">Voulez-vous explorer des développements dans ces régions?</p>
              <p className="text-warm-500 text-sm mt-1">Contactez-nous pour la dernière disponibilité, plans ou pour planifier une visite</p>
            </div>
            <div className="flex gap-3">
              <a href="https://wa.me/34634044970" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-primary-900 text-white rounded-sm text-sm font-medium hover:bg-primary-800 transition-colors">
                WhatsApp
              </a>
              <a href="/fr/contact" className="px-5 py-2.5 border border-primary-900 text-primary-900 rounded-sm text-sm font-medium hover:bg-primary-900 hover:text-white transition-colors">
                Nous Contacter
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
