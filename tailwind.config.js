const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  // purge: [],
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
      },
      boxShadow: {
        emerald:
          "0 4px 6px -1px rgba(16, 185, 129, 0.1), 0 2px 4px -1px rgba(16, 185, 129, 0.06)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
