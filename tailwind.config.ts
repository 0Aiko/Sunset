import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundSize: {
        "size-1000": "1000% 1000%",
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
        "pos-300": "300% 300%",
      },
      colors: {
        terracotta: {
          50: "#F8F3F2",
          100: "#F2E6E4",
          200: "#E5CCC8",
          300: "#D8B3AD",
          400: "#CB9992",
          500: "#895B67",
          600: "#7B505D",
          650: "#754C59",
          700: "#6A4150",
          750: "#643C4C",
          800: "#5C3545",
          900: "#4D2838",
          950: "#3F1F2D",
        },
        coffee: {
          600: "#3F1F2D",
          700: "#916472",
        },
        "yellow-pastel": "#F0D5BF",
        "wine": "#4D2838",
	      "winecoffee": "#825A6C",
      },
    },
  },
  safelist: [
    { pattern: /^bg-\w+-\d+$/, variants: ["hover"] },
    { pattern: /^p-\d+$/ },
    { pattern: /^from-\w+-\d+/, variants: ["hover"] },
    { pattern: /^text-\w+-\d+/, variants: ["hover"] },
  ],
  plugins: [],
};
export default config;
