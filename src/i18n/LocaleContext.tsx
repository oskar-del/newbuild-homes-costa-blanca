'use client';
import { createContext, useContext } from 'react';

type LocaleContextType = {
  locale: string;
  t: (key: string, params?: Record<string, string | number>) => string;
};

export const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  t: (key) => key,
});

export const useLocale = () => useContext(LocaleContext);
