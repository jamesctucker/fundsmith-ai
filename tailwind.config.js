const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-literata)", ...fontFamily.serif],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          // Midnight Green
          primary: "#023D45",
          // Viridian Green
          secondary: "#0CA4A5",
          // Frenc
          accent: "#D8315B",
          // Dark Jungle Green
          neutral: "#022327",
          // Cultured
          "base-100": "#F0F2EF",
          // Maximum Blue Green
          info: "#3FC1C9",
          //  Viridian Green
          success: "#0CA4A5",
          // Bright Yellow Crayola
          warning: "#F9A620",
          // Fire Engine Red
          error: "#C1292E",
        },
      },
    ],
  },
};
