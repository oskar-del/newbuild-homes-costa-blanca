const fs = require('fs');

const content = `import { XMLParser } from 'fast-xml-parser';

export interface ParsedProperty {
  id: string;
  title: string;
  slug: string;
  price: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  size: number | null;
  description: string;
  images: string[];
  town: string;
  province: string;
  developer: string;
  developerSlug: string;
  developmentName: string;
  developmentSlug: string;
  propertyType: string;
  status: string;
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
}

const FEEDS = [
  { name: 'miralbo', url: 'https://mifrfrede.mfrpro.com/inmuebles/xml/56b76456fab7c', enabled: true },
  { name: 'redsp', url: '', enabled: false },
];

let cachedProperties: ParsedProperty[] | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 1000 * 60 * 60;

function createSlug(text: string): string {
  return (text || 'unknown').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function extractText(obj: unknown): string {
  if (typeof obj === 'string') return obj;
  if (typeof obj === 'number') return String(obj);
  if (obj && typeof obj === 'object' && '_text' in obj) return String((obj as {_text: unknown})._text);
  if (obj && typeof obj === 'object' && '#text' in obj) return String((obj as {'#text': unknown})['#text']);
  return '';
}

function extractNumber(obj: unknown): number | null {
  const text = extractText(obj);
  const num = parseFloat(text.replace(/[^0-9.]/g, ''));
  return isNaN(num) ? null : num;
}

function extractImages(property: Record<string, unknown>): string[] {
  const images: string[] = [];
  const fotos = property.fotos as Record<string, unknown> | undefined;
  if (fotos?.foto) {
    const fotoArray = Array.isArray(fotos.foto) ? fotos.foto : [fotos.foto];
    fotoArray.forEach((f: unknown) => {
      const url = extractText((f as Record<string, unknown>)?.url || f);
      if (url && url.startsWith('http')) images.push(url);
    });
  }
  const imagesObj = property.images as Record<string, unknown> | undefined;
  if (imagesObj?.image) {
    const imgArray = Array.isArray(imagesObj.image) ? imagesObj.image : [imagesObj.image];
    imgArray.forEach((img: unknown) => {
      const url = extractText((img as Record<string, unknown>)?.url || img);
      if (url && url.startsWith('http')) images.push(url);
    });
  }
  return images;
}

function parseMiralboProperty(prop: Record<string, unknown>): ParsedProperty {
  const id = extractText(prop.id || prop.referencia);
  const title = extractText(prop.titulo || prop.nombre || prop.title) || 'Property';
  const developmentName = extractText(prop.promocion || prop.urbanizacion) || 'Development';
  const developer = extractText(prop.promotor || prop.agencia) || 'Miralbo Urbana';
  const town = extractText(prop.poblacion || prop.ciudad || prop.localidad) || 'Costa Blanca';
  
  return {
    id,
    title,
    slug: createSlug(id + '-' + title),
    price: extractNumber(prop.precio),
    bedrooms: extractNumber(prop.habitaciones || prop.dormitorios),
    bathrooms: extractNumber(prop.banos),
    size: extractNumber(prop.superficie || prop.metros),
    description: extractText(prop.descripcion || prop.observaciones || ''),
    images: extractImages(prop),
    town,
    province: extractText(prop.provincia) || 'Alicante',
    developer,
    developerSlug: createSlug(developer),
    developmentName,
    developmentSlug: createSlug(developmentName),
    propertyType: extractText(prop.tipo || prop.subtipo) || 'Apartment',
    status: 'available',
  };
}

async function fetchFeed(url: string): Promise<ParsedProperty[]> {
  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'NewBuildHomes/1.0' }, next: { revalidate: 3600 } });
    if (!response.ok) throw new Error('Feed fetch failed: ' + response.status);
    const xml = await response.text();
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
    const result = parser.parse(xml);
    let properties: unknown[] = [];
    const root = result.inmuebles || result.properties || result.root || result;
    if (root.inmueble) properties = Array.isArray(root.inmueble) ? root.inmueble : [root.inmueble];
    else if (root.property) properties = Array.isArray(root.property) ? root.property : [root.property];
    return properties.map(p => parseMiralboProperty(p as Record<string, unknown>));
  } catch (error) {
    console.error('Feed error:', error);
    return [];
  }
}

export async function fetchXMLFeed(): Promise<ParsedProperty[]> {
  const now = Date.now();
  if (cachedProperties && (now - cacheTime) < CACHE_DURATION) return cachedProperties;
  const allProperties: ParsedProperty[] = [];
  for (const feed of FEEDS) {
    if (feed.enabled && feed.url) {
      const props = await fetchFeed(feed.url);
      allProperties.push(...props);
    }
  }
  cachedProperties = allProperties;
  cacheTime = now;
  return allProperties;
}

export function groupByDevelopment(properties: ParsedProperty[]): ParsedDevelopment[] {
  const groups = new Map<string, ParsedProperty[]>();
  properties.forEach(prop => {
    const key = prop.developmentSlug;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(prop);
  });
  return Array.from(groups.entries()).map(([slug, props]) => {
    const prices = props.map(p => p.price).filter(Boolean) as number[];
    const bedrooms = props.map(p => p.bedrooms).filter(Boolean) as number[];
    return {
      slug,
      name: props[0].developmentName,
      developer: props[0].developer,
      developerSlug: props[0].developerSlug,
      town: props[0].town,
      province: props[0].province,
      propertyCount: props.length,
      priceFrom: prices.length ? Math.min(...prices) : null,
      priceTo: prices.length ? Math.max(...prices) : null,
      bedroomsRange: bedrooms.length ? Math.min(...bedrooms) + '-' + Math.max(...bedrooms) + ' bed' : '',
      images: props.flatMap(p => p.images).slice(0, 20),
      properties: props,
    };
  });
}

export function groupByDeveloper(properties: ParsedProperty[]): Map<string, ParsedProperty[]> {
  const groups = new Map<string, ParsedProperty[]>();
  properties.forEach(prop => {
    const key = prop.developerSlug;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(prop);
  });
  return groups;
}

export function groupByArea(properties: ParsedProperty[]): Map<string, ParsedProperty[]> {
  const groups = new Map<string, ParsedProperty[]>();
  properties.forEach(prop => {
    const key = createSlug(prop.town);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(prop);
  });
  return groups;
}
`;

fs.writeFileSync('src/lib/xml-parser.ts', content);
console.log('xml-parser.ts created successfully');
