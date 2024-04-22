/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0e8080",
        hover: "#0f7070",
        primaryop: "#50e3c2",
        sidebarbg: "#e8efef",
        primarybg: "#d7e3e3",
        playerbg: "#c0d8d8"
      },
      screens: {
        'phone': '400px',
        // => @media (min-width: 640px) { ... }

        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }

        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      keyframes: {
        'slide-right': {
          '0%': {
            '-webkit-transform': ' translateX(-500px);',
            transform: 'translateX(-500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-left': {
          '0%': {
            '-webkit-transform': ' translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-left2': {
          '0%': {
            '-webkit-transform': ' translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'animation-scale-up': {
          '0%': {
            '-webkit-transform': 'scale(1)',
            transform: 'scale(1)'
          },
          '100%': {
            '-webkit-transform': 'scale(1.1)',
            transform: 'scale(1.1)'
          }
        },
        'animation-scale-down': {
          '0%': {
            '-webkit-transform': 'scale(1.1)',
            transform: 'scale(1.1)'
          },
          '100%': {
            '-webkit-transform': 'scale(1)',
            transform: 'scale(1)'
          }
        },
        'animation-rotate': {
          '0%': {
            '-webkit-transform': 'rotate(0deg)',
            transform: 'rotate(0deg)'
          },
          '100%': {
            '-webkit-transform': 'rotate(360deg)',
            transform: 'rotate(360deg)'
          }
        },
      },
      animation: {
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'scale-up': 'animation-scale-up 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'scale-down': 'animation-scale-down 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'rotate': 'animation-rotate 10s linear infinite'
      },
    },
  },
  plugins: [],
}