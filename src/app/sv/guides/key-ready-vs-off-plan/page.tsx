import Link from 'next/link';
import { Metadata } from 'next';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970'
};

const DOMAIN = 'newbuildhomescostablanca.com';

interface ComparisonTable {
  category: string;
  keyReady: string;
  offPlan: string;
}

interface PaymentPhase {
  phase: string;
  percentage: string;
  timing: string;
}

interface Scenario {
  title: string;
  description: string;
  recommendation: string;
  reasoning: string[];
}

interface Faq {
  q: string;
  a: string;
}

const comparisonData: ComparisonTable[] = [
  {
    category: 'Tid Till Inflyttning',
    keyReady: '0–3 månader (omedelbar)',
    offPlan: '18–24 månader (från köp till färdig)'
  },
  {
    category: 'Pris',
    keyReady: 'Högre (15–25% dyrare än off-plan)',
    offPlan: 'Lägre (rabatt för tidigt köp)'
  },
  {
    category: 'Vad Du Ser',
    keyReady: 'Exakt lägenhet — inga överraskningar',
    offPlan: 'Modelllägenhet eller ritningar — kan skilja sig'
  },
  {
    category: 'Val av Finishes',
    keyReady: 'Inga val — redan färdig',
    offPlan: 'Många val: färger, material, kök, golv (inom gränser)'
  },
  {
    category: 'Finansiering',
    keyReady: 'Vanligt bolån från dag ett',
    offPlan: 'Phased payment — sprids under byggnation'
  },
  {
    category: 'Byggrisker',
    keyReady: 'Ingen — färdig och testerad',
    offPlan: 'Små risker — byggförsening möjlig'
  },
  {
    category: 'Bank­garanti',
    keyReady: 'Inte applicerbar',
    offPlan: 'Ley 57/68 skyddar insättningar'
  },
  {
    category: 'Användarvillkor',
    keyReady: 'Ofta redan möblerad/utrustad',
    offPlan: 'Ofta bara skalet — du möblerar själv'
  }
];

const offPlanPaymentSchedule: PaymentPhase[] = [
  {
    phase: 'Reservation',
    percentage: '€3,000–€6,000',
    timing: 'Omedelbar — för att reservera'
  },
  {
    phase: 'Köpekontrakt',
    percentage: '~30% av priset',
    timing: 'Vid undertecknande (vecka 1)'
  },
  {
    phase: 'Grundläggning',
    percentage: '~20% av priset',
    timing: 'När grundarbete är klart (vecka 8–10)'
  },
  {
    phase: 'Invalling',
    percentage: '~20% av priset',
    timing: 'När väggarna är upp (vecka 12–16)'
  },
  {
    phase: 'Installationer',
    percentage: '~15% av priset',
    timing: 'När VVS/el/värme är installeradt (vecka 18–20)'
  },
  {
    phase: 'Slutlig Betalning',
    percentage: '~15% av priset',
    timing: 'Vid nyckelöverlämning (vecka 22–24)'
  }
];

const scenarios: Scenario[] = [
  {
    title: 'Om Du Vill Flytta Snabbt',
    description: 'Du är redan pensionerad och vill flytta till Spanien nästa månad eller vinter.',
    recommendation: 'Key-Ready är rätt val för dig.',
    reasoning: [
      'Du kan flytta in omedelbar — ingen väntan',
      'Du ser exakt vad du får innan du köper',
      'Allt är redan färdigt och testerat',
      'Inga byggförseningar kan påverka dina planer'
    ]
  },
  {
    title: 'Om Du Planerar Långsiktigt',
    description: 'Du köper som långsiktig investering och planerar att hyra ut eller använda senare.',
    recommendation: 'Off-Plan kan ge dig bättre värde.',
    reasoning: [
      'Du sparar 15–25% på priset jämfört med key-ready',
      'Phased payment är mer flexibel för din ekonomi',
      'Du kan välja finishes som matchar din vision',
      'Potentiellt högre värdeökning när det är färdigt'
    ]
  },
  {
    title: 'Om Du Har Begränsad Budget',
    description: 'Dina sparpengar är begränsade och du behöver att sprida kostnaderna.',
    recommendation: 'Off-Plan är ofta det bästa alternativet.',
    reasoning: [
      'Off-plan är ofta 15–25% billigare än key-ready',
      'Phased payment innebär du inte betalar allt på en gång',
      'Du kan spara pengar medan du betalar för byggnationen',
      'Bank­garanti skyddar dina insättningar'
    ]
  },
  {
    title: 'Om Du Oroar Dig för Byggkvalitet',
    description: 'Du vill se byggnationen och verifiera kvaliteten innan slutlig betalning.',
    recommendation: 'Off-Plan ger dig denna kontroll.',
    reasoning: [
      'Du kan besöka bygget under olika faser',
      'Du kan inspektera kvaliteten innan varje betalning',
      'Du kan verifiera att finishes motsvarar dina specifikationer',
      'Du har möjlighet att dokumentera eventuella defekter tidigare'
    ]
  }
];

const faqs: Faq[] = [
  {
    q: 'Varför är key-ready så mycket dyrare än off-plan?',
    a: 'Byggaren har redan investerat kapital och tid för att slutföra projektet. De måste hålla kassa för att möta marknadsefterfrågan. Du betalar för omedelbar tillgänglighet och noll risk för byggförsening. Off-plan köpare får rabatt i utbyte mot att vänta och acceptera lite risk.'
  },
  {
    q: 'Kan jag välja finishes för off-plan om det redan är halvbyggt?',
    a: 'Det beror på projektet och hur långt byggnationen kommit. Om du köper sehr tidigt kan du välja allt. Om det är 50% färdigt kan du kanske bara välja köksinredning och golvtyp. Fråga alltid innan du köper.'
  },
  {
    q: 'Vad händer om byggaren blir sen med off-plan?',
    a: 'Byggförseningar är vanligt i Spanien — ofta 3–6 månader. Ditt köpekontrakt bör innehålla en "force majeure"-klausul som skyddar båda parter. Om det blir mycket sen kan du normalt kräva kompensation. Din advokat bör granska detta.'
  },
  {
    q: 'Förlorar jag pengar om jag cancellerar ett off-plan köp?',
    a: 'Ja. Om du cancellerar efter att ha undertecknat köpekontraktet förlorar du normalt allt betalat (reservering + köpe­kontraktbetalning). Om byggaren cancellerar måste de returnera alla pengar plus ränta. Läs alltid avtalet noga.'
  },
  {
    q: 'Är det värt att köpa key-ready bara för att slippa väntan?',
    a: 'Det beror på dina prioriteringar. Om du värderar snabb inflyttning höger än sparande, ja. Men om du kan vänta 18–24 månader sparar du ofta 50,000–100,000 € genom att köpa off-plan. Det är en stor skillnad för många.'
  },
  {
    q: 'Kan jag se modellägenheten och sedan köpa en annan lägenhet i samma projekt (off-plan)?',
    a: 'Ja, detta är väldigt vanligt. Du besöker modellägenheten för att se standard och finish. Sedan undertecknar du ett köpekontrakt för en annan lägenhet (ofta högre upp i byggnaden) till ett lägre pris. Din advokat bör kontrollera att specifikationerna är identiska.'
  },
  {
    q: 'Vilken typ är bäst för att hyra ut senare?',
    a: 'Off-plan är ofta bättre för utländska investerare. Du sparar pengar som kan användas för möblering och marknadsföring. Key-ready är redan möblerad så du kan börja hyra omedelbar, vilket är bra om du behöver kassaflöde snabbt.'
  },
  {
    q: 'Kan jag få bolån för off-plan?',
    a: 'Ja, men villkoren skiljer sig. Banker lånar normalt lägre andel för off-plan (50–60% vs 60–70% för key-ready) eftersom det finns lite mer risk. Åter­betalningstiden startar ofta när fastigheten är färdig, inte när du undertecknar kontraktet.'
  }
];

export const metadata: Metadata = {
  title: 'Inflyttningsklart vs Köpa på Ritning — Komplett Jämförelse | Svenska Guider',
  description: 'Jämför fördelar och nackdelar med key-ready vs off-plan nybygge. Betalningsplaner, risker, tidsplan och exempel. Vilken passar dig?',
  alternates: {
    languages: {
      en: `https://${DOMAIN}/guides/key-ready-vs-off-plan`,
      sv: `https://${DOMAIN}/sv/guides/key-ready-vs-off-plan`,
    },
    canonical: `https://${DOMAIN}/sv/guides/key-ready-vs-off-plan`,
  },
};

export default function KeyReadyVsOffPlanPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-900 to-primary-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Breadcrumb */}
            <nav className="text-sm mb-8 flex items-center gap-2 text-primary-100">
              <Link href="/sv/" className="hover:text-white transition">Hem</Link>
              <span>›</span>
              <Link href="/sv/guides/" className="hover:text-white transition">Guider</Link>
              <span>›</span>
              <span>Key-Ready vs Off-Plan</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
              Inflyttningsklart vs Köpa på Ritning
            </h1>
            <p className="text-lg text-primary-100 max-w-3xl leading-relaxed">
              Två vägar för att köpa nybygge — varje med sina fördelar och nackdelar. Key-ready innebär omedelbar inflyttning men högre pris. Off-plan innebär väntan men lägre kostnad och flexibel finansiering. Läs hur du väljer rätt för din situation.
            </p>
          </div>
        </section>

        {/* Quick Comparison Table */}
        <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Snabb Jämförelse</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-900 text-white">
                    <th className="px-6 py-4 text-left font-light rounded-sm-tl">Kategori</th>
                    <th className="px-6 py-4 text-left font-light">Inflyttningsklart (Key-Ready)</th>
                    <th className="px-6 py-4 text-left font-light rounded-sm-tr">Köpa på Ritning (Off-Plan)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-light text-primary-900">{row.category}</td>
                      <td className="px-6 py-4 text-gray-700">{row.keyReady}</td>
                      <td className="px-6 py-4 text-gray-700">{row.offPlan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Key-Ready Deep Dive */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex gap-4 mb-6">
              <div className="bg-primary-900 text-white rounded-sm w-12 h-12 flex items-center justify-center font-light text-lg flex-shrink-0">1</div>
              <div className="flex-1">
                <h2 className="text-3xl font-light text-primary-900 mb-2">Inflyttningsklart (Key-Ready)</h2>
                <p className="text-gray-700 leading-relaxed">
                  Fastigheten är helt färdig, möblerad och inmudderad. Du kan flytta in nästa vecka.
                </p>
              </div>
            </div>

            <div className="ml-16 space-y-8">
              {/* Pros */}
              <div>
                <h3 className="text-xl font-light text-accent-500 mb-6">Fördelar Med Key-Ready</h3>
                <div className="space-y-4">
                  <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Omedelbar Inflyttning</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Du kan ta nycklarna och flytta in nästa vecka. Perfekt om du redan är pensionerad eller planerar att flytta innan nästa säsong.
                    </p>
                  </div>

                  <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Se Exakt Vad Du Får</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Du inspekterar den exakta lägenheten innan köp. Inga överraskningar — vad du ser är vad du får. Du kan verifiera byggnatkvalitet, material, utförande och finishes.
                    </p>
                  </div>

                  <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Noll Byggrisker</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Inga byggförseningar kan påverka dina planer. Fastigheten är redan slutförd och testerad. Du tar ingen risk för att något saknas eller är felaktigt.
                    </p>
                  </div>

                  <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Ofta Redan Möblerad</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Många key-ready lägenheter är redan möblerade. Du kan hyra ut omedelbar utan att investera mer i möbler och utrustning.
                    </p>
                  </div>

                  <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Enklare Bolåneprocess</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Banker är ofta villigare att finansiera key-ready fastigheter — det är ingen byggrisker. Du kan få bolåneavtal snabbare och ofta på bättre villkor.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cons */}
              <div>
                <h3 className="text-xl font-light text-primary-900 mb-6">Nackdelar Med Key-Ready</h3>
                <div className="space-y-4">
                  <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Högre Pris — 15–25% Dyare</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Key-ready lägenhet kostar normalt 15–25% mer än samma lägenhet off-plan. En lägenhet till €250,000 off-plan kan kosta €300,000+ när den är färdig.
                    </p>
                  </div>

                  <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Inga Val av Finishes</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Lägenheten är redan färdig — du kan inte välja färger, kakel, köksinredning eller golv. Du måste acceptera vad som redan är installerat.
                    </p>
                  </div>

                  <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Mindre Urval</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Oftast finns det bara ett fåtal färdiga enheter tillgängliga på marknaden vid varje tillfälle. Urval av lägenhetsstorlek, orientering och läge är begränsat.
                    </p>
                  </div>

                  <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Möbler Du Kanske Inte Gillar</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Möbler är ofta standardiserade och kanske inte matchar din personlig stil. Du kan vara tvungen att byta möbler om de inte passar dina krav.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Off-Plan Deep Dive */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex gap-4 mb-6">
              <div className="bg-accent-500 text-white rounded-sm w-12 h-12 flex items-center justify-center font-light text-lg flex-shrink-0">2</div>
              <div className="flex-1">
                <h2 className="text-3xl font-light text-primary-900 mb-2">Köpa på Ritning (Off-Plan)</h2>
                <p className="text-gray-700 leading-relaxed">
                  Du köper baserat på ritningar och specifikationer. Fastigheten är inte klar ännu — normalt 18–24 månader från köp till färdig.
                </p>
              </div>
            </div>

            <div className="ml-16 space-y-8">
              {/* Pros */}
              <div>
                <h3 className="text-xl font-light text-accent-500 mb-6">Fördelar Med Off-Plan</h3>
                <div className="space-y-4">
                  <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Mycket Billigare — Spara 15–25%</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Off-plan är normalt 15–25% billigare än samma lägenhet när den är färdig. En €250,000 lägenhet off-plan kan vara €300,000+ när den är key-ready. Det kan sparar dig 50,000–100,000 €!
                    </p>
                  </div>

                  <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Välj Finishes — Personalisera Din Hem</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Om du köper tidigt kan du ofta välja färger, kakel, golv, köksinredning och till och med möbler. Du kan skapa exakt den lägenhet du drömmer om.
                    </p>
                  </div>

                  <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Phased Payment — Sprida Kostnaderna</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Du betalar under byggnationen, inte allt på en gång. Över 18–24 månader kan du sprida kostnaderna och spara pengar under tiden.
                    </p>
                  </div>

                  <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Bank­garanti Skyddar Dina Pengar (Ley 57/68)</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Spansk lag säkerställer att dina insättningar är skyddade på separata bankkonton. Om byggaren blir insolvent är du skyddad. Det här är en stor fördel.
                    </p>
                  </div>

                  <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Inspektera Under Byggnationen</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Du kan besöka bygget regelbundet och inspektera arbetens framsteg och kvalitet. Om något är felaktigt kan du kräva ändringar innan slutlig betalning.
                    </p>
                  </div>

                  <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Större Urval — Alla Lägenheter Finns</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Du kan välja från alla tillgängliga enheter i projektet — alla våningar, orientering och lägen. Off-plan marknaden är mycket större än key-ready.
                    </p>
                  </div>

                  <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Potentiell Värdeökning</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Off-plan fastigheter ökar ofta i värde när de blir färdiga. Du köper till ett lågt pris och kan senare sälja till ett högre marknadspris. God investering.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cons */}
              <div>
                <h3 className="text-xl font-light text-primary-900 mb-6">Nackdelar Med Off-Plan</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-sm p-6 border border-gray-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Långt Vänta — 18–24 Månader</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Du kan inte flytta in omedelbar. Du måste vänta 18–24 månader från köp till färdig. Om du är pensionerad och vill flytta direkt är det inte perfekt.
                    </p>
                  </div>

                  <div className="bg-white rounded-sm p-6 border border-gray-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Byggförseningar Är Vanliga</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Spanska byggen sällan färdiga i tid. 3–6 månader förseningar är vanlig. Dina planer kan påverkas. (Ditt kontrakt bör ha force majeure-klausul.)
                    </p>
                  </div>

                  <div className="bg-white rounded-sm p-6 border border-gray-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Se Bara Modelllägenhet eller Ritningar</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Du köper baserat på ritningar och en modelllägenhet. Det slutliga resultatet kan skilja sig från vad du förväntat dig. Viktigt att anlita advokat.
                    </p>
                  </div>

                  <div className="bg-white rounded-sm p-6 border border-gray-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Svårare Att Få Bolån</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Banker är mer försiktiga med off-plan — de lånar normalt lägre andel (50–60% vs 70%). Större insats krävs från dig. Rentebetalningstiden startar ofta när huset är färdigt.
                    </p>
                  </div>

                  <div className="bg-white rounded-sm p-6 border border-gray-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Byggkvalitet — Kan Skilja Sig</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Om byggaren stöter på finansiella svårigheter kan kvaliteten bli sämre än planerat. Viktigt att välja etablerade byggare och anlita advokat för inspektioner.
                    </p>
                  </div>

                  <div className="bg-white rounded-sm p-6 border border-gray-200">
                    <h4 className="font-light text-lg text-primary-900 mb-2">Ångra Dig = Förlorad Pengar</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Om du ångrar dig efter att ha undertecknat köpekontraktet förlorar du normalt allt betalat — reservation + köpekontraktbetalning. Det kan vara 50,000–100,000 €!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Off-Plan Payment Schedule */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Betalningsplan för Off-Plan (Exempel €300,000)</h2>

            <div className="space-y-3 mb-8">
              {offPlanPaymentSchedule.map((phase, idx) => (
                <div key={idx} className="bg-white rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-light text-lg text-primary-900 mb-2">{phase.phase}</h4>
                      <p className="text-sm text-gray-600">{phase.timing}</p>
                    </div>
                    <div className="bg-accent-50 rounded-sm px-4 py-2 border border-accent-200">
                      <p className="text-lg font-light text-accent-500">{phase.percentage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-warm-50 rounded-sm p-6 border-l-4 border-accent-500">
              <h4 className="font-light text-lg text-primary-900 mb-3">Finansiell Fördelar</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2"><span className="text-accent-500 font-light">✓</span> Du behöver inte låna hela beloppet från dag ett</li>
                <li className="flex gap-2"><span className="text-accent-500 font-light">✓</span> Mindre räntor över tiden</li>
                <li className="flex gap-2"><span className="text-accent-500 font-light">✓</span> Du kan spara pengar under byggnationen</li>
                <li className="flex gap-2"><span className="text-accent-500 font-light">✓</span> Större flexibilitet för din ekonomi</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Scenarios */}
        <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Vilken Passar Dig? — Fyra Exempel</h2>

            <div className="space-y-4">
              {scenarios.map((scenario, idx) => (
                <details
                  key={idx}
                  className="group bg-white rounded-sm border border-gray-200 hover:border-accent-500 transition"
                >
                  <summary className="cursor-pointer p-6 flex items-start justify-between">
                    <div className="flex-1 text-left">
                      <h4 className="font-light text-lg text-primary-900 mb-1">{scenario.title}</h4>
                      <p className="text-sm text-gray-600">{scenario.description}</p>
                    </div>
                    <span className="text-accent-500 text-xl group-open:rotate-180 transition ml-4 flex-shrink-0">+</span>
                  </summary>

                  <div className="px-6 pb-6 border-t border-gray-200 space-y-4">
                    <div className="bg-accent-50 rounded-sm p-4 border border-accent-200">
                      <p className="font-light text-accent-500 text-lg">Rekommendation: {scenario.recommendation}</p>
                    </div>

                    <div>
                      <h5 className="font-light text-primary-900 mb-3">Varför?</h5>
                      <ul className="space-y-2">
                        {scenario.reasoning.map((reason, i) => (
                          <li key={i} className="flex gap-2 text-gray-700">
                            <span className="text-accent-500 font-light flex-shrink-0">▸</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Vanliga Frågor</h2>

            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <details key={idx} className="bg-white rounded-sm border border-gray-200 p-6 cursor-pointer hover:border-accent-500 transition group">
                  <summary className="flex items-start justify-between font-light text-primary-900 text-lg cursor-pointer">
                    <span>{faq.q}</span>
                    <span className="text-accent-500 text-xl group-open:rotate-180 transition ml-4 flex-shrink-0 font-light">+</span>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Sections */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-sm p-8 text-white">
                <h3 className="text-2xl font-light mb-4">Bläddra Key-Ready Fastigheter</h3>
                <p className="text-primary-100 mb-6 leading-relaxed">
                  Se våra inflyttningsklara lägenheter — klar att flytta in omedelbar.
                </p>
                <Link href="/sv/properties?type=key-ready" className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-light py-3 px-6 rounded-sm transition">
                  Se Key-Ready
                </Link>
              </div>

              <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-sm p-8 text-white">
                <h3 className="text-2xl font-light mb-4">Bläddra Off-Plan Projekt</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Utforska prisvärda off-plan nybyggeprojekt på ritning.
                </p>
                <Link href="/sv/properties?type=off-plan" className="inline-block bg-white hover:bg-gray-100 text-accent-500 font-light py-3 px-6 rounded-sm transition">
                  Se Off-Plan
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Relaterade Guider</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/sv/guides/why-new-build">
                <div className="bg-white rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition h-full">
                  <h4 className="text-lg font-light text-primary-900 mb-3">Varför Köpa Nybygge?</h4>
                  <p className="text-sm text-gray-600 mb-4">Fördelar med nybygge jämfört med begagnad fastighet</p>
                  <div className="flex items-center text-accent-500 text-sm font-light">
                    Läs Mer →
                  </div>
                </div>
              </Link>

              <Link href="/sv/guides/north-vs-south">
                <div className="bg-white rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition h-full">
                  <h4 className="text-lg font-light text-primary-900 mb-3">Norr vs Söder Costa Blanca</h4>
                  <p className="text-sm text-gray-600 mb-4">Jämför de två populära regionerna</p>
                  <div className="flex items-center text-accent-500 text-sm font-light">
                    Läs Mer →
                  </div>
                </div>
              </Link>

              <Link href="/sv/guides/costs-taxes">
                <div className="bg-white rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition h-full">
                  <h4 className="text-lg font-light text-primary-900 mb-3">Kostnader & Skatter</h4>
                  <p className="text-sm text-gray-600 mb-4">Komplett uppdelning av alla kostnader</p>
                  <div className="flex items-center text-accent-500 text-sm font-light">
                    Läs Mer →
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary-900 to-primary-800 text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-4xl font-light mb-6">Inte Säker Vilken Du Ska Välja?</h2>
            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
              Vi kan hjälpa dig att väga fördelar och nackdelar baserat på din personliga situation. Kontakta vår svenska team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CONTACT.whatsapp} className="bg-accent-500 hover:bg-accent-600 text-white font-light py-4 px-8 rounded-sm transition inline-block">
                Kontakta Oss på WhatsApp
              </a>
              <a href={`tel:${CONTACT.phone}`} className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-light py-4 px-8 rounded-sm transition inline-block">
                Ring Oss
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(
          toJsonLd(
            breadcrumbSchema([
              { name: 'Hem', url: `https://${DOMAIN}/sv/` },
              { name: 'Guider', url: `https://${DOMAIN}/sv/guides/` },
              { name: 'Key-Ready vs Off-Plan', url: `https://${DOMAIN}/sv/guides/key-ready-vs-off-plan` }
            ])
          )
        )}
      </script>
    </>
  );
}
