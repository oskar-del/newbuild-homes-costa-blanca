/**
 * Unified Feed Service
 * 
 * Fetches and combines property data from multiple feeds:
 * 1. REDSP Feed (Primary - 1,300+ properties with 11 languages)
 * 2. Background Properties Feed (Secondary)
 * 
 * Handles:
 * - Feed fetching with caching
 * - Data normalization to UnifiedProperty format
 * - Deduplication (REDSP preferred for richer content)
 * - Error handling and fallbacks
 */

import { UnifiedProperty, PropertyImage, PropertyDescription } from './unified-property';

// Feed URLs
const REDSP_FEED_URL = 'https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml';
const BACKGROUND_FEED_URL = 'https://backgroundproperties.com/wp-load.php?security_token=23f0185aeb5102e7&export_id=19&action=get_data';

// Cache
let cachedProperties: UnifiedProperty[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

/**
 * Parse REDSP XML feed
 */
async function parseRedspFeed(): Promise<UnifiedProperty[]> {
  try {
    const response = await fetch(REDSP_FEED_URL, {
      next: { revalidate: 3600 },
      cache: 'no-store', // Avoid Next.js cache size issues
    });
    
    if (!response.ok) {
      throw new Error(`REDSP feed error: ${response.status}`);
    }
    
    const xml = await response.text();
    
    // Parse XML using regex for simplicity (could use xml2js in production)
    const properties: UnifiedProperty[] = [];
    
    // Match all property elements
    const propertyMatches = xml.match(/<property>[\s\S]*?<\/property>/g) || [];
    
    for (const propXml of propertyMatches) {
      try {
        const property = parseRedspProperty(propXml);
        if (property) {
          properties.push(property);
        }
      } catch (e) {
        // Silent fail for individual properties
      }
    }
    
    console.log(`Parsed ${properties.length} properties from REDSP feed`);
    return properties;
  } catch (error) {
    console.error('Error fetching REDSP feed:', error);
    return [];
  }
}

/**
 * Parse a single REDSP property from XML
 */
function parseRedspProperty(xml: string): UnifiedProperty | null {
  const getValue = (tag: string): string => {
    // Try CDATA format first
    const cdataMatch = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
    if (cdataMatch) return cdataMatch[1].trim();
    
    // Then try simple format
    const simpleMatch = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)<\\/${tag}>`));
    if (simpleMatch) return simpleMatch[1].trim();
    
    return '';
  };
  
  const getNumericValue = (tag: string): number => {
    const val = getValue(tag);
    return parseFloat(val) || 0;
  };
  
  // FIXED: Use 'id' tag instead of 'ref' - this is what the REDSP feed actually uses
  const reference = getValue('id') || getValue('ref');
  if (!reference) return null;
  
  // Parse images
  const images: PropertyImage[] = [];
  const imageMatches = xml.match(/<image[^>]*>[\s\S]*?<\/image>/g) || [];
  for (const imgXml of imageMatches) {
    const urlMatch = imgXml.match(/<url>([^<]*)<\/url>/);
    if (urlMatch && urlMatch[1]) {
      images.push({
        url: urlMatch[1],
        caption: '',
      });
    }
  }
  
  // Parse descriptions (multilingual)
  const descriptions: PropertyDescription = {};
  const descMatches = xml.match(/<desc[^>]*>[\s\S]*?<\/desc>/g) || [];
  for (const descXml of descMatches) {
    const langMatch = descXml.match(/language="([^"]+)"/);
    const textMatch = descXml.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
    if (langMatch && textMatch) {
      descriptions[langMatch[1]] = textMatch[1].trim();
    }
  }
  
  // Parse features
  const features: string[] = [];
  const featureMatches = xml.match(/<feature>([^<]*)<\/feature>/g) || [];
  for (const feat of featureMatches) {
    const match = feat.match(/<feature>([^<]*)<\/feature>/);
    if (match && match[1]) {
      features.push(match[1].trim());
    }
  }
  
  // Determine feature flags from features array
  const featuresLower = features.map(f => f.toLowerCase()).join(' ');
  const hasPool = featuresLower.includes('pool') || featuresLower.includes('piscina');
  const hasSeaview = featuresLower.includes('sea view') || featuresLower.includes('vista mar') || featuresLower.includes('seaview');
  const hasGolfview = featuresLower.includes('golf') && (featuresLower.includes('view') || featuresLower.includes('vista'));
  const hasGarden = featuresLower.includes('garden') || featuresLower.includes('jardin');
  const hasTerrace = featuresLower.includes('terrace') || featuresLower.includes('terraza');
  const hasParking = featuresLower.includes('parking') || featuresLower.includes('garage') || featuresLower.includes('garaje');
  
  // Get property type
  let propertyType = getValue('type');
  // Normalize property type
  const typeMapping: Record<string, string> = {
    'apartment': 'Apartment',
    'flat': 'Apartment',
    'villa': 'Villa',
    'detached': 'Villa',
    'townhouse': 'Townhouse',
    'town house': 'Townhouse',
    'semi-detached': 'Semi-Detached',
    'penthouse': 'Penthouse',
    'bungalow': 'Bungalow',
    'duplex': 'Duplex',
    'finca': 'Country House',
    'country house': 'Country House',
  };
  const typeLower = propertyType.toLowerCase();
  for (const [key, value] of Object.entries(typeMapping)) {
    if (typeLower.includes(key)) {
      propertyType = value;
      break;
    }
  }
  if (!propertyType) propertyType = 'Property';
  
  return {
    id: `redsp-${reference}`,
    reference,
    source: 'redsp',
    
    // Location
    town: getValue('town') || getValue('location'),
    locationDetail: getValue('location_detail'),
    province: getValue('province') || 'Alicante',
    region: determineRegion(getValue('town') || getValue('location')),
    latitude: getNumericValue('latitude'),
    longitude: getNumericValue('longitude'),
    
    // Property details
    propertyType,
    bedrooms: getNumericValue('beds'),
    bathrooms: getNumericValue('baths'),
    builtArea: getNumericValue('surface_area') || getNumericValue('built'),
    plotArea: getNumericValue('plot_size') || getNumericValue('plot'),
    
    // Pricing
    price: getNumericValue('price'),
    currency: getValue('currency') || 'EUR',
    
    // Media
    images,
    
    // Descriptions
    descriptions,
    
    // Features
    features,
    hasPool,
    hasGarden,
    hasTerrace,
    hasParking,
    hasSeaview,
    hasGolfview,
  };
}

/**
 * Parse Background Properties JSON feed
 */
async function parseBackgroundFeed(): Promise<UnifiedProperty[]> {
  try {
    const response = await fetch(BACKGROUND_FEED_URL, {
      next: { revalidate: 3600 },
      cache: 'no-store',
      redirect: 'follow', // Follow redirects
    });
    
    if (!response.ok) {
      throw new Error(`Background feed error: ${response.status}`);
    }
    
    // Check content type - might be XML now due to redirect
    const contentType = response.headers.get('content-type') || '';
    const text = await response.text();
    
    // If it's XML (the feed might redirect to XML)
    if (contentType.includes('xml') || text.trim().startsWith('<?xml') || text.trim().startsWith('<')) {
      console.log('Background feed returned XML, parsing as XML...');
      return parseBackgroundXmlFeed(text);
    }
    
    // Otherwise parse as JSON
    const data = JSON.parse(text);
    const properties: UnifiedProperty[] = [];
    
    const items = Array.isArray(data) ? data : data.properties || [];
    
    for (const item of items) {
      try {
        const property = parseBackgroundProperty(item);
        if (property) {
          properties.push(property);
        }
      } catch (e) {
        // Silent fail for individual properties
      }
    }
    
    console.log(`Parsed ${properties.length} properties from Background feed`);
    return properties;
  } catch (error) {
    console.error('Error fetching Background feed:', error);
    return [];
  }
}

/**
 * Parse Background Properties XML feed (when it redirects to XML)
 */
function parseBackgroundXmlFeed(xml: string): UnifiedProperty[] {
  const properties: UnifiedProperty[] = [];
  
  // Try to match property/listing elements
  const propertyMatches = xml.match(/<property>[\s\S]*?<\/property>/g) || 
                          xml.match(/<listing>[\s\S]*?<\/listing>/g) || 
                          [];
  
  for (const propXml of propertyMatches) {
    try {
      const getValue = (tag: string): string => {
        const cdataMatch = propXml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
        if (cdataMatch) return cdataMatch[1].trim();
        const simpleMatch = propXml.match(new RegExp(`<${tag}[^>]*>([^<]*)<\\/${tag}>`));
        if (simpleMatch) return simpleMatch[1].trim();
        return '';
      };
      
      const reference = getValue('id') || getValue('ref') || getValue('reference');
      if (!reference) continue;
      
      // Parse images
      const images: PropertyImage[] = [];
      const imageMatches = propXml.match(/<image[^>]*>[\s\S]*?<\/image>/g) || 
                           propXml.match(/<photo[^>]*>([^<]*)<\/photo>/g) || [];
      for (const imgXml of imageMatches) {
        const urlMatch = imgXml.match(/<url>([^<]*)<\/url>/) || imgXml.match(/>([^<]+)</);
        if (urlMatch && urlMatch[1] && urlMatch[1].startsWith('http')) {
          images.push({ url: urlMatch[1], caption: '' });
        }
      }
      
      const property: UnifiedProperty = {
        id: `bp-${reference}`,
        reference,
        source: 'background-properties',
        town: getValue('town') || getValue('location') || getValue('city'),
        locationDetail: '',
        province: getValue('province') || 'Alicante',
        region: determineRegion(getValue('town') || getValue('location') || ''),
        latitude: parseFloat(getValue('latitude')) || 0,
        longitude: parseFloat(getValue('longitude')) || 0,
        propertyType: getValue('type') || 'Property',
        bedrooms: parseInt(getValue('beds') || getValue('bedrooms')) || 0,
        bathrooms: parseInt(getValue('baths') || getValue('bathrooms')) || 0,
        builtArea: parseFloat(getValue('built') || getValue('size')) || 0,
        plotArea: parseFloat(getValue('plot')) || 0,
        price: parseFloat(getValue('price')) || 0,
        currency: 'EUR',
        images,
        descriptions: { en: getValue('description') },
        features: [],
        hasPool: false,
        hasGarden: false,
        hasTerrace: false,
        hasParking: false,
        hasSeaview: false,
        hasGolfview: false,
      };
      
      properties.push(property);
    } catch (e) {
      // Silent fail
    }
  }
  
  console.log(`Parsed ${properties.length} properties from Background XML feed`);
  return properties;
}

/**
 * Parse a single Background Properties item
 */
function parseBackgroundProperty(item: any): UnifiedProperty | null {
  const reference = item.reference || item.ref || item.id;
  if (!reference) return null;
  
  // Parse images
  const images: PropertyImage[] = [];
  const imageList = item.images || item.photos || [];
  for (const img of imageList) {
    const url = typeof img === 'string' ? img : img.url || img.src;
    if (url) {
      images.push({ url, caption: '' });
    }
  }
  
  // Parse descriptions
  const descriptions: PropertyDescription = {};
  if (item.description) {
    descriptions.en = typeof item.description === 'string' 
      ? item.description 
      : item.description.en || item.description.english || '';
  }
  
  // Parse features
  const features: string[] = item.features || [];
  const featuresLower = features.map((f: string) => f.toLowerCase()).join(' ');
  
  // Determine property type
  let propertyType = item.type || item.property_type || 'Property';
  const typeMapping: Record<string, string> = {
    'apartment': 'Apartment',
    'villa': 'Villa',
    'townhouse': 'Townhouse',
    'penthouse': 'Penthouse',
    'bungalow': 'Bungalow',
  };
  for (const [key, value] of Object.entries(typeMapping)) {
    if (propertyType.toLowerCase().includes(key)) {
      propertyType = value;
      break;
    }
  }
  
  return {
    id: `bp-${reference}`,
    reference,
    source: 'background-properties',
    
    // Location
    town: item.town || item.location || item.city || '',
    locationDetail: item.location_detail || '',
    province: item.province || 'Alicante',
    region: determineRegion(item.town || item.location || ''),
    latitude: parseFloat(item.latitude) || 0,
    longitude: parseFloat(item.longitude) || 0,
    
    // Property details
    propertyType,
    bedrooms: parseInt(item.bedrooms) || parseInt(item.rooms) || 0,
    bathrooms: parseInt(item.bathrooms) || parseInt(item.baths) || 0,
    builtArea: parseFloat(item.built_area) || parseFloat(item.size) || 0,
    plotArea: parseFloat(item.plot_area) || parseFloat(item.plot) || 0,
    
    // Pricing
    price: parseFloat(item.price) || 0,
    currency: item.currency || 'EUR',
    
    // Media
    images,
    
    // Descriptions
    descriptions,
    
    // Features
    features,
    hasPool: featuresLower.includes('pool'),
    hasGarden: featuresLower.includes('garden'),
    hasTerrace: featuresLower.includes('terrace'),
    hasParking: featuresLower.includes('parking') || featuresLower.includes('garage'),
    hasSeaview: featuresLower.includes('sea view'),
    hasGolfview: featuresLower.includes('golf'),
  };
}

/**
 * Determine region based on town name
 */
function determineRegion(town: string): string {
  const townLower = town?.toLowerCase() || '';
  
  const southTowns = ['torrevieja', 'orihuela', 'guardamar', 'algorfa', 'villamartin', 'la zenia', 
    'playa flamenca', 'punta prima', 'campoamor', 'mil palmeras', 'pilar de la horadada', 
    'san miguel', 'los montesinos', 'quesada', 'rojales', 'catral', 'almoradi', 'benijofar', 
    'ciudad quesada', 'la marina', 'san fulgencio', 'dolores', 'bigastro', 'cabo roig', 
    'dehesa de campoamor', 'la finca'];
  
  const northTowns = ['javea', 'xabia', 'moraira', 'calpe', 'altea', 'benidorm', 'denia', 
    'villajoyosa', 'albir', 'alfaz del pi', 'benissa', 'teulada', 'benitachell', 'cumbre del sol', 
    'pedreguer', 'ondara', 'pego', 'parcent', 'jalon', 'gandia', 'oliva', 'finestrat', 'polop',
    'callosa', 'guadalest', 'nucia'];
  
  for (const t of southTowns) {
    if (townLower.includes(t)) return 'Costa Blanca South';
  }
  for (const t of northTowns) {
    if (townLower.includes(t)) return 'Costa Blanca North';
  }
  
  return 'Costa Blanca';
}

/**
 * Fetch and combine all properties from all feeds
 */
export async function getAllProperties(): Promise<UnifiedProperty[]> {
  // Check cache
  if (cachedProperties && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedProperties;
  }
  
  console.log('Fetching properties from all feeds...');
  
  // Fetch from both feeds in parallel
  const [redspProperties, backgroundProperties] = await Promise.all([
    parseRedspFeed(),
    parseBackgroundFeed(),
  ]);
  
  // Combine and deduplicate (REDSP preferred)
  const propertyMap = new Map<string, UnifiedProperty>();
  
  // Add Background properties first
  for (const prop of backgroundProperties) {
    propertyMap.set(prop.reference.toUpperCase(), prop);
  }
  
  // Then add/override with REDSP properties (preferred source)
  for (const prop of redspProperties) {
    propertyMap.set(prop.reference.toUpperCase(), prop);
  }
  
  const allProperties = Array.from(propertyMap.values());
  
  // Update cache
  cachedProperties = allProperties;
  cacheTimestamp = Date.now();
  
  console.log(`Total unique properties: ${allProperties.length}`);
  return allProperties;
}

/**
 * Get all property references for static generation
 */
export async function getAllPropertyReferences(): Promise<string[]> {
  const properties = await getAllProperties();
  return properties.map(p => p.reference);
}

/**
 * Get a single property by reference
 */
export async function getPropertyById(reference: string): Promise<UnifiedProperty | null> {
  const properties = await getAllProperties();
  return properties.find(p => 
    p.reference.toUpperCase() === reference.toUpperCase()
  ) || null;
}

/**
 * Search properties with filters
 */
export interface PropertyFilters {
  town?: string;
  propertyType?: string;
  minBedrooms?: number;
  maxBedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  hasPool?: boolean;
  hasSeaview?: boolean;
  hasGolfview?: boolean;
  region?: string;
}

export async function searchProperties(filters: PropertyFilters = {}): Promise<UnifiedProperty[]> {
  let properties = await getAllProperties();
  
  if (filters.town) {
    const townLower = filters.town.toLowerCase();
    properties = properties.filter(p => 
      p.town?.toLowerCase().includes(townLower)
    );
  }
  
  if (filters.propertyType) {
    const typeLower = filters.propertyType.toLowerCase();
    properties = properties.filter(p => 
      p.propertyType?.toLowerCase().includes(typeLower)
    );
  }
  
  if (filters.minBedrooms !== undefined) {
    properties = properties.filter(p => p.bedrooms >= filters.minBedrooms!);
  }
  
  if (filters.maxBedrooms !== undefined) {
    properties = properties.filter(p => p.bedrooms <= filters.maxBedrooms!);
  }
  
  if (filters.minPrice !== undefined) {
    properties = properties.filter(p => p.price >= filters.minPrice!);
  }
  
  if (filters.maxPrice !== undefined) {
    properties = properties.filter(p => p.price <= filters.maxPrice!);
  }
  
  if (filters.hasPool) {
    properties = properties.filter(p => p.hasPool);
  }
  
  if (filters.hasSeaview) {
    properties = properties.filter(p => p.hasSeaview);
  }
  
  if (filters.hasGolfview) {
    properties = properties.filter(p => p.hasGolfview);
  }
  
  if (filters.region) {
    const regionLower = filters.region.toLowerCase();
    properties = properties.filter(p => 
      p.region?.toLowerCase().includes(regionLower)
    );
  }
  
  return properties;
}

/**
 * Get properties by town
 */
export async function getPropertiesByTown(town: string): Promise<UnifiedProperty[]> {
  return searchProperties({ town });
}

/**
 * Get featured properties (properties with best features)
 */
export async function getFeaturedProperties(limit: number = 6): Promise<UnifiedProperty[]> {
  const properties = await getAllProperties();
  
  // Score properties based on features
  const scored = properties.map(p => ({
    property: p,
    score: (
      (p.hasPool ? 2 : 0) +
      (p.hasSeaview ? 3 : 0) +
      (p.hasGolfview ? 2 : 0) +
      (p.hasGarden ? 1 : 0) +
      (p.hasTerrace ? 1 : 0) +
      (p.images?.length > 5 ? 1 : 0) +
      (p.price > 300000 ? 1 : 0)
    ),
  }));
  
  // Sort by score and return top N
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.property);
}
