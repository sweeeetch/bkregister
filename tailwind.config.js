/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/src/assets/bg.jpg')",
      },
    },
  },
  plugins: [],
};
