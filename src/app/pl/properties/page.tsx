'use client';

export const revalidate = 3600;

import Link from 'next/link';
import Image from 'next/image';
import { fetchXMLFeed, ParsedProperty } from '@/lib/xml-parser';
import { getRegionForTown, normalizeTownName } from '@/lib/feed-config';
import PropertyFilters from '@/components/PropertyFilters';
import SortDropdown from '@/components/SortDropdown';
import PropertySearch from '@/components/PropertySearch';
import { collectionPageSchema, breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';
import { useEffect, useState } from 'react';

const SOUTH_TOWNS = ['torrevieja', 'orihuela costa', 'guardamar', 'pilar de la horadada', 'la zenia', 'cabo roig', 'playa flamenca', 'punta prima', 'villamartin', 'los montesinos', 'san miguel'];
const NORTH_TOWNS = ['javea', 'moraira', 'calpe', 'altea', 'benidorm', 'denia', 'benissa', 'benitachell', 'cumbre del sol', 'teulada'];
const GOLF_KEYWORDS = ['golf', 'la finca', 'villamartin', 'las colinas', 'campoamor', 'las ramblas', 'vistabella', 'algorfa'];
const INLAND_TOWNS = ['algorfa', 'rojales', 'ciudad quesada', 'benijofar', 'san fulgencio', 'jalon', 'orba', 'pedreguer'];

const POLISH_FAQS = [
  {
    question: 'Dlaczego kupić nowy dom w Hiszpanii?',
    answer: 'Nowe domy w Hiszpanii oferują nowoczesny energooszczędny design, 10-letnią gwarancję strukturalną, możliwości dostosowania podczas budowy i niższe koszty utrzymania. Często obejmują wspólne udogodnienia, takie jak baseny i ogrody, są dostarczone z pełnymi gwarancjami prawnymi poprzez wpłaty zarządzane przez banki i zwykle szybciej rosną w wartości niż istniejące domy w pierwszych latach.'
  },
  {
    question: 'Ile kosztuje kupno nowego domu na Costa Blance?',
    answer: 'Ceny nowych domów na Costa Blance wahają się od około 150 000 EUR za apartamenty w południowych obszarach takich jak Torrevieja do ponad 2 milionów EUR za luksusowe wille w Jávea czy Moraira. Zaplanuj dodatkowe 10-13% powyżej ceny zakupu na podatki, opłaty notarialne, opłaty prawne i koszty rejestracji. Kupujący zagraniczni zazwyczaj potrzebują 30-40% zaliczki do finansowania hipotecznego.'
  },
  {
    question: 'Jaka jest różnica między Costa Blancą Północ a Południe?',
    answer: 'Costa Blanca Południe (Torrevieja do Pilar de la Horadada) oferuje bardziej przystępne cenowo domy, zagrożone zagraniczną społeczność i słoneczną pogodę przez cały rok z mniej deszczu. Costa Blanca Północ (Jávea do Benidormu) to rynek premium z dramatyczną górską linią brzegową, wyższymi cenami nieruchomości, bardziej autentyczną hiszpańską kulturą i bardziej zielonym krajobrazem. Oba obszary mają 300+ dni słonecznych rocznie.'
  },
  {
    question: 'Co oznacza gotowy do zamieszkania dla nowego domu?',
    answer: 'Gotowy do zamieszkania dom to nowy dom, który jest w pełni ukończony i natychmiast nadaje się do zamieszkania. Możesz zobaczyć ukończony dom do kupienia, uniknąć opóźnień w budowie i przenieść się w ciągu tygodni po zakończeniu zakupu. Gotowe domy mają nadal pełne nowe gwarancje od dewelopera.'
  },
  {
    question: 'Czy obywatele spoza UE mogą kupować nieruchomości w Hiszpanii?',
    answer: 'Tak, nie ma ograniczeń dla obywateli spoza UE przy zakupie nieruchomości w Hiszpanii. Będziesz potrzebować numeru NIE (numer identyfikacji cudzoziemca), którą może zorganizować Twój adwokat. Zakupy powyżej 500 000 EUR mogą kwalifikować się do hiszpańskiego programu Złotej Wizy. Proces zakupu zazwyczaj trwa 4-8 tygodni od rezerwacji do zamknięcia.'
  },
  {
    question: 'Jakie bieżące koszty powinienem oczekiwać jako właściciel w Hiszpanii?',
    answer: 'Roczne koszty obejmują podatek nieruchomości IBI (300-1500 EUR w zależności od wartości), opłaty za wspólnotę gruntów na wspólne udogodnienia (50-200 EUR/miesiąc), ubezpieczenie domu (200-500 EUR/rok) i media. Zagraniczni właściciele płacą również roczny podatek dochodowy od szacunkowej wartości wynajęcia. Całkowite roczne koszty operacyjne zazwyczaj wynoszą 2000-5000 EUR w zależności od rozmiaru i lokalizacji.'
  },
  {
    question: 'Czy nieruchomości Costa Blanca to dobra inwestycja?',
    answer: 'Nieruchomości Costa Blanca wykazywały konsekwentny wzrost wartości 3-6% rocznie w ostatnich latach, z rentowności wynajmu 5-8% w popularnych obszarach turystycznych. Silny popyt z Europy Północnej, ograniczona nowa dostępna ziemia do zabudowy, doskonałe połączenia transportowe przez lotnisko Alicante-Elche i całoroczne możliwości wynajmu czynią to atrakcyjną inwestycją.'
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pl-PL', {
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

export default function PolishPropertiesPage() {
  const [properties, setProperties] = useState<ParsedProperty[]>([]);
  const [towns, setTowns] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [bedOptions, setBedOptions] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
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
      } catch (error) {
        console.error('Error loading properties:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-warm-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-warm-600">Ładowanie nieruchomości...</p>
        </div>
      </main>
    );
  }

  const keyReadyCount = properties.filter(isPropertyKeyReady).length;

  return (
    <>
      <main className="min-h-screen bg-warm-50">
        <section className="relative bg-primary-900 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
                Wszystkie Nowe Domy na <span className="font-semibold text-accent-400">Costa Blance</span>
              </h1>
              <p className="text-warm-300 text-lg mb-10">
                {properties.length.toLocaleString()} nowych domów na najbardziej pożądanych lokalizacjach Costa Blanki
              </p>

              <PropertySearch towns={towns} types={types} bedOptions={bedOptions} />

              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-semibold text-accent-400">{properties.length.toLocaleString()}</div>
                  <div className="text-warm-400 text-sm">Nieruchomości</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-white">{towns.length}</div>
                  <div className="text-warm-400 text-sm">Lokalizacje</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-white">{types.length}</div>
                  <div className="text-warm-400 text-sm">Typy Domów</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border-b border-warm-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/pl/properties?status=key-ready"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Gotowy do Zamieszkania ({keyReadyCount})
              </Link>
              <Link
                href="/pl/properties?type=apartment"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-100 text-primary-900 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors"
              >
                Apartamenty
              </Link>
              <Link
                href="/pl/properties?type=villa"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-100 text-primary-900 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors"
              >
                Wille
              </Link>
              <Link
                href="/pl/properties?maxprice=300000"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-100 text-primary-900 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors"
              >
                Poniżej 300.000 EUR
              </Link>
            </div>
          </div>
        </section>

        <section className="py-8 px-4 bg-warm-50">
          <div className="max-w-4xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-semibold text-primary-900 mb-3">Jak kupić dom w Hiszpanii</h3>
            <p className="text-warm-600 mb-4">
              Jako polski kupujący możesz ubiegać się o spański kredyt hipoteczny przez różne banki. Polecamy:
            </p>
            <ul className="space-y-2 text-warm-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent-600 font-semibold mt-0.5">•</span>
                <span>Uzyskaj numer NIE (Numer Identyfikacji Cudzoziemca) przed rozpoczęciem procesu zakupu</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-600 font-semibold mt-0.5">•</span>
                <span>Zatrudnij doświadczonego adwokata mówiącego po polsku lub angielsku</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-600 font-semibold mt-0.5">•</span>
                <span>Zaplanuj dodatkowe 10-13% kosztów na podatki i opłaty prawne</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-600 font-semibold mt-0.5">•</span>
                <span>Zbadaj zarówno kredyty hipoteczne w Hiszpanii, jak i opcje polskich banków</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-10 text-center">
              Często Zadawane <span className="font-semibold">Pytania i Odpowiedzi</span>
            </h2>
            <div className="space-y-6">
              {POLISH_FAQS.map((faq, index) => (
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
              Potrzebujesz pomocy by znaleźć <span className="font-semibold">swój wymarzony dom?</span>
            </h2>
            <p className="text-warm-300 mb-8">Nasi lokalni eksperci znają każdy obszar i mogą dopasować Cię do idealnego domu.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/pl/contact" className="bg-white text-primary-900 px-8 py-3 rounded-md font-medium hover:bg-warm-100 transition-colors">
                Skontaktuj Się
              </Link>
              <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-md font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
