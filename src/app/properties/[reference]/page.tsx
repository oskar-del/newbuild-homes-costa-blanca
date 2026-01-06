import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPropertyByReference, fetchNewBuilds, BPProperty } from '@/lib/backgroundProperties';

// Revalidate every hour
export const revalidate = 3600;

// Generate static paths for all properties
export async function generateStaticParams() {
  const properties = await fetchNewBuilds();
  return properties.map((property) => ({
    reference: property.reference,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { reference: string } }): Promise<Metadata> {
  const property = await getPropertyByReference(params.reference);
  
  if (!property) {
    return { title: 'Property Not Found' };
  }

  const title = generateSEOTitle(property);
  const description = property.description 
    ? property.description.substring(0, 155) + '...'
    : `${property.bedrooms} bedroom ${property.type.toLowerCase()} for sale in ${property.town}, Costa Blanca. Contact us for pricing and viewings.`;

  return {
    title: `${title} | New Build Homes Costa Blanca`,
    description,
    openGraph: {
      title,
      description,
      images: property.images.length > 0 ? [property.images[0]] : [],
    },
  };
}

// Generate SEO-optimized title from property data
function generateSEOTitle(p: BPProperty): string {
  const parts: string[] = [];
  
  if (p.bedrooms > 0) {
    parts.push(`${p.bedrooms} Bedroom`);
  }
  
  parts.push(p.type || 'Property');
  
  if (p.pool) {
    parts.push('with Pool');
  }
  
  parts.push(`in ${p.town}`);
  
  return parts.join(' ');
}

// Generate property highlights for quick info section
function generateHighlights(p: BPProperty): { label: string; value: string }[] {
  const highlights: { label: string; value: string }[] = [];
  
  if (p.bedrooms > 0) highlights.push({ label: 'Bedrooms', value: String(p.bedrooms) });
  if (p.bathrooms > 0) highlights.push({ label: 'Bathrooms', value: String(p.bathrooms) });
  if (p.builtArea > 0) highlights.push({ label: 'Built Area', value: `${p.builtArea}m²` });
  if (p.plotArea > 0) highlights.push({ label: 'Plot Size', value: `${p.plotArea}m²` });
  if (p.pool) highlights.push({ label: 'Pool', value: 'Private Pool' });
  if (p.views && p.views.toLowerCase() !== 'none' && p.views.toLowerCase() !== 'no') {
    highlights.push({ label: 'Views', value: p.views });
  }
  if (p.orientation && p.orientation.toLowerCase() !== 'none' && p.orientation.toLowerCase() !== 'no') {
    highlights.push({ label: 'Orientation', value: p.orientation });
  }
  
  return highlights;
}

// Get area-specific information
function getAreaInfo(town: string): { nearbyAttractions: string[]; description: string } {
  const areas: Record<string, { nearbyAttractions: string[]; description: string }> = {
    'javea': {
      nearbyAttractions: ['Arenal Beach (5 min)', 'Montgo Natural Park (10 min)', 'Port of Javea (10 min)', 'Alicante Airport (80 min)'],
      description: 'Javea offers a perfect blend of traditional Spanish charm and modern amenities, with stunning beaches and a thriving international community.',
    },
    'moraira': {
      nearbyAttractions: ['El Portet Beach (5 min)', 'Moraira Castle (5 min)', 'Calpe (15 min)', 'Alicante Airport (75 min)'],
      description: 'Moraira is an exclusive coastal town known for its beautiful coves, excellent restaurants, and relaxed Mediterranean lifestyle.',
    },
    'calpe': {
      nearbyAttractions: ['Penon de Ifach (5 min)', 'La Fossa Beach (5 min)', 'Alicante Airport (65 min)', 'Valencia (90 min)'],
      description: 'Calpe is famous for the iconic Penon de Ifach rock and offers beautiful beaches, excellent seafood, and a vibrant expat community.',
    },
    'torrevieja': {
      nearbyAttractions: ['Salt Lakes (10 min)', 'Torrevieja Beach (5 min)', 'La Zenia Boulevard (15 min)', 'Alicante Airport (45 min)'],
      description: 'Torrevieja offers affordable beachside living with excellent amenities, a large international community, and the famous pink salt lakes.',
    },
    'orihuela costa': {
      nearbyAttractions: ['Playa Flamenca Beach (5 min)', 'La Zenia Boulevard (10 min)', 'Villamartin Golf (10 min)', 'Alicante Airport (40 min)'],
      description: 'Orihuela Costa is a popular destination for beach lovers and golfers, with excellent shopping and dining options.',
    },
    'guardamar del segura': {
      nearbyAttractions: ['Guardamar Dunes (5 min)', 'Guardamar Beach (5 min)', 'La Finca Golf (15 min)', 'Alicante Airport (40 min)'],
      description: 'Guardamar offers pristine beaches backed by pine forests, a traditional Spanish town center, and proximity to the Laguna de La Mata nature reserve.',
    },
  };

  const key = town.toLowerCase();
  return areas[key] || {
    nearbyAttractions: ['Local Beaches', 'Restaurants & Shops', 'Golf Courses', 'Alicante Airport'],
    description: `${town} is a wonderful location on the Costa Blanca, offering the authentic Spanish lifestyle with excellent amenities and beautiful surroundings.`,
  };
}

// Contact info constants
const WHATSAPP_LINK = 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0';
const PHONE_NUMBER = '+34 634 044 970';
const HABENO_LINK = 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e';

export default async function PropertyPage({ params }: { params: { reference: string } }) {
  const property = await getPropertyByReference(params.reference);
  
  if (!property) {
    notFound();
  }

  const title = generateSEOTitle(property);
  const highlights = generateHighlights(property);
  const areaInfo = getAreaInfo(property.town);
  const mainImage = property.images[0] || '/images/placeholder-property.jpg';

  // Schema markup
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    image: property.images,
    description: property.description || `New build ${property.type.toLowerCase()} for sale in ${property.town}, Costa Blanca.`,
    brand: {
      '@type': 'Brand',
      name: 'New Build Homes Costa Blanca',
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.newbuildhomescostablanca.com/properties/${property.reference}`,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'RealEstateAgent',
        name: 'New Build Homes Costa Blanca',
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.town,
      addressRegion: 'Alicante',
      addressCountry: 'ES',
    },
    numberOfRooms: property.bedrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.builtArea,
      unitCode: 'MTK',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the price of this property in ${property.town}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For the latest pricing and availability, please contact us via WhatsApp at +34 634 044 970 or use our contact form. Prices can change as properties are reserved.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I arrange a viewing of this property?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer both in-person viewings and video tours. Contact us to schedule a viewing at a time that suits you. We can arrange virtual tours for international buyers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is mortgage financing available for international buyers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Spanish banks offer mortgages to international buyers. EU residents can typically finance up to 80%, while non-EU residents can finance up to 70%. We partner with Habeno, a mortgage aggregator who can help you find the best rates.',
        },
      },
      {
        '@type': 'Question',
        name: 'What additional costs should I budget for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For new build properties in Spain, budget approximately 13-14% on top of the purchase price. This includes 10% IVA (VAT), 1.5% stamp duty (AJD), notary fees, land registry fees, and legal fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need an NIE number to buy property in Spain?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all foreign buyers need an NIE (Número de Identificación de Extranjero). This can be obtained at Spanish consulates abroad or in Spain. We can guide you through the process.',
        },
      },
      {
        '@type': 'Question',
        name: `What amenities are nearby in ${property.town}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${property.town} offers excellent amenities including beaches, restaurants, shops, healthcare facilities, and international schools. ${areaInfo.description}`,
        },
      },
      {
        '@type': 'Question',
        name: 'Can this property be used for holiday rentals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many new build properties in Costa Blanca can be rented out for holidays, subject to local regulations and tourist license requirements. Contact us to discuss rental potential for this specific property.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does the buying process take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For new build properties, the timeline depends on construction stage. Off-plan properties can take 12-24 months. Key-ready properties can complete in 6-8 weeks once all documentation is in order.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.newbuildhomescostablanca.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Properties',
        item: 'https://www.newbuildhomescostablanca.com/properties/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: property.town,
        item: `https://www.newbuildhomescostablanca.com/properties/?town=${encodeURIComponent(property.town)}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: property.reference,
        item: `https://www.newbuildhomescostablanca.com/properties/${property.reference}`,
      },
    ],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'New Build Homes Costa Blanca',
    image: 'https://www.newbuildhomescostablanca.com/logo.png',
    telephone: PHONE_NUMBER,
    url: 'https://www.newbuildhomescostablanca.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Torrevieja',
      addressRegion: 'Alicante',
      addressCountry: 'ES',
    },
  };

  return (
    <>
      {/* Schema Markup */}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <main className="min-h-screen bg-slate-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="text-sm text-slate-600">
              <Link href="/" className="hover:text-amber-600">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/properties" className="hover:text-amber-600">Properties</Link>
              <span className="mx-2">/</span>
              <Link href={`/properties?town=${encodeURIComponent(property.town)}`} className="hover:text-amber-600">{property.town}</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-800">{property.reference}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section with Image Gallery */}
        <section className="bg-slate-900">
          <div className="container mx-auto px-4 py-8">
            {/* Main Image + Gallery Grid */}
            {property.images.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Main Large Image */}
                <div className="lg:col-span-2 relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                  <Image
                    src={mainImage}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
                
                {/* Thumbnail Grid - Show up to 4 additional images */}
                <div className="grid grid-cols-2 gap-2 lg:gap-4">
                  {property.images.slice(1, 5).map((img, index) => (
                    <div key={index} className="relative h-[120px] lg:h-[118px] rounded-lg overflow-hidden">
                      <Image
                        src={img}
                        alt={`${title} - Image ${index + 2}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform cursor-pointer"
                        sizes="(max-width: 1024px) 25vw, 16vw"
                      />
                    </div>
                  ))}
                  
                  {/* Show "View All Photos" button if more than 5 images */}
                  {property.images.length > 5 && (
                    <div className="relative h-[120px] lg:h-[118px] rounded-lg overflow-hidden bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors">
                      <div className="text-center text-white">
                        <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">+{property.images.length - 5} Photos</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Fill empty slots if less than 4 additional images */}
                  {property.images.length < 5 && property.images.length > 1 && (
                    Array(4 - (property.images.length - 1)).fill(0).map((_, index) => (
                      <div key={`empty-${index}`} className="relative h-[120px] lg:h-[118px] rounded-lg overflow-hidden bg-slate-800" />
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="relative h-[400px] rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center">
                <p className="text-slate-400">No images available</p>
              </div>
            )}

            {/* Property Title & Key Info Overlay */}
            <div className="mt-6 text-white">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{title}</h1>
              <p className="text-xl text-amber-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {property.zone ? `${property.zone}, ${property.town}` : property.town}
              </p>
              <p className="text-slate-300 mt-1">Ref: {property.reference}</p>
            </div>
          </div>
        </section>

        {/* Quick Info Bar */}
        <section className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-4 lg:gap-8 justify-center lg:justify-start">
              {highlights.map((h, index) => (
                <div key={index} className="text-center lg:text-left">
                  <p className="text-sm text-slate-500">{h.label}</p>
                  <p className="text-lg font-semibold text-slate-800">{h.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Property Description - USE ACTUAL FEED DESCRIPTION */}
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">About This Property</h2>
                {property.description ? (
                  <div className="prose prose-slate max-w-none">
                    {property.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-slate-600 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 leading-relaxed">
                    This {property.bedrooms} bedroom {property.type.toLowerCase()} is located in the desirable area of {property.town}, Costa Blanca. 
                    {property.pool && ' The property includes a private swimming pool, perfect for enjoying the Spanish sunshine.'} 
                    {property.builtArea > 0 && ` With ${property.builtArea}m² of built space`}
                    {property.plotArea > 0 && ` on a ${property.plotArea}m² plot`}, this property offers excellent living space.
                    {property.views && property.views.toLowerCase() !== 'none' && ` Enjoy ${property.views.toLowerCase()} views from the property.`}
                    {' '}Contact us today for more information and to arrange a viewing.
                  </p>
                )}
              </section>

              {/* Property Features */}
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Property Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Bedrooms</p>
                        <p className="font-semibold text-slate-800">{property.bedrooms}</p>
                      </div>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Bathrooms</p>
                        <p className="font-semibold text-slate-800">{property.bathrooms}</p>
                      </div>
                    </div>
                  )}
                  {property.builtArea > 0 && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Built Area</p>
                        <p className="font-semibold text-slate-800">{property.builtArea}m²</p>
                      </div>
                    </div>
                  )}
                  {property.plotArea > 0 && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Plot Size</p>
                        <p className="font-semibold text-slate-800">{property.plotArea}m²</p>
                      </div>
                    </div>
                  )}
                  {property.pool && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Pool</p>
                        <p className="font-semibold text-slate-800">Private Pool</p>
                      </div>
                    </div>
                  )}
                  {property.views && property.views.toLowerCase() !== 'none' && property.views.toLowerCase() !== 'no' && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Views</p>
                        <p className="font-semibold text-slate-800">{property.views}</p>
                      </div>
                    </div>
                  )}
                  {property.orientation && property.orientation.toLowerCase() !== 'none' && property.orientation.toLowerCase() !== 'no' && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Orientation</p>
                        <p className="font-semibold text-slate-800">{property.orientation} Facing</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Location Section */}
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Location: {property.town}</h2>
                <p className="text-slate-600 mb-6">{areaInfo.description}</p>
                
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Nearby Attractions</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {areaInfo.nearbyAttractions.map((attraction, index) => (
                    <li key={index} className="flex items-center gap-2 text-slate-600">
                      <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {attraction}
                    </li>
                  ))}
                </ul>
                
                {/* Link to area guide if available */}
                <div className="mt-4">
                  <Link 
                    href={`/areas/${property.town.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center gap-1"
                  >
                    Learn more about {property.town}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </section>

              {/* Buying Costs Section */}
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Buying Costs in Spain</h2>
                <p className="text-slate-600 mb-4">
                  When purchasing new build property in Spain, budget approximately 13-14% on top of the purchase price for additional costs:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 text-slate-800 font-semibold">Cost Type</th>
                        <th className="py-2 text-slate-800 font-semibold">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr className="border-b">
                        <td className="py-2">IVA (Spanish VAT)</td>
                        <td className="py-2">10%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">AJD (Stamp Duty)</td>
                        <td className="py-2">~1.5%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Notary Fees</td>
                        <td className="py-2">€1,000 - €2,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Land Registry</td>
                        <td className="py-2">€500 - €1,000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Legal Fees</td>
                        <td className="py-2">1 - 1.5%</td>
                      </tr>
                      <tr className="font-semibold text-slate-800">
                        <td className="py-2">Total Additional Costs</td>
                        <td className="py-2">~13-14%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <Link 
                    href="/guides/costs-taxes"
                    className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center gap-1"
                  >
                    Read our full guide to buying costs
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqSchema.mainEntity.map((faq, index) => (
                    <details key={index} className="group border-b pb-4">
                      <summary className="flex justify-between items-center cursor-pointer list-none">
                        <h3 className="text-lg font-medium text-slate-800 pr-4">{faq.name}</h3>
                        <svg className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <p className="mt-3 text-slate-600">{faq.acceptedAnswer.text}</p>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar - Contact & CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                {/* Price & CTA Card */}
                <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-amber-200">
                  <div className="text-center mb-6">
                    <p className="text-sm text-slate-500 mb-1">Contact us for</p>
                    <p className="text-2xl font-bold text-amber-600">Latest Price & Availability</p>
                  </div>
                  
                  <div className="space-y-3">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp Us
                    </a>
                    
                    <a
                      href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                      className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call {PHONE_NUMBER}
                    </a>
                    
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Request Information
                    </Link>
                  </div>
                </div>

                {/* Mortgage CTA */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Need Financing?</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    We partner with Habeno, a mortgage aggregator who can compare offers from multiple Spanish banks.
                  </p>
                  <a
                    href={HABENO_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Start Mortgage Application
                  </a>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Helpful Guides</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/guides/buying-process" className="flex items-center gap-2 text-slate-600 hover:text-amber-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Buying Process Guide
                      </Link>
                    </li>
                    <li>
                      <Link href="/guides/nie-number" className="flex items-center gap-2 text-slate-600 hover:text-amber-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        NIE Number Application
                      </Link>
                    </li>
                    <li>
                      <Link href="/guides/mortgage" className="flex items-center gap-2 text-slate-600 hover:text-amber-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Mortgage Guide
                      </Link>
                    </li>
                    <li>
                      <Link href="/guides/costs-taxes" className="flex items-center gap-2 text-slate-600 hover:text-amber-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Costs & Taxes
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <section className="bg-slate-800 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Interested in This Property?
            </h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Contact us today for the latest availability and pricing. We offer in-person viewings and virtual tours for international buyers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Request Info
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
