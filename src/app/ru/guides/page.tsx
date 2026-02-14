import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Руководства Покупателя | Покупка Недвижимости на Коста Бланке | 2026',
  description: 'Полные руководства покупателя для российских покупателей. Номер NIE, налоги, ипотека, процесс покупки и направления.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/guides',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides',
      'de': 'https://newbuildhomescostablanca.com/de/guides',
      'no': 'https://newbuildhomescostablanca.com/no/guides',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides',
      'x-default': 'https://newbuildhomescostablanca.com/guides',
    },
  },
};

const essentialGuides = [
  {
    title: 'Процесс Покупки',
    slug: 'process-pokupki',
    description: 'Пошаговое руководство по покупке нового дома в Испании. От резервирования до передачи ключей.',
    icon: '📋',
    readTime: '12 минут чтения',
    category: 'Основное',
  },
  {
    title: 'Номер NIE Guide',
    slug: 'nomer-nie',
    description: 'Как получить номер NIE — требуется для покупки недвижимости в Испании.',
    icon: '🪪',
    readTime: '8 минут чтения',
    category: 'Основное',
  },
  {
    title: 'Расходы и Налоги',
    slug: 'rashody-nalogi',
    description: 'Полная информация о затратах на покупку, налогах и текущих расходах для владельцев недвижимости.',
    icon: '💰',
    readTime: '10 минут чтения',
    category: 'Основное',
  },
  {
    title: 'Ипотека',
    slug: 'ipoteka',
    description: 'Как получить ипотеку в Испании как российский покупатель. Требования и процесс.',
    icon: '🏦',
    readTime: '10 минут чтения',
    category: 'Основное',
  },
];

const decisionGuides = [
  {
    title: 'Почему Новостройка?',
    slug: 'pochemu-novostroyka',
    description: 'Преимущества новостроек по сравнению со старыми квартирами — гарантии, энергоэффективность и современный дизайн.',
    icon: '🏗️',
    readTime: '6 минут чтения',
    category: 'Решение',
  },
  {
    title: 'Под Ключ vs План',
    slug: 'pod-klyuch-vs-plan',
    description: 'Стоит ли мне покупать квартиру под ключ или по плану? Плюсы и минусы для российских покупателей.',
    icon: '🔑',
    readTime: '8 минут чтения',
    category: 'Решение',
  },
  {
    title: 'Север vs Юг Коста Бланки',
    slug: 'sever-vs-yug',
    description: 'Сравнение двух регионов — эксклюзивный север vs доступный юг. Найдите идеальное место для себя.',
    icon: '🗺️',
    readTime: '10 минут чтения',
    category: 'Решение',
  },
  {
    title: 'Туристическое Разрешение',
    slug: 'turisticheskoe-razreshenie',
    description: 'Всё о сертификатах туристической аренды в Валенсийском сообществе — требования, процедура и потенциал.',
    icon: '📜',
    readTime: '8 минут чтения',
    category: 'Инвестиция',
  },
];

const destinationGuides = [
  {
    title: 'Torrevieja',
    description: '7 районов с аэрофотографией. Полное руководство по Коста Бланке Юг.',
    href: '/ru/guides/torrevieja',
    icon: '🏖️',
    badges: ['100+ Фото', '7 Зон'],
  },
  {
    title: 'Jávea',
    description: '4 района от пляжа Ареналь до горы Монтгó. Премиальная жизнь на северном побережье.',
    href: '/ru/guides/javea',
    icon: '⛵',
    badges: ['4 Района', '7 Пляжей'],
  },
  {
    title: 'Коста Бланка Север',
    description: '6 городов сравнены — Jávea, Moraira, Altea, Calpe, Dénia и Benissa с аэрофотографией.',
    href: '/ru/guides/costa-blanca-sever',
    icon: '🏔️',
    badges: ['6 Городов', 'Региональный Гайд'],
  },
  {
    title: 'Orihuela Costa',
    description: 'Гольф-рай с La Zenia, Villamartin, Cabo Roig и многое другое. Доступная жизнь на южном побережье.',
    href: '/ru/guides/orihuela-costa',
    icon: '⛳',
    badges: ['6 Областей', 'Гольф-Фокус'],
  },
  {
    title: 'Benidorm & Finestrat',
    description: 'Самый динамичный прибрежный город Испании — пляжи, ночная жизнь и удивительный инвестиционный потенциал.',
    href: '/ru/guides/benidorm-finestrat',
    icon: '🌇',
    badges: ['2 Зоны', 'Городской Гайд'],
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-accent-500" />
            <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Руководства Экспертов</span>
            <div className="w-10 h-px bg-accent-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Руководства Покупателя</h1>
          <p className="text-xl text-warm-200 max-w-2xl mx-auto mb-4">
            Всё о покупке недвижимости на Коста Бланке.
            Руководства экспертов, написанные для российских покупателей.
          </p>
          <p className="text-warm-300">
            От номера NIE до ипотеки, мы проведём вас через каждый этап процесса.
          </p>
        </div>
      </section>

      {/* Essential Buyer Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Необходимо Прочитать</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Основные Руководства Покупателя</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Четыре руководства, которые каждый покупатель должен прочитать перед покупкой в Испании</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {essentialGuides.map((guide) => (
              <Link key={guide.slug} href={`/ru/guides/${guide.slug}`}>
                <div className="bg-white border-2 border-warm-100 rounded-lg p-6 hover:border-accent-500 hover:shadow-lg transition-all h-full group">
                  <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-500 transition-colors text-xl">
                    {guide.icon}
                  </div>
                  <span className="text-xs font-bold text-accent-500 tracking-wider uppercase">{guide.category}</span>
                  <h3 className="text-lg font-bold text-primary-900 mt-1 mb-2 group-hover:text-accent-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-warm-400">{guide.readTime}</span>
                    <span className="text-accent-500 text-sm font-semibold flex items-center gap-1">
                      Читать
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Guides */}
      <section className="py-16 px-4 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Изучите Направления</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Руководства Направлений</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Полные руководства по лучшим районам Коста Бланки</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinationGuides.map((dest) => (
              <Link key={dest.href} href={dest.href}>
                <div className="bg-primary-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow h-full group">
                  <div className="h-32 bg-gradient-to-br from-accent-500/30 to-primary-800 flex items-center justify-center">
                    <span className="text-5xl">{dest.icon}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                      {dest.title}
                    </h3>
                    <p className="text-warm-300 text-sm mb-3">{dest.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.badges.map((badge, i) => (
                        <span key={i} className="text-xs bg-accent-500/20 text-accent-400 px-2 py-0.5 rounded">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Decision & Planning Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Планирование</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Руководства по Решениям</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Принимайте обоснованные решения о местоположении, типе недвижимости и инвестиционной стратегии</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {decisionGuides.map((guide) => (
              <Link key={guide.slug} href={`/ru/guides/${guide.slug}`}>
                <div className="bg-white border-2 border-warm-100 rounded-lg p-6 hover:border-primary-500 hover:shadow-lg transition-all h-full group">
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors text-xl">
                    {guide.icon}
                  </div>
                  <span className="text-xs font-bold text-primary-600 tracking-wider uppercase">{guide.category}</span>
                  <h3 className="text-lg font-bold text-primary-900 mt-1 mb-2 group-hover:text-primary-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-warm-400">{guide.readTime}</span>
                    <span className="text-primary-600 text-sm font-semibold flex items-center gap-1">
                      Читать
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Finance CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Финансирование & Ипотека</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-4">Готовы сравнить ипотечные ставки?</h2>
              <p className="text-warm-200 mb-6">
                Сравните ставки более чем 15 испанских банков, посмотрите текущие рыночные данные и изучите варианты финансирования
                для стандартных и люксовых объектов недвижимости.
              </p>
              <Link
                href="/ru/guides/ipoteka"
                className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Сравнить Ипотеки &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">~3.15%</div>
                <div className="text-warm-300 text-sm mt-1">Средняя Фиксированная Ставка</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">70%</div>
                <div className="text-warm-300 text-sm mt-1">ЛТВ для Нерезидента</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-warm-300 text-sm mt-1">Сравнимые Банки</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">€800k+</div>
                <div className="text-warm-300 text-sm mt-1">Люксовые Опции</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 px-4 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Почему Доверять Нашим Руководствам?</h2>
            <p className="text-warm-600">Местная экспертиза в сочетании с международным пониманием</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Местная Экспертиза</h3>
              <p className="text-warm-600">Проживаем на Коста Бланке с многолетним опытом помощи российским покупателям в навигации по испанскому рынку недвижимости.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Актуальная Информация</h3>
              <p className="text-warm-600">Регулярно обновляется, чтобы отражать текущие данные испанского рынка недвижимости, налоговое законодательство и условия рынка.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Международный Подход</h3>
              <p className="text-warm-600">Специально написано для международных покупателей — охватывает уникальные вызовы, такие как номера NIE, иностранные ипотеки и налоги для нерезидентов.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Есть Вопросы?</h2>
          <p className="text-xl text-white/90 mb-8">
            Наша команда здесь, чтобы провести вас через процесс покупки. Свяжитесь с нами для персональной консультации.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ru/contact"
              className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              Свяжитесь с Нами
            </Link>
            <a
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              WhatsApp
            </a>
          </div>
          <p className="text-white/70 text-sm mt-6">
            Быстрый ответ в течение 24 часов — часто намного быстрее
          </p>
        </div>
      </section>
    </main>
  );
}
