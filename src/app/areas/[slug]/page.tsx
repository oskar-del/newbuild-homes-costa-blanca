import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import LeadForm from '@/components/LeadForm';

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  habeno: 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e',
};

interface GolfCourse {
  name: string;
  distance: string;
  driveTime: string;
  holes: number;
  url: string;
  googleMaps: string;
  description: string;
}

interface ExternalLinks {
  tourism?: { name: string; url: string; description: string };
  beaches?: { name: string; googleMaps: string; description: string }[];
  healthcare?: { name: string; googleMaps: string; url: string; distance: string };
  airport?: { name: string; googleMaps: string; url: string; distance: string; driveTime: string };
}

interface AreaContent {
  slug: string;
  name: string;
  propertyCount: number;
  propertyTypes: string[];
  priceRange: { min: number; max: number };
  region?: string;
  heroImage?: string;
  cardImage?: string;
  golf?: {
    intro: string;
    courses: GolfCourse[];
  };
  content: {
    metaTitle: string;
    metaDescription: string;
    heroIntro: string;
    lifestyleSection: {
      intro: string;
      highlights: string[];
    };
    amenitiesSection: {
      beaches: string;
      dining: string;
      shopping: string;
      healthcare: string;
      transport: string;
    };
    propertyMarketSection: string;
    whyLiveHereSection: string[];
    faqs: { question: string; answer: string }[];
    conclusion: string;
  };
  developments: {
    name: string;
    slug: string;
    propertyType: string;
    price: number | null;
    bedrooms: number | null;
    image: string;
  }[];
  schema: object;
  schemaFAQ: object;
}

function getArea(slug: string): AreaContent | null {
  const areaPath = path.join(process.cwd(), 'src', 'content', 'areas', `${slug}.json`);
  
  if (!fs.existsSync(areaPath)) {
    return null;
  }
  
  return JSON.parse(fs.readFileSync(areaPath, 'utf-8'));
}

function getAllAreaSlugs(): string[] {
  const areasDir = path.join(process.cwd(), 'src', 'content', 'areas');
  
  if (!fs.existsSync(areasDir)) {
    return [];
  }
  
  return fs.readdirSync(areasDir)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
}

export async function generateStaticParams() {
  const slugs = getAllAreaSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getArea(slug);
  
  if (!data) {
    return { title: 'Area Not Found' };
  }
  
  return {
    title: data.content.metaTitle,
    description: data.content.metaDescription,
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getArea(slug);
  
  if (!data) {
    notFound();
  }
  
  const { content, developments, schema, schemaFAQ, externalLinks, golf } = data;

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative text-white py-20">
          {data.heroImage ? (
            <>
              <Image
                src={data.heroImage}
                alt={data.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-teal-700/80" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-teal-800 to-teal-600" />
          )}
          <div className="relative max-w-6xl mx-auto px-4">
            <nav className="text-white/70 text-sm mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/areas" className="hover:text-white">Areas</Link>
              <span className="mx-2">›</span>
              <span className="text-white">{data.name}</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Living in {data.name}
            </h1>
            
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              Your complete guide to buying property and living in {data.name}, Costa Blanca
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">
                🏠 {data.propertyCount} New Builds
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full">
                💶 From €{data.priceRange.min.toLocaleString()}
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full">
                🌴 {data.region || 'Costa Blanca'}
              </span>
              {golf && (
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  ⛳ {golf.courses.length} Golf Courses Nearby
                </span>
              )}
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Intro */}
              <section>
                <div className="prose prose-lg max-w-none">
                  {content.heroIntro.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-700 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Lifestyle Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  The {data.name} Lifestyle
                </h2>
                <div className="prose prose-lg max-w-none mb-6">
                  {content.lifestyleSection.intro.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-700">{paragraph}</p>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {content.lifestyleSection.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg">
                      <span className="text-teal-600">✓</span>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Beaches with External Links */}
              {externalLinks?.beaches && externalLinks.beaches.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    🏖️ Beaches in {data.name}
                  </h2>
                  <p className="text-gray-700 mb-6">{content.amenitiesSection.beaches}</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {externalLinks.beaches.map((beach, i) => (
                      <a
                        key={i}
                        href={beach.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <h3 className="font-bold text-gray-900 mb-1">{beach.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{beach.description}</p>
                        <span className="text-blue-600 text-sm font-medium">
                          📍 View on Google Maps →
                        </span>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* Golf Section */}
              {golf && golf.courses.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    ⛳ Golf Near {data.name}
                  </h2>
                  <p className="text-gray-700 mb-6">{golf.intro}</p>
                  <div className="space-y-4">
                    {golf.courses.map((course, i) => (
                      <div key={i} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">{course.name}</h3>
                            <p className="text-gray-500">{course.holes} holes • {course.distance} ({course.driveTime})</p>
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={course.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              🌐 Website
                            </a>
                            <a
                              href={course.googleMaps}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              📍 Directions
                            </a>
                          </div>
                        </div>
                        <p className="text-gray-700">{course.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Amenities Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Amenities & Services
                </h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">🍽️ Dining</h3>
                    <p className="text-gray-700">{content.amenitiesSection.dining}</p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">🛍️ Shopping</h3>
                    <p className="text-gray-700">{content.amenitiesSection.shopping}</p>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">🏥 Healthcare</h3>
                    <p className="text-gray-700">{content.amenitiesSection.healthcare}</p>
                    {externalLinks?.healthcare && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a
                          href={externalLinks.healthcare.googleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
                        >
                          📍 {externalLinks.healthcare.name} ({externalLinks.healthcare.distance})
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">✈️ Transport</h3>
                    <p className="text-gray-700">{content.amenitiesSection.transport}</p>
                    {externalLinks?.airport && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a
                          href={externalLinks.airport.googleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
                        >
                          📍 {externalLinks.airport.name} ({externalLinks.airport.distance}, {externalLinks.airport.driveTime})
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Property Market */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Property Market in {data.name}
                </h2>
                <div className="prose prose-lg max-w-none">
                  {content.propertyMarketSection.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-700">{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Available Properties */}
              {developments.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    New Build Properties in {data.name}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {developments.map((dev) => (
                      <Link
                        key={dev.slug}
                        href={`/developments/${dev.slug}`}
                        className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative aspect-[4/3]">
                          {dev.image ? (
                            <Image
                              src={dev.image}
                              alt={dev.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <span className="text-gray-400">No image</span>
                            </div>
                          )}
                          {dev.price && (
                            <div className="absolute top-3 left-3">
                              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                €{dev.price.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {dev.name}
                          </h3>
                          <p className="text-gray-600 text-sm">{dev.propertyType}</p>
                          {dev.bedrooms && (
                            <p className="text-gray-500 text-sm mt-1">
                              {dev.bedrooms} bedrooms
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Why Live Here */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Live in {data.name}?
                </h2>
                <ul className="space-y-4">
                  {content.whyLiveHereSection.map((reason, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 bg-teal-50 rounded-lg">
                      <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
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
                  Frequently Asked Questions about {data.name}
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
              <section className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-xl p-8 text-white">
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
                    className="inline-flex items-center gap-2 bg-white text-teal-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    📞 {CONTACT.phone}
                  </a>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Area Info Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg sticky top-6">
                <h3 className="font-bold text-gray-900 text-xl mb-4">{data.name}</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Region</p>
                    <p className="font-bold text-gray-900">{data.region || 'Costa Blanca'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">New Build Properties</p>
                    <p className="font-bold text-gray-900">{data.propertyCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Property Types</p>
                    <p className="font-bold text-gray-900">{data.propertyTypes.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price Range</p>
                    <p className="font-bold text-gray-900">
                      €{data.priceRange.min.toLocaleString()} - €{data.priceRange.max.toLocaleString()}
                    </p>
                  </div>
                  {golf && (
                    <div>
                      <p className="text-sm text-gray-500">Golf Courses</p>
                      <p className="font-bold text-gray-900">{golf.courses.length} nearby</p>
                    </div>
                  )}
                </div>

                {/* External Links */}
                {externalLinks?.tourism && (
                  <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                    <a
                      href={externalLinks.tourism.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium text-sm"
                    >
                      🌐 Official {data.name} Tourism →
                    </a>
                  </div>
                )}

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

              {/* Other Areas */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Explore Other Areas</h3>
                <div className="space-y-2">
                  <Link href="/areas/javea-xabia" className="block text-blue-600 hover:underline">
                    Jávea / Xàbia
                  </Link>
                  <Link href="/areas/moraira" className="block text-blue-600 hover:underline">
                    Moraira
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
