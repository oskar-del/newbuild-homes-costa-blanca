import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

const LANG = 'fr';
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
  title: 'Blog | Conseils Immobilier Costa Blanca',
  description: 'Conseils et astuces pour acheter du neuf en Espagne. Guides complets sur les taxes, les frais d\'hypothèque et le processus d\'achat.',
  openGraph: {
    title: 'Blog | Conseils Immobilier Costa Blanca',
    description: 'Découvrez nos articles informatifs sur l\'immobilier neuf.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/fr/blog',
    siteName: 'Maisons Neuves Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/blog',
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
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function FRBlogPage() {
  const articles = getAllArticles();
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr/' },
    { name: 'Blog', url: 'https://newbuildhomescostablanca.com/fr/blog/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        <section className="bg-primary-900 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
                Blog & Conseils <span className="font-semibold">Immobiliers</span>
              </h1>
              <p className="text-warm-300 text-lg">
                Tout ce que vous devez savoir pour acheter une maison neuve en Espagne
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/fr/blog/${article.slug}`}
                  className="group bg-white rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-warm-200"
                >
                  <div className="bg-gradient-to-br from-primary-900 to-primary-800 h-40 flex items-end p-4">
                    <span className="bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-600 transition-colors mb-3">
                      {article.title}
                    </h3>
                    <p className="text-warm-600 text-sm mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-warm-500">{formatDate(article.publishedAt)}</span>
                      <span className="text-accent-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Lire la suite
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-warm-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-6">
              Vous ne Trouvez Pas Ce <span className="font-semibold">Que Vous Cherchez?</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Contactez notre équipe pour des questions spécifiques sur l'achat immobilier en Espagne.
            </p>
            <Link
              href="/fr/contact"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center gap-2"
            >
              Nous Contacter
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
