/**
 * Area Content Generator - FIXED VERSION
 * 
 * This generates area guide JSON files that MATCH the exact structure
 * expected by the areas page (matching javea-xabia.json format).
 * 
 * CRITICAL: Output format must include:
 * - name (NOT town)
 * - propertyTypes (array, NOT string)
 * - priceRange: { min: number, max: number } (NOT string)
 * - All nested structures matching javea-xabia.json
 */

import { fetchAllProperties, getAllTowns } from './unified-feed-service';
import { UnifiedProperty, TownSummary, generateSlug } from './unified-property';
import * as fs from 'fs';
import * as path from 'path';

// Area content structure MATCHING javea-xabia.json exactly
interface AreaContent {
  slug: string;
  name: string;  // NOT "town"
  region: string;
  propertyCount: number;
  propertyTypes: string[];  // Array, NOT string
  priceRange: {
    min: number;
    max: number;
  };
  externalLinks?: {
    tourism?: {
      name: string;
      url: string;
      description: string;
    };
    beaches?: Array<{
      name: string;
      googleMaps: string;
      description: string;
    }>;
    healthcare?: {
      name: string;
      googleMaps: string;
      url?: string;
      distance: string;
    };
    airport?: {
      name: string;
      googleMaps: string;
      url: string;
      distance: string;
      driveTime: string;
    };
  };
  golf?: {
    intro: string;
    courses: Array<{
      name: string;
      distance: string;
      driveTime: string;
      holes: number;
      url?: string;
      googleMaps: string;
      description: string;
    }>;
  };
  content: {
    metaTitle: string;
    metaDescription: string;
    heroIntro: string;
    lifestyleSection: {
      intro: string;
      highlights: string[];
    };
    climate?: string;
    amenities?: {
      healthcare: string;
      shopping: string;
      dining: string;
      sports: string;
    };
    transport?: {
      airports: string;
      driving: string;
      public: string;
    };
    propertyMarket?: {
      overview: string;
      investment: string;
    };
    neighborhoods?: string[];
    prosAndCons?: {
      pros: string[];
      cons: string[];
    };
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  // Schema markup
  schema?: object;
  schemaFAQ?: object;
}

/**
 * Generate area content from property data
 * Uses AI (Claude) to generate rich content for each area
 */
export async function generateAreaContent(
  townName: string,
  properties: UnifiedProperty[],
  options?: {
    useAI?: boolean;
    anthropicApiKey?: string;
  }
): Promise<AreaContent> {
  const { useAI = false, anthropicApiKey } = options || {};

  // Calculate stats from properties
  const prices = properties.map(p => p.price).filter(p => p > 0);
  const types = [...new Set(properties.map(p => p.propertyType))];
  const region = properties[0]?.region || 'Costa Blanca';
  const slug = generateSlug(townName);

  // Base structure that MATCHES javea-xabia.json
  const baseContent: AreaContent = {
    slug,
    name: townName,  // CORRECT: "name" not "town"
    region,
    propertyCount: properties.length,
    propertyTypes: types,  // CORRECT: Array
    priceRange: {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 0,
    },
    content: {
      metaTitle: `Living in ${townName} | Property Guide Costa Blanca`,
      metaDescription: `Complete guide to living in ${townName}, Costa Blanca. Discover lifestyle, property market, amenities and why international buyers choose ${townName}.`,
      heroIntro: `${townName} is a popular destination on Spain's Costa Blanca, offering excellent weather, beautiful surroundings, and a welcoming international community. With ${properties.length} new build properties currently available, ${townName} presents attractive options for buyers seeking Mediterranean living.`,
      lifestyleSection: {
        intro: `Life in ${townName} offers the perfect balance of Spanish authenticity and modern convenience. The town attracts international residents who appreciate the Mediterranean lifestyle, excellent climate, and strong sense of community.`,
        highlights: [
          'Over 300 days of sunshine annually',
          'Strong international community',
          'Excellent local amenities',
          'Easy access to beaches and golf courses',
          'Quality healthcare facilities nearby',
        ],
      },
    },
    faqs: [
      {
        question: `Is ${townName} a good place to live?`,
        answer: `Yes, ${townName} offers an excellent quality of life with great weather, modern amenities, and a welcoming community. Many international residents have made it their permanent home.`,
      },
      {
        question: `What are property prices like in ${townName}?`,
        answer: `New build properties in ${townName} currently range from €${prices.length > 0 ? Math.min(...prices).toLocaleString() : 'N/A'} to €${prices.length > 0 ? Math.max(...prices).toLocaleString() : 'N/A'}, depending on property type, size, and location.`,
      },
      {
        question: `How far is ${townName} from the airport?`,
        answer: `${townName} is approximately 45-90 minutes from Alicante-Elche Airport, depending on exact location. The airport offers excellent connections to destinations across Europe.`,
      },
      {
        question: `Is English spoken in ${townName}?`,
        answer: `Yes, English is widely spoken in ${townName} due to its large international community. Many businesses, restaurants, and healthcare providers offer services in English.`,
      },
      {
        question: `Can I rent out my property in ${townName}?`,
        answer: `Yes, holiday rentals are popular in ${townName}. The area attracts visitors year-round, making it suitable for investment properties. Check local regulations for tourist license requirements.`,
      },
    ],
  };

  // If AI generation is enabled, enhance content
  if (useAI && anthropicApiKey) {
    return await enhanceWithAI(baseContent, properties, anthropicApiKey);
  }

  return baseContent;
}

/**
 * Enhance content with AI-generated text
 */
async function enhanceWithAI(
  baseContent: AreaContent,
  properties: UnifiedProperty[],
  apiKey: string
): Promise<AreaContent> {
  const prompt = buildAIPrompt(baseContent, properties);
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      console.error(`AI request failed: ${response.status}`);
      return baseContent;
    }

    const data = await response.json();
    const aiText = data.content?.[0]?.text;
    
    if (aiText) {
      // Parse AI response and merge with base content
      const enhanced = parseAIResponse(aiText, baseContent);
      return enhanced;
    }
  } catch (error) {
    console.error('AI enhancement failed:', error);
  }

  return baseContent;
}

/**
 * Build prompt for AI content generation
 */
function buildAIPrompt(content: AreaContent, properties: UnifiedProperty[]): string {
  const propertyTypes = content.propertyTypes.join(', ');
  const avgPrice = Math.round((content.priceRange.min + content.priceRange.max) / 2);

  return `Generate comprehensive area guide content for ${content.name}, Costa Blanca, Spain.

PROPERTY DATA:
- ${content.propertyCount} new build properties available
- Property types: ${propertyTypes}
- Price range: €${content.priceRange.min.toLocaleString()} to €${content.priceRange.max.toLocaleString()}
- Average price: €${avgPrice.toLocaleString()}
- Region: ${content.region}

Generate the following in JSON format:
1. heroIntro (250-300 words): Compelling introduction to the area
2. lifestyleSection.intro (150-200 words): Description of daily life
3. lifestyleSection.highlights (5-7 bullet points): Key benefits
4. climate (100 words): Weather description
5. amenities.healthcare, amenities.shopping, amenities.dining, amenities.sports (100 words each)
6. transport.airports, transport.driving, transport.public (80 words each)
7. propertyMarket.overview (150 words): Market analysis
8. propertyMarket.investment (100 words): Investment potential
9. neighborhoods (4-5 entries): Key areas within the town
10. prosAndCons.pros (5 points) and prosAndCons.cons (3 points)
11. faqs (8 question/answer pairs): Common questions about living here
12. metaTitle (55-60 chars): SEO title
13. metaDescription (150-160 chars): SEO description

Respond with valid JSON only, no markdown.`;
}

/**
 * Parse AI response and merge with base content
 */
function parseAIResponse(aiText: string, baseContent: AreaContent): AreaContent {
  try {
    // Clean up potential markdown formatting
    const cleaned = aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const aiContent = JSON.parse(cleaned);
    
    // Merge AI content with base content
    return {
      ...baseContent,
      content: {
        ...baseContent.content,
        metaTitle: aiContent.metaTitle || baseContent.content.metaTitle,
        metaDescription: aiContent.metaDescription || baseContent.content.metaDescription,
        heroIntro: aiContent.heroIntro || baseContent.content.heroIntro,
        lifestyleSection: {
          intro: aiContent.lifestyleSection?.intro || baseContent.content.lifestyleSection.intro,
          highlights: aiContent.lifestyleSection?.highlights || baseContent.content.lifestyleSection.highlights,
        },
        climate: aiContent.climate,
        amenities: aiContent.amenities,
        transport: aiContent.transport,
        propertyMarket: aiContent.propertyMarket,
        neighborhoods: aiContent.neighborhoods,
        prosAndCons: aiContent.prosAndCons,
      },
      faqs: aiContent.faqs || baseContent.faqs,
    };
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    return baseContent;
  }
}

/**
 * Generate and save area content files
 */
export async function generateAllAreaContent(options?: {
  outputDir?: string;
  useAI?: boolean;
  anthropicApiKey?: string;
}): Promise<void> {
  const {
    outputDir = './src/content/areas',
    useAI = false,
    anthropicApiKey,
  } = options || {};

  console.log('[AreaGenerator] Starting area content generation...');

  // Fetch all properties from all feeds
  const allProperties = await fetchAllProperties();
  console.log(`[AreaGenerator] Total properties: ${allProperties.length}`);

  // Get unique towns
  const towns = await getAllTowns();
  console.log(`[AreaGenerator] Found ${towns.length} towns`);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate content for each town
  for (const town of towns) {
    console.log(`[AreaGenerator] Processing: ${town.name}`);
    
    // Get properties for this town
    const townProperties = allProperties.filter(
      p => p.town.toLowerCase() === town.name.toLowerCase()
    );

    // Generate content
    const content = await generateAreaContent(town.name, townProperties, {
      useAI,
      anthropicApiKey,
    });

    // Add schema markup
    content.schema = generateSchema(content);
    content.schemaFAQ = generateFAQSchema(content.faqs);

    // Save to file
    const filename = `${content.slug}.json`;
    const filepath = path.join(outputDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(content, null, 2), 'utf-8');
    console.log(`[AreaGenerator] Saved: ${filename}`);
  }

  console.log('[AreaGenerator] Complete!');
}

/**
 * Generate Article schema for area page
 */
function generateSchema(content: AreaContent): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': content.content.metaTitle,
    'description': content.content.metaDescription,
    'author': {
      '@type': 'Organization',
      'name': 'New Build Homes Costa Blanca',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'New Build Homes Costa Blanca',
      'url': 'https://www.newbuildhomescostablanca.com',
    },
    'about': {
      '@type': 'Place',
      'name': content.name,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': content.name,
        'addressRegion': content.region,
        'addressCountry': 'ES',
      },
    },
  };
}

/**
 * Generate FAQ schema
 */
function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

// CLI execution
if (require.main === module) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  generateAllAreaContent({
    useAI: !!apiKey,
    anthropicApiKey: apiKey,
  })
    .then(() => console.log('Done!'))
    .catch(console.error);
}
