/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5d87ff',
        'dark-bg': '#1a1d2e',
        'dark-card': '#252b3f',
        'dark-border': '#3a4157',
      },
    },
  },
  plugins: [],
}
