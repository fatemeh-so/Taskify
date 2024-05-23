/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue1: '#caebff',
        blue2:"#a1a5fb",
        purple1:"#c7c6ff",
        green1:"#defbal",
        pink1: '#f9a1fb',
        pink2: '#fbalal',
        orange1:"#fbccal",
        yellow1:"#fbf2al",
        gray1:"#737373",
        white2: '#f5f5f5',
        white1:"#fffff",
        gray2:'#242424'
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};