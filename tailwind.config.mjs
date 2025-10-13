/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
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
          900: '#0f172a',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        }
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'heading': ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'base': ['1.0625rem', { lineHeight: '1.6' }],  // 17px base font
        'lg': ['1.125rem', { lineHeight: '1.6' }],      // 18px
        'xl': ['1.25rem', { lineHeight: '1.5' }],       // 20px
        '2xl': ['1.5rem', { lineHeight: '1.4' }],       // 24px
        '3xl': ['1.875rem', { lineHeight: '1.3' }],     // 30px
        '4xl': ['2.25rem', { lineHeight: '1.2' }],      // 36px
        '5xl': ['3rem', { lineHeight: '1.1' }],         // 48px
        '6xl': ['3.75rem', { lineHeight: '1.05' }],     // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#334155',
            fontSize: '1.0625rem',
            lineHeight: '1.7',
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            a: {
              color: '#059669',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#047857',
                textDecoration: 'underline',
              },
            },
            strong: {
              color: '#1e293b',
              fontWeight: '600',
            },
            'ul > li': {
              paddingLeft: '0.5em',
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
            'ol > li': {
              paddingLeft: '0.5em',
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
            h1: {
              color: '#0f172a',
              fontWeight: '700',
              fontSize: '2.25rem',
              lineHeight: '1.2',
              marginTop: '0',
              marginBottom: '1rem',
            },
            h2: {
              color: '#1e293b',
              fontWeight: '600',
              fontSize: '1.875rem',
              lineHeight: '1.3',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              color: '#334155',
              fontWeight: '600',
              fontSize: '1.5rem',
              lineHeight: '1.4',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            h4: {
              color: '#475569',
              fontWeight: '600',
              fontSize: '1.25rem',
              lineHeight: '1.5',
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.7',
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
          },
        },
      },
    },
  },
  plugins: [],
}
