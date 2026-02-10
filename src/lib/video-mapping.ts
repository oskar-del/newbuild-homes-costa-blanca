/**
 * Video-to-Area/Property Mapping
 *
 * Scans all video JSONs at build time and returns matching
 * videos for any given area slug, tag, or property reference.
 * Used by:
 * - Area pages & super guides (to show area walkthrough videos)
 * - Property pages (to show related property tour videos)
 * - Homepage (to show latest/featured videos)
 * - Golf pages (to show golf area videos)
 * - Blog pages (to cross-link video content)
 */

import fs from 'fs';
import path from 'path';

export interface VideoEntry {
  slug: string;
  title: string;
  youtubeId: string;
  description: string;
  category: string;
  tags: string[];
  relatedAreas: string[];
  relatedDevelopments: string[];
  relatedProperties: string[];
  propertyRef: string | null;
  price: number | null;
  publishedAt: string;
  duration: string;
  featured: boolean;
}

export interface VideoCard {
  slug: string;
  title: string;
  youtubeId: string;
  description: string;
  category: string;
  duration: string;
  price: number | null;
}

// Cache to avoid re-reading files on every page render
let cachedVideos: VideoEntry[] | null = null;

function loadAllVideos(): VideoEntry[] {
  if (cachedVideos) return cachedVideos;

  try {
    const videosDir = path.join(process.cwd(), 'src/content/videos');

    if (!fs.existsSync(videosDir)) {
      cachedVideos = [];
      return cachedVideos;
    }

    const files = fs.readdirSync(videosDir).filter(f => f.endsWith('.json') && !f.startsWith('_'));

    cachedVideos = files
      .map(file => {
        try {
          const data = JSON.parse(fs.readFileSync(path.join(videosDir, file), 'utf-8'));
          return {
            slug: data.slug || file.replace('.json', ''),
            title: data.title || '',
            youtubeId: data.youtubeId || '',
            description: data.description || '',
            category: data.category || 'Property Tour',
            tags: data.tags || [],
            relatedAreas: data.relatedAreas || [],
            relatedDevelopments: data.relatedDevelopments || [],
            relatedProperties: data.relatedProperties || [],
            propertyRef: data.propertyRef || null,
            price: data.price || null,
            publishedAt: data.publishedAt || '',
            duration: data.duration || '',
            featured: data.featured || false,
          } as VideoEntry;
        } catch {
          return null;
        }
      })
      .filter((v): v is VideoEntry => v !== null && v.youtubeId.length > 0)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)); // newest first

    return cachedVideos;
  } catch (error) {
    console.error('Error loading videos:', error);
    return [];
  }
}

function toVideoCard(video: VideoEntry): VideoCard {
  return {
    slug: video.slug,
    title: video.title,
    youtubeId: video.youtubeId,
    description: video.description,
    category: video.category,
    duration: video.duration,
    price: video.price,
  };
}

/**
 * Get videos for an area slug.
 * Matches against relatedAreas field with fuzzy matching.
 */
export function getVideosForArea(areaSlug: string, limit: number = 3): VideoCard[] {
  const videos = loadAllVideos();
  const slugLower = areaSlug.toLowerCase();

  const matched = videos.filter(video =>
    video.relatedAreas.some(area => {
      const areaLower = area.toLowerCase();
      return areaLower === slugLower ||
        slugLower.includes(areaLower) ||
        areaLower.includes(slugLower);
    })
  );

  return matched.slice(0, limit).map(toVideoCard);
}

/**
 * Get videos by tag (e.g., 'golf', 'luxury', 'villa').
 */
export function getVideosByTag(tag: string, limit: number = 3): VideoCard[] {
  const videos = loadAllVideos();
  const tagLower = tag.toLowerCase();

  const matched = videos.filter(video =>
    video.tags.some(t => t.toLowerCase() === tagLower)
  );

  return matched.slice(0, limit).map(toVideoCard);
}

/**
 * Get video for a specific property reference.
 */
export function getVideoForProperty(propertyRef: string): VideoCard | null {
  const videos = loadAllVideos();

  const match = videos.find(video =>
    video.propertyRef === propertyRef ||
    video.relatedProperties.includes(propertyRef)
  );

  return match ? toVideoCard(match) : null;
}

/**
 * Get video for a specific development slug.
 */
export function getVideosForDevelopment(devSlug: string, limit: number = 2): VideoCard[] {
  const videos = loadAllVideos();
  const slugLower = devSlug.toLowerCase();

  const matched = videos.filter(video =>
    video.relatedDevelopments.some(d => d.toLowerCase() === slugLower)
  );

  return matched.slice(0, limit).map(toVideoCard);
}

/**
 * Get featured videos for homepage/landing pages.
 */
export function getFeaturedVideos(limit: number = 3): VideoCard[] {
  const videos = loadAllVideos();

  const featured = videos.filter(v => v.featured);
  if (featured.length >= limit) {
    return featured.slice(0, limit).map(toVideoCard);
  }

  // Fill with latest if not enough featured
  const usedSlugs = new Set(featured.map(v => v.slug));
  const latest = videos.filter(v => !usedSlugs.has(v.slug));
  const combined = [...featured, ...latest].slice(0, limit);

  return combined.map(toVideoCard);
}

/**
 * Get all videos sorted by date (newest first).
 */
export function getAllVideos(): VideoCard[] {
  return loadAllVideos().map(toVideoCard);
}

/**
 * Get latest videos.
 */
export function getLatestVideos(limit: number = 6): VideoCard[] {
  return loadAllVideos().slice(0, limit).map(toVideoCard);
}

/**
 * Get total video count.
 */
export function getVideoCount(): number {
  return loadAllVideos().length;
}
