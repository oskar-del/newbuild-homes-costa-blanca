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

const anthropic = new Anthropic();
const REGENERATE_ALL = process.env.REGENERATE_ALL === 'true';

// Parse command line arguments
const args = process.argv.slice(2);
const TOWN_FILTER = args.find(a => a.startsWith('--town='))?.split('=')[1]?.toLowerCase() || '';
const TYPE_FILTER = args.find(a => a.startsWith('--type='))?.split('=')[1] || 'all'; // all, developers, areas, properties
const LIMIT = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '0') || 0; // 0 = no limit
const LIST_TOWNS = args.includes('--list-towns');

// Usage help
if (args.includes('--help')) {
  console.log(`
Usage: npx tsx generate-all-content.ts [options]

Options:
  --town=NAME      Filter properties by town (e.g., --town=torrevieja)
  --type=TYPE      What to generate: all, developers, areas, properties
  --limit=N        Limit number of items to generate (0 = no limit)
  --list-towns     Just list towns and property counts, don't generate
  --help           Show this help

Examples:
  npx tsx generate-all-content.ts --town=torrevieja
  npx tsx generate-all-content.ts --type=developers
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
const DEVELOPMENTS_DIR = path.join(CONTENT_DIR, 'developments');
const AREAS_DIR = path.join(CONTENT_DIR, 'areas');
const BUILDERS_DIR = path.join(CONTENT_DIR, 'builders');

// Ensure directories exist
[CONTENT_DIR, DEVELOPMENTS_DIR, AREAS_DIR, BUILDERS_DIR].forEach(dir => {
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

// Generate property content using Claude
async function generatePropertyContent(property: Property): Promise<any> {
  const prompt = `Generate SEO-optimized content for this Costa Blanca property listing.

Property Details:
- Reference: ${property.reference}
- Type: ${property.type}
- Location: ${property.zone ? property.zone + ', ' : ''}${property.town}, ${property.province}
- Bedrooms: ${property.bedrooms}
- Bathrooms: ${property.bathrooms}
- Built Area: ${property.builtArea}m²
- Plot Area: ${property.plotArea}m²
- Pool: ${property.pool ? 'Yes' : 'No'}
- Views: ${property.views || 'Not specified'}
- Original Description: ${property.description.substring(0, 500)}

Generate a JSON response with:
{
  "metaTitle": "SEO title under 60 chars, include location and key feature",
  "metaDescription": "Compelling description under 155 chars",
  "heroIntro": "2-3 paragraph engaging introduction (300-400 words) about this specific property and its location",
  "locationSection": {
    "intro": "1-2 paragraphs about living in this area",
    "highlights": ["5-6 specific nearby attractions/amenities with distances"]
  },
  "propertyFeatures": {
    "intro": "Brief intro to the property's standout features",
    "features": ["8-10 key features based on the specs"]
  },
  "investmentSection": "1-2 paragraphs about rental/investment potential in this area",
  "whyBuySection": ["5-6 compelling reasons to buy this property"],
  "faqs": [
    {"question": "Relevant FAQ about this property/area", "answer": "Helpful answer"},
    // 5-6 total FAQs
  ]
}

Write naturally, avoiding clichés. Focus on specific details about ${property.town}. Make it genuinely helpful for buyers.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in response');
  
  return JSON.parse(jsonMatch[0]);
}

// Generate area guide content
async function generateAreaContent(town: string, properties: Property[]): Promise<any> {
  const propertyTypes = [...new Set(properties.map(p => p.type))].join(', ');
  const priceRange = properties.filter(p => p.price > 0);
  const minPrice = priceRange.length ? Math.min(...priceRange.map(p => p.price)) : 0;
  const maxPrice = priceRange.length ? Math.max(...priceRange.map(p => p.price)) : 0;
  
  const prompt = `Generate a comprehensive SEO area guide for ${town}, Costa Blanca, Spain.

Current market data:
- ${properties.length} new build properties available
- Property types: ${propertyTypes}
- Price range: €${minPrice.toLocaleString()} - €${maxPrice.toLocaleString()}

Generate a JSON response with:
{
  "metaTitle": "Living in ${town}: Complete Guide to Costa Blanca | under 60 chars",
  "metaDescription": "Compelling description under 155 chars about living/buying in ${town}",
  "heroIntro": "2-3 paragraph engaging introduction (250-300 words) about ${town}",
  "climate": "Paragraph about the climate and weather",
  "lifestyle": "2 paragraphs about daily life, expat community, atmosphere",
  "amenities": {
    "healthcare": "Healthcare facilities info",
    "shopping": "Shopping options",
    "dining": "Restaurant and food scene",
    "sports": "Sports and recreation including golf, beaches"
  },
  "transport": {
    "airports": "Nearest airports with distances",
    "driving": "Road access and connections",
    "public": "Public transport options"
  },
  "propertyMarket": {
    "overview": "Current market conditions",
    "priceRange": "€${minPrice.toLocaleString()} - €${maxPrice.toLocaleString()}",
    "popularTypes": "${propertyTypes}",
    "investment": "Investment and rental potential"
  },
  "neighborhoods": ["3-4 popular neighborhoods/urbanizations in ${town}"],
  "prosAndCons": {
    "pros": ["5 advantages of living in ${town}"],
    "cons": ["2-3 honest considerations/challenges"]
  },
  "faqs": [
    {"question": "FAQ about living in ${town}", "answer": "Helpful answer"},
    // 6-8 total FAQs
  ]
}

Be specific to ${town}. Include real place names, distances, and practical information buyers need.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 3000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in response');
  
  return JSON.parse(jsonMatch[0]);
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

// Generate developer/builder content
async function generateDeveloperContent(dev: {
  name: string;
  slug: string;
  developmentCount: number;
  developments: string[];
  zones: string[];
  propertyCount: number;
  isGolfSpecialist: boolean;
}): Promise<any> {
  const golfNote = dev.isGolfSpecialist ? 'This is a GOLF SPECIALIST developer.' : '';

  const prompt = `Generate SEO content for a property developer page. We are a real estate agency showcasing properties by this developer.

Developer: ${dev.name}
Properties Available: ${dev.propertyCount}
Developments: ${dev.developments.join(', ')}
Zones/Areas: ${dev.zones.join(', ')}
${golfNote}

Generate JSON matching this EXACT structure (use Contrimar template style):
{
  "name": "${dev.name}",
  "slug": "${dev.slug}",
  "metaTitle": "${dev.name} | New Build Homes Costa Blanca - under 60 chars",
  "metaDescription": "Compelling description under 155 chars about ${dev.name} properties",
  "heroHeadline": "${dev.name} - [Specialty/Location] tagline",
  "heroIntro": "2 paragraphs (150-200 words) introducing ${dev.name} and their developments. Mention property count and areas.",
  "aboutSection": {
    "title": "About ${dev.name}",
    "content": "2 paragraphs about the developer's focus areas and what makes them notable"
  },
  "specializationSection": {
    "title": "Development Focus or similar",
    "regions": ["Costa Blanca South", "etc based on zones"],
    "towns": ["extract from zones"],
    "propertyTypes": ["Villas", "Apartments", "Townhouses"],
    "content": "1-2 paragraphs about their specialization"
  },
  "qualitySection": {
    "title": "Quality & Specifications",
    "features": ["6-8 typical quality features"],
    "content": "Paragraph about build quality"
  },
  "whyChooseSection": {
    "title": "Why Choose ${dev.name}",
    "reasons": [
      {"title": "Short title", "description": "One sentence explanation"},
      // 3 total reasons
    ]
  },
  "faqs": [
    {"question": "Where are ${dev.name} properties located?", "answer": "Based on the zones/developments"},
    {"question": "Another relevant FAQ", "answer": "Helpful answer"},
    {"question": "Third FAQ", "answer": "Answer"}
  ],
  "conclusion": "Short closing paragraph encouraging buyers to browse listings",
  "stats": {
    "propertyCount": ${dev.propertyCount},
    "developmentCount": ${dev.developmentCount},
    "regions": ["list regions"]
  }
}

Important: We are an AGENCY showcasing their properties, not the developer themselves. Write naturally, no clichés.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 2500,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in response');

  return JSON.parse(jsonMatch[0]);
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
    for (const area of areas) {
      const slug = slugify(area);

      if (!REGENERATE_ALL && contentExists(AREAS_DIR, slug)) {
        console.log(`   ⏭️  Skipping ${area} (exists)`);
        skipped++;
        continue;
      }

      try {
        console.log(`   🔄 Generating ${area}...`);
        const areaProperties = allProperties.filter(p => p.town === area);
        const content = await generateAreaContent(area, areaProperties);
        content.slug = slug;
        content.town = area;
        content.propertyCount = areaProperties.length;
        content.generatedAt = new Date().toISOString();
        saveContent(AREAS_DIR, slug, content);
        console.log(`   ✅ ${area} saved`);
        generated++;

        // Rate limiting - wait 1 second between API calls
        await new Promise(r => setTimeout(r, 1000));
      } catch (error) {
        console.error(`   ❌ Error generating ${area}:`, error);
      }
    }
  }

  // Generate developer/builder content from property mapping
  if (TYPE_FILTER === 'all' || TYPE_FILTER === 'developers') {
    console.log('\n🏗️  Generating Developer Content...\n');
    const developers = aggregateDeveloperData();
    console.log(`   Found ${developers.length} developers in mapping\n`);

    for (const dev of developers) {
      if (!REGENERATE_ALL && contentExists(BUILDERS_DIR, dev.slug)) {
        console.log(`   ⏭️  Skipping ${dev.name} (exists)`);
        skipped++;
        continue;
      }

      try {
        console.log(`   🔄 Generating ${dev.name} (${dev.propertyCount} properties)...`);
        const content = await generateDeveloperContent(dev);
        content.generatedAt = new Date().toISOString();
        saveContent(BUILDERS_DIR, dev.slug, content);
        console.log(`   ✅ ${dev.name} saved`);
        generated++;

        // Rate limiting
        await new Promise(r => setTimeout(r, 1000));
      } catch (error) {
        console.error(`   ❌ Error generating ${dev.name}:`, error);
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
        const content = await generatePropertyContent(property);
        content.reference = property.reference;
        content.slug = slug;
        content.source = property.source;
        content.town = property.town;
        content.generatedAt = new Date().toISOString();
        saveContent(DEVELOPMENTS_DIR, slug, content);
        console.log(`   ✅ ${property.reference} saved`);
        generated++;

        await new Promise(r => setTimeout(r, 1000));
      } catch (error) {
        console.error(`   ❌ Error generating ${property.reference}:`, error);
      }
    }
  } // end if TYPE_FILTER properties

  console.log('\n===================================');
  console.log(`✅ Generated: ${generated}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log('===================================\n');
}

main().catch(console.error);
