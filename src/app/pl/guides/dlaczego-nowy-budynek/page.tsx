import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Dlaczego Nowy Budynek? - Korzyści z Nowych Nieruchomości',
  description: 'Kompletny przewodnik po korzyściach z zakupu nowoodbudowanej nieruchomości na Costa Blanca. Porównanie z nieruchomościami starszymi.',
  alternates: {
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/why-new-build',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/varfor-nybygge',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/waarom-nieuwbouw',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/waarom-nieuwbouw',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/pourquoi-neuf',
      'no': 'https://newbuildhomescostablanca.com/no/guides/hvorfor-nybygg',
      'de': 'https://newbuildhomescostablanca.com/de/guides/warum-neubau',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides/dlaczego-nowy-budynek',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides/pochemu-novostroyka',
      'x-default': 'https://newbuildhomescostablanca.com/guides/why-new-build',
    },
  },
};

const breadcrumbs = [
  { name: 'Strona główna', url: 'https://newbuildhomescostablanca.com/pl' },
  { name: 'Przewodniki', url: 'https://newbuildhomescostablanca.com/pl/guides' },
  { name: 'Dlaczego Nowy Budynek', url: 'https://newbuildhomescostablanca.com/pl/guides/dlaczego-nowy-budynek' },
];

const faqs = [
  {
    question: 'Jakie są główne korzyści z zakupu nowego budynku?',
    answer: 'Główne korzyści to: 1) Gwarancja na materiały i prace (10 lat), 2) Niższe koszty utrzymania i napraw, 3) Nowoczesny system elektryczny i hydrauliczny, 4) Energia o wyższej efektywności, 5) Brak problemów prawnych, 6) Możliwość dostosowania wnętrza, 7) Nowsze standardy budownictwa sejsmicznego, 8) Lepsze izolacyjne termiczne i akustyczne.',
  },
  {
    question: 'Czy nowy budynek jest droższy niż stary?',
    answer: 'Zazwyczaj nowy budynek jest droższy za metr kwadratowy, ale cena jest uzasadniona. Jednak biorąc pod uwagę oszczędności na naprawach i utrzymaniu przez wiele lat, koszt całkowity jest poniżej. Dodatkowo, nowe nieruchomości szybciej zyskują wartość.',
  },
  {
    question: 'Czy nowy budynek wymaga mniej prac naprawczych?',
    answer: 'Zdecydowanie tak. Nowy budynek ma gwarancję na wszystkie materiały i prace przez 10 lat. Problemy naprawcze są rzadkie w pierwszych latach. Stare nieruchomości mogą wymagać kosztownych napraw już przed zakupem lub wkrótce po nim.',
  },
  {
    question: 'Czy mogę dostosować wnętrze nowego budynku?',
    answer: 'Tak, zawsze wtedy możesz dostosować wnętrze nowego budynku. Jeśli kupisz jeszcze przed zakończeniem budowy, możesz wybrać kolory, materiały, rozmieszczenie pokoi i wiele innych rzeczy. Jest to idealna okazja do dostosowania domu do swoich preferencji.',
  },
  {
    question: 'Jakie są koszty eksploatacji nowego budynku?',
    answer: 'Koszty eksploatacji nowego budynku są zazwyczaj niższe niż starego o 20-30%. To wynika z lepszej izolacji termicznej, nowoczesnych urządzeń i materiałów. Dodatkowo, niższe są koszty ubezpieczenia nowego budynku.',
  },
  {
    question: 'Czy nowy budynek na Costa Blanca jest bezpieczny w przypadku trzęsienia ziemi?',
    answer: 'Tak, wszystkie nowe budynki w Hiszpanii muszą spełniać surowe normy sejsmiczne. Budynki wybudowane w ostatnich latach są znacznie bardziej odporne na trzęsienia niż budynki starsze. To ważna zaletę nowych nieruchomości w regionach zagrożonych trzęsieniami.',
  },
  {
    question: 'Czy nowy budynek ma lepszą izolację termiczną?',
    answer: 'Tak, nowe budynki mają znacznie lepszą izolację termiczną niż stare. Oszczędzę to na rachunkach za klimatyzację i ogrzewanie. Nowoczesne okna i ściany są znacznie bardziej efektywne energetycznie niż stare.',
  },
  {
    question: 'Czy warto czekać na nowy budynek zamiast kupić stary teraz?',
    answer: 'To zależy od Twojej sytuacji. Jeśli możesz czekać 6-12 miesięcy, czekanie na nowy budynek może być warte. Korzyści na dłuższą metę są znaczne. Jednak jeśli potrzebujesz domu teraz, możesz znaleźć dobrą starą nieruchomość po przystojnej cenie.',
  },
];

export default function DlaczegoDlaczNowBudynekPage() {
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
            Dlaczego Wybrać Nowy Budynek?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Kompletny przewodnik po korzyściach z zakupu nowoodbudowanej nieruchomości na Costa Blanca. Dowiedz się, dlaczego nowy budynek jest inwestycją na przyszłość.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-12 bg-white rounded-sm border-l-4 border-accent-500 p-6 shadow-md">
          <h2 className="text-3xl font-light text-primary-900 mb-4">Zakup Nowego Budynku vs Starego</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Gdy szukasz nieruchomości na Costa Blanca, stoisz przed wyborem: nowy budynek czy stary? Oba mają swoje zalety, ale nowe nieruchomości oferują wiele unikalnych korzyści, które mogą sprawić, że inwestycja będzie warta każdego euro.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
              <p className="text-sm font-light text-accent-500 mb-2">GWARANCJA</p>
              <p className="text-2xl font-bold text-primary-900">10 LAT</p>
              <p className="text-gray-700 font-light">Na wszystkie materiały i prace</p>
            </div>
            <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
              <p className="text-sm font-light text-accent-500 mb-2">OSZCZĘDNY KOSZT</p>
              <p className="text-2xl font-bold text-primary-900">-30%</p>
              <p className="text-gray-700 font-light">Na rachunkach energii</p>
            </div>
            <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
              <p className="text-sm font-light text-accent-500 mb-2">WZROST WARTOŚCI</p>
              <p className="text-2xl font-bold text-primary-900">+5-8%</p>
              <p className="text-gray-700 font-light">Rocznie w pierwszych latach</p>
            </div>
          </div>
        </section>

        {/* Main Benefits */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Główne Korzyści Nowych Nieruchomości</h2>

          {/* Warranty */}
          <div className="mb-8 bg-white rounded-sm border-l-4 border-accent-500 p-8 shadow-md">
            <h3 className="text-2xl font-light text-primary-900 mb-4">Gwarancja Konstruktora (10 Lat)</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Każdy nowy budynek w Hiszpanii ma obowiązkową gwarancję konstruktora przez 10 lat. Ta gwarancja obejmuje wszystkie materiały i robociznę, co daje Ci spokój ducha.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-warm-50 rounded-sm p-6 border border-accent-200">
                <h4 className="text-lg font-light text-primary-900 mb-4">Co Obejmuje Gwarancja:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">•</span>
                    <span>Strukturalne wady budynku</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">•</span>
                    <span>Instalacje elektryczne i hydrauliczne</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">•</span>
                    <span>Okna i drzwi</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">•</span>
                    <span>Systemy grzewcze i chłodzące</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">•</span>
                    <span>Ścianki działowe i sufity</span>
                  </li>
                </ul>
              </div>
              <div className="bg-primary-900 text-white rounded-sm p-6">
                <h4 className="text-lg font-light text-accent-500 mb-4">Porównanie z Nieruchomościami Starszymi:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-accent-500 pb-2">
                    <span>Nowy budynek:</span>
                    <span className="font-bold">Pełna gwarancja</span>
                  </div>
                  <div className="flex justify-between border-b border-accent-500 pb-2">
                    <span>Budynek 10+ lat:</span>
                    <span className="font-bold">Brak gwarancji</span>
                  </div>
                  <div className="flex justify-between border-b border-accent-500 pb-2">
                    <span>Możliwość napraw:</span>
                    <span className="font-bold">Konstruktor płaci</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Koszty napraw:</span>
                    <span className="font-bold">0 EUR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Energy Efficiency */}
          <div className="mb-8 bg-white rounded-sm border-l-4 border-primary-900 p-8 shadow-md">
            <h3 className="text-2xl font-light text-primary-900 mb-4">Efektywność Energetyczna</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Nowe budynki są zbudowane z myślą o maksymalnej efektywności energetycznej. Nowoczesne materiały, okna i systemy HVAC zmniejszają rachunki za energię o 20-30% w porównaniu ze starymi budynkami.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-warm-50 rounded-sm p-6 border border-accent-200">
                <h4 className="text-lg font-light text-primary-900 mb-4">Izolacja Termiczna</h4>
                <p className="text-gray-700 text-sm mb-4">
                  Ściany o grubości 30+ cm, nowoczesne okna z foldorem termicznym, izolacyjne sufity.
                </p>
                <p className="text-accent-500 font-light">Oszczędność: do 25%</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-accent-200">
                <h4 className="text-lg font-light text-primary-900 mb-4">Systemy HVAC</h4>
                <p className="text-gray-700 text-sm mb-4">
                  Klimatyzacja ze sterowaniem termostat, wentylacja z odzyskiem ciepła, systemy automatyczne.
                </p>
                <p className="text-accent-500 font-light">Oszczędność: do 30%</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-accent-200">
                <h4 className="text-lg font-light text-primary-900 mb-4">Oświetlenie LED</h4>
                <p className="text-gray-700 text-sm mb-4">
                  Oświetlenie LED w całym budynku, czujniki ruchu, automatyka światła.
                </p>
                <p className="text-accent-500 font-light">Oszczędność: do 80%</p>
              </div>
            </div>
          </div>

          {/* Modern Systems */}
          <div className="mb-8 bg-white rounded-sm border-l-4 border-warm-400 p-8 shadow-md">
            <h3 className="text-2xl font-light text-primary-900 mb-4">Nowoczesne Systemy i Infrastruktura</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Nowe budynki mają najnowsze technologie i systemy, które starsze nieruchomości nie posiadają lub posiadają w złym stanie.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-primary-900 text-white rounded-sm p-6">
                <h4 className="text-lg font-light text-accent-500 mb-4">Infrastruktura Elektryczna</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span>Nowoczesne przewody i bezpieczniki</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span>Urządzenia do zarządzania energią</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span>Sieć do paneli słonecznych (opcja)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span>Ochrona przepięciowa</span>
                  </li>
                </ul>
              </div>
              <div className="bg-primary-900 text-white rounded-sm p-6">
                <h4 className="text-lg font-light text-accent-500 mb-4">Instalacja Hydrauliczna</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span>Nowoczesne rury (miedziane, PEX)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span>Systemy filtracji wody</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span>Urządzenia oszczędzające wodę</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span>Rozdzielacze jednorurowe</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Safety Standards */}
          <div className="mb-8 bg-white rounded-sm border-l-4 border-accent-500 p-8 shadow-md">
            <h3 className="text-2xl font-light text-primary-900 mb-4">Normy Bezpieczeństwa Sejsmicznego</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Wszystkie nowe budynki w Hiszpanii muszą spełniać najnowsze normy budowlane, w tym normy sejsmiczne (Norma NCSE-02 i nowsze). Budynki wybudowane przed 2002 rokiem mogą nie spełniać tych norm.
            </p>
            <div className="bg-primary-900 text-white rounded-sm p-6 mb-6">
              <h4 className="text-lg font-light text-accent-500 mb-4">Bezpieczeństwo Sejsmiczne:</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold mb-2">1998</p>
                  <p className="text-sm">Norma poprzednia (NCSE-94)</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold mb-2">2002</p>
                  <p className="text-sm">Nowa norma (NCSE-02)</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold mb-2">2015+</p>
                  <p className="text-sm">Obecna norma (NCSE-02 zaktualizowana)</p>
                </div>
              </div>
            </div>
            <p className="text-gray-700">
              Nowe budynki mają konstrukcję zaprojektowaną w oparciu o najnowsze przepisy, co zapewnia większe bezpieczeństwo w przypadku trzęsienia ziemi.
            </p>
          </div>

          {/* Customization */}
          <div className="mb-8 bg-white rounded-sm border-l-4 border-primary-900 p-8 shadow-md">
            <h3 className="text-2xl font-light text-primary-900 mb-4">Dostosowanie do Preferencji</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Jeśli kupisz nowy budynek przed ukończeniem budowy, możesz dostosować go do swoich preferencji. To jest idealna okazja do stworzenia domu swojego marzenia.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-warm-50 rounded-sm p-6 border border-accent-200">
                <h4 className="text-lg font-light text-primary-900 mb-4">Co Możesz Dostosować:</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">•</span>
                    <span>Kolory ścian i podłogi</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">•</span>
                    <span>Materiały wykończeniowe</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">•</span>
                    <span>Rozmieszczenie pokoi (ścianki działowe)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">•</span>
                    <span>Domowe urządzenia (lodówka, zmywarka)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">•</span>
                    <span>Oświetlenie i oprawy</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold">•</span>
                    <span>Drzwi wewnętrzne i zewnętrzne</span>
                  </li>
                </ul>
              </div>
              <div className="bg-accent-100 rounded-sm p-6 text-primary-900">
                <h4 className="text-lg font-light mb-4">Proces Dostosowania:</h4>
                <ol className="space-y-3 text-sm">
                  <li className="flex space-x-3">
                    <span className="text-accent-500 font-bold min-w-8">1.</span>
                    <span>Zapoznaj się z projektem nieruchomości</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-accent-500 font-bold min-w-8">2.</span>
                    <span>Złóż wniosek o zmianach u konstruktora</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-accent-500 font-bold min-w-8">3.</span>
                    <span>Zatwierdź koszty dodatkowych zmian</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-accent-500 font-bold min-w-8">4.</span>
                    <span>Obserwuj budowę i zatwierdzaj zmiany</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Appreciation */}
          <div className="mb-8 bg-white rounded-sm border-l-4 border-warm-400 p-8 shadow-md">
            <h3 className="text-2xl font-light text-primary-900 mb-4">Wzrost Wartości Nieruchomości</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Nowe nieruchomości zwykle zyskują na wartości szybciej niż stare w pierwszych latach. To wynika ze wzrostu popytu na nowe nieruchomości i zmian na rynku nieruchomości.
            </p>
            <div className="bg-primary-900 text-white rounded-sm p-6">
              <h4 className="text-lg font-light text-accent-500 mb-6">Prognozowany Wzrost Wartości na Costa Blanca:</h4>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm font-light mb-2">Rok 1</p>
                  <p className="text-2xl font-bold text-accent-500">+3%</p>
                </div>
                <div>
                  <p className="text-sm font-light mb-2">Rok 3</p>
                  <p className="text-2xl font-bold text-accent-500">+8%</p>
                </div>
                <div>
                  <p className="text-sm font-light mb-2">Rok 5</p>
                  <p className="text-2xl font-bold text-accent-500">+15%</p>
                </div>
                <div>
                  <p className="text-sm font-light mb-2">Rok 10</p>
                  <p className="text-2xl font-bold text-accent-500">+35-50%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Porównanie: Nowy Budynek vs Stary</h2>
          <div className="overflow-x-auto bg-white rounded-sm shadow-md border border-accent-200">
            <table className="w-full">
              <thead>
                <tr className="bg-primary-900 text-white border-b border-accent-500">
                  <th className="px-6 py-4 text-left font-light">Aspekt</th>
                  <th className="px-6 py-4 text-left font-light">Nowy Budynek</th>
                  <th className="px-6 py-4 text-left font-light">Stary Budynek</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Gwarancja</td>
                  <td className="px-6 py-4 text-accent-500">10 lat</td>
                  <td className="px-6 py-4 text-gray-600">Brak</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50 bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Koszty Napraw</td>
                  <td className="px-6 py-4 text-accent-500">Minimalne</td>
                  <td className="px-6 py-4 text-gray-600">Wysokie (5-10k EUR/rok)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Efektywność Energii</td>
                  <td className="px-6 py-4 text-accent-500">Wysoka (-30%)</td>
                  <td className="px-6 py-4 text-gray-600">Niska</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50 bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Systemy Elektryczne</td>
                  <td className="px-6 py-4 text-accent-500">Nowoczesne</td>
                  <td className="px-6 py-4 text-gray-600">Starsze (may need upgrade)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Bezpieczeństwo Sejsmiczne</td>
                  <td className="px-6 py-4 text-accent-500">Wysoki standard</td>
                  <td className="px-6 py-4 text-gray-600">Niegwaran Towany</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50 bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Dostosowanie</td>
                  <td className="px-6 py-4 text-accent-500">Pełne</td>
                  <td className="px-6 py-4 text-gray-600">Limitowane</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Wzrost Wartości</td>
                  <td className="px-6 py-4 text-accent-500">5-8% rocznie</td>
                  <td className="px-6 py-4 text-gray-600">2-3% rocznie</td>
                </tr>
                <tr className="hover:bg-warm-50 bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Wdzielenie Kredytu</td>
                  <td className="px-6 py-4 text-accent-500">Do 90%</td>
                  <td className="px-6 py-4 text-gray-600">Do 80%</td>
                </tr>
              </tbody>
            </table>
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
          <h2 className="text-3xl font-light mb-4">Interesują Cię Nowe Nieruchomości?</h2>
          <p className="text-lg mb-8 text-warm-100">
            Nasza porfolio zawiera wiele nowoczesnych nieruchomości na Costa Blanca. Skontaktuj się z nami, aby poznać nasze aktualne oferty.
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
            <Link href="https://newbuildhomescostablanca.com/pl/guides/pod-klucz-vs-plan" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Pod Klucz vs Plan</h3>
              <p className="text-sm text-gray-600">Porównanie typów nieruchomości</p>
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
