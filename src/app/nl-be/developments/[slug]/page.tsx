// ISR: Regenerate development pages every hour
export const revalidate = 3600;
export const dynamicParams = true;

import { createTranslatedDevMetadata, createTranslatedDevPage } from '@/lib/translated-development-page';

const LANG = 'nl-be';
const LANG_PREFIX = '/nl-be';

export const generateMetadata = createTranslatedDevMetadata(LANG, LANG_PREFIX);
export default createTranslatedDevPage(LANG, LANG_PREFIX);
