import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

const LANG = 'ru';
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
  title: 'Блог Коста Бланка | Советы По Покупке Недвижимости',
  description: 'Читайте статьи о покупке недвижимости в Испании, инвестициях, налогах, визах и образе жизни на Коста Бланка.',
  keywords: 'блог коста бланка, советы покупка недвижимости испания, налоги испания',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/blog',
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
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function RUBlogPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Блог и <span className="font-semibold">Полезные Статьи</span>
          </h1>
          <p className="text-warm-300 max-w-2xl mx-auto">
            Советы, гайды и информация для русскоговорящих покупателей недвижимости на Коста Бланка.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/ru/blog/${article.slug}`}
                className="group block bg-warm-50 rounded-sm p-8 border border-warm-200 hover:shadow-lg hover:border-accent-200 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm text-warm-500">{formatDate(article.publishedAt)}</span>
                  <div className="flex items-center gap-1 text-accent-600 font-medium text-sm group-hover:text-accent-700">
                    Читать далее
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-primary-900 group-hover:text-accent-600 mb-3 transition-colors">
                  {article.title}
                </h3>
                <p className="text-warm-600">
                  {article.excerpt}
                </p>
                <div className="mt-4 text-sm text-warm-500">
                  {article.readTime} мин чтения
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-primary-900 mb-4">
            Подпишитесь На <span className="font-semibold">Обновления</span>
          </h2>
          <p className="text-warm-600 mb-8">
            Получайте новые статьи и советы прямо на вашу почту.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваша почта"
              className="flex-1 px-4 py-3 rounded-sm border border-warm-300 focus:outline-none focus:border-accent-500"
            />
            <button
              type="submit"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-all"
            >
              Подписаться
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
