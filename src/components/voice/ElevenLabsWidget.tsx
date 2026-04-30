'use client';
import Script from 'next/script';
import React from 'react';

export function ElevenLabsWidget() {
  return (
    <>
      {React.createElement('elevenlabs-convai', { 'agent-id': 'agent_7501kqdz6w99e3mbppy29qemmdvq' })}
      <Script
        src="https://elevenlabs.io/convai-widget/index.js"
        strategy="afterInteractive"
      />
    </>
  );
}
