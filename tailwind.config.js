/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Montserrat", "serif"],
      mono: ["Railway", "monospace"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          // Spanish Viridian
          primary: "#2B7C5F",
          // Cultured
          secondary: "#F5F5F5",
          // Mint Cream
          accent: "#F4FBF7",
          // Eerie Black
          neutral: "#212121",
          // White
          "base-100": "#FFFFFF",
          // True Blue
          info: "#4062BB",
          //  Spanish Viridian
          success: "#2B7C5F",
          // Amber
          warning: "#FF7D00",
          // Cardinal
          error: "#C5283D",
        },
      },
    ],
  },
};
