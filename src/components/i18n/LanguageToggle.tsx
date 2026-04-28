'use client';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LANG_KEY } from '@/lib/i18n/config';

const LANGS = [
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
];

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = i18n.language === 'en' ? 'en' : 'es';

  const switchLang = (code: string) => {
    if (code === current) return;
    i18n.changeLanguage(code);
    if (typeof window !== 'undefined') localStorage.setItem(LANG_KEY, code);
  };

  return (
    <div
      role="group"
      aria-label="Language selector"
      style={{
        display: 'inline-flex',
        borderRadius: 99,
        padding: 2,
        background: '#F0F4FF',
        border: '1px solid #D8E2F8',
        gap: 1,
        flexShrink: 0,
      }}
    >
      {LANGS.map(({ code, flag, label }) => {
        const active = current === code;
        return (
          <button
            key={code}
            onClick={() => switchLang(code)}
            aria-pressed={active}
            title={code === 'es' ? 'Español' : 'English'}
            style={{
              position: 'relative',
              padding: '3px 7px',
              borderRadius: 99,
              border: 'none',
              background: 'transparent',
              cursor: active ? 'default' : 'pointer',
              fontSize: 10,
              fontWeight: 700,
              color: active ? '#fff' : '#6B87B0',
              fontFamily: "'Montserrat',sans-serif",
              letterSpacing: '0.04em',
              zIndex: 1,
              lineHeight: 1.4,
              transition: 'color 0.2s',
              userSelect: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            {active && (
              <motion.div
                layoutId="lang-pill"
                style={{
                  position: 'absolute', inset: 0,
                  borderRadius: 99,
                  background: 'linear-gradient(135deg, #0044CC 0%, #0033A0 100%)',
                  boxShadow: '0 1px 4px rgba(0,51,160,0.35)',
                  zIndex: -1,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
            <span style={{ fontSize: 12, lineHeight: 1 }}>{flag}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
