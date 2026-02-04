// Schema.org structured data generators

export function toJsonLd(schema: object): string {
  return JSON.stringify(schema);
}

export function organizationSchema(custom?: {
  name?: string;
  description?: string;
  url?: string;
}) {
  // If custom values provided, return a simpler schema for the custom org
  if (custom && custom.name !== "New Build Homes Costa Blanca") {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": custom.name,
      "description": custom.description,
      "url": custom.url,
    };
  }

  // Default: return the full agency schema
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "New Build Homes Costa Blanca",
    "url": "https://newbuildhomescostablanca.com",
    "telephone": "+34634044970",
    "email": "oskar@hanssonhertzell.com",
    "description": "Specialist new build property agency in Costa Blanca, Spain. Helping international buyers find their perfect home.",
    "priceRange": "€€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Canonigo Torres 8",
      "addressLocality": "Torrevieja",
      "addressRegion": "Alicante",
      "postalCode": "03181",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.9786",
      "longitude": "-0.6823"
    },
    "areaServed": [
      {
        "@type": "Place",
        "name": "Costa Blanca"
      },
      {
        "@type": "Place",
        "name": "Jávea"
      },
      {
        "@type": "Place",
        "name": "Moraira"
      },
      {
        "@type": "Place",
        "name": "Torrevieja"
      },
      {
        "@type": "Place",
        "name": "Orihuela Costa"
      },
      {
        "@type": "Place",
        "name": "Alicante"
      }
    ],
    "parentOrganization": {
      "@type": "RealEstateAgent",
      "name": "Hansson & Hertzell",
      "url": "https://hanssonhertzell.se",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Canonigo Torres 8",
        "addressLocality": "Torrevieja",
        "addressRegion": "Alicante",
        "postalCode": "03181",
        "addressCountry": "ES"
      }
    },
    "sameAs": [
      "https://hanssonhertzell.se"
    ]
  };
}

export function productSchema(property: {
  name: string;
  description: string;
  price: number | null;
  images: string[];
  url: string;
  address: { town: string; region?: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": property.name,
    "description": property.description,
    "image": property.images,
    "url": property.url,
    "offers": property.price ? {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    } : undefined,
    "brand": {
      "@type": "Organization",
      "name": "New Build Homes Costa Blanca"
    }
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function areaSchema(area: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": area.name,
    "description": area.description,
    "url": area.url,
    "containedInPlace": {
      "@type": "Place",
      "name": "Costa Blanca, Spain"
    }
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "New Build Homes Costa Blanca",
    "url": "https://newbuildhomescostablanca.com",
    "description": "Find new build properties in Costa Blanca, Spain. Apartments, villas and townhouses from trusted developers.",
    "publisher": {
      "@type": "Organization",
      "name": "New Build Homes Costa Blanca"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://newbuildhomescostablanca.com/developments?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

export function realEstateListingSchema(property: {
  name: string;
  description: string;
  price: number | null;
  images: string[];
  url: string;
  bedrooms?: number;
  bathrooms?: number;
  floorSize?: number;
  address: { town: string; region?: string };
  propertyType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.name,
    "description": property.description,
    "image": property.images,
    "url": property.url,
    "datePosted": new Date().toISOString().split('T')[0],
    "offers": property.price ? {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    } : undefined,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.address.town,
      "addressRegion": property.address.region || "Alicante",
      "addressCountry": "ES"
    },
    "numberOfBedrooms": property.bedrooms,
    "numberOfBathroomsTotal": property.bathrooms,
    "floorSize": property.floorSize ? {
      "@type": "QuantitativeValue",
      "value": property.floorSize,
      "unitCode": "MTK"
    } : undefined
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "New Build Homes Costa Blanca",
    "image": "https://newbuildhomescostablanca.com/logo.png",
    "@id": "https://newbuildhomescostablanca.com",
    "url": "https://newbuildhomescostablanca.com",
    "telephone": "+34634044970",
    "priceRange": "€€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Canonigo Torres 8",
      "addressLocality": "Torrevieja",
      "addressRegion": "Alicante",
      "postalCode": "03181",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.9786,
      "longitude": -0.6823
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ]
  };
}

export function articleSchema(article: {
  headline: string;
  description: string;
  datePublished: string;
  author: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "datePublished": article.datePublished,
    "dateModified": article.datePublished,
    "author": {
      "@type": "Organization",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "New Build Homes Costa Blanca",
      "url": "https://newbuildhomescostablanca.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    },
    "image": article.image
  };
}

// ==========================================
// BEACH & LOCATION SCHEMAS
// ==========================================

export function beachSchema(beach: {
  name: string;
  description: string;
  town: string;
  region: string;
  url: string;
  image?: string;
  geo?: { lat: number; lng: number };
  amenities?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Beach",
    "name": beach.name,
    "description": beach.description,
    "url": beach.url,
    "image": beach.image,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": beach.town,
      "addressRegion": beach.region,
      "addressCountry": "ES"
    },
    "geo": beach.geo ? {
      "@type": "GeoCoordinates",
      "latitude": beach.geo.lat,
      "longitude": beach.geo.lng
    } : undefined,
    "amenityFeature": beach.amenities?.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity,
      "value": true
    })),
    "containedInPlace": {
      "@type": "Place",
      "name": `${beach.town}, Costa Blanca, Spain`
    }
  };
}

export function touristDestinationSchema(destination: {
  name: string;
  description: string;
  url: string;
  image?: string;
  attractions?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": destination.name,
    "description": destination.description,
    "url": destination.url,
    "image": destination.image,
    "touristType": ["Beach Holiday", "Golf Holiday", "Property Buyer", "Retiree"],
    "includesAttraction": destination.attractions?.map(attr => ({
      "@type": "TouristAttraction",
      "name": attr
    }))
  };
}

export function golfCourseSchema(course: {
  name: string;
  description: string;
  town: string;
  holes: number;
  url: string;
  image?: string;
  geo?: { lat: number; lng: number };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "GolfCourse",
    "name": course.name,
    "description": course.description,
    "url": course.url,
    "image": course.image,
    "numberOfHoles": course.holes,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": course.town,
      "addressRegion": "Alicante",
      "addressCountry": "ES"
    },
    "geo": course.geo ? {
      "@type": "GeoCoordinates",
      "latitude": course.geo.lat,
      "longitude": course.geo.lng
    } : undefined
  };
}

// ==========================================
// COLLECTION/LIST SCHEMAS
// ==========================================

export function itemListSchema(items: {
  name: string;
  url: string;
  image?: string;
  position: number;
}[], listName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": listName,
    "numberOfItems": items.length,
    "itemListElement": items.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "url": item.url,
      "image": item.image
    }))
  };
}

export function collectionPageSchema(collection: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string; price?: number }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": collection.name,
    "description": collection.description,
    "url": collection.url,
    "numberOfItems": collection.items.length,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": collection.items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "RealEstateListing",
          "name": item.name,
          "url": item.url,
          "offers": item.price ? {
            "@type": "Offer",
            "price": item.price,
            "priceCurrency": "EUR"
          } : undefined
        }
      }))
    }
  };
}

// ==========================================
// ENHANCED PROPERTY SCHEMAS
// ==========================================

export function residenceSchema(property: {
  name: string;
  description: string;
  url: string;
  images: string[];
  price?: number;
  propertyType: 'Apartment' | 'Villa' | 'Townhouse' | 'Bungalow' | 'Penthouse';
  bedrooms?: number;
  bathrooms?: number;
  floorSize?: number;
  yearBuilt?: number;
  address: {
    town: string;
    zone?: string;
    region?: string;
  };
  geo?: { lat: number; lng: number };
  amenities?: string[];
  nearbyBeach?: { name: string; distance: string };
  nearbyGolf?: { name: string; distance: string };
}) {
  // Map property type to schema type
  const typeMap: Record<string, string> = {
    'Apartment': 'Apartment',
    'Villa': 'SingleFamilyResidence',
    'Townhouse': 'House',
    'Bungalow': 'House',
    'Penthouse': 'Apartment'
  };

  return {
    "@context": "https://schema.org",
    "@type": typeMap[property.propertyType] || "Residence",
    "name": property.name,
    "description": property.description,
    "url": property.url,
    "image": property.images,
    "numberOfRooms": property.bedrooms ? property.bedrooms + 1 : undefined,
    "numberOfBedrooms": property.bedrooms,
    "numberOfBathroomsTotal": property.bathrooms,
    "floorSize": property.floorSize ? {
      "@type": "QuantitativeValue",
      "value": property.floorSize,
      "unitCode": "MTK"
    } : undefined,
    "yearBuilt": property.yearBuilt,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.address.town,
      "addressRegion": property.address.region || "Alicante",
      "addressCountry": "ES"
    },
    "geo": property.geo ? {
      "@type": "GeoCoordinates",
      "latitude": property.geo.lat,
      "longitude": property.geo.lng
    } : undefined,
    "amenityFeature": property.amenities?.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity,
      "value": true
    })),
    "additionalProperty": [
      property.nearbyBeach ? {
        "@type": "PropertyValue",
        "name": "Nearest Beach",
        "value": `${property.nearbyBeach.name} (${property.nearbyBeach.distance})`
      } : null,
      property.nearbyGolf ? {
        "@type": "PropertyValue",
        "name": "Nearest Golf Course",
        "value": `${property.nearbyGolf.name} (${property.nearbyGolf.distance})`
      } : null,
      property.address.zone ? {
        "@type": "PropertyValue",
        "name": "Zone/Area",
        "value": property.address.zone
      } : null
    ].filter(Boolean)
  };
}

// ==========================================
// SPEAKABLE SCHEMA (for voice search/AI)
// ==========================================

export function speakableSchema(page: {
  url: string;
  headline: string;
  summary: string;
  cssSelectors?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": page.url,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": page.cssSelectors || [".property-summary", ".price-info", ".location-info"]
    },
    "headline": page.headline,
    "description": page.summary
  };
}

// ==========================================
// IMAGE SCHEMA WITH DETAILED ALT
// ==========================================

export function imageObjectSchema(image: {
  url: string;
  alt: string;
  caption: string;
  propertyName?: string;
  developer?: string;
  location?: string;
  deliveryDate?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": image.url,
    "name": image.alt,
    "caption": image.caption,
    "description": [
      image.propertyName,
      image.developer ? `by ${image.developer}` : null,
      image.location ? `in ${image.location}` : null,
      image.deliveryDate ? `Ready ${image.deliveryDate}` : null
    ].filter(Boolean).join(' - ')
  };
}

// ==========================================
// ALT TAG GENERATOR
// ==========================================

export function generatePropertyAltTag(property: {
  name: string;
  developer?: string;
  town: string;
  zone?: string;
  propertyType?: string;
  bedrooms?: number;
  deliveryDate?: string;
  imageIndex?: number;
  imageType?: 'exterior' | 'interior' | 'pool' | 'terrace' | 'kitchen' | 'bedroom' | 'bathroom' | 'view' | 'building';
}): string {
  const parts: string[] = [];

  // Image type descriptor
  if (property.imageType) {
    const typeMap: Record<string, string> = {
      'exterior': 'Exterior view of',
      'interior': 'Interior of',
      'pool': 'Swimming pool at',
      'terrace': 'Terrace at',
      'kitchen': 'Modern kitchen in',
      'bedroom': 'Bedroom in',
      'bathroom': 'Bathroom in',
      'view': 'Views from',
      'building': 'Building facade of'
    };
    parts.push(typeMap[property.imageType] || '');
  }

  // Property name and type
  if (property.propertyType) {
    parts.push(`${property.propertyType.toLowerCase()}`);
  }
  parts.push(property.name);

  // Developer
  if (property.developer) {
    parts.push(`by ${property.developer}`);
  }

  // Location
  const location = property.zone ? `${property.zone}, ${property.town}` : property.town;
  parts.push(`in ${location}`);

  // Bedrooms
  if (property.bedrooms) {
    parts.push(`- ${property.bedrooms} bedroom`);
  }

  // Delivery
  if (property.deliveryDate) {
    parts.push(`- Ready ${property.deliveryDate}`);
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

export function generateDevelopmentAltTag(development: {
  name: string;
  developer: string;
  town: string;
  zone?: string;
  propertyTypes?: string[];
  status?: string;
  deliveryQuarter?: string;
  isBeachProperty?: boolean;
  beachName?: string;
  isGolfProperty?: boolean;
  golfCourse?: string;
  imageIndex?: number;
}): string {
  const parts: string[] = [];

  // Development name
  parts.push(development.name);

  // Developer
  parts.push(`by ${development.developer}`);

  // Location with beach/golf context
  if (development.isBeachProperty && development.beachName) {
    parts.push(`near ${development.beachName}`);
  } else if (development.isGolfProperty && development.golfCourse) {
    parts.push(`at ${development.golfCourse}`);
  }

  parts.push(`in ${development.zone || development.town}, Spain`);

  // Property types
  if (development.propertyTypes?.length) {
    parts.push(`- ${development.propertyTypes.join(' and ')}s`);
  }

  // Status
  if (development.status === 'key-ready') {
    parts.push('- Key ready now');
  } else if (development.deliveryQuarter) {
    parts.push(`- Ready ${development.deliveryQuarter}`);
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

// ==========================================
// REVIEW & RATING SCHEMAS (Critical for SEO)
// ==========================================

export function reviewSchema(review: {
  author: string;
  reviewBody: string;
  ratingValue: number;
  datePublished: string;
  reviewedProperty?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewBody": review.reviewBody,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.ratingValue,
      "bestRating": 5,
      "worstRating": 1
    },
    "datePublished": review.datePublished,
    "itemReviewed": review.reviewedProperty ? {
      "@type": "RealEstateListing",
      "name": review.reviewedProperty
    } : undefined
  };
}

export function aggregateRatingSchema(rating: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  itemName: string;
  itemType?: 'RealEstateAgent' | 'RealEstateListing' | 'Organization';
}) {
  return {
    "@context": "https://schema.org",
    "@type": rating.itemType || "RealEstateAgent",
    "name": rating.itemName,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating.ratingValue,
      "reviewCount": rating.reviewCount,
      "bestRating": rating.bestRating || 5,
      "worstRating": 1
    }
  };
}

// ==========================================
// VIDEO SCHEMA (Critical for virtual tours)
// ==========================================

export function videoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601 format: PT1M30S
  contentUrl?: string;
  embedUrl?: string;
  propertyName?: string;
  town?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnailUrl,
    "uploadDate": video.uploadDate,
    "duration": video.duration,
    "contentUrl": video.contentUrl,
    "embedUrl": video.embedUrl,
    "publisher": {
      "@type": "Organization",
      "name": "New Build Homes Costa Blanca",
      "url": "https://newbuildhomescostablanca.com"
    },
    "about": video.propertyName ? {
      "@type": "RealEstateListing",
      "name": video.propertyName,
      "address": video.town ? {
        "@type": "PostalAddress",
        "addressLocality": video.town,
        "addressCountry": "ES"
      } : undefined
    } : undefined
  };
}

// ==========================================
// EVENT SCHEMA (Critical for open houses)
// ==========================================

export function eventSchema(event: {
  name: string;
  description: string;
  startDate: string; // ISO 8601
  endDate?: string;
  location: {
    name: string;
    address: string;
    town: string;
  };
  url?: string;
  eventType?: 'OpenHouse' | 'PropertyViewing' | 'SalesEvent';
  organizer?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate || event.startDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.location.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": event.location.address,
        "addressLocality": event.location.town,
        "addressRegion": "Alicante",
        "addressCountry": "ES"
      }
    },
    "organizer": {
      "@type": "RealEstateAgent",
      "name": event.organizer || "New Build Homes Costa Blanca",
      "url": "https://newbuildhomescostablanca.com"
    },
    "url": event.url
  };
}

// ==========================================
// PERSON SCHEMA (Agent profiles)
// ==========================================

export function personSchema(agent: {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  email?: string;
  telephone?: string;
  languages?: string[];
  areasServed?: string[];
  sameAs?: string[]; // Social profiles
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": agent.name,
    "jobTitle": agent.jobTitle,
    "description": agent.description,
    "image": agent.image,
    "email": agent.email,
    "telephone": agent.telephone,
    "knowsLanguage": agent.languages,
    "worksFor": {
      "@type": "RealEstateAgent",
      "name": "New Build Homes Costa Blanca"
    },
    "areaServed": agent.areasServed?.map(area => ({
      "@type": "Place",
      "name": area
    })),
    "sameAs": agent.sameAs
  };
}

// ==========================================
// HOW-TO SCHEMA (For guides)
// ==========================================

export function howToSchema(guide: {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601: PT30M
  steps: { name: string; text: string; url?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": guide.name,
    "description": guide.description,
    "totalTime": guide.totalTime,
    "step": guide.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "url": step.url
    }))
  };
}

// ==========================================
// HOME AND CONSTRUCTION BUSINESS SCHEMA
// Critical for Development and Builder pages
// ==========================================

export function homeAndConstructionBusinessSchema(business: {
  name: string;
  description: string;
  url: string;
  priceRange: string;
  image?: string;
  address: {
    streetAddress?: string;
    town: string;
    region?: string;
    postalCode?: string;
  };
  geo?: { lat: number; lng: number };
  telephone?: string;
  email?: string;
  areaServed?: string[];
  foundingDate?: string;
  numberOfEmployees?: number;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": business.name,
    "description": business.description,
    "url": business.url,
    "image": business.image,
    "priceRange": business.priceRange,
    "telephone": business.telephone,
    "email": business.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address.streetAddress,
      "addressLocality": business.address.town,
      "addressRegion": business.address.region || "Alicante",
      "postalCode": business.address.postalCode,
      "addressCountry": "ES"
    },
    "geo": business.geo ? {
      "@type": "GeoCoordinates",
      "latitude": business.geo.lat,
      "longitude": business.geo.lng
    } : undefined,
    "areaServed": business.areaServed?.map(area => ({
      "@type": "Place",
      "name": area
    })),
    "foundingDate": business.foundingDate,
    "numberOfEmployees": business.numberOfEmployees ? {
      "@type": "QuantitativeValue",
      "value": business.numberOfEmployees
    } : undefined,
    "aggregateRating": business.aggregateRating ? {
      "@type": "AggregateRating",
      "ratingValue": business.aggregateRating.ratingValue,
      "reviewCount": business.aggregateRating.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "New Build Property Sales",
        "description": "New construction homes including apartments, villas, and townhouses in Costa Blanca, Spain"
      }
    }
  };
}

// ==========================================
// DEVELOPMENT SCHEMA (Product + LocalBusiness hybrid)
// For new build development projects
// ==========================================

export function developmentSchema(development: {
  name: string;
  description: string;
  url: string;
  images: string[];
  priceFrom: number;
  priceTo?: number;
  developer: string;
  developerUrl?: string;
  address: {
    town: string;
    zone?: string;
    region?: string;
  };
  propertyTypes: string[];
  bedroomRange?: string;
  totalUnits?: number;
  status: 'key-ready' | 'under-construction' | 'off-plan' | 'completed';
  deliveryDate?: string;
  features?: string[];
  faqs?: { question: string; answer: string }[];
}) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": development.name,
    "description": development.description,
    "url": development.url,
    "image": development.images,
    "brand": {
      "@type": "Organization",
      "name": development.developer,
      "url": development.developerUrl
    },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": development.priceFrom,
      "highPrice": development.priceTo || development.priceFrom * 2,
      "priceCurrency": "EUR",
      "availability": development.status === 'key-ready'
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      "offerCount": development.totalUnits || 1
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Property Types",
        "value": development.propertyTypes.join(", ")
      },
      development.bedroomRange ? {
        "@type": "PropertyValue",
        "name": "Bedrooms",
        "value": development.bedroomRange
      } : null,
      {
        "@type": "PropertyValue",
        "name": "Status",
        "value": development.status === 'key-ready' ? 'Key Ready - Move in now' :
                 development.status === 'under-construction' ? `Under Construction - ${development.deliveryDate || 'TBA'}` :
                 development.status === 'off-plan' ? `Off-Plan - ${development.deliveryDate || 'TBA'}` :
                 'Completed'
      },
      {
        "@type": "PropertyValue",
        "name": "Location",
        "value": development.address.zone
          ? `${development.address.zone}, ${development.address.town}`
          : development.address.town
      }
    ].filter(Boolean)
  };

  return productSchema;
}

// ==========================================
// PLACE SCHEMA (Enhanced for Areas)
// ==========================================

export function placeSchema(place: {
  name: string;
  description: string;
  url: string;
  image?: string;
  address: {
    region: string;
    country?: string;
  };
  geo?: { lat: number; lng: number };
  containedIn?: string;
  amenities?: string[];
  population?: number;
  touristAttractions?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": place.name,
    "description": place.description,
    "url": place.url,
    "image": place.image,
    "address": {
      "@type": "PostalAddress",
      "addressRegion": place.address.region,
      "addressCountry": place.address.country || "ES"
    },
    "geo": place.geo ? {
      "@type": "GeoCoordinates",
      "latitude": place.geo.lat,
      "longitude": place.geo.lng
    } : undefined,
    "containedInPlace": place.containedIn ? {
      "@type": "Place",
      "name": place.containedIn
    } : {
      "@type": "Place",
      "name": "Costa Blanca, Spain"
    },
    "amenityFeature": place.amenities?.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity,
      "value": true
    })),
    "touristType": ["Property Buyer", "Expat", "Retiree", "Holiday Home Owner"],
    "containsPlace": place.touristAttractions?.map(attraction => ({
      "@type": "TouristAttraction",
      "name": attraction
    }))
  };
}
