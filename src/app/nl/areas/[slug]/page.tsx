/**
 * Localized Area Page — Re-exports English area page
 * ====================================================
 * Area data (prices, developments, maps) is factual & language-agnostic.
 * Canonical URL points to English version for SEO.
 * This prevents 404s when users switch language on area pages.
 */

export { default } from '@/app/areas/[slug]/page';
export { generateMetadata, generateStaticParams } from '@/app/areas/[slug]/page';
