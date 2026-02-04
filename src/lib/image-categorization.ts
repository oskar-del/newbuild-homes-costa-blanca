/**
 * Image Categorization System
 *
 * Categorizes property images for:
 * 1. Intelligent placement (community vs property shots)
 * 2. SEO alt tag generation
 *
 * Categories:
 * - exterior: Building exterior, development facade
 * - pool: Communal or private pool
 * - garden: Gardens, landscaping, outdoor areas
 * - aerial: Drone/aerial shots
 * - interior-living: Living room, lounge
 * - interior-kitchen: Kitchen
 * - interior-bedroom: Bedroom
 * - interior-bathroom: Bathroom
 * - terrace: Terrace, balcony, outdoor private space
 * - view: Sea view, golf view, mountain view
 */

export type ImageCategory =
  | 'exterior'
  | 'pool'
  | 'garden'
  | 'aerial'
  | 'interior-living'
  | 'interior-kitchen'
  | 'interior-bedroom'
  | 'interior-bathroom'
  | 'terrace'
  | 'view'
  | 'unknown';

export interface CategorizedImage {
  url: string;
  category: ImageCategory;
  altTag: string;
  isPrimary?: boolean; // Is this the best "community" shot
  isSecondary?: boolean; // Is this a good "property" shot
}

// Priority order for main/community image
const COMMUNITY_IMAGE_PRIORITY: ImageCategory[] = [
  'aerial',
  'exterior',
  'pool',
  'garden',
];

// Priority order for property/interior images
const PROPERTY_IMAGE_PRIORITY: ImageCategory[] = [
  'interior-living',
  'terrace',
  'view',
  'interior-kitchen',
  'interior-bedroom',
  'interior-bathroom',
];

/**
 * Simple keyword-based categorization
 * This can be enhanced with AI vision API later
 */
export function categorizeImageByUrl(url: string): ImageCategory {
  const urlLower = url.toLowerCase();

  // Check URL for hints (many feeds include descriptive filenames)
  if (urlLower.includes('aerial') || urlLower.includes('drone')) return 'aerial';
  if (urlLower.includes('exterior') || urlLower.includes('facade') || urlLower.includes('building')) return 'exterior';
  if (urlLower.includes('pool') || urlLower.includes('piscina')) return 'pool';
  if (urlLower.includes('garden') || urlLower.includes('jardin') || urlLower.includes('outdoor')) return 'garden';
  if (urlLower.includes('living') || urlLower.includes('salon') || urlLower.includes('lounge')) return 'interior-living';
  if (urlLower.includes('kitchen') || urlLower.includes('cocina')) return 'interior-kitchen';
  if (urlLower.includes('bedroom') || urlLower.includes('dormitorio') || urlLower.includes('habitacion')) return 'interior-bedroom';
  if (urlLower.includes('bathroom') || urlLower.includes('bano') || urlLower.includes('bath')) return 'interior-bathroom';
  if (urlLower.includes('terrace') || urlLower.includes('terraza') || urlLower.includes('balcon')) return 'terrace';
  if (urlLower.includes('view') || urlLower.includes('vista') || urlLower.includes('sea') || urlLower.includes('golf')) return 'view';

  return 'unknown';
}

/**
 * Generate SEO-friendly alt tag based on category and context
 */
export function generateAltTag(
  category: ImageCategory,
  developmentName: string,
  town: string,
  propertyType?: string
): string {
  const location = `${developmentName} in ${town}`;

  switch (category) {
    case 'aerial':
      return `Aerial view of ${location} new build development`;
    case 'exterior':
      return `${location} - modern new build exterior`;
    case 'pool':
      return `Communal swimming pool at ${location}`;
    case 'garden':
      return `Landscaped gardens at ${location}`;
    case 'interior-living':
      return `Spacious living area in ${propertyType || 'property'} at ${location}`;
    case 'interior-kitchen':
      return `Modern fitted kitchen at ${location}`;
    case 'interior-bedroom':
      return `Bedroom in ${propertyType || 'property'} at ${location}`;
    case 'interior-bathroom':
      return `Contemporary bathroom at ${location}`;
    case 'terrace':
      return `Private terrace at ${location}`;
    case 'view':
      return `Stunning views from ${location}`;
    default:
      return `${location} - new build ${propertyType || 'property'} in Spain`;
  }
}

/**
 * Categorize all images and sort for optimal display
 */
export function categorizeAndSortImages(
  imageUrls: string[],
  developmentName: string,
  town: string,
  propertyType?: string
): {
  communityImages: CategorizedImage[];
  propertyImages: CategorizedImage[];
  allImages: CategorizedImage[];
  mainImage: CategorizedImage | null;
  secondaryImages: CategorizedImage[];
} {
  // Categorize all images
  const categorized: CategorizedImage[] = imageUrls.map(url => {
    const category = categorizeImageByUrl(url);
    return {
      url,
      category,
      altTag: generateAltTag(category, developmentName, town, propertyType),
    };
  });

  // Separate into community vs property images
  const communityImages = categorized.filter(img =>
    COMMUNITY_IMAGE_PRIORITY.includes(img.category)
  );

  const propertyImages = categorized.filter(img =>
    PROPERTY_IMAGE_PRIORITY.includes(img.category)
  );

  const unknownImages = categorized.filter(img => img.category === 'unknown');

  // Sort by priority
  communityImages.sort((a, b) =>
    COMMUNITY_IMAGE_PRIORITY.indexOf(a.category) - COMMUNITY_IMAGE_PRIORITY.indexOf(b.category)
  );

  propertyImages.sort((a, b) =>
    PROPERTY_IMAGE_PRIORITY.indexOf(a.category) - PROPERTY_IMAGE_PRIORITY.indexOf(b.category)
  );

  // Pick best main image (community shot) - fallback to first image if no community shots
  const mainImage = communityImages[0] || unknownImages[0] || categorized[0] || null;
  if (mainImage) mainImage.isPrimary = true;

  // Pick best secondary images (property shots) - fallback to remaining images
  const secondaryImages = propertyImages.length >= 2
    ? propertyImages.slice(0, 2)
    : [...propertyImages, ...unknownImages.slice(0, 2 - propertyImages.length)].slice(0, 2);

  secondaryImages.forEach(img => { img.isSecondary = true; });

  return {
    communityImages,
    propertyImages,
    allImages: categorized,
    mainImage,
    secondaryImages,
  };
}

/**
 * Quick helper for development cards
 * Returns main image URL and two secondary image URLs
 */
export function getCardImages(
  imageUrls: string[],
  developmentName: string,
  town: string
): {
  main: { url: string; alt: string };
  secondary: { url: string; alt: string }[];
} {
  if (!imageUrls || imageUrls.length === 0) {
    const defaultAlt = `${developmentName} in ${town} - new build development`;
    return {
      main: { url: '/images/placeholder-development.svg', alt: defaultAlt },
      secondary: [],
    };
  }

  const { mainImage, secondaryImages } = categorizeAndSortImages(
    imageUrls,
    developmentName,
    town
  );

  return {
    main: mainImage
      ? { url: mainImage.url, alt: mainImage.altTag }
      : { url: imageUrls[0], alt: `${developmentName} in ${town}` },
    secondary: secondaryImages.map(img => ({
      url: img.url,
      alt: img.altTag,
    })),
  };
}
