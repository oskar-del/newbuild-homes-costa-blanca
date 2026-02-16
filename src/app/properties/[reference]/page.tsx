/**
 * Property Detail Page - Server Component
 * ========================================
 * Fetches property data, generates AI content, creates JSON-LD schemas
 *
 * NEVER uses feed descriptions - all content is AI-generated for SEO
 *
 * Caching Strategy (ISR - Incremental Static Regeneration):
 * - revalidate: 3600 = cache for 1 hour, regenerate in background
 * - First 100 properties pre-built at deploy time (generateStaticParams)
 * - Remaining 900+ properties: generate on first visit, then cache
 * - Content regenerated automatically when feed data updates
 */

// ISR: Regenerate pages every hour (3600 seconds)
// This caches the page and regenerates in background after 1 hour
export const revalidate = 3600;

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPropertyByRef, fetchXMLFeed, toUnifiedFormat } from '@/lib/xml-parser';
import { generatePropertyContent, PropertyContent, generateRentalIncomeEstimate } from '@/lib/property-content-generator';
import { loadAIContent, convertAIToPropertyContent } from '@/lib/ai-content-loader';
import { developments, developers } from '@/data/developments';
import { getVideoForProperty, getVideosForDevelopment, VideoCard } from '@/lib/video-mapping';
import fs from 'fs';
import path from 'path';
import PropertyPageClient from './PropertyPageClient';

// ====================
// STATIC PARAMS FOR SSG
// ====================

export async function generateStaticParams() {
  try {
    const properties = await fetchXMLFeed();
    // Reduce from 100 to 20 to minimize build memory usage
    // Remaining 900+ properties will use ISR (generated on first request)
    return properties.slice(0, 20).map((property) => ({
      reference: property.ref,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Enable ISR for remaining properties - they'll be built on first request and cached
export const dynamicParams = true;

// ====================
// METADATA GENERATION
// ====================

interface PageProps {
  params: Promise<{ reference: string }>;  // Next.js 14: params is a Promise
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { reference } = await params;  // Await params first!
  const parsedProperty = await getPropertyByRef(reference);

  if (!parsedProperty) {
    return {
      title: 'Property Not Found | New Build Homes Costa Blanca',
      description: 'The property you are looking for could not be found.',
    };
  }

  // Convert to unified format for content generator
  const property = toUnifiedFormat(parsedProperty);

  // TRY AI CONTENT FIRST, fall back to template generator
  const aiContent = loadAIContent(reference);
  const content = aiContent
    ? convertAIToPropertyContent(aiContent)
    : generatePropertyContent(property as any);

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
      canonical: `https://newbuildhomescostablanca.com/properties/${property.reference}`,
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

function generateBreadcrumbSchema(property: any, developmentData?: { slug: string; name: string } | null) {
  const items: any[] = [
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
  ];

  if (developmentData) {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: developmentData.name,
      item: `https://newbuildhomescostablanca.com/developments/${developmentData.slug}`,
    });
    items.push({
      '@type': 'ListItem',
      position: 4,
      name: `${property.propertyType || 'Property'} in ${property.town || 'Costa Blanca'}`,
      item: `https://newbuildhomescostablanca.com/properties/${property.reference || property.id}`,
    });
  } else {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: `${property.propertyType || 'Property'} in ${property.town || 'Costa Blanca'}`,
      item: `https://newbuildhomescostablanca.com/properties/${property.reference || property.id}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
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
  const parsedProperty = await getPropertyByRef(reference);

  if (!parsedProperty) {
    notFound();
  }

  // Convert to unified format for content generator and schemas
  const property = toUnifiedFormat(parsedProperty);

  // TRY AI-GENERATED CONTENT FIRST (from GitHub Action)
  // Fall back to template generator if no AI content exists
  const aiContent = loadAIContent(reference);
  const content = aiContent
    ? convertAIToPropertyContent(aiContent)
    : generatePropertyContent(property as any);

  // Always calculate rental income from actual property data
  // (AI content loader doesn't generate numeric rental estimates)
  content.rentalIncomeEstimate = generateRentalIncomeEstimate(property as any);

  // Log which content source is being used
  if (aiContent) {
    console.log(`🤖 Using AI-generated content for ${reference}`);
  } else {
    console.log(`📝 Using template content for ${reference}`);
  }

  // Generate JSON-LD schemas (breadcrumb generated after linkingData below)
  const productSchema = generateProductSchema(property, content);
  const faqSchema = generateFAQSchema(content);
  const localBusinessSchema = generateLocalBusinessSchema();
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
    url: `https://newbuildhomescostablanca.com/properties/${property.reference}`,
  };

  // ====================
  // INTERNAL LINKING DATA
  // ====================

  // Find matching development
  const devName = property.developmentName || '';
  const matchedDevelopment = developments.find(d =>
    d.name.toLowerCase() === devName.toLowerCase() ||
    (d.displayName && d.displayName.toLowerCase() === devName.toLowerCase())
  );

  // Find matching builder/developer
  const builderName = property.developer || '';
  const matchedBuilder = Object.values(developers).find(d =>
    d.name.toLowerCase() === builderName.toLowerCase() ||
    d.displayName.toLowerCase() === builderName.toLowerCase()
  );
  const builderSlug = matchedBuilder
    ? Object.keys(developers).find(key => developers[key] === matchedBuilder) || ''
    : '';

  // Find related blog articles by area
  let relatedArticles: { slug: string; title: string; category: string; readTime: number }[] = [];
  try {
    const articlesDir = path.join(process.cwd(), 'src/content/articles');
    const articleFiles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.json'));
    const townSlugForMatch = (property.town || '').toLowerCase().replace(/\s+/g, '-');

    for (const file of articleFiles) {
      const articleData = JSON.parse(fs.readFileSync(path.join(articlesDir, file), 'utf-8'));
      const areas: string[] = articleData.relatedAreas || [];
      // Match if article's relatedAreas includes this property's town slug
      // or if the article is a general guide (no specific areas = relevant to all)
      const isAreaMatch = areas.some(a =>
        a === townSlugForMatch ||
        townSlugForMatch.includes(a) ||
        a.includes(townSlugForMatch)
      );
      if (isAreaMatch) {
        relatedArticles.push({
          slug: articleData.slug,
          title: articleData.title,
          category: articleData.category,
          readTime: articleData.readTime,
        });
      }
    }
    // Limit to 3 most relevant
    relatedArticles = relatedArticles.slice(0, 3);
  } catch (error) {
    console.error('Error loading related articles:', error);
  }

  // Fetch video for this property (by reference or development slug)
  let propertyVideo: VideoCard | null = null;
  try {
    // First try to find a video directly for this property reference
    propertyVideo = getVideoForProperty(property.reference);

    // If no direct match, try to find videos for this development
    if (!propertyVideo && matchedDevelopment) {
      const devVideos = getVideosForDevelopment(matchedDevelopment.slug, 1);
      if (devVideos.length > 0) {
        propertyVideo = devVideos[0];
      }
    }
  } catch (error) {
    console.error('Error fetching property video:', error);
  }

  // Build linking data to pass to client
  const linkingData = {
    development: matchedDevelopment ? {
      slug: matchedDevelopment.slug,
      name: matchedDevelopment.displayName || matchedDevelopment.name,
      status: matchedDevelopment.status,
    } : null,
    builder: matchedBuilder ? {
      slug: builderSlug,
      name: matchedBuilder.displayName || matchedBuilder.name,
    } : null,
    relatedArticles,
    propertyVideo,
  };

  // Generate breadcrumb schema (needs linkingData)
  const breadcrumbSchema = generateBreadcrumbSchema(property, linkingData.development);

  // Generate VideoObject schema if video exists (SEO rich snippet)
  const videoSchema = propertyVideo ? {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: propertyVideo.title,
    description: propertyVideo.description,
    thumbnailUrl: `https://img.youtube.com/vi/${propertyVideo.youtubeId}/maxresdefault.jpg`,
    uploadDate: new Date().toISOString().split('T')[0],
    duration: propertyVideo.duration ? `PT${propertyVideo.duration.replace(':', 'M')}S` : undefined,
    contentUrl: `https://www.youtube.com/watch?v=${propertyVideo.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${propertyVideo.youtubeId}`,
    publisher: {
      '@type': 'Organization',
      name: 'New Build Homes Costa Blanca',
      url: 'https://newbuildhomescostablanca.com',
    },
    about: {
      '@type': 'RealEstateListing',
      name: content.seoTitle,
      address: {
        '@type': 'PostalAddress',
        addressLocality: property.town,
        addressRegion: 'Alicante',
        addressCountry: 'ES',
      },
    },
  } : null;

  // Fetch similar properties - PRIORITIZE same town first, then fill with same region
  let similarProperties: any[] = [];
  try {
    const allProperties = await fetchXMLFeed();

    // FIRST: Get properties from the SAME TOWN only
    const sameTown = allProperties.filter(p =>
      p.ref !== parsedProperty.ref &&
      p.town?.toLowerCase() === parsedProperty.town?.toLowerCase()
    );

    // If we have 4+ same-town properties, use only those
    if (sameTown.length >= 4) {
      similarProperties = sameTown.slice(0, 4).map(p => toUnifiedFormat(p));
    } else {
      // Otherwise, start with same-town, then fill remaining slots with same-region
      const sameRegion = allProperties.filter(p =>
        p.ref !== parsedProperty.ref &&
        p.town?.toLowerCase() !== parsedProperty.town?.toLowerCase() &&
        p.region === parsedProperty.region
      );
      similarProperties = [...sameTown, ...sameRegion].slice(0, 4).map(p => toUnifiedFormat(p));
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
      {videoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}

      {/* Client Component with all interactive UI */}
      <PropertyPageClient
        property={property as any}
        content={content}
        similarProperties={similarProperties}
        linkingData={linkingData}
      />
    </>
  );
}
