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
        // Primary - Deep Slate (Authority, Trust)
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#1E2A38',  // Our main deep slate
          950: '#0f172a',
        },
        // Accent - Muted Gold (Quality, Premium)
        accent: {
          50: '#fdfcf9',
          100: '#f9f5eb',
          200: '#f2e9d3',
          300: '#e6d5ad',
          400: '#d4bc82',
          500: '#B39960',  // Our main muted gold
          600: '#9a7f4a',
          700: '#7d643b',
          800: '#674f32',
          900: '#56422c',
          950: '#302316',
        },
        // Warm - Cream & Stone (Backgrounds)
        warm: {
          50: '#FDFCFA',   // Page background
          100: '#FAF9F7',  // Card background
          200: '#F7F5F0',  // Section background
          300: '#E8E6E1',  // Borders
          400: '#D4D1CA',
          500: '#B8B3AA',
          600: '#8A857C',
          700: '#6B665E',
          800: '#4A4640',
          900: '#2D2D2D',  // Soft black for text
        },
        // Success - Sage Green (Refined)
        success: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b1a3',
          400: '#7D8B75',  // Muted sage
          500: '#5f6d58',
          600: '#4b5745',
          700: '#3d4639',
          800: '#333a30',
          900: '#2b3128',
        },
        // Legacy support - keeping slate for existing components
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.8125rem', { lineHeight: '1.4' }],    // 13px
        'sm': ['0.875rem', { lineHeight: '1.5' }],     // 14px
        'base': ['1.0625rem', { lineHeight: '1.6' }],  // 17px - larger base
        'lg': ['1.25rem', { lineHeight: '1.5' }],      // 20px
        'xl': ['1.5rem', { lineHeight: '1.4' }],       // 24px
        '2xl': ['2rem', { lineHeight: '1.3' }],        // 32px
        '3xl': ['2.75rem', { lineHeight: '1.2' }],     // 44px
        '4xl': ['3.5rem', { lineHeight: '1.1' }],      // 56px
      },
      spacing: {
        'section': '6rem',      // 96px between sections
        'section-sm': '4rem',   // 64px for smaller gaps
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, #1E2A38 0%, #2a3a4a 50%, #1E2A38 100%)',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(30, 42, 56, 0.08)',
        'medium': '0 4px 16px rgba(30, 42, 56, 0.1)',
        'lift': '0 8px 24px rgba(30, 42, 56, 0.12)',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}
