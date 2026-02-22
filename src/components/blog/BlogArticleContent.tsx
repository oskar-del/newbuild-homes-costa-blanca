/**
 * Shared blog article page content component
 * Used by all language blog pages (nl, sv, de, fr, no, pl, ru, nl-be)
 * Contains full rendering: property showcases, area links, smart related articles,
 * FAQs, consultation CTA, card grids, rich content formatting
 */
import Link from 'next/link';
import Image from 'next/image';
import { breadcrumbSchema, faqSchema, articleSchema, toJsonLd } from '@/lib/schema';
import { markdownToHtml, slugify, inlineFmt } from '@/lib/blog-renderer';
import ArticlePropertyShowcase from '@/components/ArticlePropertyShowcase';
import type { ArticleContent, PropertyShowcase, Property, RelatedArticle, ArticleSection, FAQ } from '@/lib/blog-page-utils';
import type { BlogStrings } from '@/lib/blog-strings';

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

const BASE_URL = 'https://newbuildhomescostablanca.com';

interface BlogArticleContentProps {
  article: ArticleContent;
  relatedArticles: RelatedArticle[];
  availableProperties: Property[];
  lang: string;
  langPrefix: string; // e.g. '/nl' or '' for english
  strings: BlogStrings;
  dateLocale: string;
}

// ── Card detection for rich content rendering ──
interface ContentCard {
  title: string;
  stars: number;
  hasArrow: boolean;
  bullets: string[];
}
interface ContentBlock {
  type: 'prose' | 'cards';
  html?: string;
  cards?: ContentCard[];
}

function parseContentBlocks(text: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = text.split('\n');
  let proseLines: string[] = [];
  let currentCard: ContentCard | null = null;
  const cardBuffer: ContentCard[] = [];

  const flushProse = () => {
    if (proseLines.length > 0) {
      const joined = proseLines.join('\n').trim();
      if (joined) blocks.push({ type: 'prose', html: markdownToHtml(joined) });
      proseLines = [];
    }
  };
  const flushCards = () => {
    if (currentCard) { cardBuffer.push(currentCard); currentCard = null; }
    if (cardBuffer.length >= 3) {
      flushProse();
      blocks.push({ type: 'cards', cards: [...cardBuffer] });
    } else {
      cardBuffer.forEach(card => {
        const starStr = card.stars > 0 ? ' ' + '⭐'.repeat(card.stars) : '';
        proseLines.push(`**${card.title}**${starStr}`);
        card.bullets.forEach(b => proseLines.push(`- ${b}`));
        proseLines.push('');
      });
    }
    cardBuffer.length = 0;
  };

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    const boldMatch = trimmed.match(/^\*\*(.*?)\*\*\s*(⭐*)\s*$/);
    const arrowMatch = !boldMatch ? trimmed.match(/^\*\*(.*?(?:→|Properties|Options|Access).*?)\*\*\s*$/) : null;

    if (boldMatch || arrowMatch) {
      let nextIdx = i + 1;
      while (nextIdx < lines.length && !lines[nextIdx].trim()) nextIdx++;
      const nextIsBullet = nextIdx < lines.length && lines[nextIdx].trim().startsWith('- ');
      if (nextIsBullet) {
        if (currentCard) cardBuffer.push(currentCard);
        const title = boldMatch ? boldMatch[1] : arrowMatch![1];
        const stars = boldMatch && boldMatch[2] ? boldMatch[2].length : 0;
        currentCard = { title, stars, hasArrow: !!arrowMatch, bullets: [] };
        continue;
      } else {
        if (currentCard) { cardBuffer.push(currentCard); currentCard = null; }
        flushCards();
        proseLines.push(lines[i]);
        continue;
      }
    }

    if (trimmed.startsWith('- ') && currentCard) {
      currentCard.bullets.push(trimmed.slice(2));
      continue;
    }

    if (currentCard) { cardBuffer.push(currentCard); currentCard = null; }
    if (cardBuffer.length > 0 && !trimmed) {
      let nextIdx = i + 1;
      while (nextIdx < lines.length && !lines[nextIdx].trim()) nextIdx++;
      const nextLine = nextIdx < lines.length ? lines[nextIdx].trim() : '';
      if (!/^\*\*(.*?)\*\*/.test(nextLine)) flushCards();
      continue;
    }
    if (cardBuffer.length > 0) flushCards();
    proseLines.push(lines[i]);
  }

  if (currentCard) cardBuffer.push(currentCard);
  flushCards();
  flushProse();
  return blocks;
}

function renderCardGrid(cards: ContentCard[]): string {
  const cardHtmls = cards.map((card) => {
    const stars = card.stars > 0 ? ` <span class="text-amber-500 ml-1">${'★'.repeat(card.stars)}</span>` : '';
    const bullets = card.bullets.map(b =>
      `<div class="flex items-start gap-2 py-0.5"><span class="flex-shrink-0 w-1.5 h-1.5 mt-[9px] bg-accent-400 rounded-full"></span><span class="text-warm-600 text-sm leading-relaxed">${inlineFmt(b)}</span></div>`
    ).join('\n');
    return `<div class="border border-accent-500 border-l-4 border-t-0 border-r-0 border-b-0 rounded-sm p-4 bg-white hover:shadow-md transition-shadow"><h3 class="font-bold text-primary-900 text-[15px] mb-2">${inlineFmt(card.title)}${stars}</h3><div class="space-y-0.5">${bullets}</div></div>`;
  });
  return `<div class="grid md:grid-cols-2 gap-4 my-4">${cardHtmls.join('\n')}</div>`;
}

function renderSectionContent(text: string): string {
  if (!text) return '';
  const blocks = parseContentBlocks(text);
  return blocks.map(block => {
    if (block.type === 'cards' && block.cards) return renderCardGrid(block.cards);
    return block.html || '';
  }).join('\n');
}

export default function BlogArticleContent({
  article,
  relatedArticles,
  availableProperties,
  lang,
  langPrefix,
  strings,
  dateLocale,
}: BlogArticleContentProps) {
  const isStructured = typeof article.content === 'object';
  const structured = isStructured ? (article.content as any) : null;

  // Breadcrumbs
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}${langPrefix || '/'}` },
    { name: 'Blog', url: `${BASE_URL}${langPrefix}/blog` },
    { name: article.title, url: `${BASE_URL}${langPrefix}/blog/${article.slug}` },
  ]);

  // Property showcases
  const propertyShowcases: PropertyShowcase[] = structured?.propertyShowcases || [];
  const autoShowcases: PropertyShowcase[] = [];
  if (propertyShowcases.length === 0 && article.relatedAreas && article.relatedAreas.length > 0 && availableProperties.length > 0) {
    const relevantProperties = availableProperties.slice(0, 6);
    if (relevantProperties.length > 0) {
      autoShowcases.push({
        position: 'mid-article',
        title: strings.exploreProperties,
        variant: 'carousel',
        properties: relevantProperties,
        ctaText: strings.browseDevelopments,
        ctaLink: `${langPrefix}/developments`,
      });
    }
  }
  const allShowcases = [...propertyShowcases, ...autoShowcases];

  const getShowcasesByPosition = (position: string) =>
    allShowcases.filter(s => s.position === position);

  const renderPropertyShowcaseEl = (showcase: PropertyShowcase) => (
    <ArticlePropertyShowcase
      key={`${showcase.position}-${showcase.title}`}
      title={showcase.title}
      subtitle={showcase.subtitle}
      variant={showcase.variant}
      theme={showcase.theme}
      properties={showcase.properties.length > 0 ? showcase.properties : availableProperties.slice(0, 6)}
      ctaText={showcase.ctaText}
      ctaLink={showcase.ctaLink ? (showcase.ctaLink.startsWith('/') && !showcase.ctaLink.startsWith(langPrefix) ? `${langPrefix}${showcase.ctaLink}` : showcase.ctaLink) : undefined}
    />
  );

  // Table of contents
  const tableOfContents = isStructured && structured.sections
    ? [
        ...structured.sections.map((s: ArticleSection) => ({ id: slugify(s.title), title: s.title })),
        ...(structured.faqs?.length ? [{ id: 'faqs', title: strings.faqs }] : []),
      ]
    : [];

  const showConsultationCTA = structured?.showConsultationCTA;

  // Article structured data for blog posts
  const blogArticleSchema = articleSchema({
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    datePublished: article.publishedAt,
    author: article.author || 'New Build Homes Costa Blanca',
    url: `${BASE_URL}${langPrefix}/blog/${article.slug}`,
    image: article.image,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(blogArticleSchema) }} />
      {structured?.faqs?.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema(structured.faqs)) }} />
      )}
      {article.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article.schema) }} />
      )}

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="relative bg-primary-900 py-12 md:py-16 overflow-hidden">
          {article.image && (
            <div className="absolute inset-0">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover opacity-20"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/95 to-primary-900/80" />
            </div>
          )}
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href={`${langPrefix || '/'}`} className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <Link href={`${langPrefix}/blog`} className="hover:text-white transition-colors">Blog</Link>
              <span className="mx-2">›</span>
              <span className="text-white truncate">{article.title}</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-accent-500 text-white text-xs font-medium px-3 py-1 rounded">{article.category}</span>
              <span className="text-warm-400 text-sm">{article.readTime} {strings.minRead}</span>
              {article.updatedAt && article.updatedAt !== article.publishedAt && (
                <span className="text-success-400 text-xs font-medium bg-success-400/10 px-2 py-0.5 rounded">
                  {strings.updated} {new Date(article.updatedAt).toLocaleDateString(dateLocale, { month: 'short', year: 'numeric' })}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-warm-400 text-sm">
              {article.author && <span>{article.author}</span>}
              <span>{new Date(article.publishedAt).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <article className="lg:col-span-2">
                <div className="bg-white p-6 md:p-8 rounded-sm border border-warm-200">
                  {isStructured ? (
                    <div className="prose prose-lg max-w-none">
                      {/* Quick Answer */}
                      {structured.quickAnswer && (
                        <div className="mb-8 bg-gradient-to-br from-primary-50 to-accent-50 rounded-sm p-5 border border-accent-200">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="flex-shrink-0 w-7 h-7 bg-accent-500 text-white rounded-full flex items-center justify-center text-sm">✓</span>
                            <span className="text-primary-900 font-bold text-sm uppercase tracking-wide">{strings.quickAnswer}</span>
                          </div>
                          <p className="text-warm-800 font-medium leading-relaxed m-0">{structured.quickAnswer}</p>
                        </div>
                      )}

                      {/* Intro */}
                      <div className="mb-8 text-lg" dangerouslySetInnerHTML={{ __html: markdownToHtml(structured.intro || '') }} />

                      {/* Property Showcases - After Intro */}
                      {getShowcasesByPosition('after-intro').map(renderPropertyShowcaseEl)}

                      {/* Consultation CTA - After Intro */}
                      {showConsultationCTA === 'after-intro' && (
                        <div className="my-8 p-6 bg-warm-50 border border-warm-200 rounded-sm">
                          <h3 className="font-bold text-primary-900 mb-2">{strings.consultation}</h3>
                          <p className="text-warm-600 text-sm mb-4">{strings.consultationDesc}</p>
                          <Link href={`${langPrefix}/contact`} className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-colors">
                            {strings.freeConsultation}
                          </Link>
                        </div>
                      )}

                      {/* Table of Contents */}
                      {tableOfContents.length > 3 && (
                        <nav className="mb-10 bg-warm-50 rounded-sm border border-warm-200">
                          <details className="group" open>
                            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-primary-900 hover:bg-warm-100 rounded-t-sm transition-colors">
                              <span>{strings.inThisArticle}</span>
                              <span className="text-warm-400 group-open:rotate-180 transition-transform text-sm">▼</span>
                            </summary>
                            <ol className="px-5 pb-5 space-y-2 list-decimal list-inside text-warm-700">
                              {tableOfContents.map((item: any, idx: number) => (
                                <li key={idx}><a href={`#${item.id}`} className="text-accent-600 hover:text-accent-700 hover:underline transition-colors">{item.title}</a></li>
                              ))}
                            </ol>
                          </details>
                        </nav>
                      )}

                      {/* Sections */}
                      {structured.sections?.map((section: ArticleSection, index: number) => {
                        const sectionShowcases = allShowcases.filter(
                          s => s.position === 'after-section' && s.afterSection === index
                        );
                        const isMidPoint = index === Math.floor((structured.sections?.length || 0) / 2);
                        const isAlt = index % 2 === 1;

                        return (
                          <div key={index}>
                            <section
                              id={slugify(section.title)}
                              className={`scroll-mt-20 ${isAlt ? 'bg-warm-50/80 -mx-6 md:-mx-8 px-6 md:px-8 py-6 rounded-sm my-4' : 'mb-8'}`}
                            >
                              <h2 className="text-2xl font-bold text-primary-900 mb-5 pl-4 border-l-4 border-accent-500">
                                {section.title}
                              </h2>
                              <div dangerouslySetInnerHTML={{ __html: renderSectionContent(section.content) }} />
                            </section>

                            {/* Divider */}
                            {!isAlt && index < (structured.sections?.length || 0) - 1 && sectionShowcases.length === 0 && !isMidPoint && (
                              <div className="flex items-center gap-4 my-6">
                                <div className="flex-1 h-px bg-warm-200" />
                                <span className="text-warm-300 text-xs">●</span>
                                <div className="flex-1 h-px bg-warm-200" />
                              </div>
                            )}

                            {/* Property Showcases after this section */}
                            {sectionShowcases.map(renderPropertyShowcaseEl)}

                            {/* Mid-article showcases and CTA */}
                            {isMidPoint && (
                              <>
                                {getShowcasesByPosition('mid-article').map(renderPropertyShowcaseEl)}
                                {showConsultationCTA === 'mid-article' && (
                                  <div className="my-8 p-6 bg-warm-50 border border-warm-200 rounded-sm">
                                    <h3 className="font-bold text-primary-900 mb-2">{strings.consultation}</h3>
                                    <p className="text-warm-600 text-sm mb-4">{strings.consultationDesc}</p>
                                    <Link href={`${langPrefix}/contact`} className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-colors">
                                      {strings.freeConsultation}
                                    </Link>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}

                      {/* Property Showcases - Before Conclusion */}
                      {getShowcasesByPosition('before-conclusion').map(renderPropertyShowcaseEl)}

                      {/* Conclusion */}
                      {structured.conclusion && (
                        <section className="mt-10 p-6 md:p-8 bg-warm-50 rounded-sm border border-warm-200">
                          <h2 className="text-xl font-bold text-primary-900 mb-4 pl-4 border-l-4 border-accent-500">
                            {strings.conclusion}
                          </h2>
                          <div className="[&_p]:text-warm-700 [&_strong]:text-primary-900" dangerouslySetInnerHTML={{ __html: markdownToHtml(structured.conclusion) }} />
                        </section>
                      )}

                      {/* Consultation CTA - Before FAQs */}
                      {(showConsultationCTA === true || showConsultationCTA === 'before-faqs') && (
                        <div className="my-8 p-6 bg-warm-50 border border-warm-200 rounded-sm">
                          <h3 className="font-bold text-primary-900 mb-2">{strings.consultation}</h3>
                          <p className="text-warm-600 text-sm mb-4">{strings.consultationDesc}</p>
                          <Link href={`${langPrefix}/contact`} className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-colors">
                            {strings.freeConsultation}
                          </Link>
                        </div>
                      )}

                      {/* FAQs */}
                      {structured.faqs && structured.faqs.length > 0 && (
                        <section id="faqs" className="mt-10 scroll-mt-20">
                          <h2 className="text-2xl font-bold text-primary-900 mb-6">{strings.faqs}</h2>
                          <div className="space-y-3">
                            {structured.faqs.map((faq: FAQ, idx: number) => (
                              <details key={idx} className="group border border-warm-200 rounded-sm">
                                <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-primary-900 hover:bg-warm-50 transition-colors">
                                  <span className="pr-4 flex items-center gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                                    {faq.question}
                                  </span>
                                  <span className="ml-4 flex-shrink-0 text-warm-400 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <div className="px-4 pb-4 text-warm-700 leading-relaxed">{faq.answer}</div>
                              </details>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Mobile CTA */}
                      <div className="mt-8 p-5 bg-primary-900 rounded-sm text-white lg:hidden">
                        <h3 className="font-semibold text-lg mb-2">{strings.needHelp}</h3>
                        <div className="flex flex-col gap-3">
                          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-center py-3 rounded font-medium transition-colors">WhatsApp</a>
                          <a href={`tel:${CONTACT.phone}`} className="block w-full bg-accent-500 hover:bg-accent-600 text-white text-center py-3 rounded font-medium transition-colors">{CONTACT.phone}</a>
                          <Link href={`${langPrefix}/contact`} className="block w-full bg-white/10 hover:bg-white/20 text-white text-center py-3 rounded font-medium transition-colors border border-white/20">{strings.bookVideoCall}</Link>
                        </div>
                      </div>

                      {/* Related Areas Pills */}
                      {article.relatedAreas && article.relatedAreas.length > 0 && (
                        <section className="mt-8 p-6 bg-accent-50 rounded-sm">
                          <h3 className="font-bold text-primary-900 mb-4">{strings.exploreTheseAreas}</h3>
                          <div className="flex flex-wrap gap-2">
                            {article.relatedAreas.map((area: string) => (
                              <Link
                                key={area}
                                href={`${langPrefix}/areas/${area}`}
                                className="bg-white px-4 py-2 rounded-sm border border-warm-200 text-accent-600 hover:border-accent-500 hover:shadow-md transition-all font-medium text-sm group"
                              >
                                {area.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} <span className="group-hover:text-accent-600">→</span>
                              </Link>
                            ))}
                          </div>
                        </section>
                      )}
                    </div>
                  ) : (
                    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: markdownToHtml(typeof article.content === 'string' ? article.content : '') }} />
                  )}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-6">
                {/* Contact Card */}
                <div className="bg-primary-900 p-6 rounded-sm text-white sticky top-6">
                  <h3 className="font-semibold text-lg mb-3">{strings.needHelp}</h3>
                  <p className="text-warm-300 text-sm mb-4">{strings.personalRecs}</p>
                  <div className="space-y-3">
                    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-sm font-medium transition-colors">WhatsApp</a>
                    <a href={`tel:${CONTACT.phone}`} className="flex items-center justify-center gap-2 w-full bg-accent-500 hover:bg-accent-600 text-white py-3 rounded-sm font-medium transition-colors">{CONTACT.phone}</a>
                    <Link href={`${langPrefix}/contact`} className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-sm font-medium transition-colors border border-white/20">{strings.bookVideoCall}</Link>
                  </div>
                </div>

                {/* Explore Links */}
                <div className="bg-white p-6 rounded-sm border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-4">{strings.exploreProperties}</h3>
                  <ul className="space-y-3">
                    <li><Link href={`${langPrefix}/developments`} className="text-accent-600 hover:text-accent-700 font-medium">{strings.browseDevelopments}</Link></li>
                    <li><Link href={`${langPrefix}/areas`} className="text-accent-600 hover:text-accent-700 font-medium">{strings.exploreAreas}</Link></li>
                    <li><Link href={`${langPrefix}/golf`} className="text-accent-600 hover:text-accent-700 font-medium">{strings.golfProperties}</Link></li>
                  </ul>
                </div>

                {/* Price CTA */}
                <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-6 rounded-sm text-white">
                  <h3 className="font-semibold text-lg mb-2">{strings.latestPrices}</h3>
                  <p className="text-white/90 text-sm mb-4">{strings.pricesChangeDesc}</p>
                  <Link href={`${langPrefix}/contact`} className="block w-full bg-white text-accent-600 hover:bg-warm-50 text-center py-3 rounded-sm font-semibold transition-colors">{strings.requestPriceList}</Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-12 bg-warm-100">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl font-bold text-primary-900 mb-2 text-center">{strings.continueReading}</h2>
              <p className="text-warm-500 text-center mb-8">{strings.moreGuides}</p>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`${langPrefix}/blog/${related.slug}`}
                    className="bg-white rounded-sm overflow-hidden border border-warm-200 hover:shadow-lg transition-shadow group"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-accent-100 text-accent-800 text-xs font-medium px-2 py-0.5 rounded">{related.category}</span>
                        <span className="text-warm-400 text-xs">{related.readTime} {strings.minRead}</span>
                      </div>
                      <h3 className="font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">{related.title}</h3>
                      <p className="text-warm-500 text-sm line-clamp-2">{related.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-12 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">{strings.readyToFind}</h2>
            <p className="text-warm-300 mb-8">{strings.readyToFindDesc}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`${langPrefix}/contact`} className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-sm transition-colors">{strings.freeConsultation}</Link>
              <Link href={`${langPrefix}/developments`} className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-sm transition-colors border border-white/20">{strings.viewDevelopments}</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
