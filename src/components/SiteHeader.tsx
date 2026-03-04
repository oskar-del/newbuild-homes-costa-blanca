'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
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

// ──────────────────────────────────────────────
// Navigation structure
// ──────────────────────────────────────────────

// Condensed top-bar nav: only the main 4 categories with dropdowns
const MEGA_NAV = [
  {
    key: 'buy',
    href: '/properties',
    megaMenu: {
      links: [
        { key: 'allProperties', href: '/properties' },
        { key: 'keyReady', href: '/properties/key-ready' },
        { key: 'apartments', href: '/properties/apartments' },
        { key: 'villas', href: '/properties/villas' },
        { key: 'under300k', href: '/properties/under-300k' },
        { key: 'finance', href: '/finance' },
      ],
      cards: [
        {
          title: 'Key-Ready Homes',
          description: 'Move in within weeks',
          href: '/properties/key-ready',
          image: 'https://fotos15.apinmo.com/7515/21616952/3-1.jpg',
        },
        {
          title: 'Browse All',
          description: '500+ new build properties',
          href: '/properties',
          image: 'https://fotos15.apinmo.com/7515/21616952/3-4.jpg',
        },
      ],
    },
  },
  {
    key: 'areas',
    href: '/areas',
    megaMenu: {
      links: [
        { key: 'cbSouth', href: '/areas/costa-blanca-south' },
        { key: 'cbNorth', href: '/areas/costa-blanca-north' },
        { key: 'torrevieja', href: '/areas/torrevieja' },
        { key: 'orihuelaCosta', href: '/areas/orihuela-costa' },
        { key: 'javea', href: '/areas/javea' },
        { key: 'viewAllAreas', href: '/areas' },
      ],
      cards: [
        {
          title: 'Costa Blanca South',
          description: 'Sun, golf & beaches',
          href: '/areas/costa-blanca-south',
          image: '/images/Drone 2/Areas & Zones/Torrevieja/La Mata/La Mata .jpg',
        },
        {
          title: 'Costa Blanca North',
          description: 'Mountains meet the sea',
          href: '/areas/costa-blanca-north',
          image: '/images/Drone 2/Areas & Zones/Orihuela Costa/Cala Capitan .jpg',
        },
      ],
    },
  },
  {
    key: 'luxury',
    href: '/luxury',
    megaMenu: {
      links: [
        { key: 'luxuryCollection', href: '/luxury' },
        { key: 'villas800k', href: '/luxury?maxPrice=2000000' },
        { key: 'bespoke2m', href: '/luxury?minPrice=2000000' },
        { key: 'seaView', href: '/properties?features=sea-view&minPrice=800000' },
        { key: 'javeaMoraira', href: '/luxury?region=north' },
      ],
      cards: [
        {
          title: 'Luxury Collection',
          description: 'Exclusive Mediterranean living',
          href: '/luxury',
          image: '/images/developments/atlantis.jpeg',
        },
        {
          title: 'Jávea & Moraira',
          description: 'North coast prestige',
          href: '/luxury?region=north',
          image: '/images/developments/posidionia.jpg',
        },
      ],
    },
  },
  {
    key: 'golf',
    href: '/golf',
    megaMenu: {
      links: [
        { key: 'golfProperties', href: '/golf' },
        { key: 'laFinca', href: '/golf/la-finca-golf' },
        { key: 'villamartin', href: '/golf/villamartin-golf' },
        { key: 'lasRamblas', href: '/golf/las-ramblas-golf' },
        { key: 'loRomero', href: '/golf/lo-romero-golf' },
      ],
      cards: [
        {
          title: 'Golf Living',
          description: 'Fairway frontline homes',
          href: '/golf',
          image: 'https://fotos15.apinmo.com/7515/16689067/12-1.jpg',
        },
      ],
    },
  },
];

// Full menu links for the hamburger overlay
const FULL_MENU = [
  { key: 'findHome', label: 'Find Your Home', href: '/properties' },
  { key: 'luxury', label: 'Luxury Collection', href: '/luxury' },
  { key: 'golf', label: 'Golf Properties', href: '/golf' },
  { key: 'areas', label: 'Explore Areas', href: '/areas' },
  { key: 'guides', label: 'Buyer Guides', href: '/guides' },
  { key: 'contact', label: 'Say Hello', href: '/contact' },
];

const FULL_MENU_SECONDARY = [
  { key: 'developments', href: '/developments' },
  { key: 'builders', href: '/builders' },
  { key: 'blog', href: '/blog' },
  { key: 'finance', href: '/finance' },
  { key: 'afterSales', href: '/after-sales' },
  { key: 'aboutUs', href: '/about' },
];

// Translations for all navigation labels per language code
const NAV_LABELS: Record<string, Record<string, string>> = {
  en: {
    buy: 'Buy', allProperties: 'All Properties', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Key-Ready Homes', apartments: 'Apartments', villas: 'Villas', under300k: 'Under €300k', finance: 'Finance & Mortgages',
    developments: 'Developments', allDevelopments: 'All Developments', cbSouth: 'Costa Blanca South', cbNorth: 'Costa Blanca North', builders: 'Our Builders',
    areas: 'Areas', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'View All Areas',
    luxury: 'Luxury', luxuryCollection: 'Luxury Collection', villas800k: 'Villas €800k–€2M', bespoke2m: 'Bespoke €2M+', seaView: 'Sea View Properties', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Golf Properties', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'About', aboutUs: 'About Us', buyerGuides: 'Buyer Guides', afterSales: 'After Sales', blog: 'Blog', contact: 'Contact',
    contactUs: 'Contact Us', tagline: 'New Build Property Specialists',
    findHome: 'Find Your Home', guides: 'Buyer Guides',
  },
  sv: {
    buy: 'Köp', allProperties: 'Alla bostäder', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Inflyttningsklara', apartments: 'Lägenheter', villas: 'Villor', under300k: 'Under €300k', finance: 'Finansiering & Bolån',
    developments: 'Projekt', allDevelopments: 'Alla projekt', cbSouth: 'Costa Blanca Söder', cbNorth: 'Costa Blanca Norr', builders: 'Våra byggare',
    areas: 'Områden', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'Alla områden',
    luxury: 'Lyx', luxuryCollection: 'Lyxkollektion', villas800k: 'Villor €800k–€2M', bespoke2m: 'Exklusiva €2M+', seaView: 'Havsutsikt', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Golfbostäder', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'Om oss', aboutUs: 'Om oss', buyerGuides: 'Köparguider', afterSales: 'Efterservice', blog: 'Blogg', contact: 'Kontakt',
    contactUs: 'Kontakta oss', tagline: 'Specialister på nybyggda bostäder',
    findHome: 'Hitta ditt hem', guides: 'Köparguider',
  },
  nl: {
    buy: 'Kopen', allProperties: 'Alle woningen', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Instapklaar', apartments: 'Appartementen', villas: "Villa's", under300k: 'Onder €300k', finance: 'Financiering & Hypotheek',
    developments: 'Projecten', allDevelopments: 'Alle projecten', cbSouth: 'Costa Blanca Zuid', cbNorth: 'Costa Blanca Noord', builders: 'Onze bouwers',
    areas: 'Gebieden', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'Alle gebieden',
    luxury: 'Luxe', luxuryCollection: 'Luxe collectie', villas800k: "Villa's €800k–€2M", bespoke2m: 'Exclusief €2M+', seaView: 'Zeezicht', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Golfwoningen', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'Over ons', aboutUs: 'Over ons', buyerGuides: 'Koopgidsen', afterSales: 'Naservice', blog: 'Blog', contact: 'Contact',
    contactUs: 'Neem contact op', tagline: 'Specialist in nieuwbouwwoningen',
    findHome: 'Vind uw woning', guides: 'Koopgidsen',
  },
  'nl-be': {
    buy: 'Kopen', allProperties: 'Alle woningen', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Instapklaar', apartments: 'Appartementen', villas: "Villa's", under300k: 'Onder €300k', finance: 'Financiering & Hypotheek',
    developments: 'Projecten', allDevelopments: 'Alle projecten', cbSouth: 'Costa Blanca Zuid', cbNorth: 'Costa Blanca Noord', builders: 'Onze bouwers',
    areas: 'Gebieden', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'Alle gebieden',
    luxury: 'Luxe', luxuryCollection: 'Luxe collectie', villas800k: "Villa's €800k–€2M", bespoke2m: 'Exclusief €2M+', seaView: 'Zeezicht', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Golfwoningen', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'Over ons', aboutUs: 'Over ons', buyerGuides: 'Koopgidsen', afterSales: 'Naservice', blog: 'Blog', contact: 'Contact',
    contactUs: 'Neem contact op', tagline: 'Specialist in nieuwbouwwoningen',
    findHome: 'Vind uw woning', guides: 'Koopgidsen',
  },
  fr: {
    buy: 'Acheter', allProperties: 'Tous les biens', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Clé en main', apartments: 'Appartements', villas: 'Villas', under300k: 'Moins de €300k', finance: 'Financement & Prêts',
    developments: 'Programmes', allDevelopments: 'Tous les programmes', cbSouth: 'Costa Blanca Sud', cbNorth: 'Costa Blanca Nord', builders: 'Nos promoteurs',
    areas: 'Régions', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'Toutes les régions',
    luxury: 'Luxe', luxuryCollection: 'Collection luxe', villas800k: 'Villas €800k–€2M', bespoke2m: 'Sur mesure €2M+', seaView: 'Vue mer', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Biens golf', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'À propos', aboutUs: 'À propos', buyerGuides: "Guides d'achat", afterSales: 'Service après-vente', blog: 'Blog', contact: 'Contact',
    contactUs: 'Contactez-nous', tagline: 'Spécialiste en immobilier neuf',
    findHome: 'Trouvez votre maison', guides: "Guides d'achat",
  },
  no: {
    buy: 'Kjøp', allProperties: 'Alle eiendommer', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Innflyttingsklare', apartments: 'Leiligheter', villas: 'Villaer', under300k: 'Under €300k', finance: 'Finansiering & Boliglån',
    developments: 'Prosjekter', allDevelopments: 'Alle prosjekter', cbSouth: 'Costa Blanca Sør', cbNorth: 'Costa Blanca Nord', builders: 'Våre utbyggere',
    areas: 'Områder', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'Alle områder',
    luxury: 'Luksus', luxuryCollection: 'Luksuskolleksjon', villas800k: 'Villaer €800k–€2M', bespoke2m: 'Eksklusive €2M+', seaView: 'Havutsikt', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Golfeiendommer', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'Om oss', aboutUs: 'Om oss', buyerGuides: 'Kjøperguider', afterSales: 'Ettersalgsservice', blog: 'Blogg', contact: 'Kontakt',
    contactUs: 'Kontakt oss', tagline: 'Spesialist på nybygg',
    findHome: 'Finn ditt hjem', guides: 'Kjøperguider',
  },
  de: {
    buy: 'Kaufen', allProperties: 'Alle Immobilien', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Schlüsselfertig', apartments: 'Apartments', villas: 'Villen', under300k: 'Unter €300k', finance: 'Finanzierung & Hypothek',
    developments: 'Projekte', allDevelopments: 'Alle Projekte', cbSouth: 'Costa Blanca Süd', cbNorth: 'Costa Blanca Nord', builders: 'Unsere Bauträger',
    areas: 'Gebiete', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'Alle Gebiete',
    luxury: 'Luxus', luxuryCollection: 'Luxuskollektion', villas800k: 'Villen €800k–€2M', bespoke2m: 'Exklusiv €2M+', seaView: 'Meerblick', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Golf-Immobilien', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'Über uns', aboutUs: 'Über uns', buyerGuides: 'Kaufratgeber', afterSales: 'After-Sales-Service', blog: 'Blog', contact: 'Kontakt',
    contactUs: 'Kontakt', tagline: 'Spezialist für Neubauimmobilien',
    findHome: 'Finden Sie Ihr Zuhause', guides: 'Kaufratgeber',
  },
  pl: {
    buy: 'Kup', allProperties: 'Wszystkie nieruchomości', costaBlanca: 'Costa Blanca', costaCalida: 'Costa Calida (Murcia)',
    keyReady: 'Pod klucz', apartments: 'Apartamenty', villas: 'Wille', under300k: 'Poniżej €300k', finance: 'Finansowanie & Kredyty',
    developments: 'Inwestycje', allDevelopments: 'Wszystkie inwestycje', cbSouth: 'Costa Blanca Południe', cbNorth: 'Costa Blanca Północ', builders: 'Nasi deweloperzy',
    areas: 'Regiony', torrevieja: 'Torrevieja', orihuelaCosta: 'Orihuela Costa', javea: 'Jávea', viewAllAreas: 'Wszystkie regiony',
    luxury: 'Luksus', luxuryCollection: 'Kolekcja luksusowa', villas800k: 'Wille €800k–€2M', bespoke2m: 'Ekskluzywne €2M+', seaView: 'Widok na morze', javeaMoraira: 'Jávea & Moraira',
    golf: 'Golf', golfProperties: 'Nieruchomości golfowe', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'O nas', aboutUs: 'O nas', buyerGuides: 'Poradniki kupujących', afterSales: 'Obsługa posprzedażowa', blog: 'Blog', contact: 'Kontakt',
    contactUs: 'Skontaktuj się', tagline: 'Specjalista od nowych nieruchomości',
    findHome: 'Znajdź swój dom', guides: 'Poradniki kupujących',
  },
  ru: {
    buy: 'Купить', allProperties: 'Все объекты', costaBlanca: 'Коста Бланка', costaCalida: 'Коста Калида (Мурсия)',
    keyReady: 'Под ключ', apartments: 'Квартиры', villas: 'Виллы', under300k: 'До €300к', finance: 'Финансирование и ипотека',
    developments: 'Проекты', allDevelopments: 'Все проекты', cbSouth: 'Коста Бланка Юг', cbNorth: 'Коста Бланка Север', builders: 'Наши застройщики',
    areas: 'Районы', torrevieja: 'Торревьеха', orihuelaCosta: 'Ориуэла Коста', javea: 'Хавеа', viewAllAreas: 'Все районы',
    luxury: 'Люкс', luxuryCollection: 'Люкс коллекция', villas800k: 'Виллы €800к–€2М', bespoke2m: 'Эксклюзив €2М+', seaView: 'Вид на море', javeaMoraira: 'Хавеа и Морайра',
    golf: 'Гольф', golfProperties: 'Гольф-недвижимость', laFinca: 'La Finca Golf', villamartin: 'Villamartín Golf', lasRamblas: 'Las Ramblas Golf', loRomero: 'Lo Romero Golf',
    about: 'О нас', aboutUs: 'О нас', buyerGuides: 'Гиды покупателя', afterSales: 'Послепродажное обслуживание', blog: 'Блог', contact: 'Контакты',
    contactUs: 'Связаться', tagline: 'Специалист по новостройкам',
    findHome: 'Найдите свой дом', guides: 'Гиды покупателя',
  },
};

// Language configurations — nl-be MUST come before nl so prefix detection works correctly
const LANGUAGES = [
  { code: 'en', prefix: '', label: 'English', short: 'EN', flag: { bg: '#012169', type: 'uk' } },
  { code: 'sv', prefix: '/sv', label: 'Svenska', short: 'SV', flag: { bg: '#006AA7', type: 'se' } },
  { code: 'nl-be', prefix: '/nl-be', label: 'Vlaams', short: 'BE', flag: { bg: '#000', type: 'be' } },
  { code: 'nl', prefix: '/nl', label: 'Nederlands', short: 'NL', flag: { bg: '#21468B', type: 'nl' } },
  { code: 'fr', prefix: '/fr', label: 'Français', short: 'FR', flag: { bg: '#002395', type: 'fr' } },
  { code: 'no', prefix: '/no', label: 'Norsk', short: 'NO', flag: { bg: '#BA0C2F', type: 'no' } },
  { code: 'de', prefix: '/de', label: 'Deutsch', short: 'DE', flag: { bg: '#000', type: 'de' } },
  { code: 'pl', prefix: '/pl', label: 'Polski', short: 'PL', flag: { bg: '#DC143C', type: 'pl' } },
  { code: 'ru', prefix: '/ru', label: 'Русский', short: 'RU', flag: { bg: '#0039A6', type: 'ru' } },
];

// ──────────────────────────────────────────────
// Flag icons (inline SVG)
// ──────────────────────────────────────────────
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

// ──────────────────────────────────────────────
// Language switcher
// ──────────────────────────────────────────────
function LanguageSwitcher({ className = '', textColor = 'text-warm-600' }: { className?: string; textColor?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const currentLang = LANGUAGES.find(l => l.prefix && pathname.startsWith(l.prefix)) || LANGUAGES[0];

  const getPathForLang = (lang: typeof LANGUAGES[number]) => {
    let basePath = pathname;
    if (currentLang.prefix) {
      basePath = pathname.replace(new RegExp(`^${currentLang.prefix}`), '') || '/';
    }
    if (!lang.prefix) return basePath;

    const alwaysTranslated = [
      '/', '/areas', '/blog', '/properties', '/developments',
      '/contact', '/about', '/guides', '/golf', '/luxury', '/inland', '/builders',
    ];
    if (alwaysTranslated.includes(basePath)) {
      return `${lang.prefix}${basePath === '/' ? '' : basePath}`;
    }
    if (basePath.startsWith('/blog/')) return `${lang.prefix}${basePath}`;
    if (basePath.startsWith('/areas/')) return `${lang.prefix}${basePath}`;
    if (basePath.startsWith('/guides/')) {
      const universalGuides = ['/guides/torrevieja', '/guides/javea'];
      if (universalGuides.includes(basePath)) return `${lang.prefix}${basePath}`;
      return `${lang.prefix}/guides`;
    }
    if (basePath.startsWith('/properties/')) return `${lang.prefix}${basePath}`;
    if (basePath.startsWith('/developments/')) return `${lang.prefix}${basePath}`;
    if (basePath.startsWith('/golf/')) return `${lang.prefix}${basePath}`;
    if (basePath.startsWith('/builders/')) return `${lang.prefix}${basePath}`;
    return `${lang.prefix}${basePath === '/' ? '' : basePath}`;
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent-500 ${textColor}`}
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

// ──────────────────────────────────────────────
// Detect current language prefix from pathname
// ──────────────────────────────────────────────
function useCurrentLangPrefix() {
  const pathname = usePathname();
  const sorted = LANGUAGES.filter(l => l.prefix).sort((a, b) => b.prefix.length - a.prefix.length);
  return sorted.find(l => pathname.startsWith(l.prefix))?.prefix || '';
}

// ──────────────────────────────────────────────
// HEADER COMPONENT
// ──────────────────────────────────────────────
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);
  const langPrefix = useCurrentLangPrefix();
  const pathname = usePathname();

  const currentLangCode = LANGUAGES.filter(l => l.prefix)
    .sort((a, b) => b.prefix.length - a.prefix.length)
    .find(l => pathname.startsWith(l.prefix))?.code || 'en';

  const t = (key: string) => NAV_LABELS[currentLangCode]?.[key] || NAV_LABELS.en[key] || key;

  const localizeHref = (href: string) => {
    if (!langPrefix) return href;
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) return href;
    if (href === '/') return langPrefix;
    return `${langPrefix}${href}`;
  };

  // Scroll detection for header style change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setActiveMega(null);
  }, [pathname]);

  const openMega = (key: string) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setActiveMega(key);
  };
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          menuOpen ? 'z-[60]' : 'z-50'
        } ${
          scrolled && !menuOpen
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-warm-100'
            : menuOpen
              ? 'bg-transparent'
              : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href={localizeHref('/')} className="flex items-center relative z-10">
              <Image
                src="/images/logo/logo-round.png"
                alt="New Build Homes Costa Blanca"
                width={56}
                height={56}
                className="h-11 md:h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop mega-nav — center */}
            <div className="hidden lg:flex items-center gap-1">
              {MEGA_NAV.map((item) => (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => openMega(item.key)}
                  onMouseLeave={closeMega}
                >
                  <Link
                    href={localizeHref(item.href)}
                    className={`px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors flex items-center gap-1 ${
                      scrolled ? 'text-primary-900 hover:text-accent-600' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {t(item.key)}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${activeMega === item.key ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {item.megaMenu && activeMega === item.key && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                      onMouseEnter={() => openMega(item.key)}
                      onMouseLeave={closeMega}
                    >
                      <div className="bg-warm-50 border border-warm-200 shadow-xl min-w-[600px] p-6 flex gap-8">
                        {/* Left — text links */}
                        <div className="flex-1 min-w-[180px]">
                          {item.megaMenu.links.map((link) => (
                            <Link
                              key={link.href}
                              href={localizeHref(link.href)}
                              className="block py-2 font-display text-base text-primary-900 hover:text-accent-600 transition-colors"
                            >
                              {t(link.key)}
                            </Link>
                          ))}
                        </div>

                        {/* Right — image cards */}
                        <div className="flex gap-4">
                          {item.megaMenu.cards.map((card) => (
                            <Link
                              key={card.href}
                              href={localizeHref(card.href)}
                              className="group block w-52 overflow-hidden"
                            >
                              <div className="relative h-36 overflow-hidden rounded-sm mb-2">
                                <Image
                                  src={card.image}
                                  alt={card.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  sizes="208px"
                                  unoptimized={card.image.startsWith('http')}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent" />
                                <div className="absolute bottom-2 left-3 right-3">
                                  <p className="text-white text-sm font-medium">{card.title}</p>
                                </div>
                              </div>
                              <p className="text-xs text-warm-500">{card.description}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Journal / Blog link — no dropdown */}
              <Link
                href={localizeHref('/blog')}
                className={`px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors ${
                  scrolled ? 'text-primary-900 hover:text-accent-600' : 'text-white/90 hover:text-white'
                }`}
              >
                {t('blog')}
              </Link>
            </div>

            {/* Right side — language + heart + hamburger */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Language — desktop only */}
              <div className="hidden md:block">
                <LanguageSwitcher textColor={scrolled ? 'text-warm-600' : 'text-white/80'} />
              </div>

              {/* Phone — desktop only */}
              <a
                href={`tel:${CONTACT.phone}`}
                className={`hidden md:flex items-center gap-1.5 text-sm transition-colors ${
                  scrolled ? 'text-primary-900 hover:text-accent-600' : 'text-white/90 hover:text-white'
                }`}
                aria-label="Call us"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </a>

              {/* Hamburger button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-colors ${
                  menuOpen
                    ? 'text-primary-900'
                    : scrolled
                      ? 'text-primary-900 hover:text-accent-600'
                      : 'text-white hover:text-white/80'
                }`}
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-[1.5px] bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
                <span className={`block w-6 h-[1.5px] bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ──────────────────────────────────────────── */}
      {/* FULLSCREEN MENU OVERLAY — Verity-inspired */}
      {/* ──────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[55] transition-all duration-500 ${
          menuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-warm-50" />

        <div className="relative h-full flex flex-col md:flex-row overflow-y-auto">
          {/* Left panel — featured image (desktop) */}
          <div className="hidden md:block md:w-2/5 relative">
            <Image
              src="/images/developments/atlantis.jpeg"
              alt="Luxury villa in Costa Blanca"
              fill
              className="object-cover"
              sizes="40vw"
            />
            <div className="absolute inset-0 bg-primary-900/20" />
            {/* Logo watermark */}
            <div className="absolute top-8 left-8">
              <Image
                src="/images/logo/logo-round.png"
                alt=""
                width={60}
                height={60}
                className="opacity-80"
              />
            </div>
            {/* Contact info */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="text-white space-y-2">
                <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2 text-sm hover:text-accent-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {CONTACT.phone}
                </a>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-accent-400 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right panel — navigation links */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-24 md:py-12">
            {/* Primary links — large serif */}
            <nav className="mb-10 md:mb-12">
              {FULL_MENU.map((item, i) => (
                <Link
                  key={item.key}
                  href={localizeHref(item.href)}
                  onClick={() => setMenuOpen(false)}
                  className="block font-display text-3xl md:text-4xl lg:text-5xl font-light text-primary-900 hover:text-accent-600 transition-colors py-2 md:py-3"
                  style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
                >
                  {t(item.key) || item.label}
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <div className="w-full h-px bg-warm-200 mb-8" />

            {/* Secondary links — two columns, smaller uppercase */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-10">
              {FULL_MENU_SECONDARY.map((item) => (
                <Link
                  key={item.key}
                  href={localizeHref(item.href)}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm tracking-wide uppercase text-warm-500 hover:text-primary-900 transition-colors"
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>

            {/* Language + Social */}
            <div className="flex items-center justify-between">
              <LanguageSwitcher textColor="text-warm-600" />

              {/* Social icons */}
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/newbuildhomescostablanca" target="_blank" rel="noopener noreferrer" className="text-warm-400 hover:text-primary-900 transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="https://www.facebook.com/newbuildhomescostablanca" target="_blank" rel="noopener noreferrer" className="text-warm-400 hover:text-primary-900 transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer so content doesn't hide behind fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
}
