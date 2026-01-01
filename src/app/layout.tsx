import type { Metadata } from 'next';

import './globals.css';
import { organizationSchema, websiteSchema, localBusinessSchema, toJsonLd } from '@/lib/schema';



export const metadata: Metadata = {
  title: {
    default: 'New Build Homes Costa Blanca | Modern Properties in Spain',
    template: '%s | New Build Homes Costa Blanca',
  },
  description: 'Find your dream new build property in Costa Blanca. Modern apartments, villas and townhouses from trusted developers. Expert guidance for international buyers.',
  metadataBase: new URL('https://newbuildhomescostablanca.com'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'New Build Homes Costa Blanca',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(websiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(localBusinessSchema()) }}
        />
      </head>
      <body className="font-sans">
        <Header />
        
        {/* Hidden forms for Netlify detection */}
        <form name="lead-inquiry" data-netlify="true" netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <textarea name="message" />
          <input type="text" name="property-interest" />
        </form>
        <form name="sidebar-inquiry" data-netlify="true" netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <input type="text" name="property-interest" />
        </form>
        
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-gray-900">
          New Build Homes <span className="text-blue-600">Costa Blanca</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          <a href="/developments" className="text-gray-600 hover:text-gray-900">Developments</a>
          <a href="/areas" className="text-gray-600 hover:text-gray-900">Areas</a>
          <a href="/golf" className="text-gray-600 hover:text-gray-900">Golf</a>
          <a href="/builders" className="text-gray-600 hover:text-gray-900">Builders</a>
          <a href="/guides/buying-process" className="text-gray-600 hover:text-gray-900">Buying Guide</a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
        </nav>
        <a
          href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
        >
          WhatsApp Us
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold mb-4">New Build Homes Costa Blanca</h3>
          <p className="text-sm">Your trusted partner for new build properties in Costa Blanca, Spain.</p>
          <p className="text-sm mt-2">Part of the Hansson and Hertzell Group</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/developments" className="hover:text-white">All Developments</a></li>
            <li><a href="/areas" className="hover:text-white">Areas</a></li>
            <li><a href="/builders" className="hover:text-white">Builders</a></li>
            <li><a href="/golf" className="hover:text-white">Golf Properties</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Buyer Guides</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/guides/buying-process" className="hover:text-white">Buying Process</a></li>
            <li><a href="/guides/nie-number" className="hover:text-white">NIE Number</a></li>
            <li><a href="/guides/mortgages" className="hover:text-white">Mortgage Guide</a></li>
            <li><a href="/guides/costs-taxes" className="hover:text-white">Costs and Taxes</a></li>
                  <li><a href="/guides/why-new-build" className="hover:text-white">Why Buy New Build</a></li>          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>+34 634 044 970</li>
            <li>oskar@hanssonhertzell.com</li>
            <li className="pt-2">
              <a
                href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium"
              >
                WhatsApp Us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-sm text-center">
        © 2025 New Build Homes Costa Blanca. All rights reserved.
      </div>
    </footer>
  );
}
