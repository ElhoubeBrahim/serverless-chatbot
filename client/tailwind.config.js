/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2CA9BB',
        secondary: '#003044',
        success: '#00B87C',
        danger: '#E74C3C',
        light: '#2CA9BB30',
        glass: '#FFFFFF20',
      },
      boxShadow: {
        light: '0px 0px 0px 5px #2CA9BB33;',
      },
      fontFamily: {
        primary: ["'Poppins'", 'sans-serif'],
        title: ["'Quicksand'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
