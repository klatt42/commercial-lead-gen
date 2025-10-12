/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // In Tailwind v4, theme configuration is done in CSS via @theme
  // This config is kept for compatibility with plugins
  plugins: [],
};