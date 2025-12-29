const fs = require('fs');

const content = `'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              New Build Homes Costa Blanca
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/developments" className="text-gray-700 hover:text-blue-600">
              Developments
            </Link>
            <Link href="/builders" className="text-gray-700 hover:text-blue-600">
              Builders
            </Link>
            <Link href="/areas" className="text-gray-700 hover:text-blue-600">
              Areas
            </Link>
            
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              WhatsApp
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <Link href="/developments" className="block py-2 text-gray-700">Developments</Link>
            <Link href="/builders" className="block py-2 text-gray-700">Builders</Link>
            <Link href="/areas" className="block py-2 text-gray-700">Areas</Link>
            
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-green-600 font-semibold"
            >
              WhatsApp Us
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
`;

fs.writeFileSync('src/components/Header.tsx', content);
console.log('Header.tsx created');
