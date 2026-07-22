/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#050505',
          gold: '#D4AF37',
          goldLight: '#F9E076',
          yellow: '#FFD700',
          dark: '#121212'
        }
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #050505 0%, #1a1a1a 100%)',
      }
    },
  },
  plugins: [],
}
