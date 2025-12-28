import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import LeadForm from '@/components/LeadForm';
import { getBuilderBySlug, getAllBuilders, getDevelopmentsByBuilder } from '@/lib/property-service';
import { siteConfig } from '@/lib/config';

interface BuilderPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const builders = await getAllBuilders();
  return builders.map((builder) => ({
    slug: builder.slug,
  }));
}

export async function generateMetadata({ params }: BuilderPageProps): Promise<Metadata> {
  const builder = await getBuilderBySlug(params.slug);
  
  if (!builder) {
    return {
      title: 'Builder Not Found | New Build Homes Costa Blanca',
    };
  }

  return {
    title: `${builder.name} | New Build Developments Costa Blanca`,
    description: `Explore new build developments by ${builder.name} in Costa Blanca. ${builder.description?.slice(0, 150) || `Quality properties across Spain's Costa Blanca region.`}`,
    openGraph: {
      title: `${builder.name} Developments in Costa Blanca`,
      description: builder.description || `Discover quality new build homes by ${builder.name}`,
      images: builder.logo ? [builder.logo] : undefined,
    },
  };
}

export default async function BuilderPage({ params }: BuilderPageProps) {
  const builder = await getBuilderBySlug(params.slug);
  
  if (!builder) {
    notFound();
  }

  const developments = await getDevelopmentsByBuilder(builder.slug);

  // Builder stats
  const totalUnits = developments.reduce((acc, dev) => acc + (dev.propertyCount || 0), 0);
  const areas = Array.from(new Set(developments.map(d => d.town))).filter(Boolean);
  const priceRange = developments.length > 0 ? {
    min: Math.min(...developments.map(d => d.priceFrom || Infinity).filter(p => p !== Infinity)),
    max: Math.max(...developments.map(d => d.priceTo || 0)),
  } : null;

  // Schema markup for Organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: builder.name,
    logo: builder.logo || undefined,
    description: builder.description,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Alicante',
      addressCountry: 'ES',
    },
  };

  return (
    <>
      <Header />
      
      <main>
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-coastal-800 via-coastal-700 to-coastal-600 text-white py-20">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm">
              <ol className="flex items-center space-x-2">
                <li><Link href="/" className="hover:text-terracotta-300">Home</Link></li>
                <li className="text-coastal-300">/</li>
                <li><Link href="/builders" className="hover:text-terracotta-300">Builders</Link></li>
                <li className="text-coastal-300">/</li>
                <li className="text-terracotta-300">{builder.name}</li>
              </ol>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center gap-8">
              {/* Logo */}
              {builder.logo && (
                <div className="w-32 h-32 bg-white rounded-lg p-4 flex items-center justify-center shadow-xl">
                  <img src={builder.logo} alt={`${builder.name} logo`} className="max-w-full max-h-full object-contain" />
                </div>
              )}

              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{builder.name}</h1>
                <p className="text-xl text-coastal-100 mb-6 max-w-2xl">
                  {builder.description || `Trusted developer delivering quality new build homes across Costa Blanca.`}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                    <div className="text-3xl font-bold text-terracotta-300">{developments.length}</div>
                    <div className="text-sm text-coastal-200">Active Developments</div>
                  </div>
                  {totalUnits > 0 && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                      <div className="text-3xl font-bold text-terracotta-300">{totalUnits}+</div>
                      <div className="text-sm text-coastal-200">Properties</div>
                    </div>
                  )}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                    <div className="text-3xl font-bold text-terracotta-300">{areas.length}</div>
                    <div className="text-sm text-coastal-200">Locations</div>
                  </div>
                  {priceRange && priceRange.min !== Infinity && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                      <div className="text-2xl font-bold text-terracotta-300">
                        From €{(priceRange.min / 1000).toFixed(0)}k
                      </div>
                      <div className="text-sm text-coastal-200">Starting Price</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-sand-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* About Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-coastal-800 mb-4">About {builder.name}</h2>
                  <div className="prose prose-lg max-w-none text-coastal-600">
                    <p>
                      {builder.name} is a respected property developer delivering quality new build homes 
                      across Costa Blanca's most desirable locations. With a portfolio spanning {areas.length > 0 ? areas.join(', ') : 'multiple areas'},
                      they have established a reputation for modern design, quality construction, and on-time delivery.
                    </p>
                    {builder.established && (
                      <p>
                        Established in {builder.established}, {builder.name} brings decades of experience 
                        to every project, combining local expertise with contemporary building standards.
                      </p>
                    )}
                    <p>
                      Their developments feature turnkey apartments and villas with premium specifications, 
                      resort-style amenities, and excellent locations near beaches, golf courses, and essential services.
                    </p>
                  </div>
                </div>

                {/* Developments Grid */}
                {developments.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-coastal-800 mb-6">
                      Current Developments by {builder.name}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {developments.map((dev) => (
                        <Link 
                          key={dev.slug} 
                          href={`/developments/${dev.slug}`}
                          className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                          {/* Image */}
                          <div className="relative h-48 bg-gradient-to-br from-coastal-200 to-coastal-300">
                            <div className="absolute inset-0 flex items-center justify-center text-coastal-400">
                              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                            {/* Status Badge */}
                            {dev.statuses?.[0] && (
                              <div className="absolute top-3 left-3 bg-terracotta-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                {dev.statuses[0].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-5">
                            <h3 className="text-lg font-bold text-coastal-800 mb-1 group-hover:text-terracotta-600 transition-colors">
                              {dev.name}
                            </h3>
                            <p className="text-sm text-coastal-500 mb-3">{dev.town || 'Costa Blanca'}</p>
                            
                            <div className="flex items-center justify-between">
                              {dev.priceFrom && (
                                <div className="text-terracotta-600 font-bold">
                                  From €{dev.priceFrom.toLocaleString()}
                                </div>
                              )}
                              <span className="text-coastal-400 group-hover:text-terracotta-500 transition-colors">
                                View Details →
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Why Choose Section */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-coastal-800 mb-6">Why Choose {builder.name}?</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-terracotta-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-terracotta-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-coastal-800 mb-1">Quality Construction</h3>
                        <p className="text-sm text-coastal-600">Premium materials and finishes with attention to detail.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-terracotta-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-terracotta-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-coastal-800 mb-1">On-Time Delivery</h3>
                        <p className="text-sm text-coastal-600">Strong track record of completing projects on schedule.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-terracotta-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-terracotta-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-coastal-800 mb-1">Turnkey Properties</h3>
                        <p className="text-sm text-coastal-600">Fully furnished apartments ready to move in.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-terracotta-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-terracotta-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-coastal-800 mb-1">Prime Locations</h3>
                        <p className="text-sm text-coastal-600">Developments in Costa Blanca's most desirable areas.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Contact Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 sticky top-24">
                  <h3 className="text-xl font-bold text-coastal-800 mb-4">
                    Interested in {builder.name} Properties?
                  </h3>
                  <p className="text-coastal-600 mb-6">
                    Get exclusive access to the latest availability, pricing, and floor plans 
                    from {builder.name} developments.
                  </p>
                  
                  <LeadForm 
                    source={`Builder: ${builder.name}`}
                  />

                  {/* Quick Contact */}
                  <div className="mt-6 pt-6 border-t border-coastal-100">
                    <p className="text-sm text-coastal-500 mb-3">Or contact us directly:</p>
                    <a 
                      href={`tel:${siteConfig.contact.phone}`}
                      className="flex items-center gap-2 text-coastal-700 hover:text-terracotta-600 mb-2"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {siteConfig.contact.phoneDisplay}
                    </a>
                    <a 
                      href={siteConfig.contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-600 hover:text-green-700"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-terracotta-600 to-terracotta-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to View {builder.name} Properties?</h2>
            <p className="text-xl text-terracotta-100 mb-8 max-w-2xl mx-auto">
              Schedule a viewing or video call to explore the latest developments and find your perfect Costa Blanca home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-terracotta-600 px-8 py-4 rounded-lg font-semibold hover:bg-coastal-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-terracotta-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-terracotta-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
