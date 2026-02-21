#!/usr/bin/env node

/**
 * Translate Development Content — Overnight Script
 *
 * Translates all 1,246 development JSON files into 8 languages.
 * Uses Claude API (Haiku for speed/cost).
 *
 * Features:
 * - Skips already-translated files
 * - Batch processing with rate limiting
 * - Progress tracking and resume capability
 * - Validates output JSON
 * - Estimated cost: ~$15-25 for all translations
 * - Estimated time: ~2-3 hours
 *
 * Usage:
 *   node scripts/translate-developments.mjs                    # Translate all
 *   node scripts/translate-developments.mjs --lang=sv          # Single language
 *   node scripts/translate-developments.mjs --lang=sv,de       # Multiple languages
 *   node scripts/translate-developments.mjs --start=100        # Resume from index
 *   node scripts/translate-developments.mjs --dry-run          # Count only
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.join(__dirname, '..', 'src', 'content', 'developments');

// ============================================================
// CONFIG
// ============================================================

const LANG_NAMES = {
  sv: 'Swedish', de: 'German', nl: 'Dutch', 'nl-be': 'Belgian Dutch (Flemish)',
  fr: 'French', no: 'Norwegian', pl: 'Polish', ru: 'Russian'
};

const ALL_LANGS = Object.keys(LANG_NAMES);

// Fields to translate (the rest stay in English — references, slugs, URLs)
const TRANSLATABLE_FIELDS = [
  'metaTitle', 'metaDescription', 'heroIntro', 'areaSection',
  'lifestyleSection', 'investmentSection', 'conclusion'
];

const TRANSLATABLE_NESTED = {
  'propertyFeatures': ['intro', 'features'],
  'lifeAndAmenities': ['intro'],
  'priceComparison': ['verdict'],
  'buyerPersona': ['type', 'perfectFor']
};

// Nested objects with deeper structure
const DEEP_NESTED = ['lifeAndAmenities'];

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const env = {};
  if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...rest] = trimmed.split('=');
        if (key) env[key] = rest.join('=');
      }
    });
  }
  return env;
}

// ============================================================
// TRANSLATION ENGINE
// ============================================================

async function translateWithClaude(apiKey, text, targetLang) {
  const langName = LANG_NAMES[targetLang];

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 8000,
      messages: [{
        role: 'user',
        content: `Translate the following real estate content from English to ${langName}.

RULES:
- Natural, fluent ${langName} — reads like a native speaker wrote it
- Keep place names (Javea, Torrevieja, Costa Blanca, etc.) unchanged
- Keep technical terms (NIE, IBI, SUMA, m², etc.) unchanged
- Keep all numbers, prices (€), percentages unchanged
- Keep markdown formatting unchanged
- Return ONLY valid JSON with identical structure

${text}`
      }]
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API ${response.status}: ${err}`);
  }

  const data = await response.json();
  let result = data.content[0].text.trim();

  // Clean markdown wrapping
  if (result.startsWith('```json')) result = result.slice(7);
  if (result.startsWith('```')) result = result.slice(3);
  if (result.endsWith('```')) result = result.slice(0, -3);
  result = result.trim();

  return JSON.parse(result);
}

function extractTranslatable(article) {
  const chunk = {};

  // Simple text fields
  for (const field of TRANSLATABLE_FIELDS) {
    if (article[field]) chunk[field] = article[field];
  }

  // Location highlights (array of strings)
  if (article.locationHighlights) {
    chunk.locationHighlights = article.locationHighlights;
  }

  // Why buy section (array of strings)
  if (article.whyBuySection) {
    chunk.whyBuySection = article.whyBuySection;
  }

  // Image alts
  if (article.imageAlts) {
    chunk.imageAlts = article.imageAlts;
  }

  // FAQs
  if (article.faqs) {
    chunk.faqs = article.faqs;
  }

  // Nested objects — extract translatable parts
  for (const [key, fields] of Object.entries(TRANSLATABLE_NESTED)) {
    if (article[key]) {
      chunk[key] = {};
      for (const f of fields) {
        if (article[key][f]) chunk[key][f] = article[key][f];
      }
    }
  }

  // Deep nested: lifeAndAmenities has sub-objects with text and keyPoints
  if (article.lifeAndAmenities) {
    const la = article.lifeAndAmenities;
    const translated = { intro: la.intro || '' };

    for (const section of ['healthcare', 'education', 'shopping', 'transport']) {
      if (la[section]) {
        translated[section] = {
          text: la[section].text || '',
          keyPoints: la[section].keyPoints || []
        };
      }
    }
    chunk.lifeAndAmenities = translated;
  }

  // Property features
  if (article.propertyFeatures) {
    chunk.propertyFeatures = {
      intro: article.propertyFeatures.intro || '',
      features: article.propertyFeatures.features || []
    };
  }

  // Price comparison
  if (article.priceComparison) {
    chunk.priceComparison = {
      verdict: article.priceComparison.verdict || ''
    };
  }

  // Buyer persona
  if (article.buyerPersona) {
    chunk.buyerPersona = {
      type: article.buyerPersona.type || '',
      perfectFor: article.buyerPersona.perfectFor || []
    };
  }

  return chunk;
}

function mergeTranslation(original, translated) {
  const result = JSON.parse(JSON.stringify(original)); // deep copy

  // Simple fields
  for (const field of TRANSLATABLE_FIELDS) {
    if (translated[field]) result[field] = translated[field];
  }

  // Arrays
  if (translated.locationHighlights) result.locationHighlights = translated.locationHighlights;
  if (translated.whyBuySection) result.whyBuySection = translated.whyBuySection;
  if (translated.imageAlts) result.imageAlts = translated.imageAlts;
  if (translated.faqs) result.faqs = translated.faqs;

  // Nested objects
  if (translated.propertyFeatures && result.propertyFeatures) {
    result.propertyFeatures.intro = translated.propertyFeatures.intro || result.propertyFeatures.intro;
    result.propertyFeatures.features = translated.propertyFeatures.features || result.propertyFeatures.features;
  }

  if (translated.lifeAndAmenities && result.lifeAndAmenities) {
    const la = translated.lifeAndAmenities;
    if (la.intro) result.lifeAndAmenities.intro = la.intro;
    for (const section of ['healthcare', 'education', 'shopping', 'transport']) {
      if (la[section] && result.lifeAndAmenities[section]) {
        if (la[section].text) result.lifeAndAmenities[section].text = la[section].text;
        if (la[section].keyPoints) result.lifeAndAmenities[section].keyPoints = la[section].keyPoints;
      }
    }
  }

  if (translated.priceComparison && result.priceComparison) {
    result.priceComparison.verdict = translated.priceComparison.verdict || result.priceComparison.verdict;
  }

  if (translated.buyerPersona && result.buyerPersona) {
    result.buyerPersona.type = translated.buyerPersona.type || result.buyerPersona.type;
    result.buyerPersona.perfectFor = translated.buyerPersona.perfectFor || result.buyerPersona.perfectFor;
  }

  return result;
}

// For large articles, split into 2 API calls
async function translateArticle(apiKey, article, targetLang) {
  const translatable = extractTranslatable(article);
  const jsonStr = JSON.stringify(translatable, null, 0);

  if (jsonStr.length < 12000) {
    // Small enough for single call
    const translated = await translateWithClaude(apiKey, JSON.stringify(translatable), targetLang);
    return mergeTranslation(article, translated);
  }

  // Split into two chunks
  const chunk1 = {};
  const chunk2 = {};
  let chunk1Size = 0;

  for (const [key, val] of Object.entries(translatable)) {
    const size = JSON.stringify(val).length;
    if (chunk1Size < 6000) {
      chunk1[key] = val;
      chunk1Size += size;
    } else {
      chunk2[key] = val;
    }
  }

  const t1 = await translateWithClaude(apiKey, JSON.stringify(chunk1), targetLang);
  await sleep(300);
  const t2 = Object.keys(chunk2).length > 0
    ? await translateWithClaude(apiKey, JSON.stringify(chunk2), targetLang)
    : {};

  return mergeTranslation(article, { ...t1, ...t2 });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  const args = process.argv.slice(2);
  const langArg = args.find(a => a.startsWith('--lang='))?.split('=')[1];
  const startIdx = parseInt(args.find(a => a.startsWith('--start='))?.split('=')[1] || '0');
  const dryRun = args.includes('--dry-run');

  const langs = langArg ? langArg.split(',') : ALL_LANGS;
  const env = loadEnv();
  const apiKey = env.ANTHROPIC_API_KEY;

  if (!apiKey && !dryRun) {
    console.error('ERROR: No ANTHROPIC_API_KEY in .env.local');
    process.exit(1);
  }

  // Get all development files
  const files = fs.readdirSync(BASE_DIR)
    .filter(f => f.endsWith('.json'))
    .sort();

  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   DEVELOPMENT TRANSLATION SCRIPT                ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log();
  console.log(`Developments: ${files.length}`);
  console.log(`Languages: ${langs.join(', ')}`);
  console.log(`Starting from index: ${startIdx}`);

  // Count what needs translating
  let totalNeeded = 0;
  let totalExisting = 0;

  for (const lang of langs) {
    const langDir = path.join(BASE_DIR, lang);
    let existing = 0;
    if (fs.existsSync(langDir)) {
      existing = fs.readdirSync(langDir).filter(f => f.endsWith('.json')).length;
    }
    const needed = files.length - existing;
    totalNeeded += needed;
    totalExisting += existing;
    console.log(`  ${lang}: ${existing} exist, ${needed} needed`);
  }

  console.log();
  console.log(`Total: ${totalExisting} exist, ${totalNeeded} to translate`);
  console.log(`Estimated API calls: ${totalNeeded} (${totalNeeded > 0 ? '~' + Math.ceil(totalNeeded * 1.3) : 0} with splits)`);
  console.log(`Estimated time: ~${Math.ceil(totalNeeded * 1.5 / 60)} minutes`);
  console.log(`Estimated cost: ~$${(totalNeeded * 0.003).toFixed(2)}`);

  if (dryRun) {
    console.log('\n(Dry run — no translations performed)');
    return;
  }

  console.log('\nStarting in 3 seconds...');
  await sleep(3000);

  let completed = 0;
  let errors = 0;
  const startTime = Date.now();

  for (const lang of langs) {
    const langDir = path.join(BASE_DIR, lang);
    fs.mkdirSync(langDir, { recursive: true });

    console.log(`\n${'─'.repeat(50)}`);
    console.log(`Language: ${lang} (${LANG_NAMES[lang]})`);
    console.log(`${'─'.repeat(50)}`);

    for (let i = startIdx; i < files.length; i++) {
      const file = files[i];
      const outputPath = path.join(langDir, file);

      // Skip if already translated
      if (fs.existsSync(outputPath)) {
        continue;
      }

      const inputPath = path.join(BASE_DIR, file);
      let article;
      try {
        article = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
      } catch (e) {
        console.error(`  Skip ${file}: invalid JSON`);
        errors++;
        continue;
      }

      completed++;
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
      const remaining = totalNeeded - completed;
      const avgTime = completed > 0 ? (Date.now() - startTime) / completed : 2000;
      const eta = Math.ceil(remaining * avgTime / 60000);

      process.stdout.write(`  [${completed}/${totalNeeded}] ${lang}/${file} (${elapsed}s elapsed, ~${eta}min remaining)\r`);

      try {
        const translated = await translateArticle(apiKey, article, lang);

        // Validate
        const jsonStr = JSON.stringify(translated, null, 2);
        JSON.parse(jsonStr); // Verify valid JSON

        fs.writeFileSync(outputPath, jsonStr, 'utf8');
        console.log(`  ✓ [${completed}/${totalNeeded}] ${lang}/${file}`);
      } catch (e) {
        console.error(`  ✗ [${completed}/${totalNeeded}] ${lang}/${file}: ${e.message}`);
        errors++;

        // If rate limited, wait longer
        if (e.message.includes('429') || e.message.includes('rate')) {
          console.log('    Rate limited, waiting 30s...');
          await sleep(30000);
        }
      }

      // Rate limiting: ~2 requests/second for Haiku
      await sleep(600);
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  console.log(`\n\n${'═'.repeat(50)}`);
  console.log(`DONE in ${totalTime} minutes`);
  console.log(`  Translated: ${completed - errors}`);
  console.log(`  Errors: ${errors}`);
  console.log(`${'═'.repeat(50)}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
