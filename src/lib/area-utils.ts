import fs from 'fs';
import path from 'path';

export interface GolfCourse {
  name: string;
  distance: string;
  driveTime: string;
  holes: number;
  url: string;
  googleMaps: string;
  description: string;
}

export interface AreaContent {
  slug: string;
  name: string;
  propertyCount: number;
  propertyTypes: string[];
  priceRange: { min: number; max: number };
  region?: string;
  heroImage?: string;
  cardImage?: string;
  childAreas?: string[];
  externalLinks?: {
    beaches?: { name: string; url?: string; googleMaps?: string; description?: string }[];
    healthcare?: { name: string; googleMaps: string; distance: string };
    airport?: { name: string; googleMaps: string; distance: string; driveTime: string };
    tourism?: { url: string; name?: string; description?: string };
  };
  golf?: {
    intro: string;
    courses: GolfCourse[];
  };
  content: {
    metaTitle: string;
    metaDescription: string;
    heroIntro: string;
    lifestyleSection: {
      intro: string;
      highlights: string[];
    };
    amenitiesSection: {
      beaches: string;
      dining: string;
      shopping: string;
      healthcare: string;
      transport: string;
    };
    propertyMarketSection: string;
    whyLiveHereSection: string[];
    faqs: { question: string; answer: string }[];
    conclusion: string;
    // Enhanced fields (optional)
    investmentAnalysis?: {
      rentalYield: string;
      annualAppreciation: string;
      overview: string;
      highlights: string[];
    };
    costOfLiving?: {
      intro: string;
      items: { category: string; cost: string; notes: string }[];
    };
    events?: {
      intro: string;
      events: { name: string; month: string; description: string }[];
    };
    schools?: {
      intro: string;
      schools: { name: string; type: string; distance: string; description: string }[];
    };
    natureActivities?: {
      intro: string;
      activities: { name: string; type: string; description: string }[];
    };
    expatCommunity?: {
      intro: string;
      highlights: string[];
      nationalities: string[];
    };
    lifestyleTimeline?: {
      title: string;
      entries: { time: string; activity: string; description: string }[];
    };
    mapEmbed?: string;
  };
  developments: {
    name: string;
    slug: string;
    propertyType: string;
    price: number | null;
    bedrooms: number | null;
    image: string;
  }[];
  schema: object;
  schemaFAQ: object;
}

// Fallback image for developments without photos
export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fit=crop&auto=format';

export const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  habeno: 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e',
};

// Helper to extract string from potentially nested object (handles { text, keyPoints } format)
export function extractString(value: any, fallback: string = ''): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    // Handle { text, keyPoints } format from AI generation
    if (typeof value.text === 'string') return value.text;
    // Handle other object formats
    if (typeof value.description === 'string') return value.description;
    if (typeof value.intro === 'string') return value.intro;
  }
  return fallback;
}

// Normalizer function that handles BOTH JSON formats
export function normalizeAreaContent(rawData: any, slug: string): AreaContent {
  // Detect format: Format 1 has nested "content", Format 2 has "metaTitle" at root
  const isFormat1 = rawData.content !== undefined && rawData.content.metaTitle !== undefined;

  if (isFormat1) {
    // Format 1 (torrevieja.json style) - normalize any nested objects in amenities
    const normalized = { ...rawData, slug: rawData.slug || slug };
    if (normalized.content?.amenitiesSection) {
      normalized.content.amenitiesSection = {
        beaches: extractString(normalized.content.amenitiesSection.beaches, ''),
        dining: extractString(normalized.content.amenitiesSection.dining, ''),
        shopping: extractString(normalized.content.amenitiesSection.shopping, ''),
        healthcare: extractString(normalized.content.amenitiesSection.healthcare, ''),
        transport: extractString(normalized.content.amenitiesSection.transport, ''),
      };
    }
    if (normalized.content?.lifestyleSection) {
      normalized.content.lifestyleSection = {
        intro: extractString(normalized.content.lifestyleSection.intro, normalized.content.lifestyleSection.intro || ''),
        highlights: Array.isArray(normalized.content.lifestyleSection.highlights)
          ? normalized.content.lifestyleSection.highlights.map((h: any) => extractString(h, String(h)))
          : [],
      };
    }
    // Pass through enhanced fields from Format 1
    if (rawData.content?.investmentAnalysis) normalized.content.investmentAnalysis = rawData.content.investmentAnalysis;
    if (rawData.content?.costOfLiving) normalized.content.costOfLiving = rawData.content.costOfLiving;
    if (rawData.content?.events) normalized.content.events = rawData.content.events;
    if (rawData.content?.schools) normalized.content.schools = rawData.content.schools;
    if (rawData.content?.natureActivities) normalized.content.natureActivities = rawData.content.natureActivities;
    if (rawData.content?.expatCommunity) normalized.content.expatCommunity = rawData.content.expatCommunity;
    if (rawData.content?.lifestyleTimeline) normalized.content.lifestyleTimeline = rawData.content.lifestyleTimeline;
    if (rawData.content?.mapEmbed) normalized.content.mapEmbed = rawData.content.mapEmbed;
    return normalized;
  }

  // Format 2 (javea.json style) - needs full mapping

  // Parse price range from string like "€428,000 - €4,500,000"
  let priceMin = 200000;
  let priceMax = 1000000;
  const priceStr = rawData.propertyMarket?.priceRange || '';
  if (typeof priceStr === 'string') {
    const matches = priceStr.match(/[\d,]+/g);
    if (matches && matches.length >= 2) {
      priceMin = parseInt(matches[0].replace(/,/g, ''), 10);
      priceMax = parseInt(matches[1].replace(/,/g, ''), 10);
    }
  } else if (typeof priceStr === 'object' && priceStr.min) {
    priceMin = priceStr.min;
    priceMax = priceStr.max;
  }

  // Extract name from metaTitle or slug
  let name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  if (rawData.metaTitle) {
    const match = rawData.metaTitle.match(/Living in ([^:]+)/i);
    if (match) name = match[1].trim();
  }

  // Parse neighborhoods - can be array of strings or array of objects
  const neighborhoods = rawData.neighborhoods || [];
  const neighborhoodStrings = neighborhoods.map((n: any) =>
    typeof n === 'string' ? n : (n.name || n.description || String(n))
  );

  // Parse pros from prosAndCons
  const pros = rawData.prosAndCons?.pros || rawData.prosAndCons?.advantages || [];
  const prosStrings = pros.map((p: any) => typeof p === 'string' ? p : (p.description || String(p)));

  // Parse FAQs
  const faqs = rawData.faqs || [];
  const normalizedFaqs = faqs.map((f: any) => ({
    question: f.question || f.q || '',
    answer: f.answer || f.a || ''
  }));

  // Build normalized structure
  return {
    slug,
    name,
    propertyCount: rawData.propertyCount || 0,
    propertyTypes: rawData.propertyTypes || ['Villa', 'Apartment', 'Penthouse', 'Townhouse'],
    priceRange: { min: priceMin, max: priceMax },
    region: rawData.region || (slug.includes('torrevieja') || slug.includes('orihuela') ? 'Costa Blanca South' : 'Costa Blanca North'),
    heroImage: rawData.heroImage,
    cardImage: rawData.cardImage,
    externalLinks: rawData.externalLinks,
    golf: rawData.golf,
    content: {
      metaTitle: rawData.metaTitle || `Living in ${name} - Costa Blanca Guide`,
      metaDescription: rawData.metaDescription || `Discover ${name} on the Costa Blanca. Properties, lifestyle, and amenities guide.`,
      heroIntro: rawData.heroIntro || `Welcome to ${name}, a beautiful destination on Spain's Costa Blanca.`,
      lifestyleSection: {
        intro: extractString(rawData.lifestyle || rawData.climate, `${name} offers an exceptional Mediterranean lifestyle with year-round sunshine.`),
        highlights: neighborhoodStrings.length > 0 ? neighborhoodStrings : [`Beautiful beaches`, `Mediterranean climate`, `International community`]
      },
      amenitiesSection: {
        beaches: extractString(rawData.amenities?.sports || rawData.amenities?.beaches, `${name} features excellent beaches along the Mediterranean coast.`),
        dining: extractString(rawData.amenities?.dining, `A variety of restaurants and cafes serving local and international cuisine.`),
        shopping: extractString(rawData.amenities?.shopping, `Local markets and shopping centers for all your needs.`),
        healthcare: extractString(rawData.amenities?.healthcare, `Quality healthcare facilities available nearby.`),
        transport: [
          extractString(rawData.transport?.airports, ''),
          extractString(rawData.transport?.driving, ''),
          extractString(rawData.transport?.public, '')
        ].filter(Boolean).join(' ') || `Well connected by road to Alicante and Valencia airports.`
      },
      propertyMarketSection: [
        extractString(rawData.propertyMarket?.overview, ''),
        extractString(rawData.propertyMarket?.popularTypes, ''),
        extractString(rawData.propertyMarket?.investment, '')
      ].filter(Boolean).join('\n\n') || `${name} offers a range of new build properties from apartments to luxury villas.`,
      whyLiveHereSection: prosStrings.length > 0 ? prosStrings : [
        `Mediterranean climate with over 300 days of sunshine`,
        `Beautiful beaches and natural surroundings`,
        `Welcoming international community`,
        `Excellent amenities and infrastructure`
      ],
      faqs: normalizedFaqs.length > 0 ? normalizedFaqs : [
        { question: `Is ${name} a good place to buy property?`, answer: `Yes, ${name} offers excellent value and lifestyle on the Costa Blanca.` }
      ],
      conclusion: rawData.conclusion || `Contact us today to discover your perfect property in ${name}. Our team is ready to help you find your dream home on the Costa Blanca.`
    },
    developments: rawData.developments || [],
    schema: rawData.schema || {},
    schemaFAQ: rawData.schemaFAQ || {}
  };
}

export function normalizeRegionContent(rawData: any, slug: string): AreaContent {
  const c = rawData.content || {};

  // Build golf section from region format
  const golfCourses = (c.golfSection?.topCourses || []).map((course: any) => ({
    name: course.name,
    distance: '',
    driveTime: '',
    holes: course.holes || 18,
    url: '',
    googleMaps: '',
    description: course.description || '',
  }));

  // Build amenities from practicalInfo
  const practicalInfo = c.practicalInfo || {};

  // Build lifestyle section
  const lifestyleSection = {
    intro: c.lifestyleSection?.intro || '',
    highlights: c.lifestyleSection?.highlights || [],
  };

  // Build property market text
  const marketOverview = c.propertyMarketSection?.overview || '';
  const priceGuide = (c.propertyMarketSection?.priceGuide || [])
    .map((p: any) => `${p.type}: ${p.range} (${p.notes})`)
    .join('. ');
  const propertyMarketSection = (marketOverview ? marketOverview + '\n\n' : '') + (priceGuide ? priceGuide : '');

  // Build "why live here" from majorAreas
  const whyLiveHereSection = (c.majorAreas || []).map((area: any) =>
    `${area.name}: ${area.description} Best for: ${area.bestFor}. Prices from ${area.priceRange}.`
  );

  // Build amenities section
  const amenitiesSection = {
    beaches: (c.beachesSection?.highlights || []).map((b: any) => `${b.name} (${b.type}): ${b.description}`).join('\n\n'),
    dining: '',
    shopping: '',
    healthcare: practicalInfo.healthcare || '',
    transport: practicalInfo.transport || '',
  };

  return {
    slug: rawData.slug || slug,
    name: rawData.name || slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    propertyCount: 0, // Will be updated dynamically
    propertyTypes: ['Apartment', 'Villa', 'Townhouse', 'Penthouse'],
    priceRange: rawData.priceRange || { min: 150000, max: 1000000 },
    region: rawData.name,
    heroImage: rawData.heroImage,
    cardImage: rawData.cardImage,
    childAreas: rawData.childAreas || [],
    golf: golfCourses.length > 0 ? {
      intro: c.golfSection?.intro || '',
      courses: golfCourses,
    } : undefined,
    content: {
      metaTitle: c.metaTitle || `${rawData.name} Property Guide`,
      metaDescription: c.metaDescription || '',
      heroIntro: c.heroIntro || '',
      lifestyleSection,
      amenitiesSection,
      propertyMarketSection,
      whyLiveHereSection,
      faqs: (c.faqs || []).map((f: any) => ({ question: f.question, answer: f.answer })),
      conclusion: c.conclusion || '',
    },
    developments: [],
    schema: rawData.schema || {},
    schemaFAQ: rawData.schemaFAQ || {},
  };
}

export function getArea(slug: string, lang?: string): AreaContent | null {
  // If a language is specified, check for translated content first
  if (lang && lang !== 'en') {
    const langAreaPath = path.join(process.cwd(), 'src', 'content', 'areas', lang, `${slug}.json`);
    if (fs.existsSync(langAreaPath)) {
      try {
        const rawData = JSON.parse(fs.readFileSync(langAreaPath, 'utf-8'));
        return normalizeAreaContent(rawData, slug);
      } catch (error) {
        console.error(`Error loading ${lang} area ${slug}:`, error);
        // Fall through to English
      }
    }
  }

  // Default: load English content
  const areaPath = path.join(process.cwd(), 'src', 'content', 'areas', `${slug}.json`);
  if (fs.existsSync(areaPath)) {
    try {
      const rawData = JSON.parse(fs.readFileSync(areaPath, 'utf-8'));
      return normalizeAreaContent(rawData, slug);
    } catch (error) {
      console.error(`Error loading area ${slug}:`, error);
      return null;
    }
  }

  // Fallback: check regions directory
  const regionPath = path.join(process.cwd(), 'src', 'content', 'regions', `${slug}.json`);
  if (fs.existsSync(regionPath)) {
    try {
      const rawData = JSON.parse(fs.readFileSync(regionPath, 'utf-8'));
      return normalizeRegionContent(rawData, slug);
    } catch (error) {
      console.error(`Error loading region ${slug}:`, error);
      return null;
    }
  }

  return null;
}

export function getAllAreaSlugs(): string[] {
  const slugs: string[] = [];

  const areasDir = path.join(process.cwd(), 'src', 'content', 'areas');
  if (fs.existsSync(areasDir)) {
    slugs.push(...fs.readdirSync(areasDir)
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', '')));
  }

  // Also include region pages
  const regionsDir = path.join(process.cwd(), 'src', 'content', 'regions');
  if (fs.existsSync(regionsDir)) {
    slugs.push(...fs.readdirSync(regionsDir)
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', '')));
  }

  return [...new Set(slugs)];
}
