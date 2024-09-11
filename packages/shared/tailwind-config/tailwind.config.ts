import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
	darkMode: ["selector"],
	prefix: "",
	theme: {
		container: {
			center: true,
      padding: "20px",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			fontFamily: {
				pretendard: ["Pretendard"]
			},
			fontSize: {
				h1: [
					"32px",
					{
						lineHeight: "1.4",
						fontWeight: "700"
					}
				],
				h2: [
					"24px",
					{
						lineHeight: "1.4",
						fontWeight: "700"
					}
				],
				h3: [
					"20px",
					{
						lineHeight: "1.4",
						fontWeight: "600"
					}
				],
				h4: [
					"17px",
					{
						lineHeight: "1.4",
						fontWeight: "600"
					}
				],
				h5: [
					"16px",
					{
						lineHeight: "1.4",
						fontWeight: "600"
					}
				],
				h6: [
					"15px",
					{
						lineHeight: "1.4",
						fontWeight: "600"
					}
				],
				p1: [
					"16px",
					{
						lineHeight: "1.4",
						fontWeight: "500"
					}
				],
				p2: [
					"14px",
					{
						lineHeight: "1.4",
						fontWeight: "600"
					}
				],
				p3: [
					"14px",
					{
						lineHeight: "1.4",
						fontWeight: "500"
					}
				],
				p4: [
					"13px",
					{
						lineHeight: "1.4",
						fontWeight: "500"
					}
				],
				sm1: [
					"12px",
					{
						lineHeight: "1.4",
						fontWeight: "500"
					}
				],
				sm2: [
					"10px",
					{
						lineHeight: "1.4",
						fontWeight: "500"
					}
				]
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
					900: "#18181b"
				},
				red: {
					100: "#F7AAB2",
					200: "#F7838A",
					300: "#EE5566",
					400: "#EB5757",
					500: "#E60019",
					600: "#D90019",
					700: "#C00017",
					800: "#A60015",
					900: "#8C0012"
				},
				green: {
					100: "#BBE2C6",
					200: "#A5D8B2",
					300: "#8ECC9E",
					400: "#78C58C",
					500: "#5EBB78",
					600: "#4CA265",
					700: "#3D8B57",
					800: "#317147",
					900: "#255737"
				},
				brand: {
					1: "#000000",
					2: "#4F4F4F",
					3: "#E0E0E0"
				},
				blue: {
					100: "#B3D4F9",
					200: "#80B9F5",
					300: "#4D9EF0",
					400: "#2F80ED",
					500: "#296ECB",
					600: "#235BAA",
					700: "#1D4988",
					800: "#163866",
					900: "#102645"
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))"
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))"
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))"
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))"
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
      keyframes: {
        "fade-in-down-half": {
          "0%": {
            opacity: 0,
            transform: "translate3d(0, 25%, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 50%, 0)",
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: 0,
            transform: "translate3d(0, -25%, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: 0,
            transform: "translate3d(0, 25%, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
        "fade-out-down": {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
            transform: "translate3d(0, 25%, 0)",
          },
        },
        "fade-out-up": {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
            transform: "translate3d(0, -25%, 0)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 1s ease-in-out",
        "fade-in-up": "fade-in-up 0.5s ease-in-out",
        "fade-out-down": "fade-out-down 0.5s ease-in-out",
        "fade-out-up": "fade-out-up 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
