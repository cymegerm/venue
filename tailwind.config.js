/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/venue/**/*.{html,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
