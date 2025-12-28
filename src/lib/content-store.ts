/**
 * Content Store
 * 
 * Handles storage and retrieval of AI-generated content
 * Content is saved as JSON files for fast build-time reading
 */

import fs from 'fs';
import path from 'path';
import { GeneratedContent } from './ai-content-generator';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/generated');

// Ensure content directory exists
function ensureContentDir() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }
}

/**
 * Save generated content to file
 */
export function saveContent(
  type: 'development' | 'builder' | 'area',
  slug: string,
  content: GeneratedContent
): void {
  ensureContentDir();
  
  const filename = `${type}-${slug}.json`;
  const filepath = path.join(CONTENT_DIR, filename);
  
  const data = {
    ...content,
    generatedAt: content.generatedAt.toISOString(),
  };
  
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ Saved content: ${filename}`);
}

/**
 * Load generated content from file
 */
export function loadContent(
  type: 'development' | 'builder' | 'area',
  slug: string
): GeneratedContent | null {
  const filename = `${type}-${slug}.json`;
  const filepath = path.join(CONTENT_DIR, filename);
  
  if (!fs.existsSync(filepath)) {
    return null;
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    return {
      ...data,
      generatedAt: new Date(data.generatedAt),
    };
  } catch (error) {
    console.error(`Error loading content ${filename}:`, error);
    return null;
  }
}

/**
 * Check if content exists and is fresh
 */
export function hasValidContent(
  type: 'development' | 'builder' | 'area',
  slug: string,
  maxAgeDays: number = 30
): boolean {
  const content = loadContent(type, slug);
  if (!content) return false;
  
  const ageMs = Date.now() - content.generatedAt.getTime();
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
  
  return ageMs < maxAgeMs;
}

/**
 * List all generated content files
 */
export function listGeneratedContent(): { type: string; slug: string; generatedAt: Date }[] {
  ensureContentDir();
  
  const files = fs.readdirSync(CONTENT_DIR);
  
  return files
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const match = f.match(/^(development|builder|area)-(.+)\.json$/);
      if (!match) return null;
      
      const content = loadContent(match[1] as 'development' | 'builder' | 'area', match[2]);
      return {
        type: match[1],
        slug: match[2],
        generatedAt: content?.generatedAt || new Date(0),
      };
    })
    .filter(Boolean) as { type: string; slug: string; generatedAt: Date }[];
}

/**
 * Delete content file
 */
export function deleteContent(
  type: 'development' | 'builder' | 'area',
  slug: string
): boolean {
  const filename = `${type}-${slug}.json`;
  const filepath = path.join(CONTENT_DIR, filename);
  
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
    return true;
  }
  return false;
}
