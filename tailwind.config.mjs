/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Triple Helix brand palette (from live site CSS custom properties)
        gold: '#fdb813',
        navy: {
          DEFAULT: '#233452',
          dark: '#00102E',
        },
        // burgundy (#b73d3d) present on live site but may be Sydney theme default —
        // confirm with team before using in new design
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
