/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    //import custom font
    extend: {
      colors: {
        'gray-bg': '#13161E',
        'gray-box': '#2C313D',
        'gray-highlight': '#545965',
        'gray-header': '#202531',
        'gray-text': '#7C8498',
        'white-text': '#FBFFFF',
        'gray-side': '#191C24',
        'blue-primary': '#2889F1',
      },
    },
    fontFamily: {
      jost: ['Jost', 'sans-serif'],
    },
  },
  plugins: [require('tailwindcss-debug-screens')],
};
