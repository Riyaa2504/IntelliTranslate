/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#213448",
        secondary: "#547792",
        accent: "#4A70A9",
        softBlue: "#94B4C1",
        lightBlue: "#8FABD4",
        teal: "#629FAD",
        beige: "#EAE0CF",
        offWhite: "#EFECE3",
      },
    },
  },
  plugins: [],
};
