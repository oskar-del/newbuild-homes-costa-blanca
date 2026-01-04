import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPropertyByReference, fetchNewBuilds } from '@/lib/backgroundProperties';

export const revalidate = 3600;

export async function generateStaticParams() {
  const properties = await fetchNewBuilds();
  return properties.slice(0, 50).map((p) => ({
    reference: p.reference,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { reference: string };
}): Promise<Metadata> {
  const property = await getPropertyByReference(params.reference);
  if (!property) return { title: 'Property Not Found' };

  const title = `${property.bedrooms} Bed ${property.type} for Sale in ${property.town} | Costa Blanca`;
  const description = `Beautiful ${property.bedrooms} bedroom ${property.type.toLowerCase()} in ${property.town}, Costa Blanca. ${property.builtArea > 0 ? `${property.builtArea}m² built area.` : ''} ${property.pool ? 'Private pool included.' : ''} Contact us for viewings.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: property.images[0] ? [property.images[0]] : [],
    },
  };
}

// Generate compelling property description from data
function generateDescription(property: any): string {
  const parts: string[] = [];
  
  // Opening line based on property type
  if (property.type === 'Villa') {
    parts.push(`This stunning ${property.bedrooms} bedroom villa in ${property.town} offers the perfect blend of modern living and Mediterranean charm.`);
  } else if (property.type === 'Apartment') {
    parts.push(`A beautifully designed ${property.bedrooms} bedroom apartment situated in the desirable area of ${property.town}.`);
  } else {
    parts.push(`An exceptional ${property.bedrooms} bedroom ${property.type.toLowerCase()} located in ${property.town}, one of Costa Blanca's most sought-after locations.`);
  }

  // Size details
  if (property.builtArea > 0 && property.plotArea > 0) {
    parts.push(`The property boasts ${property.builtArea}m² of built space on a generous ${property.plotArea}m² plot, providing ample room for comfortable living and outdoor enjoyment.`);
  } else if (property.builtArea > 0) {
    parts.push(`With ${property.builtArea}m² of thoughtfully designed living space, this property offers generous proportions throughout.`);
  }

  // Bedrooms and bathrooms
  if (property.bedrooms > 0 && property.bathrooms > 0) {
    parts.push(`The accommodation comprises ${property.bedrooms} spacious bedroom${property.bedrooms > 1 ? 's' : ''} and ${property.bathrooms} modern bathroom${property.bathrooms > 1 ? 's' : ''}, perfect for families or those who enjoy hosting guests.`);
  }

  // Pool
  if (property.pool) {
    parts.push(`A highlight of this property is the private swimming pool, ideal for cooling off during the warm Spanish summers and entertaining friends and family.`);
  }

  // Views
  if (property.views && property.views.toLowerCase() !== 'none') {
    parts.push(`Enjoy breathtaking ${property.views.toLowerCase()} views from this privileged position.`);
  }

  // Orientation
  if (property.orientation && property.orientation.toLowerCase() !== 'none') {
    parts.push(`The ${property.orientation.toLowerCase()} orientation ensures excellent natural light throughout the day.`);
  }

  // Location paragraph
  parts.push(`\n\n${property.town} is known for its excellent amenities, beautiful beaches, and welcoming international community. This location offers easy access to local shops, restaurants, and all the attractions that make Costa Blanca one of Spain's most popular destinations.`);

  // Closing
  parts.push(`\n\nThis new build property represents an excellent opportunity to own a quality home in one of the Costa Blanca's finest locations. Contact us today to arrange a viewing and discover everything this exceptional property has to offer.`);

  return parts.join(' ');
}

// Generate feature highlights
function generateHighlights(property: any): string[] {
  const highlights: string[] = [];
  
  if (property.bedrooms > 0) highlights.push(`${property.bedrooms} Bedrooms`);
  if (property.bathrooms > 0) highlights.push(`${property.bathrooms} Bathrooms`);
  if (property.builtArea > 0) highlights.push(`${property.builtArea}m² Built`);
  if (property.plotArea > 0) highlights.push(`${property.plotArea}m² Plot`);
  if (property.pool) highlights.push('Private Pool');
  if (property.views && property.views.toLowerCase() !== 'none') highlights.push(`${property.views} Views`);
  if (property.orientation && property.orientation.toLowerCase() !== 'none') highlights.push(`${property.orientation} Facing`);
  if (property.energyRating) highlights.push(`Energy Rating: ${property.energyRating}`);
  
  return highlights;
}

export default async function PropertyPage({
  params,
}: {
  params: { reference: string };
}) {
  const property = await getPropertyByReference(params.reference);
  if (!property) notFound();

  const description = generateDescription(property);
  const highlights = generateHighlights(property);
  const displayTitle = `${property.bedrooms} Bedroom ${property.type} in ${property.town}`;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-slate-500">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/properties" className="hover:text-amber-600">Properties</Link>
            <span className="mx-2">/</span>
            <Link href={`/properties?town=${encodeURIComponent(property.town)}`} className="hover:text-amber-600">
              {property.town}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800">{property.reference}</span>
          </nav>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="bg-slate-900">
        <div className="container mx-auto">
          {property.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div className="relative h-[300px] md:h-[500px]">
                <Image
                  src={property.images[0]}
                  alt={displayTitle}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {property.images.length > 1 && (
                <div className="grid grid-cols-2 gap-1">
                  {property.images.slice(1, 5).map((img, i) => (
                    <div key={i} className="relative h-[149px] md:h-[248px]">
                      <Image
                        src={img}
                        alt={`${displayTitle} - Image ${i + 2}`}
                        fill
                        className="object-cover"
                      />
                      {i === 3 && property.images.length > 5 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-xl font-bold">
                            +{property.images.length - 5} more
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-[300px] md:h-[500px] bg-slate-800 flex items-center justify-center">
              <span className="text-slate-500">No images available</span>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Property Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {property.type}
                  </span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    New Build
                  </span>
                  {property.pool && (
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Pool
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                  {displayTitle}
                </h1>
                <p className="text-lg text-slate-600">
                  {property.zone ? `${property.zone}, ` : ''}{property.town}, {property.province}
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.bedrooms > 0 && (
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-3xl font-bold text-amber-600">{property.bedrooms}</div>
                    <div className="text-slate-600 text-sm">Bedrooms</div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-3xl font-bold text-amber-600">{property.bathrooms}</div>
                    <div className="text-slate-600 text-sm">Bathrooms</div>
                  </div>
                )}
                {property.builtArea > 0 && (
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-3xl font-bold text-amber-600">{property.builtArea}</div>
                    <div className="text-slate-600 text-sm">m² Built</div>
                  </div>
                )}
                {property.plotArea > 0 && (
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-3xl font-bold text-amber-600">{property.plotArea}</div>
                    <div className="text-slate-600 text-sm">m² Plot</div>
                  </div>
                )}
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-800 mb-4">Property Highlights</h2>
                  <div className="flex flex-wrap gap-2">
                    {highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        ✓ {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-800 mb-4">About This Property</h2>
                <div className="prose prose-slate max-w-none">
                  {description.split('\n\n').map((para, i) => (
                    <p key={i} className="text-slate-600 mb-4 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Features */}
              {property.features.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-800 mb-4">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-600">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Location</h2>
                <p className="text-slate-600 mb-4">
                  This property is located in <strong>{property.town}</strong>
                  {property.zone ? `, in the ${property.zone} area` : ''}.
                  {property.province && ` Part of ${property.province} province.`}
                </p>
                <Link
                  href={`/properties?town=${encodeURIComponent(property.town)}`}
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  View more properties in {property.town} →
                </Link>
              </div>
            </div>

            {/* Right Column - Contact Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-sm text-slate-500 mb-1">Price</div>
                  <div className="text-3xl font-bold text-amber-600">Contact for Details</div>
                  <p className="text-sm text-slate-500 mt-2">
                    Prices and availability change frequently
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp Us
                  </a>

                  <a
                    href="tel:+34634044970"
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call +34 634 044 970
                  </a>

                  <Link
                    href="/contact"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Request Information
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-sm text-slate-500 text-center">
                    Reference: <span className="font-mono text-slate-700">{property.reference}</span>
                  </p>
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>💡 Tip:</strong> Contact us to arrange a viewing or video call to see this property. We can also help with mortgages, legal advice, and the buying process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <section className="py-8 bg-white border-t">
        <div className="container mx-auto px-4">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all properties
          </Link>
        </div>
      </section>
    </main>
  );
}
