/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#EB1D36",
        secondary: "#212529",
        dark: "#6C757D",
      }
    },
    animation: {
      'spin-slow': 'spin 3s linear infinite',
    },
  },
  }
  

