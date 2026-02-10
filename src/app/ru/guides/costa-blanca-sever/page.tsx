import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/ru/guides/costa-blanca-sever`

export const metadata: Metadata = {
  title: 'Северная Коста-Бланка - Руководство для русских покупателей',
  description: 'Полное руководство по Северной Коста-Бланка: Хавеа, Альтеа, Бенидорм. Цены на недвижимость, климат, качество жизни и советы для русских инвесторов.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/costa-blanca-north`,
      sv: `${baseUrl}/se/guides/costa-blanca-north`,
      nl: `${baseUrl}/nl/guides/costa-blanca-noord`,
      'nl-BE': `${baseUrl}/nl-be/guides/costa-blanca-noord`,
      fr: `${baseUrl}/fr/guides`,
      no: `${baseUrl}/no/guides/costa-blanca-nord`,
      de: `${baseUrl}/de/guides/costa-blanca-nord`,
      pl: `${baseUrl}/pl/guides/costa-blanca-polnoc`,
      ru: currentUrl,
      'x-default': `${baseUrl}/guides/costa-blanca-north`,
    },
  },
  openGraph: {
    title: 'Северная Коста-Бланка - Руководство для русских покупателей',
    description: 'Полное руководство по Северной Коста-Бланка и ее красивым городам',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'ru_RU',
  },
}

const breadcrumbs = [
  { name: 'Главная', url: `${baseUrl}/ru` },
  { name: 'Гиды', url: `${baseUrl}/ru/guides` },
  { name: 'Северная Коста-Бланка', url: currentUrl },
]

const faqs = [
  {
    question: 'В чем разница между Северной и Южной Коста-Бланка?',
    answer: 'Север более эксклюзивен, дороже и менее туристичен, чем Юг. Север имеет красивые природные зоны и лучшую инфраструктуру. Юг дешевле, более туристичен и имеет большое русское сообщество.',
  },
  {
    question: 'Какие города находятся в Северной Коста-Бланка?',
    answer: 'Главные города - Хавеа, Морайра, Кальпе, Альтеа, Бенидорм, Дения и Теулада. Каждый город имеет свой характер и привлекает разные типы покупателей.',
  },
  {
    question: 'Каковы цены на недвижимость на Севере?',
    answer: 'Север обычно дороже, чем Юг. Цены варьируются от 4.000-7.000 евро/м² для обычных домов и выше для люксовой недвижимости. Хавеа и Морайра - самые дорогие.',
  },
  {
    question: 'Является ли Северная Коста-Бланка хорошей для инвестиций?',
    answer: 'Да, Север стабилен для долгосрочных инвестиций. Цены растут медленно, но стабильно. Доход от сдачи 2-4% в год. Лучше для пенсионеров или богатых инвесторов.',
  },
  {
    question: 'Есть ли русское сообщество на Севере?',
    answer: 'Да, но меньше, чем на Юге. Русские есть во всех северных городах, особенно в Хавеа и Бенидорме. Окружение более международное в целом.',
  },
  {
    question: 'Какой климат на Северной Коста-Бланка?',
    answer: 'Мягкий весь год с около 290 солнечными днями. Немного холоднее зимы, чем на Юге (8-15°C в январе), но красивее лета. Холмы защищают от холодных ветров.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function CostaBlancaSeverPageRU() {
  return (
    <div className="min-h-screen bg-white">
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            {breadcrumbs.map((crumb, idx) => (
              <div key={crumb.url} className="flex items-center">
                {idx > 0 && <span className="mx-2 text-gray-400">/</span>}
                {idx === breadcrumbs.length - 1 ? (
                  <span className="text-primary-900 font-medium">{crumb.name}</span>
                ) : (
                  <Link href={crumb.url} className="text-accent-500 hover:text-accent-600">
                    {crumb.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light text-primary-900 mb-4 leading-tight">
            Северная Коста-Бланка - Полное руководство для русских покупателей
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Северная Коста-Бланка является домом для некоторых из самых красивых и эксклюзивных прибрежных городов Испании. Это руководство раскрывает каждый город, цены на недвижимость и почему север привлекает русских, ищущих люкс и стабильность.
          </p>
        </div>

        {/* Section: Обзор */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Обзор Северной Коста-Бланка</h2>
          <p className="text-gray-700 mb-6">
            Северная Коста-Бланка простирается от Дении на севере до Альтеи на юге. Регион известен красивыми холмистыми пейзажами, кристально чистой водой, менее туристичным, чем Юг, и более интегрированным скандинавским и международным сообществом.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Характеристики</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Эксклюзивный и красивый</li>
                <li>Более высокие цены на недвижимость</li>
                <li>Менее туристичный</li>
                <li>Красивая природа и холмы</li>
                <li>Скандинавское окружение</li>
                <li>Стабильный и люксовый</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Главные Города</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Хавеа - Эксклюзивный и красивый</li>
                <li>Морайра - Люксовый и интимный</li>
                <li>Кальпе - Семейный город</li>
                <li>Альтеа - Артисты и культура</li>
                <li>Бенидорм - Большой и живой</li>
                <li>Дения - Традиционная гавань</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Главные Города */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Главные Города Северной Коста-Бланка</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Хавеа - Эксклюзивный и Красивый</h3>
              <p className="text-gray-700 text-sm mb-3">
                Хавеа - самый эксклюзивный город. Красивые пляжи, нетронутая природа, люксовый рынок. Население около 28.000. Цены на недвижимость 5.000-7.000 евро/м². Скандинавское окружение.
              </p>
              <p className="text-gray-700 text-sm">Лучше всего для: Состоятельных пенсионеров и семей, ищущих люкс и тишину.</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Морайра - Люксовый и Интимный</h3>
              <p className="text-gray-700 text-sm mb-3">
                Морайра - небольшой, люксовый город с около 6.000 жителями. Еще более эксклюзивный, чем Хавеа. Цены на недвижимость 6.000-8.000 евро/м². Спокойный и классический.
              </p>
              <p className="text-gray-700 text-sm">Лучше всего для: Людей, ищущих дополнительную приватность и тишину.</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Кальпе - Семьи и Спектакулярная География</h3>
              <p className="text-gray-700 text-sm mb-3">
                Кальпе известна иконичным скальным образованием (Peñón de Ifach). Население около 25.000. Цены на недвижимость 4.000-6.000 евро/м². Семейный.
              </p>
              <p className="text-gray-700 text-sm">Лучше всего для: Семей и любителей природы.</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Альтеа - Артисты и Культура</h3>
              <p className="text-gray-700 text-sm mb-3">
                Альтеа известна художественной и культурной сценой. Население около 6.000. Цены на недвижимость 4.000-5.500 евро/м². Живописный старый город. Международное окружение.
              </p>
              <p className="text-gray-700 text-sm">Лучше всего для: Артистов, пенсионеров и культурно-интересующихся.</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Бенидорм - Большой Город и Жизнь</h3>
              <p className="text-gray-700 text-sm mb-3">
                Бенидорм больше и более динамичный. Население около 72.000. Цены на недвижимость 3.500-5.000 евро/м². Активная ночная жизнь и туризм. Больше русских здесь.
              </p>
              <p className="text-gray-700 text-sm">Лучше всего для: Семей, ищущих активность и русское сообщество.</p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Дения - Традиционная Гавань</h3>
              <p className="text-gray-700 text-sm mb-3">
                Дения - традиционная гавань на севере. Население около 42.000. Цены на недвижимость 3.500-4.500 евро/м². Менее туристичная, более локальная. Хорошая кулинарная сцена.
              </p>
              <p className="text-gray-700 text-sm">Лучше всего для: Ищущих аутентичную Испанию с северной инфраструктурой.</p>
            </div>
          </div>
        </section>

        {/* Section: Климат */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Климат и Погода</h2>
          <p className="text-gray-700 mb-6">
            Северная Коста-Бланка имеет мягкий климат весь год. Это немного холоднее, чем Юг, но все еще приятно. Около 290 солнечных дней в году.
          </p>

          <div className="bg-gray-50 rounded-sm p-6">
            <h3 className="font-semibold text-primary-900 mb-3">Средние Температуры</h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Январь</span>
                <span className="font-semibold">8-15°C</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Апрель</span>
                <span className="font-semibold">12-21°C</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Июль</span>
                <span className="font-semibold">21-29°C</span>
              </div>
              <div className="flex justify-between">
                <span>Октябрь</span>
                <span className="font-semibold">15-25°C</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Цены и Инвестиции */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Цены на Недвижимость и Инвестиции</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Обзор Цен по Городам (2026)</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold">Хавеа: 5.000-7.000 евро/м²</p>
                  <p>Самый дорогой, эксклюзивный</p>
                </div>
                <div>
                  <p className="font-semibold">Морайра: 6.000-8.000 евро/м²</p>
                  <p>Ультра-эксклюзивный, маленький</p>
                </div>
                <div>
                  <p className="font-semibold">Кальпе: 4.000-6.000 евро/м²</p>
                  <p>Семейный</p>
                </div>
                <div>
                  <p className="font-semibold">Альтеа: 4.000-5.500 евро/м²</p>
                  <p>Культура и артисты</p>
                </div>
                <div>
                  <p className="font-semibold">Бенидорм: 3.500-5.000 евро/м²</p>
                  <p>Более доступный, активный</p>
                </div>
                <div>
                  <p className="font-semibold">Дения: 3.500-4.500 евро/м²</p>
                  <p>Традиционный и доступный</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Доход от Сдачи</h3>
              <p className="text-gray-700 text-sm mb-3">
                Обычно более низкий доход от сдачи на Севере, чем на Юге:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Хавеа, Морайра: 2-3% в год</li>
                <li>Кальпе, Альтеа: 2.5-3.5% в год</li>
                <li>Бенидорм: 3-4% в год (больше туризма)</li>
                <li>Дения: 2-3% в год</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Инвестиционная Стратегия</h3>
              <p className="text-gray-700 text-sm">
                Северная Коста-Бланка лучше всего подходит для долгосрочных инвестиций или личного использования. Цены растут медленно, но стабильно. Налог на недвижимость (IBI) выше, чем на Юге. Планируйте стабильность вместо высокого дохода.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Инфраструктура */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Инфраструктура и Услуги</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Транспорт и Полеты</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Аэропорт Аликанте: 100-120 км на юг</li>
                <li>Аэропорт Валенсии: 140 км на север</li>
                <li>Автострада до обоих аэропортов</li>
                <li>Автобусы и услуги между городами</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Услуги</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Международные школы во всех городах</li>
                <li>Государственные и частные больницы</li>
                <li>Англо- и русскоговорящие врачи</li>
                <li>Хорошая инфраструктура торговых центров</li>
                <li>Рестораны для всех предпочтений</li>
                <li>Клубы и организации</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Север vs Юг */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Север vs Юг - В чем Разница?</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-3 text-left font-semibold text-primary-900">Аспект</th>
                  <th className="border p-3 text-left font-semibold text-primary-900">Север</th>
                  <th className="border p-3 text-left font-semibold text-primary-900">Юг</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">Цена Недвижимости</td>
                  <td className="border p-3">Дорогая (4.000-8.000 евро/м²)</td>
                  <td className="border p-3">Дешевле (2.500-4.000 евро/м²)</td>
                </tr>
                <tr className="bg-warm-50">
                  <td className="border p-3">Доход от Сдачи</td>
                  <td className="border p-3">Низкий (2-3%)</td>
                  <td className="border p-3">Высокий (4-6%)</td>
                </tr>
                <tr>
                  <td className="border p-3">Туристическая Ориентация</td>
                  <td className="border p-3">Менее туристичный</td>
                  <td className="border p-3">Очень туристичный</td>
                </tr>
                <tr className="bg-warm-50">
                  <td className="border p-3">Русское Сообщество</td>
                  <td className="border p-3">Скандинавское окружение</td>
                  <td className="border p-3">Большое русское сообщество</td>
                </tr>
                <tr>
                  <td className="border p-3">Климат</td>
                  <td className="border p-3">Мягкий (слегка холодный)</td>
                  <td className="border p-3">Теплый весь год</td>
                </tr>
                <tr className="bg-warm-50">
                  <td className="border p-3">Красота Природы</td>
                  <td className="border p-3">Красивые холмы и пляжи</td>
                  <td className="border p-3">Плоское, дюны</td>
                </tr>
                <tr>
                  <td className="border p-3">Лучше Для</td>
                  <td className="border p-3">Люкс, тишина, инвестиция</td>
                  <td className="border p-3">Туризм, доход</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-primary-900 mb-8">Часто Задаваемые Вопросы</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border rounded-sm p-6 border-gray-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-900 text-white rounded-sm p-8 mt-12">
          <h2 className="text-2xl font-light mb-4">Заинтересованы в Недвижимости на Северной Коста-Бланка?</h2>
          <p className="mb-6 text-gray-100">
            У нас есть эксклюзивные новостройки и недвижимость во всех северных городах. Свяжитесь с нами, чтобы найти идеальное место жительства.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent-500 text-white px-6 py-3 rounded-sm font-semibold hover:bg-accent-600 transition"
            >
              Свяжитесь через WhatsApp
            </Link>
            <Link
              href="/ru/contact"
              className="inline-block bg-white text-primary-900 px-6 py-3 rounded-sm font-semibold hover:bg-gray-100 transition"
            >
              Форма Контакта
            </Link>
          </div>
        </section>

        {/* Back to guides */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/ru/guides"
            className="text-accent-500 hover:text-accent-600 font-semibold flex items-center"
          >
            Вернуться ко всем гайдам
          </Link>
        </div>
      </main>
    </div>
  )
}
