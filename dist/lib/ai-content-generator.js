"use strict";
/**
 * AI SEO Content Generator
 *
 * Automatically generates rich SEO articles for developments, builders, and areas
 * Uses Claude API with your proven templates and CTAs
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STANDARD_CTAS = void 0;
exports.generateDevelopmentContent = generateDevelopmentContent;
exports.generateBuilderContent = generateBuilderContent;
exports.generateAreaContent = generateAreaContent;
exports.preGenerateAllContent = preGenerateAllContent;
exports.needsRegeneration = needsRegeneration;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
// Initialize Anthropic client
const anthropic = new sdk_1.default({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
});
// Content cache to avoid regenerating
const contentCache = new Map();
// Standard CTAs - from your STANDARD_CTAS_AND_CONTACT_INFO.md
const STANDARD_CTAS = {
    whatsappLink: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
    phone: '+34 634 044 970',
    habeno: 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e',
    agency: 'New Build Homes Costa Blanca',
    domain: 'www.newbuildhomescostablanca.com'
};
exports.STANDARD_CTAS = STANDARD_CTAS;
// System prompt incorporating your SEO strategy
const SYSTEM_PROMPT = `You are an expert SEO content writer for New Build Homes Costa Blanca, a real estate agency specializing in new construction properties in Costa Blanca, Spain.

Your task is to generate comprehensive, SEO-optimized articles following these guidelines:

## CONTENT REQUIREMENTS
- Write 2,500-3,500 words for development pages
- Write 1,500-2,000 words for builder profiles  
- Write 3,000-4,000 words for area guides
- Use natural, helpful tone - informative but not salesy
- Include specific details, numbers, and facts
- Structure with clear H2/H3 headings
- Include tables for specifications and distances
- Never use generic filler content

## SEO OPTIMIZATION
- Primary keyword in H1 and first paragraph
- Include location keywords naturally throughout
- Structure FAQs for voice search (start answers with direct statement, then elaborate)
- Include comparison tables for AI search snippets
- Target long-tail keywords for Costa Blanca property searches

## LEAD GENERATION RULES - CRITICAL
- NEVER list specific current prices - always say "Contact us for latest pricing"
- Historical/starting prices OK: "Apartments started from €261,000..."
- Include CTAs every 500-700 words
- All contact methods: WhatsApp, Phone, Video Visit, Contact Form
- Mention Habeno mortgage partner in financing sections

## STANDARD CONTACT INFO
- WhatsApp: ${STANDARD_CTAS.whatsappLink}
- Phone: ${STANDARD_CTAS.phone}
- Habeno Mortgage: ${STANDARD_CTAS.habeno}
- Agency: ${STANDARD_CTAS.agency}

## OUTPUT FORMAT
Return valid HTML content (no doctype, just article body content).
Include proper semantic HTML: <h1>, <h2>, <h3>, <p>, <ul>, <table>, etc.
Do NOT include <script> tags for schema - that's handled separately.`;
/**
 * Generate SEO content for a development
 */
async function generateDevelopmentContent(development) {
    const cacheKey = `dev-${development.slug}`;
    // Check cache first
    if (contentCache.has(cacheKey)) {
        const cached = contentCache.get(cacheKey);
        // Cache valid for 7 days
        if (Date.now() - cached.generatedAt.getTime() < 7 * 24 * 60 * 60 * 1000) {
            return cached;
        }
    }
    const prompt = buildDevelopmentPrompt(development);
    try {
        const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 8000,
            system: SYSTEM_PROMPT,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        });
        const rawContent = message.content[0].type === 'text'
            ? message.content[0].text
            : '';
        // Parse the generated content
        const content = parseGeneratedContent(rawContent, development);
        // Cache it
        contentCache.set(cacheKey, content);
        return content;
    }
    catch (error) {
        console.error('Error generating development content:', error);
        return getFallbackContent(development);
    }
}
/**
 * Generate SEO content for a builder
 */
async function generateBuilderContent(builder, developments) {
    const cacheKey = `builder-${builder.slug}`;
    if (contentCache.has(cacheKey)) {
        const cached = contentCache.get(cacheKey);
        if (Date.now() - cached.generatedAt.getTime() < 7 * 24 * 60 * 60 * 1000) {
            return cached;
        }
    }
    const prompt = buildBuilderPrompt(builder, developments);
    try {
        const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 6000,
            system: SYSTEM_PROMPT,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        });
        const rawContent = message.content[0].type === 'text'
            ? message.content[0].text
            : '';
        const content = {
            html: rawContent,
            metaTitle: `${builder.name} | Quality New Builds Costa Blanca | ${STANDARD_CTAS.agency}`,
            metaDescription: `Discover ${builder.name} developments in Costa Blanca. ${builder.projectsCompleted}+ projects completed. View current developments, quality standards & contact us for viewings.`,
            faqs: extractFAQs(rawContent),
            generatedAt: new Date()
        };
        contentCache.set(cacheKey, content);
        return content;
    }
    catch (error) {
        console.error('Error generating builder content:', error);
        return {
            html: `<h1>${builder.name}: Quality New Builds in Costa Blanca</h1><p>${builder.description}</p>`,
            metaTitle: `${builder.name} | New Builds Costa Blanca`,
            metaDescription: builder.description.slice(0, 155),
            faqs: [],
            generatedAt: new Date()
        };
    }
}
/**
 * Generate SEO content for an area
 */
async function generateAreaContent(area, developments) {
    const cacheKey = `area-${area.slug}`;
    if (contentCache.has(cacheKey)) {
        const cached = contentCache.get(cacheKey);
        if (Date.now() - cached.generatedAt.getTime() < 7 * 24 * 60 * 60 * 1000) {
            return cached;
        }
    }
    const prompt = buildAreaPrompt(area, developments);
    try {
        const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 8000,
            system: SYSTEM_PROMPT,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        });
        const rawContent = message.content[0].type === 'text'
            ? message.content[0].text
            : '';
        const content = {
            html: rawContent,
            metaTitle: `Living in ${area.name} | Property Guide | ${STANDARD_CTAS.agency}`,
            metaDescription: `Complete guide to living in ${area.name}, ${area.region}. Property prices, lifestyle, amenities & new build developments. Contact us for viewings.`,
            faqs: extractFAQs(rawContent),
            generatedAt: new Date()
        };
        contentCache.set(cacheKey, content);
        return content;
    }
    catch (error) {
        console.error('Error generating area content:', error);
        return {
            html: `<h1>Living in ${area.name}: Your Complete Guide</h1><p>${area.description}</p>`,
            metaTitle: `Living in ${area.name} | Costa Blanca`,
            metaDescription: area.description.slice(0, 155),
            faqs: [],
            generatedAt: new Date()
        };
    }
}
/**
 * Build prompt for development content
 */
function buildDevelopmentPrompt(dev) {
    const priceText = dev.priceFrom
        ? `Starting prices from €${dev.priceFrom.toLocaleString()}`
        : 'Contact for pricing';
    return `Generate a comprehensive SEO article for this new build development:

## DEVELOPMENT DATA
- Name: ${dev.name}
- Developer/Builder: ${dev.developer}
- Location: ${dev.town}, ${dev.province}
- Zone/Area: ${dev.zone || dev.town}
- Total Units: ${dev.propertyCount}
- Property Types: ${dev.types.join(', ')}
- Bedrooms: ${dev.bedroomRange.min}-${dev.bedroomRange.max} bedrooms
- Price Range: ${priceText}${dev.priceTo ? ` to €${dev.priceTo.toLocaleString()}` : ''}
- Status: ${dev.statuses.join(', ')}

## ARTICLE STRUCTURE REQUIRED
1. H1: [Development Name]: Your Complete Guide to [Key Feature] in [Location]
2. Engaging introduction (200-250 words) with hook and overview
3. H2: About [Development Name] - developer info, design philosophy, current status
4. H2: Location section - why this area, proximity table to amenities
5. H2: Property Options - each type with specs, best for whom
6. Mid-article CTA box with all contact methods
7. H2: Features & Amenities - on-site facilities, property specifications
8. H2: Investment section - pricing structure (historical only), additional costs table, financing mention with Habeno
9. H2: The Buying Process - step by step for foreign buyers
10. H2: Why Choose [Development] - 6-8 key benefits
11. H2: FAQ section - 8-10 questions, voice-search optimized
12. Conclusion with comprehensive CTA section

## TABLES TO INCLUDE
- Distance to amenities (beach, airport, golf, shopping, hospital)
- Property types with bedrooms, sizes, outdoor space
- Additional purchase costs breakdown (IVA, AJD, notary, etc.)

## CTAs TO INCLUDE (use exact links)
- WhatsApp: ${STANDARD_CTAS.whatsappLink}
- Phone: ${STANDARD_CTAS.phone}  
- Habeno Mortgage: ${STANDARD_CTAS.habeno}
- Video Visit booking
- Contact form request

Remember: NEVER show current specific prices. Use "Contact us for latest availability and pricing" and historical context like "apartments started from €XXX,XXX when launched."`;
}
/**
 * Build prompt for builder content
 */
function buildBuilderPrompt(builder, developments) {
    const devList = developments
        .map(d => `- ${d.name} in ${d.town} (${d.propertyCount} units, ${d.types.join('/')})`)
        .join('\n');
    return `Generate a comprehensive SEO article for this property developer:

## BUILDER DATA
- Company Name: ${builder.name}
- Full Legal Name: ${builder.fullName}
- Established: ${builder.established}
- Description: ${builder.description}
- Projects Completed: ${builder.projectsCompleted}+
- Active Developments: ${builder.activeDevelopments}
- Specializations: ${builder.specializations.join(', ')}

## CURRENT DEVELOPMENTS
${devList || 'Contact us for current portfolio'}

## ARTICLE STRUCTURE REQUIRED
1. H1: ${builder.name}: Your Guide to Quality New Builds in Costa Blanca
2. Introduction about the developer's reputation and market position
3. H2: About ${builder.name} - history, values, team
4. H2: Construction Quality - standards, materials, warranties
5. H2: Current Developments - brief overview of each with link placeholders
6. Mid-article CTA
7. H2: Why Choose ${builder.name} - track record, customer satisfaction
8. H2: FAQ section - 5-7 questions about the builder
9. Conclusion with CTA

## CTAs TO INCLUDE
- WhatsApp: ${STANDARD_CTAS.whatsappLink}
- Phone: ${STANDARD_CTAS.phone}
- Links to each development page (use placeholder: [LINK:/developments/slug])`;
}
/**
 * Build prompt for area content
 */
function buildAreaPrompt(area, developments) {
    const devList = developments
        .map(d => `- ${d.name} by ${d.developer} (from €${d.priceFrom?.toLocaleString() || 'POA'})`)
        .join('\n');
    return `Generate a comprehensive area guide for property buyers:

## AREA DATA
- Town/Area: ${area.name}
- Region: ${area.region}
- Province: ${area.province}
- Population: ~${area.population.toLocaleString()}
- Key Highlights: ${area.highlights.join(', ')}
- Distance to Alicante Airport: ${area.distanceToAirport} km
- Description: ${area.description}

## DEVELOPMENTS IN THIS AREA
${devList || 'Contact us for available developments'}

## ARTICLE STRUCTURE REQUIRED
1. H1: Living in ${area.name}: Your Complete Guide to Life on the Costa Blanca
2. Introduction about the area's character and appeal
3. H2: About ${area.name} - history, demographics, expat community
4. H2: Climate and Weather - annual patterns, best seasons
5. H2: The ${area.name} Lifestyle - daily life, community
6. H2: Amenities and Services - healthcare, education, shopping, dining, sports
7. H2: Getting Around - transport, driving, airport access
8. H2: Property Market - types available, price ranges, trends
9. H2: Our New Build Developments - feature each with brief description
10. H2: Cost of Living - typical expenses breakdown
11. H2: Pros and Cons - balanced honest view
12. H2: FAQ section - 8 questions about living in ${area.name}
13. Conclusion with CTA

## CTAs TO INCLUDE
- WhatsApp: ${STANDARD_CTAS.whatsappLink}
- Phone: ${STANDARD_CTAS.phone}
- Links to developments in this area`;
}
/**
 * Parse generated content and extract metadata
 */
function parseGeneratedContent(rawHtml, development) {
    // Extract H1 for meta title
    const h1Match = rawHtml.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const h1Text = h1Match ? h1Match[1].replace(/<[^>]*>/g, '') : development.name;
    // Build meta title (max 60 chars)
    const metaTitle = h1Text.length > 55
        ? `${development.name} | New Builds ${development.town}`
        : `${h1Text} | ${STANDARD_CTAS.agency}`;
    // Extract first paragraph for meta description
    const pMatch = rawHtml.match(/<p[^>]*>(.*?)<\/p>/i);
    const firstParagraph = pMatch
        ? pMatch[1].replace(/<[^>]*>/g, '').slice(0, 155) + '...'
        : `New build ${development.types.join('/')} in ${development.town} from ${development.developer}. ${development.bedroomRange.min}-${development.bedroomRange.max} bedrooms. Contact for pricing.`;
    return {
        html: rawHtml,
        metaTitle: metaTitle.slice(0, 60),
        metaDescription: firstParagraph.slice(0, 160),
        faqs: extractFAQs(rawHtml),
        generatedAt: new Date()
    };
}
/**
 * Extract FAQs from HTML content for schema
 */
function extractFAQs(html) {
    const faqs = [];
    // Match H3 questions followed by paragraphs
    const faqPattern = /<h3[^>]*>(.*?\?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
    let match;
    while ((match = faqPattern.exec(html)) !== null) {
        const question = match[1].replace(/<[^>]*>/g, '').trim();
        const answer = match[2].replace(/<[^>]*>/g, '').trim();
        if (question && answer) {
            faqs.push({ question, answer });
        }
    }
    return faqs;
}
/**
 * Generate fallback content when AI unavailable
 */
function getFallbackContent(development) {
    const priceText = development.priceFrom
        ? `from €${development.priceFrom.toLocaleString()}`
        : '';
    const html = `
<h1>${development.name}: New Build ${development.types.join(' & ')} in ${development.town}</h1>

<p>${development.name} is a new development by ${development.developer} located in ${development.town}, ${development.province}. 
This development offers ${development.propertyCount} properties including ${development.types.join(' and ')} options 
with ${development.bedroomRange.min} to ${development.bedroomRange.max} bedrooms.</p>

<h2>Property Options</h2>
<p>Choose from ${development.types.join(', ')} configurations with ${development.bedroomRange.min}-${development.bedroomRange.max} bedrooms. 
<strong>Contact us for the latest availability and pricing.</strong></p>

<h2>Location</h2>
<p>${development.name} is situated in ${development.zone || development.town}, ${development.town}. 
This area of ${development.province} offers excellent amenities and lifestyle options.</p>

<h2>Contact Us</h2>
<p>For the latest availability, pricing, and to arrange a viewing:</p>
<ul>
<li><strong>WhatsApp:</strong> <a href="${STANDARD_CTAS.whatsappLink}">Message us</a></li>
<li><strong>Phone:</strong> <a href="tel:${STANDARD_CTAS.phone.replace(/\s/g, '')}">${STANDARD_CTAS.phone}</a></li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>What types of properties are available at ${development.name}?</h3>
<p>${development.types.join(' and ')} options are available with ${development.bedroomRange.min} to ${development.bedroomRange.max} bedrooms. Contact us for current availability.</p>

<h3>Who is the developer of ${development.name}?</h3>
<p>${development.developer} is the developer of ${development.name}. Contact us to learn more about their quality and track record.</p>

<h3>How can I arrange a viewing?</h3>
<p>Contact us via WhatsApp at ${STANDARD_CTAS.phone} or call us directly to arrange a viewing or video tour of ${development.name}.</p>
`;
    return {
        html,
        metaTitle: `${development.name} | New Builds ${development.town} | ${STANDARD_CTAS.agency}`,
        metaDescription: `New build ${development.types[0]} in ${development.town} by ${development.developer}. ${development.bedroomRange.min}-${development.bedroomRange.max} beds ${priceText}. Contact for viewings.`,
        faqs: [
            {
                question: `What types of properties are available at ${development.name}?`,
                answer: `${development.types.join(' and ')} options are available with ${development.bedroomRange.min} to ${development.bedroomRange.max} bedrooms.`
            },
            {
                question: `Who is the developer of ${development.name}?`,
                answer: `${development.developer} is the developer of ${development.name}.`
            }
        ],
        generatedAt: new Date()
    };
}
/**
 * Pre-generate content for all developments (call at build time)
 */
async function preGenerateAllContent(developments) {
    const results = new Map();
    // Generate content sequentially to avoid rate limits
    for (const dev of developments) {
        console.log(`Generating content for: ${dev.name}`);
        try {
            const content = await generateDevelopmentContent(dev);
            results.set(dev.slug, content);
            // Small delay to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        catch (error) {
            console.error(`Failed to generate content for ${dev.name}:`, error);
            results.set(dev.slug, getFallbackContent(dev));
        }
    }
    return results;
}
/**
 * Check if content needs regeneration
 */
function needsRegeneration(slug, maxAgeDays = 7) {
    const cached = contentCache.get(slug);
    if (!cached)
        return true;
    const ageMs = Date.now() - cached.generatedAt.getTime();
    const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
    return ageMs > maxAgeMs;
}
