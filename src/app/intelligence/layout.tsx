// app/intelligence/layout.tsx
import Link from 'next/link';
import { Suspense } from 'react';

const NAV = [
  { href: '/intelligence', label: 'Cockpit', icon: '◈' },
  { href: '/intelligence/audiences', label: 'Audiencias', icon: '◉' },
  { href: '/intelligence/geography', label: 'Geografía', icon: '◎' },
  { href: '/intelligence/brokers', label: 'Brokers', icon: '◐' },
  { href: '/intelligence/competitors', label: 'Competidores', icon: '◑' },
  { href: '/intelligence/proposition', label: 'Propuesta', icon: '◒' },
  { href: '/intelligence/roadmap', label: 'Roadmap', icon: '◓' },
  { href: '/intelligence/gates', label: 'Gates & Gaps', icon: '▣' },
  { href: '/intelligence/signals', label: 'Señales', icon: '◆' },
  { href: '/intelligence/ask', label: 'Ask VUMI', icon: '◇' },
];

export const metadata = {
  title: 'VUMI Europe · Spain Intelligence Portal',
  description: 'Strategic intelligence for the VUMI Europe Spain launch.',
};

export default function IntelligenceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F7FA', fontFamily: "'Open Sans', system-ui, sans-serif" }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: 220,
        minWidth: 220,
        background: '#fff',
        borderRight: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
      }}>
        {/* Brand */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 6, background: '#0033A0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 12,
            }}>V</div>
            <div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13, color: '#0033A0', letterSpacing: '-0.01em' }}>VUMI Europe</div>
              <div style={{ fontSize: 10, color: '#6B7785', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Spain Intelligence</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {NAV.map(({ href, label, icon }) => (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 12px', borderRadius: 6, marginBottom: 2,
              color: '#2C3539', textDecoration: 'none', fontSize: 13, fontWeight: 500,
              transition: 'all 0.15s',
            }}
              className="nav-item"
            >
              <span style={{ color: '#00A9E0', fontSize: 11, width: 14, flexShrink: 0 }}>{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: 10, color: '#6B7785', fontWeight: 500 }}>
            <div style={{ marginBottom: 2 }}>VUMI Spain v2.2.0</div>
            <div style={{ color: '#00A9E0' }}>● Operational</div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Sticky header */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 32px',
          height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: '#6B7785', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Intelligence Portal</span>
            <span style={{ color: '#E2E8F0' }}>·</span>
            <span style={{ fontSize: 11, color: '#2DA771', fontWeight: 600 }}>● Live</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/intelligence/ask" style={{
              padding: '6px 14px', borderRadius: 4, background: '#0033A0', color: '#fff',
              fontSize: 12, fontWeight: 600, fontFamily: "'Montserrat', sans-serif",
              textDecoration: 'none', letterSpacing: '0.02em',
            }}>
              Ask VUMI
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '32px', minWidth: 0, overflowX: 'hidden' }}>
          <Suspense fallback={<SkeletonLoader />}>
            {children}
          </Suspense>
        </main>
      </div>

      <style>{`
        .nav-item:hover { background: #F5F7FA; color: #0033A0; }
        @media (max-width: 768px) {
          aside { display: none; }
          main { padding: 16px !important; }
        }
      `}</style>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[1,2,3].map(i => (
        <div key={i} style={{ height: 80, borderRadius: 8, background: '#E2E8F0', animation: 'pulse 1.5s ease-in-out infinite' }} />
      ))}
      <style>{`@keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:.4 } }`}</style>
    </div>
  );
}
