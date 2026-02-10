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
  description: 'Vind nieuwe huizen in de buurt van 22 golfbanen op Costa Blanca en Murcia. La Sella, Jávea, Las Colinas, Serena Golf. Golf-levensstijl vanaf €120.000. Belgische expertise.',
  openGraph: {
    title: 'Golf op Costa Blanca & Murcia | Nieuwe villa\'s bij golfbanen',
    description: 'Nieuwe huizen bij golfbanen op Costa Blanca en Murcia vanaf €150.000.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/nl-be/golf',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf op Costa Blanca & Murcia | Nieuwe villa\'s bij golfbanen',
    description: 'Vind nieuwe huizen bij golfbanen op Costa Blanca en Murcia vanaf €150.000.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/golf',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/golf',
      'sv': 'https://newbuildhomescostablanca.com/sv/golf',
      'nl': 'https://newbuildhomescostablanca.com/nl/golf',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/golf',
      'fr': 'https://newbuildhomescostablanca.com/fr/golf',
      'no': 'https://newbuildhomescostablanca.com/no/golf',
      'x-default': 'https://newbuildhomescostablanca.com/golf',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

const golfBenefits = [
  {
    title: 'Sterke Wederverkoop',
    description: 'Golfpanden overtreffen de marktdoorsnee. Beperkt aanbod stimuleert waardegroei.',
  },
  {
    title: 'Premium Omgeving',
    description: 'Golfresorts worden onderhouden volgens hoge standaarden met perfecte tuinen.',
  },
  {
    title: 'Golfgemeenschap',
    description: 'Golfresorts trekken gelijkgestemde internationale bewoners aan met gedeelde interesses.',
  },
  {
    title: 'Huuropbrengsten',
    description: 'Golftoeristen zoeken kwaliteitsaccommodatie dicht bij banen. 4-6% rendement.',
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function GolfCourseCard({ course }: { course: GolfCourse }) {
  return (
    <Link
      href={`/nl-be/golf/${course.slug}`}
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
            {course.propertyCount} Villa's
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
            Bekijk villa's
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function BEGolfPage() {
  const courses = getCoursesByPropertyCount();
  const totalProps = getTotalGolfProperties();

  return (
    <main className="min-h-screen bg-warm-50">
      {/* Hero */}
      <section className="relative bg-primary-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
              Golf op <span className="font-semibold">Costa Blanca</span>
            </h1>
            <p className="text-warm-300 text-lg max-w-2xl mx-auto">
              {courses.length} golfbanen, {totalProps} villa's. Vind je perfecte golfproperty.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-400 mb-2">{courses.length}</div>
              <div className="text-warm-300">Golfbanen</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-400 mb-2">{totalProps}</div>
              <div className="text-warm-300">Golf Villa's</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-400 mb-2">4-6%</div>
              <div className="text-warm-300">Jaarrendement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Golf */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light text-primary-900 mb-10 text-center">
            Waarom <span className="font-semibold">Golfinvesteringen?</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {golfBenefits.map((benefit) => (
              <div key={benefit.title} className="bg-warm-50 p-6 rounded-sm border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">{benefit.title}</h3>
                <p className="text-warm-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Golf Courses */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light text-primary-900 mb-10 text-center">
            Beschikbare <span className="font-semibold">Golfbanen</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <GolfCourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-light text-white mb-4">
            Klaar om je <span className="font-semibold">golfproperty te vinden?</span>
          </h2>
          <p className="text-warm-300 mb-8">Neem contact op voor advies over de beste golfwoningen voor jou.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/nl-be/contact"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all"
            >
              Neem Contact Op
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
