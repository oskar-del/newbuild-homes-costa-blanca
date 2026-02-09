// ISR: Regenerate every hour
export const revalidate = 3600;

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchXMLFeed, ParsedProperty } from '@/lib/xml-parser';
import { getRegionForTown, REGIONS, normalizeTownName } from '@/lib/feed-config';
import PropertyFilters from '@/components/PropertyFilters';
import SortDropdown from '@/components/SortDropdown';
import PropertySearch from '@/components/PropertySearch';
import { collectionPageSchema, breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'New Build Properties Costa Blanca | Villas & Houses for Sale',
  description: 'Browse 1000+ new build villas and houses for sale across Costa Blanca. From sunny south beaches to prestigious north coastline. Find your Spanish dream home.',
  openGraph: {
    title: 'New Build Properties Costa Blanca | Villas & Houses for Sale',
    description: 'Browse 1000+ new build villas and houses for sale across Costa Blanca. From sunny south beaches to prestigious north coastline.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/properties',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Build Properties Costa Blanca | Villas & Houses for Sale',
    description: 'Browse 1000+ new build villas and houses for sale across Costa Blanca.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/properties',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/properties',
      'sv': 'https://newbuildhomescostablanca.com/sv/properties',
    },
  },
};

// Town lifestyle data for filtered views
const TOWN_DATA: Record<string, { tagline: string; highlights: string[]; image: string }> = {
  'Javea': {
    tagline: 'Where mountains meet the Mediterranean',
    highlights: ['Arenal sandy beach', 'Historic old town', 'Montgó Natural Park', '300+ sunshine days'],
    image: '/images/areas/javea-hero.jpg',
  },
  'Moraira': {
    tagline: 'Exclusive coastal elegance',
    highlights: ['Pristine coves', 'Yacht club marina', 'Michelin dining', 'Low-density luxury'],
    image: '/images/areas/moraira-hero.jpg',
  },
  'Calpe': {
    tagline: 'Iconic Peñón, endless possibilities',
    highlights: ['Peñón de Ifach landmark', 'Two sandy beaches', 'Vibrant town center', 'Great value'],
    image: '/images/areas/calpe-hero.jpg',
  },
  'Torrevieja': {
    tagline: 'Sun-soaked southern living',
    highlights: ['Salt lakes & nature', 'Year-round expat community', 'Excellent healthcare', 'Budget-friendly'],
    image: '/images/areas/torrevieja-hero.jpg',
  },
  'Benidorm': {
    tagline: 'The Costa Blanca capital',
    highlights: ['Vibrant nightlife', 'Award-winning beaches', 'Theme parks nearby', 'Great transport links'],
    image: '/images/areas/benidorm-hero.jpg',
  },
  'Altea': {
    tagline: 'The artistic heart of the coast',
    highlights: ['Whitewashed old town', 'Art galleries', 'Sunset views', 'Cultural events'],
    image: '/images/areas/altea-hero.jpg',
  },
  'Orihuela Costa': {
    tagline: 'Golf, beaches & community',
    highlights: ['5 golf courses', 'Blue flag beaches', 'Established community', 'Great amenities'],
    image: '/images/areas/orihuela-costa-hero.jpg',
  },
};

// Regional categories
const SOUTH_TOWNS = ['torrevieja', 'orihuela costa', 'guardamar', 'pilar de la horadada', 'la zenia', 'cabo roig', 'playa flamenca', 'punta prima', 'villamartin', 'los montesinos', 'san miguel'];
const NORTH_TOWNS = ['javea', 'moraira', 'calpe', 'altea', 'benidorm', 'denia', 'benissa', 'benitachell', 'cumbre del sol', 'teulada'];
const GOLF_KEYWORDS = ['golf', 'la finca', 'villamartin', 'las colinas', 'campoamor', 'las ramblas', 'vistabella', 'algorfa'];
const INLAND_TOWNS = ['algorfa', 'rojales', 'ciudad quesada', 'benijofar', 'san fulgencio', 'jalon', 'orba', 'pedreguer'];
const COSTA_CALIDA_TOWNS = ['san javier', 'san pedro del pinatar', 'santiago de la ribera', 'los alcazares', 'la manga', 'cartagena', 'mazarron', 'puerto de mazarron', 'aguilas', 'torre pacheco', 'sucina', 'roldan', 'murcia'];

const MAIN_PAGE_FAQS = [
  {
    question: 'Why buy a new build property in Spain?',
    answer: 'New build properties in Spain offer modern energy-efficient designs, 10-year structural warranties, customization options during construction, and lower maintenance costs. They typically include communal amenities like pools and gardens, come with full legal guarantees through bank-backed deposits, and often appreciate faster than resale properties during the first years.'
  },
  {
    question: 'How much does it cost to buy a new build in Costa Blanca?',
    answer: 'New build prices in Costa Blanca range from around €150,000 for apartments in southern areas like Torrevieja to over €2 million for luxury villas in Jávea or Moraira. Budget for an additional 10-13% on top of the purchase price for taxes, notary fees, legal costs, and registry fees. Non-resident buyers typically need a 30-40% deposit for mortgage financing.'
  },
  {
    question: 'What is the difference between Costa Blanca North and South?',
    answer: 'Costa Blanca South (Torrevieja to Pilar de la Horadada) offers more affordable properties, established expat communities, and year-round sunshine with less rainfall. Costa Blanca North (Jávea to Benidorm) is the premium market with dramatic mountain coastline, higher property prices, more authentic Spanish culture, and greener landscapes. Both areas enjoy 300+ sunshine days per year.'
  },
  {
    question: 'What does key-ready mean for a new build?',
    answer: 'A key-ready property is a new build that is fully completed and available for immediate occupation. You can view the finished property before purchasing, avoid construction delays, and move in within weeks of completing the purchase. Key-ready homes still come with full new build warranties and guarantees from the developer.'
  },
  {
    question: 'Can non-EU citizens buy property in Spain?',
    answer: 'Yes, there are no restrictions on non-EU citizens buying property in Spain. You will need a NIE number (tax identification number for foreigners), which your lawyer can arrange. Purchases over €500,000 may qualify for Spain\'s Golden Visa residency program. The buying process typically takes 4-8 weeks from reservation to completion.'
  },
  {
    question: 'What ongoing costs should I expect as a property owner in Spain?',
    answer: 'Annual costs include IBI property tax (€300-€1,500 depending on value), community fees for shared amenities (€50-€200/month), home insurance (€200-€500/year), and utility connections. Non-resident owners also pay annual income tax on deemed rental income. Total annual running costs typically range from €2,000-€5,000 depending on property size and location.'
  },
  {
    question: 'Is Costa Blanca property a good investment?',
    answer: 'Costa Blanca property has shown consistent appreciation of 3-6% annually in recent years, with rental yields of 5-8% in popular tourist areas. Strong demand from Northern European buyers, limited new land for development, excellent transport links via Alicante-Elche Airport, and year-round rental potential make it an attractive investment. The region benefits from 300+ days of sunshine and established tourism infrastructure.'
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function hasPool(property: ParsedProperty): boolean {
  const desc = (property.description || '').toLowerCase();
  return desc.includes('pool') || desc.includes('piscina');
}

function isPropertyKeyReady(property: ParsedProperty): boolean {
  const desc = (property.description || '').toLowerCase();
  const status = (property.status || '').toLowerCase();
  return desc.includes('key ready') || desc.includes('keys ready') || desc.includes('key-ready') ||
         desc.includes('ready to move') || desc.includes('immediate delivery') || desc.includes('entrega inmediata') ||
         desc.includes('keys in hand') || status.includes('key ready') || status.includes('key-ready');
}

function getFeaturedProperties(properties: ParsedProperty[], count: number = 6): ParsedProperty[] {
  const keyReady = properties.filter(p => isPropertyKeyReady(p));
  const others = properties.filter(p => !isPropertyKeyReady(p));
  const firstRow = keyReady.slice(0, Math.min(3, Math.ceil(count / 2)));
  const remaining = count - firstRow.length;
  const secondRow = [...others, ...keyReady.slice(firstRow.length)].slice(0, remaining);
  return [...firstRow, ...secondRow];
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { town?: string; beds?: string; type?: string; sort?: string; region?: string };
}) {
  const allProperties = await fetchXMLFeed();

  // Get unique values for filters - normalize town names to merge duplicates
  const towns = [...new Set(allProperties.map(p => {
    const normalized = normalizeTownName(p.town || '');
    return normalized.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }).filter(Boolean))].sort();
  const types = [...new Set(allProperties.map(p => p.propertyType).filter(Boolean))].sort();
  const bedOptions = [...new Set(allProperties.map(p => p.bedrooms).filter((b): b is number => b !== null && b > 0))].sort((a, b) => a - b);

  // Check if we have filters applied
  const hasFilters = searchParams.town || searchParams.beds || searchParams.type || searchParams.region;

  // Apply filters - use normalized town names for matching
  let properties = allProperties;
  if (searchParams.town) {
    const normalizedFilter = normalizeTownName(searchParams.town);
    properties = properties.filter(p => normalizeTownName(p.town || '') === normalizedFilter);
  }
  if (searchParams.beds) {
    properties = properties.filter(p => p.bedrooms === parseInt(searchParams.beds as string));
  }
  if (searchParams.type) {
    properties = properties.filter(p => p.propertyType === searchParams.type);
  }
  if (searchParams.region) {
    const regionLower = searchParams.region.toLowerCase();
    if (regionLower === 'south') {
      properties = properties.filter(p => SOUTH_TOWNS.some(t => p.town?.toLowerCase().includes(t)));
    } else if (regionLower === 'north') {
      properties = properties.filter(p => NORTH_TOWNS.some(t => p.town?.toLowerCase().includes(t)));
    } else if (regionLower === 'golf') {
      properties = properties.filter(p =>
        GOLF_KEYWORDS.some(k => p.town?.toLowerCase().includes(k) || p.description?.toLowerCase().includes(k))
      );
    } else if (regionLower === 'inland') {
      properties = properties.filter(p => INLAND_TOWNS.some(t => p.town?.toLowerCase().includes(t)));
    }
  }

  // Sort properties
  const sortBy = searchParams.sort || 'price-asc';
  properties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'price-desc': return (b.price || 0) - (a.price || 0);
      case 'price-asc': return (a.price || 0) - (b.price || 0);
      case 'beds-desc': return (b.bedrooms || 0) - (a.bedrooms || 0);
      case 'size-desc': return (b.size || 0) - (a.size || 0);
      default: return (a.price || 0) - (b.price || 0);
    }
  });

  // Group by regions for the "all properties" view
  const southProperties = allProperties.filter(p => SOUTH_TOWNS.some(t => p.town?.toLowerCase().includes(t)));
  const northProperties = allProperties.filter(p => NORTH_TOWNS.some(t => p.town?.toLowerCase().includes(t)));
  const golfProperties = allProperties.filter(p => GOLF_KEYWORDS.some(k => p.town?.toLowerCase().includes(k) || p.description?.toLowerCase().includes('golf')));
  const inlandProperties = allProperties.filter(p => INLAND_TOWNS.some(t => p.town?.toLowerCase().includes(t)));
  const costaCalidaProperties = allProperties.filter(p => COSTA_CALIDA_TOWNS.some(t => p.town?.toLowerCase().includes(t)));

  // Get top towns by property count
  const getTopTowns = (props: ParsedProperty[], limit: number = 5) => {
    const townCounts = props.reduce((acc, p) => {
      const town = p.town || 'Other';
      acc[town] = (acc[town] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(townCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([town, count]) => ({ town, count, avgPrice: Math.round(props.filter(p => p.town === town).reduce((sum, p) => sum + (p.price || 0), 0) / count) }));
  };

  const topSouthTowns = getTopTowns(southProperties, 8);
  const topNorthTowns = getTopTowns(northProperties, 8);
  const topGolfTowns = getTopTowns(golfProperties, 6);
  const topInlandTowns = getTopTowns(inlandProperties, 6);

  // Featured properties per section (key-ready first)
  const southFeatured = getFeaturedProperties(southProperties);
  const northFeatured = getFeaturedProperties(northProperties);
  const golfFeatured = getFeaturedProperties(golfProperties);
  const inlandFeatured = getFeaturedProperties(inlandProperties);

  const keyReadyCount = allProperties.filter(isPropertyKeyReady).length;

  // Schemas
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Properties', url: 'https://newbuildhomescostablanca.com/properties/' },
  ]);

  const collectionSchema = collectionPageSchema({
    name: 'New Build Properties Costa Blanca',
    description: 'Browse 1000+ new build villas and houses for sale across Costa Blanca.',
    url: 'https://newbuildhomescostablanca.com/properties/',
    items: properties.slice(0, 20).map(p => ({
      name: `${p.bedrooms} Bed ${p.propertyType} in ${p.town}`,
      url: `https://newbuildhomescostablanca.com/properties/${p.ref || p.id}/`,
      price: p.price || undefined,
    })),
  });

  // If town filter is applied, show lifestyle-focused view
  if (searchParams.town) {
    const townData = TOWN_DATA[searchParams.town] || {
      tagline: `Discover ${searchParams.town}`,
      highlights: ['New build properties', 'Mediterranean lifestyle', 'Quality developments'],
      image: '/images/placeholder-hero.jpg',
    };

    const avgPrice = properties.length > 0
      ? Math.round(properties.reduce((sum, p) => sum + (p.price || 0), 0) / properties.length)
      : 0;
    const minPrice = properties.length > 0
      ? Math.min(...properties.filter(p => p.price).map(p => p.price!))
      : 0;

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(collectionSchema) }} />

        <main className="min-h-screen bg-warm-50">
          {/* Town Hero */}
          <section className="relative bg-primary-900 overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <Image
                src={townData.image}
                alt={searchParams.town}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/90 to-primary-900/70" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              <nav className="flex items-center gap-2 text-sm mb-6">
                <Link href="/" className="text-warm-400 hover:text-white transition-colors">Home</Link>
                <span className="text-warm-600">/</span>
                <Link href="/properties" className="text-warm-400 hover:text-white transition-colors">Properties</Link>
                <span className="text-warm-600">/</span>
                <span className="text-white font-medium">{searchParams.town}</span>
              </nav>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
                    New Builds in <span className="font-semibold">{searchParams.town}</span>
                  </h1>
                  <p className="text-xl text-accent-400 font-medium mb-6">{townData.tagline}</p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {townData.highlights.map((h, i) => (
                      <span key={i} className="bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Stats Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h2 className="text-white text-lg font-medium mb-6">Property Snapshot</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-4xl font-semibold text-accent-400">{properties.length}</div>
                      <div className="text-warm-300 text-sm">Properties Available</div>
                    </div>
                    <div>
                      <div className="text-4xl font-semibold text-white">From {formatPrice(minPrice)}</div>
                      <div className="text-warm-300 text-sm">Starting Price</div>
                    </div>
                    <div>
                      <div className="text-4xl font-semibold text-white">{formatPrice(avgPrice)}</div>
                      <div className="text-warm-300 text-sm">Average Price</div>
                    </div>
                    <div>
                      <div className="text-4xl font-semibold text-white">{[...new Set(properties.map(p => p.propertyType))].length}</div>
                      <div className="text-warm-300 text-sm">Property Types</div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <a
                      href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Enquire About {searchParams.town}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Filters Bar */}
          <section className="bg-white border-b border-warm-200 shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Link href="/properties" className="text-accent-600 hover:text-accent-700 text-sm font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    All Properties
                  </Link>
                  <span className="text-warm-300">|</span>
                  <span className="text-warm-600 text-sm">{properties.length} properties in {searchParams.town}</span>
                </div>
                <SortDropdown currentSort={sortBy} />
              </div>
            </div>
          </section>

          {/* Properties Grid - Larger Cards */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {properties.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg">
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">No properties found</h3>
                  <p className="text-warm-500 mb-6">Try adjusting your filters or browse all properties.</p>
                  <Link href="/properties" className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-md font-medium">
                    View All Properties
                  </Link>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {properties.map(property => (
                    <LargePropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary-900 py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                Can't Find Your Perfect <span className="font-semibold">{searchParams.town} Property?</span>
              </h2>
              <p className="text-warm-300 mb-8">Tell us your requirements and we'll find matching properties from our network.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="bg-white text-primary-900 px-8 py-3 rounded-md font-medium hover:bg-warm-100 transition-colors">
                  Contact Us
                </Link>
                <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-md font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  // Default view - Show all properties with regional sections and featured property cards
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema(MAIN_PAGE_FAQS)) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero with Search */}
        <section className="relative bg-primary-900 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
                Find Your <span className="font-semibold text-accent-400">Dream Home</span>
              </h1>
              <p className="text-warm-300 text-lg mb-10">
                {allProperties.length.toLocaleString()} new build properties across Costa Blanca's most desirable locations
              </p>

              {/* Search Bar */}
              <PropertySearch towns={towns} types={types} bedOptions={bedOptions} />

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-semibold text-accent-400">{allProperties.length.toLocaleString()}</div>
                  <div className="text-warm-400 text-sm">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-white">{towns.length}</div>
                  <div className="text-warm-400 text-sm">Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-white">{types.length}</div>
                  <div className="text-warm-400 text-sm">Property Types</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Filter Bar - Category pills */}
        <section className="bg-white border-b border-warm-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/properties/key-ready"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Key Ready ({keyReadyCount})
              </Link>
              <Link
                href="/properties/apartments"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-100 text-primary-900 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors"
              >
                Apartments
              </Link>
              <Link
                href="/properties/villas"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-100 text-primary-900 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors"
              >
                Villas
              </Link>
              <Link
                href="/properties/under-300k"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-100 text-primary-900 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors"
              >
                Under €300k
              </Link>
            </div>
          </div>
        </section>

        {/* Costa Blanca South Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-accent-500 font-medium text-sm uppercase tracking-wide">Sun & Beaches</span>
                <h2 className="text-3xl md:text-4xl font-light text-primary-900 mt-2">
                  Costa Blanca <span className="font-semibold">South</span>
                </h2>
                <p className="text-warm-500 mt-2">Year-round sunshine, golf courses, and established expat communities</p>
              </div>
              <Link href="/properties/costa-blanca-south" className="hidden md:flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                View all {southProperties.length} properties
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>

            {/* Property Grid - 3x2 */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {southFeatured.slice(0, 6).map(property => (
                <LargePropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Area Pills */}
            <div className="flex flex-wrap gap-2.5">
              {topSouthTowns.map(item => (
                <Link
                  key={item.town}
                  href={`/properties?town=${encodeURIComponent(item.town)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-warm-100 hover:bg-warm-200 rounded-full text-sm font-medium text-primary-900 transition-colors"
                >
                  {item.town}
                  <span className="text-warm-500">({item.count})</span>
                </Link>
              ))}
            </div>

            <Link href="/properties/costa-blanca-south" className="md:hidden flex items-center justify-center gap-2 text-accent-600 hover:text-accent-700 font-medium mt-6">
              View all {southProperties.length} properties →
            </Link>
          </div>
        </section>

        {/* Costa Blanca North Section */}
        <section className="py-16 bg-warm-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-accent-500 font-medium text-sm uppercase tracking-wide">Premium Coastline</span>
                <h2 className="text-3xl md:text-4xl font-light text-primary-900 mt-2">
                  Costa Blanca <span className="font-semibold">North</span>
                </h2>
                <p className="text-warm-500 mt-2">Dramatic coastline, prestigious villas, and Mediterranean elegance</p>
              </div>
              <Link href="/properties/costa-blanca-north" className="hidden md:flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                View all {northProperties.length} properties
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>

            {/* Property Grid - 3x2 */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {northFeatured.slice(0, 6).map(property => (
                <LargePropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Area Pills */}
            <div className="flex flex-wrap gap-2.5">
              {topNorthTowns.map(item => (
                <Link
                  key={item.town}
                  href={`/properties?town=${encodeURIComponent(item.town)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-warm-50 rounded-full text-sm font-medium text-primary-900 transition-colors"
                >
                  {item.town}
                  <span className="text-warm-500">({item.count})</span>
                </Link>
              ))}
            </div>

            <Link href="/properties/costa-blanca-north" className="md:hidden flex items-center justify-center gap-2 text-accent-600 hover:text-accent-700 font-medium mt-6">
              View all {northProperties.length} properties →
            </Link>
          </div>
        </section>

        {/* Golf Properties Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-accent-500 font-medium text-sm uppercase tracking-wide">Golf Living</span>
                <h2 className="text-3xl md:text-4xl font-light text-primary-900 mt-2">
                  <span className="font-semibold">Golf</span> Properties
                </h2>
                <p className="text-warm-500 mt-2">Premium properties on or near championship golf courses</p>
              </div>
              <Link href="/golf" className="hidden md:flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                View all {golfProperties.length} properties
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>

            {/* Property Grid - 3x2 */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {golfFeatured.slice(0, 6).map(property => (
                <LargePropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Area Pills */}
            <div className="flex flex-wrap gap-2.5">
              {topGolfTowns.map(item => (
                <Link
                  key={item.town}
                  href={`/properties?town=${encodeURIComponent(item.town)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-warm-100 hover:bg-warm-200 rounded-full text-sm font-medium text-primary-900 transition-colors"
                >
                  {item.town}
                  <span className="text-warm-500">({item.count})</span>
                </Link>
              ))}
            </div>

            <Link href="/golf" className="md:hidden flex items-center justify-center gap-2 text-accent-600 hover:text-accent-700 font-medium mt-6">
              View all {golfProperties.length} properties →
            </Link>
          </div>
        </section>

        {/* ============================================ */}
        {/* LIGHT CONTACT CTA - Between Golf & Inland Living */}
        {/* ============================================ */}
        <section className="py-8 px-4 bg-warm-50">
          <div className="max-w-4xl mx-auto bg-white border border-warm-200 rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-primary-900 font-medium text-lg">Find your perfect Costa Blanca home</p>
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

        {/* Inland Living Section */}
        <section className="py-16 bg-warm-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-accent-500 font-medium text-sm uppercase tracking-wide">Best Value</span>
                <h2 className="text-3xl md:text-4xl font-light text-primary-900 mt-2">
                  <span className="font-semibold">Inland</span> Living
                </h2>
                <p className="text-warm-500 mt-2">Charming villages with authentic Spanish character and excellent value</p>
              </div>
              <Link href="/properties/inland" className="hidden md:flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                View all {inlandProperties.length} properties
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>

            {/* Property Grid - 3x2 */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {inlandFeatured.slice(0, 6).map(property => (
                <LargePropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Area Pills */}
            <div className="flex flex-wrap gap-2.5">
              {topInlandTowns.map(item => (
                <Link
                  key={item.town}
                  href={`/properties?town=${encodeURIComponent(item.town)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-warm-50 rounded-full text-sm font-medium text-primary-900 transition-colors"
                >
                  {item.town}
                  <span className="text-warm-500">({item.count})</span>
                </Link>
              ))}
            </div>

            <Link href="/properties/inland" className="md:hidden flex items-center justify-center gap-2 text-accent-600 hover:text-accent-700 font-medium mt-6">
              View all {inlandProperties.length} properties →
            </Link>
          </div>
        </section>

        {/* All Locations Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-8 text-center">
              All <span className="font-semibold">Locations</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {towns
                .map(town => ({
                  town,
                  count: allProperties.filter(p => p.town === town).length,
                }))
                .filter(({ count }) => count > 0)
                .slice(0, 24)
                .map(({ town, count }) => (
                  <Link
                    key={town}
                    href={`/properties?town=${encodeURIComponent(town)}`}
                    className="bg-warm-50 rounded-lg p-4 hover:shadow-md transition-shadow group"
                  >
                    <h3 className="font-medium text-primary-900 group-hover:text-accent-600 transition-colors">{town}</h3>
                    <p className="text-warm-500 text-sm">{count} {count === 1 ? 'property' : 'properties'}</p>
                  </Link>
                ))}
            </div>

            {towns.length > 24 && (
              <div className="text-center mt-8">
                <span className="text-warm-500">+ {towns.length - 24} more locations</span>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-10 text-center">
              Frequently Asked <span className="font-semibold">Questions</span>
            </h2>
            <div className="space-y-6">
              {MAIN_PAGE_FAQS.map((faq, index) => (
                <div key={index} className="bg-warm-50 rounded-xl p-6 border border-warm-100">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">{faq.question}</h3>
                  <p className="text-warm-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-900 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Need Help Finding the <span className="font-semibold">Perfect Property?</span>
            </h2>
            <p className="text-warm-300 mb-8">Our local experts know every town and can match you with your ideal home.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-white text-primary-900 px-8 py-3 rounded-md font-medium hover:bg-warm-100 transition-colors">
                Contact Us
              </Link>
              <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-md font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Large Property Card for filtered views
function LargePropertyCard({ property }: { property: ParsedProperty }) {
  const mainImage = property.images[0] || '/images/placeholder-property.jpg';
  const imageCount = property.images.length;
  const hasPoolFeature = hasPool(property);
  const keyReady = isPropertyKeyReady(property);

  // Format town name nicely
  const displayTown = (property.town || '').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

  return (
    <Link
      href={`/properties/${property.ref}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-warm-100"
    >
      {/* Image Section */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={mainImage}
          alt={`${property.bedrooms} bed ${property.propertyType} in ${property.town}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top badges row */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="bg-accent-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
              New Build
            </span>
            {keyReady && (
              <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
                Key Ready
              </span>
            )}
            {property.propertyType && (
              <span className="bg-white/95 backdrop-blur-sm text-primary-900 text-xs font-medium px-3 py-1.5 rounded-full">
                {property.propertyType}
              </span>
            )}
          </div>
          {imageCount > 1 && (
            <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {imageCount}
            </span>
          )}
        </div>

        {/* Bottom overlay with price and location */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {property.price && property.price > 0 ? formatPrice(property.price) : 'Price on Request'}
              </div>
              <div className="flex items-center gap-1.5 text-white/90 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {displayTown}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-600 transition-colors mb-2 line-clamp-1">
          {(property as any).aiContent?.title || `${property.bedrooms && property.bedrooms > 0 ? `${property.bedrooms}-Bedroom ` : ''}${property.propertyType}`}
          {property.developmentName && <span className="font-normal text-warm-500"> · {property.developmentName}</span>}
        </h3>

        {/* Key specs grid */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {property.bedrooms && property.bedrooms > 0 && (
            <div className="text-center p-2 bg-warm-50 rounded-lg">
              <div className="text-lg font-semibold text-primary-900">{property.bedrooms}</div>
              <div className="text-xs text-warm-500">Beds</div>
            </div>
          )}
          {property.bathrooms && property.bathrooms > 0 && (
            <div className="text-center p-2 bg-warm-50 rounded-lg">
              <div className="text-lg font-semibold text-primary-900">{property.bathrooms}</div>
              <div className="text-xs text-warm-500">Baths</div>
            </div>
          )}
          {property.size && property.size > 0 && (
            <div className="text-center p-2 bg-warm-50 rounded-lg">
              <div className="text-lg font-semibold text-primary-900">{property.size}</div>
              <div className="text-xs text-warm-500">m²</div>
            </div>
          )}
          {property.plotSize && property.plotSize > 0 ? (
            <div className="text-center p-2 bg-warm-50 rounded-lg">
              <div className="text-lg font-semibold text-primary-900">{property.plotSize}</div>
              <div className="text-xs text-warm-500">Plot m²</div>
            </div>
          ) : hasPoolFeature ? (
            <div className="text-center p-2 bg-accent-50 rounded-lg">
              <div className="text-lg font-semibold text-accent-600">✓</div>
              <div className="text-xs text-accent-600">Pool</div>
            </div>
          ) : null}
        </div>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hasPoolFeature && property.plotSize && property.plotSize > 0 && (
            <span className="bg-accent-50 text-accent-700 text-xs font-medium px-2 py-1 rounded">
              Pool
            </span>
          )}
          {property.size && property.size >= 150 && (
            <span className="bg-primary-50 text-primary-700 text-xs font-medium px-2 py-1 rounded">
              Spacious
            </span>
          )}
          {property.plotSize && property.plotSize >= 500 && (
            <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded">
              Large Plot
            </span>
          )}
          {property.bedrooms && property.bedrooms >= 4 && (
            <span className="bg-purple-50 text-purple-700 text-xs font-medium px-2 py-1 rounded">
              Family Home
            </span>
          )}
        </div>

        {/* Footer with ref and CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-warm-100">
          <span className="text-warm-400 text-xs">Ref: {property.ref}</span>
          <span className="text-accent-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            View Property
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
