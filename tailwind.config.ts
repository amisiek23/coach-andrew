import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#377A00",
          dark:    "#2f6a00",
          light:   "#EAF7EB",
        },
        secondary: "#e2ecdf",
        border:    "#D0EBCF",
        accent:    "#8f3434",
        nav:       "#012104",
        brand: {
          text: "#151716",
        },
      },
      // Reference the CSS variables next/font injects on <html>
      fontFamily: {
        heading: ["var(--font-heading)", "Libre Baskerville", "Georgia", "serif"],
        body:    ["var(--font-body)",    "Open Sans", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
