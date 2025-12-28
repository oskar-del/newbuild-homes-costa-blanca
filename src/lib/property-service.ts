/**
 * Property Service
 * 
 * Central data layer for properties, developments, builders, and areas
 * Uses XML feed when available, falls back to sample data
 */

import { fetchXMLFeed, groupByDevelopment, ParsedDevelopment, ParsedProperty, slugify, formatPrice } from './xml-parser';
import { sampleDevelopments, featuredDevelopments, sampleBuilders, sampleAreas, golfCourses } from '../data/sample-data';

// Cache for property data
let cachedProperties: ParsedProperty[] | null = null;
let cachedDevelopments: ParsedDevelopment[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get all properties (from XML or sample data)
 */
export async function getAllProperties(): Promise<ParsedProperty[]> {
  const now = Date.now();
  
  // Return cached data if still fresh
  if (cachedProperties && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedProperties;
  }

  try {
    // Try to fetch from XML feed
    const properties = await fetchXMLFeed();
    
    if (properties.length > 0) {
      cachedProperties = properties;
      lastFetchTime = now;
      return properties;
    }
  } catch (error) {
    console.error('Failed to fetch properties from XML:', error);
  }

  // Return empty array - developments come from sample data
  return [];
}

/**
 * Get all developments (grouped from properties or sample data)
 */
export async function getAllDevelopments(): Promise<ParsedDevelopment[]> {
  const now = Date.now();
  
  if (cachedDevelopments && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedDevelopments;
  }

  try {
    const properties = await getAllProperties();
    
    if (properties.length > 0) {
      cachedDevelopments = groupByDevelopment(properties);
      return cachedDevelopments;
    }
  } catch (error) {
    console.error('Failed to group developments:', error);
  }

  // Return sample developments as fallback
  return sampleDevelopments;
}

/**
 * Get a single development by slug
 */
export async function getDevelopmentBySlug(slug: string): Promise<ParsedDevelopment | null> {
  const developments = await getAllDevelopments();
  return developments.find(d => d.slug === slug) || null;
}

/**
 * Get featured developments for homepage
 */
export function getFeaturedDevelopments() {
  return featuredDevelopments;
}

/**
 * Get developments by area
 */
export async function getDevelopmentsByArea(areaSlug: string): Promise<ParsedDevelopment[]> {
  const developments = await getAllDevelopments();
  return developments.filter(d => slugify(d.town) === areaSlug);
}

/**
 * Get developments by builder
 */
export async function getDevelopmentsByBuilder(builderSlug: string): Promise<ParsedDevelopment[]> {
  const developments = await getAllDevelopments();
  return developments.filter(d => d.developerSlug === builderSlug);
}

/**
 * Get developments near golf courses
 */
export async function getGolfDevelopments(): Promise<ParsedDevelopment[]> {
  const developments = await getAllDevelopments();
  
  // Filter for golf-related developments
  const golfTowns = ['algorfa', 'orihuela costa', 'campoamor', 'ciudad quesada', 'villamartin'];
  
  return developments.filter(d => {
    const townLower = d.town.toLowerCase();
    const nameLower = d.name.toLowerCase();
    
    return golfTowns.some(t => townLower.includes(t)) || 
           nameLower.includes('golf') ||
           d.zone.toLowerCase().includes('golf');
  });
}

/**
 * Get all builders
 */
export function getAllBuilders() {
  return sampleBuilders;
}

/**
 * Get a single builder by slug
 */
export function getBuilderBySlug(slug: string) {
  return sampleBuilders.find(b => b.slug === slug) || null;
}

/**
 * Get all areas
 */
export function getAllAreas() {
  return sampleAreas;
}

/**
 * Get a single area by slug
 */
export function getAreaBySlug(slug: string) {
  return sampleAreas.find(a => a.slug === slug) || null;
}

/**
 * Get areas by region
 */
export function getAreasByRegion(region: 'Costa Blanca North' | 'Costa Blanca South') {
  return sampleAreas.filter(a => a.region === region);
}

/**
 * Get all golf courses
 */
export function getAllGolfCourses() {
  return golfCourses;
}

/**
 * Search developments
 */
export async function searchDevelopments(params: {
  status?: string;
  area?: string;
  minBedrooms?: number;
  maxPrice?: number;
  type?: string;
}): Promise<ParsedDevelopment[]> {
  let developments = await getAllDevelopments();

  if (params.status && params.status !== 'all') {
    developments = developments.filter(d => d.statuses.includes(params.status!));
  }

  if (params.area && params.area !== 'all') {
    developments = developments.filter(d => slugify(d.town) === params.area);
  }

  if (params.minBedrooms) {
    developments = developments.filter(d => d.bedroomRange.max >= params.minBedrooms!);
  }

  if (params.maxPrice) {
    developments = developments.filter(d => 
      d.priceFrom !== null && d.priceFrom <= params.maxPrice!
    );
  }

  if (params.type && params.type !== 'all') {
    developments = developments.filter(d => d.types.includes(params.type!));
  }

  return developments;
}

/**
 * Get property status configuration
 */
export function getStatusConfig() {
  return {
    'key-ready': {
      label: 'Key Ready',
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      priority: 1
    },
    'completion-3-months': {
      label: 'Completion within 3 months',
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      priority: 2
    },
    'under-construction': {
      label: 'Under Construction',
      color: 'bg-amber-500',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      priority: 3
    },
    'off-plan': {
      label: 'Off Plan',
      color: 'bg-purple-500',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      priority: 4
    },
    'sold': {
      label: 'Sold',
      color: 'bg-gray-500',
      textColor: 'text-gray-700',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      priority: 5
    }
  };
}

/**
 * Format utilities
 */
export { slugify, formatPrice };

/**
 * Get development statistics
 */
export async function getDevelopmentStats() {
  const developments = await getAllDevelopments();
  const areas = getAllAreas();
  const builders = getAllBuilders();

  const totalProperties = developments.reduce((sum, d) => sum + d.propertyCount, 0);
  const allPrices = developments
    .map(d => d.priceFrom)
    .filter(Boolean) as number[];
  
  const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;

  return {
    totalDevelopments: developments.length,
    totalProperties,
    totalAreas: areas.length,
    totalBuilders: builders.length,
    priceFrom: minPrice,
    priceFromFormatted: formatPrice(minPrice)
  };
}
