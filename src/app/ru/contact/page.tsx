import { Metadata } from 'next';
import Link from 'next/link';
import LeadFormAdvanced from '@/components/LeadFormAdvanced';

export const metadata: Metadata = {
  title: 'Контакты | Новостройки Коста Бланка',
  description: 'Свяжитесь с нами для консультации по покупке недвижимости. WhatsApp, телефон, форма контакта. Говорим по-русски.',
  keywords: 'контакты коста бланка, консультация недвижимость испания',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/contact',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/contact',
      'sv': 'https://newbuildhomescostablanca.com/sv/contact',
      'nl': 'https://newbuildhomescostablanca.com/nl/contact',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/contact',
      'fr': 'https://newbuildhomescostablanca.com/fr/contact',
      'no': 'https://newbuildhomescostablanca.com/no/contact',
      'de': 'https://newbuildhomescostablanca.com/de/contact',
      'pl': 'https://newbuildhomescostablanca.com/pl/contact',
      'ru': 'https://newbuildhomescostablanca.com/ru/contact',
      'x-default': 'https://newbuildhomescostablanca.com/contact',
    },
  },
};

export default function RUContactPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Свяжитесь С <span className="font-semibold">Нами</span>
          </h1>
          <p className="text-warm-300 max-w-2xl mx-auto">
            Наша команда говорит по-русски и готова помочь вам найти идеальный дом на Коста Бланка.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl mb-4">WhatsApp</div>
              <p className="text-warm-600 mb-4">Быстро свяжитесь с нами через WhatsApp</p>
              <a
                href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-3 rounded-sm transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">Телефон</div>
              <p className="text-warm-600 mb-4">Позвоните нам напрямую для срочного разговора</p>
              <a
                href="tel:+34950445577"
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-all"
              >
                +34 950 445 577
              </a>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">Электронная Почта</div>
              <p className="text-warm-600 mb-4">Напишите нам электронное письмо с вашим вопросом</p>
              <a
                href="mailto:info@newbuildhomescostablanca.com"
                className="inline-flex items-center gap-2 bg-warm-200 hover:bg-warm-300 text-primary-900 font-medium px-6 py-3 rounded-sm transition-all"
              >
                Написать Email
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-light text-primary-900 mb-6">
                Заполните <span className="font-semibold">Форму</span>
              </h2>
              <p className="text-warm-600 mb-6">
                Расскажите нам о ваших требованиях к дому, бюджете и локации. Мы свяжемся с вами в течение 24 часов.
              </p>
              <LeadFormAdvanced />
            </div>

            <div>
              <h2 className="text-2xl font-light text-primary-900 mb-6">
                О <span className="font-semibold">Нас</span>
              </h2>
              <div className="space-y-6 text-warm-600">
                <p>
                  Мы специализируемся на помощи русскоговорящим покупателям найти идеальный дом на Коста Бланка. Наша команда говорит русский язык и знает все нюансы процесса покупки в Испании.
                </p>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">Наши Услуги:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-accent-500 font-bold">+</span>
                      <span>Помощь с поиском недвижимости</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-500 font-bold">+</span>
                      <span>Консультации по налогам и правовым вопросам</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-500 font-bold">+</span>
                      <span>Помощь с ипотекой и финансированием</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-500 font-bold">+</span>
                      <span>Сопровождение при подписании документов</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-500 font-bold">+</span>
                      <span>Информация о Golden Visa</span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm">
                  Мы также предоставляем информацию о районах, образе жизни на Коста Бланка и помогаем в адаптации.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-primary-900 mb-4">
            Часы <span className="font-semibold">Работы</span>
          </h2>
          <p className="text-warm-600 mb-8">
            Свяжитесь с нами в удобное для вас время
          </p>
          <div className="bg-white rounded-sm p-8 border border-warm-200">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-lg font-semibold text-primary-900 mb-2">Понедельник - Пятница</p>
                <p className="text-warm-600">09:00 - 18:00 (GMT+1)</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-primary-900 mb-2">Суббота</p>
                <p className="text-warm-600">10:00 - 14:00 (GMT+1)</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-primary-900 mb-2">Воскресенье</p>
                <p className="text-warm-600">Закрыто</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
