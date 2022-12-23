/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
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
          // Raisin Black
          secondary: "#A99985",
          // Bone
          accent: "#DAD2BC",
          // Raisin Black
          neutral: "#252323",
          // Isabelline
          "base-100": "#F5F1ED",
          // Cornflower Blue
          info: "#7699D4",
          //  Spanish Viridian
          success: "#2B7C5F",
          // Amber
          warning: "#FF7D00",
          // Amaranth Red
          error: "#D90429",
        },
      },
    ],
  },
};
