/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'arizona': ['ABC Arizona Flare', 'sans-serif'],
        'worksans': ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}