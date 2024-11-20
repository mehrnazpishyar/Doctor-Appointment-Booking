/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8cb45f",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(280px, 1fr))",
      },
    },
  },
  plugins: [],
};
