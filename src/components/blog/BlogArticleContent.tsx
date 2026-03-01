/**
 * Shared blog article page content component
 * Used by all language blog pages (nl, sv, de, fr, no, pl, ru, nl-be)
 * Contains full rendering: property showcases, area links, smart related articles,
 * FAQs, consultation CTA, card grids, rich content formatting
 *
 * REDESIGNED: Feb 2026 — warm editorial layout with decorative dividers,
 * scroll-reveal sections, and premium visual rhythm
 */
import Link from 'next/link';
import Image from 'next/image';
import { breadcrumbSchema, faqSchema, articleSchema, toJsonLd } from '@/lib/schema';
import { markdownToHtml, slugify, inlineFmt } from '@/lib/blog-renderer';
import ArticlePropertyShowcase from '@/components/ArticlePropertyShowcase';
import NewsletterCTA from '@/components/NewsletterCTA';
import LeadForm from '@/components/LeadForm';
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
  langPrefix: string;
  strings: BlogStrings;
  dateLocale: string;
}

// ── Decorative SVG Curve Divider ──
function WaveDivider({ flip, color = 'warm-100' }: { flip?: boolean; color?: string }) {
  const colorMap: Record<string, string> = {
    'warm-100': '#FAF9F7',
    'warm-50': '#FDFCFA',
    'white': '#ffffff',
    'primary-900': '#1E2A38',
    'accent-50': '#fdfcf9',
  };
  const fill = colorMap[color] || '#FAF9F7';
  return (
    <div className={`relative w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
      <svg
        className="relative block w-full h-[40px] md:h-[60px]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          fill={fill}
          opacity=".25"
        />
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          fill={fill}
          opacity=".5"
        />
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

// ── Small Gold Accent Divider ──
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8" aria-hidden="true">
      <div className="w-12 h-px bg-accent-300" />
      <div className="w-1.5 h-1.5 bg-accent-400 rounded-full" />
      <div className="w-12 h-px bg-accent-300" />
    </div>
  );
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
    return `<div class="border-l-3 border-accent-500 rounded-sm p-5 bg-white shadow-soft hover:shadow-medium transition-shadow"><h3 class="font-semibold text-primary-900 text-[15px] mb-3">${inlineFmt(card.title)}${stars}</h3><div class="space-y-0.5">${bullets}</div></div>`;
  });
  return `<div class="grid md:grid-cols-2 gap-4 my-6">${cardHtmls.join('\n')}</div>`;
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
        {/* ─── Hero — Full-width editorial banner ─── */}
        <section className="relative bg-primary-900 overflow-hidden">
          {article.image && (
            <div className="absolute inset-0">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover opacity-15"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-b from-primary-900/70 via-primary-900/90 to-primary-900" />
            </div>
          )}
          <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-20 md:pb-24">
            <nav className="text-warm-400 text-sm mb-8">
              <Link href={`${langPrefix || '/'}`} className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2 text-warm-500">›</span>
              <Link href={`${langPrefix}/blog`} className="hover:text-white transition-colors">Blog</Link>
              <span className="mx-2 text-warm-500">›</span>
              <span className="text-warm-300 truncate">{article.title}</span>
            </nav>
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-accent-500 text-white text-xs font-medium px-3 py-1 rounded-sm tracking-wide">{article.category}</span>
              <span className="text-warm-400 text-sm">{article.readTime} {strings.minRead}</span>
              {article.updatedAt && article.updatedAt !== article.publishedAt && (
                <span className="text-success-400 text-xs font-medium bg-success-400/10 px-2 py-0.5 rounded-sm">
                  {strings.updated} {new Date(article.updatedAt).toLocaleDateString(dateLocale, { month: 'short', year: 'numeric' })}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-5">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-warm-400 text-sm">
              {article.author && <span className="font-medium text-warm-300">{article.author}</span>}
              <span>{new Date(article.publishedAt).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </section>

        {/* Wave transition from hero to content */}
        <WaveDivider color="warm-50" />

        {/* ─── Content ─── */}
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <article className="lg:col-span-2">
                {isStructured ? (
                  <div className="prose prose-lg max-w-none">
                    {/* Quick Answer — warm cream box with gold accent */}
                    {structured.quickAnswer && (
                      <div className="animate-on-scroll mb-10 bg-gradient-to-br from-accent-50 via-warm-100 to-warm-50 rounded-sm p-6 md:p-7 border border-accent-200/60 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent-500" />
                        <div className="flex items-center gap-2.5 mb-3 ml-3">
                          <span className="flex-shrink-0 w-7 h-7 bg-accent-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                          <span className="text-primary-900 font-bold text-xs uppercase tracking-[0.15em]">{strings.quickAnswer}</span>
                        </div>
                        <p className="text-warm-800 font-medium leading-relaxed m-0 ml-3 text-lg">{structured.quickAnswer}</p>
                      </div>
                    )}

                    {/* Intro — slightly larger, editorial */}
                    <div className="animate-on-scroll mb-10 text-lg leading-relaxed [&_p]:text-warm-700 [&_p]:mb-4 [&_strong]:text-primary-900" dangerouslySetInnerHTML={{ __html: markdownToHtml(structured.intro || '') }} />

                    {/* Property Showcases - After Intro */}
                    {getShowcasesByPosition('after-intro').map(renderPropertyShowcaseEl)}

                    {/* Consultation CTA - After Intro */}
                    {showConsultationCTA === 'after-intro' && (
                      <div className="animate-on-scroll my-10 p-6 bg-warm-100 border border-warm-200 rounded-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-accent-500" />
                        <h3 className="font-semibold text-primary-900 mb-2">{strings.consultation}</h3>
                        <p className="text-warm-600 text-sm mb-4">{strings.consultationDesc}</p>
                        <Link href={`${langPrefix}/contact`} className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-colors">
                          {strings.freeConsultation}
                        </Link>
                      </div>
                    )}

                    {/* Table of Contents — warm box with numbered items */}
                    {tableOfContents.length > 3 && (
                      <nav className="animate-on-scroll mb-12 bg-white rounded-sm border border-warm-200 shadow-soft">
                        <details className="group" open>
                          <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-warm-50/50 rounded-t-sm transition-colors">
                            <span className="font-semibold text-primary-900 text-sm tracking-wide">{strings.inThisArticle}</span>
                            <span className="text-warm-400 group-open:rotate-180 transition-transform text-xs">▼</span>
                          </summary>
                          <ol className="px-5 pb-5 space-y-2.5">
                            {tableOfContents.map((item: any, idx: number) => (
                              <li key={idx} className="flex items-center gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-accent-100 text-accent-700 rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                                <a href={`#${item.id}`} className="text-warm-700 hover:text-accent-600 transition-colors text-sm">{item.title}</a>
                              </li>
                            ))}
                          </ol>
                        </details>
                      </nav>
                    )}

                    {/* ─── Article Sections with visual rhythm ─── */}
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
                            className={`animate-on-scroll scroll-mt-20 rounded-sm transition-colors ${
                              isAlt
                                ? 'bg-warm-100/60 -mx-4 md:-mx-6 px-4 md:px-6 py-7 my-6 border border-warm-200/50'
                                : 'mb-8 py-2'
                            }`}
                          >
                            <h2 className="text-xl md:text-2xl font-light text-primary-900 mb-5 flex items-center gap-3">
                              <span className="w-8 h-px bg-accent-500 flex-shrink-0" />
                              <span>{section.title}</span>
                            </h2>
                            <div className="[&_p]:text-warm-700 [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-primary-900 [&_a]:text-accent-600 [&_a:hover]:text-accent-700 [&_ul]:space-y-2 [&_li]:text-warm-700" dangerouslySetInnerHTML={{ __html: renderSectionContent(section.content) }} />
                          </section>

                          {/* Gold accent divider between non-alt sections */}
                          {!isAlt && index < (structured.sections?.length || 0) - 1 && sectionShowcases.length === 0 && !isMidPoint && (
                            <GoldDivider />
                          )}

                          {/* Property Showcases after this section */}
                          {sectionShowcases.map(renderPropertyShowcaseEl)}

                          {/* Mid-article showcases and CTA */}
                          {isMidPoint && (
                            <>
                              {getShowcasesByPosition('mid-article').map(renderPropertyShowcaseEl)}
                              {showConsultationCTA === 'mid-article' && (
                                <div className="animate-on-scroll my-10 p-6 bg-warm-100 border border-warm-200 rounded-sm relative overflow-hidden">
                                  <div className="absolute top-0 left-0 w-full h-0.5 bg-accent-500" />
                                  <h3 className="font-semibold text-primary-900 mb-2">{strings.consultation}</h3>
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

                    {/* ─── Conclusion — warm editorial box ─── */}
                    {structured.conclusion && (
                      <section className="animate-on-scroll mt-12 relative">
                        <div className="bg-gradient-to-br from-warm-100 via-accent-50/30 to-warm-50 rounded-sm p-6 md:p-8 border border-warm-200 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-500 via-accent-400 to-transparent" />
                          <h2 className="text-xl font-light text-primary-900 mb-5 flex items-center gap-3">
                            <span className="w-8 h-px bg-accent-500 flex-shrink-0" />
                            <span>{strings.conclusion}</span>
                          </h2>
                          <div className="[&_p]:text-warm-700 [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-primary-900" dangerouslySetInnerHTML={{ __html: markdownToHtml(structured.conclusion) }} />
                        </div>
                      </section>
                    )}

                    {/* Consultation CTA - Before FAQs */}
                    {(showConsultationCTA === true || showConsultationCTA === 'before-faqs') && (
                      <div className="animate-on-scroll my-10 p-6 bg-warm-100 border border-warm-200 rounded-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-accent-500" />
                        <h3 className="font-semibold text-primary-900 mb-2">{strings.consultation}</h3>
                        <p className="text-warm-600 text-sm mb-4">{strings.consultationDesc}</p>
                        <Link href={`${langPrefix}/contact`} className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-colors">
                          {strings.freeConsultation}
                        </Link>
                      </div>
                    )}

                    {/* ─── FAQs — premium accordion ─── */}
                    {structured.faqs && structured.faqs.length > 0 && (
                      <>
                        <GoldDivider />
                        <section id="faqs" className="animate-on-scroll scroll-mt-20">
                          <h2 className="text-xl md:text-2xl font-light text-primary-900 mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-accent-500 flex-shrink-0" />
                            <span>{strings.faqs}</span>
                          </h2>
                          <div className="space-y-3">
                            {structured.faqs.map((faq: FAQ, idx: number) => (
                              <details key={idx} className="group bg-white border border-warm-200 rounded-sm shadow-soft hover:shadow-medium transition-shadow">
                                <summary className="flex justify-between items-center cursor-pointer p-4 md:p-5 text-primary-900 hover:bg-warm-50/50 transition-colors">
                                  <span className="pr-4 flex items-center gap-3 font-medium">
                                    <span className="flex-shrink-0 w-7 h-7 bg-accent-100 text-accent-700 rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                                    {faq.question}
                                  </span>
                                  <span className="ml-4 flex-shrink-0 text-warm-400 group-open:rotate-180 transition-transform text-xs">▼</span>
                                </summary>
                                <div className="px-4 md:px-5 pb-4 md:pb-5 text-warm-700 leading-relaxed ml-10">{faq.answer}</div>
                              </details>
                            ))}
                          </div>
                        </section>
                      </>
                    )}

                    {/* Newsletter Signup — after FAQs */}
                    <div className="animate-on-scroll mt-10">
                      <NewsletterCTA
                        type="developments"
                        areaName={article.relatedAreas?.[0]?.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        language={lang}
                        sourcePage={`/blog/${article.slug}`}
                      />
                    </div>

                    {/* Mobile CTA */}
                    <div className="mt-10 p-6 bg-primary-900 rounded-sm text-white lg:hidden">
                      <h3 className="font-semibold text-lg mb-3">{strings.needHelp}</h3>
                      <div className="flex flex-col gap-3">
                        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-center py-3 rounded-sm font-medium transition-colors">WhatsApp</a>
                        <a href={`tel:${CONTACT.phone}`} className="block w-full bg-accent-500 hover:bg-accent-600 text-white text-center py-3 rounded-sm font-medium transition-colors">{CONTACT.phone}</a>
                        <Link href={`${langPrefix}/contact`} className="block w-full bg-white/10 hover:bg-white/20 text-white text-center py-3 rounded-sm font-medium transition-colors border border-white/20">{strings.bookVideoCall}</Link>
                      </div>
                    </div>

                    {/* Related Areas Pills */}
                    {article.relatedAreas && article.relatedAreas.length > 0 && (
                      <section className="animate-on-scroll mt-10 p-6 bg-accent-50/50 rounded-sm border border-accent-200/40">
                        <h3 className="font-semibold text-primary-900 mb-4 text-sm tracking-wide">{strings.exploreTheseAreas}</h3>
                        <div className="flex flex-wrap gap-2">
                          {article.relatedAreas.map((area: string) => (
                            <Link
                              key={area}
                              href={`${langPrefix}/areas/${area}`}
                              className="bg-white px-4 py-2 rounded-sm border border-warm-200 text-accent-600 hover:border-accent-500 hover:shadow-soft transition-all font-medium text-sm group"
                            >
                              {area.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} <span className="group-hover:text-accent-600 transition-colors">→</span>
                            </Link>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                ) : (
                  <div className="bg-white p-6 md:p-8 rounded-sm border border-warm-200 prose prose-lg max-w-none [&_p]:text-warm-700 [&_p]:leading-relaxed" dangerouslySetInnerHTML={{ __html: markdownToHtml(typeof article.content === 'string' ? article.content : '') }} />
                )}
              </article>

              {/* ─── Sidebar ─── */}
              <aside className="lg:col-span-1 space-y-5 hidden lg:block">
                <div className="sticky top-6 space-y-5">
                  {/* Contact Card */}
                  <div className="bg-primary-900 p-6 rounded-sm text-white">
                    <h3 className="font-semibold text-lg mb-3">{strings.needHelp}</h3>
                    <p className="text-warm-300 text-sm mb-4 leading-relaxed">{strings.personalRecs}</p>
                    <div className="space-y-3">
                      <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-sm font-medium transition-colors text-sm">WhatsApp</a>
                      <a href={`tel:${CONTACT.phone}`} className="flex items-center justify-center gap-2 w-full bg-accent-500 hover:bg-accent-600 text-white py-3 rounded-sm font-medium transition-colors text-sm">{CONTACT.phone}</a>
                      <Link href={`${langPrefix}/contact`} className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-sm font-medium transition-colors border border-white/20 text-sm">{strings.bookVideoCall}</Link>
                    </div>
                  </div>

                  {/* Explore Links */}
                  <div className="bg-white p-6 rounded-sm border border-warm-200">
                    <h3 className="font-semibold text-primary-900 mb-4 text-sm">{strings.exploreProperties}</h3>
                    <ul className="space-y-3">
                      <li><Link href={`${langPrefix}/developments`} className="text-accent-600 hover:text-accent-700 font-medium text-sm transition-colors">{strings.browseDevelopments}</Link></li>
                      <li><Link href={`${langPrefix}/areas`} className="text-accent-600 hover:text-accent-700 font-medium text-sm transition-colors">{strings.exploreAreas}</Link></li>
                      <li><Link href={`${langPrefix}/golf`} className="text-accent-600 hover:text-accent-700 font-medium text-sm transition-colors">{strings.golfProperties}</Link></li>
                    </ul>
                  </div>

                  {/* Price CTA */}
                  <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-6 rounded-sm text-white">
                    <h3 className="font-semibold text-base mb-2">{strings.latestPrices}</h3>
                    <p className="text-white/90 text-sm mb-4 leading-relaxed">{strings.pricesChangeDesc}</p>
                    <Link href={`${langPrefix}/contact`} className="block w-full bg-white text-accent-600 hover:bg-warm-50 text-center py-3 rounded-sm font-semibold transition-colors text-sm">{strings.requestPriceList}</Link>
                  </div>

                  {/* Newsletter Signup — Sidebar */}
                  <NewsletterCTA
                    type="developments"
                    language={lang}
                    sourcePage={`/blog/${article.slug}`}
                  />
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Wave transition to related articles */}
        {relatedArticles.length > 0 && <WaveDivider color="warm-100" flip />}

        {/* ─── Related Articles ─── */}
        {relatedArticles.length > 0 && (
          <section className="py-14 bg-warm-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-[0.2em] uppercase">More to Read</span>
                  <div className="w-10 h-px bg-accent-500" />
                </div>
                <h2 className="text-2xl font-light text-primary-900">{strings.continueReading}</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`${langPrefix}/blog/${related.slug}`}
                    className="animate-on-scroll bg-white rounded-sm overflow-hidden border border-warm-200 hover:shadow-lift hover:border-accent-500/30 transition-all group"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-accent-100 text-accent-800 text-xs font-medium px-2 py-0.5 rounded-sm">{related.category}</span>
                        <span className="text-warm-400 text-xs">{related.readTime} {strings.minRead}</span>
                      </div>
                      <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">{related.title}</h3>
                      <p className="text-warm-500 text-sm line-clamp-2 leading-relaxed">{related.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Wave transition to CTA */}
        <WaveDivider color="primary-900" flip />

        {/* ─── Bottom CTA with Lead Form ─── */}
        <section className="py-14 bg-primary-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-light text-white mb-3">
                {strings.readyToFind}
              </h2>
              <p className="text-warm-300 max-w-xl mx-auto">{strings.readyToFindDesc}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Quick Contact Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">{strings.needHelp}</h3>

                {/* WhatsApp */}
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-sm transition-colors"
                >
                  <div className="w-10 h-10 bg-[#1da851] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">WhatsApp Us</div>
                    <div className="text-white/80 text-sm">Fastest response — usually within minutes</div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-center gap-4 p-4 bg-accent-500 hover:bg-accent-600 text-white rounded-sm transition-colors"
                >
                  <div className="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{CONTACT.phone}</div>
                    <div className="text-white/80 text-sm">English, Swedish, Spanish</div>
                  </div>
                </a>

                {/* Browse Developments */}
                <Link
                  href={`${langPrefix}/developments`}
                  className="flex items-center gap-4 p-4 bg-white/10 hover:bg-white/20 text-white rounded-sm transition-colors border border-white/20"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{strings.viewDevelopments}</div>
                    <div className="text-white/60 text-sm">{strings.browseDevelopments}</div>
                  </div>
                </Link>

                {/* Trust badges */}
                <div className="pt-4 text-center text-sm text-warm-400">
                  <p>Part of Hansson & Hertzell Group · Established 2006</p>
                  <p className="mt-1">Free service for buyers · No hidden fees</p>
                </div>
              </div>

              {/* Lead Form */}
              <div>
                <LeadForm
                  propertyInterest={article.title}
                  title={strings.consultation}
                  subtitle={strings.consultationDesc}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
