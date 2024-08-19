import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  darkMode: ["selector"],
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
      fontFamily: {
        pretendard: ["Pretendard"],
      },
      fontSize: {
        h1: [
          "32px",
          {
            lineHeight: "1.4",
            fontWeight: "700",
          },
        ],
        h2: [
          "24px",
          {
            lineHeight: "1.4",
            fontWeight: "700",
          },
        ],
        h3: [
          "20px",
          {
            lineHeight: "1.4",
            fontWeight: "600",
          },
        ],
        h4: [
          "17px",
          {
            lineHeight: "1.4",
            fontWeight: "600",
          },
        ],
        h5: [
          "16px",
          {
            lineHeight: "1.4",
            fontWeight: "600",
          },
        ],
        h6: [
          "15px",
          {
            lineHeight: "1.4",
            fontWeight: "600",
          },
        ],
        p1: [
          "16px",
          {
            lineHeight: "1.4",
            fontWeight: "500",
          },
        ],
        p2: [
          "14px",
          {
            lineHeight: "1.4",
            fontWeight: "600",
          },
        ],
        p3: [
          "14px",
          {
            lineHeight: "1.4",
            fontWeight: "500",
          },
        ],
        p4: [
          "13px",
          {
            lineHeight: "1.4",
            fontWeight: "500",
          },
        ],
        sm1: [
          "12px",
          {
            lineHeight: "1.4",
            fontWeight: "500",
          },
        ],
        sm2: [
          "10px",
          {
            lineHeight: "1.4",
            fontWeight: "500",
          },
        ],
      },
      colors: {
        zinc: {
          100: "#fafafa",
          200: "#f4f4f5",
          300: "#e4e4e7",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
        },
        red: {
          1: "#E60019",
          2: "#EE5566",
          3: "#F7AAB2",
          4: "#EB5757",
          5: "#FAF2F2",
        },
        green: {
          1: "#268D61",
          2: "#78C58C",
          3: "#BBE2C6",
          4: "#31C48D",
          5: "#F3FAF7",
        },
        brand: {
          1: "#000000",
          2: "#4F4F4F",
          3: "#E0E0E0",
        },
        blue: {
          1: "#000000",
          2: "#4F4F4F",
          3: "#E0E0E0",
          4: "#2F80ED",
          5: "#F0F6FE",
        },
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
