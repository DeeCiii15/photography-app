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
          light: '#faf8f4',
          DEFAULT: '#ebe8df',
          dark: '#c9bfb2',
        },
        coral: {
          DEFAULT: '#a67c52',
          dark: '#8a6543',
        },
        boho: {
          ink: '#1c1a17',
          bark: '#5b4d3e',
          stone: '#7a6e62',
          mist: '#ebe6de',
          sage: '#8a9a6b',
          'sage-muted': '#a3ac91',
          wheat: '#c5a059',
          gold: '#c5a059',
          sky: '#b8c9d9',
          parchment: '#f4f1ea',
          terracotta: '#a67c52',
          kraft: '#e8e3d9',
        },
      },
    },
  },
  plugins: [],
}
