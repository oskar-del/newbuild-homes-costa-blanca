/**
 * REDSP Feed Parser
 * Handles Kyero XML format with multilingual support (11 languages)
 * 
 * Feed URLs:
 * - Trial: https://www.redsp.net/trial/trial-feed-kyero.xml
 * - Production: https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml
 */

import { parseStringPromise } from 'xml2js';
import { UnifiedProperty, PropertyImage, PropertyDescription } from './unified-property';

// REDSP Kyero XML Structure
interface REDSPProperty {
  id: string[];
  ref: string[];
  price: string[];
  currency?: string[];
  type: string[];
  town: string[];
  province: string[];
  country?: string[];
  new_build?: string[];
  beds?: string[];
  baths?: string[];
  pool?: string[];
  surface_area?: [{
    built?: string[];
    plot?: string[];
  }];
  location?: [{
    latitude?: string[];
    longitude?: string[];
  }];
  location_detail?: string[];
  desc?: [{
    en?: string[];
    es?: string[];
    de?: string[];
    sv?: string[];  // Swedish
    nl?: string[];  // Dutch
    da?: string[];  // Danish
    fi?: string[];  // Finnish
    fr?: string[];  // French
    no?: string[];  // Norwegian
    pl?: string[];  // Polish
    ru?: string[];  // Russian
  }];
  features?: [{
    feature?: string[];
  }];
  images?: [{
    image?: Array<{
      url?: string[];
      tag?: string[];
    }>;
  }];
  energy_rating?: [{
    consumption?: string[];
    emissions?: string[];
  }];
  url?: string[];
}

interface REDSPFeed {
  kyero: {
    property: REDSPProperty[];
  };
}

// Feed configuration
const REDSP_CONFIG = {
  // Use production feed
  feedUrl: 'https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml',
  // Alternative: trial feed for testing
  trialUrl: 'https://www.redsp.net/trial/trial-feed-kyero.xml',
  // Cache duration in ms (1 hour)
  cacheDuration: 60 * 60 * 1000,
  // Only include new builds
  filterNewBuilds: true,
};

// Supported languages from REDSP feed
const SUPPORTED_LANGUAGES = ['en', 'es', 'de', 'sv', 'nl', 'da', 'fi', 'fr', 'no', 'pl', 'ru'] as const;
type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Cache for parsed feed
let feedCache: {
  data: UnifiedProperty[] | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

/**
 * Fetch and parse REDSP feed
 */
export async function fetchREDSPFeed(options?: {
  useTrialFeed?: boolean;
  forceRefresh?: boolean;
  filterNewBuilds?: boolean;
}): Promise<UnifiedProperty[]> {
  const {
    useTrialFeed = false,
    forceRefresh = false,
    filterNewBuilds = REDSP_CONFIG.filterNewBuilds,
  } = options || {};

  // Check cache
  if (!forceRefresh && feedCache.data && (Date.now() - feedCache.timestamp) < REDSP_CONFIG.cacheDuration) {
    console.log('[REDSP] Returning cached feed data');
    return feedCache.data;
  }

  const feedUrl = useTrialFeed ? REDSP_CONFIG.trialUrl : REDSP_CONFIG.feedUrl;
  console.log(`[REDSP] Fetching feed from: ${feedUrl}`);

  try {
    const response = await fetch(feedUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch REDSP feed: ${response.status} ${response.statusText}`);
    }

    const xmlText = await response.text();
    console.log(`[REDSP] Received ${xmlText.length} bytes of XML data`);
    console.log(`[REDSP] First 200 chars: ${xmlText.substring(0, 200)}`);

    // Parse XML to JSON
    const parsed = await parseStringPromise(xmlText, {
      explicitArray: true,
      trim: true,
    });

    // Log the actual structure to help debug
    console.log(`[REDSP] Parsed root keys: ${Object.keys(parsed || {}).join(', ')}`);

    // Try different possible structures
    let rawProperties: REDSPProperty[] = [];
    
    if (parsed?.kyero?.property) {
      // Standard Kyero format: <kyero><property>...</property></kyero>
      rawProperties = parsed.kyero.property;
    } else if (parsed?.root?.property) {
      // Alternative: <root><property>...</property></root>
      rawProperties = parsed.root.property;
    } else if (parsed?.properties?.property) {
      // Alternative: <properties><property>...</property></properties>
      rawProperties = parsed.properties.property;
    } else if (Array.isArray(parsed?.property)) {
      // Direct: <property>...</property> at root
      rawProperties = parsed.property;
    } else {
      console.warn('[REDSP] Unknown feed structure. Available keys:', JSON.stringify(Object.keys(parsed || {})));
      console.warn('[REDSP] Returning empty array - Background Properties will still work');
      return [];
    }

    console.log(`[REDSP] Found ${rawProperties.length} total properties`);

    // Convert to unified format
    let properties = rawProperties.map(convertREDSPToUnified);

    // Filter for new builds if configured
    if (filterNewBuilds) {
      const beforeCount = properties.length;
      properties = properties.filter(p => p.isNewBuild);
      console.log(`[REDSP] Filtered to ${properties.length} new builds (from ${beforeCount})`);
    }

    // Update cache
    feedCache = {
      data: properties,
      timestamp: Date.now(),
    };

    return properties;

  } catch (error) {
    console.error('[REDSP] Error fetching feed:', error);
    console.warn('[REDSP] Returning empty array - Background Properties will still work');
    return [];
  }
}

/**
 * Convert REDSP property to unified format
 */
function convertREDSPToUnified(property: REDSPProperty): UnifiedProperty {
  const id = property.id?.[0] || property.ref?.[0] || '';
  const ref = property.ref?.[0] || id;
  
  // Parse price (REDSP uses clean numbers)
  const price = parseInt(property.price?.[0] || '0', 10);
  
  // Parse surface areas
  const builtArea = parseInt(property.surface_area?.[0]?.built?.[0] || '0', 10);
  const plotArea = parseInt(property.surface_area?.[0]?.plot?.[0] || '0', 10);
  
  // Parse bedrooms and bathrooms
  const bedrooms = parseInt(property.beds?.[0] || '0', 10);
  const bathrooms = parseInt(property.baths?.[0] || '0', 10);
  
  // Parse location
  const latitude = parseFloat(property.location?.[0]?.latitude?.[0] || '0');
  const longitude = parseFloat(property.location?.[0]?.longitude?.[0] || '0');
  
  // Parse flags
  const isNewBuild = property.new_build?.[0] === '1';
  const hasPool = property.pool?.[0] === '1';
  
  // Extract descriptions in all languages
  const descriptions: PropertyDescription = {};
  const descNode = property.desc?.[0];
  if (descNode) {
    for (const lang of SUPPORTED_LANGUAGES) {
      const desc = descNode[lang]?.[0];
      if (desc && desc.trim()) {
        descriptions[lang] = desc.trim();
      }
    }
  }
  
  // Extract images
  const images: PropertyImage[] = (property.images?.[0]?.image || []).map((img, index) => ({
    url: img.url?.[0] || '',
    tag: img.tag?.[0] || 'photo',
    order: index,
    isFloorplan: img.tag?.[0]?.toLowerCase() === 'floorplan',
  })).filter(img => img.url);
  
  // Extract features
  const features: string[] = (property.features?.[0]?.feature || [])
    .filter(f => f && f.trim())
    .map(f => f.trim());
  
  // Map property type to standardized types
  const propertyType = normalizePropertyType(property.type?.[0] || 'Apartment');
  
  // Get town and location detail
  const town = property.town?.[0] || '';
  const locationDetail = property.location_detail?.[0] || '';
  const province = property.province?.[0] || 'Alicante';
  
  // Determine region based on province
  const region = getRegionFromProvince(province, town);
  
  // Energy rating
  const energyConsumption = property.energy_rating?.[0]?.consumption?.[0] || null;
  const energyEmissions = property.energy_rating?.[0]?.emissions?.[0] || null;
  
  return {
    // Identity
    id: `redsp-${id}`,
    reference: ref,
    source: 'redsp' as const,
    
    // Location
    town,
    locationDetail,
    province,
    region,
    country: 'Spain',
    latitude,
    longitude,
    
    // Property details
    propertyType,
    bedrooms,
    bathrooms,
    builtArea,
    plotArea,
    
    // Pricing
    price,
    currency: 'EUR',
    
    // Features
    isNewBuild,
    hasPool,
    features,
    
    // Descriptions (multilingual)
    descriptions,
    
    // Images
    images,
    mainImage: images[0]?.url || null,
    floorplanImages: images.filter(img => img.isFloorplan),
    
    // Energy
    energyConsumption,
    energyEmissions,
    
    // External link
    externalUrl: property.url?.[0] || null,
    
    // Metadata
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Normalize property type to standard categories
 */
function normalizePropertyType(type: string): string {
  const normalized = type.toLowerCase().trim();
  
  const typeMap: Record<string, string> = {
    'apartment': 'Apartment',
    'apartments': 'Apartment',
    'flat': 'Apartment',
    'penthouse': 'Penthouse',
    'villa': 'Villa',
    'villas': 'Villa',
    'detached villa': 'Villa',
    'townhouse': 'Townhouse',
    'town house': 'Townhouse',
    'terraced': 'Townhouse',
    'semi-detached': 'Semi-Detached',
    'bungalow': 'Bungalow',
    'duplex': 'Duplex',
    'studio': 'Studio',
    'chalet': 'Chalet',
    'finca': 'Finca',
    'country house': 'Finca',
  };
  
  return typeMap[normalized] || type;
}

/**
 * Get region from province and town
 */
function getRegionFromProvince(province: string, town: string): string {
  const p = province.toLowerCase();
  const t = town.toLowerCase();
  
  // Murcia region
  if (p.includes('murcia')) {
    return 'Costa Cálida';
  }
  
  // Costa Blanca North towns
  const northTowns = [
    'javea', 'xabia', 'moraira', 'calpe', 'altea', 'benidorm', 'denia',
    'oliva', 'gandia', 'pedreguer', 'ondara', 'teulada', 'benissa',
    'alfaz del pi', 'albir', 'la nucia', 'finestrat', 'polop',
  ];
  
  for (const northTown of northTowns) {
    if (t.includes(northTown)) {
      return 'Costa Blanca North';
    }
  }
  
  // Costa Blanca South towns
  const southTowns = [
    'torrevieja', 'orihuela', 'guardamar', 'pilar de la horadada',
    'villamartin', 'la zenia', 'playa flamenca', 'punta prima',
    'cabo roig', 'campoamor', 'mil palmeras', 'torre de la horadada',
    'los alcazares', 'san miguel', 'algorfa', 'rojales', 'quesada',
    'ciudad quesada', 'san pedro del pinatar',
  ];
  
  for (const southTown of southTowns) {
    if (t.includes(southTown)) {
      return 'Costa Blanca South';
    }
  }
  
  // Default to province-based
  if (p.includes('alicante')) {
    return 'Costa Blanca';
  }
  
  return 'Costa Blanca';
}

/**
 * Get properties by town
 */
export async function getREDSPPropertiesByTown(town: string): Promise<UnifiedProperty[]> {
  const allProperties = await fetchREDSPFeed();
  const normalized = town.toLowerCase();
  return allProperties.filter(p => p.town.toLowerCase().includes(normalized));
}

/**
 * Get unique towns from REDSP feed
 */
export async function getREDSPTowns(): Promise<string[]> {
  const allProperties = await fetchREDSPFeed();
  const towns = new Set<string>();
  allProperties.forEach(p => {
    if (p.town) towns.add(p.town);
  });
  return Array.from(towns).sort();
}

/**
 * Get property count by town
 */
export async function getREDSPPropertyCountByTown(): Promise<Record<string, number>> {
  const allProperties = await fetchREDSPFeed();
  const counts: Record<string, number> = {};
  allProperties.forEach(p => {
    if (p.town) {
      counts[p.town] = (counts[p.town] || 0) + 1;
    }
  });
  return counts;
}

/**
 * Get single property by ID
 */
export async function getREDSPPropertyById(id: string): Promise<UnifiedProperty | null> {
  const allProperties = await fetchREDSPFeed();
  return allProperties.find(p => p.id === id || p.reference === id) || null;
}
