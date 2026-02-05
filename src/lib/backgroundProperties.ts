import { XMLParser } from 'fast-xml-parser';
import https from 'https';
import http from 'http';

const FEED_URL = 'https://backgroundproperties.com/wp-load.php?security_token=23f0185aeb5102e7&export_id=19&action=get_data';

/**
 * Fetch URL using Node's native http/https modules.
 * This BYPASSES Next.js fetch interception, avoiding cache issues.
 */
function fetchWithNode(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          fetchWithNode(redirectUrl).then(resolve).catch(reject);
          return;
        }
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

export interface BackgroundProperty {
  reference: string;
  title: string;
  description: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  builtArea: number;
  plotArea: number;
  price: number;
  town: string;
  province: string;
  zone: string;
  images: string[];
  features: string[];
  pool: boolean;
  views: string;
  orientation: string;
  energyRating: string;
  saleType: string;
}

export type BPProperty = BackgroundProperty;

// Safe string extractor - handles objects with .en/.es or plain strings
function safeStr(val: unknown): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val !== null) {
    const obj = val as Record<string, unknown>;
    return String(obj.en || obj.es || Object.values(obj)[0] || '');
  }
  return String(val);
}

async function followRedirect(url: string): Promise<string> {
  // Use Node's native http to bypass Next.js fetch interception
  return fetchWithNode(url);
}

export async function fetchNewBuilds(): Promise<BackgroundProperty[]> {
  try {
    const xmlText = await followRedirect(FEED_URL);
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
    const parsed = parser.parse(xmlText);
    
    const properties = parsed?.sooprema?.properties?.property || [];
    const propArray = Array.isArray(properties) ? properties : [properties];
    
    const newBuilds = propArray.filter((p: any) => {
      const typeEn = safeStr(p.type);
      const isNewBuild = String(p.saleType) === '1';
      const isNotLand = !typeEn.toLowerCase().includes('land');
      return isNewBuild && isNotLand;
    });

    return newBuilds.map((p: any) => ({
      reference: String(p.reference || ''),
      title: safeStr(p.title),
      description: safeStr(p.description),
      type: safeStr(p.type),
      bedrooms: Number(p.rooms) || 0,
      bathrooms: Number(p.baths) || 0,
      builtArea: Number(p.built) || 0,
      plotArea: Number(p.plot) || 0,
      price: Number(p.price) || 0,
      town: safeStr(p.location?.town),
      province: safeStr(p.location?.province),
      zone: safeStr(p.location?.zone),
      images: Array.isArray(p.images?.image) 
        ? p.images.image.map((img: any) => img.url || img)
        : p.images?.image?.url ? [p.images.image.url] : [],
      features: Array.isArray(p.features?.feature)
        ? p.features.feature.map((f: any) => safeStr(f))
        : [],
      pool: p.pool === '1' || p.pool === 'yes',
      views: safeStr(p.views),
      orientation: safeStr(p.orientation),
      energyRating: String(p.energy_rating || ''),
      saleType: String(p.saleType || ''),
    }));
  } catch (error) {
    console.error('[BG] Error:', error);
    return [];
  }
}

export async function getPropertyByReference(reference: string): Promise<BackgroundProperty | null> {
  const properties = await fetchNewBuilds();
  return properties.find(p => p.reference === reference) || null;
}

export async function getPropertiesByTown(town: string): Promise<BackgroundProperty[]> {
  const properties = await fetchNewBuilds();
  return properties.filter(p => p.town.toLowerCase() === town.toLowerCase());
}

export async function getAllTowns(): Promise<string[]> {
  const properties = await fetchNewBuilds();
  return [...new Set(properties.map(p => p.town))].sort();
}
