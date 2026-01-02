import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Costa Blanca Areas | Living & Property Guides',
  description: 'Discover the best areas to live in Costa Blanca. Comprehensive guides to Jávea, Moraira, and more with property listings and lifestyle information.',
};

interface Area {
  slug: string;
  name: string;
  propertyCount: number;
  propertyTypes: string[];
  priceRange: { min: number; max: number };
  cardImage?: string;
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
      propertyCount: content.propertyCount,
      propertyTypes: content.propertyTypes,
      priceRange: content.priceRange,
      cardImage: content.cardImage,
    };
  });
}

export default function AreasPage() {
  const areas = getAllAreas();

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
            Discover the perfect location for your new home in Costa Blanca
          </p>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map(area => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              {area.cardImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={area.cardImage}
                    alt={area.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                  {area.name}
                </h2>
                
                <div className="space-y-3 text-gray-600">
                  <p>
                    <span className="font-medium">New Builds:</span> {area.propertyCount}
                  </p>
                  <p>
                    <span className="font-medium">Property Types:</span> {area.propertyTypes.join(', ')}
                  </p>
                  <p>
                    <span className="font-medium">From:</span> €{area.priceRange.min.toLocaleString()}
                  </p>
                </div>
                
                <div className="mt-6">
                  <span className="text-teal-600 font-medium group-hover:underline">
                    Explore Area →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {areas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No area guides found.</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-teal-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Not Sure Which Area is Right for You?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Contact us and we'll help you find your ideal Costa Blanca location.
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
