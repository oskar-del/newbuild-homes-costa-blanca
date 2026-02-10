import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Hvorfor Kjøpe Nybygg i Spania? | Fordeler og Ulemper 2026',
  description: 'Komplett guide til fordelene og ulempene ved nybygg versus brukt eiendom i Spania. Garantier, skatt, moderne design, prisfordeler.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/guides/hvorfor-nybygg',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/why-new-build',
      no: 'https://newbuildhomescostablanca.com/no/guides/hvorfor-nybygg',
    },
  },
};

const faqs = [
  {
    question: 'Er det trygt å kjøpe på tegning i Spania?',
    answer: 'Ja, spansk lov gir sterk beskyttelse for på tegning-kjøpere. Alle betalinger må være sikret av bankgaranti eller forsikring. Hvis utvikleren mislykkes, får du full refusjon med renter.',
  },
  {
    question: 'Hvor stor prisforskjell er det mellom launch og ferdigstillelse?',
    answer: 'Typisk 20-40% billigere ved launch. En leilighet kan gå fra 195.000 euro ved lansering til 260.000 euro ved ferdigstillelse — 30%+ apresiering før du mottar nøklene.',
  },
  {
    question: 'Hva slags garantier får jeg?',
    answer: 'Spansk lov krever: 10 år for strukturelle defekter, 3 år for habitabilitetsproblemer, 1 år for finalesdefekter. All garantier er obligatorisk forsikret.',
  },
  {
    question: 'Er nybygg dyrere per m² enn brukt?',
    answer: 'Ja, per m². Men totale eierskapskostnader blir ofte billigere fordi du får alttid nytt, ingen renovering påkrevd, og lavere energikostnader.',
  },
  {
    question: 'Kan jeg velge finales i en nybygget?',
    answer: 'Ofte ja, spesielt hvis du kjøper tidlig. Mange utviklere tilbyr valg av gulv, kjøkkenska, fliser og innmat. Jo tidligere kjøp, jo flere valg.',
  },
  {
    question: 'Hva hvis konstruksjonen blir forsinket?',
    answer: 'Kontrakten spesifiserer fullføringsdato og straffebestemmelser for forsinkelser. Kjente utviklere har generelt god leveringshistorikk, men 3-6 måneders forsinkelse forekommer.',
  },
  {
    question: 'Er nybygg bedre for utleie?',
    answer: 'Generelt ja. Moderne eiendommer får bedre gjesterangeringer, høyere dagspriser, lavere vedlikeholdskostnader, og nye energikvalifikasjoner tiltrekker leieboere.',
  },
];

export default function HvorfNybyggPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no' },
    { name: 'Guider', url: 'https://newbuildhomescostablanca.com/no/guides' },
    { name: 'Hvorfor Nybygg', url: 'https://newbuildhomescostablanca.com/no/guides/hvorfor-nybygg' },
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
              <span>Hvorfor Nybygg</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Hvorfor Kjøpe Nybygg i Spania?
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Fordelene ved nybygg versus brukt eiendom — garantier, moderne design, prisfordeler og langsiktig verdioppbygging.
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
              <h2 className="text-xl font-semibold mb-3 text-primary-900">Fordelene med Nybygg på et Blikk</h2>
              <div className="grid md:grid-cols-2 gap-3 text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span><strong>Lanserings-priser</strong> — 20-40% under fullføringspris</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span><strong>10-årgaranti</strong> — strukturelle defekter dekket</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span><strong>Bedre boliglån</strong> — banker foretrår nybygg</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span><strong>Lavere skatter</strong> — 10% IVA vs 8-10% overføringsskatt</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span><strong>Betalingsplaner</strong> — spre kostnad over konstruksjon</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success-500">✓</span>
                  <span><strong>Moderne design</strong> — A/B energieffektivitet</span>
                </div>
              </div>
            </div>

            {/* Main Advantages */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">De 7 Største Fordelene</h2>

              <section className="mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">1</span>
                  <h3 className="text-2xl font-semibold">Lanserings-Priser</h3>
                </div>
                <div className="pl-14 text-warm-700">
                  <p className="mb-4">
                    Utviklere lanserer prosjekter til vesentlig lavere priser for å generere tidlig momentum. Etter hvert som enheter selges, øker prisene i hver fase.
                  </p>
                  <div className="bg-success-50 border-l-4 border-success-500 p-4">
                    <p className="font-semibold text-success-800">Eksempel:</p>
                    <p className="text-success-700">Et prosjekt lanseres med 2-romsleiligheter på 195.000 euro. Ved ferdigstillelse 18 måneder senere, selges siste enheter for 260.000 euro — over 30% apresiering før du får nøklene.</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">2</span>
                  <h3 className="text-2xl font-semibold">10-Årgaranti</h3>
                </div>
                <div className="pl-14 text-warm-700">
                  <p className="mb-4">
                    Spansk lov krever at byggere gir lovpligtige garantier:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>10 år</strong> for strukturelle defekter</li>
                    <li><strong>3 år</strong> for habitabilitetsproblemer</li>
                    <li><strong>1 år</strong> for finalesdefekter</li>
                  </ul>
                  <p className="mt-4">
                    Med brukt eiendom — kjøper du som sett. Ethvert skjult problem er ditt ansvar.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">3</span>
                  <h3 className="text-2xl font-semibold">Moderne Design & Energieffektivitet</h3>
                </div>
                <div className="pl-14 text-warm-700">
                  <p className="mb-4">
                    Nybygg oppfyller gjeldende byggestandarder — brukt eiendom må renoveres for å oppnå det samme:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Hele leiligheten klimakontroll</li>
                    <li>Dobbel/trippel glasserte vinduer</li>
                    <li>Moderne termisk isolering</li>
                    <li>Energieffektivitets A/B-klassifisering</li>
                    <li>Moderne elektrikk og VA-ledning</li>
                  </ul>
                  <p className="mt-4">
                    Bedre energieffektivitet betyr lavere strømregninger — økende viktig når energikostnadene stiger.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">4</span>
                  <h3 className="text-2xl font-semibold">Spredning av Betalinger</h3>
                </div>
                <div className="pl-14 text-warm-700">
                  <p className="mb-4">
                    Med på tegning-kjøp, spredte du investeringen over 12-24 måneder:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Reservasjon: 3.000-10.000 euro</li>
                    <li>Kontraktsignering (30 dager): 20-30%</li>
                    <li>Under konstruksjon: 20-30%</li>
                    <li>Fullføring: 20-40%</li>
                  </ul>
                  <p className="mt-4">
                    Dette gir deg tid til å spare, selge eiendom, eller ordne finansiering. Med brukt kjøp, trenger du alt innen uker.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">5</span>
                  <h3 className="text-2xl font-semibold">Bankgarantibeskyttelse</h3>
                </div>
                <div className="pl-14 text-warm-700">
                  <p>
                    Når du kjøper på tegning i Spania, er dine etappebetalinger beskyttet av bankgaranti. Hvis utvikleren mislykkes å fullføre, får du pengene tilbake med renter. Denne beskyttelsen finnes ikke ved resale-kjøp.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">6</span>
                  <h3 className="text-2xl font-semibold">Bedre Boliglånvilkår</h3>
                </div>
                <div className="pl-14 text-warm-700">
                  <p>
                    Spanske banker foretreker å finansiere nybygg. Lavere risiko = bedre renter, høyere LTV, og raskere prosess. Mange utviklere har også bankpartnerskaper som strømlinjeformer finansieringen.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">7</span>
                  <h3 className="text-2xl font-semibold">Bedre Utleieverdier</h3>
                </div>
                <div className="pl-14 text-warm-700">
                  <p>
                    Moderne eiendommer trekker bedre gjester og høyere dagspriser. Lavere vedlikeholdskostnader forbedrer lønnsomheten. Resorts-fasiliteter øker bookingappellen.
                  </p>
                </div>
              </section>
            </section>

            {/* CTA */}
            <section className="bg-primary-50 rounded-sm p-8 mb-12 border border-primary-200">
              <h2 className="text-2xl font-semibold mb-4">Klar til å Utforske Nybygget?</h2>
              <p className="text-warm-700 mb-6">
                Vi spesialiserer oss eksklusivt i nybygg på Costa Blanca. Få tidlig tilgang til lanserings-priser og ekspertveiledning gjennom kjøpet.
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
              <Link href="/no/guides/kjopsprosessen" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">Kjøpsprosessen</h3>
                <p className="text-warm-600 text-sm">Steg-for-steg guide</p>
              </Link>
              <Link href="/no/guides/innflyttingsklar-tegning" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">Innflyttingsklar vs Tegning</h3>
                <p className="text-warm-600 text-sm">Hvilken passer deg?</p>
              </Link>
              <Link href="/no/guides/kostnader-skatt" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">Kostnader & Skatter</h3>
                <p className="text-warm-600 text-sm">Kostnadsberegning</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
