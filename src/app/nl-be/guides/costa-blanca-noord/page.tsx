import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Costa Blanca Noord | Gids voor Belgische Kopers 2026',
  description: 'Costa Blanca Noord gids voor Belgische kopers. Bergen, natuur, exclusieve projecten, en betoverend landschap in het noorden.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/guides/costa-blanca-noord',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/costa-blanca-north',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/costa-blanca-north',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/costa-blanca-noord',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/costa-blanca-noord',
      'x-default': 'https://newbuildhomescostablanca.com/guides/costa-blanca-north',
    },
  },
};

const faqs = [
  {
    question: 'Wat is Costa Blanca Noord?',
    answer: 'Nord strekt zich uit van Altea tot Cumbre del Sol tot Teulada. Het is bergachtig, minder commercieel, met meer natuur. Steden include Altea, Jávea, Cumbre del Sol, Moraira, Benissa.',
  },
  {
    question: 'Hoe verschillend is Noord van Zuid?',
    answer: 'Zeer verschillend. Noord is bergachtig, meer rustig, meer luxe vastgoed, veel minder toerisme, betere architectuur. Zuid is plat, commercieel, veel strand toerisme. Beide mooi, maar totaal ander karakter.',
  },
  {
    question: 'Hoeveel Belgische kopers zijn in Noord?',
    answer: 'Minder dan zuiden. Geschat 300-500 Belgische families verspreid over noorden. Je voelt je niet in "Belgische bubbel". Meer internationaal.',
  },
  {
    question: 'Zijn prijzen veel hoger in Noord?',
    answer: 'Ja, aanzienlijk. Noord kosten 50-150% meer dan zuiden. Maar je krijgt beter bouw, betere uitzichten, en exclusiviteit.',
  },
  {
    question: 'Is Noord goed voor belegging?',
    answer: 'Ander model. Minder toeristen maar hogere huurprijzen. Meer waardegroei op lange termijn. Beter voor luxe vastgoed beleggers.',
  },
  {
    question: 'Welke zijn beste buurten in Noord?',
    answer: 'Cumbre del Sol (ultra luxe), Jávea (bekend, diverse), Moraira (charming, exclusief), Altea (artistiek, betaalbaarder), Benissa (rustig, goedkoper).',
  },
  {
    question: 'Wat zijn activiteiten in Noord?',
    answer: 'Wandelen, kust wandelen, duiken, zeilen, restaurants, kunst galeries, markten. Veel meer natuur dan toerisme fokus.',
  },
  {
    question: 'Moet ik auto hebben in Noord?',
    answer: 'Ja, aanzienlijker. Openbaar vervoer is minder gebruikt. Bergen maken dat locaties meer verspreidt zijn. Auto is bijna essentieel.',
  },
];

export default function CostaBlancarNoordPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl-be' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl-be/guides' },
    { name: 'Costa Blanca Noord', url: 'https://newbuildhomescostablanca.com/nl-be/guides/costa-blanca-noord' },
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
            <h1 className="text-5xl sm:text-6xl font-light mb-6">Costa Blanca Noord</h1>
            <p className="text-xl text-warm-200 mb-4">Bergachtig, luxe, en betoverend schoon</p>
            <p className="text-lg text-warm-300">
              Ontdek het noordelijke deel van Costa Blanca - anders dan zuiden en veel mooier.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Overview */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Costa Blanca Noord - Overzicht</h2>

              <p className="text-warm-700 mb-6">
                Noord Costa Blanca strekt zich uit van Altea tot Teulada, inclusief Jávea, Cumbre del Sol, Moraira, Benissa, en kleinere dorpjes. Dit is de voorkeur van luxe kopers, natuurliefhebbers, en kopers die exclusiviteit waarderen.
              </p>

              <p className="text-warm-700 mb-6">
                Het landschap is totaal anders dan zuiden. Bergen, bossen, kleine rustige baaitjes. Dit is niet massa toerisme - dit is Mediterranean boutique.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-accent-50 rounded-sm p-4 border border-accent-200 text-center">
                  <p className="text-3xl font-light text-accent-600 mb-2">800m+</p>
                  <p className="text-sm text-warm-700">Bergvormingen</p>
                </div>
                <div className="bg-accent-50 rounded-sm p-4 border border-accent-200 text-center">
                  <p className="text-3xl font-light text-accent-600 mb-2">15</p>
                  <p className="text-sm text-warm-700">Prachtige baaitjes</p>
                </div>
                <div className="bg-accent-50 rounded-sm p-4 border border-accent-200 text-center">
                  <p className="text-3xl font-light text-accent-600 mb-2">300+</p>
                  <p className="text-sm text-warm-700">Zonnedagen</p>
                </div>
              </div>
            </div>

            {/* Key Towns */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Belangrijkste Steden & Buurten</h2>

              <div className="space-y-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">Cumbre del Sol</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Ultra-luxe gated community. Indrukwekkende panorama\'s, moderne villa\'s. Dit is voorkeur van super-rijke beleggers. Heel exclusief, heel duur.
                  </p>
                  <p className="text-accent-600 font-semibold text-sm">Prijzen: 600k-2M+ euro | Belgische families: Weinig</p>
                </div>

                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">Jávea</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Meest populair in noordregio. Prachtige baai, meer leven, veel restaurants. Minder duur dan Cumbre del Sol, maar nog premium.
                  </p>
                  <p className="text-accent-600 font-semibold text-sm">Prijzen: 400-1M euro | Belgische families: 100-200</p>
                </div>

                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">Moraira</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Charming fishing village. Kleine baai, veel goede restaurants. Meer authentiek dan Jávea. Exclusief maar rustig.
                  </p>
                  <p className="text-accent-600 font-semibold text-sm">Prijzen: 350-800k euro | Belgische families: Weinig</p>
                </div>

                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">Altea</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Artistiek dorp op heuvels. Beroemde blauwe koepels. Bohemisch karakter. Betaalbaarder dan andere noordse steden.
                  </p>
                  <p className="text-accent-600 font-semibold text-sm">Prijzen: 250-600k euro | Belgische families: Middel</p>
                </div>

                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">Benissa & Teulada</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Meer afgelegen dorpjes. Rustig, meer local leven. Betaalbaarder dan Jávea. Voor kopers die echt quiet willen.
                  </p>
                  <p className="text-accent-600 font-semibold text-sm">Prijzen: 200-450k euro | Belgische families: Weinig</p>
                </div>
              </div>
            </div>

            {/* Characteristics */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Karakteristieken van Noord</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="font-semibold text-primary-900 mb-4">Landschap</h3>
                  <ul className="space-y-2 text-warm-700 text-sm">
                    <li>Bergen en bergwandelingen</li>
                    <li>Veel bossen en groen</li>
                    <li>Kleine, intieme baaitjes</li>
                    <li>Veel pittoreske dorpjes</li>
                    <li>Spectaculaire kust routes</li>
                  </ul>
                </div>

                <div className="border border-accent-200 rounded-sm p-6 bg-accent-50">
                  <h3 className="font-semibold text-primary-900 mb-4">Sfeer & Cultuur</h3>
                  <ul className="space-y-2 text-warm-700 text-sm">
                    <li>Meer rustig en relaxed</li>
                    <li>Veel kunstenaars en culturele initiatieven</li>
                    <li>Goede restaurants en wijnbars</li>
                    <li>Lokale markten en winkels</li>
                    <li>Minder commercieel dan zuiden</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Real Estate Market */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Vastgoedmarkt Noord</h2>

              <div className="space-y-6">
                <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Prijzen</h3>
                  <div className="space-y-2 text-warm-700 text-sm">
                    <p className="flex justify-between border-b border-accent-200 pb-2">
                      <span>Studio/1-slaapkamer:</span>
                      <span>300-500k euro</span>
                    </p>
                    <p className="flex justify-between border-b border-accent-200 pb-2">
                      <span>2-3 slaapkamer:</span>
                      <span>450-800k euro</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Villa\'s:</span>
                      <span>700k-2M+ euro</span>
                    </p>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-sm p-6 border border-primary-200">
                  <h3 className="font-semibold text-primary-900 mb-3">Type Projecten</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Noord heeft meer exclusieve projecten met minder eenheden. Meer nadruk op design en architectuur. Veel gated communities.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-warm-700 text-sm ml-2">
                    <li>Luxe gated communities (Cumbre del Sol)</li>
                    <li>Designer villas</li>
                    <li>Kleine boutique projecten</li>
                    <li>Beachfront exclusiva</li>
                  </ul>
                </div>

                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-3">ROI voor Beleggers</h3>
                  <p className="text-warm-700 text-sm">
                    Typisch 3-5% huurinkomsten + 2-3% jaarlijkse waardegroei. Exclusieve locaties beter in waardegroei dan volume.
                  </p>
                </div>
              </div>
            </div>

            {/* Climate & Activities */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Weer & Activiteiten</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="font-semibold text-primary-900 mb-4">Weer Noord</h3>
                  <div className="space-y-2 text-sm text-warm-700">
                    <p className="flex justify-between">
                      <span>Winter:</span>
                      <span>8-10C</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Lente:</span>
                      <span>16-22C</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Zomer:</span>
                      <span>28-30C</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Herfst:</span>
                      <span>18-22C</span>
                    </p>
                  </div>
                  <p className="text-accent-600 font-semibold text-sm mt-4">Matigere temperaturen, minder extreem</p>
                </div>

                <div className="border border-accent-200 rounded-sm p-6 bg-accent-50">
                  <h3 className="font-semibold text-primary-900 mb-4">Activiteiten</h3>
                  <ul className="space-y-2 text-warm-700 text-sm">
                    <li>Wandelen & bergwandelen</li>
                    <li>Zeilen & watersporten</li>
                    <li>Duiken (excellent)</li>
                    <li>Restaurants & wine tasting</li>
                    <li>Kunstgaleries bezoeken</li>
                    <li>Lokale markten</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Why Choose Noord */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Waarom Noord Kiezen?</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-semibold text-primary-900">Natuurlijke Schoonheid</p>
                    <p className="text-warm-700 text-sm">Bergen, bossen, kleine baaitjes. Dit is veel mooier dan zand strand zuiden.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-semibold text-primary-900">Exclusiviteit</p>
                    <p className="text-warm-700 text-sm">Minder commercieel, meer privé, meer elegant. U voelt premium.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-semibold text-primary-900">Betere Architectuur</p>
                    <p className="text-warm-700 text-sm">Design-fokus, niet volume. Huizen zijn mooier gebouwd.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-semibold text-primary-900">Matigere Temperaturen</p>
                    <p className="text-warm-700 text-sm">Niet extreem heet in zomer. Frisser en aangenaam.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-semibold text-primary-900">Waardegroei</p>
                    <p className="text-warm-700 text-sm">Exclusieve locaties groeien beter dan volume gebieden.</p>
                  </div>
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

            {/* Comparison */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 mb-12">
              <h2 className="text-2xl font-light mb-6">Noord vs Zuid - Samenvatting</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-sm p-6">
                  <p className="font-semibold mb-3">Zuid (Torrevieja)</p>
                  <ul className="space-y-2 text-sm text-warm-200">
                    <li>Betaalbaar</li>
                    <li>Strand toerisme</li>
                    <li>Belgische gemeenschap</li>
                    <li>Commercieel</li>
                    <li>Huurinkomsten</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-sm p-6">
                  <p className="font-semibold mb-3">Noord (Jávea, etc.)</p>
                  <ul className="space-y-2 text-sm text-warm-200">
                    <li>Premium prijzen</li>
                    <li>Natuur & bergvormingen</li>
                    <li>Internationale mix</li>
                    <li>Rustig & exclusief</li>
                    <li>Waardegroei</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 text-center">
              <h2 className="text-2xl font-light mb-4">Ontdek Costa Blanca Noord</h2>
              <p className="text-warm-200 mb-6">
                Onze experts gids door de beste buurten en exclusieve projecten in het noorden.
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
