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
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
      },
      colors: {
        aqua: '#21b9fb', // Reemplaza con el código hexadecimal exacto
        beige: '#f8f6f3',
      },
    },
  },
  plugins: [],
}