/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6A00",
        secondary: "#FF6A00",
      },
      zIndex: {
        100000: 100000,
        99999: 99999,
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      backgroundImage: {
        'night-sky': 'linear-gradient(180deg, #D1D5DB, #E5E7EB, #F3F4F6)', // Customize the colors as needed
      },
    },
  },
  plugins: [],
}
