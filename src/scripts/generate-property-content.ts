/**
 * AI Content Generation Engine for New Build Homes Costa Blanca
 * 
 * This script generates SEO-optimized content for properties:
 * - Unique H1 titles
 * - Rich descriptions
 * - Location/area sections
 * - Investment potential
 * - Property-specific FAQs
 * - Image alt texts
 * 
 * Usage:
 *   npx ts-node src/scripts/generate-property-content.ts [--area=torrevieja] [--limit=50]
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Types
interface PropertyData {
  reference: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  builtArea?: number;
  plotArea?: number;
  price?: number;
  town: string;
  locationDetail?: string;
  region: string;
  descriptions?: { en?: string };
  features?: string[];
  hasPool?: boolean;
  hasTerrace?: boolean;
  hasGarden?: boolean;
  hasSeaview?: boolean;
  hasParking?: boolean;
  images?: Array<{ url: string }>;
  latitude?: number;
  longitude?: number;
}

interface GeneratedContent {
  reference: string;
  generatedAt: string;
  
  // SEO Meta
  metaTitle: string;
  metaDescription: string;
  
  // H1 Title
  h1Title: string;
  
  // Main content sections
  heroIntro: string;
  propertyDescription: string;
  locationSection: {
    title: string;
    content: string;
    highlights: string[];
  };
  featuresSection: {
    intro: string;
    highlights: string[];
  };
  investmentSection?: string;
  lifestyleSection?: string;
  
  // FAQs (8 property-specific questions)
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  
  // Image alt texts
  imageAlts: string[];
  
  // Why buy reasons
  whyBuyReasons: string[];
}

// Priority areas (from footer)
const PRIORITY_AREAS = [
  // Costa Blanca South
  'Torrevieja', 'Orihuela Costa', 'Villamartin', 'Los Dolses', 
  'Guardamar del Segura', 'Algorfa', 'San Miguel de Salinas',
  'Ciudad Quesada', 'Rojales', 'Pilar de la Horadada',
  // Costa Blanca North
  'Javea', 'Jávea', 'Moraira', 'Calpe', 'Altea', 'Denia', 
  'Benidorm', 'Finestrat', 'Benitachell', 'Albir',
];

// Golf locations for detection
const GOLF_LOCATIONS = [
  'la finca', 'algorfa', 'villamartin', 'villamartín', 'campoamor',
  'las colinas', 'vistabella', 'la marquesa', 'las ramblas', 'lo romero',
  'la torre golf', 'mar menor', 'hacienda del alamo', 'el valle',
  'roda golf', 'la manga', 'don cayo', 'ifach golf', 'javea golf',
  'oliva nova', 'el plantio', 'alenda', 'bonalba', 'villaitana',
  'los dolses', 'playa flamenca', 'punta prima', 'orihuela costa',
];

function isGolfProperty(property: PropertyData): boolean {
  const searchText = [
    property.town,
    property.locationDetail,
    property.descriptions?.en,
    ...(property.features || [])
  ].filter(Boolean).join(' ').toLowerCase();
  
  if (searchText.includes('golf')) return true;
  return GOLF_LOCATIONS.some(loc => searchText.includes(loc));
}

function getRegion(town: string): 'Costa Blanca South' | 'Costa Blanca North' {
  const southTowns = [
    'torrevieja', 'orihuela', 'villamartin', 'los dolses', 'guardamar',
    'algorfa', 'san miguel', 'quesada', 'rojales', 'pilar', 'campoamor',
    'la zenia', 'playa flamenca', 'punta prima', 'cabo roig', 'la finca',
    'las colinas', 'benijofar', 'catral', 'dolores', 'almoradi', 'pinoso'
  ];
  
  return southTowns.some(t => town.toLowerCase().includes(t)) 
    ? 'Costa Blanca South' 
    : 'Costa Blanca North';
}

async function generateContentForProperty(property: PropertyData): Promise<GeneratedContent> {
  const isGolf = isGolfProperty(property);
  const region = property.region || getRegion(property.town);
  const priceDisplay = property.price ? `€${property.price.toLocaleString()}` : 'Price on request';
  
  const prompt = `You are an expert real estate SEO copywriter specializing in Spanish Costa Blanca properties. Generate comprehensive, unique, SEO-optimized content for this property listing.

PROPERTY DATA:
- Reference: ${property.reference}
- Type: ${property.propertyType}
- Bedrooms: ${property.bedrooms}
- Bathrooms: ${property.bathrooms}
- Built Area: ${property.builtArea || 'Not specified'}m²
- Plot Area: ${property.plotArea || 'Not specified'}m²
- Price: ${priceDisplay}
- Location: ${property.locationDetail ? `${property.locationDetail}, ` : ''}${property.town}
- Region: ${region}
- Features: ${property.features?.join(', ') || 'Standard features'}
- Has Pool: ${property.hasPool ? 'Yes' : 'No'}
- Has Sea View: ${property.hasSeaview ? 'Yes' : 'No'}
- Has Terrace: ${property.hasTerrace ? 'Yes' : 'No'}
- Has Garden: ${property.hasGarden ? 'Yes' : 'No'}
- Golf Property: ${isGolf ? 'Yes - near golf courses' : 'No'}
- Original Description: ${property.descriptions?.en || 'No description available'}
- Number of images: ${property.images?.length || 0}

REQUIREMENTS:
1. Write unique, engaging content - NOT generic templates
2. Include local knowledge about ${property.town} and ${region}
3. Target keywords: "${property.bedrooms} bedroom ${property.propertyType.toLowerCase()} ${property.town}", "new build ${property.town}", "property for sale ${property.town}"
4. Write for international buyers (British, Scandinavian, Dutch, German)
5. Mention specific nearby amenities, beaches, golf courses where relevant
6. Focus on lifestyle benefits, not just features
7. Include investment potential if applicable (rental yield, capital growth)

Generate the following JSON (respond ONLY with valid JSON, no markdown):
{
  "metaTitle": "SEO title under 60 chars including location and property type",
  "metaDescription": "Compelling meta description 150-160 chars with call-to-action",
  "h1Title": "Unique, keyword-rich H1 title - NOT starting with 'Stunning' or 'Beautiful'",
  "heroIntro": "2-3 engaging sentences introducing the property and its key appeal (150-200 words)",
  "propertyDescription": "Detailed property description highlighting features, layout, quality (250-350 words)",
  "locationSection": {
    "title": "Creative section title about the location",
    "content": "Comprehensive description of ${property.town} - lifestyle, amenities, expat community, climate, transport links (200-300 words)",
    "highlights": ["6 specific nearby attractions/amenities with distances where possible"]
  },
  "featuresSection": {
    "intro": "Brief intro to property features and quality (2-3 sentences)",
    "highlights": ["8-10 key property features written as benefit statements"]
  },
  "investmentSection": "Investment potential analysis - rental yields, market trends, buyer demand (150-200 words) - only if property suits investment",
  "lifestyleSection": "Description of daily life owning this property - morning coffee on terrace, local markets, beach days (150-200 words)",
  "faqs": [
    {"question": "Specific question about this property or location", "answer": "Detailed, helpful answer (2-4 sentences)"}
  ],
  "imageAlts": ["Search-query style alt tags - write what buyers type into Google, e.g. '3 bedroom villa with pool ${property.town} Spain', 'Modern kitchen new build ${property.town} Costa Blanca', 'Sea view apartment ${property.town} Spain €250k'. Each alt MUST include the town name and 'Spain' or 'Costa Blanca'. NO generic labels like 'exterior view' or 'interior shot'."],
  "whyBuyReasons": ["8 compelling reasons to buy THIS specific property"]
}

FAQs should include questions about:
1. Price/costs for this specific property
2. Location-specific question about ${property.town}
3. Property features question
4. Buying process question
5. Financing/mortgage question
6. Rental potential question (if applicable)
7. Viewing/visiting question
8. Timeline/availability question

Make content UNIQUE - imagine you're writing for a high-end property magazine, not a template.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  });

  // Extract text content
  const textContent = response.content.find(block => block.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in response');
  }

  // Parse JSON response
  let generatedData;
  try {
    // Clean up response - remove any markdown code blocks if present
    let jsonText = textContent.text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.slice(7);
    }
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.slice(3);
    }
    if (jsonText.endsWith('```')) {
      jsonText = jsonText.slice(0, -3);
    }
    generatedData = JSON.parse(jsonText.trim());
  } catch (e) {
    console.error('Failed to parse JSON response:', textContent.text);
    throw new Error('Invalid JSON response from AI');
  }

  return {
    reference: property.reference,
    generatedAt: new Date().toISOString(),
    ...generatedData
  };
}

async function loadPropertiesFromFeed(): Promise<PropertyData[]> {
  // Import the feed service
  const feedServicePath = path.join(process.cwd(), 'src/lib/unified-feed-service');
  
  try {
    const { fetchAllProperties } = await import(feedServicePath);
    const properties = await fetchAllProperties();
    return properties;
  } catch (e) {
    console.error('Failed to load from feed service, trying direct fetch...');
    
    // Fallback: direct fetch from Background Properties
    const response = await fetch(
      'https://backgroundproperties.com/wp-load.php?security_token=23f0185aeb5102e7&export_id=19&action=get_data'
    );
    const data = await response.json();
    
    // Map to our format
    return data.map((p: any) => ({
      reference: p.reference || p.id,
      propertyType: p.type || 'Property',
      bedrooms: parseInt(p.bedrooms) || 0,
      bathrooms: parseInt(p.bathrooms) || 0,
      builtArea: parseInt(p.built_area) || undefined,
      plotArea: parseInt(p.plot_area) || undefined,
      price: parseInt(p.price) || undefined,
      town: p.town || p.location || 'Costa Blanca',
      locationDetail: p.location_detail,
      region: p.region || 'Costa Blanca',
      descriptions: { en: p.description },
      features: p.features || [],
      hasPool: p.pool === 'yes' || p.pool === true,
      hasTerrace: p.terrace === 'yes' || p.terrace === true,
      hasGarden: p.garden === 'yes' || p.garden === true,
      hasSeaview: p.sea_view === 'yes' || p.sea_view === true,
      hasParking: p.parking === 'yes' || p.parking === true,
      images: p.images || [],
    }));
  }
}

function getContentPath(reference: string): string {
  return path.join(process.cwd(), 'src/content/properties', `${reference}.json`);
}

function contentExists(reference: string): boolean {
  return fs.existsSync(getContentPath(reference));
}

function saveContent(content: GeneratedContent): void {
  const dir = path.join(process.cwd(), 'src/content/properties');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const filePath = getContentPath(content.reference);
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  console.log(`✅ Saved: ${content.reference}`);
}

async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  let filterArea: string | null = null;
  let limit = 50;
  let skipExisting = true;
  
  for (const arg of args) {
    if (arg.startsWith('--area=')) {
      filterArea = arg.split('=')[1];
    } else if (arg.startsWith('--limit=')) {
      limit = parseInt(arg.split('=')[1]);
    } else if (arg === '--regenerate') {
      skipExisting = false;
    }
  }
  
  console.log('🚀 AI Content Generation Engine Starting...\n');
  console.log(`Settings: area=${filterArea || 'all priority areas'}, limit=${limit}, skipExisting=${skipExisting}\n`);
  
  // Load properties
  console.log('📥 Loading properties from feed...');
  const allProperties = await loadPropertiesFromFeed();
  console.log(`   Found ${allProperties.length} total properties\n`);
  
  // Filter properties
  let propertiesToProcess = allProperties;
  
  // Filter by area if specified
  if (filterArea) {
    propertiesToProcess = propertiesToProcess.filter(p => 
      p.town.toLowerCase().includes(filterArea!.toLowerCase())
    );
  } else {
    // Filter to priority areas only
    propertiesToProcess = propertiesToProcess.filter(p =>
      PRIORITY_AREAS.some(area => 
        p.town.toLowerCase().includes(area.toLowerCase()) ||
        area.toLowerCase().includes(p.town.toLowerCase())
      )
    );
  }
  
  console.log(`📍 Filtered to ${propertiesToProcess.length} properties in target areas\n`);
  
  // Skip existing if requested
  if (skipExisting) {
    propertiesToProcess = propertiesToProcess.filter(p => !contentExists(p.reference));
    console.log(`📋 ${propertiesToProcess.length} properties need content generation\n`);
  }
  
  // Apply limit
  propertiesToProcess = propertiesToProcess.slice(0, limit);
  console.log(`🎯 Processing ${propertiesToProcess.length} properties\n`);
  
  if (propertiesToProcess.length === 0) {
    console.log('✨ No properties to process. All done!');
    return;
  }
  
  // Process each property
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < propertiesToProcess.length; i++) {
    const property = propertiesToProcess[i];
    const progress = `[${i + 1}/${propertiesToProcess.length}]`;
    
    console.log(`${progress} Generating content for ${property.reference} (${property.town})...`);
    
    try {
      const content = await generateContentForProperty(property);
      saveContent(content);
      successCount++;
      
      // Rate limiting - wait 1 second between requests
      if (i < propertiesToProcess.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`❌ Error processing ${property.reference}:`, error);
      errorCount++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 GENERATION COMPLETE');
  console.log('='.repeat(50));
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📁 Content saved to: src/content/properties/`);
}

// Run if executed directly
main().catch(console.error);
