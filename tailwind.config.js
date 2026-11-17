/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        dark: {
          bg: '#0a0b0e',
          card: '#12141a',
          surface: '#181b22',
          border: 'rgba(255, 255, 255, 0.1)',
          text: '#f1f3f7',
          muted: '#9ba3af',
        },
        light: {
          bg: '#f8f9fa',
          card: '#ffffff',
          surface: '#f1f3f5',
          border: 'rgba(0, 0, 0, 0.1)',
          text: '#111827',
          muted: '#6b7280',
        },
        brand: {
          emerald: '#1A5A43',
          jade: '#4BA875',
          gold: '#C5C451',
          accent: '#10b981',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Montserrat', 'sans-serif'],
        heading: ['Montserrat', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
