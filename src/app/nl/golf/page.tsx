import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  GOLF_COURSES,
  GolfCourse,
  getCoursesByPropertyCount,
  getTotalGolfProperties,
} from '@/lib/golf-courses';

export const metadata: Metadata = {
  title: 'Golf op Costa Blanca & Murcia | 22 Golfbanen, 100+ Villa\'s',
  description: 'Vind nieuwe huizen in de buurt van 22 golfbanen op Costa Blanca en Murcia. La Sella, Jávea, Las Colinas, Serena Golf. Golf-levensstijl vanaf €120.000.',
  openGraph: {
    title: 'Golf op Costa Blanca & Murcia | Nieuwe villa\'s bij golfbanen',
    description: 'Nieuwe huizen bij golfbanen op Costa Blanca en Murcia vanaf €150.000.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/nl/golf',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf op Costa Blanca & Murcia | Nieuwe villa\'s bij golfbanen',
    description: 'Vind nieuwe huizen bij golfbanen op Costa Blanca en Murcia vanaf €150.000.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl/golf',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/golf',
      'nl': 'https://newbuildhomescostablanca.com/nl/golf',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

// Dutch golf benefits
const golfBenefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Sterke wederverkoop',
    description: 'Golfpanden overtreffen de marktdoorsnee. Beperkt aanbod op gevestigde banen stimuleert waardegroei.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Premium Omgeving',
    description: 'Golfresorts worden onderhouden volgens hoge standaarden. Tuinarchitectuur, veiligheid en faciliteiten zijn typisch uitmuntend.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Golfgemeenschap',
    description: 'Golfresorts trekken gelijkgestemde internationale bewoners aan. Golfclubs, toernooien en evenementen creëren vriendschappen.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Huuropbrengsten',
    description: 'Golftoeristen zoeken kwaliteitsaccommodatie dicht bij banen. Lange seizoen (sep-jun) geeft sterke vraag en 4-6% rendement.',
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function GolfCourseCard({ course }: { course: GolfCourse }) {
  return (
    <Link
      href={`/nl/golf/${course.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-warm-200"
    >
      <div className={`relative h-64 bg-gradient-to-br ${course.gradient}`}>
        {course.image && (
          <Image
            src={course.image}
            alt={course.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        )}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <div className="flex gap-2 flex-wrap">
            <span className="bg-primary-900/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {course.holes} Holes · Par {course.par}
            </span>
          </div>
          <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {course.propertyCount} Villa\'s
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
          <h3 className="text-xl font-bold text-white group-hover:text-accent-300 transition-colors">
            {course.name}
          </h3>
          <p className="text-warm-300 text-sm flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {course.town}, {course.regionDisplay}
          </p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-warm-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {course.story}
        </p>
        {course.designer && (
          <p className="text-warm-500 text-sm mb-4">
            Ontworpen door <span className="font-semibold text-primary-900">{course.designer}</span> · Geopend {course.yearOpened}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mb-5">
          {course.highlights.slice(0, 4).map((h) => (
            <span key={h} className="bg-warm-100 text-warm-700 text-xs px-2.5 py-1 rounded-full">{h}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-warm-100">
          <div>
            <p className="text-warm-500 text-xs">Vanaf</p>
            <p className="text-accent-600 font-bold text-xl">{formatPrice(course.priceFrom)}</p>
          </div>
          <span className="bg-primary-900 group-hover:bg-accent-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2">
            Bekijk villa\'s
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function GolfPageNL() {
  const coursesWithImages = GOLF_COURSES.map(course => ({
    ...course,
    image: course.image,
  }));

  const southCourses = coursesWithImages.filter(c => c.region === 'south');
  const murciaCourses = coursesWithImages.filter(c => c.region === 'murcia');
  const northCourses = coursesWithImages.filter(c => c.region === 'north');
  const almeriaCourses = coursesWithImages.filter(c => c.region === 'almeria');

  const featuredCourse = coursesWithImages.find(c => c.slug === 'las-colinas-golf') || coursesWithImages[0];
  const totalProperties = getTotalGolfProperties();

  return (
    <main className="min-h-screen bg-warm-50 pb-20 lg:pb-0">
      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary-900 border-t border-primary-700 z-50 lg:hidden">
        <div className="flex">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <a
            href="#inquiry"
            className="flex-1 flex items-center justify-center gap-2 bg-accent-500 text-white py-4 font-medium"
          >
            Bekijk villa\'s
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-600/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6">
          <nav className="text-warm-400 text-sm mb-6">
            <Link href="/nl" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Golfpanden</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Golf Lifestyle</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
              Leef de <span className="font-semibold">golfdromen</span> in Spanje
            </h1>

            <p className="text-warm-200 text-lg leading-relaxed mb-8">
              Ontwaak met uitzicht op fairways, speel wereldklasse banen en geniet van jaarrondse Middellandse Zee-zon. We hebben {totalProperties} nieuwe villa\'s geselecteerd dicht bij {GOLF_COURSES.length} golfresorts op Costa Blanca, Murcia en Almería.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{GOLF_COURSES.length}</div>
                <div className="text-warm-400 text-sm">Golfbanen</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{totalProperties}+</div>
                <div className="text-warm-400 text-sm">Villa\'s</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">€150k</div>
                <div className="text-warm-400 text-sm">Vanaf</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">300+</div>
                <div className="text-warm-400 text-sm">Zonnige dagen/jaar</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Vraag naar golfvilla\'s
              </a>
              <Link href="#courses" className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                Bekijk banen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Buy Golf */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-10 h-px bg-primary-900" />
              <span className="text-primary-900 text-xs font-medium tracking-widest uppercase">
                Waarom golfpanden?
              </span>
              <div className="w-10 h-px bg-primary-900" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Waarom kopen bij een golfbaan?
            </h2>
            <p className="text-warm-600 max-w-2xl mx-auto">
              Ver voorbij de levensstijl bieden golfpanden overtuigende investeringsvoordelen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {golfBenefits.map((benefit, i) => (
              <div key={i} className="bg-warm-50 rounded-xl p-6 border border-warm-200">
                <div className="text-accent-500 mb-4">{benefit.icon}</div>
                <h3 className="font-semibold text-primary-900 mb-2">{benefit.title}</h3>
                <p className="text-warm-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Costa Blanca South */}
      {southCourses.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                Hoofdregio
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Costa Blanca <span className="font-semibold">Zuid</span>
            </h2>
            <p className="text-warm-600 mb-8">
              {southCourses.length} gevestigde golfbanen in het hart van Spaanse golftourisme. Uitstekende bereikbaarheid en waarde.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {southCourses.map((course) => (
                <GolfCourseCard key={course.slug} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Costa Cálida */}
      {murciaCourses.length > 0 && (
        <section id="costa-calida" className="py-14 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                Beste Waardeverhouden
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Costa <span className="font-semibold">Cálida</span> (Murcia)
            </h2>
            <p className="text-warm-600 mb-8">
              {murciaCourses.length} golfbanen met uitstekende waardevilla\'s dicht bij de Mar Menor-lagune.
              <Link href="/nl/areas/costa-calida" className="text-accent-600 hover:underline ml-1">
                Verken Costa Cálida →
              </Link>
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {murciaCourses.map((course) => (
                <GolfCourseCard key={course.slug} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Costa Blanca North */}
      {northCourses.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                Premium Regio
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Costa Blanca <span className="font-semibold">Noord</span>
            </h2>
            <p className="text-warm-600 mb-8">
              {northCourses.length} golfbanen van Alicante naar Dénia - ontworpen door Olazábal, Nicklaus en Ballesteros. Premium villa\'s dicht bij Jávea, Altea, Calpe en Finestrat.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {northCourses.map((course) => (
                <GolfCourseCard key={course.slug} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Almería */}
      {almeriaCourses.length > 0 && (
        <section className="py-14 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                Uniek Iets
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              <span className="font-semibold">Almería</span> — Woestijngolf
            </h2>
            <p className="text-warm-600 mb-8">
              {almeriaCourses.length} unieke banen in ongerepte Almería. Van Europas enige woestijnbaan tot dramatische berg-en-zee-layouts.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {almeriaCourses.map((course) => (
                <GolfCourseCard key={course.slug} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 bg-primary-900" id="inquiry">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Aan de slag
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                Vind je perfecte golfvilla
              </h2>
              <p className="text-warm-300 leading-relaxed mb-6">
                Of je wilt fairway-uitzicht, een compacte flat of een grote villa voor vakantie, we helpen je de juiste pand op de juiste baan te vinden.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-warm-200 text-sm">15+ jaar ervaring</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-warm-200 text-sm">{GOLF_COURSES.length} banen afgedekt</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-warm-200 text-sm">Geen kopersmakelaarsloon</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-warm-200 text-sm">Deskundig advies</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Neem contact op
                </a>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors border border-white/20"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-xl">
              <h3 className="text-xl font-semibold text-primary-900 mb-1">Ontvang golfmatches</h3>
              <p className="text-warm-500 text-sm mb-5">We sturen je villa&apos;s die aan je eisen voldoen</p>
              <form
                name="golf-inquiry-nl"
                method="POST"
                data-netlify="true"
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="golf-inquiry-nl" />
                <input type="hidden" name="source" value="golf-nl" />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Naam *"
                    className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefoon"
                    className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="E-mail *"
                  className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="budget"
                    className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
                  >
                    <option value="">Budget</option>
                    <option value="under-200k">Onder €200k</option>
                    <option value="200k-350k">€200k - €350k</option>
                    <option value="350k-500k">€350k - €500k</option>
                    <option value="500k+">€500k+</option>
                  </select>
                  <select
                    name="property-type"
                    className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
                  >
                    <option value="">Soort woning</option>
                    <option value="apartment">Appartement</option>
                    <option value="townhouse">Rijtjeshuis</option>
                    <option value="villa">Villa</option>
                    <option value="any">Doet er niet toe</option>
                  </select>
                </div>

                <textarea
                  name="message"
                  rows={3}
                  placeholder="Eventuele bijzondere wensen? (bijv. voorkeur banen, slaapkamers, uitzicht)"
                  className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                />

                <button
                  type="submit"
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Stuur verzoek
                </button>

                <p className="text-xs text-warm-400 text-center">
                  We reageren binnen 2 uur • Geen verplichting
                </p>
              </form>
            </div>
          </div>
        </div>
        </section>
    </main>
  );
}
