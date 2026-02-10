import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Wonen in Jávea | Gids voor Belgische Kopers 2026',
  description: 'Jávea gids voor Belgische kopers. Klassieke mediterrane charme, bergzicht, exclusieve stranden, en wat kopers moeten weten.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/guides/javea',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/javea',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/javea',
    },
  },
};

const faqs = [
  {
    question: 'Waarom is Jávea populair?',
    answer: 'Prachtige natuurlijke baai, berglandschap, veel mooiere stranden dan zuiden, meer rustig en exclusief. Perfect voor kopers die natuur waarderen. Ook veel internationale residents.',
  },
  {
    question: 'Hoeveel kosten huizen in Jávea?',
    answer: 'Studio/1-slaapkamer: 300-500k euro. 2-slaapkamer: 450-700k euro. Villa\'s: 700k-2M+ euro. Dit is 50-100% duurder dan Torrevieja, maar bouw en uitzicht is beter.',
  },
  {
    question: 'Hoe veel Belgen wonen in Jávea?',
    answer: 'Minder dan Torrevieja. Geschat 100-200 Belgische families. Meer internationaal gemengd. Nederlands spreken is minder gebruikelijk.',
  },
  {
    question: 'Is Jávea goed voor verhuur?',
    answer: 'Ja, maar ander model. Minder toeristen maar hogere prijzen per nacht (3-5 ster toerisme). Seizoens verhuur mogelijk. ROI 3-5%.',
  },
  {
    question: 'Wat zijn de beste buurten?',
    answer: 'Playa Paraiso (beachfront, duur), Arenal (mediumbeachfront), Granadella Bay (natuur, rustig), Calvari (oud centrum, charme), Portixol (fishing village).',
  },
  {
    question: 'Is klimaat anders dan zuiden?',
    answer: 'Iets frisser (3-4 graden). Winters 8-10C, zomers 28-30C. Minder extreem. Meer wind mogelijk in winter (bergpas werking).',
  },
  {
    question: 'Zijn medische diensten beschikbaar?',
    answer: 'Ja, goed ziekenhuizen (Marina Salud, Hospital de Jávea). Veel private klinieken. Goede apotheek service. Voor specialists naar Alicante.',
  },
  {
    question: 'Wat zijn activiteiten in Jávea?',
    answer: 'Wandelen, bergwandelen, zeilen, duiken (excellent), fishing, restaurants. Meer natuur georiënteerd. Het is niet zo toeristische als Torrevieja.',
  },
];

export default function JavaPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl-be' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl-be/guides' },
    { name: 'Jávea', url: 'https://newbuildhomescostablanca.com/nl-be/guides/javea' },
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
            <h1 className="text-5xl sm:text-6xl font-light mb-6">Jávea</h1>
            <p className="text-xl text-warm-200 mb-4">Mediterrane charme met berglandschap</p>
            <p className="text-lg text-warm-300">
              Ontdek waarom Jávea de voorkeur is voor kopers die natuur en exclusiviteit waarderen.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Overview */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Wat Is Jávea?</h2>

              <p className="text-warm-700 mb-6">
                Jávea is een pittoresque kuststad van ongeveer 30.000 inwoners aan de Noord Costa Blanca. Bekend om zijn prachtige baai, berglandschap en klassieke mediterrane charme. Dit is niet het drukke strand Torrevieja - dit is rustig, exclusief en natuurlijk.
              </p>

              <p className="text-warm-700 mb-6">
                Jávea is de voorkeur van luxe kopers, expats uit Europa, en Belgische kopers die kwaliteit boven kwantiteit kiezen. De stad voelt meer Europees dan Spaans toerisme.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-accent-50 rounded-sm p-4 border border-accent-200 text-center">
                  <p className="text-3xl font-light text-accent-600 mb-2">6 Bayen</p>
                  <p className="text-sm text-warm-700">Prachtige stranden</p>
                </div>
                <div className="bg-accent-50 rounded-sm p-4 border border-accent-200 text-center">
                  <p className="text-3xl font-light text-accent-600 mb-2">800m</p>
                  <p className="text-sm text-warm-700">Mogon bergvormingen</p>
                </div>
                <div className="bg-accent-50 rounded-sm p-4 border border-accent-200 text-center">
                  <p className="text-3xl font-light text-accent-600 mb-2">300+</p>
                  <p className="text-sm text-warm-700">Zonnige dagen/jaar</p>
                </div>
              </div>
            </div>

            {/* Character */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Karakter van Jávea</h2>

              <p className="text-warm-700 mb-6">
                Jávea voelt heel anders dan Torrevieja. Dit is meer exclusief, meer geïntegreerd met natuur, met beter architectuur. De bouw lijkt hier Scandinavische huizen in plaats van commerciële flat blokken.
              </p>

              <div className="space-y-6">
                <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Onderscheidende Kenmerken:</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Bergachtig terrein met mooie villa's in hellingen</li>
                    <li>Veel meer groene ruimte dan Torrevieja</li>
                    <li>Kleinere, intimere stranden (niet massa toerisme)</li>
                    <li>Goed behouden oude centrum met local character</li>
                    <li>Veel internationaal mengelvolle (niet dominant Belgisch)</li>
                    <li>Betere architectuur en stedenbouw</li>
                  </ul>
                </div>

                <div className="bg-primary-50 rounded-sm p-6 border border-primary-200">
                  <h3 className="font-semibold text-primary-900 mb-3">Voelen van Jávea</h3>
                  <p className="text-warm-700">
                    Minder commercieel, meer authentiek. Als u Torrevieja's commercialiteit ontmoet en wilt ontsnappen, Jávea voelt als een sprong in sophisticatie.
                  </p>
                </div>
              </div>
            </div>

            {/* Neighborhoods */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Buurten in Jávea</h2>

              <div className="space-y-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">Playa Paraiso & Beachfront</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Exclusief beachfront, veel villa's met zee-uitzicht. Premium prijzen. Veel internationale expats. Prachtige stranden.
                  </p>
                  <p className="text-accent-600 font-semibold text-sm">Prijzen: 600k-1.5M+ euro</p>
                </div>

                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">Arenal (Mediumbeach)</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Rustige buurt dicht bij strand. Goed compromis tussen stranden bereikbaarheid en rust. Veel appartamenten en kleine villas.
                  </p>
                  <p className="text-accent-600 font-semibold text-sm">Prijzen: 450-800k euro</p>
                </div>

                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">Calvari (Oud Centrum)</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Pittoresk oud stadje centrum. Veel restaurantjes, winkels. Voetgangers vriendelijk. Typisch mediterraan character.
                  </p>
                  <p className="text-accent-600 font-semibold text-sm">Prijzen: 400-700k euro</p>
                </div>

                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">Granadella & Bergen</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Weg van centrum, dicht bij natuur. Rustige residentiële villas. Wandelen en natuur mogelijkheden. Meer privé.
                  </p>
                  <p className="text-accent-600 font-semibold text-sm">Prijzen: 350-600k euro</p>
                </div>
              </div>
            </div>

            {/* Lifestyle */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Levensstijl in Jávea</h2>

              <p className="text-warm-700 mb-6">
                Jávea is voor actieve, natuur-liefhebbende kopers. Dit is niet passieve toerisme; dit is integrale levensstijl verandering.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="font-semibold text-primary-900 mb-4">Outdoor Activiteiten</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 text-sm ml-2">
                    <li>Bergwandelingen (Mogon trails)</li>
                    <li>Zeilen en watersporten</li>
                    <li>Duiken (Jávea is duik paradijs)</li>
                    <li>Fishing & jachting</li>
                    <li>Fietsen route's</li>
                  </ul>
                </div>

                <div className="border border-accent-200 rounded-sm p-6 bg-accent-50">
                  <h3 className="font-semibold text-primary-900 mb-4">Cultuur & Restaurants</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 text-sm ml-2">
                    <li>Veel goede restaurants (niet fastfood)</li>
                    <li>Wijnbars en lokale eet zaken</li>
                    <li>Kunstgaleries en culturele evenementen</li>
                    <li>Lokale markten en winkels</li>
                    <li>Relaxed Mediterranean pace</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Living Costs */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Levenskosten in Jávea</h2>

              <div className="space-y-4 mb-6">
                <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Vergelijking met Torrevieja</h3>
                  <p className="text-warm-700 text-sm mb-4">
                    Jávea is duurder, vooral in huisvesting. Levenskosten zijn vergelijkbaar, wat restaurants wat duurder.
                  </p>
                  <div className="space-y-2 text-sm text-warm-700">
                    <p className="flex justify-between border-b border-accent-200 pb-2">
                      <span>Huizen (betaling)</span>
                      <span>50-100% duurder</span>
                    </p>
                    <p className="flex justify-between border-b border-accent-200 pb-2">
                      <span>Woonkosten</span>
                      <span>Vergelijkbaar (200-300)</span>
                    </p>
                    <p className="flex justify-between border-b border-accent-200 pb-2">
                      <span>Restaurants</span>
                      <span>15-25% duurder</span>
                    </p>
                    <p className="flex justify-between pt-2">
                      <span>Totale levenskosten</span>
                      <span>800-1100 euro/maand (eigenaar)</span>
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-warm-700">
                <span className="font-semibold">Conclusie:</span> Jávea is duurder in aankoop, maar levenskosten zijn niet veel anders. U betaalt voor betere locatie en uitzicht.
              </p>
            </div>

            {/* International Community */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Internationale Gemeenschap</h2>

              <p className="text-warm-700 mb-6">
                Jávea is meer internationaal mengelvolle dan Torrevieja. U vindt expats uit Scandinavië, UK, Deutschland, maar minder Belgische gemeenschap.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-semibold text-primary-900">Voordeel:</p>
                    <p className="text-warm-700 text-sm">Meer internationale vriendschappen, geen "Belgische bubbel", cultureel diverse ervaring</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-semibold text-primary-900">Nadeel:</p>
                    <p className="text-warm-700 text-sm">Minder Nederlands spreken, minder Belgische services, meer moeten oppikken van locals</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 rounded-sm p-6 border border-primary-200 mt-6">
                <p className="text-warm-700">
                  Voor Belgen die internationaal willen groeien en minder behoefte hebben aan Belgische gemeenschap, is dit perfect.
                </p>
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

            {/* Comparison to Torrevieja */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 mb-12">
              <h2 className="text-2xl font-light mb-6">Jávea vs Torrevieja - In Korte Woorden</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-sm p-6">
                  <p className="font-semibold mb-3">Kies Jávea Als:</p>
                  <ul className="space-y-2 text-sm text-warm-200">
                    <li>U natuur en rust wilt</li>
                    <li>U groter budget hebt</li>
                    <li>U exclusieve locaties waardeert</li>
                    <li>U internationale vriendschappen wilt</li>
                    <li>U niet van drukke toerisme houdt</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-sm p-6">
                  <p className="font-semibold mb-3">Kies Torrevieja Als:</p>
                  <ul className="space-y-2 text-sm text-warm-200">
                    <li>U betaalbaarheid wilt</li>
                    <li>U Belgische gemeenschap wilt</li>
                    <li>U toerisme economie wilt (verhuur)</li>
                    <li>U meer sedentair leven wilt</li>
                    <li>U veel sociale activiteiten wilt</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 text-center">
              <h2 className="text-2xl font-light mb-4">Ontdek Jávea</h2>
              <p className="text-warm-200 mb-6">
                Onze experts kunnen u door de beste buurten en projecten leiden.
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
