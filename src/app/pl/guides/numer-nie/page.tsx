import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Numer NIE - Przewodnik po Numerze Identyfikacyjnym',
  description: 'Kompletny przewodnik po numerze NIE (Número de Identidad de Extranjero) dla obywateli zagranicznych kupujących nieruchomości w Hiszpanii.',
  alternates: {
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/nie-number',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/nie-nummer',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/nie-nummer',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/nie-nummer',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/nie',
      'no': 'https://newbuildhomescostablanca.com/no/guides/nie-nummer',
      'de': 'https://newbuildhomescostablanca.com/de/guides/nie-nummer',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides/numer-nie',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides/nomer-nie',
      'x-default': 'https://newbuildhomescostablanca.com/guides/nie-number',
    },
  },
};

const breadcrumbs = [
  { name: 'Strona główna', url: 'https://newbuildhomescostablanca.com/pl' },
  { name: 'Przewodniki', url: 'https://newbuildhomescostablanca.com/pl/guides' },
  { name: 'Numer NIE', url: 'https://newbuildhomescostablanca.com/pl/guides/numer-nie' },
];

const faqs = [
  {
    question: 'Co to jest numer NIE?',
    answer: 'NIE (Número de Identidad de Extranjero) to unikalny numer identyfikacyjny przydzielany obywatelom zagranicznym w Hiszpanii. Jest to dziewięciocyfrowy numer rozpoczynający się literą, a następnie osiem cyfr. Jest wymagany do otwierania kont bankowych, kupowania nieruchomości, zawierania umów i prowadzenia działalności gospodarczej.',
  },
  {
    question: 'Ile czasu zajmuje uzyskanie numeru NIE?',
    answer: 'Czas zależy od miejsca, w którym złożysz wniosek. Jeśli złożysz wniosek w konsulacie generalnym w Polsce, proces trwa zazwyczaj 3-6 tygodni. W Hiszpanii, jeśli złożysz wniosek osobiście w Comisaría Nacional de Policía, możesz otrzymać numer prawie natychmiast (w ciągu kilku dni). Notariusz może złożyć wniosek w Twoim imieniu w ciągu 2-4 tygodni.',
  },
  {
    question: 'Czy numer NIE jest bezpłatny?',
    answer: 'Tak, numer NIE jest całkowicie bezpłatny. Nie ma żadnych opłat za złożenie wniosku ani za wydanie numeru. Jeśli ktoś poprosi Cię o opłatę za numer NIE, to zwykle oszustwo. Jedyne koszty mogą być związane z opłatami za doradcę lub notariusza, jeśli zdecydujesz się na ich pomocą.',
  },
  {
    question: 'Czy mogę użyć numeru NIE natychmiast po jego uzyskaniu?',
    answer: 'Tak, możesz używać numeru NIE natychmiast po jego uzyskaniu. Otrzymasz potwierdzenie (certificado de obtención) lub dokument potwierdzający przydzielenie numeru. Możesz go używać do otwierania konta bankowego i zawierania umów, jednak rejestracja w Katastro i Urzędzie Skarbowym może potrwać dodatkowo kilka tygodni.',
  },
  {
    question: 'Czy muszę mieć adres w Hiszpanii, aby otrzymać numer NIE?',
    answer: 'Nie, nie musisz mieć stałego adresu w Hiszpanii. Możesz podać tymczasowy adres, np. adres hotelu lub nieruchomości, którą planujesz kupić. Jeśli złożysz wniosek z Polski, możesz podać adres konsulatu generalnego lub biuro agenta nieruchomości w Hiszpanii.',
  },
  {
    question: 'Czy obywatele unijni potrzebują numeru NIE?',
    answer: 'Tak, wszyscy obywatele zagraniczni, w tym obywatele unijni, potrzebują numeru NIE do kupienia nieruchomości w Hiszpanii. Obywatele unijni mogą mieć nieco uproszczoną procedurę, ale numer NIE jest nadal wymagany.',
  },
  {
    question: 'Jaki jest format numeru NIE?',
    answer: 'Format numeru NIE to litera, a następnie osiem cyfr. Na przykład: X1234567Z lub A12345678. Litera jest przydzielana w zależności od kraju pochodzenia. Polska zazwyczaj otrzymuje litery X, Y lub Z. Cyfry są unikalne dla każdej osoby.',
  },
  {
    question: 'Czy numer NIE wygasa lub trzeba go odnowić?',
    answer: 'Nie, numer NIE nigdy nie wygasa. Raz przydzielony, jest Twój na całe życie. Nie musisz go odnawiać ani ponownie rejestrować. Możesz go używać do wszystkich transakcji w Hiszpanii przez całe życie.',
  },
];

export default function NumeryNiePage() {
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
            Numer NIE - Przewodnik Kompletny
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Wszystko co powinieneś wiedzieć o numerze NIE (Número de Identidad de Extranjero) i jego znaczeniu dla obywateli zagranicznych kupujących nieruchomości w Hiszpanii.
          </p>
        </header>

        {/* Introduction Section */}
        <section className="mb-12 bg-white rounded-sm border-l-4 border-accent-500 p-6 shadow-md">
          <h2 className="text-3xl font-light text-primary-900 mb-4">Co to jest Numer NIE?</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Número de Identidad de Extranjero, w skrócie NIE, to unikalny numer identyfikacyjny przydzielany obywatelom zagranicznym w Hiszpanii. Jest to jeden z najważniejszych dokumentów, które będziesz potrzebować, aby kupić nieruchomość w Hiszpanii.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Numer NIE jest dziewięciocyfrowy i ma format: Litera + 8 cyfr (np. X1234567A). Ta litera identyfikuje kraj pochodzenia. Polska zazwyczaj otrzymuje litery X, Y lub Z.
          </p>
          <div className="bg-warm-50 rounded-sm p-4 mt-4 border border-accent-200">
            <p className="text-primary-900 font-light">
              Numer NIE jest wymagany dla każdego obywatela zagranicznego, niezależnie od tego, czy pochodzi z Unii Europejskiej czy spoza niej.
            </p>
          </div>
        </section>

        {/* Why You Need NIE */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-6">Dlaczego Potrzebujesz Numeru NIE?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-primary-900 text-white rounded-sm p-6 shadow-md">
              <h3 className="text-2xl font-light text-accent-500 mb-4">Dla Kupna Nieruchomości</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Zawarcie umowy przedwstępnej (promesa)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Otwarcie konta bankowego do transferu pieniędzy</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Zawarcie umowy notarialnej (escritura)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Rejestracja nieruchomości w Katastro</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Spłata podatków (ITP, plusvalia)</span>
                </li>
              </ul>
            </div>
            <div className="bg-warm-50 rounded-sm p-6 border border-accent-200">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Dla Innych Działalności</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Otwarcie konta bankowego</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Zatrudnienie w Hiszpanii</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Prowadzenie działalności gospodarczej</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Rejestracja we wspólnocie właścicieli</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Składanie zeznań podatkowych</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How to Get NIE */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-6">Jak Uzyskać Numer NIE?</h2>

          {/* Option 1 */}
          <div className="mb-8">
            <div className="bg-white rounded-sm border-l-4 border-accent-500 p-6 shadow-md">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Opcja 1: Konsulat Generalny w Polsce</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                To najbardziej bezpieczna opcja, jeśli jesteś w Polsce. Możesz złożyć wniosek w konsulacie generalnym przed wyjazdem do Hiszpanii.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-light text-primary-900 mb-3">Wymagane Dokumenty:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>- Wypełniony formularz EX-00 (załącznik 1)</li>
                    <li>- Oryginał paszportu</li>
                    <li>- Kopia paszportu (strony ze zdjęciem i datą)</li>
                    <li>- Potwierdzenie adresu (rachunek, umowa)</li>
                    <li>- Formularz podatku (model 038 lub 210)</li>
                    <li>- Dowód opłacenia opłaty (zwykle bezpłatne)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-light text-primary-900 mb-3">Procedura:</h4>
                  <ol className="space-y-2 text-gray-700 text-sm">
                    <li>1. Skontaktuj się z konsulatem generalnym</li>
                    <li>2. Pobierz wymagane formularze</li>
                    <li>3. Przygotuj dokumenty</li>
                    <li>4. Umów się na spotkanie (czasami on-line)</li>
                    <li>5. Poczekaj na potwierdzenie (3-6 tygodni)</li>
                  </ol>
                </div>
              </div>
              <div className="mt-4 bg-warm-50 rounded-sm p-4">
                <p className="text-gray-700">
                  <span className="font-light">Czas: </span>3-6 tygodni
                  <br />
                  <span className="font-light">Koszt: </span>Bezpłatne
                </p>
              </div>
            </div>
          </div>

          {/* Option 2 */}
          <div className="mb-8">
            <div className="bg-white rounded-sm border-l-4 border-primary-900 p-6 shadow-md">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Opcja 2: Bezpośrednio w Hiszpanii</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Jeśli już jesteś w Hiszpanii, możesz złożyć wniosek osobiście w Comisaría Nacional de Policía. To najszybsza opcja - możesz otrzymać numer prawie natychmiast.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-light text-primary-900 mb-3">Wymagane Dokumenty:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>- Paszport lub dokument tożsamości</li>
                    <li>- Wypełniony formularz (podany na miejscu)</li>
                    <li>- Dowód adresu w Hiszpanii</li>
                    <li>- Dokument zamówiony (rachunek za prąd)</li>
                    <li>- Czasami: dokumenty dotyczące nieruchomości</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-light text-primary-900 mb-3">Procedura:</h4>
                  <ol className="space-y-2 text-gray-700 text-sm">
                    <li>1. Odwiedź lokalną komisariatów</li>
                    <li>2. Popros formularz EX-00</li>
                    <li>3. Wypełnij formularz na miejscu</li>
                    <li>4. Czekaj na przetworzenie (mogą dać numer od razu)</li>
                    <li>5. Otrzymaj potwierdzenie (certifikado)</li>
                  </ol>
                </div>
              </div>
              <div className="mt-4 bg-warm-50 rounded-sm p-4">
                <p className="text-gray-700">
                  <span className="font-light">Czas: </span>1-7 dni
                  <br />
                  <span className="font-light">Koszt: </span>Bezpłatne
                </p>
              </div>
            </div>
          </div>

          {/* Option 3 */}
          <div className="mb-8">
            <div className="bg-white rounded-sm border-l-4 border-warm-400 p-6 shadow-md">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Opcja 3: Za Pośrednictwem Notariusza</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Notariusz publiczny (notario público) może złożyć wniosek o numer NIE w Twoim imieniu. To wygodne, ale może wiązać się z dodatkową opłatą.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-light text-primary-900 mb-3">Proces:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>- Spotkaj się z notariuszem</li>
                    <li>- Złóż pełnomocnictwo</li>
                    <li>- Podpisz wymagane dokumenty</li>
                    <li>- Notariusz złoży wniosek</li>
                    <li>- Czekaj na potwierdzenie</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-light text-primary-900 mb-3">Zalety:</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>- Nie musisz osobiście chodzić do policji</li>
                    <li>- Notariusz zajmuje się całym procesem</li>
                    <li>- Dokument jest autentykowany</li>
                    <li>- Szybsze niż przez konsulat (2-4 tygodnie)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-warm-50 rounded-sm p-4">
                <p className="text-gray-700">
                  <span className="font-light">Czas: </span>2-4 tygodnie
                  <br />
                  <span className="font-light">Koszt: </span>50-150 EUR (opłata notariusza)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-6">Krok po Kroku: Złożenie Wniosku w Konsulacie</h2>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Skontaktuj się z konsulatem generalnym',
                description: 'Odwiedź stronę konsulatu generalnego Hiszpanii w Polsce i sprawdź godziny pracy oraz procedury. Możesz wysłać wiadomość e-mail lub umówić się telefonicznie.',
              },
              {
                step: '2',
                title: 'Pobierz formularze',
                description: 'Pobierz formularz EX-00 i inne wymagane dokumenty ze strony konsulatu. Możesz je również otrzymać osobiście w biurze konsulatu.',
              },
              {
                step: '3',
                title: 'Przygotuj dokumenty',
                description: 'Zbierz paszport, kopie paszportu, dowód adresu i inne dokumenty wymienione na liście. Upewnij się, że wszystkie kopie są jasne i czytelne.',
              },
              {
                step: '4',
                title: 'Umów się na spotkanie',
                description: 'Skontaktuj się z konsulatem, aby umówić się na spotkanie. Niektóre konsulaty oferują również aplikacje on-line, które można przesłać przez Internet.',
              },
              {
                step: '5',
                title: 'Przygotuj się do spotkania',
                description: 'Przygotuj wszystkie dokumenty w porządku, zanim przyjdziesz do konsulatu. Przygotuj się na pytania o cel pobytu w Hiszpanii.',
              },
              {
                step: '6',
                title: 'Spotkanie z konsulatem',
                description: 'Przydź na umówione spotkanie ze wszystkimi dokumentami. Pracownik konsulatu przejrzy Twoje dokumenty i potwierdzi przyjęcie wniosku.',
              },
              {
                step: '7',
                title: 'Czekaj na potwierdzenie',
                description: 'Proces trwa zazwyczaj 3-6 tygodni. Konsulat poinformuje Cię o numerze NIE za pośrednictwem e-maila lub listu.',
              },
              {
                step: '8',
                title: 'Odbierz dokument potwierdzający',
                description: 'Odwiedź konsulat, aby odebrać dokument potwierdzający numer NIE (certificado de obtención). Możesz również poprosić wysłanie go pocztą.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-sm border border-accent-200 p-6 shadow-md hover:shadow-lg transition">
                <div className="flex items-start space-x-4">
                  <div className="bg-accent-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-light text-xl flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-light text-primary-900 mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Important Information */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-6">Ważne Informacje</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-primary-900 text-white rounded-sm p-6 shadow-md">
              <h3 className="text-2xl font-light text-accent-500 mb-4">Czy NIE jest tymczasowy czy stały?</h3>
              <p className="mb-4">
                Numer NIE jest stały i nie zmienia się. Raz przydzielony, jest Twój na całe życie. Nie musisz go odnowić ani ponownie rejestrować. Możesz go używać do wszystkich transakcji w Hiszpanii przez całe życie.
              </p>
              <p className="text-warm-100">
                Wyjątkiem są osoby, które otrzymały NIE tymczasowo (NIE temporal) - w takim przypadku po uzyskaniu numeru pesel, stary numer jest nieważny.
              </p>
            </div>
            <div className="bg-warm-50 rounded-sm p-6 border border-accent-200">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Format Numeru NIE</h3>
              <div className="bg-white rounded-sm p-4 mb-4 text-center">
                <p className="text-2xl font-bold text-accent-500 font-mono">X 1234567 A</p>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li><span className="font-light">Litera: </span>Identyfikuje kraj pochodzenia (zazwyczaj X, Y lub Z dla Polski)</li>
                <li><span className="font-light">Cyfry: </span>Osiem cyfr unikatowych dla każdej osoby</li>
                <li><span className="font-light">Litera: </span>Litera kontrolna (algorytm obliczeniowy)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Banks in Poland */}
        <section className="mb-12 bg-white rounded-sm border border-accent-200 p-8 shadow-md">
          <h2 className="text-3xl font-light text-primary-900 mb-6">Banki w Polsce Wspierające Transfery do Hiszpanii</h2>
          <p className="text-gray-700 mb-6">
            Po otrzymaniu numeru NIE, będziesz potrzebować konta bankowego w Hiszpanii do transferu pieniędzy na zakup nieruchomości. Niektóre polskie banki mogą ułatwić ten proces:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'PKO BP',
                description: 'Największy bank w Polsce, ma oddziały w Hiszpanii i wspiera transfery międzynarodowe',
              },
              {
                name: 'mBank',
                description: 'Nowoczesny bank cyfrowy, oferuje transfery międzynarodowe i wsparcie dla klientów za granicą',
              },
              {
                name: 'Santander Polska',
                description: 'Część grupy Banco Santander, jest to najlepszy wybór dla transferów do Hiszpanii',
              },
            ].map((bank, index) => (
              <div key={index} className="bg-warm-50 rounded-sm p-6 border border-accent-200">
                <h4 className="text-lg font-light text-primary-900 mb-2">{bank.name}</h4>
                <p className="text-gray-700 text-sm">{bank.description}</p>
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
          <h2 className="text-3xl font-light mb-4">Potrzebujesz Pomocy z Numerem NIE?</h2>
          <p className="text-lg mb-8 text-warm-100">
            Nasz zespół specjalistów może pomóc Ci w uzyskaniu numeru NIE i przejściu przez cały proces zakupu nieruchomości.
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
              <p className="text-sm text-gray-600">Kompletny przewodnik po procesie zakupu nieruchomości</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/koszty-podatki" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Koszty i Podatki</h3>
              <p className="text-sm text-gray-600">Pełny przegląd kosztów związanych z zakupem</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/kredyt-hipoteczny" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Kredyt Hipoteczny</h3>
              <p className="text-sm text-gray-600">Przewodnik po hipotekach i finansowaniu</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/dlaczego-nowy-budynek" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Dlaczego Nowy Budynek</h3>
              <p className="text-sm text-gray-600">Korzyści z zakupu nowych nieruchomości</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/pod-klucz-vs-plan" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Pod Klucz vs Plan</h3>
              <p className="text-sm text-gray-600">Porównanie nieruchomości gotowych i z projektu</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/polnoc-vs-poludnie" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Północ vs Południe</h3>
              <p className="text-sm text-gray-600">Porównanie różnych lokalizacji na Costa Blanca</p>
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
