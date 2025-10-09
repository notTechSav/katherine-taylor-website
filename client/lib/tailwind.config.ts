import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        luxury: {
          black: "#0a0a0a",
          white: "#fefefe",
          cream: "#faf8f5",
          pearl: "#f7f5f2",
          gray: {
            50: "#fafafa",
            100: "#f5f5f5",
            200: "#e5e5e5",
            300: "#d4d4d4",
            400: "#a3a3a3",
            500: "#737373",
            600: "#525252",
            700: "#404040",
            800: "#262626",
            900: "#171717",
            950: "#0a0a0a",
          },
          gold: {
            light: "#f1e5d1",
            DEFAULT: "#d4af37",
            dark: "#b8941f",
          },
          champagne: "#f7e7ce",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        serif: ["'Playfair Display'", "'Cormorant Garamond'", "serif"],
        brand: ["'Bodoni Moda'", "'Playfair Display'", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        // Luxury type scale
        'display-lg': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['60px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-1': ['48px', { lineHeight: '1.3', letterSpacing: '0.01em' }],
        'heading-2': ['36px', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'heading-3': ['28px', { lineHeight: '1.5', letterSpacing: '0.03em' }],
        'heading-4': ['24px', { lineHeight: '1.5', letterSpacing: '0.04em' }],
        'body-lg': ['18px', { lineHeight: '1.8', letterSpacing: '0.05em' }],
        'body': ['16px', { lineHeight: '1.75', letterSpacing: '0.05em' }],
        'body-sm': ['14px', { lineHeight: '1.7', letterSpacing: '0.06em' }],
        'caption': ['13px', { lineHeight: '1.6', letterSpacing: '0.08em' }],
        'micro': ['11px', { lineHeight: '1.5', letterSpacing: '0.12em' }],
      },
      letterSpacing: {
        'luxury-tight': '0.05em',
        'luxury': '0.08em',
        'luxury-wide': '0.12em',
        'luxury-wider': '0.15em',
      },
      spacing: {
        'luxury-xs': '20px',
        'luxury-sm': '40px',
        'luxury-md': '60px',
        'luxury-lg': '80px',
        'luxury-xl': '120px',
        'luxury-2xl': '160px',
        'luxury-3xl': '200px',
      },
      transitionDuration: {
        luxury: "400ms",
        "luxury-slow": "600ms",
        "luxury-fast": "200ms",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.165, 0.84, 0.44, 1)",
        "luxury-bounce": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
        "luxury-smooth": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      maxWidth: {
        luxury: "1200px",
        "luxury-wide": "1400px",
        "luxury-narrow": "900px",
      },
      boxShadow: {
        // Layered shadow system
        "luxury-subtle": "0 1px 1px rgba(0,0,0,0.04), 0 2px 2px rgba(0,0,0,0.04), 0 4px 4px rgba(0,0,0,0.04)",
        "luxury-sm": "0 1px 1px rgba(0,0,0,0.06), 0 2px 2px rgba(0,0,0,0.06), 0 4px 4px rgba(0,0,0,0.06), 0 8px 8px rgba(0,0,0,0.06)",
        "luxury-md": "0 2px 2px rgba(0,0,0,0.08), 0 4px 4px rgba(0,0,0,0.08), 0 8px 8px rgba(0,0,0,0.08), 0 16px 16px rgba(0,0,0,0.08)",
        "luxury-lg": "0 2px 2px rgba(0,0,0,0.10), 0 4px 4px rgba(0,0,0,0.10), 0 8px 8px rgba(0,0,0,0.10), 0 16px 16px rgba(0,0,0,0.10), 0 32px 32px rgba(0,0,0,0.10)",
        "luxury-glow": "0 0 40px rgba(212, 175, 55, 0.1), 0 0 80px rgba(212, 175, 55, 0.05)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(8px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
