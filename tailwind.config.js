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
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          // Spanish Viridian
          primary: "#162E37",
          // Cultured
          secondary: "#9DC0C3",
          // Mint Cream
          accent: "#F24B4D",
          // Eerie Black
          neutral: "#131516",
          // White
          "base-100": "#ECF4F4",
          // True Blue
          info: "#5899E2",
          //  Spanish Viridian
          success: "#57886C",
          // Amber
          warning: "#F6AE2D",
          // Cardinal
          error: "#F24B4D",
        },
      },
    ],
  },
};
