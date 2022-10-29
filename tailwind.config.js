/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./**/*.{html,js}', './src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        main: '#00807E',
        secondary: '#64C3BF',
      },
    },
  },
  plugins: [],
}
