'use client';
import { useTranslation } from 'react-i18next';
import { LANG_KEY } from '@/lib/i18n/config';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const isEN = i18n.language === 'en';

  const toggle = () => {
    const next = isEN ? 'es' : 'en';
    i18n.changeLanguage(next);
    if (typeof window !== 'undefined') localStorage.setItem(LANG_KEY, next);
  };

  return (
    <button
      onClick={toggle}
      title={isEN ? 'Cambiar a Español' : 'Switch to English'}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '3px 9px', borderRadius: 99,
        border: '1px solid #E2E8F0',
        background: '#fff', cursor: 'pointer',
        fontSize: 11, fontWeight: 700,
        color: '#0033A0', letterSpacing: '0.04em',
        fontFamily: "'Montserrat',sans-serif",
        transition: 'all 0.15s',
        lineHeight: 1.4,
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = '#EEF2FF';
        (e.currentTarget as HTMLButtonElement).style.borderColor = '#0033A0';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = '#fff';
        (e.currentTarget as HTMLButtonElement).style.borderColor = '#E2E8F0';
      }}
    >
      <span style={{ opacity: isEN ? 0.45 : 1 }}>ES</span>
      <span style={{ color: '#E2E8F0' }}>|</span>
      <span style={{ opacity: isEN ? 1 : 0.45 }}>EN</span>
    </button>
  );
}
