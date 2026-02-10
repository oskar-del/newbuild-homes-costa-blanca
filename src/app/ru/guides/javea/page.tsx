import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/ru/guides/javea`

export const metadata: Metadata = {
  title: 'Хавеа - Руководство для русских покупателей на северной Коста-Бланка',
  description: 'Полное руководство по Хавеа: цены на недвижимость, пляжи, люксовый рынок, природа и советы для русских инвесторов.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/javea`,
      sv: `${baseUrl}/se/guides/javea`,
      nl: `${baseUrl}/nl/guides/javea`,
      'nl-BE': `${baseUrl}/nl-be/guides/javea`,
      fr: `${baseUrl}/fr/guides`,
      no: `${baseUrl}/no/guides/javea`,
      de: `${baseUrl}/de/guides/javea`,
      pl: `${baseUrl}/pl/guides/javea`,
      ru: currentUrl,
      'x-default': `${baseUrl}/guides/javea`,
    },
  },
  openGraph: {
    title: 'Хавеа - Руководство для русских покупателей',
    description: 'Полное руководство по люксовой недвижимости и инвестициям в Хавеа',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'ru_RU',
  },
}

const breadcrumbs = [
  { name: 'Главная', url: `${baseUrl}/ru` },
  { name: 'Гиды', url: `${baseUrl}/ru/guides` },
  { name: 'Хавеа', url: currentUrl },
]

const faqs = [
  {
    question: 'Почему Хавеа дороже, чем Торревьеха?',
    answer: 'Хавеа - это экслюзивный район с красивыми пляжами, люксовым рынком и более высоким качеством жизни. Он привлекает более богатых покупателей и международных инвесторов. Спрос больше, что повышает цены.',
  },
  {
    question: 'Каковы средние цены на недвижимость в Хавеа?',
    answer: 'Хавеа значительно дороже. Средние цены составляют 5.000-7.000 евро/м² для существующих объектов и 6.000-9.000 евро/м² для новостроек. Люксовые объекты могут быть в два раза дороже.',
  },
  {
    question: 'Является ли Хавеа хорошим местом для инвестиций?',
    answer: 'Да, если вы ищете стабильность и люкс. Цены на недвижимость растут медленно, но стабильно. Доходы от сдачи ниже (2-4%), но объекты - это стабильные ценности для пенсионеров и богатых инвесторов.',
  },
  {
    question: 'Есть ли русское сообщество в Хавеа?',
    answer: 'Да, есть русские в Хавеа, но меньше, чем в Торревьехе. Это более международное место со скандинавским, британским и голландским присутствием. Многие ищут тишину, а не социальное сообщество.',
  },
  {
    question: 'Что особенного в Хавеа?',
    answer: 'Хавеа расположена на красивом полуострове с тремя фантастическими пляжами: Playa del Arenal, Cala de Finestrat и Arenal Bol Nou. Природа нетронута с холмами и природными заповедниками. Это спокойное и экслюзивное по сравнению с Торревьехой.',
  },
  {
    question: 'Могу ли я получить хороший доход от сдачи недвижимости в Хавеа?',
    answer: 'Возможно, но ниже, чем в Торревьехе. Доходы от сдачи обычно составляют 2-4% в год, так как менее туристический и больше длительной аренды. Лучше всего для личного использования или долгосрочных инвестиций.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function JavaPageRU() {
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
            Хавеа - Эксклюзивное руководство для русских инвесторов
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Хавеа - это дом для состоятельных европейцев и тех, кто ищет люкс на Коста-Бланка. Это руководство раскрывает, почему Хавеа так привлекательна, цены на недвижимость и как инвестировать здесь в качестве русского покупателя.
          </p>
        </div>

        {/* Section: Обзор */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Обзор Хавеи</h2>
          <p className="text-gray-700 mb-6">
            Хавеа (Xàbia) - это экслюзивный прибрежный городок на северной Коста-Бланка с около 28.000 жителями. Это популярное направление для северноевропейцев, ищущих люксовую недвижимость, красивые пляжи и более спокойную жизнь.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Быстрые Факты</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Жители: около 28.000</li>
                <li>Тип: Эксклюзивный прибрежный город</li>
                <li>Климат: Средиземноморский, мягкий</li>
                <li>Солнечные дни/год: около 290</li>
                <li>Расстояние до Аликанте: 105 км</li>
                <li>Пляжи: 3 красивых пляжа</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Выделения</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Люксовый рынок</li>
                <li>Красивая природа и холмы</li>
                <li>Скандинавское окружение</li>
                <li>Спокойное и экслюзивное</li>
                <li>Хорошие инвестиции</li>
                <li>Красивые пляжи</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Климат */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Климат и Окружение</h2>
          <p className="text-gray-700 mb-6">
            Хавеа расположена на красивом полуострове с хорошим климатом и защищена холмами. Это немного прохладнее, чем Торревьеха, но все еще мягко весь год.
          </p>

          <div className="space-y-4">
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

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Красивая природа:</strong> Хавеа окружена естественной красотой с холмами, сосновыми лесами и чистой голубой водой. Идеально для любителей природы.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Цены */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Цены на Недвижимость и Люксовый Рынок</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Средние Цены (2026)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 font-semibold">Существующие объекты:</p>
                  <p className="text-gray-700">5.000-7.000 евро/м²</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Новостройки/Люкс:</p>
                  <p className="text-gray-700">6.000-9.000 евро/м²</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Пример Виллы (300 м²):</p>
                  <p className="text-gray-700">1.800.000-2.700.000 евро (люксовое местоположение)</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Люксовый Рынок</h3>
              <p className="text-gray-700 mb-3">
                Хавеа имеет процветающий люксовый рынок. Объекты выше 1 миллиона евро являются обычными, особенно в премиум-районах таких как Port, Mediterraneo и Pinaret.
              </p>
              <p className="text-gray-700 text-sm">
                Скандинавы и северноевропейцы доминируют покупающую группу, что делает это международным и стабильным рынком.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Популярные Районы</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Port:</strong> Портовая зона, прогулочная дорожка, самый дорогой</li>
                <li><strong>Arenal:</strong> Главный пляж, семейный</li>
                <li><strong>Pinaret и Granadella:</strong> Люксовые резиденции, доминируют виллы</li>
                <li><strong>Espanyolet:</strong> Район среднего класса, более доступный</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Пляжи и Природа */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Пляжи и Красота Природы</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Главные Пляжи</h3>
              <p className="text-gray-700 mb-3">
                Хавеа имеет три главных пляжа, которые все красивы и хорошо поддерживаются:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Playa del Arenal:</strong> Красивейший и самый большой пляж, семейный</li>
                <li><strong>Cala de Finestrat:</strong> Маленький и интимный, великая красота природы</li>
                <li><strong>Arenal Bol Nou:</strong> Спокойный и тихий, к северу от города</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Красота Природы и Активности</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Пешие прогулки по холмам с видом на Средиземноморье</li>
                <li>Снорклинг и дайвинг вдоль пляжей</li>
                <li>Парусный спорт и водные развлечения</li>
                <li>Природный заповедник с редкими растениями</li>
                <li>Прогулки вдоль пляжей</li>
                <li>Культурные мероприятия весь год</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Скандинавское Окружение */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Скандинавское Окружение</h2>
          <p className="text-gray-700 mb-6">
            Хавеа популярна среди скандинавов, что делает ее очень международным окружением. Многие русские, шведы, датчане и голландцы живут здесь.
          </p>

          <div className="space-y-4">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Сообщество и Сеть</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Скандинавские рестораны и кафе</li>
                <li>Международные клубы и организации</li>
                <li>Англо- и скандинавскоговорящие услуги</li>
                <li>Международные школы</li>
                <li>Культурное разнообразие и сообщество</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Качество Жизни</h3>
              <p className="text-gray-700 text-sm mb-3">
                Хавеа предлагает экслюзивный и спокойный образ жизни. Это менее туристичное, чем Торревьеха, но с более высоким стандартом и обслуживанием. Идеально для пенсионеров и богатых семей.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Инвестиции */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Инвестиции и Доход от Сдачи</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Потенциал Сдачи</h3>
              <p className="text-gray-700 mb-3">
                Доход от сдачи в Хавеа ниже, чем в Торревьехе, так как менее ориентирована на туризм. Обычно 2-4% в год:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Главные квартиры: 2-3% доход от сдачи</li>
                <li>Люксовые виллы: 2-4% доход от сдачи</li>
                <li>Лучше всего для личного использования или долгосрочного роста стоимости</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Развитие Цены</h3>
              <p className="text-gray-700">
                Цены на недвижимость в Хавеа имели стабильный рост на протяжении лет. Это безопасная инвестиция для долгосрочного роста капитала, особенно в люксовом сегменте, который продолжает пользоваться спросом у богатых северноевропейцев.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Советы */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Советы для Покупателей</h2>

          <div className="space-y-4">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">1. Планируйте на Люкс</h3>
              <p className="text-gray-700 text-sm">
                Хавеа - это премиум. Подготовьте больший бюджет. Люксовые объекты требуют обслуживания и более высокого налога на недвижимость (IBI).
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">2. Выбирайте Местоположение Осторожно</h3>
              <p className="text-gray-700 text-sm">
                Район определяет стоимость. Инвестиции в Port или близ пляжа имеют более высокую стоимость, чем внутренние районы.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">3. Используйте Локальных Экспертов</h3>
              <p className="text-gray-700 text-sm">
                Работайте с опытными агентами по недвижимости, знающими рынок Хавеи. Они могут помочь найти лучшие предложения.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">4. Планируйте Налоги</h3>
              <p className="text-gray-700 text-sm">
                Хавеа имеет более высокий налог на недвижимость. Планируйте налоговое обязательство перед Россией и Испанией с налоговым консультантом.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">5. Посетите Несколько Раз</h3>
              <p className="text-gray-700 text-sm">
                Перед инвестированием больших денег посетите Хавею несколько раз, чтобы убедиться, что это для вас.
              </p>
            </div>
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
          <h2 className="text-2xl font-light mb-4">Заинтересованы в Люксовой Недвижимости в Хавеа?</h2>
          <p className="mb-6 text-gray-100">
            Мы специализируемся на эксклюзивных новостройках и люксовой недвижимости в Хавеа. Свяжитесь с нами, чтобы найти дом своей мечты.
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
