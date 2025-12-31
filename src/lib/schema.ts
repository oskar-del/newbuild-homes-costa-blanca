// Schema.org structured data generators

export function toJsonLd(schema: object): string {
  return JSON.stringify(schema);
}

export function organizationSchema() {
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
