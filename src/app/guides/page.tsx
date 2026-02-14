import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Buying Guides | New Build Property in Spain | Costa Blanca 2026',
  description: 'Complete guides to buying new build property in Costa Blanca. NIE numbers, mortgages, taxes, costs and step-by-step buying process for international buyers.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/guides',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides',
      'no': 'https://newbuildhomescostablanca.com/no/guides',
      'de': 'https://newbuildhomescostablanca.com/de/guides',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides',
      'x-default': 'https://newbuildhomescostablanca.com/guides',
    },
  },
};

const essentialGuides = [
  {
    title: 'The Buying Process',
    slug: 'buying-process',
    description: 'Step-by-step guide to purchasing new build property in Spain. From reservation to completion, everything you need to know.',
    icon: '📋',
    readTime: '12 min read',
    category: 'Essential',
  },
  {
    title: 'NIE Number Guide',
    slug: 'nie-number',
    description: 'How to obtain your NIE (Número de Identificación de Extranjero) — essential for buying property in Spain.',
    icon: '🪪',
    readTime: '8 min read',
    category: 'Essential',
  },
  {
    title: 'Costs & Taxes',
    slug: 'costs-taxes',
    description: 'Complete breakdown of purchase costs, taxes, and ongoing expenses when buying new build property in Spain.',
    icon: '💰',
    readTime: '10 min read',
    category: 'Essential',
  },
  {
    title: 'Mortgages for Foreigners',
    slug: 'mortgages',
    description: 'How to get a Spanish mortgage as a non-resident. Banks, rates, requirements, and step-by-step application process.',
    icon: '🏦',
    readTime: '10 min read',
    category: 'Essential',
  },
];

const decisionGuides = [
  {
    title: 'Why Buy New Build?',
    slug: 'why-new-build',
    description: 'The advantages of buying new build over resale property in Spain — guarantees, energy efficiency, and modern design.',
    icon: '🏗️',
    readTime: '6 min read',
    category: 'Decision',
  },
  {
    title: 'Key-Ready vs Off-Plan',
    slug: 'key-ready-vs-off-plan',
    description: 'Should you buy a completed property or off-plan? Pros and cons of each option for international buyers.',
    icon: '🔑',
    readTime: '8 min read',
    category: 'Decision',
  },
  {
    title: 'North vs South Costa Blanca',
    slug: 'north-vs-south',
    description: 'Compare the two distinct regions — prestigious northern coast vs affordable southern beaches. Find your perfect location.',
    icon: '🗺️',
    readTime: '10 min read',
    category: 'Decision',
  },
  {
    title: 'Tourist Rental License',
    slug: 'tourist-rental-license',
    description: 'Everything you need to know about holiday rental licenses in the Valencia Community — requirements, process, and income potential.',
    icon: '📜',
    readTime: '8 min read',
    category: 'Investment',
  },
];

const destinationGuides = [
  {
    title: 'Living in Torrevieja',
    description: '7 neighborhoods with drone photography. The definitive Costa Blanca South guide.',
    href: '/guides/torrevieja',
    icon: '🏖️',
    badges: ['104+ photos', '7 zones'],
  },
  {
    title: 'Living in Jávea',
    description: '4 neighborhoods from Arenal beach to Montgó mountain. Premium north coast living.',
    href: '/guides/javea',
    icon: '⛵',
    badges: ['4 neighborhoods', '7 beaches'],
  },
  {
    title: 'Costa Blanca North',
    description: '6 towns compared — Jávea, Moraira, Altea, Calpe, Denia & Benissa with aerial photography.',
    href: '/guides/costa-blanca-north',
    icon: '🏔️',
    badges: ['6 towns', 'Region guide'],
  },
  {
    title: 'Orihuela Costa',
    description: 'Golf paradise with La Zenia, Villamartin, Cabo Roig & more. Affordable south coast living.',
    href: '/guides/orihuela-costa',
    icon: '⛳',
    badges: ['6 areas', 'Golf focus'],
  },
  {
    title: 'Benidorm & Finestrat',
    description: 'Spain\'s most dynamic coastal city — beaches, nightlife, and surprising investment potential.',
    href: '/guides/benidorm-finestrat',
    icon: '🌇',
    badges: ['2 zones', 'City guide'],
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-accent-500" />
            <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Expert Guides</span>
            <div className="w-10 h-px bg-accent-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Buying Guides</h1>
          <p className="text-xl text-warm-200 max-w-2xl mx-auto mb-4">
            Everything you need to know about buying new build property in Costa Blanca.
            Expert guides written for international buyers.
          </p>
          <p className="text-warm-300">
            From NIE numbers to mortgages, we guide you through every step of the process.
          </p>
        </div>
      </section>

      {/* Essential Buyer Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Must-Read</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Essential Buyer Guides</h2>
            <p className="text-warm-600 max-w-xl mx-auto">The four guides every property buyer must read before purchasing in Spain</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {essentialGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                <div className="bg-white border-2 border-warm-100 rounded-lg p-6 hover:border-accent-500 hover:shadow-lg transition-all h-full group">
                  <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-500 transition-colors text-xl">
                    {guide.icon}
                  </div>
                  <span className="text-xs font-bold text-accent-500 tracking-wider uppercase">{guide.category}</span>
                  <h3 className="text-lg font-bold text-primary-900 mt-1 mb-2 group-hover:text-accent-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-warm-400">{guide.readTime}</span>
                    <span className="text-accent-500 text-sm font-semibold flex items-center gap-1">
                      Read
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Guides */}
      <section className="py-16 px-4 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Explore Areas</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Destination Guides</h2>
            <p className="text-warm-600 max-w-xl mx-auto">In-depth guides to the best areas on the Costa Blanca</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinationGuides.map((dest) => (
              <Link key={dest.href} href={dest.href}>
                <div className="bg-primary-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow h-full group">
                  <div className="h-32 bg-gradient-to-br from-accent-500/30 to-primary-800 flex items-center justify-center">
                    <span className="text-5xl">{dest.icon}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                      {dest.title}
                    </h3>
                    <p className="text-warm-300 text-sm mb-3">{dest.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.badges.map((badge, i) => (
                        <span key={i} className="text-xs bg-accent-500/20 text-accent-400 px-2 py-0.5 rounded">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Decision & Planning Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Planning</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Decision Guides</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Make informed choices about location, property type, and investment strategy</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {decisionGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                <div className="bg-white border-2 border-warm-100 rounded-lg p-6 hover:border-primary-500 hover:shadow-lg transition-all h-full group">
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors text-xl">
                    {guide.icon}
                  </div>
                  <span className="text-xs font-bold text-primary-600 tracking-wider uppercase">{guide.category}</span>
                  <h3 className="text-lg font-bold text-primary-900 mt-1 mb-2 group-hover:text-primary-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-warm-400">{guide.readTime}</span>
                    <span className="text-primary-600 text-sm font-semibold flex items-center gap-1">
                      Read
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Finance CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Finance & Mortgages</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-4">Ready to Compare Mortgage Rates?</h2>
              <p className="text-warm-200 mb-6">
                Compare rates from 15+ Spanish banks, see current market data, and explore finance options
                for both standard and luxury properties.
              </p>
              <Link
                href="/finance"
                className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Compare Mortgages &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">~3.15%</div>
                <div className="text-warm-300 text-sm mt-1">Avg Fixed Rate</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">70%</div>
                <div className="text-warm-300 text-sm mt-1">Non-Resident LTV</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-warm-300 text-sm mt-1">Banks Compared</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">&euro;800k+</div>
                <div className="text-warm-300 text-sm mt-1">Luxury Options</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 px-4 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Why Trust Our Guides?</h2>
            <p className="text-warm-600">Expert knowledge combined with international understanding</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Local Expertise</h3>
              <p className="text-warm-600">Based in Costa Blanca with years of experience helping international buyers navigate the Spanish property market.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Up-to-Date Information</h3>
              <p className="text-warm-600">Regularly updated to reflect current Spanish property laws, tax regulations, and market conditions.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">International Focus</h3>
              <p className="text-warm-600">Written specifically for international buyers — covering unique challenges like NIE numbers, foreign mortgages, and non-resident taxes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Have Questions?</h2>
          <p className="text-xl text-white/90 mb-8">
            Our team is here to help guide you through the buying process. Get in touch for personalized advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              Contact Us
            </Link>
            <a
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              WhatsApp
            </a>
          </div>
          <p className="text-white/70 text-sm mt-6">
            Quick response within 24 hours — often much faster
          </p>
        </div>
      </section>
    </main>
  );
}
