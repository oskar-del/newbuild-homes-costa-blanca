import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Północ vs Południe Costa Blanca - Porównanie Lokalizacji',
  description: 'Porównanie północnej i południowej części Costa Blanca. Dowiedz się o różnicach klimatu, cen, infrastruktury i stylu życia w każdej części regionu.',
  alternates: {
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/north-vs-south',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/nord-vs-syd',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/noord-vs-zuid',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/noord-vs-zuid',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/nord-vs-sud',
      'no': 'https://newbuildhomescostablanca.com/no/guides/nord-vs-sor',
      'de': 'https://newbuildhomescostablanca.com/de/guides/nord-vs-sued',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides/polnoc-vs-poludnie',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides/sever-vs-yug',
      'x-default': 'https://newbuildhomescostablanca.com/guides/north-vs-south',
    },
  },
};

const breadcrumbs = [
  { name: 'Strona główna', url: 'https://newbuildhomescostablanca.com/pl' },
  { name: 'Przewodniki', url: 'https://newbuildhomescostablanca.com/pl/guides' },
  { name: 'Północ vs Południe', url: 'https://newbuildhomescostablanca.com/pl/guides/polnoc-vs-poludnie' },
];

const faqs = [
  {
    question: 'Jaka jest różnica klimatyczna między północą a południem Costa Blanca?',
    answer: 'Północ jest chłodniejsza i wilgotniejsza, szczególnie zimą. Opady mogą być obfite w okresie jesiennym. Południe jest cieplejsze i bardziej słoneczne przez cały rok. Średnia temperatura zimą na północy wynosi 8-10C, a na południu 12-15C. Létnie temperatury są podobne (30-35C) na obu Stronach.',
  },
  {
    question: 'Gdzie są wyższe ceny nieruchomości - północa czy południe?',
    answer: 'Generalnie ceny są wyższe na północy (Costa Blanca Północ) niż na południu. Jednak to zależy od konkretnej lokalizacji. Popularne miasta takie jak Jávea i Denia na północy mają wyższe ceny. Południe (Torrevieja, Orihuela Costa) ma niższe ceny, ale jest coraz bardziej rozwijane.',
  },
  {
    question: 'Gdzie jest więcej infrastruktury i udogodnień - północa czy południe?',
    answer: 'Północa ma dobrze rozwinięta infrastrukturę, przystanie jachtowe, restauracje, sklepy i obiekty turystyczne. Południe również się szybko rozwija, szczególnie w Torrevieja. Jednak północa tradycyjnie była bardziej turystyczna i ma więcej ustanowionych usług.',
  },
  {
    question: 'Czy północa jest bardziej prestiżowa niż południe?',
    answer: 'Tak, tradycyjnie północa (Jávea, Denia) była uważana za bardziej prestiżową ze względu na piękne krajobrazy, jachty i wyższy standard życia. Jednak południe szybko się zmienia i staje się coraz bardziej pożądane. Teraz jest to bardziej kwestią preferencji osobistych niż rzeczywistego prestizu.',
  },
  {
    question: 'Gdzie jest lepsze dla inwestycji - północa czy południe?',
    answer: 'Północa tradycyjnie miała lepszy potencjał wzrostu ze względu na ustalone reputacje i infrastrukturę. Jednak południe oferuje lepszy stosunek ceny do jakości i jest szybko się rozwijającym rynkiem. Wybór zależy od Twojego horyzontu inwestycyjnego i preferencji.',
  },
  {
    question: 'Jakie miasta powinien znać na północy Costa Blanca?',
    answer: 'Główne miasta na północy to: Jávea (Xàbia) - piękne miasteczko przybrzeżne, Denia - popularne wśród turystów, Teulada - spokojne miasteczko, Benissa - tradycyjne miasteczko na wzgórzu, Moraira - ekskluzywny kurort. Wszystkie mają dostęp do morza i doskonale zatoki.',
  },
  {
    question: 'Jakie miasta powinien znać na południu Costa Blanca?',
    answer: 'Główne miasta na południu to: Torrevieja - popularne miasteczko z pięknymi plażami, Orihuela Costa - rozwijające się miasteczko z pięknymi plaża mi, Pilar de la Horadada - spokojne miasteczko, Guardamar - tradycyjne miasteczko, Los Montesinos - wewnętrzne miasteczko. Alle mają dostęp do morza lub są blisko.',
  },
  {
    question: 'Czy północa czy południe jest lepsze dla emerytów?',
    answer: 'To zależy od preferencji. Północa oferuje bardziej spokojny styl życia z piękną naturą, jednak jest chłodniejsza zimą. Południe jest cieplejsze i bardziej rozwijające się, ale może być bardziej zatłoczone. Oba są dobrymi opcjami dla emerytów. Najlepiej odwiedzić obie i wybrać to, które Ci się podoba.',
  },
];

export default function PolnocVsPoludniePage() {
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
            Północ vs Południe Costa Blanca
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Porównanie północnej i południowej części Costa Blanca. Dowiedz się o różnicach klimatu, cen, infrastruktury i stylu życia, aby wybrać idealną lokalizację.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-12 bg-white rounded-sm border-l-4 border-accent-500 p-6 shadow-md">
          <h2 className="text-3xl font-light text-primary-900 mb-4">Costa Blanca: Dwa Oblicza Jednego Regionu</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Costa Blanca, rozciągająca się na przestrzeni ponad 160 kilometrów wzdłuż południowo-wschodniej Hiszpanii, jest podzielona na dwie wyraźne części: północną i południową. Każda ma swoją unikalna osobowość, klimat, cenę i style życia. Rozumienie różnic między nimi jest kluczowe do wyboru idealnej lokalizacji dla Twojego domu.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-warm-50 rounded-sm p-6 border border-accent-200">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Północ</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Główne miasta:</span>
                  <span className="font-light">Jávea, Denia</span>
                </div>
                <div className="flex justify-between">
                  <span>Klimat:</span>
                  <span className="font-light">Umiarkowany</span>
                </div>
                <div className="flex justify-between">
                  <span>Ceny:</span>
                  <span className="font-light">Wyższe</span>
                </div>
                <div className="flex justify-between">
                  <span>Typ:</span>
                  <span className="font-light">Prestiżowy, spokojny</span>
                </div>
              </div>
            </div>
            <div className="bg-warm-50 rounded-sm p-6 border border-accent-200">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Południe</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Główne miasta:</span>
                  <span className="font-light">Torrevieja, Orihuela</span>
                </div>
                <div className="flex justify-between">
                  <span>Klimat:</span>
                  <span className="font-light">Ciepły, słoneczny</span>
                </div>
                <div className="flex justify-between">
                  <span>Ceny:</span>
                  <span className="font-light">Niższe</span>
                </div>
                <div className="flex justify-between">
                  <span>Typ:</span>
                  <span className="font-light">Dynamiczny, rodzinny</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* North Costa Blanca */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Północna Costa Blanca</h2>

          <div className="mb-8 bg-white rounded-sm border-l-4 border-primary-900 p-8 shadow-md">
            <h3 className="text-2xl font-light text-primary-900 mb-4">Charakterystyka</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Północna Costa Blanca, obejmująca miasta takie jak Jávea, Denia, Teulada i Benissa, jest znana z pięknych krajobrazów, górskich otoczenia i ekskluzywnego stylu życia. Tradycyjnie uważana za bardziej prestiżową część regionu.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-sm border-l-4 border-accent-500 p-8 shadow-md">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Zalety Północy</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Piękne Krajobrazy</p>
                    <p className="text-sm text-gray-600">Góry, doliny, tradycyjne miasteczka</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Ekskluzywny Styl Życia</p>
                    <p className="text-sm text-gray-600">Prestiżowe adresy, jachty, restauracje</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Spokojna Atmosfera</p>
                    <p className="text-sm text-gray-600">Mniej turystów w okresie off-season</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Ustanowiona Infrastruktura</p>
                    <p className="text-sm text-gray-600">Dobre szkoły, szpitale, usługi</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Międzynarodowa Społeczność</p>
                    <p className="text-sm text-gray-600">Wiele europejskich ekspatriantów</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-sm border-l-4 border-warm-400 p-8 shadow-md">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Wady Północy</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Wyższe Ceny</p>
                    <p className="text-sm text-gray-600">Nieruchomości są droższe niż na południu</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Chłodniejsze Zimy</p>
                    <p className="text-sm text-gray-600">Może być zimno i wilgotnie</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Obfite Opady</p>
                    <p className="text-sm text-gray-600">Jesień i wiosna mogą być deszczowe</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Wyższe Koszty Utrzymania</p>
                    <p className="text-sm text-gray-600">Droższe słowa, usługi, media</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Mniej Słonecznie Zimą</p>
                    <p className="text-sm text-gray-600">Mniej dni słonecznych niż na południu</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-primary-900 text-white rounded-sm p-8 mb-8">
            <h3 className="text-2xl font-light text-accent-500 mb-6">Główne Miasta Północy</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg font-light mb-3">Jávea (Xàbia)</h4>
                <p className="text-sm mb-4">Piękne miasteczko przybrzeżne z trzema plażami, jachtami i prestiżowymi rezydencjami. Popularne wśród turystów i ekspiatriantów.</p>
                <p className="text-xs text-warm-200">Populacja: ~30 000</p>
              </div>
              <div>
                <h4 className="text-lg font-light mb-3">Denia</h4>
                <p className="text-sm mb-4">Port turystyczny z pieknym fortu na wzgórzu. Znana z restauracji, sklepów i nowoczesnego molo. Bardziej nowoczesna niż Jávea.</p>
                <p className="text-xs text-warm-200">Populacja: ~40 000</p>
              </div>
              <div>
                <h4 className="text-lg font-light mb-3">Moraira</h4>
                <p className="text-sm mb-4">Ekskluzywny kurort z małą zatoką, restauracjami i drożejszymi nieruchomościami. Idealne dla bogatych kupujących.</p>
                <p className="text-xs text-warm-200">Populacja: ~2 000</p>
              </div>
            </div>
          </div>
        </section>

        {/* South Costa Blanca */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Południowa Costa Blanca</h2>

          <div className="mb-8 bg-white rounded-sm border-l-4 border-accent-500 p-8 shadow-md">
            <h3 className="text-2xl font-light text-primary-900 mb-4">Charakterystyka</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Południowa Costa Blanca, obejmująca miasta takie jak Torrevieja, Orihuela Costa i Pilar de la Horadada, jest coraz bardziej popularna. Znana z pięknych plaż, ciepłego klimatu i dynamicznego rozwoju. Ceny są niższe, ale infrastruktura się szybko zmienia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-sm border-l-4 border-accent-500 p-8 shadow-md">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Zalety Południa</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Niższe Ceny</p>
                    <p className="text-sm text-gray-600">Nieruchomości są znacznie tańsze</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Więcej Słonecznych Dni</p>
                    <p className="text-sm text-gray-600">300+ dni słonecznych rocznie</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Piękne Plaże</p>
                    <p className="text-sm text-gray-600">Długie, szerokie plaże z czystą wodą</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Szybki Rozwój</p>
                    <p className="text-sm text-gray-600">Nowa infrastruktura, projekty</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-xl font-bold">+</span>
                  <div>
                    <p className="font-light text-primary-900">Przyjazne Ceny</p>
                    <p className="text-sm text-gray-600">Tańsze usługi, restauracje</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-sm border-l-4 border-warm-400 p-8 shadow-md">
              <h3 className="text-2xl font-light text-primary-900 mb-4">Wady Południa</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Bardzo Gorące Lato</p>
                    <p className="text-sm text-gray-600">Temperatury mogą osiągać 40C</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Mniej Prestiżowy</p>
                    <p className="text-sm text-gray-600">Tradycyjnie uważane za mniej ekskluzywne</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Więcej Turystów</p>
                    <p className="text-sm text-gray-600">Zatłoczone w sezonie letnim</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Mniej Ugruntowana Infrastruktura</p>
                    <p className="text-sm text-gray-600">Szkoły i szpitale się rozwijają</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-warm-400 text-xl font-bold">-</span>
                  <div>
                    <p className="font-light text-primary-900">Budowlane Hałasy</p>
                    <p className="text-sm text-gray-600">Wiele budów nowych projektów</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-accent-500 text-white rounded-sm p-8 mb-8">
            <h3 className="text-2xl font-light text-white mb-6">Główne Miasta Południa</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg font-light mb-3">Torrevieja</h4>
                <p className="text-sm mb-4">Największe miasto na południu z pięknym przystanią, restauracjami i palacem. Port rybacko-turystyczny z aktywnym życiem nocnym.</p>
                <p className="text-xs text-warm-50">Populacja: ~100 000</p>
              </div>
              <div>
                <h4 className="text-lg font-light mb-3">Orihuela Costa</h4>
                <p className="text-sm mb-4">Rozwijające się miasteczko z piękną plażą i nową infrastrukturą. Idealne dla rodzin ze względu na ceny i plaże.</p>
                <p className="text-xs text-warm-50">Populacja: ~30 000</p>
              </div>
              <div>
                <h4 className="text-lg font-light mb-3">Pilar de la Horadada</h4>
                <p className="text-sm mb-4">Spokojne miasteczko na granicy z Murcia. Mniejsze, bardziej tradycyjne, z piękną plaża i niedrogim życiem.</p>
                <p className="text-xs text-warm-50">Populacja: ~15 000</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-3xl font-light text-primary-900 mb-8">Szczegółowe Porównanie</h2>
          <div className="overflow-x-auto bg-white rounded-sm shadow-md border border-accent-200">
            <table className="w-full">
              <thead>
                <tr className="bg-primary-900 text-white border-b border-accent-500">
                  <th className="px-6 py-4 text-left font-light">Aspekt</th>
                  <th className="px-6 py-4 text-left font-light">Północa</th>
                  <th className="px-6 py-4 text-left font-light">Południe</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Średnia Cena Mieszkania</td>
                  <td className="px-6 py-4 text-gray-600">4 500-6 000 EUR/m2</td>
                  <td className="px-6 py-4 text-accent-500">2 500-3 500 EUR/m2</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50 bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Temperatura Zimą</td>
                  <td className="px-6 py-4 text-gray-600">8-10C</td>
                  <td className="px-6 py-4 text-accent-500">12-15C</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Temperatura Latem</td>
                  <td className="px-6 py-4 text-gray-600">28-32C</td>
                  <td className="px-6 py-4 text-accent-500">32-36C</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50 bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Dni Słonecznych</td>
                  <td className="px-6 py-4 text-gray-600">280-300</td>
                  <td className="px-6 py-4 text-accent-500">300-330</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Opady Deszczu</td>
                  <td className="px-6 py-4 text-gray-600">Obfite (400-500 mm/rok)</td>
                  <td className="px-6 py-4 text-accent-500">Mniej (250-300 mm/rok)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50 bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Styl Życia</td>
                  <td className="px-6 py-4 text-gray-600">Ekskluzywny, prestiżowy</td>
                  <td className="px-6 py-4 text-accent-500">Dynamiczny, rodzinny</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Turystyka</td>
                  <td className="px-6 py-4 text-gray-600">Umiarkowana</td>
                  <td className="px-6 py-4 text-accent-500">Wysoka</td>
                </tr>
                <tr className="hover:bg-warm-50 bg-warm-50">
                  <td className="px-6 py-4 font-light text-primary-900">Wzrost Wartości</td>
                  <td className="px-6 py-4 text-gray-600">Stabilny (3-4% rocznie)</td>
                  <td className="px-6 py-4 text-accent-500">Szybszy (5-6% rocznie)</td>
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
              <h3 className="text-2xl font-light text-primary-900 mb-6">Wybierz Północę, Jeśli:</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <span className="text-primary-900 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Chcesz spokojnego, ekskluzywnego stylu życia</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-primary-900 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Lubisz górskie krajobrazy i tradycję</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-primary-900 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Preferujesz mniejszą liczbę turystów</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-primary-900 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Chcesz ugruntowanej infrastruktury</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-primary-900 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Możliwości płacenia wyższych cen</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-sm border-l-4 border-accent-500 p-8 shadow-md">
              <h3 className="text-2xl font-light text-primary-900 mb-6">Wybierz Południe, Jeśli:</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Chcesz maksimum słońca i ciepła</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Szukasz lepszych cen nieruchomości</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Lubisz dynamiczny, rozwijający się obszar</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Preferujesz piękne, szerokie plaże</span>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-accent-500 text-lg font-bold">✓</span>
                  <span className="text-gray-700">Szukasz inwestycji na szybki wzrost wartości</span>
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
          <h2 className="text-3xl font-light mb-4">Gotów Znaleźć Idealną Lokalizację?</h2>
          <p className="text-lg mb-8 text-warm-100">
            Nasz zespół zna dobrze obie części Costa Blanca i może Ci pomóc wybrać najlepszą lokalizację dla Twojej inwestycji.
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
            <Link href="https://newbuildhomescostablanca.com/pl/guides/pod-klucz-vs-plan" className="bg-white rounded-sm p-4 hover:shadow-lg transition border border-accent-200">
              <h3 className="text-lg font-light text-primary-900 mb-2">Pod Klucz vs Plan</h3>
              <p className="text-sm text-gray-600">Porównanie typów nieruchomości</p>
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
