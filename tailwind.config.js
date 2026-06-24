/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./context/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:      "#0A0A0A",
        surface: "#141414",
        card:    "#1C1C1C",
        border:  "#1E1E1E",
        gold:    "#C9A96E",
        text:    "#F0EDE8",
        muted:   "#888888",
        faint:   "#444444",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans:  ["var(--font-inter)", "sans-serif"],
        mono:  ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
