/**
 * Blog Article Translation Script (ESM / Node.js)
 * Generates culturally-adapted article translations for all languages.
 *
 * Usage: node generate-articles.mjs --lang=sv
 *        node generate-articles.mjs --lang=all --limit=10
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = __dirname;
const ARTICLES_DIR = path.join(PROJECT_DIR, 'src/content/articles');

// Load env
const envPath = path.join(PROJECT_DIR, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  }
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const AI_MODEL = 'claude-haiku-4-5-20251001';

// Cultural context per language
const LANGUAGES = {
  sv: {
    name: 'Swedish', native: 'Svenska', formal: false,
    context: 'Swedish buyers compare to Stockholm/Gothenburg prices. Use du-form. Reference SAS/Norwegian flights from Arlanda (3.5h). Mention Swedish communities in Torrevieja, La Marina, Alfaz del Pi. Swedish church, shops. A €300K villa = a 2-room apartment in Södermalm.',
    categories: { 'Investment': 'Investering', 'Area Guide': 'Områdesguide', "Buyer's Guide": 'Köparguide', 'Lifestyle': 'Livsstil', 'Travel': 'Resor', 'Legal Guide': 'Juridisk guide', 'Market Report': 'Marknadsrapport', 'Property Guide': 'Fastighetsguide', 'Super Guide': 'Superguide', 'Top 10': 'Topp 10', 'Expat Guide': 'Expat-guide' },
  },
  de: {
    name: 'German', native: 'Deutsch', formal: true,
    context: 'German buyers are methodical. Use Sie-form. Compare to Munich (€8-12K/m²), Hamburg, Frankfurt. Reference Ryanair/Eurowings/Lufthansa flights (2.5-3h). German communities in Javea, Calpe, Alfaz del Pi. TÜV-quality analogy for building warranties. Neubau, Immobilie terminology.',
    categories: { 'Investment': 'Investition', 'Area Guide': 'Gebietsführer', "Buyer's Guide": 'Käuferleitfaden', 'Lifestyle': 'Lebensstil', 'Travel': 'Reisen', 'Legal Guide': 'Rechtsratgeber', 'Market Report': 'Marktbericht', 'Property Guide': 'Immobilienführer', 'Super Guide': 'Komplettführer', 'Top 10': 'Top 10', 'Expat Guide': 'Auswanderer-Guide' },
  },
  nl: {
    name: 'Dutch', native: 'Nederlands', formal: false,
    context: 'Dutch buyers are pragmatic. Use je-form. Compare to Amsterdam (€6-10K/m²), Randstad housing crisis. KLM/Transavia from Schiphol (2.5h). 50,000+ Dutch on Costa Blanca. Javea alone has 4,000+ Dutch. Nieuwbouw, vastgoed terminology. Overdrachtsbelasting comparison.',
    categories: { 'Investment': 'Investering', 'Area Guide': 'Gebiedsgids', "Buyer's Guide": 'Koopgids', 'Lifestyle': 'Levensstijl', 'Travel': 'Reizen', 'Legal Guide': 'Juridische gids', 'Market Report': 'Marktrapport', 'Property Guide': 'Vastgoedgids', 'Super Guide': 'Complete gids', 'Top 10': 'Top 10', 'Expat Guide': 'Expat-gids' },
  },
  'nl-be': {
    name: 'Flemish Belgian', native: 'Vlaams', formal: false,
    context: 'Belgian buyers love property (bakstenen in de maag). Compare to Antwerp (€3.5-5K/m²), Brussels. Brussels Airlines/Ryanair from Zaventem/Charleroi (2.5h). Belgian registratierechten (12%) vs Spanish ITP (10%). Belgian communities throughout Costa Blanca.',
    categories: { 'Investment': 'Investering', 'Area Guide': 'Gebiedsgids', "Buyer's Guide": 'Koopgids', 'Lifestyle': 'Levensstijl', 'Travel': 'Reizen', 'Legal Guide': 'Juridische gids', 'Market Report': 'Marktrapport', 'Property Guide': 'Vastgoedgids', 'Super Guide': 'Complete gids', 'Top 10': 'Top 10', 'Expat Guide': 'Expat-gids' },
  },
  fr: {
    name: 'French', native: 'Français', formal: true,
    context: 'French buyers compare to Côte d\'Azur. Use vous-form. Compare to Nice (€5-15K/m²), Paris. Ryanair/Vueling from Paris/Lyon (2h). Programme neuf, VEFA familiar concepts. Growing French community. Art de vivre, gastronomy appreciation.',
    categories: { 'Investment': 'Investissement', 'Area Guide': 'Guide de la région', "Buyer's Guide": "Guide de l'acheteur", 'Lifestyle': 'Art de vivre', 'Travel': 'Voyages', 'Legal Guide': 'Guide juridique', 'Market Report': 'Rapport de marché', 'Property Guide': 'Guide immobilier', 'Super Guide': 'Guide complet', 'Top 10': 'Top 10', 'Expat Guide': 'Guide expatrié' },
  },
  no: {
    name: 'Norwegian', native: 'Norsk', formal: false,
    context: 'Norwegian buyers have strong purchasing power. Use du-form. Compare to Oslo (€7-12K/m²), Bergen. Norwegian Air/SAS from Gardermoen (3.5h). Alfaz del Pi = Little Norway (5,000+ Norwegians). 17. mai celebrations. Nybygg, eiendom terminology.',
    categories: { 'Investment': 'Investering', 'Area Guide': 'Områdeguide', "Buyer's Guide": 'Kjøperguide', 'Lifestyle': 'Livsstil', 'Travel': 'Reise', 'Legal Guide': 'Juridisk guide', 'Market Report': 'Markedsrapport', 'Property Guide': 'Eiendomsguide', 'Super Guide': 'Komplett guide', 'Top 10': 'Topp 10', 'Expat Guide': 'Expat-guide' },
  },
  pl: {
    name: 'Polish', native: 'Polski', formal: true,
    context: 'Polish buyers are growing segment. Use Pan/Pani form. Compare to Warsaw (€3-5K/m²), Kraków. Ryanair/Wizz Air from Warsaw/Kraków/Wrocław (3.5h, from €20). Growing Polish community in Torrevieja, Benidorm. Nowe budownictwo, nieruchomość terminology.',
    categories: { 'Investment': 'Inwestycje', 'Area Guide': 'Przewodnik po okolicy', "Buyer's Guide": 'Poradnik kupującego', 'Lifestyle': 'Styl życia', 'Travel': 'Podróże', 'Legal Guide': 'Poradnik prawny', 'Market Report': 'Raport rynkowy', 'Property Guide': 'Przewodnik nieruchomości', 'Super Guide': 'Kompletny przewodnik', 'Top 10': 'Top 10', 'Expat Guide': 'Przewodnik dla expatów' },
  },
  ru: {
    name: 'Russian', native: 'Русский', formal: true,
    context: 'Russian-speaking buyers value prestige and security. Use Вы-form. Compare to Moscow (€4-8K/m²), Saint Petersburg. Direct/connecting flights 4-5h. Russian community in Torrevieja, Benidorm, Calpe. Новостройка, недвижимость terminology. Golden Visa context.',
    categories: { 'Investment': 'Инвестиции', 'Area Guide': 'Путеводитель по региону', "Buyer's Guide": 'Руководство покупателя', 'Lifestyle': 'Образ жизни', 'Travel': 'Путешествия', 'Legal Guide': 'Юридический справочник', 'Market Report': 'Обзор рынка', 'Property Guide': 'Гид по недвижимости', 'Super Guide': 'Полный гид', 'Top 10': 'Топ-10', 'Expat Guide': 'Гид для экспатов' },
  },
};

// Parse args
const args = process.argv.slice(2);
const langArg = (args.find(a => a.startsWith('--lang='))?.split('=')[1]) || 'all';
const limitArg = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '0') || 0;
const forceArg = args.includes('--force');

const sleep = ms => new Promise(r => setTimeout(r, ms));

function parseAIJson(text) {
  let jsonStr = '';
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) jsonStr = codeBlockMatch[1].trim();
  if (!jsonStr || !jsonStr.startsWith('{')) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');
    jsonStr = jsonMatch[0];
  }
  jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');
  jsonStr = jsonStr.replace(/[\u201C\u201D]/g, '\\"');
  jsonStr = jsonStr.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ');
  return JSON.parse(jsonStr);
}

async function translateArticle(article, langConfig, langCode) {
  const translatedCategory = langConfig.categories[article.category] || article.category;

  const prompt = `You are a ${langConfig.native}-speaking real estate content writer. Create a culturally-adapted version of this Costa Blanca property article for ${langConfig.name}-speaking readers.

CRITICAL: NOT a direct translation. Adapt culturally:
- ${langConfig.formal ? 'Use formal address' : 'Use informal address (du/je/tu)'}
- ${langConfig.context}

The translated category should be: "${translatedCategory}"

SOURCE ARTICLE (English):
${JSON.stringify(article, null, 2)}

RULES:
- Keep EXACTLY the same JSON structure
- Keep slug, relatedAreas, image, publishedAt, updatedAt UNCHANGED
- Translate/adapt: title, excerpt, content.quickAnswer, content.intro, all section titles and content, content.conclusion, tags
- Category: "${translatedCategory}"
- Add "language": "${langCode}"

Respond with ONLY valid JSON.`;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await anthropic.messages.create({
        model: AI_MODEL,
        max_tokens: 8192,
        system: `You are a JSON generator creating culturally-adapted real estate content in ${langConfig.native}. Respond with ONLY valid JSON. No markdown. Start with { end with }.`,
        messages: [{ role: 'user', content: prompt }],
      });

      const text = response.content[0].type === 'text' ? response.content[0].text : '';
      const result = parseAIJson(text);

      // Preserve critical fields
      result.slug = article.slug;
      result.relatedAreas = article.relatedAreas;
      result.image = article.image;
      result.publishedAt = article.publishedAt;
      result.updatedAt = article.updatedAt;
      result.language = langCode;
      result.category = translatedCategory;

      return result;
    } catch (error) {
      if (attempt < 2) {
        console.log(`   ⚠️ Retry ${attempt + 1}: ${error.message}`);
        await sleep(2000);
      } else {
        throw error;
      }
    }
  }
}

async function main() {
  console.log('\n🌍 Article Translation Generator\n');

  const langsToProcess = langArg === 'all' ? Object.keys(LANGUAGES) : [langArg];

  let totalGenerated = 0;
  let totalErrors = 0;

  for (const langCode of langsToProcess) {
    const langConfig = LANGUAGES[langCode];
    if (!langConfig) { console.error(`Unknown language: ${langCode}`); continue; }

    const outDir = path.join(ARTICLES_DIR, langCode);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    // Get English articles
    const englishFiles = fs.readdirSync(ARTICLES_DIR)
      .filter(f => f.endsWith('.json') && !fs.statSync(path.join(ARTICLES_DIR, f)).isDirectory());

    // Filter out already translated
    let filesToProcess = englishFiles;
    if (!forceArg) {
      const existing = new Set(fs.readdirSync(outDir).filter(f => f.endsWith('.json')));
      filesToProcess = filesToProcess.filter(f => !existing.has(f));
    }

    if (limitArg > 0) filesToProcess = filesToProcess.slice(0, limitArg);

    console.log(`🗣️  ${langConfig.name}: ${filesToProcess.length} articles to translate\n`);

    for (let i = 0; i < filesToProcess.length; i++) {
      const fileName = filesToProcess[i];
      const slug = fileName.replace('.json', '');

      try {
        console.log(`   [${i + 1}/${filesToProcess.length}] ${slug}...`);
        const article = JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, fileName), 'utf-8'));
        const translated = await translateArticle(article, langConfig, langCode);
        fs.writeFileSync(path.join(outDir, fileName), JSON.stringify(translated, null, 2));
        console.log(`   ✅ ${langCode}/${slug}`);
        totalGenerated++;
        await sleep(600); // Rate limiting
      } catch (error) {
        console.error(`   ❌ ${slug}: ${error.message}`);
        totalErrors++;
      }
    }

    console.log(`\n   ${langConfig.name} done: ${totalGenerated} generated, ${totalErrors} errors\n`);
  }

  console.log(`\n🏁 Total: ${totalGenerated} generated, ${totalErrors} errors\n`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
