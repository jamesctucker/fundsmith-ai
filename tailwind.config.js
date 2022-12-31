/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
          // Timberwolf
          secondary: "#E9E0D8",
          // Isabeline
          accent: "#F5F1ED",
          // Eerie Black
          neutral: "#212121",
          // Isabelline
          "base-100": "#F5F1ED",
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
