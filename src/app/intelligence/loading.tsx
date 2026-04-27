// src/app/intelligence/loading.tsx
export default function Loading() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 32, maxWidth: 1200, width: '100%' }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:-800px 0} 100%{background-position:800px 0} }
        .sk { background:linear-gradient(90deg,#E2E8F0 25%,#F5F7FA 50%,#E2E8F0 75%); background-size:800px 100%; animation:shimmer 1.4s ease-in-out infinite; border-radius:6px; }
      `}</style>
      <div className="sk" style={{ height: 80, borderRadius: 8 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 12 }}>
        {[1,2,3,4,5,6].map(i => <div key={i} className="sk" style={{ height: 88 }} />)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[1,2].map(i => <div key={i} className="sk" style={{ height: 300 }} />)}
      </div>
      <div className="sk" style={{ height: 160 }} />
    </div>
  );
}
