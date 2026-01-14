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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Kid/Moozi Palette
        primary: {
          DEFAULT: "#8844A6", // Moozi-1
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#D4D952", // Moozi-2
          foreground: "#000000",
        },
        accent: {
          DEFAULT: "#F2A922", // Moozi-3
          foreground: "#000000",
        },
        "accent-light": "#F2C063", // Moozi-4
        destructive: {
          DEFAULT: "#D95829", // Moozi-5
          foreground: "#ffffff",
        },
        // Soft backgrounds
        kid: {
          bg: "#FDFBF7", // Soft cream/off-white for contrast
          surface: "#FFFFFF",
        },
      },
      borderRadius: {
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        "soft-sm": "0 2px 8px -2px rgba(136, 68, 166, 0.1)",
        "soft": "0 8px 24px -6px rgba(136, 68, 166, 0.15)",
        "soft-hover": "0 12px 32px -8px rgba(136, 68, 166, 0.25)",
        "3d": "0 6px 0 0 #6A3582", // Darker purple for 3D effect
        "3d-pressed": "0 2px 0 0 #6A3582",
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
