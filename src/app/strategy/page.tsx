export default function StrategyPage() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#080807', zIndex: 0 }}>
      <iframe
        src="/gtm-deck.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        title="VUMI España — GTM Strategy Briefing"
        allowFullScreen
      />
    </div>
  )
}
