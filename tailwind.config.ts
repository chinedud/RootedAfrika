import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: {
          DEFAULT: "#EC4899",
          light: "#F472B6",
          dark: "#DB2777",
        },
        brand: {
          black: "#000000",
          white: "#ffffff",
          gold: "#EC4899",
          "gold-light": "#F472B6",
          "gold-dark": "#DB2777",
        },
        surface: {
          DEFAULT: "#ffffff",
          raised: "#fafafa",
          overlay: "#f5f5f5",
          muted: "#e5e5e5",
        },
        shad: {
          background: "var(--background)",
          foreground: "var(--foreground)",
          card: "var(--card)",
          "card-foreground": "var(--card-foreground)",
          popover: "var(--popover)",
          "popover-foreground": "var(--popover-foreground)",
          primary: "var(--primary)",
          "primary-foreground": "var(--primary-foreground)",
          secondary: "var(--secondary)",
          "secondary-foreground": "var(--secondary-foreground)",
          muted: "var(--muted)",
          "muted-foreground": "var(--muted-foreground)",
          accent: "var(--accent)",
          "accent-foreground": "var(--accent-foreground)",
          destructive: "var(--destructive)",
          "destructive-foreground": "var(--destructive-foreground)",
          border: "var(--border)",
          input: "var(--input)",
          ring: "var(--ring)",
          "chart-1": "var(--chart-1)",
          "chart-2": "var(--chart-2)",
          "chart-3": "var(--chart-3)",
          "chart-4": "var(--chart-4)",
          "chart-5": "var(--chart-5)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["Georgia", "ui-serif", "serif"],
      },
      backgroundImage: {
        "light-gradient":
          "linear-gradient(180deg, #ffffff 0%, #fafafa 50%, #f5f5f5 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
