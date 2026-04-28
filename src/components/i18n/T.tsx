'use client';
import { useTranslation } from 'react-i18next';

/** Inline translation component — drop into any Server Component to create a client translation island. */
export function T({ k, fallback }: { k: string; fallback?: string }) {
  const { t } = useTranslation();
  return <>{t(k, { defaultValue: fallback ?? k })}</>;
}
