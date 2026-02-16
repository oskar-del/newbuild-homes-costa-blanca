import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  getAllDevelopments,
  getDevelopmentStats,
  getAllBuilders,
  Development,
} from '@/lib/development-service';
import { breadcrumbSchema, collectionPageSchema, toJsonLd } from '@/lib/schema';
import { getCardImages } from '@/lib/image-categorization';
import { filterDevelopmentsByTags, TaggedDevelopment } from '@/lib/tag-service';

export const metadata: Metadata = {
  title: 'Inwestycje Deweloperskie Costa Blanca | Znajdź Swoją Idealną Inwestycję',
  description: 'Przeglądaj inwestycje deweloperskie na całej Costa Blance i Costa Calida. Gotowe do wprowadzenia się nieruchomości, właściwości golfowe, rezydencje nadmorskie. Znajdź swój wymarzony dom w Hiszpanii.',
  openGraph: {
    title: 'Inwestycje Deweloperskie Costa Blanca',
    description: 'Przeglądaj inwestycje deweloperskie na Costa Blance. Gotowe do wprowadzenia się nieruchomości od zaufanych deweloperów.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/pl/developments',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inwestycje Deweloperskie Costa Blanca | Znajdź Swoją Idealną Inwestycję',
    description: 'Przeglądaj inwestycje deweloperskie na Costa Blance. Gotowe do wprowadzenia się nieruchomości, właściwości golfowe, rezydencje nadmorskie.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl/developments',
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
      href={`/pl/developments/${dev.slug}`}
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
                Gotowy do Zamieszkania
              </span>
            )}
            {dev.status === 'under-construction' && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                W Budowie
              </span>
            )}
            {dev.status === 'off-plan' && (
              <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                Projekt Wstępny
              </span>
            )}
          </div>

          {/* Units count - Top Right */}
          <div className="absolute top-3 right-3">
            <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-sm">
              {dev.totalUnits} jednostek
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
            Od {formatPrice(dev.priceFrom)}
          </div>
          {dev.deliveryQuarter && (
            <div className={`text-[10px] font-medium px-2 py-1 rounded-sm ${
              dev.status === 'key-ready'
                ? 'bg-accent-100 text-accent-700'
                : isFeatured
                  ? 'bg-white/10 text-warm-300'
                  : 'bg-accent-100 text-accent-700'
            }`}>
              {dev.status === 'key-ready' ? 'Wprowadź się Teraz' : dev.deliveryQuarter}
            </div>
          )}
        </div>

        {/* Bedroom breakdown */}
        <div className={`text-xs mb-2 ${isFeatured ? 'text-warm-300' : 'text-warm-600'}`}>
          {dev.bedroomBreakdown?.length > 0
            ? dev.bedroomBreakdown.slice(0, 3).join(', ') + (dev.bedroomBreakdown.length > 3 ? ' +więcej' : '')
            : `${dev.bedroomRange} sypialnie`
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
                Basen
              </span>
            )}
            {dev.hasGym && (
              <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                isFeatured ? 'bg-white/10 text-warm-300' : 'bg-purple-50 text-purple-600'
              }`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h4v12H4zM16 6h4v12h-4zM8 10h8v4H8z" />
                </svg>
                Siłownia
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
                🌊 Widok na Morze
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
      aria-label="Czat na WhatsApp"
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
    { name: 'Strona główna', url: 'https://newbuildhomescostablanca.com/pl/' },
    { name: 'Inwestycje Deweloperskie Costa Blanca', url: 'https://newbuildhomescostablanca.com/pl/developments/' },
  ]);

  // CollectionPage schema for development listings
  const collectionSchema = collectionPageSchema({
    name: 'Inwestycje Deweloperskie Costa Blanca',
    description: 'Przeglądaj inwestycje deweloperskie na całej Costa Blance i Costa Calida. Gotowe do wprowadzenia się nieruchomości, właściwości golfowe, rezydencje nadmorskie.',
    url: 'https://newbuildhomescostablanca.com/pl/developments/',
    items: allDevelopments.slice(0, 20).map(d => ({
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
        {/* HERO - Storytelling Introduction */}
        {/* ============================================ */}
        <section className="relative bg-primary-900 py-16 md:py-24">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-10" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <nav className="text-warm-400 text-sm mb-6">
                <Link href="/pl" className="hover:text-white transition-colors">Strona główna</Link>
                <span className="mx-2">›</span>
                <span className="text-white">Inwestycje</span>
              </nav>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Twój Nowy Dom Czeka
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
                Odkryj nasze najnowsze projekty
                <span className="font-semibold block">Idealny dla Ciebie</span>
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed mb-8 max-w-2xl">
                Od słonecznych plaż Costa Blanca Południa do malowniczych zatoczek Północy,
                odkryj {stats.totalDevelopments}+ starannie wybranych projektów od zaufanych lokalnych deweloperów.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="text-center">
                  <div className="text-3xl font-semibold text-white">{stats.totalDevelopments}+</div>
                  <div className="text-warm-400 text-sm">Projektów Deweloperskich</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-accent-400">{keyReady.length}</div>
                  <div className="text-warm-400 text-sm">Gotowy do Zamieszkania</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-white">{stats.builderCount}+</div>
                  <div className="text-warm-400 text-sm">Deweloperów</div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="bg-white/10 backdrop-blur-sm rounded-sm p-2 border border-white/20">
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Szukaj projektów po nazwie, mieście lub dewelopera..."
                    className="flex-1 bg-white/10 border border-white/10 rounded-sm px-4 py-3 text-white placeholder-warm-400 focus:outline-none focus:border-accent-500"
                  />
                  <button className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-colors">
                    Szukaj
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
                      Wprowadź się Teraz
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    Projekty <span className="font-semibold">Gotowe do Zamieszkania</span>
                  </h2>
                  <p className="text-warm-600 leading-relaxed">
                    Bez czekania, bez opóźnień. Te projekty są skończone i gotowe dla Ciebie. Idealne dla kupujących, którzy chcą natychmiast rozpocząć swoje śródziemnomorskie życie—cieszyć się kawą na tarasie lub nurkowaniem w basenie.
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Link
                    href="/pl/developments?status=key-ready"
                    className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors group"
                  >
                    Zobacz {keyReady.length} Gotowych
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
                      Życie na Plaży
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                    Zaledwie Rzut Kamieniem od <span className="font-semibold">Morza Śródziemnego</span>
                  </h2>
                  <p className="text-cyan-100 leading-relaxed mb-4">
                    Obudź się przy krystalicznej wodzie i przejdź na plażę w kilka minut.
                    Od La Zenii po Torrevieję, te projekty umieszczają Cię bezpośrednio na słynnych plażach Costa Blanki.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-cyan-800/50 px-3 py-1 rounded-full text-sm text-cyan-200 border border-cyan-700">
                      {beachProperties.filter(d => d.beachDistance === 'beachfront').length} Na Plaży
                    </span>
                    <span className="bg-cyan-800/50 px-3 py-1 rounded-full text-sm text-cyan-200 border border-cyan-700">
                      {beachProperties.filter(d => d.beachDistance === 'walking').length} Spacer Pieszo
                    </span>
                    <span className="bg-cyan-800/50 px-3 py-1 rounded-full text-sm text-cyan-200 border border-cyan-700">
                      {beachProperties.filter(d => d.beachDistance === 'short-drive').length} Krótka Jazda
                    </span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-sm p-6 text-white border border-white/10">
                  <h3 className="font-semibold text-lg mb-4 text-cyan-200">Dlaczego Życie na Plaży?</h3>
                  <ul className="space-y-3 text-cyan-100">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>15+ plaż z niebieską flagą</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>320+ dni słonecznych</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Krystalicznie czyste Morze Śródziemne</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Silny potencjał wynajmu</span>
                    </li>
                  </ul>
                  <Link
                    href="/pl/beach"
                    className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-colors"
                  >
                    Odkryj Wszystkie Nieruchomości Plażowe
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
                      Najbardziej Popularne
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    <span className="font-semibold">Torrevieja</span> i Okolicach
                  </h2>
                  <p className="text-warm-600 leading-relaxed">
                    Najpopularniejszy cel podróży w Hiszpanii dla międzynarodowych kupujących. Ze sławnymi słonymi jeziorami, tętniącym życiem centrum miasta i doskonałymi nieruchomościami, Torrevieja oferuje pełny śródziemnomorski styl życia. Zaledwie 30 minut od lotniska w Alicante.
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Link
                    href="/pl/areas/torrevieja"
                    className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors group"
                  >
                    Odkryj Torreviejęę
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
              <p className="text-primary-900 font-medium text-lg">Szukasz domu swoich marzeń?</p>
              <p className="text-warm-500 text-sm mt-1">Skontaktuj się z nami, aby uzyskać najnowsze dostępne, plany lub aby zarezerwować wizytę</p>
            </div>
            <div className="flex gap-3">
              <a href="https://wa.me/34634044970" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-primary-900 text-white rounded-sm text-sm font-medium hover:bg-primary-800 transition-colors">
                WhatsApp
              </a>
              <a href="/pl/contact" className="px-5 py-2.5 border border-primary-900 text-primary-900 rounded-sm text-sm font-medium hover:bg-primary-900 hover:text-white transition-colors">
                Kontakt
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
                      Golf & Życie na Plaży
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    <span className="font-semibold">Orihuela Costa</span>
                  </h2>
                  <p className="text-warm-600 leading-relaxed mb-4">
                    Siedziba niektórych z najpiękniejszych pól golfowych i plaż z niebieską flagą Costa Blanki.
                    Od La Zenia Boulevard do spokojnego Campoamor,
                    Orihuela Costa oferuje premium lifestyle w przystępnych cenach.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-white px-3 py-1 rounded-full text-sm text-warm-600 border border-warm-200">Golf Villamartín</span>
                    <span className="bg-white px-3 py-1 rounded-full text-sm text-warm-600 border border-warm-200">Las Colinas</span>
                    <span className="bg-white px-3 py-1 rounded-full text-sm text-warm-600 border border-warm-200">La Zenia</span>
                    <span className="bg-white px-3 py-1 rounded-full text-sm text-warm-600 border border-warm-200">Cabo Roig</span>
                  </div>
                </div>
                <div className="bg-primary-900 rounded-sm p-6 text-white">
                  <h3 className="font-semibold text-lg mb-4">Dlaczego Orihuela Costa?</h3>
                  <ul className="space-y-3 text-warm-300">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>5 mistrzowskich pól golfowych</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Plaże z niebieską flagą i mariny</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>La Zenia Boulevard Shopping</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Silny rynek wynajmu</span>
                    </li>
                  </ul>
                  <Link
                    href="/pl/areas/orihuela-costa"
                    className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-colors"
                  >
                    Odkryj Obszar
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
                      Południowe Miasta Przybrzeżne
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    <span className="font-semibold">Pilar de la Horadada</span> i Okolicach
                  </h2>
                  <p className="text-warm-600 leading-relaxed mb-4">
                    Południowa czubka Costa Blanki, gdzie niepokalane plaże spotykają się z autentyczną hiszpańską kulturą.
                    Pilar de la Horadada oferuje doskonałą wartość ze spektakularnym wybrzeżem, polem golfowym Lo Romero,
                    i łatwym dostępem do portów lotniczych Alicante i Murcia.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-600">Mil Palmeras</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-600">Torre de la Horadada</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-600">Golf Lo Romero</span>
                  </div>
                </div>
                <div className="bg-teal-800 rounded-sm p-6 text-white">
                  <h3 className="font-semibold text-lg mb-4">Dlaczego Pilar de la Horadada?</h3>
                  <ul className="space-y-3 text-teal-100">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>6 km dziewiczych piaszczystych plaż</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Autentyczna atmosfera miasta hiszpańskiego</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Kompleks Golf Lo Romero</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Doskonałą wartość na życie nad morzem</span>
                    </li>
                  </ul>
                  <Link
                    href="/pl/areas/pilar-de-la-horadada"
                    className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-colors"
                  >
                    Odkryj Obszar
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
                      Styl Życia Golfa
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                    Projekty Golfowe
                  </h2>
                  <p className="text-warm-300 leading-relaxed">
                    Obudź się do spektakularnych widoków na fairway i bądź na pierwszym tee w kilka minut.
                    Te projekty są idealnie umieszczone na mistrzowskich polach golfowych lub w ich pobliżu,
                    oferując ostateczny styl życia dla entuzjastów golfa.
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Link
                    href="/pl/golf-properties"
                    className="inline-flex items-center gap-2 text-accent-400 font-medium hover:text-accent-300 transition-colors group"
                  >
                    Odkryj Styl Golfowy
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
                      Góry Spotykają Morze
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    <span className="font-semibold">Finestrat</span> i Obszar Benidormu
                  </h2>
                  <p className="text-warm-600 leading-relaxed">
                    Najlepsze z obu światów: spokojna górska wioska z plażami Benidormu i udogodnieniami kilka minut dalej. Finestrat stał się gorącym punktem dla nowoczesnych projektów luksusowych
                    ze spektakularnymi panoramami. Park rozrywki Terra Mítica i szlak turystyczny Puig Campana
                    oferują działalność przez cały rok.
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Link
                    href="/pl/areas/finestrat"
                    className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group"
                  >
                    Odkryj Finestrat
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
                      Ekskluzyjna Północna Linia Brzegowa
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    Jávea, Moraira i <span className="font-semibold">Calpe</span>
                  </h2>
                  <p className="text-warm-600 leading-relaxed mb-4">
                    Klejnoty korony Costa Blanki Północy. Te prestiżowe obszary oferują dramatyczne krajobrazy,
                    urocze mariny i wyrafinowany styl życia. Słynne z ikonicznego Peñón de Ifach,
                    krystalicznych zatoczek i restauracji z gwiazdami Michelin.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Javea Stare Miasto</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Marina Moraira</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Plaża Calpe</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Cumbre del Sol</span>
                  </div>
                </div>
                <div className="bg-primary-900 rounded-sm p-6 text-white">
                  <h3 className="font-semibold text-lg mb-4">Premium Styl Życia na Północy</h3>
                  <ul className="space-y-3 text-warm-300">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Spektakularne widoki na morze i góry</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Restauracje Michelin Star</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Jachting i sporty wodne</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Ekskluzyjna społeczność zamknięta</span>
                    </li>
                  </ul>
                  <Link
                    href="/pl/costa-blanca-north"
                    className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-colors"
                  >
                    Odkryj Północ
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
                      Ciepła Linia Brzegowa · Region Murcji
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    Costa <span className="font-semibold">Calida</span> & Mar Menor
                  </h2>
                  <p className="text-warm-600 leading-relaxed mb-4">
                    Na południe od Costa Blanki leży Costa Calida—spektakularna linia brzegowa Murcji oferująca
                    unikalną lagunę Mar Menor. Największe słone jezioro Europy oferuje ciepłą, spokojną wodę
                    idealną do sportów wodnych, przy jednocześnie najlepszych wartościach nieruchomości w Hiszpanii.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Los Alcázares</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">San Javier</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">La Manga</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Golf Mar Menor</span>
                  </div>
                </div>
                <div className="bg-cyan-900 rounded-sm p-6 text-white">
                  <h3 className="font-semibold text-lg mb-4">Dlaczego Costa Calida?</h3>
                  <ul className="space-y-3 text-cyan-100">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Mar Menor - największa laguna Europy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Doskonała wartość w porównaniu do Costa Blanki</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Blisko międzynarodowego lotniska Corvera</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Światowe centrum sportów wodnych</span>
                    </li>
                  </ul>
                  <Link
                    href="/pl/areas/costa-calida"
                    className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-colors"
                  >
                    Odkryj Costa Cálida
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
                      Wczesne Ceny
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    Nowe <span className="font-semibold">Uruchomienia</span>
                  </h2>
                  <p className="text-warm-600 leading-relaxed">
                    Uzyskaj preferencyjny dostęp do tych niedawno uruchomionych projektów. Zakupy za wstępnym planem oferują najlepsze ceny—
                    zwykle 15-20% poniżej wartości gotowych nieruchomości. Zabezpiecz swoją jednostkę teraz z 30% depozytem
                    i zapłacić resztę na ukończenie. Im wcześniej kupisz, tym lepszej pozycji i ceny.
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Link
                    href="/pl/developments?status=off-plan"
                    className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors group"
                  >
                    Zobacz Wszystkie Projekty Wstępne
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
                  Premium <span className="font-semibold">Luksus</span>
                </h2>
                <p className="text-warm-300 max-w-2xl mx-auto">
                  Ekskluzywne projekty dla doświadczonych kupujących. Premium lokalizacje, wyjątkowe specyfikacje,
                  i niezrównaną jakość na najbardziej prestiżowych adresach Hiszpanii.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {premiumLuxury.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} variant="featured" />
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  href="/pl/luxury"
                  className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-colors"
                >
                  Zobacz Kolekcję Luksusową
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* CTA - Personal Guidance */}
        {/* ============================================ */}
        <section className="py-16 bg-accent-500">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Nie jesteś pewien, od czego zacząć?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Z {stats.totalDevelopments}+ projektami do wyboru, znalezienie właściwego może wydawać się przytłaczające.
              Powiedz nam swoje potrzeby—budżet, lokalizacja, data wprowadzenia—a my zasugerujemy idealne projekty.
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
                WhatsApp
              </a>
              <Link
                href="/pl/contact"
                className="bg-primary-900 hover:bg-primary-800 text-white font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Formularz Kontaktowy
              </Link>
            </div>
          </div>
        </section>

        <WhatsAppCTA />
      </main>
    </>
  );
}
