/**
 * Development Service
 *
 * Aggregates properties into developments (projects) and provides
 * development-level data for listing and detail pages.
 *
 * Uses fetchXMLFeed from xml-parser.ts (which works) and combines
 * with our property-development-mapping for development/builder info.
 */

import { fetchXMLFeed, ParsedProperty, formatPrice } from './xml-parser';
import { getPropertyDevelopmentInfo, getAllMappedDevelopments, propertyMapping, PropertyDevelopmentInfo } from '@/data/property-development-mapping';

/**
 * Development (Project) interface
 */
export interface Development {
  // Identity
  slug: string;                      // URL-friendly: "gomera-star"
  name: string;                      // Display name: "GOMERA STAR"

  // Builder/Developer
  developer: string;                 // "GUEMAR"
  developerSlug: string;             // "guemar"

  // Location
  town: string;                      // "Torrevieja"
  zone?: string;                     // "Aguas Nuevas"
  region: string;                    // "Costa Blanca South"
  province: string;

  // Delivery/Status
  deliveryDate?: string;             // "01-06-2026"
  deliveryQuarter?: string;          // "Q2 2026"
  status: 'key-ready' | 'under-construction' | 'off-plan' | 'completed';

  // Units summary
  totalUnits: number;
  availableUnits: number;

  // Price range
  priceFrom: number;
  priceTo: number;
  priceRange: string;                // "€274,900 - €499,900"

  // Property types in development
  propertyTypes: string[];           // ["Apartment", "Villa"]
  bedroomRange: string;              // "2-3"
  minBedrooms: number;
  maxBedrooms: number;
  bedroomBreakdown: string[];        // ["2 bed", "3 bed", "Penthouse"]

  // Property sizes
  sizeRange?: string;                // "75-120m²"
  minSize?: number;
  maxSize?: number;

  // Amenities (extracted from descriptions)
  amenities: string[];               // ["Pool", "Gym", "Spa", "Gardens"]
  hasPool: boolean;
  hasGym: boolean;
  hasSpa: boolean;
  hasGarden: boolean;
  hasSeaview: boolean;
  hasGolfview: boolean;

  // Media
  mainImage: string;
  images: string[];

  // Units (property references)
  unitReferences: string[];

  // AI Content (to be generated)
  description?: string;
  highlights?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

/**
 * Builder/Developer interface
 */
export interface Builder {
  slug: string;
  name: string;
  developmentCount: number;
  totalUnits: number;
  developments: string[];            // Development slugs
  priceRange: string;
  regions: string[];
  towns: string[];
}

// Cache
let developmentsCache: Development[] | null = null;
let buildersCache: Map<string, Builder> | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

/**
 * Create URL-friendly slug from name
 */
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * AUTHORITATIVE Zone-to-Town mapping
 * The feed often has wrong towns, so we use zones from our mapping to determine correct town
 */
const ZONE_TO_TOWN: Record<string, string> = {
  // TORREVIEJA zones
  'playa de el cura': 'Torrevieja',
  'playa del cura': 'Torrevieja',
  'playa el cura': 'Torrevieja',
  'la mata': 'Torrevieja',
  'aguas nuevas': 'Torrevieja',
  'los balcones': 'Torrevieja',
  'la siesta': 'Torrevieja',
  'el chaparral': 'Torrevieja',
  'el limonar': 'Torrevieja',
  'acequion': 'Torrevieja',
  'playa los naufragos': 'Torrevieja',
  'playa los locos': 'Torrevieja',
  'centro': 'Torrevieja',

  // ORIHUELA COSTA zones
  'la zenia': 'Orihuela Costa',
  'playa flamenca': 'Orihuela Costa',
  'cabo roig': 'Orihuela Costa',
  'campoamor': 'Orihuela Costa',
  'villamartin': 'Orihuela Costa',
  'las filipinas': 'Orihuela Costa',
  'pau 26': 'Orihuela Costa',
  'dehesa de campoamor': 'Orihuela Costa',
  'la florida': 'Orihuela Costa',
  'los dolses': 'Orihuela Costa',
  'las ramblas': 'Orihuela Costa',
  'dream hills': 'Orihuela Costa',
  'la regia': 'Orihuela Costa',
  'aguamarina': 'Orihuela Costa',
  'punta prima': 'Orihuela Costa', // Note: can also be Torrevieja, but usually OC
  'los altos': 'Orihuela Costa',

  // PILAR DE LA HORADADA zones
  'mil palmeras': 'Pilar de la Horadada',
  'torre de la horadada': 'Pilar de la Horadada',
  'el mojon': 'Pilar de la Horadada',
  'pueblo': 'Pilar de la Horadada', // generic, but often Pilar

  // GUARDAMAR zones
  'el raso': 'Guardamar del Segura',
  'los gavilanes': 'Guardamar del Segura',

  // ROJALES / QUESADA zones
  'doña pepa': 'Rojales',
  'ciudad quesada': 'Ciudad Quesada',
  'quesada': 'Ciudad Quesada',
  'formentera del segura': 'Formentera del Segura',

  // GOLF RESORTS (Inland)
  'vistabella golf': 'Vistabella Golf',
  'vistabella': 'Vistabella Golf',
  'lo romero golf': 'Lo Romero Golf',
  'lo romero': 'Lo Romero Golf',
  'la finca golf': 'La Finca Golf',
  'la finca': 'La Finca Golf',
  'las colinas golf': 'Las Colinas Golf',
  'las colinas': 'Las Colinas Golf',

  // COSTA CALIDA / MAR MENOR zones
  'los narejos': 'Los Alcázares',
  'lo serena golf': 'Los Alcázares',
  'serena golf': 'Los Alcázares',
  'lo serena': 'Los Alcázares',
  'mar menor': 'San Javier',
  'mar menor golf': 'San Javier',
  'los antolinos': 'San Pedro del Pinatar',
  'parque del olivo': 'San Javier',
  'el abito': 'Torre Pacheco',
  'mar de plata': 'Puerto de Mazarrón',
  'country club': 'Mazarrón',
  'antreos': 'Alhama de Murcia',

  // COSTA BLANCA NORTH zones
  'cumbre del sol': 'Benitachell',
  'golden valley': 'Benitachell',
  'valle del sol': 'Jávea',
  'los llomios': 'Jávea',
  'sierra de altea': 'Altea',
  'campana garden': 'Finestrat',
  'muchavista': 'El Campello',
  'la tellerola': 'Villajoyosa',

  // OTHER INLAND
  'sector 2': 'Dolores', // Essence III Dolores
  'benfis park': 'Benferri',
  'campo': 'Pinoso',
};

/**
 * Get correct town from zone (uses our authoritative mapping)
 */
function getTownFromZone(zone: string | undefined): string | undefined {
  if (!zone) return undefined;
  const zoneLower = zone.toLowerCase().trim();
  return ZONE_TO_TOWN[zoneLower];
}

/**
 * Determine region from town name
 */
function determineRegion(town: string): string {
  const townLower = town.toLowerCase();

  // Costa Calida / Murcia region - check FIRST (more specific)
  const murciaAreas = [
    'murcia', 'mazarron', 'cartagena', 'los alcazares', 'alcazares',
    'san javier', 'san pedro del pinatar', 'torre pacheco', 'la manga',
    'mar menor', 'santiago de la ribera', 'aguilas', 'fuente alamo',
    'sucina', 'roldan', 'lo pagan', 'los narejos', 'los urrutias',
    'la union', 'puerto de mazarron', 'bolnuevo', 'isla plana',
    // Golf courses and developments in the Los Alcázares / Mar Menor area
    'serena golf', 'lo serena', 'santa rosalia', 'torre del morro',
    'roda golf', 'hacienda riquelme', 'mar menor golf', 'la torre golf'
  ];
  for (const area of murciaAreas) {
    if (townLower.includes(area)) return 'Costa Calida';
  }

  // Costa Blanca North
  const northAreas = [
    'javea', 'xabia', 'denia', 'moraira', 'altea', 'calpe', 'benidorm',
    'villajoyosa', 'finestrat', 'alfaz', 'albir', 'benitachell', 'teulada',
    'benissa', 'pedreguer', 'ondara', 'gata', 'els poblets', 'la nucia',
    'polop', 'cumbre del sol', 'pego', 'oliva'
  ];
  for (const area of northAreas) {
    if (townLower.includes(area)) return 'Costa Blanca North';
  }

  // Default to Costa Blanca South
  return 'Costa Blanca South';
}

/**
 * Parse delivery date to quarter format
 */
function getDeliveryQuarter(deliveryDate?: string): string | undefined {
  if (!deliveryDate) return undefined;

  // Try to parse date formats like "01-06-2026" or "2026-06-01"
  const parts = deliveryDate.split(/[-/]/);
  if (parts.length < 3) return undefined;

  let year: string, month: number;

  if (parts[0].length === 4) {
    // Format: 2026-06-01
    year = parts[0];
    month = parseInt(parts[1]);
  } else {
    // Format: 01-06-2026
    year = parts[2];
    month = parseInt(parts[1]);
  }

  if (isNaN(month)) return undefined;

  const quarter = Math.ceil(month / 3);
  return `Q${quarter} ${year}`;
}

/**
 * Determine status from delivery date
 */
function determineStatus(deliveryDate?: string): Development['status'] {
  if (!deliveryDate) return 'under-construction';

  const today = new Date();
  const parts = deliveryDate.split(/[-/]/);

  let deliveryDateObj: Date;
  if (parts[0].length === 4) {
    deliveryDateObj = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
  } else {
    deliveryDateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  }

  if (isNaN(deliveryDateObj.getTime())) return 'under-construction';

  // If delivery date is in the past or within 30 days, it's key-ready
  const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  if (deliveryDateObj <= thirtyDaysFromNow) {
    return 'key-ready';
  }

  // If delivery date is more than 18 months away, likely off-plan
  const eighteenMonthsFromNow = new Date(today.getTime() + 18 * 30 * 24 * 60 * 60 * 1000);
  if (deliveryDateObj > eighteenMonthsFromNow) {
    return 'off-plan';
  }

  return 'under-construction';
}

/**
 * Aggregate properties into developments
 *
 * Strategy: Build developments from our property-development-mapping file,
 * then try to enrich with property data from the XML feed if refs match.
 */
export async function getAllDevelopments(): Promise<Development[]> {
  // Check cache
  if (developmentsCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return developmentsCache;
  }

  // Fetch properties from the feed (for enrichment)
  let feedProperties: ParsedProperty[] = [];
  try {
    feedProperties = await fetchXMLFeed();
    console.log(`[DEV-SERVICE] Fetched ${feedProperties.length} properties from feed`);
  } catch (error) {
    console.error('[DEV-SERVICE] Failed to fetch feed, using mapping only:', error);
  }

  // Create a lookup by ref for quick matching
  // STRICT matching only - no prefix guessing to avoid cross-contamination
  const feedByRef = new Map<string, ParsedProperty>();
  for (const prop of feedProperties) {
    const ref = prop.ref;
    const id = prop.id;

    // Add original ref and id (both as-is and uppercase)
    if (ref) {
      feedByRef.set(ref, prop);
      feedByRef.set(ref.toUpperCase(), prop);
      feedByRef.set(ref.toLowerCase(), prop);
    }
    if (id && id !== ref) {
      feedByRef.set(id, prop);
      feedByRef.set(id.toUpperCase(), prop);
      feedByRef.set(id.toLowerCase(), prop);
    }
  }

  console.log(`[DEV-SERVICE] Built ref lookup with ${feedByRef.size} entries from ${feedProperties.length} feed properties`);

  // Debug: Log some sample refs from feed
  const sampleRefs = feedProperties.slice(0, 10).map(p => `${p.ref}(id:${p.id})`);
  console.log(`[DEV-SERVICE] Sample feed refs: ${sampleRefs.join(', ')}`);

  // Check for VAPI refs specifically
  const vapiRefs = ['SP0693', 'SP0731', 'SP0732', 'SP0736'];
  for (const vr of vapiRefs) {
    const found = feedByRef.get(vr);
    if (found) {
      console.log(`[DEV-SERVICE] Found ${vr} in feed: town=${found.town}, price=${found.price}, images=${found.images?.length || 0}`);
    } else {
      console.log(`[DEV-SERVICE] NOT found: ${vr}`);
    }
  }

  // Build developments from our mapping (the authoritative source)
  const developmentMap = new Map<string, {
    refs: string[];
    devInfo: PropertyDevelopmentInfo;
    properties: ParsedProperty[];
  }>();

  // Group property mapping by development
  for (const [ref, info] of Object.entries(propertyMapping)) {
    const key = info.development.toUpperCase().trim();

    if (!developmentMap.has(key)) {
      developmentMap.set(key, {
        refs: [],
        devInfo: info,
        properties: [],
      });
    }

    developmentMap.get(key)!.refs.push(ref);

    // Try to find matching property in feed - STRICT exact match only
    const feedProp = feedByRef.get(ref);
    if (feedProp) {
      // Double-check this property actually belongs to this development by comparing refs
      if (feedProp.ref === ref || feedProp.id === ref) {
        developmentMap.get(key)!.properties.push(feedProp);
      }
    }
  }

  console.log(`[DEV-SERVICE] Built ${developmentMap.size} developments from mapping`);

  // Convert to Development objects
  const developments: Development[] = [];

  for (const [key, data] of developmentMap) {
    const { properties: units, devInfo, refs } = data;
    const hasUnits = units.length > 0;

    const name = devInfo.development;
    const slug = createSlug(name);

    // Calculate price range from units or use placeholder
    const prices = units.map(u => u.price).filter((p): p is number => p !== null && p > 0);
    const priceFrom = prices.length > 0 ? Math.min(...prices) : 199000; // placeholder
    const priceTo = prices.length > 0 ? Math.max(...prices) : 499000; // placeholder

    // Get bedroom range from units or use placeholder
    const bedrooms = units.map(u => u.bedrooms).filter((b): b is number => b !== null && b > 0);
    const uniqueBedrooms = [...new Set(bedrooms)].sort((a, b) => a - b);
    const minBedrooms = bedrooms.length > 0 ? Math.min(...bedrooms) : 2;
    const maxBedrooms = bedrooms.length > 0 ? Math.max(...bedrooms) : 3;

    // Build bedroom breakdown for display (e.g., "2 bed, 3 bed & Penthouses")
    const bedroomBreakdown: string[] = [];
    if (uniqueBedrooms.includes(1)) bedroomBreakdown.push('1 bed');
    if (uniqueBedrooms.includes(2)) bedroomBreakdown.push('2 bed');
    if (uniqueBedrooms.includes(3)) bedroomBreakdown.push('3 bed');
    if (uniqueBedrooms.some(b => b >= 4)) bedroomBreakdown.push('4+ bed');

    // Get property types from units or use default
    const propertyTypes = hasUnits
      ? [...new Set(units.map(u => u.propertyType).filter(Boolean))]
      : ['Apartment'];

    // Add "Penthouse" if property types include it
    const hasPenthouse = propertyTypes.some(t =>
      t.toLowerCase().includes('penthouse') || t.toLowerCase().includes('ático')
    );
    if (hasPenthouse && !bedroomBreakdown.includes('Penthouse')) {
      bedroomBreakdown.push('Penthouse');
    }

    // Get size range
    const sizes = units.map(u => u.size).filter((s): s is number => s !== null && s > 0);
    const minSize = sizes.length > 0 ? Math.min(...sizes) : undefined;
    const maxSize = sizes.length > 0 ? Math.max(...sizes) : undefined;
    const sizeRange = minSize && maxSize
      ? minSize === maxSize
        ? `${minSize}m²`
        : `${minSize}-${maxSize}m²`
      : undefined;

    // Collect images ONLY from matched units - strict isolation
    // IMPORTANT: Only use images if we have VERIFIED matched units
    const verifiedImages: string[] = [];
    if (units.length > 0) {
      // We have matched units - use their images
      for (const unit of units) {
        // Double-verify this unit belongs to this development by checking ref is in our refs list
        if (refs.includes(unit.ref) && unit.images) {
          verifiedImages.push(...unit.images.filter(Boolean));
        }
      }
    }
    const uniqueImages = [...new Set(verifiedImages)];

    // Debug: Log image sources for developments
    if (units.length > 0) {
      console.log(`[DEV-SERVICE] ${name}: ${units.length} matched units, ${uniqueImages.length} verified images from refs: ${units.map(u => u.ref).join(', ')}`);
    } else {
      console.log(`[DEV-SERVICE] ${name}: No matched units (refs: ${refs.slice(0,3).join(', ')}...)`);
    }

    // Determine delivery info from mapping
    const deliveryDate = devInfo.deliveryDate;
    const deliveryQuarter = getDeliveryQuarter(deliveryDate);
    const status = determineStatus(deliveryDate);

    // Developer info
    const developer = devInfo.developer;
    const developerSlug = createSlug(developer);

    // Get town - PRIORITY: 1) Zone mapping (authoritative), 2) Feed town, 3) Zone as fallback
    // This fixes issues where feed has wrong towns
    const zoneBasedTown = getTownFromZone(devInfo.zone);
    const feedTown = hasUnits ? units[0].town : undefined;
    const town = zoneBasedTown || feedTown || devInfo.zone || 'Costa Blanca';
    const province = hasUnits ? (units[0].province || 'Alicante') : 'Alicante';

    // Extract amenities from descriptions
    const allDescriptions = units.map(u => u.description).join(' ').toLowerCase();
    const hasPool = /\b(pool|piscina|swimming)\b/i.test(allDescriptions);
    const hasGym = /\b(gym|gimnasio|fitness)\b/i.test(allDescriptions);
    const hasSpa = /\b(spa|jacuzzi|sauna|wellness)\b/i.test(allDescriptions);
    const hasGarden = /\b(garden|jardín|jardin|landscaped)\b/i.test(allDescriptions);
    const hasSeaview = /\b(sea view|seaview|vista al mar|mediterranean view)\b/i.test(allDescriptions);
    const hasGolfview = /\b(golf view|golf course|campo de golf)\b/i.test(allDescriptions) ||
                        devInfo.zone?.toLowerCase().includes('golf') ||
                        name.toLowerCase().includes('golf');

    // Build amenities list
    const amenities: string[] = [];
    if (hasPool) amenities.push('Pool');
    if (hasGym) amenities.push('Gym');
    if (hasSpa) amenities.push('Spa');
    if (hasGarden) amenities.push('Gardens');
    if (hasSeaview) amenities.push('Sea View');
    if (hasGolfview) amenities.push('Golf');

    developments.push({
      slug,
      name,
      developer,
      developerSlug,
      town,
      zone: devInfo.zone,
      region: determineRegion(town),
      province,
      deliveryDate,
      deliveryQuarter,
      status,
      totalUnits: refs.length, // Use mapping count, not matched units
      availableUnits: refs.length,
      priceFrom,
      priceTo,
      priceRange: priceFrom === priceTo
        ? formatPrice(priceFrom)
        : `${formatPrice(priceFrom)} - ${formatPrice(priceTo)}`,
      propertyTypes,
      bedroomRange: minBedrooms === maxBedrooms
        ? `${minBedrooms}`
        : `${minBedrooms}-${maxBedrooms}`,
      minBedrooms,
      maxBedrooms,
      bedroomBreakdown: bedroomBreakdown.length > 0 ? bedroomBreakdown : ['2 bed', '3 bed'],
      sizeRange,
      minSize,
      maxSize,
      amenities,
      hasPool,
      hasGym,
      hasSpa,
      hasGarden,
      hasSeaview,
      hasGolfview,
      mainImage: uniqueImages[0] || '/images/placeholder-development.svg',
      images: uniqueImages.slice(0, 10),
      unitReferences: refs, // Use all refs from mapping
    });
  }

  // Sort by number of units (most popular first)
  developments.sort((a, b) => b.totalUnits - a.totalUnits);

  // Cache the results
  developmentsCache = developments;
  cacheTimestamp = Date.now();

  console.log(`Returning ${developments.length} developments`);
  return developments;
}

/**
 * Get a single development by slug
 *
 * Fallback strategy:
 * 1. First tries to find by dynamic slug (from name)
 * 2. If not found, checks static developments.ts data for matching slug
 *
 * This handles cases where static slugs differ from what createSlug() would generate,
 * e.g., "GRECIA II" -> dynamic slug "grecia-ii" but static slug is "grecia-ii-la-finca"
 */
export async function getDevelopmentBySlug(slug: string): Promise<Development | null> {
  const developments = await getAllDevelopments();

  // First try: exact match by dynamic slug
  const development = developments.find(d => d.slug === slug);
  if (development) {
    return development;
  }

  // Fallback: check static developments data for matching slug
  try {
    const { developments: staticDevelopments } = await import('@/data/developments');
    const staticDevelopment = staticDevelopments.find(d => d.slug === slug);

    if (staticDevelopment) {
      // Convert static development format to service Development format
      // Find the matching development in our dynamically generated list by name
      const dynamicDev = developments.find(d => d.name.toUpperCase() === staticDevelopment.name.toUpperCase());
      if (dynamicDev) {
        return dynamicDev;
      }
    }
  } catch (error) {
    console.error('[DEV-SERVICE] Failed to load static developments fallback:', error);
  }

  return null;
}

/**
 * Get all development slugs (for static generation)
 *
 * Returns all unique slugs including:
 * - Dynamic slugs generated from development names
 * - Static slugs from developments.ts that differ from dynamic slugs
 *
 * This ensures Next.js static generation covers all valid development routes
 */
export async function getAllDevelopmentSlugs(): Promise<string[]> {
  const developments = await getAllDevelopments();
  const dynamicSlugs = developments.map(d => d.slug);

  // Add static development slugs that may differ from dynamic ones
  let staticSlugs: string[] = [];
  try {
    const { developments: staticDevelopments } = await import('@/data/developments');
    staticSlugs = staticDevelopments.map(d => d.slug);
  } catch (error) {
    console.error('[DEV-SERVICE] Failed to load static development slugs:', error);
  }

  // Combine and deduplicate
  const allSlugs = [...new Set([...dynamicSlugs, ...staticSlugs])];
  return allSlugs;
}

/**
 * Get units for a development by slug
 * Returns the properties associated with a development
 */
export async function getDevelopmentUnits(slug: string): Promise<ParsedProperty[]> {
  const development = await getDevelopmentBySlug(slug);
  if (!development) return [];

  // Get all properties and filter by unit references
  // Wrap in try-catch to handle feed failures gracefully
  try {
    const properties = await fetchXMLFeed();
    if (!Array.isArray(properties)) return [];
    return properties.filter(p => development.unitReferences.includes(p.ref));
  } catch (error) {
    console.error('[DEV-SERVICE] Failed to fetch units for development:', slug, error);
    return [];
  }
}

/**
 * Get all unique builders
 */
export async function getAllBuilders(): Promise<Builder[]> {
  // Check cache
  if (buildersCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return Array.from(buildersCache.values());
  }

  const developments = await getAllDevelopments();
  const builderMap = new Map<string, Builder>();

  for (const dev of developments) {
    const key = dev.developerSlug;

    if (!builderMap.has(key)) {
      builderMap.set(key, {
        slug: dev.developerSlug,
        name: dev.developer,
        developmentCount: 0,
        totalUnits: 0,
        developments: [],
        priceRange: '',
        regions: [],
        towns: [],
      });
    }

    const builder = builderMap.get(key)!;
    builder.developmentCount++;
    builder.totalUnits += dev.totalUnits;
    builder.developments.push(dev.slug);

    if (!builder.regions.includes(dev.region)) {
      builder.regions.push(dev.region);
    }
    if (!builder.towns.includes(dev.town)) {
      builder.towns.push(dev.town);
    }
  }

  // Calculate price ranges
  for (const builder of builderMap.values()) {
    const builderDevs = developments.filter(d => d.developerSlug === builder.slug);
    const prices = builderDevs.flatMap(d => [d.priceFrom, d.priceTo]).filter(p => p > 0);
    if (prices.length > 0) {
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      builder.priceRange = `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
    }
  }

  // Cache
  buildersCache = builderMap;

  // Sort by number of developments
  return Array.from(builderMap.values()).sort((a, b) => b.developmentCount - a.developmentCount);
}

/**
 * Get a single builder by slug
 */
export async function getBuilderBySlug(slug: string): Promise<Builder | null> {
  const builders = await getAllBuilders();
  return builders.find(b => b.slug === slug) || null;
}

/**
 * Get developments for a specific builder
 */
export async function getDevelopmentsByBuilder(builderSlug: string): Promise<Development[]> {
  try {
    const developments = await getAllDevelopments();
    if (!Array.isArray(developments)) return [];
    return developments.filter(d => d.developerSlug === builderSlug);
  } catch (error) {
    console.error('[DEV-SERVICE] Failed to get developments by builder:', builderSlug, error);
    return [];
  }
}

/**
 * Get developments by town name
 */
export async function getDevelopmentsByTown(town: string): Promise<Development[]> {
  try {
    const developments = await getAllDevelopments();
    if (!Array.isArray(developments)) return [];
    const townLower = town.toLowerCase();

    return developments.filter(d => {
      const devTown = d.town.toLowerCase();
      const devZone = (d.zone || '').toLowerCase();

      // Check if development's town or zone matches the specified town
      return devTown.includes(townLower) ||
             townLower.includes(devTown) ||
             devZone.includes(townLower) ||
             townLower.includes(devZone);
    });
  } catch (error) {
    console.error('[DEV-SERVICE] Failed to get developments by town:', town, error);
    return [];
  }
}

/**
 * Get developments by area/region
 */
export async function getDevelopmentsByArea(area: string): Promise<Development[]> {
  const developments = await getAllDevelopments();
  const areaLower = area.toLowerCase();

  return developments.filter(d => {
    const devRegion = d.region.toLowerCase();
    const devTown = d.town.toLowerCase();
    const devZone = (d.zone || '').toLowerCase();

    return devRegion.includes(areaLower) ||
           devTown.includes(areaLower) ||
           devZone.includes(areaLower);
  });
}

/**
 * Get developments near golf courses (by nearby towns)
 */
export async function getDevelopmentsByGolfCourse(nearbyTowns: string[]): Promise<Development[]> {
  const developments = await getAllDevelopments();
  const townsLower = nearbyTowns.map(t => t.toLowerCase());

  return developments.filter(d => {
    const devTown = d.town.toLowerCase();
    const devZone = (d.zone || '').toLowerCase();

    // Check if development's town or zone matches any nearby town
    return townsLower.some(town =>
      devTown.includes(town) || town.includes(devTown) ||
      devZone.includes(town) || town.includes(devZone)
    );
  });
}

/**
 * Get development statistics
 */
export async function getDevelopmentStats(): Promise<{
  totalDevelopments: number;
  totalUnits: number;
  totalBuilders: number;
  builderCount: number;
  keyReadyCount: number;
  underConstructionCount: number;
  offPlanCount: number;
  averagePrice: number;
  lowestPrice: number;
  priceRange: string;
}> {
  const developments = await getAllDevelopments();
  const builders = await getAllBuilders();

  const allPrices = developments.flatMap(d => [d.priceFrom, d.priceTo]).filter(p => p > 0);
  const avgPrice = allPrices.length > 0
    ? allPrices.reduce((a, b) => a + b, 0) / allPrices.length
    : 0;
  const lowestPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;

  return {
    totalDevelopments: developments.length,
    totalUnits: developments.reduce((sum, d) => sum + d.totalUnits, 0),
    totalBuilders: builders.length,
    builderCount: builders.length,
    keyReadyCount: developments.filter(d => d.status === 'key-ready' || d.status === 'completed').length,
    underConstructionCount: developments.filter(d => d.status === 'under-construction').length,
    offPlanCount: developments.filter(d => d.status === 'off-plan').length,
    averagePrice: Math.round(avgPrice),
    lowestPrice,
    priceRange: allPrices.length > 0
      ? `${formatPrice(Math.min(...allPrices))} - ${formatPrice(Math.max(...allPrices))}`
      : 'Contact for pricing',
  };
}
