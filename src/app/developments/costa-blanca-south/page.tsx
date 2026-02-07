import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  getAllDevelopments,
  getDevelopmentStats,
  getAllBuilders,
  Development,
  Builder,
} from '@/lib/development-service';
import { breadcrumbSchema, collectionPageSchema, toJsonLd } from '@/lib/schema';
import { getCardImages } from '@/lib/image-categorization';

export const metadata: Metadata = {
  title: 'Costa Blanca South Developments | New Build Properties from €145k',
  description: 'Explore new build developments across Costa Blanca South. Torrevieja, Orihuela Costa, Guardamar & more. From trusted builders. Key-ready and off-plan from €145,000.',
  openGraph: {
    title: 'Costa Blanca South New Build Developments',
    description: 'Premium new build properties in Torrevieja, Orihuela Costa, Guardamar. Investment-grade developments from €145k.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/developments/costa-blanca-south',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Costa Blanca South Developments',
    description: 'Explore new build properties in Costa Blanca South from €145,000.',
  },
};

// Helper to format price
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

// Development Card Component
function DevelopmentCard({ dev }: { dev: Development }) {
  const cardImages = getCardImages(dev.images || [], dev.name, dev.town);
  const hasMultipleImages = cardImages.secondary.length >= 2;
  const hasRealImages = dev.images && dev.images.length > 0 && !dev.images[0]?.includes('placeholder');

  return (
    <Link
      href={`/developments/${dev.slug}`}
      className="group block overflow-hidden rounded-sm transition-all duration-300 bg-white border border-warm-200 hover:shadow-xl hover:border-accent-500"
    >
      {/* Image Gallery - Square aspect ratio */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={cardImages.main.url}
            alt={cardImages.main.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Status Badge - Top Left */}
          <div className="absolute top-3 left-3">
            {dev.status === 'key-ready' && (
              <span className="bg-accent-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                Key Ready
              </span>
            )}
            {dev.status === 'under-construction' && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                Building
              </span>
            )}
            {dev.status === 'off-plan' && (
              <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                Off-Plan
              </span>
            )}
          </div>

          {/* Units count - Top Right */}
          <div className="absolute top-3 right-3">
            <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-sm">
              {dev.totalUnits} units
            </span>
          </div>

          {/* Development Name & Location Overlay - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="text-white">
              <h3 className="font-semibold text-sm leading-tight mb-0.5 group-hover:text-accent-300 transition-colors">
                {dev.name}
              </h3>
              <p className="text-warm-300 text-xs">{dev.town}</p>
            </div>
          </div>
        </div>

        {/* Two Smaller Images Below */}
        {hasMultipleImages && (
          <div className="grid grid-cols-2 gap-0.5 mt-0.5">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={cardImages.secondary[0].url}
                alt={cardImages.secondary[0].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 25vw, 15vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={cardImages.secondary[1]?.url || cardImages.secondary[0].url}
                alt={cardImages.secondary[1]?.alt || cardImages.secondary[0].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 25vw, 15vw"
              />
              {dev.images && dev.images.length > 3 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">+{dev.images.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="px-3 py-3 bg-white">
        {/* Price & Delivery */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-base font-semibold text-primary-900">
            From {formatPrice(dev.priceFrom)}
          </div>
          {dev.deliveryQuarter && (
            <div className="text-[10px] font-medium px-2 py-1 rounded-sm bg-accent-100 text-accent-700">
              {dev.status === 'key-ready' ? 'Move In Now' : dev.deliveryQuarter}
            </div>
          )}
        </div>

        {/* Bedrooms & Size */}
        <div className="text-xs mb-2 text-warm-600">
          {dev.bedroomBreakdown?.length > 0
            ? dev.bedroomBreakdown.slice(0, 3).join(', ') + (dev.bedroomBreakdown.length > 3 ? ' +more' : '')
            : `${dev.bedroomRange} bed`
          }
          {dev.sizeRange && ` · ${dev.sizeRange}`}
        </div>

        {/* Amenities Icons */}
        {dev.amenities && dev.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {dev.hasPool && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                Pool
              </span>
            )}
            {dev.hasGym && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h4v12H4zM16 6h4v12h-4zM8 10h8v4H8z" />
                </svg>
                Gym
              </span>
            )}
            {dev.hasSpa && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-teal-50 text-teal-600">
                ✨ Spa
              </span>
            )}
            {dev.hasSeaview && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-600">
                🌊 Sea View
              </span>
            )}
            {dev.hasGolfview && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-green-50 text-green-600">
                ⛳ Golf
              </span>
            )}
          </div>
        )}

        {/* Developer Info */}
        <div className="text-[11px] text-warm-500">
          {dev.developer}
          {dev.zone && ` · ${dev.zone}`}
        </div>
      </div>
    </Link>
  );
}

// Builder Card Component
function BuilderCard({ builder }: { builder: Builder }) {
  return (
    <Link
      href={`/builders/${builder.slug}`}
      className="group block p-6 bg-white border border-warm-200 rounded-sm hover:shadow-lg hover:border-accent-500 transition-all duration-300"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-600 transition-colors mb-1">
          {builder.name}
        </h3>
        <p className="text-sm text-warm-500">
          {builder.developmentCount} {builder.developmentCount === 1 ? 'development' : 'developments'}
        </p>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-warm-600 mb-1">Price Range</p>
          <p className="font-medium text-primary-900">{builder.priceRange}</p>
        </div>

        {builder.towns && builder.towns.length > 0 && (
          <div>
            <p className="text-warm-600 mb-1">Building in</p>
            <div className="flex flex-wrap gap-1">
              {builder.towns.slice(0, 4).map((town) => (
                <span key={town} className="inline-block bg-warm-100 text-warm-700 text-xs px-2 py-1 rounded">
                  {town}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-warm-200">
          <span className="text-accent-600 font-medium text-sm group-hover:text-accent-700">
            View Profile →
          </span>
        </div>
      </div>
    </Link>
  );
}

// WhatsApp CTA
function WhatsAppCTA() {
  return (
    <a
      href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all group"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// Area configuration with development-focused descriptions
const AREAS = [
  {
    id: 'torrevieja',
    name: 'Torrevieja & Surrounds',
    description: 'Spain\'s fastest-growing coastal development hub. Torrevieja has seen consistent construction activity with over 40+ active projects. Builder focus: quality beachfront apartments, senior living communities, and urban regeneration projects.',
    zones: ['torrevieja', 'aguas nuevas', 'los balcones', 'el chaparral', 'la siesta', 'el limonar', 'acequion'],
  },
  {
    id: 'orihuela-costa',
    name: 'Orihuela Costa (Coastal)',
    description: 'Premium coastal development corridor. La Zenia, Playa Flamenca, and Cabo Roig are home to luxury apartment developments, villa communities, and golf-adjacent projects. Average apartment prices €160k-€280k; villas €350k-€800k+.',
    zones: ['la zenia', 'playa flamenca', 'cabo roig', 'campoamor', 'villamartin', 'punta prima', 'dehesa de campoamor', 'aguamarina', 'las filipinas', 'pau 26', 'la regia', 'la florida', 'los dolses', 'las ramblas', 'dream hills'],
  },
  {
    id: 'guardamar',
    name: 'Guardamar del Segura',
    description: 'Charming beach town with emerging development scene. Known for authentic Spanish architecture blended with modern builds. Quieter than Torrevieja with strong investor interest. Price range: €120k-€350k.',
    zones: ['guardamar', 'el raso'],
  },
  {
    id: 'pilar',
    name: 'Pilar de la Horadada',
    description: 'Southern Costa Blanca\'s hidden gem for developers. Lower land costs attracting builders; increasing infrastructure investment. Excellent value plays. Price range: €100k-€280k.',
    zones: ['pilar', 'mil palmeras', 'torre de la horadada', 'lo romero', 'el mojon'],
  },
  {
    id: 'inland',
    name: 'Inland Communities',
    description: 'The value zone. Ciudad Quesada, Rojales, and Algorfa offer 20-40% lower prices than coastal areas, strong rental yields (6-8%), and growing infrastructure. Ideal for investor portfolios and retirees.',
    zones: ['rojales', 'ciudad quesada', 'algorfa', 'benijofar', 'san fulgencio', 'los montesinos', 'formentera', 'doña pepa'],
  },
];

export default async function CostaBlanaSouthPage() {
  const [rawDevelopments, stats, allBuilders] = await Promise.all([
    getAllDevelopments(),
    getDevelopmentStats(),
    getAllBuilders(),
  ]);

  // Filter for Costa Blanca South
  const southTowns = [
    'torrevieja',
    'orihuela costa',
    'orihuela',
    'la zenia',
    'cabo roig',
    'playa flamenca',
    'campoamor',
    'villamartin',
    'punta prima',
    'guardamar',
    'pilar de la horadada',
    'algorfa',
    'ciudad quesada',
    'rojales',
    'san fulgencio',
    'los montesinos',
    'benijofar',
    'san miguel de salinas',
  ];

  const hasRealImages = (dev: Development) => {
    return dev.images && dev.images.length > 0 && !dev.images[0]?.includes('placeholder');
  };

  const smartSort = (devs: Development[]) => {
    return [...devs].sort((a, b) => {
      const aReady = a.status === 'key-ready' || a.status === 'completed' ? 0 : 1;
      const bReady = b.status === 'key-ready' || b.status === 'completed' ? 0 : 1;
      if (aReady !== bReady) return aReady - bReady;
      return a.priceFrom - b.priceFrom;
    });
  };

  // Filter to Costa Blanca South
  const southDevelopments = smartSort(
    rawDevelopments.filter(d => {
      const town = (d.town || '').toLowerCase();
      const region = (d.region || '').toLowerCase();
      return (southTowns.some(t => town.includes(t)) && hasRealImages(d)) ||
             (region.includes('costa blanca south') && hasRealImages(d));
    })
  );

  // Get South-specific builders
  const southBuilders = allBuilders.filter(b =>
    b.towns?.some(t => southTowns.includes(t.toLowerCase()))
  );
  const topSouthBuilders = southBuilders.slice(0, 6).sort((a, b) => b.developmentCount - a.developmentCount);

  // Group developments by area
  const getAreaDevelopments = (area: typeof AREAS[0]) => {
    return smartSort(
      southDevelopments.filter(d => {
        const zone = (d.zone || '').toLowerCase();
        const town = (d.town || '').toLowerCase();
        return area.zones.some(z => zone.includes(z) || town.includes(z));
      })
    ).slice(0, 3);
  };

  // Key stats for South region
  const southKeyReady = southDevelopments.filter(d => d.status === 'key-ready' || d.status === 'completed');
  const southOffPlan = southDevelopments.filter(d => d.status === 'off-plan');
  const avgPriceSouth = southDevelopments.length > 0
    ? Math.round(southDevelopments.reduce((sum, d) => sum + d.priceFrom, 0) / southDevelopments.length)
    : 0;

  // Upcoming deliveries
  const upcomingDeliveries = smartSort(
    southDevelopments.filter(d => d.status !== 'key-ready' && d.deliveryQuarter)
  );

  // Breadcrumb schema
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Developments', url: 'https://newbuildhomescostablanca.com/developments/' },
    { name: 'Costa Blanca South', url: 'https://newbuildhomescostablanca.com/developments/costa-blanca-south/' },
  ]);

  const collectionSchema = collectionPageSchema({
    name: 'Costa Blanca South New Build Developments',
    description: 'New build developments across Costa Blanca South from trusted builders.',
    url: 'https://newbuildhomescostablanca.com/developments/costa-blanca-south/',
    items: southDevelopments.slice(0, 20).map(d => ({
      name: d.name,
      url: `https://newbuildhomescostablanca.com/developments/${d.slug}/`,
      price: d.priceFrom,
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(collectionSchema) }}
      />

      <main className="min-h-screen bg-warm-50">
        {/* ============================================ */}
        {/* HERO SECTION */}
        {/* ============================================ */}
        <section className="relative bg-primary-900 py-16 md:py-24">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-10" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <nav className="text-warm-400 text-sm mb-6">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <Link href="/developments" className="hover:text-white transition-colors">
                  Developments
                </Link>
                <span className="mx-2">›</span>
                <span className="text-white">Costa Blanca South</span>
              </nav>

              {/* Accent Line & Label */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Development Hub
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
                New Build Developments in
                <span className="font-semibold block">Costa Blanca South</span>
              </h1>

              {/* Subtitle */}
              <p className="text-warm-300 text-lg leading-relaxed mb-8 max-w-2xl">
                Spain's fastest-growing residential market. Discover {southDevelopments.length}+ carefully vetted
                developments across Torrevieja, Orihuela Costa, Guardamar, and beyond. From €145,000 to €2M+.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-3xl font-semibold text-white">{southDevelopments.length}+</div>
                  <div className="text-warm-400 text-sm">Developments</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-accent-400">{topSouthBuilders.length}</div>
                  <div className="text-warm-400 text-sm">Top Builders</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-white">{southKeyReady.length}</div>
                  <div className="text-warm-400 text-sm">Key Ready</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-accent-400">From {formatPrice(145000)}</div>
                  <div className="text-warm-400 text-sm">Starting Price</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* BUILDING IN COSTA BLANCA SOUTH - The Story */}
        {/* ============================================ */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                    Market Context
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-6">
                  Building in Costa Blanca South
                  <span className="font-semibold block">The Development Story</span>
                </h2>

                <div className="space-y-4 text-warm-700 leading-relaxed">
                  <p>
                    Costa Blanca South has emerged as Spain's primary residential construction hub. Over the past
                    decade, the region has attracted more than €8 billion in development investment, creating a
                    diverse portfolio of quality builds.
                  </p>

                  <p>
                    <strong>Why Builders Choose This Region:</strong>
                    Strategic coastal location, mature infrastructure, predictable planning approvals, and strong
                    international buyer demand. The area benefits from modern Spanish building codes and a competitive
                    builder ecosystem that drives quality up and costs down.
                  </p>

                  <p>
                    <strong>Construction Standards:</strong>
                    All new builds comply with Spanish Building Code (CTE) and EU standards. Developments feature
                    energy efficiency ratings (from B to A+), modern climate control, and integrated security systems.
                  </p>

                  <p>
                    <strong>The 10-Year Insurance Guarantee:</strong>
                    Every new build comes with a mandatory 10-year structural defect insurance (Garantía de Defectos
                    de Construcción), protecting your investment against construction faults. This is a legal
                    requirement—not optional.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-sm p-8 border-2 border-primary-100">
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm font-medium text-accent-600 uppercase tracking-wide mb-2">
                        Development Drivers
                      </div>
                      <ul className="space-y-2 text-sm text-primary-900">
                        <li className="flex items-start gap-3">
                          <span className="text-accent-500 font-bold mt-1">→</span>
                          <span>Mature infrastructure (schools, hospitals, shopping)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent-500 font-bold mt-1">→</span>
                          <span>Strong rental demand (tourism + long-term expats)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent-500 font-bold mt-1">→</span>
                          <span>Professional builder ecosystem competing on quality</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent-500 font-bold mt-1">→</span>
                          <span>EU residency pathways attract investor buyers</span>
                        </li>
                      </ul>
                    </div>

                    <hr className="border-primary-200" />

                    <div>
                      <div className="text-sm font-medium text-accent-600 uppercase tracking-wide mb-2">
                        Market Performance
                      </div>
                      <div className="text-sm text-primary-900 space-y-1">
                        <p>
                          <span className="font-medium">Price Growth:</span> 12-18% annually (2020-2024)
                        </p>
                        <p>
                          <span className="font-medium">Rental Yields:</span> 5-8% depending on location
                        </p>
                        <p>
                          <span className="font-medium">Build Timeline:</span> 18-24 months typical
                        </p>
                        <p>
                          <span className="font-medium">Financing:</span> 70-80% mortgages available
                        </p>
                      </div>
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
        {topSouthBuilders.length > 0 && (
          <section className="py-16 bg-gradient-to-br from-primary-50 to-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase">
                    Trusted Partners
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-4">
                  Featured Builders in Costa Blanca South
                </h2>
                <p className="text-warm-600 max-w-2xl leading-relaxed">
                  Top developers actively building in the region. Sorted by development count and market presence.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topSouthBuilders.map((builder) => (
                  <BuilderCard key={builder.slug} builder={builder} />
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  href="/builders"
                  className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-colors"
                >
                  View All {southBuilders.length} South Region Builders
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* DEVELOPMENTS BY AREA */}
        {/* ============================================ */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase">
                  Regional Breakdown
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-primary-900">
                Developments by Area
              </h2>
            </div>

            <div className="space-y-16">
              {AREAS.map((area) => {
                const areaDevelopments = getAreaDevelopments(area);
                const areaDevCount = southDevelopments.filter(d => {
                  const zone = (d.zone || '').toLowerCase();
                  const town = (d.town || '').toLowerCase();
                  return area.zones.some(z => zone.includes(z) || town.includes(z));
                }).length;

                if (areaDevCount === 0) return null;

                return (
                  <div key={area.id} className="border-t border-warm-200 pt-12">
                    {/* Area Header */}
                    <div className="mb-8">
                      <h3 className="text-2xl md:text-3xl font-light text-primary-900 mb-3">
                        {area.name}
                      </h3>
                      <p className="text-warm-600 leading-relaxed mb-4 max-w-3xl">
                        {area.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-warm-600">
                        <span>
                          <strong className="text-primary-900">{areaDevCount}</strong> active developments
                        </span>
                      </div>
                    </div>

                    {/* Area Development Cards */}
                    {areaDevelopments.length > 0 ? (
                      <>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                          {areaDevelopments.map((dev) => (
                            <DevelopmentCard key={dev.slug} dev={dev} />
                          ))}
                        </div>

                        {areaDevCount > 3 && (
                          <div className="text-center">
                            <Link
                              href={`/developments?search=${area.name}`}
                              className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors group"
                            >
                              View All {areaDevCount} Developments in {area.name}
                              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-warm-500">No developments listed for this area yet.</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* INVESTMENT & PRICE DATA */}
        {/* ============================================ */}
        <section className="py-16 bg-gradient-to-br from-primary-50 to-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase">
                  Market Analytics
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-4">
                Investment & Pricing Data
              </h2>
              <p className="text-warm-600">Development-focused insights for buyers and investors.</p>
            </div>

            {/* Price Comparison Table */}
            <div className="bg-white rounded-sm border border-warm-200 overflow-hidden mb-10">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary-900 text-white">
                      <th className="px-6 py-3 text-left font-medium">Area</th>
                      <th className="px-6 py-3 text-left font-medium">Avg Apartment</th>
                      <th className="px-6 py-3 text-left font-medium">Avg Villa</th>
                      <th className="px-6 py-3 text-left font-medium">Growth Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-warm-200 hover:bg-warm-50">
                      <td className="px-6 py-3 font-medium text-primary-900">Torrevieja</td>
                      <td className="px-6 py-3">€165k - €280k</td>
                      <td className="px-6 py-3">€380k - €650k</td>
                      <td className="px-6 py-3 text-accent-600 font-medium">+14% YoY</td>
                    </tr>
                    <tr className="border-t border-warm-200 hover:bg-warm-50">
                      <td className="px-6 py-3 font-medium text-primary-900">Orihuela Costa</td>
                      <td className="px-6 py-3">€180k - €320k</td>
                      <td className="px-6 py-3">€420k - €950k</td>
                      <td className="px-6 py-3 text-accent-600 font-medium">+16% YoY</td>
                    </tr>
                    <tr className="border-t border-warm-200 hover:bg-warm-50">
                      <td className="px-6 py-3 font-medium text-primary-900">Guardamar</td>
                      <td className="px-6 py-3">€135k - €240k</td>
                      <td className="px-6 py-3">€320k - €580k</td>
                      <td className="px-6 py-3 text-accent-600 font-medium">+11% YoY</td>
                    </tr>
                    <tr className="border-t border-warm-200 hover:bg-warm-50">
                      <td className="px-6 py-3 font-medium text-primary-900">Pilar / Inland</td>
                      <td className="px-6 py-3">€105k - €190k</td>
                      <td className="px-6 py-3">€240k - €420k</td>
                      <td className="px-6 py-3 text-accent-600 font-medium">+12% YoY</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Insights Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-sm border border-warm-200 p-6">
                <h3 className="font-semibold text-primary-900 mb-3">Price Positioning vs North</h3>
                <p className="text-warm-700 text-sm leading-relaxed">
                  Costa Blanca South prices remain 25-40% below North region. Coastal South developments: €165k-€320k
                  apartments vs North €220k-€450k. Strong value proposition for investors.
                </p>
              </div>

              <div className="bg-white rounded-sm border border-warm-200 p-6">
                <h3 className="font-semibold text-primary-900 mb-3">Rental Yield Potential</h3>
                <p className="text-warm-700 text-sm leading-relaxed">
                  <strong>Coastal areas:</strong> 5-6% annual gross yields (high tourist demand)
                  <br />
                  <strong>Inland:</strong> 6-8% yields (long-term expat rentals, lower cost base)
                </p>
              </div>

              <div className="bg-white rounded-sm border border-warm-200 p-6">
                <h3 className="font-semibold text-primary-900 mb-3">Off-Plan vs Key-Ready</h3>
                <p className="text-warm-700 text-sm leading-relaxed">
                  <strong>Off-plan:</strong> 5-15% early-bird discounts, 18-24 month construction
                  <br />
                  <strong>Key-ready:</strong> Immediate occupancy, no construction risk
                </p>
              </div>

              <div className="bg-white rounded-sm border border-warm-200 p-6">
                <h3 className="font-semibold text-primary-900 mb-3">Typical Build Timeline</h3>
                <p className="text-warm-700 text-sm leading-relaxed">
                  <strong>Off-plan to completion:</strong> 18-24 months
                  <br />
                  <strong>Registration (Escritura):</strong> 4-6 weeks post-completion
                  <br />
                  <strong>Construction quality:</strong> Quarterly inspections via optional independent engineer
                </p>
              </div>

              <div className="bg-white rounded-sm border border-warm-200 p-6">
                <h3 className="font-semibold text-primary-900 mb-3">Financing Options</h3>
                <p className="text-warm-700 text-sm leading-relaxed">
                  <strong>EU Citizens:</strong> 70-85% mortgages available
                  <br />
                  <strong>Non-EU:</strong> 60-75% with additional requirements
                  <br />
                  <strong>Rates:</strong> Currently 3.5-4.5% fixed 30-year terms
                </p>
              </div>

              <div className="bg-white rounded-sm border border-warm-200 p-6">
                <h3 className="font-semibold text-primary-900 mb-3">Transaction Costs</h3>
                <p className="text-warm-700 text-sm leading-relaxed">
                  <strong>Off-plan:</strong> 3-5% (10% deposit, rest on completion)
                  <br />
                  <strong>Key-ready:</strong> 8-10% (IVA/taxes, registration, legal fees)
                  <br />
                  <strong>Annual:</strong> 0.4-0.8% property tax + community fees
                </p>
              </div>
            </div>

            {/* Historic context */}
            <div className="bg-white rounded-sm border border-accent-200 p-8">
              <h3 className="font-semibold text-primary-900 mb-3 text-lg">
                Market Context: Price Recovery and Growth
              </h3>
              <p className="text-warm-700 leading-relaxed">
                After the 2008-2012 crisis, Costa Blanca South prices bottomed in 2013. Since then, the region has
                experienced consistent appreciation: 2013-2019 (+45%), 2019-2024 (+68%), with sustained momentum driven
                by post-pandemic migration, EU residency demand, and limited new land availability. Prices now exceed
                pre-crisis peaks, but remain 25-40% below equivalent Costa Blanca North properties.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* DEVELOPMENT TIMELINE - Upcoming Deliveries */}
        {/* ============================================ */}
        {upcomingDeliveries.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase">
                    Construction Schedule
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-4">
                  Development Timeline
                </h2>
                <p className="text-warm-600">
                  Upcoming completions and delivery quarters. Plan your purchase around move-in dates.
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-warm-50 rounded-sm border border-warm-200 overflow-hidden">
                <div className="divide-y divide-warm-200">
                  {upcomingDeliveries.slice(0, 12).map((dev) => (
                    <Link
                      key={dev.slug}
                      href={`/developments/${dev.slug}`}
                      className="block p-6 hover:bg-white transition-colors group"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-xs font-bold px-2 py-1 rounded-sm uppercase ${
                              dev.status === 'under-construction'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {dev.status === 'under-construction' ? 'Building' : 'Off-Plan'}
                            </span>
                            <h3 className="font-semibold text-primary-900 group-hover:text-accent-600 transition-colors">
                              {dev.name}
                            </h3>
                          </div>
                          <p className="text-sm text-warm-600">
                            {dev.town} {dev.zone && `· ${dev.zone}`}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm">
                          <div>
                            <p className="text-warm-600 text-xs mb-1">Delivery</p>
                            <p className="font-semibold text-primary-900">{dev.deliveryQuarter}</p>
                          </div>
                          <div>
                            <p className="text-warm-600 text-xs mb-1">Starting Price</p>
                            <p className="font-semibold text-primary-900">{formatPrice(dev.priceFrom)}</p>
                          </div>
                          <div>
                            <p className="text-warm-600 text-xs mb-1">Units</p>
                            <p className="font-semibold text-primary-900">{dev.totalUnits}</p>
                          </div>
                          <span className="text-accent-600 font-medium group-hover:text-accent-700">
                            View →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* ALL DEVELOPMENTS GRID */}
        {/* ============================================ */}
        {southDevelopments.length > 0 && (
          <section className="py-16 bg-gradient-to-br from-warm-50 to-primary-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase">
                    Complete Listing
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-4">
                  All Costa Blanca South Developments
                </h2>
                <p className="text-warm-600">
                  {southDevelopments.length} properties across the region. Key-ready first, then by price.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {southDevelopments.map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* CTA SECTION */}
        {/* ============================================ */}
        <section className="py-16 bg-primary-900 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-10" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                Not Sure Where to Start?
              </h2>
              <p className="text-warm-300 text-lg leading-relaxed mb-8">
                Our development specialists can help you navigate Costa Blanca South's market, compare builders, and
                find the perfect investment or home. Direct connection to site teams and builder representatives.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-8 py-3 rounded-sm transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>

                <a
                  href="tel:+34634044970"
                  className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +34 634 044 970
                </a>
              </div>

              <p className="text-warm-400 text-sm mt-6">
                Available Monday to Friday, 9am-6pm CET. Spanish and English spoken.
              </p>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppCTA />
    </>
  );
}
