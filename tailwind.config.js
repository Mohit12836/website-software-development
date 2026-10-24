/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9dffe',
          300: '#7cc4fd',
          400: '#36a4fa',
          500: '#0c87eb',
          600: '#006bc9',
          700: '#0155a3',
          800: '#054885',
          900: '#0a3d6e',
          950: '#072648',
        },
        accent: {
          50: '#fbf4ff',
          100: '#f6e7ff',
          200: '#edd2ff',
          300: '#dfaeff',
          400: '#cb7dff',
          500: '#b44df9',
          600: '#9b2be5',
          700: '#841dc3',
          800: '#6f1aa0',
          900: '#5a1780',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(12, 135, 235, 0.35)',
        'glow-accent': '0 0 40px -10px rgba(180, 77, 249, 0.35)',
        'card-glow': '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 0 15px -3px rgba(12, 135, 235, 0.1)',
      }
    },
  },
  plugins: [],
}
