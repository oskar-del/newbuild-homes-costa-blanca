import { createTranslatedMetadataGenerator, createTranslatedPropertyPage } from '@/lib/translated-property-page';

export const revalidate = 3600;
export const dynamicParams = true;

const LANG = 'nl-be';

export const generateMetadata = createTranslatedMetadataGenerator(LANG);
export default createTranslatedPropertyPage(LANG);
