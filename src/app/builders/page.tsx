import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Property Developers Costa Blanca | New Build Builders',
  description: 'Trusted property developers building new homes in Costa Blanca. View builder profiles, portfolios, and current developments.',
};

interface Builder {
  slug: string;
  name: string;
  propertyCount: number;
  towns: string[];
  priceRange: { min: number; max: number };
}

function getAllBuilders(): Builder[] {
  const buildersDir = path.join(process.cwd(), 'src', 'content', 'builders');
  
  if (!fs.existsSync(buildersDir)) {
    return [];
  }
  
  const files = fs.readdirSync(buildersDir).filter(file => file.endsWith('.json'));
  
  return files.map(file => {
    const content = JSON.parse(fs.readFileSync(path.join(buildersDir, file), 'utf-8'));
    return {
      slug: content.slug,
      name: content.name,
      propertyCount: content.propertyCount,
      towns: content.towns,
      priceRange: content.priceRange,
    };
  });
}

export default function BuildersPage() {
  const builders = getAllBuilders();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="text-white/70 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Builders</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Property Developers
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Trusted builders creating quality new homes across Costa Blanca
          </p>
        </div>
      </section>

      {/* Builders Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {builders.map(builder => (
            <Link
              key={builder.slug}
              href={`/builders/${builder.slug}`}
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {builder.name}
              </h2>
              
              <div className="space-y-3 text-gray-600">
                <p>
                  <span className="font-medium">Properties:</span> {builder.propertyCount}
                </p>
                <p>
                  <span className="font-medium">Locations:</span> {builder.towns.join(', ')}
                </p>
                <p>
                  <span className="font-medium">Price Range:</span>{' '}
                  €{builder.priceRange.min.toLocaleString()} - €{builder.priceRange.max.toLocaleString()}
                </p>
              </div>
              
              <div className="mt-6">
                <span className="text-blue-600 font-medium group-hover:underline">
                  View Portfolio →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {builders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No builders found.</p>
          </div>
        )}
      </section>
    </main>
  );
}
