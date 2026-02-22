import Link from 'next/link';
import { Metadata } from 'next';

/**
 * Global 404 Page
 * ===============
 * Clean, professional 404 with strong internal linking for SEO.
 * Helps Google recrawl valuable pages instead of wasting crawl budget on dead URLs.
 */

export const metadata: Metadata = {
  title: 'Page Not Found | New Build Homes Costa Blanca',
  robots: {
    index: false,
    follow: true, // Still follow internal links
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* Hero */}
      <div className="bg-primary-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Page Not Found</h2>
          <p className="text-lg text-warm-300 max-w-xl mx-auto">
            This page doesn't exist or has been moved. Let us help you find what you're looking for.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Primary CTA */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center mb-12">
          <h3 className="text-2xl font-bold text-primary-900 mb-4">
            New Build Homes on the Costa Blanca
          </h3>
          <p className="text-warm-600 mb-8 max-w-lg mx-auto">
            Find your dream home in Spain — modern apartments, luxury villas, and townhouses
            from the best developers on the Costa Blanca.
          </p>
          <Link
            href="/"
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors duration-200"
          >
            Go to Homepage
          </Link>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-primary-900 mb-3">Properties</h4>
            <ul className="space-y-2">
              <li><Link href="/properties" className="text-accent-600 hover:text-accent-500 transition-colors">All Properties</Link></li>
              <li><Link href="/properties/apartments" className="text-accent-600 hover:text-accent-500 transition-colors">Apartments</Link></li>
              <li><Link href="/properties/villas" className="text-accent-600 hover:text-accent-500 transition-colors">Villas</Link></li>
              <li><Link href="/luxury" className="text-accent-600 hover:text-accent-500 transition-colors">Luxury Homes</Link></li>
              <li><Link href="/inland" className="text-accent-600 hover:text-accent-500 transition-colors">Inland Properties</Link></li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-primary-900 mb-3">Explore Areas</h4>
            <ul className="space-y-2">
              <li><Link href="/developments" className="text-accent-600 hover:text-accent-500 transition-colors">All Developments</Link></li>
              <li><Link href="/developments/costa-blanca-south" className="text-accent-600 hover:text-accent-500 transition-colors">Costa Blanca South</Link></li>
              <li><Link href="/developments/costa-blanca-north" className="text-accent-600 hover:text-accent-500 transition-colors">Costa Blanca North</Link></li>
              <li><Link href="/areas" className="text-accent-600 hover:text-accent-500 transition-colors">All Areas</Link></li>
              <li><Link href="/golf" className="text-accent-600 hover:text-accent-500 transition-colors">Golf Properties</Link></li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-primary-900 mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/guides" className="text-accent-600 hover:text-accent-500 transition-colors">Buyer's Guides</Link></li>
              <li><Link href="/blog" className="text-accent-600 hover:text-accent-500 transition-colors">Blog & News</Link></li>
              <li><Link href="/builders" className="text-accent-600 hover:text-accent-500 transition-colors">Developers</Link></li>
              <li><Link href="/about" className="text-accent-600 hover:text-accent-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-accent-600 hover:text-accent-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="text-center border-t border-warm-200 pt-8">
          <p className="text-warm-600 mb-4">
            Need help finding something? We're here to assist.
          </p>
          <a
            href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-500 font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
