import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Почему новостройка лучше, чем старый дом? Преимущества и недостатки',
  description: 'Полное сравнение новостроек и вторичного жилья в Испании. Преимущества новых домов, гарантии, налоги и инвестиционный потенциал.',
  keywords: 'новостройка, obra nueva, новый дом, инвестиция, Испания, гарантия',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/guides/pochemu-novostroyka',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/why-new-build',
      sv: 'https://newbuildhomescostablanca.com/sv/guides/varfor-nybygge',
      nl: 'https://newbuildhomescostablanca.com/nl/guides/waarom-nieuwbouw',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/waarom-nieuwbouw',
      fr: 'https://newbuildhomescostablanca.com/fr/guides/pourquoi-neuf',
      no: 'https://newbuildhomescostablanca.com/no/guides/hvorfor-nybygg',
      de: 'https://newbuildhomescostablanca.com/de/guides/warum-neubau',
      pl: 'https://newbuildhomescostablanca.com/pl/guides/dlaczego-nowy-budynek',
      'x-default': 'https://newbuildhomescostablanca.com/guides/why-new-build',
    },
  },
};

const breadcrumbs = [
  { name: 'Главная', url: 'https://newbuildhomescostablanca.com/ru' },
  { name: 'Гайды', url: 'https://newbuildhomescostablanca.com/ru/guides' },
  { name: 'Почему новостройка', url: 'https://newbuildhomescostablanca.com/ru/guides/pochemu-novostroyka' },
];

const faqs = [
  {
    question: 'Новостройка дороже, чем вторичное жилье?',
    answer: 'Новостройка может быть дороже за квадратный метр, но это компенсируется лучшим качеством, экономией на ремонте и инвестиционным потенциалом. При перепродаже новые дома держат стоимость лучше и быстрее продаются.',
  },
  {
    question: 'Какова гарантия на новостройку?',
    answer: 'Стандартная гарантия в Испании - 10 лет на конструкцию, 3 года на материалы и отделку, 2 года на оборудование. Застройщик несет ответственность за дефекты, обнаруженные в этот период.',
  },
  {
    question: 'Какие налоги платятся при покупке новостройки?',
    answer: 'При покупке новостройки платится НДС (IVA) 10% вместо ITP (налог на передачу имущества). Это может быть выгоднее, особенно в некоторых регионах. Также возможны льготы на первичное жилье.',
  },
  {
    question: 'Можно ли финансировать новостройку через ипотеку?',
    answer: 'Да, ипотека легче получить на новостройку, так как банки лучше оценивают такое имущество. Условия часто выгоднее, чем для вторичного жилья. Возможна рассроченная оплата по этапам строительства.',
  },
  {
    question: 'Какие недостатки у новостройки?',
    answer: 'Основные недостатки: строительные задержки (бывают), затраты на отделку (если требуется), отсутствие истории дома, требования к первоначальному взносу, возможные дефекты на начальном этапе.',
  },
  {
    question: 'Как быстро растет стоимость новостройки?',
    answer: 'Обычно новостройка набирает стоимость быстро в первые 3-5 лет после сдачи (10-20% прироста в год). После этого рост замедляется. На популярных курортах потенциал выше.',
  },
  {
    question: 'Что включено в цену новостройки?',
    answer: 'Обычно включено: структура дома, основные материалы отделки, встроенная кухня, плитка в ванной. Не включено или за дополнительную плату: мебель, кондиционеры, некоторые опции (балконы, парковки).',
  },
  {
    question: 'Какой срок строительства типичной новостройки?',
    answer: 'Обычно 18-36 месяцев в зависимости от размера проекта. Маленькие проекты строятся 12-18 месяцев, большие комплексы 3-4 года. На побережье часто есть задержки из-за разрешений.',
  },
];

export default function PochemuNovostroyka() {
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
            Почему стоит инвестировать в новостройку?
          </h1>
          <p className="text-lg text-gray-700 font-light mb-6">
            Полное сравнение преимуществ новостроек и вторичного жилья в Испании. Гарантии, налоги, инвестиционный потенциал и экономия на ремонте.
          </p>
          <div className="bg-accent-500 bg-opacity-10 border-l-4 border-accent-500 p-4 rounded-sm">
            <p className="text-primary-900 font-light">
              Новостройка на побережье Коста-Бланки растет в стоимости на 10-20% в год в первые 5 лет после сдачи, а также дает вам гарантию на дом на 10 лет.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Основные преимущества новостройки
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">1. Гарантия на дом (10 лет)</h3>
              <p className="text-gray-700 font-light mb-3">
                Это главное преимущество новостройки. Застройщик несет полную ответственность за качество строительства.
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Конструкция (10 лет):</strong> Гарантия на все конструктивные элементы здания</li>
                <li>- <strong>Материалы и отделка (3 года):</strong> На краску, плитку, полы, двери и окна</li>
                <li>- <strong>Оборудование (2 года):</strong> На электрику, сантехнику, кондиционеры</li>
                <li>- <strong>Возмещение убытков:</strong> Застройщик обязан исправить дефекты бесплатно</li>
              </ul>
              <p className="text-gray-700 font-light mt-3">
                Со старым домом нет гарантии, и вы берете все риски на себя. При обнаружении проблем придется тратиться на ремонт за свой счет.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">2. Экономия на ремонте и отделке</h3>
              <p className="text-gray-700 font-light mb-3">
                Новый дом продается в отличном состоянии. При покупке вторичного жилья нужно потратить 30-50% стоимости на ремонт.
              </p>
              <div className="bg-gray-100 p-4 rounded-sm">
                <p className="text-gray-700 font-light mb-2"><strong>Пример расходов на ремонт старого дома (200 000 евро):</strong></p>
                <ul className="space-y-1 text-gray-700 font-light text-sm">
                  <li>- Электрика и сантехника: 15 000 евро</li>
                  <li>- Кровля/фасад: 10 000-20 000 евро</li>
                  <li>- Полы и стены: 15 000 евро</li>
                  <li>- Кухня и ванная: 20 000 евро</li>
                  <li>- Окна и двери: 8 000 евро</li>
                  <li>- Всего: 70 000-80 000 евро (35-40%)</li>
                </ul>
              </div>
              <p className="text-gray-700 font-light mt-3">
                Новостройка уже готова к использованию и требует минимальных затрат.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">3. Быстрый рост стоимости</h3>
              <p className="text-gray-700 font-light mb-3">
                Новостройка растет в стоимости намного быстрее, чем старый дом.
              </p>
              <div className="space-y-2 text-gray-700 font-light">
                <p>Ежегодный прирост стоимости:</p>
                <div className="bg-gray-50 p-3 rounded-sm">
                  <div className="flex justify-between mb-2">
                    <span>Новостройка (первые 5 лет):</span>
                    <span className="font-semibold">10-20% в год</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Новостройка (5-10 лет):</span>
                    <span className="font-semibold">3-5% в год</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Старый дом:</span>
                    <span className="font-semibold">1-3% в год</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 font-light mt-3">
                <strong>Пример:</strong> Новостройка за 300 000 евро будет стоить 360-420 000 евро через 2 года. Старый дом за 300 000 евро будет стоить 306-318 000.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">4. Современные инженерные системы</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Энергоэффективность:</strong> Новые дома строятся по современным стандартам энергосбережения</li>
                <li>- <strong>Кондиционирование:</strong> Обычно уже установлены кондиционеры и вентиляция</li>
                <li>- <strong>Безопасность:</strong> Современные системы видеонаблюдения и контроля доступа</li>
                <li>- <strong>Звукоизоляция:</strong> Лучше в новых домах благодаря современным материалам</li>
                <li>- <strong>Интернет и ТВ:</strong> Обычно уже проведены кабельные сети</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">5. Налоговые преимущества</h3>
              <p className="text-gray-700 font-light mb-3">
                При покупке новостройки вы платите НДС (IVA) 10%, а при покупке старого дома - ITP (6-10%). В некоторых случаях это может быть выгоднее.
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Возможность вычета НДС в некоторых случаях</li>
                <li>- Льготы на первичное жилье в некоторых регионах</li>
                <li>- Более благоприятные условия для ипотеки</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">6. Проще получить ипотеку</h3>
              <p className="text-gray-700 font-light mb-3">
                Банки охотнее выдают кредиты на новостройку, так как она лучше держит стоимость.
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Условия часто выгоднее, чем для вторичного жилья</li>
                <li>- Может быть до 85% финансирования вместо 70-80%</li>
                <li>- Возможность рассроченной оплаты по этапам строительства</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Недостатки новостройки
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">1. Риск задержек строительства</h3>
              <p className="text-gray-700 font-light mb-3">
                Это основной риск. Строительство может затянуться из-за разрешений, погоды, нехватки материалов или финансовых проблем застройщика.
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- На побережье задержки встречаются часто (6-12 месяцев)</li>
                <li>- Контракт содержит пункты о задержках и их компенсации</li>
                <li>- Деньги могут быть заморожены на время строительства</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">2. Затраты на дополнительные опции</h3>
              <p className="text-gray-700 font-light mb-3">
                Цена может быстро расти из-за дополнительных опций и расширений.
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Балконы и террасы: 5 000-15 000 евро</li>
                <li>- Парковка или гараж: 20 000-40 000 евро</li>
                <li>- Встроенный шкаф вместо стандартного: 2 000-5 000 евро</li>
                <li>- Кондиционер: 2 000-4 000 евро</li>
                <li>- Улучшенные материалы отделки: 5 000-20 000 евро</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">3. Проблемы в начале эксплуатации</h3>
              <p className="text-gray-700 font-light mb-3">
                Хотя есть гарантия, обычно возникают небольшие проблемы:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Микротрещины в стенах (в первый год усадка дома)</li>
                <li>- Проблемы с электроникой и оборудованием</li>
                <li>- Утечки в сантехнике</li>
                <li>- Проблемы с лифтами и входными системами</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">4. Долгий процесс ожидания</h3>
              <p className="text-gray-700 font-light mb-3">
                Вам нужно платить и ждать 18-36 месяцев до получения недвижимости. За это время:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Ваши деньги находятся в банке (или у застройщика) и не приносят доход</li>
                <li>- Вы не сможете сдать дом в аренду до сдачи</li>
                <li>- Риск, что застройщик окажется нежизнеспособным</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">5. Новое сообщество</h3>
              <p className="text-gray-700 font-light mb-3">
                При покупке нового комплекса вы входите в новое сообщество соседей, которое может быть менее сформированным, чем в установленном доме.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Сравнение новостройки и вторичного жилья
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-gray-700 font-light">
              <thead className="bg-primary-900 text-white">
                <tr>
                  <th className="p-3 text-left rounded-tl-sm">Критерий</th>
                  <th className="p-3 text-left">Новостройка</th>
                  <th className="p-3 text-left rounded-tr-sm">Вторичное жилье</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3"><strong>Гарантия</strong></td>
                  <td className="p-3">10 лет на конструкцию</td>
                  <td className="p-3">Нет</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-3"><strong>Ремонт</strong></td>
                  <td className="p-3">Не требуется</td>
                  <td className="p-3">30-50% стоимости</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3"><strong>Рост цены (в год)</strong></td>
                  <td className="p-3">10-20% (первые 5 лет)</td>
                  <td className="p-3">1-3%</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-3"><strong>Налоги</strong></td>
                  <td className="p-3">НДС 10%</td>
                  <td className="p-3">ITP 6-10%</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3"><strong>Ипотека</strong></td>
                  <td className="p-3">Легче получить</td>
                  <td className="p-3">Сложнее</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-3"><strong>Цена за кв.м</strong></td>
                  <td className="p-3">Выше на 10-20%</td>
                  <td className="p-3">Ниже</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3"><strong>Время ожидания</strong></td>
                  <td className="p-3">18-36 месяцев</td>
                  <td className="p-3">Немедленно</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3"><strong>Энергоэффективность</strong></td>
                  <td className="p-3">Высокая</td>
                  <td className="p-3">Часто низкая</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Инвестиционный потенциал новостройки
          </h2>

          <div className="space-y-4">
            <div className="bg-warm-100 p-6 rounded-sm border border-warm-300">
              <h3 className="text-xl font-light text-primary-900 mb-3">Почему новостройка лучше для инвестиций</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Быстрый рост стоимости:</strong> Новая недвижимость растет быстрее старой</li>
                <li>- <strong>Легче продать:</strong> Новые дома пользуются спросом и продаются быстрее</li>
                <li>- <strong>Лучше сдавать в аренду:</strong> Туристы и арендаторы предпочитают новые дома</li>
                <li>- <strong>Меньше затрат на обслуживание:</strong> Гарантия означает низкие расходы в первые годы</li>
                <li>- <strong>Потенциал повторной продажи:</strong> Новая недвижимость легче перепродать на более высокую цену</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Практический пример инвестиции</h3>
              <div className="space-y-3 text-gray-700 font-light text-sm">
                <p><strong>Инвестиция в новостройку на Коста-Бланке:</strong></p>

                <div className="bg-gray-50 p-3 rounded-sm">
                  <p className="font-semibold mb-2">Первоначальная стоимость: 300 000 евро</p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Платежи застройщику:</span>
                      <span>300 000 евро</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Налоги и сборы (10%):</span>
                      <span>30 000 евро</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-1 mt-1">
                      <span className="font-semibold">Общие инвестиции:</span>
                      <span className="font-semibold">330 000 евро</span>
                    </div>
                  </div>
                </div>

                <p className="mt-3"><strong>После 5 лет (прирост 15% в год среднего):</strong></p>

                <div className="bg-gray-50 p-3 rounded-sm">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Стоимость дома:</span>
                      <span>606 000 евро</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Доход от сдачи в аренду (за 5 лет):</span>
                      <span>90 000 евро</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Минус расходы на содержание:</span>
                      <span>-30 000 евро</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-1 mt-1">
                      <span className="font-semibold">Чистый доход:</span>
                      <span className="font-semibold">60 000 евро</span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 pt-3 border-t border-gray-300"><strong>Итого прибыль от инвестиции:</strong></p>
                <p className="font-semibold text-accent-500">606 000 + 60 000 - 330 000 = 336 000 евро (прибыль 102%)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            На что обратить внимание при выборе новостройки
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">1. Репутация застройщика</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Проверьте историю компании (сколько лет работает)</li>
                <li>- Прочитайте отзывы предыдущих клиентов</li>
                <li>- Убедитесь, что компания зарегистрирована и лицензирована</li>
                <li>- Проверьте финансовую стабильность (спросите у банков)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">2. Контракт и гарантии</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Убедитесь, что в контракте указаны сроки строительства и возможные задержки</li>
                <li>- Проверьте гарантийные условия (10 лет конструкции обязательна)</li>
                <li>- Убедитесь, что ваши деньги защищены (банковский депозит)</li>
                <li>- Обратитесь к адвокату для проверки контракта</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">3. Качество строительства</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Посетите строительную площадку</li>
                <li>- Проверьте материалы и работу</li>
                <li>- Убедитесь, что следуют испанским строительным кодексам</li>
                <li>- Спросите о сертификатах и проверках качества</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">4. Услуги и общие площади</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Парковка и гараж (убедитесь, что они в стоимость или опция)</li>
                <li>- Спортивные объекты (бассейн, теннис, фитнес)</li>
                <li>- Безопасность и видеонаблюдение</li>
                <li>- Уход за общими площадями (озеленение, дорожки)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">5. Местоположение и окружение</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Близость к пляжу и услугам</li>
                <li>- Развитие района (будут ли еще новые проекты)</li>
                <li>- Инфраструктура (магазины, рестораны, больницы)</li>
                <li>- Прогноз потенциала для перепродажи</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-900 text-white p-8 rounded-sm mb-12">
          <h2 className="text-2xl font-light mb-4">Интересует новостройка на Коста-Бланке?</h2>
          <p className="font-light mb-6">
            Мы специализируемся на новостройках с высоким инвестиционным потенциалом на побережье. Наши специалисты помогут выбрать лучший проект для ваших целей.
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
            <Link href="/ru/guides/pod-klyuch-vs-plan" className="bg-white p-6 rounded-sm border border-gray-200 hover:border-accent-500 transition">
              <h3 className="text-xl font-light text-primary-900 mb-2">Под ключ vs на плане</h3>
              <p className="text-gray-600 font-light">Разница между готовой и проектной недвижимостью</p>
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
