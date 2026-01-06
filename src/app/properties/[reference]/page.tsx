import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPropertyByReference, fetchNewBuilds, BackgroundProperty } from '@/lib/backgroundProperties';

export const revalidate = 3600;

export async function generateStaticParams() {
  const properties = await fetchNewBuilds();
  return properties.slice(0, 50).map((p) => ({ reference: p.reference }));
}

function generateTitle(property: BackgroundProperty): string {
  const adjectives = ['Stunning', 'Beautiful', 'Modern', 'Elegant', 'Spacious', 'Luxurious'];
  const adjective = adjectives[Math.abs(property.reference.charCodeAt(0)) % adjectives.length];
  const beds = property.bedrooms > 0 ? `${property.bedrooms} Bedroom ` : '';
  const type = property.type || 'Property';
  let feature = '';
  if (property.pool) feature = ' with Private Pool';
  else if (property.views?.toLowerCase().includes('sea')) feature = ' with Sea Views';
  else if (property.views?.toLowerCase().includes('mountain')) feature = ' with Mountain Views';
  else if (property.builtArea > 200) feature = ' with Spacious Living';
  return `${adjective} ${beds}${type}${feature} in ${property.town || 'Costa Blanca'}`;
}

function generateIntro(property: BackgroundProperty): string[] {
  const intro1 = property.type === 'Villa'
    ? `Discover this exceptional ${property.bedrooms} bedroom villa in ${property.town}, offering the perfect combination of modern comfort and Mediterranean lifestyle. ${property.builtArea > 0 ? `With ${property.builtArea}m² of thoughtfully designed living space` : 'Thoughtfully designed'}${property.plotArea > 0 ? ` on a generous ${property.plotArea}m² plot` : ''}, this property represents an outstanding opportunity to own your dream home on the Costa Blanca.`
    : `Welcome to this impressive ${property.bedrooms} bedroom ${property.type?.toLowerCase() || 'property'} located in the sought-after area of ${property.town}. ${property.builtArea > 0 ? `Spanning ${property.builtArea}m² of well-appointed living space, ` : ''}This new build property combines quality construction with contemporary design.`;
  const intro2 = property.pool
    ? `A standout feature is the private swimming pool, ideal for enjoying the famous Costa Blanca sunshine. Combined with ${property.views ? property.views.toLowerCase() + ' views' : 'excellent outdoor spaces'}, this property offers everything you need for comfortable Spanish living.`
    : `${property.views && property.views.toLowerCase() !== 'none' ? `Enjoy ${property.views.toLowerCase()} views from this privileged position. ` : ''}This property benefits from quality finishes throughout and is ready to become your perfect Spanish home.`;
  return [intro1, intro2];
}

function getAreaDescription(town: string): { title: string; description: string; amenities: string } {
  const areas: Record<string, { title: string; description: string; amenities: string }> = {
    'Javea': { title: 'Why Javea is Perfect for Your Costa Blanca Home', description: 'Javea (Xàbia) is one of the most prestigious locations on the Costa Blanca, beloved by discerning buyers from across Europe. This beautiful coastal town offers a perfect blend of traditional Spanish charm and modern amenities.', amenities: 'Javea offers excellent international schools, a modern hospital, diverse dining, world-class golf courses, marinas, and pristine beaches.' },
    'Moraira': { title: 'Why Moraira is Perfect for Your Costa Blanca Home', description: 'Moraira is an exclusive coastal gem on the Costa Blanca North, known for its upscale atmosphere and stunning natural beauty. Originally a fishing village, it has evolved into one of Spain\'s most desirable residential areas.', amenities: 'Despite its intimate size, Moraira offers excellent amenities including a weekly market, quality restaurants, boutique shops, and a yacht club.' },
    'Calpe': { title: 'Why Calpe is Perfect for Your Costa Blanca Home', description: 'Calpe is dominated by the iconic Peñón de Ifach rock, providing a dramatic backdrop to this vibrant coastal town. The town offers an excellent balance of tourist amenities and authentic Spanish life.', amenities: 'Calpe features excellent beaches including the Blue Flag Arenal-Bol, a traditional fish market, diverse restaurants, and healthcare facilities.' },
    'Torrevieja': { title: 'Why Torrevieja is Perfect for Your Costa Blanca Home', description: 'Torrevieja is one of the Costa Blanca South\'s most popular destinations, famous for its salt lakes, excellent beaches, and vibrant international community.', amenities: 'Torrevieja boasts a modern hospital, diverse shopping including Habaneras center, extensive beaches, a busy marina, and hundreds of restaurants.' },
    'Orihuela Costa': { title: 'Why Orihuela Costa is Perfect for Your Costa Blanca Home', description: 'Orihuela Costa encompasses several popular urbanizations including La Zenia, Playa Flamenca, and Villamartín. This area is renowned for its golf courses and beaches.', amenities: 'The area offers championship golf courses, Blue Flag beaches, La Zenia Boulevard shopping center, and excellent healthcare.' },
    'Guardamar del Segura': { title: 'Why Guardamar is Perfect for Your Costa Blanca Home', description: 'Guardamar del Segura offers a more authentic Spanish experience with 11 kilometers of pristine dune-backed beaches and extensive pine forests.', amenities: 'Guardamar features excellent beaches, a traditional Spanish town center with weekly markets, good restaurants, and nature reserves.' },
  };
  return areas[town] || { title: `Why ${town} is Perfect for Your Costa Blanca Home`, description: `${town} is a wonderful location on Spain's Costa Blanca, offering an excellent quality of life with Mediterranean climate, beautiful surroundings, and welcoming community.`, amenities: `${town} offers good local amenities including shops, restaurants, and services with proximity to beaches and golf courses.` };
}

function getProximityData(town: string): { name: string; distance: string; time: string }[] {
  const data: Record<string, { name: string; distance: string; time: string }[]> = {
    'Javea': [{ name: 'Arenal Beach', distance: '2 km', time: '5 min' }, { name: 'Alicante Airport', distance: '90 km', time: '60 min' }, { name: 'Hospital Denia', distance: '10 km', time: '12 min' }, { name: 'La Sella Golf', distance: '15 km', time: '15 min' }],
    'Moraira': [{ name: 'Moraira Beach', distance: '1 km', time: '3 min' }, { name: 'Alicante Airport', distance: '85 km', time: '55 min' }, { name: 'Hospital Denia', distance: '15 km', time: '15 min' }],
    'Torrevieja': [{ name: 'Beach', distance: '1 km', time: '3 min' }, { name: 'Alicante Airport', distance: '45 km', time: '35 min' }, { name: 'Murcia Airport', distance: '35 km', time: '30 min' }, { name: 'Hospital', distance: '3 km', time: '7 min' }],
  };
  return data[town] || [{ name: 'Beach', distance: '5-15 km', time: '10-20 min' }, { name: 'Alicante Airport', distance: '50-90 km', time: '40-70 min' }, { name: 'Hospital', distance: '10-20 km', time: '15-20 min' }];
}

function generateFAQs(property: BackgroundProperty): { question: string; answer: string }[] {
  const price = property.price > 0 ? `€${property.price.toLocaleString()}` : 'Contact us for current pricing';
  const town = property.town || 'this area';
  return [
    { question: 'What is the price of this property?', answer: `This property is priced at ${price}. Additional costs including IVA (10%), stamp duty (~1.5%), notary, registry, and legal fees typically add 13-14% to the purchase price.` },
    { question: 'How many bedrooms and bathrooms does this property have?', answer: `This ${property.type?.toLowerCase() || 'property'} features ${property.bedrooms} bedroom${property.bedrooms !== 1 ? 's' : ''} and ${property.bathrooms} bathroom${property.bathrooms !== 1 ? 's' : ''}${property.builtArea > 0 ? `, with ${property.builtArea}m² of built area` : ''}.` },
    { question: 'Is mortgage financing available for international buyers?', answer: 'Yes, Spanish banks offer mortgages to international buyers. Non-EU residents can typically finance up to 70%, while EU residents may qualify for up to 80%. We work with Habeno, a mortgage aggregator who can compare offers from multiple Spanish banks.' },
    { question: 'What is an NIE number and do I need one?', answer: 'The NIE (Número de Identificación de Extranjero) is Spain\'s foreigner identification number, required for all property purchases. You can apply at Spanish consulates abroad or in Spain. Processing typically takes 2-4 weeks.' },
    { question: 'Can I rent out this property when not using it?', answer: `Yes, holiday rentals are generally permitted in ${town}. The Costa Blanca's year-round tourism creates strong rental demand. Local property management companies can handle rentals for 15-20% of gross income.` },
    { question: 'What are the additional costs when buying property in Spain?', answer: 'For new build properties, budget approximately 13-14% on top of the purchase price: IVA (VAT) at 10%, Stamp Duty at ~1.5%, notary fees €1,500-2,000, land registry €800-1,200, and legal fees at ~1%.' },
    { question: 'How can I arrange a viewing of this property?', answer: 'Contact us via WhatsApp at +34 634 044 970 for the quickest response, or call us directly. We can arrange in-person viewings or video tours if you can\'t visit immediately.' },
    { question: 'What is the buying process for property in Spain?', answer: 'The process typically takes 6-12 weeks: 1) Reserve with a deposit, 2) Apply for NIE number, 3) Open Spanish bank account, 4) Sign private purchase contract with 10% deposit, 5) Complete due diligence, 6) Sign at notary and receive keys.' }
  ];
}

function generateBenefits(property: BackgroundProperty): string[] {
  const benefits: string[] = [];
  if (property.bedrooms >= 3) benefits.push('Spacious family accommodation');
  if (property.pool) benefits.push('Private swimming pool included');
  if (property.views?.toLowerCase().includes('sea')) benefits.push('Stunning sea views');
  if (property.builtArea > 150) benefits.push('Generous living space');
  if (property.plotArea > 300) benefits.push('Large private plot');
  benefits.push('New build quality with modern finishes', 'Costa Blanca\'s excellent climate', 'Strong investment potential', 'Professional support throughout purchase');
  return benefits.slice(0, 6);
}

export async function generateMetadata({ params }: { params: { reference: string } }): Promise<Metadata> {
  const property = await getPropertyByReference(params.reference);
  if (!property) return { title: 'Property Not Found' };
  const title = generateTitle(property);
  const description = `${property.bedrooms} bedroom ${property.type?.toLowerCase() || 'property'} for sale in ${property.town}. ${property.builtArea > 0 ? `${property.builtArea}m² built.` : ''} ${property.pool ? 'Private pool.' : ''} ${property.price > 0 ? `€${property.price.toLocaleString()}.` : ''}`;
  return { title: `${title} | New Build Costa Blanca`, description, openGraph: { title, description, images: property.images[0] ? [property.images[0]] : [] } };
}

export default async function PropertyDetailPage({ params }: { params: { reference: string } }) {
  const property = await getPropertyByReference(params.reference);
  if (!property) notFound();

  const title = generateTitle(property);
  const [intro1, intro2] = generateIntro(property);
  const areaInfo = getAreaDescription(property.town);
  const proximityData = getProximityData(property.town);
  const faqs = generateFAQs(property);
  const benefits = generateBenefits(property);
  const mainImage = property.images[0] || '/images/placeholder-property.jpg';

  const productSchema = { "@context": "https://schema.org/", "@type": "Product", "name": title, "image": property.images.slice(0, 5), "description": intro1, "brand": { "@type": "Brand", "name": "New Build Homes Costa Blanca" }, "offers": { "@type": "Offer", "priceCurrency": "EUR", "price": property.price > 0 ? property.price : undefined, "availability": "https://schema.org/InStock" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })) };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.newbuildhomescostablanca.com/" }, { "@type": "ListItem", "position": 2, "name": "Properties", "item": "https://www.newbuildhomescostablanca.com/properties/" }, { "@type": "ListItem", "position": 3, "name": title }] };
  const localBusinessSchema = { "@context": "https://schema.org", "@type": "RealEstateAgent", "name": "New Build Homes Costa Blanca", "telephone": "+34634044970", "url": "https://www.newbuildhomescostablanca.com" };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <div className="min-h-screen bg-slate-50">
        {/* Breadcrumb */}
        <nav className="bg-white border-b border-slate-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
            <Link href="/" className="text-amber-600 hover:text-amber-700">Home</Link>
            <span className="text-slate-400">/</span>
            <Link href="/properties" className="text-amber-600 hover:text-amber-700">Properties</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600 truncate max-w-xs">{property.reference}</span>
          </div>
        </nav>

        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[60vh] bg-slate-900">
          <Image src={mainImage} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">{title}</h1>
              <div className="flex flex-wrap gap-4 text-white/90">
                {property.bedrooms > 0 && <span className="flex items-center gap-1"><span className="font-semibold">{property.bedrooms}</span> Beds</span>}
                {property.bathrooms > 0 && <span className="flex items-center gap-1"><span className="font-semibold">{property.bathrooms}</span> Baths</span>}
                {property.builtArea > 0 && <span className="flex items-center gap-1"><span className="font-semibold">{property.builtArea}</span> m²</span>}
                {property.pool && <span className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded text-sm">Pool</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        {property.images.length > 1 && (
          <div className="bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {property.images.slice(0, 8).map((img, i) => (
                  <div key={i} className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover hover:scale-110 transition-transform cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Price Card Mobile */}
              <div className="lg:hidden bg-white rounded-xl shadow-lg p-6">
                <div className="text-3xl font-bold text-amber-600 mb-2">
                  {property.price > 0 ? `€${property.price.toLocaleString()}` : 'Contact for Price'}
                </div>
                <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-semibold mb-2">WhatsApp Us</a>
                <a href="tel:+34634044970" className="block w-full bg-amber-500 hover:bg-amber-600 text-white text-center py-3 rounded-lg font-semibold">Call +34 634 044 970</a>
              </div>

              {/* About */}
              <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">About This Property</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">{intro1}</p>
                <p className="text-slate-600 leading-relaxed">{intro2}</p>
              </section>

              {/* Mid CTA */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Interested in This Property?</h3>
                <p className="mb-4 opacity-90">Get the latest availability and pricing - contact us today.</p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" className="bg-white text-amber-600 px-6 py-2 rounded-lg font-semibold hover:bg-amber-50">WhatsApp Us</a>
                  <a href="tel:+34634044970" className="border-2 border-white px-6 py-2 rounded-lg font-semibold hover:bg-white/10">Call Now</a>
                </div>
              </div>

              {/* Area Section */}
              <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">{areaInfo.title}</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">{areaInfo.description}</p>
                <p className="text-slate-600 leading-relaxed">{areaInfo.amenities}</p>
                
                {/* Proximity Table */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Proximity to Amenities</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="text-left p-3 font-semibold text-slate-700">Location</th>
                          <th className="text-left p-3 font-semibold text-slate-700">Distance</th>
                          <th className="text-left p-3 font-semibold text-slate-700">Drive Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proximityData.map((item, i) => (
                          <tr key={i} className="border-b border-slate-100">
                            <td className="p-3 text-slate-600">{item.name}</td>
                            <td className="p-3 text-slate-600">{item.distance}</td>
                            <td className="p-3 text-slate-600">{item.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Features */}
              <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Property Features</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {property.bedrooms > 0 && <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><span className="text-amber-500 text-xl">🛏️</span><div><div className="font-semibold text-slate-800">{property.bedrooms} Bedrooms</div></div></div>}
                  {property.bathrooms > 0 && <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><span className="text-amber-500 text-xl">🚿</span><div><div className="font-semibold text-slate-800">{property.bathrooms} Bathrooms</div></div></div>}
                  {property.builtArea > 0 && <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><span className="text-amber-500 text-xl">📐</span><div><div className="font-semibold text-slate-800">{property.builtArea} m² Built</div></div></div>}
                  {property.plotArea > 0 && <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><span className="text-amber-500 text-xl">🏡</span><div><div className="font-semibold text-slate-800">{property.plotArea} m² Plot</div></div></div>}
                  {property.pool && <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><span className="text-amber-500 text-xl">🏊</span><div><div className="font-semibold text-slate-800">Private Pool</div></div></div>}
                  {property.views && property.views.toLowerCase() !== 'none' && <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><span className="text-amber-500 text-xl">🌅</span><div><div className="font-semibold text-slate-800">{property.views}</div></div></div>}
                </div>
              </section>

              {/* Investment */}
              <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Investment &amp; Costs</h2>
                <p className="text-slate-600 mb-4">When purchasing property in Spain, budget approximately 13-14% in additional costs:</p>
                <table className="w-full text-sm mb-6">
                  <tbody>
                    <tr className="border-b"><td className="py-2 text-slate-600">IVA (VAT)</td><td className="py-2 text-right font-semibold">10%</td></tr>
                    <tr className="border-b"><td className="py-2 text-slate-600">Stamp Duty (AJD)</td><td className="py-2 text-right font-semibold">~1.5%</td></tr>
                    <tr className="border-b"><td className="py-2 text-slate-600">Notary Fees</td><td className="py-2 text-right font-semibold">€1,500-2,500</td></tr>
                    <tr className="border-b"><td className="py-2 text-slate-600">Land Registry</td><td className="py-2 text-right font-semibold">€800-1,200</td></tr>
                    <tr><td className="py-2 text-slate-600">Legal Fees</td><td className="py-2 text-right font-semibold">~1%</td></tr>
                  </tbody>
                </table>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h3 className="font-semibold text-amber-800 mb-2">Need Financing?</h3>
                  <p className="text-amber-700 text-sm mb-3">We work with Habeno, a mortgage aggregator who can compare offers from multiple Spanish banks.</p>
                  <a href="https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e" className="inline-block bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600">Start Mortgage Application</a>
                </div>
              </section>

              {/* Benefits */}
              <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Why Choose This Property?</h2>
                <ul className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-amber-500 mt-1">✓</span>
                      <span className="text-slate-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* FAQs */}
              <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-slate-100 pb-4 last:border-0">
                      <h3 className="font-semibold text-slate-800 mb-2">{faq.question}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Bottom CTA */}
              <section className="bg-slate-800 rounded-xl p-6 md:p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Ready to View This Property?</h2>
                <p className="mb-6 opacity-90">Contact us today for the latest availability, pricing, and to arrange a viewing.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 py-3 px-6 rounded-lg font-semibold">
                    <span>📱</span> WhatsApp Us
                  </a>
                  <a href="tel:+34634044970" className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 py-3 px-6 rounded-lg font-semibold">
                    <span>📞</span> Call +34 634 044 970
                  </a>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20 text-center">
                  <p className="text-sm opacity-75 mb-2">Need financing?</p>
                  <a href="https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e" className="text-amber-400 hover:text-amber-300 font-semibold">Start Mortgage Application with Habeno →</a>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-4 space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-3xl font-bold text-amber-600 mb-1">
                    {property.price > 0 ? `€${property.price.toLocaleString()}` : 'Contact for Price'}
                  </div>
                  <p className="text-slate-500 text-sm mb-4">Ref: {property.reference}</p>
                  <div className="space-y-3 mb-6">
                    {property.bedrooms > 0 && <div className="flex justify-between text-sm"><span className="text-slate-500">Bedrooms</span><span className="font-semibold">{property.bedrooms}</span></div>}
                    {property.bathrooms > 0 && <div className="flex justify-between text-sm"><span className="text-slate-500">Bathrooms</span><span className="font-semibold">{property.bathrooms}</span></div>}
                    {property.builtArea > 0 && <div className="flex justify-between text-sm"><span className="text-slate-500">Built Area</span><span className="font-semibold">{property.builtArea} m²</span></div>}
                    {property.plotArea > 0 && <div className="flex justify-between text-sm"><span className="text-slate-500">Plot Size</span><span className="font-semibold">{property.plotArea} m²</span></div>}
                    <div className="flex justify-between text-sm"><span className="text-slate-500">Location</span><span className="font-semibold">{property.town}</span></div>
                  </div>
                  <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-semibold mb-2">WhatsApp Us</a>
                  <a href="tel:+34634044970" className="block w-full bg-amber-500 hover:bg-amber-600 text-white text-center py-3 rounded-lg font-semibold mb-2">Call +34 634 044 970</a>
                  <a href="#" className="block w-full border-2 border-slate-300 text-slate-700 text-center py-3 rounded-lg font-semibold hover:bg-slate-50">Book Video Visit</a>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h3 className="font-semibold text-amber-800 mb-2">Need a Mortgage?</h3>
                  <p className="text-amber-700 text-sm mb-3">Get pre-approved with our partner Habeno.</p>
                  <a href="https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e" className="block w-full bg-amber-500 hover:bg-amber-600 text-white text-center py-2 rounded-lg text-sm font-semibold">Start Application</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
