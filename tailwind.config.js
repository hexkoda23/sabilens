/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00C896',
        'primary-dark': '#009E78',
        'primary-light': '#E6FBF4',
        accent: '#0A0E1A',
        'accent-2': '#1B2332',
        surface: '#FFFFFF',
        background: '#F7FAF9',
        muted: '#6B7280',
        border: '#E5EAE8',
        success: '#00C896',
        warning: '#F59E0B',
        danger: '#FF4757',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(0,0,0,0.06)',
        'card': '0 8px 32px rgba(0,0,0,0.08)',
        'glow': '0 0 32px rgba(0,200,150,0.25)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
    },
  },
  plugins: [],
}