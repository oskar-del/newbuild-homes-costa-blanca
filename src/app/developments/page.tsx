import Link from 'next/link';
import { fetchXMLFeed, groupByDevelopment, formatPrice } from '@/lib/xml-parser';

export const metadata = {
  title: 'New Build Developments Costa Blanca | New Build Homes',
  description: 'Browse new build developments across Costa Blanca. Find modern apartments, villas and townhouses from trusted developers in Javea, Moraira, Calpe and more.',
};

export default async function DevelopmentsPage() {
  const properties = await fetchXMLFeed();
  const developments = groupByDevelopment(properties);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">New Build Developments</h1>
          <p className="text-xl text-blue-100">
            Discover {developments.length} exclusive new build developments across Costa Blanca
          </p>
        </div>
      </section>

      {/* Developments Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {developments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No developments available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developments.map((dev) => (
              <Link
                key={dev.slug}
                href={`/developments/${dev.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                {/* Image */}
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  {dev.images[0] ? (
                    <img
                      src={dev.images[0]}
                      alt={dev.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                    {dev.propertyCount} {dev.propertyCount === 1 ? 'Property' : 'Properties'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {dev.name}
                  </h2>
                  <p className="text-gray-600 mb-3">
                    {dev.town}, {dev.province}
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{dev.bedroomsRange}</span>
                    <span className="text-blue-600 font-bold">
                      {dev.priceFrom ? `From ${formatPrice(dev.priceFrom)}` : 'Price on request'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    by {dev.developer}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact us and we'll help you find your perfect new build property
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
