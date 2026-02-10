import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import carouselData from '@/content/homepage-carousels.json';
import {
  organizationSchema,
  websiteSchema,
  aggregateRatingSchema,
  toJsonLd,
} from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Новые дома на Коста Бланка | Виллы и квартиры в Испании',
  description: 'Найдите свой дом на Коста Бланка. Новостройки от 164.000 евро. Помощь для русскоговорящих покупателей недвижимости в Испании. Виза на проживание (Golden Visa) от 500к евро.',
  keywords: 'коста бланка недвижимость, новостройки испания, виллы испания, квартиры испания, golden visa испания',
  openGraph: {
    title: 'Новые дома на Коста Бланка | Виллы и квартиры в Испании',
    description: 'Найдите свой дом на Коста Бланка. Новостройки от 164.000 евро. Помощь для русскоговорящих покупателей.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/ru',
    siteName: 'Новостройки Коста Бланка',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Люкс виллы и квартиры на Коста Бланка, Испания',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Новые дома на Коста Бланка',
    description: 'Найдите свой дом на Коста Бланка, Испания.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru',
    languages: {
      'en': 'https://newbuildhomescostablanca.com',
      'sv': 'https://newbuildhomescostablanca.com/sv',
      'nl': 'https://newbuildhomescostablanca.com/nl',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be',
      'fr': 'https://newbuildhomescostablanca.com/fr',
      'no': 'https://newbuildhomescostablanca.com/no',
      'de': 'https://newbuildhomescostablanca.com/de',
      'pl': 'https://newbuildhomescostablanca.com/pl',
      'ru': 'https://newbuildhomescostablanca.com/ru',
      'x-default': 'https://newbuildhomescostablanca.com',
    },
  },
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function getFeaturedProperties() {
  const { carousels } = carouselData;
  return {
    heroLeft: carousels['south-under400k'].properties[2],
    heroRight: carousels['south-under400k'].properties[0],
    affordable: carousels['south-under400k'].properties.slice(0, 6),
    golfProperties: carousels['south-golf'].properties.slice(0, 3),
    northProperties: carousels['north-luxury'].properties.slice(0, 3),
  };
}

export default function RussianHomepage() {
  const featured = getFeaturedProperties();

  const orgSchema = organizationSchema();
  const siteSchema = websiteSchema();
  const ratingSchema = aggregateRatingSchema({
    ratingValue: 4.9,
    reviewCount: 127,
    itemName: 'Новостройки Коста Бланка',
    itemType: 'RealEstateAgent',
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(siteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(ratingSchema) }} />

      <main className="min-h-screen bg-warm-50">
        <section className="bg-primary-900 py-3">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-center gap-6 text-sm">
              <span className="text-warm-300">
                <span className="text-accent-400 font-medium">500+</span> новостроек
              </span>
              <span className="text-warm-500 hidden sm:inline">|</span>
              <span className="text-warm-300 hidden sm:inline">
                От <span className="text-accent-400 font-medium">164.000</span> евро
              </span>
              <span className="text-warm-500 hidden md:inline">|</span>
              <span className="text-warm-300 hidden md:inline">
                Юг и Север Коста Бланка
              </span>
            </div>
          </div>
        </section>

        <section className="relative h-[65vh] min-h-[450px] max-h-[600px]">
          <div className="grid md:grid-cols-2 h-full">
            <div className="relative overflow-hidden">
              <Image
                src={featured.heroLeft.image}
                alt={featured.heroLeft.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-primary-900/20" />
            </div>

            <div className="relative overflow-hidden hidden md:block">
              <Image
                src={featured.heroRight.image}
                alt={featured.heroRight.title}
                fill
                className="object-cover"
                sizes="50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-primary-900/20" />
            </div>
          </div>

          <div className="absolute inset-0 z-10 flex flex-col justify-end">
            <div className="max-w-7xl mx-auto px-6 pb-6 md:pb-10 w-full">
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-2 leading-[1.1]">
                  Найдите Свой Дом на Коста Бланка,
                  <span className="font-semibold"> Готовый К Заселению</span>
                </h1>
                <p className="text-warm-300 max-w-xl mx-auto">
                  Новостройки из каталога от 164.000 евро. Ваш средиземноморский образ жизни начинается здесь.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href={`/ru/properties/${featured.heroLeft.reference}`}
                  className="group bg-white/10 backdrop-blur-md rounded-sm p-4 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                      Готово К Заселению
                    </span>
                    <span className="text-warm-300 text-xs">{featured.heroLeft.town}</span>
                  </div>
                  <h3 className="text-white font-medium mb-1 group-hover:text-accent-300 transition-colors">
                    {featured.heroLeft.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-white">
                      {formatPrice(featured.heroLeft.price)}
                    </span>
                    <span className="text-warm-300 text-sm">
                      {featured.heroLeft.bedrooms} комнат · {featured.heroLeft.builtArea}м²
                    </span>
                  </div>
                </Link>

                <Link
                  href={`/ru/properties/${featured.heroRight.reference}`}
                  className="group bg-white/10 backdrop-blur-md rounded-sm p-4 border border-white/20 hover:bg-white/20 transition-all hidden md:block"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">
                      Готово К Заселению
                    </span>
                    <span className="text-warm-300 text-xs">{featured.heroRight.town}</span>
                  </div>
                  <h3 className="text-white font-medium mb-1 group-hover:text-accent-300 transition-colors">
                    {featured.heroRight.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-white">
                      {formatPrice(featured.heroRight.price)}
                    </span>
                    <span className="text-warm-300 text-sm">
                      {featured.heroRight.bedrooms} комнат · {featured.heroRight.builtArea}м²
                    </span>
                  </div>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5">
                <Link
                  href="/ru/properties?isKeyReady=true"
                  className="group bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm text-center transition-all inline-flex items-center justify-center gap-2"
                >
                  Смотреть Готовые Дома
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/ru/properties"
                  className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-sm text-center transition-all border border-white/20"
                >
                  Просмотреть Все Дома
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                  Почему Коста Бланка
                </span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                Почему <span className="font-semibold">Российские Покупатели Выбирают Коста Бланка</span>
              </h2>
              <p className="text-warm-600 mt-2 max-w-2xl mx-auto">
                От привлекательных цен до средиземноморского образа жизни — Коста Бланка предлагает лучшее из двух миров для владельцев из России и стран СНГ.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">Климат и Образ Жизни</span>
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">+</span>
                    <span><strong>300 дней солнца в год</strong> — вместо суровых зим Москвы и Санкт-Петербурга</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">+</span>
                    <span><strong>На берегу моря</strong> — пляжи и водные виды спорта весь год</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">+</span>
                    <span><strong>Активный образ жизни</strong> — гольф, теннис, плавание и пешие прогулки</span>
                  </li>
                </ul>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">Цены и Инвестиции</span>
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">+</span>
                    <span><strong>На 70% дешевле Москвы</strong> — такое же качество, иная цена</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">+</span>
                    <span><strong>Стабильный рост стоимости</strong> — инвестиции, которые растут в цене</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">+</span>
                    <span><strong>Низкие расходы на содержание</strong> — без отопления и подметания снега</span>
                  </li>
                </ul>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">Золотая Виза и Вид На Жительство</span>
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">+</span>
                    <span><strong>Резиденция за 500.000 евро</strong> — официальный Золотой Виз от Испании</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">+</span>
                    <span><strong>ВНЖ для семьи</strong> — вид на жительство для всех членов семьи</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">+</span>
                    <span><strong>Доступ в Шенгенскую зону</strong> — свободное передвижение по Европе</span>
                  </li>
                </ul>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">Русскоговорящее Сообщество</span>
                </h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">+</span>
                    <span><strong>Крупное русское сообщество</strong> — десятки тысяч русскоговорящих жителей</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">+</span>
                    <span><strong>Русские услуги</strong> — врачи, магазины, рестораны, клиники на русском</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">+</span>
                    <span><strong>Налаженная сеть</strong> — легко найти нужные контакты и помощь</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                    Лучшее Предложение
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  Готовые Дома До 400.000 евро
                </h2>
              </div>
              <Link
                href="/ru/properties?maxPrice=400000&isKeyReady=true"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Смотреть Все
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.affordable.map((property) => (
                <Link
                  key={property.reference}
                  href={`/ru/properties/${property.reference}`}
                  className="group bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-warm-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-accent-600 font-medium">{property.zone}</span>
                    <h3 className="text-primary-900 font-semibold mt-1 group-hover:text-accent-600 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-warm-600 text-sm mt-1">{property.bedrooms} комнат • {property.builtArea}м²</p>
                    <div className="mt-3 pt-3 border-t border-warm-100 flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-900">
                        {formatPrice(property.price)}
                      </span>
                      <span className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded">
                        Готово К Заселению
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                    Дома У Гольф-Клубов
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  Виллы С <span className="font-semibold">Видом На Гольф</span>
                </h2>
              </div>
              <Link
                href="/ru/golf"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Все Дома У Гольфа
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {featured.golfProperties.map((property) => (
                <Link
                  key={property.reference}
                  href={`/ru/properties/${property.reference}`}
                  className="group bg-warm-50 rounded-sm overflow-hidden hover:shadow-lg transition-all border border-warm-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-sm">
                        Гольф Клуб
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-accent-600 font-medium">{property.zone}</span>
                    <h3 className="text-primary-900 font-semibold mt-1 group-hover:text-accent-600 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-warm-600 text-sm mt-1">{property.bedrooms} комнат • {property.builtArea}м² • Бассейн</p>
                    <div className="mt-3 pt-3 border-t border-warm-100">
                      <span className="text-lg font-bold text-primary-900">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                    Люкс Сегмент
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  Коста Бланка <span className="font-semibold">Север</span>
                </h2>
              </div>
              <Link
                href="/ru/areas"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Изучить Районы
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {featured.northProperties.map((property) => (
                <Link
                  key={property.reference}
                  href={`/ru/properties/${property.reference}`}
                  className="group relative bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all border border-warm-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-accent-600 font-medium">{property.zone}</span>
                    <h3 className="text-primary-900 font-semibold mt-1 group-hover:text-accent-600 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-warm-600 text-sm mt-1">{property.bedrooms} комнат • {property.builtArea}м²</p>
                    <div className="mt-3 pt-3 border-t border-warm-100">
                      <span className="text-lg font-bold text-primary-900">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Нужна <span className="font-semibold">Профессиональная Помощь?</span>
            </h2>
            <p className="text-warm-300 mb-8 text-lg">
              Мы поможем вам через весь процесс покупки — от выбора дома до получения ключей. Мы говорим на вашем языке и понимаем ваши потребности как русскоговорящего покупателя.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ru/contact"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
              >
                Заказать Консультацию
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/ru/guides"
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-sm transition-all border border-white/20"
              >
                Читать Гайды
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-warm-600 mb-6">Нам доверяют покупатели из России, Беларуси, Казахстана и других стран СНГ</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">127</div>
                <p className="text-warm-600 text-sm">Отзывов в Google</p>
                <p className="text-accent-600 text-sm font-medium">4,9 из 5</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">500+</div>
                <p className="text-warm-600 text-sm">Новостроек</p>
                <p className="text-accent-600 text-sm font-medium">По всей Коста Бланка</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-900 mb-1">15+</div>
                <p className="text-warm-600 text-sm">Лет Опыта</p>
                <p className="text-accent-600 text-sm font-medium">С русскоговорящими Покупателями</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
