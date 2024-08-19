/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: "Poppins, sans-serif",
      },
      colors: {
        primary: "#5F35F5",
        secondary: "#11175D",
      },
      boxShadow: {
        custom: "0 10px 5px -5px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
