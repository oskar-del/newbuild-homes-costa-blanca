import Image from 'next/image';
import Link from 'next/link';
import { AreaContent, CONTACT } from '@/lib/area-utils';
import { AreaPageStrings } from '@/lib/area-i18n';
import { LifestyleBanner, ImageGrid } from '@/components/area/SectionImage';
import { getBlogPostsForArea } from '@/lib/blog-area-mapping';
import { getVideosForArea } from '@/lib/video-mapping';
import VideoCard from '@/components/VideoCard';
import AreaDevelopments from '@/components/area/AreaDevelopments';
import DayInTheLife from '@/components/area/DayInTheLife';
import InvestmentAnalysis from '@/components/area/InvestmentAnalysis';
import InteractiveAreaMap from '@/components/area/InteractiveAreaMap';
import ParallaxPropertySection from '@/components/area/ParallaxPropertySection';
import FullWidthPropertyGrid from '@/components/area/FullWidthPropertyGrid';
import {
  beachImages,
  golfImages,
  villaPoolImages,
  marketFoodImages,
  oldTownImages,
  marinaImages,
  getImageUrl,
} from '@/data/stock-images';
import { breadcrumbSchema, toJsonLd, articleSchema, placeSchema } from '@/lib/schema';
import LeadForm from '@/components/LeadForm';
import NewsletterCTA from '@/components/NewsletterCTA';

/* ═══════════════════════════════════════════════════════════════
   DATA TRANSFORMATION HELPERS
   Generate InvestmentAnalysis & InteractiveAreaMap props from
   the simpler JSON data format used by area pages.
═══════════════════════════════════════════════════════════════ */

// Known coordinates for common Costa Blanca landmarks
const KNOWN_COORDS: Record<string, [number, number]> = {
  'alicante-elche airport': [38.2822, -0.5582],
  'alicante airport': [38.2822, -0.5582],
  'alicante-elche': [38.2822, -0.5582],
  'murcia-corvera airport': [37.7749, -1.1252],
  'murcia airport': [37.7749, -1.1252],
  'hospital torrevieja': [37.9780, -0.6847],
  'hospital universitario de torrevieja': [37.9780, -0.6847],
  'hospital marina baixa': [38.5387, -0.1232],
  'hospital marina salud denia': [38.8404, 0.1066],
  'hospital vinalopó': [38.2650, -0.6980],
  'zenia boulevard': [37.9150, -0.7464],
  'habaneras shopping': [37.9786, -0.6823],
  'villamartin golf': [37.9383, -0.7725],
  'villamartín golf': [37.9383, -0.7725],
  'las ramblas golf': [37.9267, -0.7617],
  'campoamor golf': [37.9067, -0.7553],
  'la finca golf': [38.0647, -0.7928],
  'lo romero golf': [37.9567, -0.7850],
  'la marquesa golf': [38.0100, -0.8280],
  'vistabella golf': [38.0420, -0.8050],
  'la manga club': [37.6283, -0.7200],
  'el limonar international': [37.9383, -0.7925],
  'rojales sunday market': [38.0817, -0.7247],
  'ifach golf club': [38.6280, 0.0500],
  'jávea golf': [38.7750, 0.1700],
  'altea golf': [38.6050, -0.0600],
  'don cayo golf': [38.6400, -0.0350],
  'oliva nova golf': [38.9100, -0.0800],
  'la sella golf': [38.7800, 0.0100],
  'bonalba golf': [38.4100, -0.4100],
  'alicante golf': [38.3400, -0.4500],
  'asia gardens': [38.5600, -0.0700],
};

// Area center coordinate lookup (from schema.geo data)
const AREA_COORDS: Record<string, [number, number]> = {
  'torrevieja': [37.9786, -0.6823],
  'algorfa': [38.0647, -0.7928],
  'orihuela-costa': [37.9200, -0.7400],
  'villamartin': [37.9383, -0.7725],
  'la-zenia': [37.9150, -0.7464],
  'guardamar-del-segura': [38.0892, -0.6553],
  'javea': [38.7867, 0.1667],
  'calpe': [38.6450, 0.0450],
  'benidorm': [38.5411, -0.1225],
  'altea': [38.5992, -0.0517],
  'moraira': [38.6883, 0.1433],
  'denia': [38.8408, 0.1056],
  'santa-pola': [38.1908, -0.5556],
  'la-mata': [38.0134, -0.6483],
  'cabo-roig': [37.8933, -0.7383],
  'ciudad-quesada': [38.0400, -0.7600],
  'pilar-de-la-horadada': [37.8650, -0.7900],
  'los-montesinos': [38.0100, -0.7300],
  'rojales': [38.0870, -0.7247],
  'san-miguel-de-salinas': [37.9800, -0.7850],
  'campoamor': [37.8800, -0.7500],
  'punta-prima': [37.9000, -0.7300],
  'playa-flamenca': [37.9100, -0.7350],
  'los-dolses': [37.9250, -0.7350],
  'finestrat': [38.5650, -0.2200],
  'villajoyosa': [38.5100, -0.2300],
  'albir': [38.5700, -0.0700],
  'alfaz-del-pi': [38.5808, -0.1017],
  'polop': [38.6217, -0.1250],
  'benitachell': [38.7200, 0.1600],
  'pedreguer': [38.7917, 0.0367],
  'els-poblets': [38.8333, 0.0833],
  'ondara': [38.8200, 0.0250],
  'gata-de-gorgos': [38.7733, 0.0817],
  'teulada': [38.7283, 0.1100],
  'san-fulgencio': [38.1000, -0.6800],
  'dolores': [38.1400, -0.7700],
  'catral': [38.1600, -0.8000],
  'almoradi': [38.1200, -0.7900],
  'benijofar': [38.0800, -0.7300],
  'formentera-del-segura': [38.0850, -0.7150],
};

// Comparison areas by region
const SOUTH_COMPARISON_AREAS = [
  { name: 'Torrevieja', slug: 'torrevieja', avgPrice: 275000, rentalYield: 6.5, distanceToBeach: '0 min', distanceToAirport: '35 min' },
  { name: 'Orihuela Costa', slug: 'orihuela-costa', avgPrice: 320000, rentalYield: 5.8, distanceToBeach: '5 min', distanceToAirport: '40 min' },
  { name: 'Villamartín', slug: 'villamartin', avgPrice: 385000, rentalYield: 5.2, distanceToBeach: '10 min', distanceToAirport: '40 min' },
  { name: 'Guardamar', slug: 'guardamar-del-segura', avgPrice: 260000, rentalYield: 5.0, distanceToBeach: '5 min', distanceToAirport: '35 min' },
  { name: 'Santa Pola', slug: 'santa-pola', avgPrice: 250000, rentalYield: 5.5, distanceToBeach: '3 min', distanceToAirport: '20 min' },
  { name: 'La Zenia', slug: 'la-zenia', avgPrice: 350000, rentalYield: 6.0, distanceToBeach: '5 min', distanceToAirport: '45 min' },
  { name: 'Ciudad Quesada', slug: 'ciudad-quesada', avgPrice: 240000, rentalYield: 5.3, distanceToBeach: '15 min', distanceToAirport: '35 min' },
];

const NORTH_COMPARISON_AREAS = [
  { name: 'Jávea', slug: 'javea', avgPrice: 550000, rentalYield: 4.5, distanceToBeach: '5 min', distanceToAirport: '90 min' },
  { name: 'Calpe', slug: 'calpe', avgPrice: 380000, rentalYield: 5.2, distanceToBeach: '5 min', distanceToAirport: '75 min' },
  { name: 'Moraira', slug: 'moraira', avgPrice: 650000, rentalYield: 4.0, distanceToBeach: '5 min', distanceToAirport: '85 min' },
  { name: 'Altea', slug: 'altea', avgPrice: 420000, rentalYield: 4.8, distanceToBeach: '5 min', distanceToAirport: '60 min' },
  { name: 'Benidorm', slug: 'benidorm', avgPrice: 280000, rentalYield: 6.5, distanceToBeach: '5 min', distanceToAirport: '50 min' },
  { name: 'Dénia', slug: 'denia', avgPrice: 350000, rentalYield: 5.0, distanceToBeach: '5 min', distanceToAirport: '95 min' },
];

function getCenterCoordinates(data: AreaContent): [number, number] {
  // Try schema.geo first
  const geo = (data.schema as any)?.geo;
  if (geo?.latitude && geo?.longitude) {
    return [parseFloat(geo.latitude), parseFloat(geo.longitude)];
  }
  // Fallback to lookup
  return AREA_COORDS[data.slug] || [38.3, -0.5];
}

function findCoordinates(name: string, centerCoords: [number, number], type: string, index: number): [number, number] {
  const nameLower = name.toLowerCase();
  // Check known coordinates
  for (const [key, coords] of Object.entries(KNOWN_COORDS)) {
    if (nameLower.includes(key) || key.includes(nameLower)) return coords;
  }
  // Generate offsets from center based on type
  const offsets: Record<string, [number, number][]> = {
    beach: [[0.01, 0.03], [-0.005, 0.035], [0.015, 0.025], [-0.01, 0.04]],
    golf: [[-0.02, -0.01], [-0.03, 0.005], [-0.015, -0.02], [-0.025, 0.01]],
    hospital: [[0.005, 0.01], [-0.008, 0.015]],
    airport: [[0.15, 0.05], [-0.1, -0.02]],
    shopping: [[0.005, -0.005], [-0.003, 0.008]],
    school: [[-0.01, 0.005], [0.008, -0.008], [-0.005, 0.012]],
    market: [[0.01, -0.005], [-0.008, 0.01], [0.005, 0.005]],
  };
  const typeOffsets = offsets[type] || offsets.market!;
  const offset = typeOffsets[index % typeOffsets.length];
  return [centerCoords[0] + offset[0], centerCoords[1] + offset[1]];
}

function generatePriceData(data: AreaContent) {
  const { min, max } = data.priceRange;
  const types = data.propertyTypes.slice(0, 4);
  const range = max - min;
  return types.map((type, i) => {
    const factor = types.length > 1 ? i / (types.length - 1) : 0.5;
    const avgPrice = Math.round(min + range * factor);
    const low = Math.round(avgPrice * 0.85);
    const high = Math.round(avgPrice * 1.15);
    return {
      type,
      priceRange: `€${low.toLocaleString()} - €${high.toLocaleString()}`,
      avgPrice,
      trend: 'up' as const,
      trendPercent: Math.round((4 + factor * 4) * 10) / 10,
    };
  });
}

function generateComparisonAreas(data: AreaContent) {
  const isNorth = (data.region || '').toLowerCase().includes('north') ||
    ['javea', 'calpe', 'benidorm', 'altea', 'moraira', 'denia', 'albir', 'alfaz-del-pi', 'finestrat', 'villajoyosa', 'polop', 'benitachell', 'pedreguer', 'teulada', 'els-poblets', 'ondara', 'gata-de-gorgos'].includes(data.slug);
  const pool = isNorth ? NORTH_COMPARISON_AREAS : SOUTH_COMPARISON_AREAS;
  // Include current area + 3 others
  const currentInPool = pool.find(a => a.slug === data.slug);
  const others = pool.filter(a => a.slug !== data.slug).slice(0, 3);
  const current = currentInPool || {
    name: data.name,
    slug: data.slug,
    avgPrice: Math.round((data.priceRange.min + data.priceRange.max) / 2),
    rentalYield: parseFloat(data.content.investmentAnalysis?.rentalYield?.replace(/[^0-9.]/g, '') || '5.5'),
    distanceToBeach: data.externalLinks?.beaches?.length ? '5-15 min' : '10-20 min',
    distanceToAirport: data.externalLinks?.airport?.driveTime || '40 min',
  };
  return [current, ...others];
}

function parseRentalYield(yieldStr?: string) {
  // Parse "6-8%" into short/long term
  const safeStr = yieldStr || '5-6%';
  const match = safeStr.match(/(\d+)-?(\d+)?/);
  const high = match ? parseInt(match[2] || match[1]) : 6;
  const low = match ? parseInt(match[1]) : 4;
  return {
    shortTerm: `${low}-${high}%`,
    longTerm: `${Math.max(low - 2, 2)}-${Math.max(high - 2, 3)}%`,
    occupancy: high >= 7 ? '75-85%' : '65-80%',
  };
}

function generateMarketContext(data: AreaContent) {
  const isNorth = (data.region || '').toLowerCase().includes('north');
  return {
    spainOverview: `Spain remains one of Europe's most attractive property markets for international buyers. Post-pandemic demand has driven sustained price growth, particularly in coastal regions. The ${data.region || 'Costa Blanca'} benefits from excellent infrastructure, established expat communities, and year-round appeal.`,
    regionalTrends: isNorth
      ? `Costa Blanca North has seen strong demand from Scandinavian, British and German buyers. Premium areas like Jávea, Moraira and Altea command higher prices but offer exceptional quality of life with lower density and natural beauty.`
      : `Costa Blanca South has seen 8-12% annual price growth since 2021. The region offers exceptional value compared to the Northern Costa Blanca while providing the same climate, beaches and lifestyle.`,
    localDevelopments: `${data.name} continues to attract new development from established Spanish builders. Infrastructure improvements and growing international demand enhance the area's appeal.`,
    futureOutlook: `${data.name} is positioned for continued growth with strong international demand and limited new supply. The extended season and established community support long-term property values.`,
    priceGrowth5Year: isNorth ? '+35%' : '+42%',
    foreignBuyerPercent: isNorth ? '45%' : '38%',
    averageDaysOnMarket: isNorth ? '60' : '45',
  };
}

function generateMapLocations(data: AreaContent) {
  const center = getCenterCoordinates(data);
  const locations: { id: string; name: string; type: 'beach' | 'golf' | 'hospital' | 'airport' | 'shopping' | 'school' | 'market'; coordinates: [number, number]; distance?: string; description?: string; googleMapsLink?: string }[] = [];

  // Add beaches
  data.externalLinks?.beaches?.forEach((beach, i) => {
    locations.push({
      id: `beach-${i}`,
      name: beach.name,
      type: 'beach',
      coordinates: findCoordinates(beach.name, center, 'beach', i),
      description: beach.description,
      googleMapsLink: beach.googleMaps || beach.url,
    });
  });

  // Add golf courses
  data.golf?.courses?.forEach((course, i) => {
    locations.push({
      id: `golf-${i}`,
      name: course.name,
      type: 'golf',
      coordinates: findCoordinates(course.name, center, 'golf', i),
      distance: course.distance,
      description: course.description,
      googleMapsLink: course.googleMaps,
    });
  });

  // Add hospital
  if (data.externalLinks?.healthcare) {
    const h = data.externalLinks.healthcare;
    locations.push({
      id: 'hospital',
      name: h.name,
      type: 'hospital',
      coordinates: findCoordinates(h.name, center, 'hospital', 0),
      distance: h.distance,
      googleMapsLink: h.googleMaps,
    });
  }

  // Add airport
  if (data.externalLinks?.airport) {
    const a = data.externalLinks.airport;
    locations.push({
      id: 'airport',
      name: a.name,
      type: 'airport',
      coordinates: findCoordinates(a.name, center, 'airport', 0),
      distance: `${a.distance} (${a.driveTime})`,
      googleMapsLink: a.googleMaps,
    });
  }

  // Add schools
  data.content.schools?.schools?.forEach((school, i) => {
    locations.push({
      id: `school-${i}`,
      name: school.name,
      type: 'school',
      coordinates: findCoordinates(school.name, center, 'school', i),
      distance: school.distance,
      description: school.description,
    });
  });

  return locations;
}

interface DevelopmentCard {
  name: string;
  slug: string;
  propertyType: string;
  price: number | null;
  bedrooms: number | null;
  image: string;
}

// Transform DevelopmentCards into property format for ParallaxPropertySection/FullWidthPropertyGrid
function developmentsToProperties(developments: DevelopmentCard[], areaName: string) {
  return developments.map((dev, i) => ({
    reference: `DEV-${i}`,
    title: dev.name,
    price: dev.price || 0,
    type: dev.propertyType || 'Property',
    bedrooms: dev.bedrooms || 2,
    bathrooms: dev.bedrooms || 2,
    builtArea: dev.bedrooms ? dev.bedrooms * 45 + 30 : 100,
    location: areaName,
    image: dev.image || '/images/placeholder.webp',
    features: dev.propertyType === 'Villa' ? ['Private Pool', 'Garden', 'Parking'] : ['Communal Pool', 'Terrace', 'Storage'],
    status: 'key-ready' as const,
    badge: dev.propertyType === 'Villa' ? 'Villa' : 'New Build',
    slug: dev.slug,
  }));
}

interface AreaPageContentProps {
  data: AreaContent;
  developments: DevelopmentCard[];
  heroImage: string;
  lang: string;
  strings: AreaPageStrings;
  langPrefix: string; // '' for English, '/sv' for Swedish, etc.
}

function t(template: string, name: string): string {
  return template.replace(/\{name\}/g, name);
}

export default function AreaPageContent({
  data,
  developments,
  heroImage,
  lang,
  strings: s,
  langPrefix,
}: AreaPageContentProps) {
  const { content, schema, schemaFAQ, externalLinks, golf } = data;

  // Get related blog articles for this area
  const relatedBlogPosts = getBlogPostsForArea(data.slug, 3);

  // Generate breadcrumb schema
  const baseUrl = 'https://newbuildhomescostablanca.com';
  const breadcrumbs = breadcrumbSchema([
    { name: s.home, url: `${baseUrl}/` },
    { name: s.areas, url: `${baseUrl}${langPrefix}/areas/` },
    { name: data.name, url: `${baseUrl}${langPrefix}/areas/${data.slug}/` },
  ]);

  // Generate article schema for SEO
  const pageArticleSchema = articleSchema({
    headline: content.metaTitle,
    description: content.metaDescription,
    datePublished: new Date().toISOString().split('T')[0],
    author: 'New Build Homes Costa Blanca',
    url: `${baseUrl}${langPrefix}/areas/${data.slug}/`,
    image: data.heroImage,
  });

  // Generate place schema if not in data
  const areaPlaceSchema = schema && Object.keys(schema).length > 0 ? schema : placeSchema({
    name: data.name,
    description: content.heroIntro.slice(0, 200),
    url: `${baseUrl}${langPrefix}/areas/${data.slug}/`,
    image: data.heroImage,
    address: {
      region: data.region || 'Costa Blanca',
    },
    containedIn: 'Costa Blanca, Spain',
  });

  // VideoObject schema for SEO rich snippets
  const areaVideos = getVideosForArea(data.slug, 3);
  const videoSchemaData = areaVideos.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: areaVideos[0].title,
    description: areaVideos[0].description,
    thumbnailUrl: `https://img.youtube.com/vi/${areaVideos[0].youtubeId}/maxresdefault.jpg`,
    uploadDate: new Date().toISOString().split('T')[0],
    duration: areaVideos[0].duration ? `PT${areaVideos[0].duration.replace(':', 'M')}S` : undefined,
    contentUrl: `https://www.youtube.com/watch?v=${areaVideos[0].youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${areaVideos[0].youtubeId}`,
    publisher: { '@type': 'Organization', name: 'New Build Homes Costa Blanca', url: 'https://newbuildhomescostablanca.com' },
    about: {
      '@type': 'Place',
      name: data.name,
      address: { '@type': 'PostalAddress', addressLocality: data.name, addressRegion: 'Alicante', addressCountry: 'ES' },
    },
  } : null;

  // Build nav sections based on available data
  const navSections: { id: string; label: string }[] = [
    { id: 'lifestyle', label: s.theLifestyle.replace('{name}', '').trim() || 'Lifestyle' },
  ];
  if (externalLinks?.beaches && externalLinks.beaches.length > 0) navSections.push({ id: 'beaches', label: s.beachesIn.replace('{name}', '').trim() || 'Beaches' });
  if (golf && golf.courses && golf.courses.length > 0) navSections.push({ id: 'golf', label: 'Golf' });
  if (developments && developments.length > 0) navSections.push({ id: 'developments', label: s.newBuildProperties.replace('{name}', '').trim() || 'Properties' });
  if (content.costOfLiving) navSections.push({ id: 'costs', label: s.costOfLivingIn.replace('{name}', '').trim() || 'Costs' });
  if (content.schools?.schools?.length) navSections.push({ id: 'schools', label: s.schoolsNear.replace('{name}', '').trim() || 'Schools' });
  if (content.events?.events?.length) navSections.push({ id: 'events', label: s.eventsFiestas.replace('{name}', '').trim() || 'Events' });
  if (content.markets?.markets?.length) navSections.push({ id: 'markets', label: 'Markets' });
  if (content.expatCommunity) navSections.push({ id: 'expat', label: s.expatCommunity.replace('{name}', '').trim() || 'Expat Life' });
  if (content.natureActivities?.activities?.length) navSections.push({ id: 'outdoor', label: s.natureActivities || 'Nature' });
  navSections.push({ id: 'map', label: 'Map' });
  if (content.investmentAnalysis) navSections.push({ id: 'investment', label: s.investmentAnalysis || 'Investment' });
  navSections.push({ id: 'faqs', label: s.faqAbout.replace('{name}', '').trim() || 'FAQs' });

  return (
    <>
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(areaPlaceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(pageArticleSchema) }} />
      {schemaFAQ && Object.keys(schemaFAQ).length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      )}
      {videoSchemaData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchemaData) }} />}

      <main className="min-h-screen">
        {/* ═══════════════════════════════════════════════════════════════
            HERO SECTION — Full viewport, dramatic overlay
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[85vh] flex items-center bg-primary-900">
          <div className="absolute inset-0">
            <Image src={heroImage} alt={data.name} fill className="object-cover opacity-40" priority unoptimized />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/80 to-primary-900/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <nav className="text-white/60 text-sm mb-8">
              <Link href={`${langPrefix}/`} className="hover:text-white transition-colors">{s.home}</Link>
              <span className="mx-2">&rsaquo;</span>
              <Link href={`${langPrefix}/areas`} className="hover:text-white transition-colors">{s.areas}</Link>
              <span className="mx-2">&rsaquo;</span>
              <span className="text-white">{data.name}</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-block bg-accent-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                {data.region || 'Costa Blanca'}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                {t(s.livingIn, '')} <span className="font-semibold">{data.name}</span>
              </h1>

              <p className="text-xl text-warm-300 mb-4 leading-relaxed">
                {content.heroIntro.split('\n\n')[0]?.slice(0, 200) || t(s.completeGuide, data.name)}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <p className="text-white font-semibold mt-1">{data.propertyCount} {s.newBuilds}</p>
                  <p className="text-white/60 text-sm">{s.from} &euro;{data.priceRange.min.toLocaleString()}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <p className="text-white font-semibold mt-1">{data.region || 'Costa Blanca'}</p>
                  <p className="text-white/60 text-sm">Spain</p>
                </div>
                {golf && golf.courses && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <span className="text-2xl">&#9971;</span>
                    <p className="text-white font-semibold mt-1">{golf.courses.length} {s.golfCoursesNearby}</p>
                  </div>
                )}
                {externalLinks?.airport && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <p className="text-white font-semibold mt-1">{externalLinks.airport.name.split(' ')[0]}</p>
                    <p className="text-white/60 text-sm">{externalLinks.airport.driveTime}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#developments" className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                  View Properties
                </a>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-colors backdrop-blur-sm border border-white/20">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            STICKY NAVIGATION
        ═══════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-b border-warm-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-1 overflow-x-auto py-3 text-sm font-medium">
              {navSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="px-4 py-2 rounded-full hover:bg-accent-100 text-warm-600 hover:text-accent-700 whitespace-nowrap transition-colors"
                >
                  {section.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            LIFESTYLE OVERVIEW — Full-width, rich layout
        ═══════════════════════════════════════════════════════════════ */}
        <section id="lifestyle" className="py-16 bg-white scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">{s.theLifestyle.replace('{name}', '').trim() || 'The Lifestyle'}</span>
                <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-6">
                  Why People Choose <span className="font-semibold">{data.name}</span>
                </h2>

                <div className="prose prose-lg text-warm-700 max-w-none">
                  {(content.lifestyleSection?.intro || '').split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {(content.lifestyleSection?.highlights?.length ?? 0) > 0 && (
                  <div className="grid md:grid-cols-2 gap-3 mt-8">
                    {content.lifestyleSection.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-accent-50 rounded-xl">
                        <span className="text-accent-500 text-lg">✓</span>
                        <span className="text-warm-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-2 space-y-6">
                {/* At a Glance Card */}
                <div className="bg-accent-50 rounded-2xl p-6">
                  <h3 className="font-bold text-primary-900 text-lg mb-4">At a Glance</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-warm-600">{s.region}</span><span className="font-semibold text-primary-900">{data.region || 'Costa Blanca'}</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">{s.newBuilds}</span><span className="font-semibold text-primary-900">{data.propertyCount}</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">{s.priceRange}</span><span className="font-semibold text-accent-600">&euro;{data.priceRange.min.toLocaleString()} - &euro;{data.priceRange.max.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">{s.propertyTypes}</span><span className="font-semibold text-primary-900">{data.propertyTypes.slice(0, 3).join(', ')}</span></div>
                    {externalLinks?.airport && (
                      <div className="flex justify-between"><span className="text-warm-600">{s.transport}</span><span className="font-semibold text-primary-900">{externalLinks.airport.driveTime} to airport</span></div>
                    )}
                    {golf && golf.courses && (
                      <div className="flex justify-between"><span className="text-warm-600">{s.golfCourses}</span><span className="font-semibold text-primary-900">{golf.courses.length} {s.nearby}</span></div>
                    )}
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-2xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-2">Free 30-Min Consultation</h3>
                  <p className="text-warm-200 text-sm mb-4">
                    Speak with an experienced agent with 12+ years selling new builds on the Costa Blanca. Get honest advice about {data.name}.
                  </p>
                  <Link
                    href={`${langPrefix}/consultation`}
                    className="block w-full bg-accent-500 hover:bg-accent-600 text-white text-center py-3 rounded-lg font-semibold transition-colors mb-3"
                  >
                    Book Free Consultation
                  </Link>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-center py-3 rounded-lg font-medium transition-colors"
                  >
                    Or WhatsApp Us
                  </a>
                </div>

                {/* Tourism Link */}
                {externalLinks?.tourism?.url && (
                  <div className="bg-warm-50 rounded-2xl p-6">
                    <a href={externalLinks.tourism.url} target="_blank" rel="noopener noreferrer"
                      className="text-accent-600 hover:underline font-medium text-sm">
                      {t(s.officialTourism, data.name)} &rarr;
                    </a>
                  </div>
                )}

                {/* Golf Courses Sidebar — matches Algorfa style with featured course */}
                {golf && golf.courses && golf.courses.length > 0 && (
                  <div className="bg-warm-50 rounded-2xl p-6">
                    <h3 className="font-bold text-primary-900 text-lg mb-4">{s.golfCourses} {s.nearby}</h3>

                    {/* Featured Course Card */}
                    {golf.courses[0] && (
                      <Link href={`${langPrefix}/golf`} className="block bg-accent-500 text-white rounded-xl p-4 mb-4 hover:bg-accent-600 transition-colors group">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wide text-white/80">Featured Course</span>
                            <h4 className="font-bold text-lg">{golf.courses[0].name}</h4>
                            {golf.courses[0].description && (
                              <p className="text-white/80 text-sm mt-1 line-clamp-2">{golf.courses[0].description}</p>
                            )}
                          </div>
                          <span className="text-white/60 group-hover:text-white transition-colors">&rarr;</span>
                        </div>
                        <div className="flex gap-3 mt-3 text-xs">
                          <span className="bg-white/20 px-2 py-1 rounded">{golf.courses[0].holes} Holes</span>
                          <span className="bg-white/20 px-2 py-1 rounded">{golf.courses[0].distance}</span>
                        </div>
                      </Link>
                    )}

                    {/* Other courses */}
                    <div className="space-y-2">
                      {golf.courses.slice(1, 4).map((course, i) => (
                        <div key={i} className="flex justify-between items-center hover:bg-warm-100 rounded-lg p-2 -mx-2 transition-colors">
                          <span className="text-warm-700">{course.name}</span>
                          <span className="text-warm-500 text-sm">{course.holes}H &bull; {course.distance}</span>
                        </div>
                      ))}
                    </div>
                    <Link href={`${langPrefix}/golf`} className="block text-center text-accent-600 hover:text-accent-700 font-medium text-sm mt-4 pt-3 border-t border-warm-200">
                      View All Golf Courses &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            BEACHES — with cards and Google Maps links
        ═══════════════════════════════════════════════════════════════ */}
        {externalLinks?.beaches && externalLinks.beaches.length > 0 && (
          <section id="beaches" className="scroll-mt-16">
            {/* Beach Image Banner */}
            <div className="relative h-64 md:h-80">
              <Image
                src={getImageUrl(beachImages[0], 1920)}
                alt={beachImages[0].alt}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/70 to-primary-900/40" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full">
                  <span className="text-accent-400 text-sm font-semibold uppercase tracking-wide">Coast & Sea</span>
                  <h2 className="text-3xl lg:text-4xl font-light text-white mt-2 mb-4">
                    {t(s.beachesIn, data.name)}
                  </h2>
                  <p className="text-warm-300 text-lg max-w-2xl">{content.amenitiesSection?.beaches}</p>
                </div>
              </div>
            </div>

            <div className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {externalLinks.beaches.map((beach, i) => (
                    <a key={i} href={beach.googleMaps || beach.url || '#'} target="_blank" rel="noopener noreferrer"
                      className="group bg-warm-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-40">
                        <Image src={getImageUrl(beachImages[i % beachImages.length], 600)} alt={`${beach.name} beach`} fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-3 left-3 text-white font-semibold">{beach.name}</span>
                      </div>
                      <div className="p-4">
                        {beach.description && <p className="text-warm-600 text-sm mb-2">{beach.description}</p>}
                        <span className="text-accent-600 text-sm font-medium">{s.viewOnGoogleMaps} &rarr;</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            GOLF SECTION — Full-width courses
        ═══════════════════════════════════════════════════════════════ */}
        {golf && golf.courses && golf.courses.length > 0 && (
          <section id="golf" className="py-16 bg-warm-50 scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Golf</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
                {t(s.golfNear, data.name)}
              </h2>
              {golf.intro && <p className="text-warm-600 text-lg mb-10 max-w-3xl">{golf.intro}</p>}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {golf.courses.map((course, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <div className="relative h-40">
                      <Image src={getImageUrl(golfImages[i % golfImages.length], 600)} alt={`${course.name} golf course`} fill className="object-cover" unoptimized />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-bold text-white text-lg">{course.name}</h3>
                        <p className="text-white/80 text-sm">{course.holes} {s.holes} &bull; {course.distance}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      {course.description && <p className="text-warm-600 text-sm mb-3">{course.description}</p>}
                      <div className="flex gap-2">
                        {course.url && (
                          <a href={course.url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-success-500 hover:bg-success-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            {s.website}
                          </a>
                        )}
                        {course.googleMaps && (
                          <a href={course.googleMaps} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            {s.directions}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            DEVELOPMENTS — What's Being Built (always show)
        ═══════════════════════════════════════════════════════════════ */}
        <div id="developments" className="scroll-mt-16">
          <AreaDevelopments
            areaName={data.name}
            areaSlug={data.slug}
            maxDevelopments={6}
            showLifestyleGuide={true}
            relatedBlogPosts={relatedBlogPosts.map(post => ({
              slug: post.slug,
              title: post.title,
              description: post.description,
            }))}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PROPERTIES — ParallaxPropertySection (Golf/Featured Properties)
            Same component as Algorfa page
        ═══════════════════════════════════════════════════════════════ */}
        {developments && developments.length > 0 && (
          <ParallaxPropertySection
            title={`Properties in ${data.name}`}
            subtitle="Featured New Builds"
            narrative={`New build developments in ${data.name} offer modern Mediterranean homes with communal or private pools, quality finishes, and excellent value. From apartments to luxury villas, there are options for every budget and lifestyle.`}
            backgroundImage={heroImage}
            properties={developmentsToProperties(developments.slice(0, 6), data.name)}
            ctaText="View All Properties"
            ctaLink={`${langPrefix}/developments?area=${data.slug}`}
            theme="dark"
          />
        )}

        {/* ═══════════════════════════════════════════════════════════════
            CONSULTATION CTA — Mid-page (matching Algorfa)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-12 bg-gradient-to-r from-accent-500 to-primary-800">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h3 className="text-2xl font-light mb-3">Want to See {data.name} for Yourself?</h3>
            <p className="text-white/80 mb-6">Book a free 30-minute consultation with our team. 12+ years of experience helping buyers find their perfect home in Costa Blanca.</p>
            <Link href={`${langPrefix}/consultation`} className="inline-flex items-center gap-2 bg-white text-primary-900 hover:bg-warm-50 px-8 py-4 rounded-lg font-semibold transition-colors">
              Book Free Consultation
            </Link>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            AMENITIES — Healthcare, Transport, Shopping
        ═══════════════════════════════════════════════════════════════ */}
        {content.amenitiesSection && (
        <section className="py-16 bg-warm-50 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Essential Amenities</span>
            <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
              {s.amenitiesServices}
            </h2>
            <p className="text-warm-600 text-lg mb-10 max-w-3xl">
              {t(s.diningMarketsDesc, data.name)}
            </p>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Dining Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">&#127860;</span>
                  <h3 className="font-bold text-primary-900 text-xl">{s.dining}</h3>
                </div>
                <p className="text-warm-600 text-sm">{content.amenitiesSection?.dining}</p>
              </div>

              {/* Healthcare Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">&#127973;</span>
                  <h3 className="font-bold text-primary-900 text-xl">{s.healthcare}</h3>
                </div>
                <p className="text-warm-600 text-sm mb-3">{content.amenitiesSection?.healthcare}</p>
                {externalLinks?.healthcare && (
                  <div className="bg-warm-50 rounded-xl p-3">
                    <p className="font-semibold text-primary-900 text-sm">{externalLinks.healthcare.name}</p>
                    <p className="text-warm-500 text-xs mb-2">{externalLinks.healthcare.distance}</p>
                    <a href={externalLinks.healthcare.googleMaps} target="_blank" rel="noopener noreferrer"
                      className="text-accent-600 hover:text-accent-700 text-xs font-medium">
                      View on Map &rarr;
                    </a>
                  </div>
                )}
              </div>

              {/* Transport Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">&#9992;&#65039;</span>
                  <h3 className="font-bold text-primary-900 text-xl">{s.transport}</h3>
                </div>
                <p className="text-warm-600 text-sm mb-3">{content.amenitiesSection?.transport}</p>
                {externalLinks?.airport && (
                  <div className="bg-warm-50 rounded-xl p-3">
                    <p className="font-semibold text-primary-900 text-sm">{externalLinks.airport.name}</p>
                    <p className="text-warm-500 text-xs mb-2">{externalLinks.airport.distance} ({externalLinks.airport.driveTime})</p>
                    <a href={externalLinks.airport.googleMaps} target="_blank" rel="noopener noreferrer"
                      className="text-accent-600 hover:text-accent-700 text-xs font-medium">
                      View on Map &rarr;
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Shopping row */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">&#128717;&#65039;</span>
                <h3 className="font-bold text-primary-900 text-xl">{s.shopping}</h3>
              </div>
              <p className="text-warm-600">{content.amenitiesSection?.shopping}</p>
            </div>
          </div>
        </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            PROPERTY MARKET
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-white scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Property Market</span>
            <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-6">
              {t(s.propertyMarketIn, data.name)}
            </h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              {(content.propertyMarketSection || '').split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            INVESTMENT ANALYSIS — Using real InvestmentAnalysis component
            (same component as Algorfa page with comparison tables)
        ═══════════════════════════════════════════════════════════════ */}
        {content.investmentAnalysis && content.investmentAnalysis.overview && (
          <InvestmentAnalysis
            areaName={data.name}
            priceData={generatePriceData(data)}
            comparisonAreas={generateComparisonAreas(data)}
            rentalYield={parseRentalYield(content.investmentAnalysis.rentalYield)}
            investmentHighlights={content.investmentAnalysis.highlights || []}
            marketInsight={content.investmentAnalysis.overview}
            marketContext={generateMarketContext(data)}
          />
        )}

        {/* ═══════════════════════════════════════════════════════════════
            COST OF LIVING — Card grid with summary
        ═══════════════════════════════════════════════════════════════ */}
        {content.costOfLiving && (
          <section id="costs" className="py-16 bg-white scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Finances</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
                {t(s.costOfLivingIn, data.name)}
              </h2>
              <p className="text-warm-600 text-lg mb-10 max-w-3xl">{content.costOfLiving.intro}</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {content.costOfLiving.items.map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                    <h3 className="font-semibold text-primary-900 mb-1">{item.category}</h3>
                    <p className="text-accent-600 font-bold text-lg mb-2">{item.cost}</p>
                    <p className="text-warm-500 text-sm">{item.notes}</p>
                  </div>
                ))}
              </div>

              {/* Budget Summary Card — matches Algorfa */}
              <div className="bg-accent-500 text-white rounded-2xl p-8">
                <h3 className="font-bold text-xl mb-4">Budget Summary for a Couple</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-white/70 text-sm uppercase tracking-wide mb-1">Comfortable Living</p>
                    <p className="text-3xl font-bold">&euro;1,500-2,000<span className="text-lg font-normal">/month</span></p>
                    <p className="text-white/70 text-sm mt-1">Excluding mortgage/rent</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm uppercase tracking-wide mb-1">Including Activities</p>
                    <p className="text-3xl font-bold">&euro;1,800-2,500<span className="text-lg font-normal">/month</span></p>
                    <p className="text-white/70 text-sm mt-1">Dining, sports, social</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm uppercase tracking-wide mb-1">vs. Northern Europe</p>
                    <p className="text-3xl font-bold">30-40%<span className="text-lg font-normal"> less</span></p>
                    <p className="text-white/70 text-sm mt-1">Lower taxes, food, dining</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            LIFESTYLE TIMELINE (Day in the Life)
        ═══════════════════════════════════════════════════════════════ */}
        {(content.lifestyleTimeline?.entries?.length ?? 0) > 0 && (
          <DayInTheLife
            areaName={data.name}
            intro={content.lifestyleTimeline!.title || t(s.typicalDay, data.name)}
            timeline={content.lifestyleTimeline!.entries.map(entry => ({
              time: entry.time,
              title: entry.activity,
              description: entry.description,
              icon: '',
            }))}
            ctaText={`Find Your Home in ${data.name}`}
            ctaLink={`${langPrefix}/areas/${data.slug}#developments`}
          />
        )}

        {/* ═══════════════════════════════════════════════════════════════
            SCHOOLS — Rich card layout matching Algorfa
            Shows curriculum, fees, ages, location, url when available
        ═══════════════════════════════════════════════════════════════ */}
        {(content.schools?.schools?.length ?? 0) > 0 && (
          <section id="schools" className="py-16 bg-white scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Education</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
                {t(s.schoolsNear, data.name)}
              </h2>
              <p className="text-warm-600 text-lg mb-10 max-w-3xl">{content.schools!.intro}</p>

              <div className="grid md:grid-cols-2 gap-6">
                {content.schools!.schools.map((school, i) => (
                  <div key={i} className="bg-warm-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-primary-900 text-lg">{school.name}</h3>
                        <p className="text-accent-600 text-sm font-medium">{school.type}</p>
                      </div>
                      <span className="bg-white text-warm-600 text-sm px-3 py-1 rounded-full">{school.distance}</span>
                    </div>
                    {/* Rich detail grid - matches Algorfa school cards */}
                    {(school.curriculum || school.fees || school.ages || school.location) && (
                      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                        {school.curriculum && <div><span className="text-warm-500">Curriculum:</span> <span className="text-warm-700">{school.curriculum}</span></div>}
                        {school.ages && <div><span className="text-warm-500">Ages:</span> <span className="text-warm-700">{school.ages}</span></div>}
                        {school.fees && <div><span className="text-warm-500">Fees:</span> <span className="text-warm-700">{school.fees}</span></div>}
                        {school.location && <div><span className="text-warm-500">Location:</span> <span className="text-warm-700">{school.location}</span></div>}
                      </div>
                    )}
                    <p className="text-warm-600 text-sm">{school.note || school.description}</p>
                    {school.url && (
                      <a href={school.url} target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-700 text-sm font-medium mt-3 inline-block">
                        Visit website &rarr;
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            EVENTS & FIESTAS — Grid of event cards
        ═══════════════════════════════════════════════════════════════ */}
        {(content.events?.events?.length ?? 0) > 0 && (
          <section id="events" className="py-16 bg-warm-50 scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Culture</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
                {t(s.eventsFiestas, data.name)}
              </h2>
              <p className="text-warm-600 text-lg mb-10 max-w-3xl">{content.events!.intro}</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.events!.events.map((event, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-accent-600 text-sm font-medium mb-2">{event.month}</p>
                    <h3 className="font-bold text-primary-900 text-lg mb-2">{event.name}</h3>
                    <p className="text-warm-600 text-sm">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            MARKETS — Day/time cards with Google Maps (matches Algorfa)
        ═══════════════════════════════════════════════════════════════ */}
        {(content.markets?.markets?.length ?? 0) > 0 && (
          <section id="markets" className="scroll-mt-16">
            <div className="relative h-64 md:h-80">
              <Image
                src={getImageUrl(marketFoodImages[0], 1920)}
                alt={marketFoodImages[0].alt}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/70 to-primary-900/40" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full">
                  <span className="text-accent-400 text-sm font-semibold uppercase tracking-wide">Shopping &amp; Social</span>
                  <h2 className="text-3xl lg:text-4xl font-light text-white mt-2 mb-4">
                    Local <span className="font-semibold">Markets</span>
                  </h2>
                  <p className="text-warm-300 text-lg max-w-2xl">{content.markets!.intro}</p>
                </div>
              </div>
            </div>

            <div className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {content.markets!.markets.map((market, i) => (
                    <div key={i} className="flex gap-4 bg-warm-50 rounded-xl p-5">
                      <div className="flex-shrink-0 w-16 h-16 bg-accent-100 rounded-xl flex flex-col items-center justify-center">
                        <span className="text-accent-700 text-xs font-bold uppercase">{market.day.slice(0, 3)}</span>
                        <span className="text-accent-600 text-lg">&#128722;</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-primary-900">{market.name}</h3>
                        <p className="text-warm-500 text-sm mb-2">{market.time}{market.distance ? ` • ${market.distance} drive` : ''}</p>
                        <p className="text-warm-600 text-sm mb-2">{market.description}</p>
                        {market.googleMaps && (
                          <a href={market.googleMaps} target="_blank" rel="noopener noreferrer"
                            className="text-accent-600 hover:text-accent-700 text-sm font-medium inline-flex items-center gap-1">
                            &#128205; Get Directions
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            EXPAT COMMUNITY — Two-column rich layout
        ═══════════════════════════════════════════════════════════════ */}
        {content.expatCommunity && (
          <section id="expat" className="py-16 bg-white scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Community</span>
                  <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-6">
                    {t(s.expatCommunity, data.name)}
                  </h2>
                  <div className="prose prose-lg text-warm-700 max-w-none">
                    {(content.expatCommunity?.intro || '').split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {(content.expatCommunity?.nationalities?.length ?? 0) > 0 && (
                    <div className="bg-warm-50 rounded-2xl p-6">
                      <h3 className="font-bold text-primary-900 mb-4">{s.internationalCommunity}</h3>
                      <div className="flex flex-wrap gap-2">
                        {content.expatCommunity!.nationalities.map((nat, i) => (
                          <span key={i} className="bg-white text-warm-700 text-sm px-3 py-1 rounded-full">
                            {nat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {(content.expatCommunity?.highlights?.length ?? 0) > 0 && (
                    <div className="bg-warm-50 rounded-2xl p-6">
                      <h3 className="font-bold text-primary-900 mb-4">Community Highlights</h3>
                      <div className="space-y-3">
                        {content.expatCommunity!.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="text-accent-500">&#10003;</span>
                            <span className="text-warm-700 text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(content.expatCommunity?.facebookGroups?.length ?? 0) > 0 && (
                    <div className="bg-warm-50 rounded-2xl p-6">
                      <h3 className="font-bold text-primary-900 mb-4">Facebook Groups</h3>
                      <div className="space-y-2">
                        {content.expatCommunity!.facebookGroups!.map((group: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 text-warm-700 text-sm">
                            <span className="text-blue-500">f</span>
                            <span>{group}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(content.expatCommunity?.socialClubs?.length ?? 0) > 0 && (
                    <div className="bg-warm-50 rounded-2xl p-6">
                      <h3 className="font-bold text-primary-900 mb-4">Social Clubs & Activities</h3>
                      <div className="space-y-2">
                        {content.expatCommunity!.socialClubs!.map((club: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 text-warm-700 text-sm">
                            <span className="text-accent-500">●</span>
                            <span>{club}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            NATURE & OUTDOOR ACTIVITIES
        ═══════════════════════════════════════════════════════════════ */}
        {(content.natureActivities?.activities?.length ?? 0) > 0 && (
          <section id="outdoor" className="py-16 bg-warm-50 scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Beyond the Property</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
                {s.natureActivities}
              </h2>
              <p className="text-warm-600 text-lg mb-10 max-w-3xl">{content.natureActivities!.intro}</p>

              {/* Lifestyle Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[golfImages[0], beachImages[3], marinaImages[0], oldTownImages[0]].map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                    <Image
                      src={getImageUrl(img, 600)}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white font-semibold text-sm">
                      {['Golf', 'Beaches', 'Sailing', 'Old Towns'][i]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.natureActivities!.activities.map((activity, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-primary-900">{activity.name}</h3>
                      <span className="bg-accent-100 text-accent-700 text-xs px-2 py-1 rounded-full">{activity.type}</span>
                    </div>
                    <p className="text-warm-600 text-sm">{activity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            INTERACTIVE AREA MAP — Using real InteractiveAreaMap with Leaflet
            (same component as Algorfa page with clickable markers)
        ═══════════════════════════════════════════════════════════════ */}
        <InteractiveAreaMap
          areaName={data.name}
          centerCoordinates={getCenterCoordinates(data)}
          zoom={12}
          locations={generateMapLocations(data)}
        />

        {/* ═══════════════════════════════════════════════════════════════
            VIDEO TOURS
        ═══════════════════════════════════════════════════════════════ */}
        {(() => {
          if (areaVideos.length === 0) return null;

          if (areaVideos.length === 1) {
            const video = areaVideos[0];
            return (
              <section className="py-16 bg-primary-900">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-white">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-accent-500" />
                        <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">{s.videoTour}</span>
                      </div>
                      <h2 className="text-3xl font-light mb-4">{t(s.exploreInVideo, data.name)}</h2>
                      <p className="text-warm-200 mb-6 leading-relaxed">{video.description}</p>
                      <div className="flex items-center gap-2 text-warm-300 text-sm">
                        <span className="inline-block bg-accent-500 rounded-full px-3 py-1">{video.category}</span>
                        {video.duration && <span>{video.duration}</span>}
                      </div>
                    </div>
                    <div><VideoCard {...video} variant="hero" /></div>
                  </div>
                </div>
              </section>
            );
          }

          return (
            <section className="py-16 bg-warm-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-8">
                  <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">{s.videoTours}</span>
                  <h2 className="text-3xl font-light text-primary-900 mt-2">
                    {s.videoTours} {data.name}
                  </h2>
                </div>
                <div className={`grid grid-cols-1 ${areaVideos.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
                  {areaVideos.map((video) => (
                    <VideoCard key={video.slug} {...video} variant="card" />
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* ═══════════════════════════════════════════════════════════════
            FULL WIDTH PROPERTY GRID — Same component as Algorfa
        ═══════════════════════════════════════════════════════════════ */}
        {developments && developments.length > 0 && (
          <div id="properties">
            <FullWidthPropertyGrid
              title={`Properties in ${data.name}`}
              subtitle="New Build Homes"
              properties={developmentsToProperties(developments.slice(0, 6), data.name)}
              showFilters={true}
              columns={3}
              ctaText="View All Properties"
              ctaLink={`${langPrefix}/developments?area=${data.slug}`}
              theme="light"
            />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            RELATED BLOG ARTICLES
        ═══════════════════════════════════════════════════════════════ */}
        {relatedBlogPosts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl font-light text-primary-900 mb-8">
                {t(s.guidesForBuying, data.name)}
              </h2>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                  {relatedBlogPosts.map(post => (
                    <Link key={post.slug} href={`${langPrefix}/blog/${post.slug}`}
                      className="flex-shrink-0 w-80 bg-warm-50 rounded-2xl p-6 hover:shadow-md transition-shadow group snap-start">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-accent-100 text-accent-800 px-2 py-0.5 rounded text-xs font-medium">{post.category}</span>
                        <span className="text-warm-400 text-xs">{post.readTime} {s.minRead}</span>
                      </div>
                      <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-warm-500 text-sm line-clamp-2">{post.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            WHY LIVE HERE
        ═══════════════════════════════════════════════════════════════ */}
        {(content.whyLiveHereSection?.length ?? 0) > 0 && (
          <section className="py-16 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Summary</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-8">
                {t(s.whyLiveIn, data.name)}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {(content.whyLiveHereSection || []).map((reason, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
                    <span className="flex-shrink-0 w-10 h-10 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold">{i + 1}</span>
                    <span className="text-warm-700">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            INLINE LEAD FORM — Full-width
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-8">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Get In Touch</span>
              <h2 className="text-3xl font-light text-primary-900 mt-2">
                Interested in {data.name}?
              </h2>
              <p className="text-warm-600 mt-3">Tell us what you are looking for and we will get back to you within 24 hours.</p>
            </div>
            <div className="bg-warm-50 rounded-2xl p-8">
              <LeadForm
                area={data.name}
                language={lang}
                formType="Area Inquiry"
                sourcePage={`${langPrefix}/areas/${data.slug}`}
                budgetRange={`€${data.priceRange.min.toLocaleString()} - €${data.priceRange.max.toLocaleString()}`}
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FAQs — Centered, dramatic
        ═══════════════════════════════════════════════════════════════ */}
        {(content.faqs?.length ?? 0) > 0 && (
          <section id="faqs" className="py-16 bg-warm-50 scroll-mt-16">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-12">
                <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Questions Answered</span>
                <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2">
                  {t(s.faqAbout, data.name)}
                </h2>
              </div>

              <div className="space-y-4">
                {content.faqs.map((faq, i) => (
                  <details key={i} className="group border border-warm-200 rounded-xl overflow-hidden bg-white">
                    <summary className="flex justify-between items-center cursor-pointer p-5 font-semibold text-primary-900 hover:bg-warm-50 transition-colors">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-warm-400 group-open:rotate-180 transition-transform">&#9660;</span>
                    </summary>
                    <div className="px-5 pb-5 text-warm-700 leading-relaxed border-t border-warm-100 pt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            NEWSLETTER
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <NewsletterCTA
              type="area"
              areaName={data.name}
              language={lang}
              sourcePage={`${langPrefix}/areas/${data.slug}`}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FINAL CTA — Dramatic gradient
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
              Ready to Explore <span className="font-semibold">{data.name}?</span>
            </h2>
            <p className="text-warm-300 text-lg mb-8 max-w-2xl mx-auto">
              {content.conclusion}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href={`${langPrefix}/consultation`} className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2">
                Book Free Consultation
              </Link>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2">
                WhatsApp
              </a>
              <a href={`tel:${CONTACT.phone}`} className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-white/20">
                {CONTACT.phone}
              </a>
            </div>

            <div className="pt-8 border-t border-white/20">
              <p className="text-warm-400 text-sm mb-4">{s.exploreOtherAreas}</p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href={`${langPrefix}/areas/torrevieja`} className="text-white/70 hover:text-white transition-colors">Torrevieja &rarr;</Link>
                <Link href={`${langPrefix}/areas/javea`} className="text-white/70 hover:text-white transition-colors">J&aacute;vea &rarr;</Link>
                <Link href={`${langPrefix}/areas/moraira`} className="text-white/70 hover:text-white transition-colors">Moraira &rarr;</Link>
                <Link href={`${langPrefix}/areas/benidorm`} className="text-white/70 hover:text-white transition-colors">Benidorm &rarr;</Link>
                <Link href={`${langPrefix}/areas/calpe`} className="text-white/70 hover:text-white transition-colors">Calpe &rarr;</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
