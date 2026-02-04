import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

interface RegionContent {
  slug: string;
  name: string;
  type: string;
  heroImage?: string;
  coordinates?: { lat: number; lng: number };
  priceRange?: { min: number; max: number };
  content: {
    metaTitle: string;
    metaDescription: string;
    quickAnswer?: string;
    heroIntro: string;
    regionOverview?: {
      geography: string;
      climate: string;
      population: string;
      accessibility: string;
    };
    majorAreas?: {
      name: string;
      slug?: string;
      description: string;
      priceRange?: string;
      lifestyle?: string;
      bestFor?: string;
    }[];
    golfSection?: {
      intro: string;
      keyFeatures: string[];
      topCourses?: {
        name: string;
        designer?: string;
        rating?: string;
        description: string;
      }[];
    };
    beachesSection?: {
      intro: string;
      highlights: {
        name: string;
        type: string;
        description: string;
      }[];
    };
    propertyMarketSection?: {
      overview: string;
      priceGuide: {
        type: string;
        range: string;
        notes?: string;
      }[];
      investmentPotential?: string;
    };
    lifestyleSection?: {
      intro: string;
      highlights: string[];
    };
    practicalInfo?: {
      healthcare: string;
      transport: string;
      costOfLiving: string;
      language: string;
    };
    faqs?: { question: string; answer: string }[];
    conclusion?: string;
  };
  childAreas?: string[];
  schema?: object;
  schemaFAQ?: object;
}

function getRegion(slug: string): RegionContent | null {
  const regionsDir = path.join(process.cwd(), 'src', 'content', 'regions');
  const filePath = path.join(regionsDir, `${slug}.json`);

  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  return null;
}

function getAllRegions(): string[] {
  const regionsDir = path.join(process.cwd(), 'src', 'content', 'regions');

  if (!fs.existsSync(regionsDir)) {
    return [];
  }

  return fs.readdirSync(regionsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''));
}

export async function generateStaticParams() {
  const regions = getAllRegions();
  return regions.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegion(slug);

  if (!region) {
    return { title: 'Region Not Found' };
  }

  return {
    title: region.content.metaTitle,
    description: region.content.metaDescription,
    openGraph: {
      title: region.content.metaTitle,
      description: region.content.metaDescription,
      type: 'website',
    },
  };
}

export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = getRegion(slug);

  // Guard against missing region or incomplete data
  if (!region || !region.content || !region.name) {
    notFound();
  }

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Regions', url: 'https://newbuildhomescostablanca.com/regions/' },
    { name: region.name, url: `https://newbuildhomescostablanca.com/regions/${slug}/` },
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      {region.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(region.schema) }} />
      )}
      {region.schemaFAQ && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(region.schemaFAQ) }} />
      )}

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-primary-900 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/regions" className="hover:text-white transition-colors">Regions</Link>
              <span className="mx-2">›</span>
              <span className="text-white">{region.name}</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Regional Guide
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6">
                {region.name} <span className="font-semibold">Property Guide</span>
              </h1>

              {region.priceRange && (
                <div className="flex items-center gap-4 text-warm-300 mb-6">
                  <span className="bg-accent-500/20 text-accent-300 px-3 py-1 rounded text-sm">
                    Properties from {formatPrice(region.priceRange.min)}
                  </span>
                </div>
              )}

              <p className="text-warm-300 text-lg leading-relaxed max-w-3xl">
                {region.content.heroIntro.split('\n\n')[0]}
              </p>
            </div>
          </div>
        </section>

        {/* Quick Answer */}
        {region.content.quickAnswer && (
          <section className="bg-accent-50 border-b border-accent-200 py-6">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex gap-3 items-start">
                <span className="text-accent-600 text-xl">💡</span>
                <div>
                  <span className="text-accent-700 font-semibold text-sm uppercase tracking-wide">Quick Summary</span>
                  <p className="text-warm-800 mt-1 leading-relaxed">{region.content.quickAnswer}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              {region.content.regionOverview && (
                <section className="bg-white p-8 rounded-lg border border-warm-200">
                  <h2 className="text-2xl font-semibold text-primary-900 mb-6">Region Overview</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-primary-900 mb-2">Geography</h3>
                      <p className="text-warm-700 text-sm leading-relaxed">{region.content.regionOverview.geography}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 mb-2">Climate</h3>
                      <p className="text-warm-700 text-sm leading-relaxed">{region.content.regionOverview.climate}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 mb-2">Population</h3>
                      <p className="text-warm-700 text-sm leading-relaxed">{region.content.regionOverview.population}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 mb-2">Accessibility</h3>
                      <p className="text-warm-700 text-sm leading-relaxed">{region.content.regionOverview.accessibility}</p>
                    </div>
                  </div>
                </section>
              )}

              {/* Major Areas */}
              {region.content.majorAreas && region.content.majorAreas.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold text-primary-900 mb-6">Towns & Areas</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {region.content.majorAreas.map((area, idx) => (
                      <div key={idx} className="bg-white p-5 rounded-lg border border-warm-200 hover:shadow-lg transition-shadow">
                        {area.slug ? (
                          <Link href={`/areas/${area.slug}`} className="group">
                            <h3 className="font-semibold text-primary-900 group-hover:text-accent-600 transition-colors mb-2">{area.name}</h3>
                          </Link>
                        ) : (
                          <h3 className="font-semibold text-primary-900 mb-2">{area.name}</h3>
                        )}
                        <p className="text-warm-600 text-sm mb-3">{area.description}</p>
                        {area.priceRange && (
                          <div className="text-accent-600 font-medium text-sm mb-2">
                            {area.priceRange}
                          </div>
                        )}
                        {area.bestFor && (
                          <div className="text-warm-500 text-xs">
                            <span className="font-medium">Best for:</span> {area.bestFor}
                          </div>
                        )}
                        {area.slug && (
                          <Link href={`/areas/${area.slug}`} className="inline-flex items-center gap-1 text-accent-600 hover:text-accent-700 text-sm font-medium mt-3">
                            Explore {area.name}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Golf Section */}
              {region.content.golfSection && (
                <section className="bg-white p-8 rounded-lg border border-warm-200">
                  <h2 className="text-2xl font-semibold text-primary-900 mb-4">Golf in {region.name}</h2>
                  <p className="text-warm-700 leading-relaxed mb-6">{region.content.golfSection.intro}</p>

                  {Array.isArray(region.content.golfSection.keyFeatures) && region.content.golfSection.keyFeatures.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      {region.content.golfSection.keyFeatures.map((feature, idx) => (
                        <div key={idx} className="bg-accent-50 p-3 rounded text-center">
                          <span className="text-accent-700 text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {Array.isArray(region.content.golfSection.topCourses) && region.content.golfSection.topCourses.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-semibold text-primary-900 mb-4">Top Courses</h3>
                      <div className="space-y-4">
                        {region.content.golfSection.topCourses.map((course, idx) => (
                          <div key={idx} className="flex gap-4 p-4 bg-warm-50 rounded-lg">
                            <div className="w-12 h-12 bg-primary-900 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                              {idx + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold text-primary-900">{course.name}</h4>
                              {course.designer && <p className="text-accent-600 text-sm">Designed by {course.designer}</p>}
                              <p className="text-warm-600 text-sm mt-1">{course.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link href="/golf" className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium mt-6">
                    View All Golf Properties
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </section>
              )}

              {/* Beaches Section */}
              {region.content.beachesSection && (
                <section className="bg-white p-8 rounded-lg border border-warm-200">
                  <h2 className="text-2xl font-semibold text-primary-900 mb-4">Beaches</h2>
                  <p className="text-warm-700 leading-relaxed mb-6">{region.content.beachesSection.intro}</p>

                  {Array.isArray(region.content.beachesSection.highlights) && region.content.beachesSection.highlights.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {region.content.beachesSection.highlights.map((beach, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-blue-50 to-accent-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">🏖️</span>
                          <h4 className="font-semibold text-primary-900">{beach.name}</h4>
                        </div>
                        <span className="inline-block bg-accent-100 text-accent-700 text-xs px-2 py-1 rounded mb-2">{beach.type}</span>
                        <p className="text-warm-600 text-sm">{beach.description}</p>
                      </div>
                    ))}
                    </div>
                  )}

                  <Link href="/beach" className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium mt-6">
                    View Beach Properties
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </section>
              )}

              {/* Property Market */}
              {region.content.propertyMarketSection && (
                <section className="bg-white p-8 rounded-lg border border-warm-200">
                  <h2 className="text-2xl font-semibold text-primary-900 mb-4">Property Market</h2>
                  <p className="text-warm-700 leading-relaxed mb-6">{region.content.propertyMarketSection.overview}</p>

                  {Array.isArray(region.content.propertyMarketSection.priceGuide) && region.content.propertyMarketSection.priceGuide.length > 0 && (
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-primary-900 text-white">
                            <th className="p-3 text-left font-medium">Property Type</th>
                            <th className="p-3 text-left font-medium">Price Range</th>
                            <th className="p-3 text-left font-medium hidden md:table-cell">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {region.content.propertyMarketSection.priceGuide.map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-warm-50' : 'bg-white'}>
                              <td className="p-3 border-b border-warm-200 font-medium text-primary-900">{row.type}</td>
                              <td className="p-3 border-b border-warm-200 text-accent-600 font-medium">{row.range}</td>
                              <td className="p-3 border-b border-warm-200 text-warm-600 text-sm hidden md:table-cell">{row.notes}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {region.content.propertyMarketSection.investmentPotential && (
                    <div className="bg-accent-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-primary-900 mb-2">Investment Potential</h3>
                      <p className="text-warm-700 text-sm leading-relaxed">{region.content.propertyMarketSection.investmentPotential}</p>
                    </div>
                  )}
                </section>
              )}

              {/* Lifestyle */}
              {region.content.lifestyleSection && (
                <section className="bg-gradient-to-br from-primary-900 to-primary-800 p-8 rounded-lg text-white">
                  <h2 className="text-2xl font-semibold mb-4">Lifestyle in {region.name}</h2>
                  <p className="text-warm-300 leading-relaxed mb-6">{region.content.lifestyleSection.intro}</p>
                  {Array.isArray(region.content.lifestyleSection.highlights) && region.content.lifestyleSection.highlights.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {region.content.lifestyleSection.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-accent-400">✓</span>
                          <span className="text-warm-200 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Practical Info */}
              {region.content.practicalInfo && (
                <section className="bg-white p-8 rounded-lg border border-warm-200">
                  <h2 className="text-2xl font-semibold text-primary-900 mb-6">Practical Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                        <span className="text-xl">🏥</span> Healthcare
                      </h3>
                      <p className="text-warm-600 text-sm leading-relaxed">{region.content.practicalInfo.healthcare}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                        <span className="text-xl">✈️</span> Transport
                      </h3>
                      <p className="text-warm-600 text-sm leading-relaxed">{region.content.practicalInfo.transport}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                        <span className="text-xl">💰</span> Cost of Living
                      </h3>
                      <p className="text-warm-600 text-sm leading-relaxed">{region.content.practicalInfo.costOfLiving}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                        <span className="text-xl">🗣️</span> Language
                      </h3>
                      <p className="text-warm-600 text-sm leading-relaxed">{region.content.practicalInfo.language}</p>
                    </div>
                  </div>
                </section>
              )}

              {/* FAQs */}
              {region.content.faqs && region.content.faqs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold text-primary-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-3">
                    {region.content.faqs.map((faq, idx) => (
                      <details key={idx} className="bg-white border border-warm-200 rounded-lg group">
                        <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-primary-900 hover:bg-warm-50 transition-colors">
                          <span className="pr-4">{faq.question}</span>
                          <span className="text-warm-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="px-5 pb-5 text-warm-700 leading-relaxed border-t border-warm-100">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Conclusion */}
              {region.content.conclusion && (
                <section className="bg-accent-50 p-8 rounded-lg border border-accent-200">
                  <h2 className="text-xl font-semibold text-primary-900 mb-4">Summary</h2>
                  <p className="text-warm-700 leading-relaxed">{region.content.conclusion}</p>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Contact Card */}
              <div className="bg-primary-900 p-6 rounded-lg text-white sticky top-6">
                <h3 className="font-semibold text-lg mb-3">Find Your Property in {region.name}</h3>
                <p className="text-warm-300 text-sm mb-4">
                  Get personalized recommendations from our local experts.
                </p>
                <div className="space-y-3">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-lg font-medium transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp Us
                  </a>
                  <Link href="/consultation"
                    className="flex items-center justify-center gap-2 w-full bg-accent-500 hover:bg-accent-600 text-white py-3 rounded-lg font-medium transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book Consultation
                  </Link>
                  <a href={`tel:${CONTACT.phone}`}
                    className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-colors border border-white/20">
                    Call {CONTACT.phone}
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white p-6 rounded-lg border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-4">Explore Properties</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/developments" className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                      Browse All Developments →
                    </Link>
                  </li>
                  <li>
                    <Link href="/golf" className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                      Golf Properties →
                    </Link>
                  </li>
                  <li>
                    <Link href="/beach" className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                      Beach Properties →
                    </Link>
                  </li>
                  <li>
                    <Link href="/luxury" className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                      Luxury Villas →
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Child Areas */}
              {region.childAreas && region.childAreas.length > 0 && (
                <div className="bg-warm-50 p-6 rounded-lg border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Areas in {region.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {region.childAreas.slice(0, 12).map((area) => (
                      <Link
                        key={area}
                        href={`/areas/${area}`}
                        className="bg-white px-3 py-1.5 rounded border border-warm-200 text-warm-700 hover:border-accent-500 hover:text-accent-600 text-sm transition-colors"
                      >
                        {area.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </Link>
                    ))}
                    {region.childAreas.length > 12 && (
                      <span className="text-warm-500 text-sm py-1.5">+{region.childAreas.length - 12} more</span>
                    )}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="py-12 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Ready to Find Your Home in {region.name}?</h2>
            <p className="text-warm-300 mb-8 max-w-2xl mx-auto">
              Book a free consultation with our property experts. We'll help you find the perfect new build property.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/consultation" className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Book Free Consultation
              </Link>
              <Link href="/developments" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-white/20">
                Browse All Properties
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
