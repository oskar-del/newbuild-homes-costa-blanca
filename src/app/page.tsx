import { Metadata } from 'next';
import PropertyCarousel from '@/components/PropertyCarousel';
import Link from 'next/link';
import carouselData from '@/content/homepage-carousels.json';

export const metadata: Metadata = {
  title: 'New Build Homes Costa Blanca | Premium Properties in Spain',
  description: 'Discover new build properties in Costa Blanca, Spain. Golf villas, sea view apartments, luxury homes from €164,000. Expert guidance for international buyers.',
  openGraph: {
    title: 'New Build Homes Costa Blanca | Premium Properties in Spain',
    description: 'Discover new build properties in Costa Blanca, Spain. Golf villas, sea view apartments, luxury homes.',
    type: 'website',
  },
};

export default function HomePage() {
  const { carousels } = carouselData;

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-stone-800 via-stone-700 to-stone-800 text-white">
        <div className="absolute inset-0 bg-[url('/images/costa-blanca-hero.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find Your Dream Home in{' '}
              <span className="text-amber-400">Costa Blanca</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-300 mb-8">
              New build properties from trusted developers. Golf villas, beachfront apartments, 
              and luxury homes across Spain's sunshine coast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/properties"
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-lg text-center transition-colors"
              >
                Browse All Properties
              </Link>
              <Link
                href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg text-center transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-600">500+</div>
              <div className="text-stone-600">New Build Properties</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-600">€164k</div>
              <div className="text-stone-600">Starting Price</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-600">15+</div>
              <div className="text-stone-600">Trusted Developers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-600">300+</div>
              <div className="text-stone-600">Days of Sunshine</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* COSTA BLANCA SOUTH */}
      {/* ============================================ */}
      <section className="py-12 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          {/* Region Header */}
          <div className="px-4 lg:px-0 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-1 bg-amber-500 rounded"></div>
              <span className="text-amber-600 font-semibold uppercase tracking-wide text-sm">Popular Region</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800">Costa Blanca South</h2>
            <p className="text-stone-600 mt-2 max-w-2xl">
              Torrevieja, Orihuela Costa, Guardamar and more. Affordable prices, golf resorts, 
              and a large international community.
            </p>
          </div>

          {/* South Carousels */}
          <PropertyCarousel
            id={carousels['south-golf'].id}
            title={carousels['south-golf'].title}
            subtitle={carousels['south-golf'].subtitle}
            properties={carousels['south-golf'].properties}
            viewAllLink={carousels['south-golf'].viewAllLink}
            viewAllText={carousels['south-golf'].viewAllText}
          />

          <PropertyCarousel
            id={carousels['south-under400k'].id}
            title={carousels['south-under400k'].title}
            subtitle={carousels['south-under400k'].subtitle}
            properties={carousels['south-under400k'].properties}
            viewAllLink={carousels['south-under400k'].viewAllLink}
            viewAllText={carousels['south-under400k'].viewAllText}
          />

          <PropertyCarousel
            id={carousels['south-luxury'].id}
            title={carousels['south-luxury'].title}
            subtitle={carousels['south-luxury'].subtitle}
            properties={carousels['south-luxury'].properties}
            viewAllLink={carousels['south-luxury'].viewAllLink}
            viewAllText={carousels['south-luxury'].viewAllText}
          />

          <PropertyCarousel
            id={carousels['south-inland'].id}
            title={carousels['south-inland'].title}
            subtitle={carousels['south-inland'].subtitle}
            properties={carousels['south-inland'].properties}
            viewAllLink={carousels['south-inland'].viewAllLink}
            viewAllText={carousels['south-inland'].viewAllText}
          />
        </div>
      </section>

      {/* ============================================ */}
      {/* COSTA BLANCA NORTH */}
      {/* ============================================ */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Region Header */}
          <div className="px-4 lg:px-0 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-1 bg-blue-500 rounded"></div>
              <span className="text-blue-600 font-semibold uppercase tracking-wide text-sm">Premium Region</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800">Costa Blanca North</h2>
            <p className="text-stone-600 mt-2 max-w-2xl">
              Jávea, Moraira, Calpe, Altea and Dénia. Dramatic coastlines, charming towns, 
              and exclusive properties with stunning sea views.
            </p>
          </div>

          {/* North Carousels */}
          <PropertyCarousel
            id={carousels['north-luxury'].id}
            title={carousels['north-luxury'].title}
            subtitle={carousels['north-luxury'].subtitle}
            properties={carousels['north-luxury'].properties}
            viewAllLink={carousels['north-luxury'].viewAllLink}
            viewAllText={carousels['north-luxury'].viewAllText}
          />

          <PropertyCarousel
            id={carousels['north-calpe'].id}
            title={carousels['north-calpe'].title}
            subtitle={carousels['north-calpe'].subtitle}
            properties={carousels['north-calpe'].properties}
            viewAllLink={carousels['north-calpe'].viewAllLink}
            viewAllText={carousels['north-calpe'].viewAllText}
          />

          <PropertyCarousel
            id={carousels['north-denia'].id}
            title={carousels['north-denia'].title}
            subtitle={carousels['north-denia'].subtitle}
            properties={carousels['north-denia'].properties}
            viewAllLink={carousels['north-denia'].viewAllLink}
            viewAllText={carousels['north-denia'].viewAllText}
          />
        </div>
      </section>

      {/* ============================================ */}
      {/* COMPARISON CTA */}
      {/* ============================================ */}
      <section className="py-16 bg-gradient-to-br from-stone-800 to-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Not Sure Which Region Is Right For You?
          </h2>
          <p className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto">
            Costa Blanca North offers dramatic scenery and exclusive properties. 
            Costa Blanca South has better value and more golf options. 
            We'll help you decide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/guides/north-vs-south"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Read Our Comparison Guide
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-white/20"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHY CHOOSE US */}
      {/* ============================================ */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              Why Buy With Us?
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              We specialize exclusively in new build properties, working directly with 
              Costa Blanca's most trusted developers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Trusted Developers Only</h3>
              <p className="text-stone-600">
                We only work with established builders like Contrimar, Taylor Wimpey España, 
                and other proven developers with track records of quality and on-time delivery.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Multilingual Support</h3>
              <p className="text-stone-600">
                We speak English, Swedish, French, Dutch, and Spanish. 
                Get personalized guidance in your language throughout the entire buying process.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">Mortgage Assistance</h3>
              <p className="text-stone-600">
                Our partner Habeno compares mortgage offers from multiple Spanish banks, 
                helping you secure the best financing as an international buyer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURED ARTICLES */}
      {/* ============================================ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              Helpful Guides for Buyers
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Everything you need to know about buying property in Costa Blanca, 
              from choosing your location to completing your purchase.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {carouselData.featuredArticles.map((article) => (
              <Link
                key={article.id}
                href={article.link}
                className="group bg-stone-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-stone-200 to-stone-300 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  {article.region !== 'both' && (
                    <span className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded ${
                      article.region === 'south' 
                        ? 'bg-amber-100 text-amber-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      Costa Blanca {article.region === 'south' ? 'South' : 'North'}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-stone-800 group-hover:text-amber-600 transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-stone-600 text-sm">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-amber-600 font-medium text-sm mt-4 group-hover:gap-2 transition-all">
                    Read Guide
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-stone-600 hover:text-amber-600 font-medium transition-colors"
            >
              View All Guides
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="py-16 bg-gradient-to-br from-amber-500 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Spanish Dream Home?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Contact us today for personalized property recommendations, 
            video tours, and expert guidance on buying in Costa Blanca.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us Now
            </Link>
            <Link
              href="tel:+34634044970"
              className="bg-white text-amber-600 hover:bg-amber-50 font-semibold px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call +34 634 044 970
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
