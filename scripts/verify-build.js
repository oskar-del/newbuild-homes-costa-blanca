#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SRC_DIR = './src';
const FORBIDDEN = ['idealista.com', 'kyero.com', 'fotocasa.es'];
const SAMPLE_DATA = ['Lorem ipsum', 'TODO:', 'FIXME:', 'placeholder'];

let issues = 0;
let passes = 0;

function getAllFiles(dir, exts = ['.tsx', '.ts']) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory() && item !== 'node_modules') {
      files.push(...getAllFiles(full, exts));
    } else if (exts.some(e => item.endsWith(e))) {
      files.push(full);
    }
  }
  return files;
}

function check(file) {
  const content = fs.readFileSync(file, 'utf-8');
  const rel = path.relative('.', file);
  const isPage = file.includes('/app/') && file.endsWith('page.tsx');
  const fileIssues = [];

  if (isPage) {
    if (!content.includes('generateMetadata') && !content.includes('export const metadata')) {
      fileIssues.push('Missing generateMetadata()');
    }
    if (!content.includes('revalidate')) {
      fileIssues.push('Missing revalidate for ISR');
    }
    if (!content.includes('schema.org') && !content.includes('@context') && !content.includes('JsonLd')) {
      fileIssues.push('Missing schema markup');
    }
    if (!content.includes('BreadcrumbList') && !content.includes('Breadcrumb')) {
      fileIssues.push('Missing BreadcrumbList');
    }
    if (!content.includes('FAQPage') && !content.includes('faq')) {
      fileIssues.push('Missing FAQPage');
    }
  }

  for (const f of FORBIDDEN) {
    if (content.includes(f)) fileIssues.push(`Forbidden link: ${f}`);
  }
  for (const s of SAMPLE_DATA) {
    if (content.toLowerCase().includes(s.toLowerCase())) fileIssues.push(`Sample data: ${s}`);
  }

  if (fileIssues.length > 0) {
    console.log(`\n❌ ${rel}`);
    fileIssues.forEach(i => { console.log(`   - ${i}`); issues++; });
  } else if (isPage) {
    passes++;
  }
}

console.log('\n🔍 BUILD RULES VERIFICATION\n');
const files = getAllFiles(SRC_DIR);
console.log(`Checking ${files.length} files...`);
files.forEach(check);

console.log('\n' + '='.repeat(40));
console.log(`✓ Passed: ${passes} pages`);
console.log(`✗ Issues: ${issues}`);

if (issues > 0) {
  console.log('\n❌ FAILED - Fix issues before commit\n');
  process.exit(1);
} else {
  console.log('\n✅ PASSED - Safe to commit\n');
  process.exit(0);
}
