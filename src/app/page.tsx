import Link from 'next/link';
import Image from 'next/image';
import { fetchAllProperties } from '@/lib/unified-feed-service';
import type { UnifiedProperty } from '@/lib/unified-property';

// Contact info from STANDARD_CTAS_AND_CONTACT_INFO.md
const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  phoneTel: 'tel:+34634044970',
  habeno: 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e',
};

// Area data with SEO-optimized slugs
const AREAS = [
  {
    name: 'Torrevieja',
    slug: 'torrevieja',
    image: '/images/areas/torrevieja.jpg',
    description: 'Affordable beachfront living with vibrant expat community',
    priceFrom: '€145,000',
  },
  {
    name: 'Orihuela Costa',
    slug: 'orihuela-costa',
    image: '/images/areas/orihuela-costa.jpg',
    description: 'Golf resorts and La Zenia Boulevard shopping',
    priceFrom: '€185,000',
  },
  {
    name: 'Guardamar del Segura',
    slug: 'guardamar-del-segura',
    image: '/images/areas/guardamar.jpg',
    description: 'Blue flag beaches and natural pine forests',
    priceFrom: '€195,000',
  },
  {
    name: 'Javea',
    slug: 'javea',
    image: '/images/areas/javea.jpg',
    description: 'Upscale coastal town with dramatic scenery',
    priceFrom: '€395,000',
  },
  {
    name: 'Benidorm',
    slug: 'benidorm',
    image: '/images/areas/benidorm.jpg',
    description: 'High-rise apartments with strong rental yields',
    priceFrom: '€165,000',
  },
  {
    name: 'Villamartin',
    slug: 'villamartin',
    image: '/images/areas/villamartin.jpg',
    description: 'Premium golf properties at La Finca and Villamartin',
    priceFrom: '€225,000',
  },
];

// Property categories for featured sections
const CATEGORIES = [
  {
    title: 'Golf Properties',
    slug: 'golf',
    icon: '⛳',
    description: 'Frontline golf apartments and villas near championship courses',
    link: '/properties?feature=golf',
    filter: (p: UnifiedProperty) => {
      const desc = (Array.isArray(p.descriptions?.en) ? p.descriptions.en.join(' ') : String(p.descriptions?.en || '')).toLowerCase();
      const town = (p.town || '').toLowerCase();
      return desc.includes('golf') || 
             town.includes('villamartin') || 
             town.includes('la finca') ||
             town.includes('algorfa') ||
             town.includes('campoamor');
    },
  },
  {
    title: 'Near Beach',
    slug: 'beach',
    icon: '🏖️',
    description: 'Walking distance to Costa Blanca\'s stunning beaches',
    link: '/properties?feature=beach',
    filter: (p: UnifiedProperty) => {
      const desc = (Array.isArray(p.descriptions?.en) ? p.descriptions.en.join(' ') : String(p.descriptions?.en || '')).toLowerCase();
      const town = (p.town || '').toLowerCase();
      return desc.includes('beach') || 
             desc.includes('sea view') ||
             desc.includes('playa') ||
             town.includes('guardamar') ||
             town.includes('torrevieja') ||
             town.includes('la mata');
    },
  },
  {
    title: 'With Pool',
    slug: 'pool',
    icon: '🏊',
    description: 'Properties with communal or private swimming pools',
    link: '/properties?feature=pool',
    filter: (p: UnifiedProperty) => p.hasPool === true,
  },
  {
    title: 'Under €200k',
    slug: 'affordable',
    icon: '💰',
    description: 'Quality new builds at accessible price points',
    link: '/properties?maxPrice=200000',
    filter: (p: UnifiedProperty) => p.price && p.price > 0 && p.price <= 200000,
  },
];

// Helper to format price
function formatPrice(price: number | undefined): string {
  if (!price || price <= 0) return 'Price on request';
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

// Property Card Component
function PropertyCard({ property }: { property: UnifiedProperty }) {
  const image = property.mainImage || '/images/placeholder-property.jpg';
  const title = property.aiContent?.title || `${property.bedrooms || ''} Bed ${property.propertyType || 'Property'} in ${property.town || 'Costa Blanca'}`;
  
  return (
    <Link 
      href={`/properties/${property.reference}`}
      className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {property.hasPool && (
          <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Pool
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{property.town}</p>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          {property.bedrooms && <span>{property.bedrooms} beds</span>}
          {property.bathrooms && <span>{property.bathrooms} baths</span>}
          {property.builtSize && <span>{property.builtSize}m²</span>}
        </div>
        <p className="text-lg font-bold text-blue-600 mt-2">
          {formatPrice(property.price)}
        </p>
      </div>
    </Link>
  );
}

// Area Card Component  
function AreaCard({ area }: { area: typeof AREAS[0] }) {
  return (
    <Link
      href={`/areas/${area.slug}`}
      className="group relative block h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-blue-900" />
      <Image
        src={area.image}
        alt={`Properties in ${area.name}`}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
        <h3 className="text-xl font-bold text-white">{area.name}</h3>
        <p className="text-sm text-gray-200 mt-1">{area.description}</p>
        <p className="text-sm font-semibold text-blue-300 mt-2">From {area.priceFrom}</p>
      </div>
    </Link>
  );
}

// Stats Component
function Stats({ properties }: { properties: UnifiedProperty[] }) {
  const totalProperties = properties.length;
  const propertiesWithPrice = properties.filter(p => p.price && p.price > 0);
  const minPrice = propertiesWithPrice.length > 0 
    ? Math.min(...propertiesWithPrice.map(p => p.price!))
    : 145000;
  const locations = new Set(properties.map(p => p.town).filter(Boolean)).size;
  const poolProperties = properties.filter(p => p.hasPool).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
        <div className="text-3xl font-bold text-white">{totalProperties}+</div>
        <div className="text-sm text-blue-100">New Build Properties</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
        <div className="text-3xl font-bold text-white">{locations}</div>
        <div className="text-sm text-blue-100">Locations</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
        <div className="text-3xl font-bold text-white">{poolProperties}+</div>
        <div className="text-sm text-blue-100">With Pool</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
        <div className="text-3xl font-bold text-white">{formatPrice(minPrice)}</div>
        <div className="text-sm text-blue-100">Starting From</div>
      </div>
    </div>
  );
}

// Featured Properties by Category
function FeaturedCategory({ 
  category, 
  properties 
}: { 
  category: typeof CATEGORIES[0];
  properties: UnifiedProperty[];
}) {
  const filtered = properties.filter(category.filter).slice(0, 4);
  
  if (filtered.length === 0) return null;
  
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span>{category.icon}</span>
            {category.title}
          </h2>
          <p className="text-gray-600 mt-1">{category.description}</p>
        </div>
        <Link
          href={category.link}
          className="hidden md:inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((property) => (
          <PropertyCard key={property.reference} property={property} />
        ))}
      </div>
      <Link
        href={category.link}
        className="md:hidden mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
      >
        View all {category.title} →
      </Link>
    </section>
  );
}

// Quick Search Component
function QuickSearch() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mt-8 max-w-3xl mx-auto">
      <form action="/properties" method="get" className="flex flex-col md:flex-row gap-3">
        <select 
          name="location" 
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        >
          <option value="">All Locations</option>
          {AREAS.map(area => (
            <option key={area.slug} value={area.name}>{area.name}</option>
          ))}
        </select>
        <select 
          name="type" 
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        >
          <option value="">Property Type</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="townhouse">Townhouse</option>
          <option value="penthouse">Penthouse</option>
          <option value="bungalow">Bungalow</option>
        </select>
        <select 
          name="maxPrice" 
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        >
          <option value="">Max Price</option>
          <option value="150000">Up to €150,000</option>
          <option value="200000">Up to €200,000</option>
          <option value="300000">Up to €300,000</option>
          <option value="500000">Up to €500,000</option>
          <option value="1000000">Up to €1,000,000</option>
          <option value="2000000">Up to €2,000,000</option>
          <option value="5000000">Up to €5,000,000</option>
          <option value="">No limit</option>
        </select>
        <button
          type="submit"
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Find Your Dream Home in Costa Blanca?
        </h2>
        <p className="text-blue-100 text-lg mb-8">
          Contact us today for the latest availability and prices. No obligation, just honest advice from our multilingual team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us Now
          </a>
          <a
            href={CONTACT.phoneTel}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {CONTACT.phone}
          </a>
        </div>
        <p className="text-blue-200 text-sm mt-6">
          🇬🇧 English · 🇸🇪 Swedish · 🇪🇸 Spanish · 🇫🇷 French · 🇳🇱 Dutch
        </p>
      </div>
    </section>
  );
}

// Trust Signals
function TrustSignals() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Why Buy Through New Build Homes Costa Blanca?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-4xl mb-4">🇸🇪</div>
            <h3 className="font-semibold text-lg text-gray-900">Swedish-Owned Agency</h3>
            <p className="text-gray-600 mt-2">
              Part of the Hansson and Hertzell Group, bringing Scandinavian professionalism to Spanish real estate.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-4xl mb-4">🏗️</div>
            <h3 className="font-semibold text-lg text-gray-900">Direct Developer Access</h3>
            <p className="text-gray-600 mt-2">
              We work directly with trusted builders like Contrimar, giving you access to the best new builds at competitive prices.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="font-semibold text-lg text-gray-900">Full Purchase Support</h3>
            <p className="text-gray-600 mt-2">
              From NIE applications to mortgage arrangements with our partner Habeno, we guide you through every step.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mortgage Partner Section
function MortgageSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Financing? We&apos;ve Got You Covered
          </h2>
          <p className="text-gray-600 mb-4">
            Our partner <strong>Habeno</strong> specializes in mortgages for international buyers. They compare offers from multiple Spanish banks to find you the best rates—typically up to 70% financing for non-residents.
          </p>
          <a
            href={CONTACT.habeno}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Your Mortgage Application →
          </a>
        </div>
        <div className="flex-shrink-0 text-center">
          <div className="text-5xl font-bold text-blue-600">70%</div>
          <div className="text-gray-600">Typical financing available</div>
        </div>
      </div>
    </section>
  );
}

// FAQ Data
const FAQS = [
  {
    q: 'Can foreigners buy property in Costa Blanca?',
    a: 'Yes, foreigners can buy property in Spain without restrictions. Non-EU citizens need an NIE number (tax identification) which we help you obtain. The buying process typically takes 6-8 weeks from reservation to completion.',
  },
  {
    q: 'What are the costs of buying a new build in Spain?',
    a: 'Approximately 13-14% on top of the purchase price. This includes 10% IVA (VAT), 1.5% stamp duty (AJD), plus notary, registry, and legal fees. We provide a full cost breakdown before you commit.',
  },
  {
    q: 'Can I get a mortgage as a non-resident?',
    a: 'Yes, Spanish banks offer mortgages to non-residents, typically up to 70% of the property value. Our partner Habeno compares rates from multiple banks to find you the best deal.',
  },
  {
    q: 'What is included in a new build property?',
    a: 'New builds in Costa Blanca typically include fitted kitchen, bathrooms, air conditioning pre-installation, and often a parking space. Many developments also offer furniture packages. Each listing details exactly what is included.',
  },
  {
    q: 'How do I arrange a viewing?',
    a: 'Contact us via WhatsApp or phone and we\'ll arrange viewings at your convenience. We offer in-person tours, video calls, and can coordinate multiple property visits in a single trip.',
  },
];

// FAQ Schema for SEO
function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Local Business Schema
function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'New Build Homes Costa Blanca',
    telephone: '+34634044970',
    url: 'https://www.newbuildhomescostablanca.com',
    description: 'Swedish-owned real estate agency specializing in new build properties in Costa Blanca, Spain.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Costa Blanca',
      addressRegion: 'Alicante',
      addressCountry: 'ES',
    },
    areaServed: ['Torrevieja', 'Orihuela Costa', 'Guardamar del Segura', 'Javea', 'Benidorm', 'Villamartin'],
    priceRange: '€145,000 - €3,000,000',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Main Page Component
export default async function HomePage() {
  let properties: UnifiedProperty[] = [];
  try {
    properties = await fetchAllProperties();
  } catch (error) {
    console.error('Failed to fetch properties:', error);
  }

  return (
    <main>
      {/* Schema Markup for SEO */}
      <FAQSchema />
      <LocalBusinessSchema />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 px-4">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            New Build Homes in Costa Blanca
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Modern apartments, villas and townhouses from €145,000. Expert guidance for international buyers from our Swedish-owned agency.
          </p>
          
          <QuickSearch />
          <Stats properties={properties} />
        </div>
      </section>

      {/* Featured Categories */}
      <div className="max-w-6xl mx-auto px-4">
        {CATEGORIES.map((category) => (
          <FeaturedCategory 
            key={category.slug} 
            category={category} 
            properties={properties} 
          />
        ))}
      </div>

      {/* Areas Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Explore Costa Blanca Locations
            </h2>
            <p className="text-gray-600 mt-2">
              From affordable Torrevieja to upscale Javea—find the perfect area for your Spanish property
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AREAS.map((area) => (
              <AreaCard key={area.slug} area={area} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/areas"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              View All Areas →
            </Link>
          </div>
        </div>
      </section>

      <TrustSignals />
      <MortgageSection />

      {/* FAQ Section */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <details key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 flex justify-between items-center">
                {faq.q}
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-4 text-gray-600">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'New Build Homes Costa Blanca | Apartments & Villas from €145k',
  description: 'Find new build properties in Costa Blanca, Spain. Modern apartments, villas and townhouses from trusted developers. Expert guidance for international buyers. Swedish-owned agency.',
  keywords: 'new build Costa Blanca, new build homes Spain, apartments Costa Blanca, villas Costa Blanca, property for sale Spain, off-plan properties Costa Blanca',
  openGraph: {
    title: 'New Build Homes Costa Blanca | Apartments & Villas from €145k',
    description: 'Find new build properties in Costa Blanca, Spain. Modern apartments, villas and townhouses from trusted developers.',
    url: 'https://www.newbuildhomescostablanca.com',
    siteName: 'New Build Homes Costa Blanca',
    locale: 'en_GB',
    type: 'website',
  },
};
