#!/usr/bin/env node

/**
 * Airtable NewBuild Leads Table Setup Script
 *
 * Creates a "NewBuild Leads" table in an existing Airtable base with predefined fields.
 * Uses only Node.js built-in modules (no npm dependencies required).
 *
 * Usage:
 *   node scripts/setup-airtable.js
 *   node scripts/setup-airtable.js <apiToken> <baseId>
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Load environment variables from .env.local
 */
function loadEnvFile(filePath) {
  const env = {};
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      content.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=');
          if (key) {
            env[key] = valueParts.join('=');
          }
        }
      });
    }
  } catch (error) {
    log(`Warning: Could not read .env.local: ${error.message}`, 'yellow');
  }
  return env;
}

/**
 * Append or update .env.local with new values
 */
function updateEnvFile(filePath, updates) {
  try {
    let content = '';
    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, 'utf8');
    }

    const env = {};
    content.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key) {
          env[key] = valueParts.join('=');
        }
      }
    });

    // Update with new values
    Object.assign(env, updates);

    // Reconstruct file content
    let newContent = '';
    const allKeys = new Set([
      ...Object.keys(env),
      ...Object.keys(updates),
    ]);

    allKeys.forEach((key) => {
      if (env[key] !== undefined) {
        newContent += `${key}=${env[key]}\n`;
      }
    });

    fs.writeFileSync(filePath, newContent, 'utf8');
    log(`✓ Updated .env.local`, 'green');
  } catch (error) {
    log(`Warning: Could not update .env.local: ${error.message}`, 'yellow');
  }
}

/**
 * Make HTTPS request to Airtable API
 */
function makeRequest(method, hostname, path, apiToken, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname,
      port: 443,
      path,
      method,
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      const bodyStr = JSON.stringify(body);
      options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: parsed,
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data,
          });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

/**
 * Define table schema for NewBuild Leads
 */
function getTableSchema() {
  return {
    name: 'NewBuild Leads',
    fields: [
      {
        name: 'Name',
        type: 'singleLineText',
        description: 'Contact name',
      },
      {
        name: 'Email',
        type: 'email',
        description: 'Contact email address',
      },
      {
        name: 'Phone',
        type: 'phoneNumber',
        description: 'Contact phone number',
      },
      {
        name: 'Message',
        type: 'multilineText',
        description: 'Contact message or inquiry details',
      },
      {
        name: 'Area',
        type: 'singleSelect',
        description: 'Geographic area of interest',
        options: {
          choices: [
            { name: 'Torrevieja', color: 'blueLight2' },
            { name: 'Algorfa', color: 'cyanLight2' },
            { name: 'Javea', color: 'tealLight2' },
            { name: 'Calpe', color: 'greenLight2' },
            { name: 'Benidorm', color: 'yellowLight2' },
            { name: 'Altea', color: 'orangeLight2' },
            { name: 'Moraira', color: 'redLight2' },
            { name: 'Orihuela Costa', color: 'pinkLight2' },
            { name: 'Guardamar del Segura', color: 'purpleLight2' },
            { name: 'Villamartin', color: 'blueLight2' },
            { name: 'La Zenia', color: 'cyanLight2' },
            { name: 'Denia', color: 'tealLight2' },
            { name: 'Ciudad Quesada', color: 'greenLight2' },
            { name: 'Cabo Roig', color: 'yellowLight2' },
            { name: 'Santa Pola', color: 'orangeLight2' },
            { name: 'Other', color: 'grayLight2' },
          ],
        },
      },
      {
        name: 'Language',
        type: 'singleSelect',
        description: 'Preferred communication language',
        options: {
          choices: [
            { name: 'English', color: 'blueLight2' },
            { name: 'Svenska', color: 'yellowLight2' },
            { name: 'Nederlands', color: 'orangeLight2' },
            { name: 'Francais', color: 'purpleLight2' },
            { name: 'Deutsch', color: 'redLight2' },
            { name: 'Norsk', color: 'cyanLight2' },
            { name: 'Polski', color: 'pinkLight2' },
            { name: 'Russian', color: 'greenLight2' },
          ],
        },
      },
      {
        name: 'Property Type',
        type: 'singleSelect',
        description: 'Type of property of interest',
        options: {
          choices: [
            { name: 'Apartment', color: 'blueLight2' },
            { name: 'Villa', color: 'greenLight2' },
            { name: 'Townhouse', color: 'yellowLight2' },
            { name: 'Bungalow', color: 'orangeLight2' },
            { name: 'Penthouse', color: 'purpleLight2' },
            { name: 'Duplex', color: 'pinkLight2' },
            { name: 'Other', color: 'grayLight2' },
          ],
        },
      },
      {
        name: 'Budget Range',
        type: 'singleSelect',
        description: 'Estimated budget for purchase',
        options: {
          choices: [
            { name: 'Under 150k', color: 'greenLight2' },
            { name: '150k-250k', color: 'blueLight2' },
            { name: '250k-350k', color: 'yellowLight2' },
            { name: '350k-500k', color: 'orangeLight2' },
            { name: '500k+', color: 'purpleLight2' },
          ],
        },
      },
      {
        name: 'Source Page',
        type: 'url',
        description: 'URL of the page where inquiry was submitted',
      },
      {
        name: 'Development Name',
        type: 'singleLineText',
        description: 'Name of the development or project',
      },
      {
        name: 'Form Type',
        type: 'singleSelect',
        description: 'Type of form submitted',
        options: {
          choices: [
            { name: 'Area Inquiry', color: 'blueLight2' },
            { name: 'Development Inquiry', color: 'greenLight2' },
            { name: 'General Contact', color: 'yellowLight2' },
            { name: 'Guide Download', color: 'purpleLight2' },
            { name: 'Property Alert', color: 'orangeLight2' },
          ],
        },
      },
      {
        name: 'Status',
        type: 'singleSelect',
        description: 'Current status of the lead',
        options: {
          choices: [
            { name: 'New Lead', color: 'greenLight2' },
            { name: 'Contacted', color: 'blueLight2' },
            { name: 'Qualified', color: 'yellowLight2' },
            { name: 'Viewing Booked', color: 'orangeLight2' },
            { name: 'Offer Made', color: 'purpleLight2' },
            { name: 'Closed Won', color: 'tealLight2' },
            { name: 'Closed Lost', color: 'redLight2' },
          ],
        },
      },
      {
        name: 'Assigned To',
        type: 'singleLineText',
        description: 'Team member responsible for this lead',
      },
      {
        name: 'Notes',
        type: 'multilineText',
        description: 'Additional notes about the lead',
      },
      {
        name: 'Created Date',
        type: 'dateTime',
        description: 'Date and time lead was created',
        options: {
          timeZone: 'Europe/Madrid',
          dateFormat: { name: 'european' },
          timeFormat: { name: '24hour' },
        },
      },
    ],
  };
}

/**
 * Create the table via Airtable API
 */
async function createTable(apiToken, baseId) {
  log('\n' + '='.repeat(60), 'cyan');
  log('Airtable NewBuild Leads Table Setup', 'cyan');
  log('='.repeat(60) + '\n', 'cyan');

  try {
    log('Step 1: Validating credentials...', 'blue');
    if (!apiToken) {
      throw new Error('AIRTABLE_API_TOKEN is not set');
    }
    if (!baseId) {
      throw new Error('AIRTABLE_BASE_ID is not set');
    }
    log('✓ Credentials loaded\n', 'green');

    log('Step 2: Preparing table schema...', 'blue');
    const schema = getTableSchema();
    log(`✓ Schema prepared with ${schema.fields.length} fields\n`, 'green');

    log('Step 3: Creating table on Airtable...', 'blue');
    log(`  - Table name: ${schema.name}`, 'cyan');
    log(`  - Base ID: ${baseId}`, 'cyan');

    const response = await makeRequest(
      'POST',
      'api.airtable.com',
      `/v0/meta/bases/${baseId}/tables`,
      apiToken,
      schema
    );

    if (response.status >= 200 && response.status < 300) {
      const tableId = response.body.id;
      log(`✓ Table created successfully!`, 'green');
      log(`\nTable ID: ${colors.yellow}${tableId}${colors.reset}\n`, 'cyan');

      log('Step 4: Updating .env.local...', 'blue');
      const envPath = path.join(__dirname, '..', '.env.local');
      updateEnvFile(envPath, {
        AIRTABLE_TABLE_ID: tableId,
      });

      log('\n' + '='.repeat(60), 'cyan');
      log('✓ Setup completed successfully!', 'green');
      log('='.repeat(60) + '\n', 'cyan');

      log('Environment variables updated:', 'green');
      log(`  AIRTABLE_API_TOKEN=<your-token>`, 'cyan');
      log(`  AIRTABLE_BASE_ID=${baseId}`, 'cyan');
      log(`  AIRTABLE_TABLE_ID=${tableId}`, 'cyan');
      log('\nYou can now use these variables in your application.\n', 'yellow');

      return { success: true, tableId };
    } else {
      const errorMsg = response.body.error?.message || JSON.stringify(response.body);
      throw new Error(`API Error (${response.status}): ${errorMsg}`);
    }
  } catch (error) {
    log('\n' + '='.repeat(60), 'red');
    log('✗ Setup failed!', 'red');
    log('='.repeat(60) + '\n', 'red');
    log(`Error: ${error.message}`, 'red');
    log('\nPlease check:', 'yellow');
    log('  1. AIRTABLE_API_TOKEN is valid', 'cyan');
    log('  2. AIRTABLE_BASE_ID is correct', 'cyan');
    log('  3. Your API token has permission to create tables', 'cyan');
    log('  4. The "NewBuild Leads" table does not already exist\n', 'cyan');
    return { success: false, error: error.message };
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const envPath = path.join(__dirname, '..', '.env.local');
  const env = loadEnvFile(envPath);

  let apiToken = args[0] || env.AIRTABLE_API_TOKEN;
  let baseId = args[1] || env.AIRTABLE_BASE_ID;

  // If credentials are missing, prompt the user
  if (!apiToken || !baseId) {
    log('Missing credentials. Please provide them:', 'yellow');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    if (!apiToken) {
      await new Promise((resolve) => {
        rl.question(
          'Enter AIRTABLE_API_TOKEN: ',
          (answer) => {
            apiToken = answer.trim();
            resolve();
          }
        );
      });
    }

    if (!baseId) {
      await new Promise((resolve) => {
        rl.question(
          'Enter AIRTABLE_BASE_ID: ',
          (answer) => {
            baseId = answer.trim();
            resolve();
          }
        );
      });
    }

    rl.close();
  }

  const result = await createTable(apiToken, baseId);
  process.exit(result.success ? 0 : 1);
}

main().catch((error) => {
  log(`Unexpected error: ${error.message}`, 'red');
  process.exit(1);
});
