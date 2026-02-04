/**
 * Blog Topic Properties API Route
 *
 * GET /api/tags/blog-topic/[slug] - Get properties for a specific blog topic
 *
 * Example: /api/tags/blog-topic/best-beach-properties-costa-blanca
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPropertiesForBlogTopic, BLOG_TOPIC_SUGGESTIONS } from '@/lib/tag-service';
import { generateBlogPostSchema } from '@/data/property-schemas';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');

    // Find the topic
    const topic = BLOG_TOPIC_SUGGESTIONS.find(t => t.slug === slug);

    if (!topic) {
      return NextResponse.json(
        { success: false, error: 'Blog topic not found' },
        { status: 404 }
      );
    }

    // Get matching properties
    const developments = await getPropertiesForBlogTopic(slug, limit);

    // Generate schema for blog post
    const blogSchema = generateBlogPostSchema({
      title: topic.title,
      slug: topic.slug,
      excerpt: topic.description,
      content: topic.description, // In real use, this would be the full content
      image: developments[0]?.mainImage || '/images/default-blog.jpg',
      publishedAt: new Date().toISOString(),
      category: 'Property Guide',
      keywords: topic.tags,
      relatedProperties: developments.slice(0, 5).map(d => ({
        name: d.name,
        slug: d.slug
      }))
    });

    const results = developments.map(dev => ({
      slug: dev.slug,
      name: dev.name,
      developer: dev.developer,
      town: dev.town,
      zone: dev.zone,
      region: dev.region,
      priceFrom: dev.priceFrom,
      priceRange: dev.priceRange,
      propertyTypes: dev.propertyTypes,
      bedroomRange: dev.bedroomRange,
      status: dev.status,
      deliveryQuarter: dev.deliveryQuarter,
      mainImage: dev.mainImage,
      images: dev.images.slice(0, 3), // First 3 images
      tags: dev.tags.map(t => ({ id: t.id, name: t.name, icon: t.icon })),
      isBeachProperty: dev.isBeachProperty,
      beachName: dev.beachName,
      beachDistance: dev.beachDistance,
      isGolfProperty: dev.isGolfProperty,
      golfCourse: dev.golfCourse,
      priceBracket: dev.priceBracket?.name
    }));

    return NextResponse.json({
      success: true,
      topic: {
        title: topic.title,
        slug: topic.slug,
        description: topic.description,
        tags: topic.tags
      },
      count: results.length,
      data: results,
      schema: blogSchema
    });
  } catch (error) {
    console.error('Error fetching blog topic properties:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}
