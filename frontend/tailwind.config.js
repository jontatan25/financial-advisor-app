/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      fontSize: {
        'custom-24': '24px',
        'custom-40': '40px',
        'custom-56': '56px'
      },
      lineHeight: {
        'custom-67': '67px',
        'custom-48': '48px'
      },
      colors: {
        primary: '#3872FF', // Azul
        secondary: '#667085', // gris
        ternary: '#98A2B3', //gris suave
        accent: '#475467', // gris oscuro
      },
      width: {
        'custom-544': '544px'
      },
      padding: {
        'custom-14': '14px'
      }
    }
  },
  plugins: []
}
