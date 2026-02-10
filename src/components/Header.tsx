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

// Navigation structure
const NAV_ITEMS = [
  {
    label: 'Buy',
    href: '/properties',
    submenu: [
      { label: 'All Properties', href: '/properties' },
      { label: 'Costa Blanca', href: '/properties/costa-blanca' },
      { label: 'Costa Calida (Murcia)', href: '/properties/costa-calida' },
      { label: 'Key-Ready Homes', href: '/properties/key-ready' },
      { label: 'Apartments', href: '/properties/apartments' },
      { label: 'Villas', href: '/properties/villas' },
      { label: 'Under €300k', href: '/properties/under-300k' },
      { label: 'Finance & Mortgages', href: '/finance' },
    ],
  },
  {
    label: 'Developments',
    href: '/developments',
    submenu: [
      { label: 'All Developments', href: '/developments' },
      { label: 'Costa Blanca South', href: '/developments/costa-blanca-south' },
      { label: 'Costa Blanca North', href: '/developments/costa-blanca-north' },
      { label: 'Costa Calida (Murcia)', href: '/areas/costa-calida' },
      { label: 'Our Builders', href: '/builders' },
    ],
  },
  {
    label: 'Areas',
    href: '/areas',
    submenu: [
      { label: 'Costa Blanca South', href: '/areas/costa-blanca-south' },
      { label: 'Costa Blanca North', href: '/areas/costa-blanca-north' },
      { label: 'Costa Calida (Murcia)', href: '/areas/costa-calida' },
      { label: 'Torrevieja', href: '/areas/torrevieja' },
      { label: 'Orihuela Costa', href: '/areas/orihuela-costa' },
      { label: 'Jávea', href: '/areas/javea' },
      { label: 'View All Areas', href: '/areas' },
    ],
  },
  {
    label: 'Luxury',
    href: '/luxury',
    submenu: [
      { label: 'Luxury Collection', href: '/luxury' },
      { label: 'Villas €800k-€2M', href: '/luxury?maxPrice=2000000' },
      { label: 'Bespoke €2M+', href: '/luxury?minPrice=2000000' },
      { label: 'Sea View Properties', href: '/properties?features=sea-view&minPrice=800000' },
      { label: 'Jávea & Moraira', href: '/luxury?region=north' },
    ],
  },
  {
    label: 'Golf',
    href: '/golf',
    submenu: [
      { label: 'Golf Properties', href: '/golf' },
      { label: 'La Finca Golf', href: '/golf/la-finca-golf' },
      { label: 'Villamartín Golf', href: '/golf/villamartin-golf' },
      { label: 'Las Ramblas Golf', href: '/golf/las-ramblas-golf' },
      { label: 'Lo Romero Golf', href: '/golf/lo-romero-golf' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    submenu: [
      { label: 'About Us', href: '/about' },
      { label: 'Buyer Guides', href: '/guides' },
      { label: 'After Sales Services', href: '/after-sales' },
      { label: 'Finance & Mortgages', href: '/finance' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

// Language configurations
const LANGUAGES = [
  { code: 'en', prefix: '', label: 'English', short: 'EN', flag: { bg: '#012169', type: 'uk' } },
  { code: 'sv', prefix: '/sv', label: 'Svenska', short: 'SV', flag: { bg: '#006AA7', type: 'se' } },
  { code: 'nl', prefix: '/nl', label: 'Nederlands', short: 'NL', flag: { bg: '#21468B', type: 'nl' } },
  { code: 'nl-be', prefix: '/nl-be', label: 'Vlaams', short: 'BE', flag: { bg: '#000', type: 'be' } },
  { code: 'fr', prefix: '/fr', label: 'Fran\u00e7ais', short: 'FR', flag: { bg: '#002395', type: 'fr' } },
  { code: 'no', prefix: '/no', label: 'Norsk', short: 'NO', flag: { bg: '#BA0C2F', type: 'no' } },
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
    default:
      return null;
  }
}

// Language switcher component — dropdown with 6 languages
function LanguageSwitcher({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Detect current locale from path
  const currentLang = LANGUAGES.find(l => l.prefix && pathname.startsWith(l.prefix)) || LANGUAGES[0];

  // Build path for a target language
  const getPathForLang = (lang: typeof LANGUAGES[number]) => {
    // Strip current prefix
    let basePath = pathname;
    if (currentLang.prefix) {
      basePath = pathname.replace(new RegExp(`^${currentLang.prefix}`), '') || '/';
    }
    // Add target prefix
    return lang.prefix ? `${lang.prefix}${basePath === '/' ? '' : basePath}` : basePath;
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
          <div className="absolute right-0 top-full mt-2 bg-white border border-warm-200 rounded-sm shadow-lg z-50 min-w-[160px] py-1">
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

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <header className="bg-warm-50 border-b border-warm-300 sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-primary-900 text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-warm-300">Your Costa Blanca New Build Property Specialists</span>
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
          <Link href="/" className="flex items-center">
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
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="px-4 py-2 text-warm-700 hover:text-primary-900 font-medium transition-colors flex items-center gap-1"
                >
                  {item.label}
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
                          href={subItem.href}
                          className="block px-4 py-2 text-warm-700 hover:bg-warm-100 hover:text-primary-900 transition-colors"
                        >
                          {subItem.label}
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
              href="/contact"
              className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm"
            >
              Contact Us
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
              <div key={item.label} className="border-b border-warm-200 last:border-0">
                <button
                  className="w-full flex items-center justify-between py-3 text-warm-800 font-medium"
                  onClick={() => setOpenSubmenu(openSubmenu === item.label ? null : item.label)}
                >
                  {item.label}
                  {item.submenu && (
                    <svg
                      className={`w-4 h-4 transition-transform ${openSubmenu === item.label ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                {item.submenu && openSubmenu === item.label && (
                  <div className="pl-4 pb-3">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block py-2 text-warm-600 hover:text-primary-900"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.label}
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
