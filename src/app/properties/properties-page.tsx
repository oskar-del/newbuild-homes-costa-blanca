import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchNewBuilds, BPProperty } from '@/lib/backgroundProperties';
import PropertyFilters from '@/components/PropertyFilters';

export const metadata: Metadata = {
  title: 'New Build Villas & Houses Costa Blanca | Properties for Sale',
  description: 'Browse 100+ new build villas and houses for sale in Costa Blanca. Properties in Javea, Moraira, Calpe, Benissa, Benitachell and more. Contact us for viewings.',
};

export const revalidate = 3600;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { town?: string; beds?: string; type?: string };
}) {
  const allProperties = await fetchNewBuilds();
  
  const towns = [...new Set(allProperties.map(p => p.town).filter(Boolean))].sort();
  const types = [...new Set(allProperties.map(p => p.type).filter(Boolean))].sort();
  const bedOptions = [...new Set(allProperties.map(p => p.bedrooms).filter(b => b > 0))].sort((a, b) => a - b);

  let properties = allProperties;
  if (searchParams.town) {
    properties = properties.filter(p => p.town === searchParams.town);
  }
  if (searchParams.beds) {
    properties = properties.filter(p => p.bedrooms === parseInt(searchParams.beds as string));
  }
  if (searchParams.type) {
    properties = properties.filter(p => p.type === searchParams.type);
  }

  const byTown = properties.reduce((acc, prop) => {
    const town = prop.town || 'Other';
    if (!acc[town]) acc[town] = [];
    acc[town].push(prop);
    return acc;
  }, {} as Record<string, BPProperty[]>);

  const sortedTowns = Object.keys(byTown).sort((a, b) => byTown[b].length - byTown[a].length);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-blue-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="text-sm mb-4 text-blue-200">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span>Properties</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">New Build Properties</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Individual villas and houses from trusted Costa Blanca developers
          </p>
          <p className="mt-3 text-xl font-semibold text-amber-400">
            {properties.length} properties available
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b shadow-sm sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <PropertyFilters towns={towns} types={types} bedOptions={bedOptions} />
        </div>
      </section>

      {/* Properties */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          {properties.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-4">No properties found matching your criteria.</p>
              <Link href="/properties" className="text-blue-600 hover:underline font-medium">
                Clear filters
              </Link>
            </div>
          ) : searchParams.town || searchParams.beds || searchParams.type ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <PropertyCard key={property.reference} property={property} />
              ))}
            </div>
          ) : (
            sortedTowns.map(town => (
              <div key={town} className="mb-10">
                <div className="flex items-center justify-between mb-4 pb-2 border-b">
                  <h2 className="text-xl font-bold text-gray-800">
                    {town} <span className="text-gray-400 font-normal">({byTown[town].length})</span>
                  </h2>
                  {byTown[town].length > 6 && (
                    <Link href={`/properties?town=${encodeURIComponent(town)}`} className="text-blue-600 hover:underline text-sm font-medium">
                      View all →
                    </Link>
                  )}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {byTown[town].slice(0, 6).map(property => (
                    <PropertyCard key={property.reference} property={property} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Can't Find What You're Looking For?</h2>
          <p className="text-blue-100 mb-6">Tell us your requirements and we'll find your perfect home.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Us
            </Link>
            <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function PropertyCard({ property }: { property: BPProperty }) {
  const mainImage = property.images[0] || '/images/placeholder-property.jpg';
  
  // AI-generated SEO title
  const title = generatePropertyTitle(property);
  
  // Format price
  const formattedPrice = property.price > 0 
    ? `€${property.price.toLocaleString('en-US')}`
    : 'Price on request';
  
  return (
    <Link href={`/properties/${property.reference}`} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow group">
      <div className="relative h-48">
        <Image src={mainImage} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute top-2 left-2 flex gap-1">
          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">{property.type}</span>
          {property.pool && <span className="bg-cyan-500 text-white px-2 py-1 rounded text-xs font-medium">Pool</span>}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 line-clamp-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-3">{property.zone ? `${property.zone}, ` : ''}{property.town}</p>
        <div className="flex gap-4 text-sm text-gray-600 mb-3">
          {property.bedrooms > 0 && <span>{property.bedrooms} bed</span>}
          {property.bathrooms > 0 && <span>{property.bathrooms} bath</span>}
          {property.builtArea > 0 && <span>{property.builtArea}m²</span>}
        </div>
        <div className="text-blue-600 font-bold text-lg">{formattedPrice}</div>
      </div>
    </Link>
  );
}

// Generate SEO-optimized title for property
function generatePropertyTitle(p: BPProperty): string {
  // Check if property has AI-generated content first
  if ((p as any).aiContent?.title) {
    return (p as any).aiContent.title;
  }

  const parts: string[] = [];

  // Start with key feature if available
  if (p.pool) {
    parts.push('Stunning');
  } else if (p.plotArea > 500) {
    parts.push('Spacious');
  } else {
    parts.push('Modern');
  }

  // Bedrooms and type
  parts.push(`${p.bedrooms} Bedroom ${p.type}`);

  // Key selling point
  if (p.pool) {
    parts.push('with Private Pool');
  } else if (p.views && p.views.toLowerCase() !== 'none') {
    parts.push(`with ${p.views} Views`);
  }

  // Location
  parts.push(`in ${p.town}`);

  return parts.join(' ');
}
