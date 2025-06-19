import type { Config } from "tailwindcss";
import clipPath from "tailwind-clip-path"; // 👈 Import legacy clip-path plugin

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pullIn: {
          "0%": {
            transform: "translate(var(--start-x), var(--start-y)) scale(0.8) rotate(360deg)",
            opacity: "0",
          },
          "50%": {
            transform: "translate(0, 0) scale(1.4) rotate(180deg)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(1) rotate(0deg)",
            opacity: "1",
          },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 30px rgba(41, 141, 238, 0.35)",
          },
          "50%": {
            boxShadow: "0 0 60px rgba(41, 141, 238, 0.8)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) translateY(-15px) rotate(-3deg)",
          },
          "50%": {
            transform: "translate(-50%, -50%) translateY(15px) rotate(3deg)",
          },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pullIn: "pullIn 5s ease-out forwards",
        glow: "glow 3s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        fadeInUp: "fadeInUp 1.5s ease-out forwards",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
      },
      clipPath: {
        // 👇 You can customize these or add more as needed
        'top-triangle': 'polygon(0 0, 100% 10%, 100% 100%, 0% 100%)',
        'bottom-triangle': 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
        'angled': 'polygon(0 10%, 100% 0%, 100% 100%, 0% 100%)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    clipPath // 👈 Registered here
  ],
};

export default config;
