/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {
        height: "max-height",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, visibility: "visible" },
          "20%": { opacity: 0 },
          "100%": {
            opacity: 1,
          },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "20%": { opacity: 1 },
          "99%": { opacity: 0 },
          "100%": { visibility: "hidden" },
        },
      },
      animation: {
        fadeIn: "0.3s fadeIn ease-in-out ",
        fadeOut: "0.5s fadeOut ease-in-out",
      },
    },
  },
  plugins: [],
};
