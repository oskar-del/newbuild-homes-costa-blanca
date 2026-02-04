import { MetadataRoute } from 'next';
import { getAllDevelopments, getAllAreas, getAllBuilders } from '@/lib/property-service';
import { getAllProperties } from '@/lib/unified-feed-service';

// All guide pages
const GUIDE_SLUGS = [
  'buying-process',
  'costs-taxes',
  'key-ready-vs-off-plan',
  'mortgages',
  'nie-number',
  'north-vs-south',
  'why-new-build',
  'tourist-rental-license',
];

// All golf course slugs
const GOLF_COURSE_SLUGS = [
  'serena-golf',
  'hacienda-del-alamo',
  'peraleja-golf',
  'altorreal-golf',
  'roda-golf',
  'la-finca-golf',
  'vistabella-golf',
  'lo-romero-golf',
  'la-marquesa-golf',
  'puig-campana-golf',
  'aguilon-golf',
  'desert-springs',
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
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/inland`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/finance`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/after-sales`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = GUIDE_SLUGS.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Golf course pages
  const golfPages: MetadataRoute.Sitemap = GOLF_COURSE_SLUGS.map((slug) => ({
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

  // Programmatic property filter pages (SEO)
  const filterPages: MetadataRoute.Sitemap = FILTER_SLUGS.map((slug) => ({
    url: `${baseUrl}/properties/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.75,
  }));

  // Individual property pages
  const propertyPages: MetadataRoute.Sitemap = properties.slice(0, 500).map((prop) => ({
    url: `${baseUrl}/properties/${prop.reference}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...guidePages,
    ...golfPages,
    ...developmentPages,
    ...areaPages,
    ...builderPages,
    ...filterPages,
    ...propertyPages,
  ];
}
