/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}"
  ],
  safelist: [
    "bg-primary",
    "bg-panel",
    "text-text-body",
    "font-inter"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D0D0E",
        panel: "#1F1F27",
        "accent-primary": "#DA4167",
        "accent-secondary": "#49FAD9",
        "text-headline": "#E0E0E0",
        "text-body": "#A0A0A0",
        "bubble-user": "linear-gradient(135deg, #22303C 0%, #1a2832 100%)",
        "bubble-ai": "linear-gradient(135deg, #2A1F38 0%, #231B30 100%)",
        "glass": "rgba(31, 31, 39, 0.7)",
        "glass-hover": "rgba(31, 31, 39, 0.8)",
        "neon-border": "rgba(73, 250, 217, 0.3)",
        "super-dark": "#050506"
      },
      fontFamily: {
        'exo': ['"Exo 2"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'inconsolata': ['Inconsolata', 'monospace']
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.2s ease-out',
        'pulse-dots': 'pulseDots 1.4s infinite ease-in-out',
        'pulse-neon': 'pulseNeon 2s infinite ease-in-out',
        'float': 'float 3s infinite ease-in-out'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        pulseDots: {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: '0.4' },
          '40%': { transform: 'scale(1)', opacity: '1' }
        },
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 5px var(--accent-secondary), 0 0 10px rgba(73, 250, 217, 0.3)' },
          '50%': { boxShadow: '0 0 10px var(--accent-secondary), 0 0 20px rgba(73, 250, 217, 0.5)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      },
      backdropBlur: {
        'xs': '2px'
      }
    }
  },
  plugins: []
};