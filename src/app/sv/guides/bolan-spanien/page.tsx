'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const BolanSpanienPage = () => {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [loanTerm, setLoanTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(3.5);

  const monthlyPayment = (loanAmount * (interestRate / 100 / 12)) / (1 - Math.pow(1 + interestRate / 100 / 12, -loanTerm * 12));
  const totalPayment = monthlyPayment * loanTerm * 12;
  const totalInterest = totalPayment - loanAmount;

  const sekkurs = 11.5;

  const spanishBanks = [
    {
      name: 'CaixaBank',
      rate: '3,2-3,8%',
      ltv: '70%',
      strength: 'Bra erfarenhet med utländska köpare',
      website: 'www.caixabank.es'
    },
    {
      name: 'BBVA',
      rate: '3,3-3,9%',
      ltv: '70%',
      strength: 'Internationell bank, svenska kundservice',
      website: 'www.bbva.es'
    },
    {
      name: 'Sabadell',
      rate: '3,1-3,7%',
      ltv: '65%',
      strength: 'Konkurrenskraftiga priser för utlänningar',
      website: 'www.bancsabadell.com'
    },
    {
      name: 'Bankinter',
      rate: '3,4-4,0%',
      ltv: '60-70%',
      strength: 'Flexibla villkor, bra online-tjänster',
      website: 'www.bankinter.com'
    }
  ];

  const requiredDocuments = [
    { doc: 'Giltigt pass', swedish: 'Ja', notes: 'Måste gälla under hela låneperioden' },
    { doc: 'NIE-nummer', swedish: 'Ja', notes: 'Spanskt ID-nummer för utlänningar' },
    { doc: 'Deklaration (de renta)', swedish: 'Senaste 2-3 år', notes: 'Svenska skatteblankett' },
    { doc: 'Anställningskontrakt', swedish: 'Ja', notes: 'Eller andra bevis på inkomst' },
    { doc: 'Bankutdrag', swedish: 'Senaste 3 mån', notes: 'Från alla bankkonton' },
    { doc: 'Arbetskontakt från arbetsgivare', swedish: 'Ofta begärt', notes: 'Bekräftelse av anställning' },
    { doc: 'Fastighetsvärdering', swedish: 'Avtalat av bank', notes: 'Betald av låntagare' },
    { doc: 'Försäkringsöversikt', swedish: 'Ja', notes: 'Du måste försäkra fastigheten' }
  ];

  const faqs = [
    {
      q: 'Kan svenska medborgare få bolån i Spanien?',
      a: 'Ja, svenska medborgare kan få bolån i Spanien. De flesta större spanska banker erbjuder bolån till utländska köpare. Du behöver NIE-nummer och ett spanskt bankkonto. Typiskt kan du få upp till 60-70% av fastighetsvärdet.'
    },
    {
      q: 'Vad är skillnaden mellan ett svenskt och ett spanskt bolån?',
      a: 'Spanska bolån: Normalt 60-70% LTV, fast ränta 3,0-3,5%, 20-30 år. Svenska bolån via equityrelease: Betalar på din svenska fastighet, kan få högre procentsats. Spanska bolån är ofta billigare i ränta.'
    },
    {
      q: 'Hur lång tid tar det att få lånebesked?',
      a: 'Normalt 4-8 veckor från ansökan till godkännande. Det kan gå snabbare om alla dokument är kompletta. Vi rekommenderar att starta processen tidigt innan du undertecknar köpekontraktet.'
    },
    {
      q: 'Vilka är de största kostnaderna för ett spanskt bolån?',
      a: 'Huvudsakliga kostnader: Värderingsavgift (€300-500), juridisk granskning (€400-700), försäkringsavgift (€1-3% av lånebeloppet), uppläggningsavgift (0-1%). Totalt ca 3-5% av lånebeloppet.'
    },
    {
      q: 'Kan jag refinansiera mitt bolån senare?',
      a: 'Ja, många refinansierar efter några år. Du kan refinansiera i Spanien eller byta till ett svenskt bolån om dina omständigheter förändras. Refinansiering kan rädda pengar om räntorna sjunker.'
    },
    {
      q: 'Vad är Habeno och hur hjälper de?',
      a: 'Habeno är hypotekspecialister som förhindrar svenska och nordiska köpare att få bolån i Spanien. De har etablerade relationer med spanska banker och kan ofta ordna bättre villkor än om du går direkt till banken. Vi arbetar nära med Habeno för att underlätta processen för våra kunder.'
    }
  ];

  return (
    <>
      <Head>
        <title>Bolån i Spanien - Guide för Svenska Köpare | Newbuild Spain</title>
        <meta name="description" content="Guide till bolånefinansiering för svenska köpare av fastighet i Spanien. Spanska banker, LTV, räntor och process." />
        <link rel="canonical" href="https://newbuild.es/sv/guides/bolan-spanien" />
        <link rel="alternate" hrefLang="sv" href="https://newbuild.es/sv/guides/bolan-spanien" />
        <link rel="alternate" hrefLang="en" href="https://newbuild.es/guides/mortgages-spain" />
        <link rel="alternate" hrefLang="es" href="https://newbuild.es/guides/hipotecas-espana" />
      </Head>

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
              <span>Bolån i Spanien</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Bolån i Spanien — Guide för Svenska Köpare
            </h1>
            <p className="text-lg text-primary-100 max-w-3xl leading-relaxed">
              Hur man finansierar ett fastighetsköp i Spanien. Spanska banker, räntor, villkor och processen för att få bolånegodkännande.
            </p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-8 text-primary-900">Kan Svenska Medborgare Få Bolån i Spanien?</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Ja, svenska medborgare kan absolut få bolån i Spanien för att köpa fastighet. De flesta större spanska banker erbjuder routinemässigt bolån till utländska köpare, inklusive svenskar. Processen är ganska okomplicerad om du har rätt dokumentation och finansiell situation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <div className="text-accent-500 text-4xl font-bold mb-3">60-70%</div>
                <p className="font-bold text-primary-900 mb-2">Maximal LTV</p>
                <p className="text-sm text-gray-700">Spanska banker erbjuder normalt 60-70% av fastighetsvärdet</p>
              </div>
              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <div className="text-accent-500 text-4xl font-bold mb-3">3-3.5%</div>
                <p className="font-bold text-primary-900 mb-2">Typisk Ränta</p>
                <p className="text-sm text-gray-700">Fast ränta för 10+ år bolån</p>
              </div>
              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <div className="text-accent-500 text-4xl font-bold mb-3">4-8 v</div>
                <p className="font-bold text-primary-900 mb-2">Tid till Godkännande</p>
                <p className="text-sm text-gray-700">Från ansökan till lånegodkännande</p>
              </div>
            </div>
          </div>
        </section>

        {/* Spanish Banks Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Spanska Banker för Utländska Köpare</h2>
            <p className="text-gray-700 mb-12 leading-relaxed">
              Här är några av de större spanska bankerna som rutinmässigt arbetar med svenska och andra utländska köpare:
            </p>

            <div className="space-y-6">
              {spanishBanks.map((bank, idx) => (
                <div key={idx} className="bg-white rounded-sm border border-gray-200 p-6 hover:border-accent-500 transition">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary-900 mb-2">{bank.name}</h3>
                      <p className="text-gray-700 mb-4">{bank.strength}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Ränta</p>
                          <p className="font-bold text-accent-500">{bank.rate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Max LTV</p>
                          <p className="font-bold text-accent-500">{bank.ltv}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Webbplats</p>
                          <p className="font-bold text-sm text-blue-600">{bank.website}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-warm-50 border-l-4 border-accent-500 p-6 rounded-sm">
              <h3 className="font-bold text-primary-900 mb-3">Svenska Banks Möjligheter</h3>
              <p className="text-gray-700 mb-4">
                Större svenska banker som SBAB och Skandia erbjuder inte direkta hypoteker i Spanien, men de erbjuder "equityrelease" mot din svenska fastighet. Detta innebär att du kan låna pengar använd din svenska villa eller lägenhet som säkerhet.
              </p>
              <p className="text-sm text-gray-600">
                Fördel: Du behöver inte gå genom spansk bankprocess. Nackdel: Högre räntor och du måste ha tillräckligt equity i din svenska fastighet.
              </p>
            </div>
          </div>
        </section>

        {/* Habeno Section */}
        <section className="py-16 md:py-24 bg-gray-50 border-t border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Vår Partner: Habeno Hypotekspecialister</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Vi arbetar nära med Habeno, som är specialiserad på hypoteksfinansiering för svenska och andra nordiska köpare av fastigheter i Spanien. Habeno förenklar processen och kan ofta ordna bättre villkor än om du går direkt till banken.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏢</span>
                  Vad Habeno Gör
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Kontaktuppbyggnad med spanska banker</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Dokumentsamling och förberedelse</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Förhandlingar om bättre villkor</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Följande genom hela processen</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Juridisk och finansiell rådgivning</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📈</span>
                  Fördelar Med Habeno
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Säkerställer bättre räntor än genomsnitt</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Sparar tid genom effektiv process</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Reducerar risken för låneavslagande</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Svenskspråkig support</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Integrerad med vårt köpprocess</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-accent-50 border-l-4 border-accent-500 p-6 rounded-sm">
              <p className="text-gray-700 leading-relaxed">
                Vi rekommenderar starkt att du använder Habeno för din hypoteksfinansiering. De är expertis på att navigera genom det spanska banksystemet för svenska köpare, och de kan ofta få bättre villkor än om du försöker på egen hand.
              </p>
            </div>
          </div>
        </section>

        {/* Documents Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Dokument Du Behöver från Sverige</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              För att ansöka om bolån i Spanien behöver spanska banker flera dokument från Sverige för att verifiera din identitet och finansiella ställning:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-900 text-white">
                    <th className="px-6 py-4 text-left font-bold">Dokument</th>
                    <th className="px-6 py-4 text-left font-bold">Krävs</th>
                    <th className="px-6 py-4 text-left font-bold">Anmärkningar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requiredDocuments.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-semibold text-gray-700">{row.doc}</td>
                      <td className="px-6 py-4 text-gray-700">{row.swedish}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-warm-50 border-l-4 border-accent-500 p-6 rounded-sm">
              <h3 className="font-bold text-primary-900 mb-3">Tips för Dokumentsamling</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Få allt översatt till spanska av certifierad översättare</li>
                <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Börja samla in dokumenten tidigt, före du undertecknar köpekontrakt</li>
                <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Säkerställ att alla dokument är aktuella (normalt max 3-6 månader gamla)</li>
                <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Habeno kan guida dig genom hela dokumentationsprocessen</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 md:py-24 bg-gray-50 border-t border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Bolånekalkylator</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Använd denna kalkylator för att beräkna ungefärlig månadlig betalning baserat på lånebelopp, löptid och ränta:
            </p>

            <div className="bg-white rounded-sm p-8 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <label className="block text-sm font-bold text-primary-900 mb-3">Lånebelopp (EUR)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="50000"
                      max="500000"
                      step="10000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-accent-500"
                    />
                  </div>
                  <p className="text-2xl font-bold text-accent-500 mt-2">€{loanAmount.toLocaleString('sv-SE')}</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary-900 mb-3">Lånetid (År)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="10"
                      max="30"
                      step="1"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-accent-500"
                    />
                  </div>
                  <p className="text-2xl font-bold text-accent-500 mt-2">{loanTerm} år</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary-900 mb-3">Ränta (årlig %)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="2"
                      max="6"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-accent-500"
                    />
                  </div>
                  <p className="text-2xl font-bold text-accent-500 mt-2">{interestRate.toFixed(1)}%</p>
                </div>
              </div>

              <div className="border-t-2 border-accent-500 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-accent-50 rounded-sm p-6">
                    <p className="text-sm text-gray-600 mb-2">Månadlig Betalning</p>
                    <p className="text-3xl font-bold text-accent-500">€{monthlyPayment.toFixed(0)}</p>
                    <p className="text-xs text-gray-500 mt-2">SEK {(monthlyPayment * sekkurs).toFixed(0)}</p>
                  </div>
                  <div className="bg-accent-50 rounded-sm p-6">
                    <p className="text-sm text-gray-600 mb-2">Total Betalning</p>
                    <p className="text-3xl font-bold text-accent-500">€{totalPayment.toFixed(0)}</p>
                    <p className="text-xs text-gray-500 mt-2">SEK {(totalPayment * sekkurs).toFixed(0)}</p>
                  </div>
                  <div className="bg-accent-50 rounded-sm p-6">
                    <p className="text-sm text-gray-600 mb-2">Total Ränta</p>
                    <p className="text-3xl font-bold text-accent-500">€{totalInterest.toFixed(0)}</p>
                    <p className="text-xs text-gray-500 mt-2">SEK {(totalInterest * sekkurs).toFixed(0)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-warm-50 border-l-4 border-accent-500 p-6 rounded-sm">
              <p className="text-gray-700 text-sm">
                Denna kalkylator är endast för estimering. Faktisk månadlig betalning kan variera beroende på bankens exakta ränta, avgifter och andra faktorer. Kontakta Habeno för ett exakt offerering.
              </p>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Låneprocessen - Steg för Steg</h2>

            <div className="space-y-6">
              {[
                {
                  title: 'Vecka 1: Initialt Möte',
                  description: 'Du möter Habeno eller bankrepresentant. De diskuterar din budget, finansiella situation och type fastighet du är intresserad av.'
                },
                {
                  title: 'Vecka 2-3: Dokumentsamling',
                  description: 'Du samlar in alla nödvändiga dokument från Sverige. Habeno guidar dig genom vad som behövs och hjälper till med översättning.'
                },
                {
                  title: 'Vecka 4: Lånansökan',
                  description: 'Du submittar formell lånansökan till spansk bank tillsammans med alla dokument. Banken genomför initial granskning.'
                },
                {
                  title: 'Vecka 5-6: Värdering & Underwriting',
                  description: 'Banken ordnar fastighetsvärdering och genomför underwriting. De kan fråga om ytterligare dokumentation.'
                },
                {
                  title: 'Vecka 7-8: Villkorligt Godkännande',
                  description: 'Banken ger villkorligt godkännande. Detta godkännande är normalt baserat på att vissa villkor uppfylls (t.ex. försäkring, sluttokument).'
                },
                {
                  title: 'Vecka 9: Slutligt Godkännande',
                  description: 'Efter att alla villkor är uppfyllda ger banken slutligt godkännande. Du kan nu underteckna köpekontrakt.'
                },
                {
                  title: 'Vecka 10: Lånetildelning',
                  description: 'Vid notariemötet overfördes lånemedlen till säljaren och du blir ägare av fastigheten.'
                }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-sm bg-accent-500 text-white font-bold">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-bold text-primary-900">{step.title}</h3>
                    <p className="text-gray-700 mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Costs Section */}
        <section className="py-16 md:py-24 bg-gray-50 border-t border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Lånekostnader & Avgifter</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Förutom räntan finns flera andra kostnader förknippade med ett spanskt bolån:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Värderingsavgift',
                  cost: '€300-500',
                  description: 'Fastighetsvärdering krävs av banken'
                },
                {
                  title: 'Juridisk Granskning',
                  cost: '€400-700',
                  description: 'Bankens juridiska team granskar dokumentationen'
                },
                {
                  title: 'Försäkringsavgift',
                  cost: '1-3% av lån',
                  description: 'Hipoteksförsäkring för att skydda banken'
                },
                {
                  title: 'Uppläggningsavgift',
                  cost: '0-1% av lån',
                  description: 'Administrativ avgift för låneetablering'
                },
                {
                  title: 'Notariekostnader',
                  cost: '0.5-1%',
                  description: 'Notarius gebyr för att registrera hypoteken'
                },
                {
                  title: 'Registreringsavgift',
                  cost: '0.3-0.5%',
                  description: 'Registrering på landsregistret'
                }
              ].map((cost, idx) => (
                <div key={idx} className="bg-white rounded-sm p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-primary-900 mb-2">{cost.title}</h3>
                  <p className="text-accent-500 font-bold mb-2">{cost.cost}</p>
                  <p className="text-sm text-gray-700">{cost.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-warm-50 border-l-4 border-accent-500 p-6 rounded-sm">
              <p className="text-gray-700 leading-relaxed">
                Totala lånekostnader brukar uppgå till cirka 3-5% av lånebeloppet. För ett €150,000 lån skulle detta bli €4,500-€7,500 i extra kostnader.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Vanliga Frågor</h2>

            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <details key={idx} className="bg-gray-50 rounded-sm border border-gray-200 p-6 cursor-pointer hover:border-accent-500 transition group">
                  <summary className="flex items-start justify-between font-bold text-primary-900 text-lg cursor-pointer">
                    <span>{faq.q}</span>
                    <span className="text-accent-500 text-xl group-open:rotate-180 transition ml-4 flex-shrink-0">+</span>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary-900 to-primary-800 text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-4xl font-bold mb-6">Redo Att Börja Låneprocessen?</h2>
            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
              Kontakta Habeno eller oss för en kostnadsfri konsultation om dina lånemöjligheter. Vi guidar dig genom hela processen från start till slut.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/34XXXXXXXXX?text=Hej%2C%20jag%20är%20intresserad%20av%20ett%20bolån%20för%20fastighet%20i%20Spanien"
                className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-8 rounded-sm transition inline-block"
              >
                Kontakta Oss på WhatsApp
              </a>
              <a
                href="/sv/guides/kostnader-skatter"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-4 px-8 rounded-sm transition inline-block"
              >
                Läs Om Kostnader
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Hem',
              item: 'https://newbuild.es/sv/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Guider',
              item: 'https://newbuild.es/sv/guides/'
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Bolån i Spanien',
              item: 'https://newbuild.es/sv/guides/bolan-spanien'
            }
          ]
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a
            }
          }))
        })}
      </script>
    </>
  );
};

export default BolanSpanienPage;
