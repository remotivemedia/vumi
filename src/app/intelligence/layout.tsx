import type { Metadata } from "next";

/**
 * Metadata for the Spain Command Center route group.
 * - `robots: noindex` prevents strategic intelligence from leaking into search engines
 * - branded title and description for browser tabs, bookmarks, and accidental social shares
 */

export const metadata: Metadata = {
  title: "Spain Command Center · VUMI Europe",
  description:
    "Live strategic intelligence for the VUMI Europe Spain launch — market entry, priority audiences, broker ecosystem, competitive landscape, 12-month roadmap.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "Spain Command Center · VUMI Europe",
    description: "Strategic intelligence for the VUMI Europe Spain launch.",
    type: "website",
    locale: "en_GB",
  },
  twitter: { card: "summary", title: "Spain Command Center · VUMI Europe" },
};

export default function IntelligenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
