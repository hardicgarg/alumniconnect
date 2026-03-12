/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',       // warm-offwhite / dark-950
        foreground: 'var(--color-foreground)',       // near-black / gray-100

        card: {
          DEFAULT: 'var(--color-card)',              // white / dark-900
          foreground: 'var(--color-card-foreground)', // near-black / gray-100
        },
        popover: {
          DEFAULT: 'var(--color-popover)',           // white / dark-800
          foreground: 'var(--color-popover-foreground)', // near-black / gray-100
        },
        primary: {
          DEFAULT: 'var(--color-primary)',           // golden-yellow #E8C547
          foreground: 'var(--color-primary-foreground)', // near-black #1C1C1C
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',         // lighter-golden #F5D442
          foreground: 'var(--color-secondary-foreground)', // near-black #1C1C1C
        },
        accent: {
          DEFAULT: 'var(--color-accent)',            // deep-gold #D4AF37
          foreground: 'var(--color-accent-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)',             // warm-gray-100 / dark-800
          foreground: 'var(--color-muted-foreground)', // gray-700 / gray-400
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',       // red-500
          foreground: 'var(--color-destructive-foreground)', // white
        },
        success: {
          DEFAULT: 'var(--color-success)',           // green-500
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)',           // amber-500
          foreground: 'var(--color-warning-foreground)', // near-black
        },
        error: {
          DEFAULT: 'var(--color-error)',             // red-500
          foreground: 'var(--color-error-foreground)', // white
        },
        border: 'var(--color-border)',               // rgba subtle border
        input: 'var(--color-input)',                 // rgba input bg
        ring: 'var(--color-ring)',                   // golden-yellow focus ring
        'text-primary': 'var(--color-text-primary)', // near-black / gray-100
        'text-secondary': 'var(--color-text-secondary)', // gray-700 / gray-400
      },

      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Source Sans 3', 'sans-serif'],
      },

      fontSize: {
        'h1': ['2.5rem', { lineHeight: '1.2' }],
        'h2': ['2rem', { lineHeight: '1.25' }],
        'h3': ['1.5rem', { lineHeight: '1.3' }],
        'h4': ['1.25rem', { lineHeight: '1.4' }],
        'h5': ['1.125rem', { lineHeight: '1.5' }],
        'caption': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.025em' }],
      },

      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        DEFAULT: '8px',
      },

      boxShadow: {
        'sm': '0 1px 3px rgba(28, 28, 28, 0.08)',
        'md': '0 4px 8px rgba(28, 28, 28, 0.10)',
        'lg': '0 8px 16px rgba(28, 28, 28, 0.12)',
        'xl': '0 20px 40px -8px rgba(28, 28, 28, 0.16)',
        'card': '0 2px 8px rgba(28, 28, 28, 0.06)',
        'card-hover': '0 8px 24px rgba(28, 28, 28, 0.12)',
        'golden': '0 4px 16px rgba(232, 197, 71, 0.30)',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        'nav': '72px',
        'subnav': '48px',
      },

      height: {
        'nav': '72px',
        'subnav': '48px',
        'touch': '44px',
      },

      minHeight: {
        'touch': '44px',
      },

      minWidth: {
        'touch': '44px',
      },

      zIndex: {
        'base': '0',
        'card': '1',
        'sticky': '10',
        'dropdown': '50',
        'nav': '100',
        'modal': '200',
        'toast': '300',
      },

      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'ease-out',
      },

      transitionDuration: {
        'DEFAULT': '250ms',
      },

      maxWidth: {
        'prose': '75ch',
        'content': '1280px',
      },

      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'fadeInUp': 'fadeInUp 300ms ease-out both',
        'spring': 'spring 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        spring: {
          '0%': { transform: 'scale(0.95)' },
          '60%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
};