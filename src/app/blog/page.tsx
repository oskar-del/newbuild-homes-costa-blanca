import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { breadcrumbSchema, collectionPageSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Costa Blanca Living: Guides, Tips & Lifestyle | New Build Homes',
  description: 'Your guide to Mediterranean living. Area guides, beach guides, buying tips, golf lifestyle, and everything you need to know about life in Costa Blanca.',
  openGraph: {
    title: 'Costa Blanca Living: Guides, Tips & Lifestyle',
    description: 'Your guide to Mediterranean living in Spain.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/blog',
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
}

// Better images using Unsplash for relevant photos
const SLUG_IMAGES: Record<string, string> = {
  'best-beaches-costa-blanca': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
  'cost-of-living-costa-blanca': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
  'golf-lifestyle-costa-blanca': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=600&fit=crop',
  'healthcare-costa-blanca-expats': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
  'buying-off-plan-spain-guide': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  'algorfa-vs-coastal-living': 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&h=600&fit=crop',
  'la-finca-golf-property-guide': 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop',
  'la-zenia-vs-cabo-roig-where-to-buy': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
  // Buying guides
  'nie-number-spain-guide': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop', // Documents/paperwork
  'spanish-property-costs-taxes': 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&h=600&fit=crop', // Calculator/money
  'buying-property-spain-process': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop', // Keys/house
  'spanish-mortgages-guide': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop', // Bank/finance
};

const CATEGORY_IMAGES: Record<string, string> = {
  'Lifestyle': 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop',
  'Area Guide': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  'Buying Guide': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
  'Golf': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=600&fit=crop',
  'Healthcare': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
};

// Category configuration
const CATEGORIES = {
  lifestyle: {
    title: 'Lifestyle & Living',
    description: 'Everything about Mediterranean life - beaches, cost of living, healthcare, and daily life',
    icon: '☀️',
    color: 'from-pink-500 to-orange-500',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
  },
  buying: {
    title: 'Buying Guides',
    description: 'Step-by-step guides to purchasing property in Spain',
    icon: '🏠',
    color: 'from-primary-600 to-primary-800',
    bgColor: 'bg-primary-50',
    textColor: 'text-primary-600',
  },
  areas: {
    title: 'Area Comparisons',
    description: 'North vs South, beach vs inland - find your perfect location',
    icon: '📍',
    color: 'from-accent-500 to-accent-700',
    bgColor: 'bg-accent-50',
    textColor: 'text-accent-600',
  },
  golf: {
    title: 'Golf & Sports',
    description: 'Golf courses, sports facilities, and active lifestyle guides',
    icon: '⛳',
    color: 'from-emerald-500 to-green-700',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
};

// Get articles from content directory
function getArticles(): Article[] {
  const articlesDir = path.join(process.cwd(), 'src', 'content', 'articles');

  if (!fs.existsSync(articlesDir)) {
    return [];
  }

  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.json'));
  const articles: Article[] = [];

  for (const file of files) {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(articlesDir, file), 'utf-8'));
      const slug = file.replace('.json', '');
      articles.push({
        slug,
        title: content.title || 'Untitled',
        excerpt: content.excerpt || '',
        category: content.category || 'General',
        publishedAt: content.publishedAt || new Date().toISOString(),
        readTime: content.readTime || 5,
        featured: content.featured || false,
        image: SLUG_IMAGES[slug] || CATEGORY_IMAGES[content.category] || `https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop`,
        tags: content.tags || [],
      });
    } catch {
      // Skip invalid files
    }
  }

  return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// Group articles by type
function groupArticles(articles: Article[]) {
  const lifestyle = articles.filter(a =>
    a.category === 'Lifestyle' ||
    a.slug.includes('beach') ||
    a.slug.includes('cost-of-living') ||
    a.slug.includes('healthcare')
  );

  const buying = articles.filter(a =>
    a.category === 'Buying Guide' ||
    a.slug.includes('buying') ||
    a.slug.includes('off-plan') ||
    a.slug.includes('nie-number') ||
    a.slug.includes('mortgage') ||
    a.slug.includes('costs-taxes')
  );

  const areas = articles.filter(a =>
    a.slug.includes('-vs-') ||
    a.category === 'Area Guide'
  );

  const golf = articles.filter(a =>
    a.category === 'Golf' ||
    a.slug.includes('golf') ||
    a.slug.includes('la-finca')
  );

  return { lifestyle, buying, areas, golf };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Hero Article Card
function HeroArticle({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block relative rounded-3xl overflow-hidden h-[450px] md:h-[550px]">
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
        <span className="inline-block bg-accent-500 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide mb-4">
          {article.category}
        </span>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-accent-300 transition-colors">
          {article.title}
        </h2>
        <p className="text-white/80 text-lg mb-6 max-w-2xl line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center gap-4">
          <span className="bg-white text-primary-900 px-6 py-3 rounded-full font-semibold group-hover:bg-accent-500 group-hover:text-white transition-colors">
            Read Article →
          </span>
          <span className="text-white/60 text-sm">{article.readTime} min read</span>
        </div>
      </div>
    </Link>
  );
}

// Compact Article Card
function ArticleCard({ article, variant = 'default' }: { article: Article; variant?: 'default' | 'horizontal' }) {
  if (variant === 'horizontal') {
    return (
      <Link href={`/blog/${article.slug}`} className="group flex gap-4 bg-white rounded-xl p-4 hover:shadow-lg transition-all">
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={article.image || ''}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium text-accent-600 uppercase tracking-wide">{article.category}</span>
          <h3 className="font-semibold text-primary-900 group-hover:text-accent-600 transition-colors line-clamp-2 mt-1">
            {article.title}
          </h3>
          <p className="text-warm-500 text-sm mt-1">{article.readTime} min read</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${article.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.image || ''}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-primary-900 text-xs font-semibold px-3 py-1.5 rounded-full">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">
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

// Category Section
function CategorySection({
  category,
  articles,
  config
}: {
  category: string;
  articles: Article[];
  config: typeof CATEGORIES[keyof typeof CATEGORIES];
}) {
  if (articles.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{config.icon}</span>
            <div>
              <h2 className="text-2xl font-bold text-primary-900">{config.title}</h2>
              <p className="text-warm-600 text-sm">{config.description}</p>
            </div>
          </div>
          {articles.length > 3 && (
            <Link href={`/blog?category=${category}`} className="text-accent-600 font-medium hover:underline hidden md:block">
              View All →
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BlogPage() {
  const articles = getArticles();
  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const { lifestyle, buying, areas, golf } = groupArticles(articles);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Blog', url: 'https://newbuildhomescostablanca.com/blog/' },
  ]);

  const blogCollectionSchema = collectionPageSchema({
    name: 'Costa Blanca Living: Guides & Lifestyle',
    description: 'Expert guides on buying property and living in Costa Blanca, Spain.',
    url: 'https://newbuildhomescostablanca.com/blog/',
    items: articles.slice(0, 10).map(a => ({
      name: a.title,
      url: `https://newbuildhomescostablanca.com/blog/${a.slug}/`,
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
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Blog & Guides</span>
            </nav>

            <div className="grid lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-2">
                <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Costa Blanca Living</span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6 leading-tight">
                  Your Guide to <span className="text-accent-400">Mediterranean Life</span>
                </h1>
                <p className="text-warm-200 text-lg leading-relaxed mb-8">
                  Everything you need to know about buying property and living in Spain's sunniest coast.
                </p>

                {/* Quick Links */}
                <div className="grid grid-cols-2 gap-3">
                  <a href="#lifestyle" className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 text-center transition-colors">
                    <span className="text-2xl block mb-1">☀️</span>
                    <span className="text-white text-sm font-medium">Lifestyle</span>
                  </a>
                  <a href="#buying" className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 text-center transition-colors">
                    <span className="text-2xl block mb-1">🏠</span>
                    <span className="text-white text-sm font-medium">Buying Guides</span>
                  </a>
                  <a href="#areas" className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 text-center transition-colors">
                    <span className="text-2xl block mb-1">📍</span>
                    <span className="text-white text-sm font-medium">Area Guides</span>
                  </a>
                  <a href="#golf" className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 text-center transition-colors">
                    <span className="text-2xl block mb-1">⛳</span>
                    <span className="text-white text-sm font-medium">Golf Living</span>
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
                <div className="text-3xl font-bold text-primary-900">{articles.length}</div>
                <div className="text-warm-500 text-sm">Expert Guides</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-900">300+</div>
                <div className="text-warm-500 text-sm">Days of Sunshine</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-900">200km</div>
                <div className="text-warm-500 text-sm">of Coastline</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-900">20+</div>
                <div className="text-warm-500 text-sm">Golf Courses</div>
              </div>
            </div>
          </div>
        </section>

        {/* Lifestyle Section */}
        <div id="lifestyle">
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
              <h2 className="text-3xl font-bold text-primary-900 mb-3">All Articles</h2>
              <p className="text-warm-600">Browse our complete collection of guides and insights</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-r from-accent-500 to-accent-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-5xl block mb-4">✉️</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Stay Updated</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Get new articles, property market updates, and insider tips delivered weekly.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" name="newsletter" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="newsletter" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white text-primary-900"
              />
              <button type="submit" className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-4 rounded-xl font-bold transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Link href="/properties" className="group block bg-gradient-to-br from-primary-900 to-primary-700 rounded-2xl p-8 hover:shadow-2xl transition-all">
                <span className="text-4xl block mb-4">🏡</span>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-300 transition-colors">Browse Properties</h3>
                <p className="text-warm-300 mb-4">Explore 1000+ new build homes across Costa Blanca.</p>
                <span className="text-accent-400 font-semibold">View Properties →</span>
              </Link>

              <Link href="/contact" className="group block bg-gradient-to-br from-accent-500 to-accent-700 rounded-2xl p-8 hover:shadow-2xl transition-all">
                <span className="text-4xl block mb-4">💬</span>
                <h3 className="text-xl font-bold text-white mb-2">Get Expert Advice</h3>
                <p className="text-white/90 mb-4">Our local team can answer your questions.</p>
                <span className="text-white font-semibold">Contact Us →</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
