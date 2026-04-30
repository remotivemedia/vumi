'use client';
import Script from 'next/script';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { 'agent-id': string },
        HTMLElement
      >;
    }
  }
}

export function ElevenLabsWidget() {
  return (
    <>
      <elevenlabs-convai agent-id="agent_7501kqdz6w99e3mbppy29qemmdvq" />
      <Script
        src="https://elevenlabs.io/convai-widget/index.js"
        strategy="afterInteractive"
      />
    </>
  );
}
