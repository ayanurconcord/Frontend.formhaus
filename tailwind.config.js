/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bone: '#f3efe8',
        charcoal: '#111111',
        vermilion: '#d85c2d',
        steel: '#d0d1ce',
        graphite: '#424242',
        iron: '#8d8c89'
      },
      fontFamily: {
        display: ['Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 50px rgba(216, 92, 45, 0.18)'
      }
    },
  },
  plugins: [],
};
