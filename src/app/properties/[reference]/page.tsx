import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPropertyByReference, fetchNewBuilds, BPProperty } from '@/lib/backgroundProperties';

export const revalidate = 3600;

export async function generateStaticParams() {
  const properties = await fetchNewBuilds();
  return properties.map((property) => ({
    reference: property.reference,
  }));
}

export async function generateMetadata({ params }: { params: { reference: string } }): Promise<Metadata> {
  const property = await getPropertyByReference(params.reference);
  if (!property) return { title: 'Property Not Found' };
  const title = generateSEOTitle(property);
  const description = property.description 
    ? property.description.substring(0, 155) + '...'
    : `${property.bedrooms} bedroom ${property.type.toLowerCase()} for sale in ${property.town}, Costa Blanca.`;
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
    'moraira': { nearbyAttractions: ['El Portet Beach (5 min)', 'Moraira Castle (5 min)', 'Calpe (15 min)', 'Alicante Airport (75 min)'], description: 'Moraira is an exclusive coastal town known for beautiful coves and excellent restaurants.' },
    'calpe': { nearbyAttractions: ['Penon de Ifach (5 min)', 'La Fossa Beach (5 min)', 'Alicante Airport (65 min)'], description: 'Calpe is famous for the iconic Penon de Ifach rock and beautiful beaches.' },
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

  const title = generateSEOTitle(property);
  const highlights = generateHighlights(property);
  const areaInfo = getAreaInfo(property.town);
  const mainImage = property.images[0] || '/images/placeholder-property.jpg';

  const productSchema = {
    '@context': 'https://schema.org', '@type': 'Product', name: title, image: property.images,
    description: property.description || `New build ${property.type.toLowerCase()} for sale in ${property.town}.`,
    brand: { '@type': 'Brand', name: 'New Build Homes Costa Blanca' },
    offers: { '@type': 'Offer', url: `https://www.newbuildhomescostablanca.com/properties/${property.reference}`, priceCurrency: 'EUR', availability: 'https://schema.org/InStock', seller: { '@type': 'RealEstateAgent', name: 'New Build Homes Costa Blanca' } },
    address: { '@type': 'PostalAddress', addressLocality: property.town, addressRegion: 'Alicante', addressCountry: 'ES' },
    numberOfRooms: property.bedrooms, floorSize: { '@type': 'QuantitativeValue', value: property.builtArea, unitCode: 'MTK' },
  };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `What is the price of this property in ${property.town}?`, acceptedAnswer: { '@type': 'Answer', text: 'For the latest pricing and availability, please contact us via WhatsApp at +34 634 044 970 or use our contact form.' } },
      { '@type': 'Question', name: 'Can I arrange a viewing of this property?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we offer both in-person viewings and video tours. Contact us to schedule.' } },
      { '@type': 'Question', name: 'Is mortgage financing available for international buyers?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, Spanish banks offer mortgages to international buyers. EU residents can typically finance up to 80%, non-EU up to 70%.' } },
      { '@type': 'Question', name: 'What additional costs should I budget for?', acceptedAnswer: { '@type': 'Answer', text: 'Budget approximately 13-14% on top of the purchase price including 10% IVA, 1.5% stamp duty, notary fees, land registry, and legal fees.' } },
      { '@type': 'Question', name: 'Do I need an NIE number to buy property in Spain?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, all foreign buyers need an NIE. This can be obtained at Spanish consulates abroad or in Spain.' } },
      { '@type': 'Question', name: `What amenities are nearby in ${property.town}?`, acceptedAnswer: { '@type': 'Answer', text: `${property.town} offers excellent amenities including beaches, restaurants, shops, and healthcare facilities.` } },
      { '@type': 'Question', name: 'Can this property be used for holiday rentals?', acceptedAnswer: { '@type': 'Answer', text: 'Many new build properties can be rented out, subject to local regulations and tourist license requirements.' } },
      { '@type': 'Question', name: 'How long does the buying process take?', acceptedAnswer: { '@type': 'Answer', text: 'Off-plan properties can take 12-24 months. Key-ready properties can complete in 6-8 weeks.' } },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.newbuildhomescostablanca.com/' },
      { '@type': 'ListItem', position: 2, name: 'Properties', item: 'https://www.newbuildhomescostablanca.com/properties/' },
      { '@type': 'ListItem', position: 3, name: property.town, item: `https://www.newbuildhomescostablanca.com/properties/?town=${encodeURIComponent(property.town)}` },
      { '@type': 'ListItem', position: 4, name: property.reference, item: `https://www.newbuildhomescostablanca.com/properties/${property.reference}` },
    ],
  };

  const localBusinessSchema = { '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: 'New Build Homes Costa Blanca', telephone: PHONE_NUMBER, url: 'https://www.newbuildhomescostablanca.com' };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

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

        {/* Hero with Image Gallery */}
        <section className="bg-slate-900">
          <div className="container mx-auto px-4 py-8">
            {property.images.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                  <Image src={mainImage} alt={title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 66vw" />
                </div>
                <div className="grid grid-cols-2 gap-2 lg:gap-4">
                  {property.images.slice(1, 5).map((img, index) => (
                    <div key={index} className="relative h-[120px] lg:h-[118px] rounded-lg overflow-hidden">
                      <Image src={img} alt={`${title} - Image ${index + 2}`} fill className="object-cover hover:scale-105 transition-transform cursor-pointer" sizes="25vw" />
                    </div>
                  ))}
                  {property.images.length > 5 && (
                    <div className="relative h-[120px] lg:h-[118px] rounded-lg overflow-hidden bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors">
                      <div className="text-center text-white">
                        <span className="text-sm font-medium">+{property.images.length - 5} Photos</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative h-[400px] rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center">
                <p className="text-slate-400">No images available</p>
              </div>
            )}
            <div className="mt-6 text-white">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{title}</h1>
              <p className="text-xl text-amber-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
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
            <div className="lg:col-span-2 space-y-8">
              {/* Property Description - ACTUAL FEED DESCRIPTION */}
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">About This Property</h2>
                {property.description ? (
                  <div className="prose prose-slate max-w-none">
                    {property.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-slate-600 mb-4 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 leading-relaxed">
                    This {property.bedrooms} bedroom {property.type.toLowerCase()} is located in {property.town}, Costa Blanca.
                    {property.pool && ' The property includes a private swimming pool.'}
                    {property.builtArea > 0 && ` With ${property.builtArea}m² of built space`}
                    {property.plotArea > 0 && ` on a ${property.plotArea}m² plot`}.
                    Contact us today for more information.
                  </p>
                )}
              </section>

              {/* Property Features */}
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Property Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">🛏️</div>
                      <div><p className="text-sm text-slate-500">Bedrooms</p><p className="font-semibold text-slate-800">{property.bedrooms}</p></div>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">🚿</div>
                      <div><p className="text-sm text-slate-500">Bathrooms</p><p className="font-semibold text-slate-800">{property.bathrooms}</p></div>
                    </div>
                  )}
                  {property.builtArea > 0 && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">📐</div>
                      <div><p className="text-sm text-slate-500">Built Area</p><p className="font-semibold text-slate-800">{property.builtArea}m²</p></div>
                    </div>
                  )}
                  {property.plotArea > 0 && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">🏞️</div>
                      <div><p className="text-sm text-slate-500">Plot Size</p><p className="font-semibold text-slate-800">{property.plotArea}m²</p></div>
                    </div>
                  )}
                  {property.pool && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">🏊</div>
                      <div><p className="text-sm text-slate-500">Pool</p><p className="font-semibold text-slate-800">Private Pool</p></div>
                    </div>
                  )}
                  {property.views && property.views.toLowerCase() !== 'none' && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">👀</div>
                      <div><p className="text-sm text-slate-500">Views</p><p className="font-semibold text-slate-800">{property.views}</p></div>
                    </div>
                  )}
                </div>
              </section>

              {/* Location */}
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Location: {property.town}</h2>
                <p className="text-slate-600 mb-6">{areaInfo.description}</p>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Nearby Attractions</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {areaInfo.nearbyAttractions.map((attraction, index) => (
                    <li key={index} className="flex items-center gap-2 text-slate-600">📍 {attraction}</li>
                  ))}
                </ul>
              </section>

              {/* Buying Costs */}
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Buying Costs in Spain</h2>
                <p className="text-slate-600 mb-4">Budget approximately 13-14% on top of the purchase price:</p>
                <table className="w-full text-left">
                  <tbody className="text-slate-600">
                    <tr className="border-b"><td className="py-2">IVA (Spanish VAT)</td><td className="py-2">10%</td></tr>
                    <tr className="border-b"><td className="py-2">AJD (Stamp Duty)</td><td className="py-2">~1.5%</td></tr>
                    <tr className="border-b"><td className="py-2">Notary Fees</td><td className="py-2">€1,000 - €2,000</td></tr>
                    <tr className="border-b"><td className="py-2">Land Registry</td><td className="py-2">€500 - €1,000</td></tr>
                    <tr className="border-b"><td className="py-2">Legal Fees</td><td className="py-2">1 - 1.5%</td></tr>
                    <tr className="font-semibold text-slate-800"><td className="py-2">Total Additional Costs</td><td className="py-2">~13-14%</td></tr>
                  </tbody>
                </table>
                <div className="mt-4">
                  <Link href="/guides/costs-taxes" className="text-amber-600 hover:text-amber-700 font-medium">Read our full guide to buying costs →</Link>
                </div>
              </section>

              {/* FAQ */}
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqSchema.mainEntity.map((faq, index) => (
                    <details key={index} className="group border-b pb-4">
                      <summary className="flex justify-between items-center cursor-pointer list-none">
                        <h3 className="text-lg font-medium text-slate-800 pr-4">{faq.name}</h3>
                        <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600">{faq.acceptedAnswer.text}</p>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-amber-200">
                  <div className="text-center mb-6">
                    <p className="text-sm text-slate-500 mb-1">Contact us for</p>
                    <p className="text-2xl font-bold text-amber-600">Latest Price & Availability</p>
                  </div>
                  <div className="space-y-3">
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">📱 WhatsApp Us</a>
                    <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors">📞 Call {PHONE_NUMBER}</a>
                    <Link href="/contact" className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">💬 Request Information</Link>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Need Financing?</h3>
                  <p className="text-sm text-slate-600 mb-4">We partner with Habeno to compare offers from multiple Spanish banks.</p>
                  <a href={HABENO_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">💰 Start Mortgage Application</a>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Helpful Guides</h3>
                  <ul className="space-y-3">
                    <li><Link href="/guides/buying-process" className="flex items-center gap-2 text-slate-600 hover:text-amber-600">→ Buying Process Guide</Link></li>
                    <li><Link href="/guides/nie-number" className="flex items-center gap-2 text-slate-600 hover:text-amber-600">→ NIE Number Application</Link></li>
                    <li><Link href="/guides/mortgage" className="flex items-center gap-2 text-slate-600 hover:text-amber-600">→ Mortgage Guide</Link></li>
                    <li><Link href="/guides/costs-taxes" className="flex items-center gap-2 text-slate-600 hover:text-amber-600">→ Costs & Taxes</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="bg-slate-800 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Interested in This Property?</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">Contact us today for the latest availability and pricing.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">📱 WhatsApp Us</a>
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-semibold py-3 px-6 rounded-lg transition-colors">📞 Call Now</a>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">✉️ Request Info</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
