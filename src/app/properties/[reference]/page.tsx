export const dynamic = 'force-dynamic';
/**
 * Property Detail Page - Server Component
 * ========================================
 * Fetches property data, generates AI content, creates JSON-LD schemas
 * 
 * NEVER uses feed descriptions - all content is AI-generated for SEO
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPropertyById, getAllProperties } from '@/lib/unified-feed-service';
import { generatePropertyContent, PropertyContent } from '@/lib/property-content-generator';
import PropertyPageClient from './PropertyPageClient';

// ====================
// STATIC PARAMS FOR SSG
// ====================

export async function generateStaticParams() {
  try {
    const properties = await getAllProperties();
    return properties.slice(0, 100).map((property) => ({
      reference: property.reference || property.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// ====================
// METADATA GENERATION
// ====================

interface PageProps {
  params: Promise<{ reference: string }>;  // Next.js 14: params is a Promise
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { reference } = await params;  // Await params first!
  const property = await getPropertyById(reference);
  
  if (!property) {
    return {
      title: 'Property Not Found | New Build Homes Costa Blanca',
      description: 'The property you are looking for could not be found.',
    };
  }
  
  const content = generatePropertyContent(property);
  
  return {
    title: `${content.seoTitle} | New Build Homes Costa Blanca`,
    description: content.metaDescription,
    openGraph: {
      title: content.seoTitle,
      description: content.metaDescription,
      images: property.images?.slice(0, 4).map((img, i) => ({
        url: img.url,
        width: 1200,
        height: 630,
        alt: content.imageAltTags[i] || `Property in ${property.town}`,
      })) || [],
      type: 'website',
      locale: 'en_GB',
      siteName: 'New Build Homes Costa Blanca',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.seoTitle,
      description: content.metaDescription,
      images: property.images?.[0]?.url ? [property.images[0].url] : [],
    },
    alternates: {
      canonical: `https://newbuildhomescostablanca.com/properties/${property.reference || property.id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ====================
// JSON-LD SCHEMA GENERATORS
// ====================

function generateProductSchema(property: any, content: PropertyContent) {
  const price = property.price || 0;
  const images = property.images?.slice(0, 5).map((img: any) => img.url) || [];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: content.seoTitle,
    description: content.metaDescription,
    image: images,
    brand: {
      '@type': 'Brand',
      name: 'New Build Homes Costa Blanca',
    },
    offers: {
      '@type': 'Offer',
      url: `https://newbuildhomescostablanca.com/properties/${property.reference || property.id}`,
      priceCurrency: 'EUR',
      price: price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'RealEstateAgent',
        name: 'New Build Homes Costa Blanca',
        telephone: '+34634044970',
        url: 'https://newbuildhomescostablanca.com',
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Bedrooms',
        value: property.bedrooms || 0,
      },
      {
        '@type': 'PropertyValue',
        name: 'Bathrooms',
        value: property.bathrooms || 0,
      },
      {
        '@type': 'PropertyValue',
        name: 'Built Area',
        value: `${property.builtArea || 0} m²`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Property Type',
        value: property.propertyType || 'Property',
      },
    ],
  };
}

function generateFAQSchema(content: PropertyContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'New Build Homes Costa Blanca',
    description: 'Specialist agency for new build properties on Spain\'s Costa Blanca. Helping international buyers find their perfect home in the sun.',
    url: 'https://newbuildhomescostablanca.com',
    telephone: '+34634044970',
    email: 'info@newbuildhomescostablanca.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Costa Blanca',
      addressRegion: 'Alicante',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.0,
      longitude: -0.5,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 38.0,
        longitude: -0.5,
      },
      geoRadius: '100000',
    },
    priceRange: '€150,000 - €2,000,000',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '14:00',
      },
    ],
  };
}

function generateBreadcrumbSchema(property: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://newbuildhomescostablanca.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Properties',
        item: 'https://newbuildhomescostablanca.com/properties',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${property.propertyType || 'Property'} in ${property.town || 'Costa Blanca'}`,
        item: `https://newbuildhomescostablanca.com/properties/${property.reference || property.id}`,
      },
    ],
  };
}

function generatePlaceSchema(property: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${property.propertyType || 'Property'} in ${property.town || 'Costa Blanca'}`,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.latitude || 38.0,
      longitude: property.longitude || -0.5,
    },
    containedInPlace: {
      '@type': 'City',
      name: property.town || 'Costa Blanca',
      containedInPlace: {
        '@type': 'State',
        name: 'Alicante',
        containedInPlace: {
          '@type': 'Country',
          name: 'Spain',
        },
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.town || 'Costa Blanca',
      addressRegion: property.province || 'Alicante',
      addressCountry: 'ES',
    },
  };
}

function generateSpeakableSchema(property: any, content: PropertyContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.seoTitle,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.property-description', '.lifestyle-section'],
    },
    url: `https://newbuildhomescostablanca.com/properties/${property.reference || property.id}`,
  };
}

// ====================
// MAIN PAGE COMPONENT
// ====================

export default async function PropertyPage({ params }: PageProps) {
  const { reference } = await params;  // Next.js 14: Await params first!
  const property = await getPropertyById(reference);
  
  if (!property) {
    notFound();
  }
  
  // Generate all AI content for this property
  const content = generatePropertyContent(property);
  
  // Generate JSON-LD schemas
  const productSchema = generateProductSchema(property, content);
  const faqSchema = generateFAQSchema(content);
  const localBusinessSchema = generateLocalBusinessSchema();
  const breadcrumbSchema = generateBreadcrumbSchema(property);
  const placeSchema = generatePlaceSchema(property);
  const speakableSchema = generateSpeakableSchema(property, content);
  
  // RealEstateListing schema with freshness signals
  const realEstateListingSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: content.seoTitle,
    description: content.metaDescription,
    datePosted: new Date().toISOString().split('T')[0],
    dateModified: new Date().toISOString().split('T')[0],
    validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: `https://newbuildhomescostablanca.com/properties/${property.reference || property.id}`,
  };
  
  // Fetch similar properties - PRIORITIZE same town first, then fill with same region
  let similarProperties: any[] = [];
  try {
    const allProperties = await getAllProperties();
    
    // FIRST: Get properties from the SAME TOWN only
    const sameTown = allProperties.filter(p => 
      p.id !== property.id && 
      p.town?.toLowerCase() === property.town?.toLowerCase()
    );
    
    // If we have 4+ same-town properties, use only those
    if (sameTown.length >= 4) {
      similarProperties = sameTown.slice(0, 4);
    } else {
      // Otherwise, start with same-town, then fill remaining slots with same-region
      const sameRegion = allProperties.filter(p => 
        p.id !== property.id && 
        p.town?.toLowerCase() !== property.town?.toLowerCase() && // Exclude already-included same town
        p.region === property.region
      );
      similarProperties = [...sameTown, ...sameRegion].slice(0, 4);
    }
  } catch (error) {
    console.error('Error fetching similar properties:', error);
  }
  
  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateListingSchema) }}
      />
      
      {/* Client Component with all interactive UI */}
      <PropertyPageClient 
        property={property}
        content={content}
        similarProperties={similarProperties}
      />
    </>
  );
}
