import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VUMI — Your Knowledge, Finally Alive",
  description: "VUMI turns years of expert conversations, research, and institutional knowledge into a living AI. Built on 6+ years of human-AI work — before the hype.",
  openGraph: {
    title: "VUMI — Your Knowledge, Finally Alive",
    description: "Knowledge infrastructure that actually thinks. Built by ReMotive Media.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#060A14" }}>
        {children}
      </body>
    </html>
  );
}
