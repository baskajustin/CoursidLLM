import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0056d2",
        "primary-dark": "#004ab3",
        purple: "#a435f0",
        "dark-surface": "#1c1d1f",
        "body-text": "#3d3d3d",
        "muted-text": "#6a6f73",
        border: "#d1d7dc",
        background: "#f7f9fa",
        success: "#1e7e34",
        error: "#c0392b",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "heading-1": ["clamp(2rem, 4vw, 2.5rem)", { fontWeight: "800", lineHeight: "1.15" }],
        "heading-2": ["clamp(1.5rem, 3vw, 1.75rem)", { fontWeight: "700", lineHeight: "1.25" }],
        "heading-3": ["clamp(1.125rem, 2vw, 1.25rem)", { fontWeight: "600", lineHeight: "1.35" }],
      },
      borderRadius: {
        button: "4px",
        card: "12px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)",
        dropdown: "0 8px 24px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
