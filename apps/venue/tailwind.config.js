/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
