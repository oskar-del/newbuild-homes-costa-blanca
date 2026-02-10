import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Kostnader og Skatter ved Kjøp i Spania | Norsk Guide 2026',
  description: 'Komplett oversikt over kostnader og skatter ved eiendomskjøp i Spania. IVA, skatt, notarius, juridiske gebyrer — beregn dine kostnader.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/guides/kostnader-skatt',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/costs-taxes',
      no: 'https://newbuildhomescostablanca.com/no/guides/kostnader-skatt',
    },
  },
};

const faqs = [
  {
    question: 'Hvor mye skal jeg budsjettere på toppen av kjøpesummen?',
    answer: 'Budsjetter cirka 13-14% på toppen av kjøpesummen for skatter, gebyrer og juridiske kostnader. For en eiendom på 300.000 euro blir totalkostnaden cirka 339.000-342.000 euro.',
  },
  {
    question: 'Er skattesatsen forskjellig for norske kjøpere?',
    answer: 'Nei. Alle betalinger IVA og stempelavgift samme sats uansett nasjonalitet. Men norske kjøpere må også rapportere eiendom til norske skattemyndigheter og betale formuesskatt på den.',
  },
  {
    question: 'Hva er IVA og AJD?',
    answer: 'IVA (mva) er 10% på nybygg. AJD (stempelavgift) er cirka 1,5%. Totalt cirka 11,5% i kjøpeskatter. Denne satsen gjelder Valencia-regionen (Costa Blanca).',
  },
  {
    question: 'Kan jeg få penger tilbake for juridiske og notariusgebyrer?',
    answer: 'Nei, disse er ikke fradragsberettiget. Men de er nødvendige og relativt små sammenlignet med eiendomsverdien. En god advokat sparer deg mer enn gebyret koster.',
  },
  {
    question: 'Må jeg betale skatt årlig på eiendom i Spania?',
    answer: 'Ja. Du betaler årlig IBI (eiendomsskatt), evnt. bosettingssamfunnstilskott, og som ikke-bosatt muligens formuesskatt eller imputed income tax. Årlige kostnader er typisk 0,5-2% av eiendomsverdien.',
  },
  {
    question: 'Hvordan rapporteres spansk eiendom til norske skattemyndigheter?',
    answer: 'Du må rapportere verdien av eiendom på skattemeldingen din. Spania og Norge har en dobbeltbeskatningsavtale for å unngå dobbel beskatning. Kontakt en revisor med erfaring med internasjonale eiendommer.',
  },
  {
    question: 'Hva hvis jeg selger eiendommen senere?',
    answer: 'Du betaler kapitalgevinstskatt (19% for EU/EØS, 24% for andre) på gevinsten. Det er også lokal gevinstskatt og meglerprovisjoner. Planlegg for 25-30% av gevinsten går i skatt og gebyrer.',
  },
];

export default function KostnadenSkattPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no' },
    { name: 'Guider', url: 'https://newbuildhomescostablanca.com/no/guides' },
    { name: 'Kostnader & Skatter', url: 'https://newbuildhomescostablanca.com/no/guides/kostnader-skatt' },
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
              <span>Kostnader & Skatter</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Kostnader og Skatter ved Kjøp i Spania
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Komplett oversikt over alle kostnader når du kjøper nybyggen. Vit nøyaktig hva du skal budsjettere.
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

            {/* Summary Box */}
            <div className="bg-primary-50 border-2 border-primary-200 rounded-sm p-6 mb-12">
              <h2 className="text-xl font-semibold mb-4 text-primary-900">Hurtig Oversikt: Totale Kostnader</h2>
              <p className="text-warm-700 mb-4">
                Når du kjøper <strong>nybygg i Spania</strong>, budsjetter du cirka <strong>13-14%</strong> på toppen av kjøpesummen for skatter, gebyrer og juridiske kostnader.
              </p>
              <div className="text-3xl font-bold text-accent-600">
                300.000 euro eiendom = cirka 339.000-342.000 euro totalt
              </div>
            </div>

            {/* Purchase Taxes */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Kjøpeskatter</h2>
              <div className="text-warm-700 space-y-3">
                <p>
                  Skattene du betaler avhenger av om det er <strong>nybygg</strong> eller <strong>brukt</strong> eiendom. For nybygg betaler du IVA og stempelavgift.
                </p>

                <div className="bg-warm-50 rounded-sm p-6 my-6 border border-warm-200">
                  <h3 className="text-xl font-semibold mb-4">Nybygg</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3"><strong>IVA (mva)</strong></td>
                        <td className="py-3 text-right"><strong>10%</strong></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">
                          <strong>AJD (Stempelavgift)</strong>
                          <p className="text-sm text-warm-500">Valencia-regionen</p>
                        </td>
                        <td className="py-3 text-right"><strong>1,5%</strong></td>
                      </tr>
                      <tr className="bg-accent-50">
                        <td className="py-3 font-bold">Totale skatter</td>
                        <td className="py-3 text-right font-bold text-accent-600">11,5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <p className="font-semibold text-yellow-800">Merknad:</p>
                  <p className="text-yellow-700">Skattesatser varierer etter region. Oversikten ovenfor er for Valencia (Costa Blanca). Andre regioner kan avvike.</p>
                </div>
              </div>
            </section>

            {/* Professional Fees */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Faggebyrer</h2>

              <div className="space-y-6">
                {/* Notary */}
                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="text-xl font-semibold mb-2">Notariusgebyrer</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-warm-700">Typisk område:</span>
                    <span className="font-bold text-lg">600 - 1.500 euro</span>
                  </div>
                  <p className="text-warm-600 text-sm">
                    Fastsatt av regjeringen basert på eiendomsverdi. Dekker utarbeidelse og vitnesbyrding av kjøpedokumentet (escritura). Advokaten din ordner typisk notariatsmøte.
                  </p>
                </div>

                {/* Land Registry */}
                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="text-xl font-semibold mb-2">Tinglysing (Registro de la Propiedad)</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-warm-700">Typisk område:</span>
                    <span className="font-bold text-lg">400 - 800 euro</span>
                  </div>
                  <p className="text-warm-600 text-sm">
                    Offisiell registrering av ditt eierskap. Basert også på regjeringsskala.
                  </p>
                </div>

                {/* Legal Fees */}
                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="text-xl font-semibold mb-2">Juridiske Gebyrer (Advokat/Jurist)</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-warm-700">Typisk sats:</span>
                    <span className="font-bold text-lg">1% - 1,5% + mva</span>
                  </div>
                  <p className="text-warm-600 text-sm">
                    Uavhengig juridisk representasjon. Sterkt anbefalt for internasjonale kjøpere. Minimalt cirka 1.500 euro. Vi samarbeider med engelsktalende advokater erfarne med Costa Blanca-transaksjoner.
                  </p>
                </div>

                {/* Gestoría */}
                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="text-xl font-semibold mb-2">Gestoría (Administrativ Agent)</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-warm-700">Typisk område:</span>
                    <span className="font-bold text-lg">300 - 500 euro</span>
                  </div>
                  <p className="text-warm-600 text-sm">
                    Håndterer paperarbeid som skattebetaling, nytilkoblinger, NIE-søknader. Ofte inkludert i juridiske gebyrer.
                  </p>
                </div>
              </div>
            </section>

            {/* Complete Cost Breakdown */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Komplett Kostnadseksempel</h2>
              <div className="bg-white border-2 border-warm-200 rounded-sm overflow-hidden">
                <div className="bg-warm-800 text-white p-4">
                  <h3 className="font-bold">Eksempel: 300.000 Euro Nybygget Leilighet</h3>
                </div>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">Kjøpesum</td>
                      <td className="p-4 text-right font-semibold">300.000 euro</td>
                    </tr>
                    <tr className="border-b bg-warm-50">
                      <td className="p-4 font-semibold">Skatter</td>
                      <td className="p-4 text-right"></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">IVA (10%)</td>
                      <td className="p-4 text-right">30.000 euro</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">AJD Stempelavgift (1,5%)</td>
                      <td className="p-4 text-right">4.500 euro</td>
                    </tr>
                    <tr className="border-b bg-warm-50">
                      <td className="p-4 font-semibold">Faggebyrer</td>
                      <td className="p-4 text-right"></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">Notarius</td>
                      <td className="p-4 text-right">1.000 euro</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">Tinglysing</td>
                      <td className="p-4 text-right">600 euro</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">Juridiske Gebyrer (1% + mva)</td>
                      <td className="p-4 text-right">3.630 euro</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">Gestoría</td>
                      <td className="p-4 text-right">400 euro</td>
                    </tr>
                    <tr className="bg-accent-600 text-white">
                      <td className="p-4 font-bold">TOTALT KOSTNAD</td>
                      <td className="p-4 text-right font-bold text-xl">340.130 euro</td>
                    </tr>
                    <tr className="bg-primary-50">
                      <td className="p-4 text-primary-800">Tilleggskostnader som % av kjøpesum</td>
                      <td className="p-4 text-right font-bold text-primary-800">13,4%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Ongoing Costs */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Årlige Kostnader</h2>
              <div className="text-warm-700 mb-6">
                <p>Når du eier eiendom i Spania, har du årlige kostnader å budsjettere:</p>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center p-4 bg-warm-50 rounded-sm border border-warm-200">
                  <div>
                    <strong>IBI (Eiendomsskatt)</strong>
                    <p className="text-sm text-warm-600">Impuesto sobre Bienes Inmuebles</p>
                  </div>
                  <span className="font-semibold">300 - 800 euro/år</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-warm-50 rounded-sm border border-warm-200">
                  <div>
                    <strong>Avfallstakst</strong>
                    <p className="text-sm text-warm-600">Årlig søppelinnsamlingsgebyr</p>
                  </div>
                  <span className="font-semibold">50 - 150 euro/år</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-warm-50 rounded-sm border border-warm-200">
                  <div>
                    <strong>Fellesgebyrer</strong>
                    <p className="text-sm text-warm-600">Vedlikehold, basseng, hager, etc.</p>
                  </div>
                  <span className="font-semibold">600 - 2.400 euro/år</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-warm-50 rounded-sm border border-warm-200">
                  <div>
                    <strong>Husforsikring</strong>
                    <p className="text-sm text-warm-600">Bygning og innbo</p>
                  </div>
                  <span className="font-semibold">200 - 500 euro/år</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-warm-50 rounded-sm border border-warm-200">
                  <div>
                    <strong>Formuesskatt (Ikke-bosatt)</strong>
                    <p className="text-sm text-warm-600">Hvis du ikke leier ut eiendommen</p>
                  </div>
                  <span className="font-semibold">200 - 600 euro/år</span>
                </div>
              </div>
            </section>

            {/* Norwegian Tax */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Norsk Skatt på Spansk Eiendom</h2>
              <div className="text-warm-700 space-y-3">
                <p>
                  Som norsk statsborger må du også rapportere den spanske eiendommen til norske skattemyndigheter:
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Formuesskatt</h3>
                <p>
                  Du betaler norsk formuesskatt på verdien av eiendom i utlandet. Fra 2024 er satsen cirka 0,95% av formuesverdien over 1 million kroner. Spania og Norge har imidlertid en dobbeltbeskatningsavtale som typisk unngår dobbel beskatning.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Skattemelding</h3>
                <p>
                  Du må rapportere eiendom på skattemeldingen din. Reglene er komplekse — vi anbefaler å konsultere en revisor med erfaring med internasjonale eiendommer.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Dobbeltbeskatningsavtale</h3>
                <p>
                  Norge og Spania har en avtale for å unngå å betale skatt på samme inntekt/formue to ganger. Din revisor kan hjelpe deg navigere dette.
                </p>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-50 rounded-sm p-8 mb-12 border border-primary-200">
              <h2 className="text-2xl font-semibold mb-4">Trenger du Kostnadskalkulator?</h2>
              <p className="text-warm-700 mb-6">
                Lag en nøyaktig kostnadsberegning basert på din spesifikke eiendom og situasjon. Ons lag gir gjerne en detaljert estimat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/no/contact"
                  className="bg-accent-600 text-white px-6 py-3 rounded-sm font-semibold hover:bg-primary-700 transition-colors text-center"
                >
                  Be om Kostnadsestimat
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
              <Link href="/no/guides/nie-nummer" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">NIE-nummer</h3>
                <p className="text-warm-600 text-sm">Hvordan få ditt skatteid-nummer</p>
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
