import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Noord vs Zuid Costa Blanca | Welke Regio Past Bij U? 2026',
  description: 'Vergelijk Noord en Zuid Costa Blanca. Prijzen, klimaat, infrastructuur, en welke regio past best bij Belgische kopers.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/guides/noord-vs-zuid',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/north-vs-south',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/noord-vs-zuid',
    },
  },
};

const faqs = [
  {
    question: 'Welke regio is goedkoper?',
    answer: 'Zuiden (Torrevieja, Punta Prima) is goedkoper. Prijzen 30-40% lager dan noorden. Noorden (Jávea, Cumbre del Sol) is meer upscale en duurder. De keuze hangt af van budget.',
  },
  {
    question: 'Wat is het klimaat verschil?',
    answer: 'Beide zijn warm en zonnig. Zuiden is iets warmer (winters 12-15C, zomers 32-35C). Noorden is frisser (winters 8-10C, zomers 28-30C). Voor Belgische kopers kan noorden minder extreem voelen.',
  },
  {
    question: 'Welke regio is meer toeristische?',
    answer: 'Beide zijn toeristische. Zuiden (Torrevieja) is meer strandtoerisme, wat drukker. Noorden (Jávea) is meer verspreid, meer natuur. Dit beïnvloedt huurverhuur en gezelligheid.',
  },
  {
    question: 'Zijn er veel Belgische kopers in beide?',
    answer: 'Ja, in beide. Zuiden heeft grotere Belgische gemeenschappen (meer betaalbaarheid). Noorden ook Belgische gemeenschappen, maar minder talrijk. Beide hebben Nederlands sprekende services.',
  },
  {
    question: 'Welke heeft betere infrastructuur?',
    answer: 'Zuiden heeft meer toeristische faciliteiten (restaurants, shops). Noorden is meer rustig, minder commercieel. Voor medische diensten zijn beide goed voorzien. Het hangt af van uw voorkeur.',
  },
  {
    question: 'Wat zijn de beste buurten in zuiden?',
    answer: 'Torrevieja, Punta Prima, Orihuela Costa zijn populair. Goede prijzen, veel Belgische kopers, goede services. Flamenca is ook goed maar wat verder van zee.',
  },
  {
    question: 'Wat zijn beste buurten in noorden?',
    answer: 'Jávea, Cumbre del Sol, Moraira zijn upscale. Duurder maar meer exclusief. Altea is ook populair, iets betaalbaarder. Benissa is rustiger en goedkoper.',
  },
  {
    question: 'Welke is beter voor investering/verhuur?',
    answer: 'Zuiden biedt meer aantallen toeristen (meer huurinkomsten). Noorden biedt exclusiviteit (hogere huurprijs). Beide werken, keuze afhankelijk van uw strategie.',
  },
];

export default function NoordVsZuidPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl-be' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl-be/guides' },
    { name: 'Noord vs Zuid', url: 'https://newbuildhomescostablanca.com/nl-be/guides/noord-vs-zuid' },
  ]);
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />
      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-light mb-6">Noord vs Zuid Costa Blanca</h1>
            <p className="text-xl text-warm-200 mb-4">Welke regio past bij u?</p>
            <p className="text-lg text-warm-300">
              Beide gebieden hebben unieke voordelen. Begrijp de verschillen om de beste keuze te maken.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Quick Comparison */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Snelle Vergelijking</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-primary-900">
                      <th className="text-left py-3 px-4 font-semibold text-primary-900">Aspect</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary-900">Zuid</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary-900">Noord</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-warm-200">
                      <td className="py-3 px-4 font-semibold text-primary-900">Prijs</td>
                      <td className="py-3 px-4">Betaalbaar (200-400k)</td>
                      <td className="py-3 px-4">Upscale (400-800k+)</td>
                    </tr>
                    <tr className="border-b border-warm-200">
                      <td className="py-3 px-4 font-semibold text-primary-900">Klimaat</td>
                      <td className="py-3 px-4">Warm & Zonnig</td>
                      <td className="py-3 px-4">Fris & Zonnig</td>
                    </tr>
                    <tr className="border-b border-warm-200">
                      <td className="py-3 px-4 font-semibold text-primary-900">Toerisme</td>
                      <td className="py-3 px-4">Veel (Strand)</td>
                      <td className="py-3 px-4">Matig (Natuur)</td>
                    </tr>
                    <tr className="border-b border-warm-200">
                      <td className="py-3 px-4 font-semibold text-primary-900">Belgische Gemeenschap</td>
                      <td className="py-3 px-4">Groot</td>
                      <td className="py-3 px-4">Klein</td>
                    </tr>
                    <tr className="border-b border-warm-200">
                      <td className="py-3 px-4 font-semibold text-primary-900">Infrastructuur</td>
                      <td className="py-3 px-4">Commercieel</td>
                      <td className="py-3 px-4">Rustig</td>
                    </tr>
                    <tr className="border-b border-warm-200">
                      <td className="py-3 px-4 font-semibold text-primary-900">Huurinkomsten</td>
                      <td className="py-3 px-4">Hoog (veel toeristen)</td>
                      <td className="py-3 px-4">Middel (exclusief)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-primary-900">Toekomst</td>
                      <td className="py-3 px-4">Stabil & Groeiend</td>
                      <td className="py-3 px-4">Premium & Exclusief</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* South */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Zuid Costa Blanca</h2>

              <p className="text-warm-700 mb-6">
                Zuiden bestaat uit gebieden zoals Torrevieja, Punta Prima, Orihuela Costa, en Pilar de la Horadada. Dit zijn de populairste gebieden voor Belgische kopers vanwege betaalbaarheid en grote gemeenschappen.
              </p>

              <div className="space-y-6">
                <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Voordelen</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Betaalbaarder prijzen (30-40% lager)</li>
                    <li>Grote Belgische gemeenschappen en services</li>
                    <li>Veel toeristen = hogere huurinkomsten</li>
                    <li>Strandtoerisme zeer populair</li>
                    <li>Veel restaurants, winkels en faciliteiten</li>
                    <li>Goed voor investeringsdoeleinden</li>
                    <li>Veel keuze in woningen en projecten</li>
                  </ul>
                </div>

                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Nadelen</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Erg warm in zomer (32-35 graden)</li>
                    <li>Drukker en meer commercieel</li>
                    <li>Minder natuurlijke schoonheid</li>
                    <li>Soms minder exclusieve sfeer</li>
                    <li>Flat gebouwen dominant</li>
                  </ul>
                </div>

                <div className="bg-primary-50 rounded-sm p-6 border border-primary-200">
                  <h3 className="font-semibold text-primary-900 mb-3">Populaire Buurten</h3>
                  <div className="space-y-3 text-warm-700 text-sm">
                    <p>
                      <span className="font-semibold">Torrevieja:</span> Meest populair voor Belgen. Grote haven, strand, veel winkels. Prijzen 250-400k euro voor standaard appartement.
                    </p>
                    <p>
                      <span className="font-semibold">Punta Prima:</span> Luxe strandresort. Mooie stranden, meer upscale. Prijzen 300-500k euro.
                    </p>
                    <p>
                      <span className="font-semibold">Orihuela Costa:</span> Rustig strand dorp, veel Belgen. Betaalbaar. Prijzen 200-350k euro.
                    </p>
                  </div>
                </div>

                <div className="bg-warm-100 rounded-sm p-6 border border-warm-300">
                  <h3 className="font-semibold text-primary-900 mb-3">Voor wie geschikt?</h3>
                  <p className="text-warm-700">
                    Belgische kopers die betaalbare vastgoed zoeken, groot sociaal netwerk van Belgen willen, of verhuurinkomsten willen uit toerisme.
                  </p>
                </div>
              </div>
            </div>

            {/* North */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Noord Costa Blanca</h2>

              <p className="text-warm-700 mb-6">
                Noorden bestaat uit gebieden zoals Jávea, Cumbre del Sol, Moraira, Altea en Benissa. Dit zijn meer exclusieve gebieden, populair voor luxe vastgoed en natuur liefhebbers.
              </p>

              <div className="space-y-6">
                <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Voordelen</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Prachtige natuurlijke schoonheid</li>
                    <li>Berglandschap en natuur</li>
                    <li>Rustiger en meer exclusief</li>
                    <li>Minder commercieel voelen</li>
                    <li>Frisser klimaat (minder extreem)</li>
                    <li>Luxe woningen met uitzicht</li>
                    <li>Betere waardevasthoudending (premium)</li>
                  </ul>
                </div>

                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Nadelen</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Veel duurder (40-100% meer dan zuiden)</li>
                    <li>Kleinere Belgische gemeenschap</li>
                    <li>Minder toeristen = lager huurinkomsten</li>
                    <li>Minder winkels en faciliteiten</li>
                    <li>Meer isolatie (minder stedelijk)</li>
                  </ul>
                </div>

                <div className="bg-primary-50 rounded-sm p-6 border border-primary-200">
                  <h3 className="font-semibold text-primary-900 mb-3">Populaire Buurten</h3>
                  <div className="space-y-3 text-warm-700 text-sm">
                    <p>
                      <span className="font-semibold">Jávea:</span> Meest bekend in noorden. Mooie baai, veel activiteiten, klassieke mediterrane charme. Prijzen 400-800k euro.
                    </p>
                    <p>
                      <span className="font-semibold">Cumbre del Sol:</span> Ultra luxe gated community. Panorama uitzichten, exclusief. Prijzen 600k-1.5M euro.
                    </p>
                    <p>
                      <span className="font-semibold">Altea:</span> Charmant bergstadje, goede compromis. Prijzen 300-600k euro. Wat betaalbaarder dan Jávea.
                    </p>
                  </div>
                </div>

                <div className="bg-warm-100 rounded-sm p-6 border border-warm-300">
                  <h3 className="font-semibold text-primary-900 mb-3">Voor wie geschikt?</h3>
                  <p className="text-warm-700">
                    Belgische kopers met groter budget, die natuur en exclusiviteit waarderen, en minder behoefte hebben aan grote sociale gemeenschappen.
                  </p>
                </div>
              </div>
            </div>

            {/* Climate Comparison */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Klimaat & Weer</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="font-semibold text-primary-900 mb-4">Zuid (Torrevieja)</h3>
                  <div className="space-y-2 text-sm text-warm-700">
                    <p className="flex justify-between">
                      <span>Jan-Mrt (Winter):</span>
                      <span>12-15C, zonnig</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Apr-Jun (Lente):</span>
                      <span>18-25C, heel aangenaam</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Jul-Sep (Zomer):</span>
                      <span>32-35C, erg warm</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Okt-Dec (Herfst):</span>
                      <span>20-25C, aangenaam</span>
                    </p>
                    <p className="font-semibold text-accent-600 mt-4 border-t border-warm-200 pt-2">
                      Kenmerk: Heel erg warm in zomer
                    </p>
                  </div>
                </div>

                <div className="border border-accent-200 rounded-sm p-6 bg-accent-50">
                  <h3 className="font-semibold text-primary-900 mb-4">Noord (Jávea)</h3>
                  <div className="space-y-2 text-sm text-warm-700">
                    <p className="flex justify-between">
                      <span>Jan-Mrt (Winter):</span>
                      <span>8-10C, fris maar zonnig</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Apr-Jun (Lente):</span>
                      <span>16-22C, aangenaam</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Jul-Sep (Zomer):</span>
                      <span>28-30C, warm</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Okt-Dec (Herfst):</span>
                      <span>18-22C, heel aangenaam</span>
                    </p>
                    <p className="font-semibold text-accent-600 mt-4 border-t border-accent-300 pt-2">
                      Kenmerk: Matigere temperaturen
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-warm-700">
                <span className="font-semibold">Voor Belgische kopers:</span> Noorden voelt misschien natuurlijker omdat temperaturen minder extreem zijn. Zuid is echter ook leuk voor meeste mensen - de warmte is droog en aangenaam.
              </p>
            </div>

            {/* Belgian Community */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Belgische Gemeenschappen</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="font-semibold text-primary-900 mb-4">Zuid (Groot Belgisch Netwerk)</h3>
                  <ul className="space-y-2 text-warm-700 text-sm">
                    <li className="font-semibold">Torrevieja:</li>
                    <li className="ml-4">1000+ Belgische families</li>
                    <li className="ml-4">Nederlandse kerk, Belgische winkels</li>
                    <li className="ml-4">Veel Belgische vrienden mogelijk</li>

                    <li className="font-semibold mt-4">Voordelen:</li>
                    <li className="ml-4">Makkelijk vriendschappen bouwen</li>
                    <li className="ml-4">Nederlands spreken overal</li>
                    <li className="ml-4">Belgische services & restaurants</li>
                  </ul>
                </div>

                <div className="border border-accent-200 rounded-sm p-6 bg-accent-50">
                  <h3 className="font-semibold text-primary-900 mb-4">Noord (Kleinere Belgische Gemeenschap)</h3>
                  <ul className="space-y-2 text-warm-700 text-sm">
                    <li className="font-semibold">Jávea:</li>
                    <li className="ml-4">100-200 Belgische families</li>
                    <li className="ml-4">Meer internationaal gemengd</li>
                    <li className="ml-4">Belgische vrienden schaars</li>

                    <li className="font-semibold mt-4">Voordelen:</li>
                    <li className="ml-4">Meer internationale vrienden</li>
                    <li className="ml-4">Minder "Belgische bubbel"</li>
                    <li className="ml-4">Meer ontdekkingsmogelijkheden</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Investment Perspective */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Investerings Perspectief</h2>

              <div className="space-y-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="font-semibold text-primary-900 mb-4">Zuid - Goed voor Huur & Volume</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2 text-sm mb-3">
                    <li>Veel toeristen = hogere huurvragen</li>
                    <li>Typische huurprijs: 800-1200 euro/maand</li>
                    <li>Veel beleggers concurrentie</li>
                    <li>Stabiele, voorspelbare inkomsten</li>
                    <li>Goed voor langetermijn vastgoedportefeuille</li>
                  </ul>
                  <p className="text-accent-600 font-semibold">ROI: 4-6% per jaar (huurinkomsten)</p>
                </div>

                <div className="border border-accent-200 rounded-sm p-6 bg-accent-50">
                  <h3 className="font-semibold text-primary-900 mb-4">Noord - Goed voor Waardegroei</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2 text-sm mb-3">
                    <li>Minder toeristen maar exclusiever</li>
                    <li>Typische huurprijs: 1200-2000 euro/maand</li>
                    <li>Betere waardegroei over tijd</li>
                    <li>Premium posities hebben lange termijn potentieel</li>
                    <li>Goed voor langzame maar vaste appreciatie</li>
                  </ul>
                  <p className="text-accent-600 font-semibold">ROI: 3-5% huur + 2-3% waardestijging</p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-8">Veelgestelde Vragen</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-warm-200 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-primary-900 mb-3">{faq.question}</h3>
                    <p className="text-warm-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Helper */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 mb-12">
              <h2 className="text-2xl font-light mb-6">Welke Regio Kiezen?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-sm p-6">
                  <p className="font-semibold mb-3 text-lg">Zuid Kiezen Als:</p>
                  <ul className="space-y-2 text-sm text-warm-200">
                    <li>U betaalbare vastgoed wilt</li>
                    <li>U grote Belgische gemeenschap wilt</li>
                    <li>U huurinkomsten wilt</li>
                    <li>U veel stranden & toerisme wilt</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-sm p-6">
                  <p className="font-semibold mb-3 text-lg">Noord Kiezen Als:</p>
                  <ul className="space-y-2 text-sm text-warm-200">
                    <li>U luxe & exclusiviteit wilt</li>
                    <li>U natuur & berglandschap wilt</li>
                    <li>U minder extreem weer wilt</li>
                    <li>U waardegroei zoekt over huurinkomsten</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 text-center">
              <h2 className="text-2xl font-light mb-4">Hulp Kiezen Welke Regio?</h2>
              <p className="text-warm-200 mb-6">
                Onze experts kennen beide regio's goed en kunnen u helpen bepalen welke best bij u past.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/nl-be/contact">
                  <button className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-8 rounded-sm transition-colors">
                    Plan Adviesgesprek
                  </button>
                </Link>
                <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer">
                  <button className="bg-white hover:bg-warm-100 text-primary-900 font-semibold py-3 px-8 rounded-sm transition-colors">
                    WhatsApp
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Guides */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-warm-200">
          <div className="max-w-4xl mx-auto">
            <Link href="/nl-be/guides" className="text-accent-600 hover:text-accent-700 font-semibold flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Terug naar Gidsen
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
