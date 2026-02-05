/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          900: '#0a1628',
          800: '#0f1f3a',
          700: '#152844',
        },
        'sky-blue': '#00d4ff',
        'gold': '#ffd700',
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #0a1628 0%, #152844 100%)',
      },
    },
  },
  plugins: [],
}
