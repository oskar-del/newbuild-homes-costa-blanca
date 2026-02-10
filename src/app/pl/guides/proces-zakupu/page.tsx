import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Proces Zakupu Nieruchomości - Przewodnik 2025',
  description: 'Kompletny przewodnik po procesie zakupu nieruchomości na Costa Blanca. Dowiedz się o krokach, dokumentach i wymaganiach dla obywateli zagranicznych.',
  alternates: {
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/buying-process',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/kopprocessen',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/koopproces',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/koopproces',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/processus-achat',
      'no': 'https://newbuildhomescostablanca.com/no/guides/kjopsprosessen',
      'de': 'https://newbuildhomescostablanca.com/de/guides/kaufprozess',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides/proces-zakupu',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides/process-pokupki',
      'x-default': 'https://newbuildhomescostablanca.com/guides/buying-process',
    },
  },
};

const breadcrumbs = [
  { name: 'Strona główna', url: 'https://newbuildhomescostablanca.com/pl' },
  { name: 'Przewodniki', url: 'https://newbuildhomescostablanca.com/pl/guides' },
  { name: 'Proces Zakupu', url: 'https://newbuildhomescostablanca.com/pl/guides/proces-zakupu' },
];

const faqs = [
  {
    question: 'Ile czasu zajmuje proces zakupu nieruchomości na Costa Blanca?',
    answer: 'Typowy proces zakupu nieruchomości trwa około 4-8 miesięcy. Czas może się różnić w zależności od złożoności sytuacji prawnej, szybkości załatwiania formalności i decyzji kupującego. Etapy obejmują poszukiwanie nieruchomości (1-3 miesiące), uzyskanie finansowania (2-4 miesiące) i finalizację umów notarialnych (2-4 tygodnie).',
  },
  {
    question: 'Czy obywatele zagraniczny mogą kupić nieruchomość w Hiszpanii bez numeru NIE?',
    answer: 'Nie, numer NIE (Número de Identidad de Extranjero) jest wymagany do otwarcia konta bankowego, zawarcia umów i rejestracji nieruchomości. Możesz złożyć wniosek o numer NIE w konsulacie generalnej lub w Hiszpanii za pośrednictwem notariusza. Proces ten zajmuje zazwyczaj 2-4 tygodnie.',
  },
  {
    question: 'Jakie są główne kroki procesu zakupu nieruchomości?',
    answer: 'Główne kroki to: 1) Wybór nieruchomości i negocjacje, 2) Zawarcie umowy przedwstępnej (promesa de compraventa), 3) Uzyskanie finansowania hipotecznego, 4) Przeprowadzenie inspekcji i badania tytułu, 5) Zapłata podatku od transferu nieruchomości (ITP), 6) Zawarcie umowy notarialnej (escritura), 7) Rejestracja w Katastro (rejestr gruntów).',
  },
  {
    question: 'Ile wynoszą koszty transakcji nieruchomości?',
    answer: 'Koszty transakcji wynoszą zazwyczaj 8-10% ceny nieruchomości. Wchodzą w to: podatek transfer nieruchomości ITP (6-11%), opłaty notarialne (0.5-1%), opłaty za rejestrację w Katastro (0.1-0.5%), honoraria agenta nieruchomości (5-6%), i inne koszty administracyjne.',
  },
  {
    question: 'Czy mogę wynająć nieruchomość zaraz po zakupie?',
    answer: 'Tak, możesz wynajmować nieruchomość po zarejestrowaniu jej na swoje nazwisko w Katastro. Jednak musisz zdecydować się na system opodatkowania: Régimen de Atribución de Ingresos (podatek na właścicielu) lub Régimen de Imputación de Rentas (alternatywna kalkulacja). Zalecamy skonsultowanie się z doradcą podatkowym.',
  },
  {
    question: 'Jakie dokumenty potrzebuję do otwarcia konta bankowego w Hiszpanii?',
    answer: 'Potrzebujesz: paszportu lub karty tożsamości, numeru NIE, dowodu zamieszkania (rachunek za prąd), zaproszenia od banku lub listy od pracodawcy. W Polsce sprawdzisz wymagania w PKO BP, mBank lub Santander Polska, które mają oddziały w Hiszpanii lub mogą ułatwić proces.',
  },
  {
    question: 'Czy muszę posiadać obywatelstwo unijne, aby kupić nieruchomość?',
    answer: 'Nie, obywatele spoza Unii Europejskiej mogą kupić nieruchomość w Hiszpanii. Proces jest bardziej skomplikowany ze względu na wymagania dotyczące numeru NIE i otwierania konta bankowego, ale nie ma żadnych ograniczeń prawnych dla obywateli zagranicznych.',
  },
  {
    question: 'Co to jest umowa przedwstępna (promesa de compraventa)?',
    answer: 'Promesa de compraventa to umowa przedwstępna, która wiąże obie strony do zawarcia ostatecznej umowy sprzedaży. Zawiera główne warunki sprzedaży i jest rejestrowana w Katastro. Stanowi ochronę dla kupującego i gwarantuje, że sprzedawca nie może sprzedać nieruchomości innej osobie.',
  },
];

export default function ProcesZakupuPage() {
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
            Proces Zakupu Nieruchomości na Costa Blanca
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Kompletny przewodnik pomagający obywatelom zagranicznym zrozumieć każdy etap procesu zakupu nieruchomości w Hiszpanii. Od pierwszych kroków aż do ostatecznej rejestracji w Katastro.
          </p>
        </header>

        {/* Introduction Section */}
        <section className="mb-12 bg-white rounded-sm border-l-4 border-accent-500 p-6 shadow-md">
          <h2 className="text-3xl font-light text-primary-900 mb-4">Przegląd Procesu</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Zakup nieruchomości na Costa Blanca to znaczące przedsięwzięcie, które wymaga zrozumienia procesu prawnego, finansowego i administracyjnego. W Hiszpanii proces ten jest dobrze uregulowany i bezpieczny dla kupujących zagranicznych, choć zawiera wiele kroków i wymaga zaangażowania wielu profesjonalistów.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Cały proces trwa zwykle 4-8 miesięcy, ale czas może się znacznie różnić w zależności od indywidualnych okoliczności, takich jak uzyskanie finansowania hipotecznego, złożoność tytułu prawnego nieruchomości i biurokracja administracyjna.
          </p>
        </section>

        {/* Step 1 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4">1. Poszukiwanie i Wybór Nieruchomości</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="text-2xl font-light text-accent-500 mb-4">Krok 1A: Przegląd Rynku</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Skontaktuj się z lokalnym agentem nieruchomości</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Obejrzyj dostępne nieruchomości na Costa Blanca</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Porównaj ceny i lokalizacje</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Zwiedź interesujące obiekty osobiście</span>
                </li>
              </ul>
            </div>
            <div className="bg-primary-900 text-white rounded-sm p-6">
              <h3 className="text-2xl font-light text-accent-500 mb-4">Krok 1B: Negocjacje i Umowa Przedwstępna</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Złóż ofertę na wybraną nieruchomość</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Negocjuj cenę i warunki</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Zatwierdź warunki z agentem</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Przygotuj się do zawarcia umowy przedwstępnej</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4">2. Zawarcie Umowy Przedwstępnej (Promesa de Compraventa)</h2>
          <div className="bg-white rounded-sm border border-accent-200 p-8 shadow-md">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Promesa de compraventa to formalny dokument, który wiąże obie strony do zawarcia ostatecznej umowy sprzedaży. W tym momencie zwykle wpłacasz zadatek (depósito), który stanowi zwykle 3-10% ceny zakupu.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-light text-primary-900 mb-3">Wymagane Dokumenty:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>- Paszport lub dokument tożsamości</li>
                  <li>- Numer NIE (jeśli już posiadany)</li>
                  <li>- Dowód zamieszkania</li>
                  <li>- Bank details dla transferu zadatku</li>
                  <li>- Dokument o zatrudnieniu (dla hipoteki)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-light text-primary-900 mb-3">Ważne Klauzule:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>- Termin zawarcia umowy notarialnej</li>
                  <li>- Warunki finansowania hipotecznego</li>
                  <li>- Warunki dotyczące stanu nieruchomości</li>
                  <li>- Procedury zwrotu zadatku</li>
                  <li>- Koszty i opłaty</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-600 italic">
              Umowa przedwstępna jest rejestrowana w Katastro i daje ci prawo pierwokupu.
            </p>
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4">3. Uzyskanie Numeru NIE</h2>
          <div className="bg-warm-50 rounded-sm p-8">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Número de Identidad de Extranjero (NIE) to numer identyfikacyjny dla obywateli zagranicznych w Hiszpanii. Jest obowiązkowy do otwarcia konta bankowego, zawarcia umów i rejestracji nieruchomości.
            </p>
            <div className="bg-white rounded-sm border-l-4 border-primary-900 p-6 mb-6">
              <h3 className="text-xl font-light text-primary-900 mb-3">Procedura Uzyskania NIE:</h3>
              <ol className="space-y-4 text-gray-700">
                <li className="flex space-x-4">
                  <span className="text-accent-500 font-bold min-w-8">1.</span>
                  <span>Złóż wniosek w konsulacie generalnym w Polsce</span>
                </li>
                <li className="flex space-x-4">
                  <span className="text-accent-500 font-bold min-w-8">2.</span>
                  <span>Lub czekaj na przybycie do Hiszpanii i złóż wniosek w Comisaría Nacional de Policía</span>
                </li>
                <li className="flex space-x-4">
                  <span className="text-accent-500 font-bold min-w-8">3.</span>
                  <span>Lub poproś notariusza o złożenie wniosku w twoim imieniu</span>
                </li>
                <li className="flex space-x-4">
                  <span className="text-accent-500 font-bold min-w-8">4.</span>
                  <span>Otrzymaj potwierdzenie (certificado de obtención)</span>
                </li>
              </ol>
            </div>
            <p className="text-gray-700 italic">
              Wniosek o NIE zajmuje zazwyczaj 2-4 tygodnie. Numer NIE jest bezpłatny.
            </p>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4">4. Otwarcie Konta Bankowego i Uzyskanie Finansowania</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary-900 text-white rounded-sm p-6">
              <h3 className="text-2xl font-light text-accent-500 mb-4">Otwarcie Konta Bankowego</h3>
              <p className="mb-4">
                Aby kupić nieruchomość, musisz otworzyć konto bankowe w Hiszpanii. Popularne banki to:
              </p>
              <ul className="space-y-2">
                <li>- BBVA (Banco Bilbao Vizcaya Argentaria)</li>
                <li>- CaixaBank</li>
                <li>- Bankia</li>
                <li>- Banco de Sabadell</li>
                <li>- Banco Santander</li>
              </ul>
              <p className="mt-4 text-sm text-warm-100">
                Te banki wymagają identyfikacji tożsamości (paszportu) i numeru NIE.
              </p>
            </div>
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Hipoteka i Finansowanie</h3>
              <p className="text-gray-700 mb-4">
                Większość kupujących potrzebuje finansowania hipotecznego. Maksymalnie możesz otrzymać 80% wartości nieruchomości.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Zwróć się do banku o ofertę hipoteczną</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Przygotuj dokumenty finansowe</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Czekaj na zatwierdzenie (2-4 tygodnie)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-accent-500 font-bold mt-1">•</span>
                  <span>Podpisz umowę hipoteczną</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step 5 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4">5. Inspekcja i Badanie Tytułu Prawnego</h2>
          <div className="bg-white rounded-sm border border-accent-200 p-8 shadow-md">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Przed zawarciu umowy notarialnej ważne jest przeprowadzenie inspekcji nieruchomości i weryfikacji tytułu prawnego.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-light text-primary-900 mb-4">Inspekcja Nieruchomości:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Skontaktuj się z inspektorem budynku</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Przeprowadź oględziny struktury budynku</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Sprawdź systemy elektryczne i hydrauliczne</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Otrzymaj raport inspektora</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-light text-primary-900 mb-4">Badanie Tytułu Prawnego:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Zażądaj kopii zapisów z Katastro</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Sprawdź obciążenia i zastawy</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Skontaktuj się z adwokatem</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Otrzymaj zatwierdzenie prawne</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Step 6 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4">6. Podatek od Transferu Nieruchomości (ITP)</h2>
          <div className="bg-warm-50 rounded-sm p-8">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Podatek od transferu nieruchomości (Impuesto sobre Transmisiones Patrimoniales - ITP) to podatek, który płaci kupujący. Stawka podatku wynosi 6-11% w zależności od autonomii (regiony Hiszpanii).
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-sm p-4 border border-accent-200">
                <h4 className="text-lg font-light text-primary-900 mb-2">Formalności:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>1. Skontaktuj się z Urzędem Skarbowym</li>
                  <li>2. Złóż deklarację ITP</li>
                  <li>3. Zapłać podatek</li>
                  <li>4. Otrzymaj potwierdzenie</li>
                </ul>
              </div>
              <div className="bg-white rounded-sm p-4 border border-accent-200">
                <h4 className="text-lg font-light text-primary-900 mb-2">Stawki na Costa Blanca:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Valencja: 7%</li>
                  <li>Murcia: 7%</li>
                  <li>Alicante: 7%</li>
                  <li>Mallorca: 8%</li>
                </ul>
              </div>
              <div className="bg-white rounded-sm p-4 border border-accent-200">
                <h4 className="text-lg font-light text-primary-900 mb-2">Czasochłonność:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Złożenie: 1-2 tygodnie</li>
                  <li>Zatwierdzenie: 2-4 tygodnie</li>
                  <li>Całkowicie: 4-6 tygodni</li>
                  <li>Zazwyczaj przed notariuszem</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Step 7 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4">7. Umowa Notarialna (Escritura)</h2>
          <div className="bg-primary-900 text-white rounded-sm p-8">
            <p className="mb-6 leading-relaxed">
              Umowa notarialna (escritura de compraventa) to ostateczny dokument sprzedaży. Musi być sporządzony przez notariusza publicznego, a obecne muszą być obie strony transakcji.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-light text-accent-500 mb-4">Przygotowanie Dokumentów:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Paszport i numer NIE</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Zatwierdzenie hipoteki od banku</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Dowód płacenia podatku ITP</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Zatwierdzenie inspekcji budynku</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Umowa przedwstępna (promesa)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-light text-accent-500 mb-4">Procedura Zawarcia:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Uzgodnij datę z notariuszem</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Podpisz umowę przed notariuszem</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Dokonaj ostatecznej płatności</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Otrzymaj kopię umowy (copia simple)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent-500 font-bold mt-1">•</span>
                    <span>Przygotuj się do rejestracji</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Step 8 */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-4">8. Rejestracja w Katastro i Zawarciu Rejestracji Hipoteki</h2>
          <div className="bg-white rounded-sm border border-accent-200 p-8 shadow-md">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Ostatecznym etapem jest rejestracja nieruchomości i hipoteki w Katastro (Registro de la Propiedad). Ten proces jest obowiązkowy i powinien być ukończony w ciągu 30 dni od zawarcia umowy notarialnej.
            </p>
            <div className="bg-warm-50 rounded-sm p-6 mb-6">
              <h3 className="text-xl font-light text-primary-900 mb-4">Kroki Rejestracji:</h3>
              <ol className="space-y-4 text-gray-700">
                <li className="flex space-x-4">
                  <span className="text-accent-500 font-bold min-w-8">1.</span>
                  <span>Złóż wniosek o rejestrację w Katastro</span>
                </li>
                <li className="flex space-x-4">
                  <span className="text-accent-500 font-bold min-w-8">2.</span>
                  <span>Załącz umowę notarialną i dokumenty</span>
                </li>
                <li className="flex space-x-4">
                  <span className="text-accent-500 font-bold min-w-8">3.</span>
                  <span>Zarejestruj hipotekę w imieniu banku</span>
                </li>
                <li className="flex space-x-4">
                  <span className="text-accent-500 font-bold min-w-8">4.</span>
                  <span>Czekaj na potwierdzenie rejestracji (2-4 tygodnie)</span>
                </li>
                <li className="flex space-x-4">
                  <span className="text-accent-500 font-bold min-w-8">5.</span>
                  <span>Otrzymaj nowy wpis z Katastro potwierdzający własność</span>
                </li>
              </ol>
            </div>
            <div className="bg-accent-100 text-primary-900 rounded-sm p-6">
              <h3 className="text-xl font-light mb-3">Gratulacje!</h3>
              <p>
                Proces zakupu nieruchomości jest oficjalnie ukończony. Jesteś teraz zarejestrowanym właścicielem nieruchomości na Costa Blanca. Możesz teraz w pełni korzystać z nieruchomości, wynajem jej lub dalej sprzedać.
              </p>
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
          <h2 className="text-3xl font-light mb-4">Potrzebujesz Pomocy?</h2>
          <p className="text-lg mb-8 text-warm-100">
            Nasz zespół specjalistów jest gotów pomóc Ci na każdym etapie procesu zakupu nieruchomości. Skontaktuj się z nami dzisiaj.
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
            <Link href="https://newbuildhomescostablanca.com/pl/guides/numer-nie" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Numer NIE</h3>
              <p className="text-sm text-gray-600">Jak uzyskać numer identyfikacyjny dla obywateli zagranicznych</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/koszty-podatki" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Koszty i Podatki</h3>
              <p className="text-sm text-gray-600">Pełny przegląd kosztów związanych z zakupem nieruchomości</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/kredyt-hipoteczny" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Kredyt Hipoteczny</h3>
              <p className="text-sm text-gray-600">Przewodnik po hipotekach i finansowaniu nieruchomości</p>
            </Link>
            <Link href="https://newbuildhomescostablanca.com/pl/guides/dlaczego-nowy-budynek" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Dlaczego Nowy Budynek</h3>
              <p className="text-sm text-gray-600">Korzyści z zakupu nowoodbudowanej nieruchomości</p>
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
