import { XMLParser } from 'fast-xml-parser';

export interface ParsedProperty {
  id: string;
  title: string;
  slug: string;
  price: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  size: number | null;
  plotSize: number | null;
  description: string;
  images: string[];
  town: string;
  province: string;
  developer: string;
  developerSlug: string;
  developmentName: string;
  developmentSlug: string;
  propertyType: string;
  status: string;
  isNewBuild: boolean;
  ref: string;
}

export interface ParsedDevelopment {
  slug: string;
  name: string;
  developer: string;
  developerSlug: string;
  town: string;
  province: string;
  propertyCount: number;
  priceFrom: number | null;
  priceTo: number | null;
  bedroomsRange: string;
  images: string[];
  properties: ParsedProperty[];
  description: string;
}

const FEED_URL = 'http://feeds.transporter.janeladigital.com/423E0F5F-30FC-4E01-8FE1-99BD7E14B021/0500015622.xml';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractProjectName(description: string, propertyType: string, ref: string): string {
  // Try to extract villa/project name from description
  // Patterns: "present Villa Elysia", "Villa Elysia,", "Villa Elysia is"
  const patterns = [
    /present\s+(Villa\s+\w+)/i,
    /presenting\s+(Villa\s+\w+)/i,
    /(Villa\s+\w+),/i,
    /(Villa\s+\w+)\s+is/i,
    /(Villa\s+\w+)\s+offers/i,
    /(Villa\s+\w+)\s+features/i,
    /welcome\s+to\s+(Villa\s+\w+)/i,
    /discover\s+(Villa\s+\w+)/i,
    /(Residencial\s+\w+)/i,
    /(Apartamentos\s+\w+)/i,
  ];

  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  // Fallback: use property type + ref
  return `${propertyType} ${ref}`;
}

export async function fetchXMLFeed(): Promise<ParsedProperty[]> {
  try {
    const response = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!response.ok) {
      console.error('Feed fetch failed:', response.status);
      return [];
    }
    const xml = await response.text();
    
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '_text',
    });
    
    const data = parser.parse(xml);
    const properties = data?.root?.property || [];
    const agent = data?.root?.agent || {};
    
    const developerName = typeof agent.name === 'string' 
      ? agent.name.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim()
      : 'Unknown Developer';
    const developerSlug = slugify(developerName);
    
    const propArray = Array.isArray(properties) ? properties : [properties];
    
    return propArray
      .filter((p: any) => p.new_build === 1 || p.new_build === '1')
      .map((p: any) => {
        const descEn = p.desc?.en || '';
        const descEs = p.desc?.es || '';
        const description = descEn || descEs;
        const cleanDescription = description.replace(/#ref:\w+/gi, '').trim();
        
        const town = p.town || '';
        const propertyType = p.type || 'Property';
        const ref = p.ref || p.id || '';
        
        // Extract the actual project/villa name
        const developmentName = extractProjectName(cleanDescription, propertyType, ref);
        
        const images: string[] = [];
        if (p.images?.image) {
          const imgArray = Array.isArray(p.images.image) ? p.images.image : [p.images.image];
          imgArray.forEach((img: any) => {
            if (img?.url) images.push(img.url);
            else if (typeof img === 'string') images.push(img);
          });
        }
        
        return {
          id: String(p.id || ''),
          title: developmentName,
          slug: slugify(developmentName),
          price: p.price ? Number(p.price) : null,
          bedrooms: p.beds ? Number(p.beds) : null,
          bathrooms: p.baths ? Number(p.baths) : null,
          size: p.surface_area?.built ? Number(p.surface_area.built) : null,
          plotSize: p.surface_area?.plot ? Number(p.surface_area.plot) : null,
          description: cleanDescription,
          images,
          town,
          province: p.province || 'Alicante',
          developer: developerName,
          developerSlug,
          developmentName,
          developmentSlug: slugify(developmentName),
          propertyType,
          status: 'available',
          isNewBuild: true,
          ref,
        };
      });
  } catch (error) {
    console.error('Feed error:', error);
    return [];
  }
}

export function groupByDevelopment(properties: ParsedProperty[]): ParsedDevelopment[] {
  // For single-property developments (like Miralbo villas), each property IS the development
  return properties.map(p => ({
    slug: p.developmentSlug,
    name: p.developmentName,
    developer: p.developer,
    developerSlug: p.developerSlug,
    town: p.town,
    province: p.province,
    propertyCount: 1,
    priceFrom: p.price,
    priceTo: p.price,
    bedroomsRange: p.bedrooms ? `${p.bedrooms} bed` : '',
    images: p.images,
    properties: [p],
    description: p.description,
  }));
}

export function groupByArea(properties: ParsedProperty[]): Map<string, ParsedProperty[]> {
  const groups = new Map<string, ParsedProperty[]>();
  properties.forEach(p => {
    const key = slugify(p.town);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  });
  return groups;
}

export function groupByDeveloper(properties: ParsedProperty[]): Map<string, ParsedProperty[]> {
  const groups = new Map<string, ParsedProperty[]>();
  properties.forEach(p => {
    const key = p.developerSlug;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  });
  return groups;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}
