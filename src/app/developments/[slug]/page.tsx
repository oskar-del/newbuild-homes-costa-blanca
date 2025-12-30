import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import LeadForm from '@/components/LeadForm';
import path from 'path';

// Contact info
const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  habeno: 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e',
};

interface DevelopmentContent {
  slug: string;
  projectName: string;
  metaTitle: string;
  metaDescription: string;
  content: {
    heroIntro: string;
    locationSection: {
      intro: string;
      highlights: string[];
    };
    propertyFeatures: {
      intro: string;
      features: string[];
    };
    investmentSection: string;
    whyBuySection: string[];
    faqs: { question: string; answer: string }[];
    conclusion: string;
  };
  property: {
    ref: string;
    price: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    builtSize: number | null;
    plotSize: number | null;
    town: string;
    province: string;
    propertyType: string;
    developer: string;
    developerSlug: string;
    images: string[];
  };
  schemaProduct: object;
  schemaFAQ: object;
  schemaBreadcrumb: object;
  imageAlts: { url: string; alt: string }[];
}

function getContent(slug: string): DevelopmentContent | null {
  const contentPath = path.join(process.cwd(), 'src', 'content', 'developments', `${slug}.json`);
  
  if (!fs.existsSync(contentPath)) {
    return null;
  }
  
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
  return content;
}

function getAllSlugs(): string[] {
  const contentDir = path.join(process.cwd(), 'src', 'content', 'developments');
  
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  
  return fs.readdirSync(contentDir)
    .filter(file => file.endsWith('.json') && file !== 'index.json')
    .map(file => file.replace('.json', ''));
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getContent(slug);
  
  if (!data) {
    return { title: 'Property Not Found' };
  }
  
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      images: data.property.images.slice(0, 3),
    },
  };
}

export default async function DevelopmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getContent(slug);
  
  if (!data) {
    notFound();
  }
  
  const { content, property, schemaProduct, schemaFAQ, schemaBreadcrumb, imageAlts } = data;
  
  const getAlt = (url: string, index: number) => {
    const found = imageAlts.find(a => a.url === url);
    return found?.alt || `${data.projectName} - Image ${index + 1}`;
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px]">
          {property.images[0] && (
            <Image
              src={property.images[0]}
              alt={getAlt(property.images[0], 0)}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-6xl mx-auto">
              {/* Breadcrumb */}
              <nav className="text-white/80 text-sm mb-4">
                <Link href="/" className="hover:text-white">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/developments" className="hover:text-white">Developments</Link>
                <span className="mx-2">›</span>
                <span className="text-white">{data.projectName}</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {data.projectName}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-white">
                <span className="flex items-center gap-1">
                  📍 {property.town}, {property.province}
                </span>
                {property.bedrooms && (
                  <span className="flex items-center gap-1">
                    🛏️ {property.bedrooms} Bedrooms
                  </span>
                )}
                {property.bathrooms && (
                  <span className="flex items-center gap-1">
                    🚿 {property.bathrooms} Bathrooms
                  </span>
                )}
                {property.builtSize && (
                  <span className="flex items-center gap-1">
                    📐 {property.builtSize} m² Built
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Hero Intro */}
              <section>
                <div className="prose prose-lg max-w-none">
                  {content.heroIntro.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-700 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Image Gallery */}
              {property.images.length > 1 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.images.slice(1, 10).map((image, i) => (
                      <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={getAlt(image, i + 1)}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Location Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Location: {property.town}
                </h2>
                <div className="prose prose-lg max-w-none mb-6">
                  {content.locationSection.intro.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-700">{paragraph}</p>
                  ))}
                </div>
                <ul className="space-y-3">
                  {content.locationSection.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Property Features */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Property Features
                </h2>
                <p className="text-gray-700 mb-6">{content.propertyFeatures.intro}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {content.propertyFeatures.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-blue-600">•</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Investment Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Investment Potential
                </h2>
                <div className="prose prose-lg max-w-none">
                  {content.investmentSection.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-700">{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Why Buy Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Choose {data.projectName}?
                </h2>
                <ul className="space-y-4">
                  {content.whyBuySection.map((reason, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <span className="text-gray-700">{reason}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* FAQs */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {content.faqs.map((faq, i) => (
                    <details key={i} className="group border border-gray-200 rounded-lg">
                      <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-gray-900 hover:bg-gray-50">
                        {faq.question}
                        <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <div className="px-4 pb-4 text-gray-700">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* Conclusion CTA */}
              <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
                <p className="text-lg mb-6">{content.conclusion}</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    📱 WhatsApp Us
                  </a>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    📞 {CONTACT.phone}
                  </a>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Price Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg sticky top-6">
                <div className="text-center mb-6">
                  {property.price ? (
                    <>
                      <p className="text-sm text-gray-500 uppercase tracking-wide">Price</p>
                      <p className="text-3xl font-bold text-blue-600">
                        €{property.price.toLocaleString()}
                      </p>
                    </>
                  ) : (
                    <p className="text-xl font-semibold text-gray-700">Price on Request</p>
                  )}
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  {property.bedrooms && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Bedrooms</p>
                      <p className="font-bold text-gray-900">{property.bedrooms}</p>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Bathrooms</p>
                      <p className="font-bold text-gray-900">{property.bathrooms}</p>
                    </div>
                  )}
                  {property.builtSize && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Built Size</p>
                      <p className="font-bold text-gray-900">{property.builtSize} m²</p>
                    </div>
                  )}
                  {property.plotSize && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Plot Size</p>
                      <p className="font-bold text-gray-900">{property.plotSize} m²</p>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-400 text-center mb-6">Ref: {property.ref}</p>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-medium transition-colors"
                  >
                    📱 WhatsApp
                  </a>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
                  >
                    📞 Call Now
                  </a>
                  <a
                    href={CONTACT.habeno}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-center py-3 rounded-lg font-medium transition-colors"
                  >
                    💰 Get Mortgage Quote
                  </a>
                </div>
              </div>

              {/* Lead Form Card */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                <LeadForm
                  propertyInterest={`${data.projectName} (Ref: ${property.ref})`}
                  title="Request Information"
                  subtitle="Get pricing, availability & floor plans"
                  compact={true}
                  formName="lead-inquiry"
                />
              </div>

              {/* Developer Card */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">Developer</h3>
                <Link
                  href={`/builders/${property.developerSlug}`}
                  className="text-blue-600 hover:underline"
                >
                  {property.developer}
                </Link>
              </div>

              {/* Location Card */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">Location</h3>
                <Link
                  href={`/areas/${property.town.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}
                  className="text-blue-600 hover:underline"
                >
                  View all properties in {property.town}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
