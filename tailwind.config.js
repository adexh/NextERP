/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors:{
        primary:{
          DEFAULT: '#3E3E46',
          50: '#9898A4',
          100: '#8D8D9A',
          200: '#787887',
          300: '#656572',
          400: '#51515C',
          500: '#3E3E46',
          600: '#242429',
          700: '#0A0A0B',
          800: '#000000',
          900: '#000000',
          950: '#000000'
        },
        secondary:{
          
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}