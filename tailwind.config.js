import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.red
        }
      },
      borderImage: {
        'gradient-to-r': 'linear-gradient(to right, #ff7e5f, #feb47b)'
      }
    },

    fontFamily: {
      sans: ['Inter Variable', 'sans-serif']
    }
  },

  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
