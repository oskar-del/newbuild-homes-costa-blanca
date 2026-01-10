import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchAllProperties, getPropertyById } from '@/lib/unified-feed-service';
import { UnifiedProperty } from '@/lib/unified-property';
import fs from 'fs';
import path from 'path';

export const revalidate = 3600;

// Contact constants
const WHATSAPP_LINK = 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0';
const PHONE_NUMBER = '+34 634 044 970';
const HABENO_LINK = 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e';

// Load AI content from src/content/developments/ if available
function loadAIContent(propertyName: string, reference: string): any | null {
  try {
    const dir = path.join(process.cwd(), 'src/content/developments');
    if (!fs.existsSync(dir)) return null;
    
    const files = fs.readdirSync(dir);
    
    // Try exact reference match first
    const refSlug = reference.toLowerCase();
    let match = files.find(f => f.replace('.json', '').toLowerCase() === refSlug);
    
    // Try property name match
    if (!match && propertyName) {
      const nameSlug = propertyName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      match = files.find(f => {
        const fileSlug = f.replace('.json', '').toLowerCase();
        return fileSlug === nameSlug || fileSlug.includes(nameSlug) || nameSlug.includes(fileSlug);
      });
    }
    
    if (match) {
      return JSON.parse(fs.readFileSync(path.join(dir, match), 'utf-8'));
    }
  } catch (e) {
    console.error('Error loading AI content:', e);
  }
  return null;
}

// Validate a property has minimum required data
function isValidProperty(p: UnifiedProperty): boolean {
  return !!(
    p &&
    p.reference &&
    p.town &&
    p.propertyType
  );
}

export async function generateStaticParams() {
  try {
    const properties = await fetchAllProperties();
    
    // IMPORTANT: Only include properties that have valid data
    const EXCLUDED_REFS = ['C3XY4490JAV', 'C4XY8251JAV']; const validProperties = properties.filter(p => isValidProperty(p) && EXCLUDED_REFS.indexOf(p.reference) === -1);
    
    console.log(`[generateStaticParams] Total: ${properties.length}, Valid: ${validProperties.length}`);
    
    return validProperties.map((property) => ({
      reference: property.reference || property.id,
    }));
  } catch (error) {
    console.error('[generateStaticParams] Error:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { reference: string } }): Promise<Metadata> {
  const property = await getPropertyById(params.reference);
  if (!property || !isValidProperty(property)) {
    return { title: 'Property Not Found' };
  }
  
  const aiContent = loadAIContent(property.aiContent?.title || '', params.reference);
  const title = aiContent?.metaTitle || generateSEOTitle(property);
  const description = aiContent?.metaDescription || generateMetaDescription(property);
  
  const images = property.images || [];
  const ogImage = images.length > 0 ? (typeof images[0] === 'string' ? images[0] : images[0]?.url) : undefined;
  
  return {
    title: `${title} | New Build Homes Costa Blanca`,
    description,
    openGraph: { 
      title, 
      description, 
      images: ogImage ? [ogImage] : [],
    },
  };
}

function generateSEOTitle(p: UnifiedProperty): string {
  const parts: string[] = [];
  if (p.bedrooms && p.bedrooms > 0) parts.push(`${p.bedrooms} Bedroom`);
  parts.push(p.propertyType || 'Property');
  if (p.hasPool) parts.push('with Pool');
  parts.push(`in ${p.town || 'Costa Blanca'}`);
  return parts.join(' ');
}

function generateMetaDescription(p: UnifiedProperty): string {
  const desc = p.descriptions?.en;
  if (desc && typeof desc === "string") return desc.substring(0, 155) + '...';
  return `${p.bedrooms || ''} bedroom ${(p.propertyType || 'property').toLowerCase()} for sale in ${p.town || 'Costa Blanca'}.`;
}

function generateHighlights(p: UnifiedProperty): { label: string; value: string }[] {
  const h: { label: string; value: string }[] = [];
  if (p.bedrooms && p.bedrooms > 0) h.push({ label: 'Bedrooms', value: String(p.bedrooms) });
  if (p.bathrooms && p.bathrooms > 0) h.push({ label: 'Bathrooms', value: String(p.bathrooms) });
  if (p.builtArea && p.builtArea > 0) h.push({ label: 'Built Area', value: `${p.builtArea}m²` });
  if (p.plotArea && p.plotArea > 0) h.push({ label: 'Plot Size', value: `${p.plotArea}m²` });
  if (p.hasPool) h.push({ label: 'Pool', value: 'Yes' });
  if (p.features?.some(f => f.toLowerCase().includes('parking') || f.toLowerCase().includes('garage'))) {
    h.push({ label: 'Parking', value: 'Yes' });
  }
  if (p.features?.some(f => f.toLowerCase().includes('air') || f.toLowerCase().includes('a/c'))) {
    h.push({ label: 'A/C', value: 'Yes' });
  }
  return h;
}

function getAreaInfo(town: string): { description: string; nearbyAttractions: string[] } {
  const areas: Record<string, { description: string; nearbyAttractions: string[] }> = {
    'Jávea': {
      description: 'Jávea is a stunning coastal town known for its beautiful beaches, historic old town, and vibrant expat community.',
      nearbyAttractions: ['Arenal Beach', 'Montgó Natural Park', 'Historic Old Town', 'Granadella Cove', 'Marina'],
    },
    'Moraira': {
      description: 'Moraira is an exclusive coastal village offering pristine beaches, excellent restaurants, and a relaxed Mediterranean lifestyle.',
      nearbyAttractions: ['El Portet Beach', 'Castle of Moraira', 'Weekly Market', 'Marina', 'Golf Courses'],
    },
    'Torrevieja': {
      description: 'Torrevieja is a vibrant coastal city with excellent amenities, salt lakes, and a large international community.',
      nearbyAttractions: ['Pink Salt Lake', 'Beaches', 'Aquopolis', 'La Zenia Boulevard', 'Natural Parks'],
    },
  };
  
  return areas[town] || {
    description: `${town} is a beautiful location on the Costa Blanca offering Mediterranean lifestyle and excellent amenities.`,
    nearbyAttractions: ['Local Beaches', 'Restaurants', 'Golf Courses', 'Shopping', 'Natural Parks'],
  };
}

export default async function PropertyPage({ params }: { params: { reference: string } }) {
  const property = await getPropertyById(params.reference);
  
  // Robust validation
  if (!property) {
    console.log(`[PropertyPage] Property not found: ${params.reference}`);
    notFound();
  }
  
  if (!isValidProperty(property)) {
    console.log(`[PropertyPage] Property invalid (missing required fields): ${params.reference}`);
    notFound();
  }

  console.log(`[PropertyPage] Found property: ${property.aiContent?.title || property.reference} from ${property.source}`);

  const aiContent = loadAIContent(property.aiContent?.title || '', params.reference);
  const title = aiContent?.metaTitle?.split(' - ')[0] || aiContent?.projectName || property.aiContent?.title || generateSEOTitle(property);
  const highlights = generateHighlights(property);
  const areaInfo = getAreaInfo(property.town);
  
  // Handle images safely
  const rawImages = property.images || [];
  const images = rawImages.map(img => typeof img === 'string' ? img : img?.url).filter(Boolean) as string[];
  const mainImage = images[0] || '/images/placeholder-property.jpg';
  const additionalImages = images.slice(1, 5);
  const remainingCount = Math.max(0, images.length - 5);
  
  // Get description safely
  const description = aiContent?.content?.heroIntro || 
    property.descriptions?.en || 
    `This ${property.bedrooms || ''} bedroom ${(property.propertyType || 'property').toLowerCase()} is located in ${property.town}.`;

  // Price display
  const priceDisplay = property.price 
    ? `€${property.price.toLocaleString()}` 
    : 'Price on request';

  const productSchema = {
    '@context': 'https://schema.org', 
    '@type': 'Product', 
    name: title, 
    image: images,
    description: typeof description === "string" ? description.substring(0, 500) : String(description || "").substring(0, 500),
    brand: { '@type': 'Brand', name: 'New Build Homes Costa Blanca' },
    offers: { 
      '@type': 'Offer', 
      url: `https://www.newbuildhomescostablanca.com/properties/${property.reference}`, 
      priceCurrency: 'EUR', 
      ...(property.price && { price: property.price }),
      availability: 'https://schema.org/InStock', 
      seller: { '@type': 'RealEstateAgent', name: 'New Build Homes Costa Blanca' } 
    },
    address: { 
      '@type': 'PostalAddress', 
      addressLocality: property.town, 
      addressRegion: property.province || 'Alicante', 
      addressCountry: 'ES' 
    },
    ...(property.bedrooms && { numberOfRooms: property.bedrooms }),
    ...(property.builtArea && { floorSize: { '@type': 'QuantitativeValue', value: property.builtArea, unitCode: 'MTK' } }),
  };

  const faqItems = aiContent?.content?.faqs || [
    { question: `What is the price of this property in ${property.town}?`, answer: property.price ? `This property is listed at ${priceDisplay}. Contact us for the latest availability.` : 'For the latest pricing and availability, please contact us via WhatsApp at +34 634 044 970 or use our contact form.' },
    { question: 'Can I arrange a viewing of this property?', answer: 'Yes, we offer both in-person viewings and video tours. Contact us to schedule.' },
    { question: 'Is mortgage financing available for international buyers?', answer: 'Yes, Spanish banks offer mortgages to international buyers. EU residents can typically finance up to 80%, non-EU up to 70%. We partner with Habeno who can compare offers from multiple banks.' },
    { question: 'What additional costs should I budget for?', answer: 'Budget approximately 13-14% on top of the purchase price including 10% IVA (for new builds), 1.5% stamp duty, notary fees, land registry, and legal fees.' },
    { question: 'Do I need an NIE number to buy property in Spain?', answer: 'Yes, all foreign buyers need an NIE (tax identification number). This can be obtained at Spanish consulates abroad or in Spain with a lawyer\'s assistance.' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqItems.map((faq: any) => ({
      '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.newbuildhomescostablanca.com/' },
      { '@type': 'ListItem', position: 2, name: 'Properties', item: 'https://www.newbuildhomescostablanca.com/properties/' },
      { '@type': 'ListItem', position: 3, name: title, item: `https://www.newbuildhomescostablanca.com/properties/${property.reference}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center space-x-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-blue-600">Home</Link></li>
              <li className="text-gray-400">/</li>
              <li><Link href="/properties" className="text-gray-500 hover:text-blue-600">Properties</Link></li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-medium truncate max-w-[200px]">{title}</li>
            </ol>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Source Badge */}
          {property.source === 'redsp' && (
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ✓ New Build
              </span>
            </div>
          )}

          {/* Image Gallery */}
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-200">
                <Image src={mainImage} alt={`${title} - Main view`} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 66vw" unoptimized />
              </div>
              {additionalImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {additionalImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-200">
                      <Image src={img} alt={`${title} - View ${idx + 2}`} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 16vw" unoptimized />
                      {idx === 3 && remainingCount > 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">+{remainingCount} Photos</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                  {property.price && (
                    <span className="text-2xl font-bold text-blue-600">{priceDisplay}</span>
                  )}
                </div>
                <p className="text-lg text-gray-600 mb-4">
                  {property.locationDetail ? `${property.locationDetail}, ` : ''}{property.town}, Costa Blanca
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  {highlights.slice(0, 6).map((h, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                      <span className="font-semibold text-gray-900">{h.value}</span>
                      <span className="text-gray-500 text-sm">{h.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {aiContent ? `About ${aiContent.projectName || title}` : 'Property Description'}
                </h2>
                <div className="prose max-w-none text-gray-600">
                  {description.split('\n').filter(Boolean).map((para: string, idx: number) => (
                    <p key={idx} className="mb-4">{para}</p>
                  ))}
                </div>
              </div>

              {/* Location Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Location: {property.town}</h2>
                <div className="prose max-w-none text-gray-600 mb-6">
                  {aiContent?.content?.locationSection?.intro ? (
                    aiContent.content.locationSection.intro.split('\n\n').map((para: string, idx: number) => (
                      <p key={idx} className="mb-4">{para}</p>
                    ))
                  ) : (
                    <p>{areaInfo.description}</p>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Location Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {(aiContent?.content?.locationSection?.highlights || areaInfo.nearbyAttractions).map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <span className="text-green-500">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Property Features */}
              {highlights.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Features</h2>
                  {aiContent?.content?.propertyFeatures?.intro && (
                    <p className="text-gray-600 mb-4">{aiContent.content.propertyFeatures.intro}</p>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-600">
                        <span className="text-blue-500">•</span> 
                        <span className="font-medium">{h.label}:</span> {h.value}
                      </div>
                    ))}
                    {property.hasPool && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-blue-500">•</span> Swimming Pool
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Investment Section - AI Only */}
              {aiContent?.content?.investmentSection && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Investment Potential</h2>
                  <div className="prose max-w-none text-gray-600">
                    {aiContent.content.investmentSection.split('\n\n').map((para: string, idx: number) => (
                      <p key={idx} className="mb-4">{para}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Buy Section - AI Only */}
              {aiContent?.content?.whyBuySection && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Buy This Property?</h2>
                  <ul className="space-y-3">
                    {aiContent.content.whyBuySection.map((reason: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-600">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQ Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqItems.slice(0, 6).map((faq: any, idx: number) => (
                    <details key={idx} className="group border-b border-gray-200 pb-4">
                      <summary className="flex justify-between items-center cursor-pointer list-none">
                        <h3 className="text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                        <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-3 text-gray-600">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Interested in this property?</h3>
                {property.price && (
                  <p className="text-2xl font-bold text-blue-600 mb-4">{priceDisplay}</p>
                )}
                <p className="text-gray-600 mb-6">Contact us for the latest availability and to arrange a viewing.</p>
                <div className="space-y-3">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition">
                    <span>📱</span> WhatsApp Us
                  </a>
                  <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition">
                    <span>📞</span> Call {PHONE_NUMBER}
                  </a>
                  <Link href="/contact" className="flex items-center justify-center gap-2 w-full border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold py-3 px-4 rounded-lg transition">
                    <span>✉️</span> Request Info
                  </Link>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-500 mb-3">Need financing?</p>
                  <a href={HABENO_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    💰 Get mortgage quotes from Habeno →
                  </a>
                </div>
              </div>

              {/* Property Summary */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Property Details</h3>
                <dl className="space-y-3">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex justify-between">
                      <dt className="text-gray-500">{h.label}</dt>
                      <dd className="font-medium text-gray-900">{h.value}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Reference</dt>
                    <dd className="font-medium text-gray-900">{property.reference}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Type</dt>
                    <dd className="font-medium text-gray-900">{property.propertyType}</dd>
                  </div>
                  {property.source && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Source</dt>
                      <dd className="font-medium text-gray-900 capitalize">{property.source}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Multilingual Note (for REDSP) */}
              {property.source === 'redsp' && property.descriptions && Object.keys(property.descriptions).length > 1 && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    <strong>🌍 Available in multiple languages:</strong> This property description is available in {Object.keys(property.descriptions).join(', ').toUpperCase()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
