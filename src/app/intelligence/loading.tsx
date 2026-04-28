export default function Loading() {
  return (
    <div style={{ maxWidth:1200, width:'100%' }}>
      <style>{`
        @keyframes shimmer {
          0%  { background-position: -900px 0 }
          100%{ background-position:  900px 0 }
        }
        .sk {
          background: linear-gradient(90deg, #EBF0F8 25%, #F5F7FA 50%, #EBF0F8 75%);
          background-size: 900px 100%;
          animation: shimmer 1.6s ease-in-out infinite;
          border-radius: 6px;
        }
      `}</style>

      {/* Blocker banner */}
      <div className="sk" style={{ height:52, borderRadius:8, marginBottom:18 }} />

      {/* Hero verdict */}
      <div className="sk" style={{ height:86, borderRadius:8, marginBottom:20 }} />

      {/* 3 plan cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:18 }}>
        {[1,2,3].map(i => <div key={i} className="sk" style={{ height:82 }} />)}
      </div>

      {/* 6 KPI cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:10, marginBottom:22 }}>
        {[1,2,3,4,5,6].map(i => <div key={i} className="sk" style={{ height:84 }} />)}
      </div>

      {/* 2 col section */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
        <div className="sk" style={{ height:280 }} />
        <div className="sk" style={{ height:280 }} />
      </div>

      {/* Decision log */}
      <div className="sk" style={{ height:180, marginBottom:20 }} />

      {/* Quick nav row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10 }}>
        {[1,2,3,4,5].map(i => <div key={i} className="sk" style={{ height:56 }} />)}
      </div>
    </div>
  );
}
