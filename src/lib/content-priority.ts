/**
 * Content Generation Priority System
 * ===================================
 * Determines which content to generate first based on:
 * - Property count (more properties = higher priority)
 * - Search volume estimates (popular areas first)
 * - Commercial value (higher prices = higher commission potential)
 * - Content gaps (missing content = higher priority)
 */

export interface ContentPriority {
  slug: string;
  type: 'area' | 'filter-page' | 'article' | 'development' | 'property';
  priority: number; // 1-100, higher = more important
  status: 'pending' | 'generated' | 'reviewed' | 'published';
  estimatedSearchVolume: 'high' | 'medium' | 'low';
  propertyCount?: number;
  lastGenerated?: string;
  notes?: string;
}

// Priority weights
const WEIGHTS = {
  propertyCount: 0.3,      // More properties = more important
  searchVolume: 0.35,      // Higher search volume = more important
  commercialValue: 0.2,    // Higher property values = more commission
  contentGap: 0.15,        // Missing content = needs attention
};

// Search volume estimates by area (based on UK buyer interest)
export const SEARCH_VOLUME_ESTIMATES: Record<string, 'high' | 'medium' | 'low'> = {
  // HIGH VOLUME - Main tourist/expat destinations
  'torrevieja': 'high',
  'orihuela-costa': 'high',
  'benidorm': 'high',
  'javea': 'high',
  'moraira': 'high',
  'calpe': 'high',
  'altea': 'high',
  'denia': 'high',
  'alicante': 'high',
  'la-zenia': 'high',
  'villamartin': 'high',
  'guardamar': 'high',

  // MEDIUM VOLUME - Known but less searched
  'benissa': 'medium',
  'teulada': 'medium',
  'benitachell': 'medium',
  'finestrat': 'medium',
  'la-nucia': 'medium',
  'alfaz-del-pi': 'medium',
  'polop': 'medium',
  'pilar-de-la-horadada': 'medium',
  'san-miguel-de-salinas': 'medium',
  'cabo-roig': 'medium',
  'playa-flamenca': 'medium',
  'campoamor': 'medium',
  'pinoso': 'medium',

  // LOW VOLUME - Niche/inland areas
  'hondon': 'low',
  'alcalali': 'low',
  'el-vergel': 'low',
  'els-poblets': 'low',
  'pedreguer': 'low',
  'el-campello': 'low',
  'los-montesinos': 'low',
  'rojales': 'low',
  'ciudad-quesada': 'low',
  'cox': 'low',
  'catral': 'low',
  'dolores': 'low',
};

// Average property prices by area (for commercial value weighting)
export const AVG_PRICES: Record<string, number> = {
  'moraira': 850000,
  'javea': 750000,
  'altea': 650000,
  'benissa': 600000,
  'calpe': 450000,
  'denia': 400000,
  'teulada': 500000,
  'benitachell': 550000,
  'benidorm': 300000,
  'finestrat': 350000,
  'la-nucia': 280000,
  'alfaz-del-pi': 320000,
  'polop': 350000,
  'torrevieja': 200000,
  'orihuela-costa': 250000,
  'guardamar': 220000,
  'pilar-de-la-horadada': 230000,
  'san-miguel-de-salinas': 180000,
  'pinoso': 350000,
  'hondon': 200000,
};

/**
 * Calculate priority score for a content item
 */
export function calculatePriority(
  slug: string,
  type: ContentPriority['type'],
  propertyCount: number = 0,
  hasContent: boolean = false
): number {
  let score = 0;

  // Property count score (0-30)
  const countScore = Math.min(propertyCount / 50, 1) * 30;
  score += countScore * WEIGHTS.propertyCount;

  // Search volume score (0-35)
  const searchVolume = SEARCH_VOLUME_ESTIMATES[slug] || 'low';
  const volumeScores = { high: 35, medium: 20, low: 8 };
  score += volumeScores[searchVolume] * WEIGHTS.searchVolume;

  // Commercial value score (0-20)
  const avgPrice = AVG_PRICES[slug] || 250000;
  const priceScore = Math.min(avgPrice / 1000000, 1) * 20;
  score += priceScore * WEIGHTS.commercialValue;

  // Content gap score (0-15)
  const gapScore = hasContent ? 0 : 15;
  score += gapScore * WEIGHTS.contentGap;

  return Math.round(score);
}

/**
 * Content Generation Queue
 * Prioritized list of content to generate
 */
export const CONTENT_GENERATION_QUEUE: ContentPriority[] = [
  // TIER 1: Highest priority areas (generate immediately)
  { slug: 'torrevieja', type: 'area', priority: 95, status: 'published', estimatedSearchVolume: 'high', propertyCount: 150 },
  { slug: 'orihuela-costa', type: 'area', priority: 92, status: 'published', estimatedSearchVolume: 'high', propertyCount: 120 },
  { slug: 'javea', type: 'area', priority: 90, status: 'published', estimatedSearchVolume: 'high', propertyCount: 80 },
  { slug: 'moraira', type: 'area', priority: 88, status: 'published', estimatedSearchVolume: 'high', propertyCount: 60 },
  { slug: 'calpe', type: 'area', priority: 85, status: 'published', estimatedSearchVolume: 'high', propertyCount: 70 },
  { slug: 'benidorm', type: 'area', priority: 85, status: 'published', estimatedSearchVolume: 'high', propertyCount: 90 },
  { slug: 'altea', type: 'area', priority: 82, status: 'published', estimatedSearchVolume: 'high', propertyCount: 45 },
  { slug: 'denia', type: 'area', priority: 80, status: 'published', estimatedSearchVolume: 'high', propertyCount: 55 },

  // TIER 2: Important sub-areas (generate next)
  { slug: 'la-zenia', type: 'area', priority: 78, status: 'pending', estimatedSearchVolume: 'high', propertyCount: 40, notes: 'Sub-area of Orihuela Costa, high search volume' },
  { slug: 'villamartin', type: 'area', priority: 75, status: 'pending', estimatedSearchVolume: 'high', propertyCount: 35, notes: 'Golf community, high expat interest' },
  { slug: 'cabo-roig', type: 'area', priority: 72, status: 'pending', estimatedSearchVolume: 'medium', propertyCount: 30 },
  { slug: 'guardamar', type: 'area', priority: 70, status: 'pending', estimatedSearchVolume: 'medium', propertyCount: 45 },
  { slug: 'benissa', type: 'area', priority: 68, status: 'published', estimatedSearchVolume: 'medium', propertyCount: 35 },
  { slug: 'teulada', type: 'area', priority: 65, status: 'published', estimatedSearchVolume: 'medium', propertyCount: 30 },

  // TIER 3: Secondary areas
  { slug: 'benitachell', type: 'area', priority: 60, status: 'published', estimatedSearchVolume: 'medium', propertyCount: 25 },
  { slug: 'finestrat', type: 'area', priority: 58, status: 'published', estimatedSearchVolume: 'medium', propertyCount: 30 },
  { slug: 'la-nucia', type: 'area', priority: 55, status: 'published', estimatedSearchVolume: 'medium', propertyCount: 20 },
  { slug: 'polop', type: 'area', priority: 52, status: 'published', estimatedSearchVolume: 'medium', propertyCount: 15 },
  { slug: 'pinoso', type: 'area', priority: 50, status: 'pending', estimatedSearchVolume: 'medium', propertyCount: 25, notes: 'Inland villas, good value' },
  { slug: 'pilar-de-la-horadada', type: 'area', priority: 48, status: 'pending', estimatedSearchVolume: 'medium', propertyCount: 20 },

  // TIER 4: Lower priority areas
  { slug: 'san-miguel-de-salinas', type: 'area', priority: 40, status: 'pending', estimatedSearchVolume: 'low', propertyCount: 15 },
  { slug: 'hondon', type: 'area', priority: 35, status: 'pending', estimatedSearchVolume: 'low', propertyCount: 20 },
  { slug: 'alcalali', type: 'area', priority: 30, status: 'published', estimatedSearchVolume: 'low', propertyCount: 10 },
  { slug: 'els-poblets', type: 'area', priority: 28, status: 'published', estimatedSearchVolume: 'low', propertyCount: 8 },
  { slug: 'pedreguer', type: 'area', priority: 25, status: 'published', estimatedSearchVolume: 'low', propertyCount: 5 },

  // COMPARISON ARTICLES (high value for SEO)
  { slug: 'la-zenia-vs-cabo-roig-where-to-buy', type: 'article', priority: 85, status: 'published', estimatedSearchVolume: 'medium', notes: 'Decision-stage content' },
  { slug: 'costa-blanca-north-vs-south', type: 'article', priority: 90, status: 'pending', estimatedSearchVolume: 'high', notes: 'Top comparison search' },
  { slug: 'javea-vs-moraira', type: 'article', priority: 82, status: 'pending', estimatedSearchVolume: 'medium' },
  { slug: 'torrevieja-vs-orihuela-costa', type: 'article', priority: 80, status: 'pending', estimatedSearchVolume: 'medium' },
  { slug: 'benidorm-vs-calpe', type: 'article', priority: 75, status: 'pending', estimatedSearchVolume: 'medium' },
  { slug: 'golf-properties-villamartin-vs-las-colinas', type: 'article', priority: 70, status: 'pending', estimatedSearchVolume: 'low' },

  // FILTER PAGES (programmatic SEO)
  { slug: 'apartments-torrevieja', type: 'filter-page', priority: 88, status: 'published', estimatedSearchVolume: 'high', propertyCount: 80 },
  { slug: 'villas-javea', type: 'filter-page', priority: 85, status: 'published', estimatedSearchVolume: 'high', propertyCount: 50 },
  { slug: 'apartments-orihuela-costa', type: 'filter-page', priority: 83, status: 'published', estimatedSearchVolume: 'high', propertyCount: 60 },
  { slug: 'villas-moraira', type: 'filter-page', priority: 80, status: 'published', estimatedSearchVolume: 'medium', propertyCount: 40 },
  { slug: 'under-200k', type: 'filter-page', priority: 78, status: 'published', estimatedSearchVolume: 'high', notes: 'Budget buyers search' },
  { slug: 'luxury-over-500k', type: 'filter-page', priority: 72, status: 'published', estimatedSearchVolume: 'medium' },
];

/**
 * Get next batch of content to generate
 */
export function getNextBatch(batchSize: number = 5): ContentPriority[] {
  return CONTENT_GENERATION_QUEUE
    .filter(item => item.status === 'pending')
    .sort((a, b) => b.priority - a.priority)
    .slice(0, batchSize);
}

/**
 * Get content stats
 */
export function getContentStats() {
  const total = CONTENT_GENERATION_QUEUE.length;
  const published = CONTENT_GENERATION_QUEUE.filter(i => i.status === 'published').length;
  const pending = CONTENT_GENERATION_QUEUE.filter(i => i.status === 'pending').length;

  return {
    total,
    published,
    pending,
    percentComplete: Math.round((published / total) * 100),
    nextPriority: getNextBatch(1)[0]?.slug || 'All complete',
  };
}

/**
 * Content types and their generation requirements
 */
export const CONTENT_SPECS = {
  area: {
    minWords: 2000,
    requiredSections: ['intro', 'lifestyle', 'amenities', 'propertyMarket', 'whyLiveHere', 'faqs'],
    requiredSchema: ['Place', 'FAQPage', 'BreadcrumbList'],
    requiredFaqs: 8,
  },
  article: {
    minWords: 1500,
    requiredSections: ['intro', 'comparison', 'conclusion'],
    requiredSchema: ['Article', 'BreadcrumbList'],
  },
  'filter-page': {
    minWords: 500,
    requiredSections: ['intro', 'seoContent'],
    requiredSchema: ['CollectionPage', 'BreadcrumbList', 'ItemList'],
  },
  development: {
    minWords: 1000,
    requiredSections: ['overview', 'features', 'location', 'investment', 'faqs'],
    requiredSchema: ['RealEstateListing', 'FAQPage', 'BreadcrumbList', 'Organization'],
    requiredFaqs: 6,
  },
  property: {
    minWords: 800,
    requiredSections: ['description', 'features', 'location', 'investment'],
    requiredSchema: ['RealEstateListing', 'Product', 'BreadcrumbList', 'Place'],
  },
};
