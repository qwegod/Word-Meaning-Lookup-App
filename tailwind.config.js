/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      'animation' : {
        text: 'text 10s ease infinite',
        card: 'card .5s ease'
      },
      'keyframes': {
        text: {
          '0%': { background: '#7045AF' },
          '50%': { background: '#E14594' },
          '100%': { background: '#7045AF' },
        },
        card: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}