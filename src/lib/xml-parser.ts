/**
 * XML Parser for RedSP Property Feed
 * 
 * Fetches and parses property data from the RedSP XML feed
 * Used at build time (ISR) or runtime for fresh data
 */

import { parseStringPromise } from 'xml2js';
import { siteConfig } from './config';

// Raw XML property structure from RedSP feed
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

interface XMLRoot {
  properties?: {
    property?: XMLProperty[];
  };
}

// Normalized property structure for our app
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
  distances: {
    beach: number | null;
    airport: number | null;
    golf: number | null;
  };
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

/**
 * Fetch and parse the XML feed
 */
export async function fetchXMLFeed(): Promise<ParsedProperty[]> {
  try {
    const response = await fetch(siteConfig.xmlFeed.url, {
    cache: 'no-store'  
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch XML feed: ${response.status}`);
    }

    const xmlText = await response.text();
    return parseXMLContent(xmlText);
  } catch (error) {
    console.error('Error fetching XML feed:', error);
    return [];
  }
}

/**
 * Parse XML content string into normalized properties
 */
export async function parseXMLContent(xmlContent: string): Promise<ParsedProperty[]> {
  try {
    const result: XMLRoot = await parseStringPromise(xmlContent, {
      explicitArray: true,
      ignoreAttrs: true,
      trim: true
    });

    const xmlProperties = result?.properties?.property || [];
    
    return xmlProperties.map(normalizeProperty).filter(Boolean) as ParsedProperty[];
  } catch (error) {
    console.error('Error parsing XML content:', error);
    return [];
  }
}

/**
 * Normalize a single XML property to our app format
 */
function normalizeProperty(xml: XMLProperty): ParsedProperty | null {
  const reference = xml.reference?.[0] || '';
  if (!reference) return null;

  const price = parseFloat(xml.price?.[0] || '0') || null;
  const development = xml.development?.[0] || 'Unknown Development';
  
  return {
    id: reference,
    reference,
    title: xml.title?.[0] || `Property ${reference}`,
    price,
    priceFormatted: price ? formatPrice(price) : 'Price on request',
    type: normalizePropertyType(xml.type?.[0] || 'apartment'),
    bedrooms: parseInt(xml.bedrooms?.[0] || '0') || 0,
    bathrooms: parseInt(xml.bathrooms?.[0] || '0') || 0,
    builtSize: parseFloat(xml.built_size?.[0] || '0') || 0,
    plotSize: parseFloat(xml.plot_size?.[0] || '0') || 0,
    terraceSize: parseFloat(xml.terrace_size?.[0] || '0') || 0,
    town: xml.town?.[0] || '',
    province: xml.province?.[0] || 'Alicante',
    zone: xml.zone?.[0] || '',
    developer: xml.developer?.[0] || 'Unknown Developer',
    development,
    developmentSlug: slugify(development),
    description: xml.description?.[0] || '',
    status: normalizeStatus(xml.status?.[0]),
    completionDate: xml.completion_date?.[0] || null,
    images: xml.images?.[0]?.image || [],
    features: xml.features?.[0]?.feature || [],
    coordinates: parseCoordinates(xml.latitude?.[0], xml.longitude?.[0]),
    distances: {
      beach: parseFloat(xml.distance_beach?.[0] || '') || null,
      airport: parseFloat(xml.distance_airport?.[0] || '') || null,
      golf: parseFloat(xml.distance_golf?.[0] || '') || null
    }
  };
}

/**
 * Group properties by development
 */
export function groupByDevelopment(properties: ParsedProperty[]): ParsedDevelopment[] {
  const groups = new Map<string, ParsedProperty[]>();

  for (const property of properties) {
    const existing = groups.get(property.developmentSlug) || [];
    existing.push(property);
    groups.set(property.developmentSlug, existing);
  }

  return Array.from(groups.entries()).map(([slug, props]) => {
    const first = props[0];
    const prices = props.map(p => p.price).filter(Boolean) as number[];
    const bedrooms = props.map(p => p.bedrooms).filter(b => b > 0);
    const types = Array.from(new Set(props.map(p => p.type)));
    const statuses = Array.from(new Set(props.map(p => p.status)));

    return {
      slug,
      name: first.development,
      developer: first.developer,
      developerSlug: slugify(first.developer),
      town: first.town,
      province: first.province,
      zone: first.zone,
      propertyCount: props.length,
      priceFrom: prices.length > 0 ? Math.min(...prices) : null,
      priceTo: prices.length > 0 ? Math.max(...prices) : null,
      types,
      bedroomRange: {
        min: bedrooms.length > 0 ? Math.min(...bedrooms) : 0,
        max: bedrooms.length > 0 ? Math.max(...bedrooms) : 0
      },
      statuses,
      properties: props
    };
  });
}

/**
 * Group properties by area (town)
 */
export function groupByArea(properties: ParsedProperty[]): Map<string, ParsedProperty[]> {
  const groups = new Map<string, ParsedProperty[]>();

  for (const property of properties) {
    const key = property.town.toLowerCase();
    const existing = groups.get(key) || [];
    existing.push(property);
    groups.set(key, existing);
  }

  return groups;
}

/**
 * Group properties by developer
 */
export function groupByDeveloper(properties: ParsedProperty[]): Map<string, ParsedProperty[]> {
  const groups = new Map<string, ParsedProperty[]>();

  for (const property of properties) {
    const key = slugify(property.developer);
    const existing = groups.get(key) || [];
    existing.push(property);
    groups.set(key, existing);
  }

  return groups;
}

// Utility functions

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizePropertyType(type: string): string {
  const typeMap: Record<string, string> = {
    'apartamento': 'apartment',
    'apartment': 'apartment',
    'piso': 'apartment',
    'atico': 'penthouse',
    'penthouse': 'penthouse',
    'villa': 'villa',
    'chalet': 'villa',
    'adosado': 'townhouse',
    'townhouse': 'townhouse',
    'bungalow': 'bungalow',
    'duplex': 'duplex'
  };

  return typeMap[type.toLowerCase()] || 'apartment';
}

function normalizeStatus(status?: string): ParsedProperty['status'] {
  if (!status) return 'under-construction';
  
  const statusLower = status.toLowerCase();
  
  if (statusLower.includes('key') || statusLower.includes('ready') || statusLower.includes('llave')) {
    return 'key-ready';
  }
  if (statusLower.includes('sold') || statusLower.includes('vendido')) {
    return 'sold';
  }
  if (statusLower.includes('off-plan') || statusLower.includes('plano')) {
    return 'off-plan';
  }
  if (statusLower.includes('3 month') || statusLower.includes('próxima')) {
    return 'completion-3-months';
  }
  
  return 'under-construction';
}

function parseCoordinates(lat?: string, lng?: string): { lat: number; lng: number } | null {
  const latitude = parseFloat(lat || '');
  const longitude = parseFloat(lng || '');
  
  if (isNaN(latitude) || isNaN(longitude)) return null;
  
  return { lat: latitude, lng: longitude };
}

export { slugify, formatPrice };
