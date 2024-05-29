/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        avenir: ["Avenir", "sans-serif"],
      },
      colors: {
        venmoBlue: "#3396FF",
        homeBg: "#fbf7f6",
        primaryText: "#5641d9",
        customGradientStart: "#4c6ef5",
        customGradientEnd: "#b197fc",
      },
    },
  },
  plugins: [],
};
