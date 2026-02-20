/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'stan-dark': '#0a0a0f',
        'stan-card': '#12121a',
        'stan-border': '#1e1e2e',
        'stan-accent': '#6366f1',
        'stan-critical': '#ef4444',
        'stan-high': '#f97316',
        'stan-medium': '#eab308',
        'stan-low': '#6b7280',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
