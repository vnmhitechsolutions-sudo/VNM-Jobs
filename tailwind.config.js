/// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // This array tells Tailwind where to find your class names!
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#1C274C',    // Deep Professional Blue
        'primary-light': '#F8F9FA',   // Light White/Gray Background
        'accent-teal': '#10B981',     // Vibrant Teal for CTAs
        'accent-yellow': '#FBBF24',   // Subtle Secondary Accent
        'card-bg': '#FFFFFF',         // Clean Card Background
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Modern clean font
      },
      boxShadow: {
        'classic': '0 10px 30px rgba(28, 39, 76, 0.15)', // Enhanced shadow
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}