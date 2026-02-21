// ISR: Regenerate builder pages every hour
export const revalidate = 3600;
export const dynamicParams = true;

import { createTranslatedBuilderMetadata, createTranslatedBuilderPage } from '@/lib/translated-builder-page';

const LANG = 'fr';
const LANG_PREFIX = '/fr';

export const generateMetadata = createTranslatedBuilderMetadata(LANG, LANG_PREFIX);
export default createTranslatedBuilderPage(LANG, LANG_PREFIX);
