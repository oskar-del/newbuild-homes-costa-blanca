'use client';

import { usePathname } from 'next/navigation';

// Language prefixes — nl-be before nl (longer prefix first)
const LANG_PREFIXES = ['/nl-be', '/sv', '/nl', '/fr', '/no', '/de', '/pl', '/ru'];

/**
 * Hook to detect the current language prefix from the URL pathname.
 * Returns the prefix (e.g. '/sv') or '' for English.
 */
export function useLangPrefix(): string {
  const pathname = usePathname();
  return LANG_PREFIXES
    .sort((a, b) => b.length - a.length)
    .find(p => pathname.startsWith(p)) || '';
}

/**
 * Hook that returns a function to localize internal hrefs
 * by prepending the current language prefix.
 *
 * Usage:
 *   const localizeHref = useLocalizeHref();
 *   <Link href={localizeHref('/properties')}>
 */
export function useLocalizeHref(): (href: string) => string {
  const langPrefix = useLangPrefix();

  return (href: string) => {
    if (!langPrefix) return href;
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) return href;
    if (href === '/') return langPrefix;
    return `${langPrefix}${href}`;
  };
}
