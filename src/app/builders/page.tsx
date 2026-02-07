import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBuilders, getDevelopmentStats } from '@/lib/development-service';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Property Developers Costa Blanca | 100+ Trusted Builders',
  description: 'Browse 100+ trusted property developers building new homes across Costa Blanca. View portfolios, current projects, and price ranges from leading Spanish builders.',
  openGraph: {
    title: 'Property Developers Costa Blanca',
    description: 'Browse 100+ trusted property developers building new homes across Costa Blanca.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/builders',
  },
};

// Format price
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

// Floating WhatsApp CTA
function WhatsAppCTA() {
  return (
    <a
      href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all group"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-primary-900 text-white text-sm px-3 py-2 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us!
      </span>
    </a>
  );
}

export default async function BuildersPage() {
  // Fetch data from the development service
  const [builders, stats] = await Promise.all([
    getAllBuilders(),
    getDevelopmentStats(),
  ]);

  // Segment builders by size
  const majorBuilders = builders.filter(b => b.developmentCount >= 5);
  const establishedBuilders = builders.filter(b => b.developmentCount >= 2 && b.developmentCount < 5);
  const otherBuilders = builders.filter(b => b.developmentCount < 2);

  // Breadcrumb schema
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Builders', url: 'https://newbuildhomescostablanca.com/builders/' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }}
      />

      <main className="min-h-screen bg-warm-50">
        {/* HERO SECTION */}
        <section className="relative bg-primary-900 py-16 md:py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Builders</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Property Developers
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                <span className="font-semibold">{builders.length}+</span> Trusted Builders
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed mb-8">
                We work with established property developers across Costa Blanca, from major national builders to local specialists. Each has been vetted for quality, reliability, and after-sales service.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div>
                  <div className="text-2xl font-semibold text-white">{builders.length}+</div>
                  <div className="text-warm-400 text-sm">Builders</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">{stats.totalDevelopments}+</div>
                  <div className="text-warm-400 text-sm">Developments</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">{stats.totalUnits}+</div>
                  <div className="text-warm-400 text-sm">Units Available</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">From {formatPrice(stats.lowestPrice)}</div>
                  <div className="text-warm-400 text-sm">Starting Price</div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/developments"
                  className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2.5 rounded-sm font-medium transition-colors text-sm"
                >
                  View All Developments
                </Link>
                <a
                  href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-sm font-medium transition-colors inline-flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Ask About a Builder
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* MAJOR BUILDERS */}
        {majorBuilders.length > 0 && (
          <section className="py-14 bg-white border-b border-warm-200">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-primary-900 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                    Major <span className="font-semibold">Developers</span>
                  </h2>
                  <p className="text-warm-600 mt-1">
                    {majorBuilders.length} builders with 5+ active developments
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {majorBuilders.map((builder) => (
                  <Link
                    key={builder.slug}
                    href={`/builders/${builder.slug}`}
                    className="group bg-white p-6 rounded-sm border border-warm-200 hover:border-accent-500 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-primary-900 group-hover:text-accent-600 transition-colors">
                          {builder.name}
                        </h3>
                        <p className="text-warm-500 text-sm">
                          {builder.developmentCount} developments • {builder.totalUnits} units
                        </p>
                      </div>
                      <div className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-1 rounded">
                        {builder.developmentCount}
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <span className="text-warm-500 text-sm">Price Range:</span>
                        <p className="font-medium text-primary-900">{builder.priceRange}</p>
                      </div>
                      <div>
                        <span className="text-warm-500 text-sm">Regions:</span>
                        <p className="font-medium text-primary-900">
                          {builder.regions.slice(0, 2).join(', ')}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {builder.towns.slice(0, 4).map((town) => (
                        <span key={town} className="bg-warm-100 text-warm-600 text-xs px-2 py-0.5 rounded">
                          {town}
                        </span>
                      ))}
                      {builder.towns.length > 4 && (
                        <span className="text-warm-500 text-xs px-2 py-0.5">
                          +{builder.towns.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-warm-200">
                      <span className="text-accent-600 font-medium text-sm group-hover:text-accent-700 transition-colors">
                        View Portfolio
                      </span>
                      <svg className="w-4 h-4 text-accent-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA BANNER */}
        <section className="py-10 bg-accent-500">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  Looking for a specific builder?
                </h3>
                <p className="text-white/90">
                  Tell us which developer you&apos;re interested in and we&apos;ll provide full details on their projects.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-accent-600 hover:bg-warm-50 px-6 py-3 rounded-sm font-medium transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
                <Link
                  href="/contact"
                  className="bg-primary-900 hover:bg-primary-800 text-white px-6 py-3 rounded-sm font-medium transition-colors"
                >
                  Contact Form
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ESTABLISHED BUILDERS */}
        {establishedBuilders.length > 0 && (
          <section className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-px bg-accent-500" />
                    <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                      Quality Builders
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                    Established <span className="font-semibold">Developers</span>
                  </h2>
                  <p className="text-warm-600 mt-1">
                    {establishedBuilders.length} builders with 2-4 active developments
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {establishedBuilders.map((builder) => (
                  <Link
                    key={builder.slug}
                    href={`/builders/${builder.slug}`}
                    className="group bg-white p-5 rounded-sm border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
                  >
                    <h3 className="font-semibold text-primary-900 mb-1 group-hover:text-accent-600 transition-colors">
                      {builder.name}
                    </h3>
                    <div className="flex items-center gap-2 text-warm-500 text-sm mb-3">
                      <span>{builder.developmentCount} developments</span>
                      <span>•</span>
                      <span>{builder.totalUnits} units</span>
                    </div>
                    <div className="text-sm text-warm-600 mb-3">
                      {builder.priceRange}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {builder.towns.slice(0, 3).map((town) => (
                        <span key={town} className="bg-warm-100 text-warm-600 text-xs px-2 py-0.5 rounded">
                          {town}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ALL OTHER BUILDERS */}
        {otherBuilders.length > 0 && (
          <section className="py-14 bg-white border-t border-warm-200">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                    All <span className="font-semibold">Builders</span>
                  </h2>
                  <p className="text-warm-600 mt-1">
                    {otherBuilders.length} additional developers with active projects
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {otherBuilders.map((builder) => (
                  <Link
                    key={builder.slug}
                    href={`/builders/${builder.slug}`}
                    className="group bg-warm-50 p-4 rounded-sm border border-warm-200 hover:border-accent-500 hover:bg-white transition-all"
                  >
                    <h3 className="font-medium text-primary-900 group-hover:text-accent-600 transition-colors text-sm truncate">
                      {builder.name}
                    </h3>
                    <p className="text-warm-500 text-xs mt-1">
                      {builder.totalUnits} units • {builder.towns[0] || 'Costa Blanca'}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* WHY WORK WITH US */}
        <section className="py-14 bg-primary-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Our Promise
                </span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-white mb-3">
                Why Work With Us?
              </h2>
              <p className="text-warm-300 max-w-2xl mx-auto">
                We&apos;ve built relationships with every major developer in Costa Blanca.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Vetted Builders</h3>
                <p className="text-warm-300 text-sm">
                  Every developer we work with has been checked for quality, financial stability, and customer service.
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Best Prices</h3>
                <p className="text-warm-300 text-sm">
                  Our volume and relationships mean we can often secure better prices and payment plans than going direct.
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Full Support</h3>
                <p className="text-warm-300 text-sm">
                  From first viewing to key handover, we guide you through every step of buying from a Spanish developer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
              Ready to Explore Builder Projects?
            </h2>

            <p className="text-warm-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              With {builders.length}+ trusted builders and {stats.totalDevelopments}+ developments, we&apos;ll help you find the perfect new build home in Costa Blanca.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/developments"
                className="bg-primary-900 hover:bg-primary-800 text-white font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Browse All Developments
              </Link>
              <a
                href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-8 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        <WhatsAppCTA />
      </main>
    </>
  );
}
