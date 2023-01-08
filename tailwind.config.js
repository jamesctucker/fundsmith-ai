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
          // Y in Mn Blue
          primary: "#162E37",
          // Maximum Blue Green
          secondary: "#3FC1C9",
          // Frenc
          accent: "#FC5185",
          // Eerie Black
          neutral: "#131516",
          // Cultured
          "base-100": "#F5F5F5",
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
