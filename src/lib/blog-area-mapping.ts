/**
 * Blog-to-Area Auto-Mapping
 *
 * Scans all article JSONs at build time and returns matching
 * blog posts for any given area slug. Used by:
 * - Area pages (to show related guides)
 * - Property pages (to show relevant articles)
 * - Development pages (to cross-link blog content)
 */

import fs from 'fs';
import path from 'path';

export interface RelatedBlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: number;
}

// Cache to avoid re-reading files on every page render
let cachedArticles: { slug: string; title: string; excerpt: string; category: string; readTime: number; relatedAreas: string[]; tags: string[] }[] | null = null;

function loadAllArticles() {
  if (cachedArticles) return cachedArticles;

  try {
    const articlesDir = path.join(process.cwd(), 'src/content/articles');
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.json'));

    cachedArticles = files.map(file => {
      const data = JSON.parse(fs.readFileSync(path.join(articlesDir, file), 'utf-8'));
      return {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt || '',
        category: data.category || 'Guide',
        readTime: data.readTime || 5,
        relatedAreas: data.relatedAreas || [],
        tags: data.tags || [],
      };
    });

    return cachedArticles;
  } catch (error) {
    console.error('Error loading articles for blog-area mapping:', error);
    return [];
  }
}

/**
 * Get related blog posts for an area slug.
 * Matches against article relatedAreas field with fuzzy matching.
 *
 * @param areaSlug - The area slug (e.g., 'torrevieja', 'orihuela-costa')
 * @param limit - Maximum articles to return (default 3)
 * @returns Array of related blog posts
 */
export function getRelatedBlogPostsForArea(areaSlug: string, limit: number = 3): RelatedBlogPost[] {
  const articles = loadAllArticles();
  const slugLower = areaSlug.toLowerCase();

  const matched = articles.filter(article => {
    return article.relatedAreas.some(area => {
      const areaLower = area.toLowerCase();
      return areaLower === slugLower ||
        slugLower.includes(areaLower) ||
        areaLower.includes(slugLower);
    });
  });

  return matched.slice(0, limit).map(article => ({
    slug: article.slug,
    title: article.title,
    description: article.excerpt,
    category: article.category,
    readTime: article.readTime,
  }));
}

/**
 * Get general buying guides that apply to all areas.
 * Returns articles with empty relatedAreas (universal guides).
 * Used as fallback when no area-specific articles exist.
 *
 * @param limit - Maximum articles to return (default 3)
 * @returns Array of general guide blog posts
 */
export function getGeneralBuyingGuides(limit: number = 3): RelatedBlogPost[] {
  const articles = loadAllArticles();

  // Prioritize general guides (no specific areas) in these categories
  const generalGuides = articles
    .filter(a => a.relatedAreas.length === 0)
    .sort((a, b) => {
      // Prioritize buying/legal guides
      const priority: Record<string, number> = {
        'Buying Guide': 1,
        'Legal': 2,
        'Finance': 3,
        'Lifestyle': 4,
      };
      return (priority[a.category] || 99) - (priority[b.category] || 99);
    });

  return generalGuides.slice(0, limit).map(article => ({
    slug: article.slug,
    title: article.title,
    description: article.excerpt,
    category: article.category,
    readTime: article.readTime,
  }));
}

/**
 * Get blog posts for an area with fallback to general guides.
 * Always returns at least some articles.
 *
 * @param areaSlug - The area slug
 * @param limit - Maximum articles to return (default 3)
 * @returns Array of blog posts (area-specific first, then general)
 */
export function getBlogPostsForArea(areaSlug: string, limit: number = 3): RelatedBlogPost[] {
  const areaSpecific = getRelatedBlogPostsForArea(areaSlug, limit);

  if (areaSpecific.length >= limit) {
    return areaSpecific;
  }

  // Fill remaining slots with general guides
  const remaining = limit - areaSpecific.length;
  const usedSlugs = new Set(areaSpecific.map(a => a.slug));
  const generals = getGeneralBuyingGuides(remaining + 3) // get extras in case of overlap
    .filter(a => !usedSlugs.has(a.slug))
    .slice(0, remaining);

  return [...areaSpecific, ...generals];
}

/**
 * Get blog posts by tag.
 * Filters articles by their tags array.
 *
 * @param tag - The tag to filter by (e.g., 'golf', 'investment')
 * @param limit - Maximum articles to return (default 3)
 * @returns Array of blog posts with the specified tag
 */
export function getBlogPostsByTag(tag: string, limit: number = 3): RelatedBlogPost[] {
  const articles = loadAllArticles();
  const tagLower = tag.toLowerCase();

  const matched = articles.filter(article => {
    return article.tags.some(t => t.toLowerCase() === tagLower);
  });

  return matched.slice(0, limit).map(article => ({
    slug: article.slug,
    title: article.title,
    description: article.excerpt,
    category: article.category,
    readTime: article.readTime,
  }));
}
