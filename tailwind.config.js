/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lza: { black: '#050505', gold: '#FDB813', red: '#E31E24', gray: '#1A1A1A' }
      }
    },
  },
  plugins: [],
}
