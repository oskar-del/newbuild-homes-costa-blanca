import { fetchXMLFeed, groupByDevelopment, groupByArea, groupByDeveloper, ParsedProperty, ParsedDevelopment } from './xml-parser';

// Cache for build time
let cachedProperties: ParsedProperty[] | null = null;
let cachedDevelopments: ParsedDevelopment[] | null = null;

async function getProperties(): Promise<ParsedProperty[]> {
  if (!cachedProperties) {
    cachedProperties = await fetchXMLFeed();
  }
  return cachedProperties;
}

async function getDevelopments(): Promise<ParsedDevelopment[]> {
  if (!cachedDevelopments) {
    const props = await getProperties();
    cachedDevelopments = groupByDevelopment(props);
  }
  return cachedDevelopments;
}

export async function getAllDevelopments() {
  return getDevelopments();
}

export async function getDevelopmentBySlug(slug: string) {
  const devs = await getDevelopments();
  return devs.find(d => d.slug === slug) || null;
}

export async function getAllBuilders() {
  const props = await getProperties();
  const groups = groupByDeveloper(props);
  return Array.from(groups.entries()).map(([slug, properties]) => {
    const name = properties[0]?.developer || slug;
    const devSlugs = [...new Set(properties.map(p => p.developmentSlug))];
    return { slug, name, developments: devSlugs, description: `${name} is a property developer in Costa Blanca.`, shortDescription: `Quality homes by ${name}` };
  });
}

export async function getBuilderBySlug(slug: string) {
  const builders = await getAllBuilders();
  return builders.find(b => b.slug === slug) || null;
}

export async function getDevelopmentsByBuilder(builderSlug: string) {
  const devs = await getDevelopments();
  return devs.filter(d => d.developerSlug === builderSlug);
}

export async function getAllAreas() {
  const props = await getProperties();
  const groups = groupByArea(props);
  return Array.from(groups.entries()).map(([slug, properties]) => {
    const town = properties[0]?.town || slug;
    const prices = properties.map(p => p.price).filter(Boolean) as number[];
    return { slug, name: town, region: 'Costa Blanca', propertyCount: properties.length, priceFrom: prices.length ? Math.min(...prices) : null };
  });
}

export async function getAreaBySlug(slug: string) {
  const areas = await getAllAreas();
  return areas.find(a => a.slug === slug) || null;
}

export async function getDevelopmentsByArea(areaSlug: string) {
  const devs = await getDevelopments();
  return devs.filter(d => d.town.toLowerCase().replace(/\s+/g, '-') === areaSlug);
}

export function getStatusConfig() {
  return {
    'key-ready': { label: 'Key Ready', bgColor: 'bg-green-100', textColor: 'text-green-800' },
    'completion-3-months': { label: 'Completion Q1 2025', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
    'under-construction': { label: 'Under Construction', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
    'off-plan': { label: 'Off Plan', bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
    'sold': { label: 'Sold Out', bgColor: 'bg-gray-100', textColor: 'text-gray-800' },
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
}

export async function getStats() {
  const devs = await getDevelopments();
  const builders = await getAllBuilders();
  const areas = await getAllAreas();
  const totalProperties = devs.reduce((sum, d) => sum + d.propertyCount, 0);
  const prices = devs.map(d => d.priceFrom).filter(Boolean) as number[];
  return {
    totalDevelopments: devs.length,
    totalProperties,
    totalAreas: areas.length,
    totalBuilders: builders.length,
    priceFrom: prices.length ? Math.min(...prices) : 0,
    priceFromFormatted: formatPrice(prices.length ? Math.min(...prices) : 0)
  };
}
