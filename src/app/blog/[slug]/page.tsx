import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';
import ArticlePropertyShowcase from '@/components/ArticlePropertyShowcase';
import { InlineConsultationCTA } from '@/components/ConsultationForm';

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

interface Property {
  reference: string;
  title: string;
  price: number;
  priceFrom?: boolean;
  type: string;
  bedrooms: number;
  bathrooms: number;
  builtArea?: number;
  location: string;
  image?: string;
  features?: string[];
  status?: 'key-ready' | 'off-plan' | 'under-construction';
  badge?: string;
}

interface PropertyShowcase {
  position: 'after-intro' | 'mid-article' | 'before-conclusion' | 'after-section';
  afterSection?: number; // 0-indexed section number for 'after-section' position
  title: string;
  subtitle?: string;
  variant: 'carousel' | 'grid-3x3' | 'grid-2x2' | 'featured-single' | 'split-highlight';
  theme?: 'light' | 'dark' | 'accent';
  properties: Property[];
  ctaText?: string;
  ctaLink?: string;
}

interface ComparisonRow {
  name: string;
  laZenia?: string;
  caboRoig?: string;
  algorfa?: string;
  coast?: string;
  optionA?: string;
  optionB?: string;
}

interface ArticleSection {
  title: string;
  content: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ArticleContent {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  author?: string;
  image?: string;
  tags?: string[];
  relatedAreas?: string[];
  relatedBuilders?: string[];
  relatedDevelopments?: string[];
  content: string | {
    intro: string;
    quickAnswer?: string;
    sections?: ArticleSection[];
    comparisonTable?: {
      categories: ComparisonRow[];
    };
    conclusion: string;
    faqs?: FAQ[];
    propertyShowcases?: PropertyShowcase[];
    showConsultationCTA?: boolean | 'after-intro' | 'mid-article' | 'before-faqs';
  };
  relatedArticles?: string[];
  schema?: object;
  schemaFAQ?: object;
}

// Sample articles data (will be replaced by JSON files)
const SAMPLE_ARTICLES: Record<string, ArticleContent> = {
  'buying-new-build-spain-guide': {
    slug: 'buying-new-build-spain-guide',
    title: 'Complete Guide to Buying a New Build in Spain',
    metaTitle: 'Complete Guide to Buying a New Build in Spain | Expert Tips',
    metaDescription: 'Step-by-step guide to purchasing new construction property in Spain. From reservation to key handover, everything international buyers need to know.',
    excerpt: 'Everything you need to know about purchasing new construction property in Spain.',
    category: 'Buying Guide',
    publishedAt: '2025-01-15',
    readTime: 12,
    author: 'New Build Homes Team',
    content: `
## Why Buy New Build in Spain?

Buying a new build property in Spain offers numerous advantages over resale properties. From modern energy-efficient construction to comprehensive warranties, new builds provide peace of mind and better long-term value.

### Key Benefits

**10-Year Structural Warranty**
All new builds in Spain come with a mandatory 10-year warranty covering structural defects. This is backed by insurance, giving you protection even if the developer goes out of business.

**Modern Construction Standards**
New builds must comply with the latest Spanish building codes, including energy efficiency requirements. This means lower utility bills and a more comfortable living environment.

**Customization Options**
When buying off-plan, you can often choose finishes, layouts, and extras to personalize your new home.

## The Buying Process

### Step 1: Reservation
Once you have found your ideal property, the first step is to pay a reservation fee (typically 3,000-6,000 euros). This takes the property off the market while you arrange legals.

### Step 2: Private Purchase Contract
Within 2-4 weeks of reservation, you will sign the private purchase contract (Contrato Privado). At this stage, you typically pay 20-30% of the purchase price.

### Step 3: Stage Payments
For off-plan properties, you will make stage payments as construction progresses. These are protected by bank guarantees.

### Step 4: Completion
The final payment (usually 30-40%) is made at the notary when you receive the keys. The property is registered in your name.

## Important Considerations

- **NIE Number**: You will need a Spanish tax identification number (NIE) to buy property.
- **Bank Account**: A Spanish bank account is useful for payments and utilities.
- **Legal Representation**: Always use an independent lawyer who specializes in Spanish property law.
- **Taxes**: Budget for approximately 10-13% in taxes and fees on top of the purchase price.

## Ready to Start Your Search?

Contact us today to discuss your requirements. We work with over 100 trusted developers across Costa Blanca and Costa Calida.
    `,
  },
};

// Load properties from homepage-carousels.json for property showcases
function getAvailableProperties(): Property[] {
  const carouselsPath = path.join(process.cwd(), 'src', 'content', 'homepage-carousels.json');

  if (fs.existsSync(carouselsPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(carouselsPath, 'utf-8'));
      const allProperties: Property[] = [];

      // Extract properties from all carousels
      Object.values(data).forEach((carousel: any) => {
        if (carousel.properties && Array.isArray(carousel.properties)) {
          carousel.properties.forEach((prop: any) => {
            allProperties.push({
              reference: prop.reference || `REF-${Math.random().toString(36).substr(2, 9)}`,
              title: prop.title || prop.name,
              price: prop.price || prop.priceFrom,
              priceFrom: !!prop.priceFrom,
              type: prop.type || 'Property',
              bedrooms: prop.bedrooms || 3,
              bathrooms: prop.bathrooms || 2,
              builtArea: prop.builtArea,
              location: prop.location || prop.town || 'Costa Blanca',
              image: prop.image,
              features: prop.features,
              status: prop.status,
              badge: prop.badge,
            });
          });
        }
      });

      return allProperties;
    } catch {
      return [];
    }
  }

  return [];
}

function getArticle(slug: string): ArticleContent | null {
  // First check sample articles
  if (SAMPLE_ARTICLES[slug]) {
    return SAMPLE_ARTICLES[slug];
  }

  // Then check JSON files
  const articlesDir = path.join(process.cwd(), 'src', 'content', 'articles');
  const filePath = path.join(articlesDir, `${slug}.json`);

  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
    },
    alternates: {
      canonical: `https://newbuildhomescostablanca.com/blog/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Blog', url: 'https://newbuildhomescostablanca.com/blog/' },
    { name: article.title, url: `https://newbuildhomescostablanca.com/blog/${slug}/` },
  ]);

  // Check if content is structured (comparison article) or simple markdown
  const isStructuredContent = typeof article.content === 'object';
  const structuredContent = isStructuredContent ? article.content as any : null;

  // Get property showcases and available properties
  const propertyShowcases = structuredContent?.propertyShowcases || [];
  const availableProperties = getAvailableProperties();

  // Auto-generate property showcases if none specified but article has related areas
  const autoShowcases: PropertyShowcase[] = [];
  if (propertyShowcases.length === 0 && article.relatedAreas && article.relatedAreas.length > 0 && availableProperties.length > 0) {
    // Add a mid-article carousel with relevant properties
    const relevantProperties = availableProperties.slice(0, 6);
    if (relevantProperties.length > 0) {
      autoShowcases.push({
        position: 'mid-article',
        title: 'Properties in This Area',
        subtitle: 'Explore available new build homes',
        variant: 'carousel',
        properties: relevantProperties,
        ctaText: 'View All Properties',
        ctaLink: '/developments',
      });
    }
  }

  const allShowcases = [...propertyShowcases, ...autoShowcases];

  // Generate slug for anchor links
  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // Build Table of Contents from sections
  const tableOfContents = isStructuredContent && structuredContent.sections
    ? [
        ...structuredContent.sections.map((section: ArticleSection) => ({
          id: slugify(section.title),
          title: section.title,
        })),
        ...structuredContent.comparisonTable ? [{ id: 'comparison', title: 'Quick Comparison' }] : [],
        ...structuredContent.faqs?.length ? [{ id: 'faqs', title: 'FAQs' }] : [],
      ]
    : [];

  // Simple markdown-to-HTML conversion function
  const markdownToHtml = (text: string) => {
    return text
      .replace(/## (.*)/g, '<h2 class="text-2xl font-semibold text-primary-900 mt-8 mb-4">$1</h2>')
      .replace(/### (.*)/g, '<h3 class="text-xl font-semibold text-primary-900 mt-6 mb-3">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-warm-700 leading-relaxed">')
      .replace(/^- (.*)/gm, '<li class="ml-4 mb-2 list-disc list-inside">$1</li>')
      .replace(/^\d\. (.*)/gm, '<li class="ml-4 mb-2 list-decimal list-inside">$1</li>');
  };

  // For backwards compatibility with old markdown content
  const contentHtml = typeof article.content === 'string'
    ? markdownToHtml(article.content)
    : '';

  // Helper to render property showcase
  const renderPropertyShowcase = (showcase: PropertyShowcase) => (
    <ArticlePropertyShowcase
      key={`${showcase.position}-${showcase.title}`}
      title={showcase.title}
      subtitle={showcase.subtitle}
      variant={showcase.variant}
      theme={showcase.theme}
      properties={showcase.properties.length > 0 ? showcase.properties : availableProperties.slice(0, 6)}
      ctaText={showcase.ctaText}
      ctaLink={showcase.ctaLink}
    />
  );

  // Get showcases by position
  const getShowcasesByPosition = (position: string) =>
    allShowcases.filter(s => s.position === position);

  // Check if consultation CTA should be shown
  const showConsultationCTA = structuredContent?.showConsultationCTA;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      {article.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article.schema) }} />
      )}
      {article.schemaFAQ && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article.schemaFAQ) }} />
      )}

      {/* Back to Top Button - Mobile friendly */}
      <a
        href="#top"
        className="fixed bottom-6 right-6 z-50 bg-accent-500 hover:bg-accent-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 md:hidden"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </a>

      <main id="top" className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-primary-900 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span className="mx-2">›</span>
              <span className="text-white truncate">{article.title}</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="bg-accent-500 text-white text-xs font-medium px-3 py-1 rounded">{article.category}</span>
              <span className="text-warm-400 text-sm">{article.readTime} min read</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-warm-400 text-sm">
              {article.author && <span>By {article.author}</span>}
              <span>{new Date(article.publishedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <article className="lg:col-span-2">
                <div className="bg-white p-6 md:p-8 rounded-lg border border-warm-200">
                  {isStructuredContent ? (
                    <div className="prose prose-lg max-w-none">
                      {/* Quick Answer Box - Featured Snippet Optimization */}
                      {structuredContent.quickAnswer && (
                        <div className="mb-8 p-5 bg-accent-50 border-l-4 border-accent-500 rounded-r-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-accent-600 font-semibold text-sm uppercase tracking-wide">Quick Answer</span>
                          </div>
                          <p className="text-warm-800 font-medium leading-relaxed m-0">
                            {structuredContent.quickAnswer}
                          </p>
                        </div>
                      )}

                      {/* Intro */}
                      <div
                        className="mb-8"
                        dangerouslySetInnerHTML={{
                          __html: `<p class="mb-4 text-warm-700 leading-relaxed text-lg">${markdownToHtml(structuredContent.intro)}</p>`
                        }}
                      />

                      {/* Property Showcases - After Intro */}
                      {getShowcasesByPosition('after-intro').map(renderPropertyShowcase)}

                      {/* Consultation CTA - After Intro */}
                      {showConsultationCTA === 'after-intro' && <InlineConsultationCTA />}

                      {/* Table of Contents - Collapsible on mobile */}
                      {tableOfContents.length > 3 && (
                        <nav className="mb-10 bg-warm-50 rounded-lg border border-warm-200" aria-label="Table of contents">
                          <details className="group" open>
                            <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-primary-900 hover:bg-warm-100 rounded-t-lg transition-colors">
                              <span className="flex items-center gap-2">
                                <span className="text-accent-500">📖</span> In This Article
                              </span>
                              <span className="text-warm-400 group-open:rotate-180 transition-transform text-sm">▼</span>
                            </summary>
                            <ol className="px-5 pb-5 space-y-2 list-decimal list-inside text-warm-700">
                              {tableOfContents.map((item, index) => (
                                <li key={index}>
                                  <a
                                    href={`#${item.id}`}
                                    className="text-accent-600 hover:text-accent-700 hover:underline transition-colors"
                                  >
                                    {item.title}
                                  </a>
                                </li>
                              ))}
                            </ol>
                          </details>
                        </nav>
                      )}

                      {/* Sections with Property Showcases */}
                      {structuredContent.sections?.map((section: ArticleSection, index: number) => {
                        const sectionShowcases = allShowcases.filter(
                          s => s.position === 'after-section' && s.afterSection === index
                        );
                        const isMidPoint = index === Math.floor((structuredContent.sections?.length || 0) / 2);

                        return (
                          <div key={index}>
                            <section id={slugify(section.title)} className="mb-8 scroll-mt-20">
                              <h2 className="text-2xl font-semibold text-primary-900 mb-4">{section.title}</h2>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: `<p class="mb-4 text-warm-700 leading-relaxed">${markdownToHtml(section.content)}</p>`
                                }}
                              />
                            </section>

                            {/* Property Showcases after this section */}
                            {sectionShowcases.map(renderPropertyShowcase)}

                            {/* Mid-article showcases and CTA */}
                            {isMidPoint && (
                              <>
                                {getShowcasesByPosition('mid-article').map(renderPropertyShowcase)}
                                {showConsultationCTA === 'mid-article' && <InlineConsultationCTA />}
                              </>
                            )}
                          </div>
                        );
                      })}

                      {/* Comparison Table */}
                      {structuredContent.comparisonTable && (() => {
                        const categories = structuredContent.comparisonTable.categories;
                        const firstRow = categories[0];
                        // Detect column type based on data
                        const isAlgorfaCoast = firstRow?.algorfa !== undefined;
                        const col1Label = isAlgorfaCoast ? 'Algorfa' : 'La Zenia';
                        const col2Label = isAlgorfaCoast ? 'Coast' : 'Cabo Roig';

                        return (
                          <section id="comparison" className="my-10 scroll-mt-20">
                            <h2 className="text-2xl font-semibold text-primary-900 mb-6">Quick Comparison</h2>
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse">
                                <thead>
                                  <tr className="bg-primary-900 text-white">
                                    <th className="p-3 text-left font-medium">Feature</th>
                                    <th className="p-3 text-left font-medium">{col1Label}</th>
                                    <th className="p-3 text-left font-medium">{col2Label}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {categories.map((row: ComparisonRow, index: number) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-warm-50' : 'bg-white'}>
                                      <td className="p-3 border-b border-warm-200 font-medium text-primary-900">{row.name}</td>
                                      <td className="p-3 border-b border-warm-200 text-warm-700">{row.algorfa || row.laZenia || row.optionA}</td>
                                      <td className="p-3 border-b border-warm-200 text-warm-700">{row.coast || row.caboRoig || row.optionB}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </section>
                        );
                      })()}

                      {/* Property Showcases - Before Conclusion */}
                      {getShowcasesByPosition('before-conclusion').map(renderPropertyShowcase)}

                      {/* Conclusion */}
                      <section className="mt-10 p-6 bg-accent-50 rounded-lg border border-accent-200">
                        <h2 className="text-xl font-semibold text-primary-900 mb-4">The Bottom Line</h2>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `<p class="text-warm-700 leading-relaxed">${markdownToHtml(structuredContent.conclusion)}</p>`
                          }}
                        />
                      </section>

                      {/* Consultation CTA - Before FAQs */}
                      {(showConsultationCTA === true || showConsultationCTA === 'before-faqs') && <InlineConsultationCTA />}

                      {/* FAQs - Optimized for mobile touch targets */}
                      {structuredContent.faqs && structuredContent.faqs.length > 0 && (
                        <section id="faqs" className="mt-10 scroll-mt-20">
                          <h2 className="text-2xl font-semibold text-primary-900 mb-6">Frequently Asked Questions</h2>
                          <div className="space-y-3">
                            {structuredContent.faqs.map((faq: FAQ, index: number) => (
                              <details key={index} className="bg-white border border-warm-200 rounded-lg group shadow-sm">
                                <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-primary-900 hover:bg-warm-50 transition-colors min-h-[56px]">
                                  <span className="pr-4">{faq.question}</span>
                                  <span className="ml-2 text-warm-400 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                                </summary>
                                <div className="px-5 pb-5 text-warm-700 leading-relaxed border-t border-warm-100">
                                  {faq.answer}
                                </div>
                              </details>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Mobile CTA - Shows on mobile only */}
                      <div className="mt-8 p-5 bg-primary-900 rounded-lg text-white lg:hidden">
                        <h3 className="font-semibold text-lg mb-2">Ready to Find Your Property?</h3>
                        <p className="text-warm-300 text-sm mb-4">
                          Get personalized recommendations from our Costa Blanca experts.
                        </p>
                        <div className="flex flex-col gap-3">
                          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                            className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-center py-3 rounded font-medium transition-colors">
                            WhatsApp Us
                          </a>
                          <a href={`tel:${CONTACT.phone}`}
                            className="block w-full bg-accent-500 hover:bg-accent-600 text-white text-center py-3 rounded font-medium transition-colors">
                            Call {CONTACT.phone}
                          </a>
                          <Link href="/consultation"
                            className="block w-full bg-white/10 hover:bg-white/20 text-white text-center py-3 rounded font-medium transition-colors border border-white/20">
                            Book Video Consultation
                          </Link>
                        </div>
                      </div>

                      {/* Related Areas Links */}
                      {article.relatedAreas && article.relatedAreas.length > 0 && (
                        <section className="mt-8 p-6 bg-warm-50 rounded-lg">
                          <h3 className="font-semibold text-primary-900 mb-3">Explore These Areas</h3>
                          <div className="flex flex-wrap gap-2">
                            {article.relatedAreas.map((area: string) => (
                              <Link
                                key={area}
                                href={`/areas/${area}`}
                                className="bg-white px-4 py-2 rounded border border-warm-200 text-accent-600 hover:border-accent-500 hover:bg-accent-50 transition-colors"
                              >
                                {area.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} →
                              </Link>
                            ))}
                          </div>
                        </section>
                      )}
                    </div>
                  ) : (
                    <div
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: `<p class="mb-4 text-warm-700 leading-relaxed">${contentHtml}</p>` }}
                    />
                  )}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-6">
                {/* Contact Card */}
                <div className="bg-primary-900 p-6 rounded-lg text-white sticky top-6">
                  <h3 className="font-semibold text-lg mb-3">Need Expert Help?</h3>
                  <p className="text-warm-300 text-sm mb-4">
                    Get personalized property recommendations from our Costa Blanca specialists.
                  </p>
                  <div className="space-y-3">
                    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-lg font-medium transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp Us
                    </a>
                    <a href={`tel:${CONTACT.phone}`}
                      className="flex items-center justify-center gap-2 w-full bg-accent-500 hover:bg-accent-600 text-white py-3 rounded-lg font-medium transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {CONTACT.phone}
                    </a>
                    <Link href="/consultation"
                      className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-colors border border-white/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Book Video Call
                    </Link>
                  </div>

                  {/* Trust indicators */}
                  <div className="mt-5 pt-5 border-t border-white/10">
                    <p className="text-warm-400 text-xs mb-2">Trusted by buyers from</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['🇬🇧', '🇩🇪', '🇸🇪', '🇳🇴', '🇳🇱', '🇧🇪'].map((flag) => (
                        <span key={flag} className="text-lg">{flag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Related Links */}
                <div className="bg-white p-6 rounded-lg border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Explore Properties</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/developments" className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Browse Developments
                      </Link>
                    </li>
                    <li>
                      <Link href="/areas" className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Explore Areas
                      </Link>
                    </li>
                    <li>
                      <Link href="/golf" className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                        </svg>
                        Golf Properties
                      </Link>
                    </li>
                    <li>
                      <Link href="/builders" className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        View Builders
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Latest Price CTA */}
                <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-6 rounded-lg text-white">
                  <h3 className="font-semibold text-lg mb-2">Get Latest Prices</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Prices change frequently. Get today's prices and availability direct from developers.
                  </p>
                  <Link href="/contact?subject=price-request"
                    className="block w-full bg-white text-accent-600 hover:bg-warm-50 text-center py-3 rounded-lg font-semibold transition-colors">
                    Request Price List
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Ready to Find Your New Build Home?</h2>
            <p className="text-warm-300 mb-8 max-w-2xl mx-auto">
              Book a free consultation with our property experts. We'll help you find the perfect property in Costa Blanca.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/consultation" className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Free Consultation
              </Link>
              <Link href="/developments" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-white/20">
                Browse Developments
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
