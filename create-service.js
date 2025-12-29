const fs = require('fs');

const content = `import { fetchXMLFeed, groupByDevelopment, groupByArea, groupByDeveloper, ParsedProperty, ParsedDevelopment } from './xml-parser';

export async function getAllDevelopments(): Promise<ParsedDevelopment[]> {
  const props = await fetchXMLFeed();
  return groupByDevelopment(props);
}

export async function getDevelopmentBySlug(slug: string): Promise<ParsedDevelopment | null> {
  const devs = await getAllDevelopments();
  return devs.find(d => d.slug === slug) || null;
}

export async function getAllBuilders() {
  const props = await fetchXMLFeed();
  const groups = groupByDeveloper(props);
  return Array.from(groups.entries()).map(([slug, properties]) => {
    const name = properties[0]?.developer || slug;
    const prices = properties.map(p => p.price).filter(Boolean) as number[];
    const devSlugs = [...new Set(properties.map(p => p.developmentSlug))];
    return {
      slug,
      name,
      developmentCount: devSlugs.length,
      propertyCount: properties.length,
      priceFrom: prices.length ? Math.min(...prices) : null,
    };
  });
}

export async function getBuilderBySlug(slug: string) {
  const builders = await getAllBuilders();
  return builders.find(b => b.slug === slug) || null;
}

export async function getDevelopmentsByBuilder(builderSlug: string) {
  const devs = await getAllDevelopments();
  return devs.filter(d => d.developerSlug === builderSlug);
}

export async function getAllAreas() {
  const props = await fetchXMLFeed();
  const groups = groupByArea(props);
  return Array.from(groups.entries()).map(([slug, properties]) => {
    const town = properties[0]?.town || slug;
    const prices = properties.map(p => p.price).filter(Boolean) as number[];
    return {
      slug,
      name: town,
      propertyCount: properties.length,
      priceFrom: prices.length ? Math.min(...prices) : null,
    };
  });
}

export async function getAreaBySlug(slug: string) {
  const areas = await getAllAreas();
  return areas.find(a => a.slug === slug) || null;
}

export async function getDevelopmentsByArea(areaSlug: string) {
  const devs = await getAllDevelopments();
  return devs.filter(d => d.town.toLowerCase().replace(/[^a-z0-9]+/g, '-') === areaSlug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export async function getStats() {
  const devs = await getAllDevelopments();
  const builders = await getAllBuilders();
  const areas = await getAllAreas();
  const totalProperties = devs.reduce((sum, d) => sum + d.propertyCount, 0);
  const prices = devs.map(d => d.priceFrom).filter(Boolean) as number[];
  const minPrice = prices.length ? Math.min(...prices) : 0;
  return {
    totalDevelopments: devs.length,
    totalProperties,
    totalAreas: areas.length,
    totalBuilders: builders.length,
    priceFrom: minPrice,
    priceFromFormatted: formatPrice(minPrice),
  };
}
`;

fs.writeFileSync('src/lib/property-service.ts', content);
console.log('property-service.ts created');
