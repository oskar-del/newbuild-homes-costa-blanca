import { MetadataRoute } from 'next';
import { getAllDevelopments, getAllAreas, getAllBuilders } from '@/lib/property-service';
import { getAllProperties } from '@/lib/unified-feed-service';
import { GOLF_COURSES } from '@/lib/golf-courses';
import fs from 'fs';
import path from 'path';

// Dynamically read all blog article slugs from the articles directory
function getAllBlogSlugs(): string[] {
  const articlesDir = path.join(process.cwd(), 'src/content/articles');
  try {
    return fs.readdirSync(articlesDir)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));
  } catch {
    return [];
  }
}

// All guide pages (including super guides)
const GUIDE_SLUGS = [
  'buying-process',
  'costs-taxes',
  'key-ready-vs-off-plan',
  'mortgages',
  'nie-number',
  'north-vs-south',
  'why-new-build',
  'tourist-rental-license',
  // Super guides
  'torrevieja',
  'javea',
  'costa-blanca-north',
];

// All programmatic filter pages for SEO
const FILTER_SLUGS = [
  // Property Types
  'apartments', 'villas', 'townhouses', 'penthouses', 'bungalows',
  // Towns - South
  'torrevieja', 'orihuela-costa', 'guardamar', 'pilar-de-la-horadada', 'san-miguel-de-salinas',
  // Towns - North
  'javea', 'moraira', 'calpe', 'altea', 'benidorm', 'denia', 'benissa', 'teulada',
  // Inland
  'pinoso', 'hondon',
  // Compound: Type + Town
  'apartments-torrevieja', 'apartments-orihuela-costa', 'apartments-benidorm', 'apartments-javea', 'apartments-calpe',
  'villas-javea', 'villas-moraira', 'villas-orihuela-costa', 'villas-pinoso',
  'townhouses-orihuela-costa', 'townhouses-torrevieja',
  // Bedrooms
  '2-bed-apartments', '3-bed-apartments', '3-bed-villas', '4-bed-villas',
  // Price ranges
  'under-200k', 'under-300k', 'luxury-over-500k', 'luxury-over-1m',
  // Regions
  'costa-blanca-south', 'costa-blanca-north',
  // Combined regions & features
  'costa-blanca', 'costa-calida', 'key-ready', 'inland',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://newbuildhomescostablanca.com';

  // Get dynamic data - wrap in try-catch to prevent build failures when feeds are unreachable
  let developments: Awaited<ReturnType<typeof getAllDevelopments>> = [];
  let areas: Awaited<ReturnType<typeof getAllAreas>> = [];
  let builders: Awaited<ReturnType<typeof getAllBuilders>> = [];
  let properties: { reference: string }[] = [];

  try {
    developments = await getAllDevelopments();
  } catch (e) {
    console.warn('[Sitemap] Failed to fetch developments, using empty array');
  }

  try {
    areas = await getAllAreas();
  } catch (e) {
    console.warn('[Sitemap] Failed to fetch areas, using empty array');
  }

  try {
    builders = await getAllBuilders();
  } catch (e) {
    console.warn('[Sitemap] Failed to fetch builders, using empty array');
  }

  try {
    properties = await getAllProperties();
  } catch (e) {
    console.warn('[Sitemap] Failed to fetch properties, using empty array');
  }

  // Get all blog slugs dynamically
  const blogSlugs = getAllBlogSlugs();
  console.log(`[Sitemap] Found ${blogSlugs.length} blog articles`);

  // Get all golf course slugs from the data source
  const golfSlugs = GOLF_COURSES.map(c => c.slug);
  console.log(`[Sitemap] Found ${golfSlugs.length} golf courses`);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/developments`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/builders`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/golf`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/luxury`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/beach`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/inland`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/land-plots`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/costa-calida`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/finance`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/consultation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/after-sales`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/developments/costa-blanca-south`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/developments/costa-blanca-north`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/regions/costa-blanca-north`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/regions/costa-blanca-south`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Guide pages (including super guides)
  const guidePages: MetadataRoute.Sitemap = GUIDE_SLUGS.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Golf course pages - ALL 22 courses from data source
  const golfPages: MetadataRoute.Sitemap = golfSlugs.map((slug) => ({
    url: `${baseUrl}/golf/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Development pages
  const developmentPages: MetadataRoute.Sitemap = developments.map((dev) => ({
    url: `${baseUrl}/developments/${dev.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Area pages
  const areaPages: MetadataRoute.Sitemap = areas.map((area) => ({
    url: `${baseUrl}/areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Builder pages
  const builderPages: MetadataRoute.Sitemap = builders.map((builder) => ({
    url: `${baseUrl}/builders/${builder.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Blog article pages - ALL articles dynamically from filesystem
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Programmatic property filter pages (SEO)
  const filterPages: MetadataRoute.Sitemap = FILTER_SLUGS.map((slug) => ({
    url: `${baseUrl}/properties/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.75,
  }));

  // Individual property pages - ALL properties (no limit)
  const propertyPages: MetadataRoute.Sitemap = properties.map((prop) => ({
    url: `${baseUrl}/properties/${prop.reference}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  console.log(`[Sitemap] Total URLs: ${staticPages.length + guidePages.length + golfPages.length + blogPages.length + developmentPages.length + areaPages.length + builderPages.length + filterPages.length + propertyPages.length}`);

  return [
    ...staticPages,
    ...guidePages,
    ...golfPages,
    ...blogPages,
    ...developmentPages,
    ...areaPages,
    ...builderPages,
    ...filterPages,
    ...propertyPages,
  ];
}
