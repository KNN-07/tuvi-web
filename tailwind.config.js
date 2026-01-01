/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { serif: ['"Noto Serif"', 'serif'] },
      colors: {
        hanh: { kim: '#9E9E9E', moc: '#4CAF50', thuy: '#000100', hoa: '#a71a14', tho: '#e6bd37' }
      }
    },
  },
  plugins: [],
}
