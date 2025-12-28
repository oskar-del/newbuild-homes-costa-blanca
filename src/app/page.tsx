import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import LeadForm from '@/components/LeadForm';

// Temporary featured developments data - will come from XML/API later
const featuredDevelopments = [
  {
    slug: 'oasis-golf-la-finca',
    name: 'Oasis Golf La Finca',
    location: 'Algorfa',
    status: 'key-ready',
    statusLabel: 'Key Ready',
    priceFrom: 261000,
    bedrooms: '2-3',
    image: '/images/developments/oasis-golf-hero.jpg',
    highlight: 'Frontline Golf',
  },
  {
    slug: 'oasis-laguna-ii',
    name: 'Oasis Laguna II',
    location: 'Guardamar del Segura',
    status: 'under-construction',
    statusLabel: 'Under Construction',
    priceFrom: 222000,
    bedrooms: '2-3',
    image: '/images/developments/oasis-laguna-hero.jpg',
    highlight: 'Tourist License Included',
  },
];

const benefits = [
  {
    icon: '🏠',
    title: 'New Build Specialists',
    description: 'We focus exclusively on new build properties from trusted developers across Costa Blanca.',
  },
  {
    icon: '🌍',
    title: 'Multilingual Service',
    description: 'We speak English, Swedish, Spanish, Dutch, and French to help international buyers.',
  },
  {
    icon: '🔑',
    title: 'Key-Ready Homes',
    description: 'Browse properties ready to move into immediately - no waiting for construction.',
  },
  {
    icon: '💰',
    title: 'Mortgage Assistance',
    description: 'We partner with Habeno to help you secure the best financing from Spanish banks.',
  },
];

const areas = [
  { name: 'Torrevieja', count: 45, slug: 'torrevieja' },
  { name: 'Orihuela Costa', count: 38, slug: 'orihuela-costa' },
  { name: 'Guardamar', count: 22, slug: 'guardamar' },
  { name: 'Algorfa', count: 15, slug: 'algorfa' },
  { name: 'Finestrat', count: 18, slug: 'finestrat' },
  { name: 'Benidorm', count: 28, slug: 'benidorm' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-pattern text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10"></div>
        <div className="container-wide relative py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-success-400 rounded-full mr-2 animate-pulse"></span>
                Key-Ready Properties Available Now
              </div>
              <h1 className="heading-1 text-white mb-6">
                Your Dream Home in{' '}
                <span className="text-accent-400">Costa Blanca</span>{' '}
                Awaits
              </h1>
              <p className="lead text-primary-100 mb-8">
                Discover new build apartments, villas, and investment properties from 
                trusted developers. Expert guidance for international buyers - we make 
                buying in Spain simple.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/developments" className="btn-accent">
                  Browse Developments
                </Link>
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-primary-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No Hidden Fees
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Trusted Developers
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Expert Support
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              {/* Quick Contact Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-slate-800">
                <h3 className="font-display font-bold text-xl mb-2">
                  Get Property Alerts
                </h3>
                <p className="text-slate-600 mb-6">
                  Be the first to know about new developments and key-ready homes.
                </p>
                <LeadForm compact source="homepage-hero" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Developments */}
      <section className="section bg-slate-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-slate-900 mb-4">
              Featured New Build Developments
            </h2>
            <p className="lead max-w-2xl mx-auto">
              Hand-picked properties from Costa Blanca's most trusted developers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredDevelopments.map((dev) => (
              <Link
                key={dev.slug}
                href={`/developments/${dev.slug}`}
                className="property-card group"
              >
                <div className="relative h-64 bg-slate-200">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                    <span className="text-white/50 text-lg">{dev.name}</span>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={dev.status === 'key-ready' ? 'badge-key-ready' : 'badge-construction'}>
                      {dev.statusLabel}
                    </span>
                    {dev.highlight && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-accent-500 text-white">
                        {dev.highlight}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-primary-600 transition-colors">
                        {dev.name}
                      </h3>
                      <p className="text-slate-500">{dev.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">From</p>
                      <p className="price-tag">
                        €{dev.priceFrom.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {dev.bedrooms} Bed
                    </span>
                    <span className="text-primary-600 font-medium group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/developments" className="btn-primary">
              View All Developments
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-slate-900 mb-4">
              Why Buy Through Us?
            </h2>
            <p className="lead max-w-2xl mx-auto">
              We're not just another property portal - we're your partners in finding 
              the perfect new build home in Spain
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-display font-semibold text-lg text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Area */}
      <section className="section bg-slate-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-slate-900 mb-4">
              Explore Costa Blanca
            </h2>
            <p className="lead max-w-2xl mx-auto">
              From vibrant coastal towns to peaceful golf resorts - find your perfect location
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="card p-6 text-center hover:-translate-y-1 transition-all"
              >
                <h3 className="font-display font-semibold text-slate-900 mb-1">
                  {area.name}
                </h3>
                <p className="text-sm text-primary-600">
                  {area.count} properties
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/areas" className="btn-outline">
              View All Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Golf Properties CTA */}
      <section className="section bg-primary-900 text-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-accent-500 text-white rounded-full text-sm font-semibold mb-4">
                ⛳ Golf Properties
              </span>
              <h2 className="heading-2 text-white mb-4">
                Live on the Fairway
              </h2>
              <p className="text-primary-200 text-lg mb-6">
                Discover frontline golf apartments and villas at Costa Blanca's 
                premier resorts. Wake up to stunning course views and walk to 
                the first tee.
              </p>
              <ul className="space-y-3 mb-8 text-primary-100">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  8+ golf courses within 30 minutes
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Year-round golfing weather
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Strong rental demand from golf tourists
                </li>
              </ul>
              <Link href="/golf-properties" className="btn-accent">
                Browse Golf Properties
              </Link>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-video bg-primary-800 rounded-xl flex items-center justify-center">
                <span className="text-primary-600">Golf Hero Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Finance CTA */}
      <section className="section">
        <div className="container-wide">
          <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="heading-2 text-slate-900 mb-4">
                  Need Financing?
                </h2>
                <p className="text-lg text-slate-700 mb-6">
                  We partner with Habeno to help international buyers secure mortgages 
                  from Spanish banks. Get up to 70% financing with competitive rates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={siteConfig.partners.habeno}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !bg-success-600 hover:!bg-success-700"
                  >
                    Start Mortgage Application
                  </a>
                  <Link href="/finance" className="btn-outline !border-success-600 !text-success-600">
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg mb-4">
                  <span className="text-4xl">🏦</span>
                </div>
                <p className="text-success-700 font-semibold">
                  Compare rates from multiple Spanish banks
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-slate-900 text-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="heading-2 text-white mb-4">
                Ready to Start Your Search?
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                Whether you're looking for a holiday home, permanent residence, or 
                investment property - we're here to help you find the perfect new 
                build in Costa Blanca.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Call Us</h3>
                    <a href={`tel:${siteConfig.contact.phoneClean}`} className="text-primary-400 hover:text-primary-300">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#25D366] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">WhatsApp</h3>
                    <a 
                      href={siteConfig.contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:text-primary-300"
                    >
                      Send us a message
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email</h3>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-primary-400 hover:text-primary-300">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 text-slate-800">
              <h3 className="font-display font-bold text-xl mb-6">
                Request a Callback
              </h3>
              <LeadForm source="homepage-footer" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
