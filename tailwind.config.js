/** @type {import('tailwindcss').Config} */

// import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-worksans)", ...fontFamily.sans],
        title: ["var(--font-worksans)", ...fontFamily.sans],
        // mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: colors.emerald[500],
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      scale: {
        "-1": "-1",
        110: "1.1",
      },
      zIndex: {
        100: "100",
      },
      screens: {
        "2xl": {
          min: "1536px",
        },

        xl: {
          min: "1280px",
        },
        lg: {
          min: "1024px",
        },
        md: {
          min: "768px",
        },
        sm: {
          min: "600px",
        },
        xsm: {
          min: "480px",
        },
        "3xlmx": {
          max: "1520px",
        },
        "2xlmx": {
          max: "1366px",
        },
        xlmx: {
          max: "1280px",
        },
        lgmx: {
          max: "1024px",
        },
        mdmx: {
          max: "768px",
        },
        "700mx": {
          max: "700px",
        },
        smmx: {
          max: "600px",
        },
        xsmmx: {
          max: "480px",
        },
        "2xsmmx": {
          max: "420px",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
