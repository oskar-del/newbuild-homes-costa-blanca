'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const BRAND = {
  navy: '#1e3a5f',
  orange: '#e8913a',
  orangeHover: '#d4792c',
};

const CONTACT = {
  phone: '+34 634 044 970',
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
};

// Navigation structure
const NAV_ITEMS = [
  {
    label: 'Properties',
    href: '/properties',
    submenu: [
      { label: 'All Properties', href: '/properties' },
      { label: 'New Builds', href: '/properties?type=new-build' },
      { label: 'Apartments', href: '/properties?propertyType=apartment' },
      { label: 'Villas', href: '/properties?propertyType=villa' },
      { label: 'Townhouses', href: '/properties?propertyType=townhouse' },
    ],
  },
  {
    label: 'Areas',
    href: '/areas',
    submenu: [
      { label: 'Costa Blanca South', href: '/areas?region=south' },
      { label: 'Costa Blanca North', href: '/areas?region=north' },
      { label: 'Torrevieja', href: '/areas/torrevieja' },
      { label: 'Orihuela Costa', href: '/areas/orihuela-costa' },
      { label: 'Javea', href: '/areas/javea' },
      { label: 'View All Areas', href: '/areas' },
    ],
  },
  {
    label: 'Golf',
    href: '/golf',
    submenu: [
      { label: 'Golf Properties', href: '/golf' },
      { label: 'La Finca Golf', href: '/golf/la-finca' },
      { label: 'Villamartin Golf', href: '/golf/villamartin' },
      { label: 'Las Ramblas Golf', href: '/golf/las-ramblas' },
      { label: 'View All Courses', href: '/golf/courses' },
    ],
  },
  {
    label: 'Guides',
    href: '/guides',
    submenu: [
      { label: 'Buying Process', href: '/guides/buying-process' },
      { label: 'NIE Number', href: '/guides/nie-number' },
      { label: 'Mortgages', href: '/guides/mortgages' },
      { label: 'Taxes & Costs', href: '/guides/taxes-costs' },
      { label: 'Tourist Rental License', href: '/guides/tourist-rental-license' },
      { label: 'North vs South', href: '/guides/costa-blanca-north-vs-south' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    submenu: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Builders', href: '/builders' },
      { label: 'Developments', href: '/developments' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-[#1e3a5f] text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>Your Costa Blanca New Build Property Specialists</span>
          <div className="flex items-center gap-4">
            <a href={`tel:${CONTACT.phone}`} className="hover:text-[#e8913a] transition-colors flex items-center gap-1">
              <span>📞</span> {CONTACT.phone}
            </a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors flex items-center gap-1">
              <span>💬</span> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {/* Desktop: Horizontal logo */}
            <div className="hidden sm:flex items-center gap-3">
              <Image
                src="/images/logo-icon.png"
                alt="New Build Homes Costa Blanca"
                width={50}
                height={50}
                className="h-12 w-auto"
                priority
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#1e3a5f] leading-tight">NEW BUILD HOMES</span>
                <span className="text-lg italic text-[#e8913a]" style={{ fontFamily: 'cursive' }}>Costa Blanca</span>
              </div>
            </div>
            {/* Mobile: Icon only */}
            <div className="sm:hidden">
              <Image
                src="/images/logo-icon.png"
                alt="New Build Homes Costa Blanca"
                width={45}
                height={45}
                className="h-11 w-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="px-4 py-2 text-stone-700 hover:text-[#e8913a] font-medium transition-colors flex items-center gap-1"
                >
                  {item.label}
                  {item.submenu && (
                    <svg className="w-4 h-4 text-stone-400 group-hover:text-[#e8913a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {/* Dropdown */}
                {item.submenu && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-lg shadow-lg border border-stone-100 py-2 min-w-[200px]">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-stone-600 hover:bg-stone-50 hover:text-[#e8913a] transition-colors"
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
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              <span>💬</span> WhatsApp
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-[#e8913a] hover:bg-[#d4792c] text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-stone-600 hover:text-[#e8913a]"
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
          <div className="lg:hidden mt-4 pb-4 border-t border-stone-100 pt-4">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-stone-100 last:border-0">
                <button
                  className="w-full flex items-center justify-between py-3 text-stone-700 font-medium"
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
                        className="block py-2 text-stone-500 hover:text-[#e8913a]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTA buttons */}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-lg font-medium"
              >
                💬 WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center justify-center gap-2 bg-[#e8913a] text-white py-3 rounded-lg font-medium"
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
