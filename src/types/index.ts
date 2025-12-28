// Property from XML Feed
export interface Property {
  id: string;
  reference: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  builtArea: number; // m²
  plotArea?: number; // m²
  terrace?: number; // m²
  garden?: number; // m²
  solarium?: number; // m²
  images: string[];
  features: string[];
  location: PropertyLocation;
  development?: string; // Development name
  developer?: string; // Builder/developer name
  status: PropertyStatus;
  completionDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type PropertyType = 
  | "apartment" 
  | "penthouse" 
  | "villa" 
  | "townhouse" 
  | "bungalow" 
  | "duplex";

export type PropertyStatus = 
  | "key-ready" 
  | "completion-3-months" 
  | "under-construction" 
  | "off-plan"
  | "sold";

export interface PropertyLocation {
  area: string;
  town: string;
  province: string;
  country: string;
  latitude?: number;
  longitude?: number;
  nearestBeach?: number; // km
  nearestAirport?: number; // km
  nearestGolf?: number; // km
}

// Development (a collection of properties from same project)
export interface Development {
  id: string;
  slug: string;
  name: string;
  builder: string; // Builder slug
  location: {
    area: string;
    town: string;
    address?: string;
    coordinates?: { lat: number; lng: number };
  };
  status: PropertyStatus;
  totalUnits: number;
  availableUnits?: number;
  completionDate?: string;
  phases?: DevelopmentPhase[];
  priceRange: {
    min: number;
    max: number;
  };
  propertyTypes: PropertyType[];
  bedroomRange: {
    min: number;
    max: number;
  };
  sizeRange: {
    min: number;
    max: number;
  };
  features: string[];
  amenities: string[];
  description: string;
  shortDescription: string;
  images: {
    hero: string;
    gallery: string[];
    floorPlans?: string[];
  };
  distances: {
    beach?: number;
    airport?: number;
    golf?: number;
    shopping?: number;
    hospital?: number;
  };
  investment?: {
    rentalYield?: string;
    touristLicense?: boolean;
    vatRecoverable?: boolean;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface DevelopmentPhase {
  name: string;
  units: number;
  completionDate: string;
  status: PropertyStatus;
  soldOut?: boolean;
}

// Builder/Developer
export interface Builder {
  id: string;
  slug: string;
  name: string;
  legalName?: string;
  established?: number;
  headquarters?: string;
  description: string;
  shortDescription: string;
  logo?: string;
  website?: string;
  completedProjects?: number;
  propertiesDelivered?: number;
  specializations: PropertyType[];
  certifications?: string[];
  awards?: { name: string; year: number }[];
  developments: string[]; // Development slugs
  seo: {
    title: string;
    description: string;
  };
}

// Area Guide
export interface Area {
  id: string;
  slug: string;
  name: string;
  region: "costa-blanca-north" | "costa-blanca-south";
  province: string;
  description: string;
  population?: number;
  expatPercentage?: number;
  climate: {
    avgTemp: number;
    sunshineDays: number;
  };
  lifestyle: {
    character: string;
    pace: string;
    englishSpoken: string;
  };
  amenities: {
    beaches?: string[];
    golf?: string[];
    shopping?: string[];
    healthcare?: string[];
  };
  distances: {
    alicante?: number;
    murcia?: number;
    beach?: number;
  };
  propertyMarket: {
    avgPricePerSqm: number;
    priceRange: { min: number; max: number };
    trend: "rising" | "stable" | "falling";
  };
  developments: string[]; // Development slugs
  images: {
    hero: string;
    gallery: string[];
  };
  seo: {
    title: string;
    description: string;
  };
}

// Lead Form Submission
export interface LeadSubmission {
  name: string;
  email: string;
  phone: string;
  message?: string;
  propertyInterest?: string; // Development or property ID
  source: string; // Page URL
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  language?: string;
}

// FAQ Item
export interface FAQItem {
  question: string;
  answer: string;
}

// Navigation Item
export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}
