const { createThemes } = require("tw-colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(auth)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/module/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/module/blocks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/module/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "16px",
        xs: "16px",
        sm: "32px",
        md: "32px",
        lg: "32px", 
        xl: "32px", 
        "2xl": "32px", 
      },
    },
    extend: {
      colors: {
        light: "#9CA3AF",
        white: "#ffffff",
        black: "#1A1A1A",
        primary: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#1E3A8A",
        },
        error: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          950: "#450A0A",
        },
        warning: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
          950: "#431407",
        },
        success: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
          950: "#052E16",
        },
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
      },
      screens: {
        xs: "430px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1920px",
      },
      spacing: {
        2: "2px",
        4: "4px",
        6: "6px",
        8: "8px",
        12: "12px",
        16: "16px",
        24: "24px",
        32: "32px",
        40: "40px",
        48: "48px",
        56: "56px",
        64: "64px",
        72: "72px",
        80: "80px",
        96: "96px",
        128: "128px",
        144: "144px",
        160: "160px",
        176: "176px",
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },
      gridTemplateColumns: {
        52: "repeat(52, minmax(0, 1fr))",
      },
    },
  },
  plugins: [
    createThemes({
      light: {
        background: "#ffffff",
        elevation: "#f9fafb",
        text: "#232426",
        border: "#E5E6EB",
      },
      dark: {
        background: "#1A1A1A",
        elevation: "#232426",
        text: "#f9fafb",
        border: "#2D2D2D",
      },
    }),
  ],
  safelist: [
    { pattern: /^hover:bg-/ },
    { pattern: /^dark:hover:bg-/ },
    { pattern: /^hover:border-/ },
    { pattern: /^dark:hover:border-/ },
    { pattern: /^hover:text-/ },
    { pattern: /^dark:hover:text-/ },
    { pattern: /^w-/ },
    { pattern: /^transform/ },
    { pattern: /^translate-/ },
    { pattern: /^origin-/ },
    { pattern: /^perspective-/ },
    { pattern: /^backface-/ },
    { pattern: /^from-(.+)-[0-9]+/ },
    { pattern: /^to-(.+)-[0-9]+/ },
    { pattern: /^border-(.+)-[0-9]+/ },
    { pattern: /^hover:outline-(.+)-[0-9]+/ },
    { pattern: /^bg-gradient-to-b/ },
    "fold",
    "unfold",
    "flip-top",
    "flip-bottom",
    "animate-flip-top",
    "animate-flip-bottom",
  ],
};
