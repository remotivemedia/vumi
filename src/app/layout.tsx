import type { Metadata } from "next";
import { ElevenLabsWidget } from '@/components/voice/ElevenLabsWidget';

export const metadata: Metadata = {
  title: "VUMI — Tu salud no espera fronteras",
  description: "Seguro médico premium para latinoamericanos en Europa. Elige cuándo, con quién y dónde te tratas. Libre elección, sin listas de espera, asistencia 24/7 en español.",
  openGraph: {
    title: "VUMI — Tu salud no espera fronteras",
    description: "Seguro médico premium para latinoamericanos en Europa.",
    type: "website",
    locale: "es_ES",
  },
  keywords: ["seguro médico expatriados", "seguros latinoamericanos España", "seguro salud Venezuela España", "VUMI seguro Europa"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#F8F5F0" }}>
        {children}
        <ElevenLabsWidget />
      </body>
    </html>
  );
}
