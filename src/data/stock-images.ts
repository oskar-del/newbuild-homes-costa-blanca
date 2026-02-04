/**
 * Stock Images Library
 *
 * Free Unsplash images for use throughout the site.
 * All images are free for commercial use, no attribution required.
 *
 * URL Format:
 * - Base URL: https://images.unsplash.com/{id}
 * - With sizing: https://images.unsplash.com/{id}?w=1200&q=80
 *
 * Usage:
 * - Import the category you need: import { beachImages, getImageUrl } from '@/data/stock-images'
 * - Use helper: getImageUrl(image, 1200, 80) -> returns full URL with params
 * - Always use the alt text for accessibility and SEO
 *
 * Note: Unsplash IDs can be used directly or via source.unsplash.com for dynamic sizing
 */

export interface StockImage {
  id: string;
  url: string;  // Base URL without params
  alt: string;
  description?: string;
  location?: string;
  photographer?: string;
  tags: string[];
}

// ==========================================
// BEACHES
// ==========================================

export const beachImages: StockImage[] = [
  {
    id: 'YZ8Jc6TiH2A',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    alt: 'White sand beach with turquoise water and distant buildings along the coastline',
    description: 'Beautiful Mediterranean-style beach with crystal clear water',
    photographer: 'Sean Oulashin',
    tags: ['beach', 'turquoise', 'sand', 'coastline', 'tropical'],
  },
  {
    id: 'XpcavhaqPa4',
    url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206',
    alt: 'Pristine beach with white sand and turquoise Mediterranean water',
    description: 'Classic beach scene with summer vibes',
    photographer: 'Shifaaz shamoon',
    tags: ['beach', 'white-sand', 'turquoise', 'summer'],
  },
  {
    id: 'yYZAY0iaAgM',
    url: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda',
    alt: 'Beautiful beach with turquoise water and blue sky, warm sand meeting sapphire sea',
    description: 'Minimalist surf study with warm sand and shifting aqua tones',
    photographer: 'Frank McKenna',
    tags: ['beach', 'blue-sky', 'turquoise', 'minimalist'],
  },
  {
    id: 'qg9SyEN27pk',
    url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
    alt: 'Sandy beach with calm turquoise water and distant green hills',
    description: 'Peaceful beach scene with rolling hills in background',
    photographer: 'Cristina Gottardi',
    tags: ['beach', 'calm', 'hills', 'peaceful'],
  },
  {
    id: 'uRr-MRaADLo',
    url: 'https://images.unsplash.com/photo-1520942702018-0862200e6873',
    alt: 'Beautiful turquoise water meets pristine white sand beach',
    description: 'Crystal clear waters meeting soft white sand',
    photographer: 'Ishan Seefromthesky',
    tags: ['beach', 'turquoise', 'white-sand', 'pristine'],
  },
  {
    id: 'V1hb2SLP-80',
    url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
    alt: 'Beautiful beach with turquoise water and gentle waves rolling onto shore',
    description: 'Waves gently breaking on tropical beach',
    photographer: 'Chen Mizrach',
    tags: ['beach', 'waves', 'turquoise', 'tropical'],
  },
  {
    id: 'kIdAUx6U0s8',
    url: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6',
    alt: 'Tropical beach with turquoise water and natural shade from palm trees',
    description: 'Shaded beach area perfect for relaxation',
    photographer: 'Rachel Claire',
    tags: ['beach', 'tropical', 'shade', 'palm-trees'],
  },
];

// ==========================================
// GOLF COURSES
// ==========================================

export const golfImages: StockImage[] = [
  {
    id: 'golf-fairway-1',
    url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b',
    alt: 'Scenic view of a golf course on a sunny day with blue sky and green fairway',
    description: 'Sunny day at the golf course with serene landscapes',
    photographer: 'Peter Drew',
    tags: ['golf', 'fairway', 'sunny', 'blue-sky', 'green'],
  },
  {
    id: 'golf-swing-1',
    url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa',
    alt: 'Golfer taking a swing on a sunny golf course',
    description: 'Action shot of golfer on the course',
    photographer: 'Courtney Cook',
    tags: ['golf', 'golfer', 'swing', 'action', 'sunny'],
  },
  {
    id: 'golf-sunset-1',
    url: 'https://images.unsplash.com/photo-1592919505780-303950717480',
    alt: 'Sunset shines over a lush green golf course with golden light',
    description: 'Beautiful sunset over golf course fairway',
    photographer: 'Sugar Golf',
    tags: ['golf', 'sunset', 'golden-hour', 'lush', 'green'],
  },
  {
    id: 'golf-course-1',
    url: 'https://images.unsplash.com/photo-1600783245777-080fd7ff9253',
    alt: 'Golf course at sunset with scenic panoramic view and palm trees lining the fairway',
    description: 'Panoramic golf course view with palm trees',
    photographer: 'Lo Sarkin',
    tags: ['golf', 'sunset', 'panoramic', 'palm-trees', 'fairway'],
  },
  {
    id: 'golf-green-1',
    url: 'https://images.unsplash.com/photo-1611374243147-44a702c2d44c',
    alt: 'Golf green with flag and manicured lawn under blue sky',
    description: 'Well-maintained putting green with flag',
    photographer: 'Robert Ruggiero',
    tags: ['golf', 'green', 'flag', 'putting', 'manicured'],
  },
];

// ==========================================
// VILLAS & POOLS
// ==========================================

export const villaPoolImages: StockImage[] = [
  {
    id: 'pool-palm-1',
    url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
    alt: 'Large swimming pool surrounded by palm trees at Spanish resort',
    description: 'Resort-style swimming pool with Mediterranean vibes',
    photographer: 'Humphrey Muleba',
    tags: ['pool', 'palm-trees', 'spain', 'resort', 'tropical'],
  },
  {
    id: 'pool-villa-1',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    alt: 'Modern swimming pool with palm trees at Mediterranean villa',
    description: 'Modern villa exterior with infinity pool',
    photographer: 'Francesca Tosolini',
    tags: ['pool', 'palm-trees', 'villa', 'modern', 'luxury'],
  },
  {
    id: 'pool-reflection-1',
    url: 'https://images.unsplash.com/photo-1572331165267-854da2b021a1',
    alt: 'Reflection of palm trees and white buildings in swimming pool water',
    description: 'Palm tree reflections on pool surface',
    photographer: 'Benjamin Child',
    tags: ['pool', 'reflection', 'palm-trees', 'buildings'],
  },
  {
    id: 'pool-aerial-1',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
    alt: 'Aerial view of luxury swimming pool surrounded by palm trees',
    description: 'Bird\'s eye view of luxury villa pool',
    photographer: 'Tomas Jasovsky',
    tags: ['pool', 'aerial', 'luxury', 'palm-trees', 'villa'],
  },
  {
    id: 'pool-terrace-1',
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
    alt: 'Palm trees reflected in calm blue swimming pool water on sunny day',
    description: 'Summer pool scene with terrace and loungers',
    photographer: 'Expect Best',
    tags: ['pool', 'palm-trees', 'terrace', 'summer', 'blue-sky'],
  },
  {
    id: 'villa-seaview-1',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    alt: 'Luxury villa with private pool overlooking the sea in Costa Blanca, Spain',
    description: 'Costa Blanca luxury property with pool and sea views',
    location: 'Costa Blanca, Spain',
    photographer: 'Ralph (Ravi) Kayden',
    tags: ['villa', 'pool', 'sea-view', 'spain', 'costa-blanca', 'luxury'],
  },
];

// ==========================================
// MARKETS & FOOD
// ==========================================

export const marketFoodImages: StockImage[] = [
  {
    id: 'market-fruit-1',
    url: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9',
    alt: 'Colorful display of fresh vegetables and fruits at Spanish market',
    description: 'Fresh produce at Mediterranean market stall',
    photographer: 'Peter Wendt',
    tags: ['market', 'fruits', 'vegetables', 'spain', 'fresh', 'colorful'],
  },
  {
    id: 'market-veg-1',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
    alt: 'Fresh vegetables and fruits on display at local market stall',
    description: 'Market stall with fresh Mediterranean produce',
    photographer: 'nrd',
    tags: ['market', 'vegetables', 'fruits', 'fresh', 'food'],
  },
  {
    id: 'market-spain-1',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    alt: 'Bustling Spanish food market with tapas and local delicacies',
    description: 'Traditional Spanish market atmosphere',
    photographer: 'Jay Wennington',
    tags: ['market', 'tapas', 'spain', 'food', 'restaurant'],
  },
  {
    id: 'paella-1',
    url: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a',
    alt: 'Traditional Spanish paella with seafood and rice',
    description: 'Authentic paella dish - classic Spanish cuisine',
    photographer: 'Mae Mu',
    tags: ['food', 'paella', 'spain', 'seafood', 'mediterranean'],
  },
];

// ==========================================
// OLD TOWNS & STREETS
// ==========================================

export const oldTownImages: StockImage[] = [
  {
    id: 'old-town-1',
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
    alt: 'Narrow cobblestone street between old stone buildings in historic Spanish town',
    description: 'Historic Spanish town street with white buildings',
    photographer: 'Marco Chilese',
    tags: ['old-town', 'cobblestone', 'historic', 'spain', 'architecture'],
  },
  {
    id: 'old-town-2',
    url: 'https://images.unsplash.com/photo-1509840841025-9088ba78a826',
    alt: 'Cobblestone street lined with shops and cafes in charming Mediterranean old town',
    description: 'Charming old town shopping street',
    photographer: 'David Bruyndonckx',
    tags: ['old-town', 'cobblestone', 'shops', 'street', 'mediterranean'],
  },
  {
    id: 'old-town-plaza-1',
    url: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325',
    alt: 'Traditional Spanish plaza with terracotta buildings and outdoor cafes',
    description: 'Spanish town plaza with outdoor dining',
    location: 'Spain',
    photographer: 'Willian Justen de Vasconcellos',
    tags: ['old-town', 'plaza', 'spain', 'cafes', 'terracotta'],
  },
  {
    id: 'white-village-1',
    url: 'https://images.unsplash.com/photo-1509806452196-a178a7fa5b74',
    alt: 'Traditional white Spanish village houses with terracotta roofs and narrow streets',
    description: 'Typical Andalusian white village architecture',
    photographer: 'Victoriano Izquierdo',
    tags: ['old-town', 'white-village', 'spain', 'andalusia', 'architecture'],
  },
];

// ==========================================
// MARINAS & BOATS
// ==========================================

export const marinaImages: StockImage[] = [
  {
    id: 'marina-1',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    alt: 'Boats moored in calm marina water on sunny Mediterranean day',
    description: 'Peaceful marina scene with moored yachts',
    photographer: 'Vidar Nordli-Mathisen',
    tags: ['marina', 'boats', 'harbor', 'calm', 'water', 'yacht'],
  },
  {
    id: 'marina-spain-1',
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    alt: 'Traditional colorful fishing boats in Mediterranean fishing village harbor',
    description: 'Traditional Mediterranean fishing port',
    photographer: 'James Coleman',
    tags: ['marina', 'fishing-boats', 'colorful', 'mediterranean', 'traditional'],
  },
  {
    id: 'marina-sunset-1',
    url: 'https://images.unsplash.com/photo-1514649923863-ceaf75b7ec00',
    alt: 'Marina at sunset with luxury yachts and golden reflections on water',
    description: 'Sunset over luxury marina with yachts',
    photographer: 'Alonso Reyes',
    tags: ['marina', 'sunset', 'yacht', 'luxury', 'golden-hour'],
  },
  {
    id: 'sailboat-1',
    url: 'https://images.unsplash.com/photo-1500514966906-fe245eea9344',
    alt: 'White sailboat on calm blue Mediterranean sea',
    description: 'Sailboat on the Mediterranean',
    photographer: 'Bobby Burch',
    tags: ['sailboat', 'sea', 'mediterranean', 'sailing', 'blue'],
  },
];

// ==========================================
// MEDITERRANEAN LIFESTYLE
// ==========================================

export const lifestyleImages: StockImage[] = [
  ...villaPoolImages.filter(img => img.tags.includes('luxury')),
  ...beachImages.filter(img => img.tags.includes('tropical')),
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get image URL with specified dimensions
 * @param image StockImage object
 * @param width Desired width in pixels (default 1200)
 * @param quality Image quality 1-100 (default 80)
 * @param fit Image fit mode: 'crop' | 'fill' | 'scale' (default 'crop')
 */
export function getImageUrl(
  image: StockImage,
  width: number = 1200,
  quality: number = 80,
  fit: 'crop' | 'fill' | 'scale' = 'crop'
): string {
  return `${image.url}?w=${width}&q=${quality}&fit=${fit}&auto=format`;
}

/**
 * Get responsive image srcSet
 */
export function getImageSrcSet(image: StockImage, widths: number[] = [640, 768, 1024, 1280, 1536]): string {
  return widths.map(w => `${image.url}?w=${w}&q=80&fit=crop&auto=format ${w}w`).join(', ');
}

/**
 * Get a random image from a category
 */
export function getRandomImage(images: StockImage[]): StockImage {
  return images[Math.floor(Math.random() * images.length)];
}

/**
 * Get images by tag
 */
export function getImagesByTag(images: StockImage[], tag: string): StockImage[] {
  return images.filter(img => img.tags.includes(tag));
}

/**
 * Get all images from a specific location
 */
export function getImagesByLocation(location: string): StockImage[] {
  const allImages = [
    ...beachImages,
    ...golfImages,
    ...villaPoolImages,
    ...marketFoodImages,
    ...oldTownImages,
    ...marinaImages,
  ];

  return allImages.filter(img =>
    img.location?.toLowerCase().includes(location.toLowerCase())
  );
}

// ==========================================
// AREA-SPECIFIC IMAGE MAPPING
// ==========================================

/**
 * Suggested images for specific areas
 * Use these as hero backgrounds or section images
 */
export const areaImageSuggestions: Record<string, { hero: StockImage; lifestyle: StockImage[] }> = {
  'algorfa': {
    hero: golfImages[0], // Golf course for La Finca
    lifestyle: [golfImages[2], villaPoolImages[5]],
  },
  'guardamar-del-segura': {
    hero: beachImages[0], // Beach scene
    lifestyle: [beachImages[4], marinaImages[1]],
  },
  'torrevieja': {
    hero: marinaImages[1], // Marina/port
    lifestyle: [beachImages[1], marketFoodImages[0]],
  },
  'orihuela-costa': {
    hero: beachImages[2], // Beach scene
    lifestyle: [villaPoolImages[0], golfImages[0]],
  },
  'la-zenia': {
    hero: beachImages[5], // Waves beach
    lifestyle: [villaPoolImages[2], beachImages[3]],
  },
  'villamartin': {
    hero: golfImages[3], // Golf sunset
    lifestyle: [villaPoolImages[4], oldTownImages[2]],
  },
};

// ==========================================
// CATEGORY IMAGES FOR SECTIONS
// ==========================================

/**
 * Default images for common section types
 */
export const sectionDefaults = {
  beach: beachImages[0],
  golf: golfImages[0],
  pool: villaPoolImages[0],
  market: marketFoodImages[0],
  oldTown: oldTownImages[0],
  marina: marinaImages[0],
  lifestyle: villaPoolImages[5], // The Guardamar villa
};
