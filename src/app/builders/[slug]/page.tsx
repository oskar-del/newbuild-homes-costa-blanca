import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  habeno: 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e',
};

interface BuilderContent {
  slug: string;
  name: string;
  towns: string[];
  propertyTypes: string[];
  propertyCount: number;
  priceRange: { min: number; max: number };
  content: {
    metaTitle: string;
    metaDescription: string;
    heroIntro: string;
    aboutSection: string;
    qualitySection: {
      intro: string;
      standards: string[];
    };
    whyChooseSection: string[];
    faqs: { question: string; answer: string }[];
    conclusion: string;
  };
  projects: {
    name: string;
    slug: string;
    town: string;
    propertyType: string;
    price: number | null;
    bedrooms: number | null;
    image: string;
  }[];
  schema: object;
  schemaFAQ: object;
}

function getBuilder(slug: string): BuilderContent | null {
  const builderPath = path.join(process.cwd(), 'src', 'content', 'builders', `${slug}.json`);
  
  if (!fs.existsSync(builderPath)) {
    return null;
  }
  
  return JSON.parse(fs.readFileSync(builderPath, 'utf-8'));
}

function getAllBuilderSlugs(): string[] {
  const buildersDir = path.join(process.cwd(), 'src', 'content', 'builders');
  
  if (!fs.existsSync(buildersDir)) {
    return [];
  }
  
  return fs.readdirSync(buildersDir)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
}

export async function generateStaticParams() {
  const slugs = getAllBuilderSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getBuilder(slug);
  
  if (!data) {
    return { title: 'Builder Not Found' };
  }
  
  return {
    title: data.content.metaTitle,
    description: data.content.metaDescription,
  };
}

export default async function BuilderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getBuilder(slug);
  
  if (!data) {
    notFound();
  }
  
  const { content, projects, schema, schemaFAQ } = data;

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
        <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="text-white/70 text-sm mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/builders" className="hover:text-white">Builders</Link>
              <span className="mx-2">›</span>
              <span className="text-white">{data.name}</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {data.name}
            </h1>
            
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              Premium property developer in Costa Blanca
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">
                🏠 {data.propertyCount} Properties
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full">
                📍 {data.towns.join(', ')}
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full">
                💶 €{data.priceRange.min.toLocaleString()} - €{data.priceRange.max.toLocaleString()}
              </span>
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

              {/* About Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  About {data.name}
                </h2>
                <div className="prose prose-lg max-w-none">
                  {content.aboutSection.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-700">{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Quality Standards */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Construction Quality
                </h2>
                <p className="text-gray-700 mb-6">{content.qualitySection.intro}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {content.qualitySection.standards.map((standard, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-green-600 text-xl">✓</span>
                      <span className="text-gray-700">{standard}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Current Projects */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Current Developments
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {projects.slice(0, 6).map((project) => (
                    <Link
                      key={project.slug}
                      href={`/developments/${project.slug}`}
                      className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative aspect-[4/3]">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                        {project.price && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                              €{project.price.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {project.propertyType} in {project.town}
                        </p>
                        {project.bedrooms && (
                          <p className="text-gray-500 text-sm mt-1">
                            {project.bedrooms} bedrooms
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                
                {projects.length > 6 && (
                  <div className="mt-8 text-center">
                    <Link
                      href="/developments"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      View All {projects.length} Properties →
                    </Link>
                  </div>
                )}
              </section>

              {/* Why Choose Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Choose {data.name}?
                </h2>
                <ul className="space-y-4">
                  {content.whyChooseSection.map((reason, i) => (
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
              {/* Builder Info Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg sticky top-6">
                <h3 className="font-bold text-gray-900 text-xl mb-4">{data.name}</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Properties</p>
                    <p className="font-bold text-gray-900">{data.propertyCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Locations</p>
                    <p className="font-bold text-gray-900">{data.towns.join(', ')}</p>
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
                </div>

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
                  <Link
                    href="/developments"
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-center py-3 rounded-lg font-medium transition-colors"
                  >
                    View All Properties
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
