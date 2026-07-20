/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        cyber: {
          50: '#e8fbff',
          100: '#c7f4ff',
          200: '#8fe9ff',
          300: '#4fdcff',
          400: '#1ecbf5',
          500: '#00b0dc',
          600: '#008cb4',
          700: '#076f8f',
          800: '#0e5a74',
          900: '#124a61',
        },
        neon: {
          green: '#3ddc97',
          amber: '#ffb547',
          red: '#ff5b6e',
          violet: '#a78bfa',
          blue: '#4fdcff',
        },
      },
      boxShadow: {
        glow: '0 0 30px -6px rgba(79,220,255,0.45)',
        'glow-sm': '0 0 16px -4px rgba(79,220,255,0.45)',
        panel: '0 18px 60px -20px rgba(0,0,0,0.65)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        scanline: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(400%)' } },
        pulseRing: { '0%': { transform: 'scale(.85)', opacity: '.8' }, '100%': { transform: 'scale(1.6)', opacity: '0' } },
        shimmer: { '0%': { backgroundPosition: '-500px 0' }, '100%': { backgroundPosition: '500px 0' } },
        dash: { to: { strokeDashoffset: '-1000' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        scanline: 'scanline 6s linear infinite',
        pulseRing: 'pulseRing 2.4s ease-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        dash: 'dash 20s linear infinite',
      },
    },
  },
  plugins: [],
}
