import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { breadcrumbSchema, collectionPageSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Коста Бланка Путеводители: Купить, Жить & Образ жизни | Советы для русских',
  description: 'Ваш путеводитель по средиземноморской жизни. Путеводители по регионам, пляжам, советы по покупке, жизнь гольфе и все, что нужно знать о жизни на Коста Бланке для русских.',
  openGraph: {
    title: 'Коста Бланка Путеводители: Купить, Жить & Образ жизни',
    description: 'Ваш путеводитель по средиземноморской жизни в Испании.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/ru/blog',
  },
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
  isRussian?: boolean;
  locale?: string;
}

const SLUG_IMAGES: Record<string, string> = {
  'best-beaches-costa-blanca': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
  'cost-of-living-costa-blanca': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
  'golf-lifestyle-costa-blanca': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=600&fit=crop',
  'healthcare-costa-blanca-expats': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
  'buying-off-plan-spain-guide': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  'russkaya-zhizn-na-costa-blanca': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop',
  'pokupka-doma-v-ispanii-dlya-russkikh': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
  'golf-v-ispanii-dlya-russkikh-golfistrv': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=600&fit=crop',
  'moskva-tseny-vs-costa-blanca': 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop',
};

const CATEGORY_IMAGES: Record<string, string> = {
  'Образ жизни': 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop',
  'Руководство по регионам': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  'Руководство покупателя': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
  'Гольф': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=600&fit=crop',
  'Здравоохранение': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
  'Сравнение': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
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
    title: 'Топ 10 Списки',
    description: 'Куратед рейтинги лучшего что предлагает Коста Бланка',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  lifestyle: {
    title: 'Образ жизни & Проживание',
    description: 'Все о средиземноморской жизни - пляжи, стоимость жизни, здравоохранение и повседневная жизнь',
    color: 'from-pink-500 to-orange-500',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
  },
  buying: {
    title: 'Руководства покупателя',
    description: 'Пошаговые руководства по покупке недвижимости в Испании',
    color: 'from-primary-600 to-primary-800',
    bgColor: 'bg-primary-50',
    textColor: 'text-primary-600',
  },
  areas: {
    title: 'Сравнения регионов',
    description: 'Север против юга, пляж против внутренних - найдите свое идеальное место',
    color: 'from-accent-500 to-accent-700',
    bgColor: 'bg-accent-50',
    textColor: 'text-accent-600',
  },
  golf: {
    title: 'Гольф & Спорт',
    description: 'Поля для гольфа, сооружения и активные руководства по образу жизни',
    color: 'from-emerald-500 to-green-700',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
};

function getArticles(): Article[] {
  // Primary directory for Russian articles
  const ruArticlesDir: string = path.join(process.cwd(), 'src', 'content', 'articles', 'ru');

  const articles: Article[] = [];

  // Load only Russian articles — no English fallback
  if (fs.existsSync(ruArticlesDir)) {
    const files: string[] = fs.readdirSync(ruArticlesDir).filter((f: string) => f.endsWith('.json'));
    for (const file of files) {
      try {
        const content = JSON.parse(
          fs.readFileSync(path.join(ruArticlesDir, file), 'utf-8')
        ) as Record<string, unknown>;
        const slug: string = file.replace('.json', '');
        articles.push({
          slug,
          title: (content.title as string) || 'Без названия',
          excerpt: (content.excerpt as string) || '',
          category: (content.category as string) || 'Общее',
          publishedAt: (content.publishedAt as string) || new Date().toISOString(),
          readTime: (content.readTime as number) || 5,
          featured: (content.featured as boolean) || false,
          image: (content.image as string | undefined) || SLUG_IMAGES[slug] || CATEGORY_IMAGES[(content.category as string) || ''] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
          tags: (content.tags as string[]) || [],
          isRussian: true,
          locale: 'ru',
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
    'Top 10': 'Топ 10',
    'Lifestyle': 'Образ жизни',
    'Area Guide': 'Руководство по регионам',
    'Buying Guide': 'Руководство покупателя',
    'Golf': 'Гольф',
    'Healthcare': 'Здравоохранение',
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
      a.category === 'Топ 10' ||
      a.slug.includes('top-10-')
  );

  const lifestyle: Article[] = articles.filter(
    (a: Article) =>
      a.category === 'Образ жизни' ||
      a.slug.includes('beach') ||
      a.slug.includes('cost-of-living') ||
      a.slug.includes('healthcare') ||
      a.slug.includes('russkaya-zhizn')
  );

  const buying: Article[] = articles.filter(
    (a: Article) =>
      a.category === 'Руководство покупателя' ||
      a.slug.includes('buying') ||
      a.slug.includes('off-plan') ||
      a.slug.includes('nie-number') ||
      a.slug.includes('mortgage') ||
      a.slug.includes('costs-taxes') ||
      a.slug.includes('pokupka')
  );

  const areas: Article[] = articles.filter(
    (a: Article) =>
      a.slug.includes('-vs-') ||
      a.category === 'Руководство по регионам' ||
      a.category === 'Сравнение'
  );

  const golf: Article[] = articles.filter(
    (a: Article) =>
      a.category === 'Гольф' ||
      a.slug.includes('golf') ||
      a.slug.includes('la-finca')
  );

  return { top10, lifestyle, buying, areas, golf };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

interface HeroArticleProps {
  article: Article;
}

function HeroArticle({ article }: HeroArticleProps): JSX.Element {
  const href: string = `/ru/blog/${article.slug}`;

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
          {article.isRussian && (
            <span className="inline-block bg-primary-900 text-white text-xs font-bold px-3 py-2 rounded-sm uppercase tracking-wide">
              РУС
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
            Читать статью →
          </span>
          <span className="text-white/60 text-sm">{article.readTime} мин чтения</span>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ article }: { article: Article }): JSX.Element {
  const href: string = `/ru/blog/${article.slug}`;

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
          {article.isRussian && (
            <span className="bg-primary-900/90 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-sm">
              РУ
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
          <span className="text-accent-600 font-medium group-hover:underline">{article.readTime} мин →</span>
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
              href={`/ru/blog?category=${category}`}
              className="text-accent-600 font-medium hover:underline hidden md:block text-sm"
            >
              Показать все →
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

export default function BlogPageRu(): JSX.Element {
  const articles: Article[] = getArticles();
  const featuredArticle: Article | undefined = articles.find(
    (a: Article) => a.featured
  ) || articles[0];
  const { top10, lifestyle, buying, areas, golf }: GroupedArticles =
    groupArticles(articles);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Главная', url: 'https://newbuildhomescostablanca.com/ru/' },
    { name: 'Блог', url: 'https://newbuildhomescostablanca.com/ru/blog/' },
  ]);

  const blogCollectionSchema = collectionPageSchema({
    name: 'Коста Бланка Путеводители: Купить & Образ жизни',
    description: 'Путеводители экспертов по покупке недвижимости и жизни на Коста Бланке, Испания.',
    url: 'https://newbuildhomescostablanca.com/ru/blog/',
    items: articles.slice(0, 10).map((a: Article) => ({
      name: a.title,
      url: `https://newbuildhomescostablanca.com/ru/blog/${a.slug}/`,
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
              <Link href="/ru" className="hover:text-white transition-colors">
                Главная
              </Link>
              <span className="mx-2">›</span>
              <span className="text-white">Блог и Гиды</span>
            </nav>

            <div className="grid lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-2">
                <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">
                  Жизнь на Costa Blanca
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mt-3 mb-6 leading-tight">
                  Ваш путеводитель по{' '}
                  <span className="font-semibold text-accent-400">
                    средиземноморской жизни
                  </span>
                </h1>
                <p className="text-warm-200 text-lg leading-relaxed mb-8">
                  Все, что вам нужно знать о покупке недвижимости и жизни на самом солнечном побережье Испании.
                </p>

                {/* Quick Links */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="#top10"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-sm p-4 text-center transition-colors"
                  >
                    <span className="text-white text-sm font-medium">Топ 10</span>
                  </a>
                  <a
                    href="#lifestyle"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-sm p-4 text-center transition-colors"
                  >
                    <span className="text-white text-sm font-medium">Образ жизни</span>
                  </a>
                  <a
                    href="#buying"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-sm p-4 text-center transition-colors"
                  >
                    <span className="text-white text-sm font-medium">
                      Руководства покупателя
                    </span>
                  </a>
                  <a
                    href="#areas"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-sm p-4 text-center transition-colors"
                  >
                    <span className="text-white text-sm font-medium">
                      Путеводители регионов
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
                <div className="text-warm-500 text-sm">Экспертных гидов</div>
              </div>
              <div>
                <div className="text-3xl font-light text-primary-900">300+</div>
                <div className="text-warm-500 text-sm">Солнечных дней</div>
              </div>
              <div>
                <div className="text-3xl font-light text-primary-900">200км</div>
                <div className="text-warm-500 text-sm">Побережье</div>
              </div>
              <div>
                <div className="text-3xl font-light text-primary-900">20+</div>
                <div className="text-warm-500 text-sm">Полей для гольфа</div>
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
                Все статьи
              </h2>
              <p className="text-warm-600">
                Просмотрите нашу полную коллекцию руководств и статей
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
              Будьте в курсе
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Получайте новые статьи, обновления рынка недвижимости и советы
              инсайдеров еженедельно.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              name="newsletter-ru"
              method="POST"
              data-netlify="true"
            >
              <input
                type="hidden"
                name="form-name"
                value="newsletter-ru"
              />
              <input
                type="email"
                name="email"
                placeholder="Введите email"
                required
                className="flex-1 px-5 py-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-white text-primary-900"
              />
              <button
                type="submit"
                className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-4 rounded-sm font-semibold transition-colors"
              >
                Подписаться
              </button>
            </form>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Link
                href="/ru/properties"
                className="group block bg-gradient-to-br from-primary-900 to-primary-700 rounded-sm p-8 hover:shadow-2xl transition-all"
              >
                <h3 className="text-xl font-light text-white mb-2 group-hover:text-accent-300 transition-colors">
                  Просмотреть недвижимость
                </h3>
                <p className="text-warm-300 mb-4">
                  Откройте для себя 1000+ новых домов на Коста Бланке.
                </p>
                <span className="text-accent-400 font-semibold">
                  Просмотреть недвижимость →
                </span>
              </Link>

              <Link
                href="/ru/contact"
                className="group block bg-gradient-to-br from-accent-500 to-accent-700 rounded-sm p-8 hover:shadow-2xl transition-all"
              >
                <h3 className="text-xl font-light text-white mb-2">
                  Получить консультацию
                </h3>
                <p className="text-white/90 mb-4">
                  Наша местная команда может ответить на ваши вопросы.
                </p>
                <span className="text-white font-semibold">Связаться с нами →</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
