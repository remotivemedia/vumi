/**
 * Branded loading state for the Spain Command Center.
 * Rendered while the upstream portal HTML is being fetched.
 */

export default function Loading() {
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
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans:wght@400;600&display=swap');
        @keyframes vumi-slide {
          0% { left: -30%; }
          100% { left: 100%; }
        }
      `}</style>
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
          fontWeight: 600,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        Spain Command Center
      </div>
      <div
        style={{
          width: "240px",
          height: "2px",
          background: "#E2E8F0",
          borderRadius: "1px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            width: "30%",
            background: "linear-gradient(90deg, #0033A0, #00A9E0)",
            borderRadius: "1px",
            animation: "vumi-slide 1.3s ease-in-out infinite",
          }}
        />
      </div>
      <div
        style={{
          marginTop: "18px",
          fontSize: ".82rem",
          color: "#6B7785",
        }}
      >
        Loading strategic intelligence…
      </div>
    </div>
  );
}
