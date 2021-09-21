const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  jit: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        light: {
          primary: "#00b1cf",
          secondary: "#888",
          tertiary: "#0059ff",
          dark: "#2B333D",
          default: "#888",
          black: "#000",
          light: "#85C4F9",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  container: {
    center: true,
  },
  screens: {
    xs: {
      min: "500px",
    },
    sm: {
      min: "640px",
    },
    md: {
      min: "768px",
    },
    lg: {
      min: "1360px",
    },
    xl: {
      max: "1440px",
    },
  },
  plugins: [],
};