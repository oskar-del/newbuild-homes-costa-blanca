import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Nord vs Sør Costa Blanca | Hvilken Region Passer Deg? 2026',
  description: 'Sammenlign Nord og Sør Costa Blanca. Klima, priser, norsk nærvær i Alfaz del Pi, golf, strender — finn din ideale region.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/guides/nord-vs-sor',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/north-vs-south',
      no: 'https://newbuildhomescostablanca.com/no/guides/nord-vs-sor',
    },
  },
};

const faqs = [
  {
    question: 'Hvor ligger Nord og Sør Costa Blanca?',
    answer: 'Nord: Fra Denia til Altea (Jávea, Moraira, Calpe, Altea). Sør: Fra Torrevieja til Pilar de la Horadada (Torrevieja, Orihuela Costa, Guardamar, Campoamor). Avstanden er cirka 70 km.',
  },
  {
    question: 'Hvor mange nordmenn bor på Costa Blanca?',
    answer: 'Flere tusen nordmenn bor på Costa Blanca. Den største nordiske kolonien er i Alfaz del Pi (Alfàs del Pi), omtrent 3-4% av befolkningen er norsk. Det finnes norsk klub og skole.',
  },
  {
    question: 'Hva er prisforskjellen?',
    answer: 'Nord er typisk 30-50% dyrere. En 3-romsvilla i Orihuela Costa kan koste 350.000 euro, samme i Jávea 550.000+ euro. Nord kreves høyere budsjett.',
  },
  {
    question: 'Hvis jeg golfer, hvor skal jeg være?',
    answer: 'Klart sør. Over 20 golfbaner innen lett rekkevidde. Nord har bare 4-5 golfbaner. Hvis golf er viktig, sør er eneste valg.',
  },
  {
    question: 'Hva er klimaforskjellen?',
    answer: 'Begge har fantastisk vær, men sør er varmere og tørrere (semi-arid), Nord er litt kjølere og grønnere med litt mer regn. WHO anerkjenner Torrevieja-området som et av Europas sunneste.',
  },
  {
    question: 'Kan jeg få engelsk-talende tjenester begge steder?',
    answer: 'Ja, men lettere i sør. Sør har mer engelsktalende personale i butikker, restauranter, helsestell. Nord integreres mer med spansk, så noen språk er nyttig.',
  },
  {
    question: 'Hvor skal jeg se strender?',
    answer: 'Nord: Rocky coves og mindre strender, krystallklart vann for snorkling. Sør: Brede, sandstrender, dune-backed promenader. Begge er vakre, velg basert på strandpreferanse.',
  },
];

export default function NordVsSorPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no' },
    { name: 'Guider', url: 'https://newbuildhomescostablanca.com/no/guides' },
    { name: 'Nord vs Sør', url: 'https://newbuildhomescostablanca.com/no/guides/nord-vs-sor' },
  ]);
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />
      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16">
          <div className="container mx-auto px-4">
            <nav className="text-sm mb-4 text-warm-200">
              <Link href="/no/guides" className="hover:text-white">Guider</Link>
              <span className="mx-2">→</span>
              <span>Nord vs Sør</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Nord vs Sør Costa Blanca — Hvilken Region Passer Deg?
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Klima, priser, strand, golf, norsk nærvær — sammenlign de to regionene for å finne din perfekte lokasjon.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
              <span>Oppdatert Februar 2026</span>
              <span>•</span>
              <span className="bg-accent-500/20 text-accent-300 px-2 py-1 rounded-sm">Norsk Guide</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">

            {/* Quick Summary */}
            <div className="bg-primary-50 border-2 border-primary-200 rounded-sm p-6 mb-12">
              <h2 className="text-xl font-semibold mb-3 text-primary-900">Hurtig Sammenligning</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 rounded-sm p-4">
                  <h3 className="font-bold text-blue-800 mb-2">Nord</h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>Dramatisk sceneri & fjell</li>
                    <li>Høyere eiendomspriser</li>
                    <li>Grønnere, litt kjølere</li>
                    <li>Tradisjonell spansk følelse</li>
                    <li>Jávea, Moraira, Calpe, Altea</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-sm p-4">
                  <h3 className="font-bold text-orange-800 mb-2">Sør</h3>
                  <ul className="text-orange-700 space-y-1">
                    <li>Flatt terreng, brede strender</li>
                    <li>Prisværtig eiendom</li>
                    <li>Varmere, solrikt, tørt</li>
                    <li>Større ekspatsamfunn</li>
                    <li>Torrevieja, Orihuela Costa, Guardamar</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Climate */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Klima — Begge Fantastisk, Men Litt Annerledes</h2>
              <p className="text-warm-700 mb-4">
                Begge regioner nyter over 300 solrike dager årlig, men det er subtile forskjeller som betyr:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-sm p-5 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">Nord Klima</h3>
                  <ul className="text-blue-700 space-y-2 text-sm">
                    <li><strong>Sommer:</strong> 28-32°C, sjøbris</li>
                    <li><strong>Vinter:</strong> 12-18°C, litt mer regn</li>
                    <li><strong>Nedbør:</strong> ca. 400mm årlig</li>
                    <li><strong>Følelse:</strong> Grønnere, frodig vegetation</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-sm p-5 border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-3">Sør Klima</h3>
                  <ul className="text-orange-700 space-y-2 text-sm">
                    <li><strong>Sommer:</strong> 30-35°C, pålitelig varmt</li>
                    <li><strong>Vinter:</strong> 14-20°C, mildere</li>
                    <li><strong>Nedbør:</strong> ca. 250mm årlig (semi-arid)</li>
                    <li><strong>Følelse:</strong> Tørrere, pålitelig sol</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="font-semibold text-yellow-800">Helsemerknad:</p>
                <p className="text-yellow-700">
                  Sør, spesielt omkring Torrevieja salt-innsjøene, er anerkjent av WHO som et av Europas sunneste mikroklima. Mange mennesker med luftveisproblemer velger dette området.
                </p>
              </div>
            </section>

            {/* Property Prices */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Eiendomspriser — Betydelig Forskjell</h2>
              <p className="text-warm-700 mb-4">
                Dette er ofte den avgjørende faktoren. Nord krever betydelig høyere budsjett:
              </p>

              <div className="bg-white rounded-sm shadow overflow-hidden border border-warm-200 mb-6">
                <table className="w-full text-sm">
                  <thead className="bg-warm-100">
                    <tr>
                      <th className="p-4 text-left">Eiendomstype</th>
                      <th className="p-4 text-center text-blue-700">Nord</th>
                      <th className="p-4 text-center text-orange-700">Sør</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-4">2-romsleilighet</td>
                      <td className="p-4 text-center">250.000-400.000 euro</td>
                      <td className="p-4 text-center">150.000-250.000 euro</td>
                    </tr>
                    <tr className="border-t bg-warm-50">
                      <td className="p-4">3-romsvilla med basseng</td>
                      <td className="p-4 text-center">500.000-900.000 euro</td>
                      <td className="p-4 text-center">300.000-500.000 euro</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-4">Luksus villa</td>
                      <td className="p-4 text-center">1.000.000+ euro</td>
                      <td className="p-4 text-center">600.000-900.000 euro</td>
                    </tr>
                    <tr className="border-t bg-warm-50">
                      <td className="p-4">Golfcourse-eiendom</td>
                      <td className="p-4 text-center">Begrenset utvalg</td>
                      <td className="p-4 text-center">200.000-600.000 euro</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-warm-700">
                <strong>Hvorfor prisforskjellen?</strong> Nord har mer dramatisk landskap, begrenset byggerbar mark på grunn av fjell, og lengre historie med internasjonalt eiendomseierskap. Sør har mer tilgjengelig land, mer aktiv utvikling, og betjener et bredere marked.
              </p>
            </section>

            {/* Landscape */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Landskap & Strender</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-blue-800">Nord: Dramatisk & Variert</h3>
                  <p className="text-warm-700 mb-3">
                    Fjell møter havet, skaper fantastisk kystlandskap. Steile coves, skjulte strender og dramatiske klipper. Småbyer kaskader ned bakker med smale gater og tradisjonell arkitektur.
                  </p>
                  <ul className="text-warm-600 space-y-1 text-sm">
                    <li>• Peñón de Ifach stein i Calpe (ikonisk)</li>
                    <li>• Montgo fjell overskuer Jávea</li>
                    <li>• Krystallklare coves i Moraira</li>
                    <li>• Maleriske kjøring langs kliffveier</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3 text-orange-800">Sør: Åpen & Tilgjengelig</h3>
                  <p className="text-warm-700 mb-3">
                    Flatt terreng med brede sandstrender som strekker seg kilometer. Salt-innsjøer, klitter og palm-linjede promenader. Mer plass, mer utvikling, lettere tilgang.
                  </p>
                  <ul className="text-warm-600 space-y-1 text-sm">
                    <li>• Guardamars 10km dune-backed strand</li>
                    <li>• Torrevieja rosa salt-innsjøer</li>
                    <li>• La Mata naturpark strender</li>
                    <li>• Orihuela Costas resort-strender</li>
                  </ul>
                </div>
              </div>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4">
                <p className="font-semibold text-primary-800">Strandalternativ Guide:</p>
                <p className="text-primary-700">
                  <strong>Velg Nord</strong> hvis du elsker steile coves, snorkling, dramatisk sceneri. <strong>Velg Sør</strong> hvis du foretrekker brede sandstrender, promenader og strandbar.
                </p>
              </div>
            </section>

            {/* Norwegian Presence */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Norsk Nærvær & Samfunn</h2>
              <p className="text-warm-700 mb-4">
                <strong>Alfaz del Pi (Alfàs del Pi) i Nord</strong> har den største nordiske kolonien på Costa Blanca. Cirka 3-4% av befolkningen er norsk. Du finner norsk klubb, norsk skole, og mange nordiske venner.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-sm p-5 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">Nord Samfunn</h3>
                  <ul className="text-blue-700 space-y-2 text-sm">
                    <li><strong>Størrelse:</strong> Mindre, etablert</li>
                    <li><strong>Nasjonaliteter:</strong> Britisk, tysk, nederlandsk, belgisk</li>
                    <li><strong>Demografi:</strong> Eldre, velstående, mange pensjonister</li>
                    <li><strong>Integrasjon:</strong> Mer spansk følelse</li>
                    <li><strong>Norsk:</strong> Alfaz del Pi — ja!</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-sm p-5 border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-3">Sør Samfunn</h3>
                  <ul className="text-orange-700 space-y-2 text-sm">
                    <li><strong>Størrelse:</strong> Større, mer aktivt</li>
                    <li><strong>Nasjonaliteter:</strong> Britisk, skandinavisk, irsk, nederlandsk</li>
                    <li><strong>Demografi:</strong> Blandet alder, arbeidende familier</li>
                    <li><strong>Integrasjon:</strong> Mer ekspatfokusert</li>
                    <li><strong>Norsk:</strong> Mindre norsk fokus generelt</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Golf */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Golf — Sør Vinner Klart</h2>
              <p className="text-warm-700 mb-4">
                Hvis golf er viktig, sør er det klare valget. Over 20 baner innen lett rekkevidde, versus bare håndfullt i nord.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-orange-50 rounded-sm p-5 border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-3">Sørgolfbaner</h3>
                  <ul className="text-orange-700 space-y-1 text-sm">
                    <li>• La Finca Golf (Algorfa)</li>
                    <li>• Las Colinas Golf (Campoamor)</li>
                    <li>• Villamartín Golf</li>
                    <li>• Las Ramblas Golf</li>
                    <li>• Campoamor Golf</li>
                    <li>• La Marquesa Golf</li>
                    <li>• Vistabella Golf</li>
                    <li>• + mange flere...</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-sm p-5 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">Nordgolfbaner</h3>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• Jávea Golfklubb</li>
                    <li>• La Sella Golf (Denia)</li>
                    <li>• Altea Golfklubb</li>
                    <li>• Villaitana (Benidorm)</li>
                    <li>• Begrenset utvalg generelt</li>
                  </ul>
                </div>
              </div>

              <div className="bg-success-50 border-l-4 border-success-500 p-4">
                <p className="font-semibold text-success-800">Golfaktiv-fordel:</p>
                <p className="text-success-700">
                  Sør tilbyr golfcourse-eiendommer fra 300.000 euro — en brøkdel av hva ekvivalent golfnærvær koster andre steder i Europa. Hvis golf er viktig, sør er stedet.
                </p>
              </div>
            </section>

            {/* Decision Guide */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Hvilken Region Passer Deg?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-sm p-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 text-lg mb-4">Velg Nord hvis du:</h3>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Har større budsjett (400.000+ for villa)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Foretrekker dramatisk sceneri og fjell</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Vil ha mer tradisjonell spansk følelse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Elsker steile coves og snorkling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Prioriterer prestisje og eksklusivitet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Trenger ikke golf på dørstokken</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-sm p-6 border border-orange-200">
                  <h3 className="font-bold text-orange-800 text-lg mb-4">Velg Sør hvis du:</h3>
                  <ul className="space-y-2 text-orange-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>Ønsker best verdi for pengene</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>Foretrekker brede sandstrender</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>Golf er viktig for deg</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>Vil ha større ekspatsamfunn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>Foretrekker engelsktalende tjenester</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>Leter etter utleie-inntektspotensiale</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-50 rounded-sm p-8 mb-12 border border-primary-200">
              <h2 className="text-2xl font-semibold mb-4">Klar til å Utforske?</h2>
              <p className="text-warm-700 mb-6">
                Vi har nybygg i både Nord og Sør Costa Blanca. Beskriv dine prioriteringer — klima, budsjett, livsstil — og vi anbefaler områdene og utvikling som passer deg best.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/no/contact"
                  className="bg-accent-600 text-white px-6 py-3 rounded-sm font-semibold hover:bg-primary-700 transition-colors text-center"
                >
                  Kontakt Oss
                </Link>
                <a
                  href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                  className="border-2 border-accent-600 text-accent-600 px-6 py-3 rounded-sm font-semibold hover:bg-primary-50 transition-colors text-center"
                >
                  WhatsApp
                </a>
              </div>
            </section>

          </div>
        </article>

        {/* FAQs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-semibold text-center mb-8">Ofte Stilte Spørsmål</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-warm-50 rounded-sm border border-warm-200 overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-primary-900 hover:bg-warm-100 transition-colors">
                    {faq.question}
                    <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-warm-700 border-t border-warm-200 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-16 bg-warm-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-8 text-center">Andre Guider</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/no/guides/hvorfor-nybygg" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">Hvorfor Nybygg?</h3>
                <p className="text-warm-600 text-sm">Fordeler med nybygg</p>
              </Link>
              <Link href="/no/guides/kjopsprosessen" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">Kjøpsprosessen</h3>
                <p className="text-warm-600 text-sm">Steg-for-steg guide</p>
              </Link>
              <Link href="/no/guides/boliglan" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">Boliglån</h3>
                <p className="text-warm-600 text-sm">Finansieringsalternativer</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
