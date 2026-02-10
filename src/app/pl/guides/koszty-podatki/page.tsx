import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Koszty i Podatki przy Zakupie Nieruchomości - Przewodnik',
  description: 'Kompletny przewodnik po kosztach i podatkach związanych z zakupem nieruchomości w Hiszpanii. Dowiedz się o ITP, opłatach notarialnych i opłatach rejestracyjnych.',
  alternates: {
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/costs-taxes',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/kostnader-skatter',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/kosten-belasting',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/kosten-belasting',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/frais-impots',
      'no': 'https://newbuildhomescostablanca.com/no/guides/kostnader-skatt',
      'de': 'https://newbuildhomescostablanca.com/de/guides/kosten-steuern',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides/koszty-podatki',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides/rashody-nalogi',
      'x-default': 'https://newbuildhomescostablanca.com/guides/costs-taxes',
    },
  },
};

const breadcrumbs = [
  { name: 'Strona główna', url: 'https://newbuildhomescostablanca.com/pl' },
  { name: 'Przewodniki', url: 'https://newbuildhomescostablanca.com/pl/guides' },
  { name: 'Koszty i Podatki', url: 'https://newbuildhomescostablanca.com/pl/guides/koszty-podatki' },
];

const faqs = [
  {
    question: 'Ile wynoszą całkowite koszty zakupu nieruchomości?',
    answer: 'Całkowite koszty zakupu zwykle wynoszą 8-10% ceny nieruchomości. Wchodzą w to: podatek transferu nieruchomości (ITP) 6-11%, opłaty notarialne 0.5-1%, opłaty rejestracyjne 0.1-0.5%, opłaty agenta nieruchomości 5-6%. Na przykład, przy zakupie nieruchomości za 300 000 EUR, spodziewaj się dodatkowych kosztów około 24 000-30 000 EUR.',
  },
  {
    question: 'Co to jest podatek ITP?',
    answer: 'ITP (Impuesto sobre Transmisiones Patrimoniales) to podatek od transferu nieruchomości płacony przez kupującego. Stawka wynosi 6-11% w zależności od autonomii (regionu) w Hiszpanii. Na Costa Blanca (Valencja, Alicante, Murcia) stawka wynosi zazwyczaj 7-8%. Jest to obowiązkowy podatek, który nie można uniknąć.',
  },
  {
    question: 'Czy muszę zapłacić opłatę agentowi nieruchomości?',
    answer: 'Opłata agenta nieruchomości wynosi zazwyczaj 5-6% ceny nieruchomości i jest zwykle dzielona między sprzedawcę i kupującego (3-3%). Czasami sprzedawca płaci całą opłatę, ale musisz się tego upewnić przed podpisaniem umowy. Ta opłata nie jest obowiązkowa, jeśli kupujesz bezpośrednio od właściciela.',
  },
  {
    question: 'Jakie są koszty notarialne?',
    answer: 'Opłaty notarialne wynoszą zazwyczaj 0.5-1% ceny nieruchomości. Notariusz publiczny przygotowuje i poświadcza umowę sprzedaży (escritura). Opłaty są regulowane przez prawo i mogą się różnić w zależności od notariusza. Są to koszty obowiązkowe, które nie można uniknąć.',
  },
  {
    question: 'Ile kosztuje rejestracja w Katastro?',
    answer: 'Opłata za rejestrację w Katastro wynosi zazwyczaj 0.1-0.5% ceny nieruchomości. Jest to opłata administracyjna za zarejestrowanie nieruchomości na Twoje nazwisko w rejestrze gruntów. Opłata jest obowiązkowa i musi być zapłacona do 30 dni od zawarcia umowy notarialnej.',
  },
  {
    question: 'Czy muszę zapłacić podatek plusvalia?',
    answer: 'Podatek plusvalia (plusvalía municipal) jest podatkiem, który płaci sprzedawca za zysk z wznowienia wartości nieruchomości. Jednak jako kupujący, możesz być zmuszony do jego zapłacenia, jeśli sprzedawca tego nie zrobi. Podatek wynosi zwykle 3-5% wzrostu wartości nieruchomości od ostatniego transferu.',
  },
  {
    question: 'Czy mogę odliczyć podatek VAT od nieruchomości?',
    answer: 'Nie, VAT nie jest stosowany do starych nieruchomości. Jednak dla nowych nieruchomości (wybudowanych w ciągu 3 lat), developer może dodać VAT (21%) do ceny. W takim przypadku, jeśli nieruchomość jest używana jako główne miejsce zamieszkania, możesz być uprawniony do zwrotu VAT, ale jest to złożone i wymaga konsultacji z doradcą podatkowym.',
  },
  {
    question: 'Czy są jakieś dodatkowe koszty, które powinienem znać?',
    answer: 'Tak, mogą być również koszty takie jak: inspekcja budynku (300-1000 EUR), opłata za raport bezpieczeństwa (50-200 EUR), opłaty za badanie tytułu (100-400 EUR), opłaty za wniosek o NIE (bezpłatne), transfery bankowe (10-50 EUR), ubezpieczenie nieruchomości (jeśli ubiąć hipotekę), opłaty hipoteczne (0.5-1% kwoty pożyczki). Zawsze poproś doradcę, aby przygotował szczegółową listę kosztów dla konkretnej nieruchomości.',
  },
];

export default function KosztyPodatkiPage() {
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
            Koszty i Podatki przy Zakupie Nieruchomości
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Kompletny przewodnik po wszystkich kosztach i podatkach związanych z zakupem nieruchomości na Costa Blanca. Poznaj wszystkie wymagane płatności przed podpisaniem umowy.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-12 bg-white rounded-sm border-l-4 border-accent-500 p-6 shadow-md">
          <h2 className="text-3xl font-light text-primary-900 mb-4">Przegląd Kosztów</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Zakup nieruchomości w Hiszpanii wiąże się z wieloma kosztami oprócz samej ceny nieruchomości. Ważne jest zrozumienie wszystkich opłat, aby móc dokładnie zaplanować budżet.
          </p>
          <div className="bg-warm-50 rounded-sm p-6 border border-accent-200 mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-accent-500">8-10%</p>
                <p className="text-gray-700 font-light">Całkowite koszty dodatkowe</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-900">7-8%</p>
                <p className="text-gray-700 font-light">Podatek ITP</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent-500">5-6%</p>
                <p className="text-gray-700 font-light">Opłata agenta</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Breakdown */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Szczegółowy Przegląd Kosztów</h2>

          {/* Tax ITP */}
          <div className="mb-8 bg-white rounded-sm border-l-4 border-accent-500 p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-light text-primary-900">Podatek ITP (Impuesto sobre Transmisiones Patrimoniales)</h3>
              <span className="bg-accent-500 text-white px-4 py-2 rounded-sm font-light">6-11%</span>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              ITP to główny podatek, który płaci kupujący za zakup nieruchomości. Jest obliczany na podstawie wartości nieruchomości (w oparciu o faktyczną cenę sprzedaży) i jest obowiązkowy.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-light text-primary-900 mb-4">Stawki na Costa Blanca:</h4>
                <div className="space-y-3">
                  <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
                    <p className="font-light text-primary-900">Valencja:</p>
                    <p className="text-xl font-bold text-accent-500">7%</p>
                  </div>
                  <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
                    <p className="font-light text-primary-900">Murcia:</p>
                    <p className="text-xl font-bold text-accent-500">7%</p>
                  </div>
                  <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
                    <p className="font-light text-primary-900">Alicante:</p>
                    <p className="text-xl font-bold text-accent-500">7%</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-light text-primary-900 mb-4">Przykład Obliczenia:</h4>
                <div className="bg-primary-900 text-white rounded-sm p-6">
                  <p className="mb-4">Cena nieruchomości: 300 000 EUR</p>
                  <p className="mb-4">Stawka ITP: 7%</p>
                  <p className="border-t border-accent-500 pt-4 font-bold text-lg">
                    ITP do zapłaty: 21 000 EUR
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-accent-100 rounded-sm p-4 text-primary-900">
              <p className="font-light">
                ITP musi być zapłacony przed zawarciu umowy notarialnej. Zwykle rozliczony z Urzędem Skarbowym (Agencia Tributaria).
              </p>
            </div>
          </div>

          {/* Notary Fees */}
          <div className="mb-8 bg-white rounded-sm border-l-4 border-primary-900 p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-light text-primary-900">Opłaty Notarialne</h3>
              <span className="bg-primary-900 text-white px-4 py-2 rounded-sm font-light">0.5-1%</span>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Notariusz publiczny przygotowuje i poświadcza umowę sprzedaży (escritura de compraventa). Opłaty są regulowane przez prawo i są obowiązkowe.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-warm-50 rounded-sm p-6 border border-accent-200">
                <h4 className="text-lg font-light text-primary-900 mb-4">Usługi Notariusza:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Przygotowanie umowy sprzedaży (escritura)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Weryfikacja tożsamości stron</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Poświadczenie podpisów</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Przesłanie dokumentów do Katastro</span>
                  </li>
                </ul>
              </div>
              <div className="bg-primary-900 text-white rounded-sm p-6">
                <h4 className="text-lg font-light text-accent-500 mb-4">Szacunkowe Opłaty:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-accent-500 pb-2">
                    <span>Przygotowanie umowy:</span>
                    <span className="font-bold">200-400 EUR</span>
                  </div>
                  <div className="flex justify-between border-b border-accent-500 pb-2">
                    <span>Poświadczenie:</span>
                    <span className="font-bold">150-300 EUR</span>
                  </div>
                  <div className="flex justify-between border-b border-accent-500 pb-2">
                    <span>Przesłanie do Katastro:</span>
                    <span className="font-bold">100-200 EUR</span>
                  </div>
                  <div className="flex justify-between pt-2 font-bold">
                    <span>Razem:</span>
                    <span>450-900 EUR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Fees */}
          <div className="mb-8 bg-white rounded-sm border-l-4 border-warm-400 p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-light text-primary-900">Opłaty Rejestracyjne (Katastro)</h3>
              <span className="bg-warm-400 text-white px-4 py-2 rounded-sm font-light">0.1-0.5%</span>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Opłata za rejestrację nieruchomości na Twoje nazwisko w rejestrze gruntów (Registro de la Propiedad). Jest to obowiązkowa administracyjna opłata.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-light text-primary-900 mb-4">Procedura Rejestracji:</h4>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex space-x-3">
                    <span className="text-accent-500 font-bold min-w-8">1.</span>
                    <span>Notariusz przesyła dokumenty do Katastro</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-accent-500 font-bold min-w-8">2.</span>
                    <span>Katastro weryfikuje dokumenty</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-accent-500 font-bold min-w-8">3.</span>
                    <span>Opłata rejestracyjna jest obliczana</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-accent-500 font-bold min-w-8">4.</span>
                    <span>Nieruchomość jest zarejestrowana</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-accent-500 font-bold min-w-8">5.</span>
                    <span>Otrzymujesz nowy wpis z Katastro</span>
                  </li>
                </ol>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-accent-200">
                <h4 className="text-lg font-light text-primary-900 mb-4">Szacunkowe Opłaty:</h4>
                <div className="space-y-3">
                  <div className="text-gray-700 mb-4">
                    <p className="font-light mb-2">Nieruchomość za 300 000 EUR:</p>
                    <p className="text-2xl font-bold text-accent-500">300-1500 EUR</p>
                  </div>
                  <div className="text-gray-700">
                    <p className="font-light mb-2">Rejestracja hipoteki:</p>
                    <p className="text-2xl font-bold text-accent-500">100-500 EUR</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Commission */}
          <div className="mb-8 bg-white rounded-sm border-l-4 border-accent-500 p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-light text-primary-900">Opłata Agenta Nieruchomości</h3>
              <span className="bg-accent-500 text-white px-4 py-2 rounded-sm font-light">3-6%</span>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Opłata agenta nieruchomości wynosi zazwyczaj 5-6% ceny nieruchomości. Zwykle dzielona jest między sprzedawcę i kupującego (3-3%), ale musisz się upewnić przed podpisaniem umowy.
            </p>
            <div className="bg-primary-900 text-white rounded-sm p-6 mb-6">
              <h4 className="text-lg font-light text-accent-500 mb-4">Jak Działa Podziały Opłat:</h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-3">Typowy podział:</p>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Sprzedawca płaci:</span>
                      <span className="font-bold">3%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Kupujący płaci:</span>
                      <span className="font-bold">3%</span>
                    </li>
                    <li className="flex justify-between font-bold border-t border-accent-500 pt-2">
                      <span>Razem:</span>
                      <span>6%</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="mb-3">Przykład na 300 000 EUR:</p>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Opłata sprzedawcy:</span>
                      <span className="font-bold">9 000 EUR</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Opłata kupującego:</span>
                      <span className="font-bold">9 000 EUR</span>
                    </li>
                    <li className="flex justify-between font-bold border-t border-accent-500 pt-2">
                      <span>Razem:</span>
                      <span>18 000 EUR</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-gray-700">
              Ta opłata nie jest obowiązkowa, jeśli kupujesz bezpośrednio od właściciela bez pośrednika. Czasami sprzedawca płaci całą opłatę, negocjuj to przed podpisaniem umowy przedwstępnej.
            </p>
          </div>

          {/* Other Costs */}
          <div className="mb-8 bg-white rounded-sm border-l-4 border-primary-900 p-8 shadow-md">
            <h3 className="text-2xl font-light text-primary-900 mb-6">Pozostałe Koszty</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
                  <h4 className="text-lg font-light text-primary-900 mb-2">Inspekcja Budynku</h4>
                  <p className="text-gray-700 text-sm">300-1000 EUR</p>
                  <p className="text-gray-600 text-xs mt-2">Profesjonalna ocena stanu nieruchomości</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
                  <h4 className="text-lg font-light text-primary-900 mb-2">Raport Bezpieczeństwa</h4>
                  <p className="text-gray-700 text-sm">50-200 EUR</p>
                  <p className="text-gray-600 text-xs mt-2">Raport dotyczący ochrony i bezpieczeństwa budynku</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
                  <h4 className="text-lg font-light text-primary-900 mb-2">Badanie Tytułu</h4>
                  <p className="text-gray-700 text-sm">100-400 EUR</p>
                  <p className="text-gray-600 text-xs mt-2">Weryfikacja własności i obciążeń nieruchomości</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
                  <h4 className="text-lg font-light text-primary-900 mb-2">Transfery Bankowe</h4>
                  <p className="text-gray-700 text-sm">10-50 EUR</p>
                  <p className="text-gray-600 text-xs mt-2">Opłaty za transfery międzynarodowe</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
                  <h4 className="text-lg font-light text-primary-900 mb-2">Ubezpieczenie Nieruchomości</h4>
                  <p className="text-gray-700 text-sm">200-800 EUR/rok</p>
                  <p className="text-gray-600 text-xs mt-2">Obowiązkowe, jeśli masz hipotekę</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
                  <h4 className="text-lg font-light text-primary-900 mb-2">Opłaty Hipoteczne</h4>
                  <p className="text-gray-700 text-sm">0.5-1% kwoty pożyczki</p>
                  <p className="text-gray-600 text-xs mt-2">Opłaty zatwierdzenia hipoteki</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
                  <h4 className="text-lg font-light text-primary-900 mb-2">Podatek Plusvalia</h4>
                  <p className="text-gray-700 text-sm">3-5% wzrostu wartości</p>
                  <p className="text-gray-600 text-xs mt-2">Zazwyczaj płacony przez sprzedawcę</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
                  <h4 className="text-lg font-light text-primary-900 mb-2">Doradztwo Prawne</h4>
                  <p className="text-gray-700 text-sm">500-2000 EUR</p>
                  <p className="text-gray-600 text-xs mt-2">Konsultacja z adwokatem lub doradcą podatkowym</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example Calculation */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Przykład Obliczenia Kosztów</h2>
          <div className="bg-white rounded-sm border border-accent-200 shadow-md overflow-hidden">
            <div className="bg-primary-900 text-white p-6">
              <h3 className="text-2xl font-light text-accent-500 mb-2">Nieruchomość za 300 000 EUR - Przykład</h3>
              <p className="text-warm-100">Zawieranie umowy notarialnej na Costa Blanca (Valencja)</p>
            </div>
            <div className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody className="space-y-4">
                    <tr className="border-b border-gray-200">
                      <td className="py-4 text-gray-700">Cena nieruchomości:</td>
                      <td className="py-4 text-right font-bold text-primary-900">300 000 EUR</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-warm-50">
                      <td className="py-4 text-gray-700">Podatek ITP (7%):</td>
                      <td className="py-4 text-right font-bold text-accent-500">21 000 EUR</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 text-gray-700">Opłaty notarialne:</td>
                      <td className="py-4 text-right font-bold text-primary-900">650 EUR</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-warm-50">
                      <td className="py-4 text-gray-700">Opłaty rejestracyjne:</td>
                      <td className="py-4 text-right font-bold text-accent-500">900 EUR</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 text-gray-700">Opłata agenta (3%):</td>
                      <td className="py-4 text-right font-bold text-primary-900">9 000 EUR</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-warm-50">
                      <td className="py-4 text-gray-700">Inspekcja budynku:</td>
                      <td className="py-4 text-right font-bold text-accent-500">500 EUR</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 text-gray-700">Badanie tytułu:</td>
                      <td className="py-4 text-right font-bold text-primary-900">250 EUR</td>
                    </tr>
                    <tr className="bg-primary-900 text-white">
                      <td className="py-4 text-lg font-light">Razem koszty dodatkowe:</td>
                      <td className="py-4 text-right text-lg font-bold text-accent-500">32 300 EUR</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-lg font-light text-gray-700">Procent ceny nieruchomości:</td>
                      <td className="py-4 text-right text-lg font-bold text-primary-900">10.8%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Harmonogram Płatności Kosztów</h2>
          <div className="space-y-4">
            {[
              {
                stage: 'Umowa Przedwstępna',
                timing: 'Bezpośrednio po podpisaniu umowy',
                costs: ['Zadatek (3-10% ceny)', 'Opłata agenta (jeśli dotyczy)'],
              },
              {
                stage: 'Przed Umową Notarialną',
                timing: '2-4 tygodnie przed podpisaniem',
                costs: ['Podatek ITP', 'Opłaty za inspekcję', 'Badanie tytułu'],
              },
              {
                stage: 'Dzień Umowy Notarialnej',
                timing: 'Dzień podpisania umowy',
                costs: ['Opłaty notarialne', 'Pozostała część ceny nieruchomości', 'Pozostała opłata agenta'],
              },
              {
                stage: 'Po Umowie Notarialnej',
                timing: '2-4 tygodnie po podpisaniu',
                costs: ['Opłaty rejestracyjne (Katastro)', 'Opłaty hipoteczne (jeśli dotyczy)'],
              },
              {
                stage: 'Finalizacja',
                timing: 'Po rejestracji w Katastro',
                costs: ['Ubezpieczenie nieruchomości', 'Pozostałe koszty administracyjne'],
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-sm border border-accent-200 p-6 shadow-md hover:shadow-lg transition">
                <div className="flex items-start space-x-4">
                  <div className="bg-accent-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-light text-primary-900 mb-2">{item.stage}</h3>
                    <p className="text-accent-500 text-sm font-light mb-3">{item.timing}</p>
                    <div className="space-y-1">
                      {item.costs.map((cost, costIndex) => (
                        <p key={costIndex} className="text-gray-700 text-sm">- {cost}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
          <h2 className="text-3xl font-light mb-4">Potrzebujesz Pomocy z Obliczeniem Kosztów?</h2>
          <p className="text-lg mb-8 text-warm-100">
            Nasz zespół specjalistów może pomóc Ci dokładnie obliczyć wszystkie koszty dla Twojej konkretnej nieruchomości.
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
              <p className="text-sm text-gray-600">Kompletny przewodnik po procesie zakupu</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/numer-nie" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Numer NIE</h3>
              <p className="text-sm text-gray-600">Jak uzyskać numer identyfikacyjny</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/kredyt-hipoteczny" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Kredyt Hipoteczny</h3>
              <p className="text-sm text-gray-600">Przewodnik po hipotekach</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/dlaczego-nowy-budynek" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Dlaczego Nowy Budynek</h3>
              <p className="text-sm text-gray-600">Korzyści nowych nieruchomości</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/pod-klucz-vs-plan" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Pod Klucz vs Plan</h3>
              <p className="text-sm text-gray-600">Porównanie rodzajów nieruchomości</p>
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
