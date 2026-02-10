import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const LANG = 'de';
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
  title: 'Costa Blanca Blog | Tipps & Leitfäden für Käufer',
  description: 'Lesen Sie die neuesten Tipps und Leitfäden für den Hauskauf an der Costa Blanca. Expertenrat für deutsche Käufer.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de/blog',
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
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogPage() {
  const articles = getAllArticles();
  const categories = [...new Set(articles.map(a => a.category))];

  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Costa Blanca <span className="font-semibold">Blog</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-2xl mx-auto">
            Expertenrat und Tipps für deutsche Käufer. Erfahren Sie alles über den Hauskauf an der Costa Blanca.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-2xl font-light text-primary-900 mb-6">Kategorien</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <span
                  key={category}
                  className="inline-block bg-warm-100 text-primary-900 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/de/blog/${article.slug}`}
                className="group bg-warm-50 rounded-sm p-6 border border-warm-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-block bg-accent-100 text-accent-700 text-xs font-bold px-2.5 py-1 rounded-sm">
                    {article.category}
                  </span>
                  <span className="text-xs text-warm-500">{formatDate(article.publishedAt)}</span>
                </div>
                <h3 className="text-xl font-light text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-warm-700 text-sm mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium text-sm">
                  Weiterlesen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            Haben Sie eine <span className="font-semibold">Frage?</span>
          </h2>
          <p className="text-warm-300 mb-8">Unser Team ist bereit, Ihre Fragen zu beantworten und Sie zu unterstützen.</p>
          <Link
            href="/de/contact"
            className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-block"
          >
            Jetzt Kontaktieren
          </Link>
        </div>
      </section>
    </main>
  );
}
