/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans'],
      },
      backgroundImage: {
        'body-bg': "url('/public/images/background.jpg')",
      }
    }
  },
  plugins: [],
}

