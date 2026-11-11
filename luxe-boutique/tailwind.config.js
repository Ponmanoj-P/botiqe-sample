/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F8F5F0',
          50: '#FAF8F5',
          100: '#F8F5F0',
          200: '#F0EBE1',
          300: '#E7DFD1',
          400: '#D5C7B2',
        },
        burgundy: {
          DEFAULT: '#632B3A',
          50: '#F5EBEF',
          100: '#EBD7DF',
          200: '#D7AFC0',
          300: '#BE829E',
          400: '#8E3F54',
          500: '#632B3A',
          600: '#52222F',
          700: '#411B25',
          800: '#30131B',
          900: '#1F0B11',
        },
        rose: {
          muted: '#D9B8B3',
          light: '#EAD8D4',
          subtle: '#F6EFEB',
        },
        beige: {
          DEFAULT: '#E9DFD3',
          light: '#F3EFE9',
          dark: '#D8C9B7',
        },
        charcoal: {
          DEFAULT: '#252323',
          light: '#3C3939',
          muted: '#5A5656',
        },
        gold: {
          DEFAULT: '#C5A059',
          light: '#E2CA91',
          dark: '#9A7B39',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.25em',
      },
      boxShadow: {
        'soft-editorial': '0 20px 40px -15px rgba(37, 35, 35, 0.07)',
        'luxury': '0 10px 30px -10px rgba(99, 43, 58, 0.15)',
        'elevated': '0 25px 50px -12px rgba(37, 35, 35, 0.12)',
      },
    },
  },
  plugins: [],
}
