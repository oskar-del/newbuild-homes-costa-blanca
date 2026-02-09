/**
 * i18n Configuration
 *
 * Central configuration for multi-language support.
 * When adding a new language:
 * 1. Add the locale code to SUPPORTED_LOCALES
 * 2. Copy src/i18n/locales/en.json to src/i18n/locales/{locale}.json
 * 3. Translate all strings in the new file
 * 4. Add hreflang tags (already handled by generateHreflangTags below)
 *
 * URL Strategy: Subdirectory pattern
 * - English (default): /properties, /areas, /blog
 * - Swedish: /sv/properties, /sv/areas, /sv/blog
 * - Spanish: /es/properties, /es/areas, /es/blog
 *
 * The property data already supports multilingual descriptions
 * via the PropertyDescription interface (en, es, de, nl, fr, sv, etc.)
 */

export const DEFAULT_LOCALE = 'en';

export const SUPPORTED_LOCALES = ['en', 'sv'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  sv: 'Svenska',
  es: 'Español',
  de: 'Deutsch',
  nl: 'Nederlands',
  fr: 'Français',
  no: 'Norsk',
  da: 'Dansk',
  fi: 'Suomi',
};

export const LOCALE_FLAGS: Record<string, string> = {
  en: 'en',
  sv: 'sv',
  es: 'es',
  de: 'de',
  nl: 'nl',
  fr: 'fr',
  no: 'no',
  da: 'da',
  fi: 'fi',
};

/**
 * Generate hreflang link tags for SEO.
 * Call this in generateMetadata() for each page.
 *
 * @param pathname - The page path without locale prefix (e.g., '/properties/N1234')
 * @returns Languages object for Next.js metadata alternates
 */
export function generateHreflangTags(pathname: string): Record<string, string> {
  const base = 'https://newbuildhomescostablanca.com';
  const languages: Record<string, string> = {};

  for (const locale of SUPPORTED_LOCALES) {
    if (locale === DEFAULT_LOCALE) {
      languages[locale] = `${base}${pathname}`;
    } else {
      languages[locale] = `${base}/${locale}${pathname}`;
    }
  }

  // x-default points to English
  languages['x-default'] = `${base}${pathname}`;

  return languages;
}

/**
 * Load translation strings for a locale.
 * Falls back to English if locale file doesn't exist.
 */
export function loadTranslations(locale: string = DEFAULT_LOCALE): Record<string, any> {
  try {
    // Dynamic import would be used in production
    // For now, directly load the JSON
    const translations = require(`./locales/${locale}.json`);
    return translations;
  } catch {
    // Fall back to English
    const translations = require('./locales/en.json');
    return translations;
  }
}

/**
 * Simple template string replacer.
 * Replaces {key} patterns with values from the params object.
 *
 * @example t('cta.wontLastLongDesc', { town: 'Torrevieja' })
 * // Returns: "Quality properties in Torrevieja are selling fast..."
 */
export function t(translations: Record<string, any>, key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.');
  let value: any = translations;

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) return key; // Return key if not found
  }

  if (typeof value !== 'string') return key;

  if (params) {
    return value.replace(/\{(\w+)\}/g, (_, paramKey) => {
      return params[paramKey]?.toString() || `{${paramKey}}`;
    });
  }

  return value;
}
