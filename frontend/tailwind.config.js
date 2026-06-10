/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#42A5B3',
        'dark-bg': '#1a1d2e',
        'dark-card': '#252b3f',
        'dark-border': '#3a4157',
      },
    },
  },
  plugins: [],
}
