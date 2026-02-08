'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface ZoneNavItem {
  id: string;
  name: string;
  shortName: string;
}

const zones: ZoneNavItem[] = [
  { id: 'centro', name: 'Centro & Playa del Cura', shortName: 'Centro' },
  { id: 'naufragos', name: 'Los Naufragos & Puerto', shortName: 'Naufragos' },
  { id: 'la-mata', name: 'La Mata', shortName: 'La Mata' },
  { id: 'los-balcones', name: 'Los Balcones & Los Altos', shortName: 'Los Balcones' },
  { id: 'torretas', name: 'Torretas & Aguas Nuevas', shortName: 'Torretas' },
  { id: 'cabo-cervera', name: 'Cabo Cervera & Los Locos', shortName: 'Cabo Cervera' },
  { id: 'la-siesta', name: 'La Siesta & El Limonar', shortName: 'La Siesta' },
];

export default function TorreviejaGuideClient() {
  const [activeZone, setActiveZone] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Track which zone sections are in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveZone(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    zones.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Show/hide nav based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.7);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll active button into view on mobile
  useEffect(() => {
    if (activeZone && navRef.current) {
      const btn = buttonRefs.current.get(activeZone);
      if (btn) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeZone]);

  const scrollToZone = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
      aria-label="Torrevieja zone navigation"
    >
      <div className="bg-primary-900/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={navRef}
            className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <span className="hidden lg:block text-white/60 text-sm font-medium pr-3 whitespace-nowrap border-r border-white/20 mr-2">
              Zones
            </span>
            {zones.map(({ id, shortName }) => (
              <button
                key={id}
                ref={(el) => {
                  if (el) buttonRefs.current.set(id, el);
                }}
                onClick={() => scrollToZone(id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeZone === id
                    ? 'bg-accent-500 text-white shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {shortName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Beaches horizontal scroll carousel
export function BeachesCarousel({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="relative group">
      {/* Scroll arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          aria-label="Scroll beaches left"
        >
          <svg className="w-5 h-5 text-primary-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          aria-label="Scroll beaches right"
        >
          <svg className="w-5 h-5 text-primary-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
    </div>
  );
}

// Accordion for practical info
export function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-warm-200 rounded-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-warm-50 hover:bg-warm-100 transition-colors"
      >
        <span className="font-semibold text-primary-900 text-lg">{title}</span>
        <svg
          className={`w-5 h-5 text-warm-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-5 bg-white">{children}</div>
      </div>
    </div>
  );
}

// Back to top button
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 1000);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-accent-500 text-white shadow-lg flex items-center justify-center hover:bg-accent-600 transition-all"
      aria-label="Back to top"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
