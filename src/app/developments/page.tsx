import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import { getAllDevelopments, getStatusConfig, formatPrice, getAllAreas } from '@/lib/property-service';

export const metadata: Metadata = {
  title: 'New Build Developments Costa Blanca | Off-Plan & Key-Ready Homes',
  description: 'Browse new build developments across Costa Blanca. Key-ready apartments, off-plan villas, and investment properties from trusted Spanish developers.',
};

export default async function DevelopmentsPage() {
  const developments = await getAllDevelopments();
  const statusConfig = getStatusConfig();
  const areas = getAllAreas();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-deep-blue-900 via-deep-blue-800 to-deep-blue-700 text-white py-16">
        <div className="container">
          <h1 className="heading-1 text-white mb-4">
            New Build Developments
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Browse our selection of new build properties across Costa Blanca. 
            From key-ready homes to off-plan investments with trusted developers.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b sticky top-20 z-30 shadow-sm">
        <div className="container">
          <div className="flex flex-wrap gap-4">
            <select className="form-input w-auto min-w-[140px]" defaultValue="all">
              <option value="all">All Status</option>
              <option value="key-ready">Key Ready</option>
              <option value="completion-3-months">Completion 3 Months</option>
              <option value="under-construction">Under Construction</option>
              <option value="off-plan">Off Plan</option>
            </select>
            <select className="form-input w-auto min-w-[160px]" defaultValue="all">
              <option value="all">All Areas</option>
              {areas.map(area => (
                <option key={area.slug} value={area.slug}>{area.name}</option>
              ))}
            </select>
            <select className="form-input w-auto min-w-[140px]" defaultValue="all">
              <option value="all">All Bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
            </select>
            <select className="form-input w-auto min-w-[160px]" defaultValue="all">
              <option value="all">Price: Any</option>
              <option value="200000">Under €200,000</option>
              <option value="300000">Under €300,000</option>
              <option value="500000">Under €500,000</option>
            </select>
          </div>
        </div>
      </section>

      {/* Developments Grid */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="mb-8 flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-deep-blue-700">{developments.length}</span> developments
            </p>
            <div className="text-sm text-gray-500">
              Sort by: <span className="text-deep-blue-600 font-medium">Price (Low to High)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developments.map((dev) => {
              const primaryStatus = dev.statuses[0] || 'under-construction';
              const status = statusConfig[primaryStatus as keyof typeof statusConfig];
              
              return (
                <Link
                  key={dev.slug}
                  href={`/developments/${dev.slug}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group"
                >
                  {/* Image */}
                  <div className="relative h-52 bg-gradient-to-br from-deep-blue-200 to-deep-blue-400">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/70 text-lg font-medium">{dev.name}</span>
                    </div>
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${status.bgColor} ${status.textColor}`}>
                        {status.label}
                      </span>
                    </div>
                    {/* Property Count */}
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {dev.propertyCount} properties
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm text-deep-blue-600 font-medium mb-1">{dev.developer}</p>
                    <h3 className="font-display font-bold text-xl text-gray-900 group-hover:text-deep-blue-600 transition-colors mb-1">
                      {dev.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 flex items-center">
                      <span className="mr-1">📍</span>
                      {dev.zone ? `${dev.zone}, ` : ''}{dev.town}
                    </p>
                    
                    {/* Property Types */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dev.types.map((type) => (
                        <span key={type} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded capitalize">
                          {type}
                        </span>
                      ))}
                      {dev.bedroomRange.min > 0 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {dev.bedroomRange.min === dev.bedroomRange.max 
                            ? `${dev.bedroomRange.min} bed` 
                            : `${dev.bedroomRange.min}-${dev.bedroomRange.max} bed`}
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-sm text-gray-500">From</span>
                        <span className="font-bold text-lg text-deep-blue-700 ml-2">
                          {dev.priceFrom ? formatPrice(dev.priceFrom) : 'POA'}
                        </span>
                      </div>
                      <span className="text-deep-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {developments.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No developments found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or contact us for help.</p>
              <button className="btn-outline">Clear Filters</button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <h2 className="heading-2 text-gray-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            We have access to many more developments not listed here. 
            Tell us what you're looking for and we'll find the perfect property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us Your Requirements
            </a>
            <a href={`tel:${siteConfig.contact.phone}`} className="btn-outline">
              📞 {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
