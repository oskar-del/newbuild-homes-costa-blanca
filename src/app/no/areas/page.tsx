import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import regionsData from '@/content/regions.json';
import { getAllDevelopments, Development } from '@/lib/development-service';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Områder Costa Blanca | Boligguider & Områdebeskrivelser',
  description: 'Oppdag de beste områdene på Costa Blanca. Omfattende guider for Jávea, Moraira, Alfaz del Pi og mer med eiendomslister for norske kjøpere.',
  openGraph: {
    title: 'Områder Costa Blanca | Boligguider',
    description: 'Utforsk de beste områdene på Costa Blanca med omfattende guider.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/no/areas',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Områder Costa Blanca | Boligguider',
    description: 'Oppdag de beste områdene på Costa Blanca.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/areas',
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

  let propertyTypes: string[] = (rawData.propertyTypes as string[]) || ['Appartementer', 'Villa\'s'];
  if (!rawData.propertyTypes && propertyMarket?.overview) {
    const overview = String(propertyMarket.overview).toLowerCase();
    const types: string[] = [];
    if (overview.includes('villa')) types.push('Villa\'s');
    if (overview.includes('apartment')) types.push('Appartementer');
    if (overview.includes('townhouse')) types.push('Rekkehus');
    if (overview.includes('penthouse')) types.push('Penthouse');
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
        propertyTypes: ['Eiendommer'],
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

export default async function AreasPageNo(): Promise<JSX.Element> {
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
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no' },
    { name: 'Områder', url: 'https://newbuildhomescostablanca.com/no/areas' },
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
              <Link href="/no" className="hover:text-white transition-colors">Hjem</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Områder</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Finn din ideale lokasjon
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                Områder på Costa Blanca <span className="font-semibold">- Din Guide</span>
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed mb-8">
                Fra solrike sør med prisverdige nybygg til prestisjøs nord. Utforsk våre detaljerte guider for å finne din perfekte plass på Costa Blanca.
              </p>

              <div className="flex flex-wrap gap-8">
                <div>
                  <div className="text-2xl font-semibold text-white">{areas.length}+</div>
                  <div className="text-warm-400 text-sm">Områdeguider</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">320+</div>
                  <div className="text-warm-400 text-sm">Soldager/år</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">50+ km</div>
                  <div className="text-warm-400 text-sm">Strender</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Region Selector */}
        <section className="py-10 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* South Card */}
              <a
                href="#south"
                className="group relative bg-warm-50 rounded-sm p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-600 transition-colors">
                      Costa Blanca Sør
                    </h3>
                    <p className="text-accent-500 text-sm font-medium">Sol, verdi & livsstil</p>
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
                      Costa Blanca Nord
                    </h3>
                    <p className="text-accent-500 text-sm font-medium">Luksus & bergskyst</p>
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
            </div>
          </div>
        </section>

        {/* Areas Grid - South */}
        {southAreas.length > 0 && (
          <section id="south" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-light text-primary-900 mb-8">
                Costa Blanca <span className="font-semibold">Sør</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {southAreas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/no/areas/${area.slug}`}
                    className="group bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all border border-warm-100"
                  >
                    <div className="relative h-48 bg-warm-200 overflow-hidden">
                      {area.cardImage && (
                        <Image
                          src={area.cardImage}
                          alt={area.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-primary-900 font-semibold group-hover:text-accent-600 transition-colors">
                        {area.name}
                      </h3>
                      <p className="text-warm-600 text-sm mt-1">
                        {String(area.propertyCount)} boliger
                      </p>
                      <div className="mt-3 pt-3 border-t border-warm-100">
                        <span className="text-xs text-warm-500">
                          €{String(area.priceRange.min / 1000)}k - €{String(area.priceRange.max / 1000)}k
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Areas Grid - North */}
        {northAreas.length > 0 && (
          <section id="north" className="py-16 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-light text-primary-900 mb-8">
                Costa Blanca <span className="font-semibold">Nord</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {northAreas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/no/areas/${area.slug}`}
                    className="group bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all border border-warm-100"
                  >
                    <div className="relative h-48 bg-warm-200 overflow-hidden">
                      {area.cardImage && (
                        <Image
                          src={area.cardImage}
                          alt={area.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-primary-900 font-semibold group-hover:text-accent-600 transition-colors">
                        {area.name}
                      </h3>
                      <p className="text-warm-600 text-sm mt-1">
                        {String(area.propertyCount)} boliger
                      </p>
                      <div className="mt-3 pt-3 border-t border-warm-100">
                        <span className="text-xs text-warm-500">
                          €{String(area.priceRange.min / 1000)}k - €{String(area.priceRange.max / 1000)}k
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other Areas */}
        {otherAreas.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-light text-primary-900 mb-8">
                Andre <span className="font-semibold">Områder</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherAreas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/no/areas/${area.slug}`}
                    className="group bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all border border-warm-100"
                  >
                    <div className="relative h-48 bg-warm-200 overflow-hidden">
                      {area.cardImage && (
                        <Image
                          src={area.cardImage}
                          alt={area.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-primary-900 font-semibold group-hover:text-accent-600 transition-colors">
                        {area.name}
                      </h3>
                      <p className="text-warm-600 text-sm mt-1">
                        {String(area.propertyCount)} boliger
                      </p>
                      <div className="mt-3 pt-3 border-t border-warm-100">
                        <span className="text-xs text-warm-500">
                          €{String(area.priceRange.min / 1000)}k - €{String(area.priceRange.max / 1000)}k
                        </span>
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
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-white mb-4">
              Trenger Du <span className="font-semibold">Eksperthjælp?</span>
            </h2>
            <p className="text-warm-300 mb-8">
              Vi hjelper deg å finne den perfekte lokalisjonen for dine behov.
            </p>
            <Link
              href="/no/contact"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
            >
              Kontakt Oss
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
