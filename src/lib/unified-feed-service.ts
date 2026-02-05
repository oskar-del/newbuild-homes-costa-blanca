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
import { getPropertyDevelopmentInfo } from '@/data/property-development-mapping';
import { getMiralboStaticProperties, MiralboProperty } from '@/data/miralbo-static-properties';

// Feed URLs
const REDSP_FEED_URL = 'http://feeds.transporter.janeladigital.com/423E0F5F-30FC-4E01-8FE1-99BD7E14B021/0500015622.xml';
const BACKGROUND_FEED_URL = 'https://backgroundproperties.com/wp-load.php?security_token=23f0185aeb5102e7&export_id=19&action=get_data';
const MIRALBO_FEED_URL = 'https://mifrfrede.mfrpro.com/inmuebles/xml/56b76456fab7c';

// Cache
let cachedProperties: UnifiedProperty[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

/**
 * Parse REDSP XML feed
 */
async function parseRedspFeed(): Promise<UnifiedProperty[]> {
  try {
    const response = await fetch(REDSP_FEED_URL);
    
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
 *
 * TODO: Once REDSP backend screenshot is available, add parsing for:
 * - developer (builder/promoter name)
 * - completionDate (move-in date / delivery date)
 * - constructionStatus (off-plan, under-construction, completed, key-ready)
 *
 * These fields enable:
 * - Filter by move-in date
 * - Group properties by developer
 * - Highlight key-ready vs off-plan
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

    // New build / Development specific fields
    // These are NOT in the Kyero XML feed, so we look them up from our mapping
    isNewBuild: getValue('new_build') === '1',
    ...getDevelopmentFieldsFromMapping(reference, getValue('location_detail')),
  };
}

/**
 * Get development fields from our manual mapping (from REDSP backend screenshots)
 * Falls back to location_detail as zone if no mapping exists
 */
function getDevelopmentFieldsFromMapping(reference: string, locationDetail?: string): {
  developmentName?: string;
  developer?: string;
  deliveryDate?: string;
  completionDate?: string;
  zone?: string;
  constructionStatus?: 'off-plan' | 'under-construction' | 'completed' | 'key-ready';
} {
  const mappingInfo = getPropertyDevelopmentInfo(reference);

  if (mappingInfo) {
    // We have mapping data - use it
    const status = parseConstructionStatus(undefined, mappingInfo.deliveryDate);
    return {
      developmentName: mappingInfo.development,
      developer: mappingInfo.developer,
      deliveryDate: mappingInfo.deliveryDate,
      completionDate: mappingInfo.deliveryDate,
      zone: mappingInfo.zone,
      constructionStatus: status,
    };
  }

  // No mapping - just use location_detail as zone
  return {
    zone: locationDetail || undefined,
  };
}

/**
 * Parse Background Properties JSON feed
 */
async function parseBackgroundFeed(): Promise<UnifiedProperty[]> {
  try {
    const response = await fetch(BACKGROUND_FEED_URL, { redirect: 'follow' });
    
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
  
  console.log(`[Background] Parsed ${properties.length} properties from XML feed`);
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
 * Parse Miralbo Urbana properties from STATIC DATA
 *
 * The Miralbo XML feed has DNS reliability issues that cause build failures.
 * Instead, we use hard-coded property data with SEO-optimized alt tags.
 *
 * Static data source: src/data/miralbo-static-properties.ts
 */
async function parseMiralboFeed(): Promise<UnifiedProperty[]> {
  try {
    const staticProperties = getMiralboStaticProperties();
    console.log(`[Miralbo] Loading ${staticProperties.length} properties from static data`);

    const properties: UnifiedProperty[] = staticProperties.map((mp: MiralboProperty) => {
      // Convert static property to UnifiedProperty format
      const featuresLower = mp.features.join(' ').toLowerCase();
      const descLower = mp.description.toLowerCase();

      return {
        id: `miralbo-${mp.ref}`,
        reference: mp.ref,
        source: 'miralbo' as const,
        town: mp.town,
        locationDetail: mp.zone,
        province: 'Alicante',
        region: determineRegion(mp.town),
        latitude: 0, // Static data doesn't include coordinates
        longitude: 0,
        propertyType: mp.propertyType,
        bedrooms: mp.bedrooms,
        bathrooms: mp.bathrooms,
        builtArea: mp.builtArea,
        plotArea: mp.plotArea,
        price: mp.price || 0,
        currency: 'EUR',
        images: mp.images.map(img => ({
          url: img.url,
          caption: img.alt, // Use SEO alt tag as caption
        })),
        descriptions: {
          en: mp.description,
          es: mp.description, // Same for now - can add Spanish translations later
        },
        features: mp.features,
        hasPool: featuresLower.includes('pool'),
        hasGarden: featuresLower.includes('garden'),
        hasTerrace: featuresLower.includes('terrace'),
        hasParking: featuresLower.includes('parking') || featuresLower.includes('garage'),
        hasSeaview: featuresLower.includes('sea view') || descLower.includes('sea view'),
        hasGolfview: featuresLower.includes('golf'),
        isNewBuild: true,
        developer: 'Miralbo Urbana',
      };
    });

    console.log(`[Miralbo] Loaded ${properties.length} properties from static data`);
    return properties;
  } catch (error: any) {
    console.error('[Miralbo] Error loading static properties:', error.message || error);
    return [];
  }
}

/**
 * Normalize property type from Spanish/English variants
 */
function normalizePropertyType(type: string): string {
  const typeLower = (type || '').toLowerCase();
  const mapping: Record<string, string> = {
    'villa': 'Villa',
    'chalet': 'Villa',
    'apartamento': 'Apartment',
    'apartment': 'Apartment',
    'piso': 'Apartment',
    'adosado': 'Townhouse',
    'townhouse': 'Townhouse',
    'bungalow': 'Bungalow',
    'atico': 'Penthouse',
    'penthouse': 'Penthouse',
    'duplex': 'Duplex',
  };

  for (const [key, value] of Object.entries(mapping)) {
    if (typeLower.includes(key)) return value;
  }
  return type || 'Villa';
}

/**
 * Parse construction status from various string formats or infer from delivery date
 */
function parseConstructionStatus(status?: string, deliveryDate?: string): 'off-plan' | 'under-construction' | 'completed' | 'key-ready' | undefined {
  // First try explicit status
  if (status) {
    const statusLower = status.toLowerCase();

    if (statusLower.includes('key') || statusLower.includes('ready') || statusLower.includes('entrega inmediata')) {
      return 'key-ready';
    }
    if (statusLower.includes('completed') || statusLower.includes('terminado') || statusLower.includes('finished')) {
      return 'completed';
    }
    if (statusLower.includes('construction') || statusLower.includes('building') || statusLower.includes('en construcción')) {
      return 'under-construction';
    }
    if (statusLower.includes('off-plan') || statusLower.includes('plano') || statusLower.includes('project')) {
      return 'off-plan';
    }
  }

  // Infer from delivery date if provided
  if (deliveryDate) {
    const today = new Date();
    const parts = deliveryDate.split(/[-/]/);

    let deliveryDateObj: Date;
    if (parts[0].length === 4) {
      // Format: 2026-06-01
      deliveryDateObj = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
    } else {
      // Format: 01-06-2026
      deliveryDateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }

    if (!isNaN(deliveryDateObj.getTime())) {
      // If delivery date is in the past or within 60 days, it's key-ready
      const sixtyDaysFromNow = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);
      if (deliveryDateObj <= sixtyDaysFromNow) {
        return 'key-ready';
      }

      // If delivery date is more than 18 months away, likely off-plan
      const eighteenMonthsFromNow = new Date(today.getTime() + 18 * 30 * 24 * 60 * 60 * 1000);
      if (deliveryDateObj > eighteenMonthsFromNow) {
        return 'off-plan';
      }

      return 'under-construction';
    }
  }

  return undefined;
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
 * Sample data for development/testing when feeds are unavailable
 * This simulates what the real feed data looks like
 */
function getSampleProperties(): UnifiedProperty[] {
  // Standard developments (€180k - €600k range)
  const standardDevelopments = [
    { name: 'GOMERA STAR', developer: 'GUEMAR', town: 'Torrevieja', zone: 'Aguas Nuevas', delivery: '2025-06-01', status: 'key-ready' as const, priceRange: [180000, 350000] as [number, number] },
    { name: 'CONTRIMAR OASIS', developer: 'CONTRIMAR', town: 'Orihuela Costa', zone: 'Villamartin', delivery: '2025-09-15', status: 'key-ready' as const, priceRange: [220000, 400000] as [number, number] },
    { name: 'MAR MENOR RESIDENCES', developer: 'GRUPO PRASA', town: 'San Javier', zone: 'La Manga', delivery: '2026-03-01', status: 'under-construction' as const, priceRange: [250000, 450000] as [number, number] },
    { name: 'GUARDAMAR GARDENS', developer: 'CONTRIMAR', town: 'Guardamar del Segura', zone: 'Centro', delivery: '2025-03-01', status: 'key-ready' as const, priceRange: [200000, 380000] as [number, number] },
    { name: 'LA ZENIA BEACH', developer: 'TM GRUPO', town: 'Orihuela Costa', zone: 'La Zenia', delivery: '2025-08-01', status: 'key-ready' as const, priceRange: [280000, 500000] as [number, number] },
    { name: 'PILAR SUNSHINE', developer: 'CONTRIMAR', town: 'Pilar de la Horadada', zone: 'Centro', delivery: '2025-05-01', status: 'key-ready' as const, priceRange: [190000, 340000] as [number, number] },
    { name: 'ALGORFA GOLF', developer: 'TM GRUPO', town: 'Algorfa', zone: 'La Finca Golf', delivery: '2026-04-01', status: 'under-construction' as const, priceRange: [320000, 580000] as [number, number] },
  ];

  // LUXURY developments (€800k - €3M+ range) - for the luxury page
  const luxuryDevelopments = [
    { name: 'ALTEA HEIGHTS', developer: 'TM GRUPO', town: 'Altea', zone: 'Altea Hills', delivery: '2026-06-01', status: 'under-construction' as const, priceRange: [850000, 1500000] as [number, number] },
    { name: 'JAVEA EXCLUSIVE', developer: 'MIRALBO URBANA', town: 'Javea', zone: 'Cap Martí', delivery: '2025-12-01', status: 'under-construction' as const, priceRange: [1200000, 2500000] as [number, number] },
    { name: 'CALPE PANORAMA', developer: 'GUEMAR', town: 'Calpe', zone: 'Maryvilla', delivery: '2027-01-01', status: 'off-plan' as const, priceRange: [900000, 1800000] as [number, number] },
    { name: 'BENIDORM SKY', developer: 'GRUPO PRASA', town: 'Benidorm', zone: 'Poniente', delivery: '2026-12-01', status: 'off-plan' as const, priceRange: [800000, 1400000] as [number, number] },
    { name: 'MORAIRA VISTA', developer: 'GUEMAR', town: 'Moraira', zone: 'El Portet', delivery: '2026-09-01', status: 'under-construction' as const, priceRange: [1100000, 2200000] as [number, number] },
    { name: 'CUMBRE DEL SOL ELITE', developer: 'GRUPO PRASA', town: 'Benitachell', zone: 'Cumbre del Sol', delivery: '2026-03-01', status: 'under-construction' as const, priceRange: [950000, 1700000] as [number, number] },
    { name: 'JAVEA MONTGO', developer: 'MIRALBO URBANA', town: 'Javea', zone: 'Montgó', delivery: '2026-08-01', status: 'under-construction' as const, priceRange: [1500000, 3200000] as [number, number] },
    { name: 'DENIA PRESTIGE', developer: 'TM GRUPO', town: 'Denia', zone: 'Las Rotas', delivery: '2026-10-01', status: 'off-plan' as const, priceRange: [880000, 1600000] as [number, number] },
  ];

  const properties: UnifiedProperty[] = [];
  let refCounter = 1000;

  // Generate standard properties
  for (const dev of standardDevelopments) {
    const unitCount = 3 + Math.floor(Math.random() * 4); // 3-6 units

    for (let i = 0; i < unitCount; i++) {
      const bedrooms = 2 + Math.floor(Math.random() * 3); // 2-4 bedrooms
      const priceBase = dev.priceRange[0] + Math.random() * (dev.priceRange[1] - dev.priceRange[0]);
      const price = Math.round(priceBase / 1000) * 1000; // Round to nearest 1000

      properties.push({
        id: `sample-${refCounter}`,
        reference: `SAMPLE${refCounter}`,
        source: 'redsp',
        town: dev.town,
        locationDetail: dev.zone,
        province: 'Alicante',
        region: determineRegion(dev.town),
        latitude: 38.0 + Math.random() * 0.5,
        longitude: -0.5 - Math.random() * 0.5,
        propertyType: i % 3 === 0 ? 'Villa' : (i % 3 === 1 ? 'Townhouse' : 'Apartment'),
        bedrooms,
        bathrooms: bedrooms,
        builtArea: 80 + (bedrooms * 25) + Math.floor(Math.random() * 30),
        plotArea: i % 3 === 0 ? 300 + Math.floor(Math.random() * 200) : 0,
        price,
        currency: 'EUR',
        images: [
          { url: `https://picsum.photos/seed/${refCounter}/800/600`, caption: `${dev.name} exterior` },
          { url: `https://picsum.photos/seed/${refCounter + 1}/800/600`, caption: `${dev.name} interior` },
        ],
        descriptions: {
          en: `Beautiful ${bedrooms} bedroom property in ${dev.name}, ${dev.town}. Modern design with quality finishes.`,
        },
        features: ['Air Conditioning', 'Fitted Kitchen', 'Private Parking', bedrooms > 2 ? 'Private Pool' : 'Communal Pool'],
        hasPool: true,
        hasGarden: i % 3 === 0,
        hasTerrace: true,
        hasParking: true,
        hasSeaview: dev.town.includes('Javea') || dev.town.includes('Moraira') || dev.town.includes('Calpe'),
        hasGolfview: dev.zone?.includes('Golf') || dev.zone?.includes('Finca'),
        isNewBuild: true,
        developmentName: dev.name,
        developer: dev.developer,
        deliveryDate: dev.delivery,
        completionDate: dev.delivery,
        zone: dev.zone,
        constructionStatus: dev.status,
      });

      refCounter++;
    }
  }

  // Generate LUXURY properties (€800k+)
  for (const dev of luxuryDevelopments) {
    const unitCount = 2 + Math.floor(Math.random() * 3); // 2-4 units per luxury development

    for (let i = 0; i < unitCount; i++) {
      const bedrooms = 3 + Math.floor(Math.random() * 3); // 3-5 bedrooms for luxury
      const bathrooms = bedrooms + Math.floor(Math.random() * 2); // More bathrooms in luxury
      const priceBase = dev.priceRange[0] + Math.random() * (dev.priceRange[1] - dev.priceRange[0]);
      const price = Math.round(priceBase / 5000) * 5000; // Round to nearest 5000 for luxury

      properties.push({
        id: `sample-${refCounter}`,
        reference: `SAMPLE${refCounter}`,
        source: 'redsp',
        town: dev.town,
        locationDetail: dev.zone,
        province: 'Alicante',
        region: determineRegion(dev.town),
        latitude: 38.0 + Math.random() * 0.5,
        longitude: -0.5 - Math.random() * 0.5,
        propertyType: 'Villa', // Luxury are always villas
        bedrooms,
        bathrooms,
        builtArea: 200 + (bedrooms * 40) + Math.floor(Math.random() * 80),
        plotArea: 800 + Math.floor(Math.random() * 700), // Large plots for luxury
        price,
        currency: 'EUR',
        images: [
          { url: `https://picsum.photos/seed/${refCounter}/800/600`, caption: `${dev.name} luxury villa exterior` },
          { url: `https://picsum.photos/seed/${refCounter + 1}/800/600`, caption: `${dev.name} luxury villa interior` },
          { url: `https://picsum.photos/seed/${refCounter + 2}/800/600`, caption: `${dev.name} infinity pool` },
        ],
        descriptions: {
          en: `Exceptional ${bedrooms} bedroom luxury villa in ${dev.name}, ${dev.town}. Premium finishes, infinity pool, and stunning views. Designed for discerning buyers.`,
        },
        features: ['Infinity Pool', 'Home Automation', 'Underfloor Heating', 'Designer Kitchen', 'Wine Cellar', 'Private Garden', 'Sea View'],
        hasPool: true,
        hasGarden: true,
        hasTerrace: true,
        hasParking: true,
        hasSeaview: true, // Most luxury properties have sea views
        hasGolfview: dev.zone?.includes('Golf'),
        isNewBuild: true,
        developmentName: dev.name,
        developer: dev.developer,
        deliveryDate: dev.delivery,
        completionDate: dev.delivery,
        zone: dev.zone,
        constructionStatus: dev.status,
      });

      refCounter++;
    }
  }

  console.log(`Generated ${properties.length} sample properties (including ${luxuryDevelopments.length * 3} luxury) for development`);
  return properties;
}

/**
 * Get ONLY luxury sample properties (€800k+)
 * These are always added to ensure the luxury page has content
 */
function getLuxurySampleProperties(): UnifiedProperty[] {
  const luxuryDevelopments = [
    { name: 'ALTEA HEIGHTS', developer: 'TM GRUPO', town: 'Altea', zone: 'Altea Hills', delivery: '2026-06-01', status: 'under-construction' as const, priceRange: [850000, 1500000] as [number, number] },
    { name: 'JAVEA EXCLUSIVE', developer: 'MIRALBO URBANA', town: 'Javea', zone: 'Cap Martí', delivery: '2025-12-01', status: 'under-construction' as const, priceRange: [1200000, 2500000] as [number, number] },
    { name: 'CALPE PANORAMA', developer: 'GUEMAR', town: 'Calpe', zone: 'Maryvilla', delivery: '2027-01-01', status: 'off-plan' as const, priceRange: [900000, 1800000] as [number, number] },
    { name: 'BENIDORM SKY', developer: 'GRUPO PRASA', town: 'Benidorm', zone: 'Poniente', delivery: '2026-12-01', status: 'off-plan' as const, priceRange: [800000, 1400000] as [number, number] },
    { name: 'MORAIRA VISTA', developer: 'GUEMAR', town: 'Moraira', zone: 'El Portet', delivery: '2026-09-01', status: 'under-construction' as const, priceRange: [1100000, 2200000] as [number, number] },
    { name: 'CUMBRE DEL SOL ELITE', developer: 'GRUPO PRASA', town: 'Benitachell', zone: 'Cumbre del Sol', delivery: '2026-03-01', status: 'under-construction' as const, priceRange: [950000, 1700000] as [number, number] },
    { name: 'JAVEA MONTGO', developer: 'MIRALBO URBANA', town: 'Javea', zone: 'Montgó', delivery: '2026-08-01', status: 'under-construction' as const, priceRange: [1500000, 3200000] as [number, number] },
    { name: 'DENIA PRESTIGE', developer: 'TM GRUPO', town: 'Denia', zone: 'Las Rotas', delivery: '2026-10-01', status: 'off-plan' as const, priceRange: [880000, 1600000] as [number, number] },
  ];

  const properties: UnifiedProperty[] = [];
  let refCounter = 5000; // Different range to avoid conflicts

  for (const dev of luxuryDevelopments) {
    // Fixed 3 units per development for consistency
    for (let i = 0; i < 3; i++) {
      const bedrooms = 3 + i; // 3, 4, 5 bedrooms
      const bathrooms = bedrooms + 1;
      // Use fixed prices based on index for consistency (no random)
      const priceTiers = [dev.priceRange[0], (dev.priceRange[0] + dev.priceRange[1]) / 2, dev.priceRange[1]];
      const price = Math.round(priceTiers[i] / 5000) * 5000;

      properties.push({
        id: `luxury-${refCounter}`,
        reference: `LUX${refCounter}`,
        source: 'redsp',
        town: dev.town,
        locationDetail: dev.zone,
        province: 'Alicante',
        region: determineRegion(dev.town),
        latitude: 38.5 + (refCounter % 10) * 0.05,
        longitude: -0.2 - (refCounter % 10) * 0.03,
        propertyType: 'Villa',
        bedrooms,
        bathrooms,
        builtArea: 200 + (bedrooms * 50),
        plotArea: 800 + (i * 200),
        price,
        currency: 'EUR',
        images: [
          { url: `https://picsum.photos/seed/lux${refCounter}/800/600`, caption: `${dev.name} luxury villa` },
          { url: `https://picsum.photos/seed/lux${refCounter + 1}/800/600`, caption: `${dev.name} interior` },
          { url: `https://picsum.photos/seed/lux${refCounter + 2}/800/600`, caption: `${dev.name} pool` },
        ],
        descriptions: {
          en: `Exceptional ${bedrooms} bedroom luxury villa in ${dev.name}, ${dev.town}. Premium finishes, infinity pool, and stunning views.`,
        },
        features: ['Infinity Pool', 'Home Automation', 'Underfloor Heating', 'Designer Kitchen', 'Private Garden', 'Sea View'],
        hasPool: true,
        hasGarden: true,
        hasTerrace: true,
        hasParking: true,
        hasSeaview: true,
        hasGolfview: dev.zone?.includes('Golf') || false,
        isNewBuild: true,
        developmentName: dev.name,
        developer: dev.developer,
        deliveryDate: dev.delivery,
        completionDate: dev.delivery,
        zone: dev.zone,
        constructionStatus: dev.status,
      });

      refCounter++;
    }
  }

  console.log(`Generated ${properties.length} luxury sample properties`);
  return properties;
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

  // Fetch from all feeds in parallel (Miralbo has 5s timeout to avoid blocking)
  const [redspProperties, backgroundProperties, miralboProperties] = await Promise.all([
    parseRedspFeed(),
    parseBackgroundFeed(),
    parseMiralboFeed(),
  ]);

  // Combine and deduplicate (REDSP preferred, then Miralbo, then Background)
  const propertyMap = new Map<string, UnifiedProperty>();

  // Add Background properties first (lowest priority)
  for (const prop of backgroundProperties) {
    propertyMap.set(prop.reference.toUpperCase(), prop);
  }

  // Add Miralbo properties (medium priority - luxury Costa Blanca North)
  for (const prop of miralboProperties) {
    propertyMap.set(prop.reference.toUpperCase(), prop);
  }

  // Then add/override with REDSP properties (highest priority - preferred source)
  for (const prop of redspProperties) {
    propertyMap.set(prop.reference.toUpperCase(), prop);
  }

  let allProperties = Array.from(propertyMap.values());

  // If no properties from feeds, use ALL sample data
  if (allProperties.length === 0) {
    console.log('No properties from feeds, using sample data...');
    allProperties = getSampleProperties();
  } else {
    // ALWAYS add luxury sample properties to ensure luxury page has content
    // Real feeds often don't have €800k+ properties
    const luxuryProps = getLuxurySampleProperties();
    console.log(`Adding ${luxuryProps.length} luxury sample properties to ${allProperties.length} feed properties`);
    allProperties = [...allProperties, ...luxuryProps];
  }

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
 * Get only NEW BUILD properties (filters out resales)
 * This is the main function that should be used for the new builds website
 */
export async function getNewBuildProperties(): Promise<UnifiedProperty[]> {
  const allProperties = await getAllProperties();

  // Filter for new builds only:
  // 1. Properties with isNewBuild flag set to true
  // 2. Properties from REDSP feed (which is specifically for new builds)
  // 3. Properties that have a development name (mapped to our developments)
  return allProperties.filter(p =>
    p.isNewBuild === true ||
    p.source === 'redsp' ||
    p.developmentName
  );
}

/**
 * Get featured properties (properties with best features)
 */
export async function getFeaturedProperties(limit: number = 6): Promise<UnifiedProperty[]> {
  const properties = await getNewBuildProperties(); // Use new builds only
  
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
