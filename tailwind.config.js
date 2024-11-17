/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
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
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: { fontSize: '2.25rem', fontWeight: '700' },
            h2: { fontSize: '1.875rem', fontWeight: '600' },
            h3: { fontSize: '1.5rem', fontWeight: '500' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],}