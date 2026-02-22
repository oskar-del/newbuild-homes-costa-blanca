import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  getAllDevelopments,
  Development,
} from '@/lib/development-service';
import { GOLF_COURSES, getGolfCoursesByRegion } from '@/lib/golf-courses';
import { getCardImages } from '@/lib/image-categorization';
import LeadForm from '@/components/LeadForm';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Costa Cálida Eiendomsveiledning 2026 | Mar Menor, Murcia & Golfresort',
  description: 'Oppdag Costa Cálida - Spanias beste verdi for eiendom. Mar Menor-strender, 6+ golfbaner, nybygg fra 170 000 €. Los Alcázares, San Javier, Torre Pacheco. Komplett veiledning.',
  openGraph: {
    title: 'Costa Cálida - Spanias beste verdi for eiendom',
    description: 'Mar Menor-lagune, golfresort, året rundt sol. Eiendommer fra 170 000 €.',
    type: 'website',
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

// Costa Cálida areas/towns
const COSTA_CALIDA_TOWNS = [
  'Los Alcázares', 'San Javier', 'Santiago de la Ribera', 'Torre Pacheco',
  'Sucina', 'Roda', 'Lo Pagán', 'San Pedro del Pinatar', 'Mazarrón',
  'Cartagena', 'La Manga', 'Fuente Álamo', 'Murcia'
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

// Development Card Component - Matches main developments page style
function DevelopmentCard({ dev }: { dev: Development }) {
  // Get intelligently categorized images
  const cardImages = getCardImages(dev.images || [], dev.name, dev.town);
  const hasMultipleImages = cardImages.secondary.length >= 2;

  // Check if we have real images
  const hasRealImages = dev.images && dev.images.length > 0 && !dev.images[0]?.includes('placeholder');
  const imageSource = hasRealImages
    ? (dev.images[0]?.includes('backgroundproperties') ? 'BP' :
       dev.images[0]?.includes('feedmedia') ? 'REDSP' :
       dev.images[0]?.includes('redsp') ? 'REDSP' : 'Feed')
    : 'Placeholder';

  return (
    <Link
      href={`/no/developments/${dev.slug}`}
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
                Innflyttingsklar
              </span>
            )}
            {dev.status === 'under-construction' && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                Under bygging
              </span>
            )}
            {dev.status === 'off-plan' && (
              <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                Fra plan
              </span>
            )}
          </div>

          {/* Units count - Top Right */}
          <div className="absolute top-3 right-3">
            <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-sm">
              {dev.totalUnits} enheter
            </span>
          </div>

          {/* Name & Location Overlay - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="text-white">
              <h3 className="font-semibold text-sm leading-tight mb-0.5 group-hover:text-accent-300 transition-colors">
                {dev.name}
              </h3>
              <p className="text-warm-300 text-xs">{dev.town}</p>
            </div>
          </div>
        </div>

        {/* Two Smaller Property Images - Below Main */}
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
      <div className="px-3 py-3 bg-white">
        {/* Price & Move-in */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-base font-semibold text-primary-900">
            Fra {formatPrice(dev.priceFrom)}
          </div>
          {dev.deliveryQuarter && (
            <div className={`text-[10px] font-medium px-2 py-1 rounded-sm ${
              dev.status === 'key-ready'
                ? 'bg-accent-100 text-accent-700'
                : 'bg-accent-100 text-accent-700'
            }`}>
              {dev.status === 'key-ready' ? 'Flytt inn nå' : dev.deliveryQuarter}
            </div>
          )}
        </div>

        {/* Bedroom breakdown */}
        <div className="text-xs mb-2 text-warm-600">
          {dev.bedroomBreakdown?.length > 0
            ? dev.bedroomBreakdown.slice(0, 3).join(', ') + (dev.bedroomBreakdown.length > 3 ? ' +mer' : '')
            : `${dev.bedroomRange} soverom`
          }
          {dev.sizeRange && ` · ${dev.sizeRange}`}
        </div>

        {/* Amenities icons */}
        {dev.amenities && dev.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {dev.hasPool && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                Svømmebasseng
              </span>
            )}
            {dev.hasGym && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h4v12H4zM16 6h4v12h-4zM8 10h8v4H8z" />
                </svg>
                Treningsstudio
              </span>
            )}
            {dev.hasSpa && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-teal-50 text-teal-600">
                ✨ Spa
              </span>
            )}
            {dev.hasSeaview && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-600">
                🌊 Havsview
              </span>
            )}
            {dev.hasGolfview && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-green-50 text-green-600">
                ⛳ Golf
              </span>
            )}
          </div>
        )}

        {/* Developer & Zone */}
        <div className="text-[11px] text-warm-500">
          {dev.developer}
          {dev.zone && ` · ${dev.zone}`}
        </div>
      </div>
    </Link>
  );
}

// Fallback image for developments without photos
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80&fit=crop';

export default async function CostaCalidaPageNo() {
  // Get all developments and filter for Costa Cálida
  const allDevelopments = await getAllDevelopments();

  const costaCalidaDevelopments = allDevelopments.filter(dev => {
    const town = (dev.town || '').toLowerCase();
    return COSTA_CALIDA_TOWNS.some(t => town.includes(t.toLowerCase())) ||
           town.includes('alcázares') || town.includes('alcazares') ||
           town.includes('pacheco') || town.includes('javier') ||
           town.includes('roda') || town.includes('murcia') ||
           town.includes('cartagena') || town.includes('mazarrón') ||
           town.includes('manga') || town.includes('sucina');
  });

  // Get golf courses for Costa Cálida (Murcia region)
  const golfCourses = getGolfCoursesByRegion('murcia');

  // Categorize developments
  const golfProperties = costaCalidaDevelopments.filter(dev => {
    const name = (dev.name || '').toLowerCase();
    const town = (dev.town || '').toLowerCase();
    return name.includes('golf') || name.includes('serena') || name.includes('roda') ||
           name.includes('hacienda') || name.includes('peraleja') || name.includes('altorreal') ||
           town.includes('roda') || town.includes('sucina');
  });

  const beachProperties = costaCalidaDevelopments.filter(dev => {
    const town = (dev.town || '').toLowerCase();
    const name = (dev.name || '').toLowerCase();
    return town.includes('alcázares') || town.includes('alcazares') ||
           town.includes('javier') || town.includes('santiago') ||
           town.includes('manga') || town.includes('pagán') || town.includes('pagan') ||
           name.includes('mar menor') || name.includes('beach');
  });

  const luxuryProperties = costaCalidaDevelopments.filter(dev =>
    dev.priceFrom && dev.priceFrom >= 800000
  );

  const inlandProperties = costaCalidaDevelopments.filter(dev => {
    const town = (dev.town || '').toLowerCase();
    return town.includes('pacheco') || town.includes('fuente') ||
           town.includes('cartagena') || town.includes('mazarrón');
  });

  // Stats
  const totalProperties = costaCalidaDevelopments.length;
  const lowestPrice = Math.min(...costaCalidaDevelopments.filter(d => d.priceFrom).map(d => d.priceFrom!));

  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no/' },
    { name: 'Områder', url: 'https://newbuildhomescostablanca.com/no/areas/' },
    { name: 'Costa Cálida', url: 'https://newbuildhomescostablanca.com/no/areas/costa-calida/' },
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
          <a href="#properties" className="flex-1 flex items-center justify-center gap-2 bg-accent-500 text-white py-4 font-medium">
            Se eiendommer
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
              <Link href="/no/" className="hover:text-white transition-colors">Hjem</Link>
              <span className="mx-2">›</span>
              <Link href="/no/areas" className="hover:text-white transition-colors">Områder</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Costa Cálida</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-primary-700 text-white text-xs font-medium px-3 py-1 rounded-sm">
                  Murcia-region
                </span>
                <span className="bg-success-500 text-white text-xs font-bold px-3 py-1 rounded-sm">
                  {totalProperties}+ eiendommer tilgjengelig
                </span>
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-sm">
                  Beste verdi i Spania
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                Costa <span className="font-semibold">Cálida</span>
              </h1>
              <p className="text-warm-300 text-lg md:text-xl mb-6">
                Mar Menor • Golfresort • Middelhavskulturen
              </p>

              <p className="text-warm-300 text-lg leading-relaxed mb-8 max-w-3xl">
                Oppdag Spanias "Varmekyst" - hvor Mar Menor's terapeutiske vann møter
                championship-golfbaner, og nybygg koster <strong className="text-white">25-40% mindre</strong> enn
                Costa Blanca. År rundt sol, autentisk spansk kultur, og
                eiendommer fra bare <strong className="text-accent-400">{formatPrice(lowestPrice || 170000)}</strong>.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{golfCourses.length}</div>
                  <div className="text-warm-400 text-sm">Golfbaner</div>
                </div>
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">170km²</div>
                  <div className="text-warm-400 text-sm">Mar Menor-lagune</div>
                </div>
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent-400">{formatPrice(lowestPrice || 170000)}</div>
                  <div className="text-warm-400 text-sm">Eiendommer fra</div>
                </div>
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">320+</div>
                  <div className="text-warm-400 text-sm">Soldager/år</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-sm font-medium transition-colors inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Spør om Costa Cálida
                </a>
                <a href="#golf" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-sm font-medium transition-colors">
                  Golfeiendommer
                </a>
                <a href="#beach" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-sm font-medium transition-colors">
                  Strandeiendommer
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* WHY COSTA CÁLIDA */}
        {/* ============================================ */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Hvorfor velge <span className="font-semibold">Costa Cálida</span>?
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                Europas største saltvannslagune, championship-golf, og Spanias beste eiendomsverdi.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <div className="text-4xl mb-3">🌊</div>
                <h3 className="font-semibold text-primary-900 mb-2">Mar Menor</h3>
                <p className="text-warm-600 text-sm">Europas største saltvannslagune. Varme, rolige vann perfekt for familier og vannaktiviteter. Terapeutiske gjørmebad.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <div className="text-4xl mb-3">⛳</div>
                <h3 className="font-semibold text-primary-900 mb-2">{golfCourses.length} Golfbaner</h3>
                <p className="text-warm-600 text-sm">Serena Golf, Roda Golf, Hacienda del Álamo og flere. Championship-baner til utmerket verdi.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-semibold text-primary-900 mb-2">Beste verdi</h3>
                <p className="text-warm-600 text-sm">Eiendommer 25-40% billigere enn Costa Blanca. Samme sol, samme livsstil, bedre priser.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <div className="text-4xl mb-3">☀️</div>
                <h3 className="font-semibold text-primary-900 mb-2">320+ Soldager</h3>
                <p className="text-warm-600 text-sm">År rundt middelhavsklimat. Golf og strandaktiviteter mulig hver måned.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* NAVIGATION TABS */}
        {/* ============================================ */}
        <section className="bg-primary-800 sticky top-0 z-40" id="properties">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex overflow-x-auto gap-2 py-3 scrollbar-hide">
              <a href="#golf" className="flex-shrink-0 px-5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-white font-medium transition-colors text-sm">
                ⛳ Golfeiendommer
              </a>
              <a href="#beach" className="flex-shrink-0 px-5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-white font-medium transition-colors text-sm">
                🏖️ Strandeiendommer
              </a>
              <a href="#inland" className="flex-shrink-0 px-5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-white font-medium transition-colors text-sm">
                🏡 Innlandseiendommer
              </a>
              {luxuryProperties.length > 0 && (
                <a href="#luxury" className="flex-shrink-0 px-5 py-2 rounded-sm bg-accent-500/30 hover:bg-accent-500/50 text-white font-medium transition-colors text-sm">
                  ✨ Luksus 800K€+
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* GOLF PROPERTIES */}
        {/* ============================================ */}
        <section className="py-14 bg-warm-50" id="golf">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                Golfliv
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Golf<span className="font-semibold">eiendommer</span>
            </h2>
            <p className="text-warm-600 mb-8">
              {golfCourses.length} championship-baner med nybygg. År rundt golf i Murcia-solen.
            </p>

            {/* Golf Courses Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {golfCourses.map(course => (
                <Link key={course.slug} href={`/no/golf/${course.slug}`}
                  className="group rounded-sm overflow-hidden border border-warm-200 hover:shadow-xl transition-all bg-white">
                  <div className={`h-44 relative bg-gradient-to-br ${course.gradient}`}>
                    {course.image && (
                      <Image
                        src={course.image}
                        alt={course.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    )}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-success-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {course.propertyCount} Eiendommer
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
                      <h3 className="text-lg font-semibold text-white group-hover:text-accent-300 transition-colors">
                        {course.name}
                      </h3>
                      <p className="text-white/80 text-sm">{course.town}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-warm-600 text-sm mb-3 line-clamp-2">{course.story}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-accent-600 font-bold">{formatPrice(course.priceFrom)}</span>
                      <span className="text-primary-900 text-sm font-medium group-hover:text-accent-600 transition-colors">
                        Se eiendommer →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Golf Properties */}
            {golfProperties.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">Golfutviklinger i fokus</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                  {golfProperties.slice(0, 6).map(dev => (
                    <DevelopmentCard key={dev.slug} dev={dev} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* ============================================ */}
        {/* BEACH PROPERTIES */}
        {/* ============================================ */}
        <section className="py-14 bg-gradient-to-b from-warm-50 to-white" id="beach">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                Strandliv
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Mar Menor <span className="font-semibold">Strandeiendommer</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Europas største saltvannslagune. Varme, rolige vann perfekt for familier. Eiendommer i Los Alcázares, San Javier og Santiago de la Ribera.
            </p>

            {/* Mar Menor Info */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-xl p-6 md:p-8 mb-10 text-white">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">🌡️ Varmere vann</h3>
                  <p className="text-warm-300 text-sm">Mar Menor er 5-7°C varmere enn Middelhavet. Svømmesesongen strekker seg fra april til november.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">👨‍👩‍👧‍👦 Familiavennlig</h3>
                  <p className="text-warm-300 text-sm">Grunne, rolige vann perfekt for barn og vannaktiviteter. Ingen bølger, ingen strømmer.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">💆 Terapeutisk gjørme</h3>
                  <p className="text-warm-300 text-sm">Berømt gjørmebad i Lo Pagán brukt i århundrer for hud- og leddbalsam.</p>
                </div>
              </div>
            </div>

            {/* Beach Properties */}
            {beachProperties.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {beachProperties.slice(0, 6).map(dev => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center border border-warm-200">
                <p className="text-4xl mb-4">🏖️</p>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Strandeiendommer kommer snart</h3>
                <p className="text-warm-600 mb-4">Nye strandutvikling legges til jevnlig. Registrer interesse for å bli varslet.</p>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-medium">
                  Registrer interesse
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ============================================ */}
        {/* INLAND PROPERTIES */}
        {/* ============================================ */}
        <section className="py-14 bg-white" id="inland">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-px bg-amber-600" />
              <span className="text-amber-600 text-xs font-medium tracking-widest uppercase">
                Beste verdi
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Innlands<span className="font-semibold">eiendommer</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Torre Pacheco, Fuente Álamo og omliggende områder. Beste verdi med strender og golf fortsatt innen 20 minutter.
            </p>

            {/* Inland Areas */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { name: 'Torre Pacheco', desc: 'Landbrukerby nær Mar Menor', distance: '15 min til strand' },
                { name: 'Fuente Álamo', desc: 'Hacienda del Álamo golfresort', distance: '30 min til strand' },
                { name: 'Sucina', desc: 'Nær Peraleja Golf', distance: '15 min til strand' },
                { name: 'Cartagena', desc: 'Historisk havneby', distance: '10 min til strand' },
              ].map(area => (
                <div key={area.name} className="bg-warm-50 rounded-xl p-5 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-1">{area.name}</h3>
                  <p className="text-warm-600 text-sm mb-2">{area.desc}</p>
                  <p className="text-accent-600 text-xs font-medium">{area.distance}</p>
                </div>
              ))}
            </div>

            {/* Inland Properties */}
            {inlandProperties.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {inlandProperties.slice(0, 6).map(dev => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            ) : (
              <div className="bg-warm-50 rounded-xl p-8 text-center border border-warm-200">
                <p className="text-warm-600">Kontakt oss for de siste innlandseiendommene i Costa Cálida.</p>
              </div>
            )}
          </div>
        </section>

        {/* ============================================ */}
        {/* LUXURY PROPERTIES */}
        {/* ============================================ */}
        {luxuryProperties.length > 0 && (
          <section className="py-14 bg-gradient-to-b from-amber-50 to-white" id="luxury">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-px bg-amber-500" />
                <span className="text-amber-600 text-xs font-medium tracking-widest uppercase">
                  Premiumvalg
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Luksus<span className="font-semibold">eiendommer 800K€+</span>
              </h2>
              <p className="text-warm-600 mb-8">
                Premium villaer og eksklusive utvikling i Costa Cálida's finest steder.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {luxuryProperties.slice(0, 6).map(dev => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* FINAL CTA */}
        {/* ============================================ */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                  Klar til å utforske Costa Cálida?
                </h2>
                <p className="text-warm-300 leading-relaxed mb-6">
                  Enten du leter etter golfresortliv, Mar Menor-strandtilgang, eller beste verdi i Spania,
                  vil vi hjelpe deg å finne den perfekte eiendommen på Costa Cálida.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Gratis eiendomsmatchning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Lokal ekspertise</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Ingen kjøpergebyrer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Visninger arrangert</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp oss
                  </a>
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                    className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors border border-white/20">
                    {CONTACT.phone}
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-primary-900 mb-1">Få Costa Cálida-eiendommer</h3>
                <p className="text-warm-500 text-sm mb-5">Vi sender deg samsvarende eiendommer fra {formatPrice(lowestPrice || 170000)}</p>
                <LeadForm propertyInterest="Costa Cálida eiendom" formName="costa-calida-inquiry" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
