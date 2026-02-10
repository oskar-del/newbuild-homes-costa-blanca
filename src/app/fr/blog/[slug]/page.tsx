import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

const LANG = 'fr';
const LANG_LABEL = 'Français';
const BASE_URL = 'https://newbuildhomescostablanca.com';
const ARTICLES_DIR = path.join(process.cwd(), 'src', 'content', 'articles', LANG);

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
  content: string | {
    intro: string;
    quickAnswer?: string;
    sections?: ArticleSection[];
    conclusion: string;
    faqs?: FAQ[];
  };
  relatedArticles?: string[];
}

function getArticle(slug: string): ArticleContent | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.json`);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  return null;
}

function getRelatedArticles(currentSlug: string, limit: number = 3) {
  try {
    if (!fs.existsSync(ARTICLES_DIR)) return [];
    const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.json'));
    return files
      .map(f => JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf-8')))
      .filter((a: ArticleContent) => a.slug !== currentSlug)
      .slice(0, limit)
      .map((a: ArticleContent) => ({ slug: a.slug, title: a.title, category: a.category, readTime: a.readTime, excerpt: a.excerpt }));
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  try {
    if (!fs.existsSync(ARTICLES_DIR)) return [];
    return fs.readdirSync(ARTICLES_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => ({ slug: f.replace('.json', '') }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Article non trouvé' };

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
      canonical: `${BASE_URL}/${LANG}/blog/${slug}`,
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
  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9àâäéèêëïîôùûüÿçœæ]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      {structured?.faqs && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema(structured.faqs)) }} />
      )}

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-warm-300 text-sm mb-4">
              <Link href={`/${LANG}/blog`} className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span>{article.category}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-light mb-6">{article.title}</h1>
            <p className="text-xl text-warm-200 mb-6">{article.excerpt}</p>
            <div className="flex items-center gap-4 text-warm-300 text-sm">
              {article.author && <span>{article.author}</span>}
              <span>{article.readTime} min de lecture</span>
              <span>{new Date(article.publishedAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Quick Answer */}
            {structured?.quickAnswer && (
              <div className="bg-accent-500/10 border-l-4 border-accent-500 p-6 rounded-sm mb-8">
                <p className="font-semibold text-primary-900 mb-2">Réponse rapide</p>
                <p className="text-warm-700">{structured.quickAnswer}</p>
              </div>
            )}

            {/* Table of Contents */}
            {structured?.sections && structured.sections.length > 2 && (
              <nav className="bg-white border border-warm-200 rounded-sm p-6 mb-8">
                <p className="font-semibold text-primary-900 mb-3">Sommaire</p>
                <ul className="space-y-2">
                  {structured.sections.map((section: ArticleSection, i: number) => (
                    <li key={i}>
                      <a href={`#${slugify(section.title)}`} className="text-accent-600 hover:text-accent-700 transition-colors text-sm">
                        {i + 1}. {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Intro */}
            {isStructured ? (
              <div className="prose prose-lg max-w-none mb-8 text-warm-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: (structured.intro || '').replace(/\n/g, '<br/>') }} />
            ) : (
              <div className="prose prose-lg max-w-none mb-8 text-warm-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: (article.content as string).replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>') }} />
            )}

            {/* Sections */}
            {structured?.sections?.map((section: ArticleSection, i: number) => (
              <section key={i} id={slugify(section.title)} className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-light text-primary-900 mb-4">{section.title}</h2>
                <div className="prose prose-lg max-w-none text-warm-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: section.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n\n/g, '</p><p>')
                      .replace(/\n- /g, '</p><ul><li>')
                      .replace(/\n/g, '<br/>')
                      .replace(/^/, '<p>')
                      .replace(/$/, '</p>')
                  }}
                />
              </section>
            ))}

            {/* Conclusion */}
            {structured?.conclusion && (
              <section className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-light text-primary-900 mb-4">Conclusion</h2>
                <div className="prose prose-lg max-w-none text-warm-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: structured.conclusion.replace(/\n/g, '<br/>') }} />
              </section>
            )}

            {/* FAQs */}
            {structured?.faqs && structured.faqs.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-light text-primary-900 mb-6">Questions fréquentes</h2>
                <div className="space-y-4">
                  {structured.faqs.map((faq: FAQ, i: number) => (
                    <details key={i} className="bg-white border border-warm-200 rounded-sm">
                      <summary className="p-4 cursor-pointer font-semibold text-primary-900 hover:text-accent-600 transition-colors">
                        {faq.question}
                      </summary>
                      <div className="px-4 pb-4 text-warm-700">{faq.answer}</div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-sm p-8 text-white text-center mb-10">
              <h3 className="text-2xl font-light mb-4">Vous avez des questions ?</h3>
              <p className="text-warm-200 mb-6">Notre équipe francophone est à votre disposition</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${LANG}/contact`} className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-8 rounded-sm transition-colors">
                  Nous contacter
                </Link>
                <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-sm transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <section>
                <h2 className="text-2xl font-light text-primary-900 mb-6">Articles similaires</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedArticles.map((related) => (
                    <Link key={related.slug} href={`/${LANG}/blog/${related.slug}`} className="bg-white border border-warm-200 rounded-sm p-6 hover:shadow-lg transition-shadow group">
                      <span className="text-xs text-accent-600 font-semibold uppercase">{related.category}</span>
                      <h3 className="text-lg font-light text-primary-900 mt-2 mb-2 group-hover:text-accent-600 transition-colors">{related.title}</h3>
                      <p className="text-warm-600 text-sm line-clamp-2">{related.excerpt}</p>
                      <span className="text-warm-400 text-xs mt-2 inline-block">{related.readTime} min</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>
      </main>
    </>
  );
}
