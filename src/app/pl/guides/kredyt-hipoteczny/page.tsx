import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Kredyt Hipoteczny w Hiszpanii - Kompletny Przewodnik',
  description: 'Przewodnik po kredytach hipotecznych dla obywateli zagranicznych w Hiszpanii. Dowiedz się o typach kredytów, oprocentowaniu i warunkach udzielania.',
  alternates: {
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/mortgages',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/bolan-spanien',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/hypotheek',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/hypotheek',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/hypotheque',
      'no': 'https://newbuildhomescostablanca.com/no/guides/boliglan',
      'de': 'https://newbuildhomescostablanca.com/de/guides/hypothek',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides/kredyt-hipoteczny',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides/ipoteka',
      'x-default': 'https://newbuildhomescostablanca.com/guides/mortgages',
    },
  },
};

const breadcrumbs = [
  { name: 'Strona główna', url: 'https://newbuildhomescostablanca.com/pl' },
  { name: 'Przewodniki', url: 'https://newbuildhomescostablanca.com/pl/guides' },
  { name: 'Kredyt Hipoteczny', url: 'https://newbuildhomescostablanca.com/pl/guides/kredyt-hipoteczny' },
];

const faqs = [
  {
    question: 'Czy obywatele zagraniczny mogą uzyskać hipotekę w Hiszpanii?',
    answer: 'Tak, obywatele zagraniczni mogą uzyskać hipotekę w Hiszpanii pod pewnymi warunkami. Musisz mieć numer NIE, otwarte konto bankowe w Hiszpanii, i być w stanie wykazać stały dochód. Niektóre banki mogą wymagać dodatkowych dokumentów dla obywateli zagranicznych.',
  },
  {
    question: 'Jaka jest maksymalna kwota hipoteki, którą mogę uzyskać?',
    answer: 'Maksymalnie możesz uzyskać 80% wartości nieruchomości. Dla nowych nieruchomości niektóre banki oferują do 90%, ale jest to rzadkie. Kwota zależy również od Twojego dochodów i zdolności płatniczej. Aby obliczyć maksymalną kwotę, banki zwykle sprawdzają, czy rata hipoteki nie przekracza 30-40% Twojego miesięcznego dochodu.',
  },
  {
    question: 'Jakie są średnie oprocentowanie hipoteki w Hiszpanii?',
    answer: 'Średnie oprocentowanie hipoteki w Hiszpanii wynosi 3-4% dla kredytów zmiennych (Euribor + marża banku) i 3.5-4.5% dla stałych. Oprocentowanie zmienia się wraz ze zmianą stawki referencyjnej (Euribor). Zawsze poproś bank o szczegółowe informacje dotyczące oprocentowania.',
  },
  {
    question: 'Ile czasu zajmuje zatwierdzenie hipoteki?',
    answer: 'Zatwierdzenie hipoteki zwykle zajmuje 2-4 tygodnie. Proces zależy od szybkości przygotowania dokumentów i oceny banku. Ważne jest, aby złożyć wniosek jak najszybciej po zawarciu umowy przedwstępnej, ponieważ hipoteka jest zwykle warunkowana w umowie przedwstępnej.',
  },
  {
    question: 'Jakie dokumenty potrzebuję, aby uzyskać hipotekę?',
    answer: 'Będziesz potrzebować: paszportu lub dowodu tożsamości, numeru NIE, ostatnich 3 miesięcy wyciągów bankowych, sprawozdania finansowego (si pracujesz), umowy o pracę lub zaświadczenia od pracodawcy, zeznania podatkowego (za ostatnie 2 lata), appraisal nieruchomości (ocena wartości), kopii umowy przedwstępnej, oraz ubezpieczenia nieruchomości.',
  },
  {
    question: 'Co to jest Euribor i jak wpływa na moją hipotekę?',
    answer: 'Euribor to europejska stopa referencyjna dla kredytów zmiennych. Twoja stawka hipoteki = Euribor + marża banku. Na przykład, jeśli Euribor wynosi 4%, a marża banku 0.5%, Twoja stawka wyniesie 4.5%. Euribor zmienia się co miesiąc, więc Twoja rata może się zmieniać, chyba że masz kredyt ze stałym oprocentowaniem.',
  },
  {
    question: 'Czy mogę zmienić hipotekę na inną, jeśli oprocentowanie będzie niższe?',
    answer: 'Tak, możesz subrogować hipotekę na inny bank, jeśli oprocentowanie będzie niższe. Proces jest prosty i zazwyczaj zajmuje 2-3 tygodnie. Musisz zapłacić małe opłaty dla nowego banku, ale mogą być mniejsze niż różnica w oprocentowaniu. Zawsze sprawdź warunki z nowymi bankami przed subrogacją.',
  },
  {
    question: 'Co to jest hipoteka ze stałym oprocentowaniem a co to zmienne?',
    answer: 'Hipoteka ze stałym oprocentowaniem ma oprocentowanie, które się nie zmienia przez cały okres kredytu. Jest bardziej bezpieczna, ale zwykle droższa. Hipoteka ze zmiennym oprocentowaniem ma oprocentowanie, które zmienia się wraz z Euriborem, co może być taniej, ale bardziej ryzykowane. Wybór zależy od Twojej sytuacji finansowej i tolerancji ryzyka.',
  },
];

export default function KredytHipotecznyPage() {
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
            Kredyt Hipoteczny w Hiszpanii
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Kompletny przewodnik po kredytach hipotecznych dla obywateli zagranicznych kupujących nieruchomości na Costa Blanca. Dowiedz się o typu kredytów, oprocentowaniu i procesie uzyskania finansowania.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-12 bg-white rounded-sm border-l-4 border-accent-500 p-6 shadow-md">
          <h2 className="text-3xl font-light text-primary-900 mb-4">Dlaczego Hipoteka jest Ważna</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Dla większości kupujących hipoteka jest konieczna do sfinansowania zakupu nieruchomości. Hipoteka to pożyczka zabezpieczona nieruchomością, którą chcesz kupić. Pozwala to na rozłożenie wpłaty na lata i zmniejszenie sumy, którą musisz zapłacić z własnych oszczędności.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
              <p className="text-2xl font-bold text-accent-500 mb-2">80%</p>
              <p className="text-gray-700 font-light">Maksymalnie kwoty nieruchomości</p>
            </div>
            <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
              <p className="text-2xl font-bold text-accent-500 mb-2">3-4%</p>
              <p className="text-gray-700 font-light">Średnie oprocentowanie</p>
            </div>
            <div className="bg-warm-50 rounded-sm p-4 border border-accent-200">
              <p className="text-2xl font-bold text-accent-500 mb-2">2-4 tygodnie</p>
              <p className="text-gray-700 font-light">Czas zatwierdzenia</p>
            </div>
          </div>
        </section>

        {/* Types of Mortgages */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Typy Kredytów Hipotecznych</h2>

          {/* Fixed Rate */}
          <div className="mb-8 bg-white rounded-sm border-l-4 border-primary-900 p-8 shadow-md">
            <h3 className="text-2xl font-light text-primary-900 mb-4">Hipoteka ze Stałym Oprocentowaniem</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Oprocentowanie pozostaje stałe przez cały okres kredytu. Twoja rata hipoteki się nie zmienia, niezależnie od zmian na rynku.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-light text-primary-900 mb-4">Zalety:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">+</span>
                    <span>Przewidywalność - znasz dokładną ratę na lata</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">+</span>
                    <span>Bezpieczeństwo - brak ryzyka wzrostu rat</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">+</span>
                    <span>Łatwość planowania budżetu</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-light text-primary-900 mb-4">Wady:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">-</span>
                    <span>Zwykle wyższe oprocentowanie niż zmienne</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">-</span>
                    <span>Brak możliwości skorzystania z niższego oprocentowania</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">-</span>
                    <span>Wyższe koszty wcześniejszej spłaty</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Variable Rate */}
          <div className="mb-8 bg-white rounded-sm border-l-4 border-accent-500 p-8 shadow-md">
            <h3 className="text-2xl font-light text-primary-900 mb-4">Hipoteka ze Zmiennym Oprocentowaniem</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Oprocentowanie zmienia się co miesiąc w oparciu o Euribor (europejska stopa referencyjna). Rata hipoteki może się zmienić, ale zwykle jest niższa niż ze stałym oprocentowaniem.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-light text-primary-900 mb-4">Zalety:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">+</span>
                    <span>Zwykle niższe oprocentowanie</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">+</span>
                    <span>Możliwość skorzystania z spadku oprocentowania</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">+</span>
                    <span>Niższe koszty wcześniejszej spłaty</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-light text-primary-900 mb-4">Wady:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">-</span>
                    <span>Nieprzewidywalność - rata może się zmienić</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">-</span>
                    <span>Ryzyko wzrostu oprocentowania</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">-</span>
                    <span>Trudniejsze planowanie budżetu</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mixed Rate */}
          <div className="mb-8 bg-white rounded-sm border-l-4 border-warm-400 p-8 shadow-md">
            <h3 className="text-2xl font-light text-primary-900 mb-4">Hipoteka Mieszana (Hybrydowa)</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Kombinacja stałego i zmiennego oprocentowania. Na przykład, stały procent przez 3 lata, a następnie zmienny. To kompromis między bezpieczeństwem a niższym oprocentowaniem.
            </p>
            <div className="bg-warm-50 rounded-sm p-6 border border-accent-200">
              <p className="text-gray-700">
                Przykład: 3+3 (3 lata stałego + 3 lata zmiennego, powtarzane), lub 5+Euribor+marża.
              </p>
            </div>
          </div>
        </section>

        {/* Understanding the Rates */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Zrozumienie Oprocentowania</h2>
          <div className="bg-primary-900 text-white rounded-sm p-8 shadow-md">
            <h3 className="text-2xl font-light text-accent-500 mb-6">Jak Obliczane jest Oprocentowanie?</h3>
            <div className="bg-accent-500 text-primary-900 rounded-sm p-6 mb-6 font-light">
              <p className="text-xl mb-2">Twoja Stawka = Euribor + Marża Banku</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-accent-100 rounded-sm p-6 text-primary-900">
                <h4 className="text-lg font-light mb-4">Euribor (Euro Interbank Offered Rate)</h4>
                <p className="mb-3">Europejska stopa referencjna dla kredytów międzybankowych. Zmienia się codziennie w oparciu o rynek finansowy.</p>
                <p className="text-sm font-light">Obecny Euribor: ~4% (zmienia się)</p>
              </div>
              <div className="bg-accent-100 rounded-sm p-6 text-primary-900">
                <h4 className="text-lg font-light mb-4">Marża Banku</h4>
                <p className="mb-3">Zysk banku z pożyczki. Zwykle 0.3-1% w zależności od banku i Twojego profilu kredytowego.</p>
                <p className="text-sm font-light">Negocjuj marżę - dobrych klientów banki oferują niższe marże</p>
              </div>
            </div>
            <div className="bg-warm-50 rounded-sm p-6 border border-accent-500">
              <h4 className="text-lg font-light text-primary-900 mb-3">Przykład Obliczenia:</h4>
              <div className="space-y-2 text-primary-900">
                <div className="flex justify-between">
                  <span>Euribor:</span>
                  <span className="font-bold">4.0%</span>
                </div>
                <div className="flex justify-between">
                  <span>Marża banku:</span>
                  <span className="font-bold">0.6%</span>
                </div>
                <div className="flex justify-between border-t border-accent-500 pt-2 font-bold">
                  <span>Twoja stawka:</span>
                  <span>4.6%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mortgage Process */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Proces Uzyskania Hipoteki</h2>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Przygotowanie Dokumentów',
                description: 'Zbierz wymagane dokumenty: paszport, numer NIE, wyciągi bankowe, dowody dochodów, zeznania podatkowe itp.',
                time: '1-2 tygodnie',
              },
              {
                step: '2',
                title: 'Wybór Banku',
                description: 'Skontaktuj się z kilkoma bankami i porównaj ich oferty. Poproś o wstępną opinię o kredytowości (pre-aprobata).',
                time: '1-2 tygodnie',
              },
              {
                step: '3',
                title: 'Złożenie Wniosku',
                description: 'Złóż formalny wniosek o kredyt hipoteczny wraz ze wszystkimi wymaganymi dokumentami.',
                time: 'Bezpośrednio',
              },
              {
                step: '4',
                title: 'Wycena Nieruchomości',
                description: 'Bank zleca appraisal (wycenę) nieruchomości, aby ustalić jej wartość rynkową. Koszty około 300-600 EUR.',
                time: '1-2 tygodnie',
              },
              {
                step: '5',
                title: 'Weryfikacja i Ocena',
                description: 'Bank weryfikuje Twoją zdolność kredytową, sprawdza dokumenty finansowe i ocenia ryzyko.',
                time: '1-2 tygodnie',
              },
              {
                step: '6',
                title: 'Zatwierdzenie Warunkowe',
                description: 'Bank przyznaje warunkowe zatwierdzenie hipoteki, zazwyczaj warunkowane zawarciu umowy notarialnej.',
                time: '2-3 tygodnie',
              },
              {
                step: '7',
                title: 'Zawarcie Umowy Notarialnej',
                description: 'Podpisujesz umowę sprzedaży (escritura) u notariusza. Bank rejestruje hipotekę na nieruchomości.',
                time: 'Zaplanowany dzień',
              },
              {
                step: '8',
                title: 'Podpisanie Umowy Hipotecznej',
                description: 'Podpisujesz ostateczną umowę hipoteczną z bankiem, określającą warunki pożyczki.',
                time: '1-2 tygodnie',
              },
              {
                step: '9',
                title: 'Zatwierdzenie Ostateczne',
                description: 'Bank udziela ostatecznego zatwierdzenia i przygotowuje się do wypłaty środków.',
                time: '1 tydzień',
              },
              {
                step: '10',
                title: 'Wypłata Środków',
                description: 'Bank wypłaca środki hipoteki na konto rozliczeniowe. Możesz teraz dokonać ostatecznej płatności sprzedawcy.',
                time: 'Dzień umowy notarialnej',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-sm border border-accent-200 p-6 shadow-md hover:shadow-lg transition">
                <div className="flex items-start space-x-6">
                  <div className="bg-accent-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-light text-primary-900">{item.title}</h3>
                      <span className="text-sm text-accent-500 font-light">{item.time}</span>
                    </div>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Required Documents */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Wymagane Dokumenty</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-sm border border-accent-200 p-8 shadow-md">
              <h3 className="text-xl font-light text-primary-900 mb-6">Dokumenty Osobiste</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">Paszport lub dowód tożsamości</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">Numer NIE (lub zaświadczenie o wniosku)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">Dowód stałego adresu (rachunek za prąd, woda)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">Zaświadczenie o zarobkach (z Polski)</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-sm border border-accent-200 p-8 shadow-md">
              <h3 className="text-xl font-light text-primary-900 mb-6">Dokumenty Finansowe</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">3 ostatnie wyciągi bankowe</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">Zeznanie podatkowe (za 2 ostatnie lata)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">Umowa o pracę lub zaswiadczenie od pracodawcy</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">Informacja o zdolności kredytowej z banku</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-sm border border-accent-200 p-8 shadow-md">
              <h3 className="text-xl font-light text-primary-900 mb-6">Dokumenty Nieruchomości</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">Kopia umowy przedwstępnej (promesa)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">Appraisal (wycena) nieruchomości</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">Wpis z Katastro (registro de la propiedad)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">Certyfikat energetyczny budynku</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-sm border border-accent-200 p-8 shadow-md">
              <h3 className="text-xl font-light text-primary-900 mb-6">Ubezpieczenie i Opłaty</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">Polisa ubezpieczenia domu</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">Opłata za appraisal (300-600 EUR)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">Opłata za badanie tytułu</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span className="text-gray-700">Inne koszty administracyjne banku</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Top Banks */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Popularne Banki w Hiszpanii</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'BBVA (Banco Bilbao Vizcaya Argentaria)',
                description: 'Największy bank w Hiszpanii, oferuje konkurencyjne warunki dla obywateli zagranicznych',
                features: ['Szybkie zatwierdzenie', 'Wsparcie dla cudzoziemców', 'Niska marża'],
              },
              {
                name: 'CaixaBank',
                description: 'Drugi największy bank, zna się na finansowaniu nieruchomości na Costa Blanca',
                features: ['Doświadczenie', 'Dobre warunki', 'Elastyczne terminy'],
              },
              {
                name: 'Banco de Sabadell',
                description: 'Medialny bank, znany z dobrych warunków dla klientów zagranicznych',
                features: ['Personalne podejście', 'Konkurencyjne oprocentowanie', 'Szybki proces'],
              },
              {
                name: 'Bankia',
                description: 'Czwarty największy bank, dobry wybór dla inwestorów zagraniczych',
                features: ['Szerokie wsparcie', 'Dobrze zorganizowany', 'Solidne warunki'],
              },
            ].map((bank, index) => (
              <div key={index} className="bg-white rounded-sm border border-accent-200 p-6 shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-light text-primary-900 mb-2">{bank.name}</h3>
                <p className="text-gray-700 text-sm mb-4">{bank.description}</p>
                <div className="space-y-2">
                  {bank.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                      <span className="text-accent-500 font-bold">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
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
          <h2 className="text-3xl font-light mb-4">Potrzebujesz Pomocy z Hipoteką?</h2>
          <p className="text-lg mb-8 text-warm-100">
            Nasz zespół może pomóc Ci porównać oferty banków i wybrać najlepszy kredyt hipoteczny dla Twojej sytuacji.
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
              <p className="text-sm text-gray-600">Jak uzyskać numer identyfikacyjny</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/koszty-podatki" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Koszty i Podatki</h3>
              <p className="text-sm text-gray-600">Przegląd wszystkich kosztów</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/dlaczego-nowy-budynek" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Dlaczego Nowy Budynek</h3>
              <p className="text-sm text-gray-600">Korzyści nowych nieruchomości</p>
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
