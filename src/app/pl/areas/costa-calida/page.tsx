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
  title: 'Przewodnik nieruchomości Costa Cálida 2026 | Mar Menor, Murcia i kurort golfowy',
  description: 'Odkryj Costa Cálida - region o najlepszej wartości w Hiszpanii. Plaże Mar Menor, 6+ pól golfowych, nowe budynki od 170 000 €. Los Alcázares, San Javier, Torre Pacheco. Pełny przewodnik.',
  openGraph: {
    title: 'Costa Cálida - Najlepsza wartość nieruchomości w Hiszpanii',
    description: 'Laguna Mar Menor, kurorty golfowe, słońce przez cały rok. Nieruchomości od 170 000 €.',
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
  return new Intl.NumberFormat('pl-PL', {
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
      href={`/pl/developments/${dev.slug}`}
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
                Gotowe do zamieszkania
              </span>
            )}
            {dev.status === 'under-construction' && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                W budowie
              </span>
            )}
            {dev.status === 'off-plan' && (
              <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                Z planu
              </span>
            )}
          </div>

          {/* Units count - Top Right */}
          <div className="absolute top-3 right-3">
            <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-sm">
              {dev.totalUnits} lokali
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
            Od {formatPrice(dev.priceFrom)}
          </div>
          {dev.deliveryQuarter && (
            <div className={`text-[10px] font-medium px-2 py-1 rounded-sm ${
              dev.status === 'key-ready'
                ? 'bg-accent-100 text-accent-700'
                : 'bg-accent-100 text-accent-700'
            }`}>
              {dev.status === 'key-ready' ? 'Zamieszkaj teraz' : dev.deliveryQuarter}
            </div>
          )}
        </div>

        {/* Bedroom breakdown */}
        <div className="text-xs mb-2 text-warm-600">
          {dev.bedroomBreakdown?.length > 0
            ? dev.bedroomBreakdown.slice(0, 3).join(', ') + (dev.bedroomBreakdown.length > 3 ? ' +więcej' : '')
            : `${dev.bedroomRange} sypialnia`
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
                Basen
              </span>
            )}
            {dev.hasGym && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h4v12H4zM16 6h4v12h-4zM8 10h8v4H8z" />
                </svg>
                Siłownia
              </span>
            )}
            {dev.hasSpa && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-teal-50 text-teal-600">
                ✨ Spa
              </span>
            )}
            {dev.hasSeaview && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-600">
                🌊 Widok na morze
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

export default async function CostaCalidaPagePl() {
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
    { name: 'Strona główna', url: 'https://newbuildhomescostablanca.com/pl/' },
    { name: 'Obszary', url: 'https://newbuildhomescostablanca.com/pl/areas/' },
    { name: 'Costa Cálida', url: 'https://newbuildhomescostablanca.com/pl/areas/costa-calida/' },
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
            Zobacz nieruchomości
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
              <Link href="/pl/" className="hover:text-white transition-colors">Strona główna</Link>
              <span className="mx-2">›</span>
              <Link href="/pl/areas" className="hover:text-white transition-colors">Obszary</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Costa Cálida</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-primary-700 text-white text-xs font-medium px-3 py-1 rounded-sm">
                  Region Murcji
                </span>
                <span className="bg-success-500 text-white text-xs font-bold px-3 py-1 rounded-sm">
                  {totalProperties}+ dostępnych nieruchomości
                </span>
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-sm">
                  Najlepsza wartość w Hiszpanii
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                Costa <span className="font-semibold">Cálida</span>
              </h1>
              <p className="text-warm-300 text-lg md:text-xl mb-6">
                Mar Menor • Kurorty golfowe • Śródziemnomorski styl życia
              </p>

              <p className="text-warm-300 text-lg leading-relaxed mb-8 max-w-3xl">
                Odkryj "Ciepłe Wybrzeże" Hiszpanii - gdzie terapeutyczne wody Mar Menor spotykają się z
                polami golfowymi championship, a nowe budynki kosztują <strong className="text-white">25-40% mniej</strong> niż
                Costa Blanca. Słońce przez cały rok, autentyczna kultura hiszpańska i
                nieruchomości od zaledwie <strong className="text-accent-400">{formatPrice(lowestPrice || 170000)}</strong>.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{golfCourses.length}</div>
                  <div className="text-warm-400 text-sm">Pola golfowe</div>
                </div>
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">170km²</div>
                  <div className="text-warm-400 text-sm">Laguna Mar Menor</div>
                </div>
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent-400">{formatPrice(lowestPrice || 170000)}</div>
                  <div className="text-warm-400 text-sm">Nieruchomości od</div>
                </div>
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">320+</div>
                  <div className="text-warm-400 text-sm">Słonecznych dni/rok</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-sm font-medium transition-colors inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Zapytaj o Costa Cálida
                </a>
                <a href="#golf" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-sm font-medium transition-colors">
                  Nieruchomości golfowe
                </a>
                <a href="#beach" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-sm font-medium transition-colors">
                  Nieruchomości plażowe
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
                Dlaczego wybrać <span className="font-semibold">Costa Cálida</span>?
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                Największa słonawodna laguna Europy, pola golfowe championship i najlepsza wartość nieruchomości w Hiszpanii.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <div className="text-4xl mb-3">🌊</div>
                <h3 className="font-semibold text-primary-900 mb-2">Mar Menor</h3>
                <p className="text-warm-600 text-sm">Największa słonawodna laguna Europy. Ciepłe, spokojne wody doskonałe dla rodzin i sportów wodnych. Terapeutyczne kąpiele błotne.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <div className="text-4xl mb-3">⛳</div>
                <h3 className="font-semibold text-primary-900 mb-2">{golfCourses.length} Pola golfowe</h3>
                <p className="text-warm-600 text-sm">Serena Golf, Roda Golf, Hacienda del Álamo i więcej. Pola championship w doskonałej cenie.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-semibold text-primary-900 mb-2">Najlepsza wartość</h3>
                <p className="text-warm-600 text-sm">Nieruchomości 25-40% tańsze niż Costa Blanca. Te same słońce, ten sam styl życia, lepsze ceny.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <div className="text-4xl mb-3">☀️</div>
                <h3 className="font-semibold text-primary-900 mb-2">320+ dni słonecznych</h3>
                <p className="text-warm-600 text-sm">Śródziemnomorski klimat przez cały rok. Aktywności golfowe i plażowe możliwe każdego miesiąca.</p>
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
                ⛳ Nieruchomości golfowe
              </a>
              <a href="#beach" className="flex-shrink-0 px-5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-white font-medium transition-colors text-sm">
                🏖️ Nieruchomości plażowe
              </a>
              <a href="#inland" className="flex-shrink-0 px-5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-white font-medium transition-colors text-sm">
                🏡 Nieruchomości wewnątrz lądu
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
                Życie golfowe
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Nieruchomości <span className="font-semibold">golfowe</span>
            </h2>
            <p className="text-warm-600 mb-8">
              {golfCourses.length} pól championship z nowymi domami. Golf przez cały rok w słońcu Murcji.
            </p>

            {/* Golf Courses Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {golfCourses.map(course => (
                <Link key={course.slug} href={`/pl/golf/${course.slug}`}
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
                        {course.propertyCount} Nieruchomości
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
                        Zobacz nieruchomości →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Golf Properties */}
            {golfProperties.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">Wyróżnione projekty golfowe</h3>
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
                Życie na plaży
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Nieruchomości plażowe <span className="font-semibold">Mar Menor</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Największa słonawodna laguna Europy. Ciepłe, spokojne wody doskonałe dla rodzin. Nieruchomości w Los Alcázares, San Javier i Santiago de la Ribera.
            </p>

            {/* Mar Menor Info */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-xl p-6 md:p-8 mb-10 text-white">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">🌡️ Cieplejsza woda</h3>
                  <p className="text-warm-300 text-sm">Mar Menor jest o 5-7°C cieplejsza niż Morze Śródziemne. Sezon pływackiej trwa od kwietnia do listopada.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">👨‍👩‍👧‍👦 Przyjazna rodzinom</h3>
                  <p className="text-warm-300 text-sm">Płytka, spokojna woda idealna dla dzieci i sportów wodnych. Brak fal, brak prądów.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">💆 Terapeutyczne błoto</h3>
                  <p className="text-warm-300 text-sm">Słynne kąpiele błotne w Lo Pagán używane przez wieki do terapi skóry i stawów.</p>
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
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Nieruchomości plażowe już wkrótce</h3>
                <p className="text-warm-600 mb-4">Nowe projekty plażowe są dodawane regularnie. Zarejestruj swoje zainteresowanie, aby zostać powiadomiony.</p>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-medium">
                  Zarejestruj zainteresowanie
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
                Najlepsza wartość
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Nieruchomości <span className="font-semibold">wewnątrz lądu</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Torre Pacheco, Fuente Álamo i okoliczne obszary. Najlepsza wartość z plażami i golfem wciąż w odległości 20 minut.
            </p>

            {/* Inland Areas */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { name: 'Torre Pacheco', desc: 'Miasto rolnicze blisko Mar Menor', distance: '15 min do plaży' },
                { name: 'Fuente Álamo', desc: 'Kurort golfowy Hacienda del Álamo', distance: '30 min do plaży' },
                { name: 'Sucina', desc: 'Blisko pola golfowego Peraleja', distance: '15 min do plaży' },
                { name: 'Cartagena', desc: 'Historyczne miasto portowe', distance: '10 min do plaży' },
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
                <p className="text-warm-600">Skontaktuj się z nami, aby poznać najnowsze opcje nieruchomości wewnątrz lądu w Costa Cálida.</p>
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
                  Wybór premium
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Nieruchomości <span className="font-semibold">luksusowe 800K€+</span>
              </h2>
              <p className="text-warm-600 mb-8">
                Premium wille i wyłączne projekty w najlepszych lokalizacjach Costa Cálida.
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
                  Gotów do zapoznania się z Costa Cálida?
                </h2>
                <p className="text-warm-300 leading-relaxed mb-6">
                  Niezależnie od tego, czy szukasz życia na kurortach golfowych, dostępu do plaży Mar Menor, czy najlepszej wartości w Hiszpanii,
                  pomożemy Ci znaleźć idealną nieruchomość w Costa Cálida.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Bezpłatna oferta nieruchomości</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Lokalna ekspertiza</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Brak opłat dla kupujących</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Wizyty zorganizowane</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Napisz do nas na WhatsApp
                  </a>
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                    className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors border border-white/20">
                    {CONTACT.phone}
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-primary-900 mb-1">Uzyskaj nieruchomości Costa Cálida</h3>
                <p className="text-warm-500 text-sm mb-5">Wyślemy Ci pasujące nieruchomości od {formatPrice(lowestPrice || 170000)}</p>
                <LeadForm propertyInterest="Nieruchomość Costa Cálida" formName="costa-calida-inquiry" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
