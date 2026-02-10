import type { Metadata } from 'next';
import Link from 'next/link';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Costa Blanca North vs South | Which Region is Right For You?',
  description: 'Compare Costa Blanca North and South: climate, property prices, expat communities, beaches, and lifestyle. Find your ideal Spanish home location.',
  keywords: 'Costa Blanca north vs south, Costa Blanca comparison, Jávea vs Torrevieja, property Spain regions, where to buy Costa Blanca',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/guides/north-vs-south',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/north-vs-south',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/north-vs-south',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/noord-vs-zuid',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/noord-vs-zuid',
      'no': 'https://newbuildhomescostablanca.com/no/guides/nord-vs-sor',
      'x-default': 'https://newbuildhomescostablanca.com/guides/north-vs-south',
    },
  },
};

export default function NorthVsSouthPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <nav className="text-warm-200 text-sm mb-4">
              <Link href="/guides" className="hover:text-white">Guides</Link>
              <span className="mx-2">›</span>
              <span>North vs South</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Costa Blanca North vs South: Which Region is Right For You?
            </h1>
            <p className="text-xl text-warm-300">
              Climate, prices, lifestyle, expat communities, airports — a complete comparison to help you choose your perfect Spanish location.
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-warm-200">
              <span>📖 12 min read</span>
              <span>•</span>
              <span>Updated January 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-primary-50 border border-warm-200 rounded-xl p-6">
              <h2 className="font-bold text-lg mb-3 text-primary-900">Quick Summary</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-blue-800 mb-2">Costa Blanca North</h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>• More dramatic scenery & mountains</li>
                    <li>• Higher property prices</li>
                    <li>• Greener, slightly cooler</li>
                    <li>• More traditional Spanish feel</li>
                    <li>• Jávea, Moraira, Calpe, Altea</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-bold text-orange-800 mb-2">Costa Blanca South</h3>
                  <ul className="text-orange-700 space-y-1">
                    <li>• Flatter terrain, wide beaches</li>
                    <li>• More affordable properties</li>
                    <li>• Warmer, sunnier, drier</li>
                    <li>• Larger expat communities</li>
                    <li>• Torrevieja, Orihuela Costa, Guardamar</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Intro */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-warm-700 leading-relaxed">
              Costa Blanca — Spain's "White Coast" — stretches over 200 kilometers along the Alicante province, from Denia in the north to Pilar de la Horadada near Murcia. While united by sunshine and Mediterranean beaches, the North and South offer distinctly different lifestyles, price points, and atmospheres.
            </p>
            <p className="text-warm-700">
              Choosing between them is one of the biggest decisions you'll make when buying property here. Let's break down everything that matters.
            </p>
          </div>

          {/* Climate Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Climate: Both Excellent, But Different</h2>
            <p className="text-warm-700 mb-4">
              Both regions enjoy over 300 days of sunshine annually, but there are subtle differences that matter:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-bold text-blue-800 mb-3">North Climate</h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li><strong>Summer:</strong> 28-32°C, occasional sea breezes</li>
                  <li><strong>Winter:</strong> 12-18°C, slightly more rain</li>
                  <li><strong>Rainfall:</strong> ~400mm annually</li>
                  <li><strong>Feel:</strong> Greener, more lush vegetation</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-xl p-5">
                <h3 className="font-bold text-orange-800 mb-3">South Climate</h3>
                <ul className="text-orange-700 space-y-2 text-sm">
                  <li><strong>Summer:</strong> 30-35°C, reliably hot</li>
                  <li><strong>Winter:</strong> 14-20°C, milder</li>
                  <li><strong>Rainfall:</strong> ~250mm annually (semi-arid)</li>
                  <li><strong>Feel:</strong> Drier, more reliable sun</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
              <p className="font-semibold text-yellow-800">Health Consideration:</p>
              <p className="text-yellow-700">
                The South, particularly around Torrevieja's salt lakes, is recognized by the World Health Organization as having one of the healthiest microclimates in Europe. Many people with respiratory conditions choose this area specifically.
              </p>
            </div>
          </section>

          {/* Property Prices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Property Prices: Significant Difference</h2>
            <p className="text-warm-700 mb-4">
              This is often the deciding factor. The North commands significantly higher prices for comparable properties:
            </p>

            <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="p-4 text-left">Property Type</th>
                    <th className="p-4 text-center text-blue-700">North</th>
                    <th className="p-4 text-center text-orange-700">South</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4">2-bed apartment</td>
                    <td className="p-4 text-center">€250,000-400,000</td>
                    <td className="p-4 text-center">€150,000-250,000</td>
                  </tr>
                  <tr className="border-t bg-warm-50">
                    <td className="p-4">3-bed villa with pool</td>
                    <td className="p-4 text-center">€500,000-900,000</td>
                    <td className="p-4 text-center">€300,000-500,000</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4">Luxury villa</td>
                    <td className="p-4 text-center">€1,000,000+</td>
                    <td className="p-4 text-center">€600,000-900,000</td>
                  </tr>
                  <tr className="border-t bg-warm-50">
                    <td className="p-4">Golf property</td>
                    <td className="p-4 text-center">Limited options</td>
                    <td className="p-4 text-center">€200,000-600,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-warm-700">
              <strong>Why the difference?</strong> The North has more dramatic scenery, limited buildable land due to mountains, and a longer history of international property ownership. The South has more available land, more active development, and caters to a broader market.
            </p>
          </section>

          {/* Landscape & Beaches */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Landscape & Beaches</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-lg mb-3 text-blue-800">North: Dramatic & Varied</h3>
                <p className="text-warm-700 mb-3">
                  Mountains meet the sea, creating stunning coastal scenery. Rocky coves, hidden beaches, and dramatic cliffs define the coastline. Towns cascade down hillsides with narrow streets and traditional architecture.
                </p>
                <ul className="text-warm-600 space-y-1 text-sm">
                  <li>• Peñón de Ifach rock in Calpe (iconic)</li>
                  <li>• Montgo mountain overlooking Jávea</li>
                  <li>• Crystal-clear coves in Moraira</li>
                  <li>• Scenic drives along cliff roads</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3 text-orange-800">South: Open & Accessible</h3>
                <p className="text-warm-700 mb-3">
                  Flatter terrain with wide, sandy beaches stretching for kilometers. Salt lakes, dunes, and palm-lined promenades. More space, more development, easier access.
                </p>
                <ul className="text-warm-600 space-y-1 text-sm">
                  <li>• Guardamar's 10km dune-backed beach</li>
                  <li>• Torrevieja's pink salt lakes</li>
                  <li>• La Mata natural park beaches</li>
                  <li>• Orihuela Costa's resort beaches</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary-50 border-l-4 border-primary-600 p-4">
              <p className="font-semibold text-primary-800">Beach Preference Guide:</p>
              <p className="text-primary-700">
                <strong>Choose North</strong> if you prefer rocky coves, snorkeling, dramatic scenery. <strong>Choose South</strong> if you prefer wide sandy beaches, easy access, promenades, and beach bars.
              </p>
            </div>
          </section>

          {/* Expat Communities */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Expat Communities & Demographics</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-bold text-blue-800 mb-3">North Community</h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li><strong>Size:</strong> Smaller, more established</li>
                  <li><strong>Nationalities:</strong> British, German, Dutch, Belgian</li>
                  <li><strong>Demographics:</strong> Older, more affluent, many retirees</li>
                  <li><strong>Integration:</strong> More Spanish feel, better integration</li>
                  <li><strong>Social:</strong> Quality over quantity</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-xl p-5">
                <h3 className="font-bold text-orange-800 mb-3">South Community</h3>
                <ul className="text-orange-700 space-y-2 text-sm">
                  <li><strong>Size:</strong> Larger, more active</li>
                  <li><strong>Nationalities:</strong> British, Scandinavian, Irish, Dutch</li>
                  <li><strong>Demographics:</strong> Mixed ages, working families</li>
                  <li><strong>Integration:</strong> More expat-focused areas</li>
                  <li><strong>Social:</strong> Clubs, groups, events abundant</li>
                </ul>
              </div>
            </div>

            <p className="text-warm-700">
              <strong>Finding community:</strong> Both regions have thriving expat communities, but they feel different. The South has more British-style bars, English-speaking services, and organized expat activities. The North integrates more with Spanish life — you're more likely to need some Spanish, but also more likely to experience authentic local culture.
            </p>
          </section>

          {/* Golf */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Golf: South Wins Decisively</h2>
            <p className="text-warm-700 mb-4">
              If golf is important to you, the South is the clear choice. It has over 20 courses within easy reach, while the North has just a handful.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-orange-50 rounded-xl p-5">
                <h3 className="font-bold text-orange-800 mb-3">South Golf Courses</h3>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• La Finca Golf (Algorfa)</li>
                  <li>• Las Colinas Golf (Campoamor)</li>
                  <li>• Villamartín Golf</li>
                  <li>• Las Ramblas Golf</li>
                  <li>• Campoamor Golf</li>
                  <li>• La Marquesa Golf</li>
                  <li>• Vistabella Golf</li>
                  <li>• Lo Romero Golf</li>
                  <li>• + many more...</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-bold text-blue-800 mb-3">North Golf Courses</h3>
                <ul className="text-blue-700 space-y-1 text-sm">
                  <li>• Jávea Golf Club</li>
                  <li>• La Sella Golf (Denia)</li>
                  <li>• Altea Golf Club</li>
                  <li>• Villaitana (Benidorm)</li>
                  <li>• Limited options overall</li>
                </ul>
              </div>
            </div>

            <div className="bg-success-50 border-l-4 border-success-500 p-4">
              <p className="font-semibold text-success-800">Golf Property Advantage:</p>
              <p className="text-success-700">
                The South offers golf-front properties from €300,000 — a fraction of what equivalent golf properties cost elsewhere in Europe. If you want to wake up to fairway views, the South is where to look.
              </p>
            </div>
          </section>

          {/* Transport & Access */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Airports & Transport</h2>

            <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="p-4 text-left">Airport</th>
                    <th className="p-4 text-center">To North Towns</th>
                    <th className="p-4 text-center">To South Towns</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Alicante (ALC)</td>
                    <td className="p-4 text-center">60-90 min to Jávea</td>
                    <td className="p-4 text-center">30-45 min to Torrevieja</td>
                  </tr>
                  <tr className="border-t bg-warm-50">
                    <td className="p-4 font-medium">Valencia (VLC)</td>
                    <td className="p-4 text-center">60-90 min to Jávea</td>
                    <td className="p-4 text-center">120+ min</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Murcia (RMU)</td>
                    <td className="p-4 text-center">120+ min</td>
                    <td className="p-4 text-center">30-40 min to south</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-warm-700 mb-4">
              <strong>Flight connections:</strong> Alicante Airport has the most routes and best prices for UK and Northern European flights. Both regions are well-served, but the South is closer to Alicante.
            </p>

            <p className="text-warm-700">
              <strong>Car necessity:</strong> Essential in both regions for comfortable living, though the South has more walkable resort areas. The North's winding mountain roads are beautiful but can be challenging.
            </p>
          </section>

          {/* Amenities & Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Shopping, Dining & Services</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-lg mb-3 text-blue-800">North</h3>
                <p className="text-warm-700 mb-3">
                  More traditional town centers with local shops and markets. Dining tends toward quality over quantity — excellent Spanish and international restaurants, but fewer options overall.
                </p>
                <ul className="text-warm-600 space-y-1 text-sm">
                  <li>• Jávea port restaurants (seafood)</li>
                  <li>• Moraira's upmarket dining scene</li>
                  <li>• Local markets in every town</li>
                  <li>• Fewer big shopping centers</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3 text-orange-800">South</h3>
                <p className="text-warm-700 mb-3">
                  More commercial infrastructure. La Zenia Boulevard is one of Europe's largest open-air shopping centers. Abundant dining from casual to formal, with many British and international options.
                </p>
                <ul className="text-warm-600 space-y-1 text-sm">
                  <li>• La Zenia Boulevard (150+ stores)</li>
                  <li>• Habaneras shopping center</li>
                  <li>• Cabo Roig market (Saturday)</li>
                  <li>• Abundant bars and restaurants</li>
                </ul>
              </div>
            </div>

            <p className="text-warm-700">
              <strong>Healthcare:</strong> Both regions have excellent public and private healthcare. The South has more private clinics catering to expats in English. Torrevieja Hospital is a major facility serving the southern area.
            </p>
          </section>

          {/* Investment Potential */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Investment & Rental Potential</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="font-bold text-blue-800 mb-3">North Investment</h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li><strong>Capital growth:</strong> Historically strong</li>
                  <li><strong>Rental yields:</strong> Lower (3-4%)</li>
                  <li><strong>Rental type:</strong> Quality holiday lets</li>
                  <li><strong>Season:</strong> Shorter peak season</li>
                  <li><strong>Risk:</strong> Lower supply = stable values</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-xl p-5">
                <h3 className="font-bold text-orange-800 mb-3">South Investment</h3>
                <ul className="text-orange-700 space-y-2 text-sm">
                  <li><strong>Capital growth:</strong> Good, especially new builds</li>
                  <li><strong>Rental yields:</strong> Higher (5-7%)</li>
                  <li><strong>Rental type:</strong> Volume holiday + golf</li>
                  <li><strong>Season:</strong> Extended (golf year-round)</li>
                  <li><strong>Risk:</strong> More supply, but strong demand</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary-50 border-l-4 border-primary-600 p-4">
              <p className="font-semibold text-primary-800">Investment Tip:</p>
              <p className="text-primary-700">
                For rental income, the South generally outperforms thanks to golf tourism and longer seasons. For capital preservation in a prestigious location, the North has stronger credentials.
              </p>
            </div>
          </section>

          {/* Who Should Choose What */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Which Region is Right for You?</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold text-blue-800 text-lg mb-4">Choose Costa Blanca North if you:</h3>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Have a larger budget (€400k+ for villas)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Prefer dramatic scenery and mountains</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Want a more traditional Spanish feel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Enjoy rocky coves and snorkeling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Prioritize prestige and exclusivity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Don't need golf on your doorstep</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Are comfortable with some Spanish</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="font-bold text-orange-800 text-lg mb-4">Choose Costa Blanca South if you:</h3>
                <ul className="space-y-2 text-orange-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Want better value for money</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Prefer wide sandy beaches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Golf is important to you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Want a larger expat community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Prefer English-speaking services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Want rental income potential</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">✓</span>
                    <span>Like modern new build properties</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white rounded-xl shadow p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Which region has better weather?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Both have excellent weather with 300+ sunny days annually. The South is slightly warmer and drier, with a semi-arid climate. The North is marginally cooler and greener with a bit more rainfall. Most people find both comfortable year-round.
                </p>
              </details>

              <details className="bg-white rounded-xl shadow p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  How much cheaper is the South than the North?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Generally 30-50% cheaper for comparable properties. A 3-bed villa with pool in Orihuela Costa might cost €350,000, while similar in Jávea would be €550,000+. The gap is even larger for premium properties.
                </p>
              </details>

              <details className="bg-white rounded-xl shadow p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Do I need to speak Spanish in either region?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  In the South, especially expat areas like Orihuela Costa, you can manage with English for daily life. The North has fewer English-speaking services — some Spanish helps significantly. Both regions appreciate any effort to speak Spanish.
                </p>
              </details>

              <details className="bg-white rounded-xl shadow p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Which is better for families with children?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Both work for families. The South has more international schools, larger expat communities (easier for kids to make friends), and more affordable properties. The North offers a more integrated Spanish experience and generally more upmarket schools.
                </p>
              </details>

              <details className="bg-white rounded-xl shadow p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Which has better healthcare?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Both have excellent public hospitals and private clinics. The South has more private healthcare options catering to expats in English. Torrevieja Hospital in the South and Marina Alta Hospital in the North both serve large areas well.
                </p>
              </details>

              <details className="bg-white rounded-xl shadow p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Can I rent out my property in both regions?
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-warm-700">
                  Yes, but the South generally achieves better rental yields (5-7% vs 3-4%). Golf properties in the South rent year-round. The North has a shorter peak season but can command premium rates for quality properties.
                </p>
              </details>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-accent-600 to-primary-800 text-white rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Ready to Explore?</h2>
            <p className="mb-6 text-warm-300">
              We specialize in new build properties across both Costa Blanca North and South. Tell us your preferences and budget, and we'll recommend the best areas and developments for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/properties"
                className="bg-white text-accent-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-center"
              >
                Browse Properties
              </Link>
              <a
                href="https://wa.me/34634044970"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
              >
                WhatsApp Us
              </a>
            </div>
          </section>

        </div>
      </article>

      {/* Lead Form */}
      <section className="py-16 bg-warm-100">
        <div className="container mx-auto px-4">
          <LeadForm
            title="Get Personalized Area Recommendations"
            subtitle="Tell us your priorities and we'll suggest the best areas in Costa Blanca for your lifestyle and budget."
            propertyInterest="North vs South Guide Inquiry"
          />
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/guides/why-new-build" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Why New Build?</h3>
              <p className="text-warm-600 text-sm">10 reasons to choose new construction</p>
            </Link>
            <Link href="/guides/buying-process" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Buying Process</h3>
              <p className="text-warm-600 text-sm">Step-by-step purchase guide</p>
            </Link>
            <Link href="/guides/key-ready-vs-off-plan" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Key Ready vs Off-Plan</h3>
              <p className="text-warm-600 text-sm">Which purchase type suits you?</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
