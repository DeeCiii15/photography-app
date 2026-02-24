/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          light: '#FEFCF3',
          DEFAULT: '#F5EBE0',
          dark: '#F0DBDB',
        },
        coral: {
          DEFAULT: '#DBA39A',
          dark: '#c89288',
        },
      },
    },
  },
  plugins: [],
}

