/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.vue", "./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        GarudaBlack: "#1a1a18"
      },
      fontFamily: {
        'bebas-neue': ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}