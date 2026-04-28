'use client';
import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { LANG_KEY } from './config';

export function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(LANG_KEY) : null;
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved);
    }
  }, []);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
