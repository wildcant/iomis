const { colors } = require('./theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/_app.tsx'],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
}
