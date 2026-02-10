import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Pod Klucz vs Plan - Porównanie Nieruchomości',
  description: 'Porównanie nieruchomości pod klucz (gotowych) i z projektu (off-plan) na Costa Blanca. Dowiedz się o różnicach, zaletach i ryzykach.',
  alternates: {
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/key-ready-vs-off-plan',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/kant-en-klaar-vs-ritning',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/kant-en-klaar-vs-ritning',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/kant-en-klaar-vs-ritning',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/cles-en-main-vs-plan',
      'no': 'https://newbuildhomescostablanca.com/no/guides/innflyttingsklar-tegning',
      'de': 'https://newbuildhomescostablanca.com/de/guides/schluesselfertig-vs-planverkauf',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides/pod-klucz-vs-plan',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides/pod-klyuch-vs-plan',
      'x-default': 'https://newbuildhomescostablanca.com/guides/key-ready-vs-off-plan',
    },
  },
};

const breadcrumbs = [
  { name: 'Strona główna', url: 'https://newbuildhomescostablanca.com/pl' },
  { name: 'Przewodniki', url: 'https://newbuildhomescostablanca.com/pl/guides' },
  { name: 'Pod Klucz vs Plan', url: 'https://newbuildhomescostablanca.com/pl/guides/pod-klucz-vs-plan' },
];

const faqs = [
  {
    question: 'Co to znaczy "pod klucz" (key ready)?',
    answer: 'Pod klucz oznacza, że nieruchomość jest całkowicie gotowa do zamieszkania. Wszystkie prace budowlane, instalacje, wykończenia są ukończone. Możesz wejść i od razu zamieszk bez wykonywania dodatkowych prac. Jest to przeciwieństwo nieruchomości z projektu.',
  },
  {
    question: 'Co to znaczy "z projektu" (off-plan)?',
    answer: 'Z projektu (off-plan) oznacza, że nieruchomość nie istnieje jeszcze lub jest w fazie budowy. Kupujesz na podstawie planów i wizualizacji. Budowa nieruchomości dopiero się zaczyna lub trwa. Dostarczenie następuje po ukończeniu budowy, zazwyczaj 12-24 miesiące po podpisaniu umowy.',
  },
  {
    question: 'Jakie są zalety kupna nieruchomości pod klucz?',
    answer: 'Zalety: 1) Możesz zobaczyć i ocenić nieruchomość przed zakupem, 2) Brak ryzyka związanego z budową, 3) Możesz zamieszk natychmiast, 4) Widzisz rzeczywiste wykonanie prac, 5) Łatwiej sprawdzić warunki nieruchomości. Jednak zwykle brak możliwości dostosowania wnętrza.',
  },
  {
    question: 'Jakie są zalety kupna nieruchomości z projektu?',
    answer: 'Zalety: 1) Zwykle niższa cena (rabat konstruktora), 2) Możliwość dostosowania wnętrza do swoich preferencji, 3) Szybszy wzrost wartości (przeważnie), 4) Możliwość zaobserwowania budowy, 5) Gwarancja konstrukcyjna przez 10 lat. Jednak jest ryzyko związane z budową i opóźnieniami.',
  },
  {
    question: 'Czy cena nieruchomości pod klucz jest wyższa niż z projektu?',
    answer: 'Zwykle tak. Nieruchomości pod klucz są droższe, ponieważ są już gotowe i mogą być natychmiast zamieszk. Nieruchomości z projektu mogą mieć rabat konstruktora (5-15%), ponieważ budowniczy chce przyciągnąć kupujących. Jednak w dłuższej perspektywie cena może się wyrównać.',
  },
  {
    question: 'Jakie jest ryzyko kupna nieruchomości z projektu?',
    answer: 'Główne ryzyka: 1) Opóźnienia w budowie, 2) Zmiany w projekcie lub materiałach, 3) Problemy finansowe konstruktora (bankructwo), 4) Problemy strukturalne odkryte podczas budowy, 5) Zmiana wartości nieruchomości przed oddaniem. Dlatego ważne jest wybranie wiarygodnego konstruktora.',
  },
  {
    question: 'Jak długo czeka się na dostawę nieruchomości z projektu?',
    answer: 'Czas dostawy zależy od fazy budowy w momencie zakupu. Jeśli kupisz w fazie projektowania, czekanie może trwać 18-24 miesiące. Jeśli kupisz w fazie wykonania, może to trwać 8-12 miesięcy. Zawsze sprawdź termin dostawy w umowie przedwstępnej.',
  },
  {
    question: 'Czy mogę dokonać zmiany w nieruchomości pod klucz?',
    answer: 'To zależy od nieruchomości. Jeśli jest częścią dużego projektu, mogą być dostępne pewne opcje zmian (np. kolory, materiały). Jednak większość zmian strukturalnych nie jest możliwa, ponieważ nieruchomość jest już gotowa. Zawsze zapytaj konstruktora, jakie zmiany są dostępne.',
  },
];

export default function PodKluczVsPlanPage() {
  const breadcrumbJson = toJsonLd(breadcrumbSchema(breadcrumbs));
  const faqJson = toJsonLd(faqSchema(faqs));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-warm-50">
      {/* Breadcrumb Navigation */}
      <nav className="bg-primary-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center space-x-2">
                {index > 0 && <span className="text-accent-500">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-warm-100">{crumb.name}</span>
                ) : (
                  <Link href={crumb.url} className="text-accent-500 hover:text-accent-400">
                    {crumb.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-primary-900 mb-4 rounded-sm">
            Pod Klucz vs Z Projektu
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Porównanie nieruchomości pod klucz (gotowych) i z projektu (off-plan) na Costa Blanca. Dowiedz się o różnicach, zaletach, wadach i ryzykach każdej opcji.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-12 bg-white rounded-sm border-l-4 border-accent-500 p-6 shadow-md">
          <h2 className="text-3xl font-light text-primary-900 mb-4">Jaki Jest Wybór?</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Gdy szukasz nieruchomości na Costa Blanca, stoisz przed ważnym wyborem: kupić nieruchomość gotową do zamieszkania (pod klucz) czy kupić z projektu (off-plan), gdy nieruchomość jest jeszcze budowana. Obie opcje mają swoje zalety i wady.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-3">Pod Klucz (Key Ready)</h3>
              <p className="text-gray-700 text-sm">Nieruchomość jest całkowicie gotowa do zamieszkania. Wszystkie prace są ukończone.</p>
            </div>
            <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-3">Z Projektu (Off-Plan)</h3>
              <p className="text-gray-700 text-sm">Nieruchomość jest w fazie budowy lub jeszcze nie wybudowana. Kupujesz na podstawie planów.</p>
            </div>
          </div>
        </section>

        {/* Key Ready */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Nieruchomość Pod Klucz (Key Ready)</h2>

          <div className="mb-8 bg-white rounded-sm border-l-4 border-primary-900 p-8 shadow-md">
            <h3 className="text-2xl font-light text-primary-900 mb-4">Co to Oznacza?</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Nieruchomość "pod klucz" to nieruchomość, która jest w pełni gotowa do zamieszkania. Wszystkie prace budowlane, instalacje elektryczne i hydrauliczne, malowanie, podłogi i wszystkie inne prace są ukończone. Możesz zamieszk w dniu przejęcia nieruchomości bez wykonywania jakichkolwiek dodatkowych prac.
            </p>
            <div className="bg-warm-50 rounded-sm p-6 border border-accent-200">
              <h4 className="text-lg font-light text-primary-900 mb-4">Stanów Gotowości:</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Budowa:</span>
                  <span className="text-accent-500 font-light">100% ukończona</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Instalacje:</span>
                  <span className="text-accent-500 font-light">W pełni działające</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Wykończenie:</span>
                  <span className="text-accent-500 font-light">Całkowite</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Dysponibilność:</span>
                  <span className="text-accent-500 font-light">Natychmiast</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-sm border-l-4 border-accent-500 p-8 shadow-md">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Zalety</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Natychmiastowe Zamieszkanie</p>
                    <p className="text-sm text-gray-600">Możesz zamieszk zaraz po zakupie bez czekania</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Widzisz, Co Kupisz</p>
                    <p className="text-sm text-gray-600">Możesz obejrzeć nieruchomość przed zakupem</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Brak Ryzyka Budowy</p>
                    <p className="text-sm text-gray-600">Nie ma opóźnień ani zmian w budowie</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Inspekcja Nieruchomości</p>
                    <p className="text-sm text-gray-600">Możesz dokładnie sprawdzić stan</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-sm border-l-4 border-warm-400 p-8 shadow-md">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Wady</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Wyższa Cena</p>
                    <p className="text-sm text-gray-600">Zazwyczaj droższe niż z projektu</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Brak Dostosowania</p>
                    <p className="text-sm text-gray-600">Nie możesz zmieniać projektu czy materiałów</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Potencjalne Problemy</p>
                    <p className="text-sm text-gray-600">Ukryte wady mogą się ujawnić po zakupie</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Wolniejszy Wzrost Wartości</p>
                    <p className="text-sm text-gray-600">Wartość rośnie wolniej niż nowych budynków</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Off Plan */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Nieruchomość Z Projektu (Off-Plan)</h2>

          <div className="mb-8 bg-white rounded-sm border-l-4 border-accent-500 p-8 shadow-md">
            <h3 className="text-2xl font-light text-primary-900 mb-4">Co to Oznacza?</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Nieruchomość "z projektu" (off-plan) to nieruchomość, która jest jeszcze w fazie budowy lub planowania. Kupujesz na podstawie planów architektonicznych, wizualizacji 3D i opisu projektu. Dostarczenie nieruchomości następuje po ukończeniu budowy, zazwyczaj 12-24 miesiące po podpisaniu umowy.
            </p>
            <div className="bg-warm-50 rounded-sm p-6 border border-accent-200">
              <h4 className="text-lg font-light text-primary-900 mb-4">Fazy Budowy:</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Faza 0:</span>
                  <span className="text-accent-500 font-light">Planowanie i wydanie pozwolenia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Faza 1:</span>
                  <span className="text-accent-500 font-light">Prace ziemne i fundamenty</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Faza 2:</span>
                  <span className="text-accent-500 font-light">Ramę strukturalna</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Faza 3:</span>
                  <span className="text-accent-500 font-light">Instalacje i wykończenia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Faza 4:</span>
                  <span className="text-accent-500 font-light">Finalizacja i dostarczenie</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-sm border-l-4 border-accent-500 p-8 shadow-md">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Zalety</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Niższa Cena</p>
                    <p className="text-sm text-gray-600">Rabat konstruktora zazwyczaj 5-15%</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Dostosowanie Wnętrza</p>
                    <p className="text-sm text-gray-600">Możesz wybrać kolory, materiały, rozmieszczenie</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Szybszy Wzrost Wartości</p>
                    <p className="text-sm text-gray-600">Nowe budynki zyskują na wartości szybciej</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Gwarancja 10 Lat</p>
                    <p className="text-sm text-gray-600">Pełna gwarancja na wszystkie prace</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-sm border-l-4 border-warm-400 p-8 shadow-md">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Wady</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Opóźnienia w Budowie</p>
                    <p className="text-sm text-gray-600">Budowa może się opóznić (problemy, pogoda)</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Ryzyko Finansowe</p>
                    <p className="text-sm text-gray-600">Problemy finansowe konstruktora czy bankructwo</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Czekanie na Dostawę</p>
                    <p className="text-sm text-gray-600">Musisz czekać 12-24 miesiące na dostarczenie</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Niepewność Jakości</p>
                    <p className="text-sm text-gray-600">Nie wiesz dokładnie, co otrzymasz</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Porównanie Szczegółowe</h2>
          <div className="overflow-x-auto bg-white rounded-sm shadow-md border border-accent-200">
            <table className="w-full">
              <thead>
                <tr className="bg-primary-900 text-white border-b border-accent-500">
                  <th className="px-6 py-4 text-left font-light">Aspekt</th>
                  <th className="px-6 py-4 text-left font-light">Pod Klucz</th>
                  <th className="px-6 py-4 text-left font-light">Z Projektu</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Cena</td>
                  <td className="px-6 py-4 text-gray-600">Wyższa (100%)</td>
                  <td className="px-6 py-4 text-accent-500">Niższa (85-95%)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50 bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Dyspozycyjność</td>
                  <td className="px-6 py-4 text-accent-500">Natychmiast</td>
                  <td className="px-6 py-4 text-gray-600">12-24 miesiące</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Dostosowanie</td>
                  <td className="px-6 py-4 text-gray-600">Limitowane</td>
                  <td className="px-6 py-4 text-accent-500">Pełne</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50 bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Gwarancja</td>
                  <td className="px-6 py-4 text-gray-600">Ograniczona</td>
                  <td className="px-6 py-4 text-accent-500">10 lat</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Wzrost Wartości</td>
                  <td className="px-6 py-4 text-gray-600">2-3% rocznie</td>
                  <td className="px-6 py-4 text-accent-500">5-8% rocznie</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50 bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Ryzyko Budowy</td>
                  <td className="px-6 py-4 text-accent-500">Brak</td>
                  <td className="px-6 py-4 text-gray-600">Wysokie</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Inspekcja Przedwstępna</td>
                  <td className="px-6 py-4 text-accent-500">Możliwa</td>
                  <td className="px-6 py-4 text-gray-600">Niemożliwa</td>
                </tr>
                <tr className="hover:bg-warm-50 bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Koszty Utrzymania</td>
                  <td className="px-6 py-4 text-gray-600">Potencjalnie wyższe</td>
                  <td className="px-6 py-4 text-accent-500">Niższe (nowy sprzęt)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Decision Guide */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Który Wybór Dla Ciebie?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-sm border-l-4 border-primary-900 p-8 shadow-md">
              <h3 className="text-2xl font-light text-primary-900 mb-6">Wybierz Pod Klucz, Jeśli:</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <span className="text-primary-900 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Potrzebujesz domu natychmiast</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-primary-900 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Chcesz uniknąć ryzyka budowy</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-primary-900 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Wolisz widzieć nieruchomość przed zakupem</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-primary-900 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Masz możliwość inspekcji technicznej</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-primary-900 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Nie chcesz się martwić o opóźnienia</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-sm border-l-4 border-accent-500 p-8 shadow-md">
              <h3 className="text-2xl font-light text-primary-900 mb-6">Wybierz Z Projektu, Jeśli:</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Chcesz zaoszczędzić pieniądze (5-15% rabat)</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Chcesz dostosować wnętrze do preferencji</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Szukasz szybszego wzrostu wartości</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Możesz czekać 12-24 miesiące na dostarczenie</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Ufasz konstruktorowi i jego reputacji</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="my-16">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Najczęstsze Pytania</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-sm border border-accent-200 p-6 shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-light text-primary-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary-900 to-accent-500 text-white rounded-sm p-12 mb-12">
          <h2 className="text-3xl font-light mb-4">Potrzebujesz Pomocy w Wyborze?</h2>
          <p className="text-lg mb-8 text-warm-100">
            Nasz zespół doradców może pomóc Ci wybrać między nieruchomością pod klucz a z projektu na podstawie Twoich potrzeb i preferencji.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" className="bg-white text-primary-900 px-8 py-3 rounded-sm font-light hover:bg-warm-50 transition inline-block">
              WhatsApp
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/contact" className="bg-accent-500 text-white px-8 py-3 rounded-sm font-light hover:bg-accent-600 transition inline-block">
              Formularz Kontaktowy
            </Link>
          </div>
        </section>

        {/* Links to Other Guides */}
        <section className="bg-warm-50 rounded-sm p-8 border border-accent-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Inne Przewodniki</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="https://newbuildhomescostablanca.com/pl/guides/proces-zakupu" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Proces Zakupu</h3>
              <p className="text-sm text-gray-600">Kompletny przewodnik po procesie</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/numer-nie" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Numer NIE</h3>
              <p className="text-sm text-gray-600">Jak uzyskać identyfikator</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/koszty-podatki" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Koszty i Podatki</h3>
              <p className="text-sm text-gray-600">Przegląd wszystkich kosztów</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/kredyt-hipoteczny" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Kredyt Hipoteczny</h3>
              <p className="text-sm text-gray-600">Przewodnik po hipotekach</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/dlaczego-nowy-budynek" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Dlaczego Nowy Budynek</h3>
              <p className="text-sm text-gray-600">Korzyści nowych nieruchomości</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/polnoc-vs-poludnie" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Północ vs Południe</h3>
              <p className="text-sm text-gray-600">Porównanie lokalizacji</p>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Link href="https://newbuildhomescostablanca.com/pl/guides" className="text-accent-500 hover:text-accent-600 font-light">
              Powrót do wszystkich przewodników
            </Link>
          </div>
        </section>
      </main>

      {/* Schema Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJson }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJson }}
      />
    </div>
  );
}
