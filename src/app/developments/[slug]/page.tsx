// ISR: Regenerate pages every hour for fresh data
export const revalidate = 3600;

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import {
  getAllDevelopmentSlugs,
  getDevelopmentBySlug,
  getDevelopmentUnits,
  getDevelopmentsByBuilder,
  getDevelopmentsByTown,
  Development,
} from '@/lib/development-service';
import { formatPrice, formatArea } from '@/lib/unified-property';
import {
  breadcrumbSchema,
  toJsonLd,
  homeAndConstructionBusinessSchema,
  articleSchema,
  developmentSchema,
  faqSchema,
  aggregateRatingSchema,
} from '@/lib/schema';

// Contact info - centralized
const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  email: 'info@newbuildhomescostablanca.com',
};

// Distance data for common locations (would ideally be in JSON content files)
const LOCATION_DISTANCES: Record<string, {
  airport: string;
  beach: string;
  hospital: string;
  golf: string;
  shopping: string;
  restaurants: string;
}> = {
  'algorfa': {
    airport: '25 min to Alicante (ALC)',
    beach: '15 min to Guardamar',
    hospital: '20 min to Torrevieja Hospital',
    golf: 'Frontline to La Finca Golf',
    shopping: '10 min to La Zenia Boulevard',
    restaurants: '5 min to local restaurants',
  },
  'la-finca': {
    airport: '25 min to Alicante (ALC)',
    beach: '15 min to Guardamar',
    hospital: '20 min to Torrevieja Hospital',
    golf: 'Within La Finca Golf Resort',
    shopping: '10 min to La Zenia Boulevard',
    restaurants: 'Walking distance to clubhouse',
  },
  'javea': {
    airport: '90 min to Alicante (ALC)',
    beach: '5 min to Arenal Beach',
    hospital: '5 min to Jávea Hospital',
    golf: '15 min to La Sella Golf',
    shopping: '5 min to Jávea Port',
    restaurants: '5 min to Old Town',
  },
  'default': {
    airport: 'Alicante Airport nearby',
    beach: 'Beaches within 30 min',
    hospital: 'Hospital nearby',
    golf: 'Golf courses nearby',
    shopping: 'Shopping centers nearby',
    restaurants: 'Local restaurants nearby',
  }
};

// Enhanced content interface (for manually curated developments)
interface EnhancedContent {
  slug: string;
  projectName: string;
  metaTitle: string;
  metaDescription: string;
  content: {
    heroIntro: string;
    locationSection: {
      intro: string;
      highlights: string[];
    };
    propertyFeatures: {
      intro: string;
      features: string[];
    };
    investmentSection: string;
    whyBuySection: string[];
    faqs: { question: string; answer: string }[];
    conclusion: string;
  };
  property: {
    ref: string;
    price: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    builtSize: number | null;
    plotSize: number | null;
    town: string;
    province: string;
    propertyType: string;
    developer: string;
    developerSlug: string;
    images: string[];
  };
  // NEW: Enhanced fields for 10/10 page
  distances?: {
    airport?: string;
    beach?: string;
    hospital?: string;
    golf?: string;
    shopping?: string;
    restaurants?: string;
  };
  paymentSchedule?: {
    deposit: string;
    construction: string;
    completion: string;
  };
  unitsAvailable?: number;
  totalUnits?: number;
  golfCourse?: {
    id: string;
    name: string;
    slug: string;
    distance: string;
    description: string;
  };
  nearbyAttractions?: string[];
  schemaProduct?: object;
  schemaFAQ?: object;
  schemaBreadcrumb?: object;
  imageAlts?: { url: string; alt: string }[];
}

// Builder content interface
interface BuilderContent {
  slug: string;
  name: string;
  content?: {
    heroIntro?: string;
    aboutSection?: string;
    qualitySection?: {
      intro: string;
      standards: string[];
    };
    whyChooseSection?: string[];
  };
}

// Get builder content from JSON
function getBuilderContent(builderSlug: string): BuilderContent | null {
  const contentPath = path.join(process.cwd(), 'src', 'content', 'builders', `${builderSlug}.json`);
  if (!fs.existsSync(contentPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
  } catch {
    return null;
  }
}

// Check for enhanced content JSON
// Priority: 1) projects/ directory (AI-generated development content)
//           2) developments/ directory (only if it has correct nested format)
function getEnhancedContent(slug: string): EnhancedContent | null {
  // First check projects directory (AI-generated development/project content from generate-all-content.ts)
  const projectPath = path.join(process.cwd(), 'src', 'content', 'projects', `${slug}.json`);
  if (fs.existsSync(projectPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(projectPath, 'utf-8'));
      if (data.projectName && data.content) {
        return data;
      }
    } catch { /* skip invalid files */ }
  }

  // Fallback: check developments directory (legacy Miralbo content files with nested format)
  const contentPath = path.join(process.cwd(), 'src', 'content', 'developments', `${slug}.json`);
  if (!fs.existsSync(contentPath)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
    // Only use if it has the correct nested format (projectName + content wrapper)
    // Skip flat-format files (those are for property pages via ai-content-loader.ts)
    if (data.projectName && data.content) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

// Get all slugs from enhanced content sources (projects/ and correctly-formatted developments/)
function getEnhancedSlugs(): string[] {
  const slugs: string[] = [];

  // Read from projects directory (AI-generated development/project content)
  const projectsDir = path.join(process.cwd(), 'src', 'content', 'projects');
  if (fs.existsSync(projectsDir)) {
    slugs.push(
      ...fs.readdirSync(projectsDir)
        .filter(file => file.endsWith('.json') && file !== 'index.json')
        .map(file => file.replace('.json', ''))
    );
  }

  // Also read from developments directory, but ONLY files with correct nested format
  // (skip flat-format property files like n7911.json — those are for /properties/ pages)
  const contentDir = path.join(process.cwd(), 'src', 'content', 'developments');
  if (fs.existsSync(contentDir)) {
    for (const file of fs.readdirSync(contentDir)) {
      if (!file.endsWith('.json') || file === 'index.json') continue;
      try {
        const data = JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf-8'));
        if (data.projectName && data.content) {
          slugs.push(file.replace('.json', ''));
        }
      } catch { /* skip invalid files */ }
    }
  }

  return [...new Set(slugs)];
}

export async function generateStaticParams() {
  const enhancedSlugs = getEnhancedSlugs();
  const feedSlugs = await getAllDevelopmentSlugs();
  const allSlugs = [...new Set([...enhancedSlugs, ...feedSlugs])];
  return allSlugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const enhanced = getEnhancedContent(slug);

  if (enhanced && enhanced.property) {
    const images = enhanced.property.images || [];
    return {
      title: enhanced.metaTitle || 'Development',
      description: enhanced.metaDescription || '',
      openGraph: {
        title: enhanced.metaTitle || 'Development',
        description: enhanced.metaDescription || '',
        images: images.slice(0, 3),
      },
    };
  }

  const development = await getDevelopmentBySlug(slug);
  if (!development || !development.name) return { title: 'Development Not Found' };

  const title = `${development.name} | New Build in ${development.town || 'Costa Blanca'} from ${formatPrice(development.priceFrom || 0)}`;
  const description = `Discover ${development.name} by ${development.developer || 'Developer'} in ${development.town || 'Costa Blanca'}. ${development.totalUnits || 0} units from ${formatPrice(development.priceFrom || 0)}. ${development.status === 'key-ready' ? 'Key ready!' : `Delivery: ${development.deliveryQuarter || 'TBA'}`}`;

  return {
    title,
    description,
    openGraph: { title: development.name, description, images: development.mainImage ? [development.mainImage] : undefined },
  };
}

export default async function DevelopmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const enhanced = getEnhancedContent(slug);

  if (enhanced) {
    // Validate enhanced content has required fields
    if (!enhanced.property || !enhanced.projectName) {
      notFound();
    }

    const developerSlug = enhanced.property.developerSlug || 'unknown';
    const town = enhanced.property.town || 'Costa Blanca';

    const [similarDevelopmentsResult, builderContent, developmentsInTownResult] = await Promise.all([
      getDevelopmentsByBuilder(developerSlug),
      getBuilderContent(developerSlug),
      getDevelopmentsByTown(town),
    ]);

    // Ensure arrays are always defined
    const similarDevelopments = Array.isArray(similarDevelopmentsResult) ? similarDevelopmentsResult : [];
    const developmentsInTown = Array.isArray(developmentsInTownResult) ? developmentsInTownResult : [];

    const similarByBuilder = similarDevelopments.filter(d => d.slug !== slug).slice(0, 3);
    const nearbyDevelopments = developmentsInTown.filter(d => d.slug !== slug).slice(0, 3);

    return (
      <EnhancedDevelopmentPage
        data={enhanced}
        similarDevelopments={similarByBuilder}
        nearbyDevelopments={nearbyDevelopments}
        builderContent={builderContent}
      />
    );
  }

  const development = await getDevelopmentBySlug(slug);

  // Guard against missing development or incomplete required fields
  if (!development || !development.name || !development.slug) {
    notFound();
  }

  return <AutoGeneratedDevelopmentPage development={development} />;
}

// ============================================================================
// ENHANCED DEVELOPMENT PAGE - 10/10 VERSION
// ============================================================================
function EnhancedDevelopmentPage({
  data,
  similarDevelopments = [],
  nearbyDevelopments = [],
  builderContent = null,
}: {
  data: EnhancedContent;
  similarDevelopments?: Development[];
  nearbyDevelopments?: Development[];
  builderContent?: BuilderContent | null;
}) {
  const { content, property, schemaProduct, schemaFAQ, schemaBreadcrumb, imageAlts } = data;

  // Get distances - use provided or lookup by town
  const townKey = property.town.toLowerCase().replace(/\s+/g, '-');
  const distances = data.distances || LOCATION_DISTANCES[townKey] || LOCATION_DISTANCES['default'];

  // Get image alt text
  const getAlt = (url: string, index: number) => {
    const found = imageAlts?.find(a => a.url === url);
    return found?.alt || `${data.projectName} - Image ${index + 1}`;
  };

  // Determine status
  const isKeyReady = data.projectName.toLowerCase().includes('key ready') ||
                     content.heroIntro.toLowerCase().includes('key ready');
  const isOffPlan = content.heroIntro.toLowerCase().includes('off-plan') ||
                    content.heroIntro.toLowerCase().includes('q1 2027') ||
                    content.heroIntro.toLowerCase().includes('q2 2027');

  return (
    <>
      {/* Schema Markup */}
      {schemaProduct && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }} />}
      {schemaFAQ && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />}
      {schemaBreadcrumb && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />}

      {/* ================================================================== */}
      {/* STICKY CTA BAR - Always visible on scroll */}
      {/* ================================================================== */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary-900 border-t border-primary-700 z-50 lg:hidden">
        <div className="flex">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
            className="flex-1 flex items-center justify-center gap-2 bg-accent-500 text-white py-4 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            Call Now
          </a>
        </div>
      </div>

      <main className="min-h-screen bg-warm-50 pb-20 lg:pb-0">
        {/* ================================================================== */}
        {/* HERO SECTION */}
        {/* ================================================================== */}
        <section className="relative h-[70vh] min-h-[500px] max-h-[700px]">
          {property.images[0] && (
            <Image
              src={property.images[0]}
              alt={getAlt(property.images[0], 0)}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              {/* Breadcrumb */}
              <nav className="text-white/70 text-sm mb-4 flex flex-wrap items-center gap-1">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <Link href="/developments" className="hover:text-white transition-colors">Developments</Link>
                <span>›</span>
                <Link href={`/areas/${property.town.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white transition-colors">{property.town}</Link>
                <span>›</span>
                <span className="text-white">{data.projectName}</span>
              </nav>

              {/* Status Badge */}
              <div className="flex flex-wrap gap-2 mb-4">
                {isKeyReady && (
                  <span className="bg-success-500 text-white text-sm font-bold px-4 py-1.5 rounded-sm inline-flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    Key Ready
                  </span>
                )}
                {isOffPlan && (
                  <span className="bg-primary-600 text-white text-sm font-bold px-4 py-1.5 rounded-sm">
                    Off-Plan
                  </span>
                )}
                <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-sm">
                  by <Link href={`/builders/${property.developerSlug}`} className="underline hover:no-underline">{property.developer}</Link>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                {data.projectName}
              </h1>

              {/* Location */}
              <p className="text-white/90 text-lg mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <Link href={`/areas/${property.town.toLowerCase().replace(/\s+/g, '-')}`} className="hover:underline">
                  {property.town}, {property.province}
                </Link>
                {data.golfCourse && (
                  <>
                    <span className="text-white/50">•</span>
                    <Link href={`/golf/${data.golfCourse.slug}`} className="text-success-400 hover:underline flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" /></svg>
                      {data.golfCourse.distance}
                    </Link>
                  </>
                )}
              </p>

              {/* Key Stats Row */}
              <div className="flex flex-wrap gap-3 md:gap-6">
                {/* Price */}
                <div className="bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 border border-white/20">
                  <div className="text-white/70 text-xs uppercase tracking-wide mb-1">From</div>
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {property.price ? formatPrice(property.price) : 'POA'}
                  </div>
                </div>
                {/* Bedrooms */}
                {property.bedrooms && (
                  <div className="bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 border border-white/20">
                    <div className="text-white/70 text-xs uppercase tracking-wide mb-1">Bedrooms</div>
                    <div className="text-2xl font-bold text-white">{property.bedrooms}</div>
                  </div>
                )}
                {/* Size */}
                {property.builtSize && (
                  <div className="bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 border border-white/20">
                    <div className="text-white/70 text-xs uppercase tracking-wide mb-1">Built Size</div>
                    <div className="text-2xl font-bold text-white">{property.builtSize}m²</div>
                  </div>
                )}
                {/* Plot */}
                {property.plotSize && (
                  <div className="bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 border border-white/20">
                    <div className="text-white/70 text-xs uppercase tracking-wide mb-1">Plot Size</div>
                    <div className="text-2xl font-bold text-white">{property.plotSize}m²</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* QUICK ACTION BAR - Desktop */}
        {/* ================================================================== */}
        <section className="bg-primary-900 py-4 hidden lg:block sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <span className="text-white font-semibold">{data.projectName}</span>
                <span className="text-accent-400 font-bold text-xl">
                  {property.price ? `From ${formatPrice(property.price)}` : 'Price on Request'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="#inquiry-form"
                  className="bg-white text-primary-900 px-5 py-2.5 rounded font-medium hover:bg-warm-100 transition-colors"
                >
                  Request Floor Plans
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-5 py-2.5 rounded font-medium hover:bg-[#20bd5a] transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="bg-accent-500 text-white px-5 py-2.5 rounded font-medium hover:bg-accent-600 transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* MAIN CONTENT */}
        {/* ================================================================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* LEFT COLUMN - Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Introduction */}
              <section>
                <div className="prose prose-lg max-w-none">
                  {content.heroIntro.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-warm-700 leading-relaxed text-lg">{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Image Gallery */}
              {property.images.length > 1 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center gap-3">
                    <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Gallery
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.images.slice(0, 9).map((image, i) => (
                      <div key={i} className={`relative rounded-lg overflow-hidden ${i === 0 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-[4/3]'}`}>
                        <Image src={image} alt={getAlt(image, i)} fill className="object-cover hover:scale-105 transition-transform duration-500" unoptimized />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ============================================================ */}
              {/* DISTANCE MATRIX - Key for SEO and user experience */}
              {/* ============================================================ */}
              <section className="bg-white rounded-xl p-6 border border-warm-200 shadow-sm">
                <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Distances & Amenities
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Airport */}
                  <div className="flex items-start gap-3 p-4 bg-warm-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </div>
                    <div>
                      <div className="font-semibold text-primary-900">Airport</div>
                      <div className="text-warm-600 text-sm">{distances.airport}</div>
                    </div>
                  </div>
                  {/* Beach */}
                  <div className="flex items-start gap-3 p-4 bg-warm-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                    </div>
                    <div>
                      <div className="font-semibold text-primary-900">Beach</div>
                      <div className="text-warm-600 text-sm">{distances.beach}</div>
                    </div>
                  </div>
                  {/* Golf */}
                  <div className="flex items-start gap-3 p-4 bg-warm-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" /></svg>
                    </div>
                    <div>
                      <div className="font-semibold text-primary-900">Golf</div>
                      <div className="text-warm-600 text-sm">{distances.golf}</div>
                    </div>
                  </div>
                  {/* Hospital */}
                  <div className="flex items-start gap-3 p-4 bg-warm-50 rounded-lg">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                    <div>
                      <div className="font-semibold text-primary-900">Hospital</div>
                      <div className="text-warm-600 text-sm">{distances.hospital}</div>
                    </div>
                  </div>
                  {/* Shopping */}
                  <div className="flex items-start gap-3 p-4 bg-warm-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </div>
                    <div>
                      <div className="font-semibold text-primary-900">Shopping</div>
                      <div className="text-warm-600 text-sm">{distances.shopping}</div>
                    </div>
                  </div>
                  {/* Restaurants */}
                  <div className="flex items-start gap-3 p-4 bg-warm-50 rounded-lg">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                    </div>
                    <div>
                      <div className="font-semibold text-primary-900">Restaurants</div>
                      <div className="text-warm-600 text-sm">{distances.restaurants}</div>
                    </div>
                  </div>
                </div>

                {/* Link to area page */}
                <div className="mt-6 pt-6 border-t border-warm-200">
                  <Link
                    href={`/areas/${property.town.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium"
                  >
                    Explore {property.town} area guide
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </section>

              {/* Location Section */}
              <section>
                <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Location: {property.town}
                </h2>
                <div className="prose prose-lg max-w-none mb-6">
                  {content.locationSection.intro.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-warm-700">{paragraph}</p>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {content.locationSection.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-success-50 rounded-lg border border-success-200">
                      <svg className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span className="text-warm-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Property Features */}
              <section>
                <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  Property Features & Specifications
                </h2>
                <p className="text-warm-700 mb-6 text-lg">{content.propertyFeatures.intro}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {content.propertyFeatures.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-warm-200">
                      <span className="text-accent-500 text-lg">✓</span>
                      <span className="text-warm-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Payment Schedule (for off-plan) */}
              {isOffPlan && (
                <section className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-200">
                  <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center gap-3">
                    <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    Off-Plan Payment Schedule
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-5 text-center shadow-sm">
                      <div className="text-3xl font-bold text-accent-500 mb-2">30%</div>
                      <div className="font-semibold text-primary-900">Reservation Deposit</div>
                      <div className="text-warm-500 text-sm mt-1">On signing contracts</div>
                    </div>
                    <div className="bg-white rounded-lg p-5 text-center shadow-sm">
                      <div className="text-3xl font-bold text-primary-700 mb-2">40%</div>
                      <div className="font-semibold text-primary-900">During Construction</div>
                      <div className="text-warm-500 text-sm mt-1">Stage payments</div>
                    </div>
                    <div className="bg-white rounded-lg p-5 text-center shadow-sm">
                      <div className="text-3xl font-bold text-success-600 mb-2">30%</div>
                      <div className="font-semibold text-primary-900">On Completion</div>
                      <div className="text-warm-500 text-sm mt-1">Key handover</div>
                    </div>
                  </div>
                  <p className="text-warm-600 text-sm mt-4 text-center">
                    Payment schedules can be flexible. Contact us to discuss options.
                  </p>
                </section>
              )}

              {/* Investment Section */}
              <section>
                <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  Investment Potential
                </h2>
                <div className="prose prose-lg max-w-none">
                  {content.investmentSection.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-warm-700">{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Why Choose This Development */}
              <section className="bg-accent-50 rounded-xl p-6 border border-accent-200">
                <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  Why Choose {data.projectName}?
                </h2>
                <div className="space-y-4">
                  {content.whyBuySection.map((reason, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white p-4 rounded-lg border border-accent-200">
                      <span className="flex-shrink-0 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </span>
                      <span className="text-warm-700">{reason}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQs */}
              <section id="faqs">
                <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {content.faqs.map((faq, i) => (
                    <details key={i} className="group bg-white border border-warm-200 rounded-lg overflow-hidden">
                      <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-primary-900 hover:bg-warm-50 transition-colors">
                        {faq.question}
                        <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-5 pb-5 text-warm-700 border-t border-warm-100 pt-4">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* About the Builder */}
              {builderContent && (
                <section className="bg-white border border-warm-200 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center gap-3">
                    <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    About {property.developer}
                  </h2>
                  {builderContent.content?.heroIntro && (
                    <div className="prose max-w-none mb-6">
                      {builderContent.content.heroIntro.split('\n\n').slice(0, 2).map((paragraph, i) => (
                        <p key={i} className="text-warm-700">{paragraph}</p>
                      ))}
                    </div>
                  )}
                  <Link
                    href={`/builders/${property.developerSlug}`}
                    className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium"
                  >
                    View all {property.developer} developments
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </section>
              )}

              {/* Similar Developments */}
              {(similarDevelopments.length > 0 || nearbyDevelopments.length > 0) && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    {similarDevelopments.length > 0 ? `More from ${property.developer}` : `More in ${property.town}`}
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {(similarDevelopments.length > 0 ? similarDevelopments : nearbyDevelopments).map((dev) => (
                      <Link
                        key={dev.slug}
                        href={`/developments/${dev.slug}`}
                        className="group bg-white border border-warm-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                      >
                        <div className="relative h-40 bg-warm-100">
                          {dev.mainImage && (
                            <Image src={dev.mainImage} alt={dev.name} fill className="object-cover group-hover:scale-105 transition-transform" unoptimized />
                          )}
                          {dev.status === 'key-ready' && (
                            <span className="absolute top-2 left-2 bg-success-500 text-white text-xs font-bold px-2 py-1 rounded">Key Ready</span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-primary-900 group-hover:text-accent-600 transition-colors">{dev.name}</h3>
                          <p className="text-warm-500 text-sm">{dev.town}</p>
                          <p className="text-accent-600 font-bold mt-2">From {formatPrice(dev.priceFrom)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* ============================================================ */}
            {/* RIGHT COLUMN - Sidebar */}
            {/* ============================================================ */}
            <div className="lg:col-span-1 space-y-6">
              {/* Price Card */}
              <div className="bg-white border border-warm-200 rounded-xl p-6 shadow-lg sticky top-24">
                <div className="text-center mb-6">
                  {property.price ? (
                    <>
                      <p className="text-warm-500 text-sm uppercase tracking-wide mb-1">Price From</p>
                      <p className="text-4xl font-bold text-accent-500">{formatPrice(property.price)}</p>
                    </>
                  ) : (
                    <p className="text-2xl font-semibold text-primary-900">Price on Request</p>
                  )}
                  {data.unitsAvailable && data.totalUnits && (
                    <p className="text-success-600 font-medium mt-2">
                      {data.unitsAvailable} of {data.totalUnits} units remaining
                    </p>
                  )}
                </div>

                {/* Key specs */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {property.bedrooms && (
                    <div className="text-center p-3 bg-warm-50 rounded-lg">
                      <p className="text-warm-500 text-xs uppercase">Beds</p>
                      <p className="font-bold text-primary-900 text-xl">{property.bedrooms}</p>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="text-center p-3 bg-warm-50 rounded-lg">
                      <p className="text-warm-500 text-xs uppercase">Baths</p>
                      <p className="font-bold text-primary-900 text-xl">{property.bathrooms}</p>
                    </div>
                  )}
                  {property.builtSize && (
                    <div className="text-center p-3 bg-warm-50 rounded-lg">
                      <p className="text-warm-500 text-xs uppercase">Built</p>
                      <p className="font-bold text-primary-900 text-xl">{property.builtSize}m²</p>
                    </div>
                  )}
                  {property.plotSize && (
                    <div className="text-center p-3 bg-warm-50 rounded-lg">
                      <p className="text-warm-500 text-xs uppercase">Plot</p>
                      <p className="font-bold text-primary-900 text-xl">{property.plotSize}m²</p>
                    </div>
                  )}
                </div>

                <p className="text-xs text-warm-400 text-center mb-6">Ref: {property.ref}</p>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3.5 px-4 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Us
                  </a>
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                    className="w-full flex items-center justify-center gap-2 bg-primary-900 hover:bg-primary-800 text-white font-semibold py-3.5 px-4 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {CONTACT.phone}
                  </a>
                </div>
              </div>

              {/* Inquiry Form */}
              <div id="inquiry-form" className="bg-white border border-warm-200 rounded-xl overflow-hidden shadow-lg">
                <div className="bg-primary-900 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">Get Floor Plans & Availability</h3>
                  <p className="text-warm-300 text-sm mt-1">We'll respond within 2 hours</p>
                </div>
                <form
                  name={`development-inquiry-${data.slug}`}
                  method="POST"
                  data-netlify="true"
                  className="p-6 space-y-4"
                >
                  <input type="hidden" name="form-name" value={`development-inquiry-${data.slug}`} />
                  <input type="hidden" name="development" value={data.projectName} />
                  <input type="hidden" name="reference" value={property.ref} />

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary-900 mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="John Smith"
                      className="w-full px-4 py-3 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary-900 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-primary-900 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="+44 7XXX XXXXXX"
                      className="w-full px-4 py-3 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-primary-900 mb-1">I'm interested in:</label>
                    <select
                      name="interest"
                      id="interest"
                      className="w-full px-4 py-3 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors bg-white"
                    >
                      <option value="floor-plans">Floor plans & specifications</option>
                      <option value="availability">Current availability</option>
                      <option value="viewing">Arranging a viewing</option>
                      <option value="pricing">Detailed pricing</option>
                      <option value="investment">Investment information</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary-900 mb-1">Message (optional)</label>
                    <textarea
                      name="message"
                      id="message"
                      rows={3}
                      placeholder="Any specific questions?"
                      className="w-full px-4 py-3 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-4 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Send Inquiry
                  </button>

                  <p className="text-xs text-warm-500 text-center">
                    By submitting, you agree to our privacy policy. We never share your details.
                  </p>
                </form>
              </div>

              {/* Quick Links */}
              <div className="bg-warm-50 border border-warm-200 rounded-xl p-6">
                <h3 className="font-bold text-primary-900 mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href={`/builders/${property.developerSlug}`} className="flex items-center gap-2 text-warm-700 hover:text-accent-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      View all {property.developer} developments
                    </Link>
                  </li>
                  <li>
                    <Link href={`/areas/${property.town.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-2 text-warm-700 hover:text-accent-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                      {property.town} area guide
                    </Link>
                  </li>
                  {data.golfCourse && (
                    <li>
                      <Link href={`/golf/${data.golfCourse.slug}`} className="flex items-center gap-2 text-warm-700 hover:text-accent-600 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" /></svg>
                        {data.golfCourse.name}
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link href="/developments" className="flex items-center gap-2 text-warm-700 hover:text-accent-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                      Browse all developments
                    </Link>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* FINAL CTA SECTION */}
        {/* ================================================================== */}
        <section className="bg-primary-900 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Make {data.projectName} Your New Home?
            </h2>
            <p className="text-warm-300 mb-8 max-w-2xl mx-auto">
              Get detailed floor plans, current availability, and arrange a viewing. Our team is here to help you every step of the way.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us Now
              </a>
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-white/20"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// ============================================================================
// AUTO-GENERATED DEVELOPMENT PAGE (fallback for non-enhanced developments)
// ============================================================================
async function AutoGeneratedDevelopmentPage({ development }: { development: Development }) {
  // Safe defaults for potentially missing fields
  const developerSlug = development.developerSlug || 'unknown';
  const mainImage = development.mainImage || '/images/placeholder-property.jpg';
  const developer = development.developer || 'Developer';
  const town = development.town || 'Costa Blanca';
  const region = development.region || 'Spain';
  const priceFrom = development.priceFrom || 0;
  const totalUnits = development.totalUnits || 0;
  const bedroomRange = development.bedroomRange || 'N/A';

  const [unitsResult, builderDevelopmentsResult] = await Promise.all([
    getDevelopmentUnits(development.slug),
    getDevelopmentsByBuilder(developerSlug),
  ]);

  // Ensure arrays are always defined
  const units = Array.isArray(unitsResult) ? unitsResult : [];
  const builderDevelopments = Array.isArray(builderDevelopmentsResult) ? builderDevelopmentsResult : [];

  const otherByBuilder = builderDevelopments.filter((d: Development) => d.slug !== development.slug).slice(0, 4);

  // Schema markup
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Developments', url: 'https://newbuildhomescostablanca.com/developments/' },
    { name: development.name, url: `https://newbuildhomescostablanca.com/developments/${development.slug}/` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="relative bg-primary-900 py-20">
          <div className="absolute inset-0">
            {mainImage && (
              <Image src={mainImage} alt={development.name} fill className="object-cover opacity-30" priority unoptimized />
            )}
          </div>
          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/developments" className="hover:text-white">Developments</Link>
              <span className="mx-2">›</span>
              <span className="text-white">{development.name}</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{development.name}</h1>
            <p className="text-warm-300 text-lg mb-6">
              by <Link href={`/builders/${developerSlug}`} className="text-accent-400 hover:underline">{developer}</Link>
              {' • '}{town}, {region}
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur px-5 py-3 rounded">
                <div className="text-2xl font-bold text-white">{formatPrice(priceFrom)}</div>
                <div className="text-warm-400 text-sm">From</div>
              </div>
              <div className="bg-white/10 backdrop-blur px-5 py-3 rounded">
                <div className="text-2xl font-bold text-white">{totalUnits}</div>
                <div className="text-warm-400 text-sm">Units</div>
              </div>
              <div className="bg-white/10 backdrop-blur px-5 py-3 rounded">
                <div className="text-2xl font-bold text-white">{bedroomRange}</div>
                <div className="text-warm-400 text-sm">Bedrooms</div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Available Units</h2>
              {units.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-5">
                  {units.map((unit: { id: string; ref: string; images?: string[]; bedrooms: number | null; bathrooms: number | null; propertyType: string; price: number | null; size: number | null }) => (
                    <Link key={unit.id || unit.ref} href={`/properties/${unit.ref}`} className="group bg-white rounded-lg overflow-hidden border border-warm-200 hover:shadow-lg transition-all">
                      <div className="relative h-48">
                        <Image src={unit.images?.[0] || '/images/placeholder-property.jpg'} alt={`${unit.bedrooms || 0} bed ${unit.propertyType || 'Property'}`} fill className="object-cover" unoptimized />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-primary-900 group-hover:text-accent-600">{unit.bedrooms || 0} Bed {unit.propertyType || 'Property'}</h3>
                        <p className="text-warm-500 text-sm">{unit.bathrooms || 0} bath • {unit.size || 0}m²</p>
                        <p className="text-accent-600 font-bold mt-2">{formatPrice(unit.price || 0)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-warm-600">Contact us for available units.</p>
              )}
            </div>

            <div>
              <div className="bg-white border border-warm-200 rounded-lg p-6 sticky top-6">
                <h3 className="text-xl font-bold text-primary-900 mb-4">Interested?</h3>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 mb-3">
                  WhatsApp Us
                </a>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="w-full bg-primary-900 text-white py-3 rounded-lg font-medium flex items-center justify-center">
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
