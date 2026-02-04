/**
 * Developments Data Layer
 *
 * This file contains structured data for new build developments,
 * adding the "story" layer on top of property-development-mapping.ts
 *
 * Integrates with:
 * - Area pages (shows developments in each area)
 * - Developer pages (shows developments by each developer)
 * - Blog posts (related content)
 * - Property listings (groups properties by development)
 */

import { propertyMapping } from './property-development-mapping';

// ==========================================
// TYPES
// ==========================================

export type DevelopmentStatus = 'selling' | 'coming-soon' | 'sold-out' | 'last-units';

export type LifestyleFit =
  | 'golf-enthusiast'
  | 'beach-lover'
  | 'family'
  | 'retirement'
  | 'investor'
  | 'first-time-buyer'
  | 'luxury-seeker'
  | 'holiday-home';

export interface Development {
  // Identity
  slug: string;
  name: string;
  displayName?: string;  // For nicer display (e.g., "Oasis Villas" instead of "OASIS VILLAS 2 LA FINCA")

  // Developer
  developer: string;
  developerSlug: string;

  // Location
  area: string;           // 'algorfa', 'orihuela-costa', 'guardamar-del-segura'
  areaSlug: string;
  zone: string;           // 'La Finca Golf', 'El Raso'
  coordinates?: [number, number];

  // The Story
  concept: string;        // Short tagline: "Frontline Golf Living"
  description: string;    // Longer description for development page
  idealFor: LifestyleFit[];
  highlights: string[];   // Key selling points

  // Status & Timeline
  status: DevelopmentStatus;
  phase?: string;         // 'Phase 2', 'Final Phase'
  deliveryFrom: string;   // 'Q1 2026'
  deliveryTo?: string;    // 'Q4 2027'

  // Pricing
  priceFrom: number;
  priceTo?: number;

  // Property Types Available
  propertyTypes: string[];  // ['Villa', 'Apartment', 'Townhouse']
  bedroomsRange: string;    // '2-4'

  // Media
  heroImage?: string;
  galleryImages?: string[];

  // SEO & Content
  relatedBlogSlugs: string[];
  seoKeywords?: string[];

  // Computed from property-development-mapping (populated at runtime)
  propertyRefs?: string[];
}

// ==========================================
// DEVELOPERS
// ==========================================

export interface Developer {
  slug: string;
  name: string;
  displayName: string;
  description: string;
  founded?: string;
  headquarters?: string;
  website?: string;
  specialties: string[];
  trustFactors: string[];  // ['Bank Guarantees', '10-Year Warranty', etc.]
}

export const developers: Record<string, Developer> = {
  'contrimar': {
    slug: 'contrimar',
    name: 'CONTRIMAR',
    displayName: 'Contrimar',
    description: 'One of the most established developers in Costa Blanca South, known for their Oasis series of developments. Contrimar has been building quality homes in the Vega Baja region for over 20 years.',
    founded: '2000',
    headquarters: 'Torrevieja',
    website: 'https://contrimar.com',
    specialties: ['Golf Properties', 'Villas with Pool', 'Mediterranean Design'],
    trustFactors: ['Bank Guarantee (LCI)', '10-Year Structural Warranty', 'Fixed Price Contracts', 'Established Track Record'],
  },
  'mamosol': {
    slug: 'mamosol',
    name: 'MAMOSOL',
    displayName: 'Mamosol',
    description: 'Quality Spanish developer specializing in modern Mediterranean villas and apartments across Costa Blanca South.',
    specialties: ['Modern Architecture', 'Golf Properties', 'Energy Efficient Homes'],
    trustFactors: ['Bank Guarantee (LCI)', '10-Year Structural Warranty', 'Quality Finishes'],
  },
  'prasa-real-estate': {
    slug: 'prasa-real-estate',
    name: 'PRASA REAL ESTATE',
    displayName: 'Prasa Real Estate',
    description: 'Experienced developer delivering high-quality new builds in prime golf locations.',
    specialties: ['Golf Developments', 'Luxury Villas'],
    trustFactors: ['Bank Guarantee (LCI)', '10-Year Structural Warranty'],
  },
  'trvite': {
    slug: 'trvite',
    name: 'TRVITE',
    displayName: 'Trvite',
    description: 'Developer known for their Grecia series of Mediterranean-style homes.',
    specialties: ['Mediterranean Style', 'Golf Properties'],
    trustFactors: ['Bank Guarantee (LCI)', '10-Year Structural Warranty'],
  },
  'the-film-group-spain': {
    slug: 'the-film-group-spain',
    name: 'THE FILM GROUP SPAIN',
    displayName: 'The Film Group Spain',
    description: 'Boutique developer creating unique lifestyle properties in Costa Blanca.',
    specialties: ['Lifestyle Developments', 'Unique Designs'],
    trustFactors: ['Bank Guarantee (LCI)', '10-Year Structural Warranty'],
  },
  'larcosta': {
    slug: 'larcosta',
    name: 'LARCOSTA',
    displayName: 'Larcosta',
    description: 'Spanish developer delivering quality homes in golf locations.',
    specialties: ['Golf Properties', 'Family Homes'],
    trustFactors: ['Bank Guarantee (LCI)', '10-Year Structural Warranty'],
  },
  'the-palm-group-spain': {
    slug: 'the-palm-group-spain',
    name: 'THE PALM GROUP SPAIN',
    displayName: 'The Palm Group Spain',
    description: 'Developer specializing in luxury villas with modern designs.',
    specialties: ['Luxury Villas', 'Modern Architecture'],
    trustFactors: ['Bank Guarantee (LCI)', '10-Year Structural Warranty'],
  },
  'fatima': {
    slug: 'fatima',
    name: 'FATIMA',
    displayName: 'Fatima',
    description: 'Quality developer in the Costa Blanca region.',
    specialties: ['Villas', 'Golf Properties'],
    trustFactors: ['Bank Guarantee (LCI)', '10-Year Structural Warranty'],
  },
};

// ==========================================
// DEVELOPMENTS - ALGORFA / LA FINCA GOLF
// ==========================================

export const developments: Development[] = [
  // CONTRIMAR - OASIS VILLAS 2 LA FINCA
  {
    slug: 'oasis-villas-la-finca',
    name: 'OASIS VILLAS 2 LA FINCA',
    displayName: 'Oasis Villas',
    developer: 'CONTRIMAR',
    developerSlug: 'contrimar',
    area: 'algorfa',
    areaSlug: 'algorfa',
    zone: 'La Finca Golf',
    coordinates: [38.0647, -0.7928],
    concept: 'Frontline Golf Living, Perfected',
    description: 'Contrimar\'s flagship development at La Finca Golf Resort. These detached villas offer the ultimate golf lifestyle with frontline plots, private pools, and uninterrupted views across the championship course. Each villa features modern Mediterranean architecture, spacious terraces, and high-quality finishes that Contrimar is known for.',
    idealFor: ['golf-enthusiast', 'retirement', 'luxury-seeker'],
    highlights: [
      'Frontline golf plots',
      'Private pools as standard',
      'Solarium with panoramic views',
      '10-year structural warranty',
      'Walking distance to clubhouse',
    ],
    status: 'selling',
    phase: 'Phase 2',
    deliveryFrom: 'Q1 2027',
    priceFrom: 445000,
    priceTo: 550000,
    propertyTypes: ['Villa'],
    bedroomsRange: '3',
    heroImage: 'https://fotos15.apinmo.com/7515/27556319/11-1.jpg',
    galleryImages: [
      'https://fotos15.apinmo.com/7515/27556319/11-1.jpg',
      'https://fotos15.apinmo.com/7515/27556319/11-2.jpg',
      'https://fotos15.apinmo.com/7515/27556319/11-3.jpg',
      'https://fotos15.apinmo.com/7515/27556319/11-4.jpg',
    ],
    relatedBlogSlugs: ['why-buy-new-build-spain', 'la-finca-golf-guide', 'golf-properties-costa-blanca'],
    seoKeywords: ['La Finca golf villa', 'Oasis Villas', 'Contrimar Algorfa', 'frontline golf property'],
  },

  // CONTRIMAR - OASIS GOLF LA FINCA
  {
    slug: 'oasis-golf-la-finca',
    name: 'OASIS GOLF LA FINCA',
    displayName: 'Oasis Golf',
    developer: 'CONTRIMAR',
    developerSlug: 'contrimar',
    area: 'algorfa',
    areaSlug: 'algorfa',
    zone: 'La Finca Golf',
    coordinates: [38.0650, -0.7935],
    concept: 'Modern Golf Villas',
    description: 'Part of Contrimar\'s successful Oasis series, these modern villas at La Finca Golf combine contemporary design with the relaxed golf lifestyle. Features include private pools, landscaped gardens, and easy access to the golf course.',
    idealFor: ['golf-enthusiast', 'retirement', 'holiday-home'],
    highlights: [
      'Modern Mediterranean design',
      'Private pool',
      'Golf course views',
      'Established Contrimar quality',
    ],
    status: 'last-units',
    deliveryFrom: 'Q4 2025',
    deliveryTo: 'Q3 2026',
    priceFrom: 420000,
    priceTo: 480000,
    propertyTypes: ['Villa'],
    bedroomsRange: '3',
    heroImage: 'https://fotos15.apinmo.com/7515/23062429/2-1.jpg',
    galleryImages: [
      'https://fotos15.apinmo.com/7515/23062429/2-1.jpg',
      'https://fotos15.apinmo.com/7515/23062429/2-2.jpg',
      'https://fotos15.apinmo.com/7515/23062429/2-3.jpg',
      'https://fotos15.apinmo.com/7515/23062429/2-4.jpg',
    ],
    relatedBlogSlugs: ['why-buy-new-build-spain', 'la-finca-golf-guide'],
  },

  // MAMOSOL - ARENA GOLF
  {
    slug: 'arena-golf',
    name: 'ARENA GOLF',
    displayName: 'Arena Golf',
    developer: 'MAMOSOL',
    developerSlug: 'mamosol',
    area: 'algorfa',
    areaSlug: 'algorfa',
    zone: 'La Finca Golf',
    coordinates: [38.0640, -0.7920],
    concept: 'Contemporary Golf Living',
    description: 'Arena Golf by Mamosol brings contemporary architecture to La Finca Golf Resort. These stylish villas feature clean lines, open-plan living, and seamless indoor-outdoor flow. Perfect for those who appreciate modern design in a golf setting.',
    idealFor: ['golf-enthusiast', 'luxury-seeker', 'holiday-home'],
    highlights: [
      'Contemporary architecture',
      'Open-plan living',
      'Private pool',
      'High-end finishes',
      'Golf views',
    ],
    status: 'selling',
    deliveryFrom: 'Q1 2026',
    deliveryTo: 'Q3 2026',
    priceFrom: 465000,
    priceTo: 520000,
    propertyTypes: ['Villa'],
    bedroomsRange: '3',
    heroImage: 'https://fotos15.apinmo.com/7515/24650833/3-1.jpg',
    galleryImages: [
      'https://fotos15.apinmo.com/7515/24650833/3-1.jpg',
      'https://fotos15.apinmo.com/7515/24650833/3-2.jpg',
      'https://fotos15.apinmo.com/7515/24650833/3-3.jpg',
      'https://fotos15.apinmo.com/7515/24650833/3-4.jpg',
    ],
    relatedBlogSlugs: ['modern-villa-design-spain', 'la-finca-golf-guide'],
  },

  // PRASA REAL ESTATE - LA VAGUADA
  {
    slug: 'la-vaguada',
    name: 'LA VAGUADA',
    displayName: 'La Vaguada',
    developer: 'PRASA REAL ESTATE',
    developerSlug: 'prasa-real-estate',
    area: 'algorfa',
    areaSlug: 'algorfa',
    zone: 'La Finca Golf',
    coordinates: [38.0655, -0.7945],
    concept: 'Elegant Golf Residences',
    description: 'La Vaguada offers elegant detached villas in a prime La Finca Golf location. These spacious homes feature traditional Mediterranean style with modern comforts, private pools, and generous plots.',
    idealFor: ['golf-enthusiast', 'family', 'retirement'],
    highlights: [
      'Generous plot sizes',
      'Mediterranean style',
      'Private pool',
      'Quality construction',
    ],
    status: 'selling',
    deliveryFrom: 'Q1 2027',
    deliveryTo: 'Q3 2027',
    priceFrom: 380000,
    priceTo: 450000,
    propertyTypes: ['Villa'],
    bedroomsRange: '3-4',
    heroImage: 'https://fotos15.apinmo.com/7515/27624700/14-1.jpg',
    galleryImages: [
      'https://fotos15.apinmo.com/7515/27624700/14-1.jpg',
      'https://fotos15.apinmo.com/7515/27624700/14-2.jpg',
      'https://fotos15.apinmo.com/7515/27624700/14-3.jpg',
      'https://fotos15.apinmo.com/7515/27624700/14-4.jpg',
    ],
    relatedBlogSlugs: ['la-finca-golf-guide'],
  },

  // THE FILM GROUP SPAIN - LIFE MEDITERRANEA
  {
    slug: 'life-mediterranea',
    name: 'LIFE MEDITERRANEA',
    displayName: 'Life Mediterranea',
    developer: 'THE FILM GROUP SPAIN',
    developerSlug: 'the-film-group-spain',
    area: 'algorfa',
    areaSlug: 'algorfa',
    zone: 'La Finca Golf',
    coordinates: [38.0638, -0.7918],
    concept: 'Mediterranean Lifestyle Living',
    description: 'Life Mediterranea captures the essence of Spanish coastal living. These thoughtfully designed villas blend indoor and outdoor spaces, with terraces perfect for al fresco dining and entertaining.',
    idealFor: ['retirement', 'holiday-home', 'golf-enthusiast'],
    highlights: [
      'Al fresco living spaces',
      'Mediterranean architecture',
      'Private pool',
      'Close to clubhouse',
    ],
    status: 'selling',
    deliveryFrom: 'Q4 2026',
    priceFrom: 395000,
    priceTo: 460000,
    propertyTypes: ['Villa'],
    bedroomsRange: '3',
    heroImage: 'https://fotos15.apinmo.com/7515/27648691/7-1.jpg',
    galleryImages: [
      'https://fotos15.apinmo.com/7515/27648691/7-1.jpg',
      'https://fotos15.apinmo.com/7515/27648691/7-2.jpg',
      'https://fotos15.apinmo.com/7515/27648691/7-3.jpg',
      'https://fotos15.apinmo.com/7515/27648691/7-4.jpg',
    ],
    relatedBlogSlugs: ['mediterranean-lifestyle-spain'],
  },

  // LARCOSTA - LARCOSTA HOMES BY FG
  {
    slug: 'larcosta-homes-la-finca',
    name: 'LARCOSTA HOMES BY FG',
    displayName: 'Larcosta Homes',
    developer: 'LARCOSTA',
    developerSlug: 'larcosta',
    area: 'algorfa',
    areaSlug: 'algorfa',
    zone: 'La Finca Golf',
    coordinates: [38.0645, -0.7932],
    concept: 'Quality Family Villas',
    description: 'Larcosta Homes delivers well-built family villas at La Finca Golf. These practical yet stylish homes offer excellent value with quality construction and thoughtful layouts.',
    idealFor: ['family', 'golf-enthusiast', 'first-time-buyer'],
    highlights: [
      'Excellent value',
      'Quality construction',
      'Family-friendly layouts',
      'Private pool',
    ],
    status: 'last-units',
    deliveryFrom: 'Q4 2026',
    priceFrom: 350000,
    priceTo: 420000,
    propertyTypes: ['Villa'],
    bedroomsRange: '3',
    heroImage: 'https://fotos15.apinmo.com/7515/26911296/17-1.jpg',
    galleryImages: [
      'https://fotos15.apinmo.com/7515/26911296/17-1.jpg',
      'https://fotos15.apinmo.com/7515/26911296/17-2.jpg',
      'https://fotos15.apinmo.com/7515/26911296/17-3.jpg',
      'https://fotos15.apinmo.com/7515/26911296/17-4.jpg',
    ],
    relatedBlogSlugs: ['family-homes-costa-blanca'],
  },

  // TRVITE - GRECIA II
  {
    slug: 'grecia-ii-la-finca',
    name: 'GRECIA II',
    displayName: 'Grecia II',
    developer: 'TRVITE',
    developerSlug: 'trvite',
    area: 'algorfa',
    areaSlug: 'algorfa',
    zone: 'La Finca Golf',
    coordinates: [38.0642, -0.7925],
    concept: 'Classic Mediterranean Charm',
    description: 'Grecia II continues Trvite\'s popular Mediterranean-inspired series. These charming villas feature traditional styling with arched doorways, terracotta details, and sun-drenched terraces.',
    idealFor: ['retirement', 'holiday-home', 'golf-enthusiast'],
    highlights: [
      'Classic Mediterranean style',
      'Established development',
      'Private pool',
      'Proven developer',
    ],
    status: 'selling',
    deliveryFrom: 'Q1 2026',
    deliveryTo: 'Q2 2026',
    priceFrom: 360000,
    priceTo: 420000,
    propertyTypes: ['Villa'],
    bedroomsRange: '3',
    heroImage: 'https://fotos15.apinmo.com/7515/23976726/22-1.jpg',
    galleryImages: [
      'https://fotos15.apinmo.com/7515/23976726/22-1.jpg',
      'https://fotos15.apinmo.com/7515/23976726/22-2.jpg',
      'https://fotos15.apinmo.com/7515/23976726/22-3.jpg',
      'https://fotos15.apinmo.com/7515/23976726/22-4.jpg',
    ],
    relatedBlogSlugs: ['mediterranean-style-homes'],
  },

  // TRVITE - GRECIA ZANTE
  {
    slug: 'grecia-zante',
    name: 'GRECIA_ZANTE',
    displayName: 'Grecia Zante',
    developer: 'TRVITE',
    developerSlug: 'trvite',
    area: 'algorfa',
    areaSlug: 'algorfa',
    zone: 'Algorfa',
    coordinates: [38.0620, -0.7900],
    concept: 'Affordable Mediterranean Living',
    description: 'Part of Trvite\'s Grecia series, Zante offers an accessible entry point to the Algorfa lifestyle. These well-designed homes provide Mediterranean charm at an attractive price point.',
    idealFor: ['first-time-buyer', 'investor', 'holiday-home'],
    highlights: [
      'Affordable entry point',
      'Mediterranean design',
      'Close to La Finca Golf',
      'Good rental potential',
    ],
    status: 'selling',
    deliveryFrom: 'Q2 2026',
    priceFrom: 280000,
    priceTo: 350000,
    propertyTypes: ['Villa', 'Townhouse'],
    bedroomsRange: '2-3',
    heroImage: 'https://fotos15.apinmo.com/7515/23976726/22-5.jpg',
    galleryImages: [
      'https://fotos15.apinmo.com/7515/23976726/22-5.jpg',
      'https://fotos15.apinmo.com/7515/23976726/22-6.jpg',
      'https://fotos15.apinmo.com/7515/23976726/22-7.jpg',
      'https://fotos15.apinmo.com/7515/23976726/22-8.jpg',
    ],
    relatedBlogSlugs: ['affordable-new-builds-spain', 'investment-property-spain'],
  },

  // THE PALM GROUP SPAIN - VILLAS ORQUIDEA
  {
    slug: 'villas-orquidea',
    name: 'VILLAS ORQUIDEA',
    displayName: 'Villas Orquídea',
    developer: 'THE PALM GROUP SPAIN',
    developerSlug: 'the-palm-group-spain',
    area: 'algorfa',
    areaSlug: 'algorfa',
    zone: 'Algorfa',
    coordinates: [38.0615, -0.7895],
    concept: 'Luxury Private Villas',
    description: 'Villas Orquídea by The Palm Group Spain offers exclusive detached villas with premium finishes and generous private plots. For those seeking privacy and luxury near La Finca Golf.',
    idealFor: ['luxury-seeker', 'retirement', 'golf-enthusiast'],
    highlights: [
      'Generous private plots',
      'Premium finishes',
      'Exclusive development',
      'Near La Finca Golf',
    ],
    status: 'last-units',
    deliveryFrom: 'Q4 2025',
    priceFrom: 480000,
    priceTo: 580000,
    propertyTypes: ['Villa'],
    bedroomsRange: '3-4',
    heroImage: 'https://fotos15.apinmo.com/7515/27183783/13-1.jpg',
    galleryImages: [
      'https://fotos15.apinmo.com/7515/27183783/13-1.jpg',
      'https://fotos15.apinmo.com/7515/27183783/13-2.jpg',
      'https://fotos15.apinmo.com/7515/27183783/13-3.jpg',
      'https://fotos15.apinmo.com/7515/27183783/13-4.jpg',
    ],
    relatedBlogSlugs: ['luxury-villas-costa-blanca'],
  },

  // FATIMA - GIANE VILLAS
  {
    slug: 'giane-villas',
    name: 'GIANE VILLAS',
    displayName: 'Giane Villas',
    developer: 'FATIMA',
    developerSlug: 'fatima',
    area: 'algorfa',
    areaSlug: 'algorfa',
    zone: 'La Finca Golf',
    coordinates: [38.0648, -0.7930],
    concept: 'Classic Golf Villas',
    description: 'Giane Villas offers traditional detached homes at La Finca Golf. Well-constructed villas with private pools and gardens, ideal for those seeking the established golf community lifestyle.',
    idealFor: ['golf-enthusiast', 'retirement'],
    highlights: [
      'Traditional design',
      'Private pool',
      'Established location',
      'Golf community access',
    ],
    status: 'last-units',
    deliveryFrom: 'Q4 2025',
    priceFrom: 390000,
    priceTo: 450000,
    propertyTypes: ['Villa'],
    bedroomsRange: '3',
    heroImage: 'https://fotos15.apinmo.com/7515/23021118/5-1.jpg',
    galleryImages: [
      'https://fotos15.apinmo.com/7515/23021118/5-1.jpg',
      'https://fotos15.apinmo.com/7515/23021118/5-2.jpg',
      'https://fotos15.apinmo.com/7515/23021118/5-3.jpg',
    ],
    relatedBlogSlugs: ['la-finca-golf-guide'],
  },

  // CONTRIMAR - OASIS LAGUNA 3 (Guardamar - for reference/linking)
  {
    slug: 'oasis-laguna-3',
    name: 'OASIS LAGUNA 3',
    displayName: 'Oasis Laguna 3',
    developer: 'CONTRIMAR',
    developerSlug: 'contrimar',
    area: 'guardamar-del-segura',
    areaSlug: 'guardamar-del-segura',
    zone: 'El Raso',
    coordinates: [38.0900, -0.6600],
    concept: 'Lagoon-Style Beach Living',
    description: 'The latest phase of Contrimar\'s popular Oasis Laguna development in El Raso, Guardamar. These apartments and townhouses offer resort-style living with communal pools and just minutes from Guardamar\'s stunning beaches.',
    idealFor: ['beach-lover', 'investor', 'holiday-home', 'first-time-buyer'],
    highlights: [
      'Resort-style communal pools',
      '10 minutes to beach',
      'Affordable entry point',
      'Strong rental potential',
      'Established Contrimar quality',
    ],
    status: 'selling',
    phase: 'Phase 3',
    deliveryFrom: 'Q1 2027',
    priceFrom: 165000,
    priceTo: 280000,
    propertyTypes: ['Apartment', 'Townhouse'],
    bedroomsRange: '2-3',
    heroImage: 'https://fotos15.apinmo.com/7515/27671767/22-1.jpg',
    galleryImages: [
      'https://fotos15.apinmo.com/7515/27671767/22-1.jpg',
      'https://fotos15.apinmo.com/7515/27671767/22-2.jpg',
      'https://fotos15.apinmo.com/7515/27671767/22-3.jpg',
      'https://fotos15.apinmo.com/7515/27671767/22-4.jpg',
    ],
    relatedBlogSlugs: ['guardamar-beach-guide', 'affordable-new-builds-spain', 'investment-property-spain'],
  },
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get all developments for a specific area
 */
export function getDevelopmentsByArea(areaSlug: string): Development[] {
  return developments.filter(dev => dev.areaSlug === areaSlug);
}

/**
 * Get all developments by a specific developer
 */
export function getDevelopmentsByDeveloper(developerSlug: string): Development[] {
  return developments.filter(dev => dev.developerSlug === developerSlug);
}

/**
 * Get development by slug
 */
export function getDevelopmentBySlug(slug: string): Development | undefined {
  return developments.find(dev => dev.slug === slug);
}

/**
 * Get developer by slug
 */
export function getDeveloperBySlug(slug: string): Developer | undefined {
  return developers[slug];
}

/**
 * Get property references for a development (from property-development-mapping)
 */
export function getPropertyRefsForDevelopment(developmentName: string): string[] {
  return Object.entries(propertyMapping)
    .filter(([_, info]) => info.development === developmentName)
    .map(([ref, _]) => ref);
}

/**
 * Get developments that match a lifestyle
 */
export function getDevelopmentsByLifestyle(lifestyle: LifestyleFit): Development[] {
  return developments.filter(dev => dev.idealFor.includes(lifestyle));
}

/**
 * Get developments within a price range
 */
export function getDevelopmentsByPriceRange(min: number, max: number): Development[] {
  return developments.filter(dev =>
    dev.priceFrom >= min && dev.priceFrom <= max
  );
}

/**
 * Get featured developments for an area (for area page spotlights)
 * Returns top 3 by: selling status first, then by price (variety)
 */
export function getFeaturedDevelopmentsForArea(areaSlug: string, limit: number = 3): Development[] {
  const areaDevelopments = getDevelopmentsByArea(areaSlug);

  // Sort: selling > last-units > coming-soon > sold-out
  const statusOrder: Record<DevelopmentStatus, number> = {
    'selling': 0,
    'last-units': 1,
    'coming-soon': 2,
    'sold-out': 3,
  };

  return areaDevelopments
    .sort((a, b) => {
      // First by status
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;
      // Then by price (ascending for variety)
      return a.priceFrom - b.priceFrom;
    })
    .slice(0, limit);
}

/**
 * Group developments by lifestyle fit for "Which development suits you?" section
 */
export function groupDevelopmentsByLifestyle(areaSlug: string): Record<LifestyleFit, Development[]> {
  const areaDevelopments = getDevelopmentsByArea(areaSlug);

  const grouped: Record<LifestyleFit, Development[]> = {
    'golf-enthusiast': [],
    'beach-lover': [],
    'family': [],
    'retirement': [],
    'investor': [],
    'first-time-buyer': [],
    'luxury-seeker': [],
    'holiday-home': [],
  };

  areaDevelopments.forEach(dev => {
    dev.idealFor.forEach(lifestyle => {
      grouped[lifestyle].push(dev);
    });
  });

  return grouped;
}

// ==========================================
// LIFESTYLE LABELS (for display)
// ==========================================

export const lifestyleLabels: Record<LifestyleFit, { name: string; icon: string; description: string }> = {
  'golf-enthusiast': {
    name: 'Golf Enthusiast',
    icon: '⛳',
    description: 'Frontline golf or walking distance to courses',
  },
  'beach-lover': {
    name: 'Beach Lover',
    icon: '🏖️',
    description: 'Close to beaches and coastal lifestyle',
  },
  'family': {
    name: 'Family',
    icon: '👨‍👩‍👧‍👦',
    description: 'Spacious layouts, near schools, safe communities',
  },
  'retirement': {
    name: 'Retirement',
    icon: '🌅',
    description: 'Peaceful, community-focused, low maintenance',
  },
  'investor': {
    name: 'Investor',
    icon: '📈',
    description: 'Strong rental yields and capital growth',
  },
  'first-time-buyer': {
    name: 'First-Time Buyer',
    icon: '🔑',
    description: 'Affordable entry points with quality',
  },
  'luxury-seeker': {
    name: 'Luxury Seeker',
    icon: '✨',
    description: 'Premium finishes and exclusive locations',
  },
  'holiday-home': {
    name: 'Holiday Home',
    icon: '🌴',
    description: 'Lock-and-leave, rental potential, leisure focused',
  },
};
