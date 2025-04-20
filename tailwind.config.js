const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", './node_modules/tw-elements/dist/js/**/*.js',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'redCahier': '#C41627',
        'pinkNakala': '#E6007E',
        'greyNakala': '#A6A2A4',
        'brownNakala': '#544D51',
      }
    },
    fontFamily: {
      'fontRadj': ['Rajdhani', 'sans-serif'],

      'fontCorm': ['Cormorant SC', 'serif'],

      'fontSpec': ['Poiret One', 'cursive'],

      'fontMont': ['Montserrat Alternates', 'sans-serif'],
      'fontAr': ['Arapey', 'serif'],
      'fontRef': ['Aref Ruqaa Ink', 'serif'],
    }
  },

  plugins: [
    require('flowbite/plugin'),
    require('tw-elements/dist/plugin')
  ],
})