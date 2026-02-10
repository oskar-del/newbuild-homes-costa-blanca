import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Przewodniki Kupującego | Nowe Domy Costa Blanca',
  description: 'Kompletne przewodniki dla kupujących domów na Costa Blance. Wszystko o procesie zakupu, podatkach, kredytach i NIE.',
  openGraph: {
    title: 'Przewodniki Kupującego | Nowe Domy Costa Blanca',
    description: 'Przewodniki i artykuły dla kupujących nieruchomości na Costa Blance.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/pl/guides',
    siteName: 'Nowe Domy Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl/guides',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides',
      'no': 'https://newbuildhomescostablanca.com/no/guides',
      'de': 'https://newbuildhomescostablanca.com/de/guides',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides',
      'x-default': 'https://newbuildhomescostablanca.com/guides',
    },
  },
};

const guides = [
  {
    title: 'Proces Zakupu - Krok Po Kroku',
    description: 'Kompletny przewodnik po całym procesie zakupu domu w Hiszpanii.',
    link: '/pl/guides/proces-zakupu',
    icon: 'P',
    color: 'bg-blue-50 border-blue-200'
  },
  {
    title: 'Numer NIE - Co To Jest i Jak Go Uzyskać',
    description: 'Przewodnik dotyczący uzyskania numeru identyfikacji cudzoziemca (NIE).',
    link: '/pl/guides/numer-nie',
    icon: 'N',
    color: 'bg-green-50 border-green-200'
  },
  {
    title: 'Koszty i Podatki - Pełny Przegląd',
    description: 'Jakie dodatkowe koszty czekają kupującego? Podatek transferowy, IBI, opłaty notarialne.',
    link: '/pl/guides/koszty-podatki',
    icon: 'K',
    color: 'bg-purple-50 border-purple-200'
  },
  {
    title: 'Kredyty Hipoteczne - Opcje Finansowania',
    description: 'Jak uzyskać kredyt hipoteczny na Costa Blance. Porównanie banków i opcji.',
    link: '/pl/guides/kredyt-hipoteczny',
    icon: 'H',
    color: 'bg-orange-50 border-orange-200'
  },
  {
    title: 'Dlaczego Kupić Nowy Dom?',
    description: 'Korzyści kupna nowego domu zamiast istniejącej nieruchomości.',
    link: '/pl/guides/dlaczego-nowy-budynek',
    icon: 'N',
    color: 'bg-red-50 border-red-200'
  },
  {
    title: 'Gotowy do Zamieszkania vs Plan',
    description: 'Różnice między domami gotowymi a budowaniem od zera. Zalety i wady.',
    link: '/pl/guides/pod-klucz-vs-plan',
    icon: 'G',
    color: 'bg-teal-50 border-teal-200'
  },
  {
    title: 'Północ vs Południe Costa Blanki',
    description: 'Porównanie północy i południa. Gdzie lepiej się mieszka? Ceny, styl życia, atmosfera.',
    link: '/pl/guides/polnoc-vs-poludnie',
    icon: 'D',
    color: 'bg-indigo-50 border-indigo-200'
  },
  {
    title: 'Torrevieja',
    description: 'Pełny przewodnik po Torrevieja dla polskich kupujących',
    link: '/pl/guides/torrevieja',
    icon: 'T',
    color: 'bg-pink-50 border-pink-200'
  },
  {
    title: 'Jávea',
    description: 'Ekskluzywy przewodnik po Jávea dla polskich inwestorów',
    link: '/pl/guides/javea',
    icon: 'J',
    color: 'bg-cyan-50 border-cyan-200'
  },
  {
    title: 'Costa Blanca Północ',
    description: 'Pełny przewodnik po Północnej Costa Blanca dla polskich kupujących',
    link: '/pl/guides/costa-blanca-polnoc',
    icon: 'C',
    color: 'bg-amber-50 border-amber-200'
  }
];

export default function PolishGuidesPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      <section className="relative bg-primary-900 overflow-hidden py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
            Przewodniki dla <span className="font-semibold text-accent-400">Kupujących</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-3xl mx-auto">
            Wszystko, co musisz wiedzieć o kupowaniu domu na Costa Blance. Ekspertne porady i poradniki dla polskich kupujących.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900">
              Najważniejsze <span className="font-semibold">Przewodniki</span>
            </h2>
            <p className="text-warm-600 mt-3 max-w-2xl mx-auto">
              Przeczytaj nasze przewodniki i artykuły, aby dowiedzieć się wszystkiego o kupowaniu nieruchomości na Costa Blance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, idx) => (
              <Link
                key={idx}
                href={guide.link}
                className={`${guide.color} border rounded-sm p-8 hover:shadow-lg transition-all group`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent-600 font-bold text-lg">{guide.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-600 transition-colors">
                    {guide.title}
                  </h3>
                </div>
                <p className="text-warm-600 text-sm mb-4">
                  {guide.description}
                </p>
                <div className="text-accent-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
                  Czytaj Przewodnik
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary-900">
              Często Zadawane <span className="font-semibold">Pytania</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-sm p-6 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-2">Ile czasu trwa proces zakupu?</h3>
              <p className="text-warm-600 text-sm">
                Zazwyczaj od 4-8 tygodni od zarezerwowania do podpisania aktu notarialnego.
              </p>
            </div>

            <div className="bg-white rounded-sm p-6 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-2">Jaki procent zaliczki potrzebuję?</h3>
              <p className="text-warm-600 text-sm">
                Zazwyczaj 30-40% do finansowania hipotecznego. Pierwsza zaliczka wynosi 5-10%.
              </p>
            </div>

            <div className="bg-white rounded-sm p-6 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-2">Czy mogę ubiegać się o kredyt hipoteczny?</h3>
              <p className="text-warm-600 text-sm">
                Tak. Banki w Hiszpanii oferują kredyty dla cudzoziemców. Oprocentowanie 3-5%.
              </p>
            </div>

            <div className="bg-white rounded-sm p-6 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-2">Czy potrzebuję numeru NIE?</h3>
              <p className="text-warm-600 text-sm">
                Tak, to obowiązkowe. Numer identyfikacji cudzoziemca wymagany do kupna i otworzenia konta bankowego.
              </p>
            </div>

            <div className="bg-white rounded-sm p-6 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-2">Jakie są koszty zakupu?</h3>
              <p className="text-warm-600 text-sm">
                Około 10-13% powyżej ceny zakupu na podatki, opłaty notarialne i opłaty prawne.
              </p>
            </div>

            <div className="bg-white rounded-sm p-6 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-2">Czy mogę wynająć dom?</h3>
              <p className="text-warm-600 text-sm">
                Tak. Wiele domów na Costa Blance jest wynajmowanych turystom. Dochód 5-8% rocznie.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-900 rounded-sm p-8 md:p-12 text-center">
            <h2 className="text-3xl font-light text-white mb-4">
              Potrzebujesz <span className="font-semibold">Osobistej Konsultacji?</span>
            </h2>
            <p className="text-warm-300 mb-8 max-w-2xl mx-auto">
              Skontaktuj się z nami bezpośrednio. Nasi specjaliści mogą odpowiedzieć na wszystkie Twoje pytania i pomóc Ci znaleźć idealny dom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pl/contact" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-md font-medium transition-colors">
                Skontaktuj Się
              </Link>
              <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-md font-medium flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-light text-primary-900 mb-6">
              Chcesz Przeglądać <span className="font-semibold">Nieruchomości?</span>
            </h2>
            <Link href="/pl/properties" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all">
              Przeglądaj Wszystkie Domy
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
