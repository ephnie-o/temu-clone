module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // if you're using app directory
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
