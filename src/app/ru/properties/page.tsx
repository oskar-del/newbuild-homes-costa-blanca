'use client';

export const revalidate = 3600;

import Link from 'next/link';
import Image from 'next/image';
import { fetchXMLFeed, ParsedProperty } from '@/lib/xml-parser';
import { getRegionForTown, REGIONS, normalizeTownName } from '@/lib/feed-config';
import PropertyFilters from '@/components/PropertyFilters';
import SortDropdown from '@/components/SortDropdown';
import PropertySearch from '@/components/PropertySearch';
import { collectionPageSchema, breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';
import { useEffect, useState } from 'react';

const SOUTH_TOWNS = ['torrevieja', 'orihuela costa', 'guardamar', 'pilar de la horadada', 'la zenia', 'cabo roig', 'playa flamenca', 'punta prima', 'villamartin', 'los montesinos', 'san miguel'];
const NORTH_TOWNS = ['javea', 'moraira', 'calpe', 'altea', 'benidorm', 'denia', 'benissa', 'benitachell', 'cumbre del sol', 'teulada'];
const GOLF_KEYWORDS = ['golf', 'la finca', 'villamartin', 'las colinas', 'campoamor', 'las ramblas', 'vistabella', 'algorfa'];
const INLAND_TOWNS = ['algorfa', 'rojales', 'ciudad quesada', 'benijofar', 'san fulgencio', 'jalon', 'orba', 'pedreguer'];

const RUSSIAN_FAQS = [
  {
    question: 'Почему покупать новостройки в Испании?',
    answer: 'Новостройки в Испании предлагают современный энергосберегающий дизайн, 10-летнюю гарантию на конструкцию, возможность персонализации во время строительства и низкие расходы на содержание. Часто включают общие коммунальные услуги, басейны и ландшафтный дизайн. Поступают с полными юридическими гарантиями и обычно растут в цене быстрее в первые годы.'
  },
  {
    question: 'Сколько стоит купить новостройку на Коста Бланка?',
    answer: 'Цены на новостройки варьируются от около 150.000 евро за квартиры на юге (Торревьеха) до более 2 миллионов за люкс виллы на севере (Хавеа, Морайра). Планируйте 10-13% сверху на налоги, нотариальные и юридические услуги. Иностранцам обычно нужен депозит 30-40% для ипотеки.'
  },
  {
    question: 'В чем разница между Северо-Южной частью Коста Бланка?',
    answer: 'Юг (Торревьеха до Пилара де ла Орада) предлагает более доступные дома, устоявшиеся иностранные сообщества и солнце круглый год с меньше дождей. Север (Хавеа до Бенидорма) — премиум-рынок с драматичными горными берегами, высокие цены на недвижимость, аутентичная испанская культура и зелень. Оба региона — 300+ солнечных дней в год.'
  },
  {
    question: 'Что означает готово к заселению для новостроек?',
    answer: 'Готовый к заселению дом — это новостройка, полностью завершённая и готовая к проживанию немедленно. Вы можете осмотреть готовый дом перед покупкой, избежать задержек строительства и переехать в течение недель после завершения покупки. Готовые дома сохраняют полные гарантии застройщика.'
  },
  {
    question: 'Могут ли иностранцы покупать недвижимость в Испании?',
    answer: 'Да, нет ограничений для иностранцев. Вам нужен номер НИЕ (номер идентификации иностранца), который может организовать ваш адвокат. Покупки выше 500.000 евро могут квалифицироваться на испанскую программу Golden Visa для резиденции. Процесс обычно занимает 4-8 недель от депозита до закрытия.'
  },
  {
    question: 'Какие текущие расходы нужно ожидать собственнику в Испании?',
    answer: 'Годовые расходы включают налог на имущество IBI (300-1500 евро в зависимости от стоимости), коммунальные услуги общего пользования (50-200 евро/месяц), страховку дома (200-500 евро/год) и коммунальные платежи. Иностранные владельцы платят годовой налог на инвестиционную стоимость аренды. Общие годовые расходы обычно 2000-5000 евро в зависимости от размера и локации.'
  },
  {
    question: 'Является ли недвижимость Коста Бланка хорошей инвестицией?',
    answer: 'Недвижимость Коста Бланка показала постоянный рост стоимости 3-6% в год в последние годы, с доходом от аренды 5-8% в популярных туристических районах. Сильный спрос от европейских покупателей, ограниченная доступная земля для развития, отличная связь через аэропорт Аликанте-Эльче и круглогодичные возможности сдачи в аренду делают это привлекательной инвестицией.'
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function hasPool(property: ParsedProperty): boolean {
  const desc = (property.description || '').toLowerCase();
  return desc.includes('pool') || desc.includes('piscina');
}

function isPropertyKeyReady(property: ParsedProperty): boolean {
  const desc = (property.description || '').toLowerCase();
  const status = (property.status || '').toLowerCase();
  return desc.includes('key ready') || desc.includes('keys ready') || desc.includes('key-ready') ||
         desc.includes('ready to move') || desc.includes('immediate delivery') || desc.includes('entrega inmediata') ||
         desc.includes('keys in hand') || status.includes('key ready') || status.includes('key-ready');
}

function getFeaturedProperties(properties: ParsedProperty[], count: number = 6): ParsedProperty[] {
  const keyReady = properties.filter(p => isPropertyKeyReady(p));
  const others = properties.filter(p => !isPropertyKeyReady(p));
  const firstRow = keyReady.slice(0, Math.min(3, Math.ceil(count / 2)));
  const remaining = count - firstRow.length;
  const secondRow = [...others, ...keyReady.slice(firstRow.length)].slice(0, remaining);
  return [...firstRow, ...secondRow];
}

export default function RUPropertiesPage({
  searchParams,
}: {
  searchParams: { town?: string; beds?: string; type?: string; sort?: string; region?: string };
}) {
  const [properties, setProperties] = useState<ParsedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [towns, setTowns] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [bedOptions, setBedOptions] = useState<number[]>([]);

  useEffect(() => {
    async function loadProperties() {
      const allProperties = await fetchXMLFeed();
      setProperties(allProperties);

      const uniqueTowns = [...new Set(allProperties.map(p => {
        const normalized = normalizeTownName(p.town || '');
        return normalized.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }).filter(Boolean))].sort();
      setTowns(uniqueTowns);

      const uniqueTypes = [...new Set(allProperties.map(p => p.propertyType).filter(Boolean))].sort();
      setTypes(uniqueTypes);

      const uniqueBeds = [...new Set(allProperties.map(p => p.bedrooms).filter((b): b is number => b !== null && b > 0))].sort((a, b) => a - b);
      setBedOptions(uniqueBeds);

      setLoading(false);
    }

    loadProperties();
  }, []);

  if (loading) return <div className="py-20 text-center">Загрузка...</div>;

  const southProperties = properties.filter(p => SOUTH_TOWNS.some(t => p.town?.toLowerCase().includes(t)));
  const northProperties = properties.filter(p => NORTH_TOWNS.some(t => p.town?.toLowerCase().includes(t)));
  const golfProperties = properties.filter(p => GOLF_KEYWORDS.some(k => p.town?.toLowerCase().includes(k) || p.description?.toLowerCase().includes('golf')));
  const inlandProperties = properties.filter(p => INLAND_TOWNS.some(t => p.town?.toLowerCase().includes(t)));

  const keyReadyCount = properties.filter(isPropertyKeyReady).length;

  return (
    <main className="min-h-screen bg-warm-50">
      <section className="relative bg-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
              Все Новостройки на <span className="font-semibold text-accent-400">Коста Бланка</span>
            </h1>
            <p className="text-warm-300 text-lg mb-10">
              {properties.length.toLocaleString()} новостроек в самых желанных местах Коста Бланка
            </p>

            <PropertySearch towns={towns} types={types} bedOptions={bedOptions} />

            <div className="flex flex-wrap justify-center gap-8 mt-10">
              <div className="text-center">
                <div className="text-3xl font-semibold text-accent-400">{properties.length.toLocaleString()}</div>
                <div className="text-warm-400 text-sm">Дома</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-white">{towns.length}</div>
                <div className="text-warm-400 text-sm">Локаций</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-white">{types.length}</div>
                <div className="text-warm-400 text-sm">Типов Домов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-warm-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/ru/properties?status=key-ready"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Готово К Заселению ({keyReadyCount})
            </Link>
            <Link
              href="/ru/properties?type=apartment"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-100 text-primary-900 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors"
            >
              Квартиры
            </Link>
            <Link
              href="/ru/properties?type=villa"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-100 text-primary-900 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors"
            >
              Виллы
            </Link>
            <Link
              href="/ru/properties?maxprice=300000"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-100 text-primary-900 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors"
            >
              До 300.000 евро
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-accent-500 font-medium text-sm uppercase tracking-wide">Солнце и Пляжи</span>
              <h2 className="text-3xl md:text-4xl font-light text-primary-900 mt-2">
                Коста Бланка <span className="font-semibold">Юг</span>
              </h2>
              <p className="text-warm-500 mt-2">Солнце весь год, гольф-клубы и устоявшиеся иностранные сообщества</p>
            </div>
            <Link href="/ru/properties?region=south" className="hidden md:flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
              Показать все {southProperties.length} домов
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {getFeaturedProperties(southProperties, 6).map(property => (
              <div key={property.id}>placeholder</div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {southProperties.slice(0, 8).map(p => (
              <Link
                key={p.town}
                href={`/ru/properties?town=${encodeURIComponent(p.town || '')}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-warm-100 hover:bg-warm-200 rounded-full text-sm font-medium text-primary-900 transition-colors"
              >
                {p.town}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-accent-500 font-medium text-sm uppercase tracking-wide">Премиум Берег</span>
              <h2 className="text-3xl md:text-4xl font-light text-primary-900 mt-2">
                Коста Бланка <span className="font-semibold">Север</span>
              </h2>
              <p className="text-warm-500 mt-2">Драматичные горные берега, престижные виллы и средиземноморская элегантность</p>
            </div>
            <Link href="/ru/properties?region=north" className="hidden md:flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
              Показать все {northProperties.length} домов
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {getFeaturedProperties(northProperties, 6).map(property => (
              <div key={property.id}>placeholder</div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {northProperties.slice(0, 8).map(p => (
              <Link
                key={p.town}
                href={`/ru/properties?town=${encodeURIComponent(p.town || '')}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-warm-50 rounded-full text-sm font-medium text-primary-900 transition-colors"
              >
                {p.town}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-accent-500 font-medium text-sm uppercase tracking-wide">Гольф Жилье</span>
              <h2 className="text-3xl md:text-4xl font-light text-primary-900 mt-2">
                <span className="font-semibold">Гольф</span> Дома
              </h2>
              <p className="text-warm-500 mt-2">Премиум дома на чемпионатных гольф-полях</p>
            </div>
            <Link href="/ru/properties?region=golf" className="hidden md:flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
              Показать все {golfProperties.length} домов
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {getFeaturedProperties(golfProperties, 6).map(property => (
              <div key={property.id}>placeholder</div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {golfProperties.slice(0, 8).map(p => (
              <Link
                key={p.town}
                href={`/ru/properties?town=${encodeURIComponent(p.town || '')}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-warm-100 hover:bg-warm-200 rounded-full text-sm font-medium text-primary-900 transition-colors"
              >
                {p.town}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-warm-50">
        <div className="max-w-4xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-6 md:p-8">
          <h3 className="text-xl font-semibold text-primary-900 mb-3">Как купить дом в Испании</h3>
          <p className="text-warm-600 mb-4">
            Как русскоговорящий покупатель вы можете запросить испанскую ипотеку. Мы рекомендуем:
          </p>
          <ul className="space-y-2 text-warm-600 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-accent-600 font-semibold mt-0.5">•</span>
              <span>Получить номер НИЕ (номер идентификации иностранца) перед началом покупки</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-600 font-semibold mt-0.5">•</span>
              <span>Нанять опытного адвоката, говорящего по-русски или по-английски</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-600 font-semibold mt-0.5">•</span>
              <span>Планировать 10-13% на налоги и юридические услуги</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-600 font-semibold mt-0.5">•</span>
              <span>Изучить испанские банки (CaixaBank, BBVA, Santander) для ипотеки</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-accent-500 font-medium text-sm uppercase tracking-wide">Лучшая Цена</span>
              <h2 className="text-3xl md:text-4xl font-light text-primary-900 mt-2">
                <span className="font-semibold">Внутренние Районы</span>
              </h2>
              <p className="text-warm-500 mt-2">Очаровательные деревни с аутентичным испанским характером и отличной ценой</p>
            </div>
            <Link href="/ru/properties?region=inland" className="hidden md:flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
              Показать все {inlandProperties.length} домов
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {getFeaturedProperties(inlandProperties, 6).map(property => (
              <div key={property.id}>placeholder</div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {inlandProperties.slice(0, 8).map(p => (
              <Link
                key={p.town}
                href={`/ru/properties?town=${encodeURIComponent(p.town || '')}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-warm-50 rounded-full text-sm font-medium text-primary-900 transition-colors"
              >
                {p.town}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-10 text-center">
            Часто Задаваемые <span className="font-semibold">Вопросы</span>
          </h2>
          <div className="space-y-6">
            {RUSSIAN_FAQS.map((faq, index) => (
              <div key={index} className="bg-warm-50 rounded-xl p-6 border border-warm-100">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">{faq.question}</h3>
                <p className="text-warm-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
            Нужна помощь найти <span className="font-semibold">свой дом?</span>
          </h2>
          <p className="text-warm-300 mb-8">Наши местные эксперты знают каждый район и помогут найти идеальный дом для вас.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/ru/contact" className="bg-white text-primary-900 px-8 py-3 rounded-md font-medium hover:bg-warm-100 transition-colors">
              Связаться С Нами
            </Link>
            <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-md font-medium flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
