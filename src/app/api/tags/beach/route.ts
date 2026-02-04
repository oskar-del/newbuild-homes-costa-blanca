/**
 * Beach Properties API Route
 *
 * GET /api/tags/beach - Get all beach properties grouped by beach
 * GET /api/tags/beach?beach=Playa%20del%20Cura - Get properties near a specific beach
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getBeachPropertiesGrouped,
  filterDevelopmentsByTags,
  BEACH_ZONES
} from '@/lib/tag-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const specificBeach = searchParams.get('beach');
    const town = searchParams.get('town');
    const distance = searchParams.get('distance') as 'beachfront' | 'walking' | 'short-drive' | null;
    const limit = parseInt(searchParams.get('limit') || '50');

    // Get all beach properties grouped
    const grouped = await getBeachPropertiesGrouped();

    // If specific beach requested, filter to that
    if (specificBeach) {
      const properties = grouped.get(specificBeach) || [];

      return NextResponse.json({
        success: true,
        beach: specificBeach,
        count: properties.length,
        data: properties.slice(0, limit).map(dev => ({
          slug: dev.slug,
          name: dev.name,
          developer: dev.developer,
          town: dev.town,
          zone: dev.zone,
          priceFrom: dev.priceFrom,
          priceRange: dev.priceRange,
          propertyTypes: dev.propertyTypes,
          status: dev.status,
          mainImage: dev.mainImage,
          beachDistance: dev.beachDistance
        }))
      });
    }

    // Return all beaches with property counts
    const beaches: Array<{
      name: string;
      town: string;
      propertyCount: number;
      priceRange: string;
      distances: Record<string, number>;
    }> = [];

    grouped.forEach((properties, beachName) => {
      // Filter by town if specified
      if (town) {
        properties = properties.filter(p => p.town.toLowerCase() === town.toLowerCase());
      }

      // Filter by distance if specified
      if (distance) {
        properties = properties.filter(p => p.beachDistance === distance);
      }

      if (properties.length === 0) return;

      const prices = properties.map(p => p.priceFrom).filter(p => p > 0);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      // Count by distance
      const distances: Record<string, number> = {};
      properties.forEach(p => {
        if (p.beachDistance) {
          distances[p.beachDistance] = (distances[p.beachDistance] || 0) + 1;
        }
      });

      beaches.push({
        name: beachName,
        town: properties[0].town,
        propertyCount: properties.length,
        priceRange: `€${minPrice.toLocaleString()} - €${maxPrice.toLocaleString()}`,
        distances
      });
    });

    // Sort by property count
    beaches.sort((a, b) => b.propertyCount - a.propertyCount);

    return NextResponse.json({
      success: true,
      totalBeaches: beaches.length,
      totalProperties: Array.from(grouped.values()).flat().length,
      data: beaches,
      zones: Object.entries(BEACH_ZONES).map(([zone, info]) => ({
        zone,
        beach: info.beach,
        town: info.town,
        distance: info.distance
      }))
    });
  } catch (error) {
    console.error('Error fetching beach properties:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch beach properties' },
      { status: 500 }
    );
  }
}
