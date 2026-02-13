import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import regionsData from '@/content/regions.json';
import { getAllDevelopments, Development } from '@/lib/development-service';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Gebieden Costa Blanca | Woonhuisgidsen voor Belgische Kopers',
  description: 'Ontdek de beste gebieden op Costa Blanca. Uitgebreide gidsen voor Jávea, Moraira, Torrevieja en meer met vastgoedlijsten voor Belgische en Vlaamse kopers.',
  openGraph: {
    title: 'Gebieden Costa Blanca | Woonhuisgidsen',
    description: 'Verken de beste gebieden op Costa Blanca. Jávea, Moraira, Calpe en andere premium adressen.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/nl-be/areas',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gebieden Costa Blanca | Woonhuisgidsen',
    description: 'Ontdek de beste gebieden op Costa Blanca met uitgebreide gidsen.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/areas',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/areas',
      'sv': 'https://newbuildhomescostablanca.com/sv/areas',
      'nl': 'https://newbuildhomescostablanca.com/nl/areas',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/areas',
      'fr': 'https://newbuildhomescostablanca.com/fr/areas',
      'no': 'https://newbuildhomescostablanca.com/no/areas',
      'de': 'https://newbuildhomescostablanca.com/de/areas',
      'pl': 'https://newbuildhomescostablanca.com/pl/areas',
      'ru': 'https://newbuildhomescostablanca.com/ru/areas',
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

function extractAreaName(rawData: Record<string, unknown>, filename: string): string {
  const slug = filename.replace('.json', '');
  if (rawData.name) return String(rawData.name);
  if (rawData.metaTitle) {
    const metaTitle = String(rawData.metaTitle);
    const match = metaTitle.match(/Living in ([^:|]+)/i) ||
                  metaTitle.match(/^([^:|]+)/);
    if (match) return match[1].trim();
  }
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function normalizeAreaToCard(rawData: Record<string, unknown>, filename: string): Area {
  const slug = String(rawData.slug || filename.replace('.json', ''));
  const name = extractAreaName(rawData, filename);

  let priceRange: { min: number; max: number } = (rawData.priceRange as { min: number; max: number }) || { min: 200000, max: 1000000 };
  const propertyMarket = rawData.propertyMarket as Record<string, unknown>;
  if (propertyMarket?.priceRange && typeof propertyMarket.priceRange === 'string') {
    const priceStr = propertyMarket.priceRange;
    const prices = priceStr.match(/[\d,]+/g);
    if (prices && prices.length >= 2) {
      priceRange = {
        min: parseInt(prices[0].replace(/,/g, ''), 10) || 200000,
        max: parseInt(prices[1].replace(/,/g, ''), 10) || 1000000,
      };
    }
  }

  let propertyTypes: string[] = (rawData.propertyTypes as string[]) || ['Appartementen', 'Villa\'s'];
  if (!rawData.propertyTypes && propertyMarket?.overview) {
    const overview = String(propertyMarket.overview).toLowerCase();
    const types: string[] = [];
    if (overview.includes('villa')) types.push('Villa\'s');
    if (overview.includes('apartment')) types.push('Appartementen');
    if (overview.includes('townhouse')) types.push('Rijtjeshuizen');
    if (overview.includes('penthouse')) types.push('Penthouses');
    if (types.length > 0) propertyTypes = types;
  }

  return {
    slug,
    name,
    propertyCount: (rawData.propertyCount as number) || 0,
    propertyTypes,
    priceRange,
    cardImage: rawData.cardImage as string | undefined,
  };
}

function getAllAreasRaw(): Area[] {
  const areasDir = path.join(process.cwd(), 'src', 'content', 'areas');
  if (!fs.existsSync(areasDir)) {
    return [];
  }
  const files = fs.readdirSync(areasDir).filter(file => file.endsWith('.json'));
  return files.map(file => {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(areasDir, file), 'utf-8'));
      return normalizeAreaToCard(content, file);
    } catch (error) {
      const slug = file.replace('.json', '');
      return {
        slug,
        name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        propertyCount: 0,
        propertyTypes: ['Eigendommen'],
        priceRange: { min: 200000, max: 1000000 },
      };
    }
  });
}

async function getAllAreasWithCounts(): Promise<Area[]> {
  const areas = getAllAreasRaw();
  const developments = await getAllDevelopments();
  const usedImages = new Set<string>();

  const matchesArea = (dev: Development, areaName: string, _slug: string): boolean => {
    const town = (dev.town || '').toLowerCase().trim().replace(/_/g, ' ');
    const zone = (dev.zone || '').toLowerCase().trim().replace(/_/g, ' ');
    const areaLower = areaName.toLowerCase();
    if (!town && !zone) return false;

    const normalize = (s: string): string => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const areaNorm = normalize(areaLower);
    const townNorm = normalize(town);
    const zoneNorm = normalize(zone);

    const townParts = town.split(/[\s_-]+/);
    const zoneParts = zone.split(/[\s_-]+/);

    if (town) {
      if (town.includes(areaLower) || areaLower.includes(town) ||
          townNorm.includes(areaNorm) || areaNorm.includes(townNorm) ||
          townParts.some(part => part.includes(areaLower) || areaLower.includes(part)) ||
          townParts.some(part => normalize(part).includes(areaNorm) || areaNorm.includes(normalize(part))))
        return true;
    }
    if (zone) {
      if (zone.includes(areaLower) || areaLower.includes(zone) ||
          zoneNorm.includes(areaNorm) || areaNorm.includes(zoneNorm) ||
          zoneParts.some(part => part.includes(areaLower) || areaLower.includes(part)) ||
          zoneParts.some(part => normalize(part).includes(areaNorm) || areaNorm.includes(normalize(part))))
        return true;
    }
    return false;
  };

  return areas.map(area => {
    const matchingDevs = developments.filter(dev => matchesArea(dev, area.name, area.slug));
    let devImage: string | undefined;
    for (const dev of matchingDevs) {
      const mainImage = dev.mainImage;
      const images = dev.images || [];
      const possibleImages = [
        mainImage,
        ...images
      ].filter((img): img is string => !!img && img.startsWith('http'));

      for (const img of possibleImages) {
        if (!usedImages.has(img)) {
          devImage = img;
          usedImages.add(img);
          break;
        }
      }
      if (devImage) break;
    }

    const finalImage = devImage || area.cardImage;
    if (finalImage) usedImages.add(finalImage);

    return {
      ...area,
      propertyCount: matchingDevs.length,
      cardImage: finalImage,
    };
  });
}

export default async function AreasPageBelgian(): Promise<JSX.Element> {
  const areas = await getAllAreasWithCounts();
  const southData = regionsData['costa-blanca-south'];
  const northData = regionsData['costa-blanca-north'];

  const southTowns = ((southData.popularTowns as string[]) || []).map(t => t.toLowerCase());
  const northTowns = ((northData.popularTowns as string[]) || []).map(t => t.toLowerCase());

  const sortByPropertyCount = (a: Area, b: Area): number => b.propertyCount - a.propertyCount;

  const southAreas = areas
    .filter(a => southTowns.some(t => a.name.toLowerCase().includes(t) || a.slug.includes(t.replace(' ', '-'))))
    .sort(sortByPropertyCount);

  const northAreas = areas
    .filter(a => northTowns.some(t => a.name.toLowerCase().includes(t) || a.slug.includes(t.replace(' ', '-'))))
    .sort(sortByPropertyCount);

  const otherAreas = areas
    .filter(a => !southAreas.includes(a) && !northAreas.includes(a))
    .sort(sortByPropertyCount);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl-be' },
    { name: 'Gebieden', url: 'https://newbuildhomescostablanca.com/nl-be/areas' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="relative bg-primary-900 py-16 md:py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/nl-be" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Gebieden</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Vind uw ideale locatie
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                Gebieden op Costa Blanca <span className="font-semibold">- Uw Gids</span>
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed mb-8">
                Van zonnige zuiden met betaalbare nieuwbouw tot prestigieuze noorden. Verken onze gedetailleerde gidsen om uw perfecte hoek van Costa Blanca te vinden. Speciaal voor Belgische en Vlaamse kopers.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-8">
                <div>
                  <div className="text-2xl font-semibold text-white">{areas.length}+</div>
                  <div className="text-warm-400 text-sm">Gebiedsgidsen</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">320+</div>
                  <div className="text-warm-400 text-sm">Zonnedagen/jaar</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">50+ km</div>
                  <div className="text-warm-400 text-sm">Stranden</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Region Selector */}
        <section className="py-10 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* South Card */}
              <a
                href="#south"
                className="group relative bg-warm-50 rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-600 transition-colors">
                      Costa Blanca Zuid
                    </h3>
                    <p className="text-accent-500 text-sm font-medium">Zon, waarde & lifestyle</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary-900">{String((southData.stats as Record<string, unknown>).averagePrice || '')}</div>
                    <div className="text-warm-500 text-xs">Gemiddelde prijs</div>
                  </div>
                </div>
                <p className="text-warm-600 text-sm mb-4 line-clamp-2">{southData.shortDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {((southData.popularTowns as string[]) || []).slice(0, 4).map(town => (
                    <span key={town} className="bg-warm-200 text-warm-700 text-xs px-2 py-1 rounded">
                      {town}
                    </span>
                  ))}
                </div>
              </a>

              {/* North Card */}
              <a
                href="#north"
                className="group relative bg-warm-50 rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-600 transition-colors">
                      Costa Blanca Noord
                    </h3>
                    <p className="text-accent-500 text-sm font-medium">Prestige, schoonheid & exclusiviteit</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary-900">{String((northData.stats as Record<string, unknown>).averagePrice || '')}</div>
                    <div className="text-warm-500 text-xs">Gemiddelde prijs</div>
                  </div>
                </div>
                <p className="text-warm-600 text-sm mb-4 line-clamp-2">{northData.shortDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {((northData.popularTowns as string[]) || []).slice(0, 4).map(town => (
                    <span key={town} className="bg-warm-200 text-warm-700 text-xs px-2 py-1 rounded">
                      {town}
                    </span>
                  ))}
                </div>
              </a>

              {/* Costa Cálida Card */}
              <Link
                href="/nl-be/areas/costa-calida"
                className="group relative bg-primary-900 rounded-sm p-6 border border-primary-800 hover:border-accent-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-accent-400 transition-colors">
                      Costa Cálida
                    </h3>
                    <p className="text-accent-400 text-sm font-medium">Beste waarde in Spanje</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-white">€179k</div>
                    <div className="text-warm-400 text-xs">Gemiddelde prijs</div>
                  </div>
                </div>
                <p className="text-warm-300 text-sm mb-4 line-clamp-2">
                  Murcias Mar Menor-regio. Championship-golf, ganzjarig zon, 25-40% goedkoper dan Costa Blanca.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Los Alcázares', 'San Javier', 'Roda Golf', 'Mar Menor'].map(town => (
                    <span key={town} className="bg-white/10 text-warm-300 text-xs px-2 py-1 rounded">
                      {town}
                    </span>
                  ))}
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* COSTA BLANCA SOUTH SECTION */}
        <section id="south" className="relative">
          <div className="bg-warm-800 py-8">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-warm-500" />
                    <span className="text-warm-400 text-xs font-medium tracking-widest uppercase">
                      {String((southData as Record<string, unknown>).tagline || 'Zon, waarde & lifestyle')}
                    </span>
                  </div>
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
                    <div className="text-warm-400 text-xs">Zonnedagen</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-white">{String((southData.stats as Record<string, unknown>).golfCourses || '')}</div>
                    <div className="text-warm-400 text-xs">Golfbanen</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-white">{String((southData.stats as Record<string, unknown>).averagePrice || '')}</div>
                    <div className="text-warm-400 text-xs">Gemiddelde prijs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* South Areas Grid */}
          <div className="py-10 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              {southAreas.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {southAreas.map(area => (
                    <Link
                      key={area.slug}
                      href={`/nl-be/areas/${area.slug}`}
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
                              Vanaf €{area.priceRange.min.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="p-4 bg-primary-900">
                        <h3 className="font-medium text-white mb-1 group-hover:text-accent-400 transition-colors text-lg">
                          {area.name}
                        </h3>
                        <div className="flex items-center gap-3 text-warm-400 text-sm">
                          <span>{area.propertyTypes.slice(0, 2).join(' • ')}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          {area.propertyCount > 0 && (
                            <span className="text-warm-500">{area.propertyCount} eigendommen</span>
                          )}
                          <span className="text-accent-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Verkennen
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* Lifestyle Quote */}
          <div className="bg-warm-100 py-8 border-y border-warm-200">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <p className="text-warm-700 text-lg italic leading-relaxed">
                "{southData.lifestyle}"
              </p>
            </div>
          </div>
        </section>

        {/* COSTA BLANCA NORTH SECTION */}
        <section id="north" className="relative">
          <div className="bg-primary-900 py-8">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-accent-500" />
                    <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                      {String((northData as Record<string, unknown>).tagline || 'Prestige, schoonheid & exclusiviteit')}
                    </span>
                  </div>
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
                    <div className="text-warm-400 text-xs">Zonnedagen</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-white">{String((northData.stats as Record<string, unknown>).michelinRestaurants || '')}</div>
                    <div className="text-warm-400 text-xs">Michelin-rest.</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-white">{String((northData.stats as Record<string, unknown>).averagePrice || '')}</div>
                    <div className="text-warm-400 text-xs">Gemiddelde prijs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* North Areas Grid */}
          <div className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              {northAreas.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {northAreas.map(area => (
                    <Link
                      key={area.slug}
                      href={`/nl-be/areas/${area.slug}`}
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
                              Vanaf €{area.priceRange.min.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="p-4 bg-warm-50 border-t-4 border-accent-500">
                        <h3 className="font-medium text-primary-900 mb-1 group-hover:text-accent-600 transition-colors text-lg">
                          {area.name}
                        </h3>
                        <div className="flex items-center gap-3 text-warm-600 text-sm">
                          <span>{area.propertyTypes.slice(0, 2).join(' • ')}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm">
                          {area.propertyCount > 0 && (
                            <span className="text-warm-500">{area.propertyCount} eigendommen</span>
                          )}
                          <span className="text-primary-900 font-medium flex items-center gap-1 group-hover:text-accent-600 group-hover:gap-2 transition-all">
                            Verkennen
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* Lifestyle Quote */}
          <div className="bg-primary-50 py-8 border-y border-primary-100">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <p className="text-primary-800 text-lg italic leading-relaxed">
                "{northData.lifestyle}"
              </p>
            </div>
          </div>
        </section>

        {/* Light CTA */}
        <section className="py-8 px-4 bg-white">
          <div className="max-w-4xl mx-auto bg-warm-50 border border-warm-200 rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-primary-900 font-medium text-lg">Wilt u ontwikkelingen in deze gebieden verkennen?</p>
              <p className="text-warm-500 text-sm mt-1">Neem contact met ons op voor de nieuwste beschikbaarheid, plannen of om een bezichtiging in te plannen</p>
            </div>
            <div className="flex gap-3">
              <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-primary-900 text-white rounded-sm text-sm font-medium hover:bg-primary-800 transition-colors">
                WhatsApp
              </a>
              <a href="/nl-be/contact" className="px-5 py-2.5 border border-primary-900 text-primary-900 rounded-sm text-sm font-medium hover:bg-primary-900 hover:text-white transition-colors">
                Neem contact op
              </a>
            </div>
          </div>
        </section>

        {/* Other Areas */}
        {otherAreas.length > 0 && (
          <section className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-3">
                  Meer Costa Blanca-gebieden
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherAreas.map(area => (
                  <Link
                    key={area.slug}
                    href={`/nl-be/areas/${area.slug}`}
                    className="group bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-warm-200"
                  >
                    {area.cardImage && (
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={area.cardImage}
                          alt={area.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="text-sm font-semibold text-white">
                            Vanaf €{area.priceRange.min.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-primary-900 mb-1 group-hover:text-accent-600 transition-colors">
                        {area.name}
                      </h3>
                      <p className="text-warm-600 text-sm mb-2">{area.propertyTypes.slice(0, 3).join(', ')}</p>
                      <div className="flex items-center justify-between text-sm">
                        {area.propertyCount > 0 && (
                          <span className="text-warm-500">{area.propertyCount} eigendommen</span>
                        )}
                        <span className="text-accent-500 font-medium flex items-center gap-1 group-hover:gap-2 transition-all ml-auto">
                          Verkennen
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
        )}

        {/* Final CTA */}
        <section className="bg-primary-900 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                    Persoonlijke service
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                  Twijfelt u welk gebied bij u past?
                </h2>
                <p className="text-warm-300 leading-relaxed mb-6">
                  Met zoveel fantastische plekken om uit te kiezen kan het overweldigend zijn. Vertel ons uw prioriteiten - budget, lifestyle, nabijheid van strand of golf - en wij bevelen u het perfecte gebied aan.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
                  >
                    Neem contact op via WhatsApp
                  </a>
                  <a
                    href="tel:+34634044970"
                    className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-sm transition-colors border border-white/20"
                  >
                    +34 634 044 970
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-5 rounded-sm">
                  <div className="text-2xl font-semibold text-white mb-1">15+</div>
                  <div className="text-warm-300 text-sm">Jaar lokale kennis</div>
                </div>
                <div className="bg-white/10 p-5 rounded-sm">
                  <div className="text-2xl font-semibold text-white mb-1">500+</div>
                  <div className="text-warm-300 text-sm">Families geholpen</div>
                </div>
                <div className="bg-white/10 p-5 rounded-sm">
                  <div className="text-2xl font-semibold text-white mb-1">Gratis</div>
                  <div className="text-warm-300 text-sm">Consultatie</div>
                </div>
                <div className="bg-white/10 p-5 rounded-sm">
                  <div className="text-2xl font-semibold text-white mb-1">5</div>
                  <div className="text-warm-300 text-sm">Talen</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
