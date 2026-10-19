/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  // Prevent Tailwind from conflicting with Bootstrap
  corePlugins: {
    preflight: false, // Disable Tailwind's base reset to avoid Bootstrap conflicts
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b5d50',
          dark: '#314d43',
          light: '#dce5e4',
        },
        secondary: {
          DEFAULT: '#f9bf29',
          hover: '#f8b810',
        },
        text: {
          DEFAULT: '#2f2f2f',
          muted: '#6a6a6a',
        },
        background: '#eff2f1',
      },
      boxShadow: {
        'custom': '0 0 20px rgba(0,0,0,0.05)',
        'custom-sm': '0 0 10px rgba(0,0,0,0.03)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '28': '7rem',
      },
      gridTemplateColumns: {
        '27': 'repeat(27, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
