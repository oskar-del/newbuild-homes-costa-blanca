#!/usr/bin/env node
/**
 * Fix Seller Schema in Development JSON Files
 * 
 * This script adds the missing address to the "seller" object in schemaProduct
 * for all development JSON files.
 */

const fs = require('fs');
const path = require('path');

// The complete seller object with address
const completeSeller = {
  "@type": "RealEstateAgent",
  "name": "New Build Homes Costa Blanca",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Caballero de Rodas 31",
    "addressLocality": "Torrevieja",
    "postalCode": "03181",
    "addressRegion": "Alicante",
    "addressCountry": "ES"
  },
  "telephone": "+34634044970",
  "url": "https://newbuildhomescostablanca.com"
};

// Directory containing development JSON files
const developmentsDir = process.argv[2] || './src/content/developments';

function fixSellerSchema(filePath) {
  try {
    // Read the file
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    // Check if schemaProduct exists and has offers.seller
    if (data.schemaProduct && data.schemaProduct.offers && data.schemaProduct.offers.seller) {
      // Update the seller with complete info
      data.schemaProduct.offers.seller = completeSeller;
      
      // Write back to file with pretty formatting
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      
      console.log(`✅ Fixed: ${path.basename(filePath)}`);
      return true;
    } else {
      console.log(`⚠️  Skipped (no schemaProduct.offers.seller): ${path.basename(filePath)}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${path.basename(filePath)}: ${error.message}`);
    return false;
  }
}

// Main execution
console.log('🔧 Fixing seller schema in development JSON files...\n');
console.log(`📁 Looking in: ${developmentsDir}\n`);

// Get all JSON files in the directory
let files;
try {
  files = fs.readdirSync(developmentsDir).filter(f => f.endsWith('.json'));
} catch (error) {
  console.error(`❌ Cannot read directory: ${developmentsDir}`);
  console.error('   Make sure to run this from your project root, or pass the path as argument:');
  console.error('   node fix-seller-schema.js /path/to/src/content/developments');
  process.exit(1);
}

console.log(`📄 Found ${files.length} JSON files\n`);

let fixed = 0;
let skipped = 0;
let errors = 0;

files.forEach(file => {
  const filePath = path.join(developmentsDir, file);
  const result = fixSellerSchema(filePath);
  if (result === true) fixed++;
  else if (result === false) skipped++;
  else errors++;
});

console.log('\n📊 Summary:');
console.log(`   ✅ Fixed: ${fixed}`);
console.log(`   ⚠️  Skipped: ${skipped}`);
console.log(`   ❌ Errors: ${errors}`);
console.log('\n✨ Done! Commit and deploy to see the changes.');
