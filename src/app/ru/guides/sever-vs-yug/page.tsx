import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Север vs Юг Коста-Бланки: Какой выбрать? | Сравнение регионов',
  description: 'Полное сравнение регионов на Коста-Бланке: Север vs Юг. Цены, климат, инфраструктура, туризм, русская община в Торревьехе и Бенидорме.',
  keywords: 'Север, Юг, Коста-Бланка, Торревьеха, Бенидорм, сравнение регионов',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/guides/sever-vs-yug',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/north-vs-south',
      sv: 'https://newbuildhomescostablanca.com/sv/guides/nord-vs-syd',
      nl: 'https://newbuildhomescostablanca.com/nl/guides/noord-vs-zuid',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/noord-vs-zuid',
      fr: 'https://newbuildhomescostablanca.com/fr/guides/nord-vs-sud',
      no: 'https://newbuildhomescostablanca.com/no/guides/nord-vs-sor',
      de: 'https://newbuildhomescostablanca.com/de/guides/nord-vs-sued',
      pl: 'https://newbuildhomescostablanca.com/pl/guides/polnoc-vs-poludnie',
      'x-default': 'https://newbuildhomescostablanca.com/guides/north-vs-south',
    },
  },
};

const breadcrumbs = [
  { name: 'Главная', url: 'https://newbuildhomescostablanca.com/ru' },
  { name: 'Гайды', url: 'https://newbuildhomescostablanca.com/ru/guides' },
  { name: 'Север vs Юг', url: 'https://newbuildhomescostablanca.com/ru/guides/sever-vs-yug' },
];

const faqs = [
  {
    question: 'Какие города находятся на Севере и Юге Коста-Бланки?',
    answer: 'Север: Бенидорм, Алтеа, Кальпе, Морайра. Центр: Финестрат, Полопе. Юг: Торревьеха, Ориуэла-Коста, Пилар-де-ла-Орадада. Разделение примерное - побережье условно делят пополам.',
  },
  {
    question: 'Какой климат на Севере и Юге?',
    answer: 'Юг (Торревьеха): более жаркий и сухой (250+ дней солнца в год, 20-22С в среднем). Север (Бенидорм): немного прохладнее из-за гор, более облачно зимой (19-20С). Разница не большая, оба региона считаются райскими.',
  },
  {
    question: 'Где дешевле недвижимость - на Севере или Юге?',
    answer: 'На юге (Торревьеха) обычно дешевле на 10-20%. Север (Бенидорм) дороже из-за популярности среди туристов и экспатов. Центральные районы имеют среднюю цену.',
  },
  {
    question: 'Где лучше инвестировать?',
    answer: 'Север: туристический потенциал, лучше для краткосрочной аренды. Юг: более спокойно, лучше для долгосрочной аренды и жилья. Северная часть растет быстрее (туризм), Юг более стабилен.',
  },
  {
    question: 'Есть ли русская община на Коста-Бланке?',
    answer: 'Да, большая русская община, особенно в Торревьехе (на юге) и Бенидорме (на севере). Много русских магазинов, ресторанов, школ. Русские составляют значительную часть населения.',
  },
  {
    question: 'Где больше туристов - на Севере или Юге?',
    answer: 'На Севере (Бенидорм) значительно больше туристов - примерно 5 млн в год. Юг (Торревьеха) привлекает меньше туристов, больше семьи и долгосрочных жильцов.',
  },
  {
    question: 'Какая инфраструктура на Севере и Юге?',
    answer: 'Север: множество ресторанов, барів, развлечений, магазинов. Юг: более спокойная инфраструктура, но все необходимое есть. Оба региона хорошо развиты.',
  },
  {
    question: 'Какой пляж лучше - Север или Юг?',
    answer: 'Север (Бенидорм): два прекрасных пляжа (Playa de Levante и Playa de Poniente), но переполнены в высокий сезон. Юг (Торревьеха): более спокойные пляжи с прозрачной водой, менее переполнены.',
  },
];

export default function SeverVsYug() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center">
                  {idx > 0 && <span className="mx-2 text-gray-400">/</span>}
                  <Link href={crumb.url} className="text-primary-900 hover:text-accent-500 font-light">
                    {crumb.name}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-primary-900 mb-4 rounded-sm">
            Север vs Юг Коста-Бланки: Какой выбрать?
          </h1>
          <p className="text-lg text-gray-700 font-light mb-6">
            Полное сравнение регионов на побережье Валенсии. Климат, цены на недвижимость, инфраструктура, русская община, туризм и инвестиционный потенциал.
          </p>
          <div className="bg-accent-500 bg-opacity-10 border-l-4 border-accent-500 p-4 rounded-sm">
            <p className="text-primary-900 font-light">
              Север (Бенидорм): дороже, туристический, более развит. Юг (Торревьеха): дешевле, спокойнее, лучше для долгосрочного жилья. Оба имеют сильную русскую общину.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            География и регионы
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Север Коста-Бланки</h3>
              <p className="text-gray-700 font-light mb-3">
                Основные города: Бенидорм, Алтеа, Кальпе, Морайра
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Бенидорм:</strong> туристический центр, 5 млн туристов в год, развитая инфраструктура, дорогая недвижимость</li>
                <li>- <strong>Алтеа:</strong> художественная деревня, богатые жилые районы, красивые виды на море</li>
                <li>- <strong>Кальпе:</strong> прекрасный пляж, скала Пеньон-де-Ифах, растущий туризм</li>
                <li>- <strong>Морайра:</strong> эксклюзивный район, богатые вторые дома, премиум цены</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Юг Коста-Бланки</h3>
              <p className="text-gray-700 font-light mb-3">
                Основные города: Торревьеха, Ориуэла-Коста, Пилар-де-ла-Орадада
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Торревьеха:</strong> известный курорт, сильная русская община (20-30% населения), более спокойно, доступнее цены</li>
                <li>- <strong>Ориуэла-Коста:</strong> золотое побережье, развивается быстро, хорошие пляжи, растущий рынок недвижимости</li>
                <li>- <strong>Пилар-де-ла-Орадада:</strong> маленький город, спокойно, красивые пляжи, примерно на границе Севера и Юга</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Климат и природа
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Погода и температура</h3>
              <div className="space-y-3 text-gray-700 font-light">
                <div className="bg-gray-50 p-3 rounded-sm">
                  <p className="font-semibold mb-2">Север (Бенидорм)</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Среднегодовая температура:</span>
                      <span>19-20 C</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Солнечные дни в год:</span>
                      <span>240-250 дней</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Зимняя температура:</span>
                      <span>10-12 C</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Летняя температура:</span>
                      <span>28-30 C</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-sm">
                  <p className="font-semibold mb-2">Юг (Торревьеха)</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Среднегодовая температура:</span>
                      <span>20-22 C</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Солнечные дни в год:</span>
                      <span>250-280 дней</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Зимняя температура:</span>
                      <span>11-13 C</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Летняя температура:</span>
                      <span>29-31 C</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 font-light mt-4 text-sm">
                <strong>Вывод:</strong> Юг немного теплее и солнечнее. Разница небольшая, оба региона считаются средиземноморским раем. Север может быть немного облачнее зимой из-за гор.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Природа и ландшафт</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Север:</strong> горы позади побережья (Сьерра-де-Берния), живописные виды, более зеленый и горный</li>
                <li>- <strong>Юг:</strong> более плоский ландшафт, соляные озера (Лагуна де Торревьеха), более открытые виды</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Цены на недвижимость
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Сравнение цен</h3>
              <div className="space-y-3 text-gray-700 font-light text-sm">
                <p className="font-semibold">Цена за квадратный метр (примерно):</p>
                <div className="bg-gray-50 p-3 rounded-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Бенидорм:</span>
                    <span>4 500-6 500 евро/кв.м</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Алтеа:</span>
                    <span>3 500-5 500 евро/кв.м</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Морайра:</span>
                    <span>6 000-8 000+ евро/кв.м</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
                    <span className="font-semibold">Север в целом:</span>
                    <span className="font-semibold">4 000-6 000 евро/кв.м</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Торревьеха:</span>
                    <span>2 500-3 500 евро/кв.м</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ориуэла-Коста:</span>
                    <span>2 800-3 800 евро/кв.м</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Пилар-де-ла-Орадада:</span>
                    <span>3 000-4 000 евро/кв.м</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
                    <span className="font-semibold">Юг в целом:</span>
                    <span className="font-semibold">2 500-4 000 евро/кв.м</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 font-light mt-4 text-sm">
                <strong>Разница:</strong> Север дороже на 30-50% в зависимости от города. Торревьеха самая доступная из популярных курортов.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Тренд роста цен</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Север:</strong> растет быстрее (3-5% в год) благодаря туризму и популярности</li>
                <li>- <strong>Юг:</strong> растет медленнее, но стабильнее (2-3% в год)</li>
                <li>- <strong>Ориуэла-Коста:</strong> растет быстро (развивающийся регион)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Туризм и сезонность
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Туристический поток</h3>
              <div className="space-y-3 text-gray-700 font-light">
                <p><strong>Север (Бенидорм):</strong></p>
                <ul className="space-y-1 text-sm ml-4">
                  <li>- Примерно 5 миллионов туристов в год</li>
                  <li>- Пиковые сезоны: июль-август, Пасха, Рождество</li>
                  <li>- Средний туристический сезон: апрель-май, сентябрь-октябрь</li>
                  <li>- Зимний туризм: британцы и немцы для теплого климата</li>
                </ul>

                <p className="pt-3"><strong>Юг (Торревьеха):</strong></p>
                <ul className="space-y-1 text-sm ml-4">
                  <li>- Меньше туристов (примерно 1-2 миллиона в год)</li>
                  <li>- Более семейный туризм</li>
                  <li>- Менее переполнен в летний сезон</li>
                  <li>- Больше долгосрочных жильцов</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Возможности аренды</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Север:</strong> Высокий потенциал краткосрочной аренды (туристы), доходность 4-6% в год</li>
                <li>- <strong>Юг:</strong> Лучше для долгосрочной аренды (семьи), доходность 2-3% в год, но более стабильно</li>
                <li>- <strong>Комбинированная аренда:</strong> Некоторые берут туристов летом и долгосрочных зимой</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Инфраструктура и услуги
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Сравнение инфраструктуры</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-gray-700 font-light text-sm">
                  <thead className="bg-primary-900 text-white">
                    <tr>
                      <th className="p-2 text-left">Критерий</th>
                      <th className="p-2 text-left">Север (Бенидорм)</th>
                      <th className="p-2 text-left">Юг (Торревьеха)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-2"><strong>Рестораны</strong></td>
                      <td className="p-2">Очень много (500+)</td>
                      <td className="p-2">Достаточно (200+)</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="p-2"><strong>Магазины</strong></td>
                      <td className="p-2">Огромный выбор</td>
                      <td className="p-2">Хороший выбор</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2"><strong>Развлечения</strong></td>
                      <td className="p-2">Очень развиты (клубы, бары)</td>
                      <td className="p-2">Умеренные</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="p-2"><strong>Больницы</strong></td>
                      <td className="p-2">Несколько (хороший уровень)</td>
                      <td className="p-2">Несколько (достаточно)</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-2"><strong>Аэропорт</strong></td>
                      <td className="p-2">Аликанте (30 км)</td>
                      <td className="p-2">Аликанте (50 км)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-2"><strong>Общественный транспорт</strong></td>
                      <td className="p-2">Развит (автобусы, трамвай)</td>
                      <td className="p-2">Хороший (автобусы)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Русская община на Коста-Бланке
          </h2>

          <div className="space-y-4">
            <div className="bg-warm-100 p-6 rounded-sm border border-warm-300">
              <h3 className="text-xl font-light text-primary-900 mb-3">Торревьеха - русская столица</h3>
              <p className="text-gray-700 font-light mb-3">
                Торревьеха имеет одну из сильнейших русских общин на испанском побережье.
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Количество россиян:</strong> 20-30% населения города (около 8-10 000 человек из 30 000)</li>
                <li>- <strong>Русские магазины:</strong> продукты, мебель, одежда - много магазинов на русском языке</li>
                <li>- <strong>Рестораны:</strong> несколько русских ресторанов (Мимоза, Москва и др.)</li>
                <li>- <strong>Школы:</strong> русские школы для детей</li>
                <li>- <strong>Медицина:</strong> врачи, говорящие по-русски</li>
                <li>- <strong>Общинная жизнь:</strong> постоянные мероприятия, праздники, встречи</li>
              </ul>
            </div>

            <div className="bg-warm-100 p-6 rounded-sm border border-warm-300">
              <h3 className="text-xl font-light text-primary-900 mb-3">Бенидорм - еще одна русская община</h3>
              <p className="text-gray-700 font-light mb-3">
                Бенидорм тоже имеет значительную русскую общину, хотя меньше, чем Торревьеха.
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Количество россиян:</strong> 5-10% населения (население больше - около 70 000, так что около 5-7 000 русских)</li>
                <li>- <strong>Инфраструктура:</strong> есть русские магазины, рестораны, услуги</li>
                <li>- <strong>Жилые комплексы:</strong> несколько комплексов с русским сообществом</li>
                <li>- <strong>Преимущество:</strong> более развитая общая инфраструктура</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Интеграция и образ жизни</h3>
              <p className="text-gray-700 font-light mb-3">
                Русские общины на Коста-Бланке хорошо интегрированы в местное общество:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Русские и испанцы мирно сосуществуют</li>
                <li>- Есть возможность жить на русском языке, но испанский язык полезен</li>
                <li>- Регулярные культурные обмены и фестивали</li>
                <li>- Русские банки и финансовые услуги доступны</li>
                <li>- Возможность работать удаленно из Испании</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Какой выбрать: Север или Юг?
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Выбирайте Север (Бенидорм) если:</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Вам нужна максимальная инфраструктура и развлечения</li>
                <li>- Вы инвестируете в краткосрочную аренду (туризм)</li>
                <li>- Вам нравится более оживленная атмосфера</li>
                <li>- Вам важна легкость перепродажи (популярная локация)</li>
                <li>- Вы можете позволить себе более высокие цены</li>
                <li>- Вы ищете растущий рынок (туристический потенциал)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Выбирайте Юг (Торревьеха) если:</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Вам нужна более спокойная жизнь</li>
                <li>- Вы инвестируете в долгосрочную аренду или проживание</li>
                <li>- Вам важна лучшая русская община</li>
                <li>- Вы хотите более доступные цены</li>
                <li>- Вам нравятся более спокойные пляжи</li>
                <li>- Вы ищете семейный отдых (меньше шума)</li>
                <li>- Вам нравится немного более теплый климат</li>
              </ul>
            </div>

            <div className="bg-warm-100 p-6 rounded-sm border border-warm-300">
              <h3 className="text-xl font-light text-primary-900 mb-3">Рекомендация для русских</h3>
              <p className="text-gray-700 font-light mb-3">
                Для российских инвесторов часто рекомендуют:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Торревьеха:</strong> если вы ищете спокойную жизнь с русской общиной и доступными ценами</li>
                <li>- <strong>Бенидорм:</strong> если вы ищете инвестиционный потенциал и не боитесь туристической толпы</li>
                <li>- <strong>Ориуэла-Коста:</strong> компромисс - развивается быстро, цены растут, спокойнее чем Бенидорм</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-900 text-white p-8 rounded-sm mb-12">
          <h2 className="text-2xl font-light mb-4">Помогите выбрать идеальный регион</h2>
          <p className="font-light mb-6">
            Наши специалисты помогут вам выбрать лучший район на Коста-Бланке для ваших целей и образа жизни.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-sm font-light inline-block text-center"
            >
              Свяжитесь с нами в WhatsApp
            </Link>
            <Link
              href="/ru/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-900 px-6 py-3 rounded-sm font-light inline-block text-center"
            >
              Форма контакта
            </Link>
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-6 rounded-sm">
            Связанные гайды
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/ru/guides/process-pokupki" className="bg-white p-6 rounded-sm border border-gray-200 hover:border-accent-500 transition">
              <h3 className="text-xl font-light text-primary-900 mb-2">Процесс покупки</h3>
              <p className="text-gray-600 font-light">Полный процесс покупки недвижимости в Испании</p>
            </Link>
            <Link href="/ru/guides/pochemu-novostroyka" className="bg-white p-6 rounded-sm border border-gray-200 hover:border-accent-500 transition">
              <h3 className="text-xl font-light text-primary-900 mb-2">Почему новостройка</h3>
              <p className="text-gray-600 font-light">Преимущества новостроек и инвестиционный потенциал</p>
            </Link>
            <Link href="/ru/guides/rashody-nalogi" className="bg-white p-6 rounded-sm border border-gray-200 hover:border-accent-500 transition">
              <h3 className="text-xl font-light text-primary-900 mb-2">Расходы и налоги</h3>
              <p className="text-gray-600 font-light">Полный расчет всех затрат на покупку</p>
            </Link>
            <Link href="/ru/guides" className="bg-white p-6 rounded-sm border border-gray-200 hover:border-accent-500 transition">
              <h3 className="text-xl font-light text-primary-900 mb-2">Все гайды</h3>
              <p className="text-gray-600 font-light">Вернуться к полному списку гайдов</p>
            </Link>
          </div>
        </section>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            toJsonLd(
              faqSchema(
                faqs.map((faq) => ({
                  question: faq.question,
                  answer: faq.answer,
                }))
              )
            )
          ),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            toJsonLd(breadcrumbSchema(breadcrumbs))
          ),
        }}
      />
    </div>
  );
}
