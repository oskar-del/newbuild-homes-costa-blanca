/**
 * Tag Service
 *
 * Service for filtering properties by tags and integrating with the blog system.
 * This allows blog posts like "Best Beach Properties" to automatically
 * fetch relevant properties.
 */

import { Development, getAllDevelopments } from './development-service';
import {
  Tag,
  BEACH_ZONES,
  GOLF_ZONES,
  PRICE_BRACKETS,
  PriceBracket,
  getBeachTag,
  getGolfTag,
  getPriceBracket,
  getPropertyTags,
  ALL_TAGS,
  LIFESTYLE_TAGS,
  FEATURE_TAGS,
  PROPERTY_TYPE_TAGS,
  REGION_TAGS
} from '@/data/property-tags';
import {
  BlogTopicSuggestion,
  BLOG_TOPIC_SUGGESTIONS,
  generateDevelopmentSchema
} from '@/data/property-schemas';

// ==========================================
// TAGGED DEVELOPMENT INTERFACE
// ==========================================

export interface TaggedDevelopment extends Development {
  tags: Tag[];
  tagIds: string[];

  // Location tags
  isBeachProperty: boolean;
  beachName?: string;
  beachDistance?: 'beachfront' | 'walking' | 'short-drive';

  isGolfProperty: boolean;
  golfCourse?: string;
  golfDistance?: 'on-course' | 'walking' | 'short-drive';

  // Price bracket
  priceBracket?: PriceBracket;

  // Schema data
  schema: ReturnType<typeof generateDevelopmentSchema>;
}

// ==========================================
// TAG DEVELOPMENT
// ==========================================

/**
 * Add tags to a development
 * Enhanced: Uses town as fallback for feeds with less zone data (Background Properties, Miralbo)
 */
export function tagDevelopment(development: Development): TaggedDevelopment {
  // Get beach info - pass both zone and town for fallback matching
  const beachInfo = getBeachTag(development.zone, development.town);

  // Get golf info - pass both zone and town for fallback matching
  const golfInfo = getGolfTag(development.zone, development.town);

  // Get price bracket
  const priceBracket = getPriceBracket(development.priceFrom);

  // Get all applicable tags - include town for fallback matching
  const tags = getPropertyTags({
    zone: development.zone,
    town: development.town, // Added for fallback matching (Background Properties, Miralbo)
    price: development.priceFrom,
    propertyType: development.propertyTypes[0],
    bedrooms: development.maxBedrooms,
    hasPool: development.hasPool,
    hasSeaView: development.hasSeaview,
    hasGarden: development.hasGarden,
    status: development.status,
    region: development.region
  });

  // Generate schema
  const schema = generateDevelopmentSchema(development);

  return {
    ...development,
    tags,
    tagIds: tags.map(t => t.id),

    isBeachProperty: beachInfo.isBeach,
    beachName: beachInfo.beach,
    beachDistance: beachInfo.distance,

    isGolfProperty: golfInfo.isGolf,
    golfCourse: golfInfo.course,
    golfDistance: golfInfo.distance,

    priceBracket,
    schema
  };
}

/**
 * Get all developments with tags
 */
export async function getAllTaggedDevelopments(): Promise<TaggedDevelopment[]> {
  const developments = await getAllDevelopments();
  return developments.map(tagDevelopment);
}

// ==========================================
// FILTER BY TAGS
// ==========================================

export interface TagFilter {
  tags?: string[];           // Tag IDs to include
  excludeTags?: string[];    // Tag IDs to exclude
  zones?: string[];          // Specific zones
  priceMin?: number;
  priceMax?: number;
  propertyTypes?: string[];
  regions?: string[];
  status?: ('key-ready' | 'off-plan' | 'under-construction' | 'completed')[];
  beachOnly?: boolean;
  golfOnly?: boolean;
  limit?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'name' | 'newest' | 'beach-distance' | 'relevance';
}

/**
 * Filter developments by tags
 */
export async function filterDevelopmentsByTags(
  filter: TagFilter
): Promise<TaggedDevelopment[]> {
  let developments = await getAllTaggedDevelopments();

  // Filter by tags
  if (filter.tags?.length) {
    developments = developments.filter(dev =>
      filter.tags!.some(tagId => dev.tagIds.includes(tagId))
    );
  }

  // Exclude tags
  if (filter.excludeTags?.length) {
    developments = developments.filter(dev =>
      !filter.excludeTags!.some(tagId => dev.tagIds.includes(tagId))
    );
  }

  // Filter by zones
  if (filter.zones?.length) {
    const zonesLower = filter.zones.map(z => z.toLowerCase());
    developments = developments.filter(dev =>
      dev.zone && zonesLower.includes(dev.zone.toLowerCase())
    );
  }

  // Filter by price
  if (filter.priceMin !== undefined) {
    developments = developments.filter(dev => dev.priceFrom >= filter.priceMin!);
  }
  if (filter.priceMax !== undefined) {
    developments = developments.filter(dev => dev.priceFrom <= filter.priceMax!);
  }

  // Filter by property types
  if (filter.propertyTypes?.length) {
    const typesLower = filter.propertyTypes.map(t => t.toLowerCase());
    developments = developments.filter(dev =>
      dev.propertyTypes.some(type => typesLower.includes(type.toLowerCase()))
    );
  }

  // Filter by regions
  if (filter.regions?.length) {
    const regionsLower = filter.regions.map(r => r.toLowerCase());
    developments = developments.filter(dev =>
      regionsLower.includes(dev.region.toLowerCase())
    );
  }

  // Filter by status
  if (filter.status?.length) {
    developments = developments.filter(dev =>
      filter.status!.includes(dev.status)
    );
  }

  // Beach only
  if (filter.beachOnly) {
    developments = developments.filter(dev => dev.isBeachProperty);
  }

  // Golf only
  if (filter.golfOnly) {
    developments = developments.filter(dev => dev.isGolfProperty);
  }

  // Sort
  if (filter.sortBy) {
    developments = sortDevelopments(developments, filter.sortBy);
  }

  // Limit
  if (filter.limit) {
    developments = developments.slice(0, filter.limit);
  }

  return developments;
}

/**
 * Sort developments
 */
function sortDevelopments(
  developments: TaggedDevelopment[],
  sortBy: TagFilter['sortBy']
): TaggedDevelopment[] {
  const sorted = [...developments];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.priceFrom - b.priceFrom);

    case 'price-desc':
      return sorted.sort((a, b) => b.priceFrom - a.priceFrom);

    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case 'beach-distance':
      // Beachfront first, then walking, then short-drive, then others
      const distanceOrder = { beachfront: 0, walking: 1, 'short-drive': 2 };
      return sorted.sort((a, b) => {
        if (!a.isBeachProperty && !b.isBeachProperty) return 0;
        if (!a.isBeachProperty) return 1;
        if (!b.isBeachProperty) return -1;
        return (distanceOrder[a.beachDistance!] || 3) - (distanceOrder[b.beachDistance!] || 3);
      });

    case 'relevance':
      // More tags = more relevant
      return sorted.sort((a, b) => b.tags.length - a.tags.length);

    default:
      return sorted;
  }
}

// ==========================================
// BLOG INTEGRATION
// ==========================================

/**
 * Get properties for a blog topic
 */
export async function getPropertiesForBlogTopic(
  topicSlug: string,
  limit: number = 10
): Promise<TaggedDevelopment[]> {
  const topic = BLOG_TOPIC_SUGGESTIONS.find(t => t.slug === topicSlug);

  if (!topic) {
    return [];
  }

  return filterDevelopmentsByTags({
    tags: topic.tags,
    zones: topic.propertyFilter.zone,
    priceMin: topic.propertyFilter.priceMin,
    priceMax: topic.propertyFilter.priceMax,
    propertyTypes: topic.propertyFilter.propertyType,
    limit,
    sortBy: 'relevance'
  });
}

/**
 * Get suggested blog topics based on current properties
 */
export async function getActiveBlogTopics(): Promise<BlogTopicSuggestion[]> {
  const developments = await getAllTaggedDevelopments();

  // Filter to topics that have at least 3 matching properties
  const activeTopics: BlogTopicSuggestion[] = [];

  for (const topic of BLOG_TOPIC_SUGGESTIONS) {
    const matching = developments.filter(dev => {
      // Check tags
      if (!topic.tags.some(tagId => dev.tagIds.includes(tagId))) {
        return false;
      }

      // Check zones
      if (topic.propertyFilter.zone?.length) {
        const zonesLower = topic.propertyFilter.zone.map(z => z.toLowerCase());
        if (!dev.zone || !zonesLower.includes(dev.zone.toLowerCase())) {
          return false;
        }
      }

      // Check price
      if (topic.propertyFilter.priceMax && dev.priceFrom > topic.propertyFilter.priceMax) {
        return false;
      }
      if (topic.propertyFilter.priceMin && dev.priceFrom < topic.propertyFilter.priceMin) {
        return false;
      }

      return true;
    });

    if (matching.length >= 3) {
      activeTopics.push(topic);
    }
  }

  return activeTopics;
}

/**
 * Get tag statistics
 */
export async function getTagStatistics(): Promise<Map<string, number>> {
  const developments = await getAllTaggedDevelopments();
  const stats = new Map<string, number>();

  for (const dev of developments) {
    for (const tagId of dev.tagIds) {
      stats.set(tagId, (stats.get(tagId) || 0) + 1);
    }
  }

  return stats;
}

// ==========================================
// BEACH & GOLF SPECIFIC QUERIES
// ==========================================

/**
 * Get beach properties grouped by beach
 */
export async function getBeachPropertiesGrouped(): Promise<Map<string, TaggedDevelopment[]>> {
  const developments = await getAllTaggedDevelopments();
  const grouped = new Map<string, TaggedDevelopment[]>();

  for (const dev of developments) {
    if (dev.isBeachProperty && dev.beachName) {
      const existing = grouped.get(dev.beachName) || [];
      existing.push(dev);
      grouped.set(dev.beachName, existing);
    }
  }

  return grouped;
}

/**
 * Get golf properties grouped by course
 */
export async function getGolfPropertiesGrouped(): Promise<Map<string, TaggedDevelopment[]>> {
  const developments = await getAllTaggedDevelopments();
  const grouped = new Map<string, TaggedDevelopment[]>();

  for (const dev of developments) {
    if (dev.isGolfProperty && dev.golfCourse) {
      const existing = grouped.get(dev.golfCourse) || [];
      existing.push(dev);
      grouped.set(dev.golfCourse, existing);
    }
  }

  return grouped;
}

/**
 * Get properties by price bracket
 */
export async function getPropertiesByPriceBracket(): Promise<Map<string, TaggedDevelopment[]>> {
  const developments = await getAllTaggedDevelopments();
  const grouped = new Map<string, TaggedDevelopment[]>();

  for (const bracket of PRICE_BRACKETS) {
    grouped.set(bracket.id, []);
  }

  for (const dev of developments) {
    if (dev.priceBracket) {
      const existing = grouped.get(dev.priceBracket.id) || [];
      existing.push(dev);
      grouped.set(dev.priceBracket.id, existing);
    }
  }

  return grouped;
}

// ==========================================
// EXPORTS
// ==========================================

export type { Tag };

export {
  BEACH_ZONES,
  GOLF_ZONES,
  PRICE_BRACKETS,
  ALL_TAGS,
  LIFESTYLE_TAGS,
  FEATURE_TAGS,
  PROPERTY_TYPE_TAGS,
  REGION_TAGS,
  BLOG_TOPIC_SUGGESTIONS
};
