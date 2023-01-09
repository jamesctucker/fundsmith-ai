/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["MerriweatherSans", "sans-serif"],
      serif: ["Cardo", "serif"],
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
          // Verdigris
          primary: "#00ABB3",
          // Maximum Blue Green
          secondary: "#3C4048",
          // Frenc
          accent: "#D8315B",
          // Rich Black
          neutral: "#042A2B",
          // White
          "base-100": "#FFFFFF",
          // Maximum Blue Green
          info: "#3FC1C9",
          //  Spanish Viridian
          success: "#57886C",
          // Honey Yellow
          warning: "#FFB30F",
          // French Rose
          error: "#FC5185",
        },
      },
    ],
  },
};
