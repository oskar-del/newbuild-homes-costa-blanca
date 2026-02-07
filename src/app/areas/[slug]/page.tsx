import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import LeadForm from '@/components/LeadForm';
import { getAllDevelopments, Development } from '@/lib/development-service';
import { breadcrumbSchema, toJsonLd, articleSchema, placeSchema } from '@/lib/schema';
import { LifestyleBanner, SectionCardImage, ImageGrid } from '@/components/area/SectionImage';
import {
  beachImages,
  golfImages,
  villaPoolImages,
  marketFoodImages,
  oldTownImages,
  marinaImages,
  getImageUrl,
  getRandomImage,
  areaImageSuggestions
} from '@/data/stock-images';

// Fallback image for developments without photos
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fit=crop&auto=format';

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  habeno: 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e',
};

interface GolfCourse {
  name: string;
  distance: string;
  driveTime: string;
  holes: number;
  url: string;
  googleMaps: string;
  description: string;
}

interface AreaContent {
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

// Helper to extract string from potentially nested object (handles { text, keyPoints } format)
function extractString(value: any, fallback: string = ''): string {
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
function normalizeAreaContent(rawData: any, slug: string): AreaContent {
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

function normalizeRegionContent(rawData: any, slug: string): AreaContent {
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

function getArea(slug: string): AreaContent | null {
  // First check areas
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

function getAllAreaSlugs(): string[] {
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

export async function generateStaticParams() {
  const slugs = getAllAreaSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getArea(slug);
  
  if (!data) {
    return { title: 'Area Not Found' };
  }
  
  return {
    title: data.content.metaTitle,
    description: data.content.metaDescription,
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getArea(slug);

  if (!data) {
    notFound();
  }

  const { content, schema, schemaFAQ, externalLinks, golf } = data;

  // Fetch real developments from API for this area
  const allDevelopments = await getAllDevelopments();
  const areaNameLower = data.name.toLowerCase();
  const slugLower = slug.toLowerCase();

  // For region pages, match against child areas
  const isRegionPage = !!(data as any).childAreas?.length;
  const childAreaNames = ((data as any).childAreas || []).map((s: string) => s.toLowerCase().replace(/-/g, ' '));

  // Filter developments that match this area by town field
  // Handle compound towns like "Moraira_Teulada" by splitting on underscores
  const allMatchingDevelopments = allDevelopments
    .filter(dev => {
      const town = (dev.town || '').toLowerCase().replace(/_/g, ' ');
      const zone = (dev.zone || '').toLowerCase().replace(/_/g, ' ');
      const townParts = town.split(/[\s_-]+/);
      const zoneParts = zone.split(/[\s_-]+/);

      // Region page: match against any child area
      if (isRegionPage) {
        return childAreaNames.some((child: string) =>
          town.includes(child) || zone.includes(child) || child.includes(town)
        );
      }

      // Normal area page logic
      // Check direct includes
      if (town.includes(areaNameLower) || town.includes(slugLower) ||
          zone.includes(areaNameLower) || zone.includes(slugLower)) return true;

      // Check if any part of compound town matches
      if (townParts.some(part => part.includes(areaNameLower) || areaNameLower.includes(part))) return true;
      if (zoneParts.some(part => part.includes(areaNameLower) || areaNameLower.includes(part))) return true;

      return false;
    });

  // Update property count based on actual developments found
  data.propertyCount = allMatchingDevelopments.length;

  // Take only first 8 for display on page
  const developments = allMatchingDevelopments
    .slice(0, 8)
    .map(dev => ({
      name: dev.name || 'New Build Property',
      slug: dev.slug,
      propertyType: dev.propertyTypes?.[0] || 'Property',
      price: dev.priceFrom || null,
      bedrooms: dev.minBedrooms || null,
      image: dev.images?.[0] || FALLBACK_IMAGE,
    }));

  // Get hero image - use first development image if available, otherwise stock image
  const heroImage = data.heroImage ||
    (developments[0]?.image && developments[0].image !== FALLBACK_IMAGE ? developments[0].image : null) ||
    (areaImageSuggestions[slug]?.hero ? getImageUrl(areaImageSuggestions[slug].hero, 1920) : null) ||
    getImageUrl(villaPoolImages[5], 1920); // Default to villa sea view

  // Generate breadcrumb schema
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Areas', url: 'https://newbuildhomescostablanca.com/areas/' },
    { name: data.name, url: `https://newbuildhomescostablanca.com/areas/${data.slug}/` },
  ]);

  // Generate article schema for SEO
  const pageArticleSchema = articleSchema({
    headline: content.metaTitle,
    description: content.metaDescription,
    datePublished: new Date().toISOString().split('T')[0],
    author: 'New Build Homes Costa Blanca',
    url: `https://newbuildhomescostablanca.com/areas/${data.slug}/`,
    image: data.heroImage,
  });

  // Generate place schema if not in data
  const areaPlaceSchema = schema && Object.keys(schema).length > 0 ? schema : placeSchema({
    name: data.name,
    description: content.heroIntro.slice(0, 200),
    url: `https://newbuildhomescostablanca.com/areas/${data.slug}/`,
    image: data.heroImage,
    address: {
      region: data.region || 'Costa Blanca',
    },
    containedIn: 'Costa Blanca, Spain',
  });

  return (
    <>
      {/* Schema Markup - Breadcrumb (Critical for SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }}
      />
      {/* Schema Markup - Place/Area */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaPlaceSchema) }}
      />
      {/* Schema Markup - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(pageArticleSchema) }}
      />
      {/* Schema Markup - FAQ */}
      {schemaFAQ && Object.keys(schemaFAQ).length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
        />
      )}
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative text-white py-20">
          <Image
            src={heroImage}
            alt={data.name}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-700/80" />
          <div className="relative max-w-6xl mx-auto px-4">
            <nav className="text-white/70 text-sm mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/areas" className="hover:text-white">Areas</Link>
              <span className="mx-2">›</span>
              <span className="text-white">{data.name}</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Living in {data.name}
            </h1>
            
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              Your complete guide to buying property and living in {data.name}, Costa Blanca
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">
                🏠 {data.propertyCount} New Builds
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full">
                💶 From €{data.priceRange.min.toLocaleString()}
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full">
                🌴 {data.region || 'Costa Blanca'}
              </span>
              {golf && golf.courses && (
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  ⛳ {golf.courses.length} Golf Courses Nearby
                </span>
              )}
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Intro */}
              <section>
                <div className="prose prose-lg max-w-none">
                  {content.heroIntro.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-warm-700 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Lifestyle Section */}
              <section>
                <h2 className="text-2xl font-bold text-primary-900 mb-6">
                  The {data.name} Lifestyle
                </h2>
                <div className="prose prose-lg max-w-none mb-6">
                  {content.lifestyleSection.intro.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-warm-700">{paragraph}</p>
                  ))}
                </div>

                {/* Lifestyle image grid showcasing the area */}
                <ImageGrid
                  images={[
                    villaPoolImages[0],
                    beachImages[1],
                    marketFoodImages[0],
                    oldTownImages[0],
                  ]}
                  columns={2}
                  gap="gap-4"
                  className="mb-6"
                />

                {content.lifestyleSection.highlights.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-3">
                    {content.lifestyleSection.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-accent-50 rounded-sm">
                        <span className="text-accent-500">✓</span>
                        <span className="text-warm-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Beaches with External Links */}
              {externalLinks?.beaches && externalLinks.beaches.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    🏖️ Beaches in {data.name}
                  </h2>

                  {/* Beach lifestyle image */}
                  <div className="relative h-64 rounded-sm overflow-hidden mb-6">
                    <Image
                      src={getImageUrl(beachImages[0], 1200)}
                      alt={beachImages[0].alt}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-lg font-light">
                        {content.amenitiesSection.beaches}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {externalLinks.beaches.map((beach, i) => (
                      <a
                        key={i}
                        href={beach.googleMaps || beach.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-sm overflow-hidden border border-warm-200 hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-32">
                          <Image
                            src={getImageUrl(beachImages[i % beachImages.length], 600)}
                            alt={`${beach.name} beach`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-primary-900 mb-1">{beach.name}</h3>
                          {beach.description && (
                            <p className="text-warm-600 text-sm mb-2">{beach.description}</p>
                          )}
                          <span className="text-blue-600 text-sm font-medium">
                            📍 View on Google Maps →
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* Golf Section */}
              {golf && golf.courses && golf.courses.length > 0 && (
                <section>
                  {/* Golf lifestyle banner */}
                  <LifestyleBanner
                    image={golfImages[0]}
                    title={`Golf Near ${data.name}`}
                    description={golf.intro || `Discover world-class golf courses just minutes from ${data.name}. The Costa Blanca is a golfer's paradise with year-round sunshine.`}
                    alignment="left"
                  />

                  <div className="mt-8 space-y-4">
                    {golf.courses.map((course, i) => (
                      <div key={i} className="flex gap-4 border border-warm-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow">
                        {/* Golf course image */}
                        <div className="relative w-32 md:w-48 flex-shrink-0">
                          <Image
                            src={getImageUrl(golfImages[i % golfImages.length], 400)}
                            alt={`${course.name} golf course`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                            <div>
                              <h3 className="font-bold text-primary-900 text-lg">{course.name}</h3>
                              <p className="text-warm-500">{course.holes} holes • {course.distance} ({course.driveTime})</p>
                            </div>
                            <div className="flex gap-2">
                              {course.url && (
                                <a
                                  href={course.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 bg-success-500 hover:bg-success-600 text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors"
                                >
                                  🌐 Website
                                </a>
                              )}
                              {course.googleMaps && (
                                <a
                                  href={course.googleMaps}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors"
                                >
                                  📍 Directions
                                </a>
                              )}
                            </div>
                          </div>
                          {course.description && <p className="text-warm-700">{course.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Amenities Section */}
              <section>
                <h2 className="text-2xl font-bold text-primary-900 mb-6">
                  Amenities & Services
                </h2>

                {/* Local market/dining lifestyle banner */}
                <LifestyleBanner
                  image={marketFoodImages[1]}
                  title="Local Dining & Markets"
                  description={`Experience the authentic flavors of ${data.name} — from traditional tapas bars to fresh local markets bursting with Mediterranean produce.`}
                  alignment="center"
                />

                <div className="mt-8 space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h3 className="font-bold text-primary-900 mb-2">🍽️ Dining</h3>
                    <p className="text-warm-700">{content.amenitiesSection.dining}</p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-bold text-primary-900 mb-2">🛍️ Shopping</h3>
                    <p className="text-warm-700">{content.amenitiesSection.shopping}</p>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-bold text-primary-900 mb-2">🏥 Healthcare</h3>
                    <p className="text-warm-700">{content.amenitiesSection.healthcare}</p>
                    {externalLinks?.healthcare && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a
                          href={externalLinks.healthcare.googleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
                        >
                          📍 {externalLinks.healthcare.name} ({externalLinks.healthcare.distance})
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-l-4 border-success-500 pl-4">
                    <h3 className="font-bold text-primary-900 mb-2">✈️ Transport</h3>
                    <p className="text-warm-700">{content.amenitiesSection.transport}</p>
                    {externalLinks?.airport && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a
                          href={externalLinks.airport.googleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
                        >
                          📍 {externalLinks.airport.name} ({externalLinks.airport.distance}, {externalLinks.airport.driveTime})
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Property Market */}
              <section>
                <h2 className="text-2xl font-bold text-primary-900 mb-6">
                  Property Market in {data.name}
                </h2>
                <div className="prose prose-lg max-w-none">
                  {content.propertyMarketSection.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-warm-700">{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Investment Analysis */}
              {content.investmentAnalysis && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    Investment Analysis
                  </h2>
                  <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-sm p-6 mb-6">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-accent-600">{content.investmentAnalysis.rentalYield}</p>
                        <p className="text-sm text-warm-600 mt-1">Rental Yield</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary-700">{content.investmentAnalysis.annualAppreciation}</p>
                        <p className="text-sm text-warm-600 mt-1">Annual Appreciation</p>
                      </div>
                    </div>
                    <p className="text-warm-700">{content.investmentAnalysis.overview}</p>
                  </div>
                  {content.investmentAnalysis.highlights.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-3">
                      {content.investmentAnalysis.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 border border-warm-200 rounded-sm">
                          <span className="text-accent-500 text-lg">📈</span>
                          <span className="text-warm-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Cost of Living */}
              {content.costOfLiving && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    Cost of Living in {data.name}
                  </h2>
                  <p className="text-warm-700 mb-6">{content.costOfLiving.intro}</p>
                  <div className="overflow-hidden border border-warm-200 rounded-sm">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-primary-900 text-white">
                          <th className="text-left px-4 py-3 font-medium">Category</th>
                          <th className="text-left px-4 py-3 font-medium">Cost</th>
                          <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {content.costOfLiving.items.map((item, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-warm-50'}>
                            <td className="px-4 py-3 text-warm-800 font-medium">{item.category}</td>
                            <td className="px-4 py-3 text-accent-600 font-bold">{item.cost}</td>
                            <td className="px-4 py-3 text-warm-600 text-sm hidden md:table-cell">{item.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Lifestyle Timeline */}
              {content.lifestyleTimeline && content.lifestyleTimeline.entries.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    {content.lifestyleTimeline.title || `A Typical Day in ${data.name}`}
                  </h2>
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-accent-200" />
                    <div className="space-y-6">
                      {content.lifestyleTimeline.entries.map((entry, i) => (
                        <div key={i} className="relative flex gap-6 items-start">
                          <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                            {entry.time}
                          </div>
                          <div className="flex-1 bg-white border border-warm-200 rounded-sm p-4 shadow-sm">
                            <h3 className="font-bold text-primary-900 mb-1">{entry.activity}</h3>
                            <p className="text-warm-600 text-sm">{entry.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Events & Fiestas */}
              {content.events && content.events.events.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    Events & Fiestas in {data.name}
                  </h2>
                  <p className="text-warm-700 mb-6">{content.events.intro}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {content.events.events.map((event, i) => (
                      <div key={i} className="border border-warm-200 rounded-sm p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-medium">
                            {event.month}
                          </div>
                          <div>
                            <h3 className="font-bold text-primary-900 mb-1">{event.name}</h3>
                            <p className="text-warm-600 text-sm">{event.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Schools */}
              {content.schools && content.schools.schools.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    Schools Near {data.name}
                  </h2>
                  <p className="text-warm-700 mb-6">{content.schools.intro}</p>
                  <div className="space-y-3">
                    {content.schools.schools.map((school, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 border border-warm-200 rounded-sm">
                        <span className="flex-shrink-0 text-2xl">🎓</span>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-bold text-primary-900">{school.name}</h3>
                            <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full text-xs font-medium">
                              {school.type}
                            </span>
                          </div>
                          <p className="text-warm-600 text-sm">{school.description}</p>
                          <p className="text-warm-500 text-xs mt-1">📍 {school.distance}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Nature & Activities */}
              {content.natureActivities && content.natureActivities.activities.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    Nature & Activities
                  </h2>
                  <p className="text-warm-700 mb-6">{content.natureActivities.intro}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {content.natureActivities.activities.map((activity, i) => (
                      <div key={i} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-sm p-4 border border-green-100">
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 text-xl">
                            {activity.type === 'Golf' ? '⛳' :
                             activity.type === 'Beach' || activity.type === 'Water Sports' ? '🏖️' :
                             activity.type === 'Hiking' || activity.type === 'Walking' ? '🥾' :
                             activity.type === 'Cycling' ? '🚴' :
                             activity.type === 'Nature Reserve' || activity.type === 'Nature' ? '🌿' :
                             activity.type === 'Bird Watching' ? '🦅' :
                             '🏞️'}
                          </span>
                          <div>
                            <h3 className="font-bold text-primary-900 mb-1">{activity.name}</h3>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{activity.type}</span>
                            <p className="text-warm-600 text-sm mt-2">{activity.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Expat Community */}
              {content.expatCommunity && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    Expat Community in {data.name}
                  </h2>
                  <div className="prose prose-lg max-w-none mb-6">
                    {content.expatCommunity.intro.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-warm-700">{paragraph}</p>
                    ))}
                  </div>
                  {content.expatCommunity.nationalities.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-medium text-primary-900 mb-3">International Community</h3>
                      <div className="flex flex-wrap gap-2">
                        {content.expatCommunity.nationalities.map((nat, i) => (
                          <span key={i} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                            {nat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {content.expatCommunity.highlights.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-3">
                      {content.expatCommunity.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-warm-50 rounded-sm">
                          <span className="text-accent-500">🤝</span>
                          <span className="text-warm-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Area Map */}
              {content.mapEmbed && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    {data.name} Location
                  </h2>
                  <div className="rounded-sm overflow-hidden border border-warm-200">
                    <iframe
                      src={content.mapEmbed}
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${data.name}`}
                    />
                  </div>
                </section>
              )}

              {/* Available Properties */}
              {developments && developments.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    New Build Properties in {data.name}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {developments.map((dev) => (
                      <Link
                        key={dev.slug}
                        href={`/developments/${dev.slug}`}
                        className="group bg-white border border-warm-200 rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={dev.image || FALLBACK_IMAGE}
                            alt={dev.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            unoptimized
                          />
                          {dev.price && (
                            <div className="absolute top-3 left-3">
                              <span className="bg-primary-900 text-white px-3 py-1 rounded-sm text-sm font-bold">
                                From €{dev.price.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-primary-900 group-hover:text-accent-600 transition-colors">
                            {dev.name}
                          </h3>
                          <p className="text-warm-600 text-sm">{dev.propertyType}</p>
                          {dev.bedrooms && (
                            <p className="text-warm-500 text-sm mt-1">
                              {dev.bedrooms} bedrooms
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Why Live Here */}
              {content.whyLiveHereSection.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    Why Live in {data.name}?
                  </h2>
                  <ul className="space-y-4">
                    {content.whyLiveHereSection.map((reason, i) => (
                      <li key={i} className="flex items-start gap-4 p-4 bg-accent-50 rounded-sm">
                        <span className="flex-shrink-0 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold">
                          {i + 1}
                        </span>
                        <span className="text-warm-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* FAQs */}
              {content.faqs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    Frequently Asked Questions about {data.name}
                  </h2>
                  <div className="space-y-4">
                    {content.faqs.map((faq, i) => (
                      <details key={i} className="group border border-warm-200 rounded-sm">
                        <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-primary-900 hover:bg-warm-50">
                          {faq.question}
                          <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                            ▼
                          </span>
                        </summary>
                        <div className="px-4 pb-4 text-warm-700">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Conclusion CTA */}
              <section className="bg-gradient-to-r from-accent-500 to-primary-800 rounded-sm p-8 text-white">
                <p className="text-lg mb-6">{content.conclusion}</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-sm font-medium transition-colors"
                  >
                    📱 WhatsApp Us
                  </a>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="inline-flex items-center gap-2 bg-white text-accent-500 hover:bg-gray-100 px-6 py-3 rounded-sm font-medium transition-colors"
                  >
                    📞 {CONTACT.phone}
                  </a>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Area Info Card */}
              <div className="bg-white border border-warm-200 rounded-sm p-6 shadow-lg sticky top-6">
                <h3 className="font-bold text-primary-900 text-xl mb-4">{data.name}</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-warm-500">Region</p>
                    <p className="font-bold text-primary-900">{data.region || 'Costa Blanca'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-warm-500">New Build Properties</p>
                    <p className="font-bold text-primary-900">{data.propertyCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-warm-500">Property Types</p>
                    <p className="font-bold text-primary-900">{data.propertyTypes.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-warm-500">Price Range</p>
                    <p className="font-bold text-primary-900">
                      €{data.priceRange.min.toLocaleString()} - €{data.priceRange.max.toLocaleString()}
                    </p>
                  </div>
                  {golf && golf.courses && (
                    <div>
                      <p className="text-sm text-warm-500">Golf Courses</p>
                      <p className="font-bold text-primary-900">{golf.courses.length} nearby</p>
                    </div>
                  )}
                </div>

                {/* External Links */}
                {externalLinks?.tourism?.url && (
                  <div className="mb-6 p-3 bg-warm-50 rounded-sm">
                    <a
                      href={externalLinks.tourism.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium text-sm"
                    >
                      🌐 Official {data.name} Tourism →
                    </a>
                  </div>
                )}

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-sm font-medium transition-colors"
                  >
                    📱 WhatsApp
                  </a>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-sm font-medium transition-colors"
                  >
                    📞 Call Now
                  </a>
                  <a
                    href={CONTACT.habeno}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-warm-700 text-center py-3 rounded-sm font-medium transition-colors"
                  >
                    💰 Get Mortgage Quote
                  </a>
                </div>
              </div>

              {/* Other Areas */}
              <div className="bg-warm-50 rounded-sm p-6">
                <h3 className="font-bold text-primary-900 mb-4">Explore Other Areas</h3>
                <div className="space-y-2">
                  <Link href="/areas/torrevieja" className="block text-blue-600 hover:underline">
                    Torrevieja
                  </Link>
                  <Link href="/areas/javea" className="block text-blue-600 hover:underline">
                    Jávea
                  </Link>
                  <Link href="/areas/moraira" className="block text-blue-600 hover:underline">
                    Moraira
                  </Link>
                  <Link href="/areas/benidorm" className="block text-blue-600 hover:underline">
                    Benidorm
                  </Link>
                  <Link href="/areas/calpe" className="block text-blue-600 hover:underline">
                    Calpe
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
