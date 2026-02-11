import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { breadcrumbSchema, collectionPageSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Guides Costa Blanca: Achat, Vie & Style de Vie | Conseils Français',
  description: 'Vos guides de la vie méditerranéenne. Guides régionaux, guides de plage, conseils d\'achat, vie golfique et tout ce que vous devez savoir sur la vie à Costa Blanca pour les Français.',
  openGraph: {
    title: 'Guides Costa Blanca: Achat, Vie & Style de Vie',
    description: 'Votre guide de la vie méditerranéenne en Espagne.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/fr/blog',
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

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: number;
  featured?: boolean;
  image?: string;
  tags?: string[];
  isFrench?: boolean;
  locale?: string;
}

const SLUG_IMAGES: Record<string, string> = {
  'best-beaches-costa-blanca': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
  'cost-of-living-costa-blanca': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
  'golf-lifestyle-costa-blanca': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=600&fit=crop',
  'healthcare-costa-blanca-expats': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
  'buying-off-plan-spain-guide': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  'svenska-livet-pa-costa-blanca': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop',
  'att-kopa-bostad-i-spanien-som-svensk': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
  'golf-i-spanien-for-svenska-golfare': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=600&fit=crop',
  'stockholmspris-vs-costa-blanca': 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop',
};

const CATEGORY_IMAGES: Record<string, string> = {
  'Style de vie': 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop',
  'Comparatifs régionaux': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  'Guides d\'achat': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
  'Golf & Sport': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=600&fit=crop',
  'Santé': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
  'Comparaison': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
};

interface CategoryConfig {
  title: string;
  description: string;
  icon?: string;
  color: string;
  bgColor: string;
  textColor: string;
}

const CATEGORIES: Record<string, CategoryConfig> = {
  top10: {
    title: 'Top 10 Listes',
    description: 'Les meilleures sélections que Costa Blanca a à offrir',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  lifestyle: {
    title: 'Style de vie & Habitation',
    description: 'Tout sur la vie méditerranéenne - plages, coût de la vie, santé et vie quotidienne',
    color: 'from-pink-500 to-orange-500',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
  },
  buying: {
    title: 'Guides d\'achat',
    description: 'Guides étape par étape pour acheter une propriété en Espagne',
    color: 'from-primary-600 to-primary-800',
    bgColor: 'bg-primary-50',
    textColor: 'text-primary-600',
  },
  areas: {
    title: 'Comparatifs régionaux',
    description: 'Nord vs sud, plage vs campagne - trouvez votre endroit parfait',
    color: 'from-accent-500 to-accent-700',
    bgColor: 'bg-accent-50',
    textColor: 'text-accent-600',
  },
  golf: {
    title: 'Golf & Sport',
    description: 'Terrains de golf, installations et guides de style de vie actif',
    color: 'from-emerald-500 to-green-700',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
};

function getArticles(): Article[] {
  // Primary directory for French articles
  const frArticlesDir: string = path.join(process.cwd(), 'src', 'content', 'articles', 'fr');

  const articles: Article[] = [];

  // Load only French articles — no English fallback
  if (fs.existsSync(frArticlesDir)) {
    const files: string[] = fs.readdirSync(frArticlesDir).filter((f: string) => f.endsWith('.json'));
    for (const file of files) {
      try {
        const content = JSON.parse(
          fs.readFileSync(path.join(frArticlesDir, file), 'utf-8')
        ) as Record<string, unknown>;
        const slug: string = file.replace('.json', '');
        articles.push({
          slug,
          title: (content.title as string) || 'Sans titre',
          excerpt: (content.excerpt as string) || '',
          category: (content.category as string) || 'Général',
          publishedAt: (content.publishedAt as string) || new Date().toISOString(),
          readTime: (content.readTime as number) || 5,
          featured: (content.featured as boolean) || false,
          image: (content.image as string | undefined) || SLUG_IMAGES[slug] || CATEGORY_IMAGES[(content.category as string) || ''] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
          tags: (content.tags as string[]) || [],
          isFrench: true,
          locale: 'fr',
        });
      } catch {
        // Skip invalid files
      }
    }
  }

  return articles.sort(
    (a: Article, b: Article) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

function translateCategory(englishCat: string): string {
  const map: Record<string, string> = {
    'Top 10': 'Top 10',
    'Lifestyle': 'Style de vie',
    'Area Guide': 'Comparatifs régionaux',
    'Buying Guide': 'Guides d\'achat',
    'Golf': 'Golf & Sport',
    'Healthcare': 'Santé',
  };
  return map[englishCat] || englishCat;
}

interface GroupedArticles {
  top10: Article[];
  lifestyle: Article[];
  buying: Article[];
  areas: Article[];
  golf: Article[];
}

function groupArticles(articles: Article[]): GroupedArticles {
  const top10: Article[] = articles.filter(
    (a: Article) =>
      a.category === 'Top 10' ||
      a.slug.includes('top-10-')
  );

  const lifestyle: Article[] = articles.filter(
    (a: Article) =>
      a.category === 'Style de vie' ||
      a.slug.includes('beach') ||
      a.slug.includes('cost-of-living') ||
      a.slug.includes('healthcare') ||
      a.slug.includes('svenska-livet')
  );

  const buying: Article[] = articles.filter(
    (a: Article) =>
      a.category === 'Guides d\'achat' ||
      a.slug.includes('buying') ||
      a.slug.includes('off-plan') ||
      a.slug.includes('nie-number') ||
      a.slug.includes('mortgage') ||
      a.slug.includes('costs-taxes') ||
      a.slug.includes('att-kopa')
  );

  const areas: Article[] = articles.filter(
    (a: Article) =>
      a.slug.includes('-vs-') ||
      a.category === 'Comparatifs régionaux' ||
      a.category === 'Comparaison'
  );

  const golf: Article[] = articles.filter(
    (a: Article) =>
      a.category === 'Golf & Sport' ||
      a.slug.includes('golf') ||
      a.slug.includes('la-finca')
  );

  return { top10, lifestyle, buying, areas, golf };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

interface HeroArticleProps {
  article: Article;
}

function HeroArticle({ article }: HeroArticleProps): JSX.Element {
  const href: string = `/fr/blog/${article.slug}`;

  return (
    <Link
      href={href}
      className="group block relative rounded-sm overflow-hidden h-[450px] md:h-[550px]"
    >
      <Image
        src={article.image || ''}
        alt={article.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block bg-accent-500 text-white text-xs font-bold px-4 py-2 rounded-sm uppercase tracking-wide">
            {article.category}
          </span>
          {article.isFrench && (
            <span className="inline-block bg-primary-900 text-white text-xs font-bold px-3 py-2 rounded-sm uppercase tracking-wide">
              Français
            </span>
          )}
        </div>
        <h2 className="text-2xl md:text-4xl font-light text-white mb-4 leading-tight group-hover:text-accent-300 transition-colors">
          {article.title}
        </h2>
        <p className="text-white/80 text-lg mb-6 max-w-2xl line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-4">
          <span className="bg-white text-primary-900 px-6 py-3 rounded-sm font-semibold group-hover:bg-accent-500 group-hover:text-white transition-colors">
            Lire l'article →
          </span>
          <span className="text-white/60 text-sm">{article.readTime} min de lecture</span>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ article }: { article: Article }): JSX.Element {
  const href: string = `/fr/blog/${article.slug}`;

  return (
    <Link href={href} className="group block bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all border border-warm-100">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.image || ''}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-primary-900 text-xs font-semibold px-3 py-1.5 rounded-sm">
            {article.category}
          </span>
          {article.isFrench && (
            <span className="bg-primary-900/90 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-sm">
              FR
            </span>
          )}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-light text-primary-900 mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-warm-600 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-warm-500">{formatDate(article.publishedAt)}</span>
          <span className="text-accent-600 font-medium group-hover:underline">{article.readTime} min →</span>
        </div>
      </div>
    </Link>
  );
}

interface CategorySectionProps {
  category: string;
  articles: Article[];
  config: CategoryConfig;
}

function CategorySection({
  category,
  articles,
  config,
}: CategorySectionProps): JSX.Element | null {
  if (articles.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-light text-primary-900">{config.title}</h2>
            <p className="text-warm-600 text-sm mt-1">{config.description}</p>
          </div>
          {articles.length > 3 && (
            <Link
              href={`/fr/blog?category=${category}`}
              className="text-accent-600 font-medium hover:underline hidden md:block text-sm"
            >
              Voir tous →
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article: Article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BlogPageFr(): JSX.Element {
  const articles: Article[] = getArticles();
  const featuredArticle: Article | undefined = articles.find(
    (a: Article) => a.featured
  ) || articles[0];
  const { top10, lifestyle, buying, areas, golf }: GroupedArticles =
    groupArticles(articles);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr/' },
    { name: 'Blog', url: 'https://newbuildhomescostablanca.com/fr/blog/' },
  ]);

  const blogCollectionSchema = collectionPageSchema({
    name: 'Guides Costa Blanca: Achat & Style de Vie',
    description: 'Guides d\'experts sur l\'achat de propriété et la vie à Costa Blanca, Espagne.',
    url: 'https://newbuildhomescostablanca.com/fr/blog/',
    items: articles.slice(0, 10).map((a: Article) => ({
      name: a.title,
      url: `https://newbuildhomescostablanca.com/fr/blog/${a.slug}/`,
    })),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(blogCollectionSchema) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-8">
              <Link href="/fr" className="hover:text-white transition-colors">
                Accueil
              </Link>
              <span className="mx-2">›</span>
              <span className="text-white">Blog & Guides</span>
            </nav>

            <div className="grid lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-2">
                <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">
                  Vie Costa Blanca
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mt-3 mb-6 leading-tight">
                  Votre guide de la{' '}
                  <span className="font-semibold text-accent-400">
                    vie méditerranéenne
                  </span>
                </h1>
                <p className="text-warm-200 text-lg leading-relaxed mb-8">
                  Tout ce que vous devez savoir pour acheter une propriété et vivre sur la côte la plus ensoleillée d'Espagne.
                </p>

                {/* Quick Links */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="#top10"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-sm p-4 text-center transition-colors"
                  >
                    <span className="text-white text-sm font-medium">Top 10</span>
                  </a>
                  <a
                    href="#lifestyle"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-sm p-4 text-center transition-colors"
                  >
                    <span className="text-white text-sm font-medium">Style de vie</span>
                  </a>
                  <a
                    href="#buying"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-sm p-4 text-center transition-colors"
                  >
                    <span className="text-white text-sm font-medium">
                      Guides d'achat
                    </span>
                  </a>
                  <a
                    href="#areas"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-sm p-4 text-center transition-colors"
                  >
                    <span className="text-white text-sm font-medium">
                      Comparatifs
                    </span>
                  </a>
                </div>
              </div>

              {/* Featured Article */}
              <div className="lg:col-span-3">
                {featuredArticle && <HeroArticle article={featuredArticle} />}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-white border-b border-warm-200 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-light text-primary-900">
                  {articles.length}
                </div>
                <div className="text-warm-500 text-sm">Guides experts</div>
              </div>
              <div>
                <div className="text-3xl font-light text-primary-900">300+</div>
                <div className="text-warm-500 text-sm">Jours de soleil</div>
              </div>
              <div>
                <div className="text-3xl font-light text-primary-900">200km</div>
                <div className="text-warm-500 text-sm">Côte</div>
              </div>
              <div>
                <div className="text-3xl font-light text-primary-900">20+</div>
                <div className="text-warm-500 text-sm">Parcours de golf</div>
              </div>
            </div>
          </div>
        </section>

        {/* Top 10 Section */}
        <div id="top10" className="bg-white">
          <CategorySection category="top10" articles={top10} config={CATEGORIES.top10} />
        </div>

        {/* Lifestyle Section */}
        <div id="lifestyle" className="bg-warm-100">
          <CategorySection category="lifestyle" articles={lifestyle} config={CATEGORIES.lifestyle} />
        </div>

        {/* Buying Guides Section */}
        <div id="buying" className="bg-warm-100">
          <CategorySection category="buying" articles={buying} config={CATEGORIES.buying} />
        </div>

        {/* Area Comparisons Section */}
        <div id="areas">
          <CategorySection category="areas" articles={areas} config={CATEGORIES.areas} />
        </div>

        {/* Golf Section */}
        <div id="golf" className="bg-warm-100">
          <CategorySection category="golf" articles={golf} config={CATEGORIES.golf} />
        </div>

        {/* All Articles Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-primary-900 mb-3">
                Tous les articles
              </h2>
              <p className="text-warm-600">
                Parcourez notre collection complète de guides et d'insights
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles.map((article: Article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-r from-accent-500 to-accent-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-3">
              Restez informé
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Recevez de nouveaux articles, mises à jour du marché immobilier et conseils d'initiés chaque semaine.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              name="newsletter-fr"
              method="POST"
              data-netlify="true"
            >
              <input
                type="hidden"
                name="form-name"
                value="newsletter-fr"
              />
              <input
                type="email"
                name="email"
                placeholder="Entrez votre email"
                required
                className="flex-1 px-5 py-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-white text-primary-900"
              />
              <button
                type="submit"
                className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-4 rounded-sm font-semibold transition-colors"
              >
                S'abonner
              </button>
            </form>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Link
                href="/fr/properties"
                className="group block bg-gradient-to-br from-primary-900 to-primary-700 rounded-sm p-8 hover:shadow-2xl transition-all"
              >
                <h3 className="text-xl font-light text-white mb-2 group-hover:text-accent-300 transition-colors">
                  Parcourir les propriétés
                </h3>
                <p className="text-warm-300 mb-4">
                  Explorez 1000+ nouvelles maisons à Costa Blanca.
                </p>
                <span className="text-accent-400 font-semibold">
                  Voir les propriétés →
                </span>
              </Link>

              <Link
                href="/fr/contact"
                className="group block bg-gradient-to-br from-accent-500 to-accent-700 rounded-sm p-8 hover:shadow-2xl transition-all"
              >
                <h3 className="text-xl font-light text-white mb-2">
                  Obtenir des conseils d'experts
                </h3>
                <p className="text-white/90 mb-4">
                  Notre équipe locale peut répondre à vos questions.
                </p>
                <span className="text-white font-semibold">Contactez-nous →</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
