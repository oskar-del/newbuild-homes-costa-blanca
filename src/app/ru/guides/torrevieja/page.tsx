import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/ru/guides/torrevieja`

export const metadata: Metadata = {
  title: 'Торревьеха - Полное руководство для российских покупателей и переселенцев',
  description: 'Полное руководство по Торревьехе: цены на недвижимость, климат, инфраструктура, русское сообщество и советы для российских покупателей.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/torrevieja`,
      sv: `${baseUrl}/se/guides/torrevieja`,
      nl: `${baseUrl}/nl/guides/torrevieja`,
      'nl-BE': `${baseUrl}/nl-be/guides/torrevieja`,
      fr: `${baseUrl}/fr/guides`,
      no: `${baseUrl}/no/guides/torrevieja`,
      de: `${baseUrl}/de/guides/torrevieja`,
      pl: `${baseUrl}/pl/guides/torrevieja`,
      ru: currentUrl,
      'x-default': `${baseUrl}/guides/torrevieja`,
    },
  },
  openGraph: {
    title: 'Торревьеха - Руководство для российских покупателей',
    description: 'Полное руководство по жизни и покупке недвижимости в Торревьехе',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'ru_RU',
  },
}

const breadcrumbs = [
  { name: 'Главная', url: `${baseUrl}/ru` },
  { name: 'Гиды', url: `${baseUrl}/ru/guides` },
  { name: 'Торревьеха', url: currentUrl },
]

const faqs = [
  {
    question: 'Почему Торревьеха популярна среди российских покупателей?',
    answer: 'Торревьеха популярна благодаря низким ценам, большому русскому сообществу, хорошей инфраструктуре для пенсионеров, красивым пляжам и близости к аэропорту Аликанте. Это идеальное место для русских, ищущих жилье за границей.',
  },
  {
    question: 'Какие средние цены на недвижимость в Торревьехе?',
    answer: 'Торревьеха дешевле, чем север. Средние цены составляют 3.000-4.000 евро/м² для существующих объектов и 3.500-5.000 евро/м² для новостроек. Это примерно на 30-40% дешевле, чем Хавеа или Альтеа.',
  },
  {
    question: 'Каков климат в Торревьехе?',
    answer: 'Торревьеха имеет более 300 солнечных дней в году с сухим средиземноморским климатом. Зимние температуры около 16°C, летние выше 30°C. Это одно из самых солнечных мест на Коста-Бланка.',
  },
  {
    question: 'Есть ли русское сообщество в Торревьехе?',
    answer: 'Да, очень активное! Торревьеха имеет одно из самых больших русских сообществ на Коста-Бланка с ресторанами, магазинами, организациями и клубами. Вы легко найдете других русских для общения.',
  },
  {
    question: 'Доступна ли Golden Visa через покупку в Торревьехе?',
    answer: 'Golden Visa требует инвестиции в недвижимость на сумму от 500.000 евро. В Торревьехе можно приобрести качественное жилище по этой цене, получив резидентский статус для вас и вашей семьи.',
  },
  {
    question: 'Могу ли я получить хороший доход от сдачи в аренду?',
    answer: 'Да, Торревьеха обычно предлагает хороший доход от сдачи в аренду в размере 4-6% в год благодаря туристам и пенсионерам. Это популярное место для отпуска, особенно летом.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function TorreviejaPageRU() {
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
            Торревьеха - Полное руководство для российских переселенцев
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Торревьеха - один из самых популярных направлений для российских переселенцев на Коста-Бланка. Это руководство содержит всю информацию об этом очаровательном портовом городе: от цен на недвижимость до инфраструктуры и русского сообщества.
          </p>
        </div>

        {/* Section: Обзор */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Обзор Торревьехи</h2>
          <p className="text-gray-700 mb-6">
            Торревьеха - это оживленный портовый город на южной Коста-Бланка с около 80.000 жителями, из которых около 4.000-5.000 - русские. Город известен красивыми пляжами, активной ночной жизнью и хорошо развитым русским сообществом.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Быстрые Факты</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Жители: около 80.000</li>
                <li>Русские жители: около 4.000-5.000</li>
                <li>Климат: Средиземноморский, сухой</li>
                <li>Солнечные дни/год: более 300</li>
                <li>Расстояние до Аликанте: 50-60 км</li>
                <li>Пляж: Длинные песчаные пляжи</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Выделения</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Большое русское сообщество</li>
                <li>Доступные цены на недвижимость</li>
                <li>Хорошая инфраструктура</li>
                <li>Активная ночная жизнь</li>
                <li>Водные развлечения</li>
                <li>Хорошие доходы от сдачи</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Климат */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Климат и Погода</h2>
          <p className="text-gray-700 mb-6">
            Торревьеха имеет один из лучших климатов на Коста-Бланка с более чем 300 солнечными днями в году.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Средние Температуры</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span>Январь</span>
                  <span className="font-semibold">9-16°C</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Апрель</span>
                  <span className="font-semibold">13-22°C</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Июль</span>
                  <span className="font-semibold">22-31°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Октябрь</span>
                  <span className="font-semibold">16-26°C</span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700">
                <strong>Идеально:</strong> Весь год погода мягкая и приятная. Мороз практически неизвестен, а лета теплые, но не переразвивающиеся.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Цены на Недвижимость */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Цены на Недвижимость и Инвестиции</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Средние Цены (2026)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 font-semibold">Существующие объекты:</p>
                  <p className="text-gray-700">2.500-3.500 евро/м²</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Новостройки:</p>
                  <p className="text-gray-700">3.500-5.000 евро/м²</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Пример Квартиры (80 м²):</p>
                  <p className="text-gray-700">200.000-400.000 евро (новые до премиум-локации)</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Доход от Сдачи</h3>
              <p className="text-gray-700 mb-3">
                Торревьеха предлагает привлекательные доходы от сдачи в размере 4-6% в год. Это выше среднего на Коста-Бланка, так как Торревьеха - популярное туристическое направление.
              </p>
              <p className="text-gray-700 text-sm">
                Инвестиция в размере 250.000 евро может приносить годовой доход от сдачи в размере 10.000-15.000 евро (при правильном управлении и бронировании).
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Популярные Районы для Покупателей</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Центр (Paseo Maritimo):</strong> Рядом с пляжем и портом, оживленный, более высокие цены</li>
                <li><strong>La Mata:</strong> Тихий пляжный поселок, 5 км на север, семейный</li>
                <li><strong>El Remo:</strong> Жилой район, средние цены, хорошая инфраструктура</li>
                <li><strong>Punta Prima:</strong> На юге, резиденциальный район, современный, более высокие цены</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Русское Сообщество */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Русское Сообщество в Торревьехе</h2>
          <p className="text-gray-700 mb-6">
            Торревьеха имеет очень активное и хорошо развитое русское сообщество, что делает ее идеальным местом для русских переселенцев.
          </p>

          <div className="space-y-4">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Русская Инфраструктура</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Русские врачи и стоматологи (русскоговорящие)</li>
                <li>Русские рестораны и кафе</li>
                <li>Русские магазины и организации</li>
                <li>Русская часовня и религиозные сообщества</li>
                <li>Русские агенты по недвижимости</li>
                <li>Русские налоговые консультанты и адвокаты</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Русские Мероприятия</h3>
              <p className="text-gray-700 text-sm mb-3">
                Весь год проходят русские мероприятия:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Праздник Нового года</li>
                <li>Русские рождественские ярмарки</li>
                <li>Встречи клубов и социальные мероприятия</li>
                <li>Культурные мероприятия</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Инфраструктура */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Инфраструктура и Услуги</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Здоровье и Врачи</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Государственная больница</li>
                <li>Много частных врачей и клиник</li>
                <li>Русскоговорящие врачи</li>
                <li>Аптеки на каждом углу</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Покупки и Снабжение</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Большой торговый центр (Castel Marques)</li>
                <li>Супермаркеты (Mercadona, Carrefour и т.д.)</li>
                <li>Рынки (четвергов рынок)</li>
                <li>Рестораны и бары везде</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Образование</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Государственные испанские школы</li>
                <li>Частные международные школы</li>
                <li>Русское обучение доступно</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Транспорт</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Автобусные соединения везде</li>
                <li>Стоянки такси поблизости</li>
                <li>Поезд в аэропорт Аликанте</li>
                <li>Хорошие дорожные соединения</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Пляжи и Активности */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Пляжи, Активности и Досуг</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Пляжи</h3>
              <p className="text-gray-700 mb-3">
                Торревьеха известна красивыми, широкими песчаными пляжами. Главные пляжи:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Playa del Centro:</strong> Главный пляж с прогулочной дорожкой, оживленный</li>
                <li><strong>Playa La Mata:</strong> Спокойный пляж, 5 км на север</li>
                <li><strong>Playa Flamenca:</strong> На юге, спокойная, менее туристическая</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Активности</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Водные развлечения (гидроцикл, парусный спорт, серфинг)</li>
                <li>Гольф - несколько полей для гольфа поблизости</li>
                <li>Лодочные прогулки и экскурсии</li>
                <li>Ночная жизнь и дискотеки</li>
                <li>Пешие прогулки в окрестностях</li>
                <li>Природный заповедник Лагуна Роса</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Ночная Жизнь</h3>
              <p className="text-gray-700">
                Торревьеха известна активной ночной жизнью со множеством баров, клубов и дискотек. Есть что-то для всех: от традиционных баров до современных клубов с DJ. Ночная жизнь особенно активна в летние месяцы.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Стоимость Жизни */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Стоимость Жизни в Торревьехе</h2>

          <div className="bg-gray-50 rounded-sm p-6">
            <h3 className="font-semibold text-primary-900 mb-3">Пример Месячных Расходов (для пары)</h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Аренда (средняя квартира)</span>
                <span className="font-semibold">600-800 евро</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Коммунальные услуги (вода, электричество, газ)</span>
                <span className="font-semibold">80-120 евро</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Еда и Питание</span>
                <span className="font-semibold">300-400 евро</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Автомобиль и Транспорт</span>
                <span className="font-semibold">150-200 евро</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Страховки и Здоровье</span>
                <span className="font-semibold">100-150 евро</span>
              </div>
              <div className="flex justify-between">
                <span>Досуг и Развлечения</span>
                <span className="font-semibold">150-250 евро</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Общий Бюджет (ежемесячно)</span>
                <span>1.400-1.900 евро</span>
              </div>
            </div>
            <p className="text-gray-700 text-sm mt-4">
              Это дешевле, чем в России, и позволяет вести комфортный образ жизни.
            </p>
          </div>
        </section>

        {/* Section: Советы */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Советы для Новичков</h2>

          <div className="space-y-4">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">1. Зарегистрируйтесь у властей</h3>
              <p className="text-gray-700 text-sm">
                Зарегистрируйтесь в Ayuntamiento (муниципалитет), получите номер НИЕ и зарегистрируйтесь в налоговом органе.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">2. Подключитесь к русскому сообществу</h3>
              <p className="text-gray-700 text-sm">
                Посетите русские клубы и мероприятия. Сеть поможет вам адаптироваться.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">3. Откройте банковский счет</h3>
              <p className="text-gray-700 text-sm">
                Откройте испанский банковский счет. CaixaBank и BBVA хорошо работают с иностранцами. Это необходимо для всех финансовых операций.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">4. Выучите испанский язык</h3>
              <p className="text-gray-700 text-sm">
                Хотя многие говорят по-английски, испанский язык высоко ценится и помогает в интеграции.
              </p>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-2">5. Исследуйте окрестности</h3>
              <p className="text-gray-700 text-sm">
                Посетите близлежащие деревни и достопримечательности. La Mata, Guardamar и Elche - все интересные места.
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
          <h2 className="text-2xl font-light mb-4">Заинтересованы в Недвижимости в Торревьехе?</h2>
          <p className="mb-6 text-gray-100">
            У нас есть большой выбор высокачественных новостроек в Торревьехе и La Mata. Свяжитесь с нами для получения дополнительной информации.
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
