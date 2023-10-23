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
          DEFAULT: '#007EFC',
          50: '#DDEEFF',
          100: '#C9E4FF',
          200: '#A0D0FF',
          300: '#77BBFF',
          400: '#4FA7FF',
          500: '#2692FF',
          600: '#007EFC',
          700: '#0062C4',
          800: '#00468C',
          900: '#002A54',
          950: '#001224'
        },
        secondary:{
          
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}