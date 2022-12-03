/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2889F1',
          secondary: '#FDB725',
          accent: '#F12889',
          neutral: '#202531',
          'base-100': '#3E4553',
          'base-200': '#2E3543',
          'base-300': '#11141C',
        },
      },
    ],
  },
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
  plugins: [require('daisyui')],
};
