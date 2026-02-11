'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocalizeHref } from '@/lib/useLocale';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const localizeHref = useLocalizeHref();

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
    // Enable analytics here if needed
    // window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  };

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential');
    setShowBanner(false);
    // Keep analytics disabled
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-warm-300 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-warm-700">
              We use cookies to improve your experience on our site. Essential cookies are necessary for the site to function.
              Analytics cookies help us understand how you use our site.{' '}
              <Link href={localizeHref('/privacy')} className="text-accent-600 hover:underline">
                Read our Privacy Policy
              </Link>
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={acceptEssential}
              className="px-4 py-2 text-sm font-medium text-warm-700 bg-warm-100 hover:bg-warm-200 rounded-md transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-900 hover:bg-primary-700 rounded-md transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
