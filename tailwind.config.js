/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vumi: {
          blue: "#0033A0", // Trust Blue (Primary)
          sky: "#00A9E0",  // Sky Blue (Secondary)
          slate: "#2C3539", // Premium Slate
          pearl: "#F5F7FA", // Soft Pearl
        },
        border: "hsl(var(--border, 214.3 31.8% 91.4%))",
        background: "hsl(var(--background, 0 0% 100%))",
        foreground: "hsl(var(--foreground, 222.2 84% 4.9%))",
      },
      fontFamily: {
        sans: ["Open Sans", "Arial", "Helvetica", "sans-serif"],
        heading: ["Montserrat", "Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        premium: "0 4px 6px -1px rgba(0, 35, 160, 0.05), 0 2px 4px -1px rgba(0, 35, 160, 0.03)",
        "premium-hover": "0 10px 15px -3px rgba(0, 35, 160, 0.08), 0 4px 6px -2px rgba(0, 35, 160, 0.05)",
      }
    },
  },
  plugins: [],
}
