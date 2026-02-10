import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Номер NIE для иностранцев в Испании | Руководство',
  description: 'Как получить налоговый номер NIE в Испании для покупки недвижимости. Пошаговое руководство для российских граждан.',
  keywords: 'NIE, Número de Identidad de Extranjero, налоговый номер, Испания, иностранцы',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/guides/nomer-nie',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/nie-number',
      sv: 'https://newbuildhomescostablanca.com/sv/guides/nie-nummer',
      nl: 'https://newbuildhomescostablanca.com/nl/guides/nie-nummer',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/nie-nummer',
      fr: 'https://newbuildhomescostablanca.com/fr/guides/nie',
      no: 'https://newbuildhomescostablanca.com/no/guides/nie-nummer',
      de: 'https://newbuildhomescostablanca.com/de/guides/nie-nummer',
      pl: 'https://newbuildhomescostablanca.com/pl/guides/numer-nie',
      'x-default': 'https://newbuildhomescostablanca.com/guides/nie-number',
    },
  },
};

const breadcrumbs = [
  { name: 'Главная', url: 'https://newbuildhomescostablanca.com/ru' },
  { name: 'Гайды', url: 'https://newbuildhomescostablanca.com/ru/guides' },
  { name: 'Номер NIE', url: 'https://newbuildhomescostablanca.com/ru/guides/nomer-nie' },
];

const faqs = [
  {
    question: 'Что такое NIE и зачем он нужен?',
    answer: 'NIE (Número de Identidad de Extranjero) - это налоговый номер для иностранцев в Испании. Он необходим для открытия банковского счета, покупки недвижимости, работы, уплаты налогов и официальной регистрации в стране. Без NIE невозможно полноценно участвовать в испанской экономике.',
  },
  {
    question: 'Кто может получить NIE?',
    answer: 'NIE может получить любой иностранец, проживающий в Испании или имеющий финансовые интересы в стране (покупка недвижимости, открытие бизнеса, работа). Гражданам ЕС выдается номер ID ЕС, а гражданам третьих стран (включая россиян) выдается NIE.',
  },
  {
    question: 'Сколько времени занимает получение NIE?',
    answer: 'При подаче заявки лично в консульстве: 1-3 месяца. Через полномочного представителя или агента в Испании: 2-4 недели. В срочном случае через интернет: 5-10 дней. Время зависит от перегруженности консульства и страны проживания.',
  },
  {
    question: 'Какие документы нужны для получения NIE?',
    answer: 'Основные документы: оригинал паспорта, заполненная форма EX-15 (или онлайн-версия), подтверждение адреса проживания, документы о цели пребывания (договор покупки недвижимости, контракт работы и т.д.), копия паспорта. Может потребоваться справка об отсутствии судимостей.',
  },
  {
    question: 'Можно ли получить NIE удаленно из России?',
    answer: 'Да, можно подать заявку онлайн через консульство Испании в России (в Москве, Санкт-Петербурге). Это самый быстрый способ. Документы подаются в цифровом виде, а справка отправляется по почте в течение 5-10 дней.',
  },
  {
    question: 'Какова стоимость получения NIE?',
    answer: 'Получение NIE полностью бесплатно. Никаких официальных платежей нет. Однако при необходимости помощи адвоката или агента придется оплатить их услуги (обычно 100-200 евро).',
  },
  {
    question: 'Как долго действует NIE?',
    answer: 'NIE выдается пожизненно и не имеет срока действия. Однако его можно аннулировать, если вы прекращаете деятельность в Испании. При смене адреса в Испании номер остается прежним.',
  },
  {
    question: 'Как открыть банковский счет с помощью NIE?',
    answer: 'После получения NIE вы можете обратиться в любой испанский банк. Требуемые документы: паспорт, NIE, справка об адресе проживания, справка от работодателя или декларация о доходах. Некоторые банки требуют начальный депозит (от 100 евро).',
  },
];

export default function NomerNIE() {
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
            Номер NIE - Налоговый номер для иностранцев в Испании
          </h1>
          <p className="text-lg text-gray-700 font-light mb-6">
            Полное руководство по получению NIE (Número de Identidad de Extranjero) для покупки недвижимости и жизни в Испании. Все шаги, документы и сроки для российских граждан.
          </p>
          <div className="bg-accent-500 bg-opacity-10 border-l-4 border-accent-500 p-4 rounded-sm">
            <p className="text-primary-900 font-light">
              NIE - это единственный официальный налоговый номер, необходимый для всех иностранцев, желающих приобрести недвижимость или открыть бизнес в Испании.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Что такое NIE?
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Определение и значение</h3>
              <p className="text-gray-700 font-light mb-3">
                NIE (Número de Identidad de Extranjero) - это 9-значный налоговый идентификационный номер, выдаваемый испанским правительством иностранцам для целей налогообложения, финансовых операций и официальной регистрации в стране.
              </p>
              <p className="text-gray-700 font-light mb-3">
                Это отличается от номера социального страхования (AFILIACION) и является уникальным для каждого иностранца.
              </p>
              <p className="text-gray-700 font-light">
                NIE похож на социальный номер в США, но предназначен специально для налогообложения и официальных целей. Он состоит из буквы, семи цифр и еще одной буквы (например, X1234567Y).
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Когда нужен NIE?</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- При покупке или продаже недвижимости</li>
                <li>- Открытии банковского счета в испанском банке</li>
                <li>- Уплате налогов (IRPF, IVA, IBI и других)</li>
                <li>- Работе или открытии бизнеса в Испании</li>
                <li>- Аренде жилого помещения</li>
                <li>- Получении Золотой визы или постоянного вида на жительство</li>
                <li>- Заключении контрактов и договоров</li>
              </ul>
            </div>

            <div className="bg-warm-100 p-6 rounded-sm border border-warm-300">
              <h3 className="text-xl font-light text-primary-900 mb-3">Преимущества получения NIE</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Открытие банковского счета в испанском банке без ограничений</li>
                <li>- Возможность получить испанское налоговое резидентство</li>
                <li>- Доступ к испанским финансовым услугам (кредиты, ипотека)</li>
                <li>- Защита ваших прав как собственника недвижимости</li>
                <li>- Возможность получения Золотой визы при инвестиции от 500 000 евро</li>
                <li>- Минимизация налоговой нагрузки через правильное планирование</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Способы получения NIE
          </h2>
          <p className="text-gray-700 font-light mb-6">
            Существует несколько способов получить NIE в зависимости от вашего местоположения и срочности.
          </p>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">1. Через консульство Испании в России (рекомендуется)</h3>
              <p className="text-gray-700 font-light mb-3">
                Это самый быстрый и удобный способ для российских граждан:
              </p>
              <ul className="space-y-2 text-gray-700 font-light mb-4">
                <li>- <strong>Консульство в Москве:</strong> самое крупное и занимает 1-2 месяца</li>
                <li>- <strong>Консульство в Санкт-Петербурге:</strong> часто быстрее (3-4 недели)</li>
                <li>- <strong>Почетные консульства:</strong> в других крупных городах</li>
              </ul>
              <p className="text-gray-700 font-light">
                Процесс: подаете документы лично или по почте, ждете ответа, получаете справку с номером NIE. Можно также подать онлайн через портал консульства.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">2. Через полномочного представителя в Испании</h3>
              <p className="text-gray-700 font-light mb-3">
                Если вы работаете с агентом по недвижимости или адвокатом в Испании:
              </p>
              <ul className="space-y-2 text-gray-700 font-light mb-4">
                <li>- Представитель подает документы в испанское управление по налогам</li>
                <li>- Это может быть быстрее (2-3 недели)</li>
                <li>- Требуется доверенность на представителя</li>
              </ul>
              <p className="text-gray-700 font-light">
                Стоимость услуг представителя: 100-200 евро. Это часто включено в комплексные услуги по помощи в покупке недвижимости.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">3. Лично в испанском управлении по налогам (Agencia Tributaria)</h3>
              <p className="text-gray-700 font-light mb-3">
                Если вы находитесь в Испании:
              </p>
              <ul className="space-y-2 text-gray-700 font-light mb-4">
                <li>- Подается персонально в ближайшее отделение Agencia Tributaria</li>
                <li>- Получение справки обычно в тот же день или в течение недели</li>
                <li>- Требуется паспорт и заполненная форма</li>
              </ul>
              <p className="text-gray-700 font-light">
                Это самый быстрый способ, если вы можете приехать в Испанию. NIE выдается почти сразу после подачи документов.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">4. Онлайн через портал Agencia Tributaria</h3>
              <p className="text-gray-700 font-light mb-3">
                Самый современный и удобный способ (если доступен):
              </p>
              <ul className="space-y-2 text-gray-700 font-light mb-4">
                <li>- Подача документов в электронном виде</li>
                <li>- Срок: 5-10 дней</li>
                <li>- Справка отправляется по почте или электронной почте</li>
              </ul>
              <p className="text-gray-700 font-light">
                Требуется электронная подпись (firma electronica) или сертификат. Некоторые консульства Испании в России поддерживают этот способ.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Необходимые документы для получения NIE
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Основной пакет документов</h3>
              <ul className="space-y-3 text-gray-700 font-light">
                <li>
                  <strong>Паспорт:</strong> Оригинал и копии всех страниц с информацией. Паспорт должен быть действительным минимум 6 месяцев.
                </li>
                <li>
                  <strong>Форма EX-15 (Solicitud NIE):</strong> Можно загрузить с сайта консульства или получить там же. Заполняется от руки или на компьютере в двух экземплярах.
                </li>
                <li>
                  <strong>Справка об адресе проживания:</strong> Если вы в России - не требуется. Если в Испании - справка от местного органа управления или арендодателя.
                </li>
                <li>
                  <strong>Документы о цели пребывания:</strong> Договор покупки недвижимости, трудовой контракт, документы о регистрации компании или другие подтверждающие документы.
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Дополнительные документы</h3>
              <ul className="space-y-3 text-gray-700 font-light">
                <li>
                  <strong>Справка об отсутствии судимостей:</strong> Может потребоваться для получения визы. Получается в органах МВД в России.
                </li>
                <li>
                  <strong>Документы о финансовом состоянии:</strong> Выписки с банков, справки о доходах для подтверждения платежеспособности.
                </li>
                <li>
                  <strong>Согласие на обработку данных:</strong> Стандартное согласие на обработку персональных данных испанскими органами власти.
                </li>
                <li>
                  <strong>Копия банковского счета:</strong> Если у вас уже есть счет в испанском банке, приложите копию.
                </li>
              </ul>
            </div>

            <div className="bg-warm-100 p-6 rounded-sm border border-warm-300">
              <h3 className="text-xl font-light text-primary-900 mb-3">Важно: Апостиль документов</h3>
              <p className="text-gray-700 font-light mb-3">
                Если документы получены в России, они должны быть заверены апостилем (международное удостоверение подлинности подписей и печатей). Апостиль получается в:
              </p>
              <ul className="space-y-2 text-gray-700 font-light mb-3">
                <li>- Органах записи актов гражданского состояния (свидетельства о рождении, браке)</li>
                <li>- Нотариусе (копии документов)</li>
                <li>- Органах управления (выписки из реестров)</li>
              </ul>
              <p className="text-gray-700 font-light">
                Стоимость апостиля: обычно 200-500 рублей за документ. Срок: 1-3 рабочих дня.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Пошаговая инструкция по получению NIE
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Шаг 1: Подготовка документов</h3>
              <p className="text-gray-700 font-light mb-3">Примерное время: 1-2 недели</p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Соберите все необходимые документы (см. выше)</li>
                <li>- Сделайте копии паспорта (желательно заверенные нотариусом)</li>
                <li>- Переведите документы при необходимости (не всегда требуется)</li>
                <li>- Получите апостиль на документы, если они выданы в России</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Шаг 2: Заполнение формы EX-15</h3>
              <p className="text-gray-700 font-light mb-3">Примерное время: 30 минут</p>
              <p className="text-gray-700 font-light mb-3">
                Форма содержит следующие разделы:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Личные данные (ФИО, дата рождения, место рождения)</li>
                <li>- Адрес проживания (в России или в Испании)</li>
                <li>- Цель получения NIE (покупка недвижимости, работа и т.д.)</li>
                <li>- Подпись в двух экземплярах</li>
              </ul>
              <p className="text-gray-700 font-light mt-3">
                Форму можно скачать с сайта консульства Испании в России или попросить по электронной почте.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Шаг 3: Подача документов</h3>
              <p className="text-gray-700 font-light mb-3">Примерное время: день подачи</p>
              <p className="text-gray-700 font-light mb-3">
                Варианты подачи:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Лично в консульстве: прием обычно по предварительной записи</li>
                <li>- По почте: отправьте оригиналы или нотариально заверенные копии</li>
                <li>- Через представителя в Испании: потребуется доверенность</li>
                <li>- Онлайн через портал: если доступно</li>
              </ul>
              <p className="text-gray-700 font-light mt-3">
                При личной подаче принесите с собой паспорт для проверки оригинала и подпись в консульстве.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Шаг 4: Ожидание решения</h3>
              <p className="text-gray-700 font-light mb-3">Примерное время: 1-3 месяца</p>
              <p className="text-gray-700 font-light mb-3">
                Время обработки зависит от:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Перегруженности консульства (в Москве дольше, чем в других городах)</li>
                <li>- Полноты пакета документов</li>
                <li>- Способа подачи (лично быстрее, чем по почте)</li>
                <li>- Сезонности (летом процесс может быть дольше)</li>
              </ul>
              <p className="text-gray-700 font-light mt-3">
                Консульство уведомит вас по телефону или по электронной почте, когда NIE будет готов.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Шаг 5: Получение справки NIE</h3>
              <p className="text-gray-700 font-light mb-3">Примерное время: день получения</p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Получите справку (Certificado de Asignación del Número de NIE) в консульстве</li>
                <li>- Справка содержит ваш 9-значный номер NIE</li>
                <li>- Сделайте несколько копий для последующих процедур</li>
                <li>- Сохраняйте справку в безопасном месте</li>
              </ul>
              <p className="text-gray-700 font-light mt-3">
                Если подавали по почте, справка придет по почте (обычная или рекомендованная с уведомлением).
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            NIE и открытие банковского счета
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Как использовать NIE для открытия счета</h3>
              <p className="text-gray-700 font-light mb-3">
                После получения NIE вы можете открыть банковский счет в любом испанском банке:
              </p>
              <ol className="space-y-2 text-gray-700 font-light">
                <li>1. Выберите банк (CaixaBank, BBVA, Banco Sabadell рекомендуются для иностранцев)</li>
                <li>2. Подготовьте документы: паспорт, справка о NIE, справка об адресе проживания</li>
                <li>3. Посетите отделение банка или подайте заявку онлайн</li>
                <li>4. Подпишите договор об открытии счета</li>
                <li>5. Внесите начальный депозит (обычно от 100 евро)</li>
                <li>6. Получите банковскую карту и реквизиты счета</li>
              </ol>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Требования банков для иностранцев</h3>
              <ul className="space-y-3 text-gray-700 font-light">
                <li>
                  <strong>Паспорт:</strong> Действительный паспорт с четкими фотографиями
                </li>
                <li>
                  <strong>NIE:</strong> Справка о присвоении номера NIE
                </li>
                <li>
                  <strong>Адрес проживания:</strong> В России - документ с адресом, в Испании - справка от местных органов
                </li>
                <li>
                  <strong>Источник средств:</strong> Банк может попросить объяснение происхождения средств
                </li>
                <li>
                  <strong>Справка о доходах:</strong> Для больших сумм может потребоваться справка о доходах или налоговая декларация
                </li>
              </ul>
            </div>

            <div className="bg-warm-100 p-6 rounded-sm border border-warm-300">
              <h3 className="text-xl font-light text-primary-900 mb-3">FATCA и информирование о банках</h3>
              <p className="text-gray-700 font-light mb-3">
                При открытии счета испанский банк попросит вас заполнить форму FATCA (Foreign Account Tax Compliance Act):
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Это требование к иностранным гражданам для целей налогового контроля</li>
                <li>- Информация передается в налоговые органы как России, так и Испании</li>
                <li>- Это не должно вас пугать - это стандартная процедура</li>
                <li>- Важно правильно указать источник средств и цель открытия счета</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Часто задаваемые вопросы о NIE
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Нужен ли мне адвокат для получения NIE?</h3>
              <p className="text-gray-700 font-light">
                Нет, это совершенно необязательно. Вы можете получить NIE самостоятельно через консульство или онлайн. Адвокат или агент по недвижимости может помочь, но это будет стоить дополнительно (100-200 евро).
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Может ли моя жена получить отдельный NIE?</h3>
              <p className="text-gray-700 font-light">
                Да, каждый иностранец получает свой собственный NIE. Если вы женаты, ваша жена должна подать отдельную заявку и получит свой уникальный номер NIE.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Что произойдет, если я куплю недвижимость до получения NIE?</h3>
              <p className="text-gray-700 font-light">
                Это невозможно. NIE требуется для регистрации нотариального акта и собственности в земельном реестре. Без NIE вы не можете завершить покупку недвижимости.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Нужно ли мне возобновлять NIE?</h3>
              <p className="text-gray-700 font-light">
                Нет, NIE выдается пожизненно и не имеет срока действия. Вам не нужно его возобновлять. Однако вы должны информировать испанские налоговые органы об изменении адреса или других личных данных.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-900 text-white p-8 rounded-sm mb-12">
          <h2 className="text-2xl font-light mb-4">Нужна помощь с получением NIE?</h2>
          <p className="font-light mb-6">
            Наши специалисты помогут вам на каждом этапе получения NIE и открытия банковского счета в Испании.
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
