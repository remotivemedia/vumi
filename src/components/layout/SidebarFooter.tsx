'use client';
import { useTranslation } from 'react-i18next';

export function SidebarFooter() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'en' ? 'en-GB' : 'es-ES';
  const dateStr = new Date().toLocaleDateString(locale, { day:'2-digit', month:'short', year:'2-digit' });

  return (
    <div style={{ padding:'10px 14px', borderTop:'1px solid #E2E8F0', fontSize:10, color:'#94A3B8', flexShrink:0 }}>
      <div style={{ fontWeight:600, color:'#6B7785', marginBottom:4, fontSize:10, letterSpacing:'0.02em' }}>MFSA Malta C 112852</div>
      <div style={{ display:'flex', alignItems:'center', gap:5 }}>
        <span style={{ width:6, height:6, borderRadius:'50%', background:'#2DA771', display:'inline-block', flexShrink:0, boxShadow:'0 0 4px rgba(45,167,113,0.5)' }} />
        <span style={{ fontSize:10 }}>{t('nav.updated')} · {dateStr}</span>
      </div>
    </div>
  );
}
