import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Люкс Виллы На Коста Бланка | Премиум Недвижимость',
  description: 'Откройте люкс виллы и премиум квартиры на Коста Бланка Север. От 500.000 евро до 5+ миллионов. Хавеа, Мораира, Бенидорм.',
  keywords: 'люкс виллы коста бланка, премиум недвижимость испания, хавеа виллы',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/luxury',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/luxury',
      'sv': 'https://newbuildhomescostablanca.com/sv/luxury',
      'nl': 'https://newbuildhomescostablanca.com/nl/luxury',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/luxury',
      'fr': 'https://newbuildhomescostablanca.com/fr/luxury',
      'no': 'https://newbuildhomescostablanca.com/no/luxury',
      'de': 'https://newbuildhomescostablanca.com/de/luxury',
      'pl': 'https://newbuildhomescostablanca.com/pl/luxury',
      'ru': 'https://newbuildhomescostablanca.com/ru/luxury',
      'x-default': 'https://newbuildhomescostablanca.com/luxury',
    },
  },
};

export default function RULuxuryPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Люкс <span className="font-semibold">Недвижимость</span>
          </h1>
          <p className="text-warm-300 max-w-2xl mx-auto">
            Откройте для себя самые престижные виллы и квартиры на Коста Бланка Север.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900 mb-2">
              Люкс <span className="font-semibold">Районы</span>
            </h2>
            <p className="text-warm-600">Самые престижные локации на Коста Бланка</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Хавеа', desc: 'Гора Монтго и элегантные виллы у моря', price: 'От 500.000' },
              { name: 'Мораира', desc: 'Исключительная яхтная база и люкс дома', price: 'От 600.000' },
              { name: 'Кумбре дель Сол', desc: 'Закрытый люкс комплекс на горе', price: 'От 700.000' },
              { name: 'Альтеа', desc: 'Художественный район с престижными домами', price: 'От 400.000' },
              { name: 'Бенидорм Север', desc: 'Люкс апартаменты с панорамным видом', price: 'От 350.000' },
              { name: 'Калпе Примерос', desc: 'Вид на скалу Пенон и престижные виллы', price: 'От 450.000' },
            ].map((area, i) => (
              <Link
                key={i}
                href={`/ru/properties?town=${area.name}`}
                className="group bg-warm-50 rounded-sm p-6 border border-warm-200 hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold text-primary-900 group-hover:text-accent-600 mb-2 transition-colors">
                  {area.name}
                </h3>
                <p className="text-warm-600 text-sm mb-4">{area.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-warm-200">
                  <span className="font-bold text-primary-900">{area.price} евро</span>
                  <svg className="w-4 h-4 text-accent-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900 mb-2">
              Люкс <span className="font-semibold">Характеристики</span>
            </h2>
            <p className="text-warm-600">Что включают премиум виллы на Коста Бланка</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-sm p-8 border border-warm-100">
              <h3 className="text-lg font-semibold text-primary-900 mb-6">Архитектура и Дизайн</h3>
              <ul className="space-y-3 text-warm-600 text-sm">
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Современный минималистский дизайн</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Панорамные окна с видом на море</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Премиум отделка и материалы</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Архитектура, награждённая наградами</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-sm p-8 border border-warm-100">
              <h3 className="text-lg font-semibold text-primary-900 mb-6">Удобства и Услуги</h3>
              <ul className="space-y-3 text-warm-600 text-sm">
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Инфинити-бассейны и спа</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Домашние кинотеатры и винные погреба</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Системы охраны и автоматизации</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Консьерж-сервис и уход</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-sm p-8 border border-warm-100">
              <h3 className="text-lg font-semibold text-primary-900 mb-6">Местоположение</h3>
              <ul className="space-y-3 text-warm-600 text-sm">
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Первая линия у моря или частные пляжи</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Закрытые престижные комплексы</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Окружены природой и видом на горы</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Рядом с гольф-клубами и яхт-марин</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-sm p-8 border border-warm-100">
              <h3 className="text-lg font-semibold text-primary-900 mb-6">Инвестиционный Потенциал</h3>
              <ul className="space-y-3 text-warm-600 text-sm">
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Стабильная долгосрочная стоимость</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Потенциал аренды люкс сегмента</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Golden Visa при покупке 500k+</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Частные бизнес-возможности</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-primary-900 mb-4">
            Готовы К <span className="font-semibold">Люкс Жизни?</span>
          </h2>
          <p className="text-warm-600 mb-8">
            Наши специалисты помогут вам найти идеальную люкс виллу в вашем бюджете.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ru/properties"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all"
            >
              Смотреть Все Виллы
            </Link>
            <Link
              href="/ru/contact"
              className="bg-warm-100 hover:bg-warm-200 text-primary-900 font-medium px-8 py-3 rounded-sm transition-all"
            >
              Персональный Консультант
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
