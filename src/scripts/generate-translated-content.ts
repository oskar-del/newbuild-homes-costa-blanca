#!/usr/bin/env npx tsx
/**
 * Multi-Language Culturally-Adapted Content Generator
 *
 * Takes existing English AI property content and generates culturally-adapted
 * versions for all target languages. NOT just translation — each version
 * includes cultural references, price comparisons, flight routes, and
 * community information relevant to that nationality.
 *
 * Usage:
 *   npx tsx src/scripts/generate-translated-content.ts --lang=sv
 *   npx tsx src/scripts/generate-translated-content.ts --lang=all
 *   npx tsx src/scripts/generate-translated-content.ts --lang=de --limit=10
 *   npx tsx src/scripts/generate-translated-content.ts --lang=nl --ref=N12345
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const AI_MODEL = 'claude-haiku-4-5-20251001';

// ─── Language Configuration with Cultural Context ─────────────────────────
interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  formal: boolean; // use formal 'you' (Sie/u/vous) or informal (du/je/tu)
  realEstateTerms: Record<string, string>;
  culturalContext: string;
  priceComparisons: string;
  flightInfo: string;
  communityInfo: string;
  buyerMotivations: string;
}

const LANGUAGES: Record<string, LanguageConfig> = {
  sv: {
    code: 'sv',
    name: 'Swedish',
    nativeName: 'Svenska',
    formal: false,
    realEstateTerms: {
      'new build': 'nybygge',
      'apartment': 'lägenhet',
      'villa': 'villa',
      'townhouse': 'radhus',
      'penthouse': 'takvåning',
      'key-ready': 'inflyttningsklart',
      'off-plan': 'på ritning',
      'sea view': 'havsutsikt',
      'pool': 'pool',
      'terrace': 'terrass',
      'garage': 'garage',
      'property': 'fastighet/bostad',
    },
    culturalContext: `Swedish buyers typically compare Costa Blanca prices to Stockholm, Gothenburg, or Malmö property markets. A €250K villa here equals a small apartment in central Stockholm. Swedes value 'lagom' (just right) - practical, well-designed spaces. Many Swedish families already have connections to Spain through generations of holiday travel. Reference the large Swedish communities in Torrevieja, La Marina, and Orihuela Costa. Mention Swedish clubs, churches (Svenska kyrkan), and Swedish-speaking services.`,
    priceComparisons: `Compare prices to Stockholm bostadsrätter (apartments), Gothenburg housing market. A 3-bed villa with pool for €300K = price of a 2-room apartment in Södermalm. Swedish property tax (fastighetsavgift) vs Spanish IBI comparison.`,
    flightInfo: `SAS, Norwegian, and Ryanair fly direct from Stockholm Arlanda and Gothenburg Landvetter to Alicante (3.5h). Year-round departures. Budget flights from €50 one-way. Also Malmö Sturup to Alicante with Ryanair.`,
    communityInfo: `Large established Swedish communities in Torrevieja (3,000+ Swedes), Orihuela Costa, La Marina, Alfaz del Pi. Swedish church services, Swedish shops (including Swedish food stores), Scandinavian social clubs. Swedish-speaking doctors, lawyers, and estate agents available throughout Costa Blanca.`,
    buyerMotivations: `Escaping dark Swedish winters (November-March), seeking sun and outdoor lifestyle, retirement destination, rental investment for holiday lettings to fellow Scandinavians, children's future holiday home.`,
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    formal: true,
    realEstateTerms: {
      'new build': 'Neubau',
      'apartment': 'Wohnung',
      'villa': 'Villa',
      'townhouse': 'Reihenhaus',
      'penthouse': 'Penthouse',
      'key-ready': 'bezugsfertig',
      'off-plan': 'im Bau / vom Plan',
      'sea view': 'Meerblick',
      'pool': 'Pool/Schwimmbad',
      'terrace': 'Terrasse',
      'garage': 'Garage',
      'property': 'Immobilie',
    },
    culturalContext: `German buyers are methodical and detail-oriented. They value build quality, energy efficiency ratings (Energieausweis equivalent), and legal security. Compare to German property markets — Munich, Hamburg, Frankfurt, Düsseldorf. German buyers expect thorough documentation and transparent processes. Reference TÜV-quality standards as analogy for Spanish building guarantees. Many Germans value Ordnung (order) and appreciate well-maintained community areas.`,
    priceComparisons: `Compare to Munich (€8,000-12,000/m²), Hamburg (€5,000-7,000/m²), or Frankfurt. A luxury villa on Costa Blanca for €500K costs less than a 3-Zimmer Wohnung in Munich. German Grunderwerbsteuer (property transfer tax, 3.5-6.5%) vs Spanish ITP comparison.`,
    flightInfo: `Frequent direct flights from Frankfurt, Munich, Düsseldorf, Hamburg, Berlin, Stuttgart, and Cologne to Alicante (2.5-3h). Ryanair, Eurowings, Lufthansa, Condor operate year-round. Budget flights from €40 one-way. Also direct to Murcia/Corvera airport.`,
    communityInfo: `German communities concentrated in Javea, Moraira, Calpe, and Alfaz del Pi (Northern Costa Blanca). German schools, German-speaking medical practices, Deutsche Stammtisch (social meetups), German restaurants and bakeries. Deutscher Club Costa Blanca organizes cultural events.`,
    buyerMotivations: `Investment security (Kapitalanlage), retirement planning (Altersvorsorge), reliable rental returns (Mieteinnahmen), superior weather and lifestyle, children's inheritance planning, escape from high German property prices and Nebenkosten.`,
  },
  nl: {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    formal: false,
    realEstateTerms: {
      'new build': 'nieuwbouw',
      'apartment': 'appartement',
      'villa': 'villa',
      'townhouse': 'tussenwoning/rijtjeshuis',
      'penthouse': 'penthouse',
      'key-ready': 'instapklaar',
      'off-plan': 'op tekening',
      'sea view': 'zeezicht',
      'pool': 'zwembad',
      'terrace': 'terras',
      'garage': 'garage',
      'property': 'woning/vastgoed',
    },
    culturalContext: `Dutch buyers are pragmatic and value-conscious. They compare to the overheated Dutch housing market where average prices exceed €400K for basic homes. Costa Blanca offers incredible value. The Dutch 'gezellig' lifestyle translates well to Mediterranean living. Reference the massive Dutch community — Costa Blanca is sometimes called 'Little Netherlands.' Dutch buyers often seek properties that can serve as both holiday homes and rental investments.`,
    priceComparisons: `Compare to Amsterdam (€6,000-10,000/m²), Rotterdam, The Hague, Utrecht. A villa with pool for €350K = price of a small rijtjeshuis in the Randstad. Dutch overdrachtsbelasting (transfer tax, 2% for primary homes, 10.4% for investment) vs Spanish taxes. Dutch buyers benefit from strong Netherlands-Spain tax treaties.`,
    flightInfo: `KLM, Transavia, and Ryanair fly direct from Amsterdam Schiphol and Eindhoven to Alicante (2.5h). Year-round multiple daily flights. Budget flights from €30 one-way. Also Rotterdam The Hague Airport connections.`,
    communityInfo: `Largest Dutch community in Spain concentrated on Costa Blanca — estimated 50,000+ Dutch residents. Javea alone has 4,000+ Dutch residents. Strong communities in Moraira, Calpe, Alfaz del Pi, L'Alfas, and Orihuela Costa. Dutch schools, churches, social clubs, supermarkets (with Dutch products), and complete Dutch-speaking service infrastructure.`,
    buyerMotivations: `Escaping Dutch weather and high housing costs, rental investment (verhuur), retirement in the sun, holiday home for family use, strong Dutch community providing easy integration, proximity (2.5h flight).`,
  },
  'nl-be': {
    code: 'nl-be',
    name: 'Flemish/Belgian Dutch',
    nativeName: 'Vlaams',
    formal: false,
    realEstateTerms: {
      'new build': 'nieuwbouw',
      'apartment': 'appartement',
      'villa': 'villa',
      'townhouse': 'rijwoning',
      'penthouse': 'penthouse',
      'key-ready': 'instapklaar',
      'off-plan': 'op plan',
      'sea view': 'zeezicht',
      'pool': 'zwembad',
      'terrace': 'terras',
      'garage': 'garage',
      'property': 'eigendom/vastgoed',
    },
    culturalContext: `Belgian buyers (particularly Flemish) share the Dutch language but have distinct cultural references. Compare to Belgian property markets — Antwerp, Ghent, Brussels, Leuven. Belgians value 'de bakstenen in de maag' (bricks in the stomach — the Belgian love of property ownership). Reference the Belgian holiday tradition on the Costa — Spain has been the #1 Belgian holiday destination for decades. Belgian registratierechten (registration tax, 12% in Flanders) make Spanish buying costs look very attractive.`,
    priceComparisons: `Compare to Antwerp (€3,500-5,000/m²), Ghent, Brussels. A Costa Blanca villa for €400K = a modest rijwoning in Antwerp suburbs. Belgian registratierechten (12% Flanders / 12.5% Wallonia) vs Spanish ITP (10%). Belgium's high property taxes make Spain attractive.`,
    flightInfo: `Brussels Airlines, Ryanair, and TUI fly direct from Brussels Zaventem and Brussels South Charleroi to Alicante (2.5h). Year-round service. Antwerp Airport also has seasonal connections. Budget flights from €30.`,
    communityInfo: `Belgian communities throughout Costa Blanca, particularly in Javea, Moraira, Calpe, Benidorm, and Torrevieja. Belgian-Flemish social clubs, Belgian restaurants and cafés. The Belgian-Flemish community is well-integrated with Dutch expats, sharing language and many cultural similarities.`,
    buyerMotivations: `Escaping Belgian weather, leveraging relatively high Belgian incomes for Spanish property value, 'bakstenen in de maag' culture, rental investment, retirement planning, proximity (2.5h flight), lower property taxes than Belgium.`,
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    formal: true,
    realEstateTerms: {
      'new build': 'construction neuve / programme neuf',
      'apartment': 'appartement',
      'villa': 'villa',
      'townhouse': 'maison mitoyenne',
      'penthouse': 'attique',
      'key-ready': 'clé en main / livraison immédiate',
      'off-plan': 'sur plan / VEFA',
      'sea view': 'vue mer',
      'pool': 'piscine',
      'terrace': 'terrasse',
      'garage': 'garage',
      'property': 'bien immobilier',
    },
    culturalContext: `French buyers understand Mediterranean lifestyle intimately. They compare Costa Blanca to the Côte d'Azur and Languedoc — similar climate but dramatically lower prices. French property buyers are accustomed to VEFA (Vente en l'État Futur d'Achèvement) for off-plan purchases. Reference the French property market — Paris, Lyon, Nice, Marseille. French buyers appreciate gastronomy, culture, and quality of life (art de vivre). Spain's proximity to France makes weekend trips feasible.`,
    priceComparisons: `Compare to Côte d'Azur (€5,000-15,000/m² in Nice, Cannes) and Paris (€10,000-15,000/m²). Costa Blanca offers similar Mediterranean lifestyle at 1/3 to 1/5 of Nice prices. French notaire fees (7-8% for existing, 2-3% for new) vs Spanish costs. Similar buyer protections exist (bank guarantee equivalent to VEFA guarantees).`,
    flightInfo: `Frequent direct flights from Paris (CDG/Orly), Lyon, Marseille, Toulouse, Bordeaux, and Nantes to Alicante (2h). Ryanair, Vueling, easyJet, Air France. Also accessible by car via AP-7 motorway through Catalonia (8-10h from French border). TGV to Barcelona then onward travel.`,
    communityInfo: `French community growing rapidly on Costa Blanca, concentrated in Javea, Denia, Calpe, and Benidorm. French-speaking services, lycée français options in Alicante, French cultural associations. The French community is smaller than Dutch/British but growing as French buyers discover the value compared to Côte d'Azur.`,
    buyerMotivations: `Mediterranean lifestyle at fraction of Côte d'Azur prices, investment diversification, retirement au soleil, rental potential (particularly to French tourists), proximity to France, similar culinary culture, art de vivre.`,
  },
  no: {
    code: 'no',
    name: 'Norwegian',
    nativeName: 'Norsk',
    formal: false,
    realEstateTerms: {
      'new build': 'nybygg',
      'apartment': 'leilighet',
      'villa': 'villa/enebolig',
      'townhouse': 'rekkehus',
      'penthouse': 'toppleilighet',
      'key-ready': 'innflyttingsklar',
      'off-plan': 'på tegning',
      'sea view': 'havutsikt',
      'pool': 'basseng/svømmebasseng',
      'terrace': 'terrasse',
      'garage': 'garasje',
      'property': 'eiendom/bolig',
    },
    culturalContext: `Norwegian buyers have high purchasing power due to strong Norwegian krone and oil wealth. Compare to Oslo, Bergen, Stavanger property markets where prices are among Europe's highest. Norwegians value 'koselig' (cozy/pleasant) environments and outdoor living. The Norwegian community in Spain is well-established — Alfaz del Pi has been called 'Little Norway' with 5,000+ Norwegian residents. Reference the Norwegian cultural center and Scandinavian social infrastructure.`,
    priceComparisons: `Compare to Oslo (€7,000-12,000/m²), Bergen, Stavanger. A luxury Costa Blanca villa for €500K = a small leilighet in Oslo sentrum. Norwegian dokumentavgift (stamp duty, 2.5%) similar to Spanish costs. Strong NOK makes Spanish property very attractive value.`,
    flightInfo: `Norwegian Air, SAS, and Ryanair fly direct from Oslo Gardermoen, Bergen Flesland, and Stavanger Sola to Alicante (3.5-4h). Year-round service with increased frequency in winter. Budget flights from €50 one-way.`,
    communityInfo: `Alfaz del Pi is 'Little Norway' — 5,000+ Norwegian residents with Norwegian cultural center, Norwegian school, Scandinavian health center. La Nucia, Benidorm, and Altea also have strong Norwegian presence. Norwegian church services, social clubs, and complete Norwegian-speaking service infrastructure. Annual Norwegian Constitution Day (17. mai) celebrations are legendary on Costa Blanca.`,
    buyerMotivations: `Escaping long, dark Norwegian winters (mørketid), leveraging strong Norwegian economy for Spanish value, retirement planning, friluftsliv (outdoor living) year-round, established Norwegian community providing easy integration, rental income from fellow Scandinavians.`,
  },
  pl: {
    code: 'pl',
    name: 'Polish',
    nativeName: 'Polski',
    formal: true,
    realEstateTerms: {
      'new build': 'nowe budownictwo / nowy budynek',
      'apartment': 'mieszkanie',
      'villa': 'willa',
      'townhouse': 'dom szeregowy',
      'penthouse': 'penthouse/apartament na ostatnim piętrze',
      'key-ready': 'gotowy do zamieszkania',
      'off-plan': 'na etapie budowy / z planu',
      'sea view': 'widok na morze',
      'pool': 'basen',
      'terrace': 'taras',
      'garage': 'garaż',
      'property': 'nieruchomość',
    },
    culturalContext: `Polish buyers represent a rapidly growing segment. With Poland's strong economic growth, more Poles can afford second homes abroad. Compare to Warsaw, Kraków, Wrocław, and Gdańsk property markets. Polish buyers value solid construction, practical layouts, and investment potential. Reference the growing Polish community on Costa Blanca. Polish buyers often seek properties that combine holiday use with rental income potential. Mention that Spain has become the new 'Polish Riviera' replacing Croatian coast.`,
    priceComparisons: `Compare to Warsaw (€3,000-5,000/m²), Kraków, Wrocław. A Costa Blanca apartment for €150K = price of a kawalerka (studio) in Warsaw centrum. Spanish property offers dramatically better value per m² with Mediterranean climate. Polish PCC tax (2%) vs Spanish ITP (10%), but overall value proposition strongly favors Spain.`,
    flightInfo: `Ryanair and Wizz Air fly direct from Warsaw Chopin/Modlin, Kraków, Wrocław, Gdańsk, Katowice, and Poznań to Alicante (3.5h). Very affordable flights from €20-40 one-way. Year-round service with multiple weekly departures from major Polish cities.`,
    communityInfo: `Growing Polish community on Costa Blanca, particularly in Torrevieja, Benidorm, and Alicante city. Polish shops, Polish-speaking doctors and lawyers increasingly available. Polish Catholic church services. The community is younger and more dynamic than some established Northern European groups, with many Polish entrepreneurs establishing businesses on the coast.`,
    buyerMotivations: `Investment diversification beyond Polish złoty, Mediterranean lifestyle aspiration, affordable luxury compared to Poland, rental income in euros, growing economic confidence, family holiday destination, retirement planning for the future.`,
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    formal: true,
    realEstateTerms: {
      'new build': 'новостройка',
      'apartment': 'квартира',
      'villa': 'вилла',
      'townhouse': 'таунхаус',
      'penthouse': 'пентхаус',
      'key-ready': 'готов к заселению',
      'off-plan': 'на стадии строительства',
      'sea view': 'вид на море',
      'pool': 'бассейн',
      'terrace': 'терраса',
      'garage': 'гараж',
      'property': 'недвижимость',
    },
    culturalContext: `Russian-speaking buyers (including from CIS countries) value prestige, security, and quality. Compare to Moscow, Saint Petersburg, Sochi property markets. Russian buyers often seek turnkey luxury properties with premium finishes. Reference the Russian-speaking community on Costa Blanca, Russian-language services, and the established infrastructure for Russian residents. Mention Mediterranean climate advantages compared to Russian winters. Note: Golden Visa program changes are relevant context.`,
    priceComparisons: `Compare to Moscow (€4,000-8,000/m² in good districts), Saint Petersburg, Sochi (€2,000-4,000/m² near coast). Costa Blanca offers comparable seaside luxury at competitive prices with added benefits of EU location, stable legal system, and Mediterranean climate. Consider currency (EUR vs RUB) implications.`,
    flightInfo: `Direct flights from major Russian cities to Alicante available seasonally. Charter flights during summer season. Year-round connections via Istanbul, Madrid, or Barcelona with Turkish Airlines, Iberia, or Aeroflot. Flight time approximately 4-5 hours direct.`,
    communityInfo: `Russian-speaking community established in Torrevieja, Benidorm, Calpe, and Alicante. Russian shops, restaurants, cultural centers. Russian-speaking medical services, legal assistance, and real estate agencies. Russian Orthodox church services available. International schools accepting Russian-speaking students.`,
    buyerMotivations: `Mediterranean lifestyle and climate, investment in stable EU property market, Golden Visa opportunities (note: program changes), prestige residence, children's education in Europe, diversification of assets, quality of life improvement compared to harsh winters.`,
  },
};

// ─── Command Line Arguments ───────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  return {
    lang: args.find(a => a.startsWith('--lang='))?.split('=')[1] || 'all',
    limit: parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '0') || 0,
    ref: args.find(a => a.startsWith('--ref='))?.split('=')[1] || '',
    type: args.find(a => a.startsWith('--type='))?.split('=')[1] || 'properties', // properties or articles
    force: args.includes('--force'),
    help: args.includes('--help'),
  };
}

const options = parseArgs();

if (options.help) {
  console.log(`
Multi-Language Culturally-Adapted Content Generator

Usage: npx tsx src/scripts/generate-translated-content.ts [options]

Options:
  --lang=CODE    Language code (sv, de, nl, nl-be, fr, no, pl, ru) or 'all'
  --type=TYPE    Content type: 'properties' or 'articles' (default: properties)
  --limit=N      Limit number of items to generate (0 = no limit)
  --ref=REF      Generate for specific property reference only
  --force        Regenerate even if translation already exists
  --help         Show this help

Examples:
  npx tsx src/scripts/generate-translated-content.ts --lang=sv --type=properties
  npx tsx src/scripts/generate-translated-content.ts --lang=all --type=articles
  npx tsx src/scripts/generate-translated-content.ts --lang=de --limit=50
  npx tsx src/scripts/generate-translated-content.ts --lang=nl --ref=N12345
`);
  process.exit(0);
}

// ─── Content Directories ──────────────────────────────────────────────────
const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');
const DEVELOPMENTS_DIR = path.join(CONTENT_DIR, 'developments'); // English AI property content
const ARTICLES_DIR = path.join(CONTENT_DIR, 'articles'); // English blog articles

function ensureDirs(langCode: string) {
  const dirs = [
    path.join(DEVELOPMENTS_DIR, langCode),
    path.join(ARTICLES_DIR, langCode),
  ];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
}

// ─── JSON Parsing Helper ──────────────────────────────────────────────────
function parseAIJson(text: string): any {
  let jsonStr = '';
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) jsonStr = codeBlockMatch[1].trim();
  if (!jsonStr || !jsonStr.startsWith('{')) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');
    jsonStr = jsonMatch[0];
  }
  // Fix common LLM JSON issues
  jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');
  jsonStr = jsonStr.replace(/[\u201C\u201D]/g, '\\"');
  jsonStr = jsonStr.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ');
  return JSON.parse(jsonStr);
}

// ─── Sleep ────────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// ─── Property Content Generation ──────────────────────────────────────────
async function generatePropertyTranslation(
  englishContent: any,
  langConfig: LanguageConfig,
): Promise<any> {
  const prompt = `You are a ${langConfig.nativeName}-speaking real estate expert writing property content for Costa Blanca, Spain. Generate culturally-adapted content for ${langConfig.name}-speaking buyers.

CRITICAL: This is NOT a translation. You are creating ORIGINAL content in ${langConfig.nativeName} that speaks directly to ${langConfig.name} buyers. Use cultural references, price comparisons, and motivations specific to ${langConfig.name} buyers.

LANGUAGE & STYLE:
- Write entirely in ${langConfig.nativeName}
- ${langConfig.formal ? 'Use formal address (Sie/u/vous/Вы/Pan/Pani)' : 'Use informal address (du/je/tu)'}
- Use proper ${langConfig.name} real estate terminology: ${Object.entries(langConfig.realEstateTerms).map(([en, local]) => `${en} = ${local}`).join(', ')}
- Sound like a native ${langConfig.name} real estate professional, NOT a translation

CULTURAL ADAPTATION REQUIREMENTS:
${langConfig.culturalContext}

PRICE COMPARISONS (weave naturally into text):
${langConfig.priceComparisons}

FLIGHT/TRAVEL INFO (mention where relevant):
${langConfig.flightInfo}

COMMUNITY INFO (include where natural):
${langConfig.communityInfo}

BUYER MOTIVATIONS (tap into these):
${langConfig.buyerMotivations}

ENGLISH SOURCE CONTENT (use as factual basis, but rewrite for ${langConfig.name} audience):
${JSON.stringify(englishContent, null, 2)}

RESPOND WITH ONLY VALID JSON in the exact same structure as the source content, but with all text values in ${langConfig.nativeName}. Keep these fields unchanged: slug, reference, source, town, generatedAt, images array, any URLs. Translate/adapt all descriptive text fields.`;

  const response = await anthropic.messages.create({
    model: AI_MODEL,
    max_tokens: 6000,
    system: `You are a JSON generator that creates culturally-adapted real estate content. Respond with ONLY valid JSON. No markdown, no code blocks, no explanatory text. Start with { and end with }.`,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  return parseAIJson(text);
}

// ─── Article Content Generation ───────────────────────────────────────────
async function generateArticleTranslation(
  article: any,
  langConfig: LanguageConfig,
): Promise<any> {
  // Category translations per language
  const categoryMap: Record<string, Record<string, string>> = {
    sv: { 'Investment': 'Investering', 'Area Guide': 'Områdesguide', 'Buyer\'s Guide': 'Köparguide', 'Lifestyle': 'Livsstil', 'Travel': 'Resor', 'Legal Guide': 'Juridisk guide', 'Market Report': 'Marknadsrapport', 'Property Guide': 'Fastighetsguide', 'Super Guide': 'Superguide', 'Top 10': 'Topp 10', 'Expat Guide': 'Expat-guide' },
    de: { 'Investment': 'Investition', 'Area Guide': 'Gebietsführer', 'Buyer\'s Guide': 'Käuferleitfaden', 'Lifestyle': 'Lebensstil', 'Travel': 'Reisen', 'Legal Guide': 'Rechtsratgeber', 'Market Report': 'Marktbericht', 'Property Guide': 'Immobilienführer', 'Super Guide': 'Komplettführer', 'Top 10': 'Top 10', 'Expat Guide': 'Auswanderer-Guide' },
    nl: { 'Investment': 'Investering', 'Area Guide': 'Gebiedsgids', 'Buyer\'s Guide': 'Koopgids', 'Lifestyle': 'Levensstijl', 'Travel': 'Reizen', 'Legal Guide': 'Juridische gids', 'Market Report': 'Marktrapport', 'Property Guide': 'Vastgoedgids', 'Super Guide': 'Complete gids', 'Top 10': 'Top 10', 'Expat Guide': 'Expat-gids' },
    'nl-be': { 'Investment': 'Investering', 'Area Guide': 'Gebiedsgids', 'Buyer\'s Guide': 'Koopgids', 'Lifestyle': 'Levensstijl', 'Travel': 'Reizen', 'Legal Guide': 'Juridische gids', 'Market Report': 'Marktrapport', 'Property Guide': 'Vastgoedgids', 'Super Guide': 'Complete gids', 'Top 10': 'Top 10', 'Expat Guide': 'Expat-gids' },
    fr: { 'Investment': 'Investissement', 'Area Guide': 'Guide de la région', 'Buyer\'s Guide': 'Guide de l\'acheteur', 'Lifestyle': 'Art de vivre', 'Travel': 'Voyages', 'Legal Guide': 'Guide juridique', 'Market Report': 'Rapport de marché', 'Property Guide': 'Guide immobilier', 'Super Guide': 'Guide complet', 'Top 10': 'Top 10', 'Expat Guide': 'Guide expatrié' },
    no: { 'Investment': 'Investering', 'Area Guide': 'Områdeguide', 'Buyer\'s Guide': 'Kjøperguide', 'Lifestyle': 'Livsstil', 'Travel': 'Reise', 'Legal Guide': 'Juridisk guide', 'Market Report': 'Markedsrapport', 'Property Guide': 'Eiendomsguide', 'Super Guide': 'Komplett guide', 'Top 10': 'Topp 10', 'Expat Guide': 'Expat-guide' },
    pl: { 'Investment': 'Inwestycje', 'Area Guide': 'Przewodnik po okolicy', 'Buyer\'s Guide': 'Poradnik kupującego', 'Lifestyle': 'Styl życia', 'Travel': 'Podróże', 'Legal Guide': 'Poradnik prawny', 'Market Report': 'Raport rynkowy', 'Property Guide': 'Przewodnik nieruchomości', 'Super Guide': 'Kompletny przewodnik', 'Top 10': 'Top 10', 'Expat Guide': 'Przewodnik dla expatów' },
    ru: { 'Investment': 'Инвестиции', 'Area Guide': 'Путеводитель по региону', 'Buyer\'s Guide': 'Руководство покупателя', 'Lifestyle': 'Образ жизни', 'Travel': 'Путешествия', 'Legal Guide': 'Юридический справочник', 'Market Report': 'Обзор рынка', 'Property Guide': 'Гид по недвижимости', 'Super Guide': 'Полный гид', 'Top 10': 'Топ-10', 'Expat Guide': 'Гид для экспатов' },
  };

  const translatedCategory = categoryMap[langConfig.code]?.[article.category] || article.category;

  const prompt = `You are a ${langConfig.nativeName}-speaking real estate content writer. Create a culturally-adapted version of this Costa Blanca property article for ${langConfig.name}-speaking readers.

CRITICAL: This is NOT a direct translation. Adapt the content culturally:
- ${langConfig.formal ? 'Use formal address' : 'Use informal address (du/je/tu)'}
- Use ${langConfig.name} real estate terminology
- Add price comparisons to ${langConfig.name} markets where relevant
- Mention flight connections from ${langConfig.name} cities
- Reference the ${langConfig.name} community on Costa Blanca
- Make it feel like it was written BY a ${langConfig.name} real estate expert FOR ${langConfig.name} readers

${langConfig.culturalContext}

FLIGHT INFO: ${langConfig.flightInfo}
COMMUNITY: ${langConfig.communityInfo}

The translated category should be: "${translatedCategory}"

SOURCE ARTICLE (English):
${JSON.stringify(article, null, 2)}

RULES:
- Keep EXACTLY the same JSON structure
- Keep slug, relatedAreas, image, publishedAt, updatedAt UNCHANGED
- Translate/adapt: title, excerpt, content.quickAnswer, content.intro, all section titles and content, content.conclusion, tags
- Keep the category as: "${translatedCategory}"
- Add a "language" field with value "${langConfig.code}"

Respond with ONLY valid JSON.`;

  const response = await anthropic.messages.create({
    model: AI_MODEL,
    max_tokens: 8192,
    system: `You are a JSON generator creating culturally-adapted real estate content in ${langConfig.nativeName}. Respond with ONLY valid JSON. No markdown, no code blocks. Start with { end with }.`,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const result = parseAIJson(text);

  // Ensure critical fields are preserved
  result.slug = article.slug;
  result.relatedAreas = article.relatedAreas;
  result.image = article.image;
  result.publishedAt = article.publishedAt;
  result.updatedAt = article.updatedAt;
  result.language = langConfig.code;
  result.category = translatedCategory;

  return result;
}

// ─── Main Execution ───────────────────────────────────────────────────────
async function main() {
  console.log('\n🌍 Multi-Language Content Generator');
  console.log('====================================\n');

  const langsToProcess = options.lang === 'all'
    ? Object.keys(LANGUAGES)
    : [options.lang];

  // Validate languages
  for (const lang of langsToProcess) {
    if (!LANGUAGES[lang]) {
      console.error(`❌ Unknown language: ${lang}`);
      console.error(`   Available: ${Object.keys(LANGUAGES).join(', ')}`);
      process.exit(1);
    }
  }

  console.log(`Languages: ${langsToProcess.join(', ')}`);
  console.log(`Type: ${options.type}`);
  console.log(`Limit: ${options.limit || 'none'}`);
  console.log(`Force: ${options.force}\n`);

  let totalGenerated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const langCode of langsToProcess) {
    const langConfig = LANGUAGES[langCode];
    ensureDirs(langCode);

    console.log(`\n🗣️  Processing ${langConfig.name} (${langConfig.nativeName})...\n`);

    if (options.type === 'properties') {
      // ─── Property Content Translation ─────────────────────────────
      const englishFiles = fs.readdirSync(DEVELOPMENTS_DIR)
        .filter(f => f.endsWith('.json') && !fs.statSync(path.join(DEVELOPMENTS_DIR, f)).isDirectory());

      let filesToProcess = englishFiles;

      // Filter by reference if specified
      if (options.ref) {
        const refSlug = options.ref.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        filesToProcess = filesToProcess.filter(f => f.includes(refSlug) || f.includes(options.ref.toLowerCase()));
      }

      // Filter out already translated
      if (!options.force) {
        const translatedDir = path.join(DEVELOPMENTS_DIR, langCode);
        const existing = new Set(fs.readdirSync(translatedDir).filter(f => f.endsWith('.json')));
        const before = filesToProcess.length;
        filesToProcess = filesToProcess.filter(f => !existing.has(f));
        console.log(`   ${before} English files, ${existing.size} already translated, ${filesToProcess.length} to process`);
      }

      // Apply limit
      if (options.limit > 0) {
        filesToProcess = filesToProcess.slice(0, options.limit);
      }

      console.log(`   Generating ${filesToProcess.length} property translations...\n`);

      for (let i = 0; i < filesToProcess.length; i++) {
        const fileName = filesToProcess[i];
        const slug = fileName.replace('.json', '');

        try {
          console.log(`   [${i + 1}/${filesToProcess.length}] ${slug}...`);
          const englishContent = JSON.parse(
            fs.readFileSync(path.join(DEVELOPMENTS_DIR, fileName), 'utf-8')
          );

          const translated = await generatePropertyTranslation(englishContent, langConfig);

          // Preserve reference and metadata
          translated.reference = englishContent.reference || slug;
          translated.source = englishContent.source;
          translated.town = englishContent.town;
          translated.language = langCode;
          translated.generatedAt = new Date().toISOString();

          const outPath = path.join(DEVELOPMENTS_DIR, langCode, fileName);
          fs.writeFileSync(outPath, JSON.stringify(translated, null, 2));
          console.log(`   ✅ Saved ${langCode}/${fileName}`);
          totalGenerated++;

          // Rate limiting
          await sleep(800);
        } catch (error: any) {
          console.error(`   ❌ Error: ${error.message}`);
          totalErrors++;
        }
      }

    } else if (options.type === 'articles') {
      // ─── Article Translation ──────────────────────────────────────
      const englishArticles = fs.readdirSync(ARTICLES_DIR)
        .filter(f => f.endsWith('.json') && !fs.statSync(path.join(ARTICLES_DIR, f)).isDirectory());

      let filesToProcess = englishArticles;

      // Filter out already translated
      if (!options.force) {
        const translatedDir = path.join(ARTICLES_DIR, langCode);
        const existing = new Set(
          fs.existsSync(translatedDir)
            ? fs.readdirSync(translatedDir).filter(f => f.endsWith('.json'))
            : []
        );
        const before = filesToProcess.length;
        filesToProcess = filesToProcess.filter(f => !existing.has(f));
        console.log(`   ${before} English articles, ${existing.size} already translated, ${filesToProcess.length} to process`);
      }

      // Apply limit
      if (options.limit > 0) {
        filesToProcess = filesToProcess.slice(0, options.limit);
      }

      console.log(`   Translating ${filesToProcess.length} articles...\n`);

      for (let i = 0; i < filesToProcess.length; i++) {
        const fileName = filesToProcess[i];
        const slug = fileName.replace('.json', '');

        try {
          console.log(`   [${i + 1}/${filesToProcess.length}] ${slug}...`);
          const article = JSON.parse(
            fs.readFileSync(path.join(ARTICLES_DIR, fileName), 'utf-8')
          );

          const translated = await generateArticleTranslation(article, langConfig);

          const outDir = path.join(ARTICLES_DIR, langCode);
          fs.writeFileSync(path.join(outDir, fileName), JSON.stringify(translated, null, 2));
          console.log(`   ✅ Saved ${langCode}/${fileName}`);
          totalGenerated++;

          await sleep(800);
        } catch (error: any) {
          console.error(`   ❌ Error: ${error.message}`);
          totalErrors++;
        }
      }
    }
  }

  console.log('\n====================================');
  console.log(`✅ Generated: ${totalGenerated}`);
  console.log(`⏭️  Skipped: ${totalSkipped}`);
  console.log(`❌ Errors: ${totalErrors}`);
  console.log('====================================\n');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
