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
// Golf course images - own drone photos + verified Unsplash golf course IDs
const GOLF_COURSE_IMAGES: Record<string, string> = {
  // Own drone photos
  'campoamor-golf': '/images/Drone 2/Golf/Campoamor Golf (1).jpg',
  'villamartin-golf': '/images/Drone 2/Golf/Villa Martin Golf.jpg',
  // Verified Unsplash golf course photos (IDs checked: aerial greens, fairways, courses)
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
  title: 'Propriétés Terrains de Golf Costa Blanca & Murcia | 22 Parcours, 100+ Propriétés',
  description: 'Trouvez des maisons neuves près de 22 terrains de golf à Costa Blanca Nord, Sud et Murcia. De La Sella et Jávea aux Colinas et Serena Golf. Lifestyle golf à partir de 120 000 €.',
  openGraph: {
    title: 'Propriétés Terrains de Golf Costa Blanca & Murcia',
    description: 'Maisons neuves sur les terrains de golf Costa Blanca et Murcia. Lifestyle golf à partir de 150 000 €.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/fr/golf',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Propriétés Terrains de Golf Costa Blanca & Murcia | Neuves',
    description: 'Trouvez des maisons neuves sur les terrains de golf à Costa Blanca et Murcia à partir de 150 000 €.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/golf',
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

// FAQs for SEO
const golfFaqs = [
  {
    question: 'Quels sont les meilleurs terrains de golf pour acheter une propriété à Costa Blanca et Murcia?',
    answer: 'Pour la variété et la valeur, Serena Golf près de Los Alcázares offre le plus d\'options neuves avec 34+ propriétés. La Finca à Algorfa et Vistabella proposent d\'excellents parcours avec des développements à partir de 120 000 €. Pour le golf premium, Las Colinas (classé parmi les 10 meilleurs d\'Espagne), La Sella près de Dénia (27 trous, design Olazábal, resort Marriott) et Villaitana à Finestrat (36 trous, designs Nicklaus et Ballesteros) sont exceptionnels. Dans le corridor Jávea-Calpe, Club de Golf Jávea et Club de Golf Ifach offrent des parcours charmants dans les zones les plus recherchées.',
  },
  {
    question: 'Combien coûte une propriété golf à Costa Blanca?',
    answer: 'Les propriétés neuves commencent autour de 150 000 € pour les appartements à La Finca ou La Marquesa. La plupart des développements sont entre 180 000-350 000 €. Les parcours premium comme Altorreal et Villaitana proposent des villas à partir de 350 000 €+.',
  },
  {
    question: 'Dois-je être membre pour jouer au golf si je vis sur un resort?',
    answer: 'La plupart des terrains de golf proposent des tarifs préférentiels aux propriétaires, mais l\'adhésion est généralement optionnelle. Contactez-nous pour les détails spécifiques de chaque resort - les arrangements varient entre les parcours.',
  },
  {
    question: 'Puis-je louer ma propriété golf quand je ne l\'utilise pas?',
    answer: 'Oui, les propriétés golf sont très recherchées pour la location, surtout pendant la saison prolongée (septembre à juin). Les parcours comme Serena Golf et Roda Golf près de la Mar Menor attirent les golfeurs toute l\'année. Des rendements locatifs de 4-6% sont réalisables avec une gestion professionnelle.',
  },
  {
    question: 'Quelle est la saison de golf à Costa Blanca et Murcia?',
    answer: 'La région jouit d\'un golf toute l\'année grâce au climat méditerranéen, avec plus de 300 jours ensoleillés par an. La saison principale court de septembre à juin, l\'été étant plus calme en raison de la chaleur. De nombreux parcours proposent des tarifs réduits en été.',
  },
  {
    question: 'Quel terrain de golf a le plus d\'options neuves?',
    answer: 'Serena Golf près de Los Alcázares dispose actuellement du plus de propriétés neuves avec plusieurs développements de constructeurs comme Grupo Vermell, AMAL et autres. La Finca à Algorfa propose également une forte offre avec plusieurs développements actifs.',
  },
  {
    question: 'Quels designers célèbres ont conçu des terrains à Costa Blanca?',
    answer: 'Costa Blanca dispose d\'une impressionnante collection de terrains de designers. Jack Nicklaus et Severiano Ballesteros ont conçu les deux parcours de Villaitana (Finestrat). José María Olazábal a conçu les 27 trous de La Sella près de Dénia. Ballesteros a aussi conçu Alicante Golf. Le capitaine de la Ryder Cup Manuel Piñero a conçu Vistabella et Aguilón. Cabell B. Robinson a conçu Las Colinas primé. Dave Thomas a conçu plusieurs parcours Murcia dont Serena Golf et Hacienda del Álamo.',
  },
];

// Why buy on a golf course
const golfBenefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Valeur de Revente Élevée',
    description: 'Les propriétés golf surpassent constamment le marché plus large. L\'offre limitée sur les parcours établis stimule l\'appréciation.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Environnements de Qualité',
    description: 'Les terrains de golf sont maintenus à des normes élevées. L\'aménagement, la sécurité et les équipements communautaires sont généralement excellents.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Communauté Prête',
    description: 'Les terrains de golf attirent des résidents internationaux partageant les mêmes idées. Les clubs sociaux, compétitions et événements créent des amitiés instantanées.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Revenus Locatifs',
    description: 'Les touristes de golf recherchent un hébergement de qualité près des parcours. La saison prolongée (sep-juin) offre une forte demande locative.',
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
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
      return <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">Plus Populaire</span>;
    case 'unique':
      return <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">Unique</span>;
    default:
      return null;
  }
}

// Clean card design with reliable image handling
function GolfCourseCard({ course }: { course: GolfCourse }) {
  return (
    <Link
      href={`/golf/${course.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-warm-200"
    >
      {/* Image section with gradient fallback */}
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

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <div className="flex gap-2 flex-wrap">
            <span className="bg-primary-900/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {course.holes} Trous · Par {course.par}
            </span>
            {getTierBadge(course.tier)}
          </div>
          <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {course.propertyCount} Propriétés
          </span>
        </div>

        {/* Bottom gradient with name */}
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

      {/* Content section */}
      <div className="p-6">
        {/* Story */}
        <p className="text-warm-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {course.story}
        </p>

        {/* Designer */}
        {course.designer && (
          <p className="text-warm-500 text-sm mb-4">
            Conçu par <span className="font-semibold text-primary-900">{course.designer}</span> · Ouvert en {course.yearOpened}
          </p>
        )}

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-5">
          {course.highlights.slice(0, 4).map((h) => (
            <span key={h} className="bg-warm-100 text-warm-700 text-xs px-2.5 py-1 rounded-full">{h}</span>
          ))}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-warm-100">
          <div>
            <p className="text-warm-500 text-xs">Propriétés à partir de</p>
            <p className="text-accent-600 font-bold text-xl">{formatPrice(course.priceFrom)}</p>
          </div>
          <span className="bg-primary-900 group-hover:bg-accent-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2">
            Voir les Propriétés
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
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-50`} />
      </div>

      <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Parcours Vedette
            </span>
            <span className="bg-success-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {course.propertyCount} Propriétés Disponibles
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
              <p className="text-warm-300 text-sm">Parcours</p>
              <p className="text-white font-semibold">{course.holes} Trous · Par {course.par}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-warm-300 text-sm">Designer</p>
              <p className="text-white font-semibold">{course.designer || 'Divers'}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-warm-300 text-sm">Localisation</p>
              <p className="text-white font-semibold">{course.town}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-warm-300 text-sm">Propriétés À partir de</p>
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
              Voir les Propriétés {course.shortName}
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
              Questions sur {course.shortName}
            </a>
          </div>
        </div>

        {/* Quick info sidebar */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-primary-900 mb-1">Pourquoi {course.shortName}?</h3>
            <p className="text-warm-500 text-sm mb-5">{course.story}</p>

            {course.amenities && (
              <div className="mb-5">
                <h4 className="text-sm font-medium text-primary-900 mb-2">Équipements du Resort</h4>
                <div className="flex flex-wrap gap-2">
                  {course.amenities.slice(0, 6).map((a) => (
                    <span key={a} className="bg-warm-100 text-warm-700 text-xs px-2 py-1 rounded">{a}</span>
                  ))}
                </div>
              </div>
            )}

            {course.builders && course.builders.length > 0 && (
              <div className="mb-5">
                <h4 className="text-sm font-medium text-primary-900 mb-2">Constructeurs Actifs</h4>
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
                  <p className="text-warm-500 text-xs">Propriétés à partir de</p>
                  <p className="text-accent-600 font-bold text-xl">{formatPrice(course.priceFrom)}</p>
                </div>
                <Link
                  href={`/golf/${course.slug}`}
                  className="bg-primary-900 hover:bg-primary-800 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
                >
                  Voir Tous →
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
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr/' },
    { name: 'Propriétés Golf', url: 'https://newbuildhomescostablanca.com/fr/golf/' },
  ]);

  const faqSchemaData = faqSchema(golfFaqs);

  // Get courses with hardcoded unique images
  const coursesWithImages = getCoursesWithImages();

  // Get courses by region (using enriched data)
  const southCourses = coursesWithImages.filter(c => c.region === 'south');
  const murciaCourses = coursesWithImages.filter(c => c.region === 'murcia');
  const northCourses = coursesWithImages.filter(c => c.region === 'north');
  const almeriaCourses = coursesWithImages.filter(c => c.region === 'almeria');

  // Featured course - Las Colinas (most prestigious south course)
  const featuredCourse = coursesWithImages.find(c => c.slug === 'las-colinas-golf') || coursesWithImages[0];

  // Total properties across all courses
  const totalProperties = getTotalGolfProperties();

  // Get related golf articles for bottom of page
  const golfArticles = getBlogPostsByTag('golf', 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />

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
            Trouver une Propriété Golf
          </a>
        </div>
      </div>

      <main className="min-h-screen bg-warm-50 pb-20 lg:pb-0">
        {/* ============================================ */}
        {/* HERO SECTION */}
        {/* ============================================ */}
        <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-16 md:py-24 overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-600/10 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/fr" className="hover:text-white transition-colors">Accueil</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Propriétés Golf</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Lifestyle Golf</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
                Vivez le <span className="font-semibold">Rêve Golf</span> en Espagne
              </h1>

              <p className="text-warm-200 text-lg leading-relaxed mb-8">
                Réveillez-vous avec des vues sur fairways, jouez sur des parcours de classe mondiale et profitez du soleil méditerranéen toute l'année.
                Nous avons sélectionné <strong className="text-white">{totalProperties} propriétés neuves</strong> sur <strong className="text-white">{GOLF_COURSES.length} terrains de golf</strong> à
                Costa Blanca, Murcia et Almería.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{GOLF_COURSES.length}</div>
                  <div className="text-warm-400 text-sm">Terrains de Golf</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{totalProperties}+</div>
                  <div className="text-warm-400 text-sm">Propriétés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">150k€</div>
                  <div className="text-warm-400 text-sm">À partir de</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">300+</div>
                  <div className="text-warm-400 text-sm">Jours Ensoleillés/An</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Questions sur les Propriétés Golf
                </a>
                <Link href="#courses" className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                  Parcourir les Terrains
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* WHY BUY ON A GOLF COURSE */}
        {/* ============================================ */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-primary-900" />
                <span className="text-primary-900 text-xs font-medium tracking-widest uppercase">
                  Le Choix Intelligent
                </span>
                <div className="w-10 h-px bg-primary-900" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Pourquoi Acheter sur un Terrain de Golf?
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                Au-delà du lifestyle, les propriétés golf offrent des avantages d'investissement intéressants.
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

        {/* ============================================ */}
        {/* FEATURED COURSE */}
        {/* ============================================ */}
        <section className="py-14 bg-warm-100" id="courses">
          <div className="max-w-7xl mx-auto px-6">
            <FeaturedCourseHero course={featuredCourse} />
          </div>
        </section>

        {/* ============================================ */}
        {/* COSTA BLANCA SOUTH COURSES - SHOWN FIRST */}
        {/* ============================================ */}
        {southCourses.length > 0 && (
          <section className="py-14 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                  Notre Région Principale
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Costa Blanca <span className="font-semibold">Sud</span>
              </h2>
              <p className="text-warm-600 mb-8">
                {southCourses.length} terrains de golf établis au cœur du tourisme golfique espagnol. Excellente accessibilité et valeur.
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

        {/* ============================================ */}
        {/* COSTA CÁLIDA (MURCIA) COURSES */}
        {/* ============================================ */}
        {murciaCourses.length > 0 && (
          <section id="costa-calida" className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                  Région de Meilleure Valeur
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Costa <span className="font-semibold">Cálida</span> (Murcia)
              </h2>
              <p className="text-warm-600 mb-8">
                {murciaCourses.length} terrains de golf avec d'excellentes propriétés neuves près du lagon Mar Menor.
                <Link href="/properties" className="text-accent-600 hover:underline ml-1">
                  Explorer Costa Cálida →
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

        {/* ============================================ */}
        {/* COSTA BLANCA NORTH COURSES */}
        {/* ============================================ */}
        {northCourses.length > 0 && (
          <section className="py-14 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                  Région Premium
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Costa Blanca <span className="font-semibold">Nord</span>
              </h2>
              <p className="text-warm-600 mb-8">
                {northCourses.length} terrains de golf d'Alicante à Dénia — designs Olazábal, Nicklaus et Ballesteros dans la région côtière la plus prestigieuse d'Espagne. Propriétés premium près de Jávea, Altea, Calpe et Finestrat.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {northCourses.map((course) => (
                  <GolfCourseCard key={course.slug} course={course} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* ALMERÍA COURSES */}
        {/* ============================================ */}
        {almeriaCourses.length > 0 && (
          <section className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">
                  Quelque Chose de Différent
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                <span className="font-semibold">Almería</span> — Golf du Désert
              </h2>
              <p className="text-warm-600 mb-8">
                {almeriaCourses.length} terrains uniques dans la province préservée d'Almería. Du seul parcours de désert d'Europe aux mises en page dramatiques montagne-mer — pour les acheteurs cherchant quelque chose de vraiment différent.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {almeriaCourses.map((course) => (
                  <GolfCourseCard key={course.slug} course={course} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* COURSE COMPARISON TABLE */}
        {/* ============================================ */}
        <section className="py-14 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
              Comparaison <span className="font-semibold">Rapide</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Tous les {GOLF_COURSES.length} terrains en un coup d'œil - triés par nombre de propriétés disponibles.
            </p>

            <div className="bg-white rounded-xl border border-warm-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary-900 text-white">
                      <th className="px-4 py-3 text-left font-medium">Parcours</th>
                      <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Région</th>
                      <th className="px-4 py-3 text-center font-medium">Trous</th>
                      <th className="px-4 py-3 text-center font-medium">Propriétés</th>
                      <th className="px-4 py-3 text-right font-medium">À partir de</th>
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
                            Voir →
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

        {/* ============================================ */}
        {/* FAQs */}
        {/* ============================================ */}
        <section className="py-14 bg-white" id="faqs">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-primary-700" />
                <span className="text-primary-700 text-xs font-medium tracking-widest uppercase">
                  Questions Communes
                </span>
                <div className="w-10 h-px bg-primary-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                FAQ Propriétés Golf
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

        {/* ============================================ */}
        {/* FINAL CTA - Lead Capture */}
        {/* ============================================ */}
        <section className="py-16 bg-primary-900" id="inquiry">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                    Commencer
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                  Trouvez Votre Propriété Golf Parfaite
                </h2>
                <p className="text-warm-300 leading-relaxed mb-6">
                  Que vous désiriez une vue frontale sur fairway, un petit pied-à-terre ou une villa spacieuse pour les vacances en famille,
                  nous vous aiderons à trouver la bonne propriété sur le bon terrain.
                </p>

                {/* Trust elements */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">15+ ans d'expérience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">{GOLF_COURSES.length} terrains couverts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Aucuns frais acheteur</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Conseil expert</span>
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
                    Contactez-nous via WhatsApp
                  </a>
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                    className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors border border-white/20"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-primary-900 mb-1">Obtenir des Propriétés Correspondantes</h3>
                <p className="text-warm-500 text-sm mb-5">Nous vous enverrons des propriétés correspondant à vos critères</p>
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
                      placeholder="Nom *"
                      className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Téléphone"
                      className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Adresse e-mail *"
                    className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <select
                      name="budget"
                      className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
                    >
                      <option value="">Budget</option>
                      <option value="under-200k">Moins de 200k€</option>
                      <option value="200k-350k">200k€ - 350k€</option>
                      <option value="350k-500k">350k€ - 500k€</option>
                      <option value="500k+">500k€+</option>
                    </select>
                    <select
                      name="property-type"
                      className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
                    >
                      <option value="">Type de propriété</option>
                      <option value="apartment">Appartement</option>
                      <option value="townhouse">Maison de ville</option>
                      <option value="villa">Villa</option>
                      <option value="any">Quelconque</option>
                    </select>
                  </div>

                  <select
                    name="course"
                    className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
                  >
                    <option value="">Terrain préféré (optionnel)</option>
                    {getCoursesByPropertyCount().map(c => (
                      <option key={c.slug} value={c.slug}>{c.shortName} ({c.propertyCount} propriétés)</option>
                    ))}
                    <option value="no-preference">Pas de préférence - Conseillez-moi</option>
                  </select>

                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Avez-vous des exigences spécifiques? (ex: terrains préférés, chambres, vues)"
                    className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    Envoyer Vos Exigences
                  </button>

                  <p className="text-xs text-warm-400 text-center">
                    Nous répondons en 2 heures • Sans engagement
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* GOLF GUIDES & ARTICLES */}
        {/* ============================================ */}
        {golfArticles.length > 0 && (
          <section className="py-12 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Guides Golf & <span className="font-semibold">Ressources</span>
              </h2>
              <p className="text-warm-600 mb-8">
                Conseils experts et guides pratiques pour vivre le lifestyle golf en Espagne
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
                      <span className="text-accent-600 text-sm font-medium">Lire plus →</span>
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
