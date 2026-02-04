import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Buying Guides | New Build Property in Spain',
  description: 'Complete guides to buying new build property in Costa Blanca. NIE numbers, mortgages, taxes, costs and step-by-step buying process for international buyers.',
};

const guides = [
  {
    title: 'The Buying Process',
    slug: 'buying-process',
    description: 'Step-by-step guide to purchasing new build property in Spain. From reservation to completion, everything you need to know.',
    icon: '🏠',
    readTime: '12 min read',
    category: 'essential',
  },
  {
    title: 'NIE Number Guide',
    slug: 'nie-number',
    description: 'How to obtain your NIE (Número de Identificación de Extranjero) - essential for buying property in Spain.',
    icon: '📋',
    readTime: '8 min read',
    category: 'essential',
  },
  {
    title: 'Costs & Taxes',
    slug: 'costs-taxes',
    description: 'Complete breakdown of purchase costs, taxes, and ongoing expenses when buying new build property in Spain.',
    icon: '💰',
    readTime: '10 min read',
    category: 'essential',
  },
  {
    title: 'Mortgages for Foreigners',
    slug: 'mortgages',
    description: 'How to get a Spanish mortgage as a non-resident. Banks, rates, requirements, and step-by-step application process.',
    icon: '🏦',
    readTime: '10 min read',
    category: 'essential',
  },
  {
    title: 'Why Buy New Build?',
    slug: 'why-new-build',
    description: 'The advantages of buying new build over resale property in Spain - guarantees, energy efficiency, and modern design.',
    icon: '✨',
    readTime: '6 min read',
    category: 'decision',
  },
  {
    title: 'Key-Ready vs Off-Plan',
    slug: 'key-ready-vs-off-plan',
    description: 'Should you buy a completed property or off-plan? Pros and cons of each option for international buyers.',
    icon: '🔑',
    readTime: '8 min read',
    category: 'decision',
  },
  {
    title: 'North vs South Costa Blanca',
    slug: 'north-vs-south',
    description: 'Compare the two distinct regions - prestigious northern coast vs affordable southern beaches. Find your perfect location.',
    icon: '🧭',
    readTime: '10 min read',
    category: 'decision',
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      {/* Hero */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Buying Guides
          </h1>
          <p className="text-xl text-warm-300 max-w-2xl">
            Everything you need to know about buying new build property in Costa Blanca. 
            Expert guides written for international buyers.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {guides.map((guide) => (
              <Link 
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-8 border border-warm-200"
              >
                <div className="text-4xl mb-4">{guide.icon}</div>
                <h2 className="text-2xl font-bold text-primary-900 mb-2">
                  {guide.title}
                </h2>
                <p className="text-warm-600 mb-4">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-warm-500">{guide.readTime}</span>
                  <span className="text-accent-600 font-semibold">Read Guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Finance CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-accent-400 text-sm font-bold tracking-widest uppercase">Finance & Mortgages</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-4">Ready to Compare Mortgage Rates?</h2>
              <p className="text-warm-200 mb-6">
                Compare rates from 15+ Spanish banks, see current market data, and explore finance options
                for both standard and luxury properties.
              </p>
              <Link
                href="/finance"
                className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Compare Mortgages →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">~3.15%</div>
                <div className="text-warm-300 text-sm">Avg Fixed Rate</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">70%</div>
                <div className="text-warm-300 text-sm">Non-Resident LTV</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-warm-300 text-sm">Banks Compared</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">€800k+</div>
                <div className="text-warm-300 text-sm">Luxury Options</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Why Trust Our Guides?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-3">🇪🇸</div>
              <h3 className="font-semibold mb-2">Local Expertise</h3>
              <p className="text-warm-600 text-sm">Based in Costa Blanca with years of experience helping international buyers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-semibold mb-2">Up-to-Date Information</h3>
              <p className="text-warm-600 text-sm">Regularly updated to reflect current Spanish property laws and regulations</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-semibold mb-2">International Focus</h3>
              <p className="text-warm-600 text-sm">Written specifically for British, European, and international buyers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
          <p className="text-warm-600 mb-6 max-w-xl mx-auto">
            Our team is here to help guide you through the buying process. 
            Get in touch for personalized advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
            <a 
              href="https://wa.me/34634044970"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
