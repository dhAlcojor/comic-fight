const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      fighter: ["Fatal Fighter", "sans-serif"],
    },
    extend: {
      colors: {
        damage: {
          DEFAULT: colors.red[600],
        },
        dodge: {
          DEFAULT: colors.blue[700],
        },
        regenerate: {
          DEFAULT: colors.green[600],
        },
      },
    },
  },
  plugins: [],
}
