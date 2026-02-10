import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Под ключ vs на плане: Какой вариант выбрать? | Руководство',
  description: 'Полное сравнение покупки недвижимости под ключ (готовой) и на плане (в процессе строительства). Преимущества, недостатки, риски.',
  keywords: 'под ключ, на плане, готовая недвижимость, в процессе строительства, obra nueva',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/guides/pod-klyuch-vs-plan',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/key-ready-vs-off-plan',
      sv: 'https://newbuildhomescostablanca.com/sv/guides/kant-och-klaar-vs-ritning',
      nl: 'https://newbuildhomescostablanca.com/nl/guides/kant-en-klaar-vs-ritning',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/kant-en-klaar-vs-ritning',
      fr: 'https://newbuildhomescostablanca.com/fr/guides/cles-en-main-vs-plan',
      no: 'https://newbuildhomescostablanca.com/no/guides/innflyttingsklar-tegning',
      de: 'https://newbuildhomescostablanca.com/de/guides/schluesselfertig-vs-planverkauf',
      pl: 'https://newbuildhomescostablanca.com/pl/guides/pod-klucz-vs-plan',
      'x-default': 'https://newbuildhomescostablanca.com/guides/key-ready-vs-off-plan',
    },
  },
};

const breadcrumbs = [
  { name: 'Главная', url: 'https://newbuildhomescostablanca.com/ru' },
  { name: 'Гайды', url: 'https://newbuildhomescostablanca.com/ru/guides' },
  { name: 'Под ключ vs на плане', url: 'https://newbuildhomescostablanca.com/ru/guides/pod-klyuch-vs-plan' },
];

const faqs = [
  {
    question: 'Что означает "под ключ" (key ready)?',
    answer: 'Под ключ (key ready) означает, что недвижимость полностью готова к заселению. Все строительные работы завершены, отделка сделана, коммунальные услуги подключены. Вы просто получаете ключи и можете въезжать.',
  },
  {
    question: 'Что означает "на плане" (off-plan)?',
    answer: 'На плане (off-plan) означает, что недвижимость еще находится в процессе строительства. Вы покупаете по плану и документам, видите примерно, как будет выглядеть дом, но строительство может занять 18-36 месяцев.',
  },
  {
    question: 'Какой вариант дешевле?',
    answer: 'На плане обычно дешевле на 10-20%, так как вы берете риск и нужно финансировать строительство. Под ключ дороже, но вы получаете готовый продукт без рисков.',
  },
  {
    question: 'Есть ли гарантия на оба варианта?',
    answer: 'На оба варианта есть 10-летняя гарантия конструкции в Испании. Но на плане гарантия действует с момента подписания акта приема-передачи, а под ключ - сразу при покупке.',
  },
  {
    question: 'Когда я получу недвижимость при покупке на плане?',
    answer: 'При покупке на плане вы получите ключи через 18-36 месяцев, когда строительство будет завершено и проведена инспекция качества. На побережье задержки встречаются часто.',
  },
  {
    question: 'Какой вариант лучше для инвестиции?',
    answer: 'На плане обычно лучше для инвестиции, так как цена ниже и потенциал роста выше. Но требуется терпение и готовность к возможным задержкам. Под ключ менее рискован, но меньше потенциал.',
  },
  {
    question: 'Могу ли я получить ипотеку на оба варианта?',
    answer: 'Да, на оба варианта можно получить ипотеку, но условия отличаются. На плане может быть выше финансирование (до 85%), но с рассроченной оплатой. Под ключ стандартные условия.',
  },
  {
    question: 'Какие риски при покупке на плане?',
    answer: 'Основные риски: задержки строительства, изменение качества или дизайна, финансовые проблемы застройщика, увеличение расходов, изменение рынка, непредвиденные проблемы при строительстве.',
  },
];

export default function PodKlyuchVsPlan() {
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
            Под ключ vs На плане: Какой вариант выбрать?
          </h1>
          <p className="text-lg text-gray-700 font-light mb-6">
            Полное сравнение покупки готовой недвижимости (под ключ) и недвижимости в процессе строительства (на плане). Преимущества, недостатки, риски и рекомендации.
          </p>
          <div className="bg-accent-500 bg-opacity-10 border-l-4 border-accent-500 p-4 rounded-sm">
            <p className="text-primary-900 font-light">
              На плане дешевле на 10-20%, но требует терпения. Под ключ дороже, но готов к немедленному использованию. Выбор зависит от вашего риск-профиля и целей.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Что такое "Под ключ" (Key Ready)?
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Определение и характеристики</h3>
              <p className="text-gray-700 font-light mb-3">
                Под ключ (Key Ready) означает, что недвижимость полностью готова к жилью. Все работы завершены, и вы просто получаете ключи.
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Строительство полностью завершено</li>
                <li>- Все комнаты отделаны (краска, плитка, полы)</li>
                <li>- Кухня и ванная установлены и готовы к использованию</li>
                <li>- Электричество, вода, газ подключены</li>
                <li>- Окна, двери, замки установлены</li>
                <li>- Проведена инспекция качества</li>
                <li>- Получены все необходимые сертификаты и разрешения</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Когда я могу получить ключи?</h3>
              <p className="text-gray-700 font-light mb-3">
                При покупке под ключ:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Сроки:</strong> обычно 1-4 месяца с момента подписания контракта</li>
                <li>- <strong>Процесс:</strong> проверка правового статуса, получение NIE, открытие счета, финальная инспекция</li>
                <li>- <strong>Вы вправе:</strong> внести замечания по дефектам до подписи акта приема-передачи</li>
                <li>- <strong>После получения:</strong> дом полностью ваш, вы можете сразу въехать</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Что проверить при покупке под ключ</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Финальный осмотр (control de calidad):</strong> обязательна перед подписанием</li>
                <li>- <strong>Все коммунальные услуги:</strong> проверьте, что все работает</li>
                <li>- <strong>Состояние внутри:</strong> краска, плитка, полы, окна</li>
                <li>- <strong>Сертификаты:</strong> убедитесь, что все разрешения получены</li>
                <li>- <strong>Передача документов:</strong> гарантийные карточки, инструкции, пульты управления</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Что такое "На плане" (Off-Plan)?
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Определение и характеристики</h3>
              <p className="text-gray-700 font-light mb-3">
                На плане (Off-Plan) означает покупку недвижимости, которая еще находится в процессе строительства. Вы покупаете по плану, проектам и обещаниям.
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Строительство находится на ранней или средней стадии</li>
                <li>- Вы видите план и макеты</li>
                <li>- Можете выбрать некоторые опции (керамику, краску, материалы)</li>
                <li>- Платежи производятся по этапам строительства</li>
                <li>- Получение ключей через 18-36 месяцев</li>
                <li>- Цена обычно ниже, чем на готовую недвижимость</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Типичные этапы платежа при покупке на плане</h3>
              <div className="space-y-3 text-gray-700 font-light text-sm bg-gray-50 p-4 rounded-sm">
                <div className="flex justify-between">
                  <span>1. При подписании контракта:</span>
                  <span className="font-semibold">10-20%</span>
                </div>
                <div className="flex justify-between">
                  <span>2. При закладке фундамента:</span>
                  <span className="font-semibold">20%</span>
                </div>
                <div className="flex justify-between">
                  <span>3. При завершении конструкции:</span>
                  <span className="font-semibold">30-40%</span>
                </div>
                <div className="flex justify-between">
                  <span>4. При завершении строительства:</span>
                  <span className="font-semibold">30-40%</span>
                </div>
                <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
                  <span className="font-semibold">Всего:</span>
                  <span className="font-semibold">100%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Риски при покупке на плане</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Задержки строительства:</strong> обычно 6-12 месяцев на побережье</li>
                <li>- <strong>Изменение качества:</strong> могут изменить материалы на более дешевые</li>
                <li>- <strong>Финансовые проблемы:</strong> застройщик может обанкротиться</li>
                <li>- <strong>Изменение рынка:</strong> цены могут упасть до завершения</li>
                <li>- <strong>Дополнительные расходы:</strong> могут потребоваться доплаты</li>
                <li>- <strong>Непредвиденные проблемы:</strong> геология, разрешения, природные катаклизмы</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Что защищает ваши интересы при покупке на плане</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Гарантия возврата денег:</strong> если проект не завершен через определенный период</li>
                <li>- <strong>Страховка застройщика:</strong> на случай его несостоятельности</li>
                <li>- <strong>Банковский счет:</strong> ваши платежи хранятся на заблокированном счете</li>
                <li>- <strong>Акт приема-передачи:</strong> документ, подтверждающий качество при завершении</li>
                <li>- <strong>Юридическая защита:</strong> контракт должен быть составлен адвокатом</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Детальное сравнение
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-gray-700 font-light text-sm">
              <thead className="bg-primary-900 text-white">
                <tr>
                  <th className="p-3 text-left rounded-tl-sm">Критерий</th>
                  <th className="p-3 text-left">Под ключ</th>
                  <th className="p-3 text-left rounded-tr-sm">На плане</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3"><strong>Цена</strong></td>
                  <td className="p-3">Выше на 10-20%</td>
                  <td className="p-3">Ниже</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-3"><strong>Время до получения</strong></td>
                  <td className="p-3">1-4 месяца</td>
                  <td className="p-3">18-36 месяцев</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3"><strong>Состояние при получении</strong></td>
                  <td className="p-3">Готово к жилью</td>
                  <td className="p-3">Может требовать мелкого ремонта</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-3"><strong>Риск задержек</strong></td>
                  <td className="p-3">Низкий</td>
                  <td className="p-3">Высокий (6-12 месяцев типично)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3"><strong>Возможность изменений</strong></td>
                  <td className="p-3">Нет, всё определено</td>
                  <td className="p-3">Есть (опции, материалы)</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-3"><strong>Ипотека</strong></td>
                  <td className="p-3">Стандартные условия</td>
                  <td className="p-3">Может быть выше процент финансирования</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3"><strong>Гарантия</strong></td>
                  <td className="p-3">10 лет с момента получения</td>
                  <td className="p-3">10 лет с момента подписи акта</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-3"><strong>Возможность проверки</strong></td>
                  <td className="p-3">Полная - можете всё видеть</td>
                  <td className="p-3">Ограниченная - видите план и макет</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3"><strong>Финансовый риск</strong></td>
                  <td className="p-3">Низкий</td>
                  <td className="p-3">Средний-высокий (банкротство застройщика)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3"><strong>Инвестиционный потенциал</strong></td>
                  <td className="p-3">Средний (уже оценена рынком)</td>
                  <td className="p-3">Высокий (больше потенциала роста)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Финансовое сравнение
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Пример 1: Инвестиционная недвижимость (300 000 евро)</h3>

              <div className="space-y-3 text-gray-700 font-light text-sm">
                <p className="font-semibold mb-3">Сценарий А: Под ключ</p>
                <div className="bg-gray-50 p-3 rounded-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Стоимость дома:</span>
                    <span>300 000 евро</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Налоги и сборы (10%):</span>
                    <span>30 000 евро</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-300 pt-1 mt-1">
                    <span className="font-semibold">Всего инвестиций:</span>
                    <span className="font-semibold">330 000 евро</span>
                  </div>
                </div>

                <p className="font-semibold mb-3 pt-3">Сценарий B: На плане (на 15% дешевле)</p>
                <div className="bg-gray-50 p-3 rounded-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Стоимость дома:</span>
                    <span>255 000 евро</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Налоги и сборы (10%):</span>
                    <span>25 500 евро</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-300 pt-1 mt-1">
                    <span className="font-semibold">Всего инвестиций:</span>
                    <span className="font-semibold">280 500 евро</span>
                  </div>
                </div>

                <p className="font-semibold mb-3 pt-3">После 5 лет (с 10% ежегодным ростом):</p>
                <div className="bg-accent-100 p-3 rounded-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Под ключ (вырастет до):</span>
                    <span>483 000 евро</span>
                  </div>
                  <div className="flex justify-between">
                    <span>На плане (вырастет до):</span>
                    <span>410 500 евро</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-accent-200">
                    <span>Разница в прибыли:</span>
                    <span className="font-semibold">72 500 евро в пользу под ключ</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 pt-2">Примечание: Это упрощенный расчет без учета морального износа, налогов и амортизации.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Ипотека: Сравнение платежей</h3>

              <div className="space-y-3 text-gray-700 font-light text-sm">
                <p>Кредит 240 000 евро на 20 лет при ставке 3,8%:</p>
                <div className="bg-gray-50 p-3 rounded-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Ежемесячный платеж:</span>
                    <span className="font-semibold">1 280 евро</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Общий процент за 20 лет:</span>
                    <span className="font-semibold">68 000 евро</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Как выбрать правильный вариант?
          </h2>

          <div className="space-y-4">
            <div className="bg-warm-100 p-6 rounded-sm border border-warm-300">
              <h3 className="text-xl font-light text-primary-900 mb-3">Выбирайте "Под ключ" если:</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Вы хотите немедленно въехать или начать сдавать в аренду</li>
                <li>- Вы хотите избежать рисков задержек и изменений</li>
                <li>- Вы не хотите ждать 2-3 года до получения дома</li>
                <li>- Вам нужна максимальная финальная стоимость (под ключ часто выше)</li>
                <li>- Вам нужна полная ясность перед покупкой</li>
                <li>- Вы можете позволить себе более высокую цену</li>
              </ul>
            </div>

            <div className="bg-warm-100 p-6 rounded-sm border border-warm-300">
              <h3 className="text-xl font-light text-primary-900 mb-3">Выбирайте "На плане" если:</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Вы ищете лучшую цену и можете сэкономить 10-20%</li>
                <li>- Вы готовы ждать 18-36 месяцев</li>
                <li>- Вы хотите нижний этаж инвестирования (больше потенциала роста)</li>
                <li>- Вы хотите выбрать опции и материалы</li>
                <li>- Вам нужна ипотека с более выгодными условиями</li>
                <li>- Вы готовы к возможным задержкам</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Рекомендации по минимизации рисков</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>1. <strong>Всегда используйте адвоката:</strong> Проверьте контракт, гарантии, условия платежа</li>
                <li>2. <strong>Проверьте репутацию застройщика:</strong> Сколько лет работает, какие проекты завершил</li>
                <li>3. <strong>Убедитесь, что деньги защищены:</strong> На банковском счете, не у застройщика</li>
                <li>4. <strong>Получите страховку:</strong> На случай банкротства застройщика</li>
                <li>5. <strong>Читайте контракт внимательно:</strong> Обратите внимание на сроки, штрафы, условия задержки</li>
                <li>6. <strong>Согласуйте изменения:</strong> Если что-то изменяется, требуйте письменного подтверждения</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-900 text-white p-8 rounded-sm mb-12">
          <h2 className="text-2xl font-light mb-4">Помогите выбрать правильный вариант</h2>
          <p className="font-light mb-6">
            Наши специалисты помогут вам понять все риски и преимущества обоих вариантов и выбрать лучший для ваших целей и ситуации.
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
            <Link href="/ru/guides/pochemu-novostroyka" className="bg-white p-6 rounded-sm border border-gray-200 hover:border-accent-500 transition">
              <h3 className="text-xl font-light text-primary-900 mb-2">Почему новостройка</h3>
              <p className="text-gray-600 font-light">Преимущества новостроек и инвестиционный потенциал</p>
            </Link>
            <Link href="/ru/guides/process-pokupki" className="bg-white p-6 rounded-sm border border-gray-200 hover:border-accent-500 transition">
              <h3 className="text-xl font-light text-primary-900 mb-2">Процесс покупки</h3>
              <p className="text-gray-600 font-light">Полный процесс покупки недвижимости в Испании</p>
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
