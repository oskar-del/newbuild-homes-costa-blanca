import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  getAllDevelopments,
  getDevelopmentStats,
  getAllBuilders,
  Development,
} from '@/lib/development-service';
import { breadcrumbSchema, collectionPageSchema, faqSchema, toJsonLd } from '@/lib/schema';
import { getCardImages } from '@/lib/image-categorization';
import { filterDevelopmentsByTags, TaggedDevelopment } from '@/lib/tag-service';

export const metadata: Metadata = {
  title: 'New Build Developments Costa Blanca | Find Your Perfect Project',
  description: 'Explore new build developments across Costa Blanca and Costa Calida. Key-ready homes, golf properties, beachfront living. Find your dream Spanish home.',
  openGraph: {
    title: 'New Build Developments Costa Blanca',
    description: 'Explore new build developments across Costa Blanca. Key-ready homes from trusted builders.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/developments',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Build Developments Costa Blanca | Find Your Perfect Project',
    description: 'Explore new build developments across Costa Blanca. Key-ready homes, golf properties, beachfront living.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/developments',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/developments',
      'sv': 'https://newbuildhomescostablanca.com/sv/developments',
      'nl': 'https://newbuildhomescostablanca.com/nl/developments',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/developments',
      'fr': 'https://newbuildhomescostablanca.com/fr/developments',
      'no': 'https://newbuildhomescostablanca.com/no/developments',
      'de': 'https://newbuildhomescostablanca.com/de/developments',
      'pl': 'https://newbuildhomescostablanca.com/pl/developments',
      'ru': 'https://newbuildhomescostablanca.com/ru/developments',
      'x-default': 'https://newbuildhomescostablanca.com/developments',
    },
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

// Development Card Component - Mobile-first, Square, Gallery Style
// Main image: Community/development exterior (AI-categorized)
// Two smaller images: Property interiors (AI-categorized)
function DevelopmentCard({ dev, variant = 'default', debug = false }: { dev: Development; variant?: 'default' | 'featured'; debug?: boolean }) {
  const isFeatured = variant === 'featured';

  // Get intelligently categorized images
  // Main = community shot (aerial, exterior, pool, garden)
  // Secondary = property shots (living room, terrace, kitchen)
  const cardImages = getCardImages(dev.images || [], dev.name, dev.town);
  const hasMultipleImages = cardImages.secondary.length >= 2;

  // Check if we have real images or need to use placeholder
  const hasRealImages = dev.images && dev.images.length > 0 && !dev.images[0]?.includes('placeholder');
  const imageSource = hasRealImages
    ? (dev.images[0]?.includes('backgroundproperties') ? 'BP' :
       dev.images[0]?.includes('feedmedia') ? 'REDSP' :
       dev.images[0]?.includes('redsp') ? 'REDSP' : 'Feed')
    : 'Placeholder';

  return (
    <Link
      href={`/developments/${dev.slug}`}
      className={`group block overflow-hidden rounded-sm transition-all duration-300 ${
        isFeatured
          ? 'bg-primary-800/50 hover:bg-primary-800'
          : 'bg-white border border-warm-200 hover:shadow-xl hover:border-accent-500'
      }`}
    >
      {/* Image Gallery - Square aspect ratio */}
      <div className="relative">
        {/* Main Image - Community/Development Shot (AI-categorized) */}
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

          {/* Price & Location Overlay - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="text-white">
              <h3 className="font-semibold text-sm leading-tight mb-0.5 group-hover:text-accent-300 transition-colors">
                {dev.name}
              </h3>
              <p className="text-warm-300 text-xs">{dev.town}</p>
            </div>
          </div>
        </div>

        {/* Two Smaller Property Images - Below Main (AI-categorized interior shots) */}
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
              {/* "More photos" overlay on last image */}
              {dev.images && dev.images.length > 3 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">+{dev.images.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content - Enhanced info section */}
      <div className={`px-3 py-3 ${isFeatured ? 'bg-primary-900' : 'bg-white'}`}>
        {/* Price & Move-in */}
        <div className="flex items-center justify-between mb-2">
          <div className={`text-base font-semibold ${isFeatured ? 'text-white' : 'text-primary-900'}`}>
            From {formatPrice(dev.priceFrom)}
          </div>
          {dev.deliveryQuarter && (
            <div className={`text-[10px] font-medium px-2 py-1 rounded-sm ${
              dev.status === 'key-ready'
                ? 'bg-accent-100 text-accent-700'
                : isFeatured
                  ? 'bg-white/10 text-warm-300'
                  : 'bg-accent-100 text-accent-700'
            }`}>
              {dev.status === 'key-ready' ? 'Move In Now' : dev.deliveryQuarter}
            </div>
          )}
        </div>

        {/* Bedroom breakdown */}
        <div className={`text-xs mb-2 ${isFeatured ? 'text-warm-300' : 'text-warm-600'}`}>
          {dev.bedroomBreakdown?.length > 0
            ? dev.bedroomBreakdown.slice(0, 3).join(', ') + (dev.bedroomBreakdown.length > 3 ? ' +more' : '')
            : `${dev.bedroomRange} bed`
          }
          {dev.sizeRange && ` · ${dev.sizeRange}`}
        </div>

        {/* Amenities icons */}
        {dev.amenities && dev.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {dev.hasPool && (
              <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                isFeatured ? 'bg-white/10 text-warm-300' : 'bg-blue-50 text-blue-600'
              }`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                Pool
              </span>
            )}
            {dev.hasGym && (
              <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                isFeatured ? 'bg-white/10 text-warm-300' : 'bg-purple-50 text-purple-600'
              }`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h4v12H4zM16 6h4v12h-4zM8 10h8v4H8z" />
                </svg>
                Gym
              </span>
            )}
            {dev.hasSpa && (
              <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                isFeatured ? 'bg-white/10 text-warm-300' : 'bg-teal-50 text-teal-600'
              }`}>
                ✨ Spa
              </span>
            )}
            {dev.hasSeaview && (
              <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                isFeatured ? 'bg-white/10 text-warm-300' : 'bg-cyan-50 text-cyan-600'
              }`}>
                🌊 Sea View
              </span>
            )}
            {dev.hasGolfview && (
              <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                isFeatured ? 'bg-white/10 text-warm-300' : 'bg-green-50 text-green-600'
              }`}>
                ⛳ Golf
              </span>
            )}
          </div>
        )}

        {/* Developer & Zone */}
        <div className={`text-[11px] ${isFeatured ? 'text-warm-400' : 'text-warm-500'}`}>
          {dev.developer}
          {dev.zone && ` · ${dev.zone}`}
        </div>
      </div>
    </Link>
  );
}

// Floating WhatsApp CTA
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
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export default async function DevelopmentsPage() {
  const [rawDevelopments, stats, beachProperties] = await Promise.all([
    getAllDevelopments(),
    getDevelopmentStats(),
    filterDevelopmentsByTags({ beachOnly: true, sortBy: 'beach-distance', limit: 12 }),
  ]);

  // ==============================
  // FILTER: Only show developments with REAL images (not placeholders)
  // ==============================
  const hasRealImages = (dev: Development) => {
    return dev.images &&
           dev.images.length > 0 &&
           !dev.images[0]?.includes('placeholder');
  };

  // For listings, only show developments with images
  const allDevelopments = rawDevelopments.filter(hasRealImages);

  // ==============================
  // SMART SORTING - Key-ready first, then by price
  // ==============================
  const smartSort = (devs: Development[]) => {
    return [...devs].sort((a, b) => {
      // Key-ready first
      const aReady = a.status === 'key-ready' || a.status === 'completed' ? 0 : 1;
      const bReady = b.status === 'key-ready' || b.status === 'completed' ? 0 : 1;
      if (aReady !== bReady) return aReady - bReady;
      // Then by price (lowest first)
      return a.priceFrom - b.priceFrom;
    });
  };

  // ==============================
  // EXACT LOCATION MATCHING - No partial matches!
  // ==============================

  // ORIHUELA COSTA - Only coastal zones, NOT inland Orihuela (Vistabella Golf, etc.)
  const orihuelaCOASTALZones = [
    'la zenia', 'playa flamenca', 'cabo roig', 'campoamor', 'villamartin',
    'las filipinas', 'pau 26', 'la regia', 'dehesa de campoamor', 'aguamarina',
    'punta prima', 'la florida', 'los dolses', 'las ramblas', 'dream hills'
  ];
  const orihuelaCostaDevelopments = smartSort(
    allDevelopments.filter(d => {
      const zone = (d.zone || '').toLowerCase();
      const town = (d.town || '').toLowerCase();
      // Must be in a coastal zone OR explicitly "Orihuela Costa" town
      if (town.includes('orihuela costa')) return true;
      if (orihuelaCOASTALZones.some(z => zone.includes(z))) return true;
      // EXCLUDE inland Orihuela (Vistabella, etc.)
      if (town === 'orihuela' && !zone.includes('costa')) return false;
      return false;
    })
  );

  // TORREVIEJA - Town center and immediate zones
  const torreviejaZones = ['aguas nuevas', 'los balcones', 'el chaparral', 'la siesta', 'el limonar', 'acequion'];
  const torreviejaDevelopments = smartSort(
    allDevelopments.filter(d => {
      const zone = (d.zone || '').toLowerCase();
      const town = (d.town || '').toLowerCase();
      if (town.includes('torrevieja')) return true;
      if (torreviejaZones.some(z => zone.includes(z))) return true;
      return false;
    })
  );

  // PILAR DE LA HORADADA & Southern coast
  const pilarZones = ['mil palmeras', 'torre de la horadada', 'lo romero', 'el mojon'];
  const pilarDevelopments = smartSort(
    allDevelopments.filter(d => {
      const zone = (d.zone || '').toLowerCase();
      const town = (d.town || '').toLowerCase();
      if (town.includes('pilar')) return true;
      if (pilarZones.some(z => zone.includes(z) || town.includes(z))) return true;
      return false;
    })
  );

  // GUARDAMAR - Beach town
  const guardamarDevelopments = smartSort(
    allDevelopments.filter(d => {
      const zone = (d.zone || '').toLowerCase();
      const town = (d.town || '').toLowerCase();
      if (town.includes('guardamar')) return true;
      if (zone.includes('el raso')) return true;
      return false;
    })
  );

  // ROJALES / CIUDAD QUESADA - Inland Vega Baja
  const rojalesZones = ['doña pepa', 'ciudad quesada', 'quesada', 'benijofar', 'formentera'];
  const rojalesDevelopments = smartSort(
    allDevelopments.filter(d => {
      const zone = (d.zone || '').toLowerCase();
      const town = (d.town || '').toLowerCase();
      if (town.includes('rojales') || town.includes('quesada') || town.includes('benijofar')) return true;
      if (rojalesZones.some(z => zone.includes(z))) return true;
      return false;
    })
  );

  // By region
  const calidaDevelopments = allDevelopments.filter(d => d.region === 'Costa Calida');

  // Costa Blanca North - Key Areas (keep simple)
  const finestratDevelopments = smartSort(
    allDevelopments.filter(d => {
      const town = (d.town || '').toLowerCase();
      return ['finestrat', 'benidorm', 'villajoyosa', 'la nucia', 'alfaz', 'el campello'].some(t => town.includes(t));
    })
  );

  const javeaDevelopments = smartSort(
    allDevelopments.filter(d => {
      const town = (d.town || '').toLowerCase();
      const zone = (d.zone || '').toLowerCase();
      return ['javea', 'xabia', 'benitachell', 'moraira'].some(t => town.includes(t)) ||
             zone.includes('cumbre del sol');
    })
  );

  const calpeDevelopments = smartSort(
    allDevelopments.filter(d => {
      const town = (d.town || '').toLowerCase();
      return ['calpe', 'altea', 'benissa', 'teulada'].some(t => town.includes(t));
    })
  );

  // GOLF DEVELOPMENTS - Vistabella, La Finca, etc. (inland golf resorts)
  const golfDevelopments = smartSort(
    allDevelopments.filter(d => {
      const zone = (d.zone || '').toLowerCase();
      const name = (d.name || '').toLowerCase();
      return zone.includes('golf') ||
             zone.includes('vistabella') ||
             zone.includes('la finca') ||
             zone.includes('las colinas') ||
             zone.includes('lo romero golf') ||
             name.includes('golf');
    })
  );

  // Segment developments by status (for stats)
  const keyReady = allDevelopments.filter(d => d.status === 'key-ready' || d.status === 'completed');

  // Premium luxury (€800k+)
  const premiumLuxury = allDevelopments.filter(d => d.priceFrom >= 800000);

  // New Launches - Off-plan with delivery 2027+ (best early-bird pricing)
  const newLaunches = allDevelopments.filter(d => {
    if (!d.deliveryDate) return false;
    const parts = d.deliveryDate.split(/[-/]/);
    const year = parts[0].length === 4 ? parseInt(parts[0]) : parseInt(parts[2]);
    return year >= 2027 && d.status === 'off-plan';
  }).sort((a, b) => {
    // Sort by delivery date (furthest out = newest launches)
    if (!a.deliveryDate || !b.deliveryDate) return 0;
    return b.deliveryDate.localeCompare(a.deliveryDate);
  });

  // Beachfront / Sea view properties
  const beachfrontDevelopments = allDevelopments.filter(d =>
    d.hasSeaview ||
    d.zone?.toLowerCase().includes('beach') ||
    d.zone?.toLowerCase().includes('playa') ||
    d.zone?.toLowerCase().includes('mar ')
  );

  // Breadcrumb schema
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Developments', url: 'https://newbuildhomescostablanca.com/developments/' },
  ]);

  // CollectionPage schema for development listings
  const collectionSchema = collectionPageSchema({
    name: 'New Build Developments Costa Blanca',
    description: 'Explore new build developments across Costa Blanca and Costa Calida. Key-ready homes, golf properties, beachfront living.',
    url: 'https://newbuildhomescostablanca.com/developments/',
    items: allDevelopments.slice(0, 20).map(d => ({
      name: d.name,
      url: `https://newbuildhomescostablanca.com/developments/${d.slug}/`,
      price: d.priceFrom,
    })),
  });

  // FAQ Data - New build developments in Costa Blanca
  const faqs = [
    {
      question: 'What is a new build development?',
      answer: 'A new build development is a residential project built by established developers featuring modern apartments, villas, or townhouses. Costa Blanca developments offer contemporary designs, modern amenities, and often communal facilities like pools, gyms, and gardens. New builds typically include guarantees covering structure and major components, providing security for buyers investing in off-plan or under-construction properties.'
    },
    {
      question: 'How do I reserve a property in a new development?',
      answer: 'To reserve a property, first identify which development interests you by reviewing available units and floorplans. Contact us to schedule a viewing or request documentation. Once you\'ve selected a property, you\'ll typically sign a reservation agreement with the developer and deposit a small fee (usually 500-2,000 EUR). After contract signing, you\'ll pay according to the agreed payment schedule, with key handover at completion.'
    },
    {
      question: 'What payment plan options are available for off-plan purchases?',
      answer: 'Most off-plan Costa Blanca developments offer flexible payment plans typically structured as: 30% deposit upon contract signing, with the remaining 70% paid in installments during construction, and final payment at completion. Some developments offer alternative structures including 20/80 splits or smaller monthly payments. Bank-backed payment guarantees protect buyer funds throughout the process, ensuring your money is held in escrow rather than with the developer.'
    },
    {
      question: 'Can I customise my property in a new development?',
      answer: 'Customization options vary by project and construction stage. Off-plan properties offer the most flexibility for changes to colour schemes, materials, kitchen, and bathroom selections—typically available during the first 6-12 months of purchase. Under-construction properties may have limited options. Key-ready properties generally come fully finished with limited customization. Always review the specific development\'s customization policy before purchasing.'
    },
    {
      question: 'What are bank guarantees and why are they important?',
      answer: 'Bank guarantees (garantías bancarias) protect off-plan buyers by ensuring developers cannot use your deposit money for other purposes—funds are held in an independent escrow account. Required by Spanish property law for off-plan sales, they protect you if the developer faces financial difficulties before completion. This is a crucial safeguard, especially for substantial off-plan deposits, ensuring your investment is secure throughout the construction period.'
    },
    {
      question: 'How long does it take from reservation to key handover?',
      answer: 'Timelines vary significantly: key-ready properties transfer immediately after purchase completion (1-2 months from contract). Under-construction projects typically take 12-24 months from reservation to handover. Off-plan developments can take 18-36 months or longer depending on project size and complexity. Delivery dates are specified in the purchase agreement, though delays occasionally occur due to unforeseen circumstances. Always confirm scheduled completion dates with the developer.'
    }
  ];

  const faqJsonLd = faqSchema(faqs);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }}
      />

      <main className="min-h-screen bg-warm-50">
        {/* ============================================ */}
        {/* HERO - Storytelling Introduction */}
        {/* ============================================ */}
        <section className="relative bg-primary-900 py-16 md:py-24">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-10" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <nav className="text-warm-400 text-sm mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="mx-2">›</span>
                <span className="text-white">Developments</span>
              </nav>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Your New Home Awaits
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
                Find Your Perfect
                <span className="font-semibold block">New Build Development</span>
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed mb-8 max-w-2xl">
                From the sun-drenched beaches of Costa Blanca South to the charming coves of the North,
                discover {stats.totalDevelopments}+ carefully selected developments from trusted local builders.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="text-center">
                  <div className="text-3xl font-semibold text-white">{stats.totalDevelopments}+</div>
                  <div className="text-warm-400 text-sm">Developments</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-accent-400">{keyReady.length}</div>
                  <div className="text-warm-400 text-sm">Key Ready</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-white">{stats.builderCount}+</div>
                  <div className="text-warm-400 text-sm">Builders</div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="bg-white/10 backdrop-blur-sm rounded-sm p-2 border border-white/20">
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Search developments by name, town, or builder..."
                    className="flex-1 bg-white/10 border border-white/10 rounded-sm px-4 py-3 text-white placeholder-warm-400 focus:outline-none focus:border-accent-500"
                  />
                  <button className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-colors">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* KEY READY - Move In Now */}
        {/* ============================================ */}
        {keyReady.length > 0 && (
          <section className="py-14 bg-gradient-to-b from-accent-50 to-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              {/* Section Intro - Storytelling */}
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase">
                      Move In Now
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    Key Ready <span className="font-semibold">Developments</span>
                  </h2>
                  <p className="text-warm-600 leading-relaxed">
                    No waiting, no construction delays. These developments are complete and ready for you to move in.
                    Perfect for buyers who want to start their Mediterranean lifestyle immediately—whether that's
                    enjoying your morning coffee on the terrace or taking that first dip in the pool.
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Link
                    href="/developments?status=key-ready"
                    className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors group"
                  >
                    View All {keyReady.length} Key Ready
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Featured Cards - 2 cols mobile, 3 cols desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {keyReady.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* BEACH PROPERTIES - Storytelling Style */}
        {/* ============================================ */}
        {beachProperties.length > 0 && (
          <section className="py-14 bg-gradient-to-br from-cyan-900 to-primary-900">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-10 mb-10 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-cyan-400" />
                    <span className="text-cyan-300 text-xs font-medium tracking-widest uppercase">
                      Beach Living
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                    Steps from the <span className="font-semibold">Mediterranean</span>
                  </h2>
                  <p className="text-cyan-100 leading-relaxed mb-4">
                    Wake up to crystal-clear waters and walk to the beach in minutes.
                    From La Zenia to Torrevieja, these developments put you right on
                    Costa Blanca's famous Blue Flag beaches.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-cyan-800/50 px-3 py-1 rounded-full text-sm text-cyan-200 border border-cyan-700">
                      {beachProperties.filter(d => d.beachDistance === 'beachfront').length} Beachfront
                    </span>
                    <span className="bg-cyan-800/50 px-3 py-1 rounded-full text-sm text-cyan-200 border border-cyan-700">
                      {beachProperties.filter(d => d.beachDistance === 'walking').length} Walking Distance
                    </span>
                    <span className="bg-cyan-800/50 px-3 py-1 rounded-full text-sm text-cyan-200 border border-cyan-700">
                      {beachProperties.filter(d => d.beachDistance === 'short-drive').length} Short Drive
                    </span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-sm p-6 text-white border border-white/10">
                  <h3 className="font-semibold text-lg mb-4 text-cyan-200">Why Beach Living?</h3>
                  <ul className="space-y-3 text-cyan-100">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>15+ Blue Flag beaches</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>320+ days of sunshine</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Crystal-clear Mediterranean waters</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Strong rental potential</span>
                    </li>
                  </ul>
                  <Link
                    href="/beach"
                    className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-colors"
                  >
                    Explore All Beach Properties
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {beachProperties.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} variant="featured" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* TORREVIEJA - Popular Hub */}
        {/* ============================================ */}
        {torreviejaDevelopments.length > 0 && (
          <section className="py-14 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-accent-500" />
                    <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                      Most Popular
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    <span className="font-semibold">Torrevieja</span> & Surrounds
                  </h2>
                  <p className="text-warm-600 leading-relaxed">
                    Spain's most popular destination for international buyers. With its famous salt lakes,
                    vibrant town centre, and excellent value properties, Torrevieja offers the complete
                    Mediterranean lifestyle. Just 30 minutes from Alicante airport.
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Link
                    href="/areas/torrevieja"
                    className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors group"
                  >
                    Explore Torrevieja
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {torreviejaDevelopments.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* LIGHT CONTACT CTA - Between Torrevieja & Orihuela Costa */}
        {/* ============================================ */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto bg-warm-50 border border-warm-200 rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-primary-900 font-medium text-lg">Looking for your dream property?</p>
              <p className="text-warm-500 text-sm mt-1">Contact us for latest availability, floorplans, or to book a viewing</p>
            </div>
            <div className="flex gap-3">
              <a href="https://wa.me/34634044970" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-primary-900 text-white rounded-sm text-sm font-medium hover:bg-primary-800 transition-colors">
                WhatsApp
              </a>
              <a href="/contact" className="px-5 py-2.5 border border-primary-900 text-primary-900 rounded-sm text-sm font-medium hover:bg-primary-900 hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* ORIHUELA COSTA - Golf & Beach Paradise */}
        {/* ============================================ */}
        {orihuelaCostaDevelopments.length > 0 && (
          <section className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-10 mb-10 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-primary-900" />
                    <span className="text-primary-900 text-xs font-medium tracking-widest uppercase">
                      Golf & Beach Living
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    <span className="font-semibold">Orihuela Costa</span>
                  </h2>
                  <p className="text-warm-600 leading-relaxed mb-4">
                    Home to some of the Costa Blanca's finest golf resorts and blue-flag beaches.
                    From the bustling La Zenia Boulevard to the peaceful Campoamor coast,
                    Orihuela Costa delivers premium lifestyle at accessible prices.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-white px-3 py-1 rounded-full text-sm text-warm-600 border border-warm-200">Villamartín Golf</span>
                    <span className="bg-white px-3 py-1 rounded-full text-sm text-warm-600 border border-warm-200">Las Colinas</span>
                    <span className="bg-white px-3 py-1 rounded-full text-sm text-warm-600 border border-warm-200">La Zenia</span>
                    <span className="bg-white px-3 py-1 rounded-full text-sm text-warm-600 border border-warm-200">Cabo Roig</span>
                  </div>
                </div>
                <div className="bg-primary-900 rounded-sm p-6 text-white">
                  <h3 className="font-semibold text-lg mb-4">Why Orihuela Costa?</h3>
                  <ul className="space-y-3 text-warm-300">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>5 championship golf courses</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Blue-flag beaches & marinas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>La Zenia Boulevard shopping</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Strong rental market</span>
                    </li>
                  </ul>
                  <Link
                    href="/areas/orihuela-costa"
                    className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-colors"
                  >
                    Explore the Area
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {orihuelaCostaDevelopments.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* PILAR DE LA HORADADA - Southern Beach Towns */}
        {/* ============================================ */}
        {pilarDevelopments.length > 0 && (
          <section className="py-14 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-10 mb-10 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-primary-900" />
                    <span className="text-primary-900 text-xs font-medium tracking-widest uppercase">
                      Southern Beach Towns
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    <span className="font-semibold">Pilar de la Horadada</span> & Surrounds
                  </h2>
                  <p className="text-warm-600 leading-relaxed mb-4">
                    The southernmost tip of Costa Blanca, where pristine beaches meet authentic Spanish charm.
                    Pilar de la Horadada offers excellent value with stunning coastline, the Lo Romero golf course,
                    and easy access to both Alicante and Murcia airports.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-600">Mil Palmeras</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-600">Torre de la Horadada</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-600">Lo Romero Golf</span>
                  </div>
                </div>
                <div className="bg-teal-800 rounded-sm p-6 text-white">
                  <h3 className="font-semibold text-lg mb-4">Why Pilar de la Horadada?</h3>
                  <ul className="space-y-3 text-teal-100">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>6km of pristine sandy beaches</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Authentic Spanish town atmosphere</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Lo Romero Golf Resort</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Excellent value for beachfront living</span>
                    </li>
                  </ul>
                  <Link
                    href="/areas/pilar-de-la-horadada"
                    className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-colors"
                  >
                    Explore the Area
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {pilarDevelopments.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* GOLF LIFESTYLE */}
        {/* ============================================ */}
        {golfDevelopments.length > 0 && (
          <section className="py-14 bg-primary-900">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-accent-500" />
                    <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                      Fairway Living
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                    Golf <span className="font-semibold">Developments</span>
                  </h2>
                  <p className="text-warm-300 leading-relaxed">
                    Wake up to stunning fairway views and be on the first tee within minutes.
                    These developments are perfectly positioned on or near championship golf courses,
                    offering the ultimate lifestyle for golf enthusiasts.
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Link
                    href="/golf-properties"
                    className="inline-flex items-center gap-2 text-accent-400 font-medium hover:text-accent-300 transition-colors group"
                  >
                    Explore Golf Living
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {golfDevelopments.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} variant="featured" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* FINESTRAT & BENIDORM AREA */}
        {/* ============================================ */}
        {finestratDevelopments.length > 0 && (
          <section className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-primary-900" />
                    <span className="text-primary-900 text-xs font-medium tracking-widest uppercase">
                      Mountains Meet the Sea
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    <span className="font-semibold">Finestrat</span> & Benidorm Area
                  </h2>
                  <p className="text-warm-600 leading-relaxed">
                    The best of both worlds: the tranquility of mountain villages with Benidorm's beaches
                    and amenities just minutes away. Finestrat has become a hotspot for modern luxury developments
                    with stunning panoramic views. Terra Mítica theme park and Puig Campana hiking trails
                    offer year-round activities.
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Link
                    href="/areas/finestrat"
                    className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group"
                  >
                    Explore Finestrat
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {finestratDevelopments.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* JAVEA, MORAIRA, CALPE - Premium North */}
        {/* ============================================ */}
        {(javeaDevelopments.length > 0 || calpeDevelopments.length > 0) && (
          <section className="py-14 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-10 mb-10 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-accent-500" />
                    <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                      Exclusive Northern Coast
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    Jávea, Moraira & <span className="font-semibold">Calpe</span>
                  </h2>
                  <p className="text-warm-600 leading-relaxed mb-4">
                    The crown jewels of Costa Blanca North. These prestigious areas offer dramatic scenery,
                    charming marinas, and a sophisticated lifestyle. Famous for the iconic Peñón de Ifach,
                    crystal-clear coves, and award-winning restaurants.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Jávea Old Town</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Moraira Marina</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Calpe Beach</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Cumbre del Sol</span>
                  </div>
                </div>
                <div className="bg-primary-900 rounded-sm p-6 text-white">
                  <h3 className="font-semibold text-lg mb-4">Premium Northern Living</h3>
                  <ul className="space-y-3 text-warm-300">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Stunning sea and mountain views</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Michelin-star dining</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Yachting & water sports</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Exclusive gated communities</span>
                    </li>
                  </ul>
                  <Link
                    href="/developments/costa-blanca-north"
                    className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-colors"
                  >
                    Discover the North
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {[...javeaDevelopments, ...calpeDevelopments].slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* COSTA CALIDA - Mar Menor & Murcia */}
        {/* ============================================ */}
        {calidaDevelopments.length > 0 && (
          <section className="py-14 bg-white border-y border-warm-200">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-10 mb-10 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-accent-500" />
                    <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                      The Warm Coast · Murcia Region
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    Costa <span className="font-semibold">Calida</span> & Mar Menor
                  </h2>
                  <p className="text-warm-600 leading-relaxed mb-4">
                    Just south of Costa Blanca lies the Costa Calida—Murcia's stunning coastline featuring
                    the unique Mar Menor lagoon. Europe's largest saltwater lake offers warm, calm waters
                    perfect for water sports, while maintaining some of the best property values in Spain.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Los Alcázares</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">San Javier</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">La Manga</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Mar Menor Golf</span>
                  </div>
                </div>
                <div className="bg-cyan-900 rounded-sm p-6 text-white">
                  <h3 className="font-semibold text-lg mb-4">Why Costa Calida?</h3>
                  <ul className="space-y-3 text-cyan-100">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Mar Menor - Europe's largest lagoon</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Excellent value vs Costa Blanca</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Close to Corvera International Airport</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>World-class water sports hub</span>
                    </li>
                  </ul>
                  <Link
                    href="/areas/costa-calida"
                    className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-colors"
                  >
                    Explore Costa Cálida
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {calidaDevelopments.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* NEW LAUNCHES - Off-Plan Opportunities */}
        {/* ============================================ */}
        {newLaunches.length > 0 && (
          <section className="py-14 bg-gradient-to-b from-blue-50 to-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase">
                      Early Bird Pricing
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    New <span className="font-semibold">Launches</span>
                  </h2>
                  <p className="text-warm-600 leading-relaxed">
                    Get in early on these recently launched developments. Off-plan purchases offer the best prices—
                    typically 15-20% below completed property values. Secure your unit now with just a 30% deposit
                    and pay the rest on completion. The earlier you buy, the better your position and price.
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Link
                    href="/developments?status=off-plan"
                    className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors group"
                  >
                    View All Off-Plan
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {newLaunches.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* PREMIUM LUXURY - €800k+ */}
        {/* ============================================ */}
        {premiumLuxury.length > 0 && (
          <section className="py-14 bg-primary-900">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                    €800,000+
                  </span>
                  <div className="w-10 h-px bg-accent-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                  Premium <span className="font-semibold">Luxury</span>
                </h2>
                <p className="text-warm-300 max-w-2xl mx-auto">
                  Exclusive developments for discerning buyers. Prime locations, exceptional specifications,
                  and uncompromising quality in Spain's most prestigious addresses.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {premiumLuxury.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} variant="featured" />
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  href="/luxury"
                  className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-colors"
                >
                  View Luxury Collection
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* FAQ - New Build Developments */}
        {/* ============================================ */}
        <section className="py-14 bg-warm-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                  Questions Answered
                </span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                Frequently Asked <span className="font-semibold">Questions</span>
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                Everything you need to know about buying new build properties in Costa Blanca. From off-plan purchases to bank guarantees, we've got the answers.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white rounded-sm border border-warm-200 overflow-hidden hover:border-accent-300 transition-colors"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-medium text-primary-900 hover:text-accent-600 transition-colors">
                    <span className="text-lg">{faq.question}</span>
                    <svg
                      className="w-5 h-5 text-accent-500 flex-shrink-0 ml-4 transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4 pt-2 text-warm-700 leading-relaxed border-t border-warm-100">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            {/* CTA within FAQ section */}
            <div className="mt-12 p-6 bg-gradient-to-r from-accent-500/10 to-primary-900/10 border border-accent-200 rounded-sm text-center">
              <p className="text-primary-900 font-medium mb-3">Still have questions about new build developments?</p>
              <p className="text-warm-600 mb-6 text-sm">Our team of property experts are ready to help you navigate the Costa Blanca market and find your perfect home.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Ask on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2 border border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white font-medium rounded-sm transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CTA - Personal Guidance */}
        {/* ============================================ */}
        <section className="py-16 bg-accent-500">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              With {stats.totalDevelopments}+ developments to choose from, finding the right one can feel overwhelming.
              Tell us your requirements—budget, location, move-in date—and we'll match you with the perfect projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-accent-600 hover:bg-warm-50 font-medium px-8 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="bg-primary-900 hover:bg-primary-800 text-white font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </section>

        <WhatsAppCTA />
      </main>
    </>
  );
}
