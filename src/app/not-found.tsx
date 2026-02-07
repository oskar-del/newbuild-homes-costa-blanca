import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-warm-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* 404 Heading */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-primary-900 mb-3">Page Not Found</h2>
          <p className="text-lg text-warm-600 mb-6">
            We couldn't find the page you're looking for. Let's get you back on track.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 mb-6 w-full sm:w-auto"
          >
            Back to Home
          </Link>
        </div>

        {/* Key Sections */}
        <div className="border-t border-warm-300 pt-10">
          <p className="text-sm font-semibold text-warm-600 uppercase tracking-wide mb-6">
            Explore Our Sections
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
            <Link
              href="/properties"
              className="text-accent-600 hover:text-accent-500 font-medium transition-colors"
            >
              Properties
            </Link>
            <Link
              href="/developments"
              className="text-accent-600 hover:text-accent-500 font-medium transition-colors"
            >
              Developments
            </Link>
            <Link
              href="/areas"
              className="text-accent-600 hover:text-accent-500 font-medium transition-colors"
            >
              Areas
            </Link>
            <Link
              href="/contact"
              className="text-accent-600 hover:text-accent-500 font-medium transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Contact Option */}
        <div className="border-t border-warm-300 pt-10">
          <p className="text-warm-600 mb-4 text-sm">
            Can't find what you're looking for?
          </p>
          <a
            href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-accent-600 hover:text-accent-500 font-semibold transition-colors"
          >
            Contact us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
