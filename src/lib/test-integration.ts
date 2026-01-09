#!/usr/bin/env ts-node
/**
 * REDSP Feed Integration Test
 * 
 * Run this after copying files to your project:
 * npx ts-node src/lib/feeds/test-integration.ts
 */

import { fetchREDSPFeed, getREDSPTowns, getREDSPPropertyCountByTown } from './redsp-parser';
import { fetchAllProperties, getPropertyStats, getAllTowns } from './unified-feed-service';

async function runTests() {
  console.log('='.repeat(60));
  console.log('REDSP FEED INTEGRATION TEST');
  console.log('='.repeat(60));

  // Test 1: REDSP Feed
  console.log('\n📡 TEST 1: REDSP Feed Connection');
  console.log('-'.repeat(40));
  try {
    const redspProperties = await fetchREDSPFeed();
    console.log(`✅ REDSP Feed: ${redspProperties.length} properties loaded`);
    
    if (redspProperties.length > 0) {
      const sample = redspProperties[0];
      console.log(`   Sample: ${sample.reference} - ${sample.propertyType} in ${sample.town}`);
      console.log(`   Price: €${sample.price.toLocaleString()}`);
      console.log(`   Languages: ${Object.keys(sample.descriptions).join(', ')}`);
    }
  } catch (error) {
    console.log(`❌ REDSP Feed failed: ${error}`);
  }

  // Test 2: REDSP Towns
  console.log('\n🏘️ TEST 2: Towns from REDSP');
  console.log('-'.repeat(40));
  try {
    const towns = await getREDSPTowns();
    console.log(`✅ Found ${towns.length} towns:`);
    towns.slice(0, 10).forEach(t => {
      console.log(`   - ${t}: ${''} properties`);
    });
    if (towns.length > 10) console.log(`   ... and ${towns.length - 10} more`);
  } catch (error) {
    console.log(`❌ Failed: ${error}`);
  }

  // Test 3: Unified Feed (REDSP + Background Properties)
  console.log('\n🔗 TEST 3: Unified Feed (Both Sources)');
  console.log('-'.repeat(40));
  try {
    const allProperties = await fetchAllProperties();
    const stats = await getPropertyStats();
    
    console.log(`✅ Total properties: ${stats.totalProperties}`);
    console.log(`   By source:`);
    Object.entries(stats.bySource).forEach(([source, count]) => {
      console.log(`   - ${source}: ${count}`);
    });
    console.log(`   By region:`);
    Object.entries(stats.byRegion).forEach(([region, count]) => {
      console.log(`   - ${region}: ${count}`);
    });
  } catch (error) {
    console.log(`❌ Failed: ${error}`);
  }

  // Test 4: All Towns (Combined)
  console.log('\n🗺️ TEST 4: Combined Town List');
  console.log('-'.repeat(40));
  try {
    const allTowns = await getAllTowns();
    console.log(`✅ Found ${allTowns.length} unique towns across all feeds:`);
    allTowns.slice(0, 15).forEach(t => {
      console.log(`   - ${t}`);
    });
  } catch (error) {
    console.log(`❌ Failed: ${error}`);
  }

  // Test 5: Multilingual Support
  console.log('\n🌍 TEST 5: Multilingual Descriptions');
  console.log('-'.repeat(40));
  try {
    const properties = await fetchREDSPFeed();
    const withMultiLang = properties.filter(p => 
      Object.keys(p.descriptions).length > 1
    );
    
    if (withMultiLang.length > 0) {
      const sample = withMultiLang[0];
      const languages = Object.keys(sample.descriptions);
      console.log(`✅ Property ${sample.reference} has ${languages.length} languages:`);
      languages.forEach(lang => {
        const desc = sample.descriptions[lang as keyof typeof sample.descriptions];
        const preview = desc ? desc.substring(0, 60) + '...' : 'N/A';
        console.log(`   [${lang}] ${preview}`);
      });
    } else {
      console.log('⚠️ No multilingual properties found');
    }
  } catch (error) {
    console.log(`❌ Failed: ${error}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('TEST COMPLETE');
  console.log('='.repeat(60));
}

runTests().catch(console.error);
