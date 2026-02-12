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
  title: 'Гольф & Недвижимость Коста Бланка | 22 Поля для гольфа, 100+ Объектов',
  description: 'Найдите новые дома рядом с 22 полями для гольфа на Коста Бланка Север, Юг и Мурсия. От La Sella и Jávea до Las Colinas и Serena Golf. Гольф образ жизни от 120 000 €.',
  openGraph: {
    title: 'Гольф & Недвижимость Коста Бланка',
    description: 'Новые дома на полях для гольфа Коста Бланка и Мурсия. Гольф образ жизни от 150 000 €.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/ru/golf',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Гольф & Недвижимость Коста Бланка | Новые Дома',
    description: 'Найдите новые дома на полях для гольфа Коста Бланка и Мурсия от 150 000 €.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/golf',
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
    question: 'Какие поля для гольфа лучше всего подходят для покупки недвижимости на Коста Бланка и Мурсия?',
    answer: 'Для разнообразия и стоимости Serena Golf близ Los Alcázares предлагает наибольший выбор новых объектов с 34+ объектами. La Finca в Algorfa и Vistabella имеют отличные поля с застройкой от 120 000 €. Для премиум гольфа Las Colinas (входит в 10 лучших Испании), La Sella близ Dénia (27 лунок, дизайн Olazábal, курортный комплекс Marriott) и Villaitana в Finestrat (36 лунок, дизайн Nicklaus и Ballesteros) исключительны. В коридоре Jávea-Calpe Club de Golf Jávea и Club de Golf Ifach предлагают прелестные поля в наиболее желанных районах.',
  },
  {
    question: 'Сколько стоит недвижимость на поле для гольфа Коста Бланка?',
    answer: 'Новая недвижимость начинается примерно с 150 000 € за квартиры на La Finca или La Marquesa. Большинство застроек находятся между 180 000-350 000 €. Премиум поля такие как Altorreal и Villaitana предлагают виллы от 350 000 €+.',
  },
  {
    question: 'Должен ли я быть членом, чтобы играть в гольф, если я живу на курорте?',
    answer: 'Большинство полей для гольфа предлагают льготные ставки для владельцев, но членство обычно опционально. Свяжитесь с нами для получения конкретных деталей по каждому курорту - условия различаются между полями.',
  },
  {
    question: 'Могу ли я сдавать в аренду мой объект на поле для гольфа, когда я его не использую?',
    answer: 'Да, недвижимость на полях для гольфа очень востребована для аренды, особенно в длительный сезон (сентябрь по июнь). Поля такие как Serena Golf и Roda Golf близ Mar Menor привлекают гольфистов в течение всего года. Возврат на аренду 4-6% достижим при профессиональном управлении.',
  },
  {
    question: 'Какой сезон гольфа на Коста Бланка и Мурсия?',
    answer: 'Регион наслаждается гольфом круглый год благодаря средиземноморскому климату, с более чем 300 солнечными днями в год. Основной сезон длится с сентября по июнь, с летом более спокойным из-за жары. Многие поля предлагают сниженные тарифы летом.',
  },
  {
    question: 'Какое поле для гольфа имеет наибольшее количество новых объектов?',
    answer: 'Serena Golf близ Los Alcázares в настоящее время имеет наибольшее количество новых объектов с несколькими застройками от застройщиков таких как Grupo Vermell, AMAL и другие. La Finca в Algorfa также предлагает сильное предложение с несколькими активными застройками.',
  },
  {
    question: 'Какие известные дизайнеры проектировали поля на Коста Бланка?',
    answer: 'Коста Бланка имеет впечатляющую коллекцию полей дизайнеров. Jack Nicklaus и Severiano Ballesteros спроектировали оба поля на Villaitana (Finestrat). José María Olazábal спроектировал 27 лунок La Sella близ Dénia. Ballesteros также спроектировал Alicante Golf. Капитан Кубка Райдера Manuel Piñero спроектировал Vistabella и Aguilón. Cabell B. Robinson спроектировал награжденный Las Colinas. Dave Thomas спроектировал несколько полей Мурсия включая Serena Golf и Hacienda del Álamo.',
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
    title: 'Высокая Стоимость Перепродажи',
    description: 'Недвижимость для гольфа постоянно превосходит более широкий рынок. Ограниченное предложение на устоявшихся полях стимулирует признание.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Окружение Высокого Качества',
    description: 'Поля для гольфа содержатся на высоких стандартах. Озеленение, безопасность и удобства обычно отличные.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Готовое Сообщество',
    description: 'Поля для гольфа привлекают единомышленников международных жителей. Социальные клубы, турниры и мероприятия создают мгновенную дружбу.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Доход от Аренды',
    description: 'Туристы-гольфисты ищут качественное размещение рядом с полями. Длительный сезон (сентябрь-июнь) предлагает сильный спрос на аренду.',
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function getTierBadge(tier: GolfCourse['tier']) {
  switch (tier) {
    case 'premium':
      return <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-2 py-1 rounded">Премиум</span>;
    case 'popular':
      return <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">Самый Популярный</span>;
    case 'unique':
      return <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">Уникальный</span>;
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
              {course.holes} Лунок · Пар {course.par}
            </span>
            {getTierBadge(course.tier)}
          </div>
          <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {course.propertyCount} Объектов
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
            Спроектировано <span className="font-semibold text-primary-900">{course.designer}</span> · Открыто в {course.yearOpened}
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
            <p className="text-warm-500 text-xs">Объекты от</p>
            <p className="text-accent-600 font-bold text-xl">{formatPrice(course.priceFrom)}</p>
          </div>
          <span className="bg-primary-900 group-hover:bg-accent-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2">
            Посмотреть Объект
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
              Рекомендуемое Поле
            </span>
            <span className="bg-success-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {course.propertyCount} Объектов Доступно
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
              <p className="text-warm-300 text-sm">Поле</p>
              <p className="text-white font-semibold">{course.holes} Лунок · Пар {course.par}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-warm-300 text-sm">Дизайнер</p>
              <p className="text-white font-semibold">{course.designer || 'Разные'}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-warm-300 text-sm">Местоположение</p>
              <p className="text-white font-semibold">{course.town}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-warm-300 text-sm">Объекты От</p>
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
              Посмотреть Объекты {course.shortName}
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
              Вопросы о {course.shortName}
            </a>
          </div>
        </div>

        {/* Quick info sidebar */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-primary-900 mb-1">Почему {course.shortName}?</h3>
            <p className="text-warm-500 text-sm mb-5">{course.story}</p>

            {course.amenities && (
              <div className="mb-5">
                <h4 className="text-sm font-medium text-primary-900 mb-2">Удобства Курорта</h4>
                <div className="flex flex-wrap gap-2">
                  {course.amenities.slice(0, 6).map((a) => (
                    <span key={a} className="bg-warm-100 text-warm-700 text-xs px-2 py-1 rounded">{a}</span>
                  ))}
                </div>
              </div>
            )}

            {course.builders && course.builders.length > 0 && (
              <div className="mb-5">
                <h4 className="text-sm font-medium text-primary-900 mb-2">Активные Застройщики</h4>
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
                  <p className="text-warm-500 text-xs">Объекты от</p>
                  <p className="text-accent-600 font-bold text-xl">{formatPrice(course.priceFrom)}</p>
                </div>
                <Link
                  href={`/golf/${course.slug}`}
                  className="bg-primary-900 hover:bg-primary-800 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
                >
                  Посмотреть Все →
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
    { name: 'Главная', url: 'https://newbuildhomescostablanca.com/ru/' },
    { name: 'Гольф', url: 'https://newbuildhomescostablanca.com/ru/golf/' },
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
            Найти Объект для Гольфа
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
              <Link href="/ru" className="hover:text-white transition-colors">Главная</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Гольф</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Образ жизни в гольфе</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
                Откройте <span className="font-semibold">Рай для Гольфа</span> в Испании
              </h1>

              <p className="text-warm-200 text-lg leading-relaxed mb-8">
                Просыпайтесь с видом на справедливые пути, играйте на полях мирового класса и наслаждайтесь средиземноморским солнцем круглый год.
                Мы выбрали <strong className="text-white">{totalProperties} новых объектов</strong> на <strong className="text-white">{GOLF_COURSES.length} полях для гольфа</strong> на
                Коста Бланка, Мурсия и Альмерия.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{GOLF_COURSES.length}</div>
                  <div className="text-warm-400 text-sm">Полей для гольфа</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{totalProperties}+</div>
                  <div className="text-warm-400 text-sm">Объектов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">150k€</div>
                  <div className="text-warm-400 text-sm">От</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">300+</div>
                  <div className="text-warm-400 text-sm">Солнечных Дней/Год</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Вопросы об Объектах Гольфа
                </a>
                <Link href="#courses" className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                  Просмотреть Поля
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
                  Разумный Выбор
                </span>
                <div className="w-10 h-px bg-primary-900" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Почему Купить на Поле для Гольфа?
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                Помимо образа жизни, недвижимость для гольфа предлагает интересные инвестиционные преимущества.
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
                  Наш Основной Регион
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Costa Blanca <span className="font-semibold">Юг</span>
              </h2>
              <p className="text-warm-600 mb-8">
                {southCourses.length} устоявшихся полей для гольфа в сердце испанского гольф-туризма. Отличная доступность и стоимость.
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
                  Регион Лучшей Стоимости
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Costa <span className="font-semibold">Cálida</span> (Мурсия)
              </h2>
              <p className="text-warm-600 mb-8">
                {murciaCourses.length} полей для гольфа с отличной новой недвижимостью рядом с лагуной Мар Менор.
                <Link href="/properties" className="text-accent-600 hover:underline ml-1">
                  Просмотреть Costa Cálida →
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
                  Премиум Регион
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Costa Blanca <span className="font-semibold">Север</span>
              </h2>
              <p className="text-warm-600 mb-8">
                {northCourses.length} полей для гольфа от Alicante до Dénia — дизайны Olazábal, Nicklaus и Ballesteros в самом престижном прибрежном регионе Испании. Премиум объекты рядом с Jávea, Altea, Calpe и Finestrat.
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
                  Что-то Другое
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                <span className="font-semibold">Альмерия</span> — Гольф Пустыни
              </h2>
              <p className="text-warm-600 mb-8">
                {almeriaCourses.length} уникальных полей в сохраняемой провинции Альмерия. От единственного пустынного поля Европы до драматичных горно-морских макетов — для покупателей ищущих что-то действительно другое.
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
              Быстрое <span className="font-semibold">Сравнение</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Все {GOLF_COURSES.length} полей с одного взгляда - отсортированы по количеству доступных объектов.
            </p>

            <div className="bg-white rounded-xl border border-warm-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary-900 text-white">
                      <th className="px-4 py-3 text-left font-medium">Поле</th>
                      <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Регион</th>
                      <th className="px-4 py-3 text-center font-medium">Лунок</th>
                      <th className="px-4 py-3 text-center font-medium">Объектов</th>
                      <th className="px-4 py-3 text-right font-medium">От</th>
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
                            Посмотреть →
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
                  Часто Задаваемые Вопросы
                </span>
                <div className="w-10 h-px bg-primary-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                FAQ Объектов для Гольфа
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
                    Начать
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                  Найдите Ваш Идеальный Объект для Гольфа
                </h2>
                <p className="text-warm-300 leading-relaxed mb-6">
                  Хотите ли вы вид на fairway, маленький pieds-à-terre или просторную виллу для семейных отпусков,
                  мы поможем вам найти правильный объект на правильном поле.
                </p>

                {/* Trust elements */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">15+ лет опыта</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">{GOLF_COURSES.length} полей охвачено</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Нет комиссий покупателей</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Советы эксперта</span>
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
                    Свяжитесь с нами через WhatsApp
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
                <h3 className="text-xl font-semibold text-primary-900 mb-1">Получить Подобранные Объекты</h3>
                <p className="text-warm-500 text-sm mb-5">Мы отправим вам объекты, соответствующие вашим критериям</p>
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
                      placeholder="Имя *"
                      className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Телефон"
                      className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email адрес *"
                    className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <select
                      name="budget"
                      className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
                    >
                      <option value="">Бюджет</option>
                      <option value="under-200k">Менее 200k€</option>
                      <option value="200k-350k">200k€ - 350k€</option>
                      <option value="350k-500k">350k€ - 500k€</option>
                      <option value="500k+">500k€+</option>
                    </select>
                    <select
                      name="property-type"
                      className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
                    >
                      <option value="">Тип объекта</option>
                      <option value="apartment">Квартира</option>
                      <option value="townhouse">Таунхаус</option>
                      <option value="villa">Вилла</option>
                      <option value="any">Любой</option>
                    </select>
                  </div>

                  <select
                    name="course"
                    className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
                  >
                    <option value="">Предпочитаемое поле (опционально)</option>
                    {getCoursesByPropertyCount().map(c => (
                      <option key={c.slug} value={c.slug}>{c.shortName} ({c.propertyCount} объектов)</option>
                    ))}
                    <option value="no-preference">Нет предпочтения - Посоветуйте мне</option>
                  </select>

                  <textarea
                    name="message"
                    rows={3}
                    placeholder="У вас есть особые требования? (например: предпочитаемые поля, спальни, виды)"
                    className="w-full px-4 py-2.5 border border-warm-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    Отправить Ваши Требования
                  </button>

                  <p className="text-xs text-warm-400 text-center">
                    Мы ответим за 2 часа • Без обязательств
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
                Гольф Гиды & <span className="font-semibold">Ресурсы</span>
              </h2>
              <p className="text-warm-600 mb-8">
                Советы экспертов и практические руководства по жизни в стиле гольфа в Испании
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
                      <span className="text-accent-600 text-sm font-medium">Прочитать больше →</span>
                      <span className="text-xs text-warm-400">{article.readTime} мин</span>
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
