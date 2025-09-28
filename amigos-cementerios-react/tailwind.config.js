/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ffc451',
        'primary-hover': '#ffd584',
        'dark': '#444444',
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
        'heading': ['Raleway', 'sans-serif'],
      }
    },
  },
  plugins: [],
}