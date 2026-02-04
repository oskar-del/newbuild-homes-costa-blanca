/**
 * Tags API Route
 *
 * GET /api/tags - Get all tags with statistics
 * POST /api/tags/filter - Filter properties by tags
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  ALL_TAGS,
  BEACH_ZONES,
  GOLF_ZONES,
  PRICE_BRACKETS,
  BLOG_TOPIC_SUGGESTIONS,
  getTagStatistics,
  getActiveBlogTopics
} from '@/lib/tag-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeStats = searchParams.get('stats') === 'true';
    const category = searchParams.get('category');

    let tags = ALL_TAGS;

    // Filter by category if specified
    if (category) {
      tags = tags.filter(tag => tag.category === category);
    }

    // Include statistics if requested
    let stats: Record<string, number> | undefined;
    if (includeStats) {
      const statsMap = await getTagStatistics();
      stats = Object.fromEntries(statsMap);
    }

    // Get active blog topics
    const activeTopics = await getActiveBlogTopics();

    return NextResponse.json({
      success: true,
      data: {
        tags,
        stats,
        activeTopics: activeTopics.map(t => ({
          title: t.title,
          slug: t.slug,
          description: t.description,
          tags: t.tags
        })),
        metadata: {
          beachCount: Object.keys(BEACH_ZONES).length,
          golfCount: Object.keys(GOLF_ZONES).length,
          priceBrackets: PRICE_BRACKETS.map(b => ({
            id: b.id,
            name: b.name,
            range: `€${b.min.toLocaleString()} - ${b.max === Infinity ? '∞' : '€' + b.max.toLocaleString()}`
          })),
          totalBlogTopics: BLOG_TOPIC_SUGGESTIONS.length
        }
      }
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}
