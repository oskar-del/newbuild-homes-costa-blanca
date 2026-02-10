import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Wonen in Torrevieja | Gids voor Belgische Kopers 2026',
  description: 'Torrevieja gids voor Belgische kopers. Waarom Torrevieja populair is, Belgische gemeenschap, huizenprijzen, en wat te verwachten.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/guides/torrevieja',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/torrevieja',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/torrevieja',
    },
  },
};

const faqs = [
  {
    question: 'Waarom is Torrevieja populair bij Belgische kopers?',
    answer: 'Betaalbaarheid, grote Belgische gemeenschap (1000+ families), goede stranden, levendig toerisme en veel services in Nederlands. Het voelt als thuiskomen voor veel Belgen.',
  },
  {
    question: 'Hoeveel kosten huizen in Torrevieja?',
    answer: 'Studio/1-slaapkamer appartement: 150-250k euro. 2-slaapkamer: 250-400k euro. 3+ slaapkamer: 350-600k euro. Dit hangt af van locatie en uitzicht (zee-uitzicht kost meer).',
  },
  {
    question: 'Is Torrevieja goed voor verhuur?',
    answer: 'Ja, uitstekend. Veel toeristen, goede seizoens huurprijzen (1000-1500 euro/maand in zomer). Winterhuurders ook populair. ROI 5-7% is realistisch.',
  },
  {
    question: 'Hoeveel Belgen wonen in Torrevieja?',
    answer: 'Geschat 1000-1500 Belgische families. Dit maakt het de grootste Belgische gemeenschap op Costa Blanca. Nederlands is wijd gebruikt.',
  },
  {
    question: 'Wat zijn de beste buurten in Torrevieja?',
    answer: 'Playa del Cura (beachfront, duur), Punta Prima (luxe resort), Acequion (oud stadje centrum, charme), Torrevieja-West (betaalbaar), Flamenca (rustig).',
  },
  {
    question: 'Is Torrevieja schoon en veilig?',
    answer: 'Ja. Het is goed onderhouden, safe en toeristische politievoorziening. Zoals overal, wees voorzichtig met waardevolle spullen. Over het algemeen veilig voor families.',
  },
  {
    question: 'Hoeveel zon krijgt Torrevieja?',
    answer: 'Ongeveer 310 zonnige dagen per jaar. Dit is een van de zonnigste plaatsen in Europa. Winters zijn zacht (12-15C), zomers erg warm (32-35C).',
  },
  {
    question: 'Zijn er medische diensten goed?',
    answer: 'Ja. Ziekenhuizen Torrevieja en Marina Salud. Veel private klinieken. Farmacieën overal. Voor Belgische kopers: Nederlandse en Vlaamse artsen beschikbaar.',
  },
];

export default function TorreviejaPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl-be' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl-be/guides' },
    { name: 'Torrevieja', url: 'https://newbuildhomescostablanca.com/nl-be/guides/torrevieja' },
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
            <h1 className="text-5xl sm:text-6xl font-light mb-6">Torrevieja</h1>
            <p className="text-xl text-warm-200 mb-4">Favoriete bestemming voor Belgische kopers</p>
            <p className="text-lg text-warm-300">
              Ontdek waarom duizenden Belgische families in Torrevieja wonen en wat u moet weten.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Overview */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Wat Is Torrevieja?</h2>

              <p className="text-warm-700 mb-6">
                Torrevieja is een kuststad van ongeveer 100.000 inwoners aan de zuidkust van Costa Blanca. Het is gelegen in de provincie Alicante, op slechts 50 km van luchthaven Alicante.
              </p>

              <p className="text-warm-700 mb-6">
                De stad is beroemd om drie dingen: het strand, de grote Belgische gemeenschap, en de goede prijzen. Dit maakt het een favoriet voor Belgische beleggers en pensionado's.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-accent-50 rounded-sm p-4 border border-accent-200 text-center">
                  <p className="text-3xl font-light text-accent-600 mb-2">310</p>
                  <p className="text-sm text-warm-700">Zonnige dagen per jaar</p>
                </div>
                <div className="bg-accent-50 rounded-sm p-4 border border-accent-200 text-center">
                  <p className="text-3xl font-light text-accent-600 mb-2">1000+</p>
                  <p className="text-sm text-warm-700">Belgische families</p>
                </div>
                <div className="bg-accent-50 rounded-sm p-4 border border-accent-200 text-center">
                  <p className="text-3xl font-light text-accent-600 mb-2">50 km</p>
                  <p className="text-sm text-warm-700">Tot luchthaven</p>
                </div>
              </div>
            </div>

            {/* Belgian Community */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-6">De Belgische Gemeenschap</h2>

              <p className="text-warm-700 mb-6">
                Torrevieja heeft de grootste concentratie van Belgische kopers en inwoners op de Costa Blanca. Dit maakt het ideaal voor Belgen die nederlands willen spreken en zich thuis voelen.
              </p>

              <div className="space-y-6">
                <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Belgische Services & Voorzieningen:</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Belgische restaurants (stoofvlees, wafels, chocolade)</li>
                    <li>Nederlands/Vlaamse supermarkten</li>
                    <li>Nederlandse kerk en religieuze diensten</li>
                    <li>Belgische winkels en services</li>
                    <li>VTM, VRT en BBC op televisie</li>
                    <li>Notarissen en advocaten die Nederlands spreken</li>
                    <li>Belgische huisartsen en artsen</li>
                  </ul>
                </div>

                <div className="bg-primary-50 rounded-sm p-6 border border-primary-200">
                  <h3 className="font-semibold text-primary-900 mb-3">Sociale Netwerken</h3>
                  <p className="text-warm-700">
                    Veel Belgische verenigingen en groepen. Veel vriendschappen ontstaan met andere Belgen. U bent zeker niet alleen hier.
                  </p>
                </div>
              </div>
            </div>

            {/* Neighborhoods */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Buurten in Torrevieja</h2>

              <div className="space-y-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">Playa del Cura (Centro)</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Het hartje van Torrevieja. Beachfront locatie, veel toeristen. Veel bars, restaurants, winkels. Prijzen: 350-600k euro (meer duur, zee-uitzicht).
                  </p>
                  <p className="text-accent-600 font-semibold text-sm">Best voor: Toeristische ervaring</p>
                </div>

                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">Punta Prima</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Luxe resort buurt met eigen stranden. Gated community, meer veiligheid, meer exclusief. Prijzen: 300-500k euro (premium voor meer comfort).
                  </p>
                  <p className="text-accent-600 font-semibold text-sm">Best voor: Luxe & veiligheid</p>
                </div>

                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">Acequion (Oud Centrum)</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Authentiek Torrevieja met charme. Lokale restaurants, minder toeristen. Goede voor langetermijn verblijf. Prijzen: 200-350k euro (betaalbaarder).
                  </p>
                  <p className="text-accent-600 font-semibold text-sm">Best voor: Authentische ervaring</p>
                </div>

                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">Torrevieja-West & Flamenca</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Rustige, residentiële buurten. Weg van toerisme. Goede voor families. Veel Belgen. Prijzen: 150-300k euro (het meest betaalbaarst).
                  </p>
                  <p className="text-accent-600 font-semibold text-sm">Best voor: Betaalbaarheid & rust</p>
                </div>
              </div>
            </div>

            {/* Living Costs */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Levenskosten in Torrevieja</h2>

              <div className="space-y-4 mb-6">
                <div className="border-b border-warm-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">Huur (1-slaapkamer)</h3>
                    <span className="text-accent-600 font-semibold">600-900 euro/maand</span>
                  </div>
                  <p className="text-warm-700 text-sm">In centrum. Buurt is goedkoper.</p>
                </div>

                <div className="border-b border-warm-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">Woonkosten (eigenaar)</h3>
                    <span className="text-accent-600 font-semibold">150-250 euro/maand</span>
                  </div>
                  <p className="text-warm-700 text-sm">Gemeentelijke lasten, water, afval. Geen verwarmingskosten.</p>
                </div>

                <div className="border-b border-warm-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">Eten & Boodschappen</h3>
                    <span className="text-accent-600 font-semibold">200-350 euro/maand</span>
                  </div>
                  <p className="text-warm-700 text-sm">Voor 2 personen. Restaurants zijn goedkoop (8-15 euro maaltijd).</p>
                </div>

                <div className="border-b border-warm-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">Auto (benzine)</h3>
                    <span className="text-accent-600 font-semibold">100-150 euro/maand</span>
                  </div>
                  <p className="text-warm-700 text-sm">Benzine is goedkoper dan België. Auto-onderhoud idem.</p>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">Gezondheid/Verzekeringen</h3>
                    <span className="text-accent-600 font-semibold">150-300 euro/maand</span>
                  </div>
                  <p className="text-warm-700 text-sm">Private zorgverzekering. Openbare zorgen voor gepensioneerden.</p>
                </div>
              </div>

              <div className="bg-primary-50 rounded-sm p-6 border border-primary-200">
                <h3 className="font-semibold text-primary-900 mb-3">Totale Maandlast Voorbeeld (2 Personen)</h3>
                <p className="text-warm-700 text-sm mb-3">Als u woning bezit:</p>
                <div className="space-y-1 text-sm text-warm-700">
                  <p className="flex justify-between border-b border-primary-200 pb-2">
                    <span>Woonkosten</span>
                    <span>200</span>
                  </p>
                  <p className="flex justify-between border-b border-primary-200 pb-2">
                    <span>Eten & Boodschappen</span>
                    <span>300</span>
                  </p>
                  <p className="flex justify-between border-b border-primary-200 pb-2">
                    <span>Auto</span>
                    <span>130</span>
                  </p>
                  <p className="flex justify-between border-b border-primary-200 pb-2">
                    <span>Verzekeringen</span>
                    <span>200</span>
                  </p>
                  <p className="flex justify-between pt-2 text-accent-600 font-bold">
                    <span>TOTAAL</span>
                    <span>830</span>
                  </p>
                  <p className="text-warm-600 text-xs pt-2">Dit is veel minder dan België!</p>
                </div>
              </div>
            </div>

            {/* Getting Around */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Vervoer & Logistiek</h2>

              <div className="space-y-6">
                <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                  <h3 className="font-semibold text-primary-900 mb-3">Auto</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Aanbevolen. Parking is goedkoop (50-100 euro/maand). Wegen zijn goed. Veel parkeerplaatsen. Nederlands rijbewijs erkend.
                  </p>
                </div>

                <div className="bg-primary-50 rounded-sm p-6 border border-primary-200">
                  <h3 className="font-semibold text-primary-900 mb-3">Openbaar Vervoer</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Bussen zijn goedkoop en goed. Trein naar Alicante/Valencia. Niet intensief als in België, maar bruikbaar.
                  </p>
                </div>

                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-3">Luchthaven</h3>
                  <p className="text-warm-700 text-sm mb-3">
                    Alicante luchthaven is 50 km weg (45 minuten auto). Veel flights naar België (Brussels Airlines, diverse budget airlines). Rental auto's goedkoop.
                  </p>
                </div>
              </div>
            </div>

            {/* Activities */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Activiteiten & Vrijetijd</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="font-semibold text-primary-900 mb-4">Water & Stranden</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 text-sm ml-2">
                    <li>Veel stranden (Playa del Cura, El Moreno)</li>
                    <li>Zwemmen, surfen, kitesurfen</li>
                    <li>Bootcharters & zeilen</li>
                    <li>Visserij</li>
                  </ul>
                </div>

                <div className="border border-accent-200 rounded-sm p-6 bg-accent-50">
                  <h3 className="font-semibold text-primary-900 mb-4">Cultuur & Nachtleven</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 text-sm ml-2">
                    <li>Restaurants & bars (veel Belgisch)</li>
                    <li>Disco's & clubs in zomer</li>
                    <li>Festivals (karnaval populair)</li>
                    <li>Lokale markten & shopping</li>
                  </ul>
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

            {/* Summary */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 mb-12">
              <h2 className="text-2xl font-light mb-6">Waarom Kiezen Belgen Torrevieja?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-sm p-4">
                  <p className="font-semibold mb-2">Betaalbaarheid</p>
                  <p className="text-warm-200 text-sm">Huizen goedkoper dan Amsterdam/Brussel. Levenskosten laag.</p>
                </div>
                <div className="bg-white/10 rounded-sm p-4">
                  <p className="font-semibold mb-2">Gemeenschap</p>
                  <p className="text-warm-200 text-sm">1000+ Belgische families. Nederlands is normaal. Geen isolatie.</p>
                </div>
                <div className="bg-white/10 rounded-sm p-4">
                  <p className="font-semibold mb-2">Levensstijl</p>
                  <p className="text-warm-200 text-sm">Strand, zon, ontspanning. Minder stress dan België.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 text-center">
              <h2 className="text-2xl font-light mb-4">Klaar voor Torrevieja?</h2>
              <p className="text-warm-200 mb-6">
                Onze experts helpen u de perfecte woning vinden in Torrevieja.
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
