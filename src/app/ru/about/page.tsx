import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'О Нас | Новостройки Коста Бланка',
  description: 'Узнайте о нашей компании. Более 15 лет опыта помощи русскоговорящим покупателям недвижимости на Коста Бланка. Команда с местными знаниями.',
  keywords: 'о нас, компания, опыт коста бланка, русскоговорящая помощь',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/about',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/about',
      'sv': 'https://newbuildhomescostablanca.com/sv/about',
      'nl': 'https://newbuildhomescostablanca.com/nl/about',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/about',
      'fr': 'https://newbuildhomescostablanca.com/fr/about',
      'no': 'https://newbuildhomescostablanca.com/no/about',
      'de': 'https://newbuildhomescostablanca.com/de/about',
      'pl': 'https://newbuildhomescostablanca.com/pl/about',
      'ru': 'https://newbuildhomescostablanca.com/ru/about',
      'x-default': 'https://newbuildhomescostablanca.com/about',
    },
  },
};

export default function RUAboutPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            О <span className="font-semibold">Нас</span>
          </h1>
          <p className="text-warm-300 max-w-2xl mx-auto">
            Помощь русскоговорящим покупателям найти дом своей мечты на Коста Бланка.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-light text-primary-900 mb-6">
              Наша <span className="font-semibold">История</span>
            </h2>
            <div className="space-y-6 text-warm-600 leading-relaxed">
              <p>
                Более 15 лет назад мы начали с простой идеи: помочь русскоговорящим покупателям найти недвижимость на Коста Бланка. Наша команда складывалась из экспертов с глубокими знаниями испанского рынка и большим опытом работы с международными клиентами.
              </p>
              <p>
                Со временем мы выросли в одну из ведущих компаний в регионе. Наш успех основан на одном простом принципе: положить интересы клиента на первое место. Мы не только помогаем с поиском дома, но и сопровождаем через весь процесс покупки, налоговых вопросов и переезда.
              </p>
              <p>
                Сегодня мы помогли более чем тысячам клиентов из России, Казахстана, Беларуси и других стран СНГ найти свой дом на Коста Бланка. Каждая история успеха мотивирует нас делать нашу работу ещё лучше.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 my-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-500 mb-2">15+</div>
              <p className="text-warm-600 text-sm">Лет Опыта</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-500 mb-2">1000+</div>
              <p className="text-warm-600 text-sm">Довольных Клиентов</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-500 mb-2">500+</div>
              <p className="text-warm-600 text-sm">Доступных Домов</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-light text-primary-900 mb-6">
              Наша <span className="font-semibold">Команда</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Мы группа профессионалов с глубокой знаниевой базой испанского рынка и культуры. Все члены команды говорят по-русски и понимают специфику работы с русскоговорящими клиентами.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  role: 'Руководитель Проектов',
                  desc: 'Специалист по недвижимости с опытом 12+ лет. Знает каждый дом на Коста Бланка.',
                },
                {
                  role: 'Юридический Консультант',
                  desc: 'Адвокат с специализацией на иностранных инвесторах. Знает все налоги и законы.',
                },
                {
                  role: 'Финансовый Советник',
                  desc: 'Помогает с ипотекой и финансовым планированием. Работает с испанскими банками.',
                },
                {
                  role: 'Менеджер По Клиентам',
                  desc: 'Поддержка на русском языке от первого контакта до получения ключей.',
                },
              ].map((member, i) => (
                <div key={i} className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="text-lg font-semibold text-primary-900 mb-2">{member.role}</h3>
                  <p className="text-warm-600 text-sm">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-light text-primary-900 mb-12 text-center">
            Наши <span className="font-semibold">Ценности</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Прозрачность',
                desc: 'Полная информация о каждом доме, цене и процессе. Никаких скрытых комиссий.',
              },
              {
                title: 'Профессионализм',
                desc: 'Опытные команды, которые знают каждый аспект покупки недвижимости в Испании.',
              },
              {
                title: 'Поддержка',
                desc: 'Помощь на русском языке на каждом шаге. Мы с вами от начала до конца.',
              },
              {
                title: 'Интегральность',
                desc: 'Честные рекомендации основаны на ваших потребностях, а не на комиссиях.',
              },
              {
                title: 'Качество',
                desc: 'Только лучшие дома от надёжных застройщиков с гарантиями и лицензиями.',
              },
              {
                title: 'Сервис',
                desc: 'Дополнительные услуги: помощь с НИЕ, налогами, оформлением, адаптацией.',
              },
            ].map((value, i) => (
              <div key={i} className="bg-white rounded-sm p-6 border border-warm-100">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">{value.title}</h3>
                <p className="text-warm-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-primary-900 mb-6">
            Почему Выбрать <span className="font-semibold">Нас</span>
          </h2>
          <p className="text-warm-600 mb-12 max-w-2xl mx-auto">
            У нас есть всё что нужно для успешной покупки недвижимости на Коста Бланка.
          </p>

          <div className="space-y-4 text-left max-w-2xl mx-auto">
            {[
              'Русскоговорящая команда, живущая на Коста Бланка',
              'Доступ к эксклюзивным предложениям и новым проектам',
              'Помощь со всеми правовыми и налоговыми вопросами',
              'Содействие в получении НИЕ и Golden Visa',
              'Консультации по ипотеке с испанскими банками',
              'Поддержка при переезде и адаптации',
              'Сеть контактов: адвокаты, нотариусы, архитекторы',
              '4,9 звезды на Google от 127 реальных клиентов',
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-warm-50 rounded-sm border border-warm-200">
                <svg className="w-5 h-5 text-accent-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-warm-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            Готовы Начать <span className="font-semibold">Поиск?</span>
          </h2>
          <p className="text-warm-300 mb-8">
            Свяжитесь с нами сегодня для бесплатной консультации.
          </p>
          <Link
            href="/ru/contact"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all"
          >
            Начать Консультацию
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
