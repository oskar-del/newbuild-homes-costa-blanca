import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Boliglån i Spania for Nordmenn | Guide 2026',
  description: 'Hvordan få boliglån i Spania som norsk kjøper. Renter, krav, norske og spanske banker. Alt norske kjøpere må vite om finansiering.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/guides/boliglan',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/mortgages',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/bolan-spanien',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/hypotheek',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/hypotheek',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/hypotheque',
      'no': 'https://newbuildhomescostablanca.com/no/guides/boliglan',
      'x-default': 'https://newbuildhomescostablanca.com/guides/mortgages',
    },
  },
};

const faqs = [
  {
    question: 'Kan jeg få boliglån som ikke-bosatt i Spania?',
    answer: 'Ja. Spanske banker låner til ikke-bosatte, typisk opptil 60-70% av eiendomsverdien. Du trenger inntektsbevis, skattereturer og kontoutskrifter. Betingelsene er strengere enn for bosatte.',
  },
  {
    question: 'Hva er gjennomsnittlig rente?',
    answer: 'Fastrente ligger typisk på 3-4,5%, variabel på Euribor + 1-2%. Ratene endrer seg løpende basert på ECB og markedsforhold.',
  },
  {
    question: 'Kan norske banker gi meg boliglån i Spania?',
    answer: 'Noen norske banker som DNB og Nordea har drøftet muligheter, men generelt er det vanskelig. Spanske banker er det beste valget. Du kan imidlertid bruke norsk inntekt som bevis.',
  },
  {
    question: 'Hvor lang søknadsprosess tar boliglænet?',
    answer: 'Typisk 6-10 uker fra full søknad til fullføring. Start tidlig — forsinkelser er vanlige. Pre-godkjenning tar vanligvis 1-2 uker.',
  },
  {
    question: 'Hva hvis jeg selger eiendommen før lånet er nedbetalt?',
    answer: 'Du betaler av lånet fra salgsverdien. Noen lån har straffer for tidlig innfrielse, så sjekk kontrakten. Du håndterer gjelden gjennom prosessen.',
  },
  {
    question: 'Er det bedre å ta fast eller variabel rente?',
    answer: 'Fast rente gir trygghet mot renteøkninger. Variabel kan være billigere, men risikerer økning. Med dagens markedsusikkerhet velger mange fast.',
  },
  {
    question: 'Hva hvis banken nekter meg lån?',
    answer: 'Prøv andre banker eller en boliglånmegler som jobber med flere banker. Noen låner mer liberalt enn andre. Dokumentasjon er nøkkelen.',
  },
];

export default function BoligLanPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no' },
    { name: 'Guider', url: 'https://newbuildhomescostablanca.com/no/guides' },
    { name: 'Boliglån', url: 'https://newbuildhomescostablanca.com/no/guides/boliglan' },
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
              <span>Boliglån</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Boliglån i Spania for Nordmenn
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Hvordan få boliglån i Spania som norsk kjøper. Renter, krav, søknadsprosess og banker.
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

            {/* Key Facts */}
            <div className="bg-primary-50 border-2 border-primary-200 rounded-sm p-6 mb-12">
              <h2 className="text-xl font-semibold mb-4 text-primary-900">Nøkkeltall for Ikke-Bosatte (Februar 2026)</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-sm p-4">
                  <div className="text-sm text-warm-600">Maksimalt LTV</div>
                  <div className="text-2xl font-bold text-accent-600">60-70%</div>
                </div>
                <div className="bg-white rounded-sm p-4">
                  <div className="text-sm text-warm-600">Gjennomsnittlig Fastrente (25år)</div>
                  <div className="text-2xl font-bold text-accent-600">ca. 3,5%</div>
                </div>
                <div className="bg-white rounded-sm p-4">
                  <div className="text-sm text-warm-600">Maksimalt Løpetid</div>
                  <div className="text-2xl font-bold text-accent-600">20-25 år</div>
                </div>
                <div className="bg-white rounded-sm p-4">
                  <div className="text-sm text-warm-600">Euribor 12-måneder</div>
                  <div className="text-2xl font-bold text-accent-600">2,45%</div>
                </div>
              </div>
            </div>

            {/* Can Foreigners Get Mortgages */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Kan Nordmenn Få Boliglån i Spania?</h2>
              <div className="text-warm-700 space-y-3">
                <p>
                  <strong>Ja.</strong> Spanske banker aktivt låner til utenlandske kjøpere, inkludert norske. Betingelser er annerledes enn du kanskje er vant til hjemme:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Lavere LTV</strong> — 30-40% egenkapital forventet</li>
                  <li><strong>Mer dokumentasjon</strong> — bevis på stabil inntekt</li>
                  <li><strong>Strengere gjeldskontroll</strong> — månedlig betaling typisk maks 30-35% av inntekt</li>
                  <li><strong>Høyere renter</strong> enn for bosatte, men fortsatt konkurransedyktig</li>
                </ul>
              </div>
            </section>

            {/* LTV by Buyer Type */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Låneandel (LTV) Etter Kjøpertype</h2>
              <div className="bg-warm-50 rounded-sm overflow-hidden border border-warm-200">
                <table className="w-full">
                  <thead className="bg-warm-800 text-white">
                    <tr>
                      <th className="p-4 text-left">Kjøpertype</th>
                      <th className="p-4 text-right">Max LTV</th>
                      <th className="p-4 text-right">Min. Egenkapital</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">Spansk Bosatt</td>
                      <td className="p-4 text-right font-semibold">80%</td>
                      <td className="p-4 text-right">20%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">EU/EØS Ikke-Bosatt</td>
                      <td className="p-4 text-right font-semibold">70%</td>
                      <td className="p-4 text-right">30%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Norsk Ikke-Bosatt</td>
                      <td className="p-4 text-right font-semibold">60-70%</td>
                      <td className="p-4 text-right">30-40%</td>
                    </tr>
                    <tr>
                      <td className="p-4">Andre ikke-EU</td>
                      <td className="p-4 text-right font-semibold">60-70%</td>
                      <td className="p-4 text-right">30-40%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-warm-600 text-sm">
                <strong>Merknad:</strong> LTV basert på laveste av kjøpesum eller bankens takst. Hvis banken taksterer lavere enn kjøpesum, synker din effektive LTV.
              </p>
            </section>

            {/* Interest Rates */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Renter i 2026</h2>
              <div className="text-warm-700 space-y-3">
                <p>
                  Spanske boliglånsrenter har steget med ECB-rentene, men forblir konkurransedyktig. Typisk velger du mellom:
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Fastrente (Tipo Fijo)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Rente samme hele løpetiden</li>
                  <li>Område: <strong>3,5% - 4,5%</strong></li>
                  <li>Populær for budsjettplanlegging</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Variabel Rente (Tipo Variable)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Basert på Euribor + bankmargin</li>
                  <li>Område: <strong>Euribor + 1% til 2%</strong></li>
                  <li>Lavere initialt, kan øke</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Blandet Rente (Tipo Mixto)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fastrente første 3-10 år, deretter variabel</li>
                  <li>Kompromissløsning</li>
                </ul>
              </div>
            </section>

            {/* Requirements */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Krav og Dokumentasjon</h2>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold mb-4">For Ansatte:</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-success-600">✓</span>
                    <span>Gyldig pass (kopi av alle sider)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600">✓</span>
                    <span>NIE-nummer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600">✓</span>
                    <span>Siste 2-3 år skattereturer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600">✓</span>
                    <span>Siste 3-6 måneders lønnsslipper</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600">✓</span>
                    <span>Arbeidskontrakt eller arbeidsgiverskriv</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600">✓</span>
                    <span>Siste 3-6 måneders kontoutskrifter</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600">✓</span>
                    <span>Bevis på depositumfond</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600">✓</span>
                    <span>Liste over eksisterende gjeld</span>
                  </li>
                </ul>

                <h3 className="font-semibold mb-4">For Selvstendig Næringsdrivende:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-success-600">✓</span>
                    <span>Alt ovenfor, pluss:</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600">✓</span>
                    <span>Siste 2-3 år forretningsregnskap</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600">✓</span>
                    <span>Forretningsskattedokumenter</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600">✓</span>
                    <span>Referanse fra revisor</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Major Spanish Banks */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Spanske Banker for Boliglån</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-bold text-lg mb-2">Banco Sabadell</h3>
                  <p className="text-warm-600 text-sm">Populært blant internasjonale kjøpere. Engelsk-talende rådgivere. Sterk tilstedeværelse Costa Blanca.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-bold text-lg mb-2">CaixaBank</h3>
                  <p className="text-warm-600 text-sm">Spania største bank. Bred filialbeskytelse. Ikke-bosatt boliglånavdeling.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-bold text-lg mb-2">Santander</h3>
                  <p className="text-warm-600 text-sm">Internasjonalbankmed UK-tilstedeværelse. Kan noen ganger bruke UK-inntektsbevis.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-bold text-lg mb-2">BBVA</h3>
                  <p className="text-warm-600 text-sm">Stor spansk bank. Konkurransedyktige renter. Engelsk-service på turiststeder.</p>
                </div>
              </div>
            </section>

            {/* Application Process */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Søknadsprosess</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-lg">Konsultasjon & Forgjengere Godkjenning</h3>
                    <p className="text-warm-700">Send grunnleggende finansiell informasjon. Bank gir veiledende tilbud som viser hvor mye du kan låne. Tar 1-2 uker.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-lg">Full Søknad</h3>
                    <p className="text-warm-700">Når du har funnet eiendom og signert reservasjon, send fullstendig dokumentasjon. Bank gjennomgår søknaden. Tar 2-4 uker.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Eiendomstaksering</h3>
                    <p className="text-warm-700">Bank organiserer uavhengig takst (tasación). Du betaler for denne (300-500 euro). LTV baseres på takstverdien. Tar 1-2 uker.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-bold text-lg">Formell Tilbud</h3>
                    <p className="text-warm-700">Bank utsteder bindende tilbud med lånebeløp, rente, løpetid og alle vilkår. Gyldig minimum 10 dager etter lov. Tar 1 uke.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div>
                    <h3 className="font-bold text-lg">Fullføring hos Notarius</h3>
                    <p className="text-warm-700">Signer lånedokumenter samme dag som kjøpsdeed. Bankrepr møter. Midler overføres samme dag. Totalt tidsrom: 6-10 uker fra full søknad.</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mt-6">
                <p className="font-semibold text-primary-800">Total Tidsplan:</p>
                <p className="text-primary-700">Planlegg 6-10 uker fra fullstendig søknad til fullføring. Start tidlig — vent ikke til det er for sent.</p>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-50 rounded-sm p-8 mb-12 border border-primary-200">
              <h2 className="text-2xl font-semibold mb-4">Trenger du Hjelp med Boliglån?</h2>
              <p className="text-warm-700 mb-6">
                Vi samarbeider med boliglånmeglere som spesialiserer seg på ikke-bosatt finansiering. De sammenligner tilbud fra flere spanske banker for å finne best renter og vilkår for deg.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/no/contact"
                  className="bg-accent-600 text-white px-6 py-3 rounded-sm font-semibold hover:bg-primary-700 transition-colors text-center"
                >
                  Få Hjelp med Boliglån
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

        {/* FAQs Section */}
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
              <Link href="/no/guides/kjopsprosessen" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">Kjøpsprosessen</h3>
                <p className="text-warm-600 text-sm">Steg-for-steg guide til kjøp</p>
              </Link>
              <Link href="/no/guides/kostnader-skatt" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">Kostnader & Skatter</h3>
                <p className="text-warm-600 text-sm">Kostnadsoversikt</p>
              </Link>
              <Link href="/no/guides/nie-nummer" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">NIE-nummer</h3>
                <p className="text-warm-600 text-sm">Hvordan få skatteid-nummer</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
