/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#E8D5A3',
          DEFAULT: '#C4A35A',
          dark: '#9A7A35',
        },
        cream: {
          light: '#FDFCFA',
          DEFAULT: '#F5F0E8',
          dark: '#EDE6D6',
        },
        charcoal: {
          light: '#4A4A4A',
          DEFAULT: '#2C2C2C',
          dark: '#1A1A1A',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        'ultra-wide': '0.35em',
      },
    },
  },
  plugins: [],
}
