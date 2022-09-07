/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'blue-opaque': 'rgb(13 42 148 / 18%)',
        gray: {
          0: '#fff',
          100: '#fafafa',
          200: '#eaeaea',
          250: '#e9e4de', // e9e4de, CICICI, F9F9F9
          300: '#999999',
          400: '#888888',
          500: '#666666',
          600: '#444444',
          700: '#333333',
          800: '#222222',
          900: '#111111'
        },
        beige: {
          400: '#bcaf91',
          500: '#c0b496',
          600: '#c0b496',
          700: '#bdb092'
        },
        brown: {
          100: '#8a7e66',
          200: '#8c7f68',
          300: '#807864',
          400: '#867962',
          500: '#8b7e67',
          600: '#8b7e67',
          700: '#8c7f68',
          800: '#8b7e67'
        },
        flesh: {
          400: '#bc9d83',
          500: '#b8997f',
          600: '#b8997f',
          700: '#bb9c82',
          800: '#bc9d83',
        },
        cream: {
          400: '#e2d9ab',
          500: '#e5dcae',
          600: '#e6ddaf',
          700: '#e2d9aa',
          800: '#e7deaf',
        },
        dirtywhite: {
          400: '#e5e0cc',
          500: '#e9e4d0',
          600: '#e6e1cd',
          700: '#e5e0cc'
        }
      },
      boxShadow: {
        'nier': '3px 3px 0px rgba(77,73,62, .6);'
      },
      dropShadow : {
        "nier" : '0.3rem 0.3rem 0 rgba(186,181,161, 1)'
      },
      transitionProperty: {
        multiple: "width, height, border-width"
      },
      backgroundImage : {
        'grid': `linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,.04) 4px),
                 linear-gradient(transparent, transparent 3px, rgba(0,0,0,.04) 4px)`
      },
      backgroundSize : {
        'szgrid' : `0.2rem 0.2rem`
      },
      fontFamily: {
        lato:['Lato']
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
  corePlugins: {
    fontFamily:true
  }
}
