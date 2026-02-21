#!/usr/bin/env node

/**
 * Translate Builder Content — Overnight Script
 *
 * Translates all 193 builder JSON files into 8 languages.
 * Uses Claude API (Haiku for speed/cost).
 *
 * Usage:
 *   node scripts/translate-builders.mjs                    # Translate all
 *   node scripts/translate-builders.mjs --lang=sv          # Single language
 *   node scripts/translate-builders.mjs --lang=sv,de       # Multiple languages
 *   node scripts/translate-builders.mjs --dry-run          # Count only
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.join(__dirname, '..', 'src', 'content', 'builders');

const LANG_NAMES = {
  sv: 'Swedish', de: 'German', nl: 'Dutch', 'nl-be': 'Belgian Dutch (Flemish)',
  fr: 'French', no: 'Norwegian', pl: 'Polish', ru: 'Russian'
};

const ALL_LANGS = Object.keys(LANG_NAMES);

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
        content: `Translate the following real estate developer/builder content from English to ${langName}.

RULES:
- Natural, fluent ${langName} — reads like native content
- Keep company names, place names (Costa Blanca, Torrevieja, etc.) unchanged
- Keep technical terms unchanged
- Keep all numbers, prices, percentages unchanged
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
  if (result.startsWith('```json')) result = result.slice(7);
  if (result.startsWith('```')) result = result.slice(3);
  if (result.endsWith('```')) result = result.slice(0, -3);
  return JSON.parse(result.trim());
}

function extractTranslatable(builder) {
  const chunk = {};

  // Simple text fields
  for (const field of ['metaTitle', 'metaDescription', 'heroHeadline', 'heroIntro', 'conclusion']) {
    if (builder[field]) chunk[field] = builder[field];
  }

  // Section objects with title + content
  for (const section of ['aboutSection', 'qualitySection']) {
    if (builder[section]) {
      chunk[section] = {
        title: builder[section].title || '',
        content: builder[section].content || ''
      };
      if (builder[section].features) {
        chunk[section].features = builder[section].features;
      }
    }
  }

  // Specialization section
  if (builder.specializationSection) {
    chunk.specializationSection = {
      title: builder.specializationSection.title || '',
      content: builder.specializationSection.content || ''
      // Keep regions, towns, propertyTypes as-is (proper nouns)
    };
  }

  // Why choose section
  if (builder.whyChooseSection) {
    chunk.whyChooseSection = {
      title: builder.whyChooseSection.title || '',
      reasons: (builder.whyChooseSection.reasons || []).map(r => ({
        title: r.title || '',
        description: r.description || ''
      }))
    };
  }

  // FAQs
  if (builder.faqs) {
    chunk.faqs = builder.faqs;
  }

  return chunk;
}

function mergeTranslation(original, translated) {
  const result = JSON.parse(JSON.stringify(original));

  for (const field of ['metaTitle', 'metaDescription', 'heroHeadline', 'heroIntro', 'conclusion']) {
    if (translated[field]) result[field] = translated[field];
  }

  for (const section of ['aboutSection', 'qualitySection']) {
    if (translated[section] && result[section]) {
      if (translated[section].title) result[section].title = translated[section].title;
      if (translated[section].content) result[section].content = translated[section].content;
      if (translated[section].features) result[section].features = translated[section].features;
    }
  }

  if (translated.specializationSection && result.specializationSection) {
    result.specializationSection.title = translated.specializationSection.title || result.specializationSection.title;
    result.specializationSection.content = translated.specializationSection.content || result.specializationSection.content;
  }

  if (translated.whyChooseSection && result.whyChooseSection) {
    result.whyChooseSection.title = translated.whyChooseSection.title || result.whyChooseSection.title;
    if (translated.whyChooseSection.reasons) result.whyChooseSection.reasons = translated.whyChooseSection.reasons;
  }

  if (translated.faqs) result.faqs = translated.faqs;

  return result;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const args = process.argv.slice(2);
  const langArg = args.find(a => a.startsWith('--lang='))?.split('=')[1];
  const dryRun = args.includes('--dry-run');
  const langs = langArg ? langArg.split(',') : ALL_LANGS;

  const env = loadEnv();
  const apiKey = env.ANTHROPIC_API_KEY;

  if (!apiKey && !dryRun) {
    console.error('ERROR: No ANTHROPIC_API_KEY in .env.local');
    process.exit(1);
  }

  const files = fs.readdirSync(BASE_DIR)
    .filter(f => f.endsWith('.json'))
    .sort();

  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   BUILDER TRANSLATION SCRIPT                    ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log();
  console.log(`Builders: ${files.length}`);
  console.log(`Languages: ${langs.join(', ')}`);

  let totalNeeded = 0;
  for (const lang of langs) {
    const langDir = path.join(BASE_DIR, lang);
    let existing = 0;
    if (fs.existsSync(langDir)) {
      existing = fs.readdirSync(langDir).filter(f => f.endsWith('.json')).length;
    }
    const needed = files.length - existing;
    totalNeeded += needed;
    console.log(`  ${lang}: ${existing} exist, ${needed} needed`);
  }

  console.log(`\nTotal to translate: ${totalNeeded}`);
  console.log(`Estimated time: ~${Math.ceil(totalNeeded * 1.5 / 60)} minutes`);
  console.log(`Estimated cost: ~$${(totalNeeded * 0.002).toFixed(2)}`);

  if (dryRun) {
    console.log('\n(Dry run)');
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

    for (const file of files) {
      const outputPath = path.join(langDir, file);
      if (fs.existsSync(outputPath)) continue;

      let builder;
      try {
        builder = JSON.parse(fs.readFileSync(path.join(BASE_DIR, file), 'utf8'));
      } catch (e) {
        errors++;
        continue;
      }

      completed++;
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);

      try {
        const translatable = extractTranslatable(builder);
        const translated = await translateWithClaude(apiKey, JSON.stringify(translatable), lang);
        const merged = mergeTranslation(builder, translated);

        const jsonStr = JSON.stringify(merged, null, 2);
        JSON.parse(jsonStr); // validate
        fs.writeFileSync(outputPath, jsonStr, 'utf8');

        console.log(`  ✓ [${completed}/${totalNeeded}] ${lang}/${file} (${elapsed}s)`);
      } catch (e) {
        console.error(`  ✗ [${completed}/${totalNeeded}] ${lang}/${file}: ${e.message}`);
        errors++;
        if (e.message.includes('429')) {
          console.log('    Rate limited, waiting 30s...');
          await sleep(30000);
        }
      }

      await sleep(600);
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`DONE in ${totalTime} min — ${completed - errors} translated, ${errors} errors`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
