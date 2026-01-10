/**
 * Unified Feed Service
 * Combines properties from multiple sources:
 * - REDSP (Kyero XML format) - 11 languages, new_build flag
 * - Background Properties (JSON format) - existing feed
 * 
 * Provides a single API for accessing all properties regardless of source.
 */

import { fetchREDSPFeed, getREDSPPropertyById } from './redsp-parser';
import { 
  UnifiedProperty, 
  PropertyFilter, 
  PropertyListResponse, 
  TownSummary,
  filterProperties,
  generateTownSummary,
  generateSlug,
} from './unified-property';

// Feed configuration
const FEED_CONFIG = {
  // Background Properties feed
  backgroundProperties: {
    enabled: true,
    feedUrl: 'https://backgroundproperties.com/wp-load.php?security_token=23f0185aeb5102e7&export_id=19&action=get_data',
  },
  // REDSP feed
  redsp: {
    enabled: true,
    productionUrl: 'https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml',
    trialUrl: 'https://www.redsp.net/trial/trial-feed-kyero.xml',
    useProduction: true, // Set to false for testing with trial feed
  },
  // Cache duration (1 hour)
  cacheDuration: 60 * 60 * 1000,
};

// Combined cache
let combinedCache: {
  data: UnifiedProperty[] | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

/**
 * Background Properties interface (from existing feed)
 */
interface BackgroundProperty {
  reference?: string;
  ref?: string;
  title?: string;
  description?: string;
  price?: string | number;
  bedrooms?: number;
  rooms?: number;
  bathrooms?: number;
  baths?: number;
  built_size?: number;
  plot_size?: number;
  location?: string;
  town?: string;
  province?: string;
  property_type?: string;
  type?: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  main_image?: string;
  features?: string[];
  pool?: boolean;
}

/**
 * Fetch Background Properties feed
 */

/**
 * Background Properties XML interface (multilingual)
 */
interface BPXMLProperty {
  id?: string[];
  reference?: string[];
  price?: string[];
  saleType?: string[];
  title?: [{
    en?: string[];
    de?: string[];
    es?: string[];
    fr?: string[];
    nl?: string[];
  }];
  description?: [{
    en?: string[];
    de?: string[];
    es?: string[];
    fr?: string[];
    nl?: string[];
  }];
  type?: [{
    en?: string[];
  }];
  location?: [{
    town?: string[];
    zone?: string[];
    province?: string[];
    country?: string[];
    coordinates?: [{
      latitude?: string[];
      longitude?: string[];
    }];
  }];
  rooms?: string[];
  baths?: string[];
  m2Built?: string[];
  m2Plot?: string[];
  pool?: [{
    en?: string[];
  }];
  images?: [{
    image?: Array<{
      url?: string[];
    }>;
  }];
  views?: [{
    en?: string[];
  }];
  orientation?: [{
    en?: string[];
  }];
}

/**
 * Fetch Background Properties feed (XML format with redirect)
 */
async function fetchBackgroundProperties(): Promise<UnifiedProperty[]> {
  if (!FEED_CONFIG.backgroundProperties.enabled) {
    return [];
  }

  try {
    console.log('[BackgroundProperties] Fetching XML feed...');
    
    // Fetch with redirect following
    const response = await fetch(FEED_CONFIG.backgroundProperties.feedUrl, {
      redirect: 'follow',
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const xmlText = await response.text();
    console.log(`[BackgroundProperties] Received ${xmlText.length} bytes of XML`);
    
    // Parse XML using xml2js
    const { parseStringPromise } = await import('xml2js');
    const result = await parseStringPromise(xmlText, {
      explicitArray: true,
      ignoreAttrs: false,
    });
    
    // Extract properties - handle different root element names
    const properties: BPXMLProperty[] = result?.sooprema?.properties?.[0]?.property || 
                                         result?.properties?.property || 
                                         result?.root?.property ||
                                         [];
    
    console.log(`[BackgroundProperties] Parsed ${properties.length} properties from XML`);
    
    return properties.map(convertBPXMLToUnified).filter((p): p is UnifiedProperty => p !== null);
  } catch (error) {
    console.error('[BackgroundProperties] Error:', error);
    return [];
  }
}

/**
 * Convert Background Properties XML to unified format
 */
function convertBPXMLToUnified(property: BPXMLProperty): UnifiedProperty | null {
  try {
    const id = property.reference?.[0] || property.id?.[0] || '';
    if (!id) return null;
    
    const price = parseInt(property.price?.[0] || '0', 10);
    const location = property.location?.[0];
    const town = location?.town?.[0] || '';
    const province = location?.province?.[0] || 'Alicante';
    const region = determineRegion(town, province);
    
    // Get multilingual title
    const titleObj = property.title?.[0];
    const title = titleObj?.en?.[0] || titleObj?.es?.[0] || `Property in ${town}`;
    
    // Get multilingual descriptions
    const descObj = property.description?.[0];
    const descriptions: Record<string, string> = {};
    if (descObj?.en?.[0]) descriptions.en = descObj.en[0];
    if (descObj?.es?.[0]) descriptions.es = descObj.es[0];
    if (descObj?.de?.[0]) descriptions.de = descObj.de[0];
    if (descObj?.fr?.[0]) descriptions.fr = descObj.fr[0];
    if (descObj?.nl?.[0]) descriptions.nl = descObj.nl[0];
    
    // Property type
    const typeObj = property.type?.[0];
    const propertyType = normalizePropertyType(typeObj?.en?.[0] || 'Apartment');
    
    // Get coordinates
    const coords = location?.coordinates?.[0];
    const latitude = parseFloat(coords?.latitude?.[0] || '0') || 0;
    const longitude = parseFloat(coords?.longitude?.[0] || '0') || 0;
    
    // Get images
    const imagesArray = property.images?.[0]?.image || [];
    const images = imagesArray.map((img, index) => ({
      url: img.url?.[0] || '',
      order: index,
      isFloorplan: false,
    })).filter(img => img.url);
    
    // Check for pool
    const poolValue = property.pool?.[0]?.en?.[0];
    const hasPool = poolValue === '1' || poolValue?.toLowerCase() === 'yes';
    
    // Features from views, orientation, etc.
    const features: string[] = [];
    const views = property.views?.[0]?.en?.[0];
    if (views) features.push(`${views} views`);
    const orientation = property.orientation?.[0]?.en?.[0];
    if (orientation) features.push(`${orientation} facing`);
    
    return {
      id: `bp-${id}`,
      reference: id,
      source: 'background-properties' as const,
      aiContent: { title },
      
      town,
      locationDetail: location?.zone?.[0] || '',
      province,
      region,
      country: 'Spain',
      latitude,
      longitude,
      
      propertyType,
      bedrooms: parseInt(property.rooms?.[0] || '0', 10),
      bathrooms: parseInt(property.baths?.[0] || '0', 10),
      builtArea: parseInt(property.m2Built?.[0] || '0', 10),
      plotArea: parseInt(property.m2Plot?.[0] || '0', 10),
      
      price,
      currency: 'EUR',
      
      isNewBuild: !isPlotOrLand(propertyType),
      propertyCategory: isPlotOrLand(propertyType) ? 'plot' : 'new-build',
      hasPool,
      features,
      
      descriptions,
      
      images,
      mainImage: images[0]?.url || null,
      floorplanImages: [],
      
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('[BackgroundProperties] Error converting property:', property.reference, error);
    return null;
  }
}

function normalizePropertyType(type: string): string {
  const normalized = type.toLowerCase().trim();
  const typeMap: Record<string, string> = {
    'apartment': 'Apartment',
    'villa': 'Villa',
    'townhouse': 'Townhouse',
    'penthouse': 'Penthouse',
    'bungalow': 'Bungalow',
    'duplex': 'Duplex',
    'chalet': 'Chalet',
    'finca': 'Finca',
  };
  return typeMap[normalized] || type;
}

/**
 * Check if property type is a building plot/land
 */
function isPlotOrLand(propertyType: string): boolean {
  const plotTypes = [
    'land', 'plot', 'terrain', 'terreno', 'grundstück', 'baugrundstück',
    'grondstuk', 'bouwgrond', 'tomt', 'parcela', 'solar', 'finca rústica',
    'rustic land', 'urban land', 'building plot', 'building land'
  ];
  const normalized = propertyType.toLowerCase().trim();
  return plotTypes.some(type => normalized.includes(type));
}
/**
 * Determine region from town and province
 */
function determineRegion(town: string, province: string): string {
  const t = town.toLowerCase();
  const p = province.toLowerCase();
  
  if (p.includes('murcia')) return 'Costa Cálida';
  
  const northTowns = ['javea', 'moraira', 'calpe', 'altea', 'benidorm', 'denia', 'oliva'];
  const southTowns = ['torrevieja', 'orihuela', 'guardamar', 'villamartin', 'la zenia', 'cabo roig'];
  
  for (const nt of northTowns) {
    if (t.includes(nt)) return 'Costa Blanca North';
  }
  for (const st of southTowns) {
    if (t.includes(st)) return 'Costa Blanca South';
  }
  
  return 'Costa Blanca';
}

/**
 * Fetch all properties from all sources
 */
export async function fetchAllProperties(options?: {
  forceRefresh?: boolean;
}): Promise<UnifiedProperty[]> {
  const { forceRefresh = false } = options || {};

  // Check cache
  if (!forceRefresh && combinedCache.data && (Date.now() - combinedCache.timestamp) < FEED_CONFIG.cacheDuration) {
    console.log('[UnifiedFeed] Returning cached data');
    return combinedCache.data;
  }

  console.log('[UnifiedFeed] Fetching from all sources...');

  // Fetch from all sources in parallel
  const [redspProperties, bgProperties] = await Promise.all([
    FEED_CONFIG.redsp.enabled 
      ? fetchREDSPFeed({ useTrialFeed: !FEED_CONFIG.redsp.useProduction })
      : Promise.resolve([]),
    fetchBackgroundProperties(),
  ]);

  console.log(`[UnifiedFeed] REDSP: ${redspProperties.length}, Background: ${bgProperties.length}`);

  // Combine all properties
  const allProperties = [...redspProperties, ...bgProperties];

  // Deduplicate by reference (prefer REDSP as it has more data)
  const deduped = deduplicateProperties(allProperties);
  console.log(`[UnifiedFeed] Total after deduplication: ${deduped.length}`);

  // Update cache
  combinedCache = {
    data: deduped,
    timestamp: Date.now(),
  };

  return deduped;
}

/**
 * Deduplicate properties, preferring REDSP source
 */
function deduplicateProperties(properties: UnifiedProperty[]): UnifiedProperty[] {
  const seen = new Map<string, UnifiedProperty>();
  
  // Sort so REDSP comes first (will be preferred in dedup)
  const sorted = [...properties].sort((a, b) => {
    if (a.source === 'redsp' && b.source !== 'redsp') return -1;
    if (a.source !== 'redsp' && b.source === 'redsp') return 1;
    return 0;
  });
  
  for (const prop of sorted) {
    // Create dedup key from reference or location+price
    const key = prop.reference || `${prop.town}-${prop.price}-${prop.bedrooms}`;
    if (!seen.has(key)) {
      seen.set(key, prop);
    }
  }
  
  return Array.from(seen.values());
}

/**
 * Get properties with filtering and pagination
 */
export async function getProperties(options?: {
  filter?: PropertyFilter;
  page?: number;
  pageSize?: number;
  sortBy?: 'price' | 'bedrooms' | 'date';
  sortOrder?: 'asc' | 'desc';
}): Promise<PropertyListResponse> {
  const {
    filter = {},
    page = 1,
    pageSize = 20,
    sortBy = 'price',
    sortOrder = 'asc',
  } = options || {};

  let properties = await fetchAllProperties();

  // Filter out plots/land from main properties (they go to /plots page)
  properties = properties.filter(p => p.propertyCategory !== 'plot');
  
  // Apply filters
  properties = filterProperties(properties, filter);
  
  // Sort
  properties.sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'bedrooms':
        comparison = a.bedrooms - b.bedrooms;
        break;
      case 'date':
        comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
        break;
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });
  
  // Paginate
  const total = properties.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedProperties = properties.slice(start, start + pageSize);
  
  return {
    properties: paginatedProperties,
    total,
    page,
    pageSize,
    totalPages,
  };
}

/**
 * Get single property by ID
 */
export async function getPropertyById(id: string): Promise<UnifiedProperty | null> {
  const allProperties = await fetchAllProperties();
  return allProperties.find(p => p.id === id || p.reference === id) || null;
}

/**
 * Get all unique towns with property counts
 */
export async function getAllTowns(): Promise<TownSummary[]> {
  const allProperties = await fetchAllProperties();
  
  // Group by town
  const townMap = new Map<string, UnifiedProperty[]>();
  for (const prop of allProperties) {
    const town = prop.town;
    if (!town) continue;
    
    if (!townMap.has(town)) {
      townMap.set(town, []);
    }
    townMap.get(town)!.push(prop);
  }
  
  // Generate summaries
  const summaries: TownSummary[] = [];
  for (const [townName, properties] of townMap) {
    summaries.push(generateTownSummary(townName, properties));
  }
  
  // Sort by property count (descending)
  return summaries.sort((a, b) => b.propertyCount - a.propertyCount);
}

/**
 * Get properties by town
 */
export async function getPropertiesByTown(town: string): Promise<UnifiedProperty[]> {
  return getProperties({
    filter: { town },
    pageSize: 1000,
  }).then(res => res.properties);
}

/**
 * Get property statistics
 */
export async function getPropertyStats(): Promise<{
  totalProperties: number;
  bySource: Record<string, number>;
  byRegion: Record<string, number>;
  byType: Record<string, number>;
  priceRange: { min: number; max: number };
}> {
  const allProperties = await fetchAllProperties();
  
  const bySource: Record<string, number> = {};
  const byRegion: Record<string, number> = {};
  const byType: Record<string, number> = {};
  let minPrice = Infinity;
  let maxPrice = 0;
  
  for (const prop of allProperties) {
    bySource[prop.source] = (bySource[prop.source] || 0) + 1;
    byRegion[prop.region] = (byRegion[prop.region] || 0) + 1;
    byType[prop.propertyType] = (byType[prop.propertyType] || 0) + 1;
    
    if (prop.price > 0) {
      minPrice = Math.min(minPrice, prop.price);
      maxPrice = Math.max(maxPrice, prop.price);
    }
  }
  
  return {
    totalProperties: allProperties.length,
    bySource,
    byRegion,
    byType,
    priceRange: {
      min: minPrice === Infinity ? 0 : minPrice,
      max: maxPrice,
    },
  };
}

/**
 * Export for use in static generation
 */
export async function getStaticPropertyPaths(): Promise<{ params: { slug: string } }[]> {
  const allProperties = await fetchAllProperties();
  return allProperties.map(p => ({
    params: { slug: p.reference || p.id },
  }));
}

export async function getStaticTownPaths(): Promise<{ params: { slug: string } }[]> {
  const towns = await getAllTowns();
  return towns.map(t => ({
    params: { slug: t.slug },
  }));
}
