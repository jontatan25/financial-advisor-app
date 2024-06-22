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
        primary: '#3872FF', // Blue
        secondary: '#667085', // grey
        ternary: '#98A2B3', // light grey
        accent: '#475467', // dark grey
        riwhite: '#FCFAFF', // background white
        ripurple: '#6941C6', // table amount purple
        risuccess: '#027A48', // green success
        ridanger: '#FF5733', // danger red
        ridarktext: '#1D2939', //dark grey text
        ritableheader: '#FCFCFD', // table header bg
        riyellow: '#F5BC00', // table header bg
      },
      width: {
        'custom-544': '544px',
        'custom-400': '400px',
        'custom-832': '832px'
      },
      height: {
        'custom-460': '460px'
      },
      padding: {
        'custom-14': '14px'
      },
      borderColor: {
        'custom-white': '#E9E9E9',
        'ritableheaderborder': '#EAECF0' // table border
      },
      borderWidth: {
        'custom-1': '1px'
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.btn-state': {
          border: '3px solid transparent', // Invisible border by default
          '&:hover': {
            backgroundColor: '#3061D9'
          },
          '&:active': {
            '@apply bg-slate-700': {}
          },
          '&:focus': {
            border: '3px solid #2851B5',
            outline: 'none'
          }
        }
      }

      addUtilities(newUtilities, ['hover', 'focus', 'active'])
    }
  ]
}
