import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPropertyByReference, fetchNewBuilds, BPProperty } from '@/lib/backgroundProperties';
import fs from 'fs';
import path from 'path';

export const revalidate = 3600;

// Load AI content from src/content/developments/ if available
function loadAIContent(propertyName: string): any | null {
  try {
    const slug = propertyName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const contentPath = path.join(process.cwd(), 'src/content/developments', `${slug}.json`);
    if (fs.existsSync(contentPath)) {
      const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
      return content;
    }
    // Try variations
    const dir = path.join(process.cwd(), 'src/content/developments');
    const files = fs.readdirSync(dir);
    const match = files.find(f => f.includes(slug) || slug.includes(f.replace('.json', '')));
    if (match) {
      return JSON.parse(fs.readFileSync(path.join(dir, match), 'utf-8'));
    }
  } catch (e) {
    console.error('Error loading AI content:', e);
  }
  return null;
}

export async function generateStaticParams() {
  const properties = await fetchNewBuilds();
  return properties.map((property) => ({
    reference: property.reference,
  }));
}

export async function generateMetadata({ params }: { params: { reference: string } }): Promise<Metadata> {
  const property = await getPropertyByReference(params.reference);
  if (!property) return { title: 'Property Not Found' };
  
  const aiContent = loadAIContent(property.title);
  const title = aiContent?.metaTitle || generateSEOTitle(property);
  const description = aiContent?.metaDescription || (property.description 
    ? property.description.substring(0, 155) + '...'
    : `${property.bedrooms} bedroom ${property.type.toLowerCase()} for sale in ${property.town}, Costa Blanca.`);
  
  return {
    title: `${title} | New Build Homes Costa Blanca`,
    description,
    openGraph: { title, description, images: property.images.length > 0 ? [property.images[0]] : [] },
  };
}

function generateSEOTitle(p: BPProperty): string {
  const parts: string[] = [];
  if (p.bedrooms > 0) parts.push(`${p.bedrooms} Bedroom`);
  parts.push(p.type || 'Property');
  if (p.pool) parts.push('with Pool');
  parts.push(`in ${p.town}`);
  return parts.join(' ');
}

function generateHighlights(p: BPProperty): { label: string; value: string }[] {
  const h: { label: string; value: string }[] = [];
  if (p.bedrooms > 0) h.push({ label: 'Bedrooms', value: String(p.bedrooms) });
  if (p.bathrooms > 0) h.push({ label: 'Bathrooms', value: String(p.bathrooms) });
  if (p.builtArea > 0) h.push({ label: 'Built Area', value: `${p.builtArea}m²` });
  if (p.plotArea > 0) h.push({ label: 'Plot Size', value: `${p.plotArea}m²` });
  if (p.pool) h.push({ label: 'Pool', value: 'Private Pool' });
  if (p.views && p.views.toLowerCase() !== 'none') h.push({ label: 'Views', value: p.views });
  if (p.orientation && p.orientation.toLowerCase() !== 'none') h.push({ label: 'Orientation', value: p.orientation });
  return h;
}

function getAreaInfo(town: string): { nearbyAttractions: string[]; description: string } {
  const areas: Record<string, { nearbyAttractions: string[]; description: string }> = {
    'javea': { nearbyAttractions: ['Arenal Beach (5 min)', 'Montgo Natural Park (10 min)', 'Port of Javea (10 min)', 'Alicante Airport (80 min)'], description: 'Javea offers a perfect blend of traditional Spanish charm and modern amenities.' },
    'xabia': { nearbyAttractions: ['Arenal Beach (5 min)', 'Montgo Natural Park (10 min)', 'Port of Javea (10 min)', 'Alicante Airport (80 min)'], description: 'Jávea (Xàbia) offers a perfect blend of traditional Spanish charm and modern amenities.' },
    'moraira': { nearbyAttractions: ['El Portet Beach (5 min)', 'Moraira Castle (5 min)', 'Calpe (15 min)', 'Alicante Airport (75 min)'], description: 'Moraira is an exclusive coastal town known for beautiful coves and excellent restaurants.' },
    'calpe': { nearbyAttractions: ['Penon de Ifach (5 min)', 'La Fossa Beach (5 min)', 'Alicante Airport (65 min)'], description: 'Calpe is famous for the iconic Penon de Ifach rock and beautiful beaches.' },
    'altea': { nearbyAttractions: ['Altea Old Town (5 min)', 'La Roda Beach (5 min)', 'Alicante Airport (55 min)'], description: 'Altea is a picturesque town known for its whitewashed old quarter and artistic community.' },
    'benissa': { nearbyAttractions: ['Benissa Coast Walks (10 min)', 'Moraira (10 min)', 'Calpe (15 min)', 'Alicante Airport (70 min)'], description: 'Benissa offers stunning coastal walks and a charming historic center.' },
    'torrevieja': { nearbyAttractions: ['Salt Lakes (10 min)', 'Torrevieja Beach (5 min)', 'La Zenia Boulevard (15 min)', 'Alicante Airport (45 min)'], description: 'Torrevieja offers affordable beachside living with excellent amenities.' },
    'orihuela costa': { nearbyAttractions: ['Playa Flamenca Beach (5 min)', 'La Zenia Boulevard (10 min)', 'Villamartin Golf (10 min)', 'Alicante Airport (40 min)'], description: 'Orihuela Costa is popular for beach lovers and golfers.' },
    'guardamar del segura': { nearbyAttractions: ['Guardamar Dunes (5 min)', 'Guardamar Beach (5 min)', 'La Finca Golf (15 min)', 'Alicante Airport (40 min)'], description: 'Guardamar offers pristine beaches backed by pine forests.' },
  };
  const key = town.toLowerCase();
  return areas[key] || { nearbyAttractions: ['Local Beaches', 'Restaurants & Shops', 'Golf Courses', 'Alicante Airport'], description: `${town} is a wonderful location on the Costa Blanca.` };
}

const WHATSAPP_LINK = 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0';
const PHONE_NUMBER = '+34 634 044 970';
const HABENO_LINK = 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e';

export default async function PropertyPage({ params }: { params: { reference: string } }) {
  const property = await getPropertyByReference(params.reference);
  if (!property) notFound();

  const aiContent = loadAIContent(property.title);
  const title = aiContent?.metaTitle?.split(' - ')[0] || aiContent?.projectName || generateSEOTitle(property);
  const highlights = generateHighlights(property);
  const areaInfo = getAreaInfo(property.town);
  const mainImage = property.images[0] || '/images/placeholder-property.jpg';
  const additionalImages = property.images.slice(1, 5);
  const remainingCount = Math.max(0, property.images.length - 5);

  const productSchema = {
    '@context': 'https://schema.org', '@type': 'Product', name: title, image: property.images,
    description: aiContent?.content?.heroIntro || property.description || `New build ${property.type.toLowerCase()} for sale in ${property.town}.`,
    brand: { '@type': 'Brand', name: 'New Build Homes Costa Blanca' },
    offers: { '@type': 'Offer', url: `https://www.newbuildhomescostablanca.com/properties/${property.reference}`, priceCurrency: 'EUR', availability: 'https://schema.org/InStock', seller: { '@type': 'RealEstateAgent', name: 'New Build Homes Costa Blanca' } },
    address: { '@type': 'PostalAddress', addressLocality: property.town, addressRegion: 'Alicante', addressCountry: 'ES' },
    numberOfRooms: property.bedrooms, floorSize: { '@type': 'QuantitativeValue', value: property.builtArea, unitCode: 'MTK' },
  };

  const faqItems = aiContent?.content?.faqs || [
    { question: `What is the price of this property in ${property.town}?`, answer: 'For the latest pricing and availability, please contact us via WhatsApp at +34 634 044 970 or use our contact form.' },
    { question: 'Can I arrange a viewing of this property?', answer: 'Yes, we offer both in-person viewings and video tours. Contact us to schedule.' },
    { question: 'Is mortgage financing available for international buyers?', answer: 'Yes, Spanish banks offer mortgages to international buyers. EU residents can typically finance up to 80%, non-EU up to 70%.' },
    { question: 'What additional costs should I budget for?', answer: 'Budget approximately 13-14% on top of the purchase price including 10% IVA, 1.5% stamp duty, notary fees, land registry, and legal fees.' },
    { question: 'Do I need an NIE number to buy property in Spain?', answer: 'Yes, all foreign buyers need an NIE. This can be obtained at Spanish consulates abroad or in Spain.' },
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
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src={mainImage} alt={`${title} - Main view`} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 66vw" />
              </div>
              {additionalImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {additionalImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image src={img} alt={`${title} - View ${idx + 2}`} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 16vw" />
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                <p className="text-lg text-gray-600 mb-4">{property.town}, Costa Blanca</p>
                <div className="flex flex-wrap gap-4 mb-6">
                  {highlights.slice(0, 4).map((h, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                      <span className="font-semibold text-gray-900">{h.value}</span>
                      <span className="text-gray-500 text-sm">{h.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description Section - AI Content or Feed */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {aiContent ? `About ${aiContent.projectName || title}` : 'Property Description'}
                </h2>
                <div className="prose max-w-none text-gray-600">
                  {aiContent?.content?.heroIntro ? (
                    aiContent.content.heroIntro.split('\n\n').map((para: string, idx: number) => (
                      <p key={idx} className="mb-4">{para}</p>
                    ))
                  ) : property.description ? (
                    property.description.split('\n').filter(Boolean).map((para, idx) => (
                      <p key={idx} className="mb-4">{para}</p>
                    ))
                  ) : (
                    <p>This {property.bedrooms} bedroom {property.type.toLowerCase()} is located in the sought-after area of {property.town}. Contact us for full details and to arrange a viewing.</p>
                  )}
                </div>
              </div>

              {/* Location Section - AI Content or Generic */}
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
              {(aiContent?.content?.propertyFeatures || highlights.length > 4) && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Features</h2>
                  {aiContent?.content?.propertyFeatures?.intro && (
                    <p className="text-gray-600 mb-4">{aiContent.content.propertyFeatures.intro}</p>
                  )}
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(aiContent?.content?.propertyFeatures?.features || property.features || []).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <span className="text-blue-500">•</span> {feature}
                      </li>
                    ))}
                  </ul>
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">Interested in this property?</h3>
                <p className="text-gray-600 mb-6">Contact us for the latest pricing, availability, and to arrange a viewing.</p>
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
                </dl>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
