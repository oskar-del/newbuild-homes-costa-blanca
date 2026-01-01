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
  },
  {
    title: 'NIE Number Guide',
    slug: 'nie-number',
    description: 'How to obtain your NIE (Número de Identificación de Extranjero) - essential for buying property in Spain.',
    icon: '📋',
    readTime: '8 min read',
  },
  {
    title: 'Costs & Taxes',
    slug: 'costs-taxes',
    description: 'Complete breakdown of purchase costs, taxes, and ongoing expenses when buying new build property in Spain.',
    icon: '💰',
    readTime: '10 min read',
  },
  {
    title: 'Mortgages for Foreigners',
    slug: 'mortgages',
    description: 'How to get a Spanish mortgage as a non-resident. Banks, rates, requirements, and step-by-step application process.',
    icon: '🏦',
    readTime: '10 min read',
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Buying Guides
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
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
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-8 border border-gray-100"
              >
                <div className="text-4xl mb-4">{guide.icon}</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {guide.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{guide.readTime}</span>
                  <span className="text-blue-600 font-semibold">Read Guide →</span>
                </div>
              </Link>
            ))}
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
              <p className="text-gray-600 text-sm">Based in Costa Blanca with years of experience helping international buyers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-semibold mb-2">Up-to-Date Information</h3>
              <p className="text-gray-600 text-sm">Regularly updated to reflect current Spanish property laws and regulations</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-semibold mb-2">International Focus</h3>
              <p className="text-gray-600 text-sm">Written specifically for British, European, and international buyers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
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
