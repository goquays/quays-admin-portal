import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(), // Add Flowbite content
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        white: "#ffffff",
        black: "#000000",
        primary: "#000034",
        red: "#DF1C41",
        purple: "#131321",
        background: "#FFFAF6",
        border: "#9B9B9B",
        secondary: "rgba(0, 0, 52, 0.6)",
      },
      boxShadow: {},
    },
  },
  plugins: [
    flowbite.plugin(), // Add Flowbite plugin
  ],
} satisfies Config;
