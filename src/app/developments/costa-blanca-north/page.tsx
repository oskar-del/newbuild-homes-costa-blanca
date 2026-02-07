'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllDevelopments, getDevelopmentStats, getAllBuilders, Development, Builder } from '@/lib/development-service';
import { breadcrumbSchema, collectionPageSchema, toJsonLd } from '@/lib/schema';
import { getCardImages } from '@/lib/image-categorization';
import LeadForm from '@/components/LeadForm';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Costa Blanca North Developments | Premium New Builds from €220k',
  description: 'Discover premium new build developments across Costa Blanca North. Jávea, Moraira, Calpe, Altea & Finestrat. Luxury villas and sea view properties from trusted builders.',
  openGraph: {
    title: 'Costa Blanca North - Premium New Build Developments',
    description: 'From Finestrat to Denia. Mountain views, hidden calas, Michelin restaurants. Properties from €220,000 to €3.5M+',
    type: 'website',
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

// Costa Blanca North towns (from Finestrat/Benidorm to Denia)
const COSTA_BLANCA_NORTH_TOWNS = [
  'Javea', 'Xabia', 'Moraira', 'Cumbre del Sol', 'Calpe', 'Calp',
  'Altea', 'Benissa', 'Teulada', 'Benitachell', 'Finestrat',
  'Benidorm', 'Villajoyosa', 'La Nucia', 'Alfaz', 'El Campello',
  'Denia', 'Ondara', 'Pedreguer'
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1512314889357-e0798180a746?w=800&q=80&fit=crop';

// Area groupings for Costa Blanca North
const AREA_GROUPS = [
  {
    id: 'javea-moraira',
    title: 'Jávea & Moraira',
    subtitle: 'Coastal Jewels',
    description: 'From Jávea\'s three distinct zones to Moraira\'s boutique coast and Cumbre del Sol\'s clifftop exclusivity. Premier locations with stunning sea views.',
    towns: ['Javea', 'Xabia', 'Moraira', 'Cumbre del Sol'],
    color: 'from-blue-500 to-teal-500',
    icon: '🌊',
  },
  {
    id: 'calpe-altea',
    title: 'Calpe, Altea & Benissa',
    subtitle: 'Iconic Coast',
    description: 'Calpe\'s dramatic Peñón de Ifach, Altea\'s enchanting old town and whitewashed charm, Benissa\'s unspoilt coastal beauty. Mediterranean soul.',
    towns: ['Calpe', 'Calp', 'Altea', 'Benissa', 'Teulada', 'Benitachell'],
    color: 'from-amber-500 to-orange-500',
    icon: '⛰️',
  },
  {
    id: 'finestrat-benidorm',
    title: 'Finestrat & Benidorm',
    subtitle: 'Mountains Meet Beach',
    description: 'Finestrat\'s dramatic mountain backdrop overlooking the sea, and Benidorm\'s perfect blend of cosmopolitan energy and beach lifestyle.',
    towns: ['Finestrat', 'Benidorm'],
    color: 'from-purple-500 to-pink-500',
    icon: '🏔️',
  },
  {
    id: 'villajoyosa-denia',
    title: 'Villajoyosa & Denia',
    subtitle: 'North Coast Escapes',
    description: 'Villajoyosa\'s picturesque coves and yacht-lined marina. Denia\'s northernmost gateway with its castle, marina, and access to inland wines.',
    towns: ['Villajoyosa', 'La Nucia', 'Alfaz', 'El Campello', 'Denia', 'Ondara', 'Pedreguer'],
    color: 'from-green-500 to-emerald-500',
    icon: '🏖️',
  },
];

export default async function CostaBlanacNorthPage() {
  // Get all developments and filter for Costa Blanca North
  const allDevelopments = await getAllDevelopments();
  const allBuilders = await getAllBuilders();

  const northDevelopments = allDevelopments.filter(dev => {
    const town = (dev.town || '').toLowerCase();
    return COSTA_BLANCA_NORTH_TOWNS.some(t => town.includes(t.toLowerCase())) ||
           dev.region === 'Costa Blanca North';
  });

  // Get builders active in Costa Blanca North
  const northBuilders = allBuilders.filter(builder => {
    return builder.developments?.some(devSlug => {
      const dev = northDevelopments.find(d => d.slug === devSlug);
      return dev !== undefined;
    });
  }).slice(0, 8); // Top 8 builders

  // Categorize by area
  const developmentsByArea = AREA_GROUPS.map(area => ({
    ...area,
    developments: northDevelopments.filter(dev =>
      area.towns.some(town => (dev.town || '').toLowerCase().includes(town.toLowerCase()))
    ),
  }));

  // Premium properties (higher price point)
  const premiumDevelopments = northDevelopments.filter(dev =>
    dev.priceFrom && dev.priceFrom >= 500000
  );

  // Beachfront and sea view properties
  const seaViewDevelopments = northDevelopments.filter(dev =>
    dev.hasSeaview || (dev.name || '').toLowerCase().includes('sea') ||
    (dev.name || '').toLowerCase().includes('beach') ||
    (dev.name || '').toLowerCase().includes('view')
  );

  // Stats
  const totalDevelopments = northDevelopments.length;
  const lowestPrice = Math.min(...northDevelopments.filter(d => d.priceFrom).map(d => d.priceFrom!));
  const highestPrice = Math.max(...northDevelopments.filter(d => d.priceTo).map(d => d.priceTo!));
  const totalUnits = northDevelopments.reduce((sum, d) => sum + (d.totalUnits || 0), 0);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Developments', url: 'https://newbuildhomescostablanca.com/developments/' },
    { name: 'Costa Blanca North', url: 'https://newbuildhomescostablanca.com/developments/costa-blanca-north/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary-900 border-t border-primary-700 z-50 lg:hidden">
        <div className="flex">
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 font-medium">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <a href="#developments" className="flex-1 flex items-center justify-center gap-2 bg-accent-500 text-white py-4 font-medium">
            View Developments
          </a>
        </div>
      </div>

      <main className="min-h-screen bg-warm-50 pb-20 lg:pb-0">
        {/* ============================================ */}
        {/* HERO SECTION */}
        {/* ============================================ */}
        <section className="relative bg-primary-900 py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/developments" className="hover:text-white transition-colors">Developments</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Costa Blanca North</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-primary-700 text-white text-xs font-medium px-3 py-1 rounded-sm">
                  Premium Market
                </span>
                <span className="bg-success-500 text-white text-xs font-bold px-3 py-1 rounded-sm">
                  {totalDevelopments} Developments
                </span>
                <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-sm">
                  {totalUnits}+ Units
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                Costa Blanca <span className="font-semibold">North</span>
              </h1>
              <p className="text-warm-300 text-lg md:text-xl mb-6">
                Premium New Build Developments • Finestrat to Denia
              </p>

              <p className="text-warm-300 text-lg leading-relaxed mb-8 max-w-3xl">
                Where Mediterranean mountains meet hidden calas and pristine coastline. Discover the premium
                Costa Blanca North - from Finestrat's dramatic views through Jávea's three zones, Moraira's boutique elegance,
                Calpe's iconic Peñón de Ifach, to Altea's enchanting old town. Premium new builds from
                <strong className="text-accent-400"> €220,000 to €3.5M+</strong>.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent-400">{totalDevelopments}</div>
                  <div className="text-warm-400 text-sm">Developments</div>
                </div>
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{northBuilders.length}+</div>
                  <div className="text-warm-400 text-sm">Premium Builders</div>
                </div>
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent-400">{formatPrice(lowestPrice)}</div>
                  <div className="text-warm-400 text-sm">From Price</div>
                </div>
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">30km</div>
                  <div className="text-warm-400 text-sm">Premium Coastline</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-sm font-medium transition-colors inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Inquire Now
                </a>
                <a href="#developments" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-sm font-medium transition-colors">
                  View All Developments
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* THE PREMIUM MARKET */}
        {/* ============================================ */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Why Choose <span className="font-semibold">Costa Blanca North</span>?
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                The premium segment of Costa Blanca where quality, location, and lifestyle converge.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-sm p-6 border border-blue-100">
                <div className="text-4xl mb-3">🏔️</div>
                <h3 className="font-semibold text-primary-900 mb-2">Dramatic Landscapes</h3>
                <p className="text-warm-600 text-sm">Mountains meeting the sea. Clifftop communities like Cumbre del Sol, valley vistas, and hidden calas. Nature at its finest.</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-sm p-6 border border-amber-100">
                <div className="text-4xl mb-3">✨</div>
                <h3 className="font-semibold text-primary-900 mb-2">Premium Build Quality</h3>
                <p className="text-warm-600 text-sm">Spanish building standards with premium finishes. Larger plots, exclusive communities, architectural innovation. Built to last.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-sm p-6 border border-purple-100">
                <div className="text-4xl mb-3">🍽️</div>
                <h3 className="font-semibold text-primary-900 mb-2">Michelin Culture</h3>
                <p className="text-warm-600 text-sm">Fine dining establishments, upscale restaurants, and gastronomic excellence. A lifestyle for discerning palates.</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-sm p-6 border border-green-100">
                <div className="text-4xl mb-3">🏡</div>
                <h3 className="font-semibold text-primary-900 mb-2">Gated Communities</h3>
                <p className="text-warm-600 text-sm">Security, privacy, and exclusivity. Community amenities including pools, gyms, and manicured landscaping throughout.</p>
              </div>
            </div>

            {/* Why Different Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mt-14 pt-12 border-t border-warm-200">
              <div>
                <h3 className="text-2xl font-light text-primary-900 mb-4">
                  The <span className="font-semibold">North Difference</span>
                </h3>
                <ul className="space-y-4 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold mt-1">✓</span>
                    <span><strong>Exclusive Communities:</strong> Gated developments with controlled entry, private facilities, and curated resident profiles</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold mt-1">✓</span>
                    <span><strong>Larger Plots:</strong> More land per property. Spacious gardens, terraces, and room for pools compared to the South</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold mt-1">✓</span>
                    <span><strong>Sea & Mountain Views:</strong> Most developments command stunning panoramic views rather than street-facing units</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold mt-1">✓</span>
                    <span><strong>Architectural Innovation:</strong> Premium designs from leading architects. Modern villas that blend form and function</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold mt-1">✓</span>
                    <span><strong>Less Mass Tourism:</strong> Authentic Mediterranean culture, not developed for volume. A different pace of life</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold mt-1">✓</span>
                    <span><strong>Capital Appreciation:</strong> Premium locations hold value better. Lower supply of premium properties = stronger long-term growth</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-xl p-8 text-white">
                <h3 className="text-xl font-semibold mb-6">Premium Market Profile</h3>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Average Price Point</span>
                      <span className="font-semibold">€600K - €1.2M</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Average Plot Size</span>
                      <span className="font-semibold">400-800m²</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Average Build Quality</span>
                      <span className="font-semibold">Premium+</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-success-400 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Typical ROI (3-5 yrs)</span>
                      <span className="font-semibold">8-12%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-500 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* FEATURED BUILDERS */}
        {/* ============================================ */}
        {northBuilders.length > 0 && (
          <section className="py-14 bg-gradient-to-b from-warm-50 to-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                  Development Partners
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Premium <span className="font-semibold">Builders</span>
              </h2>
              <p className="text-warm-600 mb-8">
                The industry leaders building Costa Blanca North's most sought-after developments.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {northBuilders.map(builder => (
                  <Link key={builder.slug} href={`/builders/${builder.slug}`}
                    className="group bg-white border border-warm-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-accent-300 transition-all">
                    <div className="bg-gradient-to-br from-primary-100 to-warm-100 p-6 text-center">
                      <div className="text-3xl mb-2">🏗️</div>
                      <h3 className="font-semibold text-primary-900 group-hover:text-accent-600 transition-colors">{builder.name}</h3>
                    </div>
                    <div className="p-4 border-t border-warm-200">
                      <div className="flex justify-between items-center text-sm mb-3">
                        <span className="text-warm-600">Active Projects</span>
                        <span className="bg-accent-100 text-accent-700 font-semibold px-2 py-1 rounded-sm">
                          {builder.developmentCount}
                        </span>
                      </div>
                      {builder.priceRange && (
                        <p className="text-accent-600 font-medium text-xs mb-4">
                          {builder.priceRange}
                        </p>
                      )}
                      <span className="text-accent-600 font-semibold text-sm group-hover:text-accent-700">
                        View Projects →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* DEVELOPMENTS BY AREA */}
        {/* ============================================ */}
        <section className="py-14 bg-white" id="developments">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Explore by <span className="font-semibold">Area</span>
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                Four distinct regions, each with unique character and premium offerings.
              </p>
            </div>

            {/* Area Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
              {AREA_GROUPS.map(area => (
                <a key={area.id} href={`#${area.id}`}
                  className="p-4 bg-warm-50 hover:bg-accent-50 border border-warm-200 hover:border-accent-300 rounded-lg transition-all text-center group">
                  <div className="text-3xl mb-2">{area.icon}</div>
                  <h3 className="font-semibold text-primary-900 text-sm group-hover:text-accent-600 transition-colors">{area.title}</h3>
                  <p className="text-warm-500 text-xs">{area.subtitle}</p>
                </a>
              ))}
            </div>

            {/* Areas with Developments */}
            {developmentsByArea.map(area => (
              <div key={area.id} id={area.id} className="mb-16 scroll-mt-20">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-10 h-px bg-gradient-to-r ${area.color}`} />
                    <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                      {area.icon} {area.subtitle}
                    </span>
                  </div>
                  <h3 className="text-2xl font-light text-primary-900 mb-2">
                    {area.title}
                  </h3>
                  <p className="text-warm-600 max-w-3xl">
                    {area.description}
                  </p>
                </div>

                {area.developments.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {area.developments.slice(0, 6).map(dev => (
                      <Link key={dev.slug} href={`/developments/${dev.slug}`}
                        className="group bg-white border border-warm-200 rounded-xl overflow-hidden hover:shadow-xl transition-all">
                        <div className="relative h-48 bg-warm-200 overflow-hidden">
                          <Image
                            src={dev.images[0] || FALLBACK_IMAGE}
                            alt={dev.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                          {dev.status && (
                            <div className="absolute top-3 left-3">
                              <span className={`${
                                dev.status === 'key-ready' || dev.status === 'completed' ? 'bg-success-500' :
                                dev.status === 'under-construction' ? 'bg-amber-500' :
                                'bg-blue-500'
                              } text-white text-xs font-bold px-2 py-1 rounded-sm uppercase`}>
                                {dev.status === 'key-ready' ? 'Key Ready' : dev.status === 'under-construction' ? 'Building' : dev.status === 'off-plan' ? 'Off-Plan' : dev.status}
                              </span>
                            </div>
                          )}
                          {dev.hasSeaview && (
                            <div className="absolute top-3 right-3">
                              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-sm flex items-center gap-1">
                                🌊 Sea View
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-primary-900 mb-1 group-hover:text-accent-600 transition-colors line-clamp-2">
                            {dev.name}
                          </h4>
                          <p className="text-warm-500 text-sm mb-3">{dev.town}</p>
                          <div className="space-y-2">
                            {dev.priceFrom && (
                              <p className="text-accent-600 font-bold">
                                From {formatPrice(dev.priceFrom)}
                              </p>
                            )}
                            <div className="flex justify-between text-xs text-warm-600">
                              {dev.bedroomRange && <span>{dev.bedroomRange} Beds</span>}
                              {dev.totalUnits && <span>{dev.totalUnits} Units</span>}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-warm-50 rounded-xl p-8 text-center border border-warm-200">
                    <p className="text-warm-600 mb-4">No developments currently available in {area.title}</p>
                    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-medium">
                      Register Your Interest
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* INVESTMENT & PRICING DATA */}
        {/* ============================================ */}
        <section className="py-14 bg-gradient-to-b from-white to-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Investment <span className="font-semibold">Analysis</span>
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                Premium market returns with stronger capital appreciation and rental income potential.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 border border-warm-200">
                <div className="text-3xl mb-3">📈</div>
                <h3 className="font-semibold text-primary-900 mb-2">Capital Growth</h3>
                <p className="text-warm-600 text-sm mb-4">
                  Premium properties appreciate faster. Limited supply of quality properties in best locations drives demand.
                </p>
                <div className="bg-accent-50 rounded-lg p-3">
                  <p className="text-sm"><strong>Expected 3-5yr ROI:</strong> 8-12%</p>
                  <p className="text-xs text-warm-600 mt-1">Based on historical Costa Blanca North data</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-warm-200">
                <div className="text-3xl mb-3">🏡</div>
                <h3 className="font-semibold text-primary-900 mb-2">Rental Yields</h3>
                <p className="text-warm-600 text-sm mb-4">
                  Premium locations attract affluent renters. Higher absolute returns despite lower percentage yields.
                </p>
                <div className="bg-accent-50 rounded-lg p-3">
                  <p className="text-sm"><strong>Typical Range:</strong> 4-6% net</p>
                  <p className="text-xs text-warm-600 mt-1">Higher revenue per unit than South</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-warm-200">
                <div className="text-3xl mb-3">💎</div>
                <h3 className="font-semibold text-primary-900 mb-2">Resale Value</h3>
                <p className="text-warm-600 text-sm mb-4">
                  Premium segments have deeper buyer pools. Easier exits with less market sensitivity.
                </p>
                <div className="bg-accent-50 rounded-lg p-3">
                  <p className="text-sm"><strong>Demand Level:</strong> Very High</p>
                  <p className="text-xs text-warm-600 mt-1">International buyer interest</p>
                </div>
              </div>
            </div>

            {/* Price Comparison Table */}
            <div className="bg-white rounded-xl overflow-hidden border border-warm-200 mb-8">
              <div className="bg-primary-900 text-white p-6">
                <h3 className="text-lg font-semibold">Price by Area</h3>
                <p className="text-warm-300 text-sm mt-1">Average entry and premium price points</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-warm-200 bg-warm-50">
                      <th className="px-6 py-3 text-left font-semibold text-primary-900">Area</th>
                      <th className="px-6 py-3 text-left font-semibold text-primary-900">Entry Level</th>
                      <th className="px-6 py-3 text-left font-semibold text-primary-900">Mid-Range</th>
                      <th className="px-6 py-3 text-left font-semibold text-primary-900">Luxury</th>
                      <th className="px-6 py-3 text-left font-semibold text-primary-900">Character</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-warm-200 hover:bg-warm-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-primary-900">Jávea & Moraira</td>
                      <td className="px-6 py-4 text-warm-700">€400K</td>
                      <td className="px-6 py-4 text-accent-600 font-semibold">€850K - €1.2M</td>
                      <td className="px-6 py-4 text-warm-700">€2M+</td>
                      <td className="px-6 py-4 text-warm-600 text-sm">Most exclusive</td>
                    </tr>
                    <tr className="border-b border-warm-200 hover:bg-warm-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-primary-900">Calpe, Altea & Benissa</td>
                      <td className="px-6 py-4 text-warm-700">€350K</td>
                      <td className="px-6 py-4 text-accent-600 font-semibold">€700K - €1M</td>
                      <td className="px-6 py-4 text-warm-700">€1.5M+</td>
                      <td className="px-6 py-4 text-warm-600 text-sm">Iconic landmarks</td>
                    </tr>
                    <tr className="border-b border-warm-200 hover:bg-warm-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-primary-900">Finestrat & Benidorm</td>
                      <td className="px-6 py-4 text-warm-700">€300K</td>
                      <td className="px-6 py-4 text-accent-600 font-semibold">€600K - €900K</td>
                      <td className="px-6 py-4 text-warm-700">€1.2M+</td>
                      <td className="px-6 py-4 text-warm-600 text-sm">Best accessibility</td>
                    </tr>
                    <tr className="hover:bg-warm-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-primary-900">Villajoyosa & Denia</td>
                      <td className="px-6 py-4 text-warm-700">€280K</td>
                      <td className="px-6 py-4 text-accent-600 font-semibold">€550K - €800K</td>
                      <td className="px-6 py-4 text-warm-700">€1M+</td>
                      <td className="px-6 py-4 text-warm-600 text-sm">Emerging favorites</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* North vs South Comparison */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8 border border-blue-200">
              <h3 className="font-semibold text-primary-900 mb-6 text-lg">Costa Blanca North vs South</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🏔️</span> Costa Blanca North
                  </h4>
                  <ul className="space-y-3 text-sm text-warm-700">
                    <li className="flex gap-2">
                      <span className="text-accent-600">✓</span> Premium price point (€220K - €3.5M+)
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-600">✓</span> Larger plots (400-800m²+)
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-600">✓</span> Sea and mountain views
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-600">✓</span> Gated exclusive communities
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-600">✓</span> Lower buyer volume, more discerning clients
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-600">✓</span> Higher architectural standards
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🏖️</span> Costa Blanca South
                  </h4>
                  <ul className="space-y-3 text-sm text-warm-700">
                    <li className="flex gap-2">
                      <span className="text-warm-500">•</span> Value focus (€150K - €1.5M)
                    </li>
                    <li className="flex gap-2">
                      <span className="text-warm-500">•</span> More compact properties
                    </li>
                    <li className="flex gap-2">
                      <span className="text-warm-500">•</span> Beach-oriented communities
                    </li>
                    <li className="flex gap-2">
                      <span className="text-warm-500">•</span> Open-plan developments
                    </li>
                    <li className="flex gap-2">
                      <span className="text-warm-500">•</span> Higher buyer volume, mainstream market
                    </li>
                    <li className="flex gap-2">
                      <span className="text-warm-500">•</span> Strong rental returns (5-8%)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* ALL DEVELOPMENTS GRID */}
        {/* ============================================ */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                Complete Inventory
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              All <span className="font-semibold">Developments</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Browse our complete collection of Costa Blanca North new build developments.
            </p>

            {northDevelopments.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {northDevelopments.map(dev => (
                  <Link key={dev.slug} href={`/developments/${dev.slug}`}
                    className="group bg-white border border-warm-200 rounded-xl overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative h-48 bg-warm-200 overflow-hidden">
                      <Image
                        src={dev.images[0] || FALLBACK_IMAGE}
                        alt={dev.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      {dev.status && (
                        <div className="absolute top-3 left-3">
                          <span className={`${
                            dev.status === 'key-ready' || dev.status === 'completed' ? 'bg-success-500' :
                            dev.status === 'under-construction' ? 'bg-amber-500' :
                            'bg-blue-500'
                          } text-white text-xs font-bold px-2 py-1 rounded-sm uppercase`}>
                            {dev.status === 'key-ready' ? 'Key Ready' : dev.status === 'under-construction' ? 'Building' : dev.status === 'off-plan' ? 'Off-Plan' : dev.status}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-primary-900 mb-1 group-hover:text-accent-600 transition-colors line-clamp-2">
                        {dev.name}
                      </h4>
                      <p className="text-warm-500 text-sm mb-3">{dev.town}</p>
                      {dev.priceFrom && (
                        <p className="text-accent-600 font-bold mb-2">
                          From {formatPrice(dev.priceFrom)}
                        </p>
                      )}
                      <div className="flex justify-between text-xs text-warm-600">
                        {dev.bedroomRange && <span>{dev.bedroomRange}</span>}
                        {dev.totalUnits && <span>{dev.totalUnits} Units</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-warm-50 rounded-xl p-12 text-center border border-warm-200">
                <p className="text-4xl mb-4">🏗️</p>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Developments Loading</h3>
                <p className="text-warm-600">More premium Costa Blanca North developments coming soon.</p>
              </div>
            )}
          </div>
        </section>

        {/* ============================================ */}
        {/* FINAL CTA */}
        {/* ============================================ */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                  Ready to Explore <span className="font-semibold">Costa Blanca North</span>?
                </h2>
                <p className="text-warm-300 leading-relaxed mb-6">
                  Whether you're seeking a clifftop villa in Cumbre del Sol, a sea-view property in Jávea,
                  or an exclusive community in Moraira, we'll guide you through the premium Costa Blanca North market.
                  Our local expertise and trusted builder relationships ensure you find the perfect development.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Direct builder access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Best pricing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">No buyer fees</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Viewing trips</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Us
                  </a>
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                    className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors border border-white/20">
                    {CONTACT.phone}
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-xl p-8 shadow-xl">
                <h3 className="text-xl font-semibold text-primary-900 mb-1">Get Costa Blanca North Properties</h3>
                <p className="text-warm-500 text-sm mb-6">We'll send you matching premium developments from {formatPrice(lowestPrice)}</p>
                <LeadForm propertyInterest="Costa Blanca North development" formName="costa-blanca-north-inquiry" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
