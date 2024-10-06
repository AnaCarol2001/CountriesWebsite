/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector"],
  theme: {
    extend: {
      fontFamily: {
        nunito: '"Nunito Sans", sans-serif',
      },
      colors: {
        dark: "hsl(207, 26%, 17%)",
        light: " hsl(0, 0%, 98%)",
        "dark-elements": "hsl(209, 23%, 22%)",
        "light-text": "hsl(200, 15%, 8%)",
        "light-input": "hsl(0, 0%, 52%)",
      },
    },
  },
  plugins: [],
};
