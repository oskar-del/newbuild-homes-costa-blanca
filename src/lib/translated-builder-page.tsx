/**
 * Shared Translated Builder Page
 * ===============================
 * Provides generateMetadata and page component for translated builder pages.
 * Each language's builders/[slug]/page.tsx imports from here with their lang code.
 *
 * Loads translated builder content from JSON when available, falls back to English.
 */

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import {
  getBuilderBySlug,
  getAllBuilders,
  getDevelopmentsByBuilder,
  Builder,
} from '@/lib/development-service';
import {
  breadcrumbSchema,
  homeAndConstructionBusinessSchema,
  articleSchema,
  faqSchema,
  toJsonLd,
} from '@/lib/schema';
import DevelopmentCard from '@/components/DevelopmentCard';
import VideoCard from '@/components/VideoCard';
import { getVideosByTag } from '@/lib/video-mapping';

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

const BASE_URL = 'https://newbuildhomescostablanca.com';

// ============================================================================
// TYPES
// ============================================================================

interface EnhancedBuilderContent {
  slug: string;
  name: string;
  towns: string[];
  propertyTypes: string[];
  propertyCount: number;
  priceRange: { min: number; max: number };
  content: {
    metaTitle: string;
    metaDescription: string;
    heroIntro: string;
    aboutSection: string;
    qualitySection: {
      intro: string;
      standards: string[];
    };
    whyChooseSection: string[];
    faqs: { question: string; answer: string }[];
    conclusion: string;
  };
  schema: object;
  schemaFAQ: object;
}

// ============================================================================
// CONTENT LOADING (Language-aware)
// ============================================================================

function getEnhancedContent(slug: string, lang?: string): EnhancedBuilderContent | null {
  const buildersDir = path.join(process.cwd(), 'src', 'content', 'builders');

  // Try translated version first
  const paths = [];
  if (lang && lang !== 'en') {
    paths.push(path.join(buildersDir, lang, `${slug}.json`));
  }
  paths.push(path.join(buildersDir, `${slug}.json`));

  for (const contentPath of paths) {
    if (!fs.existsSync(contentPath)) continue;

    try {
      const raw = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

      // New flat format (metaTitle at root level, no nested content)
      if (raw.metaTitle && !raw.content) {
        return {
          slug: raw.slug,
          name: raw.name,
          towns: raw.specializationSection?.towns || [],
          propertyTypes: raw.specializationSection?.propertyTypes || [],
          propertyCount: raw.propertyCount || 0,
          priceRange: raw.priceRange || { min: 0, max: 0 },
          content: {
            metaTitle: raw.metaTitle,
            metaDescription: raw.metaDescription,
            heroIntro: raw.heroIntro || raw.heroHeadline || '',
            aboutSection: typeof raw.aboutSection === 'string'
              ? raw.aboutSection
              : raw.aboutSection?.content || '',
            qualitySection: {
              intro: typeof raw.qualitySection === 'string'
                ? raw.qualitySection
                : raw.qualitySection?.content || '',
              standards: raw.qualitySection?.features || [],
            },
            whyChooseSection: (raw.whyChooseSection?.reasons || []).map((r: any) =>
              typeof r === 'string' ? r : `${r.title}: ${r.description}`
            ),
            faqs: raw.faqs || raw.faqSection?.faqs || [],
            conclusion: raw.ctaSection?.content || raw.conclusion || '',
          },
          schema: raw.schema || {},
          schemaFAQ: raw.schemaFAQ || {},
        };
      }

      // Old format with nested content
      if (raw.content && raw.content.metaTitle) {
        return raw;
      }
    } catch { /* try next path */ }
  }

  return null;
}

// ============================================================================
// UI STRINGS (per language)
// ============================================================================

interface BuilderStrings {
  propertyDeveloper: string;
  properties: string;
  locations: string;
  areas: string;
  priceRange: string;
  about: string;
  constructionQuality: string;
  whyChoose: string;
  faq: string;
  whatsappUs: string;
  callNow: string;
  viewAllDevelopments: string;
  developmentsBy: string;
  browseAllProjects: string;
  activeIn: string;
  exploreOtherBuilders: string;
  viewAllBuilders: string;
  weWorkWith: string;
  interested: string;
  contactUs: string;
  chatOnWhatsApp: string;
  contactForm: string;
  getStarted: string;
  askAbout: string;
}

const STRINGS: Record<string, BuilderStrings> = {
  en: {
    propertyDeveloper: 'Property Developer',
    properties: 'Properties',
    locations: 'Locations',
    areas: 'Areas',
    priceRange: 'Price Range',
    about: 'About',
    constructionQuality: 'Construction Quality',
    whyChoose: 'Why Choose',
    faq: 'Frequently Asked Questions',
    whatsappUs: 'WhatsApp Us',
    callNow: 'Call Now',
    viewAllDevelopments: 'View All Developments',
    developmentsBy: 'Developments by',
    browseAllProjects: 'Browse all current projects from this developer',
    activeIn: 'Active in',
    exploreOtherBuilders: 'Explore Other Builders',
    viewAllBuilders: 'View All Builders',
    weWorkWith: 'We work with 100+ trusted developers across Costa Blanca',
    interested: 'Interested in',
    contactUs: 'Contact us for more information about',
    chatOnWhatsApp: 'Chat on WhatsApp',
    contactForm: 'Contact Form',
    getStarted: 'Get Started',
    askAbout: 'Ask About',
  },
  sv: {
    propertyDeveloper: 'Fastighetsutvecklare',
    properties: 'Fastigheter',
    locations: 'Platser',
    areas: 'Områden',
    priceRange: 'Prisintervall',
    about: 'Om',
    constructionQuality: 'Byggkvalitet',
    whyChoose: 'Varför välja',
    faq: 'Vanliga frågor',
    whatsappUs: 'WhatsApp oss',
    callNow: 'Ring nu',
    viewAllDevelopments: 'Se alla projekt',
    developmentsBy: 'Projekt av',
    browseAllProjects: 'Bläddra bland alla aktuella projekt från denna utvecklare',
    activeIn: 'Aktiv i',
    exploreOtherBuilders: 'Utforska andra byggare',
    viewAllBuilders: 'Se alla byggare',
    weWorkWith: 'Vi samarbetar med 100+ betrodda utvecklare i Costa Blanca',
    interested: 'Intresserad av',
    contactUs: 'Kontakta oss för mer information om',
    chatOnWhatsApp: 'Chatta på WhatsApp',
    contactForm: 'Kontaktformulär',
    getStarted: 'Kom igång',
    askAbout: 'Fråga om',
  },
  de: {
    propertyDeveloper: 'Immobilienentwickler',
    properties: 'Immobilien',
    locations: 'Standorte',
    areas: 'Gebiete',
    priceRange: 'Preisbereich',
    about: 'Über',
    constructionQuality: 'Bauqualität',
    whyChoose: 'Warum',
    faq: 'Häufig gestellte Fragen',
    whatsappUs: 'WhatsApp',
    callNow: 'Jetzt anrufen',
    viewAllDevelopments: 'Alle Projekte ansehen',
    developmentsBy: 'Projekte von',
    browseAllProjects: 'Alle aktuellen Projekte dieses Entwicklers durchsuchen',
    activeIn: 'Aktiv in',
    exploreOtherBuilders: 'Andere Bauträger entdecken',
    viewAllBuilders: 'Alle Bauträger ansehen',
    weWorkWith: 'Wir arbeiten mit über 100 vertrauenswürdigen Entwicklern an der Costa Blanca',
    interested: 'Interesse an',
    contactUs: 'Kontaktieren Sie uns für weitere Informationen über',
    chatOnWhatsApp: 'Auf WhatsApp chatten',
    contactForm: 'Kontaktformular',
    getStarted: 'Loslegen',
    askAbout: 'Fragen zu',
  },
  nl: {
    propertyDeveloper: 'Vastgoedontwikkelaar',
    properties: 'Woningen',
    locations: 'Locaties',
    areas: 'Gebieden',
    priceRange: 'Prijsklasse',
    about: 'Over',
    constructionQuality: 'Bouwkwaliteit',
    whyChoose: 'Waarom kiezen voor',
    faq: 'Veelgestelde vragen',
    whatsappUs: 'WhatsApp ons',
    callNow: 'Bel nu',
    viewAllDevelopments: 'Alle projecten bekijken',
    developmentsBy: 'Projecten van',
    browseAllProjects: 'Bekijk alle huidige projecten van deze ontwikkelaar',
    activeIn: 'Actief in',
    exploreOtherBuilders: 'Ontdek andere bouwers',
    viewAllBuilders: 'Alle bouwers bekijken',
    weWorkWith: 'Wij werken samen met meer dan 100 betrouwbare ontwikkelaars aan de Costa Blanca',
    interested: 'Geïnteresseerd in',
    contactUs: 'Neem contact met ons op voor meer informatie over',
    chatOnWhatsApp: 'Chat op WhatsApp',
    contactForm: 'Contactformulier',
    getStarted: 'Aan de slag',
    askAbout: 'Vraag over',
  },
  'nl-be': {
    propertyDeveloper: 'Vastgoedontwikkelaar',
    properties: 'Woningen',
    locations: 'Locaties',
    areas: 'Gebieden',
    priceRange: 'Prijsklasse',
    about: 'Over',
    constructionQuality: 'Bouwkwaliteit',
    whyChoose: 'Waarom kiezen voor',
    faq: 'Veelgestelde vragen',
    whatsappUs: 'WhatsApp ons',
    callNow: 'Bel nu',
    viewAllDevelopments: 'Alle projecten bekijken',
    developmentsBy: 'Projecten van',
    browseAllProjects: 'Bekijk alle huidige projecten van deze ontwikkelaar',
    activeIn: 'Actief in',
    exploreOtherBuilders: 'Ontdek andere bouwers',
    viewAllBuilders: 'Alle bouwers bekijken',
    weWorkWith: 'Wij werken samen met meer dan 100 betrouwbare ontwikkelaars aan de Costa Blanca',
    interested: 'Geïnteresseerd in',
    contactUs: 'Neem contact met ons op voor meer informatie over',
    chatOnWhatsApp: 'Chat op WhatsApp',
    contactForm: 'Contactformulier',
    getStarted: 'Aan de slag',
    askAbout: 'Vraag over',
  },
  fr: {
    propertyDeveloper: 'Promoteur immobilier',
    properties: 'Propriétés',
    locations: 'Emplacements',
    areas: 'Zones',
    priceRange: 'Gamme de prix',
    about: 'À propos de',
    constructionQuality: 'Qualité de construction',
    whyChoose: 'Pourquoi choisir',
    faq: 'Questions fréquentes',
    whatsappUs: 'WhatsApp',
    callNow: 'Appelez maintenant',
    viewAllDevelopments: 'Voir tous les projets',
    developmentsBy: 'Projets de',
    browseAllProjects: 'Parcourez tous les projets actuels de ce promoteur',
    activeIn: 'Actif dans',
    exploreOtherBuilders: 'Découvrir d\'autres promoteurs',
    viewAllBuilders: 'Voir tous les promoteurs',
    weWorkWith: 'Nous travaillons avec plus de 100 promoteurs de confiance sur la Costa Blanca',
    interested: 'Intéressé par',
    contactUs: 'Contactez-nous pour plus d\'informations sur',
    chatOnWhatsApp: 'Discuter sur WhatsApp',
    contactForm: 'Formulaire de contact',
    getStarted: 'Commencer',
    askAbout: 'Demander au sujet de',
  },
  no: {
    propertyDeveloper: 'Eiendomsutvikler',
    properties: 'Eiendommer',
    locations: 'Steder',
    areas: 'Områder',
    priceRange: 'Prisklasse',
    about: 'Om',
    constructionQuality: 'Byggekvalitet',
    whyChoose: 'Hvorfor velge',
    faq: 'Ofte stilte spørsmål',
    whatsappUs: 'WhatsApp oss',
    callNow: 'Ring nå',
    viewAllDevelopments: 'Se alle prosjekter',
    developmentsBy: 'Prosjekter av',
    browseAllProjects: 'Bla gjennom alle aktuelle prosjekter fra denne utvikleren',
    activeIn: 'Aktiv i',
    exploreOtherBuilders: 'Utforsk andre utbyggere',
    viewAllBuilders: 'Se alle utbyggere',
    weWorkWith: 'Vi samarbeider med over 100 pålitelige utviklere på Costa Blanca',
    interested: 'Interessert i',
    contactUs: 'Kontakt oss for mer informasjon om',
    chatOnWhatsApp: 'Chat på WhatsApp',
    contactForm: 'Kontaktskjema',
    getStarted: 'Kom i gang',
    askAbout: 'Spør om',
  },
  pl: {
    propertyDeveloper: 'Deweloper',
    properties: 'Nieruchomości',
    locations: 'Lokalizacje',
    areas: 'Obszary',
    priceRange: 'Zakres cenowy',
    about: 'O firmie',
    constructionQuality: 'Jakość budowy',
    whyChoose: 'Dlaczego warto wybrać',
    faq: 'Często zadawane pytania',
    whatsappUs: 'WhatsApp',
    callNow: 'Zadzwoń teraz',
    viewAllDevelopments: 'Zobacz wszystkie inwestycje',
    developmentsBy: 'Inwestycje',
    browseAllProjects: 'Przeglądaj wszystkie aktualne projekty tego dewelopera',
    activeIn: 'Aktywny w',
    exploreOtherBuilders: 'Odkryj innych deweloperów',
    viewAllBuilders: 'Zobacz wszystkich deweloperów',
    weWorkWith: 'Współpracujemy z ponad 100 zaufanymi deweloperami na Costa Blanca',
    interested: 'Zainteresowany',
    contactUs: 'Skontaktuj się z nami, aby uzyskać więcej informacji o',
    chatOnWhatsApp: 'Czat na WhatsApp',
    contactForm: 'Formularz kontaktowy',
    getStarted: 'Rozpocznij',
    askAbout: 'Zapytaj o',
  },
  ru: {
    propertyDeveloper: 'Застройщик',
    properties: 'Объекты',
    locations: 'Местоположения',
    areas: 'Районы',
    priceRange: 'Ценовой диапазон',
    about: 'О компании',
    constructionQuality: 'Качество строительства',
    whyChoose: 'Почему выбирают',
    faq: 'Часто задаваемые вопросы',
    whatsappUs: 'WhatsApp',
    callNow: 'Позвонить',
    viewAllDevelopments: 'Все проекты',
    developmentsBy: 'Проекты',
    browseAllProjects: 'Просмотрите все текущие проекты этого застройщика',
    activeIn: 'Работает в',
    exploreOtherBuilders: 'Другие застройщики',
    viewAllBuilders: 'Все застройщики',
    weWorkWith: 'Мы работаем с более чем 100 надёжными застройщиками на Коста Бланка',
    interested: 'Заинтересованы в',
    contactUs: 'Свяжитесь с нами для получения дополнительной информации о',
    chatOnWhatsApp: 'Чат в WhatsApp',
    contactForm: 'Форма обратной связи',
    getStarted: 'Начать',
    askAbout: 'Спросить о',
  },
};

function getStrings(lang: string): BuilderStrings {
  return STRINGS[lang] || STRINGS.en;
}

// ============================================================================
// HELPERS
// ============================================================================

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function WhatsAppCTA() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all group"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

const WHATSAPP_SVG = <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;

// ============================================================================
// METADATA GENERATORS
// ============================================================================

export function createTranslatedBuilderMetadata(lang: string, langPrefix: string) {
  return async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const enhanced = getEnhancedContent(slug, lang);

    if (enhanced) {
      return {
        title: enhanced.content.metaTitle,
        description: enhanced.content.metaDescription,
        alternates: {
          canonical: `${BASE_URL}${langPrefix}/builders/${slug}`,
          languages: {
            'en': `${BASE_URL}/builders/${slug}`,
            'sv': `${BASE_URL}/sv/builders/${slug}`,
            'nl': `${BASE_URL}/nl/builders/${slug}`,
            'nl-BE': `${BASE_URL}/nl-be/builders/${slug}`,
            'fr': `${BASE_URL}/fr/builders/${slug}`,
            'no': `${BASE_URL}/no/builders/${slug}`,
            'de': `${BASE_URL}/de/builders/${slug}`,
            'pl': `${BASE_URL}/pl/builders/${slug}`,
            'ru': `${BASE_URL}/ru/builders/${slug}`,
            'x-default': `${BASE_URL}/builders/${slug}`,
          },
        },
      };
    }

    const builder = await getBuilderBySlug(slug);
    if (!builder) return { title: 'Builder Not Found' };

    return {
      title: `${builder.name} | ${getStrings(lang).propertyDeveloper} Costa Blanca`,
      description: `${builder.developmentCount} developments by ${builder.name} in ${builder.towns.slice(0, 3).join(', ')}.`,
      alternates: {
        canonical: `${BASE_URL}${langPrefix}/builders/${slug}`,
        languages: {
          'en': `${BASE_URL}/builders/${slug}`,
          'sv': `${BASE_URL}/sv/builders/${slug}`,
          'nl': `${BASE_URL}/nl/builders/${slug}`,
          'nl-BE': `${BASE_URL}/nl-be/builders/${slug}`,
          'fr': `${BASE_URL}/fr/builders/${slug}`,
          'no': `${BASE_URL}/no/builders/${slug}`,
          'de': `${BASE_URL}/de/builders/${slug}`,
          'pl': `${BASE_URL}/pl/builders/${slug}`,
          'ru': `${BASE_URL}/ru/builders/${slug}`,
          'x-default': `${BASE_URL}/builders/${slug}`,
        },
      },
    };
  };
}

// ============================================================================
// PAGE COMPONENT FACTORY
// ============================================================================

export function createTranslatedBuilderPage(lang: string, langPrefix: string) {
  return async function BuilderPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const s = getStrings(lang);

    // Check for enhanced content first
    const enhanced = getEnhancedContent(slug, lang);
    if (enhanced) {
      const { content, schema, schemaFAQ } = enhanced;
      const developments = await getDevelopmentsByBuilder(enhanced.slug);

      const breadcrumbs = breadcrumbSchema([
        { name: 'Home', url: `${BASE_URL}${langPrefix}/` },
        { name: 'Builders', url: `${BASE_URL}${langPrefix}/builders/` },
        { name: enhanced.name, url: `${BASE_URL}${langPrefix}/builders/${enhanced.slug}/` },
      ]);

      const schemaFAQGenerated = content.faqs?.length > 0 ? faqSchema(content.faqs) : null;

      const builderVideos = getVideosByTag(enhanced.slug, 3);

      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
          {schemaFAQGenerated && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQGenerated) }} />}

          <main className="min-h-screen bg-warm-50">
            {/* Hero Section */}
            <section className="relative bg-primary-900 py-16 md:py-20">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950" />
              </div>

              <div className="relative max-w-7xl mx-auto px-6">
                <nav className="text-warm-400 text-sm mb-6">
                  <Link href={`${langPrefix}/`} className="hover:text-white transition-colors">Home</Link>
                  <span className="mx-2">›</span>
                  <Link href={`${langPrefix}/builders`} className="hover:text-white transition-colors">Builders</Link>
                  <span className="mx-2">›</span>
                  <span className="text-white">{enhanced.name}</span>
                </nav>

                <div className="max-w-3xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-px bg-accent-500" />
                    <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                      {s.propertyDeveloper}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                    {enhanced.name}
                  </h1>

                  <p className="text-warm-300 text-lg leading-relaxed mb-8">
                    {content.heroIntro.split('\n\n')[0]}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="bg-white/10 px-4 py-2 rounded-sm">
                      <div className="text-xl font-semibold text-white">{enhanced.propertyCount}</div>
                      <div className="text-warm-400 text-sm">{s.properties}</div>
                    </div>
                    <div className="bg-white/10 px-4 py-2 rounded-sm">
                      <div className="text-xl font-semibold text-white">{enhanced.towns.length}</div>
                      <div className="text-warm-400 text-sm">{s.locations}</div>
                    </div>
                    <div className="bg-white/10 px-4 py-2 rounded-sm">
                      <div className="text-white text-sm">{enhanced.towns.slice(0, 3).join(', ')}</div>
                      <div className="text-warm-400 text-sm">{s.areas}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-sm font-medium transition-colors inline-flex items-center gap-2 text-sm">
                      {WHATSAPP_SVG}
                      {s.askAbout} {enhanced.name}
                    </a>
                    <a href={`tel:${CONTACT.phone}`}
                      className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-sm font-medium transition-colors border border-white/20 text-sm">
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                  {/* About */}
                  <section>
                    <h2 className="text-2xl font-semibold text-primary-900 mb-6">
                      {s.about} {enhanced.name}
                    </h2>
                    <div className="prose prose-lg max-w-none">
                      {content.aboutSection.split('\n\n').map((p, i) => (
                        <p key={i} className="text-warm-700 leading-relaxed mb-4">{p}</p>
                      ))}
                    </div>
                  </section>

                  {/* Quality */}
                  <section className="bg-white p-8 rounded-sm border border-warm-200">
                    <h2 className="text-2xl font-semibold text-primary-900 mb-6">{s.constructionQuality}</h2>
                    <p className="text-warm-700 mb-6">{content.qualitySection.intro}</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {content.qualitySection.standards.map((standard, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-success-50 rounded-sm">
                          <svg className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-warm-700">{standard}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Why Choose */}
                  <section>
                    <h2 className="text-2xl font-semibold text-primary-900 mb-6">
                      {s.whyChoose} {enhanced.name}?
                    </h2>
                    <div className="space-y-4">
                      {content.whyChooseSection.map((reason, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-primary-50 rounded-sm border border-primary-100">
                          <span className="flex-shrink-0 w-8 h-8 bg-primary-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {i + 1}
                          </span>
                          <span className="text-warm-700">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* FAQs */}
                  {content.faqs?.length > 0 && (
                    <section>
                      <h2 className="text-2xl font-semibold text-primary-900 mb-6">{s.faq}</h2>
                      <div className="space-y-4">
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
                  <section className="p-6 md:p-8 bg-warm-50 rounded-sm border border-warm-200">
                    <p className="text-warm-700 text-lg mb-6">{content.conclusion}</p>
                    <div className="flex flex-wrap gap-4">
                      <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-sm font-medium transition-colors inline-flex items-center gap-2">
                        {WHATSAPP_SVG}
                        {s.whatsappUs}
                      </a>
                      <a href={`tel:${CONTACT.phone}`}
                        className="bg-primary-900 text-white hover:bg-primary-800 px-6 py-3 rounded-sm font-medium transition-colors">
                        {CONTACT.phone}
                      </a>
                    </div>
                  </section>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-1 space-y-6">
                  {builderVideos.length > 0 && (
                    <div className="bg-white border border-warm-200 rounded-sm overflow-hidden shadow-lg">
                      <div className="p-4 bg-primary-900">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Video Tours
                        </h3>
                      </div>
                      <div className="p-4 space-y-3">
                        {builderVideos.map((video) => (
                          <VideoCard key={video.slug} {...video} variant="inline" />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-white border border-warm-200 rounded-sm p-6 shadow-lg sticky top-6">
                    <h3 className="font-semibold text-primary-900 text-xl mb-4">{enhanced.name}</h3>
                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-warm-500 text-sm">{s.properties}</p>
                        <p className="font-semibold text-primary-900">{enhanced.propertyCount}</p>
                      </div>
                      <div>
                        <p className="text-warm-500 text-sm">{s.locations}</p>
                        <p className="font-semibold text-primary-900">{enhanced.towns.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-warm-500 text-sm">{s.priceRange}</p>
                        <p className="font-semibold text-primary-900">
                          {formatPrice(enhanced.priceRange.min)} - {formatPrice(enhanced.priceRange.max)}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                        className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-center py-3 rounded-sm font-medium transition-colors">
                        WhatsApp
                      </a>
                      <a href={`tel:${CONTACT.phone}`}
                        className="block w-full bg-primary-900 hover:bg-primary-800 text-white text-center py-3 rounded-sm font-medium transition-colors">
                        {s.callNow}
                      </a>
                      <Link href={`${langPrefix}/developments`}
                        className="block w-full bg-warm-100 hover:bg-warm-200 text-primary-900 text-center py-3 rounded-sm font-medium transition-colors">
                        {s.viewAllDevelopments}
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            {/* Developments */}
            {developments.length > 0 && (
              <section className="py-14 bg-white border-t border-warm-200">
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                    <span className="font-semibold">{developments.length}</span> {s.developmentsBy} {enhanced.name}
                  </h2>
                  <p className="text-warm-600 mb-8">{s.browseAllProjects}</p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {developments.map((dev) => (
                      <DevelopmentCard key={dev.slug} development={dev} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Locations */}
            {enhanced.towns.length > 0 && (
              <section className="py-14 bg-warm-50">
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-8">
                    {s.activeIn} <span className="font-semibold">{enhanced.towns.length} {s.locations}</span>
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {enhanced.towns.map((town) => (
                      <Link key={town} href={`${langPrefix}/areas/${town.toLowerCase().replace(/\s+/g, '-')}`}
                        className="bg-white px-4 py-2 rounded-sm border border-warm-200 hover:border-accent-500 hover:shadow-md transition-all text-primary-900 font-medium">
                        {town}
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <WhatsAppCTA />
          </main>
        </>
      );
    }

    // Fall back to auto-generated from feed
    const builder = await getBuilderBySlug(slug);
    if (!builder) notFound();

    const developments = await getDevelopmentsByBuilder(builder.slug);
    const breadcrumbs = breadcrumbSchema([
      { name: 'Home', url: `${BASE_URL}${langPrefix}/` },
      { name: 'Builders', url: `${BASE_URL}${langPrefix}/builders/` },
      { name: builder.name, url: `${BASE_URL}${langPrefix}/builders/${builder.slug}/` },
    ]);

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
        <main className="min-h-screen bg-warm-50">
          <section className="relative bg-primary-900 py-16 md:py-20">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950" />
            </div>
            <div className="relative max-w-7xl mx-auto px-6">
              <nav className="text-warm-400 text-sm mb-6">
                <Link href={`${langPrefix}/`} className="hover:text-white transition-colors">Home</Link>
                <span className="mx-2">›</span>
                <Link href={`${langPrefix}/builders`} className="hover:text-white transition-colors">Builders</Link>
                <span className="mx-2">›</span>
                <span className="text-white">{builder.name}</span>
              </nav>
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">{builder.name}</h1>
                <p className="text-warm-300 text-lg leading-relaxed mb-8">
                  {builder.name} — {builder.developmentCount} developments, {builder.totalUnits} units in {builder.towns.slice(0, 3).join(', ')}
                </p>
              </div>
            </div>
          </section>

          {developments.length > 0 && (
            <section className="py-14 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-8">
                  <span className="font-semibold">{developments.length}</span> {s.developmentsBy} {builder.name}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {developments.map((dev) => (
                    <DevelopmentCard key={dev.slug} development={dev} />
                  ))}
                </div>
              </div>
            </section>
          )}

          <WhatsAppCTA />
        </main>
      </>
    );
  };
}
