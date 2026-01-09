/**
 * Unified Property Interface
 * Standardizes property data from multiple feed sources:
 * - REDSP (Kyero XML format)
 * - Background Properties (JSON format)
 * 
 * This interface ensures consistent data structure regardless of source.
 */

// Supported languages for descriptions
export type PropertyLanguage = 'en' | 'es' | 'de' | 'sv' | 'nl' | 'da' | 'fi' | 'fr' | 'no' | 'pl' | 'ru';

// Property description in multiple languages
export type PropertyDescription = Partial<Record<PropertyLanguage, string>>;

// Property image with metadata
export interface PropertyImage {
  url: string;
  tag?: string;
  order: number;
  isFloorplan: boolean;
  alt?: string;
}

// Property source identifiers
export type PropertySource = 'redsp' | 'background-properties' | 'manual';

// Unified property interface
export interface UnifiedProperty {
  // Identity
  id: string;                    // Unique ID prefixed with source (e.g., "redsp-12345")
  reference: string;             // Original reference from feed
  source: PropertySource;        // Which feed this came from
  
  // Location
  town: string;                  // Town name (e.g., "Orihuela Costa")
  locationDetail?: string;       // Specific area (e.g., "Lomas de Cabo Roig")
  province: string;              // Province (e.g., "Alicante", "Murcia")
  region: string;                // Region (e.g., "Costa Blanca South", "Costa Blanca North")
  country: string;               // Always "Spain"
  latitude: number;
  longitude: number;
  
  // Property details
  propertyType: string;          // Normalized type (Villa, Apartment, Townhouse, etc.)
  bedrooms: number;
  bathrooms: number;
  builtArea: number;             // Interior size in m²
  plotArea: number;              // Plot/garden size in m²
  
  // Pricing
  price: number;                 // Price as number (no currency symbol)
  currency: string;              // Always "EUR"
  
  // Features
  isNewBuild: boolean;           // Is this a new build property?
  propertyCategory?: 'new-build' | 'plot';  // Category: new-build or plot (land)
  hasPool: boolean;              // Has pool (private or communal)
  features: string[];            // List of features
  
  // Descriptions (multilingual)
  descriptions: PropertyDescription;
  
  // Images
  images: PropertyImage[];
  mainImage: string | null;      // URL of primary image
  floorplanImages: PropertyImage[];
  
  // Energy
  energyConsumption?: string | null;
  energyEmissions?: string | null;
  
  // External
  externalUrl?: string | null;
  
  // Metadata
  lastUpdated: string;           // ISO date string
  
  // AI-generated content (optional)
  aiContent?: {
    title?: string;
    seoDescription?: string;
    fullDescription?: string;
    highlights?: string[];
  };
}

// Property filter options
export interface PropertyFilter {
  town?: string;
  region?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  isNewBuild?: boolean;
  hasPool?: boolean;
  source?: PropertySource;
}

// Property list response with pagination
export interface PropertyListResponse {
  properties: UnifiedProperty[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Town summary for area pages
export interface TownSummary {
  name: string;
  slug: string;
  region: string;
  propertyCount: number;
  propertyTypes: string[];
  priceRange: {
    min: number;
    max: number;
  };
  sources: PropertySource[];
}

/**
 * Helper functions
 */

// Generate URL-friendly slug from town name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')     // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '');        // Trim hyphens from start/end
}

// Format price for display
export function formatPrice(price: number, locale: string = 'en-GB'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

// Get description in preferred language with fallback
export function getDescription(
  descriptions: PropertyDescription,
  preferredLang: PropertyLanguage = 'en'
): string {
  // Try preferred language first
  if (descriptions[preferredLang]) {
    return descriptions[preferredLang]!;
  }
  
  // Fallback to English
  if (descriptions.en) {
    return descriptions.en;
  }
  
  // Return first available
  for (const lang of Object.keys(descriptions) as PropertyLanguage[]) {
    if (descriptions[lang]) {
      return descriptions[lang]!;
    }
  }
  
  return '';
}

// Filter properties
export function filterProperties(
  properties: UnifiedProperty[],
  filters: PropertyFilter
): UnifiedProperty[] {
  return properties.filter(p => {
    if (filters.town && !p.town.toLowerCase().includes(filters.town.toLowerCase())) {
      return false;
    }
    if (filters.region && p.region !== filters.region) {
      return false;
    }
    if (filters.propertyType && p.propertyType !== filters.propertyType) {
      return false;
    }
    if (filters.minPrice !== undefined && p.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && p.price > filters.maxPrice) {
      return false;
    }
    if (filters.minBedrooms !== undefined && p.bedrooms < filters.minBedrooms) {
      return false;
    }
    if (filters.maxBedrooms !== undefined && p.bedrooms > filters.maxBedrooms) {
      return false;
    }
    if (filters.isNewBuild !== undefined && p.isNewBuild !== filters.isNewBuild) {
      return false;
    }
    if (filters.hasPool !== undefined && p.hasPool !== filters.hasPool) {
      return false;
    }
    if (filters.source && p.source !== filters.source) {
      return false;
    }
    return true;
  });
}

// Generate town summary from properties
export function generateTownSummary(
  townName: string,
  properties: UnifiedProperty[]
): TownSummary {
  const townProperties = properties.filter(
    p => p.town.toLowerCase() === townName.toLowerCase()
  );
  
  const prices = townProperties.map(p => p.price).filter(p => p > 0);
  const types = [...new Set(townProperties.map(p => p.propertyType))];
  const sources = [...new Set(townProperties.map(p => p.source))];
  const region = townProperties[0]?.region || 'Costa Blanca';
  
  return {
    name: townName,
    slug: generateSlug(townName),
    region,
    propertyCount: townProperties.length,
    propertyTypes: types,
    priceRange: {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 0,
    },
    sources,
  };
}
