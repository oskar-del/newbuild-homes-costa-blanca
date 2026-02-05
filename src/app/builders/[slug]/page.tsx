import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import {
  getBuilderBySlug,
  getAllBuilders,
  getDevelopmentsByBuilder,
  Builder,
} from '@/lib/development-service';
import {
  breadcrumbSchema,
  homeAndConstructionBusinessSchema,
  articleSchema,
  toJsonLd,
} from '@/lib/schema';
import DevelopmentCard from '@/components/DevelopmentCard';

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

/**
 * Enhanced builder content structure (from JSON files)
 */
interface EnhancedBuilderContent {
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
  schema: object;
  schemaFAQ: object;
}

/**
 * Check if enhanced JSON content exists for this builder
 * Handles both old format (nested content object) and new format (flat structure)
 */
function getEnhancedContent(slug: string): EnhancedBuilderContent | null {
  const contentPath = path.join(process.cwd(), 'src', 'content', 'builders', `${slug}.json`);

  if (!fs.existsSync(contentPath)) {
    return null;
  }

  try {
    const raw = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

    // Check if this is the new flat format (no nested content object)
    // New format has metaTitle at root level, old format has it inside content
    if (raw.metaTitle && !raw.content) {
      // Convert flat format to expected nested format
      return {
        slug: raw.slug,
        name: raw.name,
        towns: raw.specializationSection?.towns || [],
        propertyTypes: raw.specializationSection?.propertyTypes || [],
        propertyCount: raw.propertyCount || 0,
        priceRange: raw.priceRange || { min: 0, max: 0 },
        content: {
          metaTitle: raw.metaTitle,
          metaDescription: raw.metaDescription,
          heroIntro: raw.heroIntro || raw.heroHeadline || '',
          aboutSection: typeof raw.aboutSection === 'string'
            ? raw.aboutSection
            : raw.aboutSection?.content || '',
          qualitySection: {
            intro: typeof raw.qualitySection === 'string'
              ? raw.qualitySection
              : raw.qualitySection?.content || '',
            standards: raw.qualitySection?.features || [],
          },
          whyChooseSection: raw.whyChooseSection?.reasons || [],
          faqs: raw.faqSection?.faqs || [],
          conclusion: raw.ctaSection?.content || raw.conclusion || '',
        },
        schema: raw.schema || {},
        schemaFAQ: raw.schemaFAQ || {},
      };
    }

    // Old format - already has nested content structure
    // But still validate it has the required fields
    if (raw.content && raw.content.metaTitle) {
      return raw;
    }

    // Invalid format - return null to fall back to auto-generated page
    console.warn(`[Builder] Invalid JSON format for ${slug}, falling back to auto-generated page`);
    return null;
  } catch (e) {
    console.error(`[Builder] Error parsing JSON for ${slug}:`, e);
    return null;
  }
}

/**
 * Get all possible builder slugs for static generation
 */
export async function generateStaticParams() {
  // Get builders from feed
  const feedBuilders = await getAllBuilders();
  const slugs = new Set(feedBuilders.map(b => b.slug));

  // Also include any enhanced content that might exist
  const buildersDir = path.join(process.cwd(), 'src', 'content', 'builders');
  if (fs.existsSync(buildersDir)) {
    const files = fs.readdirSync(buildersDir).filter(f => f.endsWith('.json'));
    files.forEach(f => slugs.add(f.replace('.json', '')));
  }

  return Array.from(slugs).map(slug => ({ slug }));
}

/**
 * Generate metadata
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  // Check for enhanced content first
  const enhanced = getEnhancedContent(slug);
  if (enhanced) {
    return {
      title: enhanced.content.metaTitle,
      description: enhanced.content.metaDescription,
    };
  }

  // Fall back to auto-generated from feed
  const builder = await getBuilderBySlug(slug);
  if (!builder) {
    return { title: 'Builder Not Found' };
  }

  return {
    title: `${builder.name} | Property Developer Costa Blanca`,
    description: `View ${builder.developmentCount} developments by ${builder.name} in ${builder.towns.slice(0, 3).join(', ')}. New build homes from ${builder.priceRange}. Trusted Costa Blanca developer.`,
  };
}

// Format price helper
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

// WhatsApp CTA Component
function WhatsAppCTA() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all group"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

/**
 * Enhanced Builder Page (with JSON content)
 */
async function EnhancedBuilderPage({ data }: { data: EnhancedBuilderContent }) {
  const { content, schema, schemaFAQ } = data;

  // Fetch developments from feed for this builder
  const developments = await getDevelopmentsByBuilder(data.slug);

  // Breadcrumbs
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Builders', url: 'https://newbuildhomescostablanca.com/builders/' },
    { name: data.name, url: `https://newbuildhomescostablanca.com/builders/${data.slug}/` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero Section */}
        <section className="relative bg-primary-900 py-16 md:py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/builders" className="hover:text-white transition-colors">Builders</Link>
              <span className="mx-2">›</span>
              <span className="text-white">{data.name}</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Property Developer
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                {data.name}
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed mb-8">
                {content.heroIntro.split('\n\n')[0]}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white/10 px-4 py-2 rounded-sm">
                  <div className="text-xl font-semibold text-white">{data.propertyCount}</div>
                  <div className="text-warm-400 text-sm">Properties</div>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-sm">
                  <div className="text-xl font-semibold text-white">{data.towns.length}</div>
                  <div className="text-warm-400 text-sm">Locations</div>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-sm">
                  <div className="text-white text-sm">{data.towns.slice(0, 3).join(', ')}</div>
                  <div className="text-warm-400 text-sm">Areas</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-sm font-medium transition-colors inline-flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Ask About {data.name}
                </a>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-sm font-medium transition-colors border border-white/20 text-sm"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* About Section */}
              <section>
                <h2 className="text-2xl font-semibold text-primary-900 mb-6">
                  About {data.name}
                </h2>
                <div className="prose prose-lg max-w-none">
                  {content.aboutSection.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-warm-700 leading-relaxed mb-4">{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Quality Standards */}
              <section className="bg-white p-8 rounded-sm border border-warm-200">
                <h2 className="text-2xl font-semibold text-primary-900 mb-6">
                  Construction Quality
                </h2>
                <p className="text-warm-700 mb-6">{content.qualitySection.intro}</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {content.qualitySection.standards.map((standard, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-success-50 rounded-sm">
                      <svg className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-warm-700">{standard}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Why Choose Section */}
              <section>
                <h2 className="text-2xl font-semibold text-primary-900 mb-6">
                  Why Choose {data.name}?
                </h2>
                <div className="space-y-4">
                  {content.whyChooseSection.map((reason, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-primary-50 rounded-sm border border-primary-100">
                      <span className="flex-shrink-0 w-8 h-8 bg-primary-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </span>
                      <span className="text-warm-700">{reason}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQs */}
              <section>
                <h2 className="text-2xl font-semibold text-primary-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {content.faqs.map((faq, i) => (
                    <details key={i} className="group border border-warm-200 rounded-sm bg-white">
                      <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-primary-900 hover:bg-warm-50">
                        {faq.question}
                        <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-4 pb-4 text-warm-700">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* Conclusion CTA */}
              <section className="bg-primary-900 rounded-sm p-8 text-white">
                <p className="text-warm-200 text-lg mb-6">{content.conclusion}</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-sm font-medium transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp Us
                  </a>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="bg-white text-primary-900 hover:bg-warm-50 px-6 py-3 rounded-sm font-medium transition-colors"
                  >
                    Call {CONTACT.phone}
                  </a>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Builder Info Card */}
              <div className="bg-white border border-warm-200 rounded-sm p-6 shadow-lg sticky top-6">
                <h3 className="font-semibold text-primary-900 text-xl mb-4">{data.name}</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-warm-500 text-sm">Properties</p>
                    <p className="font-semibold text-primary-900">{data.propertyCount}</p>
                  </div>
                  <div>
                    <p className="text-warm-500 text-sm">Locations</p>
                    <p className="font-semibold text-primary-900">{data.towns.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-warm-500 text-sm">Property Types</p>
                    <p className="font-semibold text-primary-900">{data.propertyTypes.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-warm-500 text-sm">Price Range</p>
                    <p className="font-semibold text-primary-900">
                      {formatPrice(data.priceRange.min)} - {formatPrice(data.priceRange.max)}
                    </p>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-center py-3 rounded-sm font-medium transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="block w-full bg-primary-900 hover:bg-primary-800 text-white text-center py-3 rounded-sm font-medium transition-colors"
                  >
                    Call Now
                  </a>
                  <Link
                    href="/developments"
                    className="block w-full bg-warm-100 hover:bg-warm-200 text-primary-900 text-center py-3 rounded-sm font-medium transition-colors"
                  >
                    View All Developments
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Developments Section - Full Width */}
        {developments.length > 0 && (
          <section className="py-14 bg-white border-t border-warm-200">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                    <span className="font-semibold">{developments.length}</span> Developments by {data.name}
                  </h2>
                  <p className="text-warm-600 mt-1">
                    Browse all current projects from this developer
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {developments.map((dev) => (
                  <DevelopmentCard key={dev.slug} development={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Locations Section */}
        {data.towns.length > 0 && (
          <section className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-8">
                Active in <span className="font-semibold">{data.towns.length} Locations</span>
              </h2>

              <div className="flex flex-wrap gap-3">
                {data.towns.map((town) => (
                  <Link
                    key={town}
                    href={`/areas/${town.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-white px-4 py-2 rounded-sm border border-warm-200 hover:border-accent-500 hover:shadow-md transition-all text-primary-900 font-medium"
                  >
                    {town}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <WhatsAppCTA />
      </main>
    </>
  );
}

/**
 * Auto-generated Builder Page (from feed data)
 */
async function AutoGeneratedBuilderPage({ builder }: { builder: Builder }) {
  // Get developments by this builder
  const developments = await getDevelopmentsByBuilder(builder.slug);

  // Breadcrumbs
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Builders', url: 'https://newbuildhomescostablanca.com/builders/' },
    { name: builder.name, url: `https://newbuildhomescostablanca.com/builders/${builder.slug}/` },
  ]);

  // HomeAndConstructionBusiness schema (correct type for builders)
  const builderSchema = homeAndConstructionBusinessSchema({
    name: builder.name,
    description: `${builder.name} is a property developer in Costa Blanca, Spain with ${builder.developmentCount} active developments and ${builder.totalUnits} available units.`,
    url: `https://newbuildhomescostablanca.com/builders/${builder.slug}/`,
    priceRange: builder.priceRange,
    address: {
      town: builder.towns[0] || 'Costa Blanca',
      region: 'Alicante',
    },
    areaServed: builder.towns,
  });

  // Article schema for page content
  const pageArticleSchema = articleSchema({
    headline: `${builder.name} - Property Developer Costa Blanca`,
    description: `View ${builder.developmentCount} developments by ${builder.name} in ${builder.towns.slice(0, 3).join(', ')}. New build homes from ${builder.priceRange}.`,
    datePublished: new Date().toISOString().split('T')[0],
    author: 'New Build Homes Costa Blanca',
    url: `https://newbuildhomescostablanca.com/builders/${builder.slug}/`,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(builderSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(pageArticleSchema) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero Section */}
        <section className="relative bg-primary-900 py-16 md:py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/builders" className="hover:text-white transition-colors">Builders</Link>
              <span className="mx-2">›</span>
              <span className="text-white">{builder.name}</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Property Developer
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                {builder.name}
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed mb-8">
                {builder.name} is an established property developer in Costa Blanca with {builder.developmentCount} active developments and {builder.totalUnits} available units across {builder.towns.slice(0, 3).join(', ')}{builder.towns.length > 3 ? ` and ${builder.towns.length - 3} more locations` : ''}.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white/10 px-4 py-2 rounded-sm">
                  <div className="text-xl font-semibold text-white">{builder.developmentCount}</div>
                  <div className="text-warm-400 text-sm">Developments</div>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-sm">
                  <div className="text-xl font-semibold text-white">{builder.totalUnits}</div>
                  <div className="text-warm-400 text-sm">Units</div>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-sm">
                  <div className="text-white text-sm">{builder.priceRange}</div>
                  <div className="text-warm-400 text-sm">Price Range</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-sm font-medium transition-colors inline-flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Ask About {builder.name}
                </a>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-sm font-medium transition-colors border border-white/20 text-sm"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Developments Section */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  <span className="font-semibold">{developments.length}</span> Developments by {builder.name}
                </h2>
                <p className="text-warm-600 mt-1">
                  Browse all current projects from this developer
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {developments.map((dev) => (
                <DevelopmentCard key={dev.slug} development={dev} />
              ))}
            </div>

            {developments.length === 0 && (
              <div className="text-center py-12 bg-warm-50 rounded-sm">
                <p className="text-warm-600">No developments currently available from this builder.</p>
                <Link href="/developments" className="text-accent-600 font-medium hover:underline mt-2 inline-block">
                  Browse all developments
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Locations Section */}
        {builder.towns.length > 0 && (
          <section className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-8">
                Active in <span className="font-semibold">{builder.towns.length} Locations</span>
              </h2>

              <div className="flex flex-wrap gap-3">
                {builder.towns.map((town) => (
                  <Link
                    key={town}
                    href={`/locations/${town.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-white px-4 py-2 rounded-sm border border-warm-200 hover:border-accent-500 hover:shadow-md transition-all text-primary-900 font-medium"
                  >
                    {town}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-14 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                Get Started
              </span>
              <div className="w-10 h-px bg-accent-500" />
            </div>

            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Interested in {builder.name} Projects?
            </h2>

            <p className="text-warm-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              Contact us for more information about {builder.name} developments, pricing, availability, and payment plans. We&apos;re here to help you find your perfect new build home.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-8 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Contact Form
              </Link>
              <a
                href={`tel:${CONTACT.phone}`}
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-sm transition-colors border border-white/20"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </section>

        {/* Other Builders */}
        <section className="py-14 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-light text-primary-900 mb-4">
              Explore Other Builders
            </h2>
            <p className="text-warm-600 mb-6">
              We work with 100+ trusted developers across Costa Blanca
            </p>
            <Link
              href="/builders"
              className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors"
            >
              View All Builders
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        <WhatsAppCTA />
      </main>
    </>
  );
}

/**
 * Main Page Component
 */
export default async function BuilderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Check for enhanced content first
  const enhanced = getEnhancedContent(slug);
  if (enhanced) {
    return <EnhancedBuilderPage data={enhanced} />;
  }

  // Fall back to auto-generated from feed
  const builder = await getBuilderBySlug(slug);
  if (!builder) {
    notFound();
  }

  return <AutoGeneratedBuilderPage builder={builder} />;
}
