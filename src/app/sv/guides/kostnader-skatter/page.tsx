'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const KostnaderSkattersPage = () => {
  const [currency, setCurrency] = useState('EUR');

  const sekkurs = 11.5; // Approximate SEK/EUR rate

  const convertToSEK = (eur: number) => Math.round(eur * sekkurs);

  const purchaseCosts = [
    {
      item: 'IVA (Mervärdesskatt) - Nybygge',
      percentage: '10%',
      note: 'Endast för nybyggda bostäder från utvecklare',
      euroRange: '€250,000 × 10% = €25,000'
    },
    {
      item: 'Stämpelskatt (Impuesto sobre Transmisiones) - Begagnat',
      percentage: '6-10%',
      note: 'Varierar per region, normalt 6-8%',
      euroRange: '€250,000 × 7% = €17,500'
    },
    {
      item: 'Juridiska kostnader (Abogado)',
      percentage: '1-1.5%',
      note: 'För juridisk granskning och handlingar',
      euroRange: '€2,500-€3,750'
    },
    {
      item: 'Notariekostnader (Notaría)',
      percentage: '0.5-0.8%',
      note: 'För registrering av överlåtelse',
      euroRange: '€1,250-€2,000'
    },
    {
      item: 'Registreringsavgift (Folio Real)',
      percentage: '0.3-0.5%',
      note: 'För registrering på landsregistret',
      euroRange: '€750-€1,250'
    },
    {
      item: 'Fastighetsvärdering (Tasación)',
      percentage: '0.2-0.3%',
      note: 'Krävs för bolånefinansiering',
      euroRange: '€500-€750'
    }
  ];

  const detailedCalculation = [
    { description: 'Köpesumma', eur: 250000, percentage: '100%' },
    { description: 'IVA 10% (Nybygge)', eur: 25000, percentage: '10%' },
    { description: 'Juridiska kostnader 1%', eur: 2500, percentage: '1%' },
    { description: 'Notariekostnader 0.6%', eur: 1500, percentage: '0.6%' },
    { description: 'Registreringsavgift 0.4%', eur: 1000, percentage: '0.4%' },
    { description: 'Fastighetsvärdering 0.3%', eur: 750, percentage: '0.3%' },
    { description: 'Totala inköpskostnader', eur: 30750, percentage: '12.3%', isBold: true }
  ];

  const ongoingCosts = [
    {
      name: 'IBI - Fastighetsskatt',
      description: 'Årlig skatt som motsvarar svenska fastighetsskatten. Beräknas på fastighetens beskattningsvärde.',
      exampleEur: '€600-€1,200/år',
      exampleSek: 'SEK 6,900-13,800/år',
      factors: 'Fastighets storlek och läge'
    },
    {
      name: 'Samfällighetsavgift (Cuota de Comunidad)',
      description: 'Gemensam avgift för underhål av gemensamma ytor. Endast för lägenheter och vissa villor i samhällen.',
      exampleEur: '€100-€300/mån',
      exampleSek: 'SEK 1,150-3,450/mån',
      factors: 'Anläggningsstorlek och servicegrad'
    },
    {
      name: 'Sopavgift (Basura)',
      description: 'Avgift för skräpinsamling inkluderas ofta i kommunalskatten.',
      exampleEur: '€15-€30/mån',
      exampleSek: 'SEK 170-345/mån',
      factors: 'Kommunens prissättning'
    },
    {
      name: 'Vattenledning (Agua)',
      description: 'Vattenförbrukning debiteras baserat på mätning.',
      exampleEur: '€30-€60/mån',
      exampleSek: 'SEK 345-690/mån',
      factors: 'Användning och region'
    },
    {
      name: 'El - Elektricitet',
      description: 'Elförbrukning, varierar mycket beroende på användning och AC-användning.',
      exampleEur: '€60-€150/mån',
      exampleSek: 'SEK 690-1,725/mån',
      factors: 'Användning, säsong, AC'
    },
    {
      name: 'Gas (Om Applicable)',
      description: 'Gasförbrukning för värme och matlagning.',
      exampleEur: '€20-€50/mån',
      exampleSek: 'SEK 230-575/mån',
      factors: 'Användning och säsong'
    },
    {
      name: 'Hemförsäkring (Seguro del Hogar)',
      description: 'Skydd för fastigheten och möbler. Kan också täcka ansvarsskydd.',
      exampleEur: '€40-€100/mån',
      exampleSek: 'SEK 460-1,150/mån',
      factors: 'Försäkringsbelopp och värde'
    },
    {
      name: 'Underhål & Reparationer',
      description: 'Reserv för framtida reparationer och underhål.',
      exampleEur: '€100-€200/mån',
      exampleSek: 'SEK 1,150-2,300/mån',
      factors: 'Fastighetens ålder'
    }
  ];

  const faqs = [
    {
      q: 'Vad är IVA och stämpelskatt?',
      a: 'IVA (Impuesto sobre el Valor Añadido) är 10% för nybyggda fastigheter direkt från utvecklare. Stämpelskatt (Impuesto sobre Transmisiones Patrimoniales) är 6-10% för begagnade fastigheter och betalas vid köp från privatperson. Du kan inte betala båda - det beror på om fastigheten är ny eller begagnad.'
    },
    {
      q: 'Kan jag få tillbaka IVA eller stämpelskatt?',
      a: 'Nej, för personligt bruk kan du normalt inte få tillbaka dessa skatter. Om du köper för att hyra ut kommersiellt kan det finnas vissa möjligheter, men det kräver särskild planering och registrering.'
    },
    {
      q: 'Vad är de totala inköpskostnaderna?',
      a: 'För en €250,000 nybygge: cirka €30,750 i inköpskostnader (12,3% av köpesumman). För en €250,000 begagnad fastighet: cirka €25,000-€27,500 (10-11%). Dessa kostnader läggs till köpesumman.'
    },
    {
      q: 'Vilka skatter måste jag betala till Skatteverket i Sverige?',
      a: 'Du måste deklarera din spanska fastighet på ISK eller deklarera den som kapitalinvestering. Vid försäljning måste du deklarera kapitalvinsten. Om du hyr ut måste du deklarera hyresintäkter. Konsultera en svensk skatteexpert för optimal planering.'
    },
    {
      q: 'Vad är dubbelbeskattningsavtalet mellan Sverige och Spanien?',
      a: 'Avtalet säkerställer att du inte betalar skatt två gånger på samma inkomst. Spansk fastighetsskatt och inkomstskatt kan deduceras från din svenska skatt. Detta kräver att du granskar båda länders deklarationskrav noga.'
    },
    {
      q: 'Finns det förmögenhetsskatt i Spanien?',
      a: 'Det finns ingen nationell förmögenhetsskatt i Spanien längre (avskaffad 2008). Men vissa autonoma regioner såsom Andalusien kan ha egna skatter på fastigheter. Vi rekommenderar att konsultera en skatteexpert för din specifika region.'
    }
  ];

  return (
    <>
      <Head>
        <title>Kostnader & Skatter - Vad Kostar Det Att Köpa i Spanien? | Newbuild Spain</title>
        <meta name="description" content="Detaljerad guide över alla kostnader för att köpa fastighet i Spanien. IVA, stämpelskatt, juridiska kostnader och löpande avgifter för svenska köpare." />
        <link rel="canonical" href="https://newbuildhomescostablanca.com/sv/guides/kostnader-skatter" />
        <link rel="alternate" hrefLang="sv" href="https://newbuildhomescostablanca.com/sv/guides/kostnader-skatter" />
        <link rel="alternate" hrefLang="en" href="https://newbuildhomescostablanca.com/guides/costs-taxes" />
        <link rel="alternate" hrefLang="nl" href="https://newbuildhomescostablanca.com/nl/guides/kosten-belastingen" />
        <link rel="alternate" hrefLang="nl-BE" href="https://newbuildhomescostablanca.com/nl-BE/guides/kosten-belastingen" />
        <link rel="alternate" hrefLang="fr" href="https://newbuildhomescostablanca.com/fr/guides/couts-taxes" />
        <link rel="alternate" hrefLang="no" href="https://newbuildhomescostablanca.com/no/guides/kostnader-skatter" />
        <link rel="alternate" hrefLang="x-default" href="https://newbuildhomescostablanca.com/guides/costs-taxes" />
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
              <span>Kostnader & Skatter</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Kostnader & Skatter — Vad Kostar Det Att Köpa i Spanien?
            </h1>
            <p className="text-lg text-primary-100 max-w-3xl leading-relaxed">
              En komplett guide till alla kostnader för att köpa fastighet i Spanien, från inköpskostnader till löpande utgifter och skatteplikt för svenska köpare.
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-8 text-primary-900">Inköpskostnader Vid Köp</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              När du köper en fastighet i Spanien tillkommer flera obligatoriska kostnader utöver själva köpesumman. Dessa kostnader kan variera mellan 10-15% av köpesumman beroende på fastighetens typ och region.
            </p>

            <div className="grid grid-cols-1 gap-4 mb-8">
              {purchaseCosts.map((cost, idx) => (
                <div key={idx} className="bg-white rounded-sm p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-primary-900 text-lg">{cost.item}</h3>
                    <span className="bg-accent-500 text-white px-3 py-1 rounded-sm font-bold text-sm">{cost.percentage}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{cost.note}</p>
                  <p className="text-sm font-semibold text-gray-700">{cost.euroRange}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Calculation */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Exempel: Köpa för €250,000 (Nybygge)</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Här är en detaljerad uppdelning av alla kostnader när du köper en nybyggd fastighet för €250,000:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-900 text-white">
                    <th className="px-6 py-4 text-left font-bold">Kostnadspost</th>
                    <th className="px-6 py-4 text-right font-bold">EUR</th>
                    <th className="px-6 py-4 text-right font-bold">SEK</th>
                    <th className="px-6 py-4 text-right font-bold">% av Köp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {detailedCalculation.map((row, idx) => (
                    <tr key={idx} className={row.isBold ? 'bg-accent-50 border-t-2 border-accent-500' : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className={`px-6 py-4 ${row.isBold ? 'font-bold text-primary-900' : 'text-gray-700'}`}>{row.description}</td>
                      <td className={`px-6 py-4 text-right ${row.isBold ? 'font-bold text-primary-900' : 'text-gray-700'}`}>€{row.eur.toLocaleString('sv-SE')}</td>
                      <td className={`px-6 py-4 text-right ${row.isBold ? 'font-bold text-primary-900' : 'text-gray-700'}`}>SEK {convertToSEK(row.eur).toLocaleString('sv-SE')}</td>
                      <td className={`px-6 py-4 text-right ${row.isBold ? 'font-bold text-primary-900' : 'text-gray-700'}`}>{row.percentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-warm-50 border-l-4 border-accent-500 p-6 rounded-sm">
              <h3 className="font-bold text-primary-900 mb-3">Sammanfattning</h3>
              <p className="text-gray-700 mb-3">
                För en €250,000 nybyggd fastighet totalt: €280,750 (EUR) eller SEK 3,228,625
              </p>
              <p className="text-sm text-gray-600">
                Notering: För en begagnad fastighet skulle IVA ersättas med stämpelskatt (6-8%), vilket skulle resultera i något lägre totalkostnad.
              </p>
            </div>
          </div>
        </section>

        {/* Ongoing Costs */}
        <section className="py-16 md:py-24 bg-gray-50 border-t border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Löpande Kostnader & Månadsutgifter</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Efter köp måste du räkna med flera återkommande årliga och månatliga utgifter:
            </p>

            <div className="space-y-6">
              {ongoingCosts.map((cost, idx) => (
                <div key={idx} className="bg-white rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition">
                  <h3 className="text-xl font-bold text-primary-900 mb-2">{cost.name}</h3>
                  <p className="text-gray-700 mb-4">{cost.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-warm-50 p-4 rounded-sm">
                      <p className="text-sm text-gray-600 mb-1">EUR/årligen</p>
                      <p className="font-bold text-primary-900">{cost.exampleEur}</p>
                    </div>
                    <div className="bg-warm-50 p-4 rounded-sm">
                      <p className="text-sm text-gray-600 mb-1">SEK/årligen</p>
                      <p className="font-bold text-primary-900">{cost.exampleSek}</p>
                    </div>
                    <div className="bg-warm-50 p-4 rounded-sm">
                      <p className="text-sm text-gray-600 mb-1">Påverkasfaktorer</p>
                      <p className="font-bold text-primary-900 text-sm">{cost.factors}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-accent-50 border-l-4 border-accent-500 p-6 rounded-sm">
              <h3 className="font-bold text-primary-900 mb-3">Årlig Utgiftsprognos</h3>
              <p className="text-gray-700 mb-4">
                Total månatlig utgift: €500-€1,200/mån (SEK 5,750-13,800/mån) beroende på fastighets typ och storlek.
              </p>
              <p className="text-gray-700">
                En villa på 200 m² med egen trädgård kostar mer än en lägenhet på 120 m² på grund av högre el-, vatten- och underhållskostnader.
              </p>
            </div>
          </div>
        </section>

        {/* Swedish Tax Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Svenska Skatteplikt för Spansk Fastighet</h2>

            <div className="space-y-6">
              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏠</span>
                  Deklaration till Skatteverket
                </h3>
                <p className="text-gray-700 mb-4">
                  Du är skyldig att deklarera din spanska fastighet till Skatteverket. Din fastighetsposs kan deklareras på två sätt:
                </p>
                <div className="space-y-4">
                  <div className="bg-warm-50 p-4 rounded-sm border-l-4 border-accent-500">
                    <h4 className="font-bold text-primary-900 mb-2">ISK - Investeringssparkonto</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Om du är bosatt i Sverige kan du registrera din fastighet på ett ISK. Detta är ofta det mest fördelaktiga alternativet för svenska investerare.
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Du betalar schablonskatten ca 2% av värdet årligen</li>
                      <li>- Du behöver inte rapportera faktiska transaktioner</li>
                      <li>- Enklare redovisning än vanlig deklaration</li>
                    </ul>
                  </div>
                  <div className="bg-warm-50 p-4 rounded-sm border-l-4 border-accent-500">
                    <h4 className="font-bold text-primary-900 mb-2">Vanlig Deklaration</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Alternativt kan du deklarera fastigheten som en vanlig vermögenhetspost.
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Du måste rapportera värdet av fastigheten</li>
                      <li>- Du måste rapportera faktiska inkomster och utgifter</li>
                      <li>- Vid försäljning deklarera kapitalvinstskatt</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📈</span>
                  Kapitalvinstskatt vid Försäljning
                </h3>
                <p className="text-gray-700 mb-4">
                  Om du säljer din spanska fastighet efter flera år måste du deklarera kapitalvinstskatt till Skatteverket.
                </p>
                <div className="bg-warm-50 p-4 rounded-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Försäljningspris</span>
                    <span className="font-bold">€500,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Minus: Köpesumma + kostnader</span>
                    <span className="font-bold">-€280,000</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                    <span className="text-gray-700 font-bold">Kapitalvinst</span>
                    <span className="font-bold">€220,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Svenska kapitalvinstskatt 20%</span>
                    <span className="font-bold text-accent-500">€44,000 (SEK 506,000)</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Du kan dra av alla dokumenterade kostnader för köp, försäljning och förbättringar från kapitalvinsten.
                </p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">💶</span>
                  Hyresintäkter från Uthyrning
                </h3>
                <p className="text-gray-700 mb-4">
                  Om du hyr ut din fastighet måste du deklarera hyresintäkter till både spanska och svenska myndigheter:
                </p>
                <div className="space-y-3 text-gray-700">
                  <p className="font-semibold">Till Sverige (Skatteverket):</p>
                  <ul className="text-sm space-y-1 mb-4">
                    <li>- Hyresintäkter är skattepliktig inkomst</li>
                    <li>- Du kan dra av avdragsgilla kostnader (underhål, administration, försäkringar)</li>
                    <li>- Möbler och inventarier kan skrivas av</li>
                  </ul>

                  <p className="font-semibold">Till Spanien (Agencia Tributaria):</p>
                  <ul className="text-sm space-y-1">
                    <li>- Hyresintäkter är skattepliktig inkomst enligt spansk lag</li>
                    <li>- Normalt skattesats: 19-45% beroende på totala inkomster</li>
                    <li>- Du kan dra av spanska kostnader</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🧮</span>
                  Dubbelbeskattningsavtal Sverige-Spanien
                </h3>
                <p className="text-gray-700 mb-4">
                  Sverige och Spanien har ett dubbelbeskattningsavtal som säkerställer att du inte betalar skatt två gånger på samma inkomst:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-warm-50 p-4 rounded-sm">
                    <h4 className="font-bold text-primary-900 mb-2">Fastighetsskatt (IBI)</h4>
                    <p className="text-sm text-gray-700">
                      Spansk IBI (fastighetsskatt) kan normalt deduceras från din svenska skatt eller reducera beskattningsunderlaget.
                    </p>
                  </div>
                  <div className="bg-warm-50 p-4 rounded-sm">
                    <h4 className="font-bold text-primary-900 mb-2">Inkomstskatt på Hyror</h4>
                    <p className="text-sm text-gray-700">
                      Spansk inkomstskatt på hyresintäkter kan krediteras eller deduceras från svenska skatter.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent-50 border-l-4 border-accent-500 p-6 rounded-sm">
                <h3 className="font-bold text-primary-900 mb-3">Viktigt: Konsultera en Skatteexpert</h3>
                <p className="text-gray-700">
                  Skatterna kan vara komplicerade, speciellt när det gäller dubbelbeskattningsavtalet. Vi rekommenderar att du konsulterar en svensk skatteexpert eller revisor innan du köper för att optimera din skattesituation och undvika onödiga kostnader.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 md:py-24 bg-gray-50 border-t border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Jämförelse: Villa i Spanien vs Sverige</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Här är en jämförelse av årliga kostnader för en likvärdig villa i Spanien vs Sverige:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-900 text-white">
                    <th className="px-6 py-4 text-left font-bold">Kostnadspost</th>
                    <th className="px-6 py-4 text-center font-bold">Spanien (Villa)</th>
                    <th className="px-6 py-4 text-center font-bold">Sverige (Villa)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-6 py-4 font-semibold text-gray-700">Fastighetsskatt (Årlig)</td>
                    <td className="px-6 py-4 text-center text-gray-700">€800-1,500</td>
                    <td className="px-6 py-4 text-center text-gray-700">0 (avskaffad)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-700">Hemförsäkring (Årlig)</td>
                    <td className="px-6 py-4 text-center text-gray-700">€500-800</td>
                    <td className="px-6 py-4 text-center text-gray-700">SEK 3,000-5,000</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4 font-semibold text-gray-700">El (Årlig)</td>
                    <td className="px-6 py-4 text-center text-gray-700">€800-1,800</td>
                    <td className="px-6 py-4 text-center text-gray-700">SEK 12,000-18,000</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-700">Uppvärmning (Årlig)</td>
                    <td className="px-6 py-4 text-center text-gray-700">€400-800</td>
                    <td className="px-6 py-4 text-center text-gray-700">SEK 8,000-15,000</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4 font-semibold text-gray-700">Vatten & Avlopp (Årlig)</td>
                    <td className="px-6 py-4 text-center text-gray-700">€400-600</td>
                    <td className="px-6 py-4 text-center text-gray-700">SEK 3,500-5,000</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-700">Underhål & Reparationer</td>
                    <td className="px-6 py-4 text-center text-gray-700">€1,500-2,500</td>
                    <td className="px-6 py-4 text-center text-gray-700">SEK 15,000-25,000</td>
                  </tr>
                  <tr className="bg-white border-t-2 border-accent-500">
                    <td className="px-6 py-4 font-bold text-primary-900">TOTALT ÅRLIGT</td>
                    <td className="px-6 py-4 text-center font-bold text-accent-500">€4,500-7,500</td>
                    <td className="px-6 py-4 text-center font-bold text-accent-500">SEK 41,500-68,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-warm-50 border-l-4 border-accent-500 p-6 rounded-sm">
              <p className="text-gray-700 leading-relaxed">
                Spanska villar är generellt billigare i drift än svenska villar tack vare behaget varmare klimat (mindre uppvärmningskostnader) och lägre fastighetsskatter. Däremot kan AC-kostnader bli högre under sommaren och samfällighetssamfundsavgifter kan vara signifikanta.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-gray-50 border-t border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Vanliga Frågor</h2>

            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <details key={idx} className="bg-white rounded-sm border border-gray-200 p-6 cursor-pointer hover:border-accent-500 transition group">
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
            <h2 className="text-4xl font-bold mb-6">Behöver Du Hjälp Med Finansiering?</h2>
            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
              Vi hjälper dig att navigera genom kostnader, skatter och finansieringsmöjligheter. Kontakta oss för en kostnadsfri konsultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/34634044970?text=Hej%2C%20jag%20vill%20veta%20mer%20om%20kostnader%20och%20finansiering"
                className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-8 rounded-sm transition inline-block"
              >
                Kontakta Oss på WhatsApp
              </a>
              <a
                href="/sv/guides/bolan-spanien"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-4 px-8 rounded-sm transition inline-block"
              >
                Läs Om Bolån
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
              name: 'Kostnader & Skatter',
              item: 'https://newbuild.es/sv/guides/kostnader-skatter'
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

export default KostnaderSkattersPage;
