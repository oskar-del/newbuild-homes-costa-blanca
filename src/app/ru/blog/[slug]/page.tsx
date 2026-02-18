// ISR: Regenerate blog pages every 24 hours
export const revalidate = 86400;

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';
import { markdownToHtml, slugify } from '@/lib/blog-renderer';

const LANG = 'ru';
const BASE_URL = 'https://newbuildhomescostablanca.com';
const ARTICLES_DIR = path.join(process.cwd(), 'src', 'content', 'articles', LANG);

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

interface ArticleSection { title: string; content: string; }
interface FAQ { question: string; answer: string; }
interface ArticleContent {
  slug: string; title: string; metaTitle?: string; metaDescription?: string;
  excerpt: string; category: string; publishedAt: string; updatedAt?: string;
  readTime: number; author?: string; image?: string; tags?: string[];
  content: string | { intro: string; quickAnswer?: string; sections?: ArticleSection[]; conclusion: string; faqs?: FAQ[]; };
  relatedArticles?: string[];
}

function getArticle(slug: string): ArticleContent | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.json`);
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
      console.error(`Error parsing article ${slug}:`, error);
      return null;
    }
  }
  return null;
}

function getRelatedArticles(currentSlug: string, limit = 3) {
  try {
    if (!fs.existsSync(ARTICLES_DIR)) return [];
    return fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.json'))
      .map(f => {
        try {
          return JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf-8'));
        } catch {
          return null;
        }
      })
      .filter((a): a is any => a !== null && a.slug !== currentSlug).slice(0, limit)
      .map((a: ArticleContent) => ({ slug: a.slug, title: a.title, category: a.category, readTime: a.readTime, excerpt: a.excerpt }));
  } catch { return []; }
}

export async function generateStaticParams() {
  try {
    if (!fs.existsSync(ARTICLES_DIR)) return [];
    // Limit to first 5 articles to speed up build
    // Remaining articles will use ISR (generated on first request)
    return fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.json')).slice(0, 5).map(f => ({ slug: f.replace('.json', '') }));
  } catch { return []; }
}

// Enable ISR for remaining articles - they'll be built on first request and cached
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Статья не найдена' };
  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, type: 'article', publishedTime: article.publishedAt },
    alternates: {
      canonical: `${BASE_URL}/${LANG}/blog/${slug}`,
      languages: {
        'en': `${BASE_URL}/blog/${slug}`,
        'sv': `${BASE_URL}/sv/blog/${slug}`,
        'nl': `${BASE_URL}/nl/blog/${slug}`,
        'nl-BE': `${BASE_URL}/nl-be/blog/${slug}`,
        'fr': `${BASE_URL}/fr/blog/${slug}`,
        'no': `${BASE_URL}/no/blog/${slug}`,
        'de': `${BASE_URL}/de/blog/${slug}`,
        'pl': `${BASE_URL}/pl/blog/${slug}`,
        'ru': `${BASE_URL}/ru/blog/${slug}`,
        'x-default': `${BASE_URL}/blog/${slug}`,
      },
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: `${BASE_URL}/${LANG}` },
    { name: 'Blog', url: `${BASE_URL}/${LANG}/blog` },
    { name: article.title, url: `${BASE_URL}/${LANG}/blog/${slug}` },
  ]);
  const relatedArticles = getRelatedArticles(slug, 3);
  const isStructured = typeof article.content === 'object';
  const structured = isStructured ? (article.content as any) : null;
  const tableOfContents = isStructured && structured.sections
    ? [...structured.sections.map((s: ArticleSection) => ({ id: slugify(s.title), title: s.title })),
       ...structured.faqs?.length ? [{ id: 'faqs', title: 'Часто задаваемые вопросы' }] : []]
    : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      {structured?.faqs && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema(structured.faqs)) }} />}

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="relative bg-primary-900 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href={`/${LANG}`} className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <Link href={`/${LANG}/blog`} className="hover:text-white transition-colors">Blog</Link>
              <span className="mx-2">›</span>
              <span className="text-white truncate">{article.title}</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-accent-500 text-white text-xs font-medium px-3 py-1 rounded">{article.category}</span>
              <span className="text-warm-400 text-sm">{article.readTime} мин чтения</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-warm-400 text-sm">
              {article.author && <span>{article.author}</span>}
              <span>{new Date(article.publishedAt).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              <article className="lg:col-span-2">
                <div className="bg-white p-6 md:p-8 rounded-sm border border-warm-200">
                  {isStructured ? (
                    <div className="prose prose-lg max-w-none">
                      {structured.quickAnswer && (
                        <div className="mb-8 bg-gradient-to-br from-primary-50 to-accent-50 rounded-sm p-5 border border-accent-200">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="flex-shrink-0 w-7 h-7 bg-accent-500 text-white rounded-full flex items-center justify-center text-sm">✓</span>
                            <span className="text-primary-900 font-bold text-sm uppercase tracking-wide">Быстрый ответ</span>
                          </div>
                          <p className="text-warm-800 font-medium leading-relaxed m-0">{structured.quickAnswer}</p>
                        </div>
                      )}
                      <div className="mb-8 text-lg" dangerouslySetInnerHTML={{ __html: markdownToHtml(structured.intro || '') }} />
                      {tableOfContents.length > 3 && (
                        <nav className="mb-10 bg-warm-50 rounded-sm border border-warm-200">
                          <details className="group" open>
                            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-primary-900 hover:bg-warm-100 rounded-t-sm transition-colors">
                              <span>В этой статье</span>
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
                      {structured.sections?.map((section: ArticleSection, index: number) => {
                        const isAlt = index % 2 === 1;
                        return (
                          <div key={index}>
                            <section id={slugify(section.title)} className={`scroll-mt-20 ${isAlt ? 'bg-warm-50/80 -mx-6 md:-mx-8 px-6 md:px-8 py-6 rounded-sm my-4' : 'mb-8'}`}>
                              <h2 className="text-2xl font-bold text-primary-900 mb-5 pl-4 border-l-4 border-accent-500">{section.title}</h2>
                              <div dangerouslySetInnerHTML={{ __html: markdownToHtml(section.content) }} />
                            </section>
                            {!isAlt && index < (structured.sections?.length || 0) - 1 && (
                              <div className="flex items-center gap-4 my-6"><div className="flex-1 h-px bg-warm-200" /><span className="text-warm-300 text-xs">●</span><div className="flex-1 h-px bg-warm-200" /></div>
                            )}
                          </div>
                        );
                      })}
                      {structured.conclusion && (
                        <section className="mt-10 p-6 md:p-8 bg-gradient-to-r from-accent-500 to-primary-800 rounded-sm text-white [&_p]:text-white/90 [&_strong]:text-white [&_div]:text-white/90">
                          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">✓</span>
                            Заключение
                          </h2>
                          <div dangerouslySetInnerHTML={{ __html: markdownToHtml(structured.conclusion) }} />
                        </section>
                      )}
                      {structured.faqs?.length > 0 && (
                        <section id="faqs" className="mt-10 scroll-mt-20">
                          <h2 className="text-2xl font-bold text-primary-900 mb-6">Часто задаваемые вопросы</h2>
                          <div className="space-y-4">
                            {structured.faqs.map((faq: FAQ, idx: number) => (
                              <details key={idx} className="group border border-warm-200 rounded-sm">
                                <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-primary-900 hover:bg-warm-50 transition-colors">
                                  <span className="pr-4 flex items-center gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                                    {faq.question}
                                  </span>
                                  <span className="ml-4 flex-shrink-0 text-warm-400 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <div className="px-4 pb-4 text-warm-700">{faq.answer}</div>
                              </details>
                            ))}
                          </div>
                        </section>
                      )}
                      <div className="mt-8 p-5 bg-primary-900 rounded-sm text-white lg:hidden">
                        <h3 className="font-semibold text-lg mb-2">Нужна помощь?</h3>
                        <div className="flex flex-col gap-3">
                          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-center py-3 rounded font-medium transition-colors">WhatsApp</a>
                          <a href={`tel:${CONTACT.phone}`} className="block w-full bg-accent-500 hover:bg-accent-600 text-white text-center py-3 rounded font-medium transition-colors">{CONTACT.phone}</a>
                          <Link href={`/${LANG}/contact`} className="block w-full bg-white/10 hover:bg-white/20 text-white text-center py-3 rounded font-medium transition-colors border border-white/20">Записаться на видеозвонок</Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: markdownToHtml(typeof article.content === 'string' ? article.content : '') }} />
                  )}
                </div>
              </article>
              <aside className="lg:col-span-1 space-y-6">
                <div className="bg-primary-900 p-6 rounded-sm text-white sticky top-6">
                  <h3 className="font-semibold text-lg mb-3">Нужна помощь?</h3>
                  <p className="text-warm-300 text-sm mb-4">Персональные рекомендации для вас</p>
                  <div className="space-y-3">
                    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-sm font-medium transition-colors">WhatsApp</a>
                    <a href={`tel:${CONTACT.phone}`} className="flex items-center justify-center gap-2 w-full bg-accent-500 hover:bg-accent-600 text-white py-3 rounded-sm font-medium transition-colors">{CONTACT.phone}</a>
                    <Link href={`/${LANG}/contact`} className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-sm font-medium transition-colors border border-white/20">Записаться на видеозвонок</Link>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-sm border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Изучить недвижимость</h3>
                  <ul className="space-y-3">
                    <li><Link href={`/${LANG}/developments`} className="text-accent-600 hover:text-accent-700 font-medium">Смотреть проекты</Link></li>
                    <li><Link href={`/${LANG}/areas`} className="text-accent-600 hover:text-accent-700 font-medium">Изучить районы</Link></li>
                    <li><Link href={`/${LANG}/golf`} className="text-accent-600 hover:text-accent-700 font-medium">Гольф-недвижимость</Link></li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-6 rounded-sm text-white">
                  <h3 className="font-semibold text-lg mb-2">Актуальные цены</h3>
                  <p className="text-white/90 text-sm mb-4">Запросить наш прайс-лист</p>
                  <Link href={`/${LANG}/contact`} className="block w-full bg-white text-accent-600 hover:bg-warm-50 text-center py-3 rounded-sm font-semibold transition-colors">Запросить прайс-лист</Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {relatedArticles.length > 0 && (
          <section className="py-12 bg-warm-100">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl font-bold text-primary-900 mb-8 text-center">Ещё статьи</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link key={related.slug} href={`/${LANG}/blog/${related.slug}`} className="bg-white rounded-sm overflow-hidden border border-warm-200 hover:shadow-lg transition-shadow group">
                    <div className="p-6">
                      <span className="bg-accent-100 text-accent-800 text-xs font-medium px-2 py-0.5 rounded">{related.category}</span>
                      <h3 className="font-bold text-primary-900 mt-2 mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">{related.title}</h3>
                      <p className="text-warm-500 text-sm line-clamp-2">{related.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-12 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Готовы найти дом мечты?</h2>
            <p className="text-warm-300 mb-8">Свяжитесь с нами сегодня</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${LANG}/contact`} className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-sm transition-colors">Бесплатная консультация</Link>
              <Link href={`/${LANG}/developments`} className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-sm transition-colors border border-white/20">Смотреть проекты</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
