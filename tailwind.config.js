/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1B98E0',
        light: '#FFFFEA',
        dark: '#0F110C',
      },
      backgroundColor: {
        primary: '#1B98E0',
        light: '#FFFFEA',
        dark: '#0F110C',
      },
      textColor: {
        primary: '#1B98E0',
        light: '#FFFFEA',
        dark: '#0F110C',
      },
    },
  },
  plugins: [],
};