module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
  plugins: [],
};
