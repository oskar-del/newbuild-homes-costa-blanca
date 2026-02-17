#!/usr/bin/env node

/**
 * Sets up MailerLite custom fields, groups, and email flow infrastructure
 * Run with: NODE_TLS_REJECT_UNAUTHORIZED=0 node scripts/setup-email-flows.mjs
 */

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiN2JmZDUyMWY1N2NkZTgxZDUzZDAwMTA2YzBiMjAxYzJiOTBjOTFlNjE1OWQxYjVmYmUwNTZiYmMyNGQ4MDQ1Y2VkZDBlZjc5ZDQxNGJiYmUiLCJpYXQiOjE3NzEzNDU3NzkuOTA3OTAxLCJuYmYiOjE3NzEzNDU3NzkuOTA3OTA0LCJleHAiOjQ5MjcwMTkzNzkuODk2MzEsInN1YiI6IjIxMzI5ODIiLCJzY29wZXMiOltdfQ.wiLakDmT5jreGlCSxatLdkqGZ4sP-yVGLlix3MmQWZMgQrL_jESxJpwLspGVuZSSmOkmPbMPI8twujS3cr2JwYHg7z3Kyxwz1NKlmzKphvqwkXcdUBCeQKO1Up-6ZsveZiO1LDKWljofnr0bddiJ0xnKdrw8Wb1NvoGKEPmU1YGnPib7Do6UlrjQvXJKvTo06U3KPTZRE_-2KRo2MVHPaJiTCvfHm5GsKhb2-YIQxv8vjKUAy2XilKb7bl9fjzI89-WB9IJaTMBnU-1tuGwhZD_u6ReVqDA_nbQ7Fwgkz_17hrskPO3mzvEH6hNkdXHTxiSwz26VOVYhAI-JXF-kfqtXLdnst2KVjBl_KWdTtetKxfnlmo51juyZs0X5cFXHirwgxPrsn0HGc4yJCJwjz_xHoInEFqIXxFHxRUE5TaNITUHvlCSzRgYguVVsb1F22xqYKny11hLh6Ja4EkfiudiY5pPe_yGpvy_MnrDMiJ5iH6fMqMzi4vse5YcalIIyZ0Mc_G_qhrckaWrYSpEvheHRn3LWfKLl1yV1twtEbmOEpu-dwOGudZENy5kQ61gy1vXHVICSXo1rKHTv-_HpCVMZhOOb9gj9kZQdpXDVyuzpltNBngXeQyudhlhpsvOcb0_R5Ni9JD_1sOod_pVfDiUWe7opF9EV5BIw8fzzTSc';

const BASE_URL = 'https://connect.mailerlite.com/api';

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

async function apiCall(method, endpoint, body = null) {
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const text = await response.text();
  if (!text) return response.ok ? { success: true } : null;
  try {
    const data = JSON.parse(text);
    if (!response.ok) {
      console.error(`   API Error (${response.status}):`, JSON.stringify(data, null, 2));
      return null;
    }
    return data;
  } catch {
    return response.ok ? { success: true } : null;
  }
}

async function main() {
  console.log('🚀 Setting up MailerLite Email Flow Infrastructure\n');

  // ========================================
  // STEP 1: Create custom fields
  // ========================================
  console.log('📋 Step 1: Creating custom fields...');

  const customFields = [
    { name: 'property_reference', type: 'text' },
    { name: 'property_url', type: 'text' },
    { name: 'property_area', type: 'text' },
    { name: 'property_type', type: 'text' },
    { name: 'budget_range', type: 'text' },
    { name: 'form_type', type: 'text' },
    { name: 'source_page', type: 'text' },
    { name: 'development_name', type: 'text' },
  ];

  // Get existing fields first
  const existingFields = await apiCall('GET', '/fields?limit=100');
  const existingFieldNames = (existingFields?.data || []).map(f => f.key);

  for (const field of customFields) {
    if (existingFieldNames.includes(field.name)) {
      console.log(`   ✅ Field already exists: ${field.name}`);
    } else {
      const result = await apiCall('POST', '/fields', field);
      if (result?.data) {
        console.log(`   ✅ Created field: ${field.name}`);
      } else {
        console.log(`   ⚠️  Could not create field: ${field.name}`);
      }
    }
  }

  // ========================================
  // STEP 2: Create flow-specific groups
  // ========================================
  console.log('\n📋 Step 2: Creating flow-specific groups...');

  const flowGroups = [
    'Property Inquiries',
    'Consultation Requests',
    'Newsletter Subscribers',
  ];

  const allGroupsData = await apiCall('GET', '/groups?limit=50');
  const allGroups = allGroupsData?.data || [];

  for (const groupName of flowGroups) {
    const existing = allGroups.find(g => g.name === groupName);
    if (existing) {
      console.log(`   ✅ Group exists: ${groupName} (${existing.id})`);
    } else {
      const result = await apiCall('POST', '/groups', { name: groupName });
      if (result?.data) {
        console.log(`   ✅ Created group: ${groupName} (${result.data.id})`);
      }
    }
  }

  // ========================================
  // STEP 3: Summary
  // ========================================
  console.log('\n' + '='.repeat(60));
  console.log('✅ INFRASTRUCTURE READY');
  console.log('='.repeat(60));

  console.log('\n📌 Custom fields created (merge tags for emails):');
  console.log('   {$property_reference} — e.g. N9185');
  console.log('   {$property_url} — full URL to property page');
  console.log('   {$property_area} — e.g. Torrevieja, Javea');
  console.log('   {$property_type} — e.g. Apartment, Villa');
  console.log('   {$budget_range} — e.g. €250,000');
  console.log('   {$form_type} — Property Inquiry / Newsletter / Consultation');
  console.log('   {$source_page} — which page they signed up on');
  console.log('   {$development_name} — e.g. La Hoya');

  console.log('\n📌 Email flow groups:');
  console.log('   "Property Inquiries" — triggers property inquiry email');
  console.log('   "Consultation Requests" — triggers consultation confirmation');
  console.log('   "Newsletter Subscribers" — triggers newsletter welcome');

  console.log('\n📌 How it works:');
  console.log('   1. User submits form on website');
  console.log('   2. API adds subscriber to MailerLite with custom fields');
  console.log('   3. Subscriber is assigned to language group + flow group');
  console.log('   4. MailerLite automation triggers based on group join');
  console.log('   5. Email is sent with personalized merge tags');

  console.log('\n📌 Next: Create 3 automations in MailerLite dashboard:');
  console.log('   Flow 1: "Property Inquiries" group → Property inquiry email');
  console.log('   Flow 2: "Newsletter Subscribers" group → Welcome email');
  console.log('   Flow 3: "Consultation Requests" group → Consultation confirmation');

  // Refresh and show all groups
  const finalGroups = await apiCall('GET', '/groups?limit=50');
  console.log('\n🔗 All Groups:');
  (finalGroups?.data || []).forEach(g => console.log(`   ${g.name}: ${g.id}`));

  console.log('\n✨ Done!\n');
}

main().catch(err => {
  console.error('Setup failed:', err.message);
  process.exit(1);
});
