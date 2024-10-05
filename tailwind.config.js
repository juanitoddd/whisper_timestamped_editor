/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        'site': '53px calc(100vh - 153px) 100px',
        'flow': '40px auto'
      },
      gridTemplateColumns: {        
        'panels': '180px auto 33.333333%' 
      }
    },
    fontFamily: {
      'display': ['Roboto Mono', 'Oswald'],
      'robotic': ['Bebas Neue', 'sans-serif'],
    }
  },
  plugins: [require('flowbite/plugin')],
};
