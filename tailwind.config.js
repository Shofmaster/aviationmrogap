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
          900: '#1e293b',
          800: '#273548',
          700: '#334155',
        },
        'sky-blue': '#0ea5e9',
        'gold': '#f59e0b',
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      },
    },
  },
  plugins: [],
}
