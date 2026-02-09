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
    id: 'cala-capitan-beach',
    url: '/images/Drone 2/Beaches/Cala Capitan.jpg',
    alt: 'Cala Capitan beach aerial drone view Costa Blanca Spain',
    description: 'Beautiful aerial view of Cala Capitan beach',
    location: 'Cala Capitan, Costa Blanca',
    tags: ['beach', 'drone', 'aerial', 'turquoise', 'coastline'],
  },
  {
    id: 'la-mata-beach',
    url: '/images/Drone 2/Beaches/La Mata Beach.jpg',
    alt: 'La Mata beach aerial drone view Costa Blanca Spain',
    description: 'Stunning aerial view of La Mata beach',
    location: 'La Mata, Costa Blanca',
    tags: ['beach', 'drone', 'aerial', 'turquoise', 'white-sand'],
  },
  {
    id: 'la-zenia-beach',
    url: '/images/Drone 2/Beaches/La Zenia Beach.jpg',
    alt: 'La Zenia beach aerial drone view Costa Blanca Spain',
    description: 'Aerial view of the popular La Zenia beach',
    location: 'La Zenia, Costa Blanca',
    tags: ['beach', 'drone', 'aerial', 'turquoise', 'summer'],
  },
  {
    id: 'playa-cabo-roig',
    url: '/images/Drone 2/Beaches/Playa Cabo Roig.jpg',
    alt: 'Playa Cabo Roig beach aerial drone view Costa Blanca Spain',
    description: 'Scenic aerial view of Playa Cabo Roig',
    location: 'Playa Cabo Roig, Costa Blanca',
    tags: ['beach', 'drone', 'aerial', 'turquoise', 'peaceful'],
  },
  {
    id: 'playa-flamenca-beach',
    url: '/images/Drone 2/Beaches/Playa Flamenca Beach.jpg',
    alt: 'Playa Flamenca beach aerial drone view Costa Blanca Spain',
    description: 'Beautiful aerial view of Playa Flamenca',
    location: 'Playa Flamenca, Costa Blanca',
    tags: ['beach', 'drone', 'aerial', 'turquoise', 'white-sand'],
  },
  {
    id: 'playa-los-locos',
    url: '/images/Drone 2/Beaches/Playa Los Locos.jpg',
    alt: 'Playa Los Locos beach aerial drone view Costa Blanca Spain',
    description: 'Aerial view of the vibrant Playa Los Locos',
    location: 'Playa Los Locos, Costa Blanca',
    tags: ['beach', 'drone', 'aerial', 'turquoise', 'tropical'],
  },
  {
    id: 'playa-los-naufragos',
    url: '/images/Drone 2/Beaches/Playa Los Naufragos.jpg',
    alt: 'Playa Los Naufragos beach aerial drone view Costa Blanca Spain',
    description: 'Scenic aerial view of Playa Los Naufragos',
    location: 'Playa Los Naufragos, Costa Blanca',
    tags: ['beach', 'drone', 'aerial', 'turquoise', 'pristine'],
  },
  {
    id: 'playa-del-cura',
    url: '/images/Drone 2/Beaches/Playa del Cura.jpg',
    alt: 'Playa del Cura beach aerial drone view Costa Blanca Spain',
    description: 'Beautiful aerial view of Playa del Cura',
    location: 'Playa del Cura, Costa Blanca',
    tags: ['beach', 'drone', 'aerial', 'turquoise', 'waves'],
  },
  {
    id: 'punta-prima-beach',
    url: '/images/Drone 2/Beaches/Punta Prima beach.jpg',
    alt: 'Punta Prima beach aerial drone view Costa Blanca Spain',
    description: 'Stunning aerial view of Punta Prima beach',
    location: 'Punta Prima, Costa Blanca',
    tags: ['beach', 'drone', 'aerial', 'turquoise', 'shade'],
  },
];

// ==========================================
// GOLF COURSES
// ==========================================

export const golfImages: StockImage[] = [
  {
    id: 'campoamor-golf',
    url: '/images/Drone 2/Golf/Campoamor Golf (1).jpg',
    alt: 'Campoamor Golf course aerial drone view Costa Blanca Spain',
    description: 'Aerial view of Campoamor Golf course',
    location: 'Campoamor, Costa Blanca',
    tags: ['golf', 'drone', 'aerial', 'fairway', 'green'],
  },
  {
    id: 'villa-martin-golf',
    url: '/images/Drone 2/Golf/Villa Martin Golf.jpg',
    alt: 'Villa Martin Golf course aerial drone view Costa Blanca Spain',
    description: 'Scenic aerial view of Villa Martin Golf course',
    location: 'Villa Martin, Costa Blanca',
    tags: ['golf', 'drone', 'aerial', 'fairway', 'green'],
  },
  {
    id: 'golf-fairway-unsplash',
    url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b',
    alt: 'Golf course fairway Costa Blanca Spain sunny day green',
    description: 'Sunny day at the golf course with serene landscapes',
    tags: ['golf', 'fairway', 'sunny', 'blue-sky', 'green'],
  },
  {
    id: 'golf-swing-unsplash',
    url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa',
    alt: 'Golfer swing Costa Blanca Spain golf course property',
    description: 'Action shot of golfer on the course',
    tags: ['golf', 'golfer', 'swing', 'action', 'sunny'],
  },
  {
    id: 'golf-course-unsplash',
    url: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96',
    alt: 'Golf course fairway Costa Blanca Spain green property',
    description: 'Beautiful golf course fairway landscape',
    tags: ['golf', 'fairway', 'green', 'peaceful', 'landscape'],
  },
  {
    id: 'golf-sunset-unsplash',
    url: 'https://images.unsplash.com/photo-1624722610740-71fa0eb2cd5b',
    alt: 'Golf course at golden hour Costa Blanca Spain sunset',
    description: 'Golf course during golden hour with warm lighting',
    tags: ['golf', 'sunset', 'golden-hour', 'landscape', 'fairway'],
  },
];

// ==========================================
// VILLAS & POOLS
// ==========================================

export const villaPoolImages: StockImage[] = [
  {
    id: 'pool-palm-1',
    url: '/images/SPanish life/1.png',
    alt: 'Swimming pool palm trees new build villa Costa Blanca Spain for sale',
    description: 'Resort-style swimming pool with Mediterranean vibes',
    tags: ['pool', 'palm-trees', 'spain', 'resort', 'tropical', 'luxury'],
  },
  {
    id: 'pool-villa-1',
    url: '/images/SPanish life/2.png',
    alt: 'Modern villa pool Mediterranean Costa Blanca Spain new build property',
    description: 'Modern villa exterior with infinity pool',
    tags: ['pool', 'palm-trees', 'villa', 'modern', 'luxury'],
  },
  {
    id: 'pool-reflection-1',
    url: '/images/SPanish life/3.png',
    alt: 'Pool reflection palm trees villa Costa Blanca Spain new build houses',
    description: 'Palm tree reflections on pool surface',
    tags: ['pool', 'reflection', 'palm-trees', 'buildings', 'luxury'],
  },
  {
    id: 'pool-aerial-1',
    url: '/images/SPanish life/4.png',
    alt: 'Aerial pool luxury villa palm trees Costa Blanca Spain new build',
    description: 'Bird\'s eye view of luxury villa pool',
    tags: ['pool', 'aerial', 'luxury', 'palm-trees', 'villa'],
  },
  {
    id: 'pool-terrace-1',
    url: '/images/SPanish life/5.png',
    alt: 'Pool terrace palm trees Costa Blanca Spain new build villa property',
    description: 'Summer pool scene with terrace and loungers',
    tags: ['pool', 'palm-trees', 'terrace', 'summer', 'blue-sky', 'luxury'],
  },
  {
    id: 'villa-seaview-1',
    url: '/images/SPanish life/6.png',
    alt: 'Luxury villa pool sea view Costa Blanca Spain new build property for sale',
    description: 'Costa Blanca luxury property with pool and sea views',
    location: 'Costa Blanca, Spain',
    tags: ['villa', 'pool', 'sea-view', 'spain', 'costa-blanca', 'luxury'],
  },
];

// ==========================================
// MARKETS & FOOD
// ==========================================

export const marketFoodImages: StockImage[] = [
  {
    id: 'market-fruit-1',
    url: '/images/SPanish life/7.png',
    alt: 'Spanish market vegetables fruit Costa Blanca Mediterranean food local',
    description: 'Fresh produce at Mediterranean market stall',
    tags: ['market', 'fruits', 'vegetables', 'spain', 'fresh', 'colorful', 'lifestyle'],
  },
  {
    id: 'market-veg-1',
    url: '/images/SPanish life/8.png',
    alt: 'Fresh market vegetables Costa Blanca Spain Mediterranean produce local',
    description: 'Market stall with fresh Mediterranean produce',
    tags: ['market', 'vegetables', 'fruits', 'fresh', 'food', 'lifestyle'],
  },
  {
    id: 'market-spain-1',
    url: '/images/SPanish life/9.png',
    alt: 'Spanish market tapas Costa Blanca Mediterranean food local lifestyle',
    description: 'Traditional Spanish market atmosphere',
    tags: ['market', 'tapas', 'spain', 'food', 'restaurant', 'lifestyle'],
  },
  {
    id: 'paella-1',
    url: '/images/SPanish life/10.png',
    alt: 'Spanish paella seafood Costa Blanca Mediterranean cuisine traditional',
    description: 'Authentic paella dish - classic Spanish cuisine',
    tags: ['food', 'paella', 'spain', 'seafood', 'mediterranean', 'lifestyle'],
  },
];

// ==========================================
// OLD TOWNS & STREETS
// ==========================================

export const oldTownImages: StockImage[] = [
  {
    id: 'old-town-1',
    url: '/images/SPanish life/Polop.png',
    alt: 'Spanish town cobblestone street Costa Blanca traditional architecture old',
    description: 'Historic Spanish town street with white buildings',
    location: 'Polop, Costa Blanca',
    tags: ['old-town', 'cobblestone', 'historic', 'spain', 'architecture', 'village'],
  },
  {
    id: 'old-town-2',
    url: '/images/Area canvas/Benissa.png',
    alt: 'Old town cobblestone shops cafes Costa Blanca Spain Mediterranean street',
    description: 'Charming old town shopping street',
    location: 'Benissa, Costa Blanca',
    tags: ['old-town', 'cobblestone', 'shops', 'street', 'mediterranean', 'village'],
  },
  {
    id: 'old-town-plaza-1',
    url: '/images/Area canvas/Benitachell.png',
    alt: 'Spanish plaza terracotta buildings cafes Costa Blanca traditional town',
    description: 'Spanish town plaza with outdoor dining',
    location: 'Benitachell, Costa Blanca',
    tags: ['old-town', 'plaza', 'spain', 'cafes', 'mediterranean', 'village'],
  },
  {
    id: 'white-village-1',
    url: '/images/Area canvas/Polop.png',
    alt: 'White village Spain Costa Blanca traditional architecture old town',
    description: 'Typical Mediterranean white village architecture',
    location: 'Polop, Costa Blanca',
    tags: ['old-town', 'white-village', 'spain', 'mediterranean', 'architecture', 'village'],
  },
];

// ==========================================
// MARINAS & BOATS
// ==========================================

export const marinaImages: StockImage[] = [
  {
    id: 'marina-1',
    url: '/images/Drone 2/Beaches/Playa Los Locos.jpg',
    alt: 'Marina boats yachts Costa Blanca Spain Mediterranean harbor for sale',
    description: 'Peaceful marina scene with coastal waters',
    location: 'Costa Blanca, Spain',
    tags: ['marina', 'boats', 'harbor', 'calm', 'water', 'yacht', 'coastline'],
  },
  {
    id: 'marina-spain-1',
    url: '/images/Drone 2/Beaches/Playa Flamenca Beach.jpg',
    alt: 'Fishing village boats harbor Costa Blanca Spain Mediterranean traditional',
    description: 'Traditional Mediterranean fishing port',
    location: 'Playa Flamenca, Costa Blanca',
    tags: ['marina', 'fishing-boats', 'colorful', 'mediterranean', 'traditional', 'beach'],
  },
  {
    id: 'marina-sunset-1',
    url: '/images/Drone 2/Beaches/La Mata Beach.jpg',
    alt: 'Marina sunset luxury yachts Costa Blanca Spain Mediterranean property',
    description: 'Sunset over luxury marina with yachts',
    location: 'La Mata, Costa Blanca',
    tags: ['marina', 'sunset', 'yacht', 'luxury', 'golden-hour', 'beach'],
  },
  {
    id: 'sailboat-1',
    url: '/images/Drone 2/Beaches/Punta Prima beach.jpg',
    alt: 'Sailboat Mediterranean sea Costa Blanca Spain sailing yacht property',
    description: 'Sailboat on the Mediterranean',
    location: 'Punta Prima, Costa Blanca',
    tags: ['sailboat', 'sea', 'mediterranean', 'sailing', 'blue', 'beach'],
  },
];

// ==========================================
// MEDITERRANEAN LIFESTYLE
// ==========================================

export const lifestyleImages: StockImage[] = [
  {
    id: 'spanish-life-1',
    url: '/images/SPanish life/1-10.png',
    alt: 'Spanish Mediterranean lifestyle Costa Blanca Spain',
    description: 'Authentic Spanish Mediterranean lifestyle scene',
    tags: ['lifestyle', 'spain', 'mediterranean', 'culture'],
  },
  {
    id: 'spanish-life-polop',
    url: '/images/SPanish life/Polop.png',
    alt: 'Polop village lifestyle Spain Costa Blanca Mediterranean',
    description: 'Traditional Spanish village lifestyle in Polop',
    location: 'Polop, Costa Blanca',
    tags: ['lifestyle', 'spain', 'mediterranean', 'village'],
  },
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
    hero: golfImages[0], // Campoamor Golf
    lifestyle: [golfImages[1], villaPoolImages[5]],
  },
  'altea': {
    hero: {
      id: 'altea-area',
      url: '/images/Area canvas/altea.png',
      alt: 'Altea town Mediterranean Costa Blanca Spain',
      description: 'Beautiful aerial view of Altea town',
      location: 'Altea, Costa Blanca',
      tags: ['area', 'town', 'mediterranean'],
    },
    lifestyle: [lifestyleImages[0], lifestyleImages[1]],
  },
  'benidorm': {
    hero: {
      id: 'benidorm-area',
      url: '/images/Area canvas/Benidorm.png',
      alt: 'Benidorm town Mediterranean Costa Blanca Spain',
      description: 'Aerial view of Benidorm town',
      location: 'Benidorm, Costa Blanca',
      tags: ['area', 'town', 'mediterranean'],
    },
    lifestyle: [lifestyleImages[0], lifestyleImages[1]],
  },
  'benissa': {
    hero: {
      id: 'benissa-area',
      url: '/images/Area canvas/Benissa.png',
      alt: 'Benissa village Mediterranean Costa Blanca Spain',
      description: 'Scenic view of Benissa village',
      location: 'Benissa, Costa Blanca',
      tags: ['area', 'village', 'mediterranean'],
    },
    lifestyle: [lifestyleImages[1], lifestyleImages[0]],
  },
  'benitachell': {
    hero: {
      id: 'benitachell-area',
      url: '/images/Area canvas/Benitachell.png',
      alt: 'Benitachell village Mediterranean Costa Blanca Spain',
      description: 'Beautiful view of Benitachell',
      location: 'Benitachell, Costa Blanca',
      tags: ['area', 'village', 'mediterranean'],
    },
    lifestyle: [lifestyleImages[1], lifestyleImages[0]],
  },
  'calpe': {
    hero: {
      id: 'calpe-area',
      url: '/images/Area canvas/Calpe.png',
      alt: 'Calpe town Mediterranean Costa Blanca Spain',
      description: 'Scenic aerial view of Calpe',
      location: 'Calpe, Costa Blanca',
      tags: ['area', 'town', 'mediterranean'],
    },
    lifestyle: [beachImages[0], lifestyleImages[0]],
  },
  'denia': {
    hero: {
      id: 'denia-area',
      url: '/images/Area canvas/Denia.png',
      alt: 'Denia town Mediterranean Costa Blanca Spain',
      description: 'Beautiful view of Denia town',
      location: 'Denia, Costa Blanca',
      tags: ['area', 'town', 'mediterranean'],
    },
    lifestyle: [beachImages[1], lifestyleImages[0]],
  },
  'finestrat': {
    hero: {
      id: 'finestrat-area',
      url: '/images/Area canvas/Finestrat.png',
      alt: 'Finestrat village Mediterranean Costa Blanca Spain',
      description: 'Scenic view of Finestrat',
      location: 'Finestrat, Costa Blanca',
      tags: ['area', 'village', 'mediterranean'],
    },
    lifestyle: [lifestyleImages[0], lifestyleImages[1]],
  },
  'guardamar-del-segura': {
    hero: {
      id: 'guardamar-area',
      url: '/images/Area canvas/Guardamar.png',
      alt: 'Guardamar town Mediterranean Costa Blanca Spain',
      description: 'Aerial view of Guardamar',
      location: 'Guardamar, Costa Blanca',
      tags: ['area', 'town', 'mediterranean'],
    },
    lifestyle: [beachImages[1], marinaImages[1]],
  },
  'javea': {
    hero: {
      id: 'javea-area',
      url: '/images/Area canvas/Javea.png',
      alt: 'Javea town Mediterranean Costa Blanca Spain',
      description: 'Beautiful view of Javea',
      location: 'Javea, Costa Blanca',
      tags: ['area', 'town', 'mediterranean'],
    },
    lifestyle: [beachImages[2], lifestyleImages[0]],
  },
  'moraira': {
    hero: {
      id: 'moraira-area',
      url: '/images/Area canvas/Moraira.png',
      alt: 'Moraira village Mediterranean Costa Blanca Spain',
      description: 'Scenic view of Moraira',
      location: 'Moraira, Costa Blanca',
      tags: ['area', 'village', 'mediterranean'],
    },
    lifestyle: [beachImages[3], lifestyleImages[1]],
  },
  'polop': {
    hero: {
      id: 'polop-area',
      url: '/images/Area canvas/Polop.png',
      alt: 'Polop village Mediterranean Costa Blanca Spain',
      description: 'Traditional view of Polop village',
      location: 'Polop, Costa Blanca',
      tags: ['area', 'village', 'mediterranean'],
    },
    lifestyle: [lifestyleImages[1], oldTownImages[0]],
  },
  'san-miguel-de-salinas': {
    hero: {
      id: 'san-miguel-salinas-area',
      url: '/images/Area canvas/San miguel de salinas.png',
      alt: 'San Miguel de Salinas village Mediterranean Costa Blanca Spain',
      description: 'View of San Miguel de Salinas',
      location: 'San Miguel de Salinas, Costa Blanca',
      tags: ['area', 'village', 'mediterranean'],
    },
    lifestyle: [lifestyleImages[0], lifestyleImages[1]],
  },
  'torrevieja': {
    hero: beachImages[4], // La Zenia Beach (near Torrevieja)
    lifestyle: [beachImages[2], marketFoodImages[0]],
  },
  'orihuela-costa': {
    hero: beachImages[3], // Playa Cabo Roig
    lifestyle: [villaPoolImages[0], golfImages[0]],
  },
  'la-zenia': {
    hero: beachImages[2], // La Zenia Beach
    lifestyle: [villaPoolImages[2], beachImages[5]],
  },
  'villamartin': {
    hero: golfImages[0], // Campoamor Golf
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
