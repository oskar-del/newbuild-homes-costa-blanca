import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Дома У Гольф-Клубов На Коста Бланка | Люкс Виллы',
  description: 'Найдите премиум виллы рядом с лучшими гольф-клубами Коста Бланка. Разработки в Орихуэла Коста, Ла Финке и других.',
  keywords: 'гольф коста бланка, дома у гольфа, виллы гольф',
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

const GOLF_CLUBS = [
  { name: 'Орихуэла Коста Гольф Клубы', location: 'Орихуэла Коста', description: 'Пять чемпионатных полей в одном регионе' },
  { name: 'Ла Финка Гольф Клуб', location: 'Город Кесада', description: 'Чемпионатное поле с видом на море' },
  { name: 'Вилламартин Гольф Клуб', location: 'Вилламартин', description: 'Один из самых известных клубов' },
  { name: 'Лас Колинас Гольф Клуб', location: 'Кумбре дель Сол', description: 'Люкс гольф-курорт' },
  { name: 'Кампоамор Гольф Клуб', location: 'Кампоамор', description: 'Историческое поле, основано в 1972' },
  { name: 'Альгорфа Гольф Клуб', location: 'Альгорфа', description: 'Спокойное поле в инланде' },
];

export default function RUGolfPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Гольф <span className="font-semibold">Недвижимость</span>
          </h1>
          <p className="text-warm-300 max-w-2xl mx-auto">
            Премиум виллы и квартиры рядом с лучшими гольф-клубами Коста Бланка.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900 mb-2">
              Гольф <span className="font-semibold">Клубы</span>
            </h2>
            <p className="text-warm-600">Чемпионатные поля на Коста Бланка</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GOLF_CLUBS.map((club, i) => (
              <div key={i} className="bg-warm-50 rounded-sm p-6 border border-warm-200 hover:shadow-lg transition-all">
                <div className="text-4xl font-bold text-accent-500 mb-2">18</div>
                <h3 className="text-lg font-semibold text-primary-900 mb-1">{club.name}</h3>
                <p className="text-sm text-warm-600 mb-4">{club.location}</p>
                <p className="text-warm-600 text-sm">{club.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900 mb-2">
              Почему Гольф <span className="font-semibold">Недвижимость?</span>
            </h2>
            <p className="text-warm-600">Инвестируйте в образ жизни и возможности аренды</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-sm p-6 border border-warm-100">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Образ Жизни</h3>
              <ul className="space-y-3 text-warm-600 text-sm">
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Доступ к чемпионатным полям</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Премиум сообщество гольфистов</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Шикарные клубные дома и рестораны</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Спокойная, ухоженная обстановка</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-sm p-6 border border-warm-100">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Инвестиция</h3>
              <ul className="space-y-3 text-warm-600 text-sm">
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Сдача в аренду туристам круглый год</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Доход от аренды 6-8% в год</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Стабильный рост стоимости недвижимости</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 font-bold">+</span>
                  <span>Высокий спрос в сезон</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-primary-900 mb-4">
            Готовы Начать <span className="font-semibold">Поиск?</span>
          </h2>
          <p className="text-warm-600 mb-8">
            Смотрите все дома у гольф-клубов или забронируйте консультацию с нашими экспертами.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ru/properties?region=golf"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all"
            >
              Смотреть Все Гольф Дома
            </Link>
            <Link
              href="/ru/contact"
              className="bg-warm-100 hover:bg-warm-200 text-primary-900 font-medium px-8 py-3 rounded-sm transition-all"
            >
              Консультация Эксперта
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
