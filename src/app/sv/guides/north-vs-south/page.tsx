import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970'
};

const DOMAIN = 'newbuildhomescostablanca.com';

interface RegionComparison {
  category: string;
  north: string;
  south: string;
}

interface Region {
  name: string;
  alias: string;
  priceRange: string;
  description: string;
  characteristics: string[];
  towns: string[];
  bestFor: string[];
}

interface Faq {
  q: string;
  a: string;
}

const comparisonData: RegionComparison[] = [
  {
    category: 'Pris',
    north: '€300,000–€600,000+ (och högre)',
    south: '€150,000–€300,000'
  },
  {
    category: 'Landskapstyp',
    north: 'Bergig, dramatic — berg möter hav',
    south: 'Plan, modern infrastruktur'
  },
  {
    category: 'Atmosfär',
    north: 'Traditionell spansk, mindre exklusiv',
    south: 'Livlig, många semestergäster'
  },
  {
    category: 'Svenska Befolkning',
    north: 'Växande men fortfarande minoritet',
    south: 'Stor svensk gemenskap — många Stockholmare'
  },
  {
    category: 'Golf',
    north: 'Inga golfbanor',
    south: 'Många golfbanor (Villamartin, La Marquesa)'
  },
  {
    category: 'Shopping & Nöje',
    north: 'Begränsat — traditionell spansk mat',
    south: 'Moderna köpcentra (La Zenia, Torrevieja)'
  },
  {
    category: 'Stränderna',
    north: 'Pequeños, stenlika — men vackra',
    south: 'Långa sandstränderna'
  },
  {
    category: 'Avstnd Från Flygplats',
    north: 'Jávea: ~120 km från Alicante',
    south: 'Torrevieja: ~80 km från Alicante'
  },
  {
    category: 'Klimat',
    north: 'Medelhav — lite regn, 300 soldagar',
    south: 'Medelhav — lite regn, 300+ soldagar'
  },
  {
    category: 'Hälsovård',
    north: 'Privat vård mellan köpcentra',
    south: 'Många privata kliniker och läkare'
  }
];

const northRegions: Region = {
  name: 'Costa Blanca Nord',
  alias: '(Jávea, Moraira, Altea, Calpe, Dénia)',
  priceRange: '€300,000–€600,000+',
  description: 'Exklusiv naturskönhet med berg möter havet. Traditionell spansk atmosfär med moderna lyx­projekt.',
  characteristics: [
    'Dramatisk geografi — stenar, klippar och stickar',
    'Mindre trängd — mer exklusiv känsla',
    'Traditionell spansk arkitektur blandad med moderna villas',
    'Äldre demografisk — många pensionärer från flera länder',
    'Stenlika eller små stränderna (inte bred sand)',
    'Mindre handel och underhållning — mer fredligt'
  ],
  towns: [
    'Jávea — mest populär norr, klassisk medelhavscharm, exklusiva fastigheter, €400,000–€800,000 för 2RoK',
    'Moraira — mindre än Jávea, väldigt snygg, hemmaslöjd och restauranger, €350,000–€700,000',
    'Altea — konstnärsbyn, smutsigt gammalt centrum med vit arkitektur, växter, €300,000–€500,000',
    'Calpe — strandort med stor klippa (Peñón de Ifach), turistisch men autentig, €300,000–€550,000',
    'Dénia — större stad, kultur och historia, hamn, €300,000–€500,000'
  ],
  bestFor: [
    'Köpare som söker exklusiv miljö och är villiga att betala för det',
    'Pensionärer som vill bo i en vacker, fredlig omgivning',
    'De som älskar traditionell spansk kultur och landskapets dramatik',
    'Investerare som söker långsiktig värdeökning',
    'De som inte behöver mycket golfande eller moderna shoppingcentra'
  ]
};

const southRegions: Region = {
  name: 'Costa Blanca Söder',
  alias: '(Torrevieja, Orihuela Costa, Guardamar, Gran Alacant)',
  priceRange: '€150,000–€300,000',
  description: 'Prisvärda moderna områden med stark svensk gemenskap. Mycket underhållning, golf, shopping och livlig atmosfär.',
  characteristics: [
    'Plan terräng — moderna bostäder och infrastruktur',
    'Stor internationell befolkning — särskilt många svenskar',
    'Moderna lyxiga projekt och simplare bostäder sida vid sida',
    'Yngre demografisk — familjer och arbetande pensionärer',
    'Långa sandsstränderna — perfekt för badande',
    'Mycket handel, nöje, golfbanor och semesteraktiviteter'
  ],
  towns: [
    'Torrevieja — største stad i söder, salzsjöar, många svenskar, golf, shopping, €150,000–€350,000 för 2RoK',
    'Villamartin — Golfby — hem för två världskända golfbanor, 2000+ sverige invånare, €200,000–€400,000',
    'Orihuela Costa — större område längs kusten, många projekt, allt till hands, €180,000–€350,000',
    'Guardamar — mindre stad, tranquil men med god infrastruktur, €140,000–€280,000',
    'Gran Alacant — nyare område, moderna projekt, lufthugget läge näära flygplats, €160,000–€320,000'
  ],
  bestFor: [
    'Köpare med begränsad budget — mycket billigare än norr',
    'De som vill gå med en etablerad svensk gemenskap',
    'Familjer — mer verksamheter, bättre skolor, mer nöje',
    'Golfande — två världsryktade golfbanor i området',
    'De som vill hyra ut och få god avkastning',
    'Ålderspendar — livlig atmosfär, många semestergäster'
  ]
};

const northCommunity = [
  { town: 'Jávea', swedes: '2,000–3,000', vibe: 'Växa snabbt men fortfarande småskalig' },
  { town: 'Altea', swedes: '800–1,000', vibe: 'Blandad internationell känsla' },
  { town: 'Moraira', swedes: '600–800', vibe: 'Mindre gemenskapen, mer privat' }
];

const southCommunity = [
  { town: 'Villamartin', swedes: '2,000–2,500', vibe: 'Minst två stora svenska servernamn/restauranger' },
  { town: 'Torrevieja', swedes: '1,500–2,000', vibe: 'Mycket svenskt — många våra språket dagligen' },
  { town: 'Orihuela Costa', swedes: '1,000–1,500', vibe: 'Växande svensk gemenskap' }
];

const faqs: Faq[] = [
  {
    q: 'Vad är den största skillnaden mellan norr och söder?',
    a: 'Norr är dyrare och mer exklusiv — du betalar för vacker geografi och mindre folkmängd. Söder är billigare och livligare — mer svenska grannar, golf, shopping och semesteratmosfär. Det är väsentligen en avvägning mellan exklusivitet och gemenskap/värde.'
  },
  {
    q: 'Här jag redan svenska grannar och det är viktigt för mig?',
    a: 'Då är söder det bättre valet. Villamartin och Torrevieja har stora svenska gemenskaper — tusentals väl etablerade svenska köpare, restauranger, servernamn och aktiviteter. Norr växer men är fortfarande mycket mindre.'
  },
  {
    q: 'Jag är en seriös golfande — vilket område?',
    a: 'Söder. Villamartin är hem för två världsryktade golfbanor — El Campeon och Villamartin. Norr har inga golfbanor. Det är en stor skillnad om golf är viktigt för dig.'
  },
  {
    q: 'Kan jag få mer värde för mina pengar?',
    a: 'Ja. Söder är typiskt 30–50% billigare än norr. En €300,000 lägenhet i Jávea kan kostar €150,000–€200,000 i Torrevieja eller Villamartin. Samma komfort, mycket lägre pris.'
  },
  {
    q: 'Vilken är bäst om jag ska hyra ut?',
    a: 'Söder får ofta högre hyror relativt till priset på grund av större turistströmmar och semestergäster. Norr får också hyra, men mindre volymer gäster. Söder ger ofta bättre ROI för investerare.'
  },
  {
    q: 'Jag älskar spansk kultur och är det viktigt för mig?',
    a: 'Norr kan ge dig mer autentisk spansk miljö — mindre turism, mer traditionell arkitektur. Söder kan känna mer internationell och turistisk. Men båda områdena är i Spanien och erbjuder spansk kultur.'
  },
  {
    q: 'Vilka är klimatskillnaderna?',
    a: 'Väldigt små. Båda områdena har medelhavsklimat — ca 300 soldagar per år. Söder kan vara något torr (mindre regn). Norr har en smula bergsvind på sommaren men är mycket behagligt. Det är inte en stor faktor för valet.'
  },
  {
    q: 'Vad är avståndet till Alicante flygplats?',
    a: 'Söder är närmare — Torrevieja ca 80 km (1 timme). Norr är längre — Jávea ca 120 km (1,5 timme). Inte enormt stor skillnad, men söder är mer bekväm för gäster och hyresgäster.'
  },
  {
    q: 'Kan priset i norr gå upp snabbare än söder?',
    a: 'Möjligt. Norr är mindre utvecklat och exklusivitet kan öka över tid. Söder är redan mycket utvecklat. Men både områdena är långsiktiga värdeinvesteringar. Investera baserat på vart du vill bo, inte bara på spekulation.'
  },
  {
    q: 'Jag är inte säker — kan jag hyra först innan jag köper?',
    a: 'Ja! Vi rekommenderar att besöka eller hyra en lägenhet i båda områdena under ett par månader innan du köper. Du får känna atmosfären, träffa människor och avgöra vilken som passar dig bäst. Det är värt investeringen.'
  }
];

export const metadata: Metadata = {
  title: 'Costa Blanca Nord vs Söder — Vilken Passar Dig? | Svenska Guider',
  description: 'Jämför Costa Blanca Nord (exklusiv, dyr) vs Söder (prisvärd, svensk gemenskap). Priser, aktiviteter, hälsovård, golf, shopping och mera.',
  alternates: {
    canonical: `https://${DOMAIN}/sv/guides/north-vs-south`,
    languages: {
      en: `https://${DOMAIN}/guides/north-vs-south`,
      sv: `https://${DOMAIN}/sv/guides/north-vs-south`,
      nl: `https://${DOMAIN}/nl/guides/noord-vs-zuid`,
      'nl-BE': `https://${DOMAIN}/nl-BE/guides/noord-vs-zuid`,
      fr: `https://${DOMAIN}/fr/guides/nord-vs-sud`,
      no: `https://${DOMAIN}/no/guides/nord-vs-sør`,
      'x-default': `https://${DOMAIN}/guides/north-vs-south`,
    },
  },
};

export default function NorthVsSouthPage() {
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
              <span>Nord vs Söder</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
              Costa Blanca Nord vs Söder
            </h1>
            <p className="text-lg text-primary-100 max-w-3xl leading-relaxed">
              Två huvudsakliga områden på Costa Blanca, varje med sitt eget karaktär. Norr erbjuder exklusiv geografi och traditionell spansk atmosfär. Söder erbjuder prisvärda moderna områden med stark svensk gemenskap. Vilken passar din livsstil?
            </p>
          </div>
        </section>

        {/* Quick Comparison */}
        <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Snabb Jämförelse</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary-900 text-white">
                    <th className="px-6 py-4 text-left font-light rounded-sm-tl">Kategori</th>
                    <th className="px-6 py-4 text-left font-light">Costa Blanca Nord</th>
                    <th className="px-6 py-4 text-left font-light rounded-sm-tr">Costa Blanca Söder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-light text-primary-900">{row.category}</td>
                      <td className="px-6 py-4 text-gray-700">{row.north}</td>
                      <td className="px-6 py-4 text-gray-700">{row.south}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* North Deep Dive */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex gap-4 mb-6">
              <div className="bg-primary-900 text-white rounded-sm w-12 h-12 flex items-center justify-center font-light text-lg flex-shrink-0">1</div>
              <div className="flex-1">
                <h2 className="text-3xl font-light text-primary-900 mb-2">{northRegions.name}</h2>
                <p className="text-lg text-gray-700">{northRegions.alias}</p>
              </div>
            </div>

            <div className="ml-16 mb-12">
              <div className="bg-accent-50 rounded-sm p-6 border border-accent-200 mb-8">
                <p className="text-gray-700 leading-relaxed">{northRegions.description}</p>
              </div>

              <h4 className="text-xl font-light text-primary-900 mb-6">Utmärkande Drag</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {northRegions.characteristics.map((char, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-accent-500 font-light flex-shrink-0 mt-0.5">✓</span>
                    <p className="text-gray-700">{char}</p>
                  </div>
                ))}
              </div>

              <h4 className="text-xl font-light text-primary-900 mb-6">Städer I Norr</h4>
              <div className="space-y-4">
                {northRegions.towns.map((town, i) => (
                  <div key={i} className="bg-white rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition">
                    <p className="text-gray-700 leading-relaxed">{town}</p>
                  </div>
                ))}
              </div>

              <h4 className="text-xl font-light text-primary-900 mb-6 mt-12">Perfekt För</h4>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200 space-y-3">
                {northRegions.bestFor.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-primary-900 font-light flex-shrink-0 mt-0.5">▸</span>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* South Deep Dive */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex gap-4 mb-6">
              <div className="bg-accent-500 text-white rounded-sm w-12 h-12 flex items-center justify-center font-light text-lg flex-shrink-0">2</div>
              <div className="flex-1">
                <h2 className="text-3xl font-light text-primary-900 mb-2">{southRegions.name}</h2>
                <p className="text-lg text-gray-700">{southRegions.alias}</p>
              </div>
            </div>

            <div className="ml-16 mb-12">
              <div className="bg-accent-50 rounded-sm p-6 border border-accent-200 mb-8">
                <p className="text-gray-700 leading-relaxed">{southRegions.description}</p>
              </div>

              <h4 className="text-xl font-light text-primary-900 mb-6">Utmärkande Drag</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {southRegions.characteristics.map((char, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-accent-500 font-light flex-shrink-0 mt-0.5">✓</span>
                    <p className="text-gray-700">{char}</p>
                  </div>
                ))}
              </div>

              <h4 className="text-xl font-light text-primary-900 mb-6">Städer I Söder</h4>
              <div className="space-y-4">
                {southRegions.towns.map((town, i) => (
                  <div key={i} className="bg-white rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition">
                    <p className="text-gray-700 leading-relaxed">{town}</p>
                  </div>
                ))}
              </div>

              <h4 className="text-xl font-light text-primary-900 mb-6 mt-12">Perfekt För</h4>
              <div className="bg-accent-50 rounded-sm p-6 border border-accent-200 space-y-3">
                {southRegions.bestFor.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-accent-500 font-light flex-shrink-0 mt-0.5">▸</span>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Swedish Community Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Svenska Gemenskap</h2>
            <p className="text-gray-700 mb-12 leading-relaxed">
              Costa Blanca har en väl etablerad och växande svensk befolkning. Här är ungefär hur många svenskar bor i varje område:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-light text-primary-900 mb-6">Nord — Växande Men Liten</h3>
                <div className="space-y-4">
                  {northCommunity.map((item, i) => (
                    <div key={i} className="bg-white rounded-sm p-6 border border-gray-200">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="font-light text-lg text-primary-900">{item.town}</h4>
                          <p className="text-sm text-gray-600 mt-2">{item.vibe}</p>
                        </div>
                        <div className="bg-primary-50 rounded-sm px-3 py-2 border border-primary-200">
                          <p className="text-lg font-light text-primary-900">{item.swedes}</p>
                          <p className="text-xs text-primary-700">svenskar</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-light text-primary-900 mb-6">Söder — Stor & Väl Etablerad</h3>
                <div className="space-y-4">
                  {southCommunity.map((item, i) => (
                    <div key={i} className="bg-white rounded-sm p-6 border border-accent-200">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="font-light text-lg text-primary-900">{item.town}</h4>
                          <p className="text-sm text-gray-600 mt-2">{item.vibe}</p>
                        </div>
                        <div className="bg-accent-50 rounded-sm px-3 py-2 border border-accent-200">
                          <p className="text-lg font-light text-accent-500">{item.swedes}</p>
                          <p className="text-xs text-accent-700">svenskar</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-warm-50 rounded-sm p-6 border-l-4 border-accent-500">
              <h4 className="font-light text-lg text-primary-900 mb-3">Swedish Community Impact</h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                I söder finns flera svenska restauranger, servernamn, kyrka och organisationer. Du kan träffa andra svenskar dagligen om du vill. I norr är det mindre etablerat men växande — det kan vara både en fördel (mindre turism) och en nackdel (mindre gemenskap) beroende på dina preferenser.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Vi rekommenderar att du besöker båda områdena och pratar med befintliga svenska köpare för att få en känsla för gemenskapen innan du köper.
              </p>
            </div>
          </div>
        </section>

        {/* Lifestyle Comparison */}
        <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Vad Karaktäriserar Din Livsstil?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-sm p-8 border border-gray-200">
                <h3 className="text-2xl font-light text-primary-900 mb-6">Du Kanske Föredrar Nord Om...</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3"><span className="text-primary-900 font-light">▸</span> Du älskar vacker natur och bergsutsikt</li>
                  <li className="flex gap-3"><span className="text-primary-900 font-light">▸</span> Du söker lugnet och mindre folkmängd</li>
                  <li className="flex gap-3"><span className="text-primary-900 font-light">▸</span> Du vill investera i exklusiv egendom</li>
                  <li className="flex gap-3"><span className="text-primary-900 font-light">▸</span> Du är OK med få svenska grannar</li>
                  <li className="flex gap-3"><span className="text-primary-900 font-light">▸</span> Du vill ha autentisk spansk miljö</li>
                  <li className="flex gap-3"><span className="text-primary-900 font-light">▸</span> Du inte behöver mycket shoppingcentra och nöje</li>
                  <li className="flex gap-3"><span className="text-primary-900 font-light">▸</span> Du kan skänka mer pengar för location</li>
                </ul>
              </div>

              <div className="bg-accent-50 rounded-sm p-8 border border-accent-200">
                <h3 className="text-2xl font-light text-accent-500 mb-6">Du Kanske Föredrar Söder Om...</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3"><span className="text-accent-500 font-light">▸</span> Du har begränsad budget men vill stor lägenhet</li>
                  <li className="flex gap-3"><span className="text-accent-500 font-light">▸</span> Du vill träffa andra svenskar regelbundet</li>
                  <li className="flex gap-3"><span className="text-accent-500 font-light">▸</span> Du älskar golf — två världskända golfbanor</li>
                  <li className="flex gap-3"><span className="text-accent-500 font-light">▸</span> Du vill många butiker och restauranger</li>
                  <li className="flex gap-3"><span className="text-accent-500 font-light">▸</span> Du planerar att hyra ut — högre hyror</li>
                  <li className="flex gap-3"><span className="text-accent-500 font-light">▸</span> Du har familj med barn — mer verksamheter</li>
                  <li className="flex gap-3"><span className="text-accent-500 font-light">▸</span> Du vill närhet till flygplats</li>
                  <li className="flex gap-3"><span className="text-accent-500 font-light">▸</span> Du söker livligare, mer semesteryläten atmosfär</li>
                </ul>
              </div>
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
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Hitta Din Perfekta Hem</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/sv/properties?region=north">
                <div className="bg-white rounded-sm p-8 border border-gray-200 hover:border-primary-900 transition cursor-pointer h-full">
                  <h3 className="text-2xl font-light text-primary-900 mb-4">Utforska Costa Blanca Nord</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Se våra exklusiva projekt i Jávea, Moraira, Altea och Dénia. Vacker geografi, traditionell spansk atmosfär.
                  </p>
                  <div className="flex items-center text-primary-900 font-light">
                    Se Projekt Norr →
                  </div>
                </div>
              </Link>

              <Link href="/sv/properties?region=south">
                <div className="bg-accent-50 rounded-sm p-8 border border-accent-200 hover:border-accent-500 transition cursor-pointer h-full">
                  <h3 className="text-2xl font-light text-accent-500 mb-4">Utforska Costa Blanca Söder</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Se våra prisvärda moderna projekt i Torrevieja, Villamartin och Orihuela Costa. Perfekt för investerare och familjer.
                  </p>
                  <div className="flex items-center text-accent-500 font-light">
                    Se Projekt Söder →
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-16 md:py-24 bg-white border-y border-gray-200">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-light mb-12 text-primary-900">Relaterade Guider</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/sv/guides/why-new-build">
                <div className="bg-white rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition h-full">
                  <h4 className="text-lg font-light text-primary-900 mb-3">Varför Köpa Nybygge?</h4>
                  <p className="text-sm text-gray-600 mb-4">Fördelar med nybygge, energieffektivitet och 10-årsgaranti</p>
                  <div className="flex items-center text-accent-500 text-sm font-light">
                    Läs Mer →
                  </div>
                </div>
              </Link>

              <Link href="/sv/guides/key-ready-vs-off-plan">
                <div className="bg-white rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition h-full">
                  <h4 className="text-lg font-light text-primary-900 mb-3">Key-Ready vs Off-Plan</h4>
                  <p className="text-sm text-gray-600 mb-4">Jämför färdiga och på ritning — pris, tidsplan och betalning</p>
                  <div className="flex items-center text-accent-500 text-sm font-light">
                    Läs Mer →
                  </div>
                </div>
              </Link>

              <Link href="/sv/guides/costs-taxes">
                <div className="bg-white rounded-sm p-6 border border-gray-200 hover:border-accent-500 transition h-full">
                  <h4 className="text-lg font-light text-primary-900 mb-3">Kostnader & Skatter</h4>
                  <p className="text-sm text-gray-600 mb-4">Köpkostnader, skatter, löpande kostnader och mera</p>
                  <div className="flex items-center text-accent-500 text-sm font-light">
                    Läs Mer →
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Recommendation CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary-900 to-primary-800 text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-4xl font-light mb-6">Inte Säker Vilken Region?</h2>
            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
              Många köpare besöker eller hyr båda områdena innan de bestämmer sig. Vi kan hjälpa dig att ordna detta och ge personlig rådgivning.
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
              { name: 'Nord vs Söder', url: `https://${DOMAIN}/sv/guides/north-vs-south` }
            ])
          )
        )}
      </script>
    </>
  );
}
