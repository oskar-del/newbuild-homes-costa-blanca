import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Районы Коста Бланка | Гайд По Локациям',
  description: 'Исследуйте все районы Коста Бланка. От Торревьехи на юге до Хавеи на севере. Сравните цены, климат и образ жизни.',
  keywords: 'коста бланка районы, хавеа, торревьеха, мораира, бенидорм, калпе',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/areas',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/areas',
      'sv': 'https://newbuildhomescostablanca.com/sv/areas',
      'nl': 'https://newbuildhomescostablanca.com/nl/areas',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/areas',
      'fr': 'https://newbuildhomescostablanca.com/fr/areas',
      'no': 'https://newbuildhomescostablanca.com/no/areas',
      'de': 'https://newbuildhomescostablanca.com/de/areas',
      'pl': 'https://newbuildhomescostablanca.com/pl/areas',
      'ru': 'https://newbuildhomescostablanca.com/ru/areas',
      'x-default': 'https://newbuildhomescostablanca.com/areas',
    },
  },
};

const AREAS = [
  {
    name: 'Торревьеха (Юг)',
    description: 'Самый популярный город на юге с крупным русскоговорящим сообществом. Солончаковые озера, отличные пляжи и все услуги.',
    highlights: ['300+ дней солнца', 'Русское сообщество', 'Низкие цены', 'Развитая инфраструктура'],
    priceRange: 'От 150.000 евро',
  },
  {
    name: 'Орихуэла Коста (Юг)',
    description: 'Премиум гольф-регион с 5 чемпионатными полями. Спокойная атмосфера и семейные дома.',
    highlights: ['5 гольф-полей', 'Премиум качество', 'Пляжи с голубым флагом', 'Сообщество'],
    priceRange: 'От 250.000 евро',
  },
  {
    name: 'Хавеа (Север)',
    description: 'Самый престижный город на севере с драматичной горной природой. Элегантные виллы и пляж Ареналь.',
    highlights: ['Гора Монтго', 'Люкс виллы', 'Историческое ядро', 'Яхтинг'],
    priceRange: 'От 500.000 евро',
  },
  {
    name: 'Мораира (Север)',
    description: 'Исключительная прибрежная элегантность. Марина для яхт и рестораны Мишлен-звёздные.',
    highlights: ['Яхтный клуб', 'Престиж', 'Чистые бухты', 'Ресторан-сцена'],
    priceRange: 'От 600.000 евро',
  },
  {
    name: 'Калпе (Центр)',
    description: 'Иконический Пенон де Ифач — символ Коста Бланка. Две прекрасные пляжа и хорошее соотношение цены к качеству.',
    highlights: ['Скала Пенон', 'Два пляжа', 'Живая жизнь', 'Хорошая стоимость'],
    priceRange: 'От 300.000 евро',
  },
  {
    name: 'Альтеа (Центр)',
    description: 'Деревня художников с белыми домами и синим куполом церкви. Культурная сцена и закаты.',
    highlights: ['Искусство', 'Белые дома', 'Закаты', 'Культурные события'],
    priceRange: 'От 350.000 евро',
  },
];

export default function RUAreasPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Районы <span className="font-semibold">Коста Бланка</span>
          </h1>
          <p className="text-warm-300 max-w-2xl mx-auto">
            От солнечного юга до престижного севера. Каждый район имеет свой характер и образ жизни.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {AREAS.map((area, i) => (
              <div key={i} className="bg-warm-50 rounded-sm p-8 border border-warm-200 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-semibold text-primary-900 mb-3">{area.name}</h3>
                <p className="text-warm-700 mb-6 leading-relaxed">{area.description}</p>

                <div className="mb-6">
                  <p className="text-sm font-medium text-accent-600 mb-3">Характеристики:</p>
                  <ul className="flex flex-wrap gap-2">
                    {area.highlights.map((h, j) => (
                      <span key={j} className="bg-accent-100 text-accent-700 text-xs px-3 py-1 rounded-full font-medium">
                        {h}
                      </span>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-warm-200">
                  <span className="text-lg font-bold text-primary-900">{area.priceRange}</span>
                  <Link
                    href={`/ru/properties?town=${encodeURIComponent(area.name.split(' (')[0])}`}
                    className="text-accent-600 hover:text-accent-700 font-medium text-sm flex items-center gap-1"
                  >
                    Смотреть Дома
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-primary-900 mb-4">
            Юг против <span className="font-semibold">Севера</span>
          </h2>
          <p className="text-warm-600 mb-8">Какой районе подходит вам больше?</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-sm p-8 border border-warm-100">
              <h3 className="text-xl font-semibold text-primary-900 mb-6">Юг: Торревьеха, Орихуэла</h3>
              <ul className="space-y-3 text-warm-700 text-sm">
                <li className="flex gap-2"><span className="text-accent-500 font-bold">+</span> <span>Более доступные цены на 30-40% дешевле</span></li>
                <li className="flex gap-2"><span className="text-accent-500 font-bold">+</span> <span>Крупные русскоговорящие сообщества</span></li>
                <li className="flex gap-2"><span className="text-accent-500 font-bold">+</span> <span>Идеально для инвестиций и сдачи в аренду</span></li>
                <li className="flex gap-2"><span className="text-accent-500 font-bold">+</span> <span>Абсолютно плоский рельеф, удобное жилье</span></li>
                <li className="flex gap-2"><span className="text-accent-600 font-semibold">-</span> <span>Менее "аутентично испанский" характер</span></li>
              </ul>
            </div>

            <div className="bg-white rounded-sm p-8 border border-warm-100">
              <h3 className="text-xl font-semibold text-primary-900 mb-6">Север: Хавеа, Мораира</h3>
              <ul className="space-y-3 text-warm-700 text-sm">
                <li className="flex gap-2"><span className="text-accent-500 font-bold">+</span> <span>Люкс виллы и премиум качество</span></li>
                <li className="flex gap-2"><span className="text-accent-500 font-bold">+</span> <span>Драматичная горная природа</span></li>
                <li className="flex gap-2"><span className="text-accent-500 font-bold">+</span> <span>Аутентичный испанский характер</span></li>
                <li className="flex gap-2"><span className="text-accent-500 font-bold">+</span> <span>Больше зелени и свежая вода</span></li>
                <li className="flex gap-2"><span className="text-accent-600 font-semibold">-</span> <span>Значительно выше цены</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-primary-900 mb-4">
            Помощь В <span className="font-semibold">Выборе Района</span>
          </h2>
          <p className="text-warm-600 mb-8">
            Не уверены какой район выбрать? Мы проведём консультацию с учетом вашего бюджета и образа жизни.
          </p>
          <Link
            href="/ru/contact"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all"
          >
            Заказать Консультацию
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
