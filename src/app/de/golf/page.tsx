import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  GOLF_COURSES,
  GolfCourse,
  getGolfCoursesByRegion,
  getTotalGolfProperties,
  getCoursesByPropertyCount,
} from '@/lib/golf-courses';
import { getBlogPostsByTag } from '@/lib/blog-area-mapping';
import { breadcrumbSchema, toJsonLd, faqSchema } from '@/lib/schema';

const GOLF_COURSE_IMAGES: Record<string, string> = {
  'campoamor-golf': '/images/Drone 2/Golf/Campoamor Golf (1).jpg',
  'villamartin-golf': '/images/Drone 2/Golf/Villa Martin Golf.jpg',
  'las-colinas-golf': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=500&fit=crop',
  'las-ramblas-golf': 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=500&fit=crop',
  'la-finca-golf': 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&h=500&fit=crop',
  'vistabella-golf': 'https://images.unsplash.com/photo-1624722610740-71fa0eb2cd5b?w=800&h=500&fit=crop',
  'la-marquesa-golf': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=500&fit=crop',
  'lo-romero-golf': 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=500&fit=crop',
  'aguilon-golf': 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&h=500&fit=crop',
  'serena-golf': 'https://images.unsplash.com/photo-1624722610740-71fa0eb2cd5b?w=800&h=500&fit=crop',
  'hacienda-del-alamo': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=500&fit=crop',
  'roda-golf': 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=500&fit=crop',
  'peraleja-golf': 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&h=500&fit=crop',
  'altorreal-golf': 'https://images.unsplash.com/photo-1624722610740-71fa0eb2cd5b?w=800&h=500&fit=crop',
  'puig-campana-golf': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=500&fit=crop',
  'desert-springs': 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=500&fit=crop',
  'la-sella-golf': 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&h=500&fit=crop',
  'javea-golf': 'https://images.unsplash.com/photo-1624722610740-71fa0eb2cd5b?w=800&h=500&fit=crop',
  'ifach-golf': 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=500&fit=crop',
  'bernia-golf': 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=500&fit=crop',
  'bonalba-golf': 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&h=500&fit=crop',
  'alicante-golf': 'https://images.unsplash.com/photo-1624722610740-71fa0eb2cd5b?w=800&h=500&fit=crop',
};

function getCoursesWithImages(): GolfCourse[] {
  return GOLF_COURSES.map(course => ({
    ...course,
    image: GOLF_COURSE_IMAGES[course.slug] || course.image,
  }));
}

export const metadata: Metadata = {
  title: 'Golf Immobilien Costa Blanca & Murcia | 22 Plätze, 100+ Immobilien',
  description: 'Finden Sie Neubautenhäuser in der Nähe von 22 Golfplätzen an der Costa Blanca Nord, Süd und Murcia. Von La Sella und Jávea zu Las Colinas und Serena Golf. Golf-Lifestyle ab 120.000 €.',
  openGraph: {
    title: 'Golf Immobilien Costa Blanca & Murcia',
    description: 'Neubautenhäuser an Golf Resorts Costa Blanca und Murcia. Golf-Lifestyle ab 150.000 €.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/de/golf',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Immobilien Costa Blanca & Murcia | Neubauten',
    description: 'Finden Sie Neubautenhäuser an Golfplätzen in Costa Blanca und Murcia ab 150.000 €.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de/golf',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/golf',
      'sv': 'https://newbuildhomescostablanca.com/sv/golf',
      'nl': 'https://newbuildhomescostablanca.com/nl/golf',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/golf',
      'fr': 'https://newbuildhomescostablanca.com/fr/golf',
      'no': 'https://newbuildhomescostablanca.com/no/golf',
      'de': 'https://newbuildhomescostablanca.com/de/golf',
      'pl': 'https://newbuildhomescostablanca.com/pl/golf',
      'ru': 'https://newbuildhomescostablanca.com/ru/golf',
      'x-default': 'https://newbuildhomescostablanca.com/golf',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

const golfFaqs = [
  {
    question: 'Was sind die besten Golfresorts zum Immobilienkauf an Costa Blanca und Murcia?',
    answer: 'Für Vielfalt und Wert bietet Serena Golf in der Nähe von Los Alcázares die meisten Neubauoptionen mit über 34 Immobilien. La Finca in Algorfa und Vistabella bieten hervorragende Plätze mit Entwicklungen ab 120.000 €. Für Premium-Golf sind Las Colinas (Top 10 in Spanien), La Sella in der Nähe von Dénia (27 Löcher, Olazábal-Design, Marriott-Resort) und Villaitana in Finestrat (36 Löcher, Nicklaus- und Ballesteros-Design) außergewöhnlich. Im Jávea-Calpe-Korridor bieten Club de Golf Jávea und Club de Golf Ifach charmante Plätze in den gefragtesten Gegenden.',
  },
  {
    question: 'Wie viel kostet eine Golfimmobilie an der Costa Blanca?',
    answer: 'Neue Golfimmobilien kosten ab etwa 150.000 € für Apartments in La Finca oder La Marquesa. Die meisten Entwicklungen liegen zwischen 180.000-350.000 €. Premium-Plätze wie Altorreal und Villaitana haben Villen ab 350.000 €+.',
  },
  {
    question: 'Muss ich Mitglied sein, um Golf zu spielen, wenn ich auf einem Resort wohne?',
    answer: 'Die meisten Golfplätze bieten Vorzugspreise für Immobilieneigner, aber die Mitgliedschaft ist normalerweise optional. Kontaktieren Sie uns für spezifische Details zu jedem Resort - die Vereinbarungen unterscheiden sich zwischen den Plätzen.',
  },
  {
    question: 'Kann ich meine Golfimmobilie vermieten, wenn ich sie nicht nutze?',
    answer: 'Ja, Golfimmobilien sind beliebte Mietobjekte, besonders während der erweiterten Saison (September bis Juni). Plätze wie Serena Golf und Roda Golf in der Nähe des Mar Menor ziehen das ganze Jahr über Golfer an. Mit professionellem Management sind Mietrenditen von 4-6% erreichbar.',
  },
  {
    question: 'Was ist die Golfsaison an der Costa Blanca und Murcia?',
    answer: 'Die Region hat dank des Mittelmeerklimas das ganze Jahr über Golf mit über 300 Sonnentagen pro Jahr. Die Hauptsaison läuft von September bis Juni, mit ruhigeren Sommermonaten wegen der Hitze. Viele Plätze bieten ermäßigte Sommerpreise.',
  },
  {
    question: 'Welcher Golfplatz hat die meisten Neubauoptionen?',
    answer: 'Serena Golf in der Nähe von Los Alcázares hat derzeit die meisten Neubauimmobilien mit mehreren Entwicklungen von Bauträgern wie Grupo Vermell, AMAL und anderen. La Finca in Algorfa bietet auch ein starkes Angebot mit mehreren laufenden Entwicklungen.',
  },
  {
    question: 'Welche berühmten Designer haben Plätze an der Costa Blanca entworfen?',
    answer: 'Die Costa Blanca verfügt über eine beeindruckende Sammlung von Designer-Plätzen. Jack Nicklaus und Severiano Ballesteros entwarfen die zwei Plätze in Villaitana (Finestrat). José María Olazábal entwarf die 27 Löcher von La Sella in der Nähe von Dénia. Ballesteros entwarf auch Alicante Golf. Der Ryder Cup-Kapitän Manuel Piñero entwarf Vistabella und Aguilón. Cabell B. Robinson entwarf das preisgekrönte Las Colinas. Dave Thomas entwarf mehrere Murcia-Plätze, einschließlich Serena Golf und Hacienda del Álamo.',
  },
];

const golfBenefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Starker Wiederverkaufswert',
    description: 'Golfimmobilien übertreffen den breiteren Markt kontinuierlich. Begrenzte Angebote auf etablierten Plätzen treiben Wertsteigerung.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Hochwertige Umgebungen',
    description: 'Golfresorts werden nach hohen Standards gepflegt. Landschaftsbau, Sicherheit und Gemeinschaftseinrichtungen sind typischerweise hervorragend.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Fertige Gemeinschaft',
    description: 'Golfresorts ziehen gleichgesinnte internationale Bewohner an. Clubs, Turniere und Veranstaltungen schaffen sofortige Freundschaften.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Mieteinnahmen',
    description: 'Golftouristen suchen qualitativ hochwertige Unterkunft in der Nähe von Plätzen. Die erweiterte Saison (Sep-Juni) bietet starke Mietanfrage.',
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function getTierBadge(tier: GolfCourse['tier']) {
  switch (tier) {
    case 'premium':
      return <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-2 py-1 rounded">Premium</span>;
    case 'popular':
      return <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">Beliebt</span>;
    case 'unique':
      return <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">Einzigartig</span>;
    default:
      return null;
  }
}

function GolfCourseCard({ course }: { course: GolfCourse }) {
  return (
    <Link
      href={`/golf/${course.slug}`}
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
              {course.holes} Löcher · Par {course.par}
            </span>
            {getTierBadge(course.tier)}
          </div>
          <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {course.propertyCount} Immobilien
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
            Entworfen von <span className="font-semibold text-primary-900">{course.designer}</span> · Est. {course.yearOpened}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-5">
          {course.highlights.slice(0, 4).map((h) => (
            <span key={h} className="bg-warm-100 text-warm-700 text-xs px-2.5 py-1 rounded-full">{h}</span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-warm-100">
          <div>
            <p className="text-warm-500 text-xs">Immobilien ab</p>
            <p className="text-accent-600 font-bold text-xl">{formatPrice(course.priceFrom)}</p>
          </div>
          <span className="bg-primary-900 group-hover:bg-accent-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2">
            Immobilien Ansehen
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeaturedCourseHero({ course }: { course: GolfCourse }) {
  return (
    <div className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-50`} />
      </div>

      <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Ausgewählter Kurs
            </span>
            <span className="bg-success-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {course.propertyCount} Immobilien Verfügbar
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {course.name}
          </h2>

          <p className="text-warm-200 text-lg mb-6 leading-relaxed">
            {course.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-warm-300 text-sm">Platz</p>
              <p className="text-white font-semibold">{course.holes} Löcher · Par {course.par}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-warm-300 text-sm">Designer</p>
              <p className="text-white font-semibold">{course.designer || 'Verschiedene'}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-warm-300 text-sm">Standort</p>
              <p className="text-white font-semibold">{course.town}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-warm-300 text-sm">Immobilien Ab</p>
              <p className="text-accent-400 font-bold text-lg">{formatPrice(course.priceFrom)}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {course.highlights.map((h) => (
              <span key={h} className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">{h}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/golf/${course.slug}`}
              className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              Immobilien Ansehen {course.shortName}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Fragen zu {course.shortName}
            </a>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="bg-white rounded-xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-primary-900 mb-1">Warum {course.shortName}?</h3>
            <p className="text-warm-500 text-sm mb-5">{course.story}</p>

            {course.amenities && (
              <div className="mb-5">
                <h4 className="text-sm font-medium text-primary-900 mb-2">Resort-Einrichtungen</h4>
                <div className="flex flex-wrap gap-2">
                  {course.amenities.slice(0, 6).map((a) => (
                    <span key={a} className="bg-warm-100 text-warm-700 text-xs px-2 py-1 rounded">{a}</span>
                  ))}
                </div>
              </div>
            )}

            {course.builders && course.builders.length > 0 && (
              <div className="mb-5">
                <h4 className="text-sm font-medium text-primary-900 mb-2">Aktive Bauträger</h4>
                <div className="flex flex-wrap gap-2">
                  {course.builders.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/builders/${b.slug}`}
                      className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded hover:bg-primary-200 transition-colors"
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-warm-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-warm-500 text-xs">Immobilien ab</p>
                  <p className="text-accent-600 font-bold text-xl">{formatPrice(course.priceFrom)}</p>
                </div>
                <Link
                  href={`/golf/${course.slug}`}
                  className="bg-primary-900 hover:bg-primary-800 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
                >
                  Alle Ansehen →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GolfPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Startseite', url: 'https://newbuildhomescostablanca.com/de/' },
    { name: 'Golf Immobilien', url: 'https://newbuildhomescostablanca.com/de/golf/' },
  ]);

  const faqSchemaData = faqSchema(golfFaqs);
  const coursesWithImages = getCoursesWithImages();
  const southCourses = coursesWithImages.filter(c => c.region === 'south');
  const murciaCourses = coursesWithImages.filter(c => c.region === 'murcia');
  const northCourses = coursesWithImages.filter(c => c.region === 'north');
  const almeriaCourses = coursesWithImages.filter(c => c.region === 'almeria');
  const featuredCourse = coursesWithImages.find(c => c.slug === 'las-colinas-golf') || coursesWithImages[0];
  const totalProperties = getTotalGolfProperties();
  const golfArticles = getBlogPostsByTag('golf', 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />

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
            Golf Immobilie Finden
          </a>
        </div>
      </div>

      <main className="min-h-screen bg-warm-50 pb-20 lg:pb-0">
        <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-600/10 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/de" className="hover:text-white transition-colors">Startseite</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Golf Immobilien</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Golf Lifestyle</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
                Erleben Sie das <span className="font-semibold">Golf Paradies</span> in Spanien
              </h1>

              <p className="text-warm-200 text-lg leading-relaxed mb-8">
                Wachen Sie mit Fairway-Blick auf, spielen Sie auf Weltklasse-Plätzen und genießen Sie das ganze Jahr über mediterrane Sonne.
                Wir haben <strong className="text-white">{totalProperties} Neubau-Immobilien</strong> auf <strong className="text-white">{GOLF_COURSES.length} Golfplätzen</strong> an
                der Costa Blanca, Murcia und Almería ausgewählt.
              </p>

              <div className="flex flex-wrap gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{GOLF_COURSES.length}</div>
                  <div className="text-warm-400 text-sm">Golfplätze</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{totalProperties}+</div>
                  <div className="text-warm-400 text-sm">Immobilien</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">150k€</div>
                  <div className="text-warm-400 text-sm">Ab</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">300+</div>
                  <div className="text-warm-400 text-sm">Sonnentage/Jahr</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Fragen zu Golf Immobilien
                </a>
                <Link href="#courses" className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                  Plätze Durchsuchen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-primary-900" />
                <span className="text-primary-900 text-xs font-medium tracking-widest uppercase">
                  Die Kluge Wahl
                </span>
                <div className="w-10 h-px bg-primary-900" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Warum auf einem Golfplatz kaufen?
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                Über den Lifestyle hinaus bieten Golfimmobilien überzeugende Investitionsvorteile.
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

        <section className="py-14 bg-warm-100" id="courses">
          <div className="max-w-7xl mx-auto px-6">
            <FeaturedCourseHero course={featuredCourse} />
          </div>
        </section>

        {southCourses.length > 0 && (
          <section className="py-14 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                  Unsere Hauptregion
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Costa Blanca <span className="font-semibold">Süd</span>
              </h2>
              <p className="text-warm-600 mb-8">
                {southCourses.length} etablierte Golfplätze im Herzen des spanischen Golf-Tourismus. Ausgezeichnete Erreichbarkeit und Wert.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {southCourses
                  .filter(c => c.slug !== featuredCourse.slug)
                  .map((course) => (
                    <GolfCourseCard key={course.slug} course={course} />
                  ))}
              </div>
            </div>
          </section>
        )}

        {murciaCourses.length > 0 && (
          <section id="costa-calida" className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                  Beste Wert Region
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Costa <span className="font-semibold">Cálida</span> (Murcia)
              </h2>
              <p className="text-warm-600 mb-8">
                {murciaCourses.length} Golfplätze mit ausgezeichneten Neubau-Immobilien in der Nähe der Mar Menor-Lagune.
                <Link href="/properties" className="text-accent-600 hover:underline ml-1">
                  Costa Cálida Erkunden →
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

        {northCourses.length > 0 && (
          <section className="py-14 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                  Premium Region
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Costa Blanca <span className="font-semibold">Nord</span>
              </h2>
              <p className="text-warm-600 mb-8">
                {northCourses.length} Golfplätze von Alicante bis Dénia — Olazábal-, Nicklaus- und Ballesteros-Designs in Spaniens prestigereichster Küstenregion. Premium-Immobilien bei Jávea, Altea, Calpe und Finestrat.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {northCourses.map((course) => (
                  <GolfCourseCard key={course.slug} course={course} />
                ))}
              </div>
            </div>
          </section>
        )}

        {almeriaCourses.length > 0 && (
          <section className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                  Etwas Anderes
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                <span className="font-semibold">Almería</span> — Wüsten Golf
              </h2>
              <p className="text-warm-600 mb-8">
                {almeriaCourses.length} einzigartige Plätze in der unberührten Provinz Almería. Vom einzigen Wüstenkurs Europas bis zu dramatischen Berg-Meer-Layouts — für Käufer, die etwas wirklich Anderes suchen.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {almeriaCourses.map((course) => (
                  <GolfCourseCard key={course.slug} course={course} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-14 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Schnelle <span className="font-semibold">Vergleich</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Alle {GOLF_COURSES.length} Plätze auf einen Blick - sortiert nach Anzahl verfügbarer Immobilien.
            </p>

            <div className="bg-white rounded-xl border border-warm-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary-900 text-white">
                      <th className="px-4 py-3 text-left font-medium">Platz</th>
                      <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Region</th>
                      <th className="px-4 py-3 text-center font-medium">Löcher</th>
                      <th className="px-4 py-3 text-center font-medium">Immobilien</th>
                      <th className="px-4 py-3 text-right font-medium">Ab</th>
                      <th className="px-4 py-3 text-center font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCoursesByPropertyCount().map((course, i) => (
                      <tr key={course.slug} className={i % 2 === 0 ? 'bg-white' : 'bg-warm-50'}>
                        <td className="px-4 py-3">
                          <Link href={`/golf/${course.slug}`} className="font-medium text-primary-900 hover:text-accent-600 transition-colors">
                            {course.shortName}
                          </Link>
                          <p className="text-warm-500 text-xs md:hidden">{course.regionDisplay}</p>
                        </td>
                        <td className="px-4 py-3 text-warm-600 hidden md:table-cell">{course.regionDisplay}</td>
                        <td className="px-4 py-3 text-center text-warm-700">{course.holes}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="bg-success-100 text-success-700 font-medium px-2 py-1 rounded text-xs">
                            {course.propertyCount}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-accent-600">{formatPrice(course.priceFrom)}</td>
                        <td className="px-4 py-3 text-center">
                          <Link
                            href={`/golf/${course.slug}`}
                            className="text-accent-600 hover:text-accent-700 font-medium"
                          >
                            Ansehen →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-white" id="faqs">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-primary-700" />
                <span className="text-primary-700 text-xs font-medium tracking-widest uppercase">
                  Allgemeine Fragen
                </span>
                <div className="w-10 h-px bg-primary-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                Golf Immobilien FAQs
              </h2>
            </div>

            <div className="space-y-3">
              {golfFaqs.map((faq, i) => (
                <details key={i} className="group bg-warm-50 border border-warm-200 rounded-lg overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-primary-900 hover:bg-warm-100 transition-colors">
                    {faq.question}
                    <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-warm-700 border-t border-warm-200 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary-900" id="inquiry">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                    Beginnen Sie
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                  Finden Sie Ihre Perfekte Golf Immobilie
                </h2>
                <p className="text-warm-300 leading-relaxed mb-6">
                  Ob Sie eine Frontlage mit Fairway-Blick, eine kleine Pied-à-terre oder eine geräumige Villa für Familienurlaub wünschen,
                  wir helfen Ihnen, die richtige Immobilie auf dem richtigen Platz zu finden.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">15+ Jahre Erfahrung</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">{GOLF_COURSES.length} Plätze abgedeckt</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Keine Käufergebühren</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Fachberatung</span>
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
                    Kontaktiere Uns Via WhatsApp
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
                <h3 className="text-xl font-semibold text-primary-900 mb-1">Erhalten Sie Passende Immobilien</h3>
                <p className="text-warm-500 text-sm mb-5">Wir senden Ihnen Immobilien, die Ihren Kriterien entsprechen</p>
                <form
                  name="golf-inquiry-footer"
                  method="POST"
                  data-netlify="true"
                  className="space-y-4"
                >
                  <input type="hidden" name="form-name" value="golf-inquiry-footer" />
                  <input type="hidden" name="source" value="golf-footer" />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Name *"
                      className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Telefon"
                      className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="E-Mail Adresse *"
                    className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <select
                      name="budget"
                      className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
                    >
                      <option value="">Budget</option>
                      <option value="under-200k">Unter 200k€</option>
                      <option value="200k-350k">200k€ - 350k€</option>
                      <option value="350k-500k">350k€ - 500k€</option>
                      <option value="500k+">500k€+</option>
                    </select>
                    <select
                      name="property-type"
                      className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
                    >
                      <option value="">Immobilientyp</option>
                      <option value="apartment">Apartment</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="villa">Villa</option>
                      <option value="any">Irgendein</option>
                    </select>
                  </div>

                  <select
                    name="course"
                    className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
                  >
                    <option value="">Bevorzugter Platz (optional)</option>
                    {getCoursesByPropertyCount().map(c => (
                      <option key={c.slug} value={c.slug}>{c.shortName} ({c.propertyCount} Immobilien)</option>
                    ))}
                    <option value="no-preference">Keine Vorlieben - Beraten Sie mich</option>
                  </select>

                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Spezifische Anforderungen? (z.B. bevorzugte Plätze, Zimmer, Aussichten)"
                    className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    Anforderungen Senden
                  </button>

                  <p className="text-xs text-warm-400 text-center">
                    Wir antworten innerhalb von 2 Stunden • Ohne Verpflichtung
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {golfArticles.length > 0 && (
          <section className="py-12 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Golf Leitfäden & <span className="font-semibold">Ressourcen</span>
              </h2>
              <p className="text-warm-600 mb-8">
                Experten-Einblicke und praktische Leitfäden für Golf-Lifestyle-Leben in Spanien
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {golfArticles.map((article) => (
                  <a
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="bg-white rounded-lg border border-warm-200 p-6 hover:shadow-lg hover:border-accent-500 transition-all group"
                  >
                    <span className="text-xs font-medium text-accent-600 uppercase tracking-wider">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-semibold text-primary-900 mt-3 line-clamp-2 group-hover:text-accent-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-warm-600 text-sm mt-2 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-warm-100">
                      <span className="text-accent-600 text-sm font-medium">Mehr Lesen →</span>
                      <span className="text-xs text-warm-400">{article.readTime} min</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
