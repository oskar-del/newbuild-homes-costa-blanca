import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Блог Коста Бланка | Советы По Покупке Недвижимости',
  description: 'Читайте статьи о покупке недвижимости в Испании, инвестициях, налогах, визах и образе жизни на Коста Бланка.',
  keywords: 'блог коста бланка, советы покупка недвижимости испания, налоги испания',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/blog',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/blog',
      'sv': 'https://newbuildhomescostablanca.com/sv/blog',
      'nl': 'https://newbuildhomescostablanca.com/nl/blog',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/blog',
      'fr': 'https://newbuildhomescostablanca.com/fr/blog',
      'no': 'https://newbuildhomescostablanca.com/no/blog',
      'de': 'https://newbuildhomescostablanca.com/de/blog',
      'pl': 'https://newbuildhomescostablanca.com/pl/blog',
      'ru': 'https://newbuildhomescostablanca.com/ru/blog',
      'x-default': 'https://newbuildhomescostablanca.com/blog',
    },
  },
};

const BLOG_POSTS = [
  {
    title: 'Золотая Виза Испании: Полное Руководство для Русских Инвесторов',
    excerpt: 'Узнайте всё о программе Golden Visa и как покупка дома стоимостью 500.000 евро даёт вам вид на жительство в Испании.',
    date: 'Декабрь 2024',
  },
  {
    title: 'Налоги На Имущество В Испании: IBI, Транспортный Налог и Другое',
    excerpt: 'Полное объяснение налогов, которые платят собственники недвижимости в Испании и как их минимизировать.',
    date: 'Ноябрь 2024',
  },
  {
    title: 'Получение НИЕ (Номера Идентификации Иностранца) В Испании',
    excerpt: 'Пошаговый процесс получения НИЕ для иностранцев. Требуется ли это при покупке дома?',
    date: 'Октябрь 2024',
  },
  {
    title: 'Ипотека В Испании для Русскоговорящих Покупателей',
    excerpt: 'Сравнение испанских банков, требования к кредиту и процессе финансирования покупки недвижимости.',
    date: 'Сентябрь 2024',
  },
  {
    title: 'Готовый Дом vs. На Стадии Планирования: Плюсы и Минусы',
    excerpt: 'Анализ преимуществ и недостатков покупки готовой новостройки или дома в процессе строительства.',
    date: 'Август 2024',
  },
  {
    title: 'Торревьеха vs. Хавеа: Какой Город Выбрать На Коста Бланка?',
    excerpt: 'Подробное сравнение двух популярных городов: цены, климат, образ жизни и сообщества.',
    date: 'Июль 2024',
  },
];

export default function RUBlogPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Блог и <span className="font-semibold">Полезные Статьи</span>
          </h1>
          <p className="text-warm-300 max-w-2xl mx-auto">
            Советы, гайды и информация для русскоговорящих покупателей недвижимости на Коста Бланка.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            {BLOG_POSTS.map((post, i) => (
              <Link
                key={i}
                href="#"
                className="group block bg-warm-50 rounded-sm p-8 border border-warm-200 hover:shadow-lg hover:border-accent-200 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm text-warm-500">{post.date}</span>
                  <span className="text-accent-600 font-medium text-sm group-hover:text-accent-700">
                    Читать Статью
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-primary-900 group-hover:text-accent-600 mb-3 transition-colors">
                  {post.title}
                </h3>
                <p className="text-warm-600">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-primary-900 mb-4">
            Подпишитесь На <span className="font-semibold">Обновления</span>
          </h2>
          <p className="text-warm-600 mb-8">
            Получайте новые статьи и советы прямо на вашу почту.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваша почта"
              className="flex-1 px-4 py-3 rounded-sm border border-warm-300 focus:outline-none focus:border-accent-500"
            />
            <button
              type="submit"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-all"
            >
              Подписаться
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
