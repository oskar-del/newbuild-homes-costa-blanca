/**
 * Property Schema System
 *
 * Schema.org structured data for properties, developments, and blog posts.
 * This helps with SEO and rich search results.
 */

import { Development } from '@/lib/development-service';
import { getBeachTag, getGolfTag, getPriceBracket, Tag } from './property-tags';

// ==========================================
// SCHEMA.ORG TYPES
// ==========================================

export interface RealEstateListingSchema {
  '@context': 'https://schema.org';
  '@type': 'RealEstateListing';
  name: string;
  description: string;
  url: string;
  image: string[];
  datePosted?: string;
  validThrough?: string;

  // Price
  price?: number;
  priceCurrency: 'EUR';
  priceValidUntil?: string;

  // Location
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: 'ES';
  };

  // Geo
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };

  // Property details
  numberOfRooms?: number;
  numberOfBedrooms?: number;
  numberOfBathroomsTotal?: number;
  floorSize?: {
    '@type': 'QuantitativeValue';
    value: number;
    unitCode: 'MTK';  // Square meters
  };

  // Seller/Agent
  seller?: {
    '@type': 'RealEstateAgent' | 'Organization';
    name: string;
    url?: string;
  };
}

export interface ResidenceSchema {
  '@context': 'https://schema.org';
  '@type': 'Residence' | 'Apartment' | 'House' | 'SingleFamilyResidence';
  name: string;
  description: string;
  url: string;
  image: string[];

  // Location
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: 'ES';
  };

  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };

  // Property details
  numberOfRooms?: number;
  numberOfBedrooms?: number;
  floorSize?: {
    '@type': 'QuantitativeValue';
    value: number;
    unitCode: 'MTK';
  };

  // Amenities
  amenityFeature?: Array<{
    '@type': 'LocationFeatureSpecification';
    name: string;
    value: boolean;
  }>;
}

export interface BlogPostSchema {
  '@context': 'https://schema.org';
  '@type': 'BlogPosting';
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;

  author: {
    '@type': 'Organization' | 'Person';
    name: string;
    url?: string;
  };

  publisher: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };

  // Article details
  articleSection?: string;
  keywords?: string[];
  wordCount?: number;

  // Related properties
  about?: Array<{
    '@type': 'RealEstateListing';
    name: string;
    url: string;
  }>;
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

// ==========================================
// SCHEMA GENERATORS
// ==========================================

const BASE_URL = 'https://costablancaproperties.com';  // Update with actual domain

/**
 * Generate schema for a property/development listing
 */
export function generateDevelopmentSchema(
  development: Development,
  fullDescription?: string
): RealEstateListingSchema {
  const beachInfo = getBeachTag(development.zone);
  const golfInfo = getGolfTag(development.zone);

  let description = fullDescription || `${development.name} - New build development in ${development.town}`;

  // Enhance description with location info
  if (beachInfo.isBeach) {
    description += ` Near ${beachInfo.beach}.`;
  }
  if (golfInfo.isGolf) {
    description += ` Close to ${golfInfo.course}.`;
  }

  const schema: RealEstateListingSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: development.name,
    description,
    url: `${BASE_URL}/developments/${development.slug}`,
    image: development.images,
    priceCurrency: 'EUR',

    address: {
      '@type': 'PostalAddress',
      addressLocality: development.town,
      addressRegion: development.province,
      addressCountry: 'ES'
    }
  };

  // Add price range
  if (development.priceFrom > 0) {
    schema.price = development.priceFrom;
  }

  // Add bedroom range
  if (development.minBedrooms > 0) {
    schema.numberOfBedrooms = development.minBedrooms;
  }

  // Add seller info
  if (development.developer) {
    schema.seller = {
      '@type': 'Organization',
      name: development.developer,
      url: `${BASE_URL}/builders/${development.developerSlug}`
    };
  }

  return schema;
}

/**
 * Generate schema for a blog post
 */
export function generateBlogPostSchema(post: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  category?: string;
  keywords?: string[];
  relatedProperties?: Array<{ name: string; slug: string }>;
}): BlogPostSchema {
  const schema: BlogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${BASE_URL}/blog/${post.slug}`,
    image: post.image,
    datePublished: post.publishedAt,

    author: {
      '@type': 'Organization',
      name: post.author || 'Costa Blanca Properties',
      url: BASE_URL
    },

    publisher: {
      '@type': 'Organization',
      name: 'Costa Blanca Properties',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`
      }
    }
  };

  if (post.updatedAt) {
    schema.dateModified = post.updatedAt;
  }

  if (post.category) {
    schema.articleSection = post.category;
  }

  if (post.keywords?.length) {
    schema.keywords = post.keywords;
  }

  // Word count for SEO
  schema.wordCount = post.content.split(/\s+/).length;

  // Related properties
  if (post.relatedProperties?.length) {
    schema.about = post.relatedProperties.map(prop => ({
      '@type': 'RealEstateListing' as const,
      name: prop.name,
      url: `${BASE_URL}/developments/${prop.slug}`
    }));
  }

  return schema;
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
    }))
  };
}

/**
 * Generate FAQ schema for common property questions
 */
export function generatePropertyFAQSchema(development: Development): FAQSchema {
  const faqs = [
    {
      question: `What is the price range for ${development.name}?`,
      answer: `Properties in ${development.name} start from ${development.priceRange}. Contact us for current availability and pricing.`
    },
    {
      question: `Where is ${development.name} located?`,
      answer: `${development.name} is located in ${development.zone || development.town}, ${development.town}, in the ${development.region} region of Spain.`
    },
    {
      question: `What types of properties are available in ${development.name}?`,
      answer: `${development.name} offers ${development.propertyTypes.join(', ')} with ${development.bedroomRange} bedrooms.`
    },
    {
      question: `When will ${development.name} be ready?`,
      answer: development.deliveryQuarter
        ? `${development.name} is scheduled for completion in ${development.deliveryQuarter}.`
        : `${development.name} is currently ${development.status.replace('-', ' ')}.`
    }
  ];

  // Add beach/golf FAQs
  const beachInfo = getBeachTag(development.zone);
  if (beachInfo.isBeach) {
    faqs.push({
      question: `How close is ${development.name} to the beach?`,
      answer: `${development.name} is ${beachInfo.distance === 'beachfront' ? 'beachfront' : beachInfo.distance === 'walking' ? 'within walking distance of' : 'a short drive from'} ${beachInfo.beach}.`
    });
  }

  const golfInfo = getGolfTag(development.zone);
  if (golfInfo.isGolf) {
    faqs.push({
      question: `Is ${development.name} near a golf course?`,
      answer: `Yes, ${development.name} is ${golfInfo.distance === 'on-course' ? 'located on' : golfInfo.distance === 'walking' ? 'within walking distance of' : 'close to'} ${golfInfo.course}, an ${golfInfo.holes}-hole golf course.`
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// ==========================================
// BLOG INTEGRATION HELPERS
// ==========================================

/**
 * Suggested blog post topics based on tags
 */
export interface BlogTopicSuggestion {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  propertyFilter: {
    zone?: string[];
    priceMax?: number;
    priceMin?: number;
    propertyType?: string[];
    features?: string[];
  };
}

export const BLOG_TOPIC_SUGGESTIONS: BlogTopicSuggestion[] = [
  // Beach topics
  {
    title: 'Best Beach Properties in Costa Blanca',
    slug: 'best-beach-properties-costa-blanca',
    description: 'Discover the top new build properties near the beautiful Costa Blanca beaches',
    tags: ['beach-lover', 'costa-blanca-south'],
    propertyFilter: {
      zone: Object.keys(require('./property-tags').BEACH_ZONES)
    }
  },
  {
    title: 'Top 10 Beachfront Apartments in Torrevieja',
    slug: 'beachfront-apartments-torrevieja',
    description: 'The best new build apartments within walking distance of Torrevieja beaches',
    tags: ['beach-lover', 'apartment'],
    propertyFilter: {
      zone: ['playa del cura', 'la mata', 'playa los locos', 'acequion'],
      propertyType: ['apartment']
    }
  },
  {
    title: 'Orihuela Costa Beach Properties',
    slug: 'orihuela-costa-beach-properties',
    description: 'New builds near the stunning beaches of La Zenia, Cabo Roig and Playa Flamenca',
    tags: ['beach-lover', 'costa-blanca-south'],
    propertyFilter: {
      zone: ['la zenia', 'playa flamenca', 'cabo roig', 'campoamor', 'punta prima']
    }
  },

  // Golf topics
  {
    title: 'Best Golf Properties in Costa Blanca',
    slug: 'best-golf-properties-costa-blanca',
    description: 'Premium properties on and around the best golf courses in the region',
    tags: ['golf-enthusiast'],
    propertyFilter: {
      zone: Object.keys(require('./property-tags').GOLF_ZONES)
    }
  },
  {
    title: 'Vistabella Golf Properties',
    slug: 'vistabella-golf-properties',
    description: 'New build villas and apartments at Vistabella Golf Resort',
    tags: ['golf-enthusiast', 'villa'],
    propertyFilter: {
      zone: ['vistabella', 'vistabella golf']
    }
  },

  // Price topics
  {
    title: 'Best Budget New Builds Under €175,000',
    slug: 'budget-new-builds-under-175000',
    description: 'Affordable new build properties in Costa Blanca and Costa Calida',
    tags: ['first-time-buyer'],
    propertyFilter: {
      priceMax: 175000
    }
  },
  {
    title: 'Luxury Villas Over €500,000',
    slug: 'luxury-villas-costa-blanca',
    description: 'The most exclusive new build villas in the region',
    tags: ['luxury'],
    propertyFilter: {
      priceMin: 500000,
      propertyType: ['villa']
    }
  },

  // Property type topics
  {
    title: 'Best New Build Villas in Costa Blanca',
    slug: 'best-new-build-villas-costa-blanca',
    description: 'Stunning detached villas currently under construction',
    tags: ['villa'],
    propertyFilter: {
      propertyType: ['villa']
    }
  },
  {
    title: 'Modern Apartments in Torrevieja',
    slug: 'modern-apartments-torrevieja',
    description: 'Contemporary new build apartments in Torrevieja',
    tags: ['apartment', 'modern-design'],
    propertyFilter: {
      propertyType: ['apartment']
    }
  },

  // Location topics
  {
    title: 'New Builds in Mar Menor - Costa Calida',
    slug: 'new-builds-mar-menor-costa-calida',
    description: 'Properties near the warm waters of Mar Menor',
    tags: ['costa-calida', 'beach-lover'],
    propertyFilter: {
      zone: ['los narejos', 'lo serena golf', 'mar menor', 'los alcazares', 'santiago de la ribera']
    }
  },

  // ==========================================
  // SPECIFIC BEACH AREA TOPICS
  // ==========================================

  // La Zenia specific
  {
    title: 'La Zenia Beach Properties',
    slug: 'la-zenia-beach-properties',
    description: 'New builds near Cala Bosque and La Zenia beach in Orihuela Costa',
    tags: ['beach-lover', 'costa-blanca-south'],
    propertyFilter: {
      zone: ['la zenia']
    }
  },

  // Playa Flamenca specific
  {
    title: 'Playa Flamenca Properties',
    slug: 'playa-flamenca-properties',
    description: 'New build homes near the Blue Flag Playa Flamenca beach',
    tags: ['beach-lover', 'costa-blanca-south'],
    propertyFilter: {
      zone: ['playa flamenca', 'aguamarina']
    }
  },

  // Cabo Roig specific
  {
    title: 'Cabo Roig & Cala Capitán Properties',
    slug: 'cabo-roig-properties',
    description: 'Properties near the beautiful Cala Capitán cove beach',
    tags: ['beach-lover', 'costa-blanca-south'],
    propertyFilter: {
      zone: ['cabo roig']
    }
  },

  // Playa del Cura specific
  {
    title: 'Playa del Cura Properties - Torrevieja',
    slug: 'playa-del-cura-torrevieja-properties',
    description: 'New builds walking distance to Playa del Cura in central Torrevieja',
    tags: ['beach-lover', 'apartment'],
    propertyFilter: {
      zone: ['playa de el cura', 'playa del cura', 'playa el cura']
    }
  },

  // La Mata specific
  {
    title: 'La Mata Beach Properties',
    slug: 'la-mata-beach-properties',
    description: 'Properties near the 2km long La Mata beach with natural dunes',
    tags: ['beach-lover', 'costa-blanca-south'],
    propertyFilter: {
      zone: ['la mata']
    }
  },

  // Mil Palmeras specific
  {
    title: 'Mil Palmeras Beach Properties',
    slug: 'mil-palmeras-beach-properties',
    description: 'Tranquil beach living at Mil Palmeras, Pilar de la Horadada',
    tags: ['beach-lover', 'costa-blanca-south'],
    propertyFilter: {
      zone: ['mil palmeras']
    }
  },

  // Campoamor specific
  {
    title: 'Campoamor Beach & Golf Properties',
    slug: 'campoamor-beach-golf-properties',
    description: 'The best of both worlds - beach and golf at Dehesa de Campoamor',
    tags: ['beach-lover', 'golf-enthusiast'],
    propertyFilter: {
      zone: ['campoamor', 'dehesa de campoamor']
    }
  },

  // Punta Prima specific
  {
    title: 'Punta Prima Beach Properties',
    slug: 'punta-prima-beach-properties',
    description: 'Properties near the popular Punta Prima beach',
    tags: ['beach-lover', 'costa-blanca-south'],
    propertyFilter: {
      zone: ['punta prima']
    }
  },

  // ==========================================
  // SPECIFIC GOLF COURSE TOPICS
  // ==========================================

  // La Finca Golf
  {
    title: 'La Finca Golf Properties',
    slug: 'la-finca-golf-properties',
    description: 'New build villas at the prestigious La Finca Golf Resort',
    tags: ['golf-enthusiast', 'villa'],
    propertyFilter: {
      zone: ['la finca', 'la finca golf']
    }
  },

  // Lo Romero Golf
  {
    title: 'Lo Romero Golf Properties',
    slug: 'lo-romero-golf-properties',
    description: 'Properties at Lo Romero Golf, Pilar de la Horadada',
    tags: ['golf-enthusiast', 'villa'],
    propertyFilter: {
      zone: ['lo romero', 'lo romero golf']
    }
  },

  // Las Colinas Golf
  {
    title: 'Las Colinas Golf Properties',
    slug: 'las-colinas-golf-properties',
    description: 'Exclusive properties at the award-winning Las Colinas Golf',
    tags: ['golf-enthusiast', 'luxury'],
    propertyFilter: {
      zone: ['las colinas', 'las colinas golf']
    }
  },

  // Villamartín Golf
  {
    title: 'Villamartín Golf Properties',
    slug: 'villamartin-golf-properties',
    description: 'Properties near the established Villamartín Golf course',
    tags: ['golf-enthusiast', 'costa-blanca-south'],
    propertyFilter: {
      zone: ['villamartin']
    }
  },

  // Mar Menor Golf
  {
    title: 'Mar Menor Golf Resort Properties',
    slug: 'mar-menor-golf-resort-properties',
    description: 'Properties at Mar Menor Golf Resort, Costa Calida',
    tags: ['golf-enthusiast', 'costa-calida'],
    propertyFilter: {
      zone: ['mar menor golf', 'serena golf', 'lo serena']
    }
  },

  // ==========================================
  // SPECIFIC TOWN TOPICS
  // ==========================================

  // Torrevieja
  {
    title: 'New Build Properties in Torrevieja',
    slug: 'new-build-properties-torrevieja',
    description: 'Complete guide to new builds in Torrevieja - beaches, prices, areas',
    tags: ['costa-blanca-south'],
    propertyFilter: {
      zone: ['playa del cura', 'la mata', 'los balcones', 'aguas nuevas', 'la siesta', 'acequion']
    }
  },

  // Orihuela Costa
  {
    title: 'New Build Properties in Orihuela Costa',
    slug: 'new-build-properties-orihuela-costa',
    description: 'All new builds in Orihuela Costa - from La Zenia to Campoamor',
    tags: ['costa-blanca-south'],
    propertyFilter: {
      zone: ['la zenia', 'playa flamenca', 'cabo roig', 'campoamor', 'villamartin', 'punta prima', 'las filipinas']
    }
  },

  // Pilar de la Horadada
  {
    title: 'New Build Properties in Pilar de la Horadada',
    slug: 'new-build-properties-pilar-horadada',
    description: 'New builds in Pilar de la Horadada - Mil Palmeras to Torre de la Horadada',
    tags: ['costa-blanca-south', 'beach-lover'],
    propertyFilter: {
      zone: ['mil palmeras', 'torre de la horadada', 'el mojon', 'lo romero golf']
    }
  },

  // Guardamar del Segura
  {
    title: 'New Build Properties in Guardamar del Segura',
    slug: 'new-build-properties-guardamar',
    description: 'Properties near the beautiful beaches and dunes of Guardamar',
    tags: ['beach-lover', 'costa-blanca-south'],
    propertyFilter: {
      zone: ['el raso', 'guardamar']
    }
  },

  // Los Alcázares
  {
    title: 'New Build Properties in Los Alcázares',
    slug: 'new-build-properties-los-alcazares',
    description: 'Mar Menor properties in Los Alcázares - warm waters year-round',
    tags: ['beach-lover', 'costa-calida'],
    propertyFilter: {
      zone: ['los narejos', 'lo serena golf', 'los alcazares']
    }
  },

  // ==========================================
  // PRICE RANGE TOPICS
  // ==========================================

  {
    title: 'New Builds Under €200,000 Costa Blanca',
    slug: 'new-builds-under-200000',
    description: 'Affordable new build apartments and bungalows under €200k',
    tags: ['first-time-buyer'],
    propertyFilter: {
      priceMax: 200000
    }
  },
  {
    title: 'Properties Between €200k-€300k',
    slug: 'properties-200k-300k-costa-blanca',
    description: 'Quality new builds in the sweet spot - €200,000 to €300,000',
    tags: ['apartment', 'townhouse'],
    propertyFilter: {
      priceMin: 200000,
      priceMax: 300000
    }
  },
  {
    title: 'Properties Between €300k-€500k',
    slug: 'properties-300k-500k-costa-blanca',
    description: 'Premium properties from €300,000 to €500,000',
    tags: ['villa', 'townhouse'],
    propertyFilter: {
      priceMin: 300000,
      priceMax: 500000
    }
  },
  {
    title: 'Luxury Properties Over €750,000',
    slug: 'luxury-properties-over-750k',
    description: 'The most exclusive new builds - €750,000 and above',
    tags: ['luxury', 'villa'],
    propertyFilter: {
      priceMin: 750000
    }
  },

  // ==========================================
  // LIFESTYLE TOPICS
  // ==========================================

  {
    title: 'Best Properties for Families',
    slug: 'best-properties-families-costa-blanca',
    description: 'Spacious family homes with pools and gardens',
    tags: ['family-home'],
    propertyFilter: {
      features: ['private-pool', 'garden']
    }
  },
  {
    title: 'Retirement Properties in Spain',
    slug: 'retirement-properties-spain',
    description: 'Perfect properties for your retirement in the sun',
    tags: ['retirement'],
    propertyFilter: {}
  },
  {
    title: 'Best Investment Properties',
    slug: 'best-investment-properties-spain',
    description: 'Properties with strong rental potential',
    tags: ['investment'],
    propertyFilter: {}
  },
  {
    title: 'Holiday Home Properties Costa Blanca',
    slug: 'holiday-home-properties-costa-blanca',
    description: 'Perfect lock-up-and-leave properties for holiday use',
    tags: ['holiday-home'],
    propertyFilter: {}
  },

  // ==========================================
  // PROPERTY TYPE TOPICS
  // ==========================================

  {
    title: 'New Build Penthouses Costa Blanca',
    slug: 'new-build-penthouses-costa-blanca',
    description: 'Top floor living with amazing views and roof terraces',
    tags: ['penthouse', 'sea-view'],
    propertyFilter: {
      propertyType: ['penthouse']
    }
  },
  {
    title: 'New Build Bungalows Costa Blanca',
    slug: 'new-build-bungalows-costa-blanca',
    description: 'Single-level living - perfect for accessibility',
    tags: ['bungalow', 'retirement'],
    propertyFilter: {
      propertyType: ['bungalow']
    }
  },
  {
    title: 'New Build Townhouses Costa Blanca',
    slug: 'new-build-townhouses-costa-blanca',
    description: 'Modern townhouses with private gardens and pools',
    tags: ['townhouse', 'family-home'],
    propertyFilter: {
      propertyType: ['townhouse']
    }
  },

  // ==========================================
  // FEATURE-BASED TOPICS
  // ==========================================

  {
    title: 'Properties with Private Pool',
    slug: 'properties-with-private-pool',
    description: 'New builds with your own private swimming pool',
    tags: ['private-pool', 'villa'],
    propertyFilter: {
      features: ['private-pool']
    }
  },
  {
    title: 'Sea View Properties Costa Blanca',
    slug: 'sea-view-properties-costa-blanca',
    description: 'Wake up to Mediterranean views every morning',
    tags: ['sea-view', 'beach-lover'],
    propertyFilter: {
      features: ['sea-view']
    }
  },

  // Seasonal / Key-ready
  {
    title: 'Key-Ready Properties - Move In Now',
    slug: 'key-ready-properties-costa-blanca',
    description: 'New build properties ready for immediate occupation',
    tags: ['key-ready'],
    propertyFilter: {
      features: ['key-ready']
    }
  }
];

/**
 * Get blog topics for a specific tag
 */
export function getBlogTopicsForTag(tagId: string): BlogTopicSuggestion[] {
  return BLOG_TOPIC_SUGGESTIONS.filter(topic =>
    topic.tags.includes(tagId)
  );
}

/**
 * Get all unique tags used in blog topics
 */
export function getBlogTopicTags(): string[] {
  const tags = new Set<string>();
  BLOG_TOPIC_SUGGESTIONS.forEach(topic => {
    topic.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
}
