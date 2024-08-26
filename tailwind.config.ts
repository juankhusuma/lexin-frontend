import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-navy-blue" : "#192E59",
        "offwhite" : "#F9F9F9",
        "light-gray" : "#E8EAEE",
        "light-blue" : "#E8EEFD",
        "dark-red" : "#A51017"
      }
    },
  },
  plugins: [],
};
export default config;
