import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

const LANG = 'no';
const ARTICLES_DIR = path.join(process.cwd(), 'src', 'content', 'articles', LANG);

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: number;
  featured?: boolean;
  tags?: string[];
}

export const metadata: Metadata = {
  title: 'Blog | New Build Homes Costa Blanca',
  description: 'Les artikler om å kjøpe eiendom på Costa Blanca, tips for nordmenn, markedstrends og livsstil i Spania.',
  openGraph: {
    title: 'Blog | New Build Homes Costa Blanca',
    description: 'Alt du trenger å vite om å kjøpe eiendom på Costa Blanca.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/no/blog',
    siteName: 'New Build Homes Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/blog',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/blog',
      'sv': 'https://newbuildhomescostablanca.com/sv/blog',
      'nl': 'https://newbuildhomescostablanca.com/nl/blog',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/blog',
      'fr': 'https://newbuildhomescostablanca.com/fr/blog',
      'no': 'https://newbuildhomescostablanca.com/no/blog',
      'de': 'https://newbuildhomescostablanca.com/de/blog',
      'pl': 'https://newbuildhomescostablanca.com/pl/blog',
      'ru': 'https://newbuildhomescostablanca.com/ru/blog',
      'x-default': 'https://newbuildhomescostablanca.com/blog',
    },
  },
};

function getAllArticles(): Article[] {
  try {
    if (!fs.existsSync(ARTICLES_DIR)) return [];
    return fs.readdirSync(ARTICLES_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => {
        const data = JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf-8'));
        return {
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt,
          category: data.category,
          publishedAt: data.publishedAt,
          readTime: data.readTime,
          featured: data.featured,
          tags: data.tags,
        };
      })
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch {
    return [];
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function NOBlogPage() {
  const articles = getAllArticles();
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no/' },
    { name: 'Blog', url: 'https://newbuildhomescostablanca.com/no/blog/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="relative bg-primary-900 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/no" className="hover:text-white transition-colors">Hjem</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Blog</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
                Blog: Tips & Innsikt
              </h1>
              <p className="text-warm-300 text-lg leading-relaxed">
                Lær om å kjøpe eiendom på Costa Blanca, tips for nordmenn, juridisk veiledning og markedstrender.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/no/blog/${article.slug}`}
                  className="group bg-white rounded-sm border border-warm-200 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent-100 text-accent-700">
                        {article.category}
                      </span>
                      <span className="text-warm-500 text-xs">{article.readTime} min lesetid</span>
                    </div>

                    <h3 className="text-xl font-semibold text-primary-900 mb-3 leading-tight group-hover:text-accent-600 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-warm-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-warm-100">
                      <span className="text-warm-500 text-xs">{formatDate(article.publishedAt)}</span>
                      <span className="text-accent-600 hover:text-accent-700 font-semibold text-sm">
                        Les mer →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-white mb-4">
              Få Tips I Din <span className="font-semibold">Innboks</span>
            </h2>
            <p className="text-warm-300 mb-8">
              Abonnér på nyhetsbrevet vårt for tips om eiendomskjøp, markjedstrender og nyheter fra Costa Blanca.
            </p>
            <form className="flex gap-3 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Din e-post"
                className="flex-1 px-4 py-3 rounded-sm text-primary-900"
                required
              />
              <button
                type="submit"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-all"
              >
                Abonnér
              </button>
            </form>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-primary-900 mb-4">
              Trenger Du <span className="font-semibold">Eksperthjælp?</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Har du spørsmål om å kjøpe eiendom på Costa Blanca? Kontakt oss for gratis rådgivning.
            </p>
            <Link
              href="/no/contact"
              className="bg-primary-900 hover:bg-primary-800 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
            >
              Kontakt Oss
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
