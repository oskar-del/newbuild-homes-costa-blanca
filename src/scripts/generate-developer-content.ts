/**
 * Developer Content Generator
 * ============================
 * Generates SEO-optimized content for developer/builder pages
 *
 * DATA SOURCES:
 * 1. property-development-mapping.ts - Developer, development, zones, delivery dates
 * 2. REDSP Feed - Prices, property types, images
 * 3. Google Places API (optional) - Reviews, ratings
 *
 * USAGE:
 * npx tsx src/scripts/generate-developer-content.ts [developer-slug]
 * npx tsx src/scripts/generate-developer-content.ts --all
 *
 * REQUIRES:
 * - ANTHROPIC_API_KEY in .env.local
 * - Optional: GOOGLE_PLACES_API_KEY for reviews
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import { propertyMapping, PropertyDevelopmentInfo } from '../data/property-development-mapping';
import { getRegionForTown } from '../lib/feed-config';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

interface DeveloperStats {
  name: string;
  slug: string;
  propertyCount: number;
  developmentCount: number;
  developments: {
    name: string;
    slug: string;
    town: string;
    zone: string;
    deliveryDate: string;
    propertyCount: number;
    propertyRefs: string[];
  }[];
  towns: string[];
  zones: string[];
  regions: string[];
  earliestDelivery: string;
  latestDelivery: string;
  isGolfSpecialist: boolean;
  isBeachSpecialist: boolean;
  priceRange?: { min: number; max: number };
  propertyTypes?: string[];
}

interface GoogleReviewData {
  rating: number;
  reviewCount: number;
  placeId?: string;
}

interface GeneratedDeveloperContent {
  slug: string;
  name: string;
  stats: DeveloperStats;
  googleReviews?: GoogleReviewData;
  content: {
    metaTitle: string;
    metaDescription: string;
    heroHeadline: string;
    heroIntro: string;
    aboutSection: string;
    specializationSection: string;
    developmentsSection: string;
    qualitySection: {
      intro: string;
      points: string[];
    };
    whyChooseSection: string[];
    faqs: { question: string; answer: string }[];
    conclusion: string;
  };
  schema: object;
  schemaFAQ: object;
  generatedAt: string;
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

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

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function parseDeliveryDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function formatDeliveryDate(dateStr: string): string {
  const date = parseDeliveryDate(dateStr);
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

// ==========================================
// DATA AGGREGATION
// ==========================================

/**
 * Aggregate all data for a single developer from the mapping
 */
function aggregateDeveloperData(developerName: string): DeveloperStats {
  const developments = new Map<string, {
    name: string;
    town: string;
    zone: string;
    deliveryDate: string;
    propertyRefs: string[];
  }>();

  const towns = new Set<string>();
  const zones = new Set<string>();
  const regions = new Set<string>();
  let earliestDelivery = '';
  let latestDelivery = '';

  // Iterate through all mapped properties
  for (const [ref, info] of Object.entries(propertyMapping)) {
    if (info.developer.toUpperCase() !== developerName.toUpperCase()) continue;

    const devKey = info.development;

    if (!developments.has(devKey)) {
      developments.set(devKey, {
        name: info.development,
        town: '', // Will be extracted from comments or zone
        zone: info.zone || '',
        deliveryDate: info.deliveryDate,
        propertyRefs: [],
      });
    }

    developments.get(devKey)!.propertyRefs.push(ref);

    if (info.zone) {
      zones.add(info.zone);
      // Try to extract town from zone or use zone as town
      const townFromZone = extractTownFromZone(info.zone);
      if (townFromZone) towns.add(townFromZone);
    }

    // Track delivery dates
    if (info.deliveryDate) {
      if (!earliestDelivery || parseDeliveryDate(info.deliveryDate) < parseDeliveryDate(earliestDelivery)) {
        earliestDelivery = info.deliveryDate;
      }
      if (!latestDelivery || parseDeliveryDate(info.deliveryDate) > parseDeliveryDate(latestDelivery)) {
        latestDelivery = info.deliveryDate;
      }
    }
  }

  // Determine regions from towns
  towns.forEach(town => {
    const region = getRegionForTown(town);
    if (region) regions.add(region);
  });

  // Detect specializations
  const allZones = Array.from(zones).join(' ').toLowerCase();
  const isGolfSpecialist = allZones.includes('golf') || allZones.includes('finca') || allZones.includes('vistabella');
  const isBeachSpecialist = allZones.includes('beach') || allZones.includes('playa') || allZones.includes('mar');

  const developmentsList = Array.from(developments.values()).map(dev => ({
    ...dev,
    slug: slugify(dev.name),
    propertyCount: dev.propertyRefs.length,
  }));

  return {
    name: developerName,
    slug: slugify(developerName),
    propertyCount: developmentsList.reduce((sum, d) => sum + d.propertyCount, 0),
    developmentCount: developmentsList.length,
    developments: developmentsList,
    towns: Array.from(towns),
    zones: Array.from(zones),
    regions: Array.from(regions),
    earliestDelivery,
    latestDelivery,
    isGolfSpecialist,
    isBeachSpecialist,
  };
}

/**
 * Extract town name from zone (e.g., "La Finca Golf" -> "Algorfa")
 */
function extractTownFromZone(zone: string): string | null {
  const zoneTownMap: Record<string, string> = {
    'la finca': 'Algorfa',
    'la finca golf': 'Algorfa',
    'vistabella': 'Orihuela Costa',
    'el raso': 'Guardamar del Segura',
    'lo serena golf': 'Los Alcázares',
    'mar de plata': 'Puerto de Mazarrón',
    'campoamor': 'Orihuela Costa',
    'villamartin': 'Orihuela Costa',
    'playa flamenca': 'Orihuela Costa',
    'punta prima': 'Orihuela Costa',
    'la zenia': 'Orihuela Costa',
    'los balcones': 'Torrevieja',
    'aguas nuevas': 'Torrevieja',
    'muchavista': 'El Campello',
    'golden valley': 'Benitachell',
    'cumbre del sol': 'Benitachell',
    'doña pepa': 'Rojales',
    'ciudad quesada': 'Rojales',
  };

  const zoneLower = zone.toLowerCase();
  for (const [key, town] of Object.entries(zoneTownMap)) {
    if (zoneLower.includes(key)) return town;
  }
  return null;
}

/**
 * Get all unique developers from the mapping
 */
function getAllDevelopers(): string[] {
  const developers = new Set<string>();
  for (const info of Object.values(propertyMapping)) {
    developers.add(info.developer);
  }
  return Array.from(developers).sort();
}

// ==========================================
// GOOGLE REVIEWS (Optional)
// ==========================================

async function fetchGoogleReviews(developerName: string): Promise<GoogleReviewData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.log(`[GOOGLE] No API key, skipping reviews for ${developerName}`);
    return null;
  }

  try {
    // Search for the developer
    const searchQuery = encodeURIComponent(`${developerName} Costa Blanca Spain property developer`);
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&key=${apiKey}`;

    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (searchData.results && searchData.results.length > 0) {
      const place = searchData.results[0];
      return {
        rating: place.rating || 0,
        reviewCount: place.user_ratings_total || 0,
        placeId: place.place_id,
      };
    }

    return null;
  } catch (error) {
    console.error(`[GOOGLE] Error fetching reviews for ${developerName}:`, error);
    return null;
  }
}

// ==========================================
// AI CONTENT GENERATION
// ==========================================

async function generateContent(
  stats: DeveloperStats,
  googleReviews: GoogleReviewData | null
): Promise<GeneratedDeveloperContent['content']> {
  const anthropic = new Anthropic();

  // Build context for AI
  const context = `
DEVELOPER: ${stats.name}
PROPERTIES: ${stats.propertyCount} units across ${stats.developmentCount} developments
DEVELOPMENTS: ${stats.developments.map(d => `${d.name} (${d.zone}, delivery ${formatDeliveryDate(d.deliveryDate)})`).join('; ')}
LOCATIONS: ${stats.towns.length > 0 ? stats.towns.join(', ') : stats.zones.join(', ')}
REGIONS: ${stats.regions.join(', ') || 'Costa Blanca'}
DELIVERY TIMELINE: ${formatDeliveryDate(stats.earliestDelivery)} to ${formatDeliveryDate(stats.latestDelivery)}
SPECIALIZATIONS: ${[
  stats.isGolfSpecialist ? 'Golf Properties' : null,
  stats.isBeachSpecialist ? 'Beach/Coastal Properties' : null,
].filter(Boolean).join(', ') || 'New Build Homes'}
${googleReviews ? `GOOGLE RATING: ${googleReviews.rating}/5 (${googleReviews.reviewCount} reviews)` : ''}
`.trim();

  const prompt = `You are an expert SEO copywriter for a real estate agency in Costa Blanca, Spain. Generate compelling, unique content for a developer/builder page.

IMPORTANT CONTEXT:
- We are an AGENCY showcasing properties from this developer, NOT the developer themselves
- Our goal is to rank for searches like "${stats.name} Costa Blanca", "${stats.name} properties", "${stats.name} villas"
- Content must be factual based on the data provided - don't invent details we don't have
- Focus on what buyers searching for this developer would want to know

DEVELOPER DATA:
${context}

Generate content in this EXACT JSON format (no markdown, just valid JSON):
{
  "metaTitle": "50-60 chars, keyword-rich, include developer name",
  "metaDescription": "150-160 chars, include developer name, location, what they build",
  "heroHeadline": "Compelling H1, 6-10 words",
  "heroIntro": "2 paragraphs introducing the developer, their focus areas, and what buyers can expect. Mention specific developments and locations.",
  "aboutSection": "3-4 paragraphs about the developer's presence in Costa Blanca. Focus on their active developments, the areas they build in, and the types of properties. Include specific development names.",
  "specializationSection": "2 paragraphs about what makes this developer notable - their focus (golf/beach/etc), the types of properties, price positioning. Be specific about zones and property types.",
  "developmentsSection": "2-3 paragraphs overview of their current portfolio, mentioning specific developments, delivery timelines, and locations.",
  "qualitySection": {
    "intro": "1 paragraph about Spanish new build standards and what buyers can expect",
    "points": ["8-10 bullet points about typical new build features - pools, terraces, AC, etc. Keep generic since we don't have specific specs"]
  },
  "whyChooseSection": ["6-8 reasons to consider this developer's properties, based on the data we have"],
  "faqs": [
    {"question": "Where does ${stats.name} build?", "answer": "Direct answer mentioning specific towns/zones"},
    {"question": "What types of properties does ${stats.name} offer?", "answer": "Based on our data"},
    {"question": "When are ${stats.name} properties available?", "answer": "Mention delivery timeline"},
    {"question": "How do I view ${stats.name} properties?", "answer": "Contact us via WhatsApp or call"},
    {"question": "Are ${stats.name} properties new builds?", "answer": "Yes, confirm new build focus"},
    {"question": "What areas does ${stats.name} specialize in?", "answer": "Golf/beach/etc based on data"}
  ],
  "conclusion": "1-2 paragraphs with clear CTA to contact us about this developer's properties"
}

CRITICAL RULES:
1. Only state facts we have data for - don't invent company history, founding dates, or details
2. Use phrases like "currently offering", "active developments include", "properties available in"
3. Don't claim to know their internal processes, warranties beyond Spanish standard, or company values
4. Focus on LOCATION and PROPERTY benefits, not developer claims we can't verify
5. Include long-tail keywords naturally: "new build villas [location]", "property developer Costa Blanca"
6. FAQs should start with direct answers (voice search optimization)
7. Return ONLY valid JSON, no markdown code blocks`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  const responseText = response.content[0].type === 'text' ? response.content[0].text : '';

  // Parse JSON response
  try {
    // Remove any markdown code blocks if present
    const jsonStr = responseText.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    console.error('Response was:', responseText);
    throw new Error('AI response was not valid JSON');
  }
}

// ==========================================
// SCHEMA GENERATION
// ==========================================

function generateSchemas(stats: DeveloperStats, content: GeneratedDeveloperContent['content']) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    'name': stats.name,
    'url': `https://www.newbuildhomescostablanca.com/builders/${stats.slug}/`,
    'description': content.metaDescription,
    'areaServed': stats.regions.map(region => ({
      '@type': 'Place',
      'name': region,
    })),
    'knowsAbout': [
      'Real Estate Development',
      'New Build Properties',
      stats.isGolfSpecialist ? 'Golf Properties' : null,
      stats.isBeachSpecialist ? 'Coastal Properties' : null,
      'Costa Blanca Properties',
    ].filter(Boolean),
  };

  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': content.faqs.slice(0, 6).map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  return { schema, schemaFAQ };
}

// ==========================================
// MAIN EXECUTION
// ==========================================

async function generateForDeveloper(developerName: string): Promise<void> {
  console.log(`\n========================================`);
  console.log(`Generating content for: ${developerName}`);
  console.log(`========================================\n`);

  // 1. Aggregate data from mapping
  console.log('[1/4] Aggregating data from mapping...');
  const stats = aggregateDeveloperData(developerName);
  console.log(`      Found ${stats.propertyCount} properties in ${stats.developmentCount} developments`);
  console.log(`      Zones: ${stats.zones.join(', ')}`);
  console.log(`      Golf specialist: ${stats.isGolfSpecialist}`);

  // 2. Try to fetch Google reviews
  console.log('[2/4] Checking for Google reviews...');
  const googleReviews = await fetchGoogleReviews(developerName);
  if (googleReviews) {
    console.log(`      Found: ${googleReviews.rating}/5 (${googleReviews.reviewCount} reviews)`);
  } else {
    console.log(`      No Google listing found`);
  }

  // 3. Generate AI content
  console.log('[3/4] Generating AI content...');
  const content = await generateContent(stats, googleReviews);
  console.log(`      Generated ${content.faqs.length} FAQs`);

  // 4. Generate schemas
  console.log('[4/4] Generating schemas...');
  const { schema, schemaFAQ } = generateSchemas(stats, content);

  // Build final output
  const output: GeneratedDeveloperContent = {
    slug: stats.slug,
    name: stats.name,
    stats,
    googleReviews: googleReviews || undefined,
    content,
    schema,
    schemaFAQ,
    generatedAt: new Date().toISOString(),
  };

  // Save to file
  const outputPath = path.join(process.cwd(), 'src', 'content', 'builders', `${stats.slug}.json`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log(`\n✅ Saved to: ${outputPath}`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage:');
    console.log('  npx tsx src/scripts/generate-developer-content.ts [developer-name]');
    console.log('  npx tsx src/scripts/generate-developer-content.ts --all');
    console.log('  npx tsx src/scripts/generate-developer-content.ts --top10');
    console.log('\nAvailable developers:');
    const developers = getAllDevelopers();
    console.log(developers.slice(0, 20).join(', ') + '...');
    console.log(`\nTotal: ${developers.length} developers`);
    return;
  }

  if (args[0] === '--all') {
    const developers = getAllDevelopers();
    console.log(`Generating content for all ${developers.length} developers...`);
    for (const dev of developers) {
      try {
        await generateForDeveloper(dev);
        // Rate limit
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Error generating for ${dev}:`, error);
      }
    }
  } else if (args[0] === '--top10') {
    // Get top 10 by property count
    const developers = getAllDevelopers();
    const withCounts = developers.map(name => ({
      name,
      count: aggregateDeveloperData(name).propertyCount,
    })).sort((a, b) => b.count - a.count).slice(0, 10);

    console.log('Top 10 developers by property count:');
    withCounts.forEach((d, i) => console.log(`  ${i + 1}. ${d.name} (${d.count} properties)`));
    console.log('\nGenerating content...');

    for (const dev of withCounts) {
      try {
        await generateForDeveloper(dev.name);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Error generating for ${dev.name}:`, error);
      }
    }
  } else {
    // Single developer
    const developerName = args.join(' ').toUpperCase();
    await generateForDeveloper(developerName);
  }
}

main().catch(console.error);
