// Schema generators for all page types
// Following BUILD_RULES.md specifications

const SITE_URL = 'https://newbuildhomescostablanca.com';
const COMPANY = {
  name: 'New Build Homes Costa Blanca',
  phone: '+34634044970',
  email: 'oskar@hanssonhertzell.com',
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
};

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: COMPANY.name,
    url: SITE_URL,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    areaServed: ['Costa Blanca', 'Alicante', 'Torrevieja', 'Orihuela Costa', 'Javea', 'Altea'],
    priceRange: '€€€',
    parentOrganization: {
      '@type': 'RealEstateAgent',
      name: 'Hansson & Hertzell',
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function developmentSchema(dev: {
  name: string;
  slug: string;
  description: string;
  town: string;
  lat?: number;
  lng?: number;
  totalUnits?: number;
  amenities?: string[];
  priceFrom?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    name: dev.name,
    description: dev.description,
    url: `${SITE_URL}/developments/${dev.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: dev.town,
      addressRegion: 'Alicante',
      addressCountry: 'ES',
    },
    geo: dev.lat && dev.lng ? {
      '@type': 'GeoCoordinates',
      latitude: dev.lat,
      longitude: dev.lng,
    } : undefined,
    numberOfAccommodationUnits: dev.totalUnits,
    amenityFeature: dev.amenities?.map(a => ({
      '@type': 'LocationFeatureSpecification',
      name: a,
    })),
  };
}

export function listingSchema(listing: {
  name: string;
  slug: string;
  bedrooms?: number;
  bathrooms?: number;
  size?: number;
  price?: number;
  availability?: 'PreSale' | 'InStock';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.name,
    url: `${SITE_URL}/developments/${listing.slug}`,
    datePosted: new Date().toISOString().split('T')[0],
    mainEntity: {
      '@type': 'Apartment',
      name: listing.name,
      numberOfBedrooms: listing.bedrooms,
      numberOfBathroomsTotal: listing.bathrooms,
      floorSize: listing.size ? {
        '@type': 'QuantitativeValue',
        value: listing.size,
        unitCode: 'MTK',
      } : undefined,
      offers: {
        '@type': 'Offer',
        availability: `https://schema.org/${listing.availability || 'PreSale'}`,
        priceCurrency: 'EUR',
        price: listing.price,
        seller: {
          '@type': 'RealEstateAgent',
          name: COMPANY.name,
          telephone: COMPANY.phone,
        },
      },
    },
    potentialAction: {
      '@type': 'ScheduleAction',
      name: 'Book Viewing',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: COMPANY.whatsapp,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
    },
  };
}

export function builderSchema(builder: {
  name: string;
  slug: string;
  description: string;
  developmentCount: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: builder.name,
    description: builder.description,
    url: `${SITE_URL}/builders/${builder.slug}`,
    numberOfEmployees: undefined,
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'New Build Properties',
        description: `${builder.developmentCount} developments in Costa Blanca`,
      },
    },
  };
}

export function areaSchema(area: {
  name: string;
  slug: string;
  description: string;
  lat?: number;
  lng?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: area.name,
    description: area.description,
    url: `${SITE_URL}/areas/${area.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: area.name,
      addressRegion: 'Alicante',
      addressCountry: 'ES',
    },
    geo: area.lat && area.lng ? {
      '@type': 'GeoCoordinates',
      latitude: area.lat,
      longitude: area.lng,
    } : undefined,
  };
}

export function golfCourseSchema(course: {
  name: string;
  slug: string;
  description: string;
  town: string;
  lat?: number;
  lng?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'GolfCourse',
    name: course.name,
    description: course.description,
    url: `${SITE_URL}/golf/${course.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: course.town,
      addressCountry: 'ES',
    },
    geo: course.lat && course.lng ? {
      '@type': 'GeoCoordinates',
      latitude: course.lat,
      longitude: course.lng,
    } : undefined,
  };
}

// Helper to render schema as JSON-LD script tag content
export function toJsonLd(schema: object | object[]): string {
  return JSON.stringify(Array.isArray(schema) ? schema : schema, null, 0);
}
