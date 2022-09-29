/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  theme: {
    screens: {
      'xs': '390px',
      ...defaultTheme.screens,
    },
  },
  variants: {},
  plugins: [],

  content: ["*"],

}
