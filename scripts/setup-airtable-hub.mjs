#!/usr/bin/env node

/**
 * Airtable Hub Setup Script
 *
 * Sets up Airtable as the central repository ("heart") for:
 * - Properties/Developments (1,246 developments)
 * - Builders/Developers (193 builders)
 * - Areas (96 areas)
 * - Blog Articles (191 articles × 9 languages)
 * - Leads/CRM (already exists)
 * - Social Posts (Postiz content calendar)
 * - Digital Assets (Remotion tracking)
 *
 * Run: node scripts/setup-airtable-hub.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load env
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

const env = loadEnv();
const TOKEN = env.AIRTABLE_API_TOKEN;
const BASE_ID = env.AIRTABLE_BASE_ID;

if (!TOKEN || !BASE_ID) {
  console.error('Missing AIRTABLE_API_TOKEN or AIRTABLE_BASE_ID in .env.local');
  process.exit(1);
}

const HEADERS = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json'
};

// ============================================================
// API HELPERS
// ============================================================

async function airtableRequest(endpoint, method = 'GET', body = null) {
  const url = `https://api.airtable.com/v0/${endpoint}`;
  const opts = { method, headers: HEADERS };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const data = await res.json();

  if (!res.ok) {
    console.error(`API Error (${res.status}):`, JSON.stringify(data, null, 2));
    return null;
  }
  return data;
}

async function createTable(name, fields, description = '') {
  console.log(`\n📋 Creating table: ${name}...`);

  const result = await airtableRequest(`meta/bases/${BASE_ID}/tables`, 'POST', {
    name,
    description,
    fields
  });

  if (result && result.id) {
    console.log(`  ✓ Created: ${name} (${result.id})`);
    return result.id;
  } else {
    console.log(`  ✗ Failed to create: ${name}`);
    return null;
  }
}

// ============================================================
// TABLE SCHEMAS
// ============================================================

const TABLES = {
  // ────────────────────────────────────────────
  // 1. DEVELOPMENTS (Properties)
  // ────────────────────────────────────────────
  'Developments': {
    description: 'All 1,246 property developments — the core inventory. Synced from website content.',
    fields: [
      { name: 'Reference', type: 'singleLineText', description: 'Unique property reference (e.g., 2032JAV)' },
      { name: 'Name', type: 'singleLineText', description: 'Development display name' },
      { name: 'Slug', type: 'singleLineText', description: 'URL slug for website' },
      { name: 'Town', type: 'singleLineText', description: 'Town/location' },
      { name: 'Area', type: 'singleLineText', description: 'Linked area name' },
      { name: 'Builder', type: 'singleLineText', description: 'Developer/builder name' },
      { name: 'Status', type: 'singleSelect', options: {
        choices: [
          { name: 'Selling', color: 'greenBright' },
          { name: 'Coming Soon', color: 'yellowBright' },
          { name: 'Last Units', color: 'orangeBright' },
          { name: 'Sold Out', color: 'redBright' }
        ]
      }},
      { name: 'Price From', type: 'currency', options: { precision: 0, symbol: '€' } },
      { name: 'Price To', type: 'currency', options: { precision: 0, symbol: '€' } },
      { name: 'Property Types', type: 'multipleSelects', options: {
        choices: [
          { name: 'Apartment' }, { name: 'Villa' }, { name: 'Townhouse' },
          { name: 'Bungalow' }, { name: 'Penthouse' }, { name: 'Duplex' },
          { name: 'Land' }, { name: 'Semi-Detached' }
        ]
      }},
      { name: 'Bedrooms', type: 'singleLineText', description: 'e.g., 2-4' },
      { name: 'Meta Title', type: 'singleLineText' },
      { name: 'Meta Description', type: 'multilineText' },
      { name: 'Source', type: 'singleLineText', description: 'Feed source' },
      { name: 'Website URL', type: 'url' },
      { name: 'Translations', type: 'multipleSelects', options: {
        choices: [
          { name: 'EN' }, { name: 'SV' }, { name: 'DE' }, { name: 'NL' },
          { name: 'NL-BE' }, { name: 'FR' }, { name: 'NO' }, { name: 'PL' }, { name: 'RU' }
        ]
      }},
      { name: 'Content Generated', type: 'checkbox' },
      { name: 'Last Synced', type: 'dateTime', options: { timeZone: 'Europe/Madrid', dateFormat: { name: 'european' }, timeFormat: { name: '24hour' } } },
      { name: 'Notes', type: 'multilineText' }
    ]
  },

  // ────────────────────────────────────────────
  // 2. BUILDERS
  // ────────────────────────────────────────────
  'Builders': {
    description: 'All 193 property developers/builders. Linked to their developments.',
    fields: [
      { name: 'Name', type: 'singleLineText', description: 'Builder company name' },
      { name: 'Slug', type: 'singleLineText', description: 'URL slug' },
      { name: 'Regions', type: 'multipleSelects', options: {
        choices: [
          { name: 'Costa Blanca North' }, { name: 'Costa Blanca South' },
          { name: 'Costa Calida' }, { name: 'Mar Menor' }
        ]
      }},
      { name: 'Towns', type: 'multilineText', description: 'Comma-separated towns' },
      { name: 'Property Types', type: 'multilineText', description: 'Types they build' },
      { name: 'Active Developments', type: 'number', options: { precision: 0 } },
      { name: 'Meta Title', type: 'singleLineText' },
      { name: 'Meta Description', type: 'multilineText' },
      { name: 'Website URL', type: 'url' },
      { name: 'Translations', type: 'multipleSelects', options: {
        choices: [
          { name: 'EN' }, { name: 'SV' }, { name: 'DE' }, { name: 'NL' },
          { name: 'NL-BE' }, { name: 'FR' }, { name: 'NO' }, { name: 'PL' }, { name: 'RU' }
        ]
      }},
      { name: 'Content Generated', type: 'checkbox' },
      { name: 'Last Synced', type: 'dateTime', options: { timeZone: 'Europe/Madrid', dateFormat: { name: 'european' }, timeFormat: { name: '24hour' } } },
      { name: 'Notes', type: 'multilineText' }
    ]
  },

  // ────────────────────────────────────────────
  // 3. AREAS
  // ────────────────────────────────────────────
  'Areas': {
    description: 'All 96 area/location guides. Core geographic content.',
    fields: [
      { name: 'Name', type: 'singleLineText', description: 'Area display name' },
      { name: 'Slug', type: 'singleLineText', description: 'URL slug' },
      { name: 'Region', type: 'singleSelect', options: {
        choices: [
          { name: 'Costa Blanca North' }, { name: 'Costa Blanca South' },
          { name: 'Costa Calida' }, { name: 'Mar Menor' }, { name: 'Other' }
        ]
      }},
      { name: 'Property Count', type: 'number', options: { precision: 0 } },
      { name: 'Price Range', type: 'singleLineText', description: 'e.g., €120k - €850k' },
      { name: 'Property Types', type: 'multilineText' },
      { name: 'Development Count', type: 'number', options: { precision: 0 } },
      { name: 'Hero Image', type: 'singleLineText' },
      { name: 'Website URL', type: 'url' },
      { name: 'Translations', type: 'multipleSelects', options: {
        choices: [
          { name: 'EN' }, { name: 'SV' }, { name: 'DE' }, { name: 'NL' },
          { name: 'NL-BE' }, { name: 'FR' }, { name: 'NO' }, { name: 'PL' }, { name: 'RU' }
        ]
      }},
      { name: 'Last Synced', type: 'dateTime', options: { timeZone: 'Europe/Madrid', dateFormat: { name: 'european' }, timeFormat: { name: '24hour' } } },
      { name: 'Notes', type: 'multilineText' }
    ]
  },

  // ────────────────────────────────────────────
  // 4. BLOG ARTICLES
  // ────────────────────────────────────────────
  'Blog Articles': {
    description: 'All 191 blog articles with translation tracking across 9 languages.',
    fields: [
      { name: 'Title', type: 'singleLineText' },
      { name: 'Slug', type: 'singleLineText' },
      { name: 'Category', type: 'singleSelect', options: {
        choices: [
          { name: 'Area Guide', color: 'blueBright' },
          { name: 'Lifestyle', color: 'greenBright' },
          { name: 'Investment', color: 'purpleBright' },
          { name: 'Nationality Guide', color: 'tealBright' },
          { name: 'Finance', color: 'yellowBright' },
          { name: 'Golf', color: 'cyanBright' },
          { name: 'Legal', color: 'redBright' },
          { name: 'Top 10', color: 'orangeBright' },
          { name: 'Buying Guide', color: 'pinkBright' },
          { name: 'Super Guide', color: 'grayBright' },
          { name: 'Visas & Residency' },
          { name: 'Sports & Activities' },
          { name: 'Living in Spain' },
          { name: 'Travel' },
          { name: 'Food & Wine' },
          { name: 'Luxury Properties' },
          { name: 'Budget Properties' }
        ]
      }},
      { name: 'Excerpt', type: 'multilineText' },
      { name: 'Published', type: 'date', options: { dateFormat: { name: 'european' } } },
      { name: 'Updated', type: 'date', options: { dateFormat: { name: 'european' } } },
      { name: 'Read Time', type: 'singleLineText' },
      { name: 'Featured', type: 'checkbox' },
      { name: 'Author', type: 'singleLineText' },
      { name: 'Tags', type: 'multilineText' },
      { name: 'Related Areas', type: 'multilineText' },
      { name: 'Has Property Showcase', type: 'checkbox' },
      { name: 'Has FAQs', type: 'checkbox' },
      { name: 'Website URL', type: 'url' },
      { name: 'Translations', type: 'multipleSelects', options: {
        choices: [
          { name: 'EN' }, { name: 'SV' }, { name: 'DE' }, { name: 'NL' },
          { name: 'NL-BE' }, { name: 'FR' }, { name: 'NO' }, { name: 'PL' }, { name: 'RU' }
        ]
      }},
      { name: 'Last Synced', type: 'dateTime', options: { timeZone: 'Europe/Madrid', dateFormat: { name: 'european' }, timeFormat: { name: '24hour' } } },
      { name: 'Notes', type: 'multilineText' }
    ]
  },

  // ────────────────────────────────────────────
  // 5. SOCIAL POSTS (Postiz Content Calendar)
  // ────────────────────────────────────────────
  'Social Posts': {
    description: 'Content calendar for Postiz social media scheduler. Plan, track, and schedule posts.',
    fields: [
      { name: 'Title', type: 'singleLineText', description: 'Post title/hook' },
      { name: 'Content', type: 'multilineText', description: 'Post body text' },
      { name: 'Platform', type: 'multipleSelects', options: {
        choices: [
          { name: 'Instagram', color: 'pinkBright' },
          { name: 'Facebook', color: 'blueBright' },
          { name: 'LinkedIn', color: 'cyanBright' },
          { name: 'TikTok', color: 'purpleBright' },
          { name: 'YouTube', color: 'redBright' },
          { name: 'Twitter/X', color: 'grayBright' },
          { name: 'Pinterest', color: 'orangeBright' }
        ]
      }},
      { name: 'Content Type', type: 'singleSelect', options: {
        choices: [
          { name: 'Property Showcase', color: 'blueBright' },
          { name: 'Area Highlight', color: 'greenBright' },
          { name: 'Blog Promotion', color: 'purpleBright' },
          { name: 'Market Update', color: 'yellowBright' },
          { name: 'Lifestyle', color: 'tealBright' },
          { name: 'Testimonial', color: 'pinkBright' },
          { name: 'Behind the Scenes', color: 'grayBright' },
          { name: 'Drone Video', color: 'orangeBright' },
          { name: 'Tips & Advice', color: 'cyanBright' }
        ]
      }},
      { name: 'Language', type: 'singleSelect', options: {
        choices: [
          { name: 'EN' }, { name: 'SV' }, { name: 'DE' }, { name: 'NL' },
          { name: 'FR' }, { name: 'NO' }, { name: 'PL' }, { name: 'RU' }, { name: 'Multi' }
        ]
      }},
      { name: 'Status', type: 'singleSelect', options: {
        choices: [
          { name: 'Idea', color: 'grayBright' },
          { name: 'Drafted', color: 'yellowBright' },
          { name: 'Asset Ready', color: 'orangeBright' },
          { name: 'Scheduled', color: 'blueBright' },
          { name: 'Published', color: 'greenBright' },
          { name: 'Failed', color: 'redBright' }
        ]
      }},
      { name: 'Scheduled Date', type: 'dateTime', options: { timeZone: 'Europe/Madrid', dateFormat: { name: 'european' }, timeFormat: { name: '24hour' } } },
      { name: 'Published Date', type: 'dateTime', options: { timeZone: 'Europe/Madrid', dateFormat: { name: 'european' }, timeFormat: { name: '24hour' } } },
      { name: 'Linked Development', type: 'singleLineText', description: 'Reference to development' },
      { name: 'Linked Article', type: 'singleLineText', description: 'Blog article slug' },
      { name: 'Linked Area', type: 'singleLineText', description: 'Area slug' },
      { name: 'Asset URL', type: 'url', description: 'Remotion-generated asset link' },
      { name: 'Postiz Post ID', type: 'singleLineText', description: 'External ID from Postiz' },
      { name: 'Hashtags', type: 'multilineText' },
      { name: 'Notes', type: 'multilineText' }
    ]
  },

  // ────────────────────────────────────────────
  // 6. DIGITAL ASSETS (Remotion)
  // ────────────────────────────────────────────
  'Digital Assets': {
    description: 'Remotion-generated videos and visual assets. Linked to properties, areas, and social posts.',
    fields: [
      { name: 'Title', type: 'singleLineText' },
      { name: 'Asset Type', type: 'singleSelect', options: {
        choices: [
          { name: 'Property Video', color: 'blueBright' },
          { name: 'Area Showcase', color: 'greenBright' },
          { name: 'Instagram Reel', color: 'pinkBright' },
          { name: 'YouTube Short', color: 'redBright' },
          { name: 'Story', color: 'purpleBright' },
          { name: 'Carousel Image', color: 'orangeBright' },
          { name: 'Banner', color: 'yellowBright' },
          { name: 'Thumbnail', color: 'cyanBright' }
        ]
      }},
      { name: 'Status', type: 'singleSelect', options: {
        choices: [
          { name: 'Queued', color: 'grayBright' },
          { name: 'Rendering', color: 'yellowBright' },
          { name: 'Ready', color: 'greenBright' },
          { name: 'Published', color: 'blueBright' },
          { name: 'Failed', color: 'redBright' }
        ]
      }},
      { name: 'Dimensions', type: 'singleSelect', options: {
        choices: [
          { name: '1080x1080 (Square)' },
          { name: '1080x1920 (Story/Reel)' },
          { name: '1920x1080 (Landscape)' },
          { name: '1200x628 (Social)' },
          { name: 'Custom' }
        ]
      }},
      { name: 'Duration (sec)', type: 'number', options: { precision: 0 } },
      { name: 'Language', type: 'singleSelect', options: {
        choices: [
          { name: 'EN' }, { name: 'SV' }, { name: 'DE' }, { name: 'NL' },
          { name: 'FR' }, { name: 'NO' }, { name: 'PL' }, { name: 'RU' }, { name: 'Multi' }
        ]
      }},
      { name: 'Linked Development', type: 'singleLineText' },
      { name: 'Linked Area', type: 'singleLineText' },
      { name: 'Linked Article', type: 'singleLineText' },
      { name: 'Source Images', type: 'multilineText', description: 'Drone/property images used' },
      { name: 'Output URL', type: 'url' },
      { name: 'Remotion Composition', type: 'singleLineText', description: 'Remotion template used' },
      { name: 'Render ID', type: 'singleLineText', description: 'Remotion render job ID' },
      { name: 'Created', type: 'dateTime', options: { timeZone: 'Europe/Madrid', dateFormat: { name: 'european' }, timeFormat: { name: '24hour' } } },
      { name: 'Notes', type: 'multilineText' }
    ]
  },

  // ────────────────────────────────────────────
  // 7. EMAIL CAMPAIGNS (MailerLite tracking)
  // ────────────────────────────────────────────
  'Email Campaigns': {
    description: 'Track MailerLite campaigns and automation performance. Links to content.',
    fields: [
      { name: 'Campaign Name', type: 'singleLineText' },
      { name: 'Type', type: 'singleSelect', options: {
        choices: [
          { name: 'Welcome Flow', color: 'greenBright' },
          { name: 'Property Alert', color: 'blueBright' },
          { name: 'Newsletter', color: 'purpleBright' },
          { name: 'Area Digest', color: 'tealBright' },
          { name: 'Blog Roundup', color: 'orangeBright' },
          { name: 'Seasonal', color: 'yellowBright' },
          { name: 'Re-engagement', color: 'redBright' }
        ]
      }},
      { name: 'Language', type: 'singleSelect', options: {
        choices: [
          { name: 'EN' }, { name: 'SV' }, { name: 'DE' }, { name: 'NL' },
          { name: 'FR' }, { name: 'NO' }, { name: 'PL' }, { name: 'RU' }, { name: 'All' }
        ]
      }},
      { name: 'Status', type: 'singleSelect', options: {
        choices: [
          { name: 'Draft', color: 'grayBright' },
          { name: 'Scheduled', color: 'yellowBright' },
          { name: 'Sent', color: 'greenBright' },
          { name: 'Active Automation', color: 'blueBright' }
        ]
      }},
      { name: 'Subject Line', type: 'singleLineText' },
      { name: 'Content Summary', type: 'multilineText' },
      { name: 'Linked Articles', type: 'multilineText', description: 'Blog slugs included' },
      { name: 'Linked Developments', type: 'multilineText', description: 'Development refs included' },
      { name: 'Send Date', type: 'dateTime', options: { timeZone: 'Europe/Madrid', dateFormat: { name: 'european' }, timeFormat: { name: '24hour' } } },
      { name: 'Recipients', type: 'number', options: { precision: 0 } },
      { name: 'Open Rate', type: 'percent', options: { precision: 1 } },
      { name: 'Click Rate', type: 'percent', options: { precision: 1 } },
      { name: 'MailerLite ID', type: 'singleLineText' },
      { name: 'Notes', type: 'multilineText' }
    ]
  }
};

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   AIRTABLE HUB SETUP                           ║');
  console.log('║   Setting up the central repository             ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log();
  console.log(`Base ID: ${BASE_ID}`);

  // First, check existing tables
  console.log('\n🔍 Checking existing tables...');
  const meta = await airtableRequest(`meta/bases/${BASE_ID}/tables`);

  if (!meta) {
    console.error('Could not read base metadata. Check your API token.');
    process.exit(1);
  }

  const existingTables = meta.tables.map(t => t.name);
  console.log(`  Existing tables: ${existingTables.join(', ')}`);

  const tableIds = {};
  const created = [];
  const skipped = [];

  for (const [tableName, tableConfig] of Object.entries(TABLES)) {
    if (existingTables.includes(tableName)) {
      console.log(`\n⏭️  Skipping "${tableName}" — already exists`);
      const existing = meta.tables.find(t => t.name === tableName);
      tableIds[tableName] = existing.id;
      skipped.push(tableName);
      continue;
    }

    const tableId = await createTable(tableName, tableConfig.fields, tableConfig.description);
    if (tableId) {
      tableIds[tableName] = tableId;
      created.push(tableName);
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 500));
  }

  // Save table IDs to env-friendly format
  console.log('\n\n════════════════════════════════════════════════════');
  console.log('RESULTS');
  console.log('════════════════════════════════════════════════════');
  console.log(`  Created: ${created.length} tables`);
  console.log(`  Skipped: ${skipped.length} tables (already exist)`);
  console.log();

  if (Object.keys(tableIds).length > 0) {
    console.log('Table IDs (add to .env.local):');
    console.log('─────────────────────────────');
    for (const [name, id] of Object.entries(tableIds)) {
      const envKey = `AIRTABLE_${name.replace(/\s+/g, '_').toUpperCase()}_TABLE_ID`;
      console.log(`  ${envKey}=${id}`);
    }

    // Save to a reference file
    const idsFile = path.join(__dirname, '..', 'airtable-table-ids.json');
    fs.writeFileSync(idsFile, JSON.stringify(tableIds, null, 2));
    console.log(`\n  Saved to: airtable-table-ids.json`);
  }

  console.log('\n✅ Hub setup complete!');
  console.log('   Next: run `node scripts/sync-to-airtable.mjs` to populate data');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
