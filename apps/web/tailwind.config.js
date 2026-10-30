/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#005c55",
        "primary-container": "#0f766e",
        "on-primary": "#ffffff",
        "on-primary-container": "#a3faef",
        "primary-fixed": "#9cf2e8",
        "primary-fixed-dim": "#80d5cb",
        "on-primary-fixed": "#00201d",
        "on-primary-fixed-variant": "#00504a",
        "inverse-primary": "#80d5cb",

        "secondary": "#455f87",
        "secondary-container": "#b5d0fd",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#3e5980",
        "secondary-fixed": "#d5e3ff",
        "secondary-fixed-dim": "#adc8f5",
        "on-secondary-fixed": "#001c3b",
        "on-secondary-fixed-variant": "#2d486d",

        "tertiary": "#015b56",
        "tertiary-container": "#2a746f",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#b0f7f0",
        "tertiary-fixed": "#a8f0e8",
        "tertiary-fixed-dim": "#8dd3cc",
        "on-tertiary-fixed": "#00201e",
        "on-tertiary-fixed-variant": "#00504b",

        "surface": "#f6f9ff",
        "surface-bright": "#f6f9ff",
        "surface-dim": "#cedce9",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#ebf5ff",
        "surface-container": "#e2effe",
        "surface-container-high": "#dceaf8",
        "surface-container-highest": "#d6e4f2",
        "surface-variant": "#d6e4f2",
        "surface-tint": "#006a63",

        "on-surface": "#101d27",
        "on-surface-variant": "#3e4947",
        "outline": "#6e7977",
        "outline-variant": "#bdc9c6",

        "inverse-surface": "#25323c",
        "inverse-on-surface": "#e6f2ff",
        "background": "#f6f9ff",
        "on-background": "#101d27",

        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
      },
      borderRadius: {
        DEFAULT: "0.25rem", // 4px
        sm: "0.125rem",     // 2px
        md: "0.375rem",     // 6px
        lg: "0.5rem",       // 8px
        xl: "0.75rem",      // 12px
        full: "9999px",
      },
      spacing: {
        "space-xs": "0.25rem",   // 4px
        "space-sm": "0.5rem",    // 8px
        "space-md": "1rem",      // 16px
        "space-lg": "1.5rem",    // 24px
        "space-xl": "2.5rem",    // 40px
        "gutter": "1.5rem",      // 24px
        "gutter-sm": "1rem",     // 16px
        "margin": "2rem",        // 32px
        "margin-mobile": "1rem", // 16px
      },
      fontFamily: {
        serif: ["Newsreader", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        headline: ["Newsreader", "serif"],
        citation: ["Newsreader", "serif"],
      },
      fontSize: {
        "headline-xl": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-xl-mobile": ["30px", { lineHeight: "38px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "500" }],
        "headline-sm": ["20px", { lineHeight: "28px", letterSpacing: "0em", fontWeight: "500" }],
        "title-lg": ["18px", { lineHeight: "26px", letterSpacing: "0em", fontWeight: "600" }],
        "title-md": ["16px", { lineHeight: "24px", letterSpacing: "-0.005em", fontWeight: "600" }],
        "title-sm": ["14px", { lineHeight: "20px", letterSpacing: "0em", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "26px", letterSpacing: "0em", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "22px", letterSpacing: "0em", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "18px", letterSpacing: "0.005em", fontWeight: "400" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.04em", fontWeight: "600" }],
        "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.05em", fontWeight: "500" }],
        "citation": ["13px", { lineHeight: "18px", letterSpacing: "0.01em", fontWeight: "400" }],
      },
      boxShadow: {
        "level-1": "0 1px 3px rgba(30, 58, 95, 0.05), 0 1px 2px rgba(30, 58, 95, 0.03)",
        "level-2": "0 4px 12px rgba(30, 58, 95, 0.07), 0 1px 3px rgba(30, 58, 95, 0.04)",
        "level-3": "0 12px 32px rgba(30, 58, 95, 0.09), 0 2px 6px rgba(30, 58, 95, 0.04)",
      }
    },
  },
  plugins: [],
}
