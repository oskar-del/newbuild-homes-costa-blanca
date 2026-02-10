import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'NIE-nummer i Spania | Guide for Nordmenn 2026',
  description: 'Komplett guide til NIE-nummer i Spania. Hvordan søke, hva du trenger, tidsplan og kostnad. Nødvendig for alle norske eiendomskjøpere.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/guides/nie-nummer',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/nie-number',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/nie-nummer',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/nie-nummer',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/nie-nummer',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/nie',
      'no': 'https://newbuildhomescostablanca.com/no/guides/nie-nummer',
      'x-default': 'https://newbuildhomescostablanca.com/guides/nie-number',
    },
  },
};

const faqs = [
  {
    question: 'Hva er NIE-nummer?',
    answer: 'NIE (Número de Identificación de Extranjero) er ditt spanske skatteid-nummer. Det er obligatorisk for å kjøpe eiendom, åpne bankkonto, signere kontrakter og betale skatter i Spania.',
  },
  {
    question: 'Hvor lenge varer prosessen?',
    answer: 'Hvis du søker i Spania: samme dag til 2 uker. Fra utlandet via ambassaden: 2-4 uker. Via advokat med fullmakt: 2-4 uker. Planlegg for 3-4 uker for å være sikker.',
  },
  {
    question: 'Må både min partner og jeg ha NIE-nummer?',
    answer: 'Ja. Hvis dere kjøper sammen, trenger hver person sitt eget NIE-nummer. Begge må være navngitt på eiendomsdokumentet.',
  },
  {
    question: 'Kan jeg søke fra Norge?',
    answer: 'Ja. Du kan søke på den spanske ambassaden eller konsulatet i Oslo. Du trenger fullstendig dokumentasjon og det tar typisk 2-4 uker.',
  },
  {
    question: 'Hva koster NIE-nummeret?',
    answer: 'Regjeringsgebyr: cirka 12 euro. Via advokat/gestoría: 100-200 euro. Det er billig sammenlignet med verdien av det du kjøper.',
  },
  {
    question: 'Må jeg vise som bosatt i Spania for å få NIE?',
    answer: 'Nei. NIE er kun et skatteid-nummer, ikke en bosattsertifikat. Du kan ha NIE uten å være bosatt i Spania — perfekt for norske kjøpere som beholder sitt hjem i Norge.',
  },
  {
    question: 'Hva hvis jeg ikke får NIE før jeg skal signere?',
    answer: 'Du kan signere reservasjonsavtalen uten NIE, men du MÅ ha det før du signerer kjøpskontrakten. Derfor anbefales det å søke tidlig.',
  },
  {
    question: 'Finnes det forskjell mellom NIE og TIE?',
    answer: 'Ja. NIE er et nummer. TIE (Tarjeta de Identidad de Extranjero) er et fysisk ID-kort for bosatte. Du trenger bare NIE-sertifikat som ikke-bosatt.',
  },
];

export default function NIENummerPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no' },
    { name: 'Guider', url: 'https://newbuildhomescostablanca.com/no/guides' },
    { name: 'NIE-nummer', url: 'https://newbuildhomescostablanca.com/no/guides/nie-nummer' },
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
              <span>NIE-nummer</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              NIE-nummer i Spania — Guide for Nordmenn
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Hva er NIE, hvordan du får det, og alt du trenger å vite. Obligatorisk for alle eiendomskjøp i Spania.
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

            {/* What is NIE */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Hva er NIE-nummer?</h2>
              <div className="text-warm-700 space-y-3">
                <p>
                  <strong>NIE (Número de Identificación de Extranjero)</strong> er et unikt identifikasjonsnummer tildelt utlendinger i Spania. Det er ditt spanske skatteid-nummer og er obligatorisk for alle eiendomstransaksjoner.
                </p>
                <p>Du trenger NIE for å:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Kjøpe eller selge eiendom</li>
                  <li>Åpne spansk bankkonto</li>
                  <li>Signere kontrakter (strøm, telefon, internett)</li>
                  <li>Betale skatter</li>
                  <li>Jobbe i Spania</li>
                  <li>Kjøpe bil</li>
                  <li>Starte forretning</li>
                </ul>
                <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6">
                  <p className="font-semibold text-primary-800">Viktig:</p>
                  <p className="text-primary-700">NIE er <strong>ikke</strong> det samme som bosattstatus. Du kan ha NIE uten å være bosatt i Spania — perfekt som norsk kjøper.</p>
                </div>
              </div>
            </section>

            {/* How to Apply */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Hvordan Søke om NIE</h2>
              <div className="text-warm-700 space-y-3">
                <p>Du har flere muligheter:</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Alternativ 1: Søk i Spania</h3>
                <p>Du kan søke personlig hos:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Extranjería</strong> (Utlendingsmyndigheten)</li>
                  <li><strong>Lokalt politkontor</strong> med utlendingsavdeling</li>
                </ul>
                <p>
                  På Costa Blanca er de største kontorene i Alicante, Benidorm og Torrevieja. Du må bestille time online gjennom det spanske regjeringssystemet.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Alternativ 2: Søk fra Norge</h3>
                <p>
                  Søk på den spanske ambassaden eller konsulatet i Oslo. Dette er ofte lettere med bedre tilgjengelige timer og engelsk-talende personale.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Alternativ 3: Fullmakt til Advokat</h3>
                <p>
                  Hvis du ikke kan reise til Spania eller få time, gi fullmakt til en spansk advokat som søker på dine vegne. Dette er veldig vanlig for norske kjøpere.
                </p>
              </div>
            </section>

            {/* Requirements */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Nødvendig Dokumentasjon</h2>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 text-xl">✓</span>
                    <div>
                      <strong>EX-15 Skjema</strong>
                      <p className="text-warm-600 text-sm">Offisiell NIE-søknadsskjema, fylt ut og signert</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 text-xl">✓</span>
                    <div>
                      <strong>Gyldig Pass</strong>
                      <p className="text-warm-600 text-sm">Original pluss fotokopi av alle sider</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 text-xl">✓</span>
                    <div>
                      <strong>Pasfoto</strong>
                      <p className="text-warm-600 text-sm">Nytt, passfotoformat</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 text-xl">✓</span>
                    <div>
                      <strong>Grunnlagsdokument</strong>
                      <p className="text-warm-600 text-sm">Dokument som viser hvorfor du trenger NIE (eks. eiendomsreservasjon)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-success-600 text-xl">✓</span>
                    <div>
                      <strong>Modelo 790 Código 012</strong>
                      <p className="text-warm-600 text-sm">Skatteskjema med gebyrbetalingsbevis (cirka 12 euro)</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Cost & Timeline */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Kostnad og Tidsplan</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-semibold mb-3">Kostnad</h3>
                  <ul className="space-y-2 text-warm-700">
                    <li>Regjeringsgebyr: <strong>ca. 12 euro</strong></li>
                    <li>Via advokat/gestoría: <strong>100-200 euro</strong></li>
                  </ul>
                </div>
                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-semibold mb-3">Tidsplan</h3>
                  <ul className="space-y-2 text-warm-700">
                    <li>I Spania: <strong>Samme dag - 2 uker</strong></li>
                    <li>Fra utlandet: <strong>2-4 uker</strong></li>
                    <li>Via advokat: <strong>2-4 uker</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Via Lawyer */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">NIE via Advokat og Fullmakt</h2>
              <div className="text-warm-700 space-y-3">
                <p>
                  Hvis du ikke kan reise til Spania eller få time, kan du gi <strong>fullmakt (Poder Notarial)</strong> til en spansk advokat som søker for deg.
                </p>
                <p>Dette innebærer:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Signering av fullmaktsdokument (kan gjøres på spansk ambassade i Oslo eller notarisert lokalt)</li>
                  <li>Sending av originaldokumenter til advokaten</li>
                  <li>Advokaten sender søknaden og mottar NIE-sertifikat for deg</li>
                </ol>
                <p>
                  Dette er den mest komfortable løsningen for norske kjøpere og brukes stadig.
                </p>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-50 rounded-sm p-8 mb-12 border border-primary-200">
              <h2 className="text-2xl font-semibold mb-4">Trenger du Hjelp med NIE?</h2>
              <p className="text-warm-700 mb-6">
                Når du kjøper eiendom gjennom oss, kan vi ordne NIE-søknaden for deg gjennom våre juridiske partnere. En mindre ting du ikke trenger å bekymre deg for.
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
                  className="bg-success-600 text-white px-6 py-3 rounded-sm font-semibold hover:bg-success-700 transition-colors text-center"
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
                <p className="text-warm-600 text-sm">Full oversikt over kostnader</p>
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
