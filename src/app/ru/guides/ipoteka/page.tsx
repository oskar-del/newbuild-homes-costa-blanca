import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Ипотека в Испании для иностранцев | Кредиты и условия',
  description: 'Полное руководство по получению ипотеки в Испании для российских покупателей. Условия, процентные ставки, требования банков CaixaBank, BBVA и других.',
  keywords: 'ипотека, кредит, Испания, иностранцы, банки, условия',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/guides/ipoteka',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/mortgages',
      sv: 'https://newbuildhomescostablanca.com/sv/guides/bolan-spanien',
      nl: 'https://newbuildhomescostablanca.com/nl/guides/hypotheek',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/hypotheek',
      fr: 'https://newbuildhomescostablanca.com/fr/guides/hypotheque',
      no: 'https://newbuildhomescostablanca.com/no/guides/boliglan',
      de: 'https://newbuildhomescostablanca.com/de/guides/hypothek',
      pl: 'https://newbuildhomescostablanca.com/pl/guides/kredyt-hipoteczny',
      'x-default': 'https://newbuildhomescostablanca.com/guides/mortgages',
    },
  },
};

const breadcrumbs = [
  { name: 'Главная', url: 'https://newbuildhomescostablanca.com/ru' },
  { name: 'Гайды', url: 'https://newbuildhomescostablanca.com/ru/guides' },
  { name: 'Ипотека', url: 'https://newbuildhomescostablanca.com/ru/guides/ipoteka' },
];

const faqs = [
  {
    question: 'Могут ли иностранцы получить ипотеку в Испании?',
    answer: 'Да, иностранцы могут получить ипотеку в Испании, но условия жестче, чем для граждан ЕС. Требуется испанское налоговое резидентство, открытый банковский счет в испанском банке, NIE и полная документация о доходах и происхождении средств.',
  },
  {
    question: 'Какой процент от стоимости недвижимости может быть профинансирован?',
    answer: 'Испанские банки обычно финансируют 60-80% стоимости недвижимости для иностранцев. Это означает, что первоначальный взнос должен быть 20-40%. Для граждан ЕС может быть до 90%, но для иностранцев из третьих стран (включая российских граждан) - обычно 70-80% максимум.',
  },
  {
    question: 'Какие процентные ставки по ипотеке в Испании?',
    answer: 'Процентные ставки варьируются от 2,5% до 5% в зависимости от банка, вашего профиля риска и условий рынка. Большинство банков предлагают ставки EURIBOR + маржа банка (0,5-2%). Текущие ставки около 3-4% для иностранцев.',
  },
  {
    question: 'Какие документы нужны для получения ипотеки?',
    answer: 'Необходимы: паспорт, NIE, справка о доходах или налоговая декларация за 2-3 года, выписки с банков, документ о происхождении средств, справка об отсутствии задолженности, договор купли-продажи, справка от работодателя (если есть).',
  },
  {
    question: 'Сколько времени занимает процесс получения ипотеки?',
    answer: 'Обычно 4-8 недель с момента подачи заявки до получения окончательного одобрения. Сроки зависят от полноты документов, скорости оценки недвижимости и внутренних процессов банка.',
  },
  {
    question: 'Нужна ли оценка недвижимости для получения ипотеки?',
    answer: 'Да, банк обязательно проведет оценку недвижимости (tasacion). Оценка проводится независимым оценщиком и обычно занимает 5-10 дней. Стоимость оценки 300-500 евро платит заемщик.',
  },
  {
    question: 'Какие комиссии и расходы при получении ипотеки?',
    answer: 'Основные расходы: комиссия за открытие счета (0,5-1%), комиссия за формирование ипотеки (0,25-0,5%), страховка жизни заемщика (обязательна), оценка недвижимости (300-500 евро), регистрация ипотеки (0,3-0,5%). Всего примерно 2-3% от суммы кредита.',
  },
  {
    question: 'Какие банки работают с иностранными заемщиками?',
    answer: 'Основные банки: CaixaBank, BBVA, Banco Santander, Banco Sabadell, Abanca. Все они работают с иностранцами, но условия и процесс может отличаться. CaixaBank и BBVA считаются наиболее открытыми для иностранных клиентов.',
  },
];

export default function Ipoteka() {
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
            Ипотека в Испании для иностранцев
          </h1>
          <p className="text-lg text-gray-700 font-light mb-6">
            Полное руководство по получению ипотеки в Испании для российских граждан и других иностранцев. Условия банков, процентные ставки, требования и пошаговый процесс.
          </p>
          <div className="bg-accent-500 bg-opacity-10 border-l-4 border-accent-500 p-4 rounded-sm">
            <p className="text-primary-900 font-light">
              Испанские банки финансируют 60-80% стоимости недвижимости для иностранцев при процентных ставках 3-4% годовых. Требуется испанское налоговое резидентство и открытый банковский счет.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Возможность получения ипотеки для иностранцев
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Кто может получить ипотеку?</h3>
              <p className="text-gray-700 font-light mb-3">
                Иностранцы могут получить ипотеку в Испании при соблюдении определенных условий:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Граждане стран, входящих в Шенгенскую зону</li>
                <li>- Граждане других стран, включая Россию (с дополнительными требованиями)</li>
                <li>- Владельцы виз или видов на жительство в Испании</li>
                <li>- Лица с испанским налоговым резидентством</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Требования для получения ипотеки</h3>
              <p className="text-gray-700 font-light mb-3">
                Основные требования испанских банков:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>NIE:</strong> Номер идентификации иностранца (обязателен)</li>
                <li>- <strong>Испанский банковский счет:</strong> Открытый минимум за 3 месяца до подачи заявки</li>
                <li>- <strong>Налоговое резидентство:</strong> Проживание в Испании или статус налогового резидента</li>
                <li>- <strong>Стабильный доход:</strong> Справка от работодателя или налоговая декларация</li>
                <li>- <strong>Хорошая кредитная история:</strong> В Испании и в стране происхождения</li>
                <li>- <strong>Первоначальный взнос:</strong> Минимум 20-40% от стоимости недвижимости</li>
                <li>- <strong>Возраст:</strong> 18-80 лет (зависит от банка)</li>
              </ul>
            </div>

            <div className="bg-warm-100 p-6 rounded-sm border border-warm-300">
              <h3 className="text-xl font-light text-primary-900 mb-3">Отличия для российских граждан</h3>
              <p className="text-gray-700 font-light mb-3">
                Для граждан России требуются дополнительные документы:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Справка об отсутствии судимостей</li>
                <li>- Документы о происхождении средств (выписки с банков за 6-12 месяцев)</li>
                <li>- Справка о доходах с нотариальной подписью</li>
                <li>- Документы о правовом статусе в Испании</li>
                <li>- Консультация с испанским адвокатом может быть необходима</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Условия ипотеки в Испании
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Процентные ставки</h3>
              <p className="text-gray-700 font-light mb-3">
                Процентные ставки в Испании варьируются в зависимости от условий рынка и профиля заемщика:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Диапазон:</strong> 2,5% - 5% годовых</li>
                <li>- <strong>Система:</strong> Обычно используется ставка EURIBOR + маржа банка</li>
                <li>- <strong>EURIBOR:</strong> Около 3,5% (переменная, меняется ежемесячно)</li>
                <li>- <strong>Маржа банка:</strong> Для иностранцев 0,5% - 2% (зависит от банка и риска)</li>
                <li>- <strong>Примеры текущих ставок:</strong> CaixaBank 3,5%, BBVA 3,8%, Santander 4,0%</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Сумма финансирования</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Для иностранцев:</strong> 60-80% от стоимости недвижимости</li>
                <li>- <strong>Первоначальный взнос:</strong> 20-40% от стоимости</li>
                <li>- <strong>Максимум:</strong> 80% LTV (loan-to-value ratio)</li>
                <li>- <strong>Минимум кредита:</strong> Обычно 50 000 евро</li>
                <li>- <strong>Максимум кредита:</strong> Зависит от доходов (обычно до 400-500 тысяч евро)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Срок кредита</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Стандартные сроки:</strong> 5, 10, 15, 20, 25, 30 лет</li>
                <li>- <strong>Для иностранцев:</strong> Обычно 15-25 лет</li>
                <li>- <strong>Максимум:</strong> 40 лет (редко)</li>
                <li>- <strong>Возраст в конце кредита:</strong> Обычно не более 80 лет</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Фиксированная vs переменная ставка</h3>
              <p className="text-gray-700 font-light mb-3">
                Испанские банки предлагают оба варианта:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>
                  <strong>Переменная ставка (EURIBOR + маржа):</strong> Начинается ниже, но может вырасти. Сейчас популярна из-за низких ставок.
                </li>
                <li>
                  <strong>Фиксированная ставка:</strong> Остается одной на весь период, выше переменной, но более предсказуема. Около 3,5-4,5%.
                </li>
                <li>
                  <strong>Смешанная:</strong> Фиксированная на первые годы, затем переменная.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Основные испанские банки
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">CaixaBank</h3>
              <p className="text-gray-700 font-light mb-2">
                Один из крупнейших банков в Испании, относительно открыт для иностранцев.
              </p>
              <ul className="space-y-1 text-gray-700 font-light text-sm">
                <li>- Текущая ставка: около 3,5% для хороших клиентов</li>
                <li>- Финансирование: до 80% для иностранцев</li>
                <li>- Срок: до 30 лет</li>
                <li>- Специалист по иностранным клиентам: есть</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">BBVA (Banco Bilbao Vizcaya Argentaria)</h3>
              <p className="text-gray-700 font-light mb-2">
                Международный банк с хорошим сервисом для экспатов.
              </p>
              <ul className="space-y-1 text-gray-700 font-light text-sm">
                <li>- Текущая ставка: около 3,8%</li>
                <li>- Финансирование: до 80%</li>
                <li>- Срок: до 30 лет</li>
                <li>- Онлайн-процесс: хороший</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Banco Santander</h3>
              <p className="text-gray-700 font-light mb-2">
                Крупный международный банк, но условия для иностранцев могут быть жестче.
              </p>
              <ul className="space-y-1 text-gray-700 font-light text-sm">
                <li>- Текущая ставка: около 4,0%</li>
                <li>- Финансирование: до 75%</li>
                <li>- Срок: до 30 лет</li>
                <li>- Требования: строго относится к иностранцам</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Banco Sabadell</h3>
              <p className="text-gray-700 font-light mb-2">
                Средний банк, работает с иностранцами на приемлемых условиях.
              </p>
              <ul className="space-y-1 text-gray-700 font-light text-sm">
                <li>- Текущая ставка: около 3,7%</li>
                <li>- Финансирование: до 80%</li>
                <li>- Срок: до 30 лет</li>
                <li>- Гибкие условия: есть</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Abanca</h3>
              <p className="text-gray-700 font-light mb-2">
                Региональный банк, часто работает на побережье Коста-Бланки.
              </p>
              <ul className="space-y-1 text-gray-700 font-light text-sm">
                <li>- Текущая ставка: около 3,6%</li>
                <li>- Финансирование: до 80%</li>
                <li>- Срок: до 30 лет</li>
                <li>- Персональный сервис: хороший</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Документы и требования
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Основной пакет документов</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>1. <strong>Паспорт:</strong> Оригинал и копии всех страниц</li>
                <li>2. <strong>NIE:</strong> Справка о присвоении номера</li>
                <li>3. <strong>Справка о доходах:</strong> От работодателя или налоговая декларация (Declaracion de la Renta)</li>
                <li>4. <strong>Выписки с банков:</strong> За последние 6-12 месяцев</li>
                <li>5. <strong>Справка об отсутствии задолженности:</strong> В Испании (если было жилье раньше)</li>
                <li>6. <strong>Договор купли-продажи:</strong> Или предварительный контракт</li>
                <li>7. <strong>Документы о наличии средств:</strong> Выписки о происхождении и наличии первоначального взноса</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Дополнительные документы для иностранцев</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Справка об отсутствии судимостей (опционально)</li>
                <li>- Копии документов о происхождении средств (выписки из банков в России)</li>
                <li>- Справка о происхождении доходов (от работодателя или выписки о доходах)</li>
                <li>- Документы о налоговом резидентстве в Испании</li>
                <li>- Справка о наличии жилья в Испании (адрес проживания)</li>
                <li>- Копия договора аренды (если не владеете недвижимостью)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Документы о доходе</h3>
              <p className="text-gray-700 font-light mb-3">
                Банк требует подтверждение стабильного дохода:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Если работаете:</strong> Справка от работодателя, копия трудового контракта, последняя зарплатная ведомость</li>
                <li>- <strong>Если на пенсии:</strong> Справка о размере пенсии, выписки из банка с поступлением пенсии</li>
                <li>- <strong>Если доходы из России:</strong> Налоговая декларация, справка с работы, переводы в банк</li>
                <li>- <strong>Если есть компания:</strong> Финансовые отчеты, налоговые деклерации</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Пошаговый процесс получения ипотеки
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Шаг 1: Подготовка документов (1-2 недели)</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Соберите все необходимые документы</li>
                <li>- Убедитесь, что у вас открыт испанский банковский счет</li>
                <li>- Получите справку о доходах или подготовьте налоговую декларацию</li>
                <li>- Подготовьте копии паспорта и NIE</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Шаг 2: Выбор банка и подача заявки (1 день)</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Сравните условия нескольких банков</li>
                <li>- Подайте заявку (можно в отделении или онлайн)</li>
                <li>- Передайте полный пакет документов</li>
                <li>- Банк отправит ваши документы на предварительный анализ</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Шаг 3: Оценка недвижимости (5-10 дней)</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Банк назначит независимого оценщика</li>
                <li>- Оценщик осмотрит недвижимость</li>
                <li>- Оценка обычно стоит 300-500 евро (платит заемщик)</li>
                <li>- Стоимость оценки зачитывается в счет расходов при одобрении</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Шаг 4: Предварительное одобрение (2-4 недели)</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Банк анализирует документы и оценку</li>
                <li>- Получаете предварительное одобрение (Declaracion de intenciones)</li>
                <li>- Указывается максимальная сумма кредита</li>
                <li>- Действует обычно 30 дней</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Шаг 5: Страховка жизни заемщика (1 неделя)</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Получите предложение от страховой компании</li>
                <li>- Пройдите медицинский осмотр (если требуется)</li>
                <li>- Подпишите полис страховки</li>
                <li>- Стоимость обычно 0,5-1% от суммы кредита в год</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Шаг 6: Окончательное одобрение (1-2 недели)</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Банк выдает окончательное одобрение кредита</li>
                <li>- Оформляется договор ипотеки</li>
                <li>- Уточняются финальные условия</li>
                <li>- Действует обычно 20-30 дней</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Шаг 7: Регистрация ипотеки и выплата (день подписи)</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- День нотариальной подписи окончательного контракта</li>
                <li>- Одновременно подписывается договор ипотеки</li>
                <li>- Банк переводит средства продавцу</li>
                <li>- Ипотека регистрируется в земельном реестре</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Расходы при получении ипотеки
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Основные расходы</h3>
              <div className="space-y-3 text-gray-700 font-light">
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span>Оценка недвижимости:</span>
                  <span>300-500 евро</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span>Комиссия за открытие кредита:</span>
                  <span>0,5-1% от суммы</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span>Комиссия за регистрацию ипотеки:</span>
                  <span>0,25-0,5% от суммы</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span>Страховка жизни (1 год):</span>
                  <span>0,5-1% от суммы</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span>Гонорар адвоката (опционально):</span>
                  <span>400-800 евро</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span>Нотариальные сборы:</span>
                  <span>1-1,5% от суммы кредита</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="font-semibold">Итого (примерно):</span>
                  <span className="font-semibold">2,5-4% от суммы кредита</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Пример расчета расходов</h3>
              <p className="text-gray-700 font-light mb-3">
                Покупаете квартиру за 300 000 евро, берете кредит 240 000 евро (80%):
              </p>
              <div className="space-y-2 text-gray-700 font-light text-sm bg-gray-50 p-3 rounded-sm">
                <div className="flex justify-between">
                  <span>Оценка недвижимости:</span>
                  <span>400 евро</span>
                </div>
                <div className="flex justify-between">
                  <span>Комиссия банка (1%):</span>
                  <span>2 400 евро</span>
                </div>
                <div className="flex justify-between">
                  <span>Страховка (0,75%):</span>
                  <span>1 800 евро</span>
                </div>
                <div className="flex justify-between">
                  <span>Нотариальные сборы (1%):</span>
                  <span>2 400 евро</span>
                </div>
                <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
                  <span className="font-semibold">Всего:</span>
                  <span className="font-semibold">7 000 евро</span>
                </div>
                <p className="text-xs pt-2 text-gray-600">Это примерно 2,9% от суммы кредита</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Советы и рекомендации
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Советы по получению ипотеки</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>1. <strong>Открыть счет заранее:</strong> За 3-6 месяцев до подачи заявки на кредит</li>
                <li>2. <strong>Показать историю платежей:</strong> Регулярные переводы из России демонстрируют финансовую ответственность</li>
                <li>3. <strong>Иметь документы в порядке:</strong> Все справки подготовить заранее и в нотариальном порядке</li>
                <li>4. <strong>Сравнить несколько банков:</strong> Условия могут существенно отличаться</li>
                <li>5. <strong>Обратиться к адвокату:</strong> Для правильного оформления и защиты интересов</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Как избежать проблем</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Не скрывайте источник средств - банки знают о требованиях АМЛ</li>
                <li>- Не берите больше, чем можете позволить себе платить</li>
                <li>- Убедитесь, что все документы подлинные и нотариально заверены</li>
                <li>- Внимательно прочитайте договор ипотеки перед подписью</li>
                <li>- Убедитесь, что ипотека правильно зарегистрирована в реестре</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-900 text-white p-8 rounded-sm mb-12">
          <h2 className="text-2xl font-light mb-4">Нужна помощь с получением ипотеки?</h2>
          <p className="font-light mb-6">
            Наши специалисты помогут вам выбрать банк, подготовить документы и получить лучшие условия ипотеки в Испании.
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
            <Link href="/ru/guides/rashody-nalogi" className="bg-white p-6 rounded-sm border border-gray-200 hover:border-accent-500 transition">
              <h3 className="text-xl font-light text-primary-900 mb-2">Расходы и налоги</h3>
              <p className="text-gray-600 font-light">Полный расчет всех затрат на покупку</p>
            </Link>
            <Link href="/ru/guides/nomer-nie" className="bg-white p-6 rounded-sm border border-gray-200 hover:border-accent-500 transition">
              <h3 className="text-xl font-light text-primary-900 mb-2">Номер NIE</h3>
              <p className="text-gray-600 font-light">Как получить налоговый номер для иностранцев</p>
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
