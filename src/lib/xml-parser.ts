import { XMLParser } from 'fast-xml-parser';
import {
  FEED_URLS,
  getRegionForTown,
  isInlandTown,
  isInTargetArea,
  isExcludedProvince,
  isExcludedTown,
  REGIONS,
  type RegionKey,
} from './feed-config';

// Re-export feed config for convenience
export * from './feed-config';

export interface ParsedProperty {
  id: string;
  title: string;
  slug: string;
  price: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  size: number | null;
  plotSize: number | null;
  description: string;
  images: string[];
  town: string;
  province: string;
  region: RegionKey | null; // Determined from feed-config.ts
  developer: string;
  developerSlug: string;
  developmentName: string;
  developmentSlug: string;
  propertyType: string;
  status: string;
  isNewBuild: boolean;
  ref: string;
}

export interface ParsedDevelopment {
  slug: string;
  name: string;
  developer: string;
  developerSlug: string;
  town: string;
  province: string;
  propertyCount: number;
  priceFrom: number | null;
  priceTo: number | null;
  bedroomsRange: string;
  images: string[];
  properties: ParsedProperty[];
  description: string;
}

// Feed URLs from centralized config
const GENERAL_FEED_URL = FEED_URLS.general;
const BACKGROUND_FEED_URL = FEED_URLS.background;
const MIRALBO_FEED_URL = FEED_URLS.miralbo;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractProjectName(description: string, propertyType: string, ref: string): string {
  // Try to extract villa/project name from description
  // Patterns: "present Villa Elysia", "Villa Elysia,", "Villa Elysia is"
  const patterns = [
    /present\s+(Villa\s+\w+)/i,
    /presenting\s+(Villa\s+\w+)/i,
    /(Villa\s+\w+),/i,
    /(Villa\s+\w+)\s+is/i,
    /(Villa\s+\w+)\s+offers/i,
    /(Villa\s+\w+)\s+features/i,
    /welcome\s+to\s+(Villa\s+\w+)/i,
    /discover\s+(Villa\s+\w+)/i,
    /(Residencial\s+\w+)/i,
    /(Apartamentos\s+\w+)/i,
  ];

  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  // Fallback: use property type + ref
  return `${propertyType} ${ref}`;
}

// All province/town filtering is now in feed-config.ts
// Using: isInTargetArea, isExcludedProvince, isExcludedTown, getRegionForTown

/**
 * Fetch a single XML feed and parse it
 */
async function fetchSingleFeed(url: string, feedName: string, filterByArea: boolean = false): Promise<ParsedProperty[]> {
  try {
    const response = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      console.error(`[XML-PARSER] ${feedName} fetch failed:`, response.status);
      return [];
    }

    const xml = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '_text',
    });

    const data = parser.parse(xml);
    const properties = data?.root?.property || [];
    const agent = data?.root?.agent || {};

    const developerName = typeof agent.name === 'string'
      ? agent.name.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim()
      : 'Unknown Developer';
    const developerSlug = slugify(developerName);

    const propArray = Array.isArray(properties) ? properties : [properties];

    // DEBUG: Log ALL towns in raw feed BEFORE any filtering
    const allRawTowns = [...new Set(propArray.map((p: any) => p.town || ''))].sort();
    console.log(`[XML-PARSER] ${feedName} RAW: ${propArray.length} total properties, ${allRawTowns.length} unique towns`);
    console.log(`[XML-PARSER] ${feedName} RAW towns:`, allRawTowns.slice(0, 50).join(', '));

    // Check new_build values
    const newBuildValues = [...new Set(propArray.map((p: any) => p.new_build))];
    console.log(`[XML-PARSER] ${feedName} new_build values in feed:`, newBuildValues);

    let parsed = propArray
      .filter((p: any) => p.new_build === 1 || p.new_build === '1' || p.new_build === true)
      .map((p: any) => parseProperty(p, developerName, developerSlug));

    // Filter by area if requested (for Special feed which has Almeria properties)
    if (filterByArea) {
      const beforeCount = parsed.length;
      parsed = parsed.filter(p => isInTargetArea(p.province, p.town));
      console.log(`[XML-PARSER] ${feedName}: ${parsed.length} properties in target area (filtered from ${beforeCount})`);
    } else {
      console.log(`[XML-PARSER] ${feedName}: ${parsed.length} new build properties (after new_build filter)`);
    }

    return parsed;
  } catch (error) {
    console.error(`[XML-PARSER] ${feedName} error:`, error);
    return [];
  }
}

/**
 * Parse a single property from XML
 */
function parseProperty(p: any, developerName: string, developerSlug: string): ParsedProperty {
  const descEn = p.desc?.en || '';
  const descEs = p.desc?.es || '';
  const description = descEn || descEs;
  const cleanDescription = description.replace(/#ref:\w+/gi, '').trim();

  const town = p.town || '';
  const propertyType = p.type || 'Property';
  const ref = p.ref || p.id || '';

  // Determine region from town using centralized config
  const region = getRegionForTown(town);

  const developmentName = extractProjectName(cleanDescription, propertyType, ref);

  const images: string[] = [];
  if (p.images?.image) {
    const imgArray = Array.isArray(p.images.image) ? p.images.image : [p.images.image];
    imgArray.forEach((img: any) => {
      if (img?.url) images.push(img.url);
      else if (typeof img === 'string') images.push(img);
    });
  }

  return {
    id: String(p.id || ''),
    title: developmentName,
    slug: slugify(developmentName),
    price: p.price ? Number(p.price) : null,
    bedrooms: p.beds ? Number(p.beds) : null,
    bathrooms: p.baths ? Number(p.baths) : null,
    size: p.surface_area?.built ? Number(p.surface_area.built) : null,
    plotSize: p.surface_area?.plot ? Number(p.surface_area.plot) : null,
    description: cleanDescription,
    images,
    town,
    province: p.province || 'Alicante',
    region,
    developer: developerName,
    developerSlug,
    developmentName,
    developmentSlug: slugify(developmentName),
    propertyType,
    status: 'available',
    isNewBuild: true,
    ref,
  };
}

/**
 * Safe string extractor for Background Properties feed
 * Handles objects with .en/.es or plain strings
 */
function safeStr(val: unknown): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val !== null) {
    const obj = val as Record<string, unknown>;
    return String(obj.en || obj.es || Object.values(obj)[0] || '');
  }
  return String(val);
}

/**
 * Fetch Background Properties feed (Sooprema XML format)
 * Filter for NEW BUILDS ONLY (saleType === '1') and exclude land
 */
async function fetchBackgroundFeed(): Promise<ParsedProperty[]> {
  try {
    const response = await fetch(BACKGROUND_FEED_URL, {
      cache: 'no-store',
      redirect: 'follow',
    });

    if (!response.ok) {
      console.error(`[XML-PARSER] Background feed fetch failed:`, response.status);
      return [];
    }

    const text = await response.text();

    // Parse as XML (Sooprema format)
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });
    const data = parser.parse(text);

    // Sooprema format: sooprema > properties > property
    const properties = data?.sooprema?.properties?.property || [];
    const propArray = Array.isArray(properties) ? properties : [properties];

    // Filter for NEW BUILDS only (saleType === '1') and exclude land
    const newBuilds = propArray.filter((p: any) => {
      const typeStr = safeStr(p.type).toLowerCase();
      const isNewBuild = String(p.saleType) === '1';
      const isNotLand = !typeStr.includes('land') && !typeStr.includes('plot') && !typeStr.includes('terreno');
      return isNewBuild && isNotLand;
    });

    const parsed = newBuilds.map((p: any) => {
      const ref = `BP-${p.reference || ''}`;

      // Parse images
      const images: string[] = [];
      if (p.images?.image) {
        const imgArray = Array.isArray(p.images.image) ? p.images.image : [p.images.image];
        imgArray.forEach((img: any) => {
          const url = img?.url || (typeof img === 'string' ? img : null);
          if (url) images.push(url);
        });
      }

      // Get title - use description title or construct from type/location
      const title = safeStr(p.title) || `${safeStr(p.type)} in ${safeStr(p.location?.town)}`;
      const town = safeStr(p.location?.town) || 'Costa Blanca';
      const province = safeStr(p.location?.province) || 'Alicante';

      return {
        id: ref,
        title,
        slug: slugify(title || `villa-${ref}`),
        price: Number(p.price) || null,
        bedrooms: Number(p.rooms) || null,
        bathrooms: Number(p.baths) || null,
        size: Number(p.built) || null,
        plotSize: Number(p.plot) || null,
        description: safeStr(p.description),
        images,
        town,
        province,
        region: getRegionForTown(town), // Determine from centralized config
        developer: 'Background Properties',
        developerSlug: 'background-properties',
        developmentName: title,
        developmentSlug: slugify(title || `villa-${ref}`),
        propertyType: safeStr(p.type) || 'Villa',
        status: 'available',
        isNewBuild: true,
        ref,
      };
    });

    // Also filter by area - only Costa Blanca / Costa Calida
    const filteredByArea = parsed.filter(p => isInTargetArea(p.province, p.town));

    console.log(`[XML-PARSER] Background Feed: ${filteredByArea.length} new builds in target area (from ${propArray.length} total, ${newBuilds.length} new builds)`);
    return filteredByArea;
  } catch (error) {
    console.error(`[XML-PARSER] Background feed error:`, error);
    return [];
  }
}

/**
 * Fetch Miralbo Urbana feed (MFR Pro XML format)
 * Luxury villas, mostly Costa Blanca North (Pedreguer area)
 */
async function fetchMiralboFeed(): Promise<ParsedProperty[]> {
  try {
    const response = await fetch(MIRALBO_FEED_URL, {
      cache: 'no-store',
      headers: { 'User-Agent': 'NewBuildHomes/1.0' },
    });

    if (!response.ok) {
      console.error(`[XML-PARSER] Miralbo feed fetch failed:`, response.status);
      return [];
    }

    const xml = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });
    const data = parser.parse(xml);

    // MFR Pro format: inmuebles > inmueble
    const properties = data?.inmuebles?.inmueble || [];
    const propArray = Array.isArray(properties) ? properties : [properties];

    console.log(`[XML-PARSER] Miralbo Feed RAW: ${propArray.length} properties`);

    const parsed = propArray.map((p: any) => {
      const ref = `MIR-${safeStr(p.id || p.referencia)}`;
      const title = safeStr(p.titulo || p.nombre) || 'Luxury Villa';
      const developmentName = safeStr(p.promocion || p.urbanizacion) || title;
      const town = safeStr(p.poblacion || p.ciudad || p.localidad) || 'Pedreguer';
      const province = safeStr(p.provincia) || 'Alicante';

      // Parse images from fotos > foto
      const images: string[] = [];
      if (p.fotos?.foto) {
        const fotoArray = Array.isArray(p.fotos.foto) ? p.fotos.foto : [p.fotos.foto];
        fotoArray.forEach((f: any) => {
          const url = safeStr(f?.url || f);
          if (url && url.startsWith('http')) images.push(url);
        });
      }

      return {
        id: ref,
        title,
        slug: slugify(title || `villa-${ref}`),
        price: Number(safeStr(p.precio)) || null,
        bedrooms: Number(safeStr(p.habitaciones || p.dormitorios)) || null,
        bathrooms: Number(safeStr(p.banos)) || null,
        size: Number(safeStr(p.superficie || p.metros)) || null,
        plotSize: Number(safeStr(p.parcela)) || null,
        description: safeStr(p.descripcion || p.observaciones),
        images,
        town,
        province,
        region: getRegionForTown(town),
        developer: 'Miralbo Urbana',
        developerSlug: 'miralbo-urbana',
        developmentName,
        developmentSlug: slugify(developmentName || `villa-${ref}`),
        propertyType: safeStr(p.tipo || p.subtipo) || 'Villa',
        status: 'available',
        isNewBuild: true,
        ref,
      };
    });

    // Filter by area
    const filteredByArea = parsed.filter(p => isInTargetArea(p.province, p.town));
    console.log(`[XML-PARSER] Miralbo Feed: ${filteredByArea.length} in target area`);

    return filteredByArea;
  } catch (error) {
    console.error(`[XML-PARSER] Miralbo feed error:`, error);
    return [];
  }
}

/**
 * Merge two properties, keeping the best data from each
 * Prioritizes non-empty fields
 */
function mergeProperties(existing: ParsedProperty, incoming: ParsedProperty): ParsedProperty {
  return {
    ...existing,
    // Keep existing data if incoming is empty
    town: incoming.town && incoming.town.trim() ? incoming.town : existing.town,
    province: incoming.province && incoming.province.trim() && incoming.province !== 'Alicante'
      ? incoming.province : existing.province,
    region: incoming.region || existing.region,
    // Prefer incoming if it has images and existing doesn't
    images: incoming.images.length > 0 ? incoming.images : existing.images,
    // Prefer incoming price if it exists
    price: incoming.price || existing.price,
    description: incoming.description && incoming.description.trim()
      ? incoming.description : existing.description,
    // Keep existing other fields
    title: existing.title,
    slug: existing.slug,
    bedrooms: incoming.bedrooms || existing.bedrooms,
    bathrooms: incoming.bathrooms || existing.bathrooms,
    size: incoming.size || existing.size,
    plotSize: incoming.plotSize || existing.plotSize,
  };
}

/**
 * Fetch from THREE feeds and combine:
 * 1. General feed (N refs) - REDSP main feed with full town data
 * 2. Background feed (BP refs) - Background Properties new builds
 * 3. Miralbo feed (MIR refs) - Miralbo Urbana luxury villas
 *
 * PRIORITY ORDER: REDSP → Background → Miralbo
 * Each feed has unique ref prefix so no collision issues
 */
export async function fetchXMLFeed(): Promise<ParsedProperty[]> {
  try {
    // Fetch all THREE feeds in parallel
    const [generalProperties, backgroundProperties, miralboProperties] = await Promise.all([
      fetchSingleFeed(GENERAL_FEED_URL, 'REDSP General Feed', false),
      fetchBackgroundFeed(),
      fetchMiralboFeed(),
    ]);

    // Combine by ref - each feed has unique prefix (N-, BP-, MIR-)
    const allProperties = new Map<string, ParsedProperty>();

    // 1. REDSP General properties (highest priority, full town data)
    for (const prop of generalProperties) {
      allProperties.set(prop.ref, prop);
    }

    // 2. Background Properties (BP- prefix)
    for (const prop of backgroundProperties) {
      allProperties.set(prop.ref, prop);
    }

    // 3. Miralbo properties (MIR- prefix)
    for (const prop of miralboProperties) {
      allProperties.set(prop.ref, prop);
    }

    const combined = Array.from(allProperties.values());

    // DEBUG: Check town distribution after combining
    const townsAfterCombine = [...new Set(combined.map(p => p.town))].sort();
    console.log(`[XML-PARSER] === COMBINED FEED SUMMARY ===`);
    console.log(`[XML-PARSER] Total: ${combined.length} properties`);
    console.log(`[XML-PARSER]   - REDSP: ${generalProperties.length}`);
    console.log(`[XML-PARSER]   - Background: ${backgroundProperties.length}`);
    console.log(`[XML-PARSER]   - Miralbo: ${miralboProperties.length}`);
    console.log(`[XML-PARSER] Unique towns: ${townsAfterCombine.length}`);
    console.log(`[XML-PARSER] Towns:`, townsAfterCombine.slice(0, 50).join(', '));

    // Check for CB South towns specifically
    const cbSouthTowns = ['algorfa', 'rojales', 'benijofar', 'ciudad quesada', 'torrevieja', 'orihuela', 'los montesinos', 'guardamar'];
    const foundCBSouth = townsAfterCombine.filter(t =>
      cbSouthTowns.some(cbs => t.toLowerCase().includes(cbs))
    );
    console.log(`[XML-PARSER] CB South towns found:`, foundCBSouth.join(', ') || 'NONE!');

    // Region distribution
    const regionCounts: Record<string, number> = {};
    combined.forEach(p => {
      const r = p.region || 'unmapped';
      regionCounts[r] = (regionCounts[r] || 0) + 1;
    });
    console.log(`[XML-PARSER] Region distribution:`, JSON.stringify(regionCounts));

    return combined;
  } catch (error) {
    console.error('Feed error:', error);
    return [];
  }
}

export function groupByDevelopment(properties: ParsedProperty[]): ParsedDevelopment[] {
  // For single-property developments (like Miralbo villas), each property IS the development
  return properties.map(p => ({
    slug: p.developmentSlug,
    name: p.developmentName,
    developer: p.developer,
    developerSlug: p.developerSlug,
    town: p.town,
    province: p.province,
    propertyCount: 1,
    priceFrom: p.price,
    priceTo: p.price,
    bedroomsRange: p.bedrooms ? `${p.bedrooms} bed` : '',
    images: p.images,
    properties: [p],
    description: p.description,
  }));
}

export function groupByArea(properties: ParsedProperty[]): Map<string, ParsedProperty[]> {
  const groups = new Map<string, ParsedProperty[]>();
  properties.forEach(p => {
    const key = slugify(p.town);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  });
  return groups;
}

export function groupByDeveloper(properties: ParsedProperty[]): Map<string, ParsedProperty[]> {
  const groups = new Map<string, ParsedProperty[]>();
  properties.forEach(p => {
    const key = p.developerSlug;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  });
  return groups;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

// All inland town definitions are now in feed-config.ts

/**
 * Fetch only INLAND properties (away from coast)
 * Uses centralized feed-config.ts for region determination
 */
export async function fetchInlandProperties(): Promise<ParsedProperty[]> {
  const allProperties = await fetchXMLFeed();

  // DEBUG: Log ALL unique towns from feed BEFORE filtering
  const allTowns = [...new Set(allProperties.map(p => p.town))].sort();
  console.log('[XML-PARSER] ===== ALL TOWNS IN FEED =====');
  console.log('[XML-PARSER] Total properties:', allProperties.length);
  console.log('[XML-PARSER] Unique towns:', allTowns.length);
  console.log('[XML-PARSER] Towns:', allTowns.join(', '));

  // Check which towns would be inland
  const townRegionMap: Record<string, string> = {};
  allTowns.forEach(town => {
    const region = getRegionForTown(town);
    const isInland = isInlandTown(town);
    townRegionMap[town] = `${region || 'NO MATCH'} (inland: ${isInland})`;
  });
  console.log('[XML-PARSER] Town -> Region mapping:', JSON.stringify(townRegionMap, null, 2));

  const inlandProps = allProperties.filter(p => isInlandTown(p.town));

  // Debug: log region distribution
  const regionCounts: Record<string, number> = {};
  inlandProps.forEach(p => {
    const r = p.region || 'unknown';
    regionCounts[r] = (regionCounts[r] || 0) + 1;
  });
  console.log('[XML-PARSER] ===== INLAND PROPERTIES =====');
  console.log('[XML-PARSER] Inland count:', inlandProps.length);
  console.log('[XML-PARSER] By region:', regionCounts);
  console.log('[XML-PARSER] Inland towns:', [...new Set(inlandProps.map(p => p.town))].join(', '));

  return inlandProps;
}

/**
 * Fetch land/plots from Background Properties feed
 * Filter for plots over €200k for serious buyers
 */
export async function fetchLandPlots(minPrice: number = 200000): Promise<ParsedProperty[]> {
  try {
    const response = await fetch(BACKGROUND_FEED_URL, {
      cache: 'no-store',
      redirect: 'follow',
    });

    if (!response.ok) {
      console.error(`[XML-PARSER] Background feed fetch failed for plots:`, response.status);
      return [];
    }

    const text = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });
    const data = parser.parse(text);

    const properties = data?.sooprema?.properties?.property || [];
    const propArray = Array.isArray(properties) ? properties : [properties];

    // Filter for LAND/PLOTS only
    const plots = propArray.filter((p: any) => {
      const typeStr = safeStr(p.type).toLowerCase();
      const price = Number(p.price) || 0;
      const isLand = typeStr.includes('land') || typeStr.includes('plot') || typeStr.includes('terreno');
      return isLand && price >= minPrice;
    });

    const parsed = plots.map((p: any) => {
      const ref = `PLOT-${p.reference || ''}`;

      // Parse images
      const images: string[] = [];
      if (p.images?.image) {
        const imgArray = Array.isArray(p.images.image) ? p.images.image : [p.images.image];
        imgArray.forEach((img: any) => {
          const url = img?.url || (typeof img === 'string' ? img : null);
          if (url) images.push(url);
        });
      }

      const title = safeStr(p.title) || `Building Plot in ${safeStr(p.location?.town)}`;
      const town = safeStr(p.location?.town) || 'Costa Blanca';
      const province = safeStr(p.location?.province) || 'Alicante';

      return {
        id: ref,
        title,
        slug: slugify(title || `plot-${ref}`),
        price: Number(p.price) || null,
        bedrooms: null,
        bathrooms: null,
        size: null,
        plotSize: Number(p.plot) || null,
        description: safeStr(p.description),
        images,
        town,
        province,
        region: getRegionForTown(town), // Determine from centralized config
        developer: 'Background Properties',
        developerSlug: 'background-properties',
        developmentName: title,
        developmentSlug: slugify(title || `plot-${ref}`),
        propertyType: 'Land / Plot',
        status: 'available',
        isNewBuild: false,
        ref,
      };
    });

    // Filter by area
    const filteredByArea = parsed.filter(p => isInTargetArea(p.province, p.town));

    console.log(`[XML-PARSER] Land/Plots: ${filteredByArea.length} plots over €${minPrice.toLocaleString()} in target area`);
    return filteredByArea;
  } catch (error) {
    console.error(`[XML-PARSER] Land/plots fetch error:`, error);
    return [];
  }
}
