import React from 'react';
import { NavClient } from '@/components/layout/NavClient';
import { SidebarFooter } from '@/components/layout/SidebarFooter';
import { I18nProvider } from '@/lib/i18n/provider';
import { LanguageToggle } from '@/components/i18n/LanguageToggle';

export const metadata = {
  title: 'VUMI Europe · Spain Intelligence Portal',
  description: 'Strategic intelligence for the VUMI Europe Spain launch.',
};

export default function IntelligenceLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <div style={{ display:'flex', minHeight:'100vh', background:'#F5F7FA', fontFamily:"'Open Sans',system-ui,sans-serif" }}>

        {/* ── Sidebar ── */}
        <aside style={{ width:224, minWidth:224, background:'#fff', borderRight:'1px solid #E2E8F0', display:'flex', flexDirection:'column', position:'sticky', top:0, height:'100vh', overflow:'hidden' }}>

          {/* Trust Blue gradient accent bar */}
          <div style={{ height:3, background:'linear-gradient(90deg,#0033A0 0%,#00A9E0 100%)', flexShrink:0 }} />

          {/* Brand + toggle */}
          <div style={{ padding:'15px 14px 13px', borderBottom:'1px solid #E2E8F0', flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:6 }}>
              <div style={{ display:'flex', alignItems:'center', gap:9, minWidth:0 }}>
                <div style={{
                  width:34, height:34, borderRadius:8,
                  background:'linear-gradient(135deg,#0044CC 0%,#0033A0 60%,#002480 100%)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#fff', fontFamily:"'Montserrat',sans-serif", fontWeight:800, fontSize:15,
                  letterSpacing:'-0.03em', boxShadow:'0 2px 10px rgba(0,51,160,0.32)',
                  flexShrink:0, userSelect:'none',
                }}>V</div>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:12.5, color:'#0033A0', letterSpacing:'-0.02em', whiteSpace:'nowrap' }}>VUMI Europe</div>
                  <div style={{ fontSize:9, color:'#00A9E0', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.12em', whiteSpace:'nowrap', marginTop:1 }}>Spain Intelligence</div>
                </div>
              </div>
              <LanguageToggle />
            </div>
          </div>

          {/* Nav */}
          <NavClient />

          {/* Footer */}
          <SidebarFooter />

        </aside>

        {/* ── Main content ── */}
        <main style={{ flex:1, overflowY:'auto', minWidth:0 }}>
          <div style={{ padding:'28px 32px', minHeight:'100%' }}>
            {children}
          </div>
        </main>

      </div>
    </I18nProvider>
  );
}
