/**
 * Homepage Carousel Image Updater
 * 
 * This script:
 * 1. Fetches all properties from your unified feed service
 * 2. Updates homepage-carousels.json with real image URLs
 * 3. Replaces fake North refs with real feed refs
 * 
 * Run: npx ts-node src/scripts/update-carousel-images.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getAllProperties } from '../lib/unified-feed-service';

// Real North property refs from your spec (replacing fake JAVEA-001 etc.)
const NORTH_REFS = {
  'north-luxury': ['N9401', 'N9404', 'N7975'],  // Jávea & surrounds
  'north-calpe': ['SP0195', 'SP1297', 'N6130'], // Calpe & Finestrat
  'north-denia': ['N8251', 'N5632', 'N6430'],   // Denia & surrounds
};

// Expected property data for North refs (from your spec screenshots)
const NORTH_PROPERTY_DATA: Record<string, any> = {
  'N9401': {
    title: '3-Bed Villa with Pool in Jávea',
    development: 'CA LOS OLIVOS',
    town: 'Jávea',
    zone: 'Valle del Sol',
    price: 1375000,
    propertyType: 'Villa',
    bedrooms: 3,
    bathrooms: 3,
    builtArea: 189,
    plotArea: 800,
    isKeyReady: true,
    isGolf: false,
    hasPool: true,
    hasSeaview: true,
    features: ['Sea Views', 'Private Pool', 'Luxury'],
  },
  'N9404': {
    title: '4-Bed Villa with Pool in Jávea',
    development: 'CA SOROLLA',
    town: 'Jávea',
    zone: 'Valle del Sol',
    price: 1525000,
    propertyType: 'Villa',
    bedrooms: 4,
    bathrooms: 4,
    builtArea: 245,
    plotArea: 1000,
    isKeyReady: true,
    isGolf: false,
    hasPool: true,
    hasSeaview: true,
    features: ['4 Bedrooms', 'Sea Views', 'Premium'],
  },
  'N7975': {
    title: '3-Bed Villa with Pool in Polop',
    development: 'VENECIA V',
    town: 'Polop',
    zone: 'Urbanizaciones',
    price: 860000,
    propertyType: 'Villa',
    bedrooms: 3,
    bathrooms: 3,
    builtArea: 306,
    plotArea: 800,
    isKeyReady: true,
    isGolf: false,
    hasPool: true,
    features: ['Large Build', 'Private Pool', 'Mountain Views'],
  },
  'SP0195': {
    title: '2-Bed Penthouse with Sea Views in Calpe',
    development: 'ALEXIA',
    town: 'Calpe',
    zone: 'Arenal Bol',
    price: 559250,
    propertyType: 'Penthouse',
    bedrooms: 2,
    bathrooms: 2,
    builtArea: 68,
    isKeyReady: true,
    isGolf: false,
    hasPool: true,
    hasSeaview: true,
    features: ['Penthouse', 'Sea Views', 'Near Beach'],
  },
  'SP1297': {
    title: '4-Bed Villa with Pool in Finestrat',
    development: 'SALISOL HILLS',
    town: 'Finestrat',
    zone: 'Balcón De Finestrat',
    price: 650000,
    propertyType: 'Villa',
    bedrooms: 4,
    bathrooms: 3,
    builtArea: 202,
    plotArea: 500,
    isKeyReady: true,
    isGolf: false,
    hasPool: true,
    features: ['4 Bedrooms', 'Private Pool', 'Mountain Views'],
  },
  'N6130': {
    title: '4-Bed Luxury Villa with Pool in Finestrat',
    development: 'ORANGE',
    town: 'Finestrat',
    zone: 'Campana Garden',
    price: 1350000,
    propertyType: 'Villa',
    bedrooms: 4,
    bathrooms: 4,
    builtArea: 486,
    plotArea: 1200,
    isKeyReady: true,
    isGolf: false,
    hasPool: true,
    hasSeaview: true,
    features: ['Luxury', 'Private Pool', 'Premium Design'],
  },
  'N8251': {
    title: '3-Bed Penthouse in Denia',
    development: 'RESIDENCIAL VICTORIA IV',
    town: 'Denia',
    zone: 'Las Marinas',
    price: 499000,
    propertyType: 'Penthouse',
    bedrooms: 3,
    bathrooms: 3,
    builtArea: 82,
    isKeyReady: true,
    isGolf: false,
    hasPool: true,
    hasSeaview: true,
    features: ['Penthouse', 'Near Beach', 'Modern'],
  },
  'N5632': {
    title: '3-Bed Villa with Pool in Mutxamel',
    development: 'ALICANTE PANORAMIC',
    town: 'Mutxamel',
    zone: 'Mutxamel',
    price: 450000,
    propertyType: 'Villa',
    bedrooms: 3,
    bathrooms: 3,
    builtArea: 118,
    plotArea: 300,
    isKeyReady: true,
    isGolf: false,
    hasPool: true,
    features: ['Private Pool', 'City Views', 'Modern Design'],
  },
  'N6430': {
    title: '3-Bed Villa with Pool in La Nucia',
    development: 'DON MAR LA NUCIA',
    town: 'La Nucia',
    zone: 'Urb. Don Mar',
    price: 600000,
    propertyType: 'Villa',
    bedrooms: 3,
    bathrooms: 3,
    builtArea: 141,
    plotArea: 400,
    isKeyReady: true,
    isGolf: false,
    hasPool: true,
    features: ['Private Pool', 'Mountain Views', 'Premium'],
  },
};

async function main() {
  console.log('🏠 Homepage Carousel Image Updater\n');
  console.log('Fetching all properties from feeds...');
  
  // Fetch all properties
  const allProperties = await getAllProperties();
  console.log(`✓ Found ${allProperties.length} properties in feeds\n`);
  
  // Create lookup by reference (case insensitive)
  const propertyMap = new Map(
    allProperties.map(p => [p.reference.toUpperCase(), p])
  );
  
  // Load current carousel JSON
  const carouselPath = path.join(__dirname, '..', 'content', 'homepage-carousels.json');
  const carouselData = JSON.parse(fs.readFileSync(carouselPath, 'utf-8'));
  
  console.log('Processing carousels...\n');
  
  let totalUpdated = 0;
  let totalMissing = 0;
  let totalReplaced = 0;
  
  // Process each carousel
  for (const [carouselId, carousel] of Object.entries(carouselData.carousels)) {
    const carouselObj = carousel as any;
    console.log(`📦 ${carouselId}:`);
    
    // Check if this is a North carousel that needs ref replacement
    if (NORTH_REFS[carouselId as keyof typeof NORTH_REFS]) {
      const newRefs = NORTH_REFS[carouselId as keyof typeof NORTH_REFS];
      console.log(`   Replacing with real refs: ${newRefs.join(', ')}`);
      
      // Build new properties array from real refs
      const newProperties = [];
      
      for (const ref of newRefs) {
        const feedProp = propertyMap.get(ref.toUpperCase());
        const specData = NORTH_PROPERTY_DATA[ref];
        
        if (feedProp) {
          // Get image from feed
          const image = feedProp.images?.[0]?.url || feedProp.images?.[0] || '';
          
          // Merge feed data with spec data (spec data as fallback for missing fields)
          newProperties.push({
            reference: ref,
            title: specData?.title || generateTitle(feedProp),
            development: specData?.development || feedProp.locationDetail?.toUpperCase() || '',
            town: feedProp.town || specData?.town,
            zone: feedProp.locationDetail || specData?.zone || '',
            price: feedProp.price || specData?.price,
            propertyType: feedProp.propertyType || specData?.propertyType,
            bedrooms: feedProp.bedrooms || specData?.bedrooms,
            bathrooms: feedProp.bathrooms || specData?.bathrooms,
            builtArea: feedProp.builtArea || specData?.builtArea,
            plotArea: feedProp.plotArea || specData?.plotArea,
            isKeyReady: specData?.isKeyReady ?? true,
            isGolf: specData?.isGolf ?? false,
            hasPool: feedProp.hasPool || specData?.hasPool || false,
            hasSeaview: feedProp.hasSeaview || specData?.hasSeaview || false,
            features: specData?.features || extractFeatures(feedProp),
            image: image,
          });
          
          console.log(`   ✓ ${ref}: Found in feed${image ? ' (with image)' : ' (no image)'}`);
          if (image) totalUpdated++;
          totalReplaced++;
        } else if (specData) {
          // Use spec data if not in feed
          newProperties.push({
            reference: ref,
            ...specData,
            image: '',
          });
          console.log(`   ⚠ ${ref}: Not in feed, using spec data`);
          totalMissing++;
          totalReplaced++;
        } else {
          console.log(`   ✗ ${ref}: Not found anywhere`);
          totalMissing++;
        }
      }
      
      carouselObj.properties = newProperties;
    } else {
      // For South carousels, just add images to existing properties
      for (const prop of carouselObj.properties) {
        const feedProp = propertyMap.get(prop.reference.toUpperCase());
        
        if (feedProp && feedProp.images?.length > 0) {
          const image = feedProp.images[0]?.url || feedProp.images[0];
          if (typeof image === 'string' && image) {
            prop.image = image;
            console.log(`   ✓ ${prop.reference}: Added image`);
            totalUpdated++;
          } else {
            console.log(`   ⚠ ${prop.reference}: Image format issue`);
            totalMissing++;
          }
        } else {
          console.log(`   ✗ ${prop.reference}: No images in feed`);
          totalMissing++;
        }
      }
    }
    
    console.log('');
  }
  
  // Update timestamp
  carouselData.lastUpdated = new Date().toISOString().split('T')[0];
  
  // Write back
  fs.writeFileSync(carouselPath, JSON.stringify(carouselData, null, 2));
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Summary:');
  console.log(`   ✓ Images added: ${totalUpdated}`);
  console.log(`   🔄 North refs replaced: ${totalReplaced}`);
  console.log(`   ✗ Missing/issues: ${totalMissing}`);
  console.log(`\n✅ Saved to: ${carouselPath}`);
}

function generateTitle(prop: any): string {
  const parts = [];
  if (prop.bedrooms) parts.push(`${prop.bedrooms}-Bed`);
  parts.push(prop.propertyType || 'Property');
  if (prop.hasPool) parts.push('with Pool');
  else if (prop.hasSeaview) parts.push('with Sea Views');
  parts.push(`in ${prop.town}`);
  return parts.join(' ');
}

function extractFeatures(prop: any): string[] {
  const features = [];
  if (prop.hasPool) features.push('Private Pool');
  if (prop.hasSeaview) features.push('Sea Views');
  if (prop.hasGolfview) features.push('Golf Views');
  if (prop.hasTerrace) features.push('Terrace');
  if (prop.hasGarden) features.push('Garden');
  return features.slice(0, 3);
}

main().catch(console.error);
