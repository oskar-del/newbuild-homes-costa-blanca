import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const LANG = 'pl';
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
  title: 'Blog Nieruchomości Costa Blanca | Artykuły i Poradniki',
  description: 'Przeczytaj artykuły i poradniki dotyczące kupowania nieruchomości na Costa Blance. Ekspertne porady dla polskich kupujących.',
  openGraph: {
    title: 'Blog Nieruchomości Costa Blanca',
    description: 'Artykuły dotyczące kupowania nieruchomości na Costa Blance.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/pl/blog',
    siteName: 'Nowe Domy Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl/blog',
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
  return new Date(dateStr).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function PolishBlogPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-warm-50">
      <section className="relative bg-primary-900 overflow-hidden py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
            Artykuły i <span className="font-semibold text-accent-400">Poradniki</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-3xl mx-auto">
            Ekspertne porady, poradniki i artykuły dotyczące kupowania nieruchomości na Costa Blance. Wszystko, co musisz wiedzieć.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/pl/blog/${article.slug}`}
                className="group bg-warm-50 rounded-sm p-8 border border-warm-200 hover:shadow-lg hover:border-accent-300 transition-all"
              >
                <div className="mb-4">
                  <span className="inline-block bg-accent-100 text-accent-700 text-xs font-medium px-3 py-1 rounded mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-semibold text-primary-900 group-hover:text-accent-600 transition-colors">
                    {article.title}
                  </h3>
                </div>
                <p className="text-warm-600 text-sm mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-warm-500 text-xs">{formatDate(article.publishedAt)}</span>
                  <div className="text-accent-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    Czytaj więcej
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-primary-900 rounded-sm p-8 text-center">
            <h3 className="text-2xl font-light text-white mb-4">
              Nie Znalazłeś Tego, <span className="font-semibold">Czego Szukasz?</span>
            </h3>
            <p className="text-warm-300 mb-6">
              Skontaktuj się z nami, a my odadziemy odpowiedzi na wszystkie Twoje pytania dotyczące kupna domu.
            </p>
            <Link href="/pl/contact" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all">
              Skontaktuj Się
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900">
              Popularne Tematy
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/pl/guides" className="bg-white rounded-sm p-6 border border-warm-200 hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Wszystkie Przewodniki</h3>
              <p className="text-warm-600 text-sm">Pełny katalog przewodników dla kupujących.</p>
            </Link>

            <Link href="/pl/properties" className="bg-white rounded-sm p-6 border border-warm-200 hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Przeglądaj Nieruchomości</h3>
              <p className="text-warm-600 text-sm">Przejdź do naszej listy nieruchomości.</p>
            </Link>

            <Link href="/pl/contact" className="bg-white rounded-sm p-6 border border-warm-200 hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Porozmawiaj z Ekspertem</h3>
              <p className="text-warm-600 text-sm">Uzyskaj porady od naszych specjalistów.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
