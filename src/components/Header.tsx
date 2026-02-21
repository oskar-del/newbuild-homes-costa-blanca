'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

// Refined Design System Colours
const BRAND = {
  primary: '#1E2A38',      // Deep slate
  primaryLight: '#334155', // Lighter slate
  accent: '#B39960',       // Muted gold
  accentHover: '#9a7f4a',  // Gold hover
  text: '#2D3436',         // Body text
  textLight: '#6B7280',    // Secondary text
};

const CONTACT = {
  phone: '+34 634 044 970',
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
};

// Navigation structure — keys used for translation lookup
const NAV_ITEMS = [
  {
    key: 'buy',
    href: '/properties',
    submenu: [
      { key: 'allProperties', href: '/properties' },
      { key: 'costaBlanca', href: '/properties/costa-blanca' },
      { key: 'costaCalida', href: '/properties/costa-calida' },
      { key: 'keyReady', href: '/properties/key-ready' },
      { key: 'apartments', href: '/properties/apartments' },
      { key: 'villas', href: '/properties/villas' },
      { key: 'under300k', href: '/properties/under-300k' },
      { key: 'finance', href: '/finance' },
    ],
  },
  {
    key: 'developments',
    href: '/developments',
    submenu: [
      { key: 'allDevelopments', href: '/developments' },
      { key: 'cbSouth', href: '/developments/costa-blanca-south' },
      { key: 'cbNorth', href: '/developments/costa-blanca-north' },
      { key: 'costaCalida', href: '/areas/costa-calida' },
      { key: 'builders', href: '/builders' },
    ],
  },
  {
    key: 'areas',
    href: '/areas',
    submenu: [
      { key: 'cbSouth', href: '/areas/costa-blanca-south' },
      { key: 'cbNorth', href: '/areas/costa-blanca-north' },
      { key: 'costaCalida', href: '/areas/costa-calida' },
      { key: 'torrevieja', href: '/areas/torrevieja' },
      { key: 'orihuelaCosta', href: '/areas/orihuela-costa' },
      { key: 'javea', href: '/areas/javea' },
      { key: 'viewAllAreas', href: '/areas' },
    ],
  },
  {
    key: 'luxury',
    href: '/luxury',
    submenu: [
      { key: 'luxuryCollection', href: '/luxury' },
      { key: 'villas800k', href: '/luxury?maxPrice=2000000' },
      { key: 'bespoke2m', href: '/luxury?minPrice=2000000' },
      { key: 'seaView', href: '/properties?features=sea-view&minPrice=800000' },
      { key: 'javeaMoraira', href: '/luxury?region=north' },
    ],
  },
  {
    key: 'golf',
    href: '/golf',
    submenu: [
      { key: 'golfProperties', href: '/golf' },
      { key: 'laFinca', href: '/golf/la-finca-golf' },
      { key: 'villamartin', href: '/golf/villamartin-golf' },
      { key: 'lasRamblas', href: '/golf/las-ramblas-golf' },
      { key: 'loRomero', href: '/golf/lo-romero-golf' },
    ],
  },
  {
    key: 'about',
    href: '/about',
    submenu: [
      { key: 'aboutUs', href: '/about' },
      { key: 'buyerGuides', href: '/guides' },
      { key: 'afterSales', href: '/after-sales' },
      { key: 'finance', href: '/finance' },
      { key: 'blog', href: '/blog' },
      { key: 'contact', href: '/contact' },
    ],
  },
];

// Translations for all navigation labels per language code
const NAV_LABELS: Record<string, Record<string, string>> = {
  en: {
    buy: 'Buy', allProperties: 'All Properties', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Key-Ready Homes', apartments: 'Apartments', villas: 'Villas', under300k: 'Under €300k', finance: 'Finance & Mortgages',
    developments: 'Developments', allDevelopments: 'All Developments', cbSouth: 'Costa Blanca South', cbNorth: 'Costa Blanca North', builders: 'Our Builders',
    areas: 'Areas', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'View All Areas',
    luxury: 'Luxury', luxuryCollection: 'Luxury Collection', villas800k: 'Villas €800k-€2M', bespoke2m: 'Bespoke €2M+', seaView: 'Sea View Properties', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Golf Properties', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'About', aboutUs: 'About Us', buyerGuides: 'Buyer Guides', afterSales: 'After Sales Services', blog: 'Blog', contact: 'Contact',
    contactUs: 'Contact Us', tagline: 'Your Costa Blanca New Build Property Specialists',
  },
  sv: {
    buy: 'Köp', allProperties: 'Alla bostäder', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Inflyttningsklara', apartments: 'Lägenheter', villas: 'Villor', under300k: 'Under €300k', finance: 'Finansiering & Bolån',
    developments: 'Projekt', allDevelopments: 'Alla projekt', cbSouth: 'Costa Blanca Söder', cbNorth: 'Costa Blanca Norr', builders: 'Våra byggare',
    areas: 'Områden', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'Alla områden',
    luxury: 'Lyx', luxuryCollection: 'Lyxkollektion', villas800k: 'Villor €800k-€2M', bespoke2m: 'Exklusiva €2M+', seaView: 'Havsutsikt', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Golfbostäder', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'Om oss', aboutUs: 'Om oss', buyerGuides: 'Köparguider', afterSales: 'Efterservice', blog: 'Blogg', contact: 'Kontakt',
    contactUs: 'Kontakta oss', tagline: 'Din specialist för nybyggda bostäder på Costa Blanca',
  },
  nl: {
    buy: 'Kopen', allProperties: 'Alle woningen', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Instapklaar', apartments: 'Appartementen', villas: "Villa's", under300k: 'Onder €300k', finance: 'Financiering & Hypotheek',
    developments: 'Projecten', allDevelopments: 'Alle projecten', cbSouth: 'Costa Blanca Zuid', cbNorth: 'Costa Blanca Noord', builders: 'Onze bouwers',
    areas: 'Gebieden', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'Alle gebieden',
    luxury: 'Luxe', luxuryCollection: 'Luxe collectie', villas800k: "Villa's €800k-€2M", bespoke2m: 'Exclusief €2M+', seaView: 'Zeezicht', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Golfwoningen', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'Over ons', aboutUs: 'Over ons', buyerGuides: 'Koopgidsen', afterSales: 'Naservice', blog: 'Blog', contact: 'Contact',
    contactUs: 'Neem contact op', tagline: 'Uw specialist voor nieuwbouwwoningen aan de Costa Blanca',
  },
  'nl-be': {
    buy: 'Kopen', allProperties: 'Alle woningen', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Instapklaar', apartments: 'Appartementen', villas: "Villa's", under300k: 'Onder €300k', finance: 'Financiering & Hypotheek',
    developments: 'Projecten', allDevelopments: 'Alle projecten', cbSouth: 'Costa Blanca Zuid', cbNorth: 'Costa Blanca Noord', builders: 'Onze bouwers',
    areas: 'Gebieden', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'Alle gebieden',
    luxury: 'Luxe', luxuryCollection: 'Luxe collectie', villas800k: "Villa's €800k-€2M", bespoke2m: 'Exclusief €2M+', seaView: 'Zeezicht', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Golfwoningen', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'Over ons', aboutUs: 'Over ons', buyerGuides: 'Koopgidsen', afterSales: 'Naservice', blog: 'Blog', contact: 'Contact',
    contactUs: 'Neem contact op', tagline: 'Uw specialist voor nieuwbouwwoningen aan de Costa Blanca',
  },
  fr: {
    buy: 'Acheter', allProperties: 'Tous les biens', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Clé en main', apartments: 'Appartements', villas: 'Villas', under300k: 'Moins de €300k', finance: 'Financement & Prêts',
    developments: 'Programmes', allDevelopments: 'Tous les programmes', cbSouth: 'Costa Blanca Sud', cbNorth: 'Costa Blanca Nord', builders: 'Nos promoteurs',
    areas: 'Régions', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'Toutes les régions',
    luxury: 'Luxe', luxuryCollection: 'Collection luxe', villas800k: 'Villas €800k-€2M', bespoke2m: 'Sur mesure €2M+', seaView: 'Vue mer', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Biens golf', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'À propos', aboutUs: 'À propos', buyerGuides: "Guides d'achat", afterSales: 'Service après-vente', blog: 'Blog', contact: 'Contact',
    contactUs: 'Contactez-nous', tagline: 'Votre spécialiste en immobilier neuf sur la Costa Blanca',
  },
  no: {
    buy: 'Kjøp', allProperties: 'Alle eiendommer', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Innflyttingsklare', apartments: 'Leiligheter', villas: 'Villaer', under300k: 'Under €300k', finance: 'Finansiering & Boliglån',
    developments: 'Prosjekter', allDevelopments: 'Alle prosjekter', cbSouth: 'Costa Blanca Sør', cbNorth: 'Costa Blanca Nord', builders: 'Våre utbyggere',
    areas: 'Områder', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'Alle områder',
    luxury: 'Luksus', luxuryCollection: 'Luksuskolleksjon', villas800k: 'Villaer €800k-€2M', bespoke2m: 'Eksklusive €2M+', seaView: 'Havutsikt', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Golfeiendommer', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'Om oss', aboutUs: 'Om oss', buyerGuides: 'Kjøperguider', afterSales: 'Ettersalgsservice', blog: 'Blogg', contact: 'Kontakt',
    contactUs: 'Kontakt oss', tagline: 'Din spesialist for nybygg på Costa Blanca',
  },
  de: {
    buy: 'Kaufen', allProperties: 'Alle Immobilien', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Schlüsselfertig', apartments: 'Apartments', villas: 'Villen', under300k: 'Unter €300k', finance: 'Finanzierung & Hypothek',
    developments: 'Projekte', allDevelopments: 'Alle Projekte', cbSouth: 'Costa Blanca Süd', cbNorth: 'Costa Blanca Nord', builders: 'Unsere Bauträger',
    areas: 'Gebiete', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'Alle Gebiete',
    luxury: 'Luxus', luxuryCollection: 'Luxuskollektion', villas800k: 'Villen €800k-€2M', bespoke2m: 'Exklusiv €2M+', seaView: 'Meerblick', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Golf-Immobilien', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'Über uns', aboutUs: 'Über uns', buyerGuides: 'Kaufratgeber', afterSales: 'After-Sales-Service', blog: 'Blog', contact: 'Kontakt',
    contactUs: 'Kontakt', tagline: 'Ihr Spezialist für Neubauimmobilien an der Costa Blanca',
  },
  pl: {
    buy: 'Kup', allProperties: 'Wszystkie nieruchomości', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Pod klucz', apartments: 'Apartamenty', villas: 'Wille', under300k: 'Poniżej €300k', finance: 'Finansowanie & Kredyty',
    developments: 'Inwestycje', allDevelopments: 'Wszystkie inwestycje', cbSouth: 'Costa Blanca Południe', cbNorth: 'Costa Blanca Północ', builders: 'Nasi deweloperzy',
    areas: 'Regiony', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'Wszystkie regiony',
    luxury: 'Luksus', luxuryCollection: 'Kolekcja luksusowa', villas800k: 'Wille €800k-€2M', bespoke2m: 'Ekskluzywne €2M+', seaView: 'Widok na morze', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Nieruchomości golfowe', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'O nas', aboutUs: 'O nas', buyerGuides: 'Poradniki kupujących', afterSales: 'Obsługa posprzedażowa', blog: 'Blog', contact: 'Kontakt',
    contactUs: 'Skontaktuj się', tagline: 'Twój specjalista od nowych nieruchomości na Costa Blanca',
  },
  ru: {
    buy: 'Купить', allProperties: 'Все объекты', costaBlanca: 'Коста Бланка', costaCalida: 'Коста Калида (Мурсия)',
    keyReady: 'Под ключ', apartments: 'Квартиры', villas: 'Виллы', under300k: 'До €300к', finance: 'Финансирование и ипотека',
    developments: 'Проекты', allDevelopments: 'Все проекты', cbSouth: 'Коста Бланка Юг', cbNorth: 'Коста Бланка Север', builders: 'Наши застройщики',
    areas: 'Районы', torrevieja: 'Торревьеха', orihuelaCosta: 'Ориуэла Коста', javea: 'Хавеа', viewAllAreas: 'Все районы',
    luxury: 'Люкс', luxuryCollection: 'Люкс коллекция', villas800k: 'Виллы €800к-€2М', bespoke2m: 'Эксклюзив €2М+', seaView: 'Вид на море', javeaMoraira: 'Хавеа и Морайра',
    golf: 'Гольф', golfProperties: 'Гольф-недвижимость', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'О нас', aboutUs: 'О нас', buyerGuides: 'Гиды покупателя', afterSales: 'Послепродажное обслуживание', blog: 'Блог', contact: 'Контакты',
    contactUs: 'Связаться', tagline: 'Ваш специалист по новостройкам на Коста Бланке',
  },
};

// Language configurations — nl-be MUST come before nl so prefix detection works correctly
const LANGUAGES = [
  { code: 'en', prefix: '', label: 'English', short: 'EN', flag: { bg: '#012169', type: 'uk' } },
  { code: 'sv', prefix: '/sv', label: 'Svenska', short: 'SV', flag: { bg: '#006AA7', type: 'se' } },
  { code: 'nl-be', prefix: '/nl-be', label: 'Vlaams', short: 'BE', flag: { bg: '#000', type: 'be' } },
  { code: 'nl', prefix: '/nl', label: 'Nederlands', short: 'NL', flag: { bg: '#21468B', type: 'nl' } },
  { code: 'fr', prefix: '/fr', label: 'Fran\u00e7ais', short: 'FR', flag: { bg: '#002395', type: 'fr' } },
  { code: 'no', prefix: '/no', label: 'Norsk', short: 'NO', flag: { bg: '#BA0C2F', type: 'no' } },
  { code: 'de', prefix: '/de', label: 'Deutsch', short: 'DE', flag: { bg: '#000', type: 'de' } },
  { code: 'pl', prefix: '/pl', label: 'Polski', short: 'PL', flag: { bg: '#DC143C', type: 'pl' } },
  { code: 'ru', prefix: '/ru', label: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439', short: 'RU', flag: { bg: '#0039A6', type: 'ru' } },
];

function FlagIcon({ type }: { type: string }) {
  switch (type) {
    case 'uk':
      return (
        <svg viewBox="0 0 60 42" className="w-full h-full">
          <rect width="60" height="42" fill="#012169"/>
          <path d="M0,0 L60,42 M60,0 L0,42" stroke="#fff" strokeWidth="7"/>
          <path d="M0,0 L60,42 M60,0 L0,42" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30,0 V42 M0,21 H60" stroke="#fff" strokeWidth="11"/>
          <path d="M30,0 V42 M0,21 H60" stroke="#C8102E" strokeWidth="7"/>
        </svg>
      );
    case 'se':
      return (
        <svg viewBox="0 0 60 42" className="w-full h-full">
          <rect width="60" height="42" fill="#006AA7"/>
          <rect x="18" width="6" height="42" fill="#FECC02"/>
          <rect y="18" width="60" height="6" fill="#FECC02"/>
        </svg>
      );
    case 'nl':
      return (
        <svg viewBox="0 0 60 42" className="w-full h-full">
          <rect width="60" height="14" fill="#AE1C28"/>
          <rect y="14" width="60" height="14" fill="#FFF"/>
          <rect y="28" width="60" height="14" fill="#21468B"/>
        </svg>
      );
    case 'be':
      return (
        <svg viewBox="0 0 60 42" className="w-full h-full">
          <rect width="20" height="42" fill="#000"/>
          <rect x="20" width="20" height="42" fill="#FAE042"/>
          <rect x="40" width="20" height="42" fill="#ED2939"/>
        </svg>
      );
    case 'fr':
      return (
        <svg viewBox="0 0 60 42" className="w-full h-full">
          <rect width="20" height="42" fill="#002395"/>
          <rect x="20" width="20" height="42" fill="#FFF"/>
          <rect x="40" width="20" height="42" fill="#ED2939"/>
        </svg>
      );
    case 'no':
      return (
        <svg viewBox="0 0 60 42" className="w-full h-full">
          <rect width="60" height="42" fill="#BA0C2F"/>
          <rect x="16" width="12" height="42" fill="#FFF"/>
          <rect y="15" width="60" height="12" fill="#FFF"/>
          <rect x="18" width="8" height="42" fill="#00205B"/>
          <rect y="17" width="60" height="8" fill="#00205B"/>
        </svg>
      );
    case 'de':
      return (
        <svg viewBox="0 0 60 42" className="w-full h-full">
          <rect width="60" height="14" fill="#000"/>
          <rect y="14" width="60" height="14" fill="#DD0000"/>
          <rect y="28" width="60" height="14" fill="#FFCC00"/>
        </svg>
      );
    case 'pl':
      return (
        <svg viewBox="0 0 60 42" className="w-full h-full">
          <rect width="60" height="21" fill="#FFF"/>
          <rect y="21" width="60" height="21" fill="#DC143C"/>
        </svg>
      );
    case 'ru':
      return (
        <svg viewBox="0 0 60 42" className="w-full h-full">
          <rect width="60" height="14" fill="#FFF"/>
          <rect y="14" width="60" height="14" fill="#0039A6"/>
          <rect y="28" width="60" height="14" fill="#D52B1E"/>
        </svg>
      );
    default:
      return null;
  }
}

// Language switcher component — dropdown with 9 languages
function LanguageSwitcher({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Detect current locale from path
  const currentLang = LANGUAGES.find(l => l.prefix && pathname.startsWith(l.prefix)) || LANGUAGES[0];

  // Build path for a target language — with fallback for untranslated subpages
  const getPathForLang = (lang: typeof LANGUAGES[number]) => {
    // Strip current prefix to get base path
    let basePath = pathname;
    if (currentLang.prefix) {
      basePath = pathname.replace(new RegExp(`^${currentLang.prefix}`), '') || '/';
    }

    // If switching to English, always use the base path (all English pages exist)
    if (!lang.prefix) return basePath;

    // Top-level pages that exist for ALL languages
    const alwaysTranslated = [
      '/', '/areas', '/blog', '/properties', '/developments',
      '/contact', '/about', '/guides', '/golf', '/luxury', '/inland', '/builders',
    ];

    if (alwaysTranslated.includes(basePath)) {
      return `${lang.prefix}${basePath === '/' ? '' : basePath}`;
    }

    // Blog articles — translated versions exist for all languages
    if (basePath.startsWith('/blog/')) {
      return `${lang.prefix}${basePath}`;
    }

    // Area detail pages — re-exports exist for all languages
    if (basePath.startsWith('/areas/')) {
      return `${lang.prefix}${basePath}`;
    }

    // Guide subpages — some are translated, most are English-only
    // Fall back to /guides index for the target language
    if (basePath.startsWith('/guides/')) {
      // Only these guide slugs are the same across all languages
      const universalGuides = ['/guides/torrevieja', '/guides/javea'];
      if (universalGuides.includes(basePath)) {
        return `${lang.prefix}${basePath}`;
      }
      // Other guides: fall back to guides index in target language
      return `${lang.prefix}/guides`;
    }

    // Properties/developments/golf/builders detail pages — all have translated versions
    // Preserve the full path so /properties/N9497 → /fr/properties/N9497
    if (basePath.startsWith('/properties/')) return `${lang.prefix}${basePath}`;
    if (basePath.startsWith('/developments/')) return `${lang.prefix}${basePath}`;
    if (basePath.startsWith('/golf/')) return `${lang.prefix}${basePath}`;
    if (basePath.startsWith('/builders/')) return `${lang.prefix}${basePath}`;

    // Default: try the translated path (works for any new routes added later)
    return `${lang.prefix}${basePath === '/' ? '' : basePath}`;
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent-500"
        aria-label="Select language"
      >
        <span className="inline-block w-5 h-3.5 rounded-sm overflow-hidden border border-warm-300">
          <FlagIcon type={currentLang.flag.type} />
        </span>
        <span className="text-xs">{currentLang.short}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 bg-white border border-warm-200 rounded-sm shadow-lg z-50 min-w-[160px] max-h-[320px] overflow-y-auto py-1">
            {LANGUAGES.map(lang => (
              <Link
                key={lang.code}
                href={getPathForLang(lang)}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-warm-50 transition-colors ${
                  lang.code === currentLang.code ? 'bg-warm-50 text-accent-600 font-medium' : 'text-primary-900'
                }`}
              >
                <span className="inline-block w-5 h-3.5 rounded-sm overflow-hidden border border-warm-200 flex-shrink-0">
                  <FlagIcon type={lang.flag.type} />
                </span>
                <span>{lang.label}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Detect current language prefix from pathname
function useCurrentLangPrefix() {
  const pathname = usePathname();
  // Check longer prefixes first (nl-be before nl)
  const sorted = LANGUAGES.filter(l => l.prefix).sort((a, b) => b.prefix.length - a.prefix.length);
  return sorted.find(l => pathname.startsWith(l.prefix))?.prefix || '';
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const langPrefix = useCurrentLangPrefix();
  const pathname = usePathname();

  // Detect current language code for translations
  const currentLangCode = LANGUAGES.filter(l => l.prefix)
    .sort((a, b) => b.prefix.length - a.prefix.length)
    .find(l => pathname.startsWith(l.prefix))?.code || 'en';

  // Get label for a nav key in current language
  const t = (key: string) => NAV_LABELS[currentLangCode]?.[key] || NAV_LABELS.en[key] || key;

  // Prepend current language prefix to internal links
  const localizeHref = (href: string) => {
    if (!langPrefix) return href;
    // Don't prefix external links or anchors
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) return href;
    // Root path: /sv instead of /sv/
    if (href === '/') return langPrefix;
    return `${langPrefix}${href}`;
  };

  return (
    <header className="bg-warm-50 border-b border-warm-300 sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-primary-900 text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-warm-300">{t('tagline')}</span>
          <div className="flex items-center gap-4">
            <a href={`tel:${CONTACT.phone}`} className="hover:text-accent-500 transition-colors flex items-center gap-1">
              <span>📞</span> {CONTACT.phone}
            </a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-accent-500 transition-colors flex items-center gap-1">
              <span>💬</span> WhatsApp
            </a>
            <div className="border-l border-white/20 pl-3 ml-1">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Clean round logo only */}
          <Link href={localizeHref('/')} className="flex items-center">
            <Image
              src="/images/logo/logo-round.png"
              alt="New Build Homes Costa Blanca"
              width={70}
              height={70}
              className="h-16 sm:h-[70px] w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.key} className="relative group">
                <Link
                  href={localizeHref(item.href)}
                  className="px-4 py-2 text-warm-700 hover:text-primary-900 font-medium transition-colors flex items-center gap-1"
                >
                  {t(item.key)}
                  {item.submenu && (
                    <svg className="w-4 h-4 text-warm-500 group-hover:text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {/* Dropdown */}
                {item.submenu && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-lg shadow-medium border border-warm-300 py-2 min-w-[200px]">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={localizeHref(subItem.href)}
                          className="block px-4 py-2 text-warm-700 hover:bg-warm-100 hover:text-primary-900 transition-colors"
                        >
                          {t(subItem.key)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary-900 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm"
            >
              <span>💬</span> WhatsApp
            </a>
            <Link
              href={localizeHref('/contact')}
              className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm"
            >
              {t('contactUs')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-warm-700 hover:text-primary-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-warm-300 pt-4">
            {NAV_ITEMS.map((item) => (
              <div key={item.key} className="border-b border-warm-200 last:border-0">
                <button
                  className="w-full flex items-center justify-between py-3 text-warm-800 font-medium"
                  onClick={() => setOpenSubmenu(openSubmenu === item.key ? null : item.key)}
                >
                  {t(item.key)}
                  {item.submenu && (
                    <svg
                      className={`w-4 h-4 transition-transform ${openSubmenu === item.key ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                {item.submenu && openSubmenu === item.key && (
                  <div className="pl-4 pb-3">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={localizeHref(subItem.href)}
                        className="block py-2 text-warm-600 hover:text-primary-900"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t(subItem.key)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Language Switcher - Mobile */}
            <div className="py-3 border-b border-warm-200 flex items-center justify-between">
              <span className="text-warm-600 text-sm">Language</span>
              <LanguageSwitcher />
            </div>

            {/* Mobile CTA buttons */}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-primary-900 text-white py-3 rounded-md font-medium"
              >
                💬 WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center justify-center gap-2 bg-accent-500 text-white py-3 rounded-md font-medium"
              >
                📞 Call {CONTACT.phone}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
