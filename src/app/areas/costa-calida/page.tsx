import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllDevelopments } from '@/lib/development-service';
import { GOLF_COURSES, getGolfCoursesByRegion } from '@/lib/golf-courses';
import LeadForm from '@/components/LeadForm';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Costa Cálida Property Guide 2026 | Mar Menor, Murcia & Golf Resorts',
  description: 'Discover Costa Cálida - Spain\'s best value region. Mar Menor beaches, 6+ golf courses, new builds from €170k. Los Alcázares, San Javier, Torre Pacheco. Complete guide.',
  openGraph: {
    title: 'Costa Cálida - Spain\'s Best Value Property Region',
    description: 'Mar Menor lagoon, golf resorts, year-round sunshine. Properties from €170,000.',
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
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

// Fallback image for developments without photos
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80&fit=crop';

export default async function CostaCalidaPage() {
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
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Areas', url: 'https://newbuildhomescostablanca.com/areas/' },
    { name: 'Costa Cálida', url: 'https://newbuildhomescostablanca.com/areas/costa-calida/' },
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
            View Properties
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
              <Link href="/areas" className="hover:text-white transition-colors">Areas</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Costa Cálida</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-primary-700 text-white text-xs font-medium px-3 py-1 rounded-sm">
                  Murcia Region
                </span>
                <span className="bg-success-500 text-white text-xs font-bold px-3 py-1 rounded-sm">
                  {totalProperties}+ Properties Available
                </span>
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-sm">
                  Best Value in Spain
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                Costa <span className="font-semibold">Cálida</span>
              </h1>
              <p className="text-warm-300 text-lg md:text-xl mb-6">
                Mar Menor • Golf Resorts • Mediterranean Lifestyle
              </p>

              <p className="text-warm-300 text-lg leading-relaxed mb-8 max-w-3xl">
                Discover Spain's "Warm Coast" - where the Mar Menor's therapeutic waters meet
                championship golf courses, and new build homes cost <strong className="text-white">25-40% less</strong> than
                Costa Blanca. Year-round sunshine, authentic Spanish culture, and
                properties from just <strong className="text-accent-400">{formatPrice(lowestPrice || 170000)}</strong>.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{golfCourses.length}</div>
                  <div className="text-warm-400 text-sm">Golf Courses</div>
                </div>
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">170km²</div>
                  <div className="text-warm-400 text-sm">Mar Menor Lagoon</div>
                </div>
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent-400">{formatPrice(lowestPrice || 170000)}</div>
                  <div className="text-warm-400 text-sm">Properties From</div>
                </div>
                <div className="bg-white/10 rounded-sm p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">320+</div>
                  <div className="text-warm-400 text-sm">Sunny Days/Year</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-sm font-medium transition-colors inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Ask About Costa Cálida
                </a>
                <a href="#golf" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-sm font-medium transition-colors">
                  Golf Properties
                </a>
                <a href="#beach" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-sm font-medium transition-colors">
                  Beach Properties
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
                Why Choose <span className="font-semibold">Costa Cálida</span>?
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                Europe's largest saltwater lagoon, championship golf, and Spain's best property value.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <div className="text-4xl mb-3">🌊</div>
                <h3 className="font-semibold text-primary-900 mb-2">Mar Menor</h3>
                <p className="text-warm-600 text-sm">Europe's largest saltwater lagoon. Warm, calm waters perfect for families and water sports. Therapeutic mud baths.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <div className="text-4xl mb-3">⛳</div>
                <h3 className="font-semibold text-primary-900 mb-2">{golfCourses.length} Golf Courses</h3>
                <p className="text-warm-600 text-sm">Serena Golf, Roda Golf, Hacienda del Álamo and more. Championship courses at excellent value.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-semibold text-primary-900 mb-2">Best Value</h3>
                <p className="text-warm-600 text-sm">Properties 25-40% cheaper than Costa Blanca. Same sunshine, same lifestyle, better prices.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <div className="text-4xl mb-3">☀️</div>
                <h3 className="font-semibold text-primary-900 mb-2">320+ Sunny Days</h3>
                <p className="text-warm-600 text-sm">Year-round Mediterranean climate. Golf and beach activities possible every month.</p>
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
                ⛳ Golf Properties
              </a>
              <a href="#beach" className="flex-shrink-0 px-5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-white font-medium transition-colors text-sm">
                🏖️ Beach Properties
              </a>
              <a href="#inland" className="flex-shrink-0 px-5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-white font-medium transition-colors text-sm">
                🏡 Inland Properties
              </a>
              {luxuryProperties.length > 0 && (
                <a href="#luxury" className="flex-shrink-0 px-5 py-2 rounded-sm bg-accent-500/30 hover:bg-accent-500/50 text-white font-medium transition-colors text-sm">
                  ✨ Luxury €800K+
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
                Golf Living
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Golf <span className="font-semibold">Properties</span>
            </h2>
            <p className="text-warm-600 mb-8">
              {golfCourses.length} championship courses with new build homes. Year-round golf in the Murcia sunshine.
            </p>

            {/* Golf Courses Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {golfCourses.map(course => (
                <Link key={course.slug} href={`/golf/${course.slug}`}
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
                        {course.propertyCount} Properties
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
                        View Properties →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Golf Properties */}
            {golfProperties.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">Featured Golf Developments</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {golfProperties.slice(0, 6).map(dev => (
                    <Link key={dev.slug} href={`/developments/${dev.slug}`}
                      className="group bg-white border border-warm-200 rounded-sm overflow-hidden hover:shadow-xl transition-all">
                      <div className="relative h-48 bg-warm-200">
                        <Image src={dev.images[0] || FALLBACK_IMAGE} alt={dev.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                        <div className="absolute top-3 left-3">
                          <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-sm">Golf Resort</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-primary-900 mb-1 group-hover:text-accent-600 transition-colors">{dev.name}</h4>
                        <p className="text-warm-500 text-sm mb-2">{dev.town}</p>
                        {dev.priceFrom && <p className="text-accent-600 font-bold">From {formatPrice(dev.priceFrom)}</p>}
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* ============================================ */}
        {/* BEACH PROPERTIES */}
        {/* ============================================ */}
        <section className="py-14 bg-gradient-to-b from-cyan-50 to-white" id="beach">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-px bg-cyan-600" />
              <span className="text-cyan-600 text-xs font-medium tracking-widest uppercase">
                Beach Living
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Mar Menor <span className="font-semibold">Beach Properties</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Europe's largest saltwater lagoon. Warm, calm waters perfect for families. Properties in Los Alcázares, San Javier, and Santiago de la Ribera.
            </p>

            {/* Mar Menor Info */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-6 md:p-8 mb-10 text-white">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">🌡️ Warmer Waters</h3>
                  <p className="text-cyan-100 text-sm">Mar Menor is 5-7°C warmer than the Mediterranean. Swimming season extends from April to November.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">👨‍👩‍👧‍👦 Family Friendly</h3>
                  <p className="text-cyan-100 text-sm">Shallow, calm waters make it perfect for children and water sports. No waves, no currents.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">💆 Therapeutic Mud</h3>
                  <p className="text-cyan-100 text-sm">Famous mud baths at Lo Pagán used for centuries for skin and joint therapy.</p>
                </div>
              </div>
            </div>

            {/* Beach Properties */}
            {beachProperties.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beachProperties.slice(0, 6).map(dev => (
                  <Link key={dev.slug} href={`/developments/${dev.slug}`}
                    className="group bg-white border border-warm-200 rounded-xl overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative h-48 bg-warm-200">
                      <Image src={dev.images[0] || FALLBACK_IMAGE} alt={dev.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                      <div className="absolute top-3 left-3">
                        <span className="bg-cyan-600 text-white text-xs font-bold px-2 py-1 rounded">Mar Menor</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-primary-900 mb-1 group-hover:text-accent-600 transition-colors">{dev.name}</h4>
                      <p className="text-warm-500 text-sm mb-2">{dev.town}</p>
                      {dev.priceFrom && <p className="text-accent-600 font-bold">From {formatPrice(dev.priceFrom)}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center border border-warm-200">
                <p className="text-4xl mb-4">🏖️</p>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Beach Properties Coming</h3>
                <p className="text-warm-600 mb-4">New beach developments are added regularly. Register your interest to be notified.</p>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-medium">
                  Register Interest
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
                Best Value
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Inland <span className="font-semibold">Properties</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Torre Pacheco, Fuente Álamo, and surrounding areas. Best value with beaches and golf still within 20 minutes.
            </p>

            {/* Inland Areas */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { name: 'Torre Pacheco', desc: 'Agricultural town near Mar Menor', distance: '15 min to beach' },
                { name: 'Fuente Álamo', desc: 'Hacienda del Álamo golf resort', distance: '30 min to beach' },
                { name: 'Sucina', desc: 'Near Peraleja Golf', distance: '15 min to beach' },
                { name: 'Cartagena', desc: 'Historic port city', distance: '10 min to beach' },
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inlandProperties.slice(0, 6).map(dev => (
                  <Link key={dev.slug} href={`/developments/${dev.slug}`}
                    className="group bg-white border border-warm-200 rounded-xl overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative h-48 bg-warm-200">
                      <Image src={dev.images[0] || FALLBACK_IMAGE} alt={dev.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                      <div className="absolute top-3 left-3">
                        <span className="bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded">Best Value</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-primary-900 mb-1 group-hover:text-accent-600 transition-colors">{dev.name}</h4>
                      <p className="text-warm-500 text-sm mb-2">{dev.town}</p>
                      {dev.priceFrom && <p className="text-accent-600 font-bold">From {formatPrice(dev.priceFrom)}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-warm-50 rounded-xl p-8 text-center border border-warm-200">
                <p className="text-warm-600">Contact us for the latest inland property options in Costa Cálida.</p>
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
                  Premium Selection
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Luxury <span className="font-semibold">Properties €800K+</span>
              </h2>
              <p className="text-warm-600 mb-8">
                Premium villas and exclusive developments in Costa Cálida's finest locations.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {luxuryProperties.slice(0, 4).map(dev => (
                  <Link key={dev.slug} href={`/developments/${dev.slug}`}
                    className="group bg-white border border-warm-200 rounded-xl overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative h-64 bg-warm-200">
                      <Image src={dev.images[0] || FALLBACK_IMAGE} alt={dev.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                      <div className="absolute top-3 left-3">
                        <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded">
                          ✨ Luxury
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-xl font-semibold text-primary-900 mb-1 group-hover:text-accent-600 transition-colors">{dev.name}</h4>
                      <p className="text-warm-500 text-sm mb-3">{dev.town}</p>
                      {dev.priceFrom && <p className="text-accent-600 font-bold text-lg">From {formatPrice(dev.priceFrom)}</p>}
                    </div>
                  </Link>
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
                  Ready to Explore Costa Cálida?
                </h2>
                <p className="text-warm-300 leading-relaxed mb-6">
                  Whether you're looking for golf resort living, Mar Menor beach access, or the best value in Spain,
                  we'll help you find the perfect property in Costa Cálida.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Free property matching</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Local expertise</span>
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
                    <span className="text-warm-200 text-sm">Viewing trips arranged</span>
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
              <div className="bg-white rounded-xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-primary-900 mb-1">Get Costa Cálida Properties</h3>
                <p className="text-warm-500 text-sm mb-5">We'll send you matching properties from {formatPrice(lowestPrice || 170000)}</p>
                <LeadForm propertyInterest="Costa Cálida property" formName="costa-calida-inquiry" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
