import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArea, getAllAreaSlugs, FALLBACK_IMAGE, AreaContent } from '@/lib/area-utils';
import { getAreaStrings } from '@/lib/area-i18n';
import { getAllDevelopments } from '@/lib/development-service';
import { areaImageSuggestions, getImageUrl, villaPoolImages } from '@/data/stock-images';
import AreaPageContent from '@/components/area/AreaPageContent';

// Only pre-build 15 main premium areas at build time, rest use ISR
const PRIORITY_AREAS = [
  'torrevieja', 'algorfa', 'javea', 'calpe', 'benidorm', 'altea',
  'moraira', 'orihuela-costa', 'guardamar-del-segura', 'villamartin',
  'la-zenia', 'denia', 'ciudad-quesada', 'cabo-roig', 'santa-pola'
];

export async function generateStaticParams() {
  return PRIORITY_AREAS.map(slug => ({ slug }));
}

// Enable ISR for all other areas - they'll be built on first request
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getArea(slug);

  if (!data) {
    return { title: 'Area Not Found' };
  }

  return {
    title: data.content.metaTitle,
    description: data.content.metaDescription,
    alternates: {
      canonical: `https://newbuildhomescostablanca.com/areas/${slug}`,
    },
  };
}

/**
 * Shared helper: prepare area page data (developments, hero image, etc.)
 * Used by both English and localized area pages.
 */
export async function prepareAreaPageData(data: AreaContent, slug: string) {
  // Fetch real developments from API for this area
  const allDevelopments = await getAllDevelopments();
  const areaNameLower = data.name.toLowerCase();
  const slugLower = slug.toLowerCase();

  // For region pages, match against child areas
  const isRegionPage = !!(data as any).childAreas?.length;
  const childAreaNames = ((data as any).childAreas || []).map((s: string) => s.toLowerCase().replace(/-/g, ' '));

  // Filter developments that match this area by town field
  const allMatchingDevelopments = allDevelopments
    .filter(dev => {
      const town = (dev.town || '').toLowerCase().replace(/_/g, ' ');
      const zone = (dev.zone || '').toLowerCase().replace(/_/g, ' ');
      const townParts = town.split(/[\s_-]+/);
      const zoneParts = zone.split(/[\s_-]+/);

      if (isRegionPage) {
        return childAreaNames.some((child: string) =>
          town.includes(child) || zone.includes(child) || child.includes(town)
        );
      }

      if (town.includes(areaNameLower) || town.includes(slugLower) ||
          zone.includes(areaNameLower) || zone.includes(slugLower)) return true;
      if (townParts.some(part => part.includes(areaNameLower) || areaNameLower.includes(part))) return true;
      if (zoneParts.some(part => part.includes(areaNameLower) || areaNameLower.includes(part))) return true;

      return false;
    });

  // Update property count based on actual developments found
  data.propertyCount = allMatchingDevelopments.length;

  // Take only first 8 for display on page
  const developments = allMatchingDevelopments
    .slice(0, 8)
    .map(dev => ({
      name: dev.name || 'New Build Property',
      slug: dev.slug,
      propertyType: dev.propertyTypes?.[0] || 'Property',
      price: dev.priceFrom || null,
      bedrooms: dev.minBedrooms || null,
      image: dev.images?.[0] || FALLBACK_IMAGE,
    }));

  // Get hero image
  const heroImage = data.heroImage ||
    (developments[0]?.image && developments[0].image !== FALLBACK_IMAGE ? developments[0].image : null) ||
    (areaImageSuggestions[slug]?.hero ? getImageUrl(areaImageSuggestions[slug].hero, 1920) : null) ||
    getImageUrl(villaPoolImages[5], 1920);

  return { developments, heroImage };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getArea(slug);

  if (!data) {
    notFound();
  }

  const { developments, heroImage } = await prepareAreaPageData(data, slug);
  const strings = getAreaStrings('en');

  return (
    <AreaPageContent
      data={data}
      developments={developments}
      heroImage={heroImage}
      lang="en"
      strings={strings}
      langPrefix=""
    />
  );
}
