'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const NieNummerPage = () => {
  const [activeTab, setActiveTab] = useState('stockholm');

  const faqs = [
    {
      q: 'Vad är NIE-nummer?',
      a: 'NIE (Número de Identidad de Extranjero) är ett spanskt identifikationsnummer för utlänningar. Det motsvarar ditt svenska personnummer och är obligatoriskt för alla utlänningar som bor eller arbetar i Spanien, eller som gör större affärstransaktioner som att köpa fastighet.'
    },
    {
      q: 'Hur lång är giltigheten på NIE-numret?',
      a: 'NIE-numret är permanent och giltigt på livstid. Du behöver inte förnya det. Men NIE-kortet (físico) kan förnya efter ett antal år.'
    },
    {
      q: 'Kan jag få NIE-numret utan att besöka Spanien?',
      a: 'Ja, du kan ansöka på spanska konsulatet i Sverige (Stockholm eller Göteborg) utan att behöva besöka Spanien. Om du redan är i Spanien kan du ansöka på Policia Nacional eller en utländsk tjänst (oficina de extranjería).'
    },
    {
      q: 'Vad är skillnaden mellan NIE, TIE och Residencia?',
      a: 'NIE (Número de Identidad de Extranjero) - ID-nummer för alla utlänningar. TIE (Tarjeta de Identidad de Extranjero) - Fysiska ID-kortet. Residencia - Uppehålls tillåtelse (inte samma som NIE). För fastighetköp behöver du NIE, inte nödvändigtvis Residencia.'
    },
    {
      q: 'Kan vi skaffar NIE-numret åt dig?',
      a: 'Ja, vi kan hjälpa och guidera dig genom hela processen. I vissa fall kan vi även hantera ansökan åt dig via en representant. Vi hjälper till med formulärfyllning, dokumentsamling och följer upp processen tills du får ditt NIE-nummer.'
    }
  ];

  const stockholmProcess = [
    {
      step: 1,
      title: 'Boka Tid',
      details: [
        'Besök: www.exteriores.gob.es',
        'Gå till "Citas Previas" (tidsbokning)',
        'Välj: Stockholm / Göta Konsulat',
        'Välja tjänst: "Número de Identidad de Extranjero"',
        'Boka tid (normalt 2-6 veckor fram)'
      ]
    },
    {
      step: 2,
      title: 'Samla Dokument',
      details: [
        'Originalpass (giltigt)',
        'EX-15 formulär (fyllt och signerat)',
        'Fyra passphotografier (4x4 cm)',
        'Betalningsöversikt för EX-15 (€12)',
        'Kopia av försäljnings-/köpekontrakt (om applicable)',
        'Adressbevis från Spanien (eller erklaring)'
      ]
    },
    {
      step: 3,
      title: 'Konsulat Möte',
      details: [
        'Möt konsulatet på utsatt tid',
        'Presentera alla dokument',
        'Konsulaten tar fingeravtryck',
        'Du mottager ett kvitto'
      ]
    },
    {
      step: 4,
      title: 'Vänta på NIE',
      details: [
        'Processering: 2-4 veckor',
        'Du mottager NIE-numret per post',
        'Det kommer ett brev med ditt NIE-nummer',
        'Du kan fråga konsulatet om status'
      ]
    }
  ];

  const spainProcess = [
    {
      step: 1,
      title: 'Hitta Officiell Tjänst',
      details: [
        'Policia Nacional (främre stationen)',
        'Eller: Delegación de Gobierno',
        'Eller: Oficina de Extranjería (utländsk tjänst)',
        'Fråga hotellet eller advokaten om närmaste kontor'
      ]
    },
    {
      step: 2,
      title: 'Samla Dokument',
      details: [
        'Originalpass',
        'Fyllt EX-15 formulär',
        'Fyra passphotografier (4x4 cm)',
        'Betalningsöversikt för €12',
        'Adressbevis från din spanska adress',
        'Bank-/anställningshandlingar (om begärt)'
      ]
    },
    {
      step: 3,
      title: 'Presentera på Tjänst',
      details: [
        'Gå till närmaste Policia Nacional',
        'Presentera alla dokument',
        'De tar fingeravtryck och foto',
        'Du mottager ett kvitto'
      ]
    },
    {
      step: 4,
      title: 'Hämta NIE',
      details: [
        'Samma dag eller 1-3 dagar senare',
        'Du får ett handskrivit NIE-nummer',
        'Det räcker för att öppna bankkonto och köpa fastighet',
        'Du kan senare få NIE-kortet'
      ]
    }
  ];

  const whyNeed = [
    {
      title: 'Fastighetsköp',
      description: 'Obligatoriskt för alla fastighetstransaktioner. Du kan inte äga fastighet i Spanien utan NIE.'
    },
    {
      title: 'Bankkonto',
      description: 'Krävs för att öppna spanskt bankkonto. Många banker accepterar inte öppning utan NIE.'
    },
    {
      title: 'Kontrakt & Avtal',
      description: 'Behövs för alla juridiska kontrakt, hyreavtal, arbetskontrakt, etc.'
    },
    {
      title: 'Fastighetsregistrering',
      description: 'Registrering på landsregistret (Registro de la Propiedad) kräver NIE.'
    },
    {
      title: 'Skattedeklaration',
      description: 'Behövs för att deklarera skatter, hyresintäkter, och fastighetsägande.'
    },
    {
      title: 'Skattekonto',
      description: 'Behövs för att öppna skattekonto hos Agencia Tributaria (spanska skattemyndigheten).'
    }
  ];

  const commonMistakes = [
    {
      title: 'Skaffa NIE Nummer Först',
      description: 'Många svenska köpare väntar för länge innan de skaffar NIE. Du bör skaffa det tidigt i processen, helst innan du undertecknar reservationsavtal.'
    },
    {
      title: 'Glömma Dokumentation',
      description: 'Se till att ha originalpass och alla nödvändiga dokument när du ansöker. Kopior räcker normalt inte för konsulatet.'
    },
    {
      title: 'Felaktig EX-15 Form',
      description: 'Fyll i EX-15 formuläret korrekt. En felaktig form kan förlånga processen. Vi kan hjälpa till med fyllningen.'
    },
    {
      title: 'Vänta För Länge',
      description: 'Börja ansökan om NIE så snart du har bestämt dig för att köpa fastighet. Processen kan ta upp till 6 veckor från Sverige.'
    },
    {
      title: 'Inte Spara Bevis',
      description: 'Spara alla dokument och kvitton från NIE-processen. Du behöver dem senare för bankkonto, fastighetsregistrering, etc.'
    },
    {
      title: 'Gå Inte Genom Rätt Kanal',
      description: 'Ansök endast genom officiella kanaler (konsulatet eller Policia Nacional), inte genom privata tjänster eller mellanhänder.'
    }
  ];

  return (
    <>
      <Head>
        <title>NIE-nummer - Hur Skaffar Jag NIE i Spanien? | Newbuild Spain</title>
        <meta name="description" content="Guide till att skaffa NIE-nummer för svenska köpare av fastighet i Spanien. Process i Sverige och Spanien, dokument och tips." />
        <link rel="canonical" href="https://newbuildhomescostablanca.com/sv/guides/nie-nummer" />
        <link rel="alternate" hrefLang="sv" href="https://newbuildhomescostablanca.com/sv/guides/nie-nummer" />
        <link rel="alternate" hrefLang="en" href="https://newbuildhomescostablanca.com/guides/nie-number" />
        <link rel="alternate" hrefLang="nl" href="https://newbuildhomescostablanca.com/nl/guides/nie-nummer" />
        <link rel="alternate" hrefLang="nl-BE" href="https://newbuildhomescostablanca.com/nl-BE/guides/nie-nummer" />
        <link rel="alternate" hrefLang="fr" href="https://newbuildhomescostablanca.com/fr/guides/numero-nie" />
        <link rel="alternate" hrefLang="no" href="https://newbuildhomescostablanca.com/no/guides/nie-nummer" />
        <link rel="alternate" hrefLang="x-default" href="https://newbuildhomescostablanca.com/guides/nie-number" />
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
              <span>NIE-nummer</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              NIE-nummer — Hur Skaffar Jag NIE i Spanien?
            </h1>
            <p className="text-lg text-primary-100 max-w-3xl leading-relaxed">
              En praktisk guide till att skaffa ditt NIE-nummer (Número de Identidad de Extranjero) för fastighetköp i Spanien. Vi förklarar processen både från Sverige och från Spanien.
            </p>
          </div>
        </section>

        {/* What is NIE Section */}
        <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-8 text-primary-900">Vad Är NIE?</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              NIE står för "Número de Identidad de Extranjero" och är ett spanskt identifikationsnummer för utlänningar. Det motsvarar ditt svenska personnummer och är obligatoriskt för alla fastighetstransaktioner i Spanien.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-primary-900 mb-4">NIE-numret</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Format: En bokstav + 7 siffror (t.ex. X1234567)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Permanent - giltigt på livstid</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Gratis att skaffa</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Du får det skriftligt, kan senare få fysiskt kort</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-primary-900 mb-4">TIE Kortet</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>TIE = Tarjeta de Identidad de Extranjero (fysiskt kort)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Samma nummer som NIE, bara fysisk form</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Kan erhållas senare om behövs</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Ungdomligt för köp av fastighet</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-accent-50 border-l-4 border-accent-500 p-6 rounded-sm">
              <p className="text-gray-700 leading-relaxed">
                För att köpa fastighet i Spanien behöver du bara NIE-numret (får du som handskriven eller digital förlust). Du behöver inte ha det fysiska TIE-kortet för fastighetköp, men det kan vara praktiskt att ha för framtida transaktioner.
              </p>
            </div>
          </div>
        </section>

        {/* Why You Need NIE */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Varför Behöver Du NIE-nummer?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whyNeed.map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition">
                  <h3 className="text-lg font-bold text-primary-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-warm-50 border-l-4 border-accent-500 p-6 rounded-sm">
              <p className="text-gray-700 leading-relaxed">
                Sammanfattning: NIE-numret är absolut obligatoriskt för att köpa fastighet i Spanien. Du kan inte registrera fastigheten på ditt namn utan det. Det är en av de första sakerna du bör ordna innan du påbörjar köpprocessen.
              </p>
            </div>
          </div>
        </section>

        {/* Two Routes Section */}
        <section className="py-16 md:py-24 bg-gray-50 border-t border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Två Vägar att Skaffa NIE-nummer</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Du kan skaffa NIE-nummer på två sätt: genom spanska konsulatet i Sverige, eller genom att ansöka direkt i Spanien. Båda vägar är giltiga. Vi rekommenderar att ansöka i Sverige om möjligt för att spara tid.
            </p>

            {/* Tab Navigation */}
            <div className="flex gap-4 mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('stockholm')}
                className={`px-6 py-3 font-bold transition ${
                  activeTab === 'stockholm'
                    ? 'border-b-2 border-accent-500 text-accent-500'
                    : 'text-gray-700 hover:text-primary-900'
                }`}
              >
                <span className="inline mr-2">📍</span>
                Från Sverige
              </button>
              <button
                onClick={() => setActiveTab('spain')}
                className={`px-6 py-3 font-bold transition ${
                  activeTab === 'spain'
                    ? 'border-b-2 border-accent-500 text-accent-500'
                    : 'text-gray-700 hover:text-primary-900'
                }`}
              >
                <span className="inline mr-2">📍</span>
                I Spanien
              </button>
            </div>

            {/* Stockholm Content */}
            {activeTab === 'stockholm' && (
              <div className="space-y-8">
                <div className="bg-accent-50 border-l-4 border-accent-500 p-6 rounded-sm mb-8">
                  <h3 className="font-bold text-primary-900 mb-2">Spanska Konsulatet i Sverige</h3>
                  <p className="text-gray-700 mb-3">Stockholm och Göteborg har spanska konsulat där du kan ansöka om NIE-nummer.</p>
                  <p className="text-sm text-gray-600">
                    Konsulatet i Stockholm täcker största delen av Sverige. Stockholm: Strandvägen 31<br/>
                    Göteborg: Vasaplatsen 4
                  </p>
                </div>

                {stockholmProcess.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-sm p-6 border border-gray-200">
                    <div className="flex gap-4 mb-4">
                      <div className="bg-accent-500 text-white rounded-sm w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-bold text-primary-900 pt-2">{item.title}</h3>
                    </div>
                    <ul className="space-y-2 ml-16">
                      {item.details.map((detail, i) => (
                        <li key={i} className="text-gray-700 flex gap-2">
                          <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="bg-warm-50 border-l-4 border-accent-500 p-6 rounded-sm">
                  <h4 className="font-bold text-primary-900 mb-3">Tid från Sverige</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>- Tidsbokning: 2-6 veckor fram</p>
                    <p>- Konsulat möte: 1 dag</p>
                    <p>- Processering: 2-4 veckor</p>
                    <p className="font-bold text-accent-500 mt-3">Total tid: 4-10 veckor</p>
                  </div>
                </div>
              </div>
            )}

            {/* Spain Content */}
            {activeTab === 'spain' && (
              <div className="space-y-8">
                <div className="bg-accent-50 border-l-4 border-accent-500 p-6 rounded-sm mb-8">
                  <h3 className="font-bold text-primary-900 mb-2">Policia Nacional i Spanien</h3>
                  <p className="text-gray-700 mb-3">Om du redan är i Spanien kan du ansöka direkt på närmaste Policia Nacional eller utländsk tjänst.</p>
                  <p className="text-sm text-gray-600">
                    Många städer har samma-dag service där du kan få ditt NIE-nummer samma dag!
                  </p>
                </div>

                {spainProcess.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-sm p-6 border border-gray-200">
                    <div className="flex gap-4 mb-4">
                      <div className="bg-accent-500 text-white rounded-sm w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-bold text-primary-900 pt-2">{item.title}</h3>
                    </div>
                    <ul className="space-y-2 ml-16">
                      {item.details.map((detail, i) => (
                        <li key={i} className="text-gray-700 flex gap-2">
                          <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="bg-warm-50 border-l-4 border-accent-500 p-6 rounded-sm">
                  <h4 className="font-bold text-primary-900 mb-3">Tid i Spanien</h4>
                  <div className="space-y-2 text-gray-700">
                    <p>- Ingen tidsbokning behövs normalt</p>
                    <p>- Policia Nacional möte: 30 min - 2 timmar</p>
                    <p>- Du får NIE samma dag eller 1-3 dagar senare</p>
                    <p className="font-bold text-accent-500 mt-3">Total tid: 1-3 dagar</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Documents Checklist */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Dokumentkontrollista</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Du behöver denna dokumentation för att ansöka om NIE-nummer, oavsett om du ansöker från Sverige eller Spanien:
            </p>

            <div className="bg-white rounded-sm border border-gray-200 p-8">
              <div className="space-y-4">
                {[
                  { doc: 'Originalpass', status: 'Obligatorisk', note: 'Måste gälla under hela processen' },
                  { doc: 'Fyllt EX-15 formulär', status: 'Obligatorisk', note: 'Kan laddas ner från spanska konsulatet' },
                  { doc: 'Fyra passphotografier (4x4 cm)', status: 'Obligatorisk', note: 'Vita eller ljusa bakgrund' },
                  { doc: 'Betalningsöversikt', status: 'Obligatorisk', note: 'Bevis på att du betalat €12 för ansökan' },
                  { doc: 'Adressbevis', status: 'Ofta', note: 'Från Spanien eller hyreskontrakt' },
                  { doc: 'Köpe-/försäljningskontrakt', status: 'Ibland', note: 'Om du köper fastighet' },
                  { doc: 'Bankkontoutdrag', status: 'Ibland', note: 'För att visa finansiell stabilitet' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-sm bg-accent-100 text-accent-500 text-lg font-bold">
                        ✓
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-primary-900">{item.doc}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.note}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-sm text-sm font-bold ${
                        item.status === 'Obligatorisk' ? 'bg-accent-100 text-accent-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-warm-50 border-l-4 border-accent-500 p-6 rounded-sm">
              <h3 className="font-bold text-primary-900 mb-3">EX-15 Formuläret</h3>
              <p className="text-gray-700 mb-3">
                EX-15 är det officiella ansökningsformuläret för NIE. Du kan ladda ner det från spanska konsulatet website eller från ministeriet (www.inclusion.gob.es).
              </p>
              <p className="text-sm text-gray-600">
                Formuläret är på spanska men ganska enkelt att fylla i. Det innehåller bara grundläggande personuppgifter. Vi kan hjälpa till med fyllningen om du behöver!
              </p>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-16 md:py-24 bg-gray-50 border-t border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Vanliga Misstag Svenska Köpare Gör</h2>

            <div className="space-y-6">
              {commonMistakes.map((mistake, idx) => (
                <div key={idx} className="bg-white rounded-sm p-6 border border-gray-200 border-l-4 border-l-accent-500">
                  <h3 className="text-lg font-bold text-primary-900 mb-2">{mistake.title}</h3>
                  <p className="text-gray-700">{mistake.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-accent-50 border-l-4 border-accent-500 p-6 rounded-sm">
              <h3 className="font-bold text-primary-900 mb-3">Vi Kan Hjälpa!</h3>
              <p className="text-gray-700 leading-relaxed">
                Vi kan guidera dig genom hela NIE-processen och hjälpa till med dokumentsamling, formulärfyllning och följande upp statusen. Kontakta oss för att komma igång redan idag!
              </p>
            </div>
          </div>
        </section>

        {/* NIE vs TIE vs Residencia */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">NIE vs TIE vs Residencia — Vad Är Skillnaden?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-primary-900 mb-4 pb-3 border-b-2 border-accent-500">NIE</h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span className="font-semibold">ID-nummer för utlänningar</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Format: X1234567</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Permanent och gratis</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Obligatorisk för fastighetköp</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Du får det skriftligt</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-primary-900 mb-4 pb-3 border-b-2 border-accent-500">TIE</h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span className="font-semibold">Fysiskt ID-kort</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Samma nummer som NIE</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Valfritt för fastighetköp</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Kan erhållas senare</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Praktisk för framtida transaktioner</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-primary-900 mb-4 pb-3 border-b-2 border-accent-500">Residencia</h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span className="font-semibold">Uppehålls tillåtelse</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Dokumenterar laglig vistelse</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>INTE nödvändig för fastighetköp</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Behövs om du ska bo i Spanien</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent-500 font-bold flex-shrink-0">•</span>
                    <span>Separat från NIE</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-warm-50 border-l-4 border-accent-500 p-6 rounded-sm">
              <p className="text-gray-700 font-semibold mb-2">För Fastighetköp i Spanien Behöver Du:</p>
              <p className="text-gray-700">
                NIE-numret är allt du behöver för att köpa fastighet. Du behöver INTE Residencia eller TIE-kortet för att genomföra köpet. Många svenska köpare tror att de behöver alla tre, men du kan köpa fastighet med bara NIE-numret.
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

        {/* Our Help Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-8 text-primary-900">Vi Kan Ordna Ditt NIE-nummer</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Du behöver inte kämpa med NIE-processen själv. Vi kan hjälpa till med varje steg av vägen:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                <h3 className="text-lg font-bold text-primary-900 mb-4">Vi Hjälper Till Med:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Dokumentsamling och kontroll</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> EX-15 formulärfyllning</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Tidsbokning på konsulatet</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Stöd under hela processen</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> NIE-nummer på plats i Spanien</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Följande upp status</li>
                </ul>
              </div>

              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-primary-900 mb-4">Nästa Steg:</h3>
                <p className="text-gray-700 mb-4">
                  Kontakta oss idag för att komma igång med NIE-processen. Vi guidar dig från start till finish.
                </p>
                <a
                  href="https://wa.me/34XXXXXXXXX?text=Hej%2C%20jag%20behöver%20hjälp%20med%20NIE-numret"
                  className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-6 rounded-sm transition inline-block"
                >
                  Kontakta Oss på WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary-900 to-primary-800 text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-4xl font-bold mb-6">Redo Att Börja NIE-Processen?</h2>
            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
              Låt oss hjälpa dig att skaffa ditt NIE-nummer snabbt och enkelt. Vi tar hand om allt administrativt så du kan fokusera på att hitta din drömfastighet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/34XXXXXXXXX?text=Hej%2C%20jag%20vill%20ha%20hjälp%20att%20skaffa%20NIE-nummer"
                className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-8 rounded-sm transition inline-block"
              >
                Starta NIE-Processen
              </a>
              <a
                href="/sv/guides/kopprocessen"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-4 px-8 rounded-sm transition inline-block"
              >
                Läs Om Köpprocessen
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
              name: 'NIE-nummer',
              item: 'https://newbuild.es/sv/guides/nie-nummer'
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

export default NieNummerPage;
