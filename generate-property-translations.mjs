/**
 * Property Content Translation Script (ESM / Node.js)
 * Generates culturally-adapted property descriptions for all languages.
 *
 * Usage: node generate-property-translations.mjs --lang=sv
 *        node generate-property-translations.mjs --lang=all --limit=50
 *        node generate-property-translations.mjs --lang=de --ref=n12345
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEVELOPMENTS_DIR = path.join(__dirname, 'src/content/developments');

// Load env
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  }
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const AI_MODEL = 'claude-haiku-4-5-20251001';

// Cultural context per language (same as article script)
const LANGUAGES = {
  sv: {
    name: 'Swedish', native: 'Svenska', formal: false,
    context: 'Swedish buyers compare to Stockholm/Gothenburg prices. Use du-form. Reference SAS/Norwegian flights from Arlanda (3.5h). Mention Swedish communities in Torrevieja, La Marina, Alfaz del Pi. A €300K villa = a 2-room apartment in Södermalm. Use terms: nybygge, lägenhet, villa, radhus, inflyttningsklart, havsutsikt.',
  },
  de: {
    name: 'German', native: 'Deutsch', formal: true,
    context: 'German buyers are methodical. Use Sie-form. Compare to Munich (€8-12K/m²), Hamburg, Frankfurt. Reference Ryanair/Eurowings/Lufthansa flights (2.5-3h). German communities in Javea, Calpe, Alfaz del Pi. Use terms: Neubau, Wohnung, Villa, Reihenhaus, bezugsfertig, Meerblick, Immobilie.',
  },
  nl: {
    name: 'Dutch', native: 'Nederlands', formal: false,
    context: 'Dutch buyers are pragmatic. Use je-form. Compare to Amsterdam (€6-10K/m²), Randstad housing crisis. KLM/Transavia from Schiphol (2.5h). 50,000+ Dutch on Costa Blanca. Use terms: nieuwbouw, appartement, villa, instapklaar, zeezicht, zwembad, vastgoed.',
  },
  'nl-be': {
    name: 'Flemish Belgian', native: 'Vlaams', formal: false,
    context: 'Belgian buyers love property (bakstenen in de maag). Compare to Antwerp (€3.5-5K/m²). Brussels Airlines/Ryanair from Zaventem (2.5h). Belgian registratierechten (12%) vs Spanish ITP (10%). Use terms: nieuwbouw, appartement, villa, instapklaar, zeezicht, eigendom.',
  },
  fr: {
    name: 'French', native: 'Français', formal: true,
    context: 'French buyers compare to Côte d\'Azur. Use vous-form. Compare to Nice (€5-15K/m²), Paris. Ryanair/Vueling from Paris (2h). Programme neuf, VEFA familiar concepts. Use terms: construction neuve, appartement, villa, clé en main, vue mer, piscine, bien immobilier.',
  },
  no: {
    name: 'Norwegian', native: 'Norsk', formal: false,
    context: 'Norwegian buyers have strong purchasing power. Use du-form. Compare to Oslo (€7-12K/m²). Norwegian Air/SAS from Gardermoen (3.5h). Alfaz del Pi = Little Norway. Use terms: nybygg, leilighet, villa/enebolig, innflyttingsklar, havutsikt, basseng, eiendom.',
  },
  pl: {
    name: 'Polish', native: 'Polski', formal: true,
    context: 'Polish buyers are growing segment. Use Pan/Pani form. Compare to Warsaw (€3-5K/m²). Ryanair/Wizz Air from Warsaw/Kraków (3.5h, from €20). Growing Polish community in Torrevieja. Use terms: nowe budownictwo, mieszkanie, willa, gotowy do zamieszkania, widok na morze, nieruchomość.',
  },
  ru: {
    name: 'Russian', native: 'Русский', formal: true,
    context: 'Russian-speaking buyers value prestige. Use Вы-form. Compare to Moscow (€4-8K/m²). Russian community in Torrevieja, Benidorm. Use terms: новостройка, квартира, вилла, готов к заселению, вид на море, бассейн, недвижимость.',
  },
};

const args = process.argv.slice(2);
const langArg = (args.find(a => a.startsWith('--lang='))?.split('=')[1]) || 'all';
const limitArg = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '0') || 0;
const refArg = args.find(a => a.startsWith('--ref='))?.split('=')[1] || '';
const forceArg = args.includes('--force');

const sleep = ms => new Promise(r => setTimeout(r, ms));

function parseAIJson(text) {
  let jsonStr = '';
  const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (m) jsonStr = m[1].trim();
  if (!jsonStr || !jsonStr.startsWith('{')) {
    const m2 = text.match(/\{[\s\S]*\}/);
    if (!m2) throw new Error('No JSON found');
    jsonStr = m2[0];
  }
  jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');
  jsonStr = jsonStr.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ');
  return JSON.parse(jsonStr);
}

async function translateProperty(content, langConfig, langCode) {
  const prompt = `You are a ${langConfig.native}-speaking real estate expert writing property content for Costa Blanca, Spain.

CRITICAL: Create ORIGINAL content in ${langConfig.native} that speaks directly to ${langConfig.name} buyers. NOT a translation — culturally adapted.

${langConfig.context}

SOURCE CONTENT (use as factual basis):
${JSON.stringify(content, null, 2)}

Keep unchanged: slug, reference, source, town, generatedAt, images, any URLs.
Translate/adapt ALL text fields (metaTitle, metaDescription, heroIntro, locationSection, faqs, whyBuySection, etc.)

Respond with ONLY valid JSON, same structure.`;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await anthropic.messages.create({
        model: AI_MODEL,
        max_tokens: 6000,
        system: `JSON generator for ${langConfig.native} real estate content. ONLY valid JSON output.`,
        messages: [{ role: 'user', content: prompt }],
      });
      const text = response.content[0].type === 'text' ? response.content[0].text : '';
      const result = parseAIJson(text);
      result.language = langCode;
      result.generatedAt = new Date().toISOString();
      return result;
    } catch (error) {
      if (attempt < 2) { console.log(`   ⚠️ Retry: ${error.message}`); await sleep(2000); }
      else throw error;
    }
  }
}

async function main() {
  console.log('\n🏠 Property Content Translation Generator\n');

  const langsToProcess = langArg === 'all' ? Object.keys(LANGUAGES) : [langArg];
  let totalGenerated = 0, totalErrors = 0;

  for (const langCode of langsToProcess) {
    const langConfig = LANGUAGES[langCode];
    if (!langConfig) { console.error(`Unknown: ${langCode}`); continue; }

    const outDir = path.join(DEVELOPMENTS_DIR, langCode);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    // Get English property content files (not directories)
    let englishFiles = fs.readdirSync(DEVELOPMENTS_DIR)
      .filter(f => f.endsWith('.json') && fs.statSync(path.join(DEVELOPMENTS_DIR, f)).isFile());

    // Filter by ref if specified
    if (refArg) {
      const refSlug = refArg.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      englishFiles = englishFiles.filter(f => f.includes(refSlug));
    }

    // Skip already translated
    if (!forceArg) {
      const existing = new Set(fs.readdirSync(outDir).filter(f => f.endsWith('.json')));
      const before = englishFiles.length;
      englishFiles = englishFiles.filter(f => !existing.has(f));
      console.log(`${langConfig.name}: ${before} total, ${existing.size} done, ${englishFiles.length} remaining`);
    }

    if (limitArg > 0) englishFiles = englishFiles.slice(0, limitArg);

    console.log(`🗣️  ${langConfig.name}: translating ${englishFiles.length} properties\n`);

    for (let i = 0; i < englishFiles.length; i++) {
      const fileName = englishFiles[i];
      try {
        process.stdout.write(`   [${i + 1}/${englishFiles.length}] ${fileName.replace('.json', '')}...`);
        const content = JSON.parse(fs.readFileSync(path.join(DEVELOPMENTS_DIR, fileName), 'utf-8'));
        const translated = await translateProperty(content, langConfig, langCode);
        // Preserve key fields
        translated.reference = content.reference;
        translated.source = content.source;
        translated.town = content.town;
        translated.slug = content.slug;
        fs.writeFileSync(path.join(outDir, fileName), JSON.stringify(translated, null, 2));
        console.log(' ✅');
        totalGenerated++;
        await sleep(600);
      } catch (error) {
        console.log(` ❌ ${error.message}`);
        totalErrors++;
      }
    }
    console.log('');
  }

  console.log(`\n🏁 Total: ${totalGenerated} generated, ${totalErrors} errors\n`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
