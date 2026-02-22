'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocalizeHref, useLangPrefix } from '@/lib/useLocale';

// Cookie consent translations for all 9 languages
const COOKIE_STRINGS: Record<string, {
  bannerText: string;
  privacyLink: string;
  essentialOnly: string;
  acceptAll: string;
}> = {
  '': { // English (default)
    bannerText: 'We use cookies to improve your experience on our site. Essential cookies are necessary for the site to function. Analytics cookies help us understand how you use our site.',
    privacyLink: 'Read our Privacy Policy',
    essentialOnly: 'Essential Only',
    acceptAll: 'Accept All',
  },
  '/sv': {
    bannerText: 'Vi använder cookies för att förbättra din upplevelse på vår webbplats. Nödvändiga cookies krävs för att webbplatsen ska fungera. Analytikcookies hjälper oss förstå hur du använder vår webbplats.',
    privacyLink: 'Läs vår integritetspolicy',
    essentialOnly: 'Endast nödvändiga',
    acceptAll: 'Acceptera alla',
  },
  '/nl': {
    bannerText: 'Wij gebruiken cookies om uw ervaring op onze site te verbeteren. Essentiële cookies zijn noodzakelijk voor het functioneren van de site. Analytische cookies helpen ons te begrijpen hoe u onze site gebruikt.',
    privacyLink: 'Lees ons privacybeleid',
    essentialOnly: 'Alleen essentieel',
    acceptAll: 'Alles accepteren',
  },
  '/nl-be': {
    bannerText: 'Wij gebruiken cookies om uw ervaring op onze site te verbeteren. Essentiële cookies zijn noodzakelijk voor het functioneren van de site. Analytische cookies helpen ons te begrijpen hoe u onze site gebruikt.',
    privacyLink: 'Lees ons privacybeleid',
    essentialOnly: 'Alleen essentieel',
    acceptAll: 'Alles accepteren',
  },
  '/fr': {
    bannerText: 'Nous utilisons des cookies pour améliorer votre expérience sur notre site. Les cookies essentiels sont nécessaires au fonctionnement du site. Les cookies analytiques nous aident à comprendre comment vous utilisez notre site.',
    privacyLink: 'Lire notre politique de confidentialité',
    essentialOnly: 'Essentiels uniquement',
    acceptAll: 'Tout accepter',
  },
  '/no': {
    bannerText: 'Vi bruker informasjonskapsler for å forbedre opplevelsen din på nettstedet vårt. Nødvendige informasjonskapsler er påkrevd for at nettstedet skal fungere. Analytiske informasjonskapsler hjelper oss å forstå hvordan du bruker nettstedet.',
    privacyLink: 'Les vår personvernerklæring',
    essentialOnly: 'Kun nødvendige',
    acceptAll: 'Godta alle',
  },
  '/de': {
    bannerText: 'Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Notwendige Cookies sind für die Funktion der Website erforderlich. Analyse-Cookies helfen uns zu verstehen, wie Sie unsere Website nutzen.',
    privacyLink: 'Datenschutzerklärung lesen',
    essentialOnly: 'Nur notwendige',
    acceptAll: 'Alle akzeptieren',
  },
  '/pl': {
    bannerText: 'Używamy plików cookie, aby poprawić Twoje doświadczenia na naszej stronie. Niezbędne pliki cookie są wymagane do działania strony. Analityczne pliki cookie pomagają nam zrozumieć, w jaki sposób korzystasz z naszej strony.',
    privacyLink: 'Przeczytaj naszą politykę prywatności',
    essentialOnly: 'Tylko niezbędne',
    acceptAll: 'Zaakceptuj wszystkie',
  },
  '/ru': {
    bannerText: 'Мы используем файлы cookie для улучшения вашего опыта на нашем сайте. Основные файлы cookie необходимы для работы сайта. Аналитические файлы cookie помогают нам понять, как вы используете наш сайт.',
    privacyLink: 'Читать нашу политику конфиденциальности',
    essentialOnly: 'Только необходимые',
    acceptAll: 'Принять все',
  },
};

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const localizeHref = useLocalizeHref();
  const langPrefix = useLangPrefix();

  const strings = COOKIE_STRINGS[langPrefix] || COOKIE_STRINGS[''];

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay to avoid layout shift on page load
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    // Analytics consent will be wired up when Meta Pixel / GTM is configured
    // window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  };

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-warm-300 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-warm-700">
              {strings.bannerText}{' '}
              <Link href={localizeHref('/privacy')} className="text-accent-600 hover:underline">
                {strings.privacyLink}
              </Link>
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={acceptEssential}
              className="px-4 py-2 text-sm font-medium text-warm-700 bg-warm-100 hover:bg-warm-200 rounded-md transition-colors"
            >
              {strings.essentialOnly}
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-900 hover:bg-primary-700 rounded-md transition-colors"
            >
              {strings.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
