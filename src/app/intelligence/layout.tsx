import React from 'react';
import { NavClient } from '@/components/layout/NavClient';

export const metadata = {
  title: 'VUMI Europe · Spain Intelligence Portal',
  description: 'Strategic intelligence for the VUMI Europe Spain launch.',
};

export default function IntelligenceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#F5F7FA', fontFamily:"'Open Sans',system-ui,sans-serif" }}>
      <aside style={{ width:220, minWidth:220, background:'#fff', borderRight:'1px solid #E2E8F0', display:'flex', flexDirection:'column', position:'sticky', top:0, height:'100vh', overflow:'hidden' }}>
        <div style={{ padding:'22px 18px 18px', borderBottom:'1px solid #E2E8F0' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:7, background:'#0033A0', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:13, letterSpacing:'-0.02em', boxShadow:'0 2px 8px rgba(0,51,160,0.25)' }}>V</div>
            <div>
              <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:13, color:'#0033A0', letterSpacing:'-0.01em' }}>VUMI Europe</div>
              <div style={{ fontSize:10, color:'#00A9E0', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em' }}>Spain Intelligence</div>
            </div>
          </div>
        </div>
        <NavClient />
        <div style={{ padding:'12px 16px', borderTop:'1px solid #E2E8F0', fontSize:10, color:'#94A3B8' }}>
          <div style={{ fontWeight:600, color:'#6B7785', marginBottom:2 }}>MFSA Malta C 112852</div>
          <div>Actualizado: {new Date().toLocaleDateString('es-ES',{ day:'2-digit', month:'short' })}</div>
        </div>
      </aside>
      <main style={{ flex:1, padding:'28px 32px', overflowY:'auto', minWidth:0 }}>
        {children}
      </main>
    </div>
  );
}
