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
    scale: {
      "-1": "-1",
      110: "1.1",
    },

    extend: {
      zIndex: {
        "-1": "-1",
        "-10": "-10",
      },
      fontFamily: {
        sans: ["Inter", defaultTheme.fontFamily.sans],
        secondary: ["Work Sans", "system-ui", "sans-serif"],
      },
      minWidth: {
        300: "300px",
      },
      colors: {
        lightGray: "var(--light-bg-color)",
        bgGray: "#141414",
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
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  variants: {
    extend: {
      textColor: ["group-focus"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
