"use client";

import { useEffect } from "react";

/**
 * Branded error boundary for the Spain Command Center.
 * Triggered only if the upstream portal is hard-down; the route handler
 * itself already renders its own 502 HTML page for transient failures.
 */

export default function IntelligenceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface in Vercel runtime logs for diagnostics
    // eslint-disable-next-line no-console
    console.error("[intelligence] boundary caught:", error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#F5F7FA",
        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        color: "#2C3539",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Open+Sans:wght@400;600&display=swap');`}</style>
      <div
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: "1.2rem",
          color: "#0033A0",
          marginBottom: "10px",
          letterSpacing: "-0.01em",
        }}
      >
        VUMI<sup style={{ fontSize: ".55em" }}>®</sup> EUROPE
      </div>
      <div
        style={{
          fontSize: ".75rem",
          color: "#6B7785",
          textTransform: "uppercase",
          letterSpacing: ".1em",
          marginBottom: "36px",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
        }}
      >
        Spain Command Center
      </div>
      <h1
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "1.4rem",
          fontWeight: 600,
          marginBottom: "14px",
          color: "#2C3539",
          letterSpacing: "-0.015em",
        }}
      >
        The intelligence feed is briefly unavailable
      </h1>
      <p
        style={{
          fontSize: ".95rem",
          color: "#6B7785",
          maxWidth: "520px",
          lineHeight: 1.6,
          marginBottom: "28px",
        }}
      >
        This is typically a transient issue with the upstream data source. Retry
        in a few seconds. If the issue persists, contact your VUMI Europe
        representative.
      </p>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button
          onClick={() => reset()}
          style={{
            background: "#0033A0",
            color: "#fff",
            border: "none",
            padding: "12px 28px",
            borderRadius: "4px",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: ".9rem",
            cursor: "pointer",
            letterSpacing: ".01em",
          }}
        >
          Retry
        </button>
        <a
          href="/"
          style={{
            color: "#0033A0",
            fontSize: ".88rem",
            textDecoration: "none",
            fontWeight: 600,
            fontFamily: "'Montserrat', sans-serif",
            padding: "12px 4px",
          }}
        >
          Return to VUMI Europe →
        </a>
      </div>
    </div>
  );
}
