import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Дома В Инланде Коста Бланка | Лучшая Цена',
  description: 'Найдите доступные дома в чарующих деревнях инланда. Альгорфа, Роiales, Город Кесада. Низкие цены, аутентичная Испания.',
  keywords: 'инланд коста бланка, альгорфа, роiales, город кесада, недвижимость инланда',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/inland',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/inland',
      'sv': 'https://newbuildhomescostablanca.com/sv/inland',
      'nl': 'https://newbuildhomescostablanca.com/nl/inland',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/inland',
      'fr': 'https://newbuildhomescostablanca.com/fr/inland',
      'no': 'https://newbuildhomescostablanca.com/no/inland',
      'de': 'https://newbuildhomescostablanca.com/de/inland',
      'pl': 'https://newbuildhomescostablanca.com/pl/inland',
      'ru': 'https://newbuildhomescostablanca.com/ru/inland',
      'x-default': 'https://newbuildhomescostablanca.com/inland',
    },
  },
};

export default function RUInlandPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Дома В <span className="font-semibold">Инланде</span>
          </h1>
          <p className="text-warm-300 max-w-2xl mx-auto">
            Откройте чарующие деревни внутри Коста Бланка. Лучшая цена, аутентичная испанская жизнь.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900 mb-2">
              Деревни <span className="font-semibold">Инланда</span>
            </h2>
            <p className="text-warm-600">Аутентичная испанская жизнь по доступным ценам</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Альгорфа',
                desc: 'Белые дома в маленькой деревне. Местные рынки, рестораны и спокойная жизнь.',
                price: 'От 120.000 евро',
                features: ['Низкие цены', 'Гольф рядом', 'Местная жизнь', 'Развивается']
              },
              {
                name: 'Роiales',
                desc: 'Очаровательная деревня с белыми домами у реки. Испанское гостеприимство в полной мере.',
                price: 'От 130.000 евро',
                features: ['Река', 'Пешком до магазинов', 'Сообщество', 'Инвестирует']
              },
              {
                name: 'Город Кесада',
                desc: 'Большой инланд-город с хорошей инфраструктурой. Ла Финка гольф рядом.',
                price: 'От 140.000 евро',
                features: ['Инфраструктура', 'Гольф', 'Амниции', 'Растёт']
              },
              {
                name: 'Бенихофар',
                desc: 'Маленькая деревня с деревенским характером. Идеально для пенсионеров и инвесторов.',
                price: 'От 110.000 евро',
                features: ['Самая дешёвая', 'Сообщество', 'Тихая', 'Перспективна']
              },
            ].map((village, i) => (
              <Link
                key={i}
                href={`/ru/properties?town=${village.name}`}
                className="group bg-warm-50 rounded-sm p-8 border border-warm-200 hover:shadow-lg transition-all"
              >
                <h3 className="text-2xl font-semibold text-primary-900 group-hover:text-accent-600 mb-3 transition-colors">
                  {village.name}
                </h3>
                <p className="text-warm-700 mb-6 leading-relaxed">{village.desc}</p>

                <div className="mb-6">
                  <ul className="flex flex-wrap gap-2">
                    {village.features.map((f, j) => (
                      <span key={j} className="bg-accent-100 text-accent-700 text-xs px-3 py-1 rounded-full font-medium">
                        {f}
                      </span>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-warm-200">
                  <span className="text-lg font-bold text-primary-900">{village.price}</span>
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
              Почему <span className="font-semibold">Инланд?</span>
            </h2>
            <p className="text-warm-600">Плюсы и минусы жизни внутри Коста Бланка</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-sm p-8 border border-warm-100">
              <h3 className="text-lg font-semibold text-primary-900 mb-6">Преимущества</h3>
              <ul className="space-y-3 text-warm-600 text-sm">
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>На 40-50% дешевле берега</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Аутентичная испанская культура и жизнь</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Большие участки земли за меньше</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Развивающиеся районы с потенциалом</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Идеально для инвестиций</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-sm p-8 border border-warm-100">
              <h3 className="text-lg font-semibold text-primary-900 mb-6">Рассмотрения</h3>
              <ul className="space-y-3 text-warm-600 text-sm">
                <li className="flex gap-2">
                  <span className="text-accent-600 font-semibold">-</span>
                  <span>Жарче летом, меньше морского бриза</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-600 font-semibold">-</span>
                  <span>Нужен автомобиль для повседневной жизни</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-600 font-semibold">-</span>
                  <span>Меньше иностранных сообществ</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-600 font-semibold">-</span>
                  <span>Медленнее развивающаяся инфраструктура</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-600 font-semibold">-</span>
                  <span>Ниже туристический спрос на аренду</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900 mb-2">
              Инланд <span className="font-semibold">Инвестиции</span>
            </h2>
            <p className="text-warm-600">Потенциал роста в развивающихся районах</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Краткосрочные Выгоды',
                items: [
                  'Низкие цены входа',
                  'Быстрые возвраты через аренду',
                  'Большие пространства',
                  'Меньше конкуренции'
                ]
              },
              {
                title: 'Долгосрочный Потенциал',
                items: [
                  'Развивающаяся инфраструктура',
                  'Растущий спрос на инланд',
                  '5-10% рост в год',
                  'Нецена земли растёт'
                ]
              },
              {
                title: 'Стиль Жизни',
                items: [
                  'Спокойная обстановка',
                  'Природа и зелень',
                  'Настоящие испанцы',
                  'Медленный ритм жизни'
                ]
              },
            ].map((section, i) => (
              <div key={i} className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-warm-600 text-sm">
                      <span className="text-accent-500 font-bold">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-primary-900 mb-4">
            Готовы К <span className="font-semibold">Инланд Жизни?</span>
          </h2>
          <p className="text-warm-600 mb-8">
            Наши специалисты помогут вам найти идеальный дом в инланде.
          </p>
          <Link
            href="/ru/properties?region=inland"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all"
          >
            Смотреть Дома В Инланде
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
