import ImageGallery from '@/components/ImageGallery';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDevelopmentBySlug, getAllDevelopments, getStatusConfig, formatPrice } from '@/lib/property-service';
import { loadContent } from '@/lib/content-store';
import { featuredDevelopments } from '@/data/sample-data';
import LeadForm from '@/components/LeadForm';
import AIGeneratedContent, { FAQSchema, DevelopmentSchema, BreadcrumbSchema } from '@/components/AIGeneratedContent';
import { siteConfig } from '@/lib/config';

interface Props {
  params: { slug: string };
}

// Generate static params for all developments
export async function generateStaticParams() {
  const developments = await getAllDevelopments();
  return developments.map((dev) => ({
    slug: dev.slug,
  }));
}

// Generate metadata - uses AI-generated meta if available
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const development = await getDevelopmentBySlug(params.slug);
  
  if (!development) {
    return { title: 'Development Not Found' };
  }

  // Try to load AI-generated content for meta tags
  const aiContent = loadContent('development', params.slug);
  
  if (aiContent) {
    return {
      title: aiContent.metaTitle,
      description: aiContent.metaDescription,
      openGraph: {
        title: aiContent.metaTitle,
        description: aiContent.metaDescription,
      },
    };
  }

  // Fallback to basic meta
  const featured = featuredDevelopments.find(f => f.slug === params.slug);
  const priceFrom = development.priceFrom ? formatPrice(development.priceFrom) : 'Price on request';

  return {
    title: `${development.name} ${development.town} | New Build from ${priceFrom}`,
    description: featured?.description || `New build ${development.types.join(', ')} at ${development.name} in ${development.town}. ${development.bedroomRange.min}-${development.bedroomRange.max} bedroom properties from ${priceFrom}. Contact us for availability.`,
    openGraph: {
      title: `${development.name} - New Build Properties in ${development.town}`,
      description: `${development.propertyCount} properties available from ${priceFrom}`,
    },
  };
}

export default async function DevelopmentPage({ params }: Props) {
  const development = await getDevelopmentBySlug(params.slug);
  
  if (!development) {
    notFound();
  }

  // Load AI-generated content
  const aiContent = loadContent('development', params.slug);
  
  const featured = featuredDevelopments.find(f => f.slug === params.slug);
  const statusConfig = getStatusConfig();
  const primaryStatus = development.statuses[0] || 'under-construction';
  const status = statusConfig[primaryStatus as keyof typeof statusConfig];

  // Breadcrumb data
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.newbuildhomescostablanca.com/' },
    { name: 'Developments', url: 'https://www.newbuildhomescostablanca.com/developments/' },
    { name: development.name, url: `https://www.newbuildhomescostablanca.com/developments/${params.slug}/` },
  ];

  return (
    <>
      {/* Schema Markup */}
      <DevelopmentSchema development={development} content={aiContent} />
      <BreadcrumbSchema items={breadcrumbs} />
      {aiContent && <FAQSchema faqs={aiContent.faqs} />}

      <main>
        {/* Hero Section - Compact when AI content available */}
        <section className="relative bg-gradient-to-br from-deep-blue-900 via-deep-blue-800 to-deep-blue-700 text-white">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative section py-12 md:py-16">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="mb-4 text-sm">
                <ol className="flex items-center gap-2 text-white/70">
                  <li><Link href="/" className="hover:text-white">Home</Link></li>
                  <li>/</li>
                  <li><Link href="/developments" className="hover:text-white">Developments</Link></li>
                  <li>/</li>
                  <li className="text-white">{development.name}</li>
                </ol>
              </nav>

              {/* Status Badge */}
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${status.bgColor} ${status.textColor}`}>
                {status.label}
              </span>

              <h1 className="heading-1 mb-3">{development.name}</h1>
              
              <p className="text-lg text-white/90 mb-2">
                by <Link href={`/builders/${development.developerSlug}`} className="underline hover:text-white">{development.developer}</Link>
                {' • '}{development.zone ? `${development.zone}, ` : ''}{development.town}
              </p>

              {/* Quick Stats Row */}
              <div className="flex flex-wrap gap-4 mt-6 text-sm">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-bold text-lg">{development.priceFrom ? formatPrice(development.priceFrom) : 'POA'}</span>
                  <span className="text-white/70 ml-1">from</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-bold text-lg">{development.bedroomRange.min}-{development.bedroomRange.max}</span>
                  <span className="text-white/70 ml-1">beds</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-bold text-lg">{development.propertyCount}</span>
                  <span className="text-white/70 ml-1">units</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <a href={siteConfig.contact.whatsapp} className="btn-whatsapp">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
                <a href={`tel:${siteConfig.contact.phone}`} className="btn-primary">
                  Call {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="section py-8"><div className="container"><ImageGallery images={development.images} name={development.name} /></div></section>

        <section className="section">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2">
                
                {/* AI-Generated Content OR Fallback */}
                {aiContent ? (
                  <AIGeneratedContent 
                    content={aiContent} 
                    developmentName={development.name} 
                  />
                ) : (
                  /* Fallback Template Content */
                  <div className="prose prose-lg max-w-none">
                    <h2>About {development.name}</h2>
                    {featured ? (
                      <>
                        <p>{featured.description}</p>
                        <div className="bg-gray-50 rounded-xl p-6 not-prose my-6">
                          <h3 className="font-semibold text-lg mb-4">Key Features</h3>
                          <ul className="grid md:grid-cols-2 gap-3">
                            {featured.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <p>
                        {development.name} is a new build development by {development.developer} in {development.town}, 
                        featuring {development.propertyCount} {development.types.join(' and ')} properties.
                        Contact us for full details and availability.
                      </p>
                    )}

                    <h2>Property Types</h2>
                    <p>
                      This development offers {development.types.join(', ')} with 
                      {development.bedroomRange.min === development.bedroomRange.max 
                        ? ` ${development.bedroomRange.min} bedrooms` 
                        : ` ${development.bedroomRange.min} to ${development.bedroomRange.max} bedrooms`}.
                      <strong> Contact us for current availability and pricing.</strong>
                    </p>

                    <h2>Location</h2>
                    <p>
                      Located in {development.zone ? `${development.zone}, ` : ''}{development.town}, {development.province}.
                      This area of Costa Blanca offers excellent amenities and lifestyle options.
                    </p>

                    {/* Basic FAQ Section */}
                    <h2>Frequently Asked Questions</h2>
                    <div className="space-y-4 not-prose">
                      <details className="group border rounded-lg">
                        <summary className="cursor-pointer p-4 font-medium flex justify-between items-center">
                          What types of properties are available?
                          <span className="group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="px-4 pb-4 text-gray-600">
                          {development.name} offers {development.types.join(' and ')} configurations 
                          with {development.bedroomRange.min}-{development.bedroomRange.max} bedrooms. 
                          Contact us for current availability.
                        </div>
                      </details>
                      <details className="group border rounded-lg">
                        <summary className="cursor-pointer p-4 font-medium flex justify-between items-center">
                          Can I get mortgage financing?
                          <span className="group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="px-4 pb-4 text-gray-600">
                          Yes, Spanish banks offer mortgages to international buyers. We partner with 
                          <a href={siteConfig.partners.habeno} className="text-deep-blue-600 mx-1">Habeno</a>
                          who can compare offers from multiple banks.
                        </div>
                      </details>
                      <details className="group border rounded-lg">
                        <summary className="cursor-pointer p-4 font-medium flex justify-between items-center">
                          How do I arrange a viewing?
                          <span className="group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="px-4 pb-4 text-gray-600">
                          Contact us via WhatsApp at {siteConfig.contact.phoneDisplay} or use the form 
                          on this page. We offer both in-person viewings and video tours.
                        </div>
                      </details>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Sticky Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  
                  {/* Price Card */}
                  <div className="bg-white border-2 border-deep-blue-100 rounded-xl p-6 shadow-lg">
                    <p className="text-sm text-gray-500 mb-1">Starting from</p>
                    <p className="text-3xl font-bold text-deep-blue-700 mb-4">
                      {development.priceFrom ? formatPrice(development.priceFrom) : 'Price on request'}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <a href={siteConfig.contact.whatsapp} className="btn-whatsapp w-full justify-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp Us
                      </a>
                      <a href={`tel:${siteConfig.contact.phone}`} className="btn-primary w-full justify-center">
                        Call Now
                      </a>
                    </div>

                    <p className="text-center text-sm text-gray-500">
                      For latest availability & pricing
                    </p>
                  </div>

                  {/* Lead Form */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4">Request Information</h3>
                    <LeadForm 
                      propertyInterest={development.name}
                      source={`development-page-${development.slug}`}
                      compact
                    />
                  </div>

                  {/* Mortgage CTA */}
                  <div className="bg-gradient-to-br from-terracotta-50 to-white border border-terracotta-100 rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-2">Need Financing?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get mortgage pre-approval with our partner Habeno
                    </p>
                    <a 
                      href={siteConfig.partners.habeno}
                      className="btn-accent w-full justify-center text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start Application →
                    </a>
                  </div>

                  {/* Builder Card */}
                  <div className="border rounded-xl p-6">
                    <p className="text-sm text-gray-500 mb-2">Developer</p>
                    <Link 
                      href={`/builders/${development.developerSlug}`}
                      className="font-semibold text-lg text-deep-blue-700 hover:text-deep-blue-900"
                    >
                      {development.developer}
                    </Link>
                    <p className="text-sm text-gray-600 mt-2">
                      View all developments by this builder →
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-deep-blue-800 to-deep-blue-900 text-white section">
          <div className="container text-center">
            <h2 className="heading-2 mb-4">Interested in {development.name}?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Don't miss out on this opportunity. Contact us today for the latest availability, 
              pricing, and to arrange a viewing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={siteConfig.contact.whatsapp} className="btn-whatsapp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us Now
              </a>
              <a href={`tel:${siteConfig.contact.phone}`} className="btn-outline border-white text-white hover:bg-white hover:text-deep-blue-900">
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
