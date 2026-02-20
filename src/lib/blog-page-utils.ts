/**
 * Shared utility functions for blog article pages
 * Used by all language blog page.tsx files
 */
import fs from 'fs';
import path from 'path';

export interface Property {
  reference: string;
  title: string;
  price: number;
  priceFrom?: boolean;
  type: string;
  bedrooms: number;
  bathrooms: number;
  builtArea?: number;
  location: string;
  image?: string;
  features?: string[];
  status?: 'key-ready' | 'off-plan' | 'under-construction';
  badge?: string;
}

export interface PropertyShowcase {
  position: 'after-intro' | 'mid-article' | 'before-conclusion' | 'after-section';
  afterSection?: number;
  title: string;
  subtitle?: string;
  variant: 'carousel' | 'grid-3x3' | 'grid-2x2' | 'featured-single' | 'split-highlight';
  theme?: 'light' | 'dark' | 'accent';
  properties: Property[];
  ctaText?: string;
  ctaLink?: string;
}

export interface ArticleSection {
  title: string;
  content: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ArticleContent {
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
  relatedAreas?: string[];
  relatedBuilders?: string[];
  relatedDevelopments?: string[];
  content: string | {
    intro: string;
    quickAnswer?: string;
    sections?: ArticleSection[];
    conclusion: string;
    faqs?: FAQ[];
    propertyShowcases?: PropertyShowcase[];
    showConsultationCTA?: boolean | 'after-intro' | 'mid-article' | 'before-faqs';
  };
  relatedArticles?: string[];
  schema?: object;
  schemaFAQ?: object;
}

export interface RelatedArticle {
  slug: string;
  title: string;
  category: string;
  readTime: number;
  excerpt: string;
}

/**
 * Load article from JSON file
 */
export function getArticle(slug: string, lang: string): ArticleContent | null {
  const articlesDir = path.join(process.cwd(), 'src', 'content', 'articles', lang);
  const filePath = path.join(articlesDir, `${slug}.json`);
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
      console.error(`Error parsing article ${lang}/${slug}:`, error);
      return null;
    }
  }
  return null;
}

/**
 * Load properties from homepage-carousels.json
 */
export function getAvailableProperties(): Property[] {
  const carouselsPath = path.join(process.cwd(), 'src', 'content', 'homepage-carousels.json');
  if (!fs.existsSync(carouselsPath)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(carouselsPath, 'utf-8'));
    const allProperties: Property[] = [];
    Object.values(data).forEach((carousel: any) => {
      if (carousel.properties && Array.isArray(carousel.properties)) {
        carousel.properties.forEach((prop: any) => {
          allProperties.push({
            reference: prop.reference || `REF-${Math.random().toString(36).substr(2, 9)}`,
            title: prop.title || prop.name,
            price: prop.price || prop.priceFrom,
            priceFrom: !!prop.priceFrom,
            type: prop.type || 'Property',
            bedrooms: prop.bedrooms || 3,
            bathrooms: prop.bathrooms || 2,
            builtArea: prop.builtArea,
            location: prop.location || prop.town || 'Costa Blanca',
            image: prop.image,
            features: prop.features,
            status: prop.status,
            badge: prop.badge,
          });
        });
      }
    });
    return allProperties;
  } catch {
    return [];
  }
}

/**
 * Get related articles with smart scoring
 * Prioritizes: explicit relatedArticles > same areas > same category > random
 */
export function getSmartRelatedArticles(
  currentSlug: string,
  lang: string,
  limit: number = 6
): RelatedArticle[] {
  try {
    const articlesDir = path.join(process.cwd(), 'src', 'content', 'articles', lang);
    if (!fs.existsSync(articlesDir)) return [];

    const currentArticle = getArticle(currentSlug, lang);
    const explicitRelated = currentArticle?.relatedArticles || [];
    const currentAreas = currentArticle?.relatedAreas || [];
    const currentCategory = currentArticle?.category || '';

    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.json'));
    const allArticles = files
      .map(f => {
        try {
          return JSON.parse(fs.readFileSync(path.join(articlesDir, f), 'utf-8'));
        } catch { return null; }
      })
      .filter((a): a is any => a !== null && a.slug !== currentSlug);

    // First: explicitly linked articles (in order)
    const explicit: RelatedArticle[] = [];
    for (const slug of explicitRelated) {
      const found = allArticles.find(a => a.slug === slug);
      if (found) {
        explicit.push({
          slug: found.slug, title: found.title, category: found.category,
          readTime: found.readTime, excerpt: found.excerpt || '',
        });
      }
    }

    // Then: score remaining by relevance
    const remaining = allArticles.filter(a => !explicitRelated.includes(a.slug));
    const scored = remaining.map(a => {
      let score = 0;
      const areas = a.relatedAreas || [];
      score += areas.filter((area: string) => currentAreas.includes(area)).length * 3;
      if (a.category === currentCategory) score += 2;
      return { ...a, score };
    });
    scored.sort((a: any, b: any) => b.score - a.score);

    const additional = scored.slice(0, Math.max(0, limit - explicit.length)).map((a: any) => ({
      slug: a.slug, title: a.title, category: a.category,
      readTime: a.readTime, excerpt: a.excerpt || '',
    }));

    return [...explicit, ...additional].slice(0, limit);
  } catch {
    return [];
  }
}

/**
 * Get all article slugs for a language
 */
export function getArticleSlugs(lang: string): string[] {
  try {
    const articlesDir = path.join(process.cwd(), 'src', 'content', 'articles', lang);
    if (!fs.existsSync(articlesDir)) return [];
    return fs.readdirSync(articlesDir)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));
  } catch {
    return [];
  }
}
