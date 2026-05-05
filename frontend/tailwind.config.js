/** @type {import('tailwindcss').Config} */
// Tailwind v4 — theme configuration lives in app/globals.css via @theme {}
// This file is kept for tooling compatibility (e.g. editor IntelliSense).
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
