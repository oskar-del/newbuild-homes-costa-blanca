const Anthropic = require('@anthropic-ai/sdk').default;
const fs = require('fs');
const path = require('path');

// Initialize Anthropic client
const anthropic = new Anthropic();

const FEED_URL = 'http://feeds.transporter.janeladigital.com/423E0F5F-30FC-4E01-8FE1-99BD7E14B021/0500015622.xml';

// Standard contact info
const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  habeno: 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e',
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractProjectName(description, propertyType, ref) {
  const patterns = [
    /present\s+(Villa\s+\w+)/i,
    /presenting\s+(Villa\s+\w+)/i,
    /(Villa\s+\w+),/i,
    /(Villa\s+\w+)\s+is/i,
    /(Villa\s+\w+)\s+offers/i,
    /welcome\s+to\s+(Villa\s+\w+)/i,
    /discover\s+(Villa\s+\w+)/i,
  ];

  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return `${propertyType} ${ref}`;
}

function parseXML(xml) {
  // Simple XML parser for our specific feed structure
  const properties = [];
  const propertyMatches = xml.match(/<property>[\s\S]*?<\/property>/g) || [];
  
  // Get agent/developer name
  const agentMatch = xml.match(/<agent>[\s\S]*?<name><!\[CDATA\[(.*?)\]\]><\/name>[\s\S]*?<\/agent>/);
  const developerName = agentMatch ? agentMatch[1].trim() : 'Miralbo Urbana';
  
  for (const propXml of propertyMatches) {
    const getValue = (tag) => {
      const match = propXml.match(new RegExp(`<${tag}><!\\\[CDATA\\\[(.*?)\\\]\\\]><\/${tag}>`)) ||
                    propXml.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`));
      return match ? match[1] : '';
    };
    
    const getNestedValue = (parent, tag) => {
      const parentMatch = propXml.match(new RegExp(`<${parent}>[\\s\\S]*?<${tag}>(.*?)<\\/${tag}>[\\s\\S]*?<\\/${parent}>`));
      return parentMatch ? parentMatch[1] : '';
    };
    
    const newBuild = getValue('new_build');
    if (newBuild !== '1') continue;
    
    // Get images
    const images = [];
    const imageMatches = propXml.match(/<url>(https?:\/\/[^<]+)<\/url>/g) || [];
    for (const imgMatch of imageMatches) {
      const url = imgMatch.replace(/<\/?url>/g, '');
      if (url.includes('media.egorealestate.com')) {
        images.push(url);
      }
    }
    
    // Get description
    const descMatch = propXml.match(/<desc>[\s\S]*?<en><!\[CDATA\[([\s\S]*?)\]\]><\/en>/);
    const description = descMatch ? descMatch[1].replace(/#ref:\w+/gi, '').trim() : '';
    
    const id = getValue('id');
    const ref = getValue('ref') || id;
    const propertyType = getValue('type');
    const projectName = extractProjectName(description, propertyType, ref);
    
    properties.push({
      id,
      ref,
      price: parseInt(getValue('price')) || null,
      bedrooms: parseInt(getValue('beds')) || null,
      bathrooms: parseInt(getValue('baths')) || null,
      builtSize: parseInt(getNestedValue('surface_area', 'built')) || null,
      plotSize: parseInt(getNestedValue('surface_area', 'plot')) || null,
      town: getValue('town'),
      province: getValue('province') || 'Alicante',
      locationDetail: getValue('location_detail'),
      propertyType,
      description,
      images,
      developer: developerName,
      projectName,
      slug: slugify(projectName),
    });
  }
  
  return properties;
}

async function fetchFeedData() {
  console.log('Fetching feed data...');
  const response = await fetch(FEED_URL);
  const xml = await response.text();
  return parseXML(xml);
}

async function generateDevelopmentContent(property) {
  console.log(`Generating content for ${property.projectName}...`);
  
  const prompt = `You are an expert real estate copywriter specializing in Costa Blanca luxury properties. Generate comprehensive, SEO-optimized content for a property listing page.

PROPERTY DATA:
- Project Name: ${property.projectName}
- Property Type: ${property.propertyType}
- Location: ${property.locationDetail}, ${property.town}, ${property.province}
- Price: ${property.price ? `€${property.price.toLocaleString()}` : 'Price on request'}
- Bedrooms: ${property.bedrooms || 'N/A'}
- Bathrooms: ${property.bathrooms || 'N/A'}
- Built Size: ${property.builtSize ? `${property.builtSize} m²` : 'N/A'}
- Plot Size: ${property.plotSize ? `${property.plotSize} m²` : 'N/A'}
- Developer: ${property.developer}
- Reference: ${property.ref}

ORIGINAL DESCRIPTION FROM DEVELOPER:
${property.description}

CONTACT INFO TO USE:
- WhatsApp: ${CONTACT.whatsapp}
- Phone: ${CONTACT.phone}
- Habeno Mortgage Link: ${CONTACT.habeno}

Generate the following in JSON format:

{
  "metaTitle": "55-60 character SEO title",
  "metaDescription": "150-160 character meta description",
  "heroIntro": "2-3 compelling paragraphs introducing the property (use the developer description as base but enhance it)",
  "locationSection": {
    "intro": "2 paragraphs about why this location in ${property.town} is special",
    "highlights": ["5 location highlights as bullet points"]
  },
  "propertyFeatures": {
    "intro": "1 paragraph about the property's key features",
    "features": ["8-10 key features as bullet points"]
  },
  "investmentSection": "2 paragraphs about investment potential, rental yields in ${property.town}, and why this is a good investment",
  "whyBuySection": ["5-7 compelling reasons to buy this property"],
  "faqs": [
    {"question": "relevant FAQ question", "answer": "comprehensive answer (2-3 sentences)"}
  ],
  "conclusion": "1 paragraph with strong CTA"
}

Generate 8-10 FAQs covering: price/payment, location benefits, buying process, mortgage availability, rental potential, completion/availability, what's included, and how to view.

Make content unique, engaging, and optimized for "new build villa ${property.town}" and "${property.projectName}" keywords. Avoid generic filler - be specific about this property and location.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  const textContent = response.content.find(c => c.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response from Claude');
  }
  
  const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON from response');
  }
  
  const content = JSON.parse(jsonMatch[0]);
  
  // Generate image alt tags
  const imageAlts = generateImageAlts(property);
  
  // Build schema markup
  const schemaProduct = buildProductSchema(property);
  const schemaFAQ = buildFAQSchema(content.faqs);
  const schemaBreadcrumb = buildBreadcrumbSchema(property);
  
  return {
    slug: property.slug,
    projectName: property.projectName,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
    content,
    property: {
      ref: property.ref,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      builtSize: property.builtSize,
      plotSize: property.plotSize,
      town: property.town,
      province: property.province,
      propertyType: property.propertyType,
      developer: property.developer,
      developerSlug: slugify(property.developer),
      images: property.images,
    },
    schemaProduct,
    schemaFAQ,
    schemaBreadcrumb,
    imageAlts,
  };
}

function generateImageAlts(property) {
  const alts = [];
  const imageTypes = ['exterior view', 'interior living area', 'kitchen', 'bedroom', 'bathroom', 'terrace', 'pool area', 'garden'];
  
  for (let i = 0; i < property.images.length; i++) {
    const imageType = imageTypes[i] || `view ${i + 1}`;
    alts.push({
      url: property.images[i],
      alt: `${property.projectName} ${property.town} - ${imageType} of this new build ${property.propertyType.toLowerCase()} in Costa Blanca`,
    });
  }
  
  return alts;
}

function buildProductSchema(property) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": property.projectName,
    "image": property.images.slice(0, 3),
    "description": `New build ${property.propertyType.toLowerCase()} in ${property.town}, Costa Blanca. ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms, ${property.builtSize} m² built size.`,
    "brand": {
      "@type": "Brand",
      "name": property.developer
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.newbuildhomescostablanca.com/developments/${property.slug}/`,
      "priceCurrency": "EUR",
      "price": property.price || undefined,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "RealEstateAgent",
        "name": "New Build Homes Costa Blanca"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.town,
      "addressRegion": property.province,
      "addressCountry": "ES"
    }
  };
}

function buildFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

function buildBreadcrumbSchema(property) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.newbuildhomescostablanca.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Developments",
        "item": "https://www.newbuildhomescostablanca.com/developments/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": property.projectName,
        "item": `https://www.newbuildhomescostablanca.com/developments/${property.slug}/`
      }
    ]
  };
}

async function generateBuilderContent(properties) {
  console.log('Generating builder profile...');
  
  const developer = properties[0].developer;
  const towns = [...new Set(properties.map(p => p.town))];
  const propertyTypes = [...new Set(properties.map(p => p.propertyType))];
  const priceRange = properties.filter(p => p.price).map(p => p.price);
  const minPrice = Math.min(...priceRange);
  const maxPrice = Math.max(...priceRange);
  
  const prompt = `You are an expert real estate copywriter. Generate a comprehensive builder profile page for a Spanish property developer.

BUILDER DATA:
- Name: ${developer}
- Location: ${towns.join(', ')}, Costa Blanca, Spain
- Property Types: ${propertyTypes.join(', ')}
- Number of Current Projects: ${properties.length}
- Price Range: €${minPrice.toLocaleString()} - €${maxPrice.toLocaleString()}

PROJECT LIST:
${properties.map(p => `- ${p.projectName}: ${p.propertyType} in ${p.town}, ${p.bedrooms} bed, €${p.price?.toLocaleString() || 'POA'}`).join('\n')}

Generate the following in JSON format:

{
  "metaTitle": "55-60 character SEO title for builder page",
  "metaDescription": "150-160 character meta description",
  "heroIntro": "2 compelling paragraphs introducing the builder and their reputation",
  "aboutSection": "2-3 paragraphs about the company, their experience, quality standards",
  "qualitySection": {
    "intro": "1 paragraph about construction quality",
    "standards": ["5-6 quality standards/features"]
  },
  "whyChooseSection": ["5-6 reasons to choose this builder"],
  "faqs": [
    {"question": "FAQ about the builder", "answer": "comprehensive answer"}
  ],
  "conclusion": "1 paragraph with CTA"
}

Generate 6-8 FAQs covering: experience, warranty, property types, viewing process, quality standards, payment plans.

Focus on ${developer} as a luxury villa specialist in ${towns.join('/')}, Costa Blanca.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3000,
    messages: [{ role: 'user', content: prompt }],
  });

  const textContent = response.content.find(c => c.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response');
  }
  
  const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON');
  }
  
  const content = JSON.parse(jsonMatch[0]);
  
  return {
    slug: slugify(developer),
    name: developer,
    towns,
    propertyTypes,
    propertyCount: properties.length,
    priceRange: { min: minPrice, max: maxPrice },
    content,
    projects: properties.map(p => ({
      name: p.projectName,
      slug: p.slug,
      town: p.town,
      propertyType: p.propertyType,
      price: p.price,
      bedrooms: p.bedrooms,
      image: p.images[0],
    })),
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": developer,
      "url": `https://www.newbuildhomescostablanca.com/builders/${slugify(developer)}/`,
      "description": content.metaDescription,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": towns[0],
        "addressRegion": "Alicante",
        "addressCountry": "ES"
      }
    },
    schemaFAQ: buildFAQSchema(content.faqs),
  };
}

async function generateAreaContent(properties, area) {
  console.log(`Generating area guide for ${area}...`);
  
  const areaProperties = properties.filter(p => p.town.includes(area) || area.includes(p.town));
  const propertyTypes = [...new Set(areaProperties.map(p => p.propertyType))];
  const priceRange = areaProperties.filter(p => p.price).map(p => p.price);
  const minPrice = priceRange.length ? Math.min(...priceRange) : 0;
  const maxPrice = priceRange.length ? Math.max(...priceRange) : 0;
  
  const prompt = `You are an expert Costa Blanca real estate writer. Generate a comprehensive area guide for property buyers.

AREA DATA:
- Area: ${area}, Costa Blanca, Spain
- Region: Costa Blanca North, Alicante Province
- Number of New Build Properties: ${areaProperties.length}
- Property Types Available: ${propertyTypes.join(', ')}
- Price Range: €${minPrice.toLocaleString()} - €${maxPrice.toLocaleString()}

CURRENT DEVELOPMENTS IN AREA:
${areaProperties.map(p => `- ${p.projectName}: ${p.propertyType}, ${p.bedrooms} bed`).join('\n')}

Generate the following in JSON format:

{
  "metaTitle": "55-60 character SEO title for area guide",
  "metaDescription": "150-160 character meta description",
  "heroIntro": "2-3 paragraphs introducing ${area} as a place to live and buy property",
  "lifestyleSection": {
    "intro": "2 paragraphs about the lifestyle in ${area}",
    "highlights": ["6-8 lifestyle highlights"]
  },
  "amenitiesSection": {
    "beaches": "1 paragraph about nearby beaches",
    "dining": "1 paragraph about restaurants and nightlife", 
    "shopping": "1 paragraph about shopping options",
    "healthcare": "1 paragraph about medical facilities",
    "transport": "1 paragraph about airports and getting around"
  },
  "propertyMarketSection": "2 paragraphs about the property market, prices, trends",
  "whyLiveHereSection": ["6-8 reasons to live in ${area}"],
  "faqs": [
    {"question": "FAQ about living/buying in ${area}", "answer": "comprehensive answer"}
  ],
  "conclusion": "1 paragraph encouraging buyers to explore properties"
}

Generate 8-10 FAQs covering: cost of living, expat community, climate, safety, healthcare, language, property prices, rental potential.

Be specific about ${area} - mention actual beaches, restaurants areas, local landmarks. This is Costa Blanca North - upmarket, less touristy than the south.`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }],
  });

  const textContent = response.content.find(c => c.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response');
  }
  
  const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON');
  }
  
  const content = JSON.parse(jsonMatch[0]);
  
  return {
    slug: slugify(area),
    name: area,
    propertyCount: areaProperties.length,
    propertyTypes,
    priceRange: { min: minPrice, max: maxPrice },
    content,
    developments: areaProperties.map(p => ({
      name: p.projectName,
      slug: p.slug,
      propertyType: p.propertyType,
      price: p.price,
      bedrooms: p.bedrooms,
      image: p.images[0],
    })),
    schema: {
      "@context": "https://schema.org",
      "@type": "Place",
      "name": area,
      "description": content.metaDescription,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": area,
        "addressRegion": "Alicante",
        "addressCountry": "ES"
      }
    },
    schemaFAQ: buildFAQSchema(content.faqs),
  };
}

async function main() {
  console.log('Starting content generation...\n');
  
  // Create output directories
  const contentDir = path.join(process.cwd(), 'src', 'content');
  const developmentsDir = path.join(contentDir, 'developments');
  const buildersDir = path.join(contentDir, 'builders');
  const areasDir = path.join(contentDir, 'areas');
  
  fs.mkdirSync(developmentsDir, { recursive: true });
  fs.mkdirSync(buildersDir, { recursive: true });
  fs.mkdirSync(areasDir, { recursive: true });
  
  // Fetch property data
  const properties = await fetchFeedData();
  console.log(`Found ${properties.length} new build properties\n`);
  
  // Generate development content for each property
  const developmentContents = [];
  for (const property of properties) {
    try {
      const content = await generateDevelopmentContent(property);
      developmentContents.push(content);
      
      // Save individual development content
      const filePath = path.join(developmentsDir, `${property.slug}.json`);
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
      console.log(`✓ Saved ${property.projectName}`);
      
      // Rate limiting - wait between API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`✗ Error generating ${property.projectName}:`, error.message);
    }
  }
  
  // Generate builder content
  try {
    const builderContent = await generateBuilderContent(properties);
    const builderPath = path.join(buildersDir, `${slugify(properties[0].developer)}.json`);
    fs.writeFileSync(builderPath, JSON.stringify(builderContent, null, 2));
    console.log(`\n✓ Saved builder profile: ${properties[0].developer}`);
  } catch (error) {
    console.error('✗ Error generating builder content:', error.message);
  }
  
  // Generate area content for unique areas
  const areas = [...new Set(properties.map(p => p.town))];
  for (const area of areas) {
    try {
      const areaContent = await generateAreaContent(properties, area);
      const areaPath = path.join(areasDir, `${slugify(area)}.json`);
      fs.writeFileSync(areaPath, JSON.stringify(areaContent, null, 2));
      console.log(`✓ Saved area guide: ${area}`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`✗ Error generating ${area} guide:`, error.message);
    }
  }
  
  // Save index file
  fs.writeFileSync(
    path.join(developmentsDir, 'index.json'),
    JSON.stringify(developmentContents.map(d => ({
      slug: d.slug,
      name: d.projectName,
      metaTitle: d.metaTitle,
      town: d.property.town,
      price: d.property.price,
    })), null, 2)
  );
  
  console.log('\n✓ Content generation complete!');
  console.log(`  - ${developmentContents.length} developments`);
  console.log(`  - 1 builder profile`);
  console.log(`  - ${areas.length} area guides`);
}

main().catch(console.error);
