#!/usr/bin/env node

/**
 * Sync Website Content → Airtable
 *
 * Populates all Airtable hub tables from local content files:
 * - Developments (1,246 from src/content/developments/)
 * - Builders (193 from src/content/builders/)
 * - Areas (96 from src/content/areas/)
 * - Blog Articles (191 from src/content/articles/)
 *
 * Features:
 * - Batch creates (10 records per API call, Airtable limit)
 * - Detects which translations exist per item
 * - Skips records that already exist (based on slug/reference)
 * - Rate-limited to respect API limits (5 req/sec)
 *
 * Run: node scripts/sync-to-airtable.mjs [--table developments|builders|areas|articles|all]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.join(__dirname, '..');
const CONTENT_DIR = path.join(BASE_DIR, 'src', 'content');
const BASE_URL = 'https://newbuildhomescostablanca.com';

// ============================================================
// CONFIG
// ============================================================

function loadEnv() {
  const envPath = path.join(BASE_DIR, '.env.local');
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

const env = loadEnv();
const TOKEN = env.AIRTABLE_API_TOKEN;
const BASE_ID = env.AIRTABLE_BASE_ID;

// Load table IDs from the setup output
let TABLE_IDS = {};
const idsPath = path.join(BASE_DIR, 'airtable-table-ids.json');
if (fs.existsSync(idsPath)) {
  TABLE_IDS = JSON.parse(fs.readFileSync(idsPath, 'utf8'));
}

const HEADERS = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json'
};

const LANGUAGES = ['sv', 'de', 'nl', 'nl-be', 'fr', 'no', 'pl', 'ru'];

// ============================================================
// API HELPERS
// ============================================================

let requestCount = 0;
let lastRequestTime = 0;

async function rateLimitedFetch(url, opts) {
  // Max 5 requests per second
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < 220) { // ~4.5 req/sec to be safe
    await new Promise(r => setTimeout(r, 220 - timeSinceLastRequest));
  }
  lastRequestTime = Date.now();
  requestCount++;
  return fetch(url, opts);
}

async function createRecordsBatch(tableId, records) {
  // Airtable allows max 10 records per batch
  const url = `https://api.airtable.com/v0/${BASE_ID}/${tableId}`;
  const res = await rateLimitedFetch(url, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ records: records.map(r => ({ fields: r })) })
  });

  if (!res.ok) {
    const err = await res.json();
    console.error(`  Batch error:`, err.error?.message || JSON.stringify(err));
    return false;
  }
  return true;
}

async function getExistingRecords(tableId, fieldName) {
  // Get all existing records to avoid duplicates
  const existing = new Set();
  let offset = null;

  do {
    let url = `https://api.airtable.com/v0/${BASE_ID}/${tableId}?fields[]=${encodeURIComponent(fieldName)}&pageSize=100`;
    if (offset) url += `&offset=${offset}`;

    const res = await rateLimitedFetch(url, { headers: HEADERS });
    const data = await res.json();

    if (data.records) {
      data.records.forEach(r => {
        const val = r.fields[fieldName];
        if (val) existing.add(val);
      });
    }
    offset = data.offset;
  } while (offset);

  return existing;
}

// ============================================================
// DATA LOADERS
// ============================================================

function getTranslations(slug, contentType) {
  // Check which language versions exist
  const translations = ['EN']; // English always exists
  const dir = path.join(CONTENT_DIR, contentType);

  for (const lang of LANGUAGES) {
    const langDir = path.join(dir, lang);
    const filePath = path.join(langDir, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      translations.push(lang.toUpperCase().replace('-', '-'));
    }
  }
  return translations;
}

function loadDevelopments() {
  const dir = path.join(CONTENT_DIR, 'developments');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const records = [];

  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
      const slug = data.slug || file.replace('.json', '');
      const ref = data.reference || slug.toUpperCase();

      records.push({
        'Reference': ref,
        'Name': (data.metaTitle || '').substring(0, 255),
        'Slug': slug,
        'Town': data.town || '',
        'Area': data.internalLinks?.area || data.town || '',
        'Builder': data.internalLinks?.builder || '',
        'Status': 'Selling',
        'Meta Title': (data.metaTitle || '').substring(0, 255),
        'Meta Description': (data.metaDescription || '').substring(0, 500),
        'Source': data.source || '',
        'Website URL': `${BASE_URL}/properties/${ref}`,
        'Translations': getTranslations(slug, 'developments'),
        'Content Generated': true,
        'Last Synced': new Date().toISOString()
      });
    } catch (e) {
      console.error(`  Error loading ${file}: ${e.message}`);
    }
  }
  return records;
}

function loadBuilders() {
  const dir = path.join(CONTENT_DIR, 'builders');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const records = [];

  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
      const slug = data.slug || file.replace('.json', '');

      // Count active developments for this builder
      const devDir = path.join(CONTENT_DIR, 'developments');
      let devCount = 0;
      try {
        const devFiles = fs.readdirSync(devDir).filter(f => f.endsWith('.json'));
        for (const df of devFiles) {
          try {
            const dev = JSON.parse(fs.readFileSync(path.join(devDir, df), 'utf8'));
            if ((dev.internalLinks?.builder || '').toLowerCase() === slug) devCount++;
          } catch {}
        }
      } catch {}

      // Filter regions to only valid Airtable select options
      const validRegions = ['Costa Blanca North', 'Costa Blanca South', 'Costa Calida', 'Mar Menor'];
      const rawRegions = data.specializationSection?.regions || [];
      const matchedRegions = rawRegions.filter(r => validRegions.includes(r));

      const record = {
        'Name': data.name || slug,
        'Slug': slug,
        'Towns': (data.specializationSection?.towns || []).join(', '),
        'Property Types': (data.specializationSection?.propertyTypes || []).join(', '),
        'Active Developments': devCount,
        'Meta Title': (data.metaTitle || '').substring(0, 255),
        'Meta Description': (data.metaDescription || '').substring(0, 500),
        'Website URL': `${BASE_URL}/builders/${slug}`,
        'Translations': getTranslations(slug, 'builders'),
        'Content Generated': true,
        'Last Synced': new Date().toISOString()
      };
      // Only include Regions if there are valid matches (Airtable rejects empty arrays for selects)
      if (matchedRegions.length > 0) {
        record['Regions'] = matchedRegions;
      }
      records.push(record);
    } catch (e) {
      console.error(`  Error loading ${file}: ${e.message}`);
    }
  }
  return records;
}

function loadAreas() {
  const dir = path.join(CONTENT_DIR, 'areas');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const records = [];

  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
      const slug = data.slug || file.replace('.json', '');
      const priceRange = data.priceRange
        ? `€${data.priceRange.min?.toLocaleString() || '?'} - €${data.priceRange.max?.toLocaleString() || '?'}`
        : '';

      records.push({
        'Name': data.name || slug,
        'Slug': slug,
        'Region': data.region || '',
        'Property Count': data.propertyCount || 0,
        'Price Range': priceRange,
        'Property Types': (data.propertyTypes || []).join(', '),
        'Development Count': (data.developments || []).length,
        'Hero Image': data.heroImage || '',
        'Website URL': `${BASE_URL}/areas/${slug}`,
        'Translations': getTranslations(slug, 'areas'),
        'Last Synced': new Date().toISOString()
      });
    } catch (e) {
      console.error(`  Error loading ${file}: ${e.message}`);
    }
  }
  return records;
}

function loadArticles() {
  const dir = path.join(CONTENT_DIR, 'articles');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const records = [];

  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
      const slug = data.slug || file.replace('.json', '');
      const content = data.content || {};

      // Map nationality-specific categories to 'Nationality Guide'
      const validCategories = [
        'Area Guide', 'Lifestyle', 'Investment', 'Nationality Guide', 'Finance',
        'Golf', 'Legal', 'Top 10', 'Buying Guide', 'Super Guide',
        'Visas & Residency', 'Sports & Activities', 'Living in Spain',
        'Travel', 'Food & Wine', 'Luxury Properties', 'Budget Properties'
      ];
      let category = data.category || '';
      if (category && !validCategories.includes(category)) {
        // Map buyer-specific categories to Nationality Guide
        if (category.includes('Buyers')) {
          category = 'Nationality Guide';
        } else {
          category = ''; // Skip unknown categories
        }
      }

      const record = {
        'Title': (data.title || '').substring(0, 255),
        'Slug': slug,
        'Excerpt': (data.excerpt || '').substring(0, 500),
        'Published': data.publishedAt || null,
        'Updated': data.updatedAt || null,
        'Read Time': data.readTime ? String(data.readTime) + ' min' : '',
        'Featured': data.featured === true,
        'Author': data.author || '',
        'Tags': (data.tags || []).join(', '),
        'Related Areas': (data.relatedAreas || []).join(', '),
        'Has Property Showcase': Array.isArray(content.propertyShowcases) && content.propertyShowcases.length > 0,
        'Has FAQs': Array.isArray(content.faqs) && content.faqs.length > 0,
        'Website URL': `${BASE_URL}/blog/${slug}`,
        'Translations': getTranslations(slug, 'articles'),
        'Last Synced': new Date().toISOString()
      };
      // Only include Category if valid (Airtable rejects empty string for singleSelect)
      if (category) {
        record['Category'] = category;
      }
      records.push(record);
    } catch (e) {
      console.error(`  Error loading ${file}: ${e.message}`);
    }
  }
  return records;
}

// ============================================================
// SYNC LOGIC
// ============================================================

async function syncTable(tableName, tableId, records, keyField) {
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`Syncing: ${tableName} (${records.length} records)`);
  console.log(`${'═'.repeat(50)}`);

  if (!tableId) {
    console.error(`  No table ID for "${tableName}". Run setup-airtable-hub.mjs first.`);
    return;
  }

  // Check for existing records
  console.log(`  Checking existing records...`);
  const existing = await getExistingRecords(tableId, keyField);
  console.log(`  Found ${existing.size} existing records`);

  // Filter out duplicates
  const newRecords = records.filter(r => !existing.has(r[keyField]));
  console.log(`  New records to create: ${newRecords.length}`);

  if (newRecords.length === 0) {
    console.log(`  ✓ All records already exist`);
    return;
  }

  // Batch create in groups of 10
  let created = 0;
  let failed = 0;

  for (let i = 0; i < newRecords.length; i += 10) {
    const batch = newRecords.slice(i, i + 10);
    const progress = `[${Math.min(i + 10, newRecords.length)}/${newRecords.length}]`;

    const success = await createRecordsBatch(tableId, batch);
    if (success) {
      created += batch.length;
      process.stdout.write(`  ${progress} Created ${created} records\r`);
    } else {
      failed += batch.length;
      console.log(`  ${progress} Batch failed (${failed} total failures)`);
    }
  }

  console.log(`\n  ✓ Done: ${created} created, ${failed} failed`);
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  const args = process.argv.slice(2);
  const tableArg = args.find(a => a.startsWith('--table='))?.split('=')[1] || 'all';

  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   SYNC WEBSITE → AIRTABLE                      ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log();
  console.log(`Base: ${BASE_ID}`);
  console.log(`Syncing: ${tableArg}`);
  console.log(`Tables available: ${Object.keys(TABLE_IDS).join(', ') || '(none — run setup first)'}`);

  const syncAll = tableArg === 'all';

  if (syncAll || tableArg === 'developments') {
    const records = loadDevelopments();
    await syncTable('Developments', TABLE_IDS['Developments'], records, 'Reference');
  }

  if (syncAll || tableArg === 'builders') {
    const records = loadBuilders();
    await syncTable('Builders', TABLE_IDS['Builders'], records, 'Slug');
  }

  if (syncAll || tableArg === 'areas') {
    const records = loadAreas();
    await syncTable('Areas', TABLE_IDS['Areas'], records, 'Slug');
  }

  if (syncAll || tableArg === 'articles') {
    const records = loadArticles();
    await syncTable('Blog Articles', TABLE_IDS['Blog Articles'], records, 'Slug');
  }

  console.log(`\n\n${'═'.repeat(50)}`);
  console.log(`SYNC COMPLETE — ${requestCount} API requests made`);
  console.log(`${'═'.repeat(50)}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
