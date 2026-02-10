import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Процесс покупки недвижимости в Испании | Новостройки Коста-Бланка',
  description: 'Полное руководство по покупке недвижимости в Испании. Пошаговый процесс, Золотая виза, ВНЖ, документы и кредиты для российских покупателей.',
  keywords: 'процесс покупки, Испания, Золотая виза, ВНЖ, недвижимость, Коста-Бланка',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/guides/process-pokupki',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/buying-process',
      sv: 'https://newbuildhomescostablanca.com/sv/guides/kopprocessen',
      nl: 'https://newbuildhomescostablanca.com/nl/guides/koopproces',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/koopproces',
      fr: 'https://newbuildhomescostablanca.com/fr/guides/processus-achat',
      no: 'https://newbuildhomescostablanca.com/no/guides/kjopsprosessen',
      de: 'https://newbuildhomescostablanca.com/de/guides/kaufprozess',
      pl: 'https://newbuildhomescostablanca.com/pl/guides/proces-zakupu',
      'x-default': 'https://newbuildhomescostablanca.com/guides/buying-process',
    },
  },
};

const breadcrumbs = [
  { name: 'Главная', url: 'https://newbuildhomescostablanca.com/ru' },
  { name: 'Гайды', url: 'https://newbuildhomescostablanca.com/ru/guides' },
  { name: 'Процесс покупки', url: 'https://newbuildhomescostablanca.com/ru/guides/process-pokupki' },
];

const faqs = [
  {
    question: 'Какие документы необходимы для покупки недвижимости в Испании?',
    answer: 'Вам понадобятся паспорт, справка об открытии банковского счета в Испании, налоговый номер NIE и подтверждение источников финансирования. Российским гражданам также потребуется справка об открытии иностранного счета (FATCA форма) и документы, подтверждающие законность происхождения средств.',
  },
  {
    question: 'Какова роль Золотой визы в процессе покупки?',
    answer: 'Золотая виза (Golden Visa) предоставляется иностранцам, инвестирующим не менее 500 000 евро в недвижимость в Испании. Это автоматически открывает путь к длительному виду на жительство и возможности получения гражданства через 10 лет. Для этого требуется недвижимость на сумму не менее 500 000 евро.',
  },
  {
    question: 'Что такое ВНЖ и как его получить?',
    answer: 'ВНЖ (вид на жительство) - это статус постоянного проживания в Испании. При покупке недвижимости на сумму 500 000 евро и выше Вы получаете право на Золотую визу, которая автоматически преобразуется в ВНЖ. Для сумм меньше 500 000 евро требуется длительная виза D, которую затем можно преобразовать в ВНЖ.',
  },
  {
    question: 'Какие банки в Испании работают с российскими клиентами?',
    answer: 'Основные испанские банки, работающие с российскими гражданами: CaixaBank, BBVA, Banco Sabadell и Banco Santander. Банки требуют полного пакета документов о происхождении средств и источниках доходов. Рекомендуем открыть счет до начала процесса покупки.',
  },
  {
    question: 'Как долго занимает процесс покупки недвижимости?',
    answer: 'Типичный процесс занимает от 2 до 4 месяцев: месяц на поиск и переговоры, месяц на получение NIE и открытие банковского счета, затем месяц на финальное оформление и нотариальную подпись. При наличии ипотеки процесс может быть дольше на 4-6 недель.',
  },
  {
    question: 'Нужна ли мне ипотека для покупки дома в Испании?',
    answer: 'Ипотека в Испании доступна иностранцам, но условия строже, чем для граждан ЕС. Банки обычно финансируют 60-80% стоимости при первоначальном взносе 20-40%. Российским гражданам требуется испанское налоговое резидентство и открытый счет в испанском банке.',
  },
  {
    question: 'Какие налоги нужно платить при покупке недвижимости?',
    answer: 'При покупке платятся: налог на передачу имущества (ITP) 6-10% от стоимости, нотариальные сборы 0,5-1%, регистрационные сборы 0,3-0,5%. Также нужно учесть гонорары адвоката (400-800 евро). Общие расходы обычно составляют 10-13% от стоимости недвижимости.',
  },
  {
    question: 'Какие шаги нужно предпринять после подписания контракта?',
    answer: 'После подписания: открыть испанский банковский счет, получить NIE, заключить договор с нотариусом, проверить санитарно-техническое состояние имущества, заключить страховку, затем 7-30 дней до окончательной подписи. После подписи предоставить документы в реестр недвижимости для регистрации.',
  },
];

export default function ProcessPokupki() {
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
            Полный процесс покупки недвижимости в Испании
          </h1>
          <p className="text-lg text-gray-700 font-light mb-6">
            Практическое руководство для российских инвесторов по покупке недвижимости на Коста-Бланке с учетом всех правовых, налоговых и иммиграционных аспектов.
          </p>
          <div className="bg-accent-500 bg-opacity-10 border-l-4 border-accent-500 p-4 rounded-sm">
            <p className="text-primary-900 font-light">
              Покупка недвижимости в Испании на сумму от 500 000 евро дает право на Золотую визу и автоматическое получение вида на жительство.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Этап 1: Подготовка к покупке
          </h2>
          <p className="text-gray-700 font-light mb-4">
            Прежде чем начать поиск недвижимости, необходимо подготовить все необходимые документы и финансовое основание для сделки.
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Сбор документов</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Паспорт (оригинал + копии, апостиль не требуется)</li>
                <li>- Справка об отсутствии судимостей (опционально)</li>
                <li>- Документы о финансовом состоянии (выписки с банков)</li>
                <li>- Справка о происхождении средств от банка</li>
                <li>- Декларация доходов за последние 2-3 года</li>
                <li>- Документы о собственности в России (при наличии)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Финансовое планирование</h3>
              <p className="text-gray-700 font-light mb-3">
                Определите свой бюджет, учитывая не только стоимость недвижимости, но и дополнительные расходы:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Налог на передачу имущества (ITP): 6-10%</li>
                <li>- Нотариальные сборы: 0,5-1%</li>
                <li>- Регистрационные сборы: 0,3-0,5%</li>
                <li>- Гонорары адвоката: 400-800 евро</li>
                <li>- Апостиль документов: 50-100 евро</li>
                <li>- Итого дополнительно: 10-13% от стоимости</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Получение налогового номера NIE</h3>
              <p className="text-gray-700 font-light">
                Номер NIE (Número de Identidad de Extranjero) является обязательным для всех иностранцев, желающих приобрести недвижимость в Испании. Это можно сделать через консульство или напрямую в Испании через адвоката или агента по недвижимости.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Этап 2: Открытие банковского счета и поиск недвижимости
          </h2>
          <p className="text-gray-700 font-light mb-6">
            Открытие испанского банковского счета является критическим шагом в процессе покупки.
          </p>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Банки для иностранцев</h3>
              <p className="text-gray-700 font-light mb-3">
                Рекомендуемые испанские банки, работающие с российскими клиентами:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li><strong>CaixaBank</strong> - один из крупнейших банков, относительно открыт для иностранцев</li>
                <li><strong>BBVA</strong> - имеет международную сеть, хороший сервис для экспатов</li>
                <li><strong>Banco Sabadell</strong> - работает с иностранными клиентами</li>
                <li><strong>Banco Santander</strong> - международный банк с обширной сетью</li>
              </ul>
              <p className="text-gray-700 font-light mt-4">
                Для открытия счета потребуются: паспорт, справка об отсутствии счетов в других банках, документы о происхождении средств, справка о доходах.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Поиск недвижимости</h3>
              <p className="text-gray-700 font-light">
                На этом этапе рекомендуется работать с проверенным агентом по недвижимости, который имеет опыт работы с иностранными покупателями и понимает все нюансы процесса. Агент поможет найти подходящую недвижимость, согласовать цену и подготовить предварительный контракт.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Этап 3: Предложение и предварительный контракт
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Подача предложения</h3>
              <p className="text-gray-700 font-light mb-3">
                После выбора недвижимости агент подает письменное предложение (oferta). На этом этапе:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Вносится депозит 3-10% от стоимости (резервирует недвижимость)</li>
                <li>- Депозит хранится на счете агента или в условиях</li>
                <li>- Вы получаете письменное подтверждение от продавца</li>
                <li>- Начинается процесс переговоров по цене и условиям</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Предварительный контракт (Contrato Privado)</h3>
              <p className="text-gray-700 font-light mb-3">
                После согласования условий подписывается предварительный контракт:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Договор описывает предмет, цену и условия</li>
                <li>- Внесенный депозит зачитывается в счет покупки</li>
                <li>- Устанавливаются сроки для завершения сделки (обычно 30-60 дней)</li>
                <li>- Разрешаются технические проверки и инспекции</li>
                <li>- Оговариваются условия финансирования (если нужна ипотека)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Этап 4: Финансирование и ипотека
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Варианты финансирования</h3>
              <ul className="space-y-3 text-gray-700 font-light">
                <li>
                  <strong>Наличное финансирование:</strong> Если у Вас достаточно средств, это ускоряет процесс. Требуется подтверждение происхождения средств.
                </li>
                <li>
                  <strong>Ипотека в испанском банке:</strong> Иностранцы могут получить ипотеку на 60-80% стоимости с первоначальным взносом 20-40%. Требуется испанское налоговое резидентство.
                </li>
                <li>
                  <strong>Международный кредит:</strong> Некоторые международные банки предоставляют кредиты для покупки недвижимости в Испании.
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Процесс получения ипотеки</h3>
              <p className="text-gray-700 font-light mb-3">
                Если Вы выбрали ипотеку:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Подайте заявку в испанский банк с документами о доходах</li>
                <li>- Банк проведет оценку недвижимости</li>
                <li>- Получите предварительное одобрение (обычно 4-6 недель)</li>
                <li>- Закончите переговоры и получите окончательное одобрение</li>
                <li>- Средства переводятся в день нотариальной подписи</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Этап 5: Нотариальная подпись и завершение
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Подготовка к нотариальной подписи</h3>
              <p className="text-gray-700 font-light mb-3">
                За 7-30 дней до нотариальной подписи:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Окончательная проверка правового статуса недвижимости</li>
                <li>- Проверка отсутствия задолженности по налогам и коммунальным</li>
                <li>- Техническая инспекция имущества</li>
                <li>- Страховка имущества (если нужна ипотека)</li>
                <li>- Согласование условий между сторонами через адвоката</li>
                <li>- Перевод окончательной суммы на счет продавца</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">День нотариальной подписи</h3>
              <p className="text-gray-700 font-light mb-3">
                В день подписи у нотариуса:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Оба стороны (или их представители) присутствуют у нотариуса</li>
                <li>- Нотариус подтверждает идентичность сторон</li>
                <li>- Подписывается окончательный контракт (escritura publica)</li>
                <li>- Оплачиваются нотариальные сборы (0,5-1%)</li>
                <li>- Передаются ключи от недвижимости</li>
                <li>- Получаются копии документов</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Регистрация в реестре недвижимости</h3>
              <p className="text-gray-700 font-light">
                После нотариальной подписи адвокат регистрирует имущество в реестре (Registro de la Propiedad) в течение 30 дней. Это подтверждает Вашу полную собственность на имущество и защищает Ваши права.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Золотая виза и получение ВНЖ
          </h2>

          <div className="space-y-4">
            <div className="bg-warm-100 p-6 rounded-sm border border-warm-300">
              <h3 className="text-xl font-light text-primary-900 mb-3">Процесс получения Золотой визы</h3>
              <p className="text-gray-700 font-light mb-3">
                При покупке недвижимости на сумму 500 000 евро и более Вы имеете право на Золотую визу:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>1. После завершения сделки купить недвижимость на сумму минимум 500 000 евро</li>
                <li>2. Получить справку о собственности недвижимости</li>
                <li>3. Обратиться в консульство Испании в Вашей стране</li>
                <li>4. Подать заявку на Золотую визу с документами о собственности</li>
                <li>5. После одобрения получить виду сроком на 2 года (возобновляется каждые 2 года)</li>
              </ul>
            </div>

            <div className="bg-warm-100 p-6 rounded-sm border border-warm-300">
              <h3 className="text-xl font-light text-primary-900 mb-3">Преобразование Золотой визы в ВНЖ</h3>
              <p className="text-gray-700 font-light mb-3">
                Золотая виза автоматически дает право на:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Проживание в Испании на время действия визы (2 года)</li>
                <li>- Посещение других стран Шенгенской зоны</li>
                <li>- Работу и бизнес в Испании</li>
                <li>- Возможность покупки других недвижимостей и инвестиций</li>
                <li>- Исключение для членов семьи (супруга и дети до 21 года)</li>
              </ul>
              <p className="text-gray-700 font-light mt-4">
                После 5 лет проживания в Испании Вы можете подать заявку на постоянное ВНЖ (residencia permanente). После 10 лет Вы можете подать заявку на испанское гражданство.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Налоговые и финансовые обязательства
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Налоги при покупке</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li><strong>Налог на передачу имущества (ITP):</strong> 6-10% от стоимости (зависит от региона)</li>
                <li><strong>Налог на прирост стоимости (plusvalia):</strong> Продавец платит, но влияет на окончательную цену</li>
                <li><strong>Нотариальные сборы:</strong> 0,5-1% от стоимости</li>
                <li><strong>Регистрационные сборы:</strong> 0,3-0,5% от стоимости</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Ежегодные налоги</h3>
              <p className="text-gray-700 font-light mb-3">
                После покупки Вы обязаны платить:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li><strong>Налог на имущество (IBI):</strong> 0,4-1,1% годовой стоимости</li>
                <li><strong>Налог на доход нерезидентов (IRNR):</strong> 19-24% для иностранцев при сдаче в аренду</li>
                <li><strong>Налог на прибыль (plusvalia):</strong> При продаже в будущем</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Двойное налогообложение</h3>
              <p className="text-gray-700 font-light">
                Российским гражданам необходимо обратить внимание на соглашение об избежании двойного налогообложения между Россией и Испанией. При правильной организации можно минимизировать налоговую нагрузку через испанское налоговое резидентство и надлежащие декларации доходов.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-900 text-white p-8 rounded-sm mb-12">
          <h2 className="text-2xl font-light mb-4">Готовы начать процесс покупки?</h2>
          <p className="font-light mb-6">
            Наши специалисты помогут Вам на каждом этапе процесса покупки, от выбора недвижимости до получения Золотой визы и открытия банковского счета.
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
            <Link href="/ru/guides/nomer-nie" className="bg-white p-6 rounded-sm border border-gray-200 hover:border-accent-500 transition">
              <h3 className="text-xl font-light text-primary-900 mb-2">Номер NIE</h3>
              <p className="text-gray-600 font-light">Как получить налоговый номер для иностранцев</p>
            </Link>
            <Link href="/ru/guides/rashody-nalogi" className="bg-white p-6 rounded-sm border border-gray-200 hover:border-accent-500 transition">
              <h3 className="text-xl font-light text-primary-900 mb-2">Расходы и налоги</h3>
              <p className="text-gray-600 font-light">Полный расчет всех затрат на покупку</p>
            </Link>
            <Link href="/ru/guides/ipoteka" className="bg-white p-6 rounded-sm border border-gray-200 hover:border-accent-500 transition">
              <h3 className="text-xl font-light text-primary-900 mb-2">Ипотека</h3>
              <p className="text-gray-600 font-light">Получение кредита для покупки недвижимости</p>
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
