import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Жилые Комплексы Коста Бланка | Новые Разработки',
  description: 'Изучите новые жилые комплексы на Коста Бланка. Качественные застройщики с гарантией 10 лет. От люкс до доступных вариантов.',
  keywords: 'жилые комплексы коста бланка, новые разработки испания, застройщики коста бланка',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/ru/developments',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/developments',
      'sv': 'https://newbuildhomescostablanca.com/sv/developments',
      'nl': 'https://newbuildhomescostablanca.com/nl/developments',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/developments',
      'fr': 'https://newbuildhomescostablanca.com/fr/developments',
      'no': 'https://newbuildhomescostablanca.com/no/developments',
      'de': 'https://newbuildhomescostablanca.com/de/developments',
      'pl': 'https://newbuildhomescostablanca.com/pl/developments',
      'ru': 'https://newbuildhomescostablanca.com/ru/developments',
      'x-default': 'https://newbuildhomescostablanca.com/developments',
    },
  },
};

export default function RUDevelopmentsPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Жилые <span className="font-semibold">Комплексы</span>
          </h1>
          <p className="text-warm-300 max-w-2xl mx-auto">
            Изучите ведущих застройщиков и их новые проекты на Коста Бланка. Все комплексы имеют 10-летнюю гарантию и юридическую защиту.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900 mb-2">
              Ведущие <span className="font-semibold">Застройщики</span>
            </h2>
            <p className="text-warm-600">Профессиональные компании с многолетней историей качественного строительства</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-warm-50 rounded-sm p-6 border border-warm-200 hover:shadow-lg transition-all">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Застройщик {i}</h3>
                <p className="text-warm-600 text-sm mb-4">
                  Профессиональная компания с опытом более 15 лет в строительстве качественной недвижимости на Коста Бланка.
                </p>
                <div className="flex items-center gap-2 text-sm text-accent-600">
                  <span>Узнать больше</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900 mb-2">
              Текущие <span className="font-semibold">Проекты</span>
            </h2>
            <p className="text-warm-600">От планирования до готовых к заселению комплексов</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Link
                key={i}
                href="#"
                className="group bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all border border-warm-100"
              >
                <div className="relative h-48 bg-gradient-to-br from-accent-500 to-primary-900" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary-900 group-hover:text-accent-600 mb-2">
                    Проект Название {i}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">
                    Люкс жилой комплекс с 50 квартирами и виллами. Завершение в 2025 году. На берегу моря.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-warm-500">Торревьеха</span>
                    <span className="text-accent-600 font-medium">От 250.000 евро</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-primary-900 mb-4">
            Нужна <span className="font-semibold">Информация О Проекте?</span>
          </h2>
          <p className="text-warm-600 mb-8">
            Мы знаем все активные проекты и их статус. Свяжитесь с нами для подробной информации.
          </p>
          <Link
            href="/ru/contact"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all"
          >
            Запросить Информацию
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
