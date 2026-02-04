import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'After Sales Services | Property Management & Interior Design',
  description: 'Comprehensive after-sales support for your new build property in Spain. Property management, interior styling, furniture packages, rental license assistance, and more.',
  openGraph: {
    title: 'After Sales Services | New Build Homes Costa Blanca',
    description: 'Complete after-sales support: property management, interior design, furniture packs, and rental license assistance.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/after-sales',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'After Sales Services | New Build Homes Costa Blanca',
    description: 'Property management, interior design, furniture packs and more for your Spanish property.',
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  email: 'info@newbuildhomescostablanca.com',
};

// Service card component
function ServiceCard({
  icon,
  title,
  description,
  features,
  highlight
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-sm border p-6 transition-all hover:shadow-lg ${
      highlight
        ? 'bg-primary-900 text-white border-primary-700'
        : 'bg-white border-warm-200'
    }`}>
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
        highlight ? 'bg-accent-500' : 'bg-primary-100'
      }`}>
        {icon}
      </div>
      <h3 className={`text-xl font-semibold mb-3 ${highlight ? 'text-white' : 'text-primary-900'}`}>
        {title}
      </h3>
      <p className={`mb-4 ${highlight ? 'text-warm-300' : 'text-warm-600'}`}>
        {description}
      </p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-start gap-2 text-sm ${highlight ? 'text-warm-200' : 'text-warm-600'}`}>
            <svg className={`w-5 h-5 flex-shrink-0 ${highlight ? 'text-accent-400' : 'text-accent-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Package card for furniture packs
function PackageCard({
  name,
  description,
  includes,
  price,
  popular
}: {
  name: string;
  description: string;
  includes: string[];
  price: string;
  popular?: boolean;
}) {
  return (
    <div className={`relative rounded-sm border p-6 ${
      popular
        ? 'bg-white border-accent-500 border-2 shadow-lg'
        : 'bg-white border-warm-200'
    }`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-xs font-medium px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <h4 className="text-lg font-semibold text-primary-900 mb-2">{name}</h4>
      <p className="text-warm-600 text-sm mb-4">{description}</p>
      <div className="text-2xl font-bold text-primary-900 mb-4">
        From {price}
      </div>
      <ul className="space-y-2 mb-6">
        {includes.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-warm-600">
            <svg className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={`block text-center py-3 rounded-sm font-medium transition-colors ${
          popular
            ? 'bg-accent-500 hover:bg-accent-600 text-white'
            : 'bg-warm-100 hover:bg-warm-200 text-primary-900'
        }`}
      >
        Get Quote
      </a>
    </div>
  );
}

export default function AfterSalesPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'After Sales Services', url: 'https://newbuildhomescostablanca.com/after-sales/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero Section */}
        <section className="relative bg-primary-900 py-20 md:py-28">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80"
              alt="Modern interior design"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 to-primary-900" />

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-white">After Sales Services</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Complete Support
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6">
                Your Journey Doesn&apos;t End at <span className="font-semibold">Key Handover</span>
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed mb-8">
                Buying a new build is just the beginning. From furnishing your property to managing
                rentals, our comprehensive after-sales services ensure your investment is protected
                and optimized. We&apos;re here for you every step of the way.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-sm font-medium transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Discuss Your Needs
                </a>
                <Link
                  href="/guides/tourist-rental-license"
                  className="border border-warm-400 text-white hover:bg-white/10 px-6 py-3 rounded-sm font-medium transition-colors"
                >
                  Rental License Guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                  Our Services
                </span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-3xl font-light text-primary-900 mb-4">
                Everything You Need <span className="font-semibold">After Purchase</span>
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                From interior design to property management, we offer a complete range of services
                to help you get the most from your Spanish property investment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard
                icon={
                  <svg className="w-7 h-7 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                }
                title="Property Management"
                description="Complete management of your property while you're away. Peace of mind for absentee owners."
                features={[
                  "Regular property inspections",
                  "Key holding services",
                  "Mail collection & forwarding",
                  "Bill payment management",
                  "Emergency response 24/7",
                  "Coordination with contractors"
                ]}
              />

              <ServiceCard
                icon={
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                }
                title="Interior Design & Styling"
                description="Transform your property into a stunning home. Our designers create spaces that reflect your style."
                features={[
                  "Full interior design service",
                  "Color consultation & schemes",
                  "Space planning & layouts",
                  "Lighting design",
                  "Soft furnishing selection",
                  "Art & accessory sourcing"
                ]}
                highlight
              />

              <ServiceCard
                icon={
                  <svg className="w-7 h-7 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                }
                title="Furniture Packages"
                description="Complete furniture solutions at competitive prices. Move-in ready from day one."
                features={[
                  "Quality furniture from trusted suppliers",
                  "Complete home packages",
                  "Outdoor furniture included",
                  "Appliance packages available",
                  "Delivery & installation",
                  "Best prices guaranteed"
                ]}
              />

              <ServiceCard
                icon={
                  <svg className="w-7 h-7 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                title="Tourist Rental License"
                description="Navigate the VT license process with expert guidance. Essential for holiday rentals."
                features={[
                  "License application assistance",
                  "Documentation preparation",
                  "Compliance guidance",
                  "Energy certificate coordination",
                  "Technical inspection support",
                  "Ongoing compliance advice"
                ]}
              />

              <ServiceCard
                icon={
                  <svg className="w-7 h-7 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
                title="Rental Management"
                description="Maximize your rental income with professional management and marketing."
                features={[
                  "Listing on major platforms",
                  "Professional photography",
                  "Guest communication",
                  "Check-in/check-out service",
                  "Cleaning coordination",
                  "Maintenance management"
                ]}
              />

              <ServiceCard
                icon={
                  <svg className="w-7 h-7 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                title="Maintenance Services"
                description="Keep your property in perfect condition with our maintenance network."
                features={[
                  "Pool & garden maintenance",
                  "Air conditioning servicing",
                  "Plumbing & electrical",
                  "General repairs",
                  "Annual maintenance packages",
                  "Emergency callout service"
                ]}
              />
            </div>
          </div>
        </section>

        {/* Furniture Packages Section */}
        <section className="py-16 bg-warm-50 border-y border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                  Furniture Packages
                </span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-3xl font-light text-primary-900 mb-4">
                Complete Furniture <span className="font-semibold">Solutions</span>
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                We&apos;ve partnered with trusted suppliers to offer you the best prices on quality furniture.
                From basic packages to luxury furnishings, we have options for every budget and style.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <PackageCard
                name="Essential Pack"
                description="Everything you need to start living in your new home."
                price="€3,500"
                includes={[
                  "Living room furniture",
                  "Bedroom furniture (1-2 beds)",
                  "Dining table & chairs",
                  "Basic kitchen essentials",
                  "Essential lighting",
                  "Delivery & assembly"
                ]}
              />

              <PackageCard
                name="Comfort Pack"
                description="Quality furniture for comfortable year-round living."
                price="€7,500"
                popular
                includes={[
                  "Premium living room set",
                  "Bedroom furniture (2-3 beds)",
                  "Quality dining set",
                  "Full kitchen equipment",
                  "Designer lighting",
                  "Soft furnishings & decor",
                  "Outdoor furniture",
                  "Delivery & installation"
                ]}
              />

              <PackageCard
                name="Luxury Pack"
                description="High-end furnishings for discerning homeowners."
                price="€15,000"
                includes={[
                  "Designer furniture throughout",
                  "All bedrooms furnished",
                  "Premium dining set",
                  "High-end appliances",
                  "Smart home features",
                  "Full soft furnishings",
                  "Outdoor living complete",
                  "Art & accessories",
                  "White glove installation"
                ]}
              />
            </div>

            <div className="mt-8 text-center">
              <p className="text-warm-600 text-sm mb-4">
                All packages customizable to your needs. Prices vary based on property size and specifications.
              </p>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium"
              >
                Request a custom quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Tourist Rental License CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                    Holiday Rentals
                  </span>
                </div>
                <h2 className="text-3xl font-light text-primary-900 mb-6">
                  Planning to Rent Your <span className="font-semibold">Property?</span>
                </h2>
                <div className="space-y-4 text-warm-700 leading-relaxed">
                  <p>
                    If you&apos;re considering renting your property to tourists, you&apos;ll need a
                    <strong> Tourist Rental License (Licencia VT)</strong>. The Valencia region has
                    specific requirements and recent law changes that you need to navigate.
                  </p>
                  <p>
                    We can help you through the entire process - from checking if your property
                    qualifies to obtaining the license and ensuring ongoing compliance. Our team
                    handles all the paperwork so you can focus on maximizing your rental income.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/guides/tourist-rental-license"
                    className="bg-primary-900 hover:bg-primary-800 text-white px-6 py-3 rounded-sm font-medium transition-colors inline-flex items-center gap-2"
                  >
                    Read Full Guide
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-primary-900 text-primary-900 hover:bg-primary-50 px-6 py-3 rounded-sm font-medium transition-colors"
                  >
                    Get License Help
                  </a>
                </div>
              </div>

              <div className="bg-warm-50 p-8 rounded-sm border border-warm-200">
                <h3 className="text-xl font-semibold text-primary-900 mb-6">Our Rental License Services</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-900">Eligibility Assessment</h4>
                      <p className="text-warm-600 text-sm">We check if your property meets all requirements for a tourist license in your area.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-900">Documentation</h4>
                      <p className="text-warm-600 text-sm">We prepare and gather all required documents including energy certificates and technical reports.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-900">Application Submission</h4>
                      <p className="text-warm-600 text-sm">We handle the entire application process with the tourism authorities on your behalf.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-semibold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-900">Ongoing Support</h4>
                      <p className="text-warm-600 text-sm">We ensure you stay compliant with guest registration and other ongoing requirements.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-warm-50 border-t border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-primary-900 mb-4">
                Why Choose Our <span className="font-semibold">After-Sales Services</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Competitive Prices</h3>
                <p className="text-warm-600 text-sm">
                  Our bulk purchasing power means better prices on furniture and services for you.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Trusted Network</h3>
                <p className="text-warm-600 text-sm">
                  Every supplier and contractor we work with has been vetted and proven reliable.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">English Support</h3>
                <p className="text-warm-600 text-sm">
                  All communication in English. We bridge the language gap with local suppliers.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Peace of Mind</h3>
                <p className="text-warm-600 text-sm">
                  Single point of contact for all your property needs. We handle everything.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-primary-900">
                Frequently Asked <span className="font-semibold">Questions</span>
              </h2>
            </div>

            <div className="space-y-6">
              <div className="border border-warm-200 rounded-sm p-6">
                <h3 className="font-semibold text-primary-900 mb-2">When should I start thinking about after-sales services?</h3>
                <p className="text-warm-600">
                  Ideally, you should start planning during the purchase process - especially for interior design and furniture.
                  This way, your property can be ready when you receive the keys. For rental licenses, you should begin the
                  application process 2-3 months before you plan to start renting.
                </p>
              </div>

              <div className="border border-warm-200 rounded-sm p-6">
                <h3 className="font-semibold text-primary-900 mb-2">Can I mix services from different providers?</h3>
                <p className="text-warm-600">
                  Absolutely. Our services are flexible and you can choose exactly what you need. Many clients use us for
                  furniture packages but have their own interior designer, or vice versa. We&apos;re happy to work alongside
                  other professionals you bring in.
                </p>
              </div>

              <div className="border border-warm-200 rounded-sm p-6">
                <h3 className="font-semibold text-primary-900 mb-2">How quickly can you furnish a property?</h3>
                <p className="text-warm-600">
                  For standard furniture packages, we typically need 2-4 weeks from confirmation to complete installation.
                  Custom or luxury packages may take 6-8 weeks depending on specifications. We always try to coordinate with
                  your key handover date.
                </p>
              </div>

              <div className="border border-warm-200 rounded-sm p-6">
                <h3 className="font-semibold text-primary-900 mb-2">Do I need a tourist license to rent my property?</h3>
                <p className="text-warm-600">
                  Yes, if you want to rent to tourists for periods of less than 2 months, you need a Licencia VT (Vivienda
                  Turística) in the Valencia region. Renting without a license can result in significant fines. Read our
                  <Link href="/guides/tourist-rental-license" className="text-accent-600 hover:underline"> complete guide</Link> for
                  all the details.
                </p>
              </div>

              <div className="border border-warm-200 rounded-sm p-6">
                <h3 className="font-semibold text-primary-900 mb-2">What areas do you cover for property management?</h3>
                <p className="text-warm-600">
                  We offer property management services throughout Costa Blanca South (Torrevieja, Orihuela Costa, Guardamar),
                  and parts of Costa Blanca North and Costa Calida. Contact us to confirm coverage for your specific location.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-warm-300 mb-8 max-w-2xl mx-auto">
              Whether you need help furnishing your new property, obtaining a rental license, or managing your investment,
              we&apos;re here to help. Get in touch for a free consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-8 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <a
                href={`tel:${CONTACT.phone}`}
                className="bg-white text-primary-900 hover:bg-warm-50 font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Call {CONTACT.phone}
              </a>
              <Link
                href="/contact"
                className="border border-warm-400 text-white hover:bg-white/10 font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </section>

        {/* Floating WhatsApp CTA */}
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </main>
    </>
  );
}
