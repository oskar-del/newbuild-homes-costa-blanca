/**
 * Unified Property Types
 * 
 * Defines the standardized property format used across the application.
 * All property feeds are normalized to this format.
 */

/**
 * Property image
 */
export interface PropertyImage {
  url: string;
  caption?: string;
  width?: number;
  height?: number;
}

/**
 * Multilingual property descriptions
 */
export interface PropertyDescription {
  en?: string;
  es?: string;
  de?: string;
  nl?: string;
  fr?: string;
  sv?: string;
  da?: string;
  no?: string;
  fi?: string;
  pl?: string;
  ru?: string;
  [key: string]: string | undefined;
}

/**
 * AI-generated content for a property
 */
export interface AIGeneratedContent {
  title: string;
  highlights: string[];
  lifestyleDescription?: string;
  investmentPotential?: string;
  seoDescription?: string;
}

/**
 * Unified Property interface
 * 
 * This is the standardized format for all properties in the system.
 * Data from different feeds is normalized to this structure.
 */
export interface UnifiedProperty {
  // Identity
  id: string;                    // Unique ID: "redsp-12345" or "bp-ABC123"
  reference: string;             // Original reference from source
  source: 'redsp' | 'background-properties' | 'manual' | 'miralbo';
  
  // Location
  town: string;                  // Main town/city name
  locationDetail?: string;       // Specific area within town
  province: string;              // Province (typically "Alicante" or "Murcia")
  region: string;                // "Costa Blanca South" | "Costa Blanca North" | "Costa Blanca"
  latitude: number;
  longitude: number;
  
  // Property details
  propertyType: string;          // Villa, Apartment, Townhouse, Penthouse, etc.
  bedrooms: number;
  bathrooms: number;
  builtArea: number;             // Built area in m²
  plotArea: number;              // Plot size in m² (0 for apartments)
  
  // Pricing
  price: number;                 // Price in EUR
  currency: string;              // "EUR"
  pricePerMeter?: number;        // Price per m² (calculated)
  
  // Media
  images: PropertyImage[];
  virtualTourUrl?: string;
  videoUrl?: string;
  
  // Descriptions (multilingual)
  descriptions: PropertyDescription;
  
  // Features (array of feature strings)
  features: string[];
  
  // Feature flags (for quick filtering)
  hasPool: boolean;
  hasGarden: boolean;
  hasTerrace: boolean;
  hasParking: boolean;
  hasSeaview: boolean;
  hasGolfview: boolean;
  
  // New build / Development specific
  isNewBuild?: boolean;
  developmentName?: string;           // Project name: "GOMERA STAR", "Contrimar Oasis"
  developer?: string;                 // Builder name: "GUEMAR", "Grupo Prasa"
  deliveryDate?: string;              // Move-in date: "01-06-2026"
  completionDate?: string;            // Alias for deliveryDate
  constructionStatus?: 'off-plan' | 'under-construction' | 'completed' | 'key-ready';
  zone?: string;                      // Sub-area: "Aguas Nuevas"
  
  // AI-generated content (optional, added on demand)
  aiContent?: AIGeneratedContent;
  
  // Metadata
  createdAt?: string;
  updatedAt?: string;
  lastFetched?: string;
}

/**
 * Property summary for listing pages
 */
export interface PropertySummary {
  id: string;
  reference: string;
  title: string;
  town: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  builtArea: number;
  price: number;
  mainImage: string;
  hasPool: boolean;
  hasSeaview: boolean;
  hasGolfview: boolean;
}

/**
 * Convert UnifiedProperty to PropertySummary
 */
export function toPropertySummary(property: UnifiedProperty): PropertySummary {
  return {
    id: property.id,
    reference: property.reference,
    title: property.aiContent?.title || 
      `${property.bedrooms} Bed ${property.propertyType} in ${property.town}`,
    town: property.town,
    propertyType: property.propertyType,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    builtArea: property.builtArea,
    price: property.price,
    mainImage: property.images[0]?.url || '/placeholder-property.jpg',
    hasPool: property.hasPool,
    hasSeaview: property.hasSeaview,
    hasGolfview: property.hasGolfview,
  };
}

/**
 * Format price for display
 */
export function formatPrice(price: number | undefined, currency: string = 'EUR'): string {
  if (!price) return 'Contact for Price';
  
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format area for display
 */
export function formatArea(area: number | undefined): string {
  if (!area) return '-';
  return `${area.toLocaleString()}m²`;
}

/**
 * Get main description in preferred language
 */
export function getDescription(
  descriptions: PropertyDescription,
  preferredLanguage: string = 'en'
): string {
  // Try preferred language first
  if (descriptions[preferredLanguage]) {
    return descriptions[preferredLanguage]!;
  }
  
  // Fall back to English
  if (descriptions.en) {
    return descriptions.en;
  }
  
  // Return first available description
  for (const desc of Object.values(descriptions)) {
    if (desc) return desc;
  }
  
  return '';
}

/**
 * Calculate price per square meter
 */
export function calculatePricePerMeter(price: number, builtArea: number): number {
  if (!price || !builtArea || builtArea === 0) return 0;
  return Math.round(price / builtArea);
}

/**
 * Get feature badge info
 */
export interface FeatureBadge {
  label: string;
  icon: string;
  color: string;
}

export function getFeatureBadges(property: UnifiedProperty): FeatureBadge[] {
  const badges: FeatureBadge[] = [];
  
  if (property.hasPool) {
    badges.push({ label: 'Pool', icon: '🏊', color: 'bg-blue-100 text-blue-800' });
  }
  if (property.hasSeaview) {
    badges.push({ label: 'Sea View', icon: '🌊', color: 'bg-cyan-100 text-cyan-800' });
  }
  if (property.hasGolfview) {
    badges.push({ label: 'Golf View', icon: '⛳', color: 'bg-green-100 text-green-800' });
  }
  if (property.hasGarden) {
    badges.push({ label: 'Garden', icon: '🌳', color: 'bg-emerald-100 text-emerald-800' });
  }
  if (property.hasTerrace) {
    badges.push({ label: 'Terrace', icon: '☀️', color: 'bg-amber-100 text-amber-800' });
  }
  if (property.hasParking) {
    badges.push({ label: 'Parking', icon: '🚗', color: 'bg-stone-100 text-stone-800' });
  }
  
  return badges;
}

/**
 * Sort properties by various criteria
 */
export type SortOption = 
  | 'price-asc'
  | 'price-desc'
  | 'bedrooms-asc'
  | 'bedrooms-desc'
  | 'size-asc'
  | 'size-desc'
  | 'newest';

export function sortProperties(
  properties: UnifiedProperty[],
  sortBy: SortOption
): UnifiedProperty[] {
  const sorted = [...properties];
  
  switch (sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      break;
    case 'price-desc':
      sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      break;
    case 'bedrooms-asc':
      sorted.sort((a, b) => (a.bedrooms || 0) - (b.bedrooms || 0));
      break;
    case 'bedrooms-desc':
      sorted.sort((a, b) => (b.bedrooms || 0) - (a.bedrooms || 0));
      break;
    case 'size-asc':
      sorted.sort((a, b) => (a.builtArea || 0) - (b.builtArea || 0));
      break;
    case 'size-desc':
      sorted.sort((a, b) => (b.builtArea || 0) - (a.builtArea || 0));
      break;
    case 'newest':
    default:
      // Keep original order (typically by when added to feed)
      break;
  }
  
  return sorted;
}
