#!/usr/bin/env npx tsx

/**
 * Content Generation Script
 * 
 * Run this script to generate/regenerate SEO content for all developments
 * 
 * Usage:
 *   npm run generate-content              # Generate missing content only
 *   npm run generate-content -- --all     # Regenerate all content
 *   npm run generate-content -- --dev slug-name  # Generate specific development
 */

import { config } from 'dotenv';
config(); // Load environment variables

import { getAllDevelopments, getAllBuilders, getAllAreas } from '../lib/property-service';
import { 
  generateDevelopmentContent, 
  generateBuilderContent, 
  generateAreaContent 
} from '../lib/ai-content-generator';
import { saveContent, hasValidContent, listGeneratedContent } from '../lib/content-store';

async function main() {
  const args = process.argv.slice(2);
  const regenerateAll = args.includes('--all');
  const specificDev = args.indexOf('--dev') !== -1 ? args[args.indexOf('--dev') + 1] : null;
  
  console.log('\n🚀 Content Generation Script');
  console.log('================================\n');
  
  // Check for API key
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ Error: ANTHROPIC_API_KEY environment variable not set');
    console.log('\nTo set it, add to .env.local:');
    console.log('ANTHROPIC_API_KEY=your-api-key-here\n');
    process.exit(1);
  }
  
  // Get all data from XML feed
  console.log('📡 Fetching developments from XML feed...');
  const developments = await getAllDevelopments();
  const builders = getAllBuilders();
  const areas = getAllAreas();
  
  console.log(`   Found ${developments.length} developments`);
  console.log(`   Found ${builders.length} builders`);
  console.log(`   Found ${areas.length} areas\n`);
  
  // Show current content status
  const existing = listGeneratedContent();
  console.log(`📁 Existing generated content: ${existing.length} files\n`);
  
  let generated = 0;
  let skipped = 0;
  let errors = 0;
  
  // Generate development content
  console.log('📝 Generating development content...\n');
  
  for (const dev of developments) {
    // Skip if specific development requested and this isn't it
    if (specificDev && dev.slug !== specificDev) continue;
    
    // Skip if valid content exists and not regenerating all
    if (!regenerateAll && hasValidContent('development', dev.slug)) {
      console.log(`   ⏭️  Skipping ${dev.name} (content exists)`);
      skipped++;
      continue;
    }
    
    try {
      console.log(`   🔄 Generating: ${dev.name}...`);
      const content = await generateDevelopmentContent(dev);
      saveContent('development', dev.slug, content);
      generated++;
      
      // Small delay to avoid rate limits
      await sleep(2000);
    } catch (error) {
      console.error(`   ❌ Error generating ${dev.name}:`, error);
      errors++;
    }
  }
  
  // Generate builder content
  if (!specificDev) {
    console.log('\n📝 Generating builder content...\n');
    
    for (const builder of builders) {
      if (!regenerateAll && hasValidContent('builder', builder.slug)) {
        console.log(`   ⏭️  Skipping ${builder.name} (content exists)`);
        skipped++;
        continue;
      }
      
      try {
        console.log(`   🔄 Generating: ${builder.name}...`);
        const builderDevs = developments.filter(d => d.developerSlug === builder.slug);
        const content = await generateBuilderContent(builder, builderDevs);
        saveContent('builder', builder.slug, content);
        generated++;
        
        await sleep(2000);
      } catch (error) {
        console.error(`   ❌ Error generating ${builder.name}:`, error);
        errors++;
      }
    }
    
    // Generate area content
    console.log('\n📝 Generating area content...\n');
    
    for (const area of areas) {
      if (!regenerateAll && hasValidContent('area', area.slug)) {
        console.log(`   ⏭️  Skipping ${area.name} (content exists)`);
        skipped++;
        continue;
      }
      
      try {
        console.log(`   🔄 Generating: ${area.name}...`);
        const areaDevs = developments.filter(d => 
          d.town.toLowerCase() === area.name.toLowerCase() ||
          d.zone?.toLowerCase() === area.name.toLowerCase()
        );
        const content = await generateAreaContent(area, areaDevs);
        saveContent('area', area.slug, content);
        generated++;
        
        await sleep(2000);
      } catch (error) {
        console.error(`   ❌ Error generating ${area.name}:`, error);
        errors++;
      }
    }
  }
  
  // Summary
  console.log('\n================================');
  console.log('📊 Generation Complete!\n');
  console.log(`   ✅ Generated: ${generated}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log('\n');
  
  if (generated > 0) {
    console.log('💡 Next steps:');
    console.log('   1. Review generated content in src/content/generated/');
    console.log('   2. Run npm run build to rebuild the site');
    console.log('   3. Deploy to see the new content live\n');
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main().catch(console.error);
