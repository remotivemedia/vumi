'use client'

import { useState, useRef, useCallback } from 'react'

export default function StrategyPage() {
  const [isFS, setIsFS] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const toggle = useCallback(async () => {
    if (!document.fullscreenElement) {
      await wrapRef.current?.requestFullscreen()
      setIsFS(true)
    } else {
      await document.exitFullscreen()
      setIsFS(false)
    }
  }, [])

  // Sync state with native ESC key exit
  if (typeof window !== 'undefined') {
    document.onfullscreenchange = () => setIsFS(!!document.fullscreenElement)
  }

  return (
    <div ref={wrapRef} style={{ position: 'fixed', inset: 0, background: '#080807' }}>
      <iframe
        src="/gtm-deck.html"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        title="VUMI España — GTM Strategy Briefing"
        allowFullScreen
      />

      {/* Fullscreen toggle */}
      <button
        onClick={toggle}
        title={isFS ? 'Exit fullscreen' : 'Enter fullscreen'}
        style={{
          position: 'fixed',
          top: 14,
          right: 14,
          width: 36,
          height: 36,
          background: 'rgba(10,10,9,0.72)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '0.5px solid rgba(245,243,238,0.18)',
          borderRadius: 6,
          color: '#F5F3EE',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          transition: 'border-color 0.15s, background 0.15s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#E55B4D'
          ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(229,91,77,0.15)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(245,243,238,0.18)'
          ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(10,10,9,0.72)'
        }}
      >
        {isFS ? (
          /* Compress icon */
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M6 1v5H1M10 1v5h5M6 15v-5H1M10 15v-5h5"/>
          </svg>
        ) : (
          /* Expand icon */
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M1 6V1h5M15 6V1h-5M1 10v5h5M15 10v5h-5"/>
          </svg>
        )}
      </button>
    </div>
  )
}
