import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Расходы и налоги при покупке недвижимости в Испании | Полный расчет',
  description: 'Полный расчет всех налогов и расходов при покупке недвижимости в Испании. ITP, нотариальные сборы, налог на имущество для иностранцев.',
  keywords: 'налоги, расходы, ITP, стоимость покупки, Испания, недвижимость',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/guides/rashody-nalogi',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/costs-taxes',
      sv: 'https://newbuildhomescostablanca.com/sv/guides/kostnader-skatter',
      nl: 'https://newbuildhomescostablanca.com/nl/guides/kosten-belasting',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/kosten-belasting',
      fr: 'https://newbuildhomescostablanca.com/fr/guides/frais-impots',
      no: 'https://newbuildhomescostablanca.com/no/guides/kostnader-skatt',
      de: 'https://newbuildhomescostablanca.com/de/guides/kosten-steuern',
      pl: 'https://newbuildhomescostablanca.com/pl/guides/koszty-podatki',
      'x-default': 'https://newbuildhomescostablanca.com/guides/costs-taxes',
    },
  },
};

const breadcrumbs = [
  { name: 'Главная', url: 'https://newbuildhomescostablanca.com/ru' },
  { name: 'Гайды', url: 'https://newbuildhomescostablanca.com/ru/guides' },
  { name: 'Расходы и налоги', url: 'https://newbuildhomescostablanca.com/ru/guides/rashody-nalogi' },
];

const faqs = [
  {
    question: 'Сколько процентов дополнительно нужно платить при покупке недвижимости?',
    answer: 'В среднем дополнительные расходы составляют 10-13% от стоимости недвижимости. Основной компонент - налог на передачу имущества (ITP) 6-10%, плюс нотариальные сборы (0,5-1%), регистрационные сборы (0,3-0,5%) и гонорары адвоката.',
  },
  {
    question: 'Включены ли налоги в цену недвижимости?',
    answer: 'Нет, налоги и расходы не включены в объявленную цену. Цена, которую вы видите, это стоимость недвижимости без налогов. Все налоги и комиссии платятся дополнительно и обычно падают на покупателя.',
  },
  {
    question: 'Что такое ITP и сколько он составляет?',
    answer: 'ITP (Impuesto sobre Transmisiones Patrimoniales) - это налог на передачу имущества, который платит покупатель. Ставка составляет 6-10% от стоимости недвижимости и зависит от региона: в Валенсии 7%, в Каталонии 10%, в Андалусии 8-9%.',
  },
  {
    question: 'Нужно ли платить налог на имущество (IBI) после покупки?',
    answer: 'Да, IBI - это ежегодный налог на имущество, который платят все собственники. Ставка составляет 0,4-1,1% от кадастровой стоимости имущества в год. Сумма зависит от района и оценки муниципалитета.',
  },
  {
    question: 'Есть ли налоги при аренде недвижимости?',
    answer: 'Да, при сдаче в аренду иностранцы платят налог на доход нерезидентов (IRNR) в размере 19-24% от валовой суммы дохода. Также требуется подать налоговую декларацию каждый год.',
  },
  {
    question: 'Как сэкономить на налогах как иностранец?',
    answer: 'Основные способы: получить испанское налоговое резидентство (проживание более 183 дней в году), правильно структурировать покупку (через компанию в некоторых случаях), использовать согласования по соглашению об избежании двойного налогообложения между Россией и Испанией.',
  },
  {
    question: 'Какие налоги платит продавец?',
    answer: 'Продавец платит: налог на прирост стоимости (plusvalia municipal 3-5%), налог на прибыль (IRPF 19-47% в зависимости от налогового статуса), нотариальные сборы. Эти налоги влияют на итоговую цену переговоров.',
  },
  {
    question: 'Нужно ли платить налоги за наследство недвижимости?',
    answer: 'Да, при наследовании недвижимости требуется платить налог на наследство (impuesto sobre sucesiones). Ставка 7,65-34% в зависимости от размера наследства и близости родства. Сильно варьируется по регионам.',
  },
];

export default function RaskhodyNalogi() {
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
            Расходы и налоги при покупке недвижимости в Испании
          </h1>
          <p className="text-lg text-gray-700 font-light mb-6">
            Полный расчет всех налогов, сборов и комиссий при покупке недвижимости в Испании. Расчеты для иностранцев с примерами для разных регионов.
          </p>
          <div className="bg-accent-500 bg-opacity-10 border-l-4 border-accent-500 p-4 rounded-sm">
            <p className="text-primary-900 font-light">
              Дополнительные расходы при покупке составляют 10-13% от цены недвижимости. Обязательно учитывайте эту сумму при планировании бюджета.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Налоги при покупке недвижимости
          </h2>
          <p className="text-gray-700 font-light mb-6">
            При покупке недвижимости в Испании покупатель платит несколько основных налогов и сборов.
          </p>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">1. ITP (Impuesto sobre Transmisiones Patrimoniales)</h3>
              <p className="text-gray-700 font-light mb-3">
                Это основной налог на передачу имущества, который платит покупатель.
              </p>
              <div className="bg-gray-100 p-4 rounded-sm mb-3">
                <p className="text-gray-700 font-light mb-2"><strong>Ставка по регионам:</strong></p>
                <ul className="space-y-1 text-gray-700 font-light text-sm">
                  <li>- Валенсия: 7% (где расположена Коста-Бланка)</li>
                  <li>- Каталония: 10%</li>
                  <li>- Андалусия: 8-9%</li>
                  <li>- Мадрид: 6%</li>
                  <li>- Басконский край: 5%</li>
                </ul>
              </div>
              <p className="text-gray-700 font-light mb-3">
                <strong>Пример:</strong> Покупаете недвижимость в Валенсии за 500 000 евро. ITP составит 500 000 x 7% = 35 000 евро.
              </p>
              <p className="text-gray-700 font-light">
                <strong>Важно:</strong> Если недвижимость новая (менее 3 лет) и это новая постройка (obra nueva), то вместо ITP может применяться НДС (IVA) 10%, который может быть немного ниже в некоторых случаях.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">2. Нотариальные сборы</h3>
              <p className="text-gray-700 font-light mb-3">
                Нотариус удостоверяет подпись окончательного контракта и создает официальный документ.
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Стоимость:</strong> 0,5-1% от стоимости недвижимости (обычно примерно 1500-3000 евро)</li>
                <li>- <strong>Максимум:</strong> Обычно не превышает 3000 евро для сумм свыше 300 000</li>
                <li>- <strong>Фиксированная часть:</strong> Плюс фиксированные сборы за оформление (100-300 евро)</li>
                <li>- <strong>Копии:</strong> Дополнительные копии документов обойдутся в 50-100 евро</li>
              </ul>
              <p className="text-gray-700 font-light mt-3">
                <strong>Пример:</strong> Для покупки за 500 000 евро нотариальные сборы составят примерно 2500-3000 евро.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">3. Регистрационные сборы и гонорары адвоката</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Регистрация в земельном реестре:</strong> 0,3-0,5% (примерно 1500-2500 евро)</li>
                <li>- <strong>Гонорар адвоката:</strong> 400-800 евро (можно договориться)</li>
                <li>- <strong>Прочие административные сборы:</strong> 100-200 евро</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Полный расчет расходов - практический пример
          </h2>

          <div className="bg-white p-6 rounded-sm border border-gray-200 mb-6">
            <h3 className="text-xl font-light text-primary-900 mb-4">Покупка виллы в Валенсии за 500 000 евро</h3>

            <div className="space-y-3 text-gray-700 font-light">
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span>Стоимость недвижимости:</span>
                <span className="font-semibold">500 000 евро</span>
              </div>

              <div className="bg-gray-50 p-3 rounded-sm">
                <p className="font-semibold mb-2">Налоги и сборы при покупке:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ITP (7% от стоимости):</span>
                    <span>35 000 евро</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Нотариальные сборы:</span>
                    <span>2 500 евро</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Регистрация в реестре:</span>
                    <span>2 000 евро</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Гонорар адвоката:</span>
                    <span>600 евро</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Прочие сборы:</span>
                    <span>150 евро</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-semibold">Итого расходы:</span>
                <span className="font-semibold">40 250 евро</span>
              </div>

              <div className="flex justify-between pb-3 border-b border-gray-200">
                <span>Процент от стоимости:</span>
                <span>8,05%</span>
              </div>

              <div className="flex justify-between text-lg">
                <span className="font-semibold">Общая сумма к оплате:</span>
                <span className="font-semibold text-accent-500">540 250 евро</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm border border-gray-200">
            <h3 className="text-xl font-light text-primary-900 mb-4">Покупка квартиры в Торревьехе за 300 000 евро</h3>

            <div className="space-y-3 text-gray-700 font-light">
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span>Стоимость недвижимости:</span>
                <span className="font-semibold">300 000 евро</span>
              </div>

              <div className="bg-gray-50 p-3 rounded-sm">
                <p className="font-semibold mb-2">Налоги и сборы при покупке:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ITP (7% от стоимости):</span>
                    <span>21 000 евро</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Нотариальные сборы:</span>
                    <span>1 500 евро</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Регистрация в реестре:</span>
                    <span>1 200 евро</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Гонорар адвоката:</span>
                    <span>500 евро</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Прочие сборы:</span>
                    <span>100 евро</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-semibold">Итого расходы:</span>
                <span className="font-semibold">24 300 евро</span>
              </div>

              <div className="flex justify-between pb-3 border-b border-gray-200">
                <span>Процент от стоимости:</span>
                <span>8,1%</span>
              </div>

              <div className="flex justify-between text-lg">
                <span className="font-semibold">Общая сумма к оплате:</span>
                <span className="font-semibold text-accent-500">324 300 евро</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Ежегодные налоги и сборы
          </h2>
          <p className="text-gray-700 font-light mb-6">
            После покупки вы будете платить ежегодные налоги и сборы на имущество.
          </p>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">1. IBI - Налог на имущество</h3>
              <p className="text-gray-700 font-light mb-3">
                IBI (Impuesto sobre Bienes Inmuebles) - это ежегодный налог на имущество, который платят все собственники в Испании.
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Ставка:</strong> 0,4-1,1% от кадастровой стоимости в год</li>
                <li>- <strong>Кадастровая стоимость:</strong> Не равна рыночной цене, обычно ниже на 30-50%</li>
                <li>- <strong>Пример:</strong> Для дома стоимостью 500 000 евро кадастровая стоимость может быть 250-350 000, IBI будет 2500-3500 евро в год</li>
                <li>- <strong>Оплата:</strong> Обычно один раз в год или в два платежа</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">2. Сборы на обслуживание (для квартир и комплексов)</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Что это:</strong> Ежемесячные/ежегодные платежи на содержание общего имущества (коридоры, лифты, подъезды и т.д.)</li>
                <li>- <strong>Размер:</strong> От 50 до 300 евро в месяц в зависимости от размера и удобств</li>
                <li>- <strong>Включено:</strong> Уборка, осветительное оборудование, страховка, управление</li>
                <li>- <strong>Долг:</strong> Если предыдущий хозяин имеет задолженность, она переходит к вам</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">3. Коммунальные платежи</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Электричество:</strong> 80-150 евро в месяц (зависит от использования)</li>
                <li>- <strong>Вода:</strong> 30-50 евро в месяц</li>
                <li>- <strong>Газ:</strong> 20-50 евро в месяц (если есть)</li>
                <li>- <strong>Интернет:</strong> 30-50 евро в месяц</li>
                <li>- <strong>Страховка:</strong> 300-800 евро в год</li>
              </ul>
            </div>

            <div className="bg-warm-100 p-6 rounded-sm border border-warm-300">
              <h3 className="text-xl font-light text-primary-900 mb-3">Ежегодные затраты - практический пример</h3>
              <p className="text-gray-700 font-light mb-3">
                Для виллы в Валенсии стоимостью 500 000 евро:
              </p>
              <div className="space-y-1 text-gray-700 font-light text-sm">
                <div className="flex justify-between">
                  <span>IBI (налог на имущество):</span>
                  <span>3 000 евро/год</span>
                </div>
                <div className="flex justify-between">
                  <span>Страховка:</span>
                  <span>500 евро/год</span>
                </div>
                <div className="flex justify-between">
                  <span>Коммунальные платежи (12 месяцев):</span>
                  <span>2 000 евро/год</span>
                </div>
                <div className="flex justify-between border-t border-warm-300 pt-2 mt-2">
                  <span className="font-semibold">Итого:</span>
                  <span className="font-semibold">5 500 евро/год</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Налоги для иностранцев и налоговое резидентство
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Налоговое резидентство в Испании</h3>
              <p className="text-gray-700 font-light mb-3">
                Если вы проживаете в Испании более 183 дней в календарном году, вы становитесь налоговым резидентом.
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Это означает, что вы платите испанский подоходный налог (IRPF) на мировой доход</li>
                <li>- Преимущество: можете вычесть расходы на содержание имущества</li>
                <li>- Из России: трудовой доход, пенсии облагаются налогом в Испании</li>
                <li>- Используется соглашение об избежании двойного налогообложения между Россией и Испанией</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">IRNR - Налог для нерезидентов</h3>
              <p className="text-gray-700 font-light mb-3">
                Если вы не живете в Испании, но владеете недвижимостью, вы платите специальный налог для нерезидентов.
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>На доход от аренды:</strong> 19-24% от валовой суммы дохода</li>
                <li>- <strong>На имущество:</strong> 1,1% от стоимости имущества в год (в некоторых случаях)</li>
                <li>- <strong>Декларация:</strong> Необходимо подать налоговую декларацию каждый год</li>
                <li>- <strong>Затраты:</strong> Можно вычесть только некоторые расходы (налоговый консультант поможет)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Двойное налогообложение</h3>
              <p className="text-gray-700 font-light mb-3">
                Между Россией и Испанией существует соглашение об избежании двойного налогообложения (договор от 1991 года).
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Позволяет избежать налогообложения одного и того же дохода в двух странах</li>
                <li>- Требуется правильная документация и декларирование</li>
                <li>- Рекомендуется консультация с налоговым консультантом</li>
                <li>- Важно: Испания требует отчета о зарубежных счетах (формирование D3) для компании</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Налоги при сдаче в аренду
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Для нерезидентов (не живете в Испании)</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Налог IRNR:</strong> 19-24% от валовой суммы арендной платы</li>
                <li>- <strong>Исчисление:</strong> Обычно удерживается у источника агентом по аренде</li>
                <li>- <strong>Пример:</strong> При аренде за 1000 евро в месяц (12 000 в год) вы заплатите 2880 евро налога (24%)</li>
                <li>- <strong>Вычеты:</strong> Ограничены, только определенные расходы на содержание</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">Для резидентов (живете в Испании более 183 дней)</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- <strong>Подоходный налог IRPF:</strong> 19-45% (зависит от общего дохода)</li>
                <li>- <strong>Вычеты:</strong> Можно вычесть все расходы (налоги, сборы, ремонт, коммунальные)</li>
                <li>- <strong>Пример:</strong> Доход 12 000 евро, расходы 3 000 евро. Налоговая база 9 000. Налог (примерно 24% в среднем) = 2160 евро</li>
                <li>- <strong>Более выгодно:</strong> Проживание в Испании обычно выгоднее из-за вычетов</li>
              </ul>
            </div>

            <div className="bg-warm-100 p-6 rounded-sm border border-warm-300">
              <h3 className="text-xl font-light text-primary-900 mb-3">Практический пример расчета налога при аренде</h3>
              <p className="text-gray-700 font-light mb-3">
                Сдаете в аренду квартиру в Торревьехе:
              </p>
              <div className="space-y-1 text-gray-700 font-light text-sm">
                <div className="flex justify-between">
                  <span>Ежемесячная арендная плата:</span>
                  <span>1 200 евро</span>
                </div>
                <div className="flex justify-between">
                  <span>Годовой доход:</span>
                  <span>14 400 евро</span>
                </div>
                <div className="border-t border-warm-300 pt-2 mt-2">
                  <p className="font-semibold mb-2">Если нерезидент:</p>
                  <div className="flex justify-between">
                    <span>IRNR (24%):</span>
                    <span>3 456 евро</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Чистый доход:</span>
                    <span>10 944 евро</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4 rounded-sm">
            Способы минимизации налогов
          </h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">1. Получение испанского налогового резидентства</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Проживайте в Испании более 183 дней в году</li>
                <li>- Получите доступ к вычетам расходов на содержание имущества</li>
                <li>- Используйте более благоприятные налоговые ставки IRPF</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">2. Структурирование покупки</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Покупка через испанскую компанию (в некоторых случаях может быть выгоднее)</li>
                <li>- Совместная собственность с супругом (может снизить налог на наследство)</li>
                <li>- Правильное заключение контрактов (консультация с адвокатом)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">3. Использование соглашений об избежании двойного налогообложения</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Правильное заполнение налоговых деклараций в обеих странах</li>
                <li>- Сертификаты налогового резидентства (для избежания удержания у источника)</li>
                <li>- Консультация с международным налоговым консультантом</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-sm border border-gray-200">
              <h3 className="text-xl font-light text-primary-900 mb-3">4. Документирование расходов</h3>
              <ul className="space-y-2 text-gray-700 font-light">
                <li>- Сохраняйте все квитанции о расходах на содержание имущества</li>
                <li>- Документируйте дни проживания в Испании (билеты, отели)</li>
                <li>- Ведите записи по доходам и расходам</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-900 text-white p-8 rounded-sm mb-12">
          <h2 className="text-2xl font-light mb-4">Нужна помощь с налогами?</h2>
          <p className="font-light mb-6">
            Наши специалисты помогут вам рассчитать все налоги и найти способы оптимизации вашей налоговой ситуации.
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
            <Link href="/ru/guides/nomer-nie" className="bg-white p-6 rounded-sm border border-gray-200 hover:border-accent-500 transition">
              <h3 className="text-xl font-light text-primary-900 mb-2">Номер NIE</h3>
              <p className="text-gray-600 font-light">Как получить налоговый номер для иностранцев</p>
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
