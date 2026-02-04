/**
 * Golf Properties API Route
 *
 * GET /api/tags/golf - Get all golf properties grouped by course
 * GET /api/tags/golf?course=Vistabella%20Golf - Get properties near a specific course
 */

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import {
  getGolfPropertiesGrouped,
  GOLF_ZONES
} from '@/lib/tag-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const specificCourse = searchParams.get('course');
    const distance = searchParams.get('distance') as 'on-course' | 'walking' | 'short-drive' | null;
    const limit = parseInt(searchParams.get('limit') || '50');

    // Get all golf properties grouped
    const grouped = await getGolfPropertiesGrouped();

    // If specific course requested, filter to that
    if (specificCourse) {
      const properties = grouped.get(specificCourse) || [];

      return NextResponse.json({
        success: true,
        course: specificCourse,
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
          golfDistance: dev.golfDistance
        }))
      });
    }

    // Return all courses with property counts
    const courses: Array<{
      name: string;
      holes: number;
      propertyCount: number;
      priceRange: string;
      distances: Record<string, number>;
      propertyTypes: string[];
    }> = [];

    grouped.forEach((properties, courseName) => {
      // Filter by distance if specified
      if (distance) {
        properties = properties.filter(p => p.golfDistance === distance);
      }

      if (properties.length === 0) return;

      const prices = properties.map(p => p.priceFrom).filter(p => p > 0);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      // Count by distance
      const distances: Record<string, number> = {};
      properties.forEach(p => {
        if (p.golfDistance) {
          distances[p.golfDistance] = (distances[p.golfDistance] || 0) + 1;
        }
      });

      // Get unique property types
      const types = new Set<string>();
      properties.forEach(p => p.propertyTypes.forEach(t => types.add(t)));

      // Get holes from zone info
      const zoneEntry = Object.entries(GOLF_ZONES).find(([_, info]) => info.course === courseName);
      const holes = zoneEntry ? zoneEntry[1].holes : 18;

      courses.push({
        name: courseName,
        holes,
        propertyCount: properties.length,
        priceRange: `€${minPrice.toLocaleString()} - €${maxPrice.toLocaleString()}`,
        distances,
        propertyTypes: Array.from(types)
      });
    });

    // Sort by property count
    courses.sort((a, b) => b.propertyCount - a.propertyCount);

    return NextResponse.json({
      success: true,
      totalCourses: courses.length,
      totalProperties: Array.from(grouped.values()).flat().length,
      data: courses,
      zones: Object.entries(GOLF_ZONES).map(([zone, info]) => ({
        zone,
        course: info.course,
        distance: info.distance,
        holes: info.holes
      }))
    });
  } catch (error) {
    console.error('Error fetching golf properties:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch golf properties' },
      { status: 500 }
    );
  }
}
