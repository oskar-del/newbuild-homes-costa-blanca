import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Гайды По Покупке Недвижимости На Коста Бланка',
  description: 'Полные гайды по процессу покупки, налогам, визам, ипотеке и образу жизни на Коста Бланка для русскоговорящих.',
  keywords: 'гайды, процесс покупки, налоги, виза, ипотека, коста бланка',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/guides',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides',
      'no': 'https://newbuildhomescostablanca.com/no/guides',
      'de': 'https://newbuildhomescostablanca.com/de/guides',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides',
      'x-default': 'https://newbuildhomescostablanca.com/guides',
    },
  },
};

const GUIDES = [
  {
    slug: 'process-pokupki',
    title: 'Процесс Покупки Недвижимости В Испании',
    description: 'Полное руководство по всем шагам: от выбора дома до получения ключей. Сроки, документы, деньги.',
    icon: 'Шаг За Шагом',
  },
  {
    slug: 'nomer-nie',
    title: 'Как Получить Номер НИЕ В Испании',
    description: 'Номер идентификации иностранца (НИЕ) необходим для покупки. Полная инструкция по получению.',
    icon: 'НИЕ',
  },
  {
    slug: 'rashody-nalogi',
    title: 'Расходы и Налоги При Покупке',
    description: 'Налог на передачу имущества (6%), налог на имущество (IBI), коммунальные услуги, финансирование.',
    icon: 'Финансы',
  },
  {
    slug: 'ipoteka',
    title: 'Ипотека Для Иностранцев В Испании',
    description: 'Как получить ипотеку через испанский банк? CaixaBank, BBVA, Santander. Требования и процесс.',
    icon: 'Деньги',
  },
  {
    slug: 'pochemu-novostroyka',
    title: 'Почему Выбрать Новостройки Вместо Старых Домов',
    description: '10-летняя гарантия, энергоэффективность, персонализация, низкие расходы на содержание.',
    icon: 'Новое',
  },
  {
    slug: 'pod-klyuch-vs-plan',
    title: 'Готовый Дом vs. На Стадии Планирования',
    description: 'Сравнение покупки готового дома и на стадии строительства. Плюсы и минусы обоих вариантов.',
    icon: 'Выбор',
  },
  {
    slug: 'sever-vs-yug',
    title: 'Север против Юга Коста Бланка',
    description: 'Подробное сравнение Северной и Южной Коста Бланка. Цены, образ жизни, климат, сообщества.',
    icon: 'Карта',
  },
  {
    slug: 'torrevieja',
    title: 'Торревьеха',
    description: 'Полное руководство по Торревьехе для русских покупателей и переселенцев',
    icon: 'Город',
  },
  {
    slug: 'javea',
    title: 'Хавеа',
    description: 'Эксклюзивное руководство по Хавеа для русских инвесторов',
    icon: 'Люкс',
  },
  {
    slug: 'costa-blanca-sever',
    title: 'Северная Коста-Бланка',
    description: 'Полное руководство по Северной Коста-Бланка для русских покупателей',
    icon: 'Север',
  },
];

export default function RUGuidesPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Полезные <span className="font-semibold">Гайды</span>
          </h1>
          <p className="text-warm-300 max-w-2xl mx-auto">
            Всё что нужно знать о покупке недвижимости на Коста Бланка. От процесса до налогов.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/ru/guides/${guide.slug}`}
                className="group bg-warm-50 rounded-sm p-8 border border-warm-200 hover:shadow-lg hover:border-accent-300 transition-all"
              >
                <div className="text-4xl font-bold text-accent-500 mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  {guide.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary-900 group-hover:text-accent-600 mb-3 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-warm-600 text-sm mb-6">
                  {guide.description}
                </p>
                <div className="flex items-center text-accent-600 font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                  Читать Гайд
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-sm p-12 border border-warm-200">
            <h2 className="text-3xl font-light text-primary-900 mb-6">
              Не Знаете С <span className="font-semibold">Чего Начать?</span>
            </h2>
            <p className="text-warm-600 mb-8 leading-relaxed">
              Рекомендуем начать с нашего полного гайда по процессу покупки, который объясняет каждый шаг от выбора дома до получения ключей. Затем изучите информацию о налогах и, если применимо, о получении НИЕ и ипотеке.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/ru/guides/process-pokupki"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all text-center"
              >
                Начать С Процесса
              </Link>
              <Link
                href="/ru/contact"
                className="bg-warm-100 hover:bg-warm-200 text-primary-900 font-medium px-8 py-3 rounded-sm transition-all text-center"
              >
                Поговорить С Экспертом
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light text-primary-900 mb-12 text-center">
            Часто Задаваемые <span className="font-semibold">Вопросы О Гайдах</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: 'Сколько времени занимает покупка дома?',
                a: 'Обычно 4-8 недель от поиска до подписания документов. Готовые дома быстрее, дома на стадии строительства дольше.',
              },
              {
                q: 'Нужен ли мне адвокат при покупке?',
                a: 'Да, рекомендуется нанять адвоката. Он защищает ваши интересы и помогает с документами и налогами.',
              },
              {
                q: 'Какой депозит нужен для начала?',
                a: 'Обычно 30-40% от цены для ипотеки. Можно платить и 100% наличными, если у вас есть возможность.',
              },
              {
                q: 'Дорого ли это в содержании?',
                a: 'Годовые расходы 2000-5000 евро в зависимости от размера и локации. Включает налог на имущество и коммунальные.',
              },
              {
                q: 'Могу ли я сдавать дом в аренду?',
                a: 'Да, дома в туристических районах легко сдаются в аренду туристам. Доход 5-8% в год возможен.',
              },
              {
                q: 'Как работает Golden Visa?',
                a: 'Покупка дома за 500.000+ евро дает право на резидентский статус для вас и вашей семьи в Испании.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">{faq.q}</h3>
                <p className="text-warm-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            У Вас Остались <span className="font-semibold">Вопросы?</span>
          </h2>
          <p className="text-warm-300 mb-8">
            Наша команда готова ответить на любые вопросы о процессе, налогах, визах и образе жизни на Коста Бланка.
          </p>
          <Link
            href="/ru/contact"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all"
          >
            Связаться С Нами
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
