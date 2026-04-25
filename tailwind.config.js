/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"SF Pro Text"', '"Segoe UI Variable Text"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"SF Pro Display"', '"Segoe UI Variable Display"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: { DEFAULT: '#FAFAF9', alt: '#F4F4F3' },
        ink: { DEFAULT: '#0A0A0A', muted: '#52525B' },
        accent: { DEFAULT: '#0066FF', soft: '#E6F0FF' },
      },
      letterSpacing: { tightest: '-0.03em' },
      lineHeight: { tightest: '0.95' },
      maxWidth: { prose: '720px', content: '1200px' },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
    },
  },
  plugins: [],
}
