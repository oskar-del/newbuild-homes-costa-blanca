import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Costa Blanca Areas | Living & Property Guides',
  description: 'Discover the best areas to live in Costa Blanca North and South. Comprehensive guides to Jávea, Moraira, Torrevieja, Orihuela Costa and more.',
};

interface Area {
  slug: string;
  name: string;
  region: string;
  propertyCount: number;
  propertyTypes: string[];
  priceRange: { min: number; max: number };
}

function getAllAreas(): Area[] {
  const areasDir = path.join(process.cwd(), 'src', 'content', 'areas');
  
  if (!fs.existsSync(areasDir)) {
    return [];
  }
  
  const files = fs.readdirSync(areasDir).filter(file => file.endsWith('.json'));
  
  return files.map(file => {
    const content = JSON.parse(fs.readFileSync(path.join(areasDir, file), 'utf-8'));
    return {
      slug: content.slug,
      name: content.name,
      region: content.region || 'Costa Blanca',
      propertyCount: content.propertyCount,
      propertyTypes: content.propertyTypes,
      priceRange: content.priceRange,
    };
  });
}

function AreaCard({ area }: { area: Area }) {
  return (
    <Link
      href={`/areas/${area.slug}`}
      className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
        {area.name}
      </h3>
      
      <div className="space-y-2 text-gray-600 text-sm">
        <p>
          <span className="font-medium">Property Types:</span> {area.propertyTypes.join(', ')}
        </p>
        <p>
          <span className="font-medium">From:</span> €{area.priceRange.min.toLocaleString()}
        </p>
      </div>
      
      <div className="mt-4">
        <span className="text-teal-600 font-medium group-hover:underline">
          Explore {area.name} →
        </span>
      </div>
    </Link>
  );
}

export default function AreasPage() {
  const areas = getAllAreas();
  
  const northAreas = areas.filter(a => a.region === 'Costa Blanca North');
  const southAreas = areas.filter(a => a.region === 'Costa Blanca South');

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="text-white/70 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Areas</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Costa Blanca Areas
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Discover the perfect location for your new home. From the luxury villas of Jávea to the vibrant lifestyle of Torrevieja, find your ideal Costa Blanca destination.
          </p>
        </div>
      </section>

      {/* Region Overview */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h2 className="text-xl font-bold text-blue-900 mb-2">🏔️ Costa Blanca North</h2>
            <p className="text-blue-800">
              Dramatic coastlines, luxury villas, upscale towns like Jávea and Moraira. Premium properties with mountain and sea views. Higher price points, exclusive communities.
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
            <h2 className="text-xl font-bold text-amber-900 mb-2">☀️ Costa Blanca South</h2>
            <p className="text-amber-800">
              Sandy beaches, golf resorts, excellent value. International communities in Torrevieja and Orihuela Costa. Modern apartments and villas at accessible prices.
            </p>
          </div>
        </div>

        {/* Costa Blanca North */}
        {northAreas.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">🏔️</span> Costa Blanca North
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {northAreas.map(area => (
                <AreaCard key={area.slug} area={area} />
              ))}
            </div>
          </div>
        )}

        {/* Costa Blanca South */}
        {southAreas.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">☀️</span> Costa Blanca South
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {southAreas.map(area => (
                <AreaCard key={area.slug} area={area} />
              ))}
            </div>
          </div>
        )}

        {areas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No area guides found.</p>
          </div>
        )}
      </section>

      {/* North vs South Comparison */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Which Region is Right for You?
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-4 px-4 font-semibold text-gray-900">Factor</th>
                  <th className="py-4 px-4 font-semibold text-blue-700">Costa Blanca North</th>
                  <th className="py-4 px-4 font-semibold text-amber-700">Costa Blanca South</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Price Range</td>
                  <td className="py-3 px-4">€400,000 - €3,500,000+</td>
                  <td className="py-3 px-4">€180,000 - €650,000</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Property Types</td>
                  <td className="py-3 px-4">Luxury villas, chalets</td>
                  <td className="py-3 px-4">Apartments, townhouses, villas</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Landscape</td>
                  <td className="py-3 px-4">Mountains, rocky coves</td>
                  <td className="py-3 px-4">Flat, sandy beaches, salt lakes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Atmosphere</td>
                  <td className="py-3 px-4">Exclusive, traditional</td>
                  <td className="py-3 px-4">Vibrant, international</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Golf</td>
                  <td className="py-3 px-4">Several courses</td>
                  <td className="py-3 px-4">10+ courses within 30 min</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Best For</td>
                  <td className="py-3 px-4">Luxury seekers, privacy</td>
                  <td className="py-3 px-4">Value, golf, active community</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Not Sure Which Area is Right for You?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Contact us and we'll help you find your ideal Costa Blanca location based on your lifestyle, budget, and preferences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-medium transition-colors"
            >
              📱 WhatsApp Us
            </a>
            <a
              href="tel:+34634044970"
              className="inline-flex items-center gap-2 bg-white text-teal-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium transition-colors"
            >
              📞 +34 634 044 970
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
