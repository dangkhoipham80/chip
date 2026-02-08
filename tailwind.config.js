/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-pink': '#FFE5E5',
        'pastel-blue': '#E5F3FF',
        'pastel-yellow': '#FFF9E5',
      },
      fontFamily: {
        'comic': ['"Comic Neue"', 'cursive', 'system-ui'],
      },
      borderRadius: {
        'xl': '16px',
      },
    },
  },
  plugins: [],
}
