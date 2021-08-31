const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  // purge: [],
  // important: "#cass",
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    aspectRatio: {
      260: "260",
      391: "391",
    },
    padding: {
      sm: "8px",
    },
    scale: {
      "-1": "-1",
      110: "1.1",
    },
    fontSize: {
      0: [
        "0px",
        {
          letterSpacing: "0px",
        },
      ],
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },

    extend: {
      zIndex: {
        "-1": "-1",
        "-10": "-10",
        100: "100",
      },
      fontFamily: {
        sans: ["Inter", defaultTheme.fontFamily.sans],
        secondary: ["Work Sans", "system-ui", "sans-serif"],
      },
      minWidth: {
        300: "300px",
        "3/4": "75%",
      },

      colors: {
        lightGray: "var(--light-bg-color)",
      },
      width: {
        "95%": "95%",
      },
      boxShadow: {
        emerald:
          "0 4px 6px -1px rgba(16, 185, 129, 0.1), 0 2px 4px -1px rgba(16, 185, 129, 0.06)",
      },
    },
    screens: {
      "2xl": { max: "1536px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1280px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "600px" },
      // => @media (max-width: 639px) { ... }

      xsm: { max: "480px" },
    },
  },
  variants: {
    extend: {
      textColor: ["group-focus"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
