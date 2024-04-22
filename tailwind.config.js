/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      keyframes: {
        enter: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        leave: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0"},
        },
      },
      animation: {
        enter: "enter 350ms ease-out forwards",
        leave: "leave 350ms ease-in forwards",
      },
    },
  },
  plugins: [],
};
