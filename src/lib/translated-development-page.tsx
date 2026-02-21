/**
 * Shared Translated Development Page
 * ====================================
 * Provides generateMetadata and page component for translated development pages.
 * Each language's developments/[slug]/page.tsx imports from here with their lang code.
 *
 * Loads translated development content from JSON when available, falls back to English.
 * If no enhanced content exists at all, falls back to the auto-generated feed page.
 */

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import LeadForm from '@/components/LeadForm';
import NewsletterCTA from '@/components/NewsletterCTA';
import {
  getAllDevelopmentSlugs,
  getDevelopmentBySlug,
  getDevelopmentUnits,
  getDevelopmentsByBuilder,
  getDevelopmentsByTown,
  Development,
} from '@/lib/development-service';
import { formatPrice, formatArea } from '@/lib/unified-property';
import { getVideosForDevelopment } from '@/lib/video-mapping';
import VideoCard from '@/components/VideoCard';
import {
  breadcrumbSchema,
  toJsonLd,
  developmentSchema,
  faqSchema,
  realEstateListingSchema,
} from '@/lib/schema';

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  email: 'info@newbuildhomescostablanca.com',
};

const BASE_URL = 'https://newbuildhomescostablanca.com';

// ============================================================================
// TYPES
// ============================================================================

interface EnhancedContent {
  slug: string;
  projectName: string;
  metaTitle: string;
  metaDescription: string;
  content: {
    heroIntro: string;
    locationSection: { intro: string; highlights: string[] };
    propertyFeatures: { intro: string; features: string[] };
    investmentSection: string;
    whyBuySection: string[];
    faqs: { question: string; answer: string }[];
    conclusion: string;
    areaSection?: string;
    lifestyleSection?: string;
    lifeAndAmenities?: any;
    internalLinks?: any;
    buyerPersona?: any;
    priceComparison?: any;
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
  distances?: any;
  golfCourse?: any;
  imageAlts?: { url: string; alt: string }[];
}

// ============================================================================
// CONTENT LOADING
// ============================================================================

function getEnhancedContent(slug: string, lang?: string): EnhancedContent | null {
  const projectsDir = path.join(process.cwd(), 'src', 'content', 'projects');
  const developmentsDir = path.join(process.cwd(), 'src', 'content', 'developments');

  // Try translated project content first
  if (lang && lang !== 'en') {
    const langProjectPath = path.join(projectsDir, lang, `${slug}.json`);
    if (fs.existsSync(langProjectPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(langProjectPath, 'utf-8'));
        if (data.projectName && data.content) return data;
      } catch { /* fall through */ }
    }
  }

  // English projects directory
  const projectPath = path.join(projectsDir, `${slug}.json`);
  if (fs.existsSync(projectPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(projectPath, 'utf-8'));
      if (data.projectName && data.content) return data;
    } catch { /* fall through */ }
  }

  // Check developments directory (only nested format with projectName + content)
  if (lang && lang !== 'en') {
    const langDevPath = path.join(developmentsDir, lang, `${slug}.json`);
    if (fs.existsSync(langDevPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(langDevPath, 'utf-8'));
        if (data.projectName && data.content) return data;
      } catch { /* fall through */ }
    }
  }

  const devPath = path.join(developmentsDir, `${slug}.json`);
  if (fs.existsSync(devPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(devPath, 'utf-8'));
      if (data.projectName && data.content) return data;
    } catch { /* fall through */ }
  }

  return null;
}

function getEnhancedSlugs(): string[] {
  const slugs: string[] = [];
  const projectsDir = path.join(process.cwd(), 'src', 'content', 'projects');
  if (fs.existsSync(projectsDir)) {
    slugs.push(...fs.readdirSync(projectsDir).filter(f => f.endsWith('.json') && f !== 'index.json').map(f => f.replace('.json', '')));
  }
  return [...new Set(slugs)];
}

// ============================================================================
// UI STRINGS
// ============================================================================

interface DevStrings {
  from: string;
  bedrooms: string;
  builtSize: string;
  plotSize: string;
  keyReady: string;
  offPlan: string;
  gallery: string;
  videoTour: string;
  propertyFeatures: string;
  area: string;
  lifestyle: string;
  investment: string;
  whyBuy: string;
  faq: string;
  conclusion: string;
  requestFloorPlans: string;
  interestedInProperty: string;
  sendInquiry: string;
  similarDevelopments: string;
  nearbyDevelopments: string;
  availableUnits: string;
  contactUs: string;
  callNow: string;
}

const STRINGS: Record<string, DevStrings> = {
  en: { from: 'From', bedrooms: 'Bedrooms', builtSize: 'Built Size', plotSize: 'Plot Size', keyReady: 'Key Ready', offPlan: 'Off-Plan', gallery: 'Gallery', videoTour: 'Video Tour', propertyFeatures: 'Property Features', area: 'The Area', lifestyle: 'Lifestyle', investment: 'Investment Potential', whyBuy: 'Why Buy Here', faq: 'Frequently Asked Questions', conclusion: 'Summary', requestFloorPlans: 'Request Floor Plans', interestedInProperty: 'Interested in this property?', sendInquiry: 'Send Inquiry', similarDevelopments: 'Similar Developments', nearbyDevelopments: 'Nearby Developments', availableUnits: 'Available Units', contactUs: 'Contact us for details', callNow: 'Call Now' },
  sv: { from: 'Från', bedrooms: 'Sovrum', builtSize: 'Boarea', plotSize: 'Tomt', keyReady: 'Nyckelfärdig', offPlan: 'Ritning', gallery: 'Galleri', videoTour: 'Videotur', propertyFeatures: 'Egenskaper', area: 'Området', lifestyle: 'Livsstil', investment: 'Investeringspotential', whyBuy: 'Varför köpa här', faq: 'Vanliga frågor', conclusion: 'Sammanfattning', requestFloorPlans: 'Begär planritningar', interestedInProperty: 'Intresserad av denna fastighet?', sendInquiry: 'Skicka förfrågan', similarDevelopments: 'Liknande projekt', nearbyDevelopments: 'Närliggande projekt', availableUnits: 'Tillgängliga enheter', contactUs: 'Kontakta oss för detaljer', callNow: 'Ring nu' },
  de: { from: 'Ab', bedrooms: 'Schlafzimmer', builtSize: 'Wohnfläche', plotSize: 'Grundstück', keyReady: 'Schlüsselfertig', offPlan: 'Vom Plan', gallery: 'Galerie', videoTour: 'Video-Tour', propertyFeatures: 'Ausstattung', area: 'Die Gegend', lifestyle: 'Lebensstil', investment: 'Investitionspotenzial', whyBuy: 'Warum hier kaufen', faq: 'Häufig gestellte Fragen', conclusion: 'Zusammenfassung', requestFloorPlans: 'Grundrisse anfordern', interestedInProperty: 'Interesse an dieser Immobilie?', sendInquiry: 'Anfrage senden', similarDevelopments: 'Ähnliche Projekte', nearbyDevelopments: 'Projekte in der Nähe', availableUnits: 'Verfügbare Einheiten', contactUs: 'Kontaktieren Sie uns', callNow: 'Jetzt anrufen' },
  nl: { from: 'Vanaf', bedrooms: 'Slaapkamers', builtSize: 'Woonoppervlak', plotSize: 'Perceel', keyReady: 'Sleutelklaar', offPlan: 'Op tekening', gallery: 'Galerij', videoTour: 'Videotour', propertyFeatures: 'Kenmerken', area: 'De omgeving', lifestyle: 'Levensstijl', investment: 'Investeringspotentieel', whyBuy: 'Waarom hier kopen', faq: 'Veelgestelde vragen', conclusion: 'Samenvatting', requestFloorPlans: 'Plattegronden aanvragen', interestedInProperty: 'Geïnteresseerd in dit object?', sendInquiry: 'Stuur aanvraag', similarDevelopments: 'Vergelijkbare projecten', nearbyDevelopments: 'Projecten in de buurt', availableUnits: 'Beschikbare woningen', contactUs: 'Neem contact op', callNow: 'Bel nu' },
  'nl-be': { from: 'Vanaf', bedrooms: 'Slaapkamers', builtSize: 'Bewoonbare oppervlakte', plotSize: 'Perceel', keyReady: 'Sleutel-op-de-deur', offPlan: 'Op plan', gallery: 'Galerij', videoTour: 'Videotour', propertyFeatures: 'Kenmerken', area: 'De omgeving', lifestyle: 'Levensstijl', investment: 'Investeringspotentieel', whyBuy: 'Waarom hier kopen', faq: 'Veelgestelde vragen', conclusion: 'Samenvatting', requestFloorPlans: 'Plannen aanvragen', interestedInProperty: 'Geïnteresseerd in dit object?', sendInquiry: 'Verstuur aanvraag', similarDevelopments: 'Vergelijkbare projecten', nearbyDevelopments: 'Projecten in de buurt', availableUnits: 'Beschikbare woningen', contactUs: 'Contacteer ons', callNow: 'Bel nu' },
  fr: { from: 'À partir de', bedrooms: 'Chambres', builtSize: 'Surface habitable', plotSize: 'Terrain', keyReady: 'Clé en main', offPlan: 'Sur plan', gallery: 'Galerie', videoTour: 'Visite vidéo', propertyFeatures: 'Caractéristiques', area: 'Le quartier', lifestyle: 'Style de vie', investment: 'Potentiel d\'investissement', whyBuy: 'Pourquoi acheter ici', faq: 'Questions fréquentes', conclusion: 'Résumé', requestFloorPlans: 'Demander les plans', interestedInProperty: 'Intéressé par ce bien?', sendInquiry: 'Envoyer une demande', similarDevelopments: 'Projets similaires', nearbyDevelopments: 'Projets à proximité', availableUnits: 'Logements disponibles', contactUs: 'Contactez-nous', callNow: 'Appelez maintenant' },
  no: { from: 'Fra', bedrooms: 'Soverom', builtSize: 'Boligareal', plotSize: 'Tomt', keyReady: 'Innflyttingsklar', offPlan: 'Prosjekt', gallery: 'Galleri', videoTour: 'Videovisning', propertyFeatures: 'Egenskaper', area: 'Området', lifestyle: 'Livsstil', investment: 'Investeringspotensial', whyBuy: 'Hvorfor kjøpe her', faq: 'Ofte stilte spørsmål', conclusion: 'Oppsummering', requestFloorPlans: 'Be om plantegninger', interestedInProperty: 'Interessert i denne eiendommen?', sendInquiry: 'Send forespørsel', similarDevelopments: 'Lignende prosjekter', nearbyDevelopments: 'Prosjekter i nærheten', availableUnits: 'Tilgjengelige enheter', contactUs: 'Kontakt oss', callNow: 'Ring nå' },
  pl: { from: 'Od', bedrooms: 'Sypialnie', builtSize: 'Pow. użytkowa', plotSize: 'Działka', keyReady: 'Pod klucz', offPlan: 'Na planie', gallery: 'Galeria', videoTour: 'Wideo', propertyFeatures: 'Cechy', area: 'Okolica', lifestyle: 'Styl życia', investment: 'Potencjał inwestycyjny', whyBuy: 'Dlaczego tu kupić', faq: 'FAQ', conclusion: 'Podsumowanie', requestFloorPlans: 'Zapytaj o plany', interestedInProperty: 'Zainteresowany tą nieruchomością?', sendInquiry: 'Wyślij zapytanie', similarDevelopments: 'Podobne inwestycje', nearbyDevelopments: 'Inwestycje w pobliżu', availableUnits: 'Dostępne lokale', contactUs: 'Skontaktuj się', callNow: 'Zadzwoń' },
  ru: { from: 'От', bedrooms: 'Спальни', builtSize: 'Площадь', plotSize: 'Участок', keyReady: 'Под ключ', offPlan: 'Проект', gallery: 'Галерея', videoTour: 'Видеотур', propertyFeatures: 'Характеристики', area: 'Район', lifestyle: 'Образ жизни', investment: 'Инвестиционный потенциал', whyBuy: 'Почему покупать здесь', faq: 'Часто задаваемые вопросы', conclusion: 'Итоги', requestFloorPlans: 'Запросить планировки', interestedInProperty: 'Заинтересованы?', sendInquiry: 'Отправить запрос', similarDevelopments: 'Похожие проекты', nearbyDevelopments: 'Проекты рядом', availableUnits: 'Доступные объекты', contactUs: 'Свяжитесь с нами', callNow: 'Позвонить' },
};

function getStrings(lang: string): DevStrings {
  return STRINGS[lang] || STRINGS.en;
}

// ============================================================================
// METADATA FACTORY
// ============================================================================

export function createTranslatedDevMetadata(lang: string, langPrefix: string) {
  return async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const enhanced = getEnhancedContent(slug, lang);

    if (enhanced?.property) {
      return {
        title: enhanced.metaTitle || 'Development',
        description: enhanced.metaDescription || '',
        openGraph: {
          title: enhanced.metaTitle,
          description: enhanced.metaDescription,
          images: enhanced.property.images?.slice(0, 3),
        },
        alternates: {
          canonical: `${BASE_URL}${langPrefix}/developments/${slug}`,
          languages: {
            'en': `${BASE_URL}/developments/${slug}`,
            'sv': `${BASE_URL}/sv/developments/${slug}`,
            'nl': `${BASE_URL}/nl/developments/${slug}`,
            'nl-BE': `${BASE_URL}/nl-be/developments/${slug}`,
            'fr': `${BASE_URL}/fr/developments/${slug}`,
            'no': `${BASE_URL}/no/developments/${slug}`,
            'de': `${BASE_URL}/de/developments/${slug}`,
            'pl': `${BASE_URL}/pl/developments/${slug}`,
            'ru': `${BASE_URL}/ru/developments/${slug}`,
            'x-default': `${BASE_URL}/developments/${slug}`,
          },
        },
      };
    }

    const development = await getDevelopmentBySlug(slug);
    if (!development?.name) return { title: 'Development Not Found' };

    return {
      title: `${development.name} | ${development.town || 'Costa Blanca'}`,
      description: `${development.name} by ${development.developer || 'Developer'} in ${development.town || 'Costa Blanca'}`,
      alternates: { canonical: `${BASE_URL}${langPrefix}/developments/${slug}` },
    };
  };
}

// ============================================================================
// PAGE COMPONENT FACTORY
// ============================================================================

export function createTranslatedDevPage(lang: string, langPrefix: string) {
  return async function DevelopmentPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const s = getStrings(lang);
    const enhanced = getEnhancedContent(slug, lang);

    if (enhanced?.property) {
      const { content, property, imageAlts } = enhanced;
      const town = property.town || 'Costa Blanca';

      const [similarResult, nearbyResult, unitsResult] = await Promise.all([
        getDevelopmentsByBuilder(property.developerSlug || 'unknown'),
        getDevelopmentsByTown(town),
        getDevelopmentUnits(slug),
      ]);

      const similar = (Array.isArray(similarResult) ? similarResult : []).filter(d => d.slug !== slug).slice(0, 3);
      const nearby = (Array.isArray(nearbyResult) ? nearbyResult : []).filter(d => d.slug !== slug).slice(0, 3);
      const units = Array.isArray(unitsResult) ? unitsResult : [];

      const isKeyReady = enhanced.projectName?.toLowerCase().includes('key ready') || content.heroIntro?.toLowerCase().includes('key ready');
      const isOffPlan = content.heroIntro?.toLowerCase().includes('off-plan');

      const getAlt = (url: string, i: number) => {
        const found = imageAlts?.find(a => a.url === url);
        return found?.alt || `${enhanced.projectName} - Image ${i + 1}`;
      };

      // Schema
      const schemaBreadcrumbs = breadcrumbSchema([
        { name: 'Home', url: `${BASE_URL}${langPrefix}/` },
        { name: 'Developments', url: `${BASE_URL}${langPrefix}/developments/` },
        { name: town, url: `${BASE_URL}${langPrefix}/areas/${town.toLowerCase().replace(/\s+/g, '-')}/` },
        { name: enhanced.projectName, url: `${BASE_URL}${langPrefix}/developments/${slug}/` },
      ]);

      const schemaFAQGenerated = content.faqs?.length > 0 ? faqSchema(content.faqs) : null;

      const videos = getVideosForDevelopment(slug);

      // Area content (supports both old and new format)
      const areaContent = (content as any).areaSection || content.locationSection?.intro || '';
      const lifestyleContent = (content as any).lifestyleSection || '';
      const locationHighlights = (content as any).locationHighlights || content.locationSection?.highlights || [];

      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }} />
          {schemaFAQGenerated && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQGenerated) }} />}

          {/* Mobile sticky CTA */}
          <div className="fixed bottom-0 left-0 right-0 bg-primary-900 border-t border-primary-700 z-50 lg:hidden">
            <div className="flex">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 font-medium">
                WhatsApp
              </a>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                className="flex-1 flex items-center justify-center gap-2 bg-accent-500 text-white py-4 font-medium">
                {s.callNow}
              </a>
            </div>
          </div>

          <main className="min-h-screen bg-warm-50 pb-20 lg:pb-0">
            {/* HERO */}
            <section className="relative h-[70vh] min-h-[500px] max-h-[700px]">
              {property.images[0] && (
                <Image src={property.images[0]} alt={getAlt(property.images[0], 0)}
                  fill className="object-cover" priority unoptimized />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

              <div className="absolute inset-0 flex flex-col justify-end">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
                  <nav className="text-white/70 text-sm mb-4 flex flex-wrap items-center gap-1">
                    <Link href={`${langPrefix}/`} className="hover:text-white">Home</Link>
                    <span>›</span>
                    <Link href={`${langPrefix}/developments`} className="hover:text-white">Developments</Link>
                    <span>›</span>
                    <Link href={`${langPrefix}/areas/${town.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white">{town}</Link>
                    <span>›</span>
                    <span className="text-white">{enhanced.projectName}</span>
                  </nav>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {isKeyReady && (
                      <span className="bg-success-500 text-white text-sm font-bold px-4 py-1.5 rounded-sm">{s.keyReady}</span>
                    )}
                    {isOffPlan && (
                      <span className="bg-primary-600 text-white text-sm font-bold px-4 py-1.5 rounded-sm">{s.offPlan}</span>
                    )}
                    <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-sm">
                      by <Link href={`${langPrefix}/builders/${property.developerSlug}`} className="underline hover:no-underline">{property.developer}</Link>
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">{enhanced.projectName}</h1>

                  <p className="text-white/90 text-lg mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {town}, {property.province}
                  </p>

                  <div className="flex flex-wrap gap-3 md:gap-6">
                    <div className="bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 border border-white/20">
                      <div className="text-white/70 text-xs uppercase tracking-wide mb-1">{s.from}</div>
                      <div className="text-2xl md:text-3xl font-bold text-white">
                        {property.price ? formatPrice(property.price) : 'POA'}
                      </div>
                    </div>
                    {property.bedrooms && (
                      <div className="bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 border border-white/20">
                        <div className="text-white/70 text-xs uppercase tracking-wide mb-1">{s.bedrooms}</div>
                        <div className="text-2xl font-bold text-white">{property.bedrooms}</div>
                      </div>
                    )}
                    {property.builtSize && (
                      <div className="bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 border border-white/20">
                        <div className="text-white/70 text-xs uppercase tracking-wide mb-1">{s.builtSize}</div>
                        <div className="text-2xl font-bold text-white">{property.builtSize}m²</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Desktop sticky bar */}
            <section className="bg-primary-900 py-4 hidden lg:block sticky top-0 z-40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <span className="text-white font-semibold">{enhanced.projectName}</span>
                    <span className="text-accent-400 font-bold text-xl">
                      {property.price ? `${s.from} ${formatPrice(property.price)}` : 'POA'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                      className="bg-[#25D366] text-white px-5 py-2.5 rounded font-medium hover:bg-[#20bd5a] transition-colors">
                      WhatsApp
                    </a>
                    <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                      className="bg-accent-500 text-white px-5 py-2.5 rounded font-medium hover:bg-accent-600 transition-colors">
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* MAIN CONTENT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-12">

                  {/* Intro */}
                  <section>
                    <div className="prose prose-lg max-w-none">
                      {content.heroIntro?.split('\n\n').map((p, i) => (
                        <p key={i} className="text-warm-700 leading-relaxed text-lg">{p}</p>
                      ))}
                    </div>
                  </section>

                  {/* Gallery */}
                  {property.images.length > 1 && (
                    <section>
                      <h2 className="text-2xl font-bold text-primary-900 mb-6">{s.gallery}</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {property.images.slice(0, 6).map((img, i) => (
                          <div key={i} className={`relative rounded-lg overflow-hidden ${i === 0 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-[4/3]'}`}>
                            <Image src={img} alt={getAlt(img, i)} fill className="object-cover hover:scale-105 transition-transform duration-500" unoptimized />
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Video Tour */}
                  {videos.length > 0 && (
                    <section className="bg-primary-900 rounded-xl p-8 md:p-12">
                      <h2 className="text-2xl md:text-3xl font-light text-white text-center mb-8">{s.videoTour}</h2>
                      <div className="max-w-2xl mx-auto">
                        <VideoCard {...videos[0]} variant="hero" />
                      </div>
                    </section>
                  )}

                  {/* Area */}
                  {areaContent && (
                    <section>
                      <h2 className="text-2xl font-bold text-primary-900 mb-6">{s.area}: {town}</h2>
                      {areaContent.split('\n\n').map((p: string, i: number) => (
                        <p key={i} className="text-warm-700 leading-relaxed mb-4">{p}</p>
                      ))}
                      {locationHighlights.length > 0 && (
                        <div className="mt-6 grid md:grid-cols-2 gap-3">
                          {locationHighlights.map((h: string, i: number) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-warm-50 rounded-sm">
                              <svg className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              <span className="text-warm-700 text-sm">{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  )}

                  {/* Lifestyle */}
                  {lifestyleContent && (
                    <section>
                      <h2 className="text-2xl font-bold text-primary-900 mb-6">{s.lifestyle}</h2>
                      {lifestyleContent.split('\n\n').map((p: string, i: number) => (
                        <p key={i} className="text-warm-700 leading-relaxed mb-4">{p}</p>
                      ))}
                    </section>
                  )}

                  {/* Property Features */}
                  {content.propertyFeatures?.features?.length > 0 && (
                    <section className="bg-white p-8 rounded-sm border border-warm-200">
                      <h2 className="text-2xl font-bold text-primary-900 mb-4">{s.propertyFeatures}</h2>
                      {content.propertyFeatures.intro && (
                        <p className="text-warm-700 mb-6">{content.propertyFeatures.intro}</p>
                      )}
                      <div className="grid md:grid-cols-2 gap-3">
                        {content.propertyFeatures.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-success-50 rounded-sm">
                            <svg className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-warm-700">{f}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Investment */}
                  {content.investmentSection && (
                    <section>
                      <h2 className="text-2xl font-bold text-primary-900 mb-6">{s.investment}</h2>
                      {content.investmentSection.split('\n\n').map((p, i) => (
                        <p key={i} className="text-warm-700 leading-relaxed mb-4">{p}</p>
                      ))}
                    </section>
                  )}

                  {/* Why Buy */}
                  {content.whyBuySection?.length > 0 && (
                    <section>
                      <h2 className="text-2xl font-bold text-primary-900 mb-6">{s.whyBuy}</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {content.whyBuySection.map((reason, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 bg-primary-50 rounded-sm border border-primary-100">
                            <span className="flex-shrink-0 w-7 h-7 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                              {i + 1}
                            </span>
                            <span className="text-warm-700">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* FAQs */}
                  {content.faqs?.length > 0 && (
                    <section>
                      <h2 className="text-2xl font-bold text-primary-900 mb-6">{s.faq}</h2>
                      <div className="space-y-3">
                        {content.faqs.map((faq, i) => (
                          <details key={i} className="group border border-warm-200 rounded-sm bg-white">
                            <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-primary-900 hover:bg-warm-50">
                              {faq.question}
                              <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </summary>
                            <div className="px-4 pb-4 text-warm-700">{faq.answer}</div>
                          </details>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Conclusion */}
                  {content.conclusion && (
                    <section className="p-6 md:p-8 bg-warm-50 rounded-sm border border-warm-200">
                      <h2 className="text-xl font-bold text-primary-900 mb-4 pl-4 border-l-4 border-accent-500">{s.conclusion}</h2>
                      {content.conclusion.split('\n\n').map((p, i) => (
                        <p key={i} className="text-warm-700 mb-4">{p}</p>
                      ))}
                    </section>
                  )}

                  {/* Available Units */}
                  {units.length > 0 && (
                    <section>
                      <h2 className="text-2xl font-bold text-primary-900 mb-6">{s.availableUnits}</h2>
                      <div className="grid md:grid-cols-2 gap-5">
                        {units.slice(0, 6).map((unit: any) => (
                          <Link key={unit.id || unit.ref} href={`${langPrefix}/properties/${unit.ref}`}
                            className="group bg-white rounded-lg overflow-hidden border border-warm-200 hover:shadow-lg transition-all">
                            <div className="relative h-48">
                              <Image src={unit.images?.[0] || '/images/placeholder-property.jpg'} alt={`${unit.bedrooms || 0} bed`}
                                fill className="object-cover" unoptimized />
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-primary-900 group-hover:text-accent-600">
                                {unit.bedrooms || 0} {s.bedrooms} {unit.propertyType || 'Property'}
                              </h3>
                              <p className="text-warm-500 text-sm">{unit.bathrooms || 0} bath • {unit.size || 0}m²</p>
                              <p className="text-accent-600 font-bold mt-2">{formatPrice(unit.price || 0)}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* SIDEBAR */}
                <div className="space-y-6">
                  <div className="bg-white border border-warm-200 rounded-lg p-6 shadow-lg sticky top-20">
                    <h3 className="text-xl font-bold text-primary-900 mb-4">{s.interestedInProperty}</h3>
                    <div className="space-y-3 mb-6">
                      <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                        className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-center py-3 rounded-sm font-medium transition-colors">
                        WhatsApp
                      </a>
                      <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                        className="block w-full bg-primary-900 hover:bg-primary-800 text-white text-center py-3 rounded-sm font-medium transition-colors">
                        {CONTACT.phone}
                      </a>
                      <a href={`mailto:${CONTACT.email}?subject=${enhanced.projectName}`}
                        className="block w-full bg-warm-100 hover:bg-warm-200 text-primary-900 text-center py-3 rounded-sm font-medium transition-colors">
                        Email
                      </a>
                    </div>

                    <div className="border-t border-warm-200 pt-4 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-warm-500">{s.from}</span>
                        <span className="font-semibold text-primary-900">{property.price ? formatPrice(property.price) : 'POA'}</span>
                      </div>
                      {property.bedrooms && (
                        <div className="flex justify-between">
                          <span className="text-warm-500">{s.bedrooms}</span>
                          <span className="font-semibold text-primary-900">{property.bedrooms}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-warm-500">Type</span>
                        <span className="font-semibold text-primary-900">{property.propertyType}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar & Nearby */}
            {(similar.length > 0 || nearby.length > 0) && (
              <section className="py-12 bg-white border-t border-warm-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {similar.length > 0 && (
                    <>
                      <h2 className="text-2xl font-bold text-primary-900 mb-6">{s.similarDevelopments}</h2>
                      <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {similar.map((dev) => (
                          <Link key={dev.slug} href={`${langPrefix}/developments/${dev.slug}`}
                            className="bg-warm-50 rounded-lg overflow-hidden border border-warm-200 hover:shadow-lg transition-all group">
                            <div className="relative h-48">
                              <Image src={dev.mainImage || '/images/placeholder-property.jpg'} alt={dev.name}
                                fill className="object-cover" unoptimized />
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-primary-900 group-hover:text-accent-600">{dev.name}</h3>
                              <p className="text-warm-500 text-sm">{dev.town}</p>
                              <p className="text-accent-600 font-bold mt-1">{s.from} {formatPrice(dev.priceFrom || 0)}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                  {nearby.length > 0 && (
                    <>
                      <h2 className="text-2xl font-bold text-primary-900 mb-6">{s.nearbyDevelopments}</h2>
                      <div className="grid md:grid-cols-3 gap-6">
                        {nearby.map((dev) => (
                          <Link key={dev.slug} href={`${langPrefix}/developments/${dev.slug}`}
                            className="bg-warm-50 rounded-lg overflow-hidden border border-warm-200 hover:shadow-lg transition-all group">
                            <div className="relative h-48">
                              <Image src={dev.mainImage || '/images/placeholder-property.jpg'} alt={dev.name}
                                fill className="object-cover" unoptimized />
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-primary-900 group-hover:text-accent-600">{dev.name}</h3>
                              <p className="text-warm-500 text-sm">{dev.town}</p>
                              <p className="text-accent-600 font-bold mt-1">{s.from} {formatPrice(dev.priceFrom || 0)}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </section>
            )}

            {/* Newsletter */}
            <section className="py-12 bg-warm-50">
              <div className="max-w-3xl mx-auto px-6">
                <NewsletterCTA type="developments" />
              </div>
            </section>
          </main>
        </>
      );
    }

    // No enhanced content — redirect to English version
    // (Feed-based auto-generated pages have no translatable text content)
    redirect(`/developments/${slug}`);
  };
}
