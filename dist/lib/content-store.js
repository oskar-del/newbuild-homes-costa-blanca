"use strict";
/**
 * Content Store
 *
 * Handles storage and retrieval of AI-generated content
 * Content is saved as JSON files for fast build-time reading
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveContent = saveContent;
exports.loadContent = loadContent;
exports.hasValidContent = hasValidContent;
exports.listGeneratedContent = listGeneratedContent;
exports.deleteContent = deleteContent;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const CONTENT_DIR = path_1.default.join(process.cwd(), 'src/content/generated');
// Ensure content directory exists
function ensureContentDir() {
    if (!fs_1.default.existsSync(CONTENT_DIR)) {
        fs_1.default.mkdirSync(CONTENT_DIR, { recursive: true });
    }
}
/**
 * Save generated content to file
 */
function saveContent(type, slug, content) {
    ensureContentDir();
    const filename = `${type}-${slug}.json`;
    const filepath = path_1.default.join(CONTENT_DIR, filename);
    const data = {
        ...content,
        generatedAt: content.generatedAt.toISOString(),
    };
    fs_1.default.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`✅ Saved content: ${filename}`);
}
/**
 * Load generated content from file
 */
function loadContent(type, slug) {
    const filename = `${type}-${slug}.json`;
    const filepath = path_1.default.join(CONTENT_DIR, filename);
    if (!fs_1.default.existsSync(filepath)) {
        return null;
    }
    try {
        const data = JSON.parse(fs_1.default.readFileSync(filepath, 'utf-8'));
        return {
            ...data,
            generatedAt: new Date(data.generatedAt),
        };
    }
    catch (error) {
        console.error(`Error loading content ${filename}:`, error);
        return null;
    }
}
/**
 * Check if content exists and is fresh
 */
function hasValidContent(type, slug, maxAgeDays = 30) {
    const content = loadContent(type, slug);
    if (!content)
        return false;
    const ageMs = Date.now() - content.generatedAt.getTime();
    const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
    return ageMs < maxAgeMs;
}
/**
 * List all generated content files
 */
function listGeneratedContent() {
    ensureContentDir();
    const files = fs_1.default.readdirSync(CONTENT_DIR);
    return files
        .filter(f => f.endsWith('.json'))
        .map(f => {
        const match = f.match(/^(development|builder|area)-(.+)\.json$/);
        if (!match)
            return null;
        const content = loadContent(match[1], match[2]);
        return {
            type: match[1],
            slug: match[2],
            generatedAt: content?.generatedAt || new Date(0),
        };
    })
        .filter(Boolean);
}
/**
 * Delete content file
 */
function deleteContent(type, slug) {
    const filename = `${type}-${slug}.json`;
    const filepath = path_1.default.join(CONTENT_DIR, filename);
    if (fs_1.default.existsSync(filepath)) {
        fs_1.default.unlinkSync(filepath);
        return true;
    }
    return false;
}
