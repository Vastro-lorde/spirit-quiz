/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontSize: {
      '2xs': '0.6rem',
      '3xs': '0.4rem',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {
      fontFamily: {
        'inter': ['"inter"', ...defaultTheme.fontFamily.sans],
        'Space-Grotesk': ["Space Grotesk", ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        'striped-down': "url('../src/assets/striped_gray_line_bg.svg')",
        'striped-up': "url('../src/assets/striped_bg.svg')",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
