/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#674381',
        secondary: '#ffad3a',
      }
    },
  },
  plugins: [],
}

