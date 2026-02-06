#!/usr/bin/env npx tsx
/**
 * Multi-Feed AI Content Generator
 * 
 * Generates SEO content for:
 * - Properties (unique descriptions, titles, FAQs)
 * - Areas (comprehensive guides)
 * - Builders (profiles)
 * 
 * Supports feeds: Miralbo, Background Properties, REDSP (future)
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import { XMLParser } from 'fast-xml-parser';
import { propertyMapping } from '../data/property-development-mapping';
import { generatePropertyPrompt, generateBuilderPrompt, generateAreaPrompt, generateDevelopmentPrompt, TOWN_AMENITIES_DATA, TOWN_PRICE_DATA } from './seo-prompts';

const anthropic = new Anthropic();
const REGENERATE_ALL = process.env.REGENERATE_ALL === 'true';
const MAX_RETRIES = 1; // Don't waste money on retries

// Use Haiku - 10x cheaper than Sonnet
const AI_MODEL = 'claude-haiku-4-5-20251001';

// System prompt to enforce JSON-only output
const JSON_SYSTEM_PROMPT = `You are a JSON generator. You MUST respond with ONLY a valid JSON object.

CRITICAL RULES:
1. Your entire response must be a single JSON object
2. Start your response with { and end with }
3. NO markdown code blocks (no \`\`\`)
4. NO explanatory text before or after the JSON
5. NO comments inside the JSON
6. All strings must be properly escaped
7. No trailing commas

If you cannot generate the requested content, still return valid JSON with empty strings for fields you cannot fill.`;

// Helper to clean and parse JSON from AI responses
function parseAIJson(text: string): any {
  // Try to find JSON in the response
  // First, look for ```json code blocks
  let jsonStr = '';
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1].trim();
  }

  // If no code block, extract JSON object directly
  if (!jsonStr || !jsonStr.startsWith('{')) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.log('   ⚠️  Raw response (first 500 chars):', text.substring(0, 500));
      throw new Error('No JSON found in response');
    }
    jsonStr = jsonMatch[0];
  }

  // Make sure it starts with {
  const firstBrace = jsonStr.indexOf('{');
  if (firstBrace > 0) {
    jsonStr = jsonStr.substring(firstBrace);
  }

  // Common fixes for AI-generated JSON
  // 1. Remove trailing commas before } or ]
  jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');
  // 2. Remove comments (// style) - but not inside strings
  jsonStr = jsonStr.replace(/^\s*\/\/[^\n]*/gm, '');
  // 3. Remove control characters EXCEPT valid whitespace (newline, tab, carriage return)
  jsonStr = jsonStr.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ');

  try {
    return JSON.parse(jsonStr);
  } catch (e: any) {
    console.log('   ⚠️  JSON parse error, attempting repair...');
    console.log(`   ⚠️  Error: ${e.message}`);
    console.log(`   ⚠️  First 200 chars of JSON: ${JSON.stringify(jsonStr.substring(0, 200))}`);
    console.log(`   ⚠️  Last 100 chars of JSON: ${JSON.stringify(jsonStr.substring(jsonStr.length - 100))}`);

    // More aggressive fixes
    try {
      // Fix unescaped quotes inside strings (tricky - just replace smart quotes)
      jsonStr = jsonStr.replace(/[\u201C\u201D]/g, '\\"'); // curly double quotes
      jsonStr = jsonStr.replace(/[\u2018\u2019]/g, "\\'"); // curly single quotes

      // Try again
      return JSON.parse(jsonStr);
    } catch (e2: any) {
      console.log(`   ⚠️  Second attempt failed: ${e2.message}`);

      // Last resort: try to extract just the valid portion
      // Find where the error occurs and truncate
      const posMatch = e2.message.match(/position (\d+)/);
      if (posMatch) {
        const errorPos = parseInt(posMatch[1]);
        console.log(`   ⚠️  Error at position ${errorPos}, attempting truncation...`);

        // Find the last complete property before the error
        const upToError = jsonStr.substring(0, errorPos);
        const lastGoodBrace = upToError.lastIndexOf('},');
        if (lastGoodBrace > 0) {
          const truncated = jsonStr.substring(0, lastGoodBrace + 1) + '}';
          try {
            // Count braces to balance
            let depth = 0;
            let balanced = '';
            for (const char of truncated) {
              balanced += char;
              if (char === '{') depth++;
              if (char === '}') depth--;
            }
            // Add closing braces if needed
            while (depth > 0) {
              balanced += '}';
              depth--;
            }
            return JSON.parse(balanced);
          } catch {
            // Give up
          }
        }
      }

      throw new Error(`Failed to parse JSON: ${e2.message}`);
    }
  }
}

// Retry wrapper for API calls
async function withRetry<T>(
  fn: () => Promise<T>,
  itemName: string,
  maxRetries: number = MAX_RETRIES
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      if (attempt < maxRetries) {
        console.log(`   ⚠️  Attempt ${attempt}/${maxRetries} failed for ${itemName}: ${error.message}`);
        console.log(`   🔄 Retrying in ${attempt * 2} seconds...`);
        await new Promise(r => setTimeout(r, attempt * 2000));
      }
    }
  }

  throw lastError;
}

// Parse command line arguments
const args = process.argv.slice(2);
const TOWN_FILTER = args.find(a => a.startsWith('--town='))?.split('=')[1]?.toLowerCase() || '';
const TYPE_FILTER = args.find(a => a.startsWith('--type='))?.split('=')[1] || 'all'; // all, developers, developments, areas, properties
const LIMIT = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '0') || 0; // 0 = no limit
const LIST_TOWNS = args.includes('--list-towns');

// Usage help
if (args.includes('--help')) {
  console.log(`
Usage: npx tsx generate-all-content.ts [options]

Options:
  --town=NAME      Filter by town (e.g., --town=torrevieja)
  --type=TYPE      What to generate: all, developers, developments, areas, properties
  --limit=N        Limit number of items to generate (0 = no limit)
  --list-towns     Just list towns and property counts, don't generate
  --help           Show this help

Content Types:
  developers    - Builder/developer company profiles (src/content/builders/)
  developments  - Development/project pages (src/content/projects/)
  areas         - Town/area guides (src/content/areas/)
  properties    - Individual property pages (src/content/developments/)

Examples:
  npx tsx generate-all-content.ts --town=torrevieja --type=developments
  npx tsx generate-all-content.ts --type=developers
  npx tsx generate-all-content.ts --town=torrevieja
  npx tsx generate-all-content.ts --list-towns
`);
  process.exit(0);
}

// Feed configurations
// NOTE: Miralbo disabled - only 25 properties and causes DNS issues during build
// Those 25 can be hard-coded later if needed
const FEEDS = {
  miralbo: {
    url: 'https://mifrfrede.mfrpro.com/inmuebles/xml/56b76456fab7c',
    enabled: false, // DISABLED - DNS unreliable, only 25 properties
  },
  backgroundProperties: {
    url: 'https://backgroundproperties.com/wp-load.php?security_token=23f0185aeb5102e7&export_id=19&action=get_data',
    enabled: true,
  },
  redsp: {
    url: 'https://xml.redsp.net/file/450/23a140q0551/general-zone-1-kyero.xml',
    enabled: true,
  },
};

// Content directories
const CONTENT_DIR = path.join(process.cwd(), 'src/content');
const DEVELOPMENTS_DIR = path.join(CONTENT_DIR, 'developments'); // Individual property AI content
const PROJECTS_DIR = path.join(CONTENT_DIR, 'projects'); // Development/project pages (middle layer)
const AREAS_DIR = path.join(CONTENT_DIR, 'areas');
const BUILDERS_DIR = path.join(CONTENT_DIR, 'builders');

// Ensure directories exist
[CONTENT_DIR, DEVELOPMENTS_DIR, PROJECTS_DIR, AREAS_DIR, BUILDERS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function safeStr(val: unknown): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val !== null) {
    const obj = val as Record<string, unknown>;
    return String(obj.en || obj.es || Object.values(obj)[0] || '');
  }
  return String(val);
}

interface Property {
  reference: string;
  title: string;
  description: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  builtArea: number;
  plotSize?: number;
  plotArea: number;
  price: number;
  town: string;
  province: string;
  zone: string;
  images: string[];
  features: string[];
  pool: boolean;
  views: string;
  orientation: string;
  source: string;
  developer?: string; // Builder/developer name if known
}

// Fetch and parse XML feed
async function fetchFeed(url: string): Promise<string> {
  const response = await fetch(url);
  return response.text();
}

// Parse Miralbo feed
function parseMiralboFeed(xml: string): Property[] {
  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(xml);
  const properties = parsed?.properties?.property || [];
  const propArray = Array.isArray(properties) ? properties : [properties];
  
  return propArray.map((p: any) => ({
    reference: String(p.reference || p.ref || ''),
    title: safeStr(p.name || p.title),
    description: safeStr(p.description),
    type: safeStr(p.type),
    bedrooms: Number(p.bedrooms || p.beds) || 0,
    bathrooms: Number(p.bathrooms || p.baths) || 0,
    builtArea: Number(p.built || p.size) || 0,
    plotArea: Number(p.plot) || 0,
    price: Number(p.price) || 0,
    town: safeStr(p.town || p.location?.town),
    province: safeStr(p.province || 'Alicante'),
    zone: safeStr(p.zone || p.area),
    images: extractImages(p),
    features: extractFeatures(p),
    pool: p.pool === '1' || p.pool === 'yes' || safeStr(p.pool).toLowerCase() === 'yes',
    views: safeStr(p.views),
    orientation: safeStr(p.orientation),
    source: 'miralbo',
  }));
}

// Parse Background Properties feed
function parseBackgroundFeed(xml: string): Property[] {
  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(xml);
  const properties = parsed?.sooprema?.properties?.property || [];
  const propArray = Array.isArray(properties) ? properties : [properties];
  
  // Note: Remove strict filter - feed structure may vary
  return propArray.map((p: any) => ({
      reference: String(p.reference || ''),
      title: safeStr(p.title),
      description: safeStr(p.description),
      type: safeStr(p.type),
      bedrooms: Number(p.rooms) || 0,
      bathrooms: Number(p.baths) || 0,
      builtArea: Number(p.built) || 0,
      plotArea: Number(p.plot) || 0,
      price: Number(p.price) || 0,
      town: safeStr(p.location?.town),
      province: safeStr(p.location?.province),
      zone: safeStr(p.location?.zone),
      images: extractImages(p),
      features: extractFeatures(p),
      pool: p.pool === '1' || p.pool === 'yes',
      views: safeStr(p.views),
      orientation: safeStr(p.orientation),
      source: 'backgroundProperties',
    }));
}

// Parse REDSP Kyero feed
function parseRedspFeed(xml: string): Property[] {
  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(xml);
  const properties = parsed?.root?.property || [];
  const propArray = Array.isArray(properties) ? properties : [properties];

  // Note: REDSP feed is already filtered for new builds, no need to filter again
  return propArray.map((p: any) => ({
      reference: String(p.ref || p.id || ''),
      title: safeStr(p.title) || `${safeStr(p.type)} in ${safeStr(p.town)}`,
      description: safeStr(p.desc),
      type: safeStr(p.type),
      bedrooms: Number(p.beds) || 0,
      bathrooms: Number(p.baths) || 0,
      builtArea: Number(p.built) || Number(p.surface_area?.built) || 0,
      plotArea: Number(p.plot) || Number(p.surface_area?.plot) || 0,
      price: Number(p.price) || 0,
      town: safeStr(p.town) || safeStr(p.location?.town),
      province: safeStr(p.province) || 'Alicante',
      zone: safeStr(p.location_detail) || '',
      images: extractRedspImages(p),
      features: extractRedspFeatures(p),
      pool: p.pool === '1' || p.pool === 'yes' || safeStr(p.pool).toLowerCase() === 'yes',
      views: safeStr(p.views),
      orientation: safeStr(p.orientation),
      source: 'redsp',
    }));
}

function extractRedspImages(p: any): string[] {
  const images = p.images?.image;
  if (!images) return [];
  const imgArray = Array.isArray(images) ? images : [images];
  return imgArray.map((img: any) => {
    if (typeof img === 'string') return img;
    return img?.url || img?.['#text'] || '';
  }).filter(Boolean);
}

function extractRedspFeatures(p: any): string[] {
  const features: string[] = [];
  if (p.pool === 'yes' || p.pool === '1') features.push('Swimming Pool');
  if (p.parking) features.push('Parking');
  if (p.garden) features.push('Garden');
  if (p.terrace) features.push('Terrace');
  if (p.air_con) features.push('Air Conditioning');
  if (p.heating) features.push('Heating');
  return features;
}

function extractImages(p: any): string[] {
  if (Array.isArray(p.images?.image)) {
    return p.images.image.map((img: any) => img.url || img).filter(Boolean);
  }
  if (p.images?.image?.url) return [p.images.image.url];
  if (Array.isArray(p.images)) return p.images.filter(Boolean);
  return [];
}

function extractFeatures(p: any): string[] {
  if (Array.isArray(p.features?.feature)) {
    return p.features.feature.map((f: any) => safeStr(f)).filter(Boolean);
  }
  return [];
}

// Generate property content using Claude - ULTIMATE SEO VERSION
async function generatePropertyContent(property: Property): Promise<any> {
  // Use the new SEO-optimized prompt generator
  const prompt = generatePropertyPrompt({
    reference: property.reference,
    type: property.type,
    town: property.town,
    zone: property.zone,
    province: property.province,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    builtArea: property.builtArea,
    plotArea: property.plotArea,
    price: property.price,
    pool: property.pool,
    views: property.views,
    description: property.description?.substring(0, 300),
    images: property.images || [],
    developer: property.developer,
  });

  const response = await anthropic.messages.create({
    model: AI_MODEL,
    max_tokens: 3500, // Increased for more comprehensive content
    system: JSON_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  return parseAIJson(text);
}

// Generate area guide content - NOW USING SEO PROMPTS
async function generateAreaContent(town: string, properties: Property[]): Promise<any> {
  const propertyTypes = [...new Set(properties.map(p => p.type))].filter(Boolean);
  const priceRange = properties.filter(p => p.price > 0);
  const minPrice = priceRange.length ? Math.min(...priceRange.map(p => p.price)) : 0;
  const maxPrice = priceRange.length ? Math.max(...priceRange.map(p => p.price)) : 0;

  // Detect area characteristics
  const golfAreas = ['algorfa', 'villamartin', 'campoamor', 'las colinas', 'vistabella', 'la finca', 'la marquesa'];
  const coastalTowns = ['torrevieja', 'guardamar', 'benidorm', 'calpe', 'javea', 'moraira', 'altea', 'denia', 'orihuela costa'];
  const townLower = town.toLowerCase();
  const isGolfArea = golfAreas.some(g => townLower.includes(g));
  const isCoastal = coastalTowns.some(c => townLower.includes(c));

  // Use the SEO-optimized prompt from seo-prompts.ts
  const prompt = generateAreaPrompt({
    name: town,
    slug: slugify(town),
    propertyCount: properties.length,
    priceRange: { min: minPrice, max: maxPrice },
    propertyTypes: propertyTypes.length > 0 ? propertyTypes : ['Apartments', 'Villas', 'Townhouses'],
    isGolfArea,
    isCoastal,
  });

  const response = await anthropic.messages.create({
    model: AI_MODEL,
    max_tokens: 3500, // Increased for comprehensive area content
    system: JSON_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  return parseAIJson(text);
}

// Aggregate developer data from property mapping
function aggregateDeveloperData() {
  const developers: Record<string, {
    name: string;
    developments: Set<string>;
    zones: Set<string>;
    towns: Set<string>;
    propertyRefs: string[];
    deliveryDates: string[];
  }> = {};

  for (const [ref, info] of Object.entries(propertyMapping)) {
    const devName = info.developer;
    if (!developers[devName]) {
      developers[devName] = {
        name: devName,
        developments: new Set(),
        zones: new Set(),
        towns: new Set(),
        propertyRefs: [],
        deliveryDates: [],
      };
    }
    developers[devName].developments.add(info.development);
    if (info.zone) developers[devName].zones.add(info.zone);
    developers[devName].propertyRefs.push(ref);
    if (info.deliveryDate) developers[devName].deliveryDates.push(info.deliveryDate);
  }

  return Object.values(developers).map(d => ({
    name: d.name,
    slug: slugify(d.name),
    developmentCount: d.developments.size,
    developments: Array.from(d.developments),
    zones: Array.from(d.zones),
    propertyCount: d.propertyRefs.length,
    propertyRefs: d.propertyRefs,
    isGolfSpecialist: Array.from(d.zones).some(z => z.toLowerCase().includes('golf')),
  })).sort((a, b) => b.propertyCount - a.propertyCount);
}

// Generate developer/builder content - NOW USING SEO PROMPTS
async function generateDeveloperContent(dev: {
  name: string;
  slug: string;
  developmentCount: number;
  developments: string[];
  zones: string[];
  propertyCount: number;
  isGolfSpecialist: boolean;
}): Promise<any> {
  // Use the SEO-optimized prompt from seo-prompts.ts
  const prompt = generateBuilderPrompt({
    name: dev.name,
    slug: dev.slug,
    propertyCount: dev.propertyCount,
    developments: dev.developments,
    zones: dev.zones,
    isGolfSpecialist: dev.isGolfSpecialist,
  });

  const response = await anthropic.messages.create({
    model: AI_MODEL,
    max_tokens: 3000, // Increased for more comprehensive content
    system: JSON_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  return parseAIJson(text);
}

// Aggregate development data from property mapping
// Groups properties by developer + development name
function aggregateDevelopmentData(allProperties: Property[]) {
  const developments: Record<string, {
    name: string;
    developer: string;
    developerSlug: string;
    zone: string;
    town: string;
    province: string;
    propertyRefs: string[];
    prices: number[];
    bedrooms: number[];
    bathrooms: number[];
    builtAreas: number[];
    plotAreas: number[];
    propertyTypes: string[];
    deliveryDate?: string;
    hasPool: boolean;
    images: string[];
  }> = {};

  // First pass: group by development from property mapping
  for (const [ref, info] of Object.entries(propertyMapping)) {
    const devKey = `${info.developer}__${info.development}`;

    // Find matching property in allProperties
    const property = allProperties.find(p => p.reference === ref);

    if (!developments[devKey]) {
      developments[devKey] = {
        name: info.development,
        developer: info.developer,
        developerSlug: slugify(info.developer),
        zone: info.zone || '',
        town: property?.town || '',
        province: property?.province || 'Alicante',
        propertyRefs: [],
        prices: [],
        bedrooms: [],
        bathrooms: [],
        builtAreas: [],
        plotAreas: [],
        propertyTypes: [],
        deliveryDate: info.deliveryDate,
        hasPool: false,
        images: [],
      };
    }

    developments[devKey].propertyRefs.push(ref);

    if (property) {
      if (property.price > 0) developments[devKey].prices.push(property.price);
      if (property.bedrooms > 0) developments[devKey].bedrooms.push(property.bedrooms);
      if (property.bathrooms > 0) developments[devKey].bathrooms.push(property.bathrooms);
      if (property.builtArea > 0) developments[devKey].builtAreas.push(property.builtArea);
      if (property.plotArea > 0) developments[devKey].plotAreas.push(property.plotArea);
      if (property.type) developments[devKey].propertyTypes.push(property.type);
      if (property.pool) developments[devKey].hasPool = true;
      if (property.images?.length) developments[devKey].images.push(...property.images.slice(0, 3));
      if (!developments[devKey].town && property.town) developments[devKey].town = property.town;
    }
  }

  // Convert to array and compute ranges
  return Object.entries(developments).map(([key, dev]) => ({
    name: dev.name,
    slug: slugify(dev.name),
    developer: dev.developer,
    developerSlug: dev.developerSlug,
    town: dev.town || 'Costa Blanca',
    province: dev.province,
    zone: dev.zone,
    propertyCount: dev.propertyRefs.length,
    priceFrom: dev.prices.length > 0 ? Math.min(...dev.prices) : 0,
    bedroomRange: {
      min: dev.bedrooms.length > 0 ? Math.min(...dev.bedrooms) : 2,
      max: dev.bedrooms.length > 0 ? Math.max(...dev.bedrooms) : 4,
    },
    bathroomRange: {
      min: dev.bathrooms.length > 0 ? Math.min(...dev.bathrooms) : 1,
      max: dev.bathrooms.length > 0 ? Math.max(...dev.bathrooms) : 3,
    },
    builtSizeRange: dev.builtAreas.length > 0 ? {
      min: Math.min(...dev.builtAreas),
      max: Math.max(...dev.builtAreas),
    } : undefined,
    plotSizeRange: dev.plotAreas.length > 0 ? {
      min: Math.min(...dev.plotAreas),
      max: Math.max(...dev.plotAreas),
    } : undefined,
    propertyTypes: [...new Set(dev.propertyTypes)],
    deliveryDate: dev.deliveryDate,
    hasPool: dev.hasPool,
    images: [...new Set(dev.images)].slice(0, 10),
    representativeRef: dev.propertyRefs[0],
  })).filter(d => d.priceFrom > 0) // Only include developments with price data
    .sort((a, b) => b.propertyCount - a.propertyCount);
}

// Generate development/project content - uses the development page template format
async function generateDevelopmentContent(dev: ReturnType<typeof aggregateDevelopmentData>[0]): Promise<any> {
  const prompt = generateDevelopmentPrompt({
    name: dev.name,
    slug: dev.slug,
    developer: dev.developer,
    developerSlug: dev.developerSlug,
    town: dev.town,
    province: dev.province,
    zone: dev.zone,
    propertyCount: dev.propertyCount,
    priceFrom: dev.priceFrom,
    propertyTypes: dev.propertyTypes,
    bedroomRange: dev.bedroomRange,
    bathroomRange: dev.bathroomRange,
    builtSizeRange: dev.builtSizeRange,
    plotSizeRange: dev.plotSizeRange,
    deliveryDate: dev.deliveryDate,
    hasPool: dev.hasPool,
    images: dev.images,
    representativeRef: dev.representativeRef,
  });

  const response = await anthropic.messages.create({
    model: AI_MODEL,
    max_tokens: 4000, // Developments need more content
    system: JSON_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const content = parseAIJson(text);

  // Add images from feed data
  if (dev.images.length > 0 && content.property) {
    content.property.images = dev.images;
  }

  return content;
}

// Check if content already exists
function contentExists(dir: string, slug: string): boolean {
  return fs.existsSync(path.join(dir, `${slug}.json`));
}

// Save content to file
function saveContent(dir: string, slug: string, content: any) {
  fs.writeFileSync(
    path.join(dir, `${slug}.json`),
    JSON.stringify(content, null, 2)
  );
}

// Main execution
async function main() {
  console.log('\n🚀 Multi-Feed AI Content Generator');
  console.log('===================================\n');
  console.log(`Mode: ${REGENERATE_ALL ? 'Regenerate ALL' : 'New content only'}\n`);

  const allProperties: Property[] = [];

  // Fetch all enabled feeds
  for (const [name, config] of Object.entries(FEEDS)) {
    if (!config.enabled) continue;
    
    console.log(`📡 Fetching ${name} feed...`);
    try {
      const xml = await fetchFeed(config.url);
      let properties: Property[];
      if (name === 'miralbo') {
        properties = parseMiralboFeed(xml);
      } else if (name === 'redsp') {
        properties = parseRedspFeed(xml);
      } else {
        properties = parseBackgroundFeed(xml);
      }
      console.log(`   Found ${properties.length} properties\n`);
      allProperties.push(...properties);
    } catch (error) {
      console.error(`   ❌ Error fetching ${name}:`, error);
    }
  }

  console.log(`📊 Total properties: ${allProperties.length}\n`);

  // Get unique areas
  const areas = [...new Set(allProperties.map(p => p.town).filter(Boolean))];
  console.log(`🗺️  Unique areas: ${areas.length}`);
  console.log(`   ${areas.join(', ')}\n`);

  let generated = 0;
  let skipped = 0;

  // Generate area guides
  if (TYPE_FILTER === 'all' || TYPE_FILTER === 'areas') {
    console.log('\n📝 Generating Area Guides...\n');

    // Apply town filter to areas
    let areasToGenerate = areas;
    if (TOWN_FILTER) {
      areasToGenerate = areas.filter(a => a.toLowerCase().includes(TOWN_FILTER));
      console.log(`   Filtered to ${areasToGenerate.length} areas matching "${TOWN_FILTER}"\n`);
    }

    for (const area of areasToGenerate) {
      const slug = slugify(area);

      if (!REGENERATE_ALL && contentExists(AREAS_DIR, slug)) {
        console.log(`   ⏭️  Skipping ${area} (exists)`);
        skipped++;
        continue;
      }

      try {
        console.log(`   🔄 Generating ${area}...`);
        const areaProperties = allProperties.filter(p => p.town === area);
        const content = await withRetry(
          () => generateAreaContent(area, areaProperties),
          area
        );
        content.slug = slug;
        content.town = area;
        content.propertyCount = areaProperties.length;
        content.generatedAt = new Date().toISOString();
        saveContent(AREAS_DIR, slug, content);
        console.log(`   ✅ ${area} saved`);
        generated++;

        // Rate limiting - wait 1 second between API calls
        await new Promise(r => setTimeout(r, 1000));
      } catch (error: any) {
        console.error(`   ❌ Error generating ${area} (after ${MAX_RETRIES} attempts): ${error.message}`);
      }
    }
  }

  // Generate developer/builder content from property mapping
  if (TYPE_FILTER === 'all' || TYPE_FILTER === 'developers') {
    console.log('\n🏗️  Generating Developer Content...\n');
    const developers = aggregateDeveloperData();
    console.log(`   Found ${developers.length} developers in mapping\n`);

    // Apply town filter to developers (skip if town filter is set - developers are town-agnostic)
    if (TOWN_FILTER) {
      console.log(`   ⏭️  Skipping developer generation (town filter "${TOWN_FILTER}" is set)\n`);
    }

    const developersToGenerate = TOWN_FILTER ? [] : developers;

    for (const dev of developersToGenerate) {
      if (!REGENERATE_ALL && contentExists(BUILDERS_DIR, dev.slug)) {
        console.log(`   ⏭️  Skipping ${dev.name} (exists)`);
        skipped++;
        continue;
      }

      try {
        console.log(`   🔄 Generating ${dev.name} (${dev.propertyCount} properties)...`);
        const content = await withRetry(
          () => generateDeveloperContent(dev),
          dev.name
        );
        content.generatedAt = new Date().toISOString();
        saveContent(BUILDERS_DIR, dev.slug, content);
        console.log(`   ✅ ${dev.name} saved`);
        generated++;

        // Rate limiting
        await new Promise(r => setTimeout(r, 1000));
      } catch (error) {
        console.error(`   ❌ Error generating ${dev.name} (after ${MAX_RETRIES} attempts): ${(error as any).message}`);
      }
    }
  }

  // Generate development/project content from property mapping
  if (TYPE_FILTER === 'all' || TYPE_FILTER === 'developments') {
    console.log('\n🏘️  Generating Development/Project Content...\n');
    const developmentsList = aggregateDevelopmentData(allProperties);
    console.log(`   Found ${developmentsList.length} developments in mapping\n`);

    // Filter by town if specified
    let developmentsToGenerate = developmentsList;
    if (TOWN_FILTER) {
      developmentsToGenerate = developmentsList.filter(d =>
        d.town.toLowerCase().includes(TOWN_FILTER)
      );
      console.log(`   Filtered to ${developmentsToGenerate.length} developments in "${TOWN_FILTER}"\n`);
    }

    for (const dev of developmentsToGenerate) {
      // Note: Developments go to PROJECTS_DIR (not DEVELOPMENTS_DIR which is for property-level content)
      if (!REGENERATE_ALL && contentExists(PROJECTS_DIR, dev.slug)) {
        console.log(`   ⏭️  Skipping ${dev.name} (exists)`);
        skipped++;
        continue;
      }

      try {
        console.log(`   🔄 Generating ${dev.name} by ${dev.developer} (${dev.propertyCount} units, ${dev.town})...`);
        const content = await withRetry(
          () => generateDevelopmentContent(dev),
          dev.name
        );
        content.generatedAt = new Date().toISOString();
        saveContent(PROJECTS_DIR, dev.slug, content);
        console.log(`   ✅ ${dev.name} saved`);
        generated++;

        // Rate limiting
        await new Promise(r => setTimeout(r, 1000));
      } catch (error) {
        console.error(`   ❌ Error generating ${dev.name} (after ${MAX_RETRIES} attempts): ${(error as any).message}`);
      }
    }
  }

  // Generate property content - organized by town
  if (TYPE_FILTER === 'all' || TYPE_FILTER === 'properties') {
    console.log('\n📝 Generating Property Content...\n');

    // Group properties by town
    const byTown: Record<string, Property[]> = {};
    for (const p of allProperties) {
      const town = (p.town || 'Unknown').toLowerCase();
      if (!byTown[town]) byTown[town] = [];
      byTown[town].push(p);
    }

    // Show town statistics
    console.log('   Properties by town:');
    const sortedTowns = Object.entries(byTown).sort((a, b) => b[1].length - a[1].length);
    sortedTowns.slice(0, 20).forEach(([town, props]) => {
      const marker = TOWN_FILTER && town.includes(TOWN_FILTER) ? ' 👈 SELECTED' : '';
      console.log(`   ${props.length.toString().padStart(4)} - ${town}${marker}`);
    });
    if (sortedTowns.length > 20) console.log(`   ... and ${sortedTowns.length - 20} more towns`);
    console.log('');

    // If --list-towns, stop here
    if (LIST_TOWNS) {
      console.log('   (--list-towns mode, not generating)');
      return;
    }

    // Filter by town if specified
    let propertiesToGenerate = allProperties;
    if (TOWN_FILTER) {
      propertiesToGenerate = allProperties.filter(p =>
        (p.town || '').toLowerCase().includes(TOWN_FILTER)
      );
      console.log(`   Filtered to ${propertiesToGenerate.length} properties in "${TOWN_FILTER}"\n`);
    }

    // Apply limit if specified
    if (LIMIT > 0) {
      propertiesToGenerate = propertiesToGenerate.slice(0, LIMIT);
      console.log(`   Limited to ${LIMIT} properties\n`);
    }

    console.log(`   Generating content for ${propertiesToGenerate.length} properties...\n`);

    for (const property of propertiesToGenerate) {
      const slug = slugify(property.reference);

      if (!REGENERATE_ALL && contentExists(DEVELOPMENTS_DIR, slug)) {
        console.log(`   ⏭️  Skipping ${property.reference} (exists)`);
        skipped++;
        continue;
      }

      try {
        console.log(`   🔄 Generating ${property.reference} (${property.town})...`);
        const content = await withRetry(
          () => generatePropertyContent(property),
          property.reference
        );
        content.reference = property.reference;
        content.slug = slug;
        content.source = property.source;
        content.town = property.town;
        content.generatedAt = new Date().toISOString();
        saveContent(DEVELOPMENTS_DIR, slug, content);
        console.log(`   ✅ ${property.reference} saved`);
        generated++;

        await new Promise(r => setTimeout(r, 1000));
      } catch (error: any) {
        console.error(`   ❌ Error generating ${property.reference} (after ${MAX_RETRIES} attempts): ${error.message}`);
      }
    }
  } // end if TYPE_FILTER properties

  console.log('\n===================================');
  console.log(`✅ Generated: ${generated}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log('===================================\n');
}

main().catch(console.error);
