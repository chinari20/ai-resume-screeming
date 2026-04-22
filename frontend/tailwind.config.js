/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefcf8",
          100: "#d5f8ee",
          500: "#10b981",
          700: "#047857",
          950: "#022c22",
        },
        accent: "#f59e0b",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        panel: "0 24px 80px rgba(15, 23, 42, 0.22)",
      },
    },
  },
  plugins: [],
};
