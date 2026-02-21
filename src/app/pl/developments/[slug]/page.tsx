// ISR: Regenerate development pages every hour
export const revalidate = 3600;
export const dynamicParams = true;

import { createTranslatedDevMetadata, createTranslatedDevPage } from '@/lib/translated-development-page';

const LANG = 'pl';
const LANG_PREFIX = '/pl';

export const generateMetadata = createTranslatedDevMetadata(LANG, LANG_PREFIX);
export default createTranslatedDevPage(LANG, LANG_PREFIX);
