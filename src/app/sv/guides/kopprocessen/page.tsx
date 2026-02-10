'use client';

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const KopprocessenPage = () => {
  const steps = [
    {
      number: 1,
      title: 'Förberedelser i Sverige',
      description: 'NIE-nummer, bankkonto, och budgetplanering',
      details: [
        'Ansök om NIE-nummer på Stockholm eller Göteborg spanska konsulat',
        'Öppna spanskt bankkonto (rekommenderas men inte obligatoriskt)',
        'Samla ihop ekonomiska dokument (deklaration, anställningskontrakt)',
        'Definiera din budget och finansieringsplan'
      ],
    },
    {
      number: 2,
      title: 'Hitta Rätt Bostad',
      description: 'Med vår hjälp eller genom egen sökning',
      details: [
        'Bläddra bland vårt brett utbud av nybyggda bostäder',
        'Genomför visningar på plats eller virtuellt',
        'Utforska områden och få lokala insikter',
        'Konsultera med våra fastighetsmäklare'
      ],
    },
    {
      number: 3,
      title: 'Reservationsavtal',
      description: 'Bokningsavtal och första insättning',
      details: [
        'Teckna reservationsavtal (normalt €3,000–€6,000)',
        'Insättningen reserverar fastigheten i 10–30 dagar',
        'Avtalet är bindande för både säljar och köpare',
        'Kontrollera avtalets villkor tillsammans med din juridisk rådgivare'
      ],
    },
    {
      number: 4,
      title: 'Juridisk Granskning',
      description: 'Due diligence med svensktalande advokat',
      details: [
        'Anlita en erfaren fastighetsadvokat i Spanien',
        'Kontrollera fastighetens äganderätt och registreringar',
        'Granska samfällighetssamfundets status och historik',
        'Verifiera alla detaljplaner och myndighetsgodkännanden'
      ],
    },
    {
      number: 5,
      title: 'Köpekontrakt',
      description: 'Signering och 10% depositum',
      details: [
        'Underteckna det officiella köpekontraktet (contrato de compraventa)',
        'Betala 10% av köpesumman som depositum',
        'Avtalet innehåller betalningsschema för nybyggda fastigheter',
        'Avtalet registreras hos notarius'
      ],
    },
    {
      number: 6,
      title: 'Bolån & Finansiering',
      description: 'Om du behöver låna pengar',
      details: [
        'Svenska banker kan erbjuda equityrelease mot din svenska fastighet',
        'Spanska banker erbjuder normalt 60–70% av fastighetens värde',
        'Typiska lånekostnader: 3,0–3,5% fast ränta',
        'Godkännande tar normalt 4–8 veckor'
      ],
    },
    {
      number: 7,
      title: 'Escritura & Notarie',
      description: 'Den slutgiltiga överföringen',
      details: [
        'Mötes hos notarius (escribano) för signering av escritura',
        'Betala återstående köpesumma',
        'Notarius registrerar överlåtelsen på landsregistret',
        'Du mottar dina officiella ägandehandlingar'
      ],
    },
    {
      number: 8,
      title: 'Nyckelöverlämning',
      description: 'Möjliggöra fastigheten och registrera',
      details: [
        'Mottar nycklar från byggare eller säljare',
        'Registrera dig hos lokal padron (befolkningsregister)',
        'Ordna vattenledning, el och gasbytning',
        'Sluta hemförsäkring och uppsäg gamla kontrakt'
      ],
    }
  ];

  const swishTimeline = [
    { phase: 'Sverige', duration: '2–4 veckor', activity: 'NIE, bankkonto, förstudie' },
    { phase: 'Huslöst till reservationsavtal', duration: '1–4 veckor', activity: 'Visningar och val' },
    { phase: 'Due diligence', duration: '2–4 veckor', activity: 'Juridisk granskning' },
    { phase: 'Köpekontrakt till escritura', duration: '4–10 veckor', activity: 'Finansiering och notarius' },
    { phase: 'Total tid', duration: '3–6 månader', activity: 'Från första intresse till nyckelöverlämning' }
  ];

  const faqs = [
    {
      q: 'Behöver jag vara bosatt i Spanien för att köpa fastighet?',
      a: 'Nej, svenska medborgare kan köpa fastighet i Spanien utan att vara bosatt där. Du behöver dock ett NIE-nummer och ett spanskt bankkonto rekommenderas för att underlätta transaktioner.'
    },
    {
      q: 'Vad är en reservationsavtal och är den bindande?',
      a: 'En reservationsavtal är ett avtal mellan köpare och säljar som reserverar fastigheten under en kortare period (vanligtvis 10–30 dagar). Ja, den är bindande för båda parter. Om du drar dig ur förlorar du insättningen på €3,000–€6,000.'
    },
    {
      q: 'Hur lång tid tar hela köpprocessen?',
      a: 'Typiskt tar det 3–6 månader från första intresse till slutlig nyckelöverlämning. Med förkortade tidsfrister kan det gå snabbare, men vi rekommenderar att ta ordentlig tid för juridisk granskning.'
    },
    {
      q: 'Måste jag anlita en advokat?',
      a: 'Det är starkt rekommenderat att anlita en erfaren fastighetsadvokat i Spanien, särskilt en som talar svenska eller engelska. Detta skyddar dina intressen och säkerställer att all dokumentation är korrekt.'
    },
    {
      q: 'Vilka dokument behöver jag från Sverige?',
      a: 'Du behöver: giltigt pass, senaste deklaration, anställningskontrakt (om applicable), bankutdrag för de senaste 3 månaderna, och försäkran om finansiell ställning. Om du använder bolån behöver du tilläggshandlingar.'
    },
    {
      q: 'Kan jag hyra ut fastigheten om jag ångrar mig?',
      a: 'Ja, många svenska köpare omvandlar sitt hem till ett semesterhemsinvesteringen. Du behöver då skatta på hyresintäkter enligt spansk lag och deklarera detta till Skatteverket i Sverige.'
    }
  ];

  return (
    <>
      <Head>
        <title>Köpprocessen - Steg för Steg Guide för Svenska Köpare | Newbuild Spain</title>
        <meta name="description" content="Lär dig hur du köper fastighet i Spanien steg för steg. Från NIE-nummer till nyckelöverlämning - vår kompletta guide för svenska köpare." />
        <link rel="canonical" href="https://newbuildhomescostablanca.com/sv/guides/kopprocessen" />
        <link rel="alternate" hrefLang="sv" href="https://newbuildhomescostablanca.com/sv/guides/kopprocessen" />
        <link rel="alternate" hrefLang="en" href="https://newbuildhomescostablanca.com/guides/buying-process" />
        <link rel="alternate" hrefLang="nl" href="https://newbuildhomescostablanca.com/nl/guides/kopen-proces" />
        <link rel="alternate" hrefLang="nl-BE" href="https://newbuildhomescostablanca.com/nl-BE/guides/kopen-proces" />
        <link rel="alternate" hrefLang="fr" href="https://newbuildhomescostablanca.com/fr/guides/processus-achat" />
        <link rel="alternate" hrefLang="no" href="https://newbuildhomescostablanca.com/no/guides/kjopsprocess" />
        <link rel="alternate" hrefLang="x-default" href="https://newbuildhomescostablanca.com/guides/buying-process" />
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
              <span>Köpprocessen</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Köpprocessen — Att Köpa Bostad i Spanien Steg för Steg
            </h1>
            <p className="text-lg text-primary-100 max-w-3xl leading-relaxed">
              En praktisk guide genom samtliga stadier av fastighetsköp i Spanien, speciellt utformad för svenska köpare. Vi leder dig från förberedelser i Sverige till att ta emot nycklar till din nya bostad.
            </p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-8 text-primary-900">De Åtta Stegen till Köp</h2>
            <p className="text-gray-700 mb-12 leading-relaxed">
              Att köpa fastighet i Spanien följer en väl etablerad process. Nedan presenterar vi alla åtta kritiska steg, från initiala förberedelser till slutlig nyckelöverlämning. Varje steg är viktigt och bör genomföras grundligt för att säkerställa en smidig och säker transaktion.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step, idx) => {
                return (
                  <div key={idx} className="bg-white rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition">
                    <div className="flex items-start gap-4">
                      <div className="bg-accent-500 text-white rounded-sm w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary-900 mb-1">{step.title}</h3>
                        <p className="text-sm text-accent-500 font-semibold mb-3">{step.description}</p>
                        <ul className="space-y-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className="text-sm text-gray-700 flex gap-2">
                              <span className="text-accent-500 font-bold">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Steps */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Detaljerad Genomgång av Varje Steg</h2>

            {/* Step 1 */}
            <div className="mb-16 pb-16 border-b border-gray-200">
              <div className="flex gap-4 mb-6">
                <div className="bg-primary-900 text-white rounded-sm w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0">1</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">Förberedelser i Sverige</h3>
                  <p className="text-gray-700 leading-relaxed">Innan du sätter igång med fastighetssökningen är det viktigt att göra grundläggande förberedelser hemma i Sverige. Detta säkerställer en smidig process senare.</p>
                </div>
              </div>
              <div className="ml-20 space-y-4">
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">NIE-nummer</h4>
                  <p className="text-sm text-gray-700">NIE (Número de Identidad de Extranjero) är en spansk identifikationsnummer för utlänningar, motsvarande ditt svenska personnummer. Du kan ansöka på spanska konsulatet i Stockholm eller Göteborg. Processen tar 2–4 veckor.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Spanskt bankkonto</h4>
                  <p className="text-sm text-gray-700">Även om det inte är obligatoriskt, rekommenderas det att öppna ett spanskt bankkonto. Det underlättar betalningar till notarius, advokat och andra svenska köpare. Större spanska banker som CaixaBank och BBVA har goda rutiner för utländska kunder.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Finansiering och budget</h4>
                  <p className="text-sm text-gray-700">Bestäm din budget och hur du ska finansiera köpet. Diskutera med en spansk eller svensk bank hur du kan få bolån. Svenska banker kan erbjuda equityrelease mot din svenska fastighet.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Dokumentsamling</h4>
                  <p className="text-sm text-gray-700">Samla in dina senaste deklarationer, anställningskontrakt och bankutdrag. Du behöver dessa för att bevisa din finansiella ställning när du granskas av långivare och advokater.</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-16 pb-16 border-b border-gray-200">
              <div className="flex gap-4 mb-6">
                <div className="bg-primary-900 text-white rounded-sm w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0">2</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">Hitta Rätt Bostad</h3>
                  <p className="text-gray-700 leading-relaxed">Denna fas kan variera kraftigt beroende på dina preferenser och marknadssituationen. Det är viktigt att ta sin tid för att hitta rätt fastighet.</p>
                </div>
              </div>
              <div className="ml-20 space-y-4">
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Utforska vårt utbud</h4>
                  <p className="text-sm text-gray-700">Vi erbjuder ett stort utbud av nybyggda bostäder i attraktiva områden längs Costa del Sol och andra populära regioner. Använd vår sökfunktion för att filtrera efter pris, storlek och läge.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Visningar och inspektioner</h4>
                  <p className="text-sm text-gray-700">Vi arrangerar personliga visningar på plats eller virtuella visningar över video. Vi rekommenderar att du besöker flera fastigheter för att få en känsla för området och byggkvaliteten.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Lokala insikter</h4>
                  <p className="text-sm text-gray-700">Våra lokala fastighetsmäklare kan ge dig värdefull information om området, närboende, skolor, shopping och framtida utvecklingsprojekt som kan påverka fastighetsvärdet.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Förhandling</h4>
                  <p className="text-sm text-gray-700">Det är ofta utrymme för förhandling om priset, speciellt för äldre fastigheter eller om du köper via auktion. Vi hjälper dig att navigera denna process.</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-16 pb-16 border-b border-gray-200">
              <div className="flex gap-4 mb-6">
                <div className="bg-primary-900 text-white rounded-sm w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0">3</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">Reservationsavtal</h3>
                  <p className="text-gray-700 leading-relaxed">När du hittat rätt fastighet är nästa steg att underteckna ett reservationsavtal och betala en insättning för att reservera fastigheten.</p>
                </div>
              </div>
              <div className="ml-20 space-y-4">
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Vad är ett reservationsavtal?</h4>
                  <p className="text-sm text-gray-700">Ett reservationsavtal (contrato de reserva) är ett preliminärt avtal mellan köpare och säljare. Det reserverar fastigheten för dig under en begränsad tid (normalt 10–30 dagar) och ger dig tid att ordna finansiering och juridisk granskning.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Insättningsbelopp</h4>
                  <p className="text-sm text-gray-700">Reservationsinsättningen är normalt €3,000–€6,000, ibland mer för dyrare fastigheter. Denna insättning går till säljaren som kompensation för att fastigheten tas ur marknaden. Insättningen räknas in i köpesumman när du slutligen undertecknar köpekontraktet.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Bindande kraft</h4>
                  <p className="text-sm text-gray-700">Ett reservationsavtal är bindande för båda parter. Om du drar dig ur utan giltiga skäl förlorar du din insättning. Om säljaren drar sig ur måste de returnera din insättning plus eventuell kompensation. Det är viktigt att läsa avtalet noga tillsammans med din advokat.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Vad bör du kontrollera?</h4>
                  <p className="text-sm text-gray-700">Se till att reservationsavtalet innehåller: reservationsperioden, insättningsbeloppet, villkor för att gå vidare till köpekontrakt, och vad som händer om finansieringen inte godkänns. Låt din advokat granska det innan du signerar.</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="mb-16 pb-16 border-b border-gray-200">
              <div className="flex gap-4 mb-6">
                <div className="bg-primary-900 text-white rounded-sm w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0">4</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">Juridisk Granskning</h3>
                  <p className="text-gray-700 leading-relaxed">Under reservationsperioden är det kritiskt att genomföra en grundlig juridisk och finansiell granskning av fastigheten.</p>
                </div>
              </div>
              <div className="ml-20 space-y-4">
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Anlita en erfaren advokat</h4>
                  <p className="text-sm text-gray-700">Vi rekommenderar att anlita en fastighetsadvokat som talar svenska eller engelska och har erfarenhet av att arbeta med svenska köpare. En bra advokat är värd investeringen och skyddar dina intressen.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Äganderättsverifikation</h4>
                  <p className="text-sm text-gray-700">Din advokat bör kontrollera att säljaren är den rättmätige ägaren genom att granska fastighetsakten (título de propiedad). Denna handling registreras på landsregistret (Registro de la Propiedad) och är juridiskt bindande.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Samfällighetssamfundets granskning</h4>
                  <p className="text-sm text-gray-700">För lägenheter är det kritiskt att granska samfällighetssamfundets status. Din advokat bör begära: protokoll från senaste årsmöte, årlig budget, historik över bidrag, eventuella pågående tvister, och reservfond för framtida reparationer.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Detaljplaner och godkännanden</h4>
                  <p className="text-sm text-gray-700">Verifiera att fastigheten är uppförd enligt detaljplanen och har alla nödvändiga bygglov (licencias de obras). För nybyggda fastigheter kontrollera att slutningssamtycket (cédula de habitabilidad) har erhållits.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Skulder och andra belastningar</h4>
                  <p className="text-sm text-gray-700">Din advokat bör kontrollera att fastigheten inte är belastad med gamla skulder, utestående skatter eller hypotheker. Detta görs genom att granskar landsregistret och skattemyndigheten.</p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="mb-16 pb-16 border-b border-gray-200">
              <div className="flex gap-4 mb-6">
                <div className="bg-primary-900 text-white rounded-sm w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0">5</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">Köpekontrakt</h3>
                  <p className="text-gray-700 leading-relaxed">Efter att juridisk granskning är klar och finansiering godkänd, är det dags att underteckna det officiella köpekontraktet.</p>
                </div>
              </div>
              <div className="ml-20 space-y-4">
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Contrato de Compraventa</h4>
                  <p className="text-sm text-gray-700">Köpekontraktet (contrato de compraventa) är det officiella avtalet mellan köpare och säljare. Det innehåller alla detaljer om fastigheten, köpesumman, betalningsvillkor och andra viktiga betingelser. Avtalet är juridiskt bindande för båda parter.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">10% depositum</h4>
                  <p className="text-sm text-gray-700">Vid undertecknandet av köpekontraktet betalar du normalt 10% av köpesumman som depositum. För nybyggda fastigheter kan detta beloppet delas upp i flera delbetalningar enligt en betalningsschema som är fastställd i kontraktet.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Betalningsschema för nybyggda fastigheter</h4>
                  <p className="text-sm text-gray-700">För nybyggda fastigheter är det vanligt att betalningsschemaet är uppdelat i flera trancher längs byggnationen: första insättning (30%), vid grundläggning (20%), vid invallning (20%), vid installationer (15%) och slutlig betalning vid överlåtelse (15%). Dessa procentsatser kan variera.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Registrering hos notarius</h4>
                  <p className="text-sm text-gray-700">Köpekontraktet registreras hos notarius (escribano) för att skapa en officiell registrering. Detta skyddar båda parter och säkerställer att avtalet är juridiskt bindande och kan införas i landsregistret.</p>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="mb-16 pb-16 border-b border-gray-200">
              <div className="flex gap-4 mb-6">
                <div className="bg-primary-900 text-white rounded-sm w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0">6</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">Bolån & Finansiering</h3>
                  <p className="text-gray-700 leading-relaxed">Om du behöver låna pengar för att finansiera köpet, är det kritiskt att ordna bolån innan du undertecknar köpekontraktet.</p>
                </div>
              </div>
              <div className="ml-20 space-y-4">
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Svenska vs spanska bolån</h4>
                  <p className="text-sm text-gray-700">Du kan finansiera genom svenska banker via equityrelease mot din svenska fastighet, eller genom en spansk bank. Spanska banker erbjuder normalt 60–70% av fastighetsvärdet (LTV). Typiska spanska räntor ligger på 3,0–3,5% fast.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Spanska banker för utlänningar</h4>
                  <p className="text-sm text-gray-700">Större spanska banker som CaixaBank, Sabadell, Bankinter och BBVA erbjuder rutinmässigt bolån till svenska köpare. De kräver NIE-nummer, deklarationer, anställningskontrakt och bankutdrag. Godkännande tar normalt 4–8 veckor.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Vår partner Habeno</h4>
                  <p className="text-sm text-gray-700">Vi arbetar med Habeno, som är specialiserade på bolånefinansiering för svenska och andra nordiska köpare i Spanien. De kan hjälpa till med hela processen och ofta ordna bättre villkor än om du går direkt till banken.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Lånekostnader</h4>
                  <p className="text-sm text-gray-700">Förutom ränta finns även kostnader för värdering, juridisk granskning, försäkringar och administrativa avgifter. Dessa brukar uppgå till 3–5% av lånbeloppet. Dessa kostnader kan ofta förhandlas.</p>
                </div>
              </div>
            </div>

            {/* Step 7 */}
            <div className="mb-16 pb-16 border-b border-gray-200">
              <div className="flex gap-4 mb-6">
                <div className="bg-primary-900 text-white rounded-sm w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0">7</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">Escritura & Notarie</h3>
                  <p className="text-gray-700 leading-relaxed">Den slutgiltiga överföringen av fastigheten sker hos notarius genom undertecknandet av escritura, den slutliga överlåtelsehandlingen.</p>
                </div>
              </div>
              <div className="ml-20 space-y-4">
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Vad är Escritura?</h4>
                  <p className="text-sm text-gray-700">Escritura är den officiella överlåtelsehandlingen som undertecknas hos notarius. Den överför äganderätten från säljaren till köparen och registreras på landsregistret. Utan escritura är du inte juridisk ägare av fastigheten.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Notarius roll</h4>
                  <p className="text-sm text-gray-700">Notarius (escribano) är en offentlig tjänsteman som autentiserar och registrerar alla juridiska överföringar av egendom. Notarius är neutral och skyddar båda parters intressen. Notarius tjänster är lagstadgade och kostnaden är fastställd enligt lagen.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Betala återstående belopp</h4>
                  <p className="text-sm text-gray-700">Vid mötet med notarius betalar du återstående köpesumma minus depositum och tidigare betalningar. Denna betalning görs normalt via bankbokfört transfer (transferencia bancaria) för att lämna ett revisionsspår.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Vad du kan förvänta dig</h4>
                  <p className="text-sm text-gray-700">Mötet hos notarius tar normalt 30–60 minuter. Både köpare och säljare måste närvära personligen eller genom en auktoriserad representant. Notarius läser upp alla avtalsvillkor högt på spanska, vilket låter dig verifiera att allt är korrekt innan du signerar.</p>
                </div>
              </div>
            </div>

            {/* Step 8 */}
            <div className="mb-16">
              <div className="flex gap-4 mb-6">
                <div className="bg-primary-900 text-white rounded-sm w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0">8</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">Nyckelöverlämning</h3>
                  <p className="text-gray-700 leading-relaxed">Efter att escritura undertecknas hos notarius är du juridisk ägare. Nu återstår bara att ta över fastigheten och ordna praktiska frågor.</p>
                </div>
              </div>
              <div className="ml-20 space-y-4">
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Mottag nycklarna</h4>
                  <p className="text-sm text-gray-700">Efter notarius mötet mottager du nycklarna från byggare eller säljare. Du är nu ägare av fastigheten. Se till att du får alla nycklar, nyckelkortskoder för dörrar, och instruktioner för säkerhetssystem om sådant finns.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Registrera dig på padron</h4>
                  <p className="text-sm text-gray-700">Padron är den lokala befolkningsregistreringen. Du bör registrera dig här inom kort efter att du tagit över fastigheten. Det krävs för att få tillgång till vissa offentliga tjänster. Du kan registrera dig på kommunkontoret (ayuntamiento).</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Byt namn på nyttjander</h4>
                  <p className="text-sm text-gray-700">Ordna växling av namn på vattenledning (agua), el (electricidad) och gas (gas). Kontakta relevanta leverantörer med din fastighetsakt för att slutföra detta. Normalt kan detta göras på bara några dagar.</p>
                </div>
                <div className="bg-warm-50 border-l-4 border-accent-500 p-4">
                  <h4 className="font-bold text-primary-900 mb-2">Hemförsäkring och övriga kontrakt</h4>
                  <p className="text-sm text-gray-700">Sluta din hemförsäkring (if applicable) från tidigare fastighet, och teckna en ny för din spanska fastighet. Se till att du också uppdaterar dina försäkringskontrakt och övriga administrativa formaliteter.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Swedish Tax Section */}
        <section className="py-16 md:py-24 bg-gray-50 border-t border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-8 text-primary-900">Skattemässiga Konsekvenser för Svenska Köpare</h2>

            <div className="space-y-6">
              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-primary-900 mb-4">ISK — Investeringssparkonto</h3>
                <p className="text-gray-700 mb-4">Om du är bosatt i Sverige kan du deklarera din spanska fastighet på ett ISK (investeringssparkonto). Detta innebär att du betalar en schablonskatten på inkomst istället för faktisk kapitalvinstskatt. ISK är ofta det mest fördelaktiga sättet för svenska investerare.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Schablonskatten på ISK är ca 2% av värdet</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Du behöver inte redovisa faktiska transaktioner</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Anmälan görs vid deklarationen</li>
                </ul>
              </div>

              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-primary-900 mb-4">Kapitalvinstskatt vid Försäljning</h3>
                <p className="text-gray-700 mb-4">Om du säljer din spanska fastighet måste du deklarera kapitalgvinsten till Skatteverket. Kapitalvinsten är försäljningspriset minus köpesumman och dokumenterade kostnader.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Kapitalvinstskatt i Sverige: 20%</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Dubbelbeskattningsavtalet gäller — du kan reducera dubbel beskattning</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Du kan dra av kostnader för köp, försäljning och förbättringar</li>
                </ul>
              </div>

              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-primary-900 mb-4">Hyresintäkter och Driftskostnader</h3>
                <p className="text-gray-700 mb-4">Om du hyr ut din spanska fastighet måste du deklarera hyresintäkter till Skatteverket. Du kan dra av alla relevanta driftskostnader.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Hyra redovisas som inkomst</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Avdragsgilla kostnader: underhål, reparationer, administration, försäkringar</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Möblering och inventarier kan skrivas av över flera år</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Du måste även betala spansk inkomstskatt på hyresintäkter</li>
                </ul>
              </div>

              <div className="bg-white rounded-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-primary-900 mb-4">Dubbelbeskattningsavtalet Sverige-Spanien</h3>
                <p className="text-gray-700 mb-4">Sverige och Spanien har ett dubbelbeskattningsavtal som säkerställer att du inte betalar skatt två gånger på samma inkomst. Du kan normalt dra av spansk skatt från din svenska skatt.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Spansk egendomsskatt (IBI) kan deduceras från svenska skatter</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Spansk inkomstskatt på hyror kan deduceras</li>
                  <li className="flex gap-2"><span className="text-accent-500 font-bold">•</span> Konsultera en skatteexpert för optimal planering</li>
                </ul>
              </div>

              <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                <h3 className="text-xl font-bold text-primary-900 mb-4">Rekommendation: Konsultera en Skatteexpert</h3>
                <p className="text-gray-700">Vi rekommenderar starkt att du konsulterar en svensk skatteexpert eller revisor innan du köper. De kan hjälpa dig att optimera din skattesituation och säkerställa att du följer reglerna för både svenska och spanska skattemyndigheter.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Comparison */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-primary-900">Tidsplan: Sverige vs Spanien</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-900 text-white">
                    <th className="px-6 py-4 text-left font-bold rounded-sm-tl">Fas</th>
                    <th className="px-6 py-4 text-left font-bold">Tid i Spanien</th>
                    <th className="px-6 py-4 text-left font-bold">Tid i Sverige</th>
                    <th className="px-6 py-4 text-left font-bold rounded-sm-tr">Aktivitet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {swishTimeline.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-semibold text-primary-900">{row.phase}</td>
                      <td className="px-6 py-4 text-gray-700">{row.duration}</td>
                      <td className="px-6 py-4 text-gray-700">—</td>
                      <td className="px-6 py-4 text-gray-700">{row.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 bg-warm-50 border-l-4 border-accent-500 p-6 rounded-sm">
              <p className="text-gray-700 leading-relaxed">
                Köpprocessen i Spanien är normalt snabbare än i Sverige tack vare ett mer strömlinjeformat juridiskt system. En typisk process från första intresse till nyckelöverlämning tar 3–6 månader. Detta kan variera beroende på om du köper från utvecklare (längre tid på grund av betalningsschema) eller direkt från privatperson (snabbare).
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
            <h2 className="text-4xl font-bold mb-6">Redo Att Påbörja Din Köpresa?</h2>
            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
              Vi guidar dig genom varje steg av processen. Från initial konsultation till nyckelöverlämning, vi är här för att säkerställa en smidig och säker transaktion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/34XXXXXXXXX?text=Hej%2C%20jag%20är%20intresserad%20av%20att%20köpa%20fastighet%20i%20Spanien"
                className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-8 rounded-sm transition inline-block"
              >
                Kontakta Oss på WhatsApp
              </a>
              <a
                href="/sv/guides/"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-4 px-8 rounded-sm transition inline-block"
              >
                Se Fler Guider
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
              name: 'Köpprocessen',
              item: 'https://newbuild.es/sv/guides/kopprocessen'
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

export default KopprocessenPage;
