'use client';

import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970'
};

const DOMAIN = 'newbuildhomescostablanca.com';

interface ComparisonPoint {
  title: string;
  newBuild: string;
  oldProperty: string;
}

interface Section {
  title: string;
  description: string;
  points: string[];
}

const comparisonPoints: ComparisonPoint[] = [
  {
    title: 'Energieffektivitet',
    newBuild: 'A eller B energiklass — låga elkostnader',
    oldProperty: 'Ofta D-G — höga elkostnader'
  },
  {
    title: 'Garanti',
    newBuild: '10 års byggnadsgaranti (Ley 38/1999)',
    oldProperty: 'Ingen garanti'
  },
  {
    title: 'Moderna Standarder',
    newBuild: 'Uppfyller alla aktuella EU-regler och spanska standards',
    oldProperty: 'Kan ha gamla installationer och system'
  },
  {
    title: 'Anpassning',
    newBuild: 'Ofta möjlighet att välja finishes innan byggnation',
    oldProperty: 'Måste acceptera som det är'
  },
  {
    title: 'Bankeringa Stöd',
    newBuild: 'Bank garantierade projekt — säkrare',
    oldProperty: 'Privata köp kan ha högre risk'
  },
  {
    title: 'Underhåll',
    newBuild: 'Minimal reparationskostnad de första åren',
    oldProperty: 'Ofta oväntade reparationer'
  }
];

const sections: Section[] = [
  {
    title: 'Moderna Byggnadsstandard',
    description: 'Spanska nybygge följer strikt moderna EU-standarder för miljö, säkerhet och komfort.',
    points: [
      'Värmeiso­lering enligt EU Energy Performance of Buildings Directive (EPBD)',
      'Modern VVS med sparpumpar och högeffektiva värmeväxlare',
      'Solpaneler eller värmepump på många projekt',
      'Säkerhetssystem integrerade i hela byggnaden',
      'Brandskydd enligt spanska byggnader'
    ]
  },
  {
    title: 'Juridisk Skydd & 10-Årars Garanti',
    description: 'Spansk lag (Ley 38/1999) skyddar köpare av nybygge med en obligatorisk 10-årsgaranti.',
    points: [
      'Byggaren är ansvarig för konstruktiva fel i 10 år',
      '3-årars garanti för installationer (VVS, el, värme)',
      '1-årars garanti för övriga delar',
      'Bank garantierade projekt skyddar insättningar under byggnationen',
      'Denna garanti finns inte för begagnade fastigheter'
    ]
  },
  {
    title: 'Betalningsflexibilitet — Fasad Betalning',
    description: 'Till skillnad från Sverige där du måste låna från dag ett, kan du betala under byggnationen.',
    points: [
      'Reservering: €3,000–€6,000 för att reservera',
      'Kontrakt: ~30% när köpekontraktet undertecknas',
      'Grundläggning: ~20% när grundarbete påbörjas',
      'Invalling: ~20% när väggarna är upp',
      'Installationer: ~15% när VVS/el installeras',
      'Slutlig: ~15% vid nyckelöverlämning',
      'Detta innebär att du kan finansiera köpet gradvis istället för att ta ett stort lån från början'
    ]
  },
  {
    title: 'Transparenta Kostnader — Inga Dolda Avgifter',
    description: 'Spanska nybyggeprojekt har strikt reglerad prissättning utan gömda kostnader.',
    points: [
      'Priset som anges är det slutgiltiga priset (inklusive möbler och installationer)',
      'Ingen "optionalkostnad" som dyker upp senare',
      'Fastighetsbeskrivning (promotor) är juridiskt bindande',
      'Du vet exakt vad du får för dina pengar'
    ]
  }
];

const pricingComparison = [
  {
    region: 'Stockholm nyproduktion',
    price: '80,000–120,000 kr/m²',
    notes: '2 RoK lägenhet: 4–6 miljoner SEK'
  },
  {
    region: 'Costa Blanca nybygge (söder)',
    price: '2,000–3,000 €/m² (~20–30,000 kr/m²)',
    notes: '2 RoK lägenhet: 250–350,000 €'
  },
  {
    region: 'Costa Blanca nybygge (norr)',
    price: '3,500–5,000 €/m² (~35–50,000 kr/m²)',
    notes: '2 RoK lägenhet: 400–600,000 €'
  }
];

const bfrComparison = [
  {
    category: 'Äganderätt',
    sweden: 'Lägenhetsrätt i andelsföretag (BRF)',
    spain: 'Full freehold-äganderätt (ofta med gemensamma områden)'
  },
  {
    category: 'Stämman',
    sweden: 'BRF-stämma envar är medlem, högt fokus på röstning',
    spain: 'Junta de propietarios, ofta mindre formell, svenska köpare deltar ofta inte'
  },
  {
    category: 'Avgifter',
    sweden: 'Gemensamt driftsbidrag (ofta 2,000–3,000 kr/mån)',
    spain: 'Gemensamhetsavgift (cuota) ofta 100–200 €/mån'
  },
  {
    category: 'Renovering',
    sweden: 'Planering många år i förväg, stora pålagor',
    spain: 'Ofta mer ad hoc, mindre formella processer'
  },
  {
    category: 'Reserver',
    sweden: 'Strikt fond för framtida reparationer',
    spain: 'Varierar mycket, många byggnader har låga reserver'
  }
];

interface Faq {
  q: string;
  a: string;
}

const faqs: Faq[] = [
  {
    q: 'Kan jag köpa nybygge utan att bo i Spanien?',
    a: 'Ja, absolut. Du kan köpa nybygge i Spanien utan att vara bosatt där. Du behöver ett NIE-nummer, men själva köpet kan genomföras via din advokat och video-visningar.'
  },
  {
    q: 'Är nybygge i Spanien verkligen billigare än i Sverige?',
    a: 'Ja. En liknande 2-rumslägenhet kostar omkring 4–6 miljoner kronor i Stockholm, men bara 250–350,000 € (2.5–3.5 miljoner kronor) på Costa Blanca. Men tänk på att kostnader för fastigheter, skatter och underhål kan skilja sig åt mellan länderna.'
  },
  {
    q: 'Vad innebär 10-årsgarantin?',
    a: 'Byggaren måste åtgärda större konstruktiva fel fram till 10 år efter nyckelöverlämning. Det inkluderar väggsprickor, fukt, dörrar och fönster som inte fungerar korrekt. Installationer (VVS, el) täcks i 3 år, övriga delar i 1 år.'
  },
  {
    q: 'Måste jag bo här för att kunna hyra ut min fastighet senare?',
    a: 'Nej. Många svenska köpare köper nybygge för att hyra ut den på semesterbasis eller långtid. Du kan hantera det från Sverige genom att anlita en fastighetsförvaltare (gestor) lokalt.'
  },
  {
    q: 'Vilka är de största nackdelarna med nybygge?',
    a: 'Huvudnackdelarna är: lång väntetid (18–24 månader från köp till slutförande för off-plan), byggförseningar kan inträffa, och det tar tid innan området är fullt utvecklat med närliggande skolor och servicienter.'
  },
  {
    q: 'Kan jag ångra mig efter att ha skrivit ett reserver­ingsavtal?',
    a: 'Du kan ångra dig under reservationsperioden (normalt 10–30 dagar), men du förlorar reservationsinsättningen (€3,000–€6,000). Efter att ha undertecknat köpekontraktet kan du inte ångra dig utan att förlora mycket pengar.'
  }
];

export const metadata: Metadata = {
  title: 'Varför Köpa Nybygge i Spanien — Fördelar och Jämförelse | Svenska Guider',
  description: 'Läs om fördelarna med att köpa nybygge på Costa Blanca. Jämför priser, energieffektivitet, 10-årsgaranti, och transparenta kostnader. Perfekt för svenska köpare.',
  alternates: {
    languages: {
      en: `https://${DOMAIN}/guides/why-new-build`,
      sv: `https://${DOMAIN}/sv/guides/why-new-build`,
    },
    canonical: `https://${DOMAIN}/sv/guides/why-new-build`,
  },
};

export default function WhyNewBuildPage(): React.ReactElement {
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
              <span>Varför Nybygge</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
              Varför Köpa Nybygge i Spanien?
            </h1>
            <p className="text-lg text-primary-100 max-w-3xl leading-relaxed">
              Nybygge på Costa Blanca erbjuder fördelar som begagnade fastigheter inte kan matcha: moderna energieffektiva hem, juridisk skydd genom 10-årsgaranti, transparenta kostnader, och flexibel finansiering. Läs om varför tusentals svenska köpare väljer nybygge framför befintliga fastigheter.
            </p>
          </div>
        </section>

        {/* Quick Comparison Section */}
        <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Nybygge vs Begagnad Fastighet</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comparisonPoints.map((point, idx) => (
                <div key={idx} className="bg-white rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition">
                  <h3 className="text-lg font-light text-primary-900 mb-4">{point.title}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-accent-500 font-semibold mb-2">Nybygge</p>
                      <p className="text-sm text-gray-700">{point.newBuild}</p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-500 font-semibold mb-2">Begagnad</p>
                      <p className="text-sm text-gray-600">{point.oldProperty}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Advantages Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Sex Starka Fördelar Med Nybygge</h2>

            {sections.map((section, idx) => (
              <div key={idx} className="mb-16 pb-16 border-b border-gray-200 last:border-0">
                <div className="flex gap-4 mb-6">
                  <div className="bg-accent-500 text-white rounded-sm w-12 h-12 flex items-center justify-center font-light text-lg flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-light text-primary-900 mb-2">{section.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{section.description}</p>
                  </div>
                </div>

                <div className="ml-16 space-y-3">
                  {section.points.map((point, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-accent-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                      <p className="text-gray-700 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Price Comparison Section */}
        <section className="py-16 md:py-24 bg-warm-50 border-y border-warm-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-4 text-primary-900">Prisjämförelse: Stockholm vs Costa Blanca</h2>
            <p className="text-gray-700 mb-12 leading-relaxed">En 2-rumslägenhet i Stockholm kostar normalt 4–6 miljoner kronor. Jämför det med samma storlek på Costa Blanca:</p>

            <div className="space-y-4">
              {pricingComparison.map((item, idx) => (
                <div key={idx} className="bg-white rounded-sm p-6 border border-warm-200 hover:border-accent-500 transition">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h4 className="font-light text-lg text-primary-900">{item.region}</h4>
                      <p className="text-sm text-gray-600">{item.notes}</p>
                    </div>
                    <div className="bg-accent-50 rounded-sm px-6 py-4 border border-accent-200">
                      <p className="text-2xl font-light text-accent-500">{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white rounded-sm p-6 border-l-4 border-accent-500">
              <p className="text-gray-700 leading-relaxed">
                <strong>Ekonomisk konsekvens:</strong> En jämförbar 2-rumslägenhet är cirka 60–75% billigare på Costa Blanca än i Stockholm. Detta gör det möjligt för många svenska pensionärer och unga professionella att köpa nybygge helt utan bolån, eller med ett mycket litet lån.
              </p>
            </div>
          </div>
        </section>

        {/* BRF vs Spanish System */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Äganderätt: Svenska BRF vs Spanskt System</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              En viktig skillnad mellan att köpa nybygge i Sverige vs Spanien är hur äganderätten fungerar:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-900 text-white">
                    <th className="px-6 py-4 text-left font-light rounded-sm-tl">Kategori</th>
                    <th className="px-6 py-4 text-left font-light">Sverige (BRF)</th>
                    <th className="px-6 py-4 text-left font-light rounded-sm-tr">Spanien (Spanska System)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bfrComparison.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-light text-primary-900">{row.category}</td>
                      <td className="px-6 py-4 text-gray-700">{row.sweden}</td>
                      <td className="px-6 py-4 text-gray-700">{row.spain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 bg-accent-50 rounded-sm p-6 border border-accent-200">
              <h4 className="font-light text-lg text-primary-900 mb-3">Vad Innebär Detta för Dig?</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-3"><span className="text-accent-500 font-bold">•</span> Du äger fastigheten direkt — inte bara en andel i ett andelsföretag</li>
                <li className="flex gap-3"><span className="text-accent-500 font-bold">•</span> Det är ofta enkelt och snabbare att sälja på Spanska marknaden</li>
                <li className="flex gap-3"><span className="text-accent-500 font-bold">•</span> Du behöver inte delta i årliga stämmor eller rösta om större renoverigar</li>
                <li className="flex gap-3"><span className="text-accent-500 font-bold">•</span> Låga gemensamhetsavgifter jämfört med svenska BRF-avgifter</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Off-Plan Payment Benefits */}
        <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Fördelar Med Köp "på Ritning" (Off-Plan)</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Många svenska köpare köper nybygge på ritning (innan byggnationen är klar). Det här är en stor fördel jämfört med hur det fungerar i Sverige:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-xl font-light text-primary-900 mb-4">Sverige: Måste Låna Från Dag Ett</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-2"><span className="text-primary-900 font-bold">•</span> Du tecknar ett bolån när du köper — ofta innan byggnationen börjar</li>
                  <li className="flex gap-2"><span className="text-primary-900 font-bold">•</span> Du betalar ränta på hela beloppet från dag ett</li>
                  <li className="flex gap-2"><span className="text-primary-900 font-bold">•</span> Stora kassaflödesproblem de första åren</li>
                </ul>
              </div>

              <div className="bg-white rounded-sm p-6 border border-accent-200 border-2">
                <h3 className="text-xl font-light text-accent-500 mb-4">Spanien: Betala Under Byggnationen</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">✓</span> Du betalar bara när olika byggnationsfaser är klara</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">✓</span> Du kan sprida betalningarna över 18–24 månader</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">✓</span> Mindre belastning på din ekonomi under byggnationen</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-warm-50 rounded-sm p-6 border-l-4 border-accent-500">
              <h4 className="font-light text-lg text-primary-900 mb-3">Exempel: Betalningsplan för €300,000 Lägenhet</h4>
              <div className="space-y-2 text-gray-700 font-light">
                <p>Reservation: €5,000 (omedelbar)</p>
                <p>Köpekontrakt: €90,000 (~30%, vecka 1)</p>
                <p>Grundläggning: €60,000 (~20%, vecka 8)</p>
                <p>Invalling: €60,000 (~20%, vecka 12)</p>
                <p>Installationer: €45,000 (~15%, vecka 16)</p>
                <p>Slutlig: €40,000 (~13%, vid överlåtelse vecka 20–24)</p>
                <p className="text-sm text-gray-600 mt-3">
                  I stället för att låna €300,000 från dag ett och betala ränta i 20+ år, betalar du gradvis. Du kan till och med spara upp och betala kontant när fastigheten är färdig.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bank Guarantee Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Bankgaranti Skyddar Din Insättning</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              En stor fördel med nybyggeprojekt i Spanien är att dina insättningar under byggnationen är skyddade av lagstiftning (Ley 57/1968). Denna lag säkerställer att byggaren måste avsätta dina pengar på ett skyddat bankkonto — de kan inte använda dem för något annat.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h4 className="font-light text-lg text-primary-900 mb-4">Vad Skyddar Lagen</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">✓</span> All pengar från köpare under byggnationen</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">✓</span> Dessa pengar lagras på separata bankkonton</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">✓</span> Byggaren kan inte röra pengarna förrän respektive byggnationsfas är slutförd</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">✓</span> Om byggaren blir insolvent skyddas du</li>
                </ul>
              </div>

              <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                <h4 className="font-light text-lg text-accent-500 mb-4">Praktisk Inverkan</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Du kan köpa nybygge med större säkerhet än begagnade fastigheter</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Risk för att byggaren tar pengarna och försvinner är mycket låg</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Om något går fel kan du ofta få tillbaka dina pengar via banken</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Du kan köpa med förtroende — detta är strikt reglerat</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-sm p-6 border border-gray-200">
              <h4 className="font-light text-lg text-primary-900 mb-3">Rekommendation: Verifiera Bank­garanti</h4>
              <p className="text-gray-700 leading-relaxed">
                Innan du undertecknar ett reservationsavtal eller köpekontrakt för nybygge, be din advokat bekräfta att projektet är registrerat med en bankgaranti enligt Ley 57/1968. Det här är en absolut måste före du skickar någon pengar till byggaren.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Vanliga Frågor om Nybygge</h2>

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
                <h3 className="text-2xl font-light mb-4">Bläddra Våra Nybyggeprojekt</h3>
                <p className="text-primary-100 mb-6 leading-relaxed">
                  Utforska vårt urval av moderna nybyggeprojekt på Costa Blanca. Filtrera efter pris, plats och bostadstyp.
                </p>
                <Link href="/sv/properties?type=new-build" className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-light py-3 px-6 rounded-sm transition">
                  Se Nybyggeprojekt
                </Link>
              </div>

              <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-sm p-8 text-white">
                <h3 className="text-2xl font-light mb-4">Inte Säker Ännu?</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Vår svenska team kan besvara alla dina frågor om nybygge, finansiering och köpprocessen.
                </p>
                <a href={CONTACT.whatsapp} className="inline-block bg-white hover:bg-gray-100 text-accent-500 font-light py-3 px-6 rounded-sm transition">
                  Kontakta Oss
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Relaterade Guider</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/sv/guides/key-ready-vs-off-plan">
                <div className="bg-white rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition h-full">
                  <h4 className="text-lg font-light text-primary-900 mb-3">Inflyttningsklart vs Ritning</h4>
                  <p className="text-sm text-gray-600 mb-4">Jämför fördelar och nackdelar med färdiga vs on-plan köp</p>
                  <div className="flex items-center text-accent-500 text-sm font-light">
                    Läs Mer →
                  </div>
                </div>
              </Link>

              <Link href="/sv/guides/north-vs-south">
                <div className="bg-white rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition h-full">
                  <h4 className="text-lg font-light text-primary-900 mb-3">Norr vs Söder Costa Blanca</h4>
                  <p className="text-sm text-gray-600 mb-4">Upptäck de två populära regionerna och vilken som passar dig</p>
                  <div className="flex items-center text-accent-500 text-sm font-light">
                    Läs Mer →
                  </div>
                </div>
              </Link>

              <Link href="/sv/guides/costs-taxes">
                <div className="bg-white rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition h-full">
                  <h4 className="text-lg font-light text-primary-900 mb-3">Kostnader & Skatter</h4>
                  <p className="text-sm text-gray-600 mb-4">Komplett uppdelning av alla kostnader när du köper</p>
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
            <h2 className="text-4xl font-light mb-6">Redo Att Köpa Nybygge?</h2>
            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
              Vi hjälper dig genom varje steg — från att hitta rätt projekt till nyckelöverlämning. Kontakta vår svenska team idag.
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
              { name: 'Varför Nybygge', url: `https://${DOMAIN}/sv/guides/why-new-build` }
            ])
          )
        )}
      </script>
    </>
  );
}
