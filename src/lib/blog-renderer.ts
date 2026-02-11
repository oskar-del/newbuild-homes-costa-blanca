/**
 * Shared blog article markdown-to-HTML renderer
 * Used by all language blog article pages for rich, styled content rendering
 * Ported from the English blog/[slug]/page.tsx
 */

// Inline text formatting (bold, stars, emoji cleanup)
export const inlineFmt = (text: string) => text
  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-primary-900">$1</strong>')
  .replace(/⭐⭐/g, '<span class="text-amber-500">★★</span>')
  .replace(/⭐/g, '<span class="text-amber-500">★</span>')
  .replace(/[🌴☀️🏠💶🏖️🍽️🛍️🏥✈️🤝⚖️🌿🥾🏔️❄️🤿💎💡📋📖🔑🏦🎉✨🏆]/g, '');

/**
 * Convert markdown text to styled HTML
 * Handles: h2, h3, callout boxes, bold headings, bullet lists, numbered lists, paragraphs
 */
export function markdownToHtml(text: string): string {
  const lines = text.split('\n');
  const output: string[] = [];
  let inList = false;
  let inParagraph = false;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (!trimmed) {
      if (inList) { output.push('</div>'); inList = false; }
      if (inParagraph) { output.push('</p>'); inParagraph = false; }
      continue;
    }

    // h2 sub-headers
    if (trimmed.startsWith('## ')) {
      if (inList) { output.push('</div>'); inList = false; }
      if (inParagraph) { output.push('</p>'); inParagraph = false; }
      output.push(`<h2 class="text-2xl font-bold text-primary-900 mt-10 mb-4 pl-4 border-l-4 border-accent-500">${trimmed.replace(/^## /, '')}</h2>`);
      continue;
    }

    // h3 sub-headers
    if (trimmed.startsWith('### ')) {
      if (inList) { output.push('</div>'); inList = false; }
      if (inParagraph) { output.push('</p>'); inParagraph = false; }
      output.push(`<h3 class="text-lg font-bold text-primary-900 mt-6 mb-3">${trimmed.replace(/^### /, '')}</h3>`);
      continue;
    }

    // Callout/tip detection (multilingual keywords)
    const calloutMatch = trimmed.match(/^\*\*(Tip|Pro tip|Note|Important|Local tip|Warning|Remember|Tipp|Hinweis|Wichtig|Warnung|Tips|Conseil|Remarque|Astuce|Avertissement|OBS|Viktigt|Observera|Wskazówka|Uwaga|Ważne|Совет|Важно|Примечание|Предупреждение)\*?\*?[:]\s*(.*)/i);
    if (calloutMatch) {
      if (inList) { output.push('</div>'); inList = false; }
      if (inParagraph) { output.push('</p>'); inParagraph = false; }
      const isWarning = /warning|warnung|avertissement|предупреждение|uwaga|advarsel|wichtig|important|ważne|важно/i.test(calloutMatch[1]);
      const bgColor = isWarning ? 'bg-amber-50 border-amber-400' : 'bg-accent-50 border-accent-400';
      output.push(`<div class="my-4 p-4 ${bgColor} border-l-4 rounded-r-sm"><div class="flex items-start gap-3"><div><span class="font-bold text-primary-900 text-sm uppercase tracking-wide">${calloutMatch[1]}</span><p class="text-warm-700 mt-1 leading-relaxed">${inlineFmt(calloutMatch[2])}</p></div></div></div>`);
      continue;
    }

    // Bold heading line (standalone bold text)
    const boldLineMatch = trimmed.match(/^\*\*(.*?)\*\*\s*(⭐*)\s*$/);
    if (boldLineMatch) {
      if (inList) { output.push('</div>'); inList = false; }
      if (inParagraph) { output.push('</p>'); inParagraph = false; }
      const starCount = boldLineMatch[2] ? boldLineMatch[2].length : 0;
      const stars = starCount > 0 ? ` <span class="text-amber-500 ml-1">${'★'.repeat(starCount)}</span>` : '';
      if (starCount > 0) {
        output.push(`<div class="mt-5 mb-2 pl-4 border-l-4 border-amber-400 py-1"><span class="font-bold text-primary-900 text-[15px]">${boldLineMatch[1]}${stars}</span></div>`);
      } else {
        output.push(`<div class="mt-5 mb-2 font-semibold text-primary-900 text-[15px] flex items-center gap-2"><span class="w-1.5 h-1.5 bg-accent-500 rounded-full flex-shrink-0"></span><span>${boldLineMatch[1]}</span></div>`);
      }
      continue;
    }

    // Bullet list
    if (trimmed.startsWith('- ')) {
      if (inParagraph) { output.push('</p>'); inParagraph = false; }
      if (!inList) { output.push('<div class="space-y-0.5 my-3 pl-1">'); inList = true; }
      output.push(`<div class="flex items-start gap-2.5 py-1"><span class="flex-shrink-0 w-1.5 h-1.5 mt-[9px] bg-accent-400 rounded-full"></span><span class="text-warm-700 leading-relaxed">${inlineFmt(trimmed.slice(2))}</span></div>`);
      continue;
    }

    // Numbered list
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      if (inParagraph) { output.push('</p>'); inParagraph = false; }
      if (!inList) { output.push('<div class="space-y-1 my-3">'); inList = true; }
      output.push(`<div class="flex items-start gap-3 py-1"><span class="flex-shrink-0 w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center text-xs font-bold">${numMatch[1]}</span><span class="text-warm-700 leading-relaxed">${inlineFmt(numMatch[2])}</span></div>`);
      continue;
    }

    // Regular text
    if (inList) { output.push('</div>'); inList = false; }
    if (!inParagraph) {
      output.push(`<p class="mb-3 text-warm-700 leading-relaxed">${inlineFmt(trimmed)}`);
      inParagraph = true;
    } else {
      output.push(` ${inlineFmt(trimmed)}`);
    }
  }

  if (inList) output.push('</div>');
  if (inParagraph) output.push('</p>');
  return output.join('\n');
}

// Slugify helper for anchor links (supports extended Latin characters)
export const slugify = (text: string) => text.toLowerCase()
  .replace(/[^a-z0-9àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿąćęłńóśźżабвгдеёжзийклмнопрстуфхцчшщъыьэюя]+/g, '-')
  .replace(/(^-|-$)/g, '');
