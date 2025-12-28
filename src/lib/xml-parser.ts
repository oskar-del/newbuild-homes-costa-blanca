import { parseStringPromise } from 'xml2js';
import { siteConfig } from './config';

export interface ParsedProperty {
  id: string;
  reference: string;
  title: string;
  price: number | null;
  priceFormatted: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  builtSize: number;
  plotSize: number;
  terraceSize: number;
  town: string;
  province: string;
  zone: string;
  developer: string;
  development: string;
  developmentSlug: string;
  description: string;
  status: 'key-ready' | 'completion-3-months' | 'under-construction' | 'off-plan' | 'sold';
  completionDate: string | null;
  images: string[];
  features: string[];
  coordinates: { lat: number; lng: number } | null;
  distances: { beach: number | null; airport: number | null; golf: number | null };
}

export interface ParsedDevelopment {
  slug: string;
  name: string;
  developer: string;
  developerSlug: string;
  town: string;
  province: string;
  zone: string;
  propertyCount: number;
  priceFrom: number | null;
  priceTo: number | null;
  types: string[];
  bedroomRange: { min: number; max: number };
  statuses: string[];
  properties: ParsedProperty[];
  images: string[];
}

export async function fetchXMLFeed(): Promise<ParsedProperty[]> {
  const allProperties: ParsedProperty[] = [];
  for (const feed of siteConfig.xmlFeeds) {
    if (!feed.enabled) continue;
    try {
      console.log(`Fetching ${feed.name} feed...`);
      const response = await fetch(feed.url, {
        cache: 'force-cache',
        next: { revalidate: siteConfig.revalidateSeconds, tags: ['xml-feed'] }
      });
      if (!response.ok) { console.error(`Failed: ${feed.name}`); continue; }
      const xmlText = await response.text();
      const properties = feed.format === 'kyero' ? await parseKyeroContent(xmlText) : await parseREDSPContent(xmlText);
      console.log(`Parsed ${properties.length} from ${feed.name}`);
      allProperties.push(...properties);
    } catch (error) { console.error(`Error ${feed.name}:`, error); }
  }
  return allProperties;
}

export async function parseREDSPContent(xmlContent: string): Promise<ParsedProperty[]> {
  try {
    const result = await parseStringPromise(xmlContent, { explicitArray: true, ignoreAttrs: true, trim: true });
    const properties = result?.root?.property || [];
    return properties.filter((p: any) => p.new_build?.[0] === '1').map(normalizeREDSPProperty).filter(Boolean) as ParsedProperty[];
  } catch (error) { console.error('Error parsing REDSP:', error); return []; }
}

export async function parseKyeroContent(xmlContent: string): Promise<ParsedProperty[]> {
  try {
    const result = await parseStringPromise(xmlContent, { explicitArray: true, ignoreAttrs: false, trim: true });
    const props = result?.root?.property || [];
    const agent = result?.root?.agent?.[0]?.name?.[0] || 'Unknown Developer';
    return props.filter((p: any) => p.new_build?.[0] === '1').map((p: any) => normalizeKyeroProperty(p, agent)).filter(Boolean) as ParsedProperty[];
  } catch (error) { console.error('Error parsing Kyero:', error); return []; }
}

function normalizeREDSPProperty(xml: any): ParsedProperty | null {
  const reference = xml.ref?.[0] || '';
  if (!reference) return null;
  const price = parseFloat(xml.price?.[0] || '0') || null;
  const titleObj = xml.title?.[0];
  const title = typeof titleObj === 'object' ? (titleObj.en?.[0] || titleObj.es?.[0] || `Property ${reference}`) : (titleObj || `Property ${reference}`);
  const development = xml.location_detail?.[0] || xml.town?.[0] || 'Unknown Development';
  const lat = xml.location?.[0]?.latitude?.[0];
  const lng = xml.location?.[0]?.longitude?.[0];
  const images: string[] = [];
  if (xml.images?.[0]?.image) { for (const img of xml.images[0].image) { const url = img.url?.[0] || (typeof img === 'string' ? img : null); if (url) images.push(url); } }
  return {
    id: reference, reference, title, price, priceFormatted: price ? formatPrice(price) : 'Price on request',
    type: normalizePropertyType(xml.type?.[0] || 'apartment'),
    bedrooms: parseInt(xml.beds?.[0] || '0') || 0, bathrooms: parseInt(xml.baths?.[0] || '0') || 0,
    builtSize: parseFloat(xml.surface_area?.[0]?.built?.[0] || '0') || 0,
    plotSize: parseFloat(xml.surface_area?.[0]?.plot?.[0] || '0') || 0,
    terraceSize: parseFloat(xml.terrace_m2?.[0] || '0') || 0,
    town: xml.town?.[0] || '', province: xml.province?.[0] || 'Alicante', zone: xml.costa?.[0] || '',
    developer: 'Unknown Developer', development, developmentSlug: slugify(development),
    description: getDescription(xml.desc), status: 'under-construction', completionDate: null,
    images, features: [], coordinates: (lat && lng) ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null,
    distances: { beach: xml.distance_to_beach_m?.[0] ? parseFloat(xml.distance_to_beach_m[0]) / 1000 : null, airport: null, golf: null }
  };
}

function normalizeKyeroProperty(kyero: any, agentName: string): ParsedProperty | null {
  const reference = kyero.ref?.[0] || kyero.id?.[0] || '';
  if (!reference) return null;
  const price = parseFloat(kyero.price?.[0] || '0') || null;
  const type = kyero.type?.[0] || 'Villa';
  const town = (kyero.town?.[0] || '').split('/')[0].trim();
  const loc = kyero.location_detail?.[0] || '';
  const dev = loc ? `${type} in ${loc}` : `${type} in ${town}`;
  const images: string[] = [];
  if (kyero.images?.[0]?.image) { for (const img of kyero.images[0].image) { const url = img.url?.[0]; if (url) images.push(url); } }
  const lat = parseFloat(kyero.location?.[0]?.latitude?.[0] || '0');
  const lng = parseFloat(kyero.location?.[0]?.longitude?.[0] || '0');
  return {
    id: `kyero-${reference}`, reference, title: `${type} ${reference} - ${town}`, price, priceFormatted: price ? formatPrice(price) : 'Price on request',
    type: normalizePropertyType(type), bedrooms: parseInt(kyero.beds?.[0] || '0') || 0, bathrooms: parseInt(kyero.baths?.[0] || '0') || 0,
    builtSize: parseFloat(kyero.surface_area?.[0]?.built?.[0] || '0') || 0, plotSize: parseFloat(kyero.surface_area?.[0]?.plot?.[0] || '0') || 0, terraceSize: 0,
    town, province: kyero.province?.[0] || 'Alicante', zone: loc, developer: agentName.replace(/\s+S\.?L\.?$/i, '').trim(),
    development: dev, developmentSlug: slugify(dev), description: getDescription(kyero.desc), status: 'under-construction', completionDate: null,
    images, features: kyero.features?.[0]?.feature || [], coordinates: (lat && lng) ? { lat, lng } : null,
    distances: { beach: null, airport: null, golf: null }
  };
}

function getDescription(desc: any): string {
  if (!desc?.[0]) return '';
  const d = desc[0];
  return (d.en?.[0] || d.es?.[0] || (typeof d === 'string' ? d : '')).replace(/#ref:\w+/gi, '').trim();
}

export function groupByDevelopment(properties: ParsedProperty[]): ParsedDevelopment[] {
  const groups = new Map<string, ParsedProperty[]>();
  for (const p of properties) { const existing = groups.get(p.developmentSlug) || []; existing.push(p); groups.set(p.developmentSlug, existing); }
  return Array.from(groups.entries()).map(([slug, props]) => {
    const first = props[0];
    const prices = props.map(p => p.price).filter(Boolean) as number[];
    const beds = props.map(p => p.bedrooms).filter(b => b > 0);
    return { slug, name: first.development, developer: first.developer, developerSlug: slugify(first.developer),
      town: first.town, province: first.province, zone: first.zone, propertyCount: props.length,
      priceFrom: prices.length ? Math.min(...prices) : null, priceTo: prices.length ? Math.max(...prices) : null,
      types: Array.from(new Set(props.map(p => p.type))), bedroomRange: { min: beds.length ? Math.min(...beds) : 0, max: beds.length ? Math.max(...beds) : 0 },
      statuses: Array.from(new Set(props.map(p => p.status))), properties: props, images: props.flatMap(p => p.images).slice(0, 20) };
  });
}

export function groupByArea(properties: ParsedProperty[]): Map<string, ParsedProperty[]> {
  const groups = new Map<string, ParsedProperty[]>();
  for (const p of properties) { const k = p.town.toLowerCase(); const existing = groups.get(k) || []; existing.push(p); groups.set(k, existing); }
  return groups;
}

export function groupByDeveloper(properties: ParsedProperty[]): Map<string, ParsedProperty[]> {
  const groups = new Map<string, ParsedProperty[]>();
  for (const p of properties) { const k = slugify(p.developer); const existing = groups.get(k) || []; existing.push(p); groups.set(k, existing); }
  return groups;
}

function formatPrice(price: number): string { return new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price); }
function slugify(text: string): string { return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''); }
function normalizePropertyType(type: string): string {
  const map: Record<string, string> = { apartamento: 'apartment', apartment: 'apartment', piso: 'apartment', atico: 'penthouse', penthouse: 'penthouse', villa: 'villa', chalet: 'villa', adosado: 'townhouse', townhouse: 'townhouse', bungalow: 'bungalow', duplex: 'duplex' };
  return map[type.toLowerCase()] || type.toLowerCase();
}
export { slugify, formatPrice };
