import { parseStringPromise } from 'xml2js';
import { siteConfig } from './config';

interface XMLProperty {
  reference?: string[];
  title?: string[];
  price?: string[];
  type?: string[];
  bedrooms?: string[];
  bathrooms?: string[];
  built_size?: string[];
  plot_size?: string[];
  terrace_size?: string[];
  town?: string[];
  province?: string[];
  zone?: string[];
  developer?: string[];
  development?: string[];
  description?: string[];
  status?: string[];
  completion_date?: string[];
  images?: { image?: string[] }[];
  features?: { feature?: string[] }[];
  latitude?: string[];
  longitude?: string[];
  distance_beach?: string[];
  distance_airport?: string[];
  distance_golf?: string[];
}

interface KyeroProperty {
  id?: string[];
  ref?: string[];
  price?: string[];
  type?: string[];
  beds?: string[];
  baths?: string[];
  town?: string[];
  province?: string[];
  location_detail?: string[];
  new_build?: string[];
  surface_area?: { built?: string[]; plot?: string[] }[];
  desc?: { en?: string[]; es?: string[] }[];
  images?: { image?: { url?: string[] }[] }[];
  features?: { feature?: string[] }[];
  location?: { latitude?: string[]; longitude?: string[] }[];
}

interface XMLRoot { properties?: { property?: XMLProperty[] } }
interface KyeroRoot { root?: { property?: KyeroProperty[]; agent?: { name?: string[] }[] } }

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
      const properties = feed.format === 'kyero' 
        ? await parseKyeroContent(xmlText) 
        : await parseXMLContent(xmlText);
      console.log(`Parsed ${properties.length} from ${feed.name}`);
      allProperties.push(...properties);
    } catch (error) { console.error(`Error ${feed.name}:`, error); }
  }
  return allProperties;
}

export async function parseXMLContent(xmlContent: string): Promise<ParsedProperty[]> {
  try {
    const result: XMLRoot = await parseStringPromise(xmlContent, { explicitArray: true, ignoreAttrs: true, trim: true });
    return (result?.properties?.property || []).map(normalizeProperty).filter(Boolean) as ParsedProperty[];
  } catch (error) { console.error('Error parsing XML:', error); return []; }
}

export async function parseKyeroContent(xmlContent: string): Promise<ParsedProperty[]> {
  try {
    const result: KyeroRoot = await parseStringPromise(xmlContent, { explicitArray: true, ignoreAttrs: false, trim: true });
    const props = result?.root?.property || [];
    const agent = result?.root?.agent?.[0]?.name?.[0] || 'Unknown Developer';
    return props.filter(p => p.new_build?.[0] === '1').map(p => normalizeKyeroProperty(p, agent)).filter(Boolean) as ParsedProperty[];
  } catch (error) { console.error('Error parsing Kyero:', error); return []; }
}

function normalizeProperty(xml: XMLProperty): ParsedProperty | null {
  const reference = xml.reference?.[0] || '';
  if (!reference) return null;
  const price = parseFloat(xml.price?.[0] || '0') || null;
  const development = xml.development?.[0] || 'Unknown Development';
  return {
    id: reference, reference,
    title: xml.title?.[0] || `Property ${reference}`,
    price, priceFormatted: price ? formatPrice(price) : 'Price on request',
    type: normalizePropertyType(xml.type?.[0] || 'apartment'),
    bedrooms: parseInt(xml.bedrooms?.[0] || '0') || 0,
    bathrooms: parseInt(xml.bathrooms?.[0] || '0') || 0,
    builtSize: parseFloat(xml.built_size?.[0] || '0') || 0,
    plotSize: parseFloat(xml.plot_size?.[0] || '0') || 0,
    terraceSize: parseFloat(xml.terrace_size?.[0] || '0') || 0,
    town: xml.town?.[0] || '', province: xml.province?.[0] || 'Alicante', zone: xml.zone?.[0] || '',
    developer: xml.developer?.[0] || 'Unknown Developer',
    development, developmentSlug: slugify(development),
    description: xml.description?.[0] || '',
    status: normalizeStatus(xml.status?.[0]),
    completionDate: xml.completion_date?.[0] || null,
    images: xml.images?.[0]?.image || [],
    features: xml.features?.[0]?.feature || [],
    coordinates: parseCoordinates(xml.latitude?.[0], xml.longitude?.[0]),
    distances: { beach: parseFloat(xml.distance_beach?.[0] || '') || null, airport: parseFloat(xml.distance_airport?.[0] || '') || null, golf: parseFloat(xml.distance_golf?.[0] || '') || null }
  };
}

function normalizeKyeroProperty(kyero: KyeroProperty, agentName: string): ParsedProperty | null {
  const reference = kyero.ref?.[0] || kyero.id?.[0] || '';
  if (!reference) return null;
  const price = parseFloat(kyero.price?.[0] || '0') || null;
  const type = kyero.type?.[0] || 'Villa';
  const town = (kyero.town?.[0] || '').split('/')[0].trim();
  const loc = kyero.location_detail?.[0] || '';
  const dev = loc ? `${type} in ${loc}` : `${type} in ${town}`;
  const images = kyero.images?.[0]?.image?.map(img => img.url?.[0]).filter(Boolean) as string[] || [];
  const lat = parseFloat(kyero.location?.[0]?.latitude?.[0] || '0');
  const lng = parseFloat(kyero.location?.[0]?.longitude?.[0] || '0');
  return {
    id: `kyero-${reference}`, reference,
    title: `${type} ${reference} - ${town}`,
    price, priceFormatted: price ? formatPrice(price) : 'Price on request',
    type: normalizePropertyType(type),
    bedrooms: parseInt(kyero.beds?.[0] || '0') || 0,
    bathrooms: parseInt(kyero.baths?.[0] || '0') || 0,
    builtSize: parseFloat(kyero.surface_area?.[0]?.built?.[0] || '0') || 0,
    plotSize: parseFloat(kyero.surface_area?.[0]?.plot?.[0] || '0') || 0,
    terraceSize: 0, town, province: kyero.province?.[0] || 'Alicante', zone: loc,
    developer: agentName.replace(/\s+S\.?L\.?$/i, '').trim(),
    development: dev, developmentSlug: slugify(dev),
    description: (kyero.desc?.[0]?.en?.[0] || kyero.desc?.[0]?.es?.[0] || '').replace(/#ref:\w+/gi, '').trim(),
    status: 'under-construction', completionDate: null,
    images, features: kyero.features?.[0]?.feature || [],
    coordinates: (lat && lng) ? { lat, lng } : null,
    distances: { beach: null, airport: null, golf: null }
  };
}

export function groupByDevelopment(properties: ParsedProperty[]): ParsedDevelopment[] {
  const groups = new Map<string, ParsedProperty[]>();
  for (const p of properties) {
    const existing = groups.get(p.developmentSlug) || [];
    existing.push(p);
    groups.set(p.developmentSlug, existing);
  }
  return Array.from(groups.entries()).map(([slug, props]) => {
    const first = props[0];
    const prices = props.map(p => p.price).filter(Boolean) as number[];
    const beds = props.map(p => p.bedrooms).filter(b => b > 0);
    return {
      slug, name: first.development, developer: first.developer, developerSlug: slugify(first.developer),
      town: first.town, province: first.province, zone: first.zone, propertyCount: props.length,
      priceFrom: prices.length ? Math.min(...prices) : null, priceTo: prices.length ? Math.max(...prices) : null,
      types: Array.from(new Set(props.map(p => p.type))), bedroomRange: { min: beds.length ? Math.min(...beds) : 0, max: beds.length ? Math.max(...beds) : 0 },
      statuses: Array.from(new Set(props.map(p => p.status))), properties: props
    };
  });
}

export function groupByArea(properties: ParsedProperty[]): Map<string, ParsedProperty[]> {
  const groups = new Map<string, ParsedProperty[]>();
  for (const p of properties) { const k = p.town.toLowerCase(); groups.set(k, [...(groups.get(k) || []), p]); }
  return groups;
}

export function groupByDeveloper(properties: ParsedProperty[]): Map<string, ParsedProperty[]> {
  const groups = new Map<string, ParsedProperty[]>();
  for (const p of properties) { const k = slugify(p.developer); groups.set(k, [...(groups.get(k) || []), p]); }
  return groups;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
}

function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

function normalizePropertyType(type: string): string {
  const map: Record<string, string> = { apartamento: 'apartment', apartment: 'apartment', piso: 'apartment', atico: 'penthouse', penthouse: 'penthouse', villa: 'villa', chalet: 'villa', adosado: 'townhouse', townhouse: 'townhouse', bungalow: 'bungalow', duplex: 'duplex' };
  return map[type.toLowerCase()] || 'apartment';
}

function normalizeStatus(status?: string): ParsedProperty['status'] {
  if (!status) return 'under-construction';
  const s = status.toLowerCase();
  if (s.includes('key') || s.includes('ready') || s.includes('llave')) return 'key-ready';
  if (s.includes('sold') || s.includes('vendido')) return 'sold';
  if (s.includes('off-plan') || s.includes('plano')) return 'off-plan';
  if (s.includes('3 month') || s.includes('próxima')) return 'completion-3-months';
  return 'under-construction';
}

function parseCoordinates(lat?: string, lng?: string): { lat: number; lng: number } | null {
  const la = parseFloat(lat || ''), lo = parseFloat(lng || '');
  return isNaN(la) || isNaN(lo) ? null : { lat: la, lng: lo };
}

export { slugify, formatPrice };
