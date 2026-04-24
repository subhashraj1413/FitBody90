/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './App.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        black: '#0A0A0A',
        carbon: '#121212',
        card: '#181818',
        red: '#E10600',
        redBright: '#FF2A2A',
        whiteSoft: '#F5F5F5',
        grayText: '#9A9A9A',
        success: '#22C55E',
      },
    },
  },
  plugins: [],
};
