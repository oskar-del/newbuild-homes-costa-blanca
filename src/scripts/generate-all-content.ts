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

const anthropic = new Anthropic();
const REGENERATE_ALL = process.env.REGENERATE_ALL === 'true';

// Feed configurations
const FEEDS = {
  miralbo: {
    url: 'https://mifrfrede.mfrpro.com/inmuebles/xml/56b76456fab7c',
    enabled: true,
  },
  backgroundProperties: {
    url: 'https://backgroundproperties.com/wp-load.php?security_token=23f0185aeb5102e7&export_id=19&action=get_data',
    enabled: true,
  },
  // redsp: {
  //   url: 'YOUR_REDSP_FEED_URL',
  //   enabled: false,
  // },
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
  
  return propArray
    .filter((p: any) => String(p.saleType) === '1') // New builds only
    .map((p: any) => ({
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
      const properties = name === 'miralbo' 
        ? parseMiralboFeed(xml) 
        : parseBackgroundFeed(xml);
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

  // Generate property content (only for properties without descriptions)
  console.log('\n📝 Generating Property Content...\n');
  const propertiesNeedingContent = allProperties.filter(p => 
    !p.description || p.description.length < 200
  );
  
  console.log(`   ${propertiesNeedingContent.length} properties need content\n`);

  for (const property of propertiesNeedingContent.slice(0, 50)) { // Limit to 50 per run
    const slug = slugify(property.reference);
    
    if (!REGENERATE_ALL && contentExists(DEVELOPMENTS_DIR, slug)) {
      console.log(`   ⏭️  Skipping ${property.reference} (exists)`);
      skipped++;
      continue;
    }

    try {
      console.log(`   🔄 Generating ${property.reference}...`);
      const content = await generatePropertyContent(property);
      content.reference = property.reference;
      content.slug = slug;
      content.source = property.source;
      content.generatedAt = new Date().toISOString();
      saveContent(DEVELOPMENTS_DIR, slug, content);
      console.log(`   ✅ ${property.reference} saved`);
      generated++;
      
      await new Promise(r => setTimeout(r, 1000));
    } catch (error) {
      console.error(`   ❌ Error generating ${property.reference}:`, error);
    }
  }

  console.log('\n===================================');
  console.log(`✅ Generated: ${generated}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log('===================================\n');
}

main().catch(console.error);
