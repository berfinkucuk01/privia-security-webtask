/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#82868C",
        secondary: "#3A3C40",
        buttonBlue: "#2940D3",
      },
    },
  },

  plugins: [],
};
