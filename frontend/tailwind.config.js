/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#38bdf8",
          dark: "#0ea5e9",
        },
      },
      keyframes: {
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        slideUp: "slideUp 0.4s ease forwards",
        fadeIn: "fadeIn 0.3s ease forwards",
        scaleIn: "scaleIn 0.25s ease forwards",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};
