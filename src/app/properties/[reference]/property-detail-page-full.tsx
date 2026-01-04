import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPropertyByReference, fetchNewBuilds, BPProperty } from '@/lib/backgroundProperties';

export const revalidate = 3600;

// Standard contact info
const WHATSAPP_LINK = 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0';
const PHONE = '+34 634 044 970';
const HABENO_LINK = 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e';
const SITE_URL = 'https://www.newbuildhomescostablanca.com';

export async function generateStaticParams() {
  const properties = await fetchNewBuilds();
  return properties.slice(0, 50).map((p) => ({ reference: p.reference }));
}

// Safe string getter for XML data that might be object or string
function safeStr(val: unknown): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val !== null) {
    const obj = val as Record<string, unknown>;
    return String(obj.en || obj.es || Object.values(obj)[0] || '');
  }
  return String(val);
}

// Generate SEO-optimized H1 title
function generateTitle(p: BPProperty): string {
  const adjective = p.pool ? 'Stunning' : p.plotArea > 500 ? 'Spacious' : p.builtArea > 150 ? 'Impressive' : 'Modern';
  const viewsText = safeStr(p.views) && !safeStr(p.views).toLowerCase().includes('none') 
    ? ` with ${safeStr(p.views)} Views` : '';
  const poolText = p.pool && !viewsText ? ' with Private Pool' : '';
  return `${adjective} ${p.bedrooms} Bedroom ${p.type}${poolText}${viewsText} in ${p.town}`;
}

// Generate introduction paragraphs
function generateIntro(p: BPProperty): string[] {
  const location = p.zone ? `${p.zone}, ${p.town}` : p.town;
  const viewsStr = safeStr(p.views);
  const hasViews = viewsStr && !viewsStr.toLowerCase().includes('none');
  
  const para1 = p.pool
    ? `Discover this exceptional ${p.bedrooms} bedroom ${p.type.toLowerCase()} in ${location}, featuring a private pool and ${p.builtArea}m² of thoughtfully designed living space. This new build property represents the perfect opportunity to own your dream home on Spain's stunning Costa Blanca.`
    : hasViews
    ? `Welcome to this beautiful ${p.bedrooms} bedroom ${p.type.toLowerCase()} in ${location}, offering ${viewsStr.toLowerCase()} views and ${p.builtArea}m² of modern living space. This new build property combines contemporary design with the relaxed Mediterranean lifestyle Costa Blanca is famous for.`
    : `This impressive ${p.bedrooms} bedroom ${p.type.toLowerCase()} in ${location} offers ${p.builtArea}m² of contemporary living space in one of Costa Blanca's most desirable areas. As a new build property, it combines modern specifications with excellent value.`;

  const para2 = `Priced at €${p.price.toLocaleString()}, this property offers exceptional value for international buyers seeking a holiday home, permanent residence, or investment property in Spain. With ${p.bedrooms} bedrooms and ${p.bathrooms} bathrooms, it's perfectly suited for families, couples, or as a rental investment.`;

  return [para1, para2];
}

// Generate area description based on town
function generateAreaDescription(town: string): { title: string; paragraphs: string[] } {
  const areaInfo: Record<string, { lifestyle: string; amenities: string }> = {
    'Torrevieja': {
      lifestyle: "Torrevieja is one of Costa Blanca South's most popular destinations, known for its salt lakes, vibrant international community, and excellent amenities. The town offers a perfect blend of Spanish authenticity and expat-friendly services, with English widely spoken throughout.",
      amenities: "You'll find everything you need within easy reach: pristine Blue Flag beaches, the famous La Zenia Boulevard shopping center, multiple golf courses, and excellent healthcare facilities including Torrevieja University Hospital. The town hosts weekly markets, numerous restaurants, and a lively promenade perfect for evening strolls."
    },
    'Orihuela Costa': {
      lifestyle: "Orihuela Costa represents the epitome of Costa Blanca resort living, with its beautiful beaches, world-class golf courses, and thriving international community. Areas like Villamartín, La Zenia, and Playa Flamenca offer distinct characters while sharing excellent infrastructure.",
      amenities: "The area boasts some of the region's best amenities: La Zenia Boulevard (one of Europe's largest open-air shopping centers), five championship golf courses, pristine beaches, and the renowned Torrevieja Hospital. The blend of Spanish culture and international convenience makes daily life exceptionally comfortable."
    },
    'Guardamar del Segura': {
      lifestyle: "Guardamar del Segura offers an authentic Spanish lifestyle combined with 11 kilometers of pristine, uncrowded beaches. The town maintains its traditional character while welcoming international residents, making it ideal for those seeking genuine Mediterranean living.",
      amenities: "Beyond the spectacular beaches, Guardamar offers pine-forested dunes perfect for walking, the Laguna de La Mata nature reserve, excellent local restaurants, and all essential services. Its slightly quieter atmosphere appeals to buyers seeking tranquility without sacrificing convenience."
    },
    'Algorfa': {
      lifestyle: "Algorfa offers the perfect blend of authentic Spanish village life and modern amenities, centered around the prestigious La Finca Golf Resort. The area attracts golf enthusiasts from across Europe while maintaining a relaxed, community-focused atmosphere.",
      amenities: "With La Finca Golf on your doorstep, plus easy access to Guardamar beaches (15 minutes), La Zenia Boulevard shopping (20 minutes), and both Alicante and Murcia airports, Algorfa provides convenience without the bustle of coastal resort towns."
    }
  };

  const info = areaInfo[town] || {
    lifestyle: `${town} is a sought-after location on Spain's Costa Blanca, offering the Mediterranean lifestyle that attracts buyers from across Europe. The area combines Spanish authenticity with excellent amenities and infrastructure.`,
    amenities: `Residents enjoy easy access to beautiful beaches, golf courses, shopping facilities, and healthcare services. The Costa Blanca region offers over 300 days of sunshine annually, mild winters, and a welcoming international community.`
  };

  return {
    title: `Why ${town} is Perfect for Your Costa Blanca Home`,
    paragraphs: [info.lifestyle, info.amenities]
  };
}

// Generate proximity data based on town
function generateProximityData(town: string): Array<{ amenity: string; distance: string; time: string }> {
  const proximityByTown: Record<string, Array<{ amenity: string; distance: string; time: string }>> = {
    'Torrevieja': [
      { amenity: 'Beach', distance: '1-5 km', time: '5-10 min drive' },
      { amenity: 'Alicante Airport', distance: '45 km', time: '40 min drive' },
      { amenity: 'Murcia Airport', distance: '30 km', time: '25 min drive' },
      { amenity: 'La Zenia Boulevard', distance: '10 km', time: '12 min drive' },
      { amenity: 'Torrevieja Hospital', distance: '5 km', time: '10 min drive' },
      { amenity: 'Golf Courses', distance: '10-15 km', time: '15 min drive' },
    ],
    'Orihuela Costa': [
      { amenity: 'Beach', distance: '1-3 km', time: '5 min drive' },
      { amenity: 'Alicante Airport', distance: '50 km', time: '45 min drive' },
      { amenity: 'Murcia Airport', distance: '25 km', time: '20 min drive' },
      { amenity: 'La Zenia Boulevard', distance: '2-5 km', time: '5-10 min drive' },
      { amenity: 'Torrevieja Hospital', distance: '10 km', time: '15 min drive' },
      { amenity: 'Golf Courses', distance: '2-10 km', time: '5-15 min drive' },
    ],
  };

  return proximityByTown[town] || [
    { amenity: 'Beach', distance: '5-15 km', time: '10-20 min drive' },
    { amenity: 'Alicante Airport', distance: '40-60 km', time: '35-50 min drive' },
    { amenity: 'Murcia Airport', distance: '25-45 km', time: '20-40 min drive' },
    { amenity: 'Shopping Centers', distance: '5-15 km', time: '10-20 min drive' },
    { amenity: 'Hospital', distance: '10-20 km', time: '15-25 min drive' },
    { amenity: 'Golf Courses', distance: '10-20 km', time: '15-25 min drive' },
  ];
}

// Generate FAQ items for schema and display
function generateFAQs(p: BPProperty): Array<{ question: string; answer: string }> {
  const formattedPrice = `€${p.price.toLocaleString()}`;
  const location = p.zone ? `${p.zone}, ${p.town}` : p.town;
  
  return [
    {
      question: `What is the price of this ${p.type.toLowerCase()} in ${p.town}?`,
      answer: `This ${p.bedrooms} bedroom ${p.type.toLowerCase()} is priced at ${formattedPrice}. This price is for the property itself. Additional costs including 10% IVA (VAT), approximately 1.5% stamp duty (AJD), notary fees, and land registry fees typically add 13-14% to the purchase price.`
    },
    {
      question: `How many bedrooms and bathrooms does this property have?`,
      answer: `This property has ${p.bedrooms} bedrooms and ${p.bathrooms} bathrooms, with a built area of ${p.builtArea}m²${p.plotArea > 0 ? ` and a plot size of ${p.plotArea}m²` : ''}.`
    },
    {
      question: `Is mortgage financing available for international buyers?`,
      answer: `Yes, Spanish banks offer mortgages to international buyers. Non-EU residents can typically finance up to 70% of the purchase price, while EU residents may qualify for up to 80% financing. We partner with Habeno, a mortgage aggregator specializing in non-resident financing who can compare offers from multiple banks.`
    },
    {
      question: `What is the NIE number and do I need one?`,
      answer: `The NIE (Número de Identificación de Extranjero) is Spain's foreigner tax identification number, required for purchasing property, opening bank accounts, and paying taxes. All foreign buyers need an NIE. You can apply at Spanish consulates in your home country or in Spain with a lawyer's assistance. Processing typically takes 2-4 weeks.`
    },
    {
      question: `Can I use this property for holiday rentals?`,
      answer: `Holiday rental regulations vary by municipality in Costa Blanca. ${p.town} generally permits tourist rentals subject to obtaining the appropriate license. The area attracts strong rental demand from international visitors, particularly during summer months and the winter sun season. We can advise on rental potential and regulations for this specific property.`
    },
    {
      question: `What are the additional costs when buying property in Spain?`,
      answer: `For new build properties, expect approximately 13-14% in additional costs: 10% IVA (VAT), approximately 1.5% stamp duty (AJD), notary fees (€1,500-2,000), land registry fees (€800-1,200), and legal fees (typically 1-1.5% of purchase price). We recommend budgeting €${Math.round(p.price * 0.14).toLocaleString()} for a property at this price point.`
    },
    {
      question: `How do I arrange a viewing of this property?`,
      answer: `Contact us via WhatsApp at ${PHONE} for the fastest response, or call us directly. We can arrange in-person viewings at your convenience or organize a video tour if you're unable to visit in person. We'll guide you through every step of the viewing and buying process.`
    },
    {
      question: `What is the buying process for property in Spain?`,
      answer: `The typical process involves: 1) Property selection and reservation deposit, 2) NIE number application, 3) Spanish bank account opening, 4) Private purchase contract signing with 30-40% deposit, 5) Final payment and notary completion. From reservation to completion typically takes 4-8 weeks for ready properties. We guide international buyers through every step.`
    }
  ];
}

// Generate key benefits
function generateBenefits(p: BPProperty): string[] {
  const benefits: string[] = [];
  
  benefits.push(`Prime ${p.town} Location: Situated in one of Costa Blanca's most sought-after areas with excellent amenities and transport links.`);
  
  if (p.pool) {
    benefits.push(`Private Pool: Enjoy your own pool—a luxury feature that also enhances rental appeal and property value.`);
  }
  
  if (p.builtArea > 100) {
    benefits.push(`Generous Living Space: ${p.builtArea}m² of well-designed interior space provides comfortable living for families or entertaining guests.`);
  }
  
  const viewsStr = safeStr(p.views);
  if (viewsStr && !viewsStr.toLowerCase().includes('none')) {
    benefits.push(`${viewsStr} Views: Wake up to beautiful views that enhance daily living and add lasting value.`);
  }
  
  benefits.push(`New Build Quality: Modern construction with contemporary specifications, energy efficiency, and full builder warranties.`);
  benefits.push(`Investment Potential: Strong rental demand in ${p.town} from international visitors seeking holiday accommodation.`);
  benefits.push(`Mediterranean Lifestyle: Over 300 days of sunshine annually, mild winters, beautiful beaches, and a welcoming international community.`);
  
  return benefits.slice(0, 6);
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { reference: string } }): Promise<Metadata> {
  const property = await getPropertyByReference(params.reference);
  if (!property) return { title: 'Property Not Found' };
  
  const title = generateTitle(property);
  const price = property.price > 0 ? ` €${property.price.toLocaleString()}.` : '';
  const description = `${property.bedrooms} bedroom ${property.type.toLowerCase()} for sale in ${property.town}, Costa Blanca.${price} ${property.builtArea}m² built. ${property.pool ? 'Private pool. ' : ''}Contact for viewings.`;
  
  return { 
    title: `${title} | New Build Homes Costa Blanca`,
    description, 
    openGraph: { 
      title, 
      description, 
      images: property.images[0] ? [property.images[0]] : [],
      url: `${SITE_URL}/properties/${property.reference}`
    } 
  };
}

export default async function PropertyDetailPage({ params }: { params: { reference: string } }) {
  const property = await getPropertyByReference(params.reference);
  if (!property) notFound();

  const title = generateTitle(property);
  const intro = generateIntro(property);
  const areaInfo = generateAreaDescription(property.town);
  const proximityData = generateProximityData(property.town);
  const faqs = generateFAQs(property);
  const benefits = generateBenefits(property);
  const formattedPrice = property.price > 0 ? `€${property.price.toLocaleString()}` : 'Price on request';
  const location = property.zone ? `${property.zone}, ${property.town}` : property.town;

  // Schema markup
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": title,
    "image": property.images.slice(0, 5),
    "description": intro[0],
    "brand": { "@type": "Brand", "name": "New Build Homes Costa Blanca" },
    "offers": {
      "@type": "Offer",
      "url": `${SITE_URL}/properties/${property.reference}`,
      "priceCurrency": "EUR",
      "price": property.price,
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "RealEstateAgent", "name": "New Build Homes Costa Blanca" }
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.town,
      "addressRegion": "Alicante",
      "addressCountry": "ES"
    },
    "numberOfRooms": property.bedrooms,
    "floorSize": { "@type": "QuantitativeValue", "value": property.builtArea, "unitCode": "MTK" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Properties", "item": `${SITE_URL}/properties` },
      { "@type": "ListItem", "position": 3, "name": title, "item": `${SITE_URL}/properties/${property.reference}` }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "New Build Homes Costa Blanca",
    "image": `${SITE_URL}/logo.png`,
    "telephone": PHONE,
    "url": SITE_URL,
    "address": { "@type": "PostalAddress", "addressLocality": "Torrevieja", "addressRegion": "Alicante", "addressCountry": "ES" }
  };

  return (
    <>
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/properties" className="hover:text-blue-600">Properties</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{property.type} in {property.town}</span>
            </nav>
          </div>
        </div>

        {/* Hero Image Gallery */}
        <div className="bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div className="relative h-[300px] md:h-[500px]">
                <Image src={property.images[0] || '/images/placeholder.jpg'} alt={title} fill className="object-cover" priority />
              </div>
              <div className="hidden md:grid grid-cols-2 gap-1">
                {property.images.slice(1, 5).map((img, i) => (
                  <div key={i} className="relative h-[248px]">
                    <Image src={img} alt={`${title} - Image ${i + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Price */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                <p className="text-gray-600 text-lg mb-4">{location}, Costa Blanca</p>
                <div className="text-3xl font-bold text-blue-600 mb-4">{formattedPrice}</div>
                <div className="flex flex-wrap gap-4 text-gray-700">
                  <span className="flex items-center gap-2"><strong>{property.bedrooms}</strong> Bedrooms</span>
                  <span className="flex items-center gap-2"><strong>{property.bathrooms}</strong> Bathrooms</span>
                  <span className="flex items-center gap-2"><strong>{property.builtArea}m²</strong> Built</span>
                  {property.plotArea > 0 && <span className="flex items-center gap-2"><strong>{property.plotArea}m²</strong> Plot</span>}
                </div>
                {property.pool && <span className="inline-block mt-3 bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">Private Pool</span>}
              </div>

              {/* Introduction */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
                {intro.map((para, i) => (
                  <p key={i} className="text-gray-700 mb-4 leading-relaxed">{para}</p>
                ))}
                <p className="text-gray-700 leading-relaxed"><strong>For the latest availability and to arrange a viewing</strong>, please contact us below.</p>
              </div>

              {/* Location Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{areaInfo.title}</h2>
                {areaInfo.paragraphs.map((para, i) => (
                  <p key={i} className="text-gray-700 mb-4 leading-relaxed">{para}</p>
                ))}
                
                {/* Proximity Table */}
                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Proximity to Amenities</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Amenity</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Distance</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Travel Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proximityData.map((item, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="border border-gray-200 px-4 py-3">{item.amenity}</td>
                          <td className="border border-gray-200 px-4 py-3">{item.distance}</td>
                          <td className="border border-gray-200 px-4 py-3">{item.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.bedrooms > 0 && <div className="bg-gray-50 p-3 rounded-lg"><span className="font-medium">{property.bedrooms} Bedrooms</span></div>}
                  {property.bathrooms > 0 && <div className="bg-gray-50 p-3 rounded-lg"><span className="font-medium">{property.bathrooms} Bathrooms</span></div>}
                  {property.builtArea > 0 && <div className="bg-gray-50 p-3 rounded-lg"><span className="font-medium">{property.builtArea}m² Built</span></div>}
                  {property.plotArea > 0 && <div className="bg-gray-50 p-3 rounded-lg"><span className="font-medium">{property.plotArea}m² Plot</span></div>}
                  {property.pool && <div className="bg-cyan-50 p-3 rounded-lg text-cyan-800"><span className="font-medium">Private Pool</span></div>}
                  {safeStr(property.views) && !safeStr(property.views).toLowerCase().includes('none') && <div className="bg-gray-50 p-3 rounded-lg"><span className="font-medium">{safeStr(property.views)} Views</span></div>}
                  {safeStr(property.orientation) && <div className="bg-gray-50 p-3 rounded-lg"><span className="font-medium">{safeStr(property.orientation)} Facing</span></div>}
                  {property.energyRating && <div className="bg-gray-50 p-3 rounded-lg"><span className="font-medium">Energy: {property.energyRating}</span></div>}
                  <div className="bg-blue-50 p-3 rounded-lg text-blue-800"><span className="font-medium">New Build</span></div>
                </div>
                {property.features.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Additional Features</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {property.features.map((f, i) => (
                        <li key={i} className="text-gray-700 flex items-center gap-2">
                          <span className="text-blue-600">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Investment Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Investment & Costs</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Purchase Costs</h3>
                <p className="text-gray-700 mb-4">When purchasing property in Spain, budget approximately 13-14% in additional costs on top of the property price:</p>
                <table className="w-full border-collapse mb-6">
                  <tbody>
                    <tr className="border-b"><td className="py-2">IVA (VAT)</td><td className="py-2 text-right">10%</td><td className="py-2 text-right">€{Math.round(property.price * 0.10).toLocaleString()}</td></tr>
                    <tr className="border-b"><td className="py-2">Stamp Duty (AJD)</td><td className="py-2 text-right">~1.5%</td><td className="py-2 text-right">€{Math.round(property.price * 0.015).toLocaleString()}</td></tr>
                    <tr className="border-b"><td className="py-2">Notary & Registry</td><td className="py-2 text-right">Fixed</td><td className="py-2 text-right">€2,500-3,500</td></tr>
                    <tr className="border-b"><td className="py-2">Legal Fees</td><td className="py-2 text-right">~1%</td><td className="py-2 text-right">€{Math.round(property.price * 0.01).toLocaleString()}</td></tr>
                    <tr className="bg-gray-50 font-semibold"><td className="py-2">Total Additional</td><td className="py-2 text-right">~13-14%</td><td className="py-2 text-right">€{Math.round(property.price * 0.135).toLocaleString()}</td></tr>
                  </tbody>
                </table>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Mortgage Financing</h3>
                <p className="text-gray-700 mb-4">Spanish banks offer mortgages to international buyers. Non-EU residents typically qualify for up to 70% financing, while EU residents may secure up to 80%.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-800 mb-3"><strong>We partner with Habeno</strong>, a mortgage aggregator specializing in non-resident financing. They compare offers from multiple Spanish banks to secure the best rates for your situation.</p>
                  <a href={HABENO_LINK} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">Start Mortgage Application →</a>
                </div>
              </div>

              {/* Why Choose Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose This Property?</h2>
                <ol className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">{i + 1}</span>
                      <p className="text-gray-700"><strong>{benefit.split(':')[0]}:</strong>{benefit.split(':').slice(1).join(':')}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {faqs.map((faq, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-4">
                {/* Contact Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Interested in This Property?</h3>
                  <p className="text-gray-600 mb-6">Contact us for viewings, pricing, and availability.</p>
                  
                  <div className="space-y-3">
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition">
                      <span>📱</span> WhatsApp Us
                    </a>
                    <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition">
                      <span>📞</span> Call {PHONE}
                    </a>
                    <Link href="/contact" className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition">
                      <span>📧</span> Request Information
                    </Link>
                    <Link href="/contact?video=true" className="flex items-center justify-center gap-2 w-full border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition">
                      <span>🎥</span> Book Video Visit
                    </Link>
                  </div>
                </div>

                {/* Mortgage Card */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-sm p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">💰 Need Financing?</h3>
                  <p className="text-blue-100 mb-4 text-sm">Get pre-approved with our partner Habeno. Compare rates from multiple Spanish banks.</p>
                  <a href={HABENO_LINK} target="_blank" rel="noopener noreferrer" className="block w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-medium text-center hover:bg-blue-50 transition">
                    Start Application
                  </a>
                </div>

                {/* Quick Facts */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Quick Facts</h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between"><dt className="text-gray-500">Reference</dt><dd className="font-medium">{property.reference}</dd></div>
                    <div className="flex justify-between"><dt className="text-gray-500">Type</dt><dd className="font-medium">{property.type}</dd></div>
                    <div className="flex justify-between"><dt className="text-gray-500">Location</dt><dd className="font-medium">{property.town}</dd></div>
                    <div className="flex justify-between"><dt className="text-gray-500">Bedrooms</dt><dd className="font-medium">{property.bedrooms}</dd></div>
                    <div className="flex justify-between"><dt className="text-gray-500">Bathrooms</dt><dd className="font-medium">{property.bathrooms}</dd></div>
                    <div className="flex justify-between"><dt className="text-gray-500">Built Area</dt><dd className="font-medium">{property.builtArea}m²</dd></div>
                    {property.plotArea > 0 && <div className="flex justify-between"><dt className="text-gray-500">Plot Size</dt><dd className="font-medium">{property.plotArea}m²</dd></div>}
                    <div className="flex justify-between"><dt className="text-gray-500">Pool</dt><dd className="font-medium">{property.pool ? 'Yes' : 'No'}</dd></div>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Make This Property Yours?</h2>
              <p className="text-blue-100 mb-6">Our team is here to help with viewings, financing, legal guidance, and the entire purchase process. From your first inquiry to receiving your keys, we'll be with you every step of the way.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-600 transition">📱 WhatsApp Us</a>
                <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition">📞 Call Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
