/**
 * Tag Filter API Route
 *
 * POST /api/tags/filter - Filter properties by tags and criteria
 *
 * Example request body:
 * {
 *   "tags": ["beach-lover", "apartment"],
 *   "priceMax": 300000,
 *   "regions": ["Costa Blanca South"],
 *   "beachOnly": true,
 *   "limit": 10,
 *   "sortBy": "price-asc"
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { filterDevelopmentsByTags, TagFilter } from '@/lib/tag-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as TagFilter;

    const developments = await filterDevelopmentsByTags(body);

    // Return simplified data (without full schema to reduce payload)
    const results = developments.map(dev => ({
      slug: dev.slug,
      name: dev.name,
      developer: dev.developer,
      town: dev.town,
      zone: dev.zone,
      region: dev.region,
      priceFrom: dev.priceFrom,
      priceTo: dev.priceTo,
      priceRange: dev.priceRange,
      propertyTypes: dev.propertyTypes,
      bedroomRange: dev.bedroomRange,
      status: dev.status,
      deliveryQuarter: dev.deliveryQuarter,
      mainImage: dev.mainImage,
      totalUnits: dev.totalUnits,
      availableUnits: dev.availableUnits,

      // Tag info
      tags: dev.tags.map(t => ({ id: t.id, name: t.name, icon: t.icon })),

      // Location tags
      isBeachProperty: dev.isBeachProperty,
      beachName: dev.beachName,
      beachDistance: dev.beachDistance,
      isGolfProperty: dev.isGolfProperty,
      golfCourse: dev.golfCourse,

      // Price bracket
      priceBracket: dev.priceBracket ? {
        id: dev.priceBracket.id,
        name: dev.priceBracket.name
      } : undefined
    }));

    return NextResponse.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    console.error('Error filtering by tags:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to filter properties' },
      { status: 500 }
    );
  }
}

// Also support GET with query params for simpler requests
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filter: TagFilter = {};

    // Parse query params
    const tags = searchParams.get('tags');
    if (tags) filter.tags = tags.split(',');

    const zones = searchParams.get('zones');
    if (zones) filter.zones = zones.split(',');

    const priceMin = searchParams.get('priceMin');
    if (priceMin) filter.priceMin = parseInt(priceMin);

    const priceMax = searchParams.get('priceMax');
    if (priceMax) filter.priceMax = parseInt(priceMax);

    const types = searchParams.get('types');
    if (types) filter.propertyTypes = types.split(',');

    const regions = searchParams.get('regions');
    if (regions) filter.regions = regions.split(',');

    const beachOnly = searchParams.get('beachOnly');
    if (beachOnly === 'true') filter.beachOnly = true;

    const golfOnly = searchParams.get('golfOnly');
    if (golfOnly === 'true') filter.golfOnly = true;

    const limit = searchParams.get('limit');
    if (limit) filter.limit = parseInt(limit);

    const sortBy = searchParams.get('sortBy') as TagFilter['sortBy'];
    if (sortBy) filter.sortBy = sortBy;

    const developments = await filterDevelopmentsByTags(filter);

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
      mainImage: dev.mainImage,
      tags: dev.tags.map(t => ({ id: t.id, name: t.name, icon: t.icon })),
      isBeachProperty: dev.isBeachProperty,
      beachName: dev.beachName,
      isGolfProperty: dev.isGolfProperty,
      golfCourse: dev.golfCourse
    }));

    return NextResponse.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    console.error('Error filtering by tags:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to filter properties' },
      { status: 500 }
    );
  }
}
