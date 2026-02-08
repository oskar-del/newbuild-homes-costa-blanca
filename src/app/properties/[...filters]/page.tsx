import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchXMLFeed, toUnifiedFormat } from '@/lib/xml-parser';
import { getPropertyDevelopmentInfo } from '@/data/property-development-mapping';
import { breadcrumbSchema, collectionPageSchema, faqSchema, toJsonLd } from '@/lib/schema';
import { PROPERTIES_SEO_CONTENT } from '@/data/properties-seo-content';

// SEO Filter Configuration
// Maps URL slugs to filter criteria
interface FilterConfig {
  type?: string;
  town?: string;
  zone?: string;
  bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  features?: string[];
  region?: string;
}

// Key Ready properties by reference (manual list maintained in PropertyCard.tsx too)
const KEY_READY_REFERENCES = [
  'N6299', 'N8535', 'N8770', 'N8550', 'N9300',
];

// Normalize property type from raw feed values to canonical names
function normalizePropertyType(rawType: string): string {
  const typeLower = (rawType || '').toLowerCase();
  const typeMapping: [string, string][] = [
    ['apartment', 'Apartment'],
    ['flat', 'Apartment'],
    ['piso', 'Apartment'],
    ['apartamento', 'Apartment'],
    ['ground floor', 'Apartment'],
    ['villa', 'Villa'],
    ['detached', 'Villa'],
    ['chalet', 'Villa'],
    ['townhouse', 'Townhouse'],
    ['town house', 'Townhouse'],
    ['adosado', 'Townhouse'],
    ['semi-detached', 'Townhouse'],
    ['penthouse', 'Penthouse'],
    ['atico', 'Penthouse'],
    ['bungalow', 'Bungalow'],
    ['duplex', 'Duplex'],
    ['finca', 'Country House'],
    ['country house', 'Country House'],
  ];
  for (const [key, value] of typeMapping) {
    if (typeLower.includes(key)) return value;
  }
  return rawType || 'Property';
}

// Define all valid filter combinations for static generation
const FILTER_DEFINITIONS: Record<string, { config: FilterConfig; title: string; description: string }> = {
  // Property Types
  'apartments': {
    config: { type: 'Apartment' },
    title: 'New Build Apartments Costa Blanca',
    description: 'Modern new build apartments for sale across Costa Blanca. Contemporary designs with pools, terraces and sea views.'
  },
  'villas': {
    config: { type: 'Villa' },
    title: 'New Build Villas Costa Blanca',
    description: 'Luxury new build villas for sale in Costa Blanca. Private pools, modern architecture, stunning locations.'
  },
  'townhouses': {
    config: { type: 'Townhouse' },
    title: 'New Build Townhouses Costa Blanca',
    description: 'New build townhouses for sale in Costa Blanca. Perfect blend of space, community and value.'
  },
  'penthouses': {
    config: { type: 'Penthouse' },
    title: 'New Build Penthouses Costa Blanca',
    description: 'Exclusive new build penthouses with rooftop terraces and panoramic views across Costa Blanca.'
  },
  'bungalows': {
    config: { type: 'Bungalow' },
    title: 'New Build Bungalows Costa Blanca',
    description: 'Single-level new build bungalows in Costa Blanca. Ideal for retirement or accessible living.'
  },

  // Towns - South Costa Blanca
  'torrevieja': {
    config: { town: 'Torrevieja' },
    title: 'New Build Properties in Torrevieja',
    description: 'New build homes for sale in Torrevieja. Beachfront apartments, villas and townhouses from €150,000.'
  },
  'orihuela-costa': {
    config: { town: 'Orihuela Costa' },
    title: 'New Build Properties in Orihuela Costa',
    description: 'New build properties in Orihuela Costa near La Zenia Boulevard. Golf, beach and shopping lifestyle.'
  },
  'guardamar': {
    config: { town: 'Guardamar del Segura' },
    title: 'New Build Properties in Guardamar del Segura',
    description: 'New build homes in Guardamar with pine forest beaches and natural dunes. Peaceful coastal living.'
  },
  'pilar-de-la-horadada': {
    config: { town: 'Pilar de la Horadada' },
    title: 'New Build Properties in Pilar de la Horadada',
    description: 'New build properties in Pilar de la Horadada. Traditional Spanish town with excellent beaches.'
  },
  'san-miguel-de-salinas': {
    config: { town: 'San Miguel de Salinas' },
    title: 'New Build Properties in San Miguel de Salinas',
    description: 'Affordable new build homes in San Miguel de Salinas. Inland value near golf and beaches.'
  },

  // Towns - North Costa Blanca
  'javea': {
    config: { town: 'Jávea' },
    title: 'New Build Properties in Jávea',
    description: 'Exclusive new build villas and apartments in Jávea. Premium Costa Blanca North location.'
  },
  'moraira': {
    config: { town: 'Moraira' },
    title: 'New Build Properties in Moraira',
    description: 'Luxury new build homes in Moraira. Prestigious address on the Costa Blanca North.'
  },
  'calpe': {
    config: { town: 'Calpe' },
    title: 'New Build Properties in Calpe',
    description: 'New build apartments and villas in Calpe. Views of the iconic Peñón de Ifach rock.'
  },
  'altea': {
    config: { town: 'Altea' },
    title: 'New Build Properties in Altea',
    description: 'New build homes in charming Altea. Artistic heritage meets modern Mediterranean living.'
  },
  'benidorm': {
    config: { town: 'Benidorm' },
    title: 'New Build Properties in Benidorm',
    description: 'New build apartments in Benidorm. Year-round entertainment and excellent rental potential.'
  },
  'denia': {
    config: { town: 'Dénia' },
    title: 'New Build Properties in Dénia',
    description: 'New build properties in Dénia. Historic charm, gastronomy capital of Costa Blanca.'
  },
  'benissa': {
    config: { town: 'Benissa' },
    title: 'New Build Properties in Benissa',
    description: 'New build villas in Benissa. Quiet coastal coves and traditional Spanish character.'
  },
  'teulada': {
    config: { town: 'Teulada' },
    title: 'New Build Properties in Teulada-Moraira',
    description: 'New build homes in Teulada-Moraira municipality. Quality living on Costa Blanca North.'
  },

  // Inland Towns
  'pinoso': {
    config: { town: 'Pinoso' },
    title: 'New Build Properties in Pinoso',
    description: 'New build country villas in Pinoso wine region. Large plots, mountain views, authentic Spain.'
  },
  'hondon': {
    config: { town: 'Hondón de las Nieves' },
    title: 'New Build Properties in Hondón Valley',
    description: 'Affordable new build villas in Hondón Valley. Rural tranquility 30 minutes from beaches.'
  },

  // Compound filters: Type + Town
  'apartments-torrevieja': {
    config: { type: 'Apartment', town: 'Torrevieja' },
    title: 'New Build Apartments in Torrevieja',
    description: 'Modern new build apartments for sale in Torrevieja. Beach lifestyle from €150,000.'
  },
  'apartments-orihuela-costa': {
    config: { type: 'Apartment', town: 'Orihuela Costa' },
    title: 'New Build Apartments in Orihuela Costa',
    description: 'New apartments near La Zenia Boulevard and beaches. Golf lifestyle from €180,000.'
  },
  'apartments-benidorm': {
    config: { type: 'Apartment', town: 'Benidorm' },
    title: 'New Build Apartments in Benidorm',
    description: 'Modern apartments in Benidorm with rental potential. Sea views and resort amenities.'
  },
  'apartments-javea': {
    config: { type: 'Apartment', town: 'Jávea' },
    title: 'New Build Apartments in Jávea',
    description: 'Exclusive new build apartments in prestigious Jávea. Premium Costa Blanca North.'
  },
  'apartments-calpe': {
    config: { type: 'Apartment', town: 'Calpe' },
    title: 'New Build Apartments in Calpe',
    description: 'New apartments in Calpe with views of the Peñón de Ifach. Beach and town lifestyle.'
  },
  'villas-javea': {
    config: { type: 'Villa', town: 'Jávea' },
    title: 'New Build Villas in Jávea',
    description: 'Luxury new build villas in Jávea. Private pools, sea views, prestigious address.'
  },
  'villas-moraira': {
    config: { type: 'Villa', town: 'Moraira' },
    title: 'New Build Villas in Moraira',
    description: 'Exclusive new villas in Moraira. The most prestigious address on Costa Blanca.'
  },
  'villas-orihuela-costa': {
    config: { type: 'Villa', town: 'Orihuela Costa' },
    title: 'New Build Villas in Orihuela Costa',
    description: 'New build villas near golf courses. Private pools, modern design from €400,000.'
  },
  'villas-pinoso': {
    config: { type: 'Villa', town: 'Pinoso' },
    title: 'New Build Country Villas in Pinoso',
    description: 'Large country villas in Pinoso wine region. Huge plots, mountain views, from €300,000.'
  },
  'townhouses-orihuela-costa': {
    config: { type: 'Townhouse', town: 'Orihuela Costa' },
    title: 'New Build Townhouses in Orihuela Costa',
    description: 'Modern townhouses near golf and beach. Community pools, gardens from €250,000.'
  },
  'townhouses-torrevieja': {
    config: { type: 'Townhouse', town: 'Torrevieja' },
    title: 'New Build Townhouses in Torrevieja',
    description: 'New townhouses in Torrevieja. Space and value near the beach from €200,000.'
  },

  // Bedroom filters
  '2-bed-apartments': {
    config: { type: 'Apartment', bedrooms: 2 },
    title: '2 Bedroom New Build Apartments Costa Blanca',
    description: 'Two bedroom new build apartments across Costa Blanca. Perfect size for couples and investors.'
  },
  '3-bed-apartments': {
    config: { type: 'Apartment', bedrooms: 3 },
    title: '3 Bedroom New Build Apartments Costa Blanca',
    description: 'Three bedroom apartments for families. Spacious new builds with modern amenities.'
  },
  '3-bed-villas': {
    config: { type: 'Villa', bedrooms: 3 },
    title: '3 Bedroom New Build Villas Costa Blanca',
    description: 'Three bedroom villas with private pools. Family homes from trusted developers.'
  },
  '4-bed-villas': {
    config: { type: 'Villa', bedrooms: 4 },
    title: '4 Bedroom New Build Villas Costa Blanca',
    description: 'Spacious four bedroom villas. Luxury family homes with pools and gardens.'
  },

  // Price ranges
  'under-200k': {
    config: { maxPrice: 200000 },
    title: 'New Build Properties Under €200,000',
    description: 'Affordable new build homes under €200K. Quality apartments and townhouses in Costa Blanca.'
  },
  'under-300k': {
    config: { maxPrice: 300000 },
    title: 'New Build Properties Under €300,000',
    description: 'New build homes under €300K. Great value apartments, townhouses and small villas.'
  },
  'luxury-over-500k': {
    config: { minPrice: 500000 },
    title: 'Luxury New Build Properties Over €500,000',
    description: 'Premium new build homes from €500K. Luxury villas, penthouses and exclusive developments.'
  },
  'luxury-over-1m': {
    config: { minPrice: 1000000 },
    title: 'Luxury New Build Properties Over €1,000,000',
    description: 'Ultra-luxury new builds from €1M. The finest villas on Costa Blanca.'
  },

  // Costa Blanca (combined)
  'costa-blanca': {
    config: { region: 'costa-blanca' },
    title: 'New Build Properties Costa Blanca',
    description: 'All new build properties across Costa Blanca. From sunny South to prestigious North coastline. Villas, apartments and townhouses.'
  },

  // Costa Calida
  'costa-calida': {
    config: { region: 'costa-calida' },
    title: 'New Build Properties Costa Calida (Murcia)',
    description: 'New build homes in Costa Calida and Murcia region. Mar Menor, La Manga, Cartagena. Warm waters and authentic Spanish living.'
  },

  // Key-Ready
  'key-ready': {
    config: { features: ['key-ready'] },
    title: 'Key-Ready New Build Homes Costa Blanca',
    description: 'Move-in ready new build properties available now. No waiting - collect your keys and start living your Spanish dream immediately.'
  },

  // Region filters
  'costa-blanca-south': {
    config: { region: 'south' },
    title: 'New Build Properties Costa Blanca South',
    description: 'New builds in Costa Blanca South. Torrevieja, Orihuela Costa, Guardamar. Value and sunshine.'
  },
  'costa-blanca-north': {
    config: { region: 'north' },
    title: 'New Build Properties Costa Blanca North',
    description: 'New builds in Costa Blanca North. Jávea, Moraira, Calpe, Altea. Premium coastal living.'
  },

  // Inland
  'inland': {
    config: { region: 'inland' },
    title: 'Inland New Build Properties Costa Blanca | Village & Country Homes',
    description: 'New build villas and townhouses in charming inland villages. Algorfa, Rojales, Ciudad Quesada, Jalón Valley. Authentic Spanish character, excellent value, 20 minutes from the coast.'
  },
};

// South Costa Blanca towns
const SOUTH_TOWNS = ['Torrevieja', 'Orihuela Costa', 'Guardamar del Segura', 'Pilar de la Horadada', 'San Miguel de Salinas', 'Los Montesinos', 'Rojales', 'Ciudad Quesada', 'La Marina', 'Santa Pola'];
const NORTH_TOWNS = ['Jávea', 'Moraira', 'Calpe', 'Altea', 'Benidorm', 'Dénia', 'Benissa', 'Teulada', 'Finestrat', 'La Nucia', 'Alfaz del Pi', 'Albir', 'Villajoyosa', 'El Campello', 'Polop', 'Benitachell'];
const COSTA_CALIDA_TOWNS = ['San Javier', 'San Pedro del Pinatar', 'Los Alcázares', 'La Manga', 'Cartagena', 'Mazarrón', 'Torre Pacheco', 'Sucina', 'Murcia'];
const INLAND_TOWNS = ['Algorfa', 'Rojales', 'Ciudad Quesada', 'Benijófar', 'San Fulgencio', 'Jalón', 'Orba', 'Pedreguer', 'Pinoso', 'Hondón de las Nieves', 'Catral', 'Dolores', 'Almoradí', 'Callosa de Segura'];

function matchesFilter(property: any, config: FilterConfig): boolean {
  // Type: case-insensitive comparison
  if (config.type && property.propertyType.toLowerCase() !== config.type.toLowerCase()) return false;

  // Town: case-insensitive with includes (handles "Orihuela Costa" vs "Orihuela Costa/La Zenia" etc.)
  if (config.town) {
    const pTown = (property.town || '').toLowerCase();
    const cTown = config.town.toLowerCase();
    if (!pTown.includes(cTown) && !cTown.includes(pTown)) return false;
  }

  if (config.bedrooms && property.bedrooms !== config.bedrooms) return false;
  if (config.minPrice && (property.price || 0) < config.minPrice) return false;
  if (config.maxPrice && (property.price || 0) > config.maxPrice) return false;

  // Region: case-insensitive includes matching for ALL regions
  const pTownLower = (property.town || '').toLowerCase();
  if (config.region === 'south' && !SOUTH_TOWNS.some(t => pTownLower.includes(t.toLowerCase()))) return false;
  if (config.region === 'north' && !NORTH_TOWNS.some(t => pTownLower.includes(t.toLowerCase()))) return false;
  if (config.region === 'costa-blanca') {
    const inSouth = SOUTH_TOWNS.some(t => pTownLower.includes(t.toLowerCase()));
    const inNorth = NORTH_TOWNS.some(t => pTownLower.includes(t.toLowerCase()));
    if (!inSouth && !inNorth) return false;
  }
  if (config.region === 'costa-calida') {
    if (!COSTA_CALIDA_TOWNS.some(t => pTownLower.includes(t.toLowerCase()))) return false;
  }
  if (config.region === 'inland') {
    if (!INLAND_TOWNS.some(t => pTownLower.includes(t.toLowerCase()))) return false;
  }

  // Key-ready: check multiple sources for better detection
  if (config.features?.includes('key-ready')) {
    const desc = (property.descriptions?.en || property.description || '').toLowerCase();
    const isKeyReadyDesc = desc.includes('key ready') || desc.includes('keys ready') || desc.includes('key-ready') ||
                           desc.includes('ready to move') || desc.includes('immediate delivery') ||
                           desc.includes('move in') || desc.includes('available now') ||
                           desc.includes('completed') || desc.includes('entrega inmediata');
    const isKeyReadyRef = KEY_READY_REFERENCES.includes(property.reference);
    const isKeyReadyStatus = property.constructionStatus === 'key-ready' || property.constructionStatus === 'completed';
    if (!isKeyReadyDesc && !isKeyReadyRef && !isKeyReadyStatus) return false;
  }

  return true;
}

// Generate all static paths
export async function generateStaticParams() {
  return Object.keys(FILTER_DEFINITIONS).map(slug => ({
    filters: slug.split('/'),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ filters: string[] }> }): Promise<Metadata> {
  const { filters } = await params;
  const slug = filters.join('/');
  const definition = FILTER_DEFINITIONS[slug];

  if (!definition) {
    return { title: 'Properties Not Found' };
  }

  return {
    title: definition.title,
    description: definition.description,
    openGraph: {
      title: definition.title,
      description: definition.description,
      type: 'website',
    },
    alternates: {
      canonical: `https://newbuildhomescostablanca.com/properties/${slug}`,
    },
  };
}

// Format price helper
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function FilteredPropertiesPage({ params }: { params: Promise<{ filters: string[] }> }) {
  const { filters } = await params;
  const slug = filters.join('/');
  const definition = FILTER_DEFINITIONS[slug];

  if (!definition) {
    notFound();
  }

  // Fetch from xml-parser (same source as detail page) to prevent 404s
  const rawProperties = await fetchXMLFeed();
  const allProperties = rawProperties.map(p => {
    const u = toUnifiedFormat(p);
    // Get development mapping for constructionStatus
    const devInfo = getPropertyDevelopmentInfo(p.ref);
    let constructionStatus: string | undefined;
    if (devInfo?.deliveryDate) {
      const parts = devInfo.deliveryDate.split(/[-/]/);
      const deliveryDate = parts[0].length === 4
        ? new Date(`${parts[0]}-${parts[1]}-${parts[2]}`)
        : new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      if (!isNaN(deliveryDate.getTime())) {
        const sixtyDaysFromNow = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
        if (deliveryDate <= sixtyDaysFromNow) constructionStatus = 'key-ready';
      }
    }
    return {
      ...u,
      reference: p.ref,
      description: p.description || '',
      propertyType: normalizePropertyType(u.propertyType),
      constructionStatus,
    };
  });
  const properties = allProperties.filter(p => matchesFilter(p, definition.config));

  // Build breadcrumbs
  const breadcrumbItems = [
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Properties', url: 'https://newbuildhomescostablanca.com/properties/' },
    { name: definition.title.replace('New Build ', ''), url: `https://newbuildhomescostablanca.com/properties/${slug}/` },
  ];
  const breadcrumbs = breadcrumbSchema(breadcrumbItems);

  // Build collection schema
  const collectionSchema = collectionPageSchema({
    name: definition.title,
    description: definition.description,
    url: `https://newbuildhomescostablanca.com/properties/${slug}/`,
    items: properties.slice(0, 20).map(p => ({
      name: `${p.bedrooms} Bed ${p.propertyType} in ${p.town}`,
      url: `https://newbuildhomescostablanca.com/properties/${p.reference}/`,
      price: p.price || undefined,
    })),
  });

  // Get related filter suggestions
  const relatedFilters = getRelatedFilters(slug, definition.config);

  // Get SEO content for this filter page
  const seoContent = PROPERTIES_SEO_CONTENT[slug];

  // Build segmented sections for key pages
  type PropertySegment = { title: string; emoji: string; properties: typeof properties; slug?: string };
  const segments: PropertySegment[] = [];

  if (slug === 'costa-blanca' && properties.length > 0) {
    const keyReady = properties.filter(p => KEY_READY_REFERENCES.includes(p.reference) ||
      p.constructionStatus === 'key-ready' ||
      (p.descriptions?.en || '').toLowerCase().includes('key ready'));
    const seaView = properties.filter(p => p.hasSeaview && !keyReady.includes(p));
    const inland = properties.filter(p =>
      INLAND_TOWNS.some(t => (p.town || '').toLowerCase().includes(t.toLowerCase())) &&
      !keyReady.includes(p) && !seaView.includes(p));
    const north = properties.filter(p =>
      NORTH_TOWNS.some(t => (p.town || '').toLowerCase().includes(t.toLowerCase())) &&
      !keyReady.includes(p) && !seaView.includes(p) && !inland.includes(p));
    const south = properties.filter(p =>
      SOUTH_TOWNS.some(t => (p.town || '').toLowerCase().includes(t.toLowerCase())) &&
      !keyReady.includes(p) && !seaView.includes(p) && !inland.includes(p) && !north.includes(p));

    if (keyReady.length > 0) segments.push({ title: 'Key Ready Properties', emoji: '🔑', properties: keyReady, slug: 'key-ready' });
    if (seaView.length > 0) segments.push({ title: 'Beach & Sea View Properties', emoji: '🏖️', properties: seaView });
    if (inland.length > 0) segments.push({ title: 'Inland Properties', emoji: '🏡', properties: inland, slug: 'inland' });
    if (north.length > 0) segments.push({ title: 'Costa Blanca North', emoji: '⛵', properties: north, slug: 'costa-blanca-north' });
    if (south.length > 0) segments.push({ title: 'Costa Blanca South', emoji: '☀️', properties: south, slug: 'costa-blanca-south' });
  }

  if (slug === 'villas' && properties.length > 0) {
    const north = properties.filter(p =>
      NORTH_TOWNS.some(t => (p.town || '').toLowerCase().includes(t.toLowerCase())));
    const south = properties.filter(p =>
      SOUTH_TOWNS.some(t => (p.town || '').toLowerCase().includes(t.toLowerCase())));
    const inland = properties.filter(p =>
      INLAND_TOWNS.some(t => (p.town || '').toLowerCase().includes(t.toLowerCase())) &&
      !north.includes(p) && !south.includes(p));
    const other = properties.filter(p => !north.includes(p) && !south.includes(p) && !inland.includes(p));

    if (south.length > 0) segments.push({ title: 'Villas — Costa Blanca South', emoji: '☀️', properties: south });
    if (north.length > 0) segments.push({ title: 'Villas — Costa Blanca North', emoji: '⛵', properties: north });
    if (inland.length > 0) segments.push({ title: 'Villas — Inland', emoji: '🏡', properties: inland });
    if (other.length > 0) segments.push({ title: 'More Villas', emoji: '🏠', properties: other });
  }

  if (slug === 'under-300k' && properties.length > 0) {
    const apartments = properties.filter(p => p.propertyType === 'Apartment');
    const villas = properties.filter(p => p.propertyType === 'Villa');
    const townhouses = properties.filter(p => p.propertyType === 'Townhouse');
    const bungalows = properties.filter(p => p.propertyType === 'Bungalow');
    const other = properties.filter(p =>
      !['Apartment', 'Villa', 'Townhouse', 'Bungalow'].includes(p.propertyType));

    if (apartments.length > 0) segments.push({ title: 'Apartments Under €300K', emoji: '🏢', properties: apartments, slug: 'apartments' });
    if (villas.length > 0) segments.push({ title: 'Villas Under €300K', emoji: '🏡', properties: villas, slug: 'villas' });
    if (townhouses.length > 0) segments.push({ title: 'Townhouses Under €300K', emoji: '🏘️', properties: townhouses, slug: 'townhouses' });
    if (bungalows.length > 0) segments.push({ title: 'Bungalows Under €300K', emoji: '🏠', properties: bungalows, slug: 'bungalows' });
    if (other.length > 0) segments.push({ title: 'Other Properties Under €300K', emoji: '🏗️', properties: other });
  }

  if (slug === 'apartments' && properties.length > 0) {
    const south = properties.filter(p =>
      SOUTH_TOWNS.some(t => (p.town || '').toLowerCase().includes(t.toLowerCase())));
    const north = properties.filter(p =>
      NORTH_TOWNS.some(t => (p.town || '').toLowerCase().includes(t.toLowerCase())));
    const other = properties.filter(p => !south.includes(p) && !north.includes(p));

    if (south.length > 0) segments.push({ title: 'Apartments — Costa Blanca South', emoji: '☀️', properties: south });
    if (north.length > 0) segments.push({ title: 'Apartments — Costa Blanca North', emoji: '⛵', properties: north });
    if (other.length > 0) segments.push({ title: 'More Apartments', emoji: '🏢', properties: other });
  }

  // Helper to render a property card
  const renderPropertyCard = (property: typeof properties[0]) => (
    <Link
      key={property.reference}
      href={`/properties/${property.reference}`}
      className="group bg-white rounded-xl overflow-hidden border border-warm-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.images[0]?.url || '/images/placeholder-property.jpg'}
          alt={`${property.propertyType} in ${property.town}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full">New Build</span>
          {property.propertyType && (
            <span className="bg-white/90 text-primary-900 text-xs font-medium px-3 py-1 rounded-full">{property.propertyType}</span>
          )}
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-2xl font-bold text-white">
            {property.price ? formatPrice(property.price) : 'Price on Request'}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-primary-900 group-hover:text-accent-600 transition-colors line-clamp-1 mb-2">
          {property.bedrooms > 0 ? `${property.bedrooms}-Bedroom ` : ''}{property.propertyType} in {property.town}
        </h3>
        <div className="flex items-center gap-4 text-sm text-warm-500">
          {property.bedrooms > 0 && <span>{property.bedrooms} beds</span>}
          {property.bathrooms > 0 && <span>{property.bathrooms} baths</span>}
          {property.builtArea > 0 && <span>{property.builtArea}m²</span>}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-warm-100">
          <span className="text-warm-400 text-xs">Ref: {property.reference}</span>
          <span className="text-accent-600 font-medium text-sm flex items-center gap-1">View Details →</span>
        </div>
      </div>
    </Link>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(collectionSchema) }} />
      {seoContent?.faqs && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema(seoContent.faqs)) }} />
      )}

      <main className="min-h-screen bg-warm-50">
        {/* Hero Section */}
        <section className="bg-primary-900 text-white py-16">
          <div className="container mx-auto px-4">
            <nav className="text-sm mb-4 text-warm-400">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/properties" className="hover:text-white">Properties</Link>
              <span className="mx-2">›</span>
              <span className="text-white">{definition.title.replace('New Build ', '')}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4">
              {definition.title}
            </h1>

            <p className="text-lg text-warm-300 max-w-3xl mb-6">
              {definition.description}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <span className="bg-accent-500 text-white px-4 py-2 rounded-sm font-medium">
                {properties.length} properties available
              </span>
              {definition.config.town && (
                <Link
                  href={`/areas/${definition.config.town.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-accent-400 hover:text-accent-300 underline"
                >
                  → View {definition.config.town} Area Guide
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Quick Filter Bar */}
        <section className="bg-white border-b border-warm-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-warm-500 text-sm mr-2">Browse:</span>
              {[
                { label: 'All Properties', href: '/properties' },
                { label: 'Apartments', href: '/properties/apartments' },
                { label: 'Villas', href: '/properties/villas' },
                { label: 'Townhouses', href: '/properties/townhouses' },
                { label: 'Key Ready', href: '/properties/key-ready' },
                { label: 'Under €300K', href: '/properties/under-300k' },
                { label: 'Luxury', href: '/properties/luxury-over-500k' },
                { label: 'Costa Blanca South', href: '/properties/costa-blanca-south' },
                { label: 'Costa Blanca North', href: '/properties/costa-blanca-north' },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm px-3 py-1.5 rounded-sm transition-colors ${
                    `/properties/${slug}` === item.href || (item.href === '/properties' && slug === '')
                      ? 'bg-accent-500 text-white font-medium'
                      : 'bg-warm-100 hover:bg-accent-100 text-warm-700 hover:text-accent-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Related Filters */}
        {relatedFilters.length > 0 && (
          <section className="bg-white border-b border-warm-200 py-4">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-warm-500 text-sm mr-2">Refine:</span>
                {relatedFilters.map(rf => (
                  <Link
                    key={rf.slug}
                    href={`/properties/${rf.slug}`}
                    className="bg-warm-100 hover:bg-accent-100 text-warm-700 hover:text-accent-700 text-sm px-3 py-1 rounded-sm transition-colors"
                  >
                    {rf.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Properties Grid - Segmented or Flat */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {properties.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-sm border border-warm-200">
                <h2 className="text-2xl font-semibold text-primary-900 mb-4">No Properties Found</h2>
                <p className="text-warm-600 mb-6">We don&apos;t currently have properties matching this criteria.</p>
                <Link href="/properties" className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-sm font-medium">
                  View All Properties
                </Link>
              </div>
            ) : segments.length > 0 ? (
              /* Segmented view for key pages */
              <div className="space-y-12">
                {segments.map((segment, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-semibold text-primary-900 flex items-center gap-2">
                        <span>{segment.emoji}</span> {segment.title}
                        <span className="text-sm font-normal text-warm-500 ml-2">({segment.properties.length})</span>
                      </h2>
                      {segment.slug && (
                        <Link
                          href={`/properties/${segment.slug}`}
                          className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                        >
                          View all →
                        </Link>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {segment.properties.slice(0, 6).map(renderPropertyCard)}
                    </div>
                    {segment.properties.length > 6 && segment.slug && (
                      <div className="text-center mt-6">
                        <Link
                          href={`/properties/${segment.slug}`}
                          className="inline-block bg-warm-100 hover:bg-accent-100 text-warm-700 hover:text-accent-700 px-6 py-2 rounded-sm text-sm font-medium transition-colors"
                        >
                          View all {segment.properties.length} {segment.title.toLowerCase()} →
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Flat grid for non-segmented pages */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map(renderPropertyCard)}
              </div>
            )}
          </div>
        </section>

        {/* Rich SEO Content */}
        {seoContent && (
          <>
            {/* Market Overview & Why Buy Section */}
            <section className="py-12 bg-white border-t border-warm-200">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl">
                  <h2 className="text-2xl font-semibold text-primary-900 mb-6">
                    {definition.title}
                  </h2>
                  <div className="prose prose-warm max-w-none text-warm-700 leading-relaxed space-y-4">
                    {seoContent.intro.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

                  {seoContent.whyBuy && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-primary-900 mb-4">
                        Why Choose {definition.title.replace('New Build ', '').replace(' Costa Blanca', '').replace(' Costa Calida (Murcia)', '')}?
                      </h3>
                      <div className="prose prose-warm max-w-none text-warm-700 leading-relaxed space-y-4">
                        {seoContent.whyBuy.split('\n\n').map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {seoContent.marketInsight && (
                    <div className="mt-8 bg-primary-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-primary-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        Market Insight
                      </h3>
                      <p className="text-warm-700 leading-relaxed">{seoContent.marketInsight}</p>
                    </div>
                  )}

                  {/* Area Guide Link */}
                  {definition.config.town && (
                    <p className="text-warm-700 leading-relaxed mt-6">
                      Interested in learning more about life in {definition.config.town}?
                      Visit our comprehensive <Link href={`/areas/${definition.config.town.toLowerCase().replace(/\s+/g, '-')}`} className="text-accent-600 hover:underline font-medium">{definition.config.town} area guide</Link> for
                      information on beaches, amenities, healthcare, and the property market.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            {seoContent.faqs.length > 0 && (
              <section className="py-12 bg-warm-50 border-t border-warm-200">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <h2 className="text-2xl font-semibold text-primary-900 mb-8">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                      {seoContent.faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-warm-200">
                          <h3 className="text-lg font-semibold text-primary-900 mb-3">{faq.question}</h3>
                          <p className="text-warm-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Related Searches */}
            {seoContent.relatedSearches.length > 0 && (
              <section className="py-8 bg-white border-t border-warm-200">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <h3 className="text-sm font-medium text-warm-500 uppercase tracking-wide mb-4">Related Searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {seoContent.relatedSearches.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          className="bg-warm-100 hover:bg-accent-50 text-warm-700 hover:text-accent-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* Fallback SEO content when no seoContent exists */}
        {!seoContent && (
          <section className="py-12 bg-white border-t border-warm-200">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-semibold text-primary-900 mb-4">
                  About {definition.title}
                </h2>
                <div className="prose prose-warm max-w-none">
                  <p className="text-warm-700 leading-relaxed">
                    {definition.description} Browse our selection of {properties.length} available properties
                    and find your perfect new build home in Spain. All properties are from trusted developers
                    with full guarantees and after-sales support.
                  </p>
                  {definition.config.town && (
                    <p className="text-warm-700 leading-relaxed mt-4">
                      Interested in learning more about life in {definition.config.town}?
                      Visit our comprehensive <Link href={`/areas/${definition.config.town.toLowerCase().replace(/\s+/g, '-')}`} className="text-accent-600 hover:underline">{definition.config.town} area guide</Link> for
                      information on beaches, amenities, healthcare, and the property market.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-12 bg-primary-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-warm-300 mb-6 max-w-2xl mx-auto">
              We have access to properties before they hit the market. Tell us your requirements and we'll find your perfect home.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-sm font-medium transition-colors"
              >
                WhatsApp Us
              </a>
              <Link href="/contact" className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-sm font-medium transition-colors">
                Contact Form
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Helper to get related filter suggestions
function getRelatedFilters(currentSlug: string, currentConfig: FilterConfig): { slug: string; label: string }[] {
  const related: { slug: string; label: string }[] = [];

  // If viewing a town, suggest property types in that town
  if (currentConfig.town && !currentConfig.type) {
    ['apartments', 'villas', 'townhouses'].forEach(type => {
      const slug = `${type}-${currentConfig.town?.toLowerCase().replace(/\s+/g, '-')}`;
      if (FILTER_DEFINITIONS[slug] && slug !== currentSlug) {
        related.push({ slug, label: FILTER_DEFINITIONS[slug].title.replace('New Build ', '') });
      }
    });
  }

  // If viewing a type, suggest popular towns
  if (currentConfig.type && !currentConfig.town) {
    ['torrevieja', 'orihuela-costa', 'javea', 'calpe'].forEach(town => {
      const slug = `${currentConfig.type?.toLowerCase()}s-${town}`;
      if (FILTER_DEFINITIONS[slug] && slug !== currentSlug) {
        related.push({ slug, label: FILTER_DEFINITIONS[slug].title.replace('New Build ', '') });
      }
    });
  }

  // Always suggest regions if not already filtered
  if (!currentConfig.region) {
    related.push({ slug: 'costa-blanca-south', label: 'Costa Blanca South' });
    related.push({ slug: 'costa-blanca-north', label: 'Costa Blanca North' });
  }

  return related.slice(0, 6);
}
