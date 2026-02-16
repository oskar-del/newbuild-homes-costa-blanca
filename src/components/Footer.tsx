'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Refined Design System
const BRAND = {
  primary: '#1E2A38',
  accent: '#B39960',
  accentHover: '#9a7f4a',
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  habeno: 'https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e',
  googleReviews: 'https://www.google.com/search?q=hansson+hertzell+reviews',
};

// Language prefixes — nl-be before nl (longer prefix first)
const LANG_PREFIXES = ['/nl-be', '/sv', '/nl', '/fr', '/no', '/de', '/pl', '/ru'];

// Footer translations for all 9 languages
const FOOTER_T: Record<string, Record<string, string>> = {
  en: {
    ctaTitle: 'Ready to Find Your Dream Home?',
    ctaDesc: 'Browse our selection of new build properties across Costa Blanca or contact us for personalized recommendations.',
    viewAll: 'View All Properties',
    whatsappUs: 'WhatsApp Us',
    brandDesc: 'Your trusted partner for new build properties in Costa Blanca, Spain.',
    googleReviews: 'See Our Google Reviews',
    cbSouth: 'Costa Blanca South',
    cbNorth: 'Costa Blanca North',
    inland: 'Inland Properties',
    golf: 'Golf Properties',
    buyerGuides: 'Buyer Guides',
    buyingProcess: 'Buying Process',
    nieGuide: 'NIE Number Guide',
    mortgages: 'Spanish Mortgages',
    taxesCosts: 'Taxes & Costs',
    rentalLicense: 'Tourist Rental License',
    afterSales: 'After Sales Services',
    contactUs: 'Contact Us',
    mortgageQuote: 'Get Mortgage Quote',
    contactForm: 'Contact Form',
    specialist: 'Specialist in Costa Blanca since 2020',
    langSupport: 'EN | SE | ES support',
    rights: 'All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    sitemap: 'Sitemap',
  },
  sv: {
    ctaTitle: 'Redo att hitta ditt drömboende?',
    ctaDesc: 'Utforska vårt utbud av nybyggda bostäder på Costa Blanca eller kontakta oss för personliga rekommendationer.',
    viewAll: 'Se alla bostäder',
    whatsappUs: 'WhatsApp',
    brandDesc: 'Din pålitliga partner för nybyggda bostäder på Costa Blanca, Spanien.',
    googleReviews: 'Se våra Google-omdömen',
    cbSouth: 'Costa Blanca Syd',
    cbNorth: 'Costa Blanca Nord',
    inland: 'Inlandsfastigheter',
    golf: 'Golffastigheter',
    buyerGuides: 'Köpguider',
    buyingProcess: 'Köpprocessen',
    nieGuide: 'NIE-nummer guide',
    mortgages: 'Bolån i Spanien',
    taxesCosts: 'Skatter & kostnader',
    rentalLicense: 'Turistuthyrningslicens',
    afterSales: 'Efterköpsservice',
    contactUs: 'Kontakta oss',
    mortgageQuote: 'Få bolåneoffert',
    contactForm: 'Kontaktformulär',
    specialist: 'Specialist på Costa Blanca sedan 2020',
    langSupport: 'EN | SE | ES support',
    rights: 'Alla rättigheter förbehållna.',
    privacy: 'Integritetspolicy',
    terms: 'Användarvillkor',
    sitemap: 'Webbplatskarta',
  },
  nl: {
    ctaTitle: 'Klaar om uw droomhuis te vinden?',
    ctaDesc: 'Bekijk ons aanbod van nieuwbouwwoningen aan de Costa Blanca of neem contact op voor persoonlijk advies.',
    viewAll: 'Bekijk alle woningen',
    whatsappUs: 'WhatsApp',
    brandDesc: 'Uw betrouwbare partner voor nieuwbouw aan de Costa Blanca, Spanje.',
    googleReviews: 'Bekijk onze Google Reviews',
    cbSouth: 'Costa Blanca Zuid',
    cbNorth: 'Costa Blanca Noord',
    inland: 'Binnenland woningen',
    golf: 'Golfwoningen',
    buyerGuides: 'Koopgidsen',
    buyingProcess: 'Koopproces',
    nieGuide: 'NIE-nummer gids',
    mortgages: 'Hypotheek Spanje',
    taxesCosts: 'Belastingen & kosten',
    rentalLicense: 'Toeristische verhuurlicentie',
    afterSales: 'After-sales service',
    contactUs: 'Contact',
    mortgageQuote: 'Hypotheek aanvragen',
    contactForm: 'Contactformulier',
    specialist: 'Specialist in Costa Blanca sinds 2020',
    langSupport: 'EN | NL | ES support',
    rights: 'Alle rechten voorbehouden.',
    privacy: 'Privacybeleid',
    terms: 'Algemene voorwaarden',
    sitemap: 'Sitemap',
  },
  'nl-be': {
    ctaTitle: 'Klaar om uw droomwoning te vinden?',
    ctaDesc: 'Bekijk ons aanbod van nieuwbouwwoningen aan de Costa Blanca of neem contact op voor persoonlijk advies.',
    viewAll: 'Bekijk alle woningen',
    whatsappUs: 'WhatsApp',
    brandDesc: 'Uw betrouwbare partner voor nieuwbouw aan de Costa Blanca, Spanje.',
    googleReviews: 'Bekijk onze Google Reviews',
    cbSouth: 'Costa Blanca Zuid',
    cbNorth: 'Costa Blanca Noord',
    inland: 'Binnenland woningen',
    golf: 'Golfwoningen',
    buyerGuides: 'Koopgidsen',
    buyingProcess: 'Koopproces',
    nieGuide: 'NIE-nummer gids',
    mortgages: 'Hypotheek Spanje',
    taxesCosts: 'Belastingen & kosten',
    rentalLicense: 'Toeristische verhuurvergunning',
    afterSales: 'After-sales service',
    contactUs: 'Contact',
    mortgageQuote: 'Hypotheek aanvragen',
    contactForm: 'Contactformulier',
    specialist: 'Specialist in Costa Blanca sinds 2020',
    langSupport: 'EN | NL | ES support',
    rights: 'Alle rechten voorbehouden.',
    privacy: 'Privacybeleid',
    terms: 'Algemene voorwaarden',
    sitemap: 'Sitemap',
  },
  fr: {
    ctaTitle: 'Prêt à trouver votre maison de rêve ?',
    ctaDesc: 'Découvrez notre sélection de biens neufs sur la Costa Blanca ou contactez-nous pour des recommandations personnalisées.',
    viewAll: 'Voir tous les biens',
    whatsappUs: 'WhatsApp',
    brandDesc: 'Votre partenaire de confiance pour l\'immobilier neuf sur la Costa Blanca, Espagne.',
    googleReviews: 'Voir nos avis Google',
    cbSouth: 'Costa Blanca Sud',
    cbNorth: 'Costa Blanca Nord',
    inland: 'Biens intérieurs',
    golf: 'Biens golf',
    buyerGuides: 'Guides d\'achat',
    buyingProcess: 'Processus d\'achat',
    nieGuide: 'Guide numéro NIE',
    mortgages: 'Hypothèques Espagne',
    taxesCosts: 'Taxes & frais',
    rentalLicense: 'Licence location touristique',
    afterSales: 'Service après-vente',
    contactUs: 'Contactez-nous',
    mortgageQuote: 'Demander un prêt',
    contactForm: 'Formulaire de contact',
    specialist: 'Spécialiste Costa Blanca depuis 2020',
    langSupport: 'EN | FR | ES support',
    rights: 'Tous droits réservés.',
    privacy: 'Politique de confidentialité',
    terms: 'Conditions générales',
    sitemap: 'Plan du site',
  },
  no: {
    ctaTitle: 'Klar for å finne drømmeboligen?',
    ctaDesc: 'Utforsk vårt utvalg av nye boliger på Costa Blanca eller kontakt oss for personlige anbefalinger.',
    viewAll: 'Se alle eiendommer',
    whatsappUs: 'WhatsApp',
    brandDesc: 'Din pålitelige partner for nye boliger på Costa Blanca, Spania.',
    googleReviews: 'Se våre Google-anmeldelser',
    cbSouth: 'Costa Blanca Sør',
    cbNorth: 'Costa Blanca Nord',
    inland: 'Innlandseiendommer',
    golf: 'Golfeiendommer',
    buyerGuides: 'Kjøpsguider',
    buyingProcess: 'Kjøpsprosessen',
    nieGuide: 'NIE-nummer guide',
    mortgages: 'Boliglån i Spania',
    taxesCosts: 'Skatter & kostnader',
    rentalLicense: 'Turistutleielisens',
    afterSales: 'Ettersalgsservice',
    contactUs: 'Kontakt oss',
    mortgageQuote: 'Få lånetilbud',
    contactForm: 'Kontaktskjema',
    specialist: 'Spesialist på Costa Blanca siden 2020',
    langSupport: 'EN | NO | ES support',
    rights: 'Alle rettigheter forbeholdt.',
    privacy: 'Personvernregler',
    terms: 'Vilkår for bruk',
    sitemap: 'Nettstedskart',
  },
  de: {
    ctaTitle: 'Bereit, Ihr Traumhaus zu finden?',
    ctaDesc: 'Entdecken Sie unsere Auswahl an Neubau-Immobilien an der Costa Blanca oder kontaktieren Sie uns für persönliche Empfehlungen.',
    viewAll: 'Alle Immobilien ansehen',
    whatsappUs: 'WhatsApp',
    brandDesc: 'Ihr vertrauenswürdiger Partner für Neubau-Immobilien an der Costa Blanca, Spanien.',
    googleReviews: 'Unsere Google-Bewertungen',
    cbSouth: 'Costa Blanca Süd',
    cbNorth: 'Costa Blanca Nord',
    inland: 'Inland-Immobilien',
    golf: 'Golf-Immobilien',
    buyerGuides: 'Kaufratgeber',
    buyingProcess: 'Kaufprozess',
    nieGuide: 'NIE-Nummer Ratgeber',
    mortgages: 'Hypothek in Spanien',
    taxesCosts: 'Steuern & Kosten',
    rentalLicense: 'Ferienvermietungslizenz',
    afterSales: 'After-Sales-Service',
    contactUs: 'Kontakt',
    mortgageQuote: 'Hypothekenangebot',
    contactForm: 'Kontaktformular',
    specialist: 'Spezialist für Costa Blanca seit 2020',
    langSupport: 'EN | DE | ES support',
    rights: 'Alle Rechte vorbehalten.',
    privacy: 'Datenschutz',
    terms: 'Nutzungsbedingungen',
    sitemap: 'Sitemap',
  },
  pl: {
    ctaTitle: 'Gotowy na znalezienie wymarzonego domu?',
    ctaDesc: 'Przeglądaj naszą ofertę nowych nieruchomości na Costa Blanca lub skontaktuj się z nami po spersonalizowane rekomendacje.',
    viewAll: 'Zobacz wszystkie nieruchomości',
    whatsappUs: 'WhatsApp',
    brandDesc: 'Twój zaufany partner w zakresie nowych nieruchomości na Costa Blanca, Hiszpania.',
    googleReviews: 'Zobacz opinie Google',
    cbSouth: 'Costa Blanca Południe',
    cbNorth: 'Costa Blanca Północ',
    inland: 'Nieruchomości w głębi lądu',
    golf: 'Nieruchomości golfowe',
    buyerGuides: 'Przewodniki kupującego',
    buyingProcess: 'Proces zakupu',
    nieGuide: 'Przewodnik NIE',
    mortgages: 'Hipoteka w Hiszpanii',
    taxesCosts: 'Podatki i koszty',
    rentalLicense: 'Licencja na wynajem turystyczny',
    afterSales: 'Obsługa posprzedażowa',
    contactUs: 'Kontakt',
    mortgageQuote: 'Zapytaj o hipotekę',
    contactForm: 'Formularz kontaktowy',
    specialist: 'Specjalista Costa Blanca od 2020',
    langSupport: 'EN | PL | ES support',
    rights: 'Wszelkie prawa zastrzeżone.',
    privacy: 'Polityka prywatności',
    terms: 'Regulamin',
    sitemap: 'Mapa strony',
  },
  ru: {
    ctaTitle: 'Готовы найти дом мечты?',
    ctaDesc: 'Просмотрите нашу подборку новостроек на Коста Бланке или свяжитесь с нами для персональных рекомендаций.',
    viewAll: 'Смотреть все объекты',
    whatsappUs: 'WhatsApp',
    brandDesc: 'Ваш надёжный партнёр по новостройкам на Коста Бланке, Испания.',
    googleReviews: 'Наши отзывы в Google',
    cbSouth: 'Коста Бланка Юг',
    cbNorth: 'Коста Бланка Север',
    inland: 'Недвижимость в глубине',
    golf: 'Гольф-недвижимость',
    buyerGuides: 'Руководства покупателя',
    buyingProcess: 'Процесс покупки',
    nieGuide: 'Руководство по NIE',
    mortgages: 'Ипотека в Испании',
    taxesCosts: 'Налоги и расходы',
    rentalLicense: 'Лицензия на туристическую аренду',
    afterSales: 'Послепродажное обслуживание',
    contactUs: 'Контакты',
    mortgageQuote: 'Запрос ипотеки',
    contactForm: 'Форма обратной связи',
    specialist: 'Специалист по Коста Бланке с 2020',
    langSupport: 'EN | RU | ES support',
    rights: 'Все права защищены.',
    privacy: 'Политика конфиденциальности',
    terms: 'Условия использования',
    sitemap: 'Карта сайта',
  },
};

// Map language prefix to translation key
function getLangCode(prefix: string): string {
  if (prefix === '/nl-be') return 'nl-be';
  if (prefix === '/sv') return 'sv';
  if (prefix === '/nl') return 'nl';
  if (prefix === '/fr') return 'fr';
  if (prefix === '/no') return 'no';
  if (prefix === '/de') return 'de';
  if (prefix === '/pl') return 'pl';
  if (prefix === '/ru') return 'ru';
  return 'en';
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Detect current language prefix from pathname (longest match first)
  const langPrefix = LANG_PREFIXES
    .sort((a, b) => b.length - a.length)
    .find(p => pathname.startsWith(p)) || '';

  // Translation helper
  const langCode = getLangCode(langPrefix);
  const t = (key: string) => FOOTER_T[langCode]?.[key] || FOOTER_T.en[key] || key;

  // Prepend language prefix to internal links
  const l = (href: string) => {
    if (!langPrefix) return href;
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) return href;
    if (href === '/') return langPrefix;
    return `${langPrefix}${href}`;
  };

  return (
    <>
      {/* CTA Section - Refined */}
      <section className="py-16 px-4 bg-primary-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-warm-300 text-lg mb-8 max-w-2xl mx-auto">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={l('/properties')}
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-900 font-medium px-8 py-4 rounded-md hover:bg-warm-100 transition-colors"
            >
              {t('viewAll')}
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-4 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t('whatsappUs')}
            </a>
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center justify-center gap-2 border border-warm-400 text-white font-medium px-8 py-4 rounded-md hover:bg-white/10 transition-colors"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-primary-900 text-white border-t border-primary-700">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href={l('/')} className="flex items-center gap-3 mb-4">
                <Image
                  src="/images/logo/logo-round.png"
                  alt="New Build Homes Costa Blanca"
                  width={50}
                  height={50}
                  className="h-12 w-auto rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-lg leading-tight">NEWBUILD HOMES</span>
                  <span className="text-accent-500 text-sm font-medium">Costa Blanca</span>
                </div>
              </Link>
              <p className="text-warm-400 text-sm mb-4">
                {t('brandDesc')}
              </p>
              <a
                href={CONTACT.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent-500 hover:text-accent-400 transition-colors"
              >
                {t('googleReviews')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Costa Blanca South */}
            <div>
              <h3 className="font-medium mb-4 text-accent-500">{t('cbSouth')}</h3>
              <ul className="space-y-2 text-warm-400 text-sm">
                <li>
                  <Link href={l('/areas/torrevieja')} className="hover:text-white transition-colors">
                    Torrevieja
                  </Link>
                </li>
                <li>
                  <Link href={l('/areas/orihuela-costa')} className="hover:text-white transition-colors">
                    Orihuela Costa
                  </Link>
                </li>
                <li>
                  <Link href={l('/areas/villamartin')} className="hover:text-white transition-colors">
                    Villamartin
                  </Link>
                </li>
                <li>
                  <Link href={l('/areas/guardamar')} className="hover:text-white transition-colors">
                    Guardamar del Segura
                  </Link>
                </li>
                <li>
                  <Link href={l('/inland')} className="hover:text-white transition-colors">
                    {t('inland')}
                  </Link>
                </li>
                <li>
                  <Link href={l('/golf')} className="hover:text-white transition-colors">
                    {t('golf')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Costa Blanca North */}
            <div>
              <h3 className="font-medium mb-4 text-accent-500">{t('cbNorth')}</h3>
              <ul className="space-y-2 text-warm-400 text-sm">
                <li>
                  <Link href={l('/areas/javea')} className="hover:text-white transition-colors">
                    Javea / Xabia
                  </Link>
                </li>
                <li>
                  <Link href={l('/areas/moraira')} className="hover:text-white transition-colors">
                    Moraira
                  </Link>
                </li>
                <li>
                  <Link href={l('/areas/calpe')} className="hover:text-white transition-colors">
                    Calpe
                  </Link>
                </li>
                <li>
                  <Link href={l('/areas/altea')} className="hover:text-white transition-colors">
                    Altea
                  </Link>
                </li>
                <li>
                  <Link href={l('/areas/denia')} className="hover:text-white transition-colors">
                    Denia
                  </Link>
                </li>
                <li>
                  <Link href={l('/areas/benidorm')} className="hover:text-white transition-colors">
                    Benidorm
                  </Link>
                </li>
              </ul>
            </div>

            {/* Buyer Guides */}
            <div>
              <h3 className="font-medium mb-4 text-accent-500">{t('buyerGuides')}</h3>
              <ul className="space-y-2 text-warm-400 text-sm">
                <li>
                  <Link href={l('/guides/buying-process')} className="hover:text-white transition-colors">
                    {t('buyingProcess')}
                  </Link>
                </li>
                <li>
                  <Link href={l('/guides/nie-number')} className="hover:text-white transition-colors">
                    {t('nieGuide')}
                  </Link>
                </li>
                <li>
                  <Link href={l('/guides/mortgages')} className="hover:text-white transition-colors">
                    {t('mortgages')}
                  </Link>
                </li>
                <li>
                  <Link href={l('/guides/costs-taxes')} className="hover:text-white transition-colors">
                    {t('taxesCosts')}
                  </Link>
                </li>
                <li>
                  <Link href={l('/guides/tourist-rental-license')} className="hover:text-white transition-colors">
                    {t('rentalLicense')}
                  </Link>
                </li>
                <li>
                  <Link href={l('/after-sales')} className="hover:text-white transition-colors">
                    {t('afterSales')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-medium mb-4 text-accent-500">{t('contactUs')}</h3>
              <ul className="space-y-3 text-warm-400 text-sm">
                <li>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    {t('whatsappUs')}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.habeno}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    {t('mortgageQuote')}
                  </a>
                </li>
                <li>
                  <Link href={l('/contact')} className="hover:text-white transition-colors flex items-center gap-2">
                    {t('contactForm')}
                  </Link>
                </li>
              </ul>

              {/* Trust badges */}
              <div className="mt-6 pt-4 border-t border-primary-700">
                <p className="text-xs text-warm-500 mb-2">{t('specialist')}</p>
                <p className="text-xs text-warm-500">{t('langSupport')}</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-primary-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-warm-500 text-sm">
            <p>&copy; {currentYear} New Build Homes Costa Blanca. {t('rights')}</p>
            <div className="flex gap-6">
              <Link href={l('/privacy')} className="hover:text-white transition-colors">
                {t('privacy')}
              </Link>
              <Link href={l('/terms')} className="hover:text-white transition-colors">
                {t('terms')}
              </Link>
              <Link href={l('/sitemap')} className="hover:text-white transition-colors">
                {t('sitemap')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
