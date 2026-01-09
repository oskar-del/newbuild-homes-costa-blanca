import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchAllProperties } from '@/lib/unified-feed-service';
import { UnifiedProperty } from '@/lib/unified-property';
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
  const allProperties = await fetchAllProperties();
  
  // Get unique values for filters
  const towns = [...new Set(allProperties.map(p => p.town).filter(Boolean))].sort();
  const types = [...new Set(allProperties.map(p => p.propertyType).filter(Boolean))].sort();
  const bedOptions = [...new Set(allProperties.map(p => p.bedrooms).filter(b => b > 0))].sort((a, b) => a - b);

  // Apply filters
  let properties = allProperties;
  if (searchParams.town) {
    properties = properties.filter(p => p.town === searchParams.town);
  }
  if (searchParams.beds) {
    properties = properties.filter(p => p.bedrooms === parseInt(searchParams.beds as string));
  }
  if (searchParams.type) {
    properties = properties.filter(p => p.propertyType === searchParams.type);
  }

  // Group by town
  const byTown = properties.reduce((acc, prop) => {
    const town = prop.town || 'Other';
    if (!acc[town]) acc[town] = [];
    acc[town].push(prop);
    return acc;
  }, {} as Record<string, UnifiedProperty[]>);

  const sortedTowns = Object.keys(byTown).sort((a, b) => byTown[b].length - byTown[a].length);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Properties</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">New Build Properties</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Individual new build villas and houses across Costa Blanca. Modern homes from trusted developers, ready for your viewing.
          </p>
          <p className="mt-4 text-amber-400 font-semibold text-lg">
            {properties.length} properties available
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b shadow-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <PropertyFilters towns={towns} types={types} bedOptions={bedOptions} />
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {properties.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">No properties found matching your criteria.</p>
              <Link href="/properties" className="text-amber-600 hover:text-amber-700 font-medium mt-2 inline-block">
                Clear filters
              </Link>
            </div>
          ) : searchParams.town ? (
            // Show flat grid when filtered by town
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            // Show grouped by town
            sortedTowns.map(town => (
              <div key={town} className="mb-12">
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800">
                    {town}
                    <span className="text-slate-400 font-normal text-lg ml-2">
                      ({byTown[town].length} {byTown[town].length === 1 ? 'property' : 'properties'})
                    </span>
                  </h2>
                  <Link
                    href={`/properties?town=${encodeURIComponent(town)}`}
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                  >
                    View all →
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {byTown[town].slice(0, 6).map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
                {byTown[town].length > 6 && (
                  <div className="text-center mt-6">
                    <Link
                      href={`/properties?town=${encodeURIComponent(town)}`}
                      className="inline-block bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      View all {byTown[town].length} properties in {town}
                    </Link>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-amber-100 mb-6 max-w-xl mx-auto">
            Tell us your requirements and we'll find your perfect Costa Blanca home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}


function generatePropertyTitle(property: UnifiedProperty): string {
  const adjectives = ["Stunning", "Beautiful", "Modern", "Elegant", "Spacious", "Luxurious"];
  const adjective = adjectives[Math.abs(property.reference.charCodeAt(0)) % adjectives.length];
  const beds = property.bedrooms > 0 ? `${property.bedrooms} Bedroom ` : "";
  const type = property.propertyType || "Property";
  let feature = "";
  if (property.hasPool) feature = " with Private Pool";
  else if (property.builtArea > 200) feature = " with Spacious Living";
  const location = property.town || "Costa Blanca";
  return `${adjective} ${beds}${type}${feature} in ${location}`;
}

function PropertyCard({ property }: { property: UnifiedProperty }) {
  const mainImage = property.mainImage || property.images[0]?.url || '/images/placeholder-property.jpg';
  
  // Create a cleaner title
  const displayTitle = generatePropertyTitle(property);
  
  return (
    <Link
      href={`/properties/${property.reference}`}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={mainImage}
          alt={displayTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.propertyType}
          </span>
          {property.hasPool && (
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Pool
            </span>
          )}
          {property.source === 'redsp' && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              New
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white text-sm font-medium">
            {property.locationDetail ? `${property.locationDetail}, ` : ''}{property.town}
          </p>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {displayTitle}
        </h3>
        <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {property.bedrooms} bed
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              {property.bathrooms} bath
            </span>
          )}
          {property.builtArea > 0 && (
            <span>{property.builtArea} m²</span>
          )}
        </div>
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-amber-600 font-bold text-lg">
            {property.price > 0 ? `€${property.price.toLocaleString()}` : "Contact for Price"}
          </span>
          <span className="text-amber-600 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}
