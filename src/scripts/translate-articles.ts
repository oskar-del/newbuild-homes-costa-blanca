process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Paths
const ARTICLES_DIR = path.join(process.cwd(), 'src', 'content', 'articles');
const SV_ARTICLES_DIR = path.join(process.cwd(), 'src', 'content', 'articles', 'sv');

// Create Swedish content directories if they don't exist
function ensureDirectoriesExist() {
  if (!fs.existsSync(SV_ARTICLES_DIR)) {
    fs.mkdirSync(SV_ARTICLES_DIR, { recursive: true });
  }

  // Also create legacy path for backward compatibility
  const legacyDir = path.join(process.cwd(), 'src', 'content', 'sv', 'articles');
  if (!fs.existsSync(legacyDir)) {
    fs.mkdirSync(legacyDir, { recursive: true });
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    limit: null as number | null,
    slug: null as string | null,
  };

  for (const arg of args) {
    if (arg.startsWith('--limit=')) {
      options.limit = parseInt(arg.split('=')[1], 10);
    } else if (arg.startsWith('--slug=')) {
      options.slug = arg.split('=')[1];
    }
  }

  return options;
}

// Category translation mapping
const categoryTranslations: Record<string, string> = {
  'Top 10': 'Topp 10',
  'Area Guide': 'Områdesguide',
  'Buyer\'s Guide': 'Köparguide',
  'Investment Guide': 'Investeringsguide',
  'Legal Guide': 'Juridisk guide',
  'Lifestyle': 'Livsstil',
  'Market Report': 'Marknadsrapport',
  'Property Guide': 'Fastighetsguide',
  'Visas & Residency': 'Visum och uppehållstillstånd',
  'Travel Tips': 'Resotips',
  'Expat Guide': 'Expat-guide',
  'Home Improvement': 'Hemförbättring',
  'Real Estate Trends': 'Fastighetsmarknadsströmningar',
};

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  featured: boolean;
  author: string;
  tags: string[];
  relatedAreas: string[];
  content: {
    quickAnswer?: string;
    intro: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
    conclusion: string;
    faqs?: Array<{
      question: string;
      answer: string;
    }>;
  };
  image?: string;
}

interface TranslatedArticle extends Article {
  language?: string;
}

// Fetch all English articles
function getEnglishArticles(): string[] {
  const files = fs.readdirSync(ARTICLES_DIR);
  return files.filter((f) => f.endsWith('.json'));
}

// Check if Swedish version already exists
function swedishVersionExists(slug: string): boolean {
  const filePath = path.join(SV_ARTICLES_DIR, `${slug}.json`);
  return fs.existsSync(filePath);
}

// Translate article text content
async function translateArticleContent(article: Article): Promise<TranslatedArticle> {
  const translationPrompt = `You are a Swedish real estate expert translator. Translate this Costa Blanca property article to Swedish with cultural adaptations.

IMPORTANT RULES:
- Write in natural, fluent Swedish (not machine translation quality)
- Use 'du' form throughout (informal you)
- Use proper Swedish real estate terminology: nybygge (new build), bostad (residence), villa, lägenhet (apartment), radhus (townhouse), inflyttningsklart (move-in ready)
- Keep the same JSON structure - only translate text values
- Keep all slugs, URLs, and technical fields UNCHANGED
- Keep relatedAreas as they are (they are English slugs)
- Translate the category: "${article.category}" should become "${categoryTranslations[article.category] || article.category}"
- Keep markdown formatting (**, ##, etc.) intact
- Keep ALL markdown content exactly as is, just translate the text
- Where English mentions prices, add Stockholm/Swedish price comparisons in parentheses when relevant
- Where relevant to the topic, mention the Swedish community on Costa Blanca
- Make it sound like a Swedish real estate expert wrote it, not a translation

Article to translate:
${JSON.stringify(article, null, 2)}

Respond with ONLY valid JSON, no other text. The JSON must be the same structure with only text values translated.`;

  const MAX_RETRIES = 2;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`   Translating with Claude Haiku...${attempt > 0 ? ` (retry ${attempt})` : ''}`);

      const message = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 8192,
        messages: [
          {
            role: 'user',
            content: translationPrompt,
          },
        ],
      });

      const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

      // Extract JSON from response (in case there's any surrounding text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      let jsonStr = jsonMatch[0];

      // Attempt to fix common JSON issues from LLM output
      // Fix trailing commas before closing brackets/braces
      jsonStr = jsonStr.replace(/,\s*([}\]])/g, '$1');
      // Fix missing commas between string values (e.g. "value1" "value2")
      jsonStr = jsonStr.replace(/"\s*\n\s*"/g, '",\n"');

      const translatedArticle = JSON.parse(jsonStr) as TranslatedArticle;

      // Ensure category is properly translated
      if (translatedArticle.category in categoryTranslations) {
        translatedArticle.category = categoryTranslations[translatedArticle.category];
      }

      return translatedArticle;
    } catch (error) {
      if (attempt < MAX_RETRIES) {
        console.log(`   ⚠️ JSON parse error, retrying... (${error instanceof Error ? error.message : String(error)})`);
        await sleep(2000);
        continue;
      }
      console.error(`Error translating article after ${MAX_RETRIES + 1} attempts: ${error}`);
      throw error;
    }
  }

  throw new Error('Unexpected: exhausted all retries');
}

// Save translated article (to both paths for compatibility)
function saveTranslatedArticle(article: TranslatedArticle, slug: string) {
  // Primary path: src/content/articles/sv/ (used by blog routes)
  const primaryPath = path.join(SV_ARTICLES_DIR, `${slug}.json`);
  fs.writeFileSync(primaryPath, JSON.stringify(article, null, 2), 'utf-8');

  // Legacy path: src/content/sv/articles/ (backward compatibility)
  const legacyPath = path.join(process.cwd(), 'src', 'content', 'sv', 'articles', `${slug}.json`);
  fs.writeFileSync(legacyPath, JSON.stringify(article, null, 2), 'utf-8');
}

// Sleep function for rate limiting
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Main function
async function main() {
  console.log('Starting article translation script...\n');

  ensureDirectoriesExist();

  const options = parseArgs();

  // Get articles to translate
  let articlesToTranslate: string[];

  if (options.slug) {
    // Translate specific article
    articlesToTranslate = [`${options.slug}.json`];
  } else {
    // Get all English articles
    const allArticles = getEnglishArticles();

    // Filter out already translated ones
    const notTranslated = allArticles.filter(
      (file) => !swedishVersionExists(file.replace('.json', ''))
    );

    articlesToTranslate = options.limit
      ? notTranslated.slice(0, options.limit)
      : notTranslated;
  }

  console.log(`Found ${articlesToTranslate.length} articles to translate\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < articlesToTranslate.length; i++) {
    const fileName = articlesToTranslate[i];
    const slug = fileName.replace('.json', '');

    // Skip if Swedish version already exists (unless specifically requested)
    if (!options.slug && swedishVersionExists(slug)) {
      console.log(`Skipping article ${i + 1}/${articlesToTranslate.length}: ${slug} (Swedish version exists)`);
      continue;
    }

    try {
      console.log(`\n📝 Translating article ${i + 1}/${articlesToTranslate.length}: ${slug}`);

      // Read English article
      const filePath = path.join(ARTICLES_DIR, fileName);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const article = JSON.parse(fileContent) as Article;

      // Translate
      const translatedArticle = await translateArticleContent(article);

      // Save Swedish version
      saveTranslatedArticle(translatedArticle, slug);

      console.log(`   ✅ Saved to src/content/sv/articles/${slug}.json`);
      successCount++;

      // Rate limiting: 1 second between API calls
      if (i < articlesToTranslate.length - 1) {
        await sleep(1000);
      }
    } catch (error) {
      console.error(`   ❌ Error: ${error instanceof Error ? error.message : String(error)}`);
      errorCount++;
    }
  }

  console.log(`\n✨ Translation complete!`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   Total: ${successCount + errorCount}`);
}

// Run the script
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
