import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import regionsData from '@/content/regions.json';
import { getAllDevelopments } from '@/lib/development-service';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Costa Blanca Areas | Living & Property Guides',
  description: 'Discover the best areas to live in Costa Blanca. Comprehensive guides to Jávea, Moraira, and more with property listings and lifestyle information.',
  openGraph: {
    title: 'Costa Blanca Areas | Living & Property Guides',
    description: 'Discover the best areas to live in Costa Blanca. Explore Jávea, Moraira, Calpe and more premium locations.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/areas',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Costa Blanca Areas | Living & Property Guides',
    description: 'Discover the best areas to live in Costa Blanca. Comprehensive guides to top locations.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/areas',
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

// Helper to extract name from various sources
function extractAreaName(rawData: any, filename: string): string {
  const slug = filename.replace('.json', '');

  // Priority 1: Direct name field
  if (rawData.name) return rawData.name;

  // Priority 2: Extract from metaTitle "Living in X: ..."
  if (rawData.metaTitle) {
    const match = rawData.metaTitle.match(/Living in ([^:|]+)/i) ||
                  rawData.metaTitle.match(/^([^:|]+)/);
    if (match) return match[1].trim();
  }

  // Priority 3: Convert slug to title case
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Normalizer to handle both JSON formats
function normalizeAreaToCard(rawData: any, filename: string): Area {
  const slug = rawData.slug || filename.replace('.json', '');
  const name = extractAreaName(rawData, filename);

  // Parse price range - check both formats
  let priceRange = rawData.priceRange || { min: 200000, max: 1000000 };
  if (rawData.propertyMarket?.priceRange && typeof rawData.propertyMarket.priceRange === 'string') {
    const priceStr = rawData.propertyMarket.priceRange;
    const prices = priceStr.match(/[\d,]+/g);
    if (prices && prices.length >= 2) {
      priceRange = {
        min: parseInt(prices[0].replace(/,/g, ''), 10) || 200000,
        max: parseInt(prices[1].replace(/,/g, ''), 10) || 1000000,
      };
    }
  }

  // Extract property types
  let propertyTypes = rawData.propertyTypes || ['Apartments', 'Villas'];
  if (!rawData.propertyTypes && rawData.propertyMarket?.overview) {
    const overview = rawData.propertyMarket.overview.toLowerCase();
    const types: string[] = [];
    if (overview.includes('villa')) types.push('Villas');
    if (overview.includes('apartment')) types.push('Apartments');
    if (overview.includes('townhouse')) types.push('Townhouses');
    if (overview.includes('penthouse')) types.push('Penthouses');
    if (types.length > 0) propertyTypes = types;
  }

  return {
    slug,
    name,
    propertyCount: rawData.propertyCount || 0,
    propertyTypes,
    priceRange,
    cardImage: rawData.cardImage,
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
      console.error(`Error parsing area file ${file}:`, error);
      // Return a fallback area so the page doesn't crash
      const slug = file.replace('.json', '');
      return {
        slug,
        name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        propertyCount: 0,
        propertyTypes: ['Properties'],
        priceRange: { min: 200000, max: 1000000 },
      };
    }
  });
}

// Get areas with real property counts AND first development image from API
async function getAllAreasWithCounts(): Promise<Area[]> {
  const areas = getAllAreasRaw();
  const developments = await getAllDevelopments();

  // Helper to check if a development matches an area
  const matchesArea = (dev: typeof developments[0], areaName: string, slug: string) => {
    // Replace underscores with spaces for better matching (e.g., "Moraira_Teulada" -> "Moraira Teulada")
    const town = (dev.town || '').toLowerCase().trim().replace(/_/g, ' ');
    const zone = (dev.zone || '').toLowerCase().trim().replace(/_/g, ' ');
    const areaLower = areaName.toLowerCase();
    const slugLower = slug.toLowerCase().replace(/-/g, ' ');

    // Skip if both town and zone are empty
    if (!town && !zone) return false;

    // Normalize for accent-insensitive matching
    const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const areaNorm = normalize(areaLower);
    const townNorm = normalize(town);
    const zoneNorm = normalize(zone);

    // Split compound towns (e.g., "moraira teulada" -> ["moraira", "teulada"])
    const townParts = town.split(/[\s_-]+/);
    const zoneParts = zone.split(/[\s_-]+/);

    // Town matches - check each part
    if (town) {
      if (town.includes(areaLower) || areaLower.includes(town) ||
          townNorm.includes(areaNorm) || areaNorm.includes(townNorm) ||
          townParts.some(part => part.includes(areaLower) || areaLower.includes(part)) ||
          townParts.some(part => normalize(part).includes(areaNorm) || areaNorm.includes(normalize(part))))
        return true;
    }

    // Zone matches - check each part
    if (zone) {
      if (zone.includes(areaLower) || areaLower.includes(zone) ||
          zoneNorm.includes(areaNorm) || areaNorm.includes(zoneNorm) ||
          zoneParts.some(part => part.includes(areaLower) || areaLower.includes(part)) ||
          zoneParts.some(part => normalize(part).includes(areaNorm) || areaNorm.includes(normalize(part))))
        return true;
    }

    return false;
  };

  // Track used images to ensure uniqueness
  const usedImages = new Set<string>();

  return areas.map(area => {
    // Find all developments matching this area
    const matchingDevs = developments.filter(dev => matchesArea(dev, area.name, area.slug));

    // Get a UNIQUE development image for this area
    let devImage: string | undefined;
    for (const dev of matchingDevs) {
      // Collect all possible images from this development
      const possibleImages = [
        dev.mainImage,
        ...(dev.images || [])
      ].filter(img => img && img.startsWith('http'));

      // Find first image not already used by another area
      for (const img of possibleImages) {
        if (!usedImages.has(img)) {
          devImage = img;
          usedImages.add(img);
          break;
        }
      }
      if (devImage) break;
    }

    // If no unique dev image found, use the JSON cardImage (which are guaranteed unique)
    const finalImage = devImage || area.cardImage;
    if (finalImage) usedImages.add(finalImage);

    return {
      ...area,
      propertyCount: matchingDevs.length,
      cardImage: finalImage,
    };
  });
}

export default async function AreasPage() {
  const areas = await getAllAreasWithCounts();
  const southData = regionsData['costa-blanca-south'];
  const northData = regionsData['costa-blanca-north'];

  // Separate areas by region (basic heuristic based on known towns)
  const southTowns = southData.popularTowns.map(t => t.toLowerCase());
  const northTowns = northData.popularTowns.map(t => t.toLowerCase());

  // Sort helper - by property count descending
  const sortByPropertyCount = (a: Area, b: Area) => b.propertyCount - a.propertyCount;

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
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Areas', url: 'https://newbuildhomescostablanca.com/areas/' },
  ]);

  // FAQ data
  const faqs = [
    {
      question: "What's the best area to live in Costa Blanca?",
      answer: "There's no single best area—it depends entirely on your lifestyle and priorities. Costa Blanca South (Benidorm, Torrevieja, Orihuela) offers excellent value, vibrant beach life, and abundant amenities, making it perfect for families and retirees on a budget. Costa Blanca North (Jávea, Moraira, Benissa, Denia) appeals to those seeking a more upscale, tranquil Mediterranean lifestyle with excellent dining and natural beauty. Your ideal choice is determined by whether you prioritise affordability and social community or exclusivity and coastal sophistication.",
    },
    {
      question: "What's the difference between Costa Blanca North and South?",
      answer: "Costa Blanca South is more developed, affordable, and social—average property prices from €200,000 to €400,000, with high British and Northern European expat populations. It features long sandy beaches, vibrant nightlife, and abundant restaurants and bars. Costa Blanca North is more exclusive and prestigious, with prices from €400,000 upward, craggy coves, Michelin-starred restaurants, and a quieter, more refined atmosphere favoured by wealthier buyers. North is also more Spanish in character, with smaller villages, better weather patterns (slightly less summer heat), and a slower pace of life.",
    },
    {
      question: "Which Costa Blanca areas are most popular with British expats?",
      answer: "Torrevieja, Orihuela Costa, and Benidorm dominate the South with the largest British communities—some neighbourhoods are almost entirely British-owned with familiar shops, pubs, and services. In the North, Jávea and Moraira attract affluent British buyers, though in smaller numbers. The South is particularly popular with retirees and those on modest pensions due to lower costs and established expat infrastructure, while the North appeals more to wealthy British professionals and business owners seeking upscale retirement.",
    },
    {
      question: "How much do properties cost in different Costa Blanca areas?",
      answer: "Costa Blanca South ranges from €180,000 for basic apartments to €600,000+ for quality villas, with the greatest selection between €250,000–€400,000. Benidorm and beachfront locations command premiums, while inland towns like Orihuela offer better value. Costa Blanca North starts at €400,000 for modest properties and easily exceeds €1.5 million for premium villas in prime locations like Jávea or Moraira. Premium clifftop properties in the North regularly reach €2 million–€5 million. Your budget effectively determines which region is realistic.",
    },
    {
      question: "Which areas have the best beaches?",
      answer: "Costa Blanca South excels with long, wide sandy beaches ideal for families—Playa del Torres and Playa de Levante in Benidorm, and Playa Flamenca in Orihuela Costa are vibrant and well-serviced. The North offers more dramatic scenery: Cala Finestrat, Cala Moraira, and Cala de Finestrat feature smaller, picturesque coves framed by pines and cliffs, perfect for those preferring intimate settings over bustling resort beaches. The South beaches suit those who enjoy social atmosphere and water sports facilities, while the North appeals to those seeking quieter, more scenic swimming.",
    },
    {
      question: "Is it better to live near the coast or inland?",
      answer: "Coastal properties offer beach proximity, sea views, and strong rental income potential but command premium prices (often €200,000–€500,000 more) and experience more humidity, salt air corrosion, and higher tourist traffic in summer. Inland areas (Orihuela town, Altea, Callosa) are significantly cheaper, quieter, enjoy clearer air and lower humidity, yet lack beach access. Coastal suits those prioritising lifestyle and investment returns; inland suits budget-conscious buyers seeking tranquility and authentic Spanish village life. Consider your budget and lifestyle: beach living isn't essential for happiness in Costa Blanca.",
    },
  ];
  const faqJsonLd = faqSchema(faqs);

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }}
    />
    <main className="min-h-screen bg-warm-50">
      {/* Hero */}
      <section className="relative bg-primary-900 py-16 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="text-warm-400 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Areas</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                Discover Your Ideal Location
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
              Costa Blanca <span className="font-semibold">Areas</span>
            </h1>

            <p className="text-warm-300 text-lg leading-relaxed mb-8">
              From the affordable sun-soaked south to the prestigious northern coastline.
              Explore our detailed guides to find your perfect corner of Costa Blanca.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-2xl font-semibold text-white">{areas.length}+</div>
                <div className="text-warm-400 text-sm">Area Guides</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">320+</div>
                <div className="text-warm-400 text-sm">Days of Sun</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">50+ km</div>
                <div className="text-warm-400 text-sm">Of Beaches</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Region Selector - South, North, Costa Cálida */}
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
                    {southData.name}
                  </h3>
                  <p className="text-accent-500 text-sm font-medium">{southData.tagline}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-primary-900">{southData.stats.averagePrice}</div>
                  <div className="text-warm-500 text-xs">Avg. Price</div>
                </div>
              </div>
              <p className="text-warm-600 text-sm mb-4 line-clamp-2">{southData.shortDescription}</p>
              <div className="flex flex-wrap gap-2">
                {southData.popularTowns.slice(0, 4).map(town => (
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
                    {northData.name}
                  </h3>
                  <p className="text-accent-500 text-sm font-medium">{northData.tagline}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-primary-900">{northData.stats.averagePrice}</div>
                  <div className="text-warm-500 text-xs">Avg. Price</div>
                </div>
              </div>
              <p className="text-warm-600 text-sm mb-4 line-clamp-2">{northData.shortDescription}</p>
              <div className="flex flex-wrap gap-2">
                {northData.popularTowns.slice(0, 4).map(town => (
                  <span key={town} className="bg-warm-200 text-warm-700 text-xs px-2 py-1 rounded">
                    {town}
                  </span>
                ))}
              </div>
            </a>

            {/* Costa Cálida Card */}
            <Link
              href="/areas/costa-calida"
              className="group relative bg-primary-900 rounded-sm p-6 border border-primary-800 hover:border-accent-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-accent-400 transition-colors">
                    Costa Cálida
                  </h3>
                  <p className="text-accent-400 text-sm font-medium">Best Value in Spain</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-white">€179,000</div>
                  <div className="text-warm-400 text-xs">Avg. Price</div>
                </div>
              </div>
              <p className="text-warm-300 text-sm mb-4 line-clamp-2">
                Murcia's Mar Menor region. Championship golf, year-round sunshine, 25-40% cheaper than Costa Blanca.
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

      {/* ============================================ */}
      {/* COSTA BLANCA SOUTH SECTION */}
      {/* ============================================ */}
      <section id="south" className="relative">
        {/* Lifestyle Header */}
        <div className="bg-warm-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-px bg-warm-500" />
                  <span className="text-warm-400 text-xs font-medium tracking-widest uppercase">
                    {southData.tagline}
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
                  <div className="text-2xl font-semibold text-white">{southData.stats.sunnyDays}</div>
                  <div className="text-warm-400 text-xs">Days of Sun</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-white">{southData.stats.golfCourses}</div>
                  <div className="text-warm-400 text-xs">Golf Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-white">{southData.stats.averagePrice}</div>
                  <div className="text-warm-400 text-xs">Avg. Price</div>
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
                    href={`/areas/${area.slug}`}
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
                            From €{area.priceRange.min.toLocaleString()}
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
                          <span className="text-warm-500">{area.propertyCount} properties</span>
                        )}
                        <span className="text-accent-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Explore
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {southData.popularTowns.map(town => (
                  <div key={town} className="bg-white p-4 rounded-sm border border-warm-200">
                    <h3 className="font-medium text-primary-900">{town}</h3>
                    <p className="text-sm text-warm-500">Area guide coming soon</p>
                  </div>
                ))}
              </div>
            )}
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

      {/* ============================================ */}
      {/* COSTA BLANCA NORTH SECTION */}
      {/* ============================================ */}
      <section id="north" className="relative">
        {/* Lifestyle Header */}
        <div className="bg-primary-900 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                    {northData.tagline}
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
                  <div className="text-2xl font-semibold text-white">{northData.stats.sunnyDays}</div>
                  <div className="text-warm-400 text-xs">Days of Sun</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-white">{northData.stats.michelinRestaurants}</div>
                  <div className="text-warm-400 text-xs">Michelin Restaurants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-white">{northData.stats.averagePrice}</div>
                  <div className="text-warm-400 text-xs">Avg. Price</div>
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
                    href={`/areas/${area.slug}`}
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
                            From €{area.priceRange.min.toLocaleString()}
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
                          <span className="text-warm-500">{area.propertyCount} properties</span>
                        )}
                        <span className="text-primary-900 font-medium flex items-center gap-1 group-hover:text-accent-600 group-hover:gap-2 transition-all">
                          Explore
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {northData.popularTowns.map(town => (
                  <div key={town} className="bg-warm-50 p-4 rounded-sm border border-primary-100">
                    <h3 className="font-medium text-primary-900">{town}</h3>
                    <p className="text-sm text-warm-500">Area guide coming soon</p>
                  </div>
                ))}
              </div>
            )}
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

      {/* ============================================ */}
      {/* LIGHT CONTACT CTA - After Costa Blanca North */}
      {/* ============================================ */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-4xl mx-auto bg-warm-50 border border-warm-200 rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-primary-900 font-medium text-lg">Want to explore developments in these areas?</p>
            <p className="text-warm-500 text-sm mt-1">Contact us for latest availability, floorplans, or to book a viewing</p>
          </div>
          <div className="flex gap-3">
            <a href="https://wa.me/34634044970" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-primary-900 text-white rounded-sm text-sm font-medium hover:bg-primary-800 transition-colors">
              WhatsApp
            </a>
            <a href="/contact" className="px-5 py-2.5 border border-primary-900 text-primary-900 rounded-sm text-sm font-medium hover:bg-primary-900 hover:text-white transition-colors">
              Contact Us
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
                More Costa Blanca Areas
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherAreas.map(area => (
                <Link
                  key={area.slug}
                  href={`/areas/${area.slug}`}
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
                          From €{area.priceRange.min.toLocaleString()}
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
                        <span className="text-warm-500">{area.propertyCount} properties</span>
                      )}
                      <span className="text-accent-500 font-medium flex items-center gap-1 group-hover:gap-2 transition-all ml-auto">
                        Explore
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

      {/* CTA */}
      <section className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Personal Service
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                Not Sure Which Area is Right for You?
              </h2>
              <p className="text-warm-300 leading-relaxed mb-6">
                With so many fantastic locations to choose from, it can be overwhelming.
                Tell us your priorities—budget, lifestyle, proximity to beach or golf—and
                we'll recommend the perfect area for you.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
                >
                  WhatsApp Us
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
                <div className="text-warm-300 text-sm">Years Local Knowledge</div>
              </div>
              <div className="bg-white/10 p-5 rounded-sm">
                <div className="text-2xl font-semibold text-white mb-1">500+</div>
                <div className="text-warm-300 text-sm">Families Helped</div>
              </div>
              <div className="bg-white/10 p-5 rounded-sm">
                <div className="text-2xl font-semibold text-white mb-1">Free</div>
                <div className="text-warm-300 text-sm">Consultation</div>
              </div>
              <div className="bg-white/10 p-5 rounded-sm">
                <div className="text-2xl font-semibold text-white mb-1">5</div>
                <div className="text-warm-300 text-sm">Languages</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-14 bg-warm-50 border-t border-warm-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900">
              Frequently Asked <span className="font-semibold">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-sm border border-warm-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-warm-50 transition-colors">
                  <h3 className="font-medium text-primary-900 pr-4 text-left">
                    {faq.question}
                  </h3>
                  <svg className="w-5 h-5 text-warm-400 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-warm-600 leading-relaxed border-t border-warm-100 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
